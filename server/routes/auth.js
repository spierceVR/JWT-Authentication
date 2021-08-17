const Router = require('express-promise-router');
const db = require('../db');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const validInfo = require('../middleware/validInfo');
const validate = require('../middleware/validate');

// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const router = new Router();
// export our router to be mounted by the parent application
module.exports = router;

router.post("/login", validInfo, async (req, res) =>{
    try {
        const {username, password} = req.body;
        const queried = await db.query("SELECT bcrypt_hash FROM users WHERE username = $1", [username]);
        
        // If the given username is in our database already
        if(queried.rowCount > 0){
            const hashed = queried.rows[0]['bcrypt_hash'];
            // check given password with stored hash
            const validpass = await checkPassword(password, hashed);
            if (validpass){
                res.status(200);
                const payload = {"username" : username};
                // create JWT
                const token = jwt.sign(
                    payload,
                    process.env.JWT_SECRET,
                    {
                      expiresIn: "1h",
                    }
                  );

                // add bearer token cookie to the response
                const cookieOptions = {
                    maxAge: 1000 * 60 * 15, // would expire after 15 minutes
                    httpOnly: true, // The cookie only accessible by the web server
                    signed: false // Indicates if the cookie should be signed
                }
                res.cookie('bearer-token', token, cookieOptions);
                res.send('Correct password');
            } else {
                res.status(401);
                res.send("Incorrect password");
            }
        // if the given username is not in the database already
        } else {
            res.status(401);
            res.send("Username not found");
        }
        res.end();
    } catch (error) {
       console.error(error.message); 
    }
});

router.post("/register", validInfo, async (req, res) =>{
    try {
        const {username, password} = await req.body;
        const storedUser = await db.query("SELECT FROM users WHERE username = $1", [username]);
        if(storedUser.rowCount > 0){
            res.status(401);
            res.send("Username already exists!");
        } else {
            const hash = await bcrypt.hash(password, 10);
            const entry = await db.query("INSERT INTO users (username, bcrypt_hash) VALUES($1, $2)", [username, hash]);
            res.status(200);
            res.send("User created");
        }
        res.end();
    } catch (error) {
       console.error(error.message); 
    }
});

// deletes client's bearer-token
router.post("/logout", validate, async(req, res) =>{
    try {
        const cookieOptions = {
            maxAge: 0, // expires immediately
            httpOnly: true, // The cookie only accessible by the web server
            signed: false // Indicates if the cookie should be signed
        }
        res.status(200);
        res.cookie("bearer-token", "", cookieOptions);
        res.end();
    } catch (error) {
        console.error(error.message);
    }
});

const checkPassword = async (plaintext, hash) => {
    try {
        //true if password matches false if password does not match
        result1 = await bcrypt.compare(plaintext, hash);
        return result1;
    } catch (error) {
       console.error(error.message); 
    }
    return false;
};
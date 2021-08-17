const jwt = require('jsonwebtoken');

/**
 * Express middleware function that checks if a request has valid JSON Web Token.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns next() or error code 401 (No bearer-token cookie) or error code 403 (Invalid bearer-token).
 */
module.exports = (req, res, next) => {
    try {
        const cookieToken = req.cookies['bearer-token'];

        console.log("request to validate was received, bearer token cookie = ", cookieToken);
        // if there's no bearer token cookie already respond with error
        if (!cookieToken) {
            return res.status(401).send("Validation failed, you must login first!");
        }
        // if there is a bearer token cookie already, check if it's JWT is valid
        else {
            jwt.verify(cookieToken, process.env.JWT_SECRET);
        }
    } catch (error) {
        console.error(error.message);
        return res.status(403).send("Invalid Token");
    }
    next();
};
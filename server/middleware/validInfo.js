/**
 * Express middleware function that validates the username and password fields in a request are not empty.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns next() or error code 401 (Missing credentials)
 */

module.exports = (req, res, next) => {
    const { username, password } = req.body;
        if (![username, password].every(Boolean)) {
            return res.status(401).json("Missing Credentials");
        } 

    next();
};
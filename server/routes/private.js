const Router = require('express-promise-router');
const validate = require('../middleware/validate');
// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const router = new Router();
// export our router to be mounted by the parent application
module.exports = router;

router.get("/welcome", validate, async (req, res) => {
    try {
        res.status(200);
        res.send("Welcome, you are authenticated");
        res.end();
    } catch (error) {
        console.error(error.message);
    }
})
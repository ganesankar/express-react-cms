const router = require('express').Router();
const bodyParser = require('body-parser');

router.use(bodyParser.json());

router.get("/", (req, res) => {
    return res.json({ message: "Hello, World!" });
});

module.exports = router;

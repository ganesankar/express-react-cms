
const router = require('express').Router();



router.get('/', function (req, res) {
    // log user out
   // log user out
  
   // move success message into local variable so it only appears once (single read)
   var viewData = { success: 'test' };
    res.render(__dirname+'/template/index.html', viewData);
});

router.post('/', function (req, res) {
    var viewData = { success: 'test' };
    res.render(__dirname+'/template/index.html', viewData);
});

module.exports = router;
var express = require('express'),
    router = express.Router();

//TODO middleware
function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({"error": message});
};

router.use(function (err, req, res, next) {
    if (err) {
        handleError(res, err, "Something broke!");
    }
    next();
});

router.get('/', function(req, res) {
    res.send('All the things');
});

router.get('/about', function(req, res){
    res.send('about stuff');
});

module.exports = router;

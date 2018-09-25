var express = require('express');
var router = express.Router();
var model = require('../models/index');

//middleware to hanlde errors 
const awaitErrorHandlerFactory = middleware => {
    return async(req, res, next) => {
        try {
            await middleware(req, res, next);
        } catch (err) {
            next(err);
        }
    };
};

/* GET todo listing. */
router.get('/', awaitErrorHandlerFactory(async(req, res, next) => {
    const series = await model.Series.findAndCountAll({});
    return res.json({
        error: false,
        data: series
    });
}));


/* POST todo. */
router.post('/', function(req, res, next) {

});


/* update todo. */
router.put('/:id', function(req, res, next) {

});


/* GET todo listing. */
router.delete('/:id', function(req, res, next) {

});

module.exports = router;
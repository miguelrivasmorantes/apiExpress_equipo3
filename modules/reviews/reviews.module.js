const express = require('express');
const reviewController = require('./reviews.controller');
const router = express.Router();

router.use('/reviews', reviewController);

module.exports = router;

const express = require('express');
const ReviewService = require('./reviews.service');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const review = await ReviewService.createReview(req.body);
        res.status(201).json(review);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/:reservationId', async (req, res) => {
    try {
        const reviews = await ReviewService.getReviewsByReservation(req.params.reservationId);
        res.json(reviews);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
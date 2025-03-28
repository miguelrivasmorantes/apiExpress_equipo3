const express = require('express');
const ReviewService = require('./reviews.service');
const { validateReview } = require('./reviews.middleware');
const router = express.Router();

router.post('/', validateReview, async (req, res) => {
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

router.put('/:id', validateReview, async (req, res) => {
    try {
        const updatedReview = await ReviewService.updateReview(req.params.id, req.body);
        res.json(updatedReview);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await ReviewService.deleteReview(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/user/:userId', async (req, res) => {
    try {
        const reviews = await ReviewService.getReviewsByUser(req.params.userId);
        res.json(reviews);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const reviews = await ReviewService.getAllReviews();
        res.json(reviews);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;

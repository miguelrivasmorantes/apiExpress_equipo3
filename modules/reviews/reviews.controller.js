const express = require('express');
const router = express.Router();
const reviewsService = require('./reviews.service');
const { validateReview } = require('./reviews.middleware');

router.put('/:id', validateReview, async (req, res) => {
    try {
        const updatedReview = await reviewsService.updateReview(req.params.id, req.body);
        res.json(updatedReview);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        await reviewsService.deleteReview(req.params.id);
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.get('/user/:userId', async (req, res) => {
    try {
        const userReviews = await reviewsService.getUserReviews(req.params.userId);
        res.json(userReviews);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.get('/', async (req, res) => {
    try {
        const allReviews = await reviewsService.getAllReviews();
        res.json(allReviews);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

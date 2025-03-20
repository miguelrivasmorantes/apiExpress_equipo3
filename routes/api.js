// reviews.model.js
const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    reservation: { type: mongoose.Schema.Types.ObjectId, ref: 'Reservation', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Review', ReviewSchema);

// reviews.controller.js
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

// reviews.service.js
const Review = require('./reviews.model');

async function createReview(data) {
    return await Review.create(data);
}

async function getReviewsByReservation(reservationId) {
    return await Review.find({ reservation: reservationId }).populate('user', 'name');
}

async function updateReview(id, data) {
    return await Review.findByIdAndUpdate(id, data, { new: true });
}

async function deleteReview(id) {
    return await Review.findByIdAndDelete(id);
}

async function getReviewsByUser(userId) {
    return await Review.find({ user: userId })
        .populate('reservation')
        .populate('user', 'name');
}

async function getAllReviews() {
    return await Review.find().populate('user', 'name').populate('reservation');
}

module.exports = { createReview, getReviewsByReservation, updateReview, deleteReview, getReviewsByUser, getAllReviews };

// reviews.middleware.js
function validateReview(req, res, next) {
    const { rating, comment } = req.body;
    if (typeof rating !== 'number' || rating < 1 || rating > 5) {
        return res.status(400).json({ error: 'Invalid rating value' });
    }
    if (!comment || comment.trim() === '') {
        return res.status(400).json({ error: 'Comment is required' });
    }
    next();
}

module.exports = { validateReview };

// reviews.module.js
const reviewRouter = require('./reviews.controller');
module.exports = reviewRouter;

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
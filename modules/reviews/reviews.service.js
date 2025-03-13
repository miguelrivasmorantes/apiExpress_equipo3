const Review = require('./reviews.model');

async function createReview(data) {
    return await Review.create(data);
}

async function getReviewsByReservation(reservationId) {
    return await Review.find({ reservation: reservationId }).populate('user', 'name');
}

module.exports = { createReview, getReviewsByReservation };
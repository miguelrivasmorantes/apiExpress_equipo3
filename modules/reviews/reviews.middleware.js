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
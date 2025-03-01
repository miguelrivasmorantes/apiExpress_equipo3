const mongoose = require('mongoose');
const hotelSchema = require('../schemas/hotel.schema');

const Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel;

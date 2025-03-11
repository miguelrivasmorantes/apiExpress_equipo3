(function () {
    "use strict";
  
    module.exports = {
      createHotel: createHotel,
      fetchHotels: fetchHotels,
      fetchHotelById: fetchHotelById,
      updateHotel: updateHotel,
      deleteHotel: deleteHotel,
    };
  
    const { Hotel } = require("./hotel.model");
  
    function createHotel(hotel) {
      return Hotel.create(hotel);
    }
  
    function fetchHotels() {
      return Hotel.find({}).exec();
    }
  
    function fetchHotelById(hotelId) {
      return Hotel.findById(hotelId).exec();
    }
  
    function updateHotel(hotelId, hotel) {
      return Hotel.findByIdAndUpdate(hotelId, hotel, { new: true }).exec();
    }
  
    function deleteHotel(hotelId) {
      return Hotel.findByIdAndRemove(hotelId).exec();
    }
  })();
  
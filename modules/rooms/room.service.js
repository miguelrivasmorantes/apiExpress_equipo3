"use strict"

const { Payment } = require("../payments/payment.model");
const { User } = require("../users/user.model");
const { Reservation } = require("../reservations/reservation.model");
const { Room } = require("./room.model");
const { Hotel } = require("../hotels/hotel.model");

module.exports = {
  addRoom,
  fetchRooms,
  fetchRoomsByHotelId,
};


function addRoom(guest){
    return Room.create(guest);
}

function fetchRooms(){
    return Room.find()
}

function fetchRoomsByHotelId(hotel_id){
  return Room.find({ hotel_id })
  .populate({
    path: "_id",
    model: Hotel,
    select: "_id",
  })
  .populate({
    path: "_id",
    model: Room,
    select: "hotel_id",
  })
  .select("tipo capacidad precio_por_noche disponibilidad");
}

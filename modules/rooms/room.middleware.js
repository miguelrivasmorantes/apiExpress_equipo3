"use strict"

const RoomService = require("./room.module")().RoomService;

module.exports = {
    addRoom: addRoom,
    getRooms: getRooms,
    getRoomsByHotelId: getRoomsByHotelId,
};

async function handleRequest(serviceFunction, req, res, next, ...params) {
    try{
        req.response = await serviceFunction(...params);
        next();
    }catch(error){
        next(error);
    }
}

function addRoom(req, res, next){
    handleRequest(RoomService.addRoom, req, res, next, req.body);
}

function getRooms(req, res, next){
    handleRequest(RoomService.fetchRooms, req, res, next);
}

function getRoomsByHotelId(req, res, next){
    handleRequest(RoomService.fetchRoomsByHotelId, req, res, next, req.params.hotel_id);
}


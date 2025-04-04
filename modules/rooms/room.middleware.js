"use strict"

const RoomService = require("./room.module")().RoomService;

module.exports = {
    addRoom: addRoom,
    getRooms: getRooms,
    getRoomByHotelId: getRoomByHotelId,
    getRoomByType: getRoomByType
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
    handleRequest(RoomService.fetchRooms, req, res, next, req.query.fecha_inicio, req.query.fecha_fin);
}

function getRoomByHotelId(req, res, next){
    handleRequest(RoomService.fetchRoomsByHotelId, req, res, next, req.params.hotel_id);
}

function getRoomByType(req, res, next){
    handleRequest(RoomService.fetchRoomsByType, req, res, next, req.params.tipos);
}


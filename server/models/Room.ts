import { Schema, model, Document } from "mongoose";

const RoomSchema = new Schema({
    userId: String,
    building: Number,
    floor: Number,
    wage: Number,
});

const RoomModel = model("Room", RoomSchema);

export default RoomModel;
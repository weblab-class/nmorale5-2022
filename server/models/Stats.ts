import { Schema, model, Document } from "mongoose";

const StatsSchema = new Schema({
    name: String,
    xp: Number,
    smiles: Number,
    wage: Number,
});

const StatsModel = model("stats", StatsSchema);

export default StatsModel
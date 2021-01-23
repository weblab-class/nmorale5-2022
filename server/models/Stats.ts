import { Schema, model, Document } from "mongoose";

const StatsSchema = new Schema({
    userId: String,
    smiles: Number,
});

const StatsModel = model("Stats", StatsSchema);

export default StatsModel;
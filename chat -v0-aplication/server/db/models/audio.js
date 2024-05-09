import mongoose from "mongoose";



const { model, Schema } = mongoose;


const audioSchema = new Schema({
    filename: String,
    path: String

}, { timestamps: true });


const Audio = model('Audios', audioSchema);

export default Audio;
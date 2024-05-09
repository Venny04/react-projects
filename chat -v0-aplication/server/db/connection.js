
import mongoose from "mongoose";

const { connect } = mongoose;


export const connectToddb = async (url) => {
    try {
        await connect(url);
        console.log("connected to db successfull.");

    } catch (error) {
        console.log('Achei um ' + error)
    }
}



import mongoose from "mongoose";
const { connect } = mongoose;

export const connectTodb = async (url) => {

    try {
        await connect(url)
        console.log("connected to db ssuccessfull");
    } catch (error) {
        console.log(error);
    }
}

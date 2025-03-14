import mongoose from "mongoose";

const connection = async () => {
    try {
      await mongoose.connect(process.env.MONGO);
      console.log("Database MongoDB connected");
    } catch (error) {
      console.log(error);
    }
}


export default connection
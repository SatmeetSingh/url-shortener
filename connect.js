import mongoose from "mongoose";

async function connectDb(url) {
  try {
    return mongoose.connect(url);
  } catch (err) {
    console.log("Mongoose Connection Error");
  }
}

export default connectDb;

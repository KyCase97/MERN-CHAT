import mongoose from "mongoose";

const ConnectDB = async () => {
  const url = process.env.DB;
  try {
    mongoose.connect(url);
    console.log(`Database Connected`);
  } catch (err) {
    console.log(err);
  }
};

export default ConnectDB;

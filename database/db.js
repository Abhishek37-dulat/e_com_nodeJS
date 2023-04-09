import mongoose from "mongoose";

export const Connection = async (MONGODB_URL) => {
  try {
    await mongoose.connect(MONGODB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("mongoDB connected successfully");
  } catch (error) {
    console.log("Error in database Connection: ", error.message);
  }
};

export default Connection;

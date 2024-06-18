import mongoose from "mongoose";

export const connectDB = async () => {
  const connectionString = process.env.DATA_BASE_URL?.replace(
    "<password>",
    process.env.DATA_BASE_PASSWORD!
  );
  if (!connectionString) throw new Error("DATA_BASE url lost!");

  try {
    if (mongoose.connection.readyState >= 1) return;

    mongoose.connect(connectionString);
  } catch (error) {
    throw new Error("Can not connect to DATA_BASE");
  }
};

import { Sequelize } from "sequelize";
import { DATABASE_URL } from "./config.js";

export const sequelize = new Sequelize(DATABASE_URL);

export const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection to database has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database: ", error);
    return process.exit(1);
  }
  return;
};

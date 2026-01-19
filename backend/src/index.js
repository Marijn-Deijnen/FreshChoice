import app from "./app.js";
import { connectToDatabase } from "./utils/db.js";
import { PORT } from "./utils/config.js";
import Levering from "./models/Levering.js";

const main = async () => {
  await connectToDatabase();
  await Levering.sync();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

main();

import app from "./app.js";
import { connectToDatabase } from "./utils/db.js";
import { PORT } from "./utils/config.js";

const main = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

main();

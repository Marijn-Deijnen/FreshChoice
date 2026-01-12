import app from "./app.js";
import { connectToDatabase } from "./utils/db.js";
import { PORT } from "./utils/config.js";
import Product from "./models/Product.js";
import Mutatie from "./models/Mutatie.js";

const main = async () => {
  await connectToDatabase();
  await Product.sync({ alter: true });
  await Mutatie.sync({ alter: true });
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

main();

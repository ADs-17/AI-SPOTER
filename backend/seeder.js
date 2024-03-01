import colors from "colors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import users from "./data/users.js";
import tools from "./data/tools.js";
import Tool from "./models/toolModel.js";
import User from "./models/userModel.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Tool.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;

    const sampleTools = tools.map((tool) => {
      return { ...tool, user: adminUser };
    });

    await Tool.insertMany(sampleTools);

    console.log(`Data imported`.green.inverse);
    process.exit();
  } catch (err) {
    console.error(`${err}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Tool.deleteMany();
    await User.deleteMany();

    console.log(`Data destroyed`.red.inverse);
    process.exit();
  } catch (err) {
    console.error(`$error`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}

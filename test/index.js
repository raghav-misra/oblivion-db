const OblivionDB = require("../dist");
const fs = require("fs");

const DB_LOCATION = `${__dirname}/db`;

(async function run() {
    // remove existing database:
    try { fs.rmdirSync(DB_LOCATION, { recursive: true }); } catch (e) {} 

    const db = await OblivionDB.initialize(DB_LOCATION, ["user", "todoItem"]);


    const createdUser = await db.create("user", { firstName: "Raghav", lastName: "Misra" });

    if (!createdUser.success) {
        throw new Error(createdUser.error);
    }

    createdUser.document.data.firstName = "Lehuy";
    createdUser.document.data.lastName = "Hoang";

    const savedUser = await createdUser.document.save();

    if (!savedUser.success) {
        throw new Error(savedUser.error);
    }
})();
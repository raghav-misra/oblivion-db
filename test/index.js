const OblivionDB = require("../dist");
const fs = require("fs");

const DB_LOCATION = `${__dirname}/db`;

(async function run() {
    // remove existing database:
    try { fs.rmdir(DB_LOCATION) } catch(e) {  } 

    const db = await OblivionDB.initialize(DB_LOCATION, ["user", "todoItem"]);


    db.create("user", { firstName: "Raghav", lastName: "Misra" });
})();
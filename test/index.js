const OblivionDB = require("../dist");
const fs = require("fs");

const DB_LOCATION = `${__dirname}/db`;

(async function run() {
    const db = await OblivionDB.initialize(DB_LOCATION, ["user", "todoItem"]);

    // const createdUser = await db.create("user", { firstName: "Raghav", lastName: "Misra" });

    // if (!createdUser.success) {
    //     throw new Error(createdUser.error);
    // }

    const user = db.find("user", { _id: "1kYoa68QIVODhXstcCfjT2lzbob1kYXMgY0UGzZIujJ1Mwe6LEuPPup6ZStpESw5" });

    if (!user.success) {
        throw new Error(user.error);
    }

    user.document.data.firstName = "Lehuy";
    user.document.data.lastName = "Hoang";

    const savedUser = await user.document.save();

    if (!savedUser.success) {
        throw new Error(savedUser.error);
    }

    // const deletedUser = await user.document.remove();

    // if (!deletedUser.success) {
    //     throw new Error(deletedUser.error);
    // }
})();
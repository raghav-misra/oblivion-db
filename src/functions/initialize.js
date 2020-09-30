import fs from "fs/promises";
import { idTracker } from "../functions/idTracker";
import { checkDir } from "../utils/checkDir";
import { makeCollectionPath } from "../utils/makeCollectionPath";

export async function initialize(dir, collections) {
    // Holds in memory copy of data:
    const data = Object.create(null);

    // Confirm folder is available:
    await checkDir(dir);

    // Tracks unique IDs for each document:
    const ids = idTracker(`${dir}/_ids`);

    // Create/restore file for each collection:
    for (const i of collections) {
        const collection = collections[i];
        const collectionPath = makeCollectionPath(dir, collection);

        /* Exists */
        try {
            await fs.access(collectionPath);
            const currentData = await fs.readFile(typePath);
            data[type] = JSON.parse(currentData.toString());
        }

        /* Create new */
        catch (error) {
            await fs.writeFile(collectionPath, "[]");
            data[type] = [];
        }
    }
}
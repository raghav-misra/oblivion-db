import { promises as fs } from "fs";
import { checkDir } from "../utils/checkDir";
import { makeCollectionPath } from "../utils/makeCollectionPath";
import { MemoryStore } from "../classes/MemoryStore";

export async function initialize(dir, collections) {
    // Confirm folder is available:
    await checkDir(dir);

    // Holds in memory copy of data:
    const store = new MemoryStore();
    await store.init(dir);

    // Create/restore file for each collection:
    for (const collection of collections) {
        const collectionPath = makeCollectionPath(dir, collection);

        /* Exists */
        try {
            await fs.access(collectionPath);
            const existingData = await fs.readFile(collectionPath);
            store.addCollection(collection, existingData);
        }

        /* Create new */
        catch (error) {
            await fs.writeFile(collectionPath, "[]");
            store.addCollection(collection)
        }
    }

    return {
        async create(collection, data) {
            return await store.create(collection, data);
        },

        find(collection, query) {
            return store.find(collection, query);
        },

        findById(collection, _id) {
            return store.find(collection, { _id });
        }
    }
}
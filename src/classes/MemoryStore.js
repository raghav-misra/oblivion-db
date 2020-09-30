import { makeCollectionPath } from "../utils/makeCollectionPath";
import { promises as fs } from "fs";
import { idTracker } from "../functions/idTracker";
import { Document } from "../classes/Document";

/* Stores in-memory copy of data */
export class MemoryStore {
    async init(dir) {
        // stores all data 
        this.data = Object.create(null);

        // reference to db directory
        this.dir = dir;

        // Tracks unique IDs for each document:
        this.ids = await idTracker(`${this.dir}/_ids`);
    }

    // add collection (optionally populate with specified data):
    addCollection(collection, existingData = null) {
        this.data[collection] = Array.isArray(this.data[collection]) ?
            this.data[collection] : [];
        
        if (Array.isArray(existingData)) {
            this.data[collection].push(...existingData);
        }
    }

    // create a new document:
    async create(collection, documentData) {
        try {
            const _id = await this.ids.create();

            this.data[collection].push({ ...documentData, _id });

            await fs.writeFile(
                makeCollectionPath(this.dir, collection),
                JSON.stringify(this.data[collection])
            );

            const document = new Document({ ...documentData, _id }, {
                _id: _id,
                store: this,
                collection
            });

            return { success: true, document };
        }

        catch (error) {
            return { success: false, error };
        }
    }

    // find doc from a query:
    find(collection, query) {
        const queriedIndex = this.data[collection].findIndex(doc => {
            let matches = true;

            for (const key in query) {
                if (query[key] !== doc[key]) {
                    matches = false;
                    break;
                }
            }
            return matches;
        });

        if (queriedIndex === -1) {
            return { success: false, error: `Document doesn't exist in collection "${collection}"!` };
        }

        const document = new Document(this.data[collection][queriedIndex], {
            _id: this.data[collection][queriedIndex]._id,
            store: this,
            collection
        });

        return { success: true, document };
    }

    // override a document's data:
    async replace(collection, _id, newData) {
        try {
            const indexToReplace = this.data[collection].findIndex(doc => doc.id === _id);

            if (indexToReplace === -1) {
                return { success: false, error: `Document doesn't exist in collection "${collection}"!` };
            }

            this.data[collection][indexToReplace] = newData;

            await fs.writeFile(
                makeCollectionPath(this.dir, collection),
                JSON.stringify(this.data[collection])
            );

            return { success: true };
        }

        catch (error) {

        }
    }

    // remove document form db
    async remove(collection, _id) {
        try {
            const indexToRemove = this.data[collection].findIndex(doc => doc.id === _id);

            if (indexToRemove === -1) {
                return { success: false, error: `Document doesn't exist in collection "${collection}"!` }
            }

            this.data[collection].splice(indexToRemove, 1);

            await fs.writeFile(
                makeCollectionPath(this.dir, collection),
                JSON.stringify(this.data[collection])
            );

            return { success: true };
        }

        catch (error) {
            return { success: false, error };
        }
    }
}
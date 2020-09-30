/* Wrapper class around a data document. */
export class Document {
    // Setup function 
    constructor(documentData, internals) {
        delete documentData._id;

        this.data = documentData; 
        
        this._internals = internals;
    }

    // reference to unique id
    get _id() { return this._internals._id; }

    // update doc:
    async save() {
        try {
            const updatedData = {
                ...this.data,
                _id: this._internals._id
            };

            return await this._internals.store
                .replace(this._internals.collection, this._internals._id, updatedData);
        }
        catch (error) {
            return { success: false, error };
        }
    }

    // remove doc:
    async remove() {
        try {
            return await this._internals.store
                .remove(this._internals.collection, this._internals._id);
        }
        catch (error) {
            return { success: false, error };
        }
    }
}
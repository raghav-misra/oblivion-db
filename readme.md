# `oblivion-db`

A local, file-based noSQL database.

## Setup

Install: `npm i oblivion-db`

```js
const OblivionDB = require("oblivion-db");

// Async IIFE
(async () => {

const db = await OblivionDB.initialize(
    "db", // Initialize at "./db"
    ["user", "todoItem"] // Collections
);

})();
```

## Creating documents:

Specify the collection and data

```js
const createOperation = await db.create(
    "user", // Add to collection "user"
    {
        name: "Raghav Misra",
        username: "raghavm"
    }
);

if (!createOperation.success) {
    // If success is false, an error property will exist.
    throw new Error(createOperation.error);
}

else {
    // the operation succeeded so we should have a document:
    const user = createOperation.document;

    // the Document's data property should hold all the raw data:

    console.log(user.data); // { name: "Raghav Misra", username: "raghavm" }
}
```

## Finding a document:

Query the DB is not an async operation because a copy of the collection is stored in memory.

Find using a query

```js
const findOperation = db.find(
    "user", // Find in collection
    { username: "raghavm" } // Query by username
);

if (!findOperation.success) {
    // If success is false, an error property will exist.
    throw new Error(createOperation.error);
}

else {
    // the operation succeeded so we should have a document:
    const user = createOperation.document;

    // the Document's data property should hold all the raw data:

    console.log(user.data); // { name: "Raghav Misra", username: "raghavm" }
}
```

Find by id (returns the same thing as `db.find`)

```js
const _id = pretendFunctionThatReturnsId();

const findByIdOperation = db.findById(
    "user", // Find in collection
     _id // specify id
);
```
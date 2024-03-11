const express = require("express");
require("dotenv").config();
require("./pkg/db");
const {
    getAll,
    getOne,
    createOne,
    updateOne,
    removeOne,
} = require("./handlers/cars");
const {
    getCarsLocal,
    createLocalCar,
    getOneLocalCar,
    updateLocalCar,
    removeLocalCar,
} = require("./handlers/local");

const api = express();
api.use(express.json());
api.get("/api/cars", getAll);
api.get("/api/cars/:id", getOne);
api.post("/api/cars", createOne);
api.put("/api/cars/:id", updateOne);
api.delete("/api/cars/:id", removeOne);

api.get("/api/local/cars", getCarsLocal);
api.get("/api/local/cars/:index", getOneLocalCar);
api.post("/api/local/cars", createLocalCar);
api.put("/api/local/cars/:index", updateLocalCar);
api.delete("/api/local/cars/:index", removeLocalCar);

api.listen(10000, (err) => {
    err ? console.log(err) : console.log("Server started on port 10000");
});

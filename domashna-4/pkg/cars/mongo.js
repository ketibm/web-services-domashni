const mongoose = require("mongoose");
const carSchema = new mongoose.Schema({
    make: String,
    model: String,
    year: Number,
    price: Number,
    // mileage: Number,
    mileage: {
        type: Number,
        validate: {
            validator: function (v) {
               return v > 2000 && v < 120000;
            },
            message: "Mileage is not in scope!"
        },
    },
});
const Car = mongoose.model("Car", carSchema, "cars");

const addCar = async(car) => {
    const newCar = new Car(car);
    return await newCar.save();
};

const removeCar = async(id) => {
    return await Car.deleteOne({ _id: id }); 
};

const updateCar = async(id, data) => {
    return await Car.updateOne({ _id: id }, data);
};

const getAllCars = async() => {
    return await Car.find({});
};

const getOneCar = async(id) => {
    return await Car.findOne({ _id: id });
};

module.exports = {
    addCar,
    removeCar,
    updateCar,
    getAllCars,
    getOneCar,
};

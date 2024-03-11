const mongoose = require("mongoose");
const carSchema = mongoose.Schema({
    make: String,
    model: String,
    year: Number,
    color: String,
    mileage: Number,
    price: Number,
});
const Car = mongoose.model("Car", carSchema, "cars");

const createCar = async(data) => {
    const car = new Car(data);
    return await car.save();
};
const getAllCars = async() => {
    return await Car.find({});
};
const getCarById = async(id) => {
    return await Car.findOne({ _id: id});
};
const getCarsSortedByMake = async() => {
    return await Car.find({}).sort({ make: 1 });
};
const getCarsByYear = async(year) => {
    return await Car.find({ year });
};
const updateCar = async(id, data) => {
    return await Car.updateOne({ _id: id }, data);
};
const deleteCar = async (id) => {
    return await Car.deleteOne({ _id: id });
};

module.exports = { createCar, getAllCars,  getCarById, getCarsSortedByMake, getCarsByYear, updateCar, deleteCar }

const {
    createCar,
    getAllCars,
    getCarById,
    getCarsSortedByMake,
    getCarsByYear,
    updateCar, 
    deleteCar
} = require("../models/model");

const createNewCar = async(req, res) => {
    try{
        await createCar(req.body);
        res.status(200).send("Car created!");
    }catch(err){
        console.log(err);
        res.status(500).send("Internal server error");
    };
};

const getCars = async(req, res) => {
    try{
        const cars = await getAllCars();
        res.status(200).send(cars);
    }catch(err){
        console.log(err);
        res.status(500).send("Internal server error");
    };
};

const getOneCar = async(req, res) => {
    try{
        const car = await getCarById(req.params.id);
        res.status(200).send(car);
    }catch(err){
        console.log(err);
        res.status(500).send("Internal server error");
    };
};

const getSortedCars = async(req, res) => {
    try{
        const sortedCars = await getCarsSortedByMake();
        res.status(200).send(sortedCars);
    }catch(err){
        console.log(err);
        res.status(500).send("Internal server error");
    };
};

const getByYear = async(req, res) => {
    try{
        const car = await getCarsByYear(req.params.year);
        res.status(200).send(car);
    }catch(err){
        console.log(err);
        res.status(500).send("Internal server error");
    };
};

const update = async(req, res) => {
    try{
        await updateCar(req.params.id, req.body);
        res.status(200).send("Car updated!");
    }catch(err){
        console.log(err);
        res.status(500).send("Internal server error");
    };
};
const removeCar = async(req, res) => {
    try{
        await deleteCar(req.params.id);
        res.status(200).send("Car deleted!");
    }catch(err){
        console.log(err);
        res.status(500).send("Internal server error");
    };
}


module.exports = { createNewCar, getCars, getOneCar, getSortedCars, getByYear, update, removeCar}
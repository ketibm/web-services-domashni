const {
    addCar,
    removeCar,
    updateCar,
    getAllCars,
    getOneCar,
} = require("../pkg/cars/mongo");


const {
  CarFieldValidate,
  CarFieldValidateOnUpdate,
  validateCar,
} = require("../pkg/cars/validate");

const getAll = async (req, res) => {
    try{
        // validateCar(req.body);
        const cars = await getAllCars();
        return res.status(200).send(cars);
    }catch(err){
        console.log(err);
        return res.status(500).send("Internal Server Error!");
    };
};

const getOne = async (req, res) => {
    try{
        const car = await getOneCar(req.params.id);
        return res.status(200).send(car);
    }catch(err){
        console.log(err);
        return res.status(500).send("Internal Server Error!");
    };
};

const createOne = async (req, res) => {
    try{
        await validateCar(req.body, CarFieldValidate);
        const newCar = await addCar(req.body);
        return res.status(200).send(newCar);
    }catch(err){
        console.log(err);
        return res.status(500).send("Internal Server Error!");
    };
};

const updateOne = async (req, res) => {
    try{
        await validateCar(req.body, CarFieldValidateOnUpdate);
        const newCar = await updateCar(req.params.id, req.body);
        return res.status(200).send(newCar);
    }catch(err){
        console.log(err);
        return res.status(500).send("Internal Server Error!");
    };
};

const removeOne = async (req, res) => {
    try{
        await removeCar(req.params.id);
        return res.status(200).send("Car deleted successfully!");
    }catch(err){
        console.log(err);
        return res.status(500).send("Internal Server Error!");
    };
};

module.exports = {
    getAll,
    getOne,
    createOne,
    updateOne,
    removeOne,
};
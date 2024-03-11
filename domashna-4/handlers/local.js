
const { addCar,
        removeCar,
        updateCar,
        getAllLocalCars,
        getCarByIndex, } = require("../pkg/cars/index");
const {
  validateCar,
  CarDataValidate,
  CarDataValidateOnUpdate,
        } = require("../pkg/cars/validate");

const getCarsLocal = async (req, res) => {
    try{
        const cars = await getAllLocalCars();
        return res.status(200).send(cars);
    }catch (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error");
  };
  };

  const createLocalCar = async (req, res) => {
    try {
      await validateCar(req.body, CarDataValidate);
       await addCar(req.body);
       return res.status(201).send("Car is created!");
    }catch (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error");
  };
};

const getOneLocalCar = async (req, res) => {
    try{
        const car = await getCarByIndex(Number(req.params.index));
         return res.status(200).send(car);
    }catch (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error");
  };
};

const updateLocalCar = async (req, res) => {
    try{
      await validateCar(req.body, CarDataValidateOnUpdate);
        await updateCar(Number(req.params.index), req.body);
        return res.status(200).send("Car is updated!");
    }catch (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error");
  };
};

const removeLocalCar = async (req, res) => {
    try{
        await removeCar(Number(req.params.index));
        return res.status(200).send("Car deleted successfully!");
    }catch (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error");
  };
};
  
  module.exports = {
    getCarsLocal,
    createLocalCar,
    getOneLocalCar,
    updateLocalCar,
    removeLocalCar,
  };
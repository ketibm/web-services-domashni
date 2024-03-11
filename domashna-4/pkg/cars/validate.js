const { Validator } = require("node-input-validator");

const CarFieldValidate = {
    make: "required|string",
    model: "required|string",
    year: "required|integer",
    price: "required|integer",
    mileage: "required|integer",
};

const CarFieldValidateOnUpdate = {
    make: "string",
    model: "string",
    year: "integer",
    price: "integer",
    mileage: "integer",
};

const CarDataValidate = {
  manufacturer: "required|string",
  model: "required|string",
  year: "required|integer",
};

const CarDataValidateOnUpdate = {
  manufacturer: "string",
  model: "string",
  year: "integer",
}

const validateCar = async (data, schema) => {
    let v = new Validator(data, schema); // data = req.body, schema = CarFieldValidate
    let e = await v.check();
    if (!e) {
      throw v.errors;
    }
  };
  
  module.exports = {
    CarFieldValidate,
    CarFieldValidateOnUpdate,
    validateCar,
    CarDataValidate,
    CarDataValidateOnUpdate,
  };
   

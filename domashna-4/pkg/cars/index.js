const { readData, writeData} = require("../files");
const DATA_SOURCE = `${__dirname}/../../data`;


const addCar = async (car) => {
    try {
      const data = await readData(DATA_SOURCE);
      data.push(car);
      await writeData(data, DATA_SOURCE);
    } catch (err) {
      throw err;
    }
  };
const removeCar = async (index) => {
    try {
      const data = await readData(DATA_SOURCE);
      const cars = data.filter((_, carIndex) => carIndex !== index);
      await writeData(cars, DATA_SOURCE);
    } catch (err) {
      throw err;
    }
  };

const updateCar = async (index, car) => {
    try {
        const data = await readData(DATA_SOURCE);
        const updatedCar = data.map((c, i) => {
            if(index === i) {
                return car;
            } else {
                return c;
            }
        });
        await writeData(updatedCar, DATA_SOURCE);
    } catch (err) {
        throw err;
      }
};

const getAllLocalCars = async () => {
    try {
      const data = await readData(DATA_SOURCE);
      return data;
    } catch (err) {
      throw err;
    }
  };
  

  const getCarByIndex = async (index) => {
    try {
      const data = await readData(DATA_SOURCE);
      if (index >= data.length) {
        return ("There is no car with that index!");
      }
      return data[index];
    } catch (err) {
      throw err;
    }
};


module.exports = {
  addCar,
  removeCar,
  updateCar,
  getAllLocalCars,
  getCarByIndex,
};
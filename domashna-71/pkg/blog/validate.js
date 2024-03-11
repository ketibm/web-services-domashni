const { Validator } = require("node-input-validator");

const Recept = {
        title: "required|string",
        ingredients: "required|string",
        preparationTime: "required|string",
        "nutritionInfo.calories": "required|numeric",
        "nutritionInfo.totalFats": "required|string",
        "nutritionInfo.carbohydrates": "required|string",
        "nutritionInfo.dietaryFiber": "required|string",
        "nutritionInfo.proteins": "required|string",
    };

const validate = async (data, schema) => {
    const v = new Validator(data, schema);
    const e = await v.check();
    if (!e) {
        throw {
            code:400,
            error: v.errors,
        };
    }
};

module.exports = {
    Recept,
    validate,
};
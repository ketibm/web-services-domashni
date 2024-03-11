const { Validator } = require("node-input-validator");

const Recipe = {
    title: "required|string",
    ingredients: "required|string",
    preparationTime: "required|string",
    calories: "required|numeric",
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
    Recipe,
    validate,
};
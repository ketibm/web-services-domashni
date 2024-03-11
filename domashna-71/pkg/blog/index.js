const mongoose = require("mongoose");

const receptSchema = mongoose.Schema({
    user_id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Account",
    },
    title: String,
    ingredients: String,
    preparationTime: String,
    nutritionInfo: {
            calories: Number,
            totalFats: String,
            carbohydrates: String,
            dietaryFiber: String,
            proteins: String,
        },
    });

const Recept = mongoose.model("Recept", receptSchema, "recepti");

const getAll = async (user_id) => {
    return await Recept.find({ user_id });
};

const getOne = async (user_id, id) => {
    return await Recept.findOne({ _id: id, user_id});
};

const getAllAlphabetically = async (user_id) => {
    return await Recept.find({user_id}).sort({title: 1});
};

const create = async (data) => {
    const recept = new Recept(data);
    return await recept.save();
};

const update = async (id, data) => {
    return await Recept.updateOne({ _id: id },  data );
};

const remove = async (id) => {
    return await Recept.deleteOne({ _id: id });
};

module.exports = {
    getAll,
    getOne,
    getAllAlphabetically,
    create,
    update,
    remove,
  };
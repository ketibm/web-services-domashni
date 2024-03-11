const mongoose = require("mongoose");

const recipeSchema = mongoose.Schema({
    user_id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Account",
    },
    title: String,
    ingredients: String,
    preparationTime: String,
    calories: Number,
});

const Recipe = mongoose.model("Recipe", recipeSchema, "recipes");

const getAll = async (user_id) => {
    return await Recipe.find({ user_id });
};

const getOne = async (user_id, id) => {
    return await Recipe.findOne({ _id: id, user_id});
};

const getAllAlphabetically = async (user_id) => {
    console.log(user_id);
    return await Recipe.find({user_id}).sort({title: 1});
};

const create = async (data) => {
    const recipe = new Recipe(data);
    return await recipe.save();
};

const update = async (id, data) => {
    return await Recipe.updateOne({ _id: id },  data );
};

const remove = async (id) => {
    return await Recipe.deleteOne({ _id: id });
};

module.exports = {
    getAll,
    getOne,
    getAllAlphabetically,
    create,
    update,
    remove,
  };
const mongoose = require("mongoose");

const accountSchema = mongoose.Schema({
    email: String,
    password: String,
    fullName: String,
    successedAttempts: {
        type: Number,
        default: 0,
    },
    failedAttempts: {
        type: Number,
        default: 0,
    },
});

const Account = mongoose.model("Account", accountSchema, "accounts");

const create = async (acc) => {
    const account = new Account(acc);
    return await account.save();
};

const getById = async (id) => {
    return await Account.findOne({ _id: id });
};

const getByEmail = async (email) => {
    return await Account.findOne({ email: email });
};

const setNewPassword = async (id, password) => {
    return await Account.updateOne({ _id: id }, { password });
};

const getAll = async () => {
    return await Account.find({});
};

const update = async (id, acc) => {
    return await Account.updateOne({ _id: id }, acc );
};

const remove = async (id) => {
    return await Account.deleteOne({ _id: id });
};

const successfulLogin = async (email) => {
    await Account.updateOne({ email }, { $inc: { successedAttempts: 1 } });
};

const unsuccessfulLogin = async (email) => {
    await Account.updateOne({ email }, { $inc: { failedAttempts: 1 } });
};

module.exports = {
    create,
    getById,
    getByEmail,
    setNewPassword,
    getAll,
    update,
    remove,
    successfulLogin,
    unsuccessfulLogin,
};
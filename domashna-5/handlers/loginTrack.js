const { getSection } = require("../pkg/config");
const mongoose = require("mongoose");

const successfulLoginSchema = new mongoose.Schema({
    email: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

const failedLoginSchema = new mongoose.Schema({
    email: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

const SuccessfulLogin = mongoose.model("SuccessfulLogin", successfulLoginSchema, "successfulLogins");
const FailedLogin = mongoose.model("FailedLogin", failedLoginSchema, "failedLogins");

const registerSuccessfulLogin = async (email) => {
    try {
        await SuccessfulLogin.create({ email });
    } catch (error) {
        console.error("Error registering successful login:", error);
        }
    };
    
const registerFailedLogin = async (email) => { 
    try {
        await FailedLogin.create({ email });
    } catch (error) {
        console.error("Error registering failed login:", error);
        }
    };
    
    module.exports = {
        registerSuccessfulLogin,
        registerFailedLogin
    };
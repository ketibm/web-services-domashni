const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Validator } = require("node-input-validator");
const {
    create,
    getByEmail,
    setNewPassword,
    successfulLogin,
    unsuccessfulLogin,
} = require("../pkg/account");
const {
    AccountLogin,
    AccountRegister,
    AccountReset,
    validate,
} = require("../pkg/account/validate");
const { getSection } = require("../pkg/config");

const login = async (req, res) => {
    try{
        await validate(req.body, AccountLogin);
        const { email, password } = req.body;
        const account = await getByEmail(email);

        if(!account) {
            return res.status(400).send("Account not found!");
        }

        if(!bcrypt.compareSync( password, account.password)) {
            await unsuccessfulLogin(email);
            return res.status(400).send("Wrong password!");
        }

        const payload = {
            fullName: account.fullName,
            email: account.email,
            id: account._id,
            exp: new Date().getTime()/1000 + 7 * 24 * 60 * 60,
        };
        const token = jwt.sign(payload, getSection("development").jwt_secret);

        if(token) {
            await successfulLogin(email)
        } 
        return res.status(200).send({ token });
    }catch(err){
        console.error("Error during login:", err);
        res.status(500).send("Internal Server Error");
    }
};

const register = async (req, res) => {
    try{
        await validate(req.body, AccountRegister);
        const { email, password, confirmPassword, fullName } = req.body;
        const exists = await getByEmail(email);

        if(exists) {
            return res.status(400).send("Account with this email already exists!"); 
        }

        if(password !== confirmPassword) {
            return res.status(400).send("Confirmed password is not the same as password!");
        }

        req.body.password = bcrypt.hashSync(req.body.password);
        const acc = await create(req.body);
        return res.status(201).send(acc);
    }catch(err){
        console.log(err);
        return res.status(err.status).send(err.error);
    }
};

const refreshToken = async (req, res) => {
    const payload = {
        ...req.auth,
        exp: new Date().getTime() / 1000 + 7 * 24 * 60 * 60,
    };
    console.log("req.auth", req.auth);
    const token = jwt.sign(payload, getSection("development").jwt_secret);
    return res.send({ token });
};

const resetPassword = async (req, res) => {
    await validate(req.body, AccountReset);
    const { email, newPassword, oldPassword } = req.body;
    const account = await getByEmail(email);
    console.log("account data", account);

    if(!account) {
        return res.status(400).send("Account with this email does not exists!"); 
    }

    if(!bcrypt.compareSync(oldPassword, account.password)) {
    return res.status(400).send("Incorrect old password!");
    }

    if(newPassword === oldPassword) {
        return res.status(400).send("New password cannot be the old password!");  
    }

    const newPasswordHashed = bcrypt.hashSync(newPassword);
    const userPasswordChanged = await setNewPassword(
        account._id.toString(),
        newPasswordHashed
    );
    console.log("userPass", userPasswordChanged);
    return res.status(200).send(userPasswordChanged);
};

const forgotPassword = async (req, res) => {
    const exists = await account.getByEmail(req.body.email);
    if (!exists) {
        return res.status(400).send("Account with this email does not exists!"); 
      };
      return res.send("OK");
    };

    module.exports = {
        login,
        register,
        resetPassword,
        forgotPassword,
        refreshToken,
      };
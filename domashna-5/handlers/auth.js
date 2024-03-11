const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const { create, getByEmail } = require("../pkg/account");
const { validate, AccountLogin, AccountRegister } = require("../pkg/account/validate");
const { getSection } = require("../pkg/config");

let successfulLogins = 0;
let unsuccessfulLogins = 0;

const registerSuccessfulLogin = async (email) => {
  try {
    successfulLogins++;
    console.log(`Successful login attempt ${successfulLogins} for email: ${email}`);
  } catch (error) {
      console.error("Error successful login:", error);
  }
};

const registerFailedLogin = async (email) => {
  try {
    unsuccessfulLogins++;
    console.log(`Failed login attempt ${unsuccessfulLogins} for email: ${email}`);
  } catch (error) {
      console.error("Error failed login:", error);
  }
};

const login = async (req, res) => {
    try {
      await validate(req.body,AccountLogin);
      const { email, password } = req.body;
      const account = await getByEmail(email);
      if (!account) {
        await registerFailedLogin(email);
        // update unseccLogin
        return res.status(400).send("Account not found!");
      }
      if (!bcrypt.compareSync(password, account.password)) {
        await registerFailedLogin(email);
        return res.status(400).send("Wrong password!");
      }
      await registerSuccessfulLogin(email);
      const payload = {
        fullName: account.fullName,
        email: account.email,
        id: account._id,
        exp: new Date().getTime() / 1000 + 7 * 24 * 60 * 60,
      };
      const token = jwt.sign(payload, getSection("development").jwt_secret);
      return res.status(200).send({ token, successfulLogins, unsuccessfulLogins })
    } catch (err) {
        res.status(500).send("Internal Server Error");
      }
};

const register = async (req, res) => {
    try {
      await validate(req.body, AccountRegister);
      const { email, password, confirmPassword, fullName } = req.body;
      const exists = await getByEmail(req.body.email);
      // proveri dali postoi korisnik
      if (exists) {
        throw {
          code: 400,
          error: "Account with this email already exists!",
        };
      }
      // proveri go confirmPassword poleto
      if (password !== confirmPassword) {
        throw {
          code: 400,
          error: "Confirm password is not the same password!",
        };
      }
      req.body.password = bcrypt.hashSync(req.body.password);
      const acc = await create(req.body);
      return res.status(201).send(acc);
    } catch (err) {
      console.log(err);
      return res.status(err.status).send(err.error);
    }
  };
  
  const resetPassword = async () => {};
  
  const forgotPassword = async () => {};
  
  const refreshToken = async () => {};
  
  module.exports = {
    login,
    register,
    resetPassword,
    forgotPassword,
    refreshToken,
  };
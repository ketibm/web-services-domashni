const express = require("express");
const { expressjwt: jwt } = require("express-jwt");
const { getSection } = require("./pkg/config");
const { login, 
        register, 
        resetPassword, 
        forgotPassword, 
        refreshToken } = require("./handlers/auth");

require("./pkg/db");

const app = express();

app.use(express.json());
app.use(
    jwt({
        secret: getSection("development").jwt_secret,
        algorithms: ["HS256"],
    }).unless({
        path: [
            "/api/auth/login",
            "/api/auth/register",
            "/api/auth/forgot-password",
            "/api/auth/reset-password", 
        ],
    })
);
app.post("/api/auth/login", login);
app.post("/api/auth/register", register);

app.listen(getSection("development").port, () => {
    console.log(`Server started at port ${getSection("development").port}`);
});
const express = require("express");
const { expressjwt: jwt} = require("express-jwt");
const { getSection } = require("./pkg/config");

const {
    login,
    register,
    refreshToken,
    resetPassword,
} = require("./handlers/auth");

const {
    getAllRecipes,
    getOneRecipe,
    getAllAlphabeticallyByTitle,
    createRecipe,
    updateRecipe,
    deleteRecipe,
} = require("./handlers/recipe")
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
app.get("/api/auth/refresh-token", refreshToken);
app.post("/api/auth/register", register);
app.post("/api/auth/reset-password", resetPassword);

app.get("/api/recipe/title", getAllAlphabeticallyByTitle);
app.get("/api/recipe", getAllRecipes);
app.post("/api/recipe", createRecipe);
app.get("/api/recipe/:id", getOneRecipe);
app.put("/api/recipe/:id", updateRecipe);
app.delete("/api/recipe/:id", deleteRecipe);


app.listen(getSection("development").port, () => {
    console.log(`Server started at port ${getSection("development").port}`);
  }); 
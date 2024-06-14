import express from "express";
import login from "../controllers/LoginController.mjs";
import verifyToken from "../middlewares/verifyTokenLogin.mjs";

//router that connects the routes with the main APP
const routerLogin = express.Router();
//route for verifying data received in the login
routerLogin.post("/api/datos", login.loginController);
//This route is protected and will only be accessed if the verifyToken middleware passes JWT token verification
routerLogin.get("/menu", verifyToken);

export default routerLogin;

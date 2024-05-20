import express from "express";
import login from "../controllers/loginController.mjs";
import verifyToken from "../middlewares/verifyTokenLogin.mjs";

//router that connects the routes with the main APP
const routerLogin = express.Router();
//route for verifying data received in the login
routerLogin.post("/api/datos", login.loginController);
//This route is protected and will only be accessed if the verifyToken middleware passes JWT token verification
routerLogin.get("/menu", verifyToken, (req, res) => {
  res.send(true); //Confirmation is sent that the data has been validated and the user will be able to enter
});

export default routerLogin;

import express from "express";
import createUsers from "../controllers/CreateUsersController.mjs";
//router that connects the routes with the main APP
const routerCreateUsers = express.Router();


routerCreateUsers.post('/menu/createUsers', createUsers.createUserController);


export default routerCreateUsers;
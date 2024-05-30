import express from "express";
import searchUser from "../controllers/userSearchController.mjs";
//router that connects the routes with the main APP
const routerSearchUser = express.Router();

//path to search the user in the database
routerSearchUser.post('/menu/searchUser', searchUser.searchUserController);


export default  routerSearchUser;
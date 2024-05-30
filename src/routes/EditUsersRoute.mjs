import express from "express";
import editUsers from "../controllers/EditUsersController.mjs";

const routerEditUsers = express.Router();


routerEditUsers.put('/menu/editUsers', editUsers.editsUsersController);
routerEditUsers.delete('/menu/editUsers', editUsers.deleteUserController);



export default routerEditUsers;
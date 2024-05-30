import express from "express";
import cors from "cors";
import db from "./src/DataBase/ConectDb.mjs";
import routerLogin from "./src/routes/LoginRoute.mjs";
import routerCreateUsers from "./src/routes/CreateUsersRoute.mjs";
import routerSearchUser from "./src/routes/searchUserRoute.mjs";
import routerEditUsers from "./src/routes/EditUsersRoute.mjs";
import routerUploadDocuments from "./src/routes/UploadDocumentsRoute.mjs";
import routerDownloadController from "./src/routes/downloadRoutes.mjs";
import dotenv from 'dotenv';
const app = express();
const PORT =  process.env.PORT ||  3080;

dotenv.config({ path: './configs.env' });
dotenv.config();


app.use(cors()); //allow the Express server to respond to HTTP requests from other domains
app.use(express.json()); // Enable JSON parsing for incoming requests
app.use('/', routerLogin); //connect  login route
app.use('/', routerCreateUsers);// connect create users route
app.use('/', routerSearchUser);// connect search user route
app.use('/', routerEditUsers);
app.use('/', routerUploadDocuments);
app.use('/', routerDownloadController);


//connect the database
db.on("error", (err) => {
  console.error("Database connection error:", err);
});

//connect the server
app.listen(PORT, (err) => {
  if (!err) {
    console.log(`Server created on port: ${PORT}`);
  }
});

import express from 'express';
import manageDocuments from '../controllers/UploadDocumentsController.mjs';
import db from '../DataBase/ConectDb.mjs';
import multer from "multer"

const routerUploadDocuments = express.Router();
const upload = multer();
routerUploadDocuments.post('/upload', upload.single('document'), manageDocuments.uploadDocumentsController);





export default routerUploadDocuments;
import express from 'express';
import manageDocuments from '../controllers/UploadDocumentsController.mjs';
import multer from 'multer';
import db from '../DataBase/ConectDb.mjs';




//Configure multer for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const routerUploadDocuments = express.Router();

routerUploadDocuments.post('/upload', upload.array('fileUpload[]'), (req, res) => manageDocuments.uploadDocumentsController(req, res, db));









export default routerUploadDocuments;
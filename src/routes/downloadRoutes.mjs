import express from 'express'
import downloadController from '../controllers/downloadController.mjs';


const routerDownloadController = express.Router();

//Route to download a document
routerDownloadController.get('/download', downloadController.downloadDocument);
export default  routerDownloadController;

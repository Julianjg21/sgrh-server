import db from "../DataBase/ConectDb.mjs";
import multer from "multer";

const upload = multer();

const manageDocuments = {};

manageDocuments.uploadDocumentsController = async (req, res) => {
  const column = req.body.column;
  const idUser = req.body.idUser;
  const file = req.file ? req.file.buffer : null;

  console.log(req.body.column);
  console.log(req.body.idUser);
  console.log(req.file ? req.file.buffer : "No file buffer");

  if (!file) {
    return res.status(400).json({ message: "No files were uploaded." });
  }

  try {
    const query = `UPDATE employeesDocumentation SET ${column} = ? WHERE employeeDocumentationId = ?`;

    db.query(query, [file, idUser], (error, results) => {
      console.log("Archivo guardado");
      if (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Error uploading files", error });
      } else {
        res.status(200).json({ message: "Files uploaded successfully" });
      }
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Error uploading files", error });
  }
};

export default manageDocuments;

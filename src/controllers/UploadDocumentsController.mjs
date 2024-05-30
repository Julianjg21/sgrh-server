import db from "../DataBase/ConectDb.mjs";

const manageDocuments = {};

manageDocuments.uploadDocumentsController = (req, res, db) => {
  const column = req.body.column;
  const rowId = req.body.idUser; 

  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files were uploaded." });
    }

    //Combine all files into a single buffer
    const combinedBuffer = Buffer.concat(req.files.map((file) => file.buffer));

   
    const query = `UPDATE employeesDocumentation SET ${column} = ? WHERE employeeDocumentationId = ?`;

    db.query(query, [combinedBuffer, rowId], (error, results) => {
      if (error) {
        console.error("Error:", error);
        return res
          .status(500)
          .json({ message: "Error uploading files", error });
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

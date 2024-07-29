import db from "../DataBase/ConectDb.mjs";

const downloadController = {};

downloadController.downloadDocument = async (req, res) => {
  const column = req.query.column;
  const idUser = req.query.idUser;
  console.log(column, idUser);

  if (!column || !idUser) {
    return res.status(400).json({ message: "Missing required parameters" });
  }

  const query = `SELECT ${column} FROM employeesDocumentation WHERE employeeDocumentationId = ?`;

  db.query(query, [idUser], (error, results) => {
    if (error) {
      console.error("Error:", error);
      return res.status(500).json({ message: "Error retrieving file", error });
    }
     //check if the document exists in the database
    if (results.length === 0) {
      return res.status(404).json({ message: "File not found" });
    }

    const fileBuffer = results[0][column];
    
    // Set the appropriate headers for file download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=${column}_${idUser}.pdf`);

    res.send(fileBuffer);
  });
};

export default downloadController;

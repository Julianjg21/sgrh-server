import db from "../DataBase/ConectDb.mjs";

const downloadController = {};

downloadController.downloadDocument = (req, res) => {
  const column = 'AdditionalDocuments'; //Column from which the document will be obtained
  const identification = req.params.identification; // User ID

  const query = `SELECT ${column} FROM employeesDocumentation WHERE identification = ?`;

  db.query(query, [identification], (error, results) => {
    if (error) {
      console.error("Error:", error);
      return res.status(500).json({ message: "Error fetching document", error });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Document not found" });
    }

    const document = results[0][column];

   //Set content type
    res.setHeader('Content-Type', 'application/pdf');
   //Send the document as a blob
    const blob = Buffer.from(document, 'base64');
    res.send(blob);
  });
};

export default downloadController;

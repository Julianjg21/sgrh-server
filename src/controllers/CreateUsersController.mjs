import db from "../DataBase/ConectDb.mjs";
import bcrypt from "bcrypt";
const createUsers = {};

createUsers.createUserController = (req, res) => {
  const {
    userNames,
    lastNames,
    typeIdentification,
    identification,
    phoneNumber,
    birthdate,
    email,
    bank,
    accountNumber,
  } = req.body;

  //Generate hash of the password
  bcrypt.hash(identification, 10, (err, hash) => {
    if (err) {
      console.error("Error generating hash:", err);
      return res.status(500).json({ error: "Error generating hash" });
    }

    const passwordHash = hash;

    //Insert the password into the password table
    db.query(
      "INSERT INTO passwords (password) VALUES (?)",
      [passwordHash],
      (error, results) => {
        if (error) {
          console.error("Error entering password:", error);
          return res.status(500).json({ error: "Error entering password" });
        }

        const passwordId = results.insertId;

        //Insert user data into userRegistration table
        const query =
          "INSERT INTO userRegistration (userNames, lastNames, typeIdentification, identification, phoneNumber, birthDate, email, bank, accountNumber, passwordId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        db.query(
          query,
          [
            userNames,
            lastNames,
            typeIdentification,
            identification,
            phoneNumber,
            birthdate,
            email,
            bank,
            accountNumber,
            passwordId,
          ],
          (error, results, fields) => {
            if (error) {
              console.error("Error executing query:", error);
              return res.status(500).json({ error: "Error executing query" });
            }
            res.status(200).json({ message: "Successfully created user" });
          }
        );
      }
    );
  });
};

export default createUsers;

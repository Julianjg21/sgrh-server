import db from "../DataBase/ConectDb.mjs";

const editUsers = {};

editUsers.editsUsersController = (req, res) => {
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
    userRegistrationId,
  } = req.body;

  console.log("Update", userRegistrationId);

  const query =
    "UPDATE userRegistration SET userNames = ?, lastNames = ?, typeIdentification = ?, identification = ?, phoneNumber = ?, birthDate = ?, email = ?, bank = ?, accountNumber = ?  WHERE userRegistrationId = ? ";

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
      userRegistrationId,
    ],
    (error, results, fields) => {
      if (error) {
        console.error(
          "Error executing query to update the user in the db:",
          error
        );
        return res
          .status(500)
          .json({
            error: "Error ejecutar query para eliminar el usuario en la db",
          });
      }
      res.status(200).json({ message: "The user has been updated" });
    }
  );
};

editUsers.deleteUserController = (req, res) => {
  const { userRegistrationId } = req.body;
  console.log("delete:", userRegistrationId);

  db.query(
    "DELETE FROM userRegistration WHERE userRegistrationId = ?",
    [userRegistrationId],
    (error, results, fields) => {
      if (error) {
        console.error(
          "Error executing query to delete the user in the db:",
          error
        );
        return res
          .status(500)
          .json({
            error: "Error ejecutar query para eliminar el usuario en la db",
          });
      }
      res.status(200).json({ message: "the user has been deleted" });
    }
  );
};

export default editUsers;

import db from "../DataBase/ConectDb.mjs";

const searchUser = {};

searchUser.searchUserController = (req, res) => {
  const { name, typeIdentification, identification } = req.body;

  db.query(
    "SELECT * FROM userRegistration WHERE identification = ?",
    [identification],
    async (err, userResults) => {
      const userFound = userResults[0];
      if (err) {
        return res
          .status(500)
          .send("Error, the server could not search for the user", err);
      }
      if (userResults.length === 0) {
        return res.status(401).send("the user does not exist in the database");
        }
        
      res.status(200).send(userFound);
    }
  );
};

export default searchUser;

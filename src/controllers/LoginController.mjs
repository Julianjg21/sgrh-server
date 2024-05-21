import { compare } from "bcrypt";
import JWT from "jsonwebtoken";
import db from "../DataBase/ConectDb.mjs";
import dotenv from 'dotenv';
dotenv.config({ path: './configs.env' });

//Object that saves the functions created in the controller
const login = {};

//export the secret password of the token
export const jwtSecret = process.env.JWT_SECRET;

//function that verifies the received data and creates the JWT token
login.loginController = (req, res) => {
  const { email, password } = req.body; //The password and email sent by the user are extracted
  db.query(
    "SELECT * FROM userRegistration WHERE email = ?", //Verify that the email exists in the database
    [email],
    async (err, userResults) => {
      if (err) {
        return res.status(500).send("Error searching for email");
      }
      if (userResults.length === 0) {
        return res.status(401).send("Incorrect user email");
      }
      const user = userResults[0];
      //verify that the password entered matches the password linked to the user id
      db.query(
        "SELECT password FROM passwords WHERE passwordId = ?",
        [user.userRegistrationId],
        async (err, passwordResults) => {
          if (err) {
            return res.status(500).send("Error when searching for password id");
          }
          if (passwordResults === 0) {
            return res.status(401).send("passwordId not found");
          }
          //save the password linked to the user id
          const passwordFound = passwordResults[0];
          //verify that the password entered matches the password registered in the database
          const passwordMatch = await compare(password, passwordFound.password);
          //if the password matches, the security token will be created
          if (passwordMatch) {
            const token = JWT.sign(
              { id: user.userRegistrationId, email: user.email },
              jwtSecret,
              { expiresIn: "15m" }
            );
            return res.status(200).send({ token }); //the token is sent to verify it in the middleware
          } else {
            return res.status(401).send("Incorrect password");
          }
        }
      );
    }
  );
};
export default login;

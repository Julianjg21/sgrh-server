import JWT from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config({ path: './configs.env' });

//function that verifies that the token is valid and correct
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(403).send("Token not provided");
  }

  JWT.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send("Invalid token"); //Handle token verification error
    }

    req.user = decoded; //We save the decoded object in req.user

    next(); //continue with the next process
  });
};

export default verifyToken;

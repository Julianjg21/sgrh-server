import { createConnection } from "mysql2";
import configs from "../../configs.mjs";

//create connection to the database
const db = createConnection(configs.database);

db.connect((err) => {
  if (err) throw err;
  console.log("Connection to the database established!!");
});

export default db;

import Routes from "./v1/routes/Routes.js";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { swaggerDocs as V1SwaggerDocs } from "./v1/swagger.js";
import connectDB from "./DB/db.js";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send({ message: "Express REST API" });
});
app.use("/api/v1", Routes);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, async () => {
  try {
    await connectDB();
    console.log(`Server listening on port ${server.address().port}`);
    V1SwaggerDocs(app, PORT);
  } catch (error) {
    if (error) return console.log(`Error: ${error}`);
  }
});

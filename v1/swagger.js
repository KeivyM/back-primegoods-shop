import swaggerJSDoc from "swagger-jsdoc";
import SwaggerUi from "swagger-ui-express";
import chalk from "chalk";

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: { title: "titulo", version: "1.0.0" },
  },
  apis: ["v1/routes/*.js", "./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

export const swaggerDocs = (app, port) => {
  app.use("/api/v1/docs", SwaggerUi.serve, SwaggerUi.setup(swaggerSpec));
  app.get("/api/v1/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
  console.log(
    chalk.yellow(
      `📑 Docs are available at http://localhost:${port}/api/v1/docs`
    )
  );
};

import { Router } from "express";
import swaggerUi from "swagger-ui-express"
import swaggerJSDoc from "swagger-jsdoc";
import { swaggerDef } from "../docs/swaggerDef.js";

const specs = swaggerJSDoc({...swaggerDef, apis:["./payments/routes/*.js"]})
const docsRouter = Router()
docsRouter.use("/", swaggerUi.serve)
docsRouter.get(
    '/',
    swaggerUi.setup(specs, {
      explorer: true,
    })
  );

export default docsRouter
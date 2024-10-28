// import { version } from "../../package.json";
import config from "../config/config.js";

export const swaggerDef = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "TozaHub Payment API",
      version: "1.0.0",
      description:
        "This API facilitates secure and efficient tax collection payments, ensuring a seamless transaction experience for both taxpayers and county governments of Kenya",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Mmust Ihub",
        url: "https://ihub.mmust.ac.ke",
        email: "ihub@mmust.ac.ke",
      },
    },
    servers: [
      {
        url: config.base_url,
      },
    ],
  },
};


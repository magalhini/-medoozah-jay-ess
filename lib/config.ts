import Medusa from "@medusajs/medusa-js";

// TODO: get this in an env variable
const medusa = new Medusa({ baseUrl: "http://localhost:9000", maxRetries: 3 });

export default medusa;

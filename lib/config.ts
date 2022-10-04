import Medusa from "@medusajs/medusa-js";

// TODO: get this in an env variable. Look into nextConfig.env for Next.js
const medusa = new Medusa({ baseUrl: "http://localhost:9000", maxRetries: 3 });

export default medusa;

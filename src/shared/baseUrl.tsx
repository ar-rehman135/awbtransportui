export const for_production: boolean = process.env.REACT_APP_USE_PRODUCTION === "true";
export const for_production1: boolean = process.env.REACT_APP_USE_PRODUCTION1 === "true";

const envBaseUrl = process.env.REACT_APP_BASE_URL?.trim();
export const baseUrl = envBaseUrl && envBaseUrl.length > 0 ? envBaseUrl : "http://127.0.0.1:5000/";
export const apiSecret = process.env.REACT_APP_API_SECRET || "";

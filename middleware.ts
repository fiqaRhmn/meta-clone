export { default } from "next-auth/middleware";

// Secure only the homepage ("/") route
export const config = { matcher: ["/"] };

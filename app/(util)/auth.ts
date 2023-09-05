import { Jwt } from "jsonwebtoken";

export function validateJWT(jwt: ) {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded.userId);
      } catch(err) {
        console.error('Invalid token');
      }
}
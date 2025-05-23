import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const TOKEN_SECRET = process.env.TOKEN_SECRET;
export function createToken(id: number, user: string) {
  try {
    if (!id || !user) {
      return false;
    }
    return jwt.sign({ id, user }, TOKEN_SECRET || "AgilTech");
  } catch (error) {
    return false;
  }
}

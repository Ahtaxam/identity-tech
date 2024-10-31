import prisma from "../../../../lib/prisma"; // Import Prisma client
import logger from "../../../../lib/logger"; // Import your logger
import { verifyToken } from "../../../utils/verifyToken";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      logger.info("Fetching all users");
      const { isAdmin } = verifyToken(req);

      if (!isAdmin) {
        return res
          .status(403)
          .json({ message: "You don't have permission to view users" });
      }

      const users = await prisma.user.findMany();

      logger.info("Users fetched successfully");

      return res
        .status(200)
        .json({ message: "Users fetched successfully", users });
    } catch (error) {
      logger.error("Error: Fetching users");
      console.error("Error fetching users:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}

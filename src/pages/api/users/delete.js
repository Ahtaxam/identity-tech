import prisma from "../../../../lib/prisma";
import logger from "../../../../lib/logger";
import { verifyToken } from "../../../utils/verifyToken";

export default async function handler(req, res) {
  if (req.method === "DELETE") {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ message: "ID is required." });
    }

    const { id: adminId, isAdmin } = verifyToken(req);

    if (id === adminId) {
      return res
        .status(403)
        .json({ message: "You can't delete you account own" });
    }

    if (!isAdmin) {
      return res
        .status(403)
        .json({ message: "You don't have permission to Delete user" });
    }

    try {
      await prisma.user.delete({
        where: { id: Number(id) },
      });
      logger.info(`User with ID ${id} deleted successfully`);
      return res.status(200).json({ message: "User deleted successfully." });
    } catch (error) {
      logger.error("Error deleting user:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}

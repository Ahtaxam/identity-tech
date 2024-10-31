import prisma from "../../../../lib/prisma";
import logger from "../../../../lib/logger";
import { verifyToken } from "../../../utils/verifyToken";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { isAdmin } = verifyToken(req);

    if (!isAdmin) {
      return res
        .status(403)
        .json({ message: "You don't have permission to make admin" });
    }
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ message: "ID is required." });
    }

    try {
      const updatedUser = await prisma.user.update({
        where: { id: Number(id) },
        data: { isAdmin: true },
      });
      logger.info(`User with ID ${id} is now an admin.`);
      return res.status(200).json(updatedUser);
    } catch (error) {
      logger.error("Error making user admin:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}

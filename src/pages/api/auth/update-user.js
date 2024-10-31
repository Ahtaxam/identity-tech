import prisma from "../../../../lib/prisma";
import logger from "../../../../lib/logger";
import bcrypt from "bcrypt";
import { verifyToken } from "../../../utils/verifyToken";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, password } = req.body;
    const { id } = await verifyToken(req);

    if (!name) {
      return res.status(400).json({ message: "Name Is required." });
    }

    try {
      logger.info("Start updating user");

      const updateData = { name };

      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        updateData.password = hashedPassword;
      }

      const updatedUser = await prisma.user.update({
        where: { id: Number(id) },
        data: updateData,
      });

      logger.info("User updated successfully");

      return res
        .status(200)
        .json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
      logger.error("Error: Updating user");
      console.error("Error updating user:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}

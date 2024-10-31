import prisma from "../../../../lib/prisma";
import logger from "../../../../lib/logger";
import { sendVerificationEmail } from "../../../../lib/sendVerificationEmail";
import { verifyToken } from "../../../utils/verifyToken";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email } = await verifyToken(req);

  if (!email) {
    return res.status(400).json({ message: "Email is required." });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      logger.error("User not found");
      return res.status(404).json({ message: "User not found." });
    }

    const token = Math.floor(100000 + Math.random() * 900000);
    const expireAt = new Date(Date.now() + 2 * 60 * 1000);

    await prisma.user.update({
      where: { email },
      data: {
        twoFactorToken: token,
        expireAt: expireAt,
      },
    });

    await sendVerificationEmail(email, user, token);

    logger.info("Verification code resent to:", email);
    return res
      .status(200)
      .json({ message: "Verification code sent successfully." });
  } catch (error) {
    logger.error("Error resending verification code:", error);
    return res
      .status(500)
      .json({ message: "Error resending verification code." });
  }
}

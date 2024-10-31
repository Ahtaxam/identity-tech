// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from "../../../../lib/prisma";
import bcrypt from "bcrypt";
import logger from "../../../../lib/logger";
import { sendVerificationEmail } from "../../../../lib/sendVerificationEmail";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, password } = req.body;

  logger.info("Start logging user");

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    logger.error("Invalid username or password");
    return res.status(404).json({ message: "Invalid username or password" });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    logger.error("Password mismatch error");
    return res.status(404).json({ message: "Invalid username or password" });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, isAdmin: user.isAdmin },
    process.env.JWT_SECRET,
    {
      expiresIn: "20h",
    }
  );

  try {
    logger.info("User authenticated successfully!");
    const twoFactorCode = Math.floor(100000 + Math.random() * 900000);
    const expireAt = new Date(Date.now() + 2 * 60 * 1000);

    await prisma.user.update({
      where: { email },
      data: { twoFactorToken: twoFactorCode, expireAt },
    });

    await sendVerificationEmail(email, user, twoFactorCode);

    logger.info(`for 2FA email sent to ${email}`);

    res.status(200).json({
      message: "LoggedIn Successfully",
      token,
    });
  } catch (error) {
    logger.warn("Error: User authentication failed", error);
    res.status(500).json({ error: "Error authenticating user" });
  }
}

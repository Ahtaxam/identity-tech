// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from "../../../../lib/prisma";
import bcrypt from "bcrypt";
import logger from "../../../../lib/logger";
import { sendVerificationEmail } from "../../../../lib/sendVerificationEmail";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.findFirst({
    where: { email },
  });

  if (user) {
    res.status(409).json({ message: "User already exist" });
  }

  try {
    logger.info("Start creating user");

    const twoFactorCode = Math.floor(100000 + Math.random() * 900000);
    const expireAt = new Date(Date.now() + 2 * 60 * 1000);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        twoFactorToken: twoFactorCode,
        expireAt,
        isAdmin: process.env.SMTP_USER === email,
      },
    });
    const token = jwt.sign(
      { id: user.id, email: user.email, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      {
        expiresIn: "20h",
      }
    );

    logger.info("User created successfully!");

    await sendVerificationEmail(email, user, twoFactorCode);

    res.status(200).json({
      message: "User created successfully!",
      token,
    });
  } catch (error) {
    console.log(error);

    logger.warn("Error: User not created");
    res.status(500).json({ error: "Error creating user" });
  }
}

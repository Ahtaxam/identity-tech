import prisma from "../../../../lib/prisma";
import logger from "../../../../lib/logger";
import { serialize } from "cookie";
import { setCookie } from "cookies-next";
import { verifyToken } from "../../../utils/verifyToken";

// const setAuthCookie = (res, value) => {

//   const cookie = serialize('authCookie', value, {
//       httpOnly: true,
//       secure:true,
//       maxAge: 60 * 60 * 24,
//       path: '/',
//   });

//   res.setHeader('Set-Cookie', cookie);
// };
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { code } = req.body;

  const { email } = await verifyToken(req);

  if (!code) {
    return res.status(400).json({ message: "code are required." });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      logger.error("User not found");
      return res.status(404).json({ message: "User not found." });
    }

    const isTokenValid = user.twoFactorToken === parseInt(code);
    const isTokenExpired =
      user.expireAt && new Date() > new Date(user.expireAt);

    if (isTokenExpired) {
      logger.error("Verification code expired");
      return res
        .status(401)
        .json({ message: "Verification code has expired." });
    }

    if (isTokenValid) {
      await prisma.user.update({
        where: { email },
        data: { twoFactorToken: null, expireAt: null },
      });

      logger.info("User verified successfully:", email);
      setCookie("authCookie", true, {
        req,
        res,
        maxAge: 60 * 60 * 24,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });

      return res
        .status(200)
        .json({ message: "Account verified successfully!", data: user });
    } else {
      logger.error("Verification code mismatch");
      return res.status(401).json({ message: "Invalid verification code." });
    }
  } catch (error) {
    logger.error("Error verifying user:", error);
    return res.status(500).json({ message: "Error verifying account." });
  }
}

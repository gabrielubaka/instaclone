import express from "express";
import {
  registerUser,
  loginUser,
  authenticateUser,
  resendEmailVerificationLink,
  verifyEmailAccount,
  sendForgotPaswordMail,
  resetPassword,
} from "../controller/user.js";
import { verifyToken, authoriseRoles } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post(
  "/resend-verification-email",
  verifyToken,
  authoriseRoles("user", "admin"),
  resendEmailVerificationLink
);
router.post("/sendforgot-password-mail", sendForgotPaswordMail);

//get
router.get(
  "/user",
  verifyToken,
  authoriseRoles("user", "admin"),
  authenticateUser
);

router.patch(
  "/verify-account/:userId/:verificationToken",
  verifyToken,
  authoriseRoles("user", "admin"),
  verifyEmailAccount
);

router.patch("/reset-password/:userId/:passwordToken", resetPassword);

export default router;

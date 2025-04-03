import nodemailer from "nodemailer";
import Mailgen from "mailgen";
import createHttpError from "http-errors";



export const sendMail = async ({
    to,
    subject,
    intro,
    fullname,
    btnText,
    instructions,
    link,
}) => {
  if(!to || !subject || !intro) {
    throw createHttpError(500, 
        "email receipient, subject or intro is missing"
    );
  }
  try {
    const mailGenerator = new Mailgen({
      theme: "default",
      product: {
        name: "Instashots",
        link:
          process.env.CLIENT_URL ||
          "https://instaclone-mu.vercel.app",
      },
    });
    const email = {
        body: {
            name: fullname,
            intro,
            action: {
                instructions: instructions || "To get started Instashots, please click the button below",
                button: {
                    text: btnText || "Visit",
                    link: link || process.env.CLIENT_URL,
                },
            },
            outro: "Need help, or have have questions? Reply to this email"
        },
    };
    const emailBody = mailGenerator.generate(email);
    //validate smtp config
    if(!process.env.EMAIL || !process.env.EMAIL_PASSWORD) {
        throw createHttpError(500, "Email service not properly configured");
    }
    //create transporter
    const transporter = nodemailer.createTransport({
        service: "gamil",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL,
            pass:process.env.EMAIL_PASSWORD,
        }
    })
    //connecting to gmail service
    await transporter.verify().catch((error) =>{
        throw createHttpError(
            500,
            `failed to connect to email service: ${error.message}`
        );
    });
    //send email
    const info = await transporter.sendMail({
        from: "Instashots",
        to: to,
        subject: subject,
        html: emailBody,
    });
    return {
        success: true,
        message: "Email sent successfully",
        messageId: info.messageId,
    };

  } catch (error) {
    console.error("Email service error", error);
    throw createHttpError(500, "Failed to send email. Try again")
  }
};
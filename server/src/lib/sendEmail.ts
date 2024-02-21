import nodemailer from "nodemailer";

export const sendEmail = async (data?: any) => {
  const transporter = nodemailer.createTransport({
    host: "1.2.3.4",
    port: 465,
    secure: true,
    auth: {
      user: "",
      pass: "",
    },
  });
  try {
    const info = await transporter.sendMail({
      from: "Confirmation <>",
      to: "",
      subject: "Subject",
      html: `
      <html>
      <body>
      <h1>Heading 1</h1>
      </body>
      </html>
      `,
    });
    console.log(info);
    return true;
  } catch (err) {
    console.log("err: ", err);
    return false;
  }
};

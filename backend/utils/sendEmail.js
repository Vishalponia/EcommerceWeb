const transporter = require("../config/mail");

const sendWelcomeEmail = async (name, email) => {
  try {
    await transporter.sendMail({
      from: `"Ecommece"<{process.env.EMAIL_USER}>`,
      to: email,
      subject: "🎉 Welcome to our Ecommerce",
      html: `
        <h2>Hello ${name},</h2>

        <p>Welcome to <b>EcommerceWebsite</b>

        <p>Your account has been created successfully.</p>

        <h3>You can now:</h3>

        <ul>
            <li>Browse Products</li>
            <li>Add Products to Cart</li>
            <li>Place Orders</li>
            <li>Track Orders</li>
        </ul>

        <p>Happy Shopping ❤️</p>
        <p>Team Ecommerce</p>

        <br>
        <b>Vishal Ponia </b>
      `,
    });

    console.log("✅ Welcome Email Sent");
  } catch (error) {
    console.log("❌ Email Error:", error.message);
  }
};

module.exports = sendWelcomeEmail;
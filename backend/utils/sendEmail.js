const transporter = require("../config/mail");


// =====================================================
// 1. WELCOME EMAIL
// =====================================================

const sendWelcomeEmail = async (name, email) => {
  try {
    await transporter.sendMail({
      from: `"Ecommerce" <${process.env.EMAIL_USER}>`,

      to: email,

      subject: "🎉 Welcome to our Ecommerce",

      html: `
        <div style="
          font-family: Arial, sans-serif;
          max-width: 600px;
          margin: auto;
          padding: 20px;
        ">

          <h2 style="color: #2563eb;">
            Welcome to Ecommerce 🎉
          </h2>

          <p>
            Hello <strong>${name}</strong>,
          </p>

          <p>
            Your account has been created successfully.
          </p>

          <h3>You can now:</h3>

          <ul>
            <li>Browse Products</li>
            <li>Add Products to Cart</li>
            <li>Place Orders</li>
            <li>Track Orders</li>
          </ul>

          <p>
            Happy Shopping ❤️
          </p>

          <p>
            Team Ecommerce
          </p>

          <br />

          <strong>Vishal Ponia</strong>

        </div>
      `,
    });

    console.log("✅ Welcome Email Sent");

  } catch (error) {

    console.log(
      "❌ Welcome Email Error:",
      error.message
    );

  }
};


// =====================================================
// 2. ORDER CONFIRMATION EMAIL
// =====================================================

const sendOrderConfirmationEmail = async (
  name,
  email,
  order
) => {

  try {

    const productList = order.products
      .map((item) => {

        return `
          <tr>

            <td style="
              padding: 10px;
              border-bottom: 1px solid #ddd;
            ">
              ${item.product?.name || "Product"}
            </td>

            <td style="
              padding: 10px;
              border-bottom: 1px solid #ddd;
            ">
              ${item.quantity}
            </td>

            <td style="
              padding: 10px;
              border-bottom: 1px solid #ddd;
            ">
              ₹${item.price}
            </td>

          </tr>
        `;

      })
      .join("");


    await transporter.sendMail({

      from: `"Ecommerce" <${process.env.EMAIL_USER}>`,

      to: email,

      subject: "✅ Order Confirmed - Ecommerce",

      html: `

        <div style="
          font-family: Arial, sans-serif;
          max-width: 650px;
          margin: auto;
          padding: 20px;
        ">

          <h1 style="color: #2563eb;">
            Order Confirmed 🎉
          </h1>

          <p>
            Hello <strong>${name}</strong>,
          </p>

          <p>
            Thank you for shopping with
            <strong>Ecommerce</strong>.
          </p>

          <p>
            Your order has been successfully placed.
          </p>


          <div style="
            background: #f3f4f6;
            padding: 15px;
            border-radius: 10px;
            margin: 20px 0;
          ">

            <p>
              <strong>Order ID:</strong>
              ${order._id}
            </p>

            <p>
              <strong>Payment Method:</strong>
              ${order.paymentMethod}
            </p>

            <p>
              <strong>Status:</strong>
              ${order.orderStatus}
            </p>

          </div>


          <h2>
            Order Details
          </h2>


          <table style="
            width: 100%;
            border-collapse: collapse;
          ">

            <thead>

              <tr style="
                background: #f3f4f6;
              ">

                <th style="padding: 10px; text-align: left;">
                  Product
                </th>

                <th style="padding: 10px; text-align: left;">
                  Quantity
                </th>

                <th style="padding: 10px; text-align: left;">
                  Price
                </th>

              </tr>

            </thead>


            <tbody>

              ${productList}

            </tbody>

          </table>


          <h2 style="margin-top: 25px;">

            Total Amount:

            <span style="color: #2563eb;">
              ₹${order.totalAmount}
            </span>

          </h2>


          <h2>
            Shipping Address
          </h2>

          <p>

            ${order.shippingAddress.fullName}
            <br />

            ${order.shippingAddress.address}
            <br />

            ${order.shippingAddress.city},
            ${order.shippingAddress.state}
            -
            ${order.shippingAddress.pincode}

            <br />

            Phone:
            ${order.shippingAddress.phone}

          </p>


          <p style="margin-top: 30px;">

            We will notify you when your order
            is delivered.

          </p>


          <p>

            Thank you for shopping with us ❤️

          </p>

          <strong>
            Team Ecommerce
          </strong>

        </div>

      `,
    });


    console.log(
      "✅ Order Confirmation Email Sent"
    );

  } catch (error) {

    console.log(
      "❌ Order Confirmation Email Error:",
      error.message
    );

  }
};


// =====================================================
// 3. ORDER DELIVERED EMAIL
// =====================================================

const sendOrderDeliveredEmail = async (
  name,
  email,
  order
) => {

  try {

    await transporter.sendMail({

      from: `"Ecommerce" <${process.env.EMAIL_USER}>`,

      to: email,

      subject: "📦 Your Order Has Been Delivered",

      html: `

        <div style="
          font-family: Arial, sans-serif;
          max-width: 650px;
          margin: auto;
          padding: 20px;
        ">

          <h1 style="color: #16a34a;">
            Order Delivered 🎉
          </h1>


          <p>
            Hello <strong>${name}</strong>,
          </p>


          <p>

            Great news!

            Your order from
            <strong>Ecommerce</strong>

            has been successfully delivered.

          </p>


          <div style="
            background: #f0fdf4;
            border: 1px solid #bbf7d0;
            padding: 20px;
            border-radius: 10px;
            margin: 20px 0;
          ">

            <p>

              <strong>
                Order ID:
              </strong>

              ${order._id}

            </p>


            <p>

              <strong>
                Total Amount:
              </strong>

              ₹${order.totalAmount}

            </p>


            <p>

              <strong>
                Status:
              </strong>

              Delivered

            </p>

          </div>


          <p>

            We hope you enjoyed your
            shopping experience with us.

          </p>


          <p>

            Thank you for shopping with
            <strong>Ecommerce</strong> ❤️

          </p>


          <strong>
            Team Ecommerce
          </strong>

        </div>

      `,
    });


    console.log(
      "✅ Order Delivered Email Sent"
    );

  } catch (error) {

    console.log(
      "❌ Order Delivered Email Error:",
      error.message
    );

  }
};


// =====================================================
// EXPORT
// =====================================================

module.exports = {

  sendWelcomeEmail,

  sendOrderConfirmationEmail,

  sendOrderDeliveredEmail,

};
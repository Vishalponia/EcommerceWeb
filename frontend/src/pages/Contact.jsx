import { useState } from "react";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaPaperPlane,
  FaWhatsapp,
} from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, subject, message } = formData;

    if (!name || !email || !subject || !message) {
      alert("Please fill all fields.");
      return;
    }

    const whatsappMessage = `
New Contact Form Message

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
    `;

    const whatsappURL = `https://wa.me/919389751483?text=${encodeURIComponent(
      whatsappMessage
    )}`;

    window.open(whatsappURL, "_blank");

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="bg-gray-50">

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-6 py-24 text-center">

          <h1 className="text-5xl md:text-6xl font-bold">
            Contact Us
          </h1>

          <p className="mt-6 text-lg text-blue-100 max-w-3xl mx-auto">
            We'd love to hear from you. Whether you have a question about
            your order, products, or anything else, our team is ready to help.
          </p>

        </div>
      </section>


      {/* Contact Cards */}
      <section className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Address */}
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition">

            <FaMapMarkerAlt className="mx-auto text-4xl text-blue-600" />

            <h3 className="text-xl font-bold mt-5">
              Address
            </h3>

            <p className="text-gray-600 mt-3">
              Hathras
              <br />
              Uttar Pradesh, India
            </p>

          </div>


          {/* Phone */}
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition">

            <FaPhoneAlt className="mx-auto text-4xl text-green-600" />

            <h3 className="text-xl font-bold mt-5">
              Phone
            </h3>

            <p className="text-gray-600 mt-3">
              +91 9389751483
            </p>

          </div>


          {/* Email */}
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition">

            <FaEnvelope className="mx-auto text-4xl text-red-500" />

            <h3 className="text-xl font-bold mt-5">
              Email
            </h3>

            <p className="text-gray-600 mt-3">
              support@ecommerce.com
            </p>

          </div>


          {/* Working Hours */}
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition">

            <FaClock className="mx-auto text-4xl text-orange-500" />

            <h3 className="text-xl font-bold mt-5">
              Working Hours
            </h3>

            <p className="text-gray-600 mt-3">
              Mon - Sat
              <br />
              9:00 AM - 7:00 PM
            </p>

          </div>

        </div>

      </section>


      {/* Contact Form + Map */}
      <section className="max-w-7xl mx-auto px-6 pb-20">

        <div className="grid lg:grid-cols-2 gap-10">

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">

            <h2 className="text-3xl font-bold mb-8">
              Send us a Message
            </h2>

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* Name */}
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full border rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />


              {/* Email */}
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="w-full border rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />


              {/* Subject */}
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                className="w-full border rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />


              {/* Message */}
              <textarea
                rows="6"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                className="w-full border rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>


              {/* WhatsApp Button */}
              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition"
              >
                <FaWhatsapp className="text-xl" />
                Send Message on WhatsApp
              </button>

            </form>

          </div>


          {/* Google Map */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

            <div className="h-96">

              <iframe
                title="Google Map Hathras"
                src="https://www.google.com/maps?q=Hathras,Uttar+Pradesh,India&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>

            </div>

            <div className="p-8">

              <h3 className="text-2xl font-bold">
                Visit Us in Hathras
              </h3>

              <p className="text-gray-600 mt-4 leading-7">
                We'd be happy to meet you. Visit us in Hathras during
                working hours for support, partnerships, or business inquiries.
              </p>

              {/* Open Google Maps */}
              <a
                href="https://www.google.com/maps/search/?api=1&query=Hathras,Uttar+Pradesh,India"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
              >
                <FaMapMarkerAlt className="mr-2" />
                Open in Google Maps
              </a>

            </div>

          </div>

        </div>

      </section>


      {/* Bottom Banner */}
      <section className="bg-blue-600 text-white">

        <div className="max-w-7xl mx-auto px-6 py-16 text-center">

          <h2 className="text-4xl font-bold">
            Need Immediate Help?
          </h2>

          <p className="mt-5 text-blue-100">
            Our customer support team is available to answer your questions.
          </p>


          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">

            {/* Call */}
            <a
              href="tel:+919389751483"
              className="inline-flex items-center justify-center bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition"
            >
              <FaPhoneAlt className="mr-2" />
              Call Now
            </a>


            {/* WhatsApp */}
            <a
              href="https://wa.me/919389751483"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl font-bold transition"
            >
              <FaWhatsapp className="mr-2 text-xl" />
              WhatsApp
            </a>

          </div>

        </div>

      </section>

    </div>
  );
};

export default Contact;
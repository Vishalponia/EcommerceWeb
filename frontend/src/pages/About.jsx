import {
  FaShippingFast,
  FaLock,
  FaHeadset,
  FaUndoAlt,
  FaUsers,
  FaBoxOpen,
} from "react-icons/fa";

const About = () => {
  const features = [
    {
      icon: <FaShippingFast className="text-4xl text-blue-600" />,
      title: "Fast Delivery",
      description:
        "We deliver your orders quickly and safely with trusted delivery partners.",
    },
    {
      icon: <FaLock className="text-4xl text-green-600" />,
      title: "Secure Payments",
      description:
        "Your transactions are protected with secure payment methods.",
    },
    {
      icon: <FaUndoAlt className="text-4xl text-orange-500" />,
      title: "Easy Returns",
      description:
        "Hassle-free returns and refunds for a worry-free shopping experience.",
    },
    {
      icon: <FaHeadset className="text-4xl text-purple-600" />,
      title: "24/7 Support",
      description:
        "Our support team is always ready to help you whenever you need us.",
    },
  ];

  return (
    <div className="bg-gray-50">

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white">

        <div className="max-w-7xl mx-auto px-6 py-24 text-center">

          <h1 className="text-5xl md:text-6xl font-bold">
            About Ecommerce
          </h1>

          <p className="mt-6 text-lg md:text-xl max-w-3xl mx-auto text-blue-100">
            Your trusted destination for quality products, affordable prices,
            and an exceptional online shopping experience.
          </p>

        </div>

      </section>

      {/* About */}
      <section className="max-w-7xl mx-auto px-6 py-20">

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          <div>

            <h2 className="text-4xl font-bold text-gray-800">
              Who We Are
            </h2>

            <p className="mt-6 text-gray-600 leading-8">
              BestDeal4You is an online shopping platform built to provide
              customers with high-quality products at competitive prices.
              From electronics and fashion to home essentials, we carefully
              select products that offer great value.
            </p>

            <p className="mt-4 text-gray-600 leading-8">
              Our goal is to make online shopping simple, secure, and enjoyable
              by combining excellent customer service, reliable delivery,
              and a user-friendly shopping experience.
            </p>

          </div>

          <div className="bg-white rounded-2xl shadow-lg p-10">

            <div className="grid grid-cols-2 gap-8">

              <div className="text-center">

                <FaUsers className="mx-auto text-5xl text-blue-600" />

                <h3 className="text-3xl font-bold mt-4">
                  10K+
                </h3>

                <p className="text-gray-500">
                  Happy Customers
                </p>

              </div>

              <div className="text-center">

                <FaBoxOpen className="mx-auto text-5xl text-green-600" />

                <h3 className="text-3xl font-bold mt-4">
                  500+
                </h3>

                <p className="text-gray-500">
                  Products
                </p>

              </div>

              <div className="text-center">

                <h3 className="text-3xl font-bold text-orange-500">
                  100%
                </h3>

                <p className="text-gray-500 mt-3">
                  Secure Shopping
                </p>

              </div>

              <div className="text-center">

                <h3 className="text-3xl font-bold text-purple-600">
                  24/7
                </h3>

                <p className="text-gray-500 mt-3">
                  Customer Support
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* Features */}

      <section className="py-20 bg-white">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center">

            <h2 className="text-4xl font-bold">
              Why Shop With Us?
            </h2>

            <p className="text-gray-500 mt-4">
              We focus on quality, trust, and customer satisfaction.
            </p>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-14">

            {features.map((feature, index) => (

              <div
                key={index}
                className="bg-gray-50 rounded-xl shadow hover:shadow-xl transition p-8 text-center"
              >

                <div className="flex justify-center">
                  {feature.icon}
                </div>

                <h3 className="text-2xl font-bold mt-6">
                  {feature.title}
                </h3>

                <p className="text-gray-600 mt-4 leading-7">
                  {feature.description}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* Mission */}

      <section className="max-w-7xl mx-auto px-6 py-20">

        <div className="grid md:grid-cols-2 gap-10">

          <div className="bg-blue-600 text-white rounded-2xl p-10">

            <h2 className="text-3xl font-bold">
              Our Mission
            </h2>

            <p className="mt-6 leading-8">
              To provide every customer with quality products,
              affordable prices, fast delivery, and a shopping
              experience they can trust.
            </p>

          </div>

          <div className="bg-indigo-600 text-white rounded-2xl p-10">

            <h2 className="text-3xl font-bold">
              Our Vision
            </h2>

            <p className="mt-6 leading-8">
              To become one of the most trusted and customer-focused
              e-commerce platforms by delivering value, innovation,
              and excellent service.
            </p>

          </div>

        </div>

      </section>

      {/* CTA */}

      <section className="bg-gray-900 text-white">

        <div className="max-w-7xl mx-auto px-6 py-20 text-center">

          <h2 className="text-4xl font-bold">
            Ready to Start Shopping?
          </h2>

          <p className="mt-5 text-gray-300 max-w-2xl mx-auto">
            Browse our latest collections and discover amazing products
            at the best prices.
          </p>

          <button className="mt-8 px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-xl text-lg font-semibold transition">
            Explore Products By Category
          </button>

        </div>

      </section>

    </div>
  );
};

export default About;
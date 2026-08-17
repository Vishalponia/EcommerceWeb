const { GoogleGenAI } = require("@google/genai");

const Product = require("../models/Product");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});


// ==========================================
// AI CHAT
// ==========================================

const chatWithAI = async (req, res) => {

  try {

    const { message } = req.body;


    // ==========================================
    // VALIDATION
    // ==========================================

    if (!message || !message.trim()) {

      return res.status(400).json({
        success: false,
        message: "Message is required",
      });

    }


    // ==========================================
    // GET PRODUCTS FROM DATABASE
    // ==========================================

    const products = await Product.find({
      status: "Active",
    })
      .populate("category", "name")
      .select(
        "name description price stock category"
      )
      .limit(100);


    // ==========================================
    // CONVERT PRODUCTS INTO SIMPLE DATA
    // ==========================================

    const productData = products.map((product) => ({

      id: product._id,

      name: product.name,

      description: product.description,

      price: product.price,

      stock: product.stock,

      category:
        product.category?.name || "Unknown",

    }));


    // ==========================================
    // AI PROMPT
    // ==========================================

    const prompt = `
You are an ecommerce shopping assistant.

Rules:
1. Give SHORT and DIRECT answers.
2. Maximum 2-3 sentences.
3. Recommend ONLY products from the database.
4. Never invent products or prices.
5. If user asks for products under a price, show only matching products.
6. If no product matches, say "Sorry, no matching product found."
7. Mention product name and price when recommending.
8. Do not explain unnecessarily.
9. Use ₹ for prices.

AVAILABLE PRODUCTS:
${JSON.stringify(productData, null, 2)}

CUSTOMER MESSAGE:
${message}

Give only the most relevant answer.
`;


    // ==========================================
    // GEMINI
    // ==========================================

    const response = await ai.models.generateContent({

      model: "gemini-3.6-flash",

      contents: prompt,

    });


    // ==========================================
    // RESPONSE
    // ==========================================

    res.status(200).json({

      success: true,

      reply: response.text,

    });


  } catch (error) {

    console.log(
      "=============================="
    );

    console.log("GEMINI CHAT ERROR:", error);

    console.log(
      "=============================="
    );


    res.status(500).json({

      success: false,

      message: "AI response failed",

      error: error.message,

    });

  }

};


module.exports = {
  chatWithAI,
};
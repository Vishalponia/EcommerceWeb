import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaRobot,
  FaTimes,
  FaPaperPlane,
  FaTrash,
} from "react-icons/fa";

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hi! 👋 I'm your AI shopping assistant. How can I help you today?",
    },
  ]);

  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);


  // ==========================================
  // AUTO SCROLL
  // ==========================================

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);


  // ==========================================
  // SEND MESSAGE
  // ==========================================

  const handleSend = async () => {

    const text = message.trim();

    if (!text || loading) return;


    // Add user message

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text,
      },
    ]);


    setMessage("");
    setLoading(true);


    try {

      const res = await axios.post(
        "http://localhost:5000/api/chat",
        {
          message: text,
        }
      );


      // Add AI response

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text:
            res.data.reply ||
            "Sorry, I couldn't understand that.",
        },
      ]);


    } catch (error) {

      console.log("CHAT ERROR:", error);


      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text:
            error.response?.data?.message ||
            "Sorry, something went wrong. Please try again.",
        },
      ]);

    } finally {

      setLoading(false);

    }
  };


  // ==========================================
  // ENTER KEY
  // ==========================================

  const handleKeyDown = (e) => {

    if (e.key === "Enter" && !e.shiftKey) {

      e.preventDefault();

      handleSend();

    }

  };


  // ==========================================
  // CLEAR CHAT
  // ==========================================

  const clearChat = () => {

    setMessages([
      {
        sender: "ai",
        text: "Hi! 👋 I'm your AI shopping assistant. How can I help you today?",
      },
    ]);

  };


  return (
    <>
      {/* ==========================================
          CHAT WINDOW
      ========================================== */}

      <AnimatePresence>

        {isOpen && (

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.8,
              y: 30,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.8,
              y: 30,
            }}
            transition={{
              duration: 0.25,
            }}
            className="
              fixed
              bottom-24
              right-5
              sm:right-6
              z-[9999]

              w-[calc(100%-40px)]
              sm:w-[380px]

              h-[520px]

              bg-white
              rounded-2xl
              shadow-2xl
              border
              border-gray-200

              overflow-hidden

              flex
              flex-col
            "
          >

            {/* ==========================================
                HEADER
            ========================================== */}

            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-4 flex items-center justify-between">

              <div className="flex items-center gap-3">

                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">

                  <FaRobot size={20} />

                </div>

                <div>

                  <h3 className="font-bold">
                    AI Assistant
                  </h3>

                  <p className="text-xs text-blue-100">
                    Online • Ready to help
                  </p>

                </div>

              </div>


              <div className="flex items-center gap-3">

                {/* Clear */}

                <button
                  onClick={clearChat}
                  className="hover:bg-white/20 p-2 rounded-lg transition"
                  title="Clear chat"
                >
                  <FaTrash size={14} />
                </button>


                {/* Close */}

                <button
                  onClick={() => setIsOpen(false)}
                  className="hover:bg-white/20 p-2 rounded-lg transition"
                >
                  <FaTimes />
                </button>

              </div>

            </div>


            {/* ==========================================
                MESSAGES
            ========================================== */}

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">

              {messages.map((msg, index) => (

                <div
                  key={index}
                  className={`flex ${
                    msg.sender === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >

                  <div
                    className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-blue-600 text-white rounded-br-sm"
                        : "bg-white text-gray-700 shadow-sm border border-gray-100 rounded-bl-sm"
                    }`}
                  >

                    {msg.text}

                  </div>

                </div>

              ))}


              {/* ==========================================
                  TYPING INDICATOR
              ========================================== */}

              {loading && (

                <div className="flex justify-start">

                  <div className="bg-white border shadow-sm px-4 py-3 rounded-2xl rounded-bl-sm">

                    <div className="flex gap-1">

                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />

                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:150ms]" />

                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:300ms]" />

                    </div>

                  </div>

                </div>

              )}


              <div ref={messagesEndRef} />

            </div>


            {/* ==========================================
                INPUT
            ========================================== */}

            <div className="p-3 border-t bg-white">

              <div className="flex items-center gap-2">

                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask me anything..."
                  disabled={loading}
                  className="
                    flex-1
                    px-4
                    py-3
                    bg-gray-100
                    rounded-xl
                    outline-none
                    text-sm
                    focus:ring-2
                    focus:ring-blue-500
                    disabled:opacity-50
                  "
                />


                <button
                  onClick={handleSend}
                  disabled={!message.trim() || loading}
                  className="
                    w-11
                    h-11
                    flex
                    items-center
                    justify-center
                    bg-blue-600
                    hover:bg-blue-700
                    disabled:bg-gray-300
                    text-white
                    rounded-xl
                    transition
                  "
                >

                  <FaPaperPlane size={15} />

                </button>

              </div>

              <p className="text-[10px] text-gray-400 text-center mt-2">
                AI can make mistakes. Check important information.
              </p>

            </div>

          </motion.div>

        )}

      </AnimatePresence>


      {/* ==========================================
          FLOATING BUTTON
      ========================================== */}

      {!isOpen && (

        <motion.button
          initial={{
            scale: 0,
          }}
          animate={{
            scale: 1,
          }}
          whileHover={{
            scale: 1.1,
          }}
          whileTap={{
            scale: 0.95,
          }}
          onClick={() => setIsOpen(true)}
          className="
            fixed
            bottom-5
            right-5
            sm:right-6

            z-[9999]

            w-14
            h-14

            bg-gradient-to-r
            from-blue-600
            to-indigo-600

            text-white

            rounded-full

            shadow-xl

            flex
            items-center
            justify-center

            hover:shadow-2xl

            transition
          "
        >

          <FaRobot size={24} />

          {/* Online indicator */}

          <span className="
            absolute
            top-0
            right-0
            w-4
            h-4
            bg-green-500
            border-2
            border-white
            rounded-full
          " />

        </motion.button>

      )}

    </>
  );
};

export default AIChatbot;
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const formRef = useRef(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    status: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "Christian",
          from_email: form.email,
          to_email: "christian.ak.mack@gmail.com",
          message: form.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        setIsLoading(false);
        setForm({ name: "", email: "", message: "", status: "success" });
        // TODO: show success message
        // TODO: Hide an alert
      })
      .catch((error) => {
        setIsLoading(false);
        setForm({ name: "", email: "", message: "", status: "failure" });
        console.log(error);
        // TODO: show error message
      });
  };

  const handleFocus = (e) => {};
  const handleBlur = (e) => {};

  return (
    <section className="relative flex lg:flex-row flex-col max-container">
      <div className="flex-1 min-w-[50%] flex flex-col">
        <h1 className="head-text">Get in touch</h1>

        <form
          className="w-full flex flex-col gap-7 mt-14"
          action="#"
          onSubmit={handleSubmit}
        >
          {/* Name */}
          <label htmlFor="name" className="text-black-500 font-semibold">
            Name
            <input
              type="text"
              name="name"
              className="input"
              placeholder="John"
              required
              value={form.name}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>
          {/* Email */}
          <label htmlFor="name" className="text-black-500 font-semibold">
            Email
            <input
              type="email"
              name="email"
              className="input"
              placeholder="john123@gmail.com"
              required
              value={form.email}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>

          {/* Message */}
          <label htmlFor="name" className="text-black-500 font-semibold">
            Your Message
            <textarea
              name="message"
              rows={4}
              className="textarea"
              placeholder="Type your message here..."
              required
              value={form.message}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>
          <button
            type="submit"
            className="btn"
            onFocus={handleFocus}
            onBlur={handleBlur}
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Submit"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;

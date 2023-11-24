import { Suspense, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Canvas } from "@react-three/fiber";
import { Fox } from "../models";
import { Alert, Loader } from "../components";
import { useAlert } from "../hooks";

const Contact = () => {
  const formRef = useRef(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    status: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [currentAnimation, setCurrentAnimation] = useState("idle");

  const { alert, showAlert, hideAlert } = useAlert();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setCurrentAnimation("hit");

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
        showAlert({
          show: true,
          type: "success",
          text: "Your message has been sent successfully!",
        });

        setTimeout(() => {
          hideAlert();
          setCurrentAnimation("idle");
          setForm({ name: "", email: "", message: "", status: "success" });
        }, [3000]);
      })
      .catch((error) => {
        setIsLoading(false);
        setCurrentAnimation("idle");
        showAlert({
          show: true,
          type: "danger",
          text: "Your message has *NOT* been sent...",
        });
      });
  };

  const handleFocus = (e) => {
    setCurrentAnimation("walk");
  };
  const handleBlur = (e) => {
    setCurrentAnimation("idle");
  };

  return (
    <section className="relative flex lg:flex-row flex-col max-container">
      {alert.show && <Alert {...alert} />}
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

      <div className="lg:w-1/2 w-full lg:h-auto md:h-[550px] h-[350px]">
        <Canvas camera={{ position: [0, 0, 5], fov: 75, near: 0.1, far: 1000 }}>
          <directionalLight intensity={2.5} position={[0, 0, 1]} />
          <ambientLight intensity={0.5} />
          <Suspense fallback={<Loader />}>
            <Fox
              currentAnimation={currentAnimation}
              position={[0.5, 0.35, 0]}
              rotation={[12.6, -0.6, 0]}
              scale={[0.5, 0.5, 0.5]}
            />
          </Suspense>
        </Canvas>
      </div>
    </section>
  );
};

export default Contact;

import { useEffect, useRef, useState } from "react";
import ringImage from '/icons/pattern-rings.svg';
import "./App.css";

export default function App() {
  /* ---------- HEADER LOGIC ---------- */
  const headerRef = useRef(null);
  const navRef = useRef(null);
  const overlayRef = useRef(null);
  const openBtnRef = useRef(null);
  const closeBtnRef = useRef(null);

  useEffect(() => {
    const header = headerRef.current;
    const navbar = navRef.current;
    const overlay = overlayRef.current;
    const openBtn = openBtnRef.current;
    const closeBtn = closeBtnRef.current;

    const toggleNav = () => {
      navbar.classList.toggle("active");
      overlay.classList.toggle("active");
      header.classList.toggle("active");
    };

    const handleScroll = () => {
      if (window.scrollY > 100) header.classList.add("active");
      else header.classList.remove("active");
    };

    openBtn.addEventListener("click", toggleNav);
    closeBtn.addEventListener("click", toggleNav);
    overlay.addEventListener("click", toggleNav);
    window.addEventListener("scroll", handleScroll);

    return () => {
      openBtn.removeEventListener("click", toggleNav);
      closeBtn.removeEventListener("click", toggleNav);
      overlay.removeEventListener("click", toggleNav);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* ---------- BACK-TO-TOP LOGIC ---------- */
  const backTopRef = useRef(null);
  useEffect(() => {
    const btn = backTopRef.current;
    const toggle = () => {
      btn.classList.toggle("active", window.scrollY > 500);
    };
    window.addEventListener("scroll", toggle);
    return () => window.removeEventListener("scroll", toggle);
  }, []);

  /* ---------- CONTACT FORM LOGIC ---------- */
  /* ---------- CONTACT FORM LOGIC WITH VALIDATION ---------- */
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    message: "",
  });

  const [errors, setErrors] = useState({}); // for storing validation errors

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🧠 Validation function
  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    else if (formData.name.trim().length < 3) newErrors.name = "Name must be at least 3 characters.";

    // Email validation
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Enter a valid email address.";

    // Number validation (optional pattern)
    if (!formData.number.trim()) newErrors.number = "Contact number is required.";
    else if (!/^\d{10,15}$/.test(formData.number.trim()))
      newErrors.number = "Enter a valid phone number (10–15 digits).";

    // Message validation
    if (!formData.message.trim()) newErrors.message = "Message cannot be empty.";
    else if (formData.message.trim().length < 10)
      newErrors.message = "Message should be at least 10 characters.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🧩 Validate first
    if (!validateForm()) {
      return;
    }

    const subject = `New message from ${formData.name}`;
    const body = `Hello,

You have a new message from your portfolio contact form.

Name: ${formData.name}
Email: ${formData.email}
Contact Number: ${formData.number}

Message:
${formData.message}

Regards,
${formData.name}`;

    const yourEmail = "gravity.services.info@gmai.com"; // <--- put your Gmail here

    // Gmail compose link
    const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${yourEmail}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // mailto fallback (for mobile)
    const mailtoLink = `mailto:${yourEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Device detection
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (isMobile) {
      // mobile: open Gmail app or system email app
      window.location.href = mailtoLink;
    } else {
      // desktop: open Gmail web compose tab
      window.open(gmailLink, "_blank");
    }

    // Clear after submit
    setFormData({ name: "", email: "", number: "", message: "" });
    setErrors({});
  };


  /* ---------- DATA ---------- */
  const services = [
    { title: "Website Development", icon: "services-svg-1.svg", hue: "174, 77%, 50%" },
    { title: "Website Maintenance", icon: "services-svg-3.svg", hue: "17, 100%, 68%" },
    { title: "SEO Optimization", icon: "services-svg-2.svg", hue: "267, 76%, 57%" },
    { title: "UI/UX Design", icon: "services-svg-4.svg", hue: "343, 98%, 60%" },
    { title: "Performance Optimization", icon: "services-svg-8.svg", hue: "241, 77%, 63%" },
    { title: "Business Consultation", icon: "services-svg-6.svg", hue: "157, 89%, 44%" },
    { title: "Content Management", icon: "services-svg-7.svg", hue: "60, 90%, 50%" },
    { title: "Digital Marketing", icon: "services-svg-5.svg", hue: "210, 100%, 53%" },
  ];

  const features = [
    { icon: "rocket-sharp", title: "Fast Working Process", text: "At Gravity, we plan, design, and deliver projects quickly — without compromising quality.", hue: "174, 77%, 50%" },
    { icon: "people-sharp", title: "Dedicated Team", text: "Our skilled professionals work with passion and precision to bring your digital vision to life.", hue: "241, 77%, 63%" },
    { icon: "call", title: "24/7 Support", text: "We're always available to assist, update, and support you — anytime you need us.", hue: "343, 98%, 60%" },
  ];

  return (

    <>
      {/* ==================== HEADER ==================== */}
      <header className="header" data-header ref={headerRef}>
        <div className="container">
          <a href="#" className="logo">Gravity</a>
          <nav className="navbar" data-navbar ref={navRef}>
            <div className="wrapper">
              <button className="nav-close-btn" aria-label="close menu" data-nav-toggler ref={closeBtnRef}>
                <ion-icon name="close-outline" aria-hidden="true"></ion-icon>
              </button>
            </div>
            <ul className="navbar-list">
              <li className="navbar-item">
                <a href="#home" className="navbar-link" data-nav-link>Home</a>
              </li>
              <li className="navbar-item">
                <a href="#our-services" className="navbar-link" data-nav-link>Our services</a>
              </li>
              <li className="navbar-item">
                <a href="#features" className="navbar-link" data-nav-link>Features</a>
              </li>
            </ul>
          </nav>

          <button className="nav-open-btn" aria-label="open menu" data-nav-toggler ref={openBtnRef}>
            <ion-icon name="menu-outline" aria-hidden="true"></ion-icon>
          </button>
          <a href="#contact" className="btn btn-primary has-before has-after">Let's Talk</a>
          <div className="overlay" data-nav-toggler data-overlay ref={overlayRef}></div>
        </div>
      </header>

      {/* ==================== MAIN ==================== */}
      <main>
        <article>

          {/* ---------- HERO ---------- */}
          <section className="section hero" id="home" aria-label="hero">
            <div className="hero-section">
              <div className="hero-content">
                <h1 className="h1 hero-title">Building <span className="has-before">Digital Excellence</span> with Gravity</h1>
                <p className="hero-text">We design intelligent websites and mobile apps that don't just look good — they perform. At <strong>Gravity</strong>, we blend creativity, technology, and precision to transform your brand into a powerful digital experience.</p>
                <div className="wrapper">
                  <a href="#contact" className="btn btn-primary has-before has-after">Contact Us</a>
                </div>
                <ul className="social-list">
                  <li key="Twitter">
                    <a href="https://x.com/_GServices_?t=Q1hXkNNNTidXCD4G0qUHrw&s=09" className="social-link" style={{ color: "rgb(0,0,0)" }}><i className="fa-brands fa-x-twitter"></i><span className="span">Twitter</span></a>
                  </li>
                  <li key="Instagram">
                    <a href="https://www.instagram.com/gravityservices.info/" className="social-link" style={{ color: "hsl(0, 100%, 50%)" }}><ion-icon name="logo-instagram"></ion-icon><span className="span">Instagram</span></a>
                  </li>
                  <li key="Facebook">
                    <a href="https://www.facebook.com/share/1FTLGL7Cgv/" className="social-link" style={{ color: "hsl(241, 77%, 63%)" }}><ion-icon name="logo-facebook"></ion-icon><span className="span">Facebook</span></a>
                  </li>
                </ul>
              </div>
              <figure className="hero-banner">
                <img src="/images/hero-banner.png" alt="hero banner" />
              </figure>
            </div>
          </section>

          {/* ---------- SERVICE ---------- */}
          <section className="section service" id="our-services" aria-label="service">
            <div className="container">
              <p className="section-subtitle has-before text-center">Our Services</p>
              <h2 className="h2 section-title text-center">Managing you business with our <span className="has-before">best service</span></h2>
              <ul className="grid-list">
                {services.map((s, i) => (
                  <li key={i}>
                    <div className="service-card" style={{ "--color": s.hue }}>
                      <div className="card-icon">
                        <img src={`/icons/${s.icon}`} width="60" height="60" loading="lazy" alt="service icon" />
                      </div>
                      <h3 className="h3"><a href="#" className="card-title">{s.title}</a></h3>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* ---------- FEATURE ---------- */}
          <section className="section feature" id="features" aria-label="feature">
            <div className="container">
              <figure className="feature-banner">
                <img src="/images/feature-banner.png" width="582" height="585" loading="lazy" alt="feature banner" className="w-100" />
              </figure>
              <div className="feature-content">
                <p className="section-subtitle has-before">Why Choose Gravity</p>
                <h2 className="h2 section-title">We combine creativity, technology, and strategy to deliver fast, reliable, and high-quality digital solutions.</h2>
                <ul className="feature-list">
                  {features.map((f, i) => (
                    <li key={i}>
                      <div className="feature-card">
                        <div className="card-icon" style={{ "--color": f.hue }}>
                          <ion-icon name={f.icon} aria-hidden="true"></ion-icon>
                        </div>
                        <div>
                          <h3 className="h3 card-title">{f.title}</h3>
                          <p className="card-text">{f.text}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </article>
      </main>

      {/* Contact page */}
      <section className="section contact-us-page" id="contact">
        <div className="containerDiv">
          <div className="textside">
            <h2 className="section-main-title">CONTACT</h2>
            <p className="section-subtitle-para">I would love to hear about your project and how I could help. Please fill the form, and I'll get back to you as soon as possible.</p>
            <figure>
              <img src={ringImage} width="355" height="356" loading="lazy" alt="newsletter banner" className="w-100 roundimage" style={{ position: "absolute", left: "-40%" }} />
            </figure>
          </div>
          <form className="Contect-form" onSubmit={handleSubmit} noValidate>
            <input type="text" name="name" placeholder="NAME" required className="input-boxs" value={formData.name} onChange={handleChange} />
            {errors.name && <p className="error-text">{errors.name}</p>}

            <input type="email" name="email" placeholder="Enter your mail" required className="input-boxs" value={formData.email} onChange={handleChange} />
            {errors.email && <p className="error-text">{errors.email}</p>}

            <input type="tel" name="number" placeholder="Enter your contact number" required className="input-boxs" value={formData.number} onChange={handleChange} />
            {errors.number && <p className="error-text">{errors.number}</p>}
            <textarea name="message" placeholder="MESSAGE" className="input-boxs textarea" required value={formData.message} onChange={handleChange} />
            {errors.message && <p className="error-text">{errors.message}</p>}

            <button type="submit" className="submit-btn">SEND MESSAGE</button>
          </form>
        </div>
      </section>


      {/* ==================== FOOTER ==================== */}
      <footer className="footer">
        <div className="container">
          <div className="footer-top section">
            <div className="footer-brand">
              <p className="footer-list-title">About Gravity</p>
              <p className="footer-text"><span className="has-before">Gravity — Creating websites that are easy, reliable, and 100% secure.</span>We design, develop, and maintain high-performance websites that help your business grow with confidence, creativity, and innovation.</p>
            </div>
            <ul className="footer-list">
              <li><p className="footer-list-title">Useful Links</p></li>
              <li key="Home"><a href="#" className="footer-link">Home</a></li>
              <li key="our-services"><a href="#our-services" className="footer-link">Our Services</a></li>
              <li key="feature"><a href="#features" className="footer-link">Features</a></li>
              <li key="about-us"><a href="#contact" className="footer-link">Contact</a></li>
            </ul>

            <ul className="footer-list">
              <li><p className="footer-list-title">Social Links</p></li>
              <ul className="footer-social-links">
                <li key="Twitter">
                  <a href="https://x.com/_GServices_?t=Q1hXkNNNTidXCD4G0qUHrw&s=09"><i className="fa-brands fa-x-twitter"></i><span className="span">X (Twitter)</span></a>
                </li>
                <li key="Instagram">
                  <a href="https://www.instagram.com/gravityservices.info/"><ion-icon name="logo-instagram"></ion-icon><span className="span">Instagram</span></a>
                </li>
                <li key="Facebook">
                  <a href="https://www.facebook.com/share/1FTLGL7Cgv/"><ion-icon name="logo-facebook"></ion-icon><span className="span">Facebook</span></a>
                </li>
              </ul>
            </ul>

            <ul>
              <li><p class="footer-list-title">Contact Us</p></li>
              <li key="Home" className="phone-numbers">
                <a href="tel:+919142003626">+91-9142003626</a>,
                <a href="tel:+919508414506">+91-9508414506</a>
              </li>
              <li key="our-services">
                <a href="javascript:void(0)" onClick={(e) => {e.preventDefault(); const email = 'gravity.services.info@gmail.com'; const subject = encodeURIComponent('Service Enquiry'); const body = encodeURIComponent('Hello Gravity Services Team,\n\nI am interested in your software development and IT solutions. Please provide more details about your services.\n\nThank you.');if (/Mobi|Android/i.test(navigator.userAgent)) {window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;} else {window.open( `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`, '_blank');}}}>gravity.services.info@gmail.com</a>
              </li>
            </ul>
          </div>

          <div className="footer-bottom">
            <p className="copyright">&copy; 2025 Gravity. All rights reserved. Designed and developed by Gravity.</p>
          </div>
        </div>
      </footer>

      {/* ==================== BACK TO TOP ==================== */}
      <a href="#top" className="back-top-btn has-after" aria-label="back to top" data-back-top-btn ref={backTopRef}>
        <ion-icon name="arrow-up" aria-hidden="true"></ion-icon>
      </a>
    </>
  );
}
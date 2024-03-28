import "../styles/contactUs.css";
import phone from "../assets/phone.svg";
import email from "../assets/email.svg";
import onePuff from "../assets/onePuff.png";

function ContactUs() {
  return (
    <div className="contactUs-container">
      <div className="get-in-touch">
      <div className="puff-container"><img src={onePuff} alt="" className="puff" /></div>
        <h3>Get in touch</h3>
        <form action="POST">
          <input type="text" placeholder="First Name" />
          <input type="text" placeholder="Last Name" />
          <input type="email" placeholder="Email" />
          <textarea placeholder="Message"></textarea>
          <button type="submit">Send</button>
        </form>
      </div>
      <div className="wave"></div>
      <div className="contact-header-container">
        {" "}
        <h3 className="contact-header">Contact Us</h3>
      </div>
      <div className="contact-container">
        <div className="contact-phone">
          <img src={phone} alt="" />
        </div>
        <div className="contact-phone-container">
          <h4>Conatct</h4>
          <p>Phone: 123-456-7890</p>
          <p>Phone: 123-456-7890</p>
        </div>
        <div className="contact-email">
          <img src={email} alt="" />
        </div>
        <div className="contact-email-container">
          <h4>Email</h4>
          <p>Email: contact@mashle.com</p>
          <p>Email: support@mashle.com</p>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;

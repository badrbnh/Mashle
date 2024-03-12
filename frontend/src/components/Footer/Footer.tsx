import upIcon from '../../assets/up.svg';
import facebook from '../../assets/facebook.svg';
import twitter from '../../assets/twitter.svg';
import linkedin from '../../assets/linkedin.svg';
import instagram from '../../assets/instagram.svg';
import './Footer.css';

const Footer = () => {
  const socials = [
    {
      name: "Facebook",
      icon: facebook,
      link: "https://www.facebook.com/"
    },
    {
      name: "Instagram",
      icon: instagram,
      link: "https://www.instagram.com/"
    },
    {
      name: "Twitter",
      icon: twitter,
      link: "https://www.twitter.com/"
    },
    {
      name: "Linkedin",
      icon: linkedin,
      link: "https://www.linkedin.com/"
    }
  ];

  return (
    <footer>
      <div className='footer-container'>
        <div className="footer-1st-half">
          <div className='footer-home'><a href="/">MASHLE</a></div>
          <div className='footer-links'>
            <a href="/privacy-policy">Privacy policy</a>
            <a href="/terms-of-service">Terms of Service</a>
            <a href="/cookie-policy">Cookie Policy</a>
          </div>
        </div>
        <div className="footer-2nd-half">
          <div className='img-container'><img src={upIcon} alt="Go to top" /></div>
        <div className='footer-socials'>
          {socials.map((social, index) => (
            <a href={social.link} key={index} target="_blank" rel="noopener noreferrer">
              <img src={social.icon} alt={social.name} />
            </a>
          ))}
        </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;

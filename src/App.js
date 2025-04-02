import React from 'react';
import { useTranslation } from 'react-i18next';
import './App.css';

// Ícones do react-icons (Feather Icons) para a seção de Features
import {
  FiShield,
  FiClock,
  FiSettings,
  FiCheckCircle,
  FiZap,
  FiThumbsUp
} from 'react-icons/fi';

// Ícones de redes sociais para o Footer
import {
  FaFacebookF,
  FaTwitter,
  FaYoutube
} from 'react-icons/fa';

/**
 * Função para extrair o ID do vídeo do YouTube a partir de uma URL.
 * Exemplos: 
 *   "https://youtu.be/dQw4w9WgXcQ" ou "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
 * Retorna "dQw4w9WgXcQ".
 */
function getYouTubeId(url) {
  const regExp = /^.*(?:youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match ? match[1] : null;
}

function App() {
  const { t, i18n } = useTranslation();

  // Função para trocar o idioma
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  // Array de ícones para a seção de Features (ordem conforme JSON)
  const featureIcons = [
    <FiShield size={40} />,
    <FiClock size={40} />,
    <FiSettings size={40} />,
    <FiCheckCircle size={40} />,
    <FiZap size={40} />,
    <FiThumbsUp size={40} />
  ];

  return (
    <div className="App">
      {/* HEADER */}
      <header className="header-custom">
        <div className="header-left">
          <div className="logo">{t('header.logo')}</div>
        </div>
        <nav className="header-nav">
          <a href="#about">{t('header.about')}</a>
          <a href="#blog">{t('header.blog')}</a>
          <a href="#pricing">{t('header.pricing')}</a>
          <a href="#contact">{t('header.contact')}</a>
        </nav>
        <div className="header-right">
          <a
            href="https://app.cafecomfinancasoficial.com/auth/sign-in"
            className="login-btn"
          >
            {t('header.login')}
          </a>
          <a
            href="https://app.cafecomfinancasoficial.com/auth/sign-in"
            className="signup-btn"
          >
            {t('header.signup')}
          </a>
          <div className="language-switcher">
            <button onClick={() => changeLanguage('pt')}>PT</button>
            <button onClick={() => changeLanguage('en')}>EN</button>
            <button onClick={() => changeLanguage('es')}>ES</button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section id="hero" className="hero-custom">
        <div className="hero-content">
          <h1>{t('hero.title')}</h1>
          <p>{t('hero.subtitle')}</p>
          <div className="hero-buttons">
            <button className="primary-btn">{t('hero.getStarted')}</button>
            <button className="secondary-btn">{t('hero.watchVideo')}</button>
          </div>
          <div className="trusted-logos">
            <span>{t('trustedCustomers')}:</span>
            <img src="https://via.placeholder.com/80x40.png?text=Fortune" alt="Fortune" />
            <img src="https://via.placeholder.com/80x40.png?text=FastCompany" alt="Fast Company" />
            <img src="https://via.placeholder.com/80x40.png?text=NationalGeographic" alt="National Geographic" />
            <img src="https://via.placeholder.com/80x40.png?text=Forbes" alt="Forbes" />
          </div>
        </div>
        <div className="hero-image">
          <img src="https://via.placeholder.com/500x400.png?text=Hero+Illustration" alt="Hero Illustration" />
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="features-section">
        <h2 className="features-title">{t('features.heading')}</h2>
        <p className="features-subtitle">{t('features.subtitle')}</p>
        <div className="features-grid">
          {t('features.items', { returnObjects: true }).map((item, index) => (
            <div className="feature-item" key={index}>
              <div className="feature-icon">{featureIcons[index]}</div>
              <h3 className="feature-item-title">{item.title}</h3>
              <p className="feature-item-description">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="about-section">
        <div className="about-content">
          <div className="about-image">
            <img src="https://via.placeholder.com/400x300.png?text=Stats+Image" alt="Stats Illustration" />
          </div>
          <div className="about-text">
            <small>{t('aboutSection.trackRecord')}</small>
            <h2>{t('aboutSection.heading')}</h2>
            <p>{t('aboutSection.subtitle')}</p>
            <div className="about-stats">
              {t('aboutSection.stats', { returnObjects: true }).map((stat, i) => (
                <div className="about-stat" key={i}>
                  <h3>{stat.value}</h3>
                  <p>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BLOG SECTION */}
      <section id="blog" className="blog-section">
        <h2 className="blog-title">{t('blogSection.heading')}</h2>
        <p className="blog-subtitle">{t('blogSection.subtitle')}</p>
        <div className="blog-grid">
          {t('blogSection.items', { returnObjects: true }).map((item, index) => {
            // Extrai o ID do vídeo do YouTube
            const videoId = getYouTubeId(item.link);
            // Se o ID for válido, monta a URL da thumbnail; senão, usa item.image (fallback)
            const youtubeThumbnail = videoId
              ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
              : item.image;
            return (
              <div className="blog-item" key={index}>
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  <img src={youtubeThumbnail} alt={item.title} />
                </a>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* PRICING SECTION */}
      <section id="pricing" className="pricing-section">
        <h2 className="pricing-title">{t('pricing.heading')}</h2>
        <p className="pricing-subtitle">{t('pricing.subtitle')}</p>
        <div className="pricing-cards">
          {t('pricing.plans', { returnObjects: true }).map((plan, index) => (
            <div className={`pricing-card ${index === 1 ? 'highlight' : ''}`} key={index}>
              <h3>{plan.title}</h3>
              <h4>
                {plan.price} <span>/{plan.period}</span>
              </h4>
              <p className="plan-description">{plan.description}</p>
              <ul>
                {plan.features.map((feat, i) => (
                  <li key={i}>{feat}</li>
                ))}
              </ul>
              <button>{plan.button}</button>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="contact-section">
        <div className="contact-container">
          <div className="contact-form">
            <h2>{t('contactSection.title')}</h2>
            <p>{t('contactSection.subtitle')}</p>
            <form onSubmit={(e) => e.preventDefault()}>
              <input type="text" placeholder={t('contactSection.placeholderName')} required />
              <input type="email" placeholder={t('contactSection.placeholderEmail')} required />
              <input type="text" placeholder={t('contactSection.placeholderSubject')} required />
              <textarea placeholder={t('contactSection.placeholderMessage')} rows="5" required />
              <button type="submit">{t('contactSection.sendButton')}</button>
            </form>
          </div>
          <div className="contact-illustration">
            <img src="https://via.placeholder.com/400x300.png?text=Contact+Illustration" alt="Contact Illustration" />
          </div>
        </div>
      </section>

      {/* FOOTER ESCURO */}
      <footer className="dark-footer">
        <div className="footer-links">
          <a href="#hero">{t('footerSection.links.home')}</a>
          <a href="#about">{t('footerSection.links.about')}</a>
          <a href="#blog">{t('footerSection.links.blog')}</a>
          <a href="#pricing">{t('footerSection.links.pricing')}</a>
          <a href="#contact">{t('footerSection.links.contact')}</a>
        </div>
        <div className="footer-social">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebookF />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
            <FaYoutube />
          </a>
        </div>
        <p className="footer-copyright">
          {t('footerSection.links.home')} Treact. {t('footerSection.links.about')}
          <br />
          {t('footerSection.links.contact')} | {t('footerSection.links.blog')} | {t('footerSection.links.pricing')}
          <br />
          {t('footerSection.links.contact')}
        </p>
        <p>
          {t('footerSection.links.home')} Treact. {t('footerSection.links.about')}
        </p>
        <p>{t('footerSection.copyright')}</p>
      </footer>
    </div>
  );
}

export default App;

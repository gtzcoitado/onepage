import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import './App.css';

// Imagens e ícones
import logo from './assets/logo.png';
import heroImage from './assets/images/hero-illustration.png';
import statsImage from './assets/stats.png';
import smartphoneImg from './assets/images/smartphone.png';
import contactIllustration from './assets/images/contact-illustration.png';

import fortuneLogo from './assets/trusted/fortune.png';
import fastCompanyLogo from './assets/trusted/fastcompany.png';
import natGeoLogo from './assets/trusted/nationalgeo.png';
import forbesLogo from './assets/trusted/forbes.png';

import ptFlag from './assets/flags/pt.png';
import enFlag from './assets/flags/en.png';
import esFlag from './assets/flags/es.png';

// Ícones para a seção de Features
import {
  FiShield,
  FiClock,
  FiSettings,
  FiCheckCircle,
  FiZap,
  FiThumbsUp
} from 'react-icons/fi';

// Ícones de redes sociais para o Footer
import { FaFacebookF, FaTwitter, FaYoutube } from 'react-icons/fa';

/**
 * Extrai o ID do vídeo do YouTube da URL.
 */
function getYouTubeId(url) {
  const regExp = /^.*(?:youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match ? match[1] : null;
}

/**
 * Gera o token conforme a regra (script do Postman).
 */
function computeToken() {
  const dataAtual = new Date();
  const diaAtual = ('0' + dataAtual.getDate()).slice(-2);
  const horaAtual = ('0' + dataAtual.getHours()).slice(-2);
  const minutoAtual = ('0' + dataAtual.getMinutes()).slice(-2);
  return diaAtual + 'HT%s7wq$5a@51' + horaAtual + 'kas93jJD9(01$3!1' + minutoAtual + '4aeT5$a%';
}

function App() {
  const { t, i18n } = useTranslation();
  const [openIndex, setOpenIndex] = useState(null);
  const [videos, setVideos] = useState([]);

  // Ref para o carrossel
  const carouselRef = useRef(null);

  // Carrega vídeos da API usando IDUsuario=-1 e token
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const tokenString = computeToken();
        const response = await fetch(
          "https://api.cafecomfinancasoficial.com/FinancasAPI/API/VideosYoutube/ListarTodos",
          {
            method: 'GET',
            headers: {
              'IDUsuario': '-1',
              'Token': tokenString
            }
          }
        );
        const data = await response.json();
        setVideos(data);
      } catch (error) {
        console.error('Erro ao buscar vídeos', error);
      }
    };

    fetchVideos();
  }, []);

  // Troca de idioma
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  // Scroll suave
  const scrollToSection = (sectionId) => {
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Ícones das features
  const featureIcons = [
    <FiShield size={40} />,
    <FiClock size={40} />,
    <FiSettings size={40} />,
    <FiCheckCircle size={40} />,
    <FiZap size={40} />,
    <FiThumbsUp size={40} />
  ];

  // Carrossel: rolagem horizontal
  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft -= 350;
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft += 350;
    }
  };

  return (
    <div className="App">
      {/* HEADER */}
      <header className="header">
        <div className="header-left">
          <img src={logo} alt="Logo" className="site-logo" />
          <div className="logo-text"></div>
        </div>
        <nav className="header-nav">
          <button onClick={() => scrollToSection('about')}>
            {t('header.about')}
          </button>
          <button onClick={() => scrollToSection('blog')}>
            {t('header.blog')}
          </button>
          <button onClick={() => scrollToSection('reviews')}>
            Reviews
          </button>
          <button onClick={() => scrollToSection('pricing')}>
            {t('header.pricing')}
          </button>
          <button onClick={() => scrollToSection('faq')}>
            FAQ
          </button>
          <button onClick={() => scrollToSection('download')}>
            {t('downloadSection.downloadText')}
          </button>
          <button onClick={() => scrollToSection('contact')}>
            {t('header.contact')}
          </button>
        </nav>
        <div className="header-right">
          {/* Login abre /admin em nova aba */}
          <a
            href="/admin"
            className="login-btn"
            rel="noopener noreferrer"
          >
            Login
          </a>
          {/* Botão renomeado para “Acesse o App” */}
          <a
            href="https://app.cafecomfinancasoficial.com/auth/sign-in"
            className="signup-btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            Acesse o App
          </a>
          <div className="language-switcher">
            <button onClick={() => changeLanguage('pt')} className="flag-btn">
              <img src={ptFlag} alt="PT" className="flag-icon" />
            </button>
            <button onClick={() => changeLanguage('en')} className="flag-btn">
              <img src={enFlag} alt="EN" className="flag-icon" />
            </button>
            <button onClick={() => changeLanguage('es')} className="flag-btn">
              <img src={esFlag} alt="ES" className="flag-icon" />
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section id="hero" className="hero">
        <div className="hero-left">
          <h1>{t('hero.title')}</h1>
          <p>{t('hero.subtitle')}</p>

          {/* Comentados (removidos) a pedido do cliente
          <div className="hero-buttons">
            <button className="primary-btn">{t('hero.getStarted')}</button>
            <button className="secondary-btn">{t('hero.watchVideo')}</button>
          </div>
          */}

          <div className="trusted-customers">
            <p className="trusted-title">{t('trustedCustomers')}:</p>
            <div className="trusted-logos">
              <img src={fortuneLogo} alt="Fortune" className="trusted-logo" />
              <img src={fastCompanyLogo} alt="Fast Company" className="trusted-logo" />
              <img src={forbesLogo} alt="Forbes" className="trusted-logo" />
              <img src={natGeoLogo} alt="National Geographic" className="trusted-logo" />
            </div>
          </div>
        </div>
        <div className="hero-right">
          <img src={heroImage} alt="Hero" className="hero-image" />
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
            <img src={statsImage} alt="Stats Illustration" />
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

      {/* VIDEOS / BLOG SECTION (CARROSSEL) */}
      <section id="blog" className="blog-section">
        <h2 className="blog-title">Vídeos</h2>
        <p className="blog-subtitle">Confira nossos vídeos de demonstração.</p>

        <div className="carousel-wrapper">
          <button className="carousel-arrow left" onClick={scrollLeft}>
            &lt;
          </button>

          <div className="carousel-container">
            <div className="carousel" ref={carouselRef}>
              {(() => {
                // 3 vídeos por coluna
                const columns = [];
                for (let i = 0; i < videos.length; i += 3) {
                  columns.push(
                    <div className="video-column" key={`col-${i}`}>
                      {[videos[i], videos[i + 1], videos[i + 2]]
                        .filter(Boolean)
                        .map((video, idx) => (
                          <div className="blog-item" key={video.id + '_' + idx}>
                            <a href={video.link} target="_blank" rel="noopener noreferrer">
                              <img
                                src={`https://img.youtube.com/vi/${getYouTubeId(video.link)}/hqdefault.jpg`}
                                alt={video.titulo}
                              />
                            </a>
                            <h3>{video.titulo}</h3>
                            <p>{video.descricao}</p>
                          </div>
                        ))}
                    </div>
                  );
                }
                return columns;
              })()}
            </div>
          </div>

          <button className="carousel-arrow right" onClick={scrollRight}>
            &gt;
          </button>
        </div>
      </section>

      {/* REVIEWS SECTION */}
      <section id="reviews" className="reviews-section">
        <h2 className="reviews-title">{t('reviewsSection.heading')}</h2>
        <p className="reviews-subtitle">{t('reviewsSection.subtitle')}</p>
        <div className="reviews-grid">
          {t('reviewsSection.items', { returnObjects: true }).map((item, index) => (
            <div className="review-item" key={index}>
              <img src={item.image} alt={item.name} className="review-image" />
              <p className="review-text">{item.review}</p>
              <h4 className="review-name">{item.name}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING SECTION */}
      <section id="pricing" className="pricing-section">
        <h2 className="pricing-title">{t('pricing.heading')}</h2>
        <p className="pricing-subtitle">{t('pricing.subtitle')}</p>
        <div className="pricing-cards">
          {t('pricing.plans', { returnObjects: true }).map((plan, index) => (
            <div
              className={`pricing-card ${index === 1 ? 'highlight' : ''}`}
              key={index}
            >
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

      {/* FAQ SECTION */}
      <section id="faq" className="faq-section">
        <h2 className="faq-title">{t('faqSection.heading')}</h2>
        <p className="faq-subtitle">{t('faqSection.subtitle')}</p>
        <div className="faq-items">
          {[...t('faqSection.items', { returnObjects: true })].map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div className="faq-item" key={idx}>
                <button
                  className="faq-question"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                >
                  {faq.question}
                  <span>{isOpen ? '-' : '+'}</span>
                </button>
                {isOpen && (
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* DOWNLOAD APP SECTION */}
      <section id="download" className="download-section">
        <div className="download-container">
          <div className="download-text">
            <h2>{t('downloadSection.heading')}</h2>
            <p>{t('downloadSection.subtitle')}</p>
            <div className="download-buttons">
              <button className="store-btn appstore-btn">
                {t('downloadSection.appStore')}
              </button>
              <button className="store-btn googleplay-btn">
                {t('downloadSection.googlePlay')}
              </button>
            </div>
          </div>
          <div className="download-image">
            <img
              src={smartphoneImg}
              alt="Smartphone"
              className="smartphone-image"
            />
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="contact-section">
        <div className="contact-container">
          <div className="contact-form">
            <h2>{t('contactSection.title')}</h2>
            <p>{t('contactSection.subtitle')}</p>
            <form onSubmit={(e) => e.preventDefault()}>
              <input
                type="text"
                placeholder={t('contactSection.placeholderName')}
                required
              />
              <input
                type="email"
                placeholder={t('contactSection.placeholderEmail')}
                required
              />
              <input
                type="text"
                placeholder={t('contactSection.placeholderSubject')}
                required
              />
              <textarea
                placeholder={t('contactSection.placeholderMessage')}
                rows="5"
                required
              />
              <button type="submit">{t('contactSection.sendButton')}</button>
            </form>
          </div>
          <div className="contact-illustration">
            <img
              src={contactIllustration}
              alt="Contact Illustration"
              className="contact-image"
            />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-links">
          <button onClick={() => scrollToSection('hero')}>
            {t('footerSection.links.home')}
          </button>
          <button onClick={() => scrollToSection('about')}>
            {t('footerSection.links.about')}
          </button>
          <button onClick={() => scrollToSection('blog')}>
            {t('footerSection.links.blog')}
          </button>
          <button onClick={() => scrollToSection('pricing')}>
            {t('footerSection.links.pricing')}
          </button>
          <button onClick={() => scrollToSection('contact')}>
            {t('footerSection.links.contact')}
          </button>
        </div>
        <div className="footer-social">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaYoutube />
          </a>
        </div>
        <p>© 2025 - {t('footerSection.links.home')} Treact.</p>
      </footer>
    </div>
  );
}

export default App;

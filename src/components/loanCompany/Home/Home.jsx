import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckIcon, LightBulbIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { PeopleAlt, DashboardCustomize, Security, Lock, CloudUpload, TrendingUp } from '@mui/icons-material';
import { InvestmentFeaturesContext } from '../../../context/InvestmentFeaturesContext';
import InvestmentBanner from '../../../assets/Img/Advert-Banner.jpg'; // Placeholder
import './Home.css';

const features = [
  {
    icon: PeopleAlt,
    title: 'ClientSync Portal',
    description: 'Simplify client interactions with a user-friendly portal for loan applications and tracking.',
    image: 'https://images.unsplash.com/photo-1556740758-90de0a3e6b9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
  },
  {
    icon: DashboardCustomize,
    title: 'Smart Portfolio Analytics',
    description: 'Gain actionable insights with real-time analytics for loan performance and risk.',
    image: 'https://images.unsplash.com/photo-1551288049-b1b3c96bff7d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
  },
  {
    icon: Security,
    title: 'Regulatory Assurance',
    description: 'Ensure compliance with automated checks and comprehensive audit trails.',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
  },
  {
    icon: Lock,
    title: 'Enterprise-Grade Security',
    description: 'Safeguard data with advanced encryption and customizable access controls.',
    image: 'https://images.unsplash.com/photo-1563986768494-4dee2763c55a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
  },
  {
    icon: CloudUpload,
    title : 'Efficient Document Management',
    description: 'Streamline loan processing with secure document uploads and e-signatures.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
  },
  {
    icon: TrendingUp,
    title: 'AI-Powered Risk Analysis',
    description: 'Optimize lending decisions with predictive modeling and risk assessment tools.',
    image: 'https://images.unsplash.com/photo-1556740714-3c9d6e7e7b0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
  },
];

const FeatureCard = ({ icon: Icon, title }) => {
  return (
    <div className="feature-card Gen-Boxshadow">
      <motion.div
        className="card-inner"
        whileHover={{ rotateY: 180 }}
        transition={{ duration: 0.4 }}
      >
        <div className="card-face card-front">
          <Icon className="feature-icon" />
        </div>
        <div className="card-face card-back">
          <p>{title}</p>
        </div>
      </motion.div>
    </div>
  );
};

const Home = () => {
  const context = useContext(InvestmentFeaturesContext);
  if (!context) {
    console.error('InvestmentFeaturesContext is undefined. Ensure Home is wrapped in InvestmentFeaturesProvider.');
    return <div>Error: Context not found. Please try again later.</div>;
  }
  const { selectedFeatures, toggleFeature, removeFeature } = context;

  return (
    <div className="home-page">
      <header className="crm-header" style={{ backgroundImage: 'ur[](https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)' }}>
        <div className="large-container">
          <div className="crm-hero-sec">
            <div className="crm-hero-Txtx">
              <h1 className="big-text">LoanElite: Redefining Loan Management</h1>
              <p>Innovative. Secure. Scalable. Transform your loan operations with unmatched precision.</p>
            </div>
          </div>

          <div className="product-Dsspl">
            <h3>
              Select the features you need for smarter lending{' '}
              <span>
                <LightBulbIcon />
              </span>
            </h3>
            <div className="product-Dsspl-Grid">
              {features.map((feature) => {
                const isSelected = selectedFeatures.includes(feature.title);
                return (
                  <div
                    key={feature.title}
                    className={`prosu-Card Gen-Boxshadow ${isSelected ? 'selected selected-card' : ''}`}
                    onClick={() => toggleFeature(feature.title)}
                    style={{ cursor: 'pointer', position: 'relative' }}
                  >
                    <span className="check-icon-span">
                      {isSelected && <CheckIcon />}
                    </span>
                    <feature.icon className="feature-icon" />
                    <p>{feature.title}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="regg-abhns">
            <p>
              Explore{' '}
              {selectedFeatures.length === 0 ? (
                <span>All</span>
              ) : (
                selectedFeatures.map((title) => (
                  <span key={title}>
                    {title}
                    <XMarkIcon
                      onClick={() => removeFeature(title)}
                      style={{
                        width: '13px',
                        height: '13px',
                        marginLeft: '4px',
                        cursor: 'pointer',
                      }}
                    />
                  </span>
                ))
              )}
            </p>
            <Link to="/signup" className="btn-primary-bg">
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* <section className="global-secs">
        <img src={InvestmentBanner} alt="LoanElite Banner" />
      </section> */}

      <div className="site-container">
        <div className="FFg-Secs">
          {/* <div className="FFg-Secs-Banner">
            <img src={InvestmentBanner} alt="About LoanElite" />
          </div> */}
          <div className="FFg-Secs-Dlt">
            <div>
              <h2 className="mid-text">Empowering Financial Institutions with LoanElite</h2>
              <p>
                A scalable platform designed to streamline loan management, enhance security, and
                drive profitability.
              </p>
              <Link to="/contact" className="btn-primary-bg">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>

      <section className="cloka-sec">
        <div className="large-container">
          <div className="ghka-Topa-sec">
            <div className="ghka-Topa">
              <h6>LoanElite Features</h6>
              <h2 className="big-text">Innovative. Secure. Scalable.</h2>
              <p>Explore our powerful tools designed for modern loan management.</p>
              <div className="huj-seca">
                {features.map((feature) => (
                  <FeatureCard key={feature.title} icon={feature.icon} title={feature.title} />
                ))}
              </div>
            </div>
          </div>
          <div className="faq-section">
            <h2 className="mid-text">Frequently Asked Questions</h2>
            <ul>
              <li>
                <strong>What is LoanElite?</strong>
                <p>
                  LoanElite is a comprehensive loan management platform offering tools for client
                  interactions, analytics, and compliance.
                </p>
              </li>
              <li>
                <strong>How secure is LoanElite?</strong>
                <p>
                  We use enterprise-grade encryption and automated compliance checks to protect your
                  data.
                </p>
              </li>
              <li>
                <strong>Can I integrate LoanElite with my systems?</strong>
                <p>
                  Yes, LoanElite supports seamless integration with existing financial systems.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="cta-section" style={{ backgroundImage: 'ur[](https://images.unsplash.com/photo-1460925895917-afdab8276846?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)' }}>
        <div className="cta-content">
          <h2>Lead the Future of Lending</h2>
          <p>Join elite financial institutions revolutionizing loan management with LoanElite.</p>
          <Link to="/contact" className="btn-primary-bg">
            Schedule a Consultation
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
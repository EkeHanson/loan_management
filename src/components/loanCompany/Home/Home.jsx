import React from 'react';
import { PeopleAlt, DashboardCustomize, Security, Lock, CloudUpload, TrendingUp } from '@mui/icons-material';
import './Home.css';

const features = [
  {
    icon: <PeopleAlt className="icon" />,
    title: 'ClientSync Portal',
    description: 'Simplify client interactions with a user-friendly portal for loan applications and tracking.',
    image: 'https://images.unsplash.com/photo-1556740758-90de0a3e6b9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  },
  {
    icon: <DashboardCustomize className="icon" />,
    title: 'Smart Portfolio Analytics',
    description: 'Gain actionable insights with real-time analytics for loan performance and risk.',
    image: 'https://images.unsplash.com/photo-1551288049-b1b3c96bff7d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  },
  {
    icon: <Security className="icon" />,
    title: 'Regulatory Assurance',
    description: 'Ensure compliance with automated checks and comprehensive audit trails.',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  },
  {
    icon: <Lock className="icon" />,
    title: 'Enterprise-Grade Security',
    description: 'Safeguard data with advanced encryption and customizable access controls.',
    image: 'https://images.unsplash.com/photo-1563986768494-4dee2763c55a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  },
  {
    icon: <CloudUpload className="icon" />,
    title: 'Efficient Document Management',
    description: 'Streamline loan processing with secure document uploads and e-signatures.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  },
  {
    icon: <TrendingUp className="icon" />,
    title: 'AI-Powered Risk Analysis',
    description: 'Optimize lending decisions with predictive modeling and risk assessment tools.',
    image: 'https://images.unsplash.com/photo-1556740714-3c9d6e7e7b0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  }
];

const Home = () => {
  return (
    <div className="landing-container">
      <header className="hero" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)' }}>
        <div className="hero-content">
          <h1>LoanElite: Redefining Loan Management</h1>
          <p>Innovative. Secure. Scalable. Transform your loan operations with unmatched precision.</p>
          <a href="/demo" className="hero-button">Explore LoanElite</a>
        </div>
      </header>

      <section className="features">
        {features.map((feature, index) => (
          <div className="feature-card" key={index}>
            <img src={feature.image} alt={feature.title} className="feature-image" />
            <div className="feature-content">
              {feature.icon}
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="cta-section" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1460925895917-afdab8276846?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)' }}>
        <div className="cta-content">
          <h2>Lead the Future of Lending</h2>
          <p>Join elite financial institutions revolutionizing loan management with LoanElite.</p>
          <a href="/contact" className="cta-button">Schedule a Consultation</a>
        </div>
      </section>
    </div>
  );
};

export default Home;


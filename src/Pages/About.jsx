import React from 'react';
import { Heart, ShieldCheck, Users, Globe } from 'lucide-react';

function About() {
  return (
    <div className="about-page" style={{ padding: '80px 0', color: '#fff' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        
        {/* Hero Section */}
        <div className="about-hero" style={{ textAlign: 'center', marginBottom: '100px' }}>
          <h1 style={{ fontSize: '64px', fontWeight: '800', marginBottom: '24px' }}>
            We're on a mission to <br />
            <span className="text-gradient">bridge the gap</span> of hope.
          </h1>
          <p style={{ fontSize: '20px', color: 'rgba(255,255,255,0.7)', maxWidth: '800px', margin: '0 auto', lineHeight: '1.6' }}>
            FundBridge is India's most trusted crowdfunding platform, dedicated to helping people raise funds for medical emergencies, education, and community causes.
          </p>
        </div>

        {/* Stats Section */}
        <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', marginBottom: '120px' }}>
          {[
            { label: 'Causes Helped', value: '5,000+' },
            { label: 'Donors', value: '100k+' },
            { label: 'Raised', value: '₹50Cr+' },
            { label: 'Trust Score', value: '9.8/10' },
          ].map((stat, i) => (
            <div key={i} style={{ 
              background: 'rgba(255,255,255,0.05)', 
              backdropFilter: 'blur(10px)', 
              padding: '30px', 
              borderRadius: '24px', 
              textAlign: 'center',
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              <h2 style={{ fontSize: '36px', fontWeight: '800', marginBottom: '8px', color: 'var(--brand-orange)' }}>{stat.value}</h2>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontWeight: '600' }}>{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Story Section */}
        <div className="story-section" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center', marginBottom: '120px' }}>
          <div className="story-content">
            <h2 style={{ fontSize: '40px', marginBottom: '24px' }}>Our Story</h2>
            <p style={{ fontSize: '18px', lineHeight: '1.8', color: 'rgba(255,255,255,0.8)', marginBottom: '24px' }}>
              FundBridge was born out of a simple observation: thousands of life-saving treatments in India are delayed or cancelled due to lack of funds. We wanted to create a platform that doesn't just collect money, but builds a community of hope.
            </p>
            <p style={{ fontSize: '18px', lineHeight: '1.8', color: 'rgba(255,255,255,0.8)' }}>
              Since our inception in 2024, we've helped thousands of families navigate their toughest times by connecting them with compassionate donors across the globe.
            </p>
          </div>
          <div className="story-visual" style={{ position: 'relative' }}>
            <div style={{ 
              width: '100%', 
              height: '400px', 
              background: 'linear-gradient(45deg, var(--primary), var(--secondary))', 
              borderRadius: '32px',
              opacity: '0.2',
              position: 'absolute',
              top: '20px',
              left: '20px',
              zIndex: '-1'
            }}></div>
            <div style={{ 
              width: '100%', 
              height: '400px', 
              background: 'rgba(255,255,255,0.05)', 
              backdropFilter: 'blur(20px)', 
              borderRadius: '32px',
              border: '1px solid rgba(255,255,255,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden'
            }}>
              <Heart size={120} color="var(--brand-orange)" />
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="values-section" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '40px', marginBottom: '60px' }}>Our Values</h2>
          <div className="values-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
            {[
              { icon: <ShieldCheck size={32} />, title: 'Transparency', desc: 'Every donation is tracked and verified to ensure it reaches the right hands.' },
              { icon: <Users size={32} />, title: 'Community', desc: 'We believe in the power of collective action to solve individual struggles.' },
              { icon: <Globe size={32} />, title: 'Accessibility', desc: 'Making fundraising available to every corner of the country, regardless of background.' },
            ].map((value, i) => (
              <div key={i} style={{ 
                padding: '40px', 
                background: 'rgba(255,255,255,0.03)', 
                borderRadius: '24px', 
                border: '1px solid rgba(255,255,255,0.05)',
                transition: 'transform 0.3s ease'
              }}>
                <div style={{ color: 'var(--brand-orange)', marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>{value.icon}</div>
                <h3 style={{ fontSize: '24px', marginBottom: '16px' }}>{value.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: '1.6' }}>{value.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default About;

import React from 'react';
import { PenTool, Send, Users, TrendingUp } from 'lucide-react';

function HowItWorks() {
  const steps = [
    {
      icon: <PenTool size={32} />,
      title: 'Start Your Campaign',
      desc: 'Fill in the basic details about your cause, upload an image, and set your goal. It takes less than 5 minutes.'
    },
    {
      icon: <Send size={32} />,
      title: 'Share with Community',
      desc: 'Use our built-in sharing tools to spread the word on WhatsApp, Facebook, and more. Reach donors instantly.'
    },
    {
      icon: <Users size={32} />,
      title: 'Receive Donations',
      desc: 'Watch as people from across the country contribute to your cause. Every bit helps you get closer to your goal.'
    },
    {
      icon: <TrendingUp size={32} />,
      title: 'Withdraw Funds',
      desc: 'Once you reach your goal or need the funds, withdraw them directly to your bank account with minimal hassle.'
    }
  ];

  return (
    <div className="how-it-works-page" style={{ padding: '100px 0', color: '#fff' }}>
      <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 20px' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <h1 style={{ fontSize: '56px', fontWeight: '800', marginBottom: '24px' }}>Simple. <span className="text-gradient">Fast.</span> Transparent.</h1>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.6)' }}>Getting help on FundBridge is as easy as sharing a story.</p>
        </div>

        <div className="steps-container" style={{ position: 'relative' }}>
          {/* Vertical Line */}
          <div style={{ 
            position: 'absolute', 
            left: '50%', 
            top: '0', 
            bottom: '0', 
            width: '2px', 
            background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.1), transparent)',
            transform: 'translateX(-50%)',
            display: 'block'
          }}></div>

          {steps.map((step, i) => (
            <div key={i} style={{ 
              display: 'flex', 
              justifyContent: i % 2 === 0 ? 'flex-start' : 'flex-end', 
              marginBottom: '80px', 
              position: 'relative',
              width: '100%'
            }}>
              {/* Dot */}
              <div style={{ 
                position: 'absolute', 
                left: '50%', 
                top: '20px', 
                width: '12px', 
                height: '12px', 
                background: 'var(--brand-orange)', 
                borderRadius: '50%', 
                transform: 'translateX(-50%)',
                boxShadow: '0 0 20px var(--brand-orange)'
              }}></div>

              <div style={{ 
                width: '45%', 
                background: 'rgba(255,255,255,0.05)', 
                padding: '40px', 
                borderRadius: '24px', 
                border: '1px solid rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)'
              }}>
                <div style={{ color: 'var(--brand-orange)', marginBottom: '20px' }}>{step.icon}</div>
                <h3 style={{ fontSize: '24px', marginBottom: '16px' }}>{step.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: '1.6' }}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ 
          marginTop: '100px', 
          textAlign: 'center', 
          padding: '60px', 
          background: 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01))',
          borderRadius: '32px',
          border: '1px solid rgba(255,255,255,0.1)'
        }}>
          <h2 style={{ fontSize: '32px', marginBottom: '20px' }}>Ready to make a difference?</h2>
          <button className="btn btn-premium" style={{ padding: '16px 40px', fontSize: '18px' }}>Launch Your Fundraiser</button>
        </div>

      </div>
    </div>
  );
}

export default HowItWorks;

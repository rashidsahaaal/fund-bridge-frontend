import React from 'react';
import { Star, Quote } from 'lucide-react';

function SuccessStories() {
  const stories = [
    {
      title: "Saving Baby Aarav's Heart",
      desc: "Within 48 hours, the community raised ₹12 Lakhs for Aarav's urgent heart surgery. Today, he is a healthy, playful toddler.",
      amount: "₹12.4 Lakhs",
      donors: "1,240",
      image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Education for Maya",
      desc: "Maya, a bright student from a small village, is now pursuing her Engineering degree in Mumbai thanks to 500+ kind donors.",
      amount: "₹4.5 Lakhs",
      donors: "542",
      image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Rebuilding After Floods",
      desc: "When the floods hit Kerala, FundBridge donors came together to rebuild 10 homes for families who lost everything.",
      amount: "₹25 Lakhs",
      donors: "3,100",
      image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&q=80&w=800"
    }
  ];

  return (
    <div className="success-stories-page" style={{ padding: '100px 0', color: '#fff' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <h1 style={{ fontSize: '56px', fontWeight: '800', marginBottom: '24px' }}>Real People. <br /><span className="text-gradient">Real Impact.</span></h1>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.6)', maxWidth: '600px', margin: '0 auto' }}>
            Every campaign tells a story of hope and resilience. Here are a few that touched our hearts.
          </p>
        </div>

        <div className="stories-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '40px' }}>
          {stories.map((story, i) => (
            <div key={i} style={{ 
              background: 'rgba(255,255,255,0.03)', 
              borderRadius: '32px', 
              overflow: 'hidden', 
              border: '1px solid rgba(255,255,255,0.1)',
              transition: 'transform 0.3s ease',
              cursor: 'pointer'
            }} className="story-card">
              <div style={{ height: '240px', overflow: 'hidden' }}>
                <img src={story.image} alt={story.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '30px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--brand-orange)', marginBottom: '16px' }}>
                  <Star size={16} fill="var(--brand-orange)" />
                  <span style={{ fontSize: '14px', fontWeight: '700' }}>SUCCESS STORY</span>
                </div>
                <h3 style={{ fontSize: '24px', marginBottom: '16px' }}>{story.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: '1.6', marginBottom: '24px', height: '80px', overflow: 'hidden' }}>{story.desc}</p>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px', background: 'rgba(255,255,255,0.03)', borderRadius: '20px' }}>
                  <div>
                    <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginBottom: '4px' }}>RAISED</div>
                    <div style={{ fontSize: '18px', fontWeight: '800', color: 'var(--brand-green)' }}>{story.amount}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginBottom: '4px' }}>DONORS</div>
                    <div style={{ fontSize: '18px', fontWeight: '800' }}>{story.donors}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonial Quote */}
        <div style={{ 
          marginTop: '120px', 
          textAlign: 'center', 
          padding: '80px', 
          background: 'rgba(255,255,255,0.02)', 
          borderRadius: '40px',
          border: '1px solid rgba(255,255,255,0.05)',
          position: 'relative'
        }}>
          <div style={{ position: 'absolute', top: '40px', left: '40px', opacity: '0.1' }}>
            <Quote size={80} />
          </div>
          <h2 style={{ fontSize: '28px', lineHeight: '1.6', fontStyle: 'italic', fontWeight: '400', maxWidth: '800px', margin: '0 auto', color: 'rgba(255,255,255,0.9)' }}>
            "FundBridge didn't just help me pay for my surgery; they gave me a second chance at life when I thought all doors were closed. The kindness of strangers is a powerful thing."
          </h2>
          <div style={{ marginTop: '32px' }}>
            <div style={{ fontWeight: '700', fontSize: '18px' }}>- Rajesh Kumar</div>
            <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px' }}>Campaign Beneficiary</div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default SuccessStories;

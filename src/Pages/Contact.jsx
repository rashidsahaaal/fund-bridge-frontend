import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

function Contact() {
  return (
    <div className="contact-page" style={{ padding: '100px 0', color: '#fff' }}>
      <div className="container" style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <h1 style={{ fontSize: '56px', fontWeight: '800', marginBottom: '24px' }}>Get in <span className="text-gradient">Touch</span></h1>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.6)', maxWidth: '600px', margin: '0 auto' }}>
            Have questions? We're here to help. Reach out to our 24/7 support team.
          </p>
        </div>

        <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '60px' }}>
          
          {/* Contact Info */}
          <div className="contact-info">
            <div style={{ marginBottom: '48px' }}>
              <h2 style={{ fontSize: '32px', marginBottom: '32px' }}>Contact Information</h2>
              
              <div style={{ display: 'flex', gap: '20px', marginBottom: '32px' }}>
                <div style={{ width: '56px', height: '56px', background: 'rgba(255,255,255,0.05)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brand-orange)' }}>
                  <Mail size={24} />
                </div>
                <div>
                  <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', marginBottom: '4px' }}>Email us at</div>
                  <div style={{ fontSize: '18px', fontWeight: '600' }}>support@fundbridge.com</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '20px', marginBottom: '32px' }}>
                <div style={{ width: '56px', height: '56px', background: 'rgba(255,255,255,0.05)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brand-orange)' }}>
                  <Phone size={24} />
                </div>
                <div>
                  <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', marginBottom: '4px' }}>Call us at</div>
                  <div style={{ fontSize: '18px', fontWeight: '600' }}>+91 1800 123 4567</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '20px' }}>
                <div style={{ width: '56px', height: '56px', background: 'rgba(255,255,255,0.05)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brand-orange)' }}>
                  <MapPin size={24} />
                </div>
                <div>
                  <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', marginBottom: '4px' }}>Visit our office</div>
                  <div style={{ fontSize: '18px', fontWeight: '600' }}>123, Tech Park, Bangalore, India</div>
                </div>
              </div>
            </div>

            <div style={{ padding: '32px', background: 'rgba(255,255,255,0.03)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <h3 style={{ fontSize: '20px', marginBottom: '12px' }}>24/7 Expert Support</h3>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '15px', lineHeight: '1.6' }}>
                Our dedicated team of campaign managers are always available to help you set up or manage your fundraiser.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-container" style={{ background: 'rgba(255,255,255,0.02)', padding: '48px', borderRadius: '40px', border: '1px solid rgba(255,255,255,0.05)', backdropFilter: 'blur(20px)' }}>
            <form>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
                <div className="form-group">
                  <label style={{ display: 'block', marginBottom: '10px', fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}>First Name</label>
                  <input className="form-input" placeholder="John" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }} />
                </div>
                <div className="form-group">
                  <label style={{ display: 'block', marginBottom: '10px', fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}>Last Name</label>
                  <input className="form-input" placeholder="Doe" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }} />
                </div>
              </div>
              <div className="form-group" style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', marginBottom: '10px', fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}>Email Address</label>
                <input className="form-input" type="email" placeholder="john@example.com" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }} />
              </div>
              <div className="form-group" style={{ marginBottom: '32px' }}>
                <label style={{ display: 'block', marginBottom: '10px', fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}>Your Message</label>
                <textarea className="form-input form-textarea" placeholder="How can we help you?" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', minHeight: '150px' }} />
              </div>
              <button className="btn btn-premium" style={{ width: '100%', padding: '16px', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                <Send size={18} /> Send Message
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Contact;

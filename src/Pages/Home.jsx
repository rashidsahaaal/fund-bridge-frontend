import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Share2, MessageCircle, BriefcaseMedical } from 'lucide-react';
import indiaMap from "../assets/india_map.png";
import phoneMockup from "../assets/phone_mockup.png";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

function Home({
  campaigns,
  handleStartCampaign,
  handlePayment,
  setSelectedCampaign,
  token,
  setShowSignupModal,
  setShowCampaignModal
}) {
  return (
    <>
      {/* HERO SECTION */}
      <section className="hero">
        <div className="badge campaign-badge" style={{ position: 'relative', top: 0, right: 0, marginBottom: '20px', display: 'inline-block' }}>
          Helping 500+ Causes Monthly
        </div>
        <h1>Turning compassion <br /><span className="text-gradient">into real-world impact.</span></h1>
        <p>The most trusted platform to raise funds for medical, personal, and community causes. Connect with thousands of donors and bring your vision to life.</p>
        {!token && (
          <button className="btn btn-primary" onClick={() => setShowSignupModal(true)} style={{ padding: '16px 32px', fontSize: '16px' }}>
            Join the Community
          </button>
        )}
      </section>

      {/* WHAT IS CROWDFUNDING SECTION */}
      <section className="info-section">
        <div className="info-header">
          <h2>What Is Crowdfunding?</h2>
          <div className="section-underline"></div>
        </div>
        <div className="info-grid">
          <div className="info-text">
            <p>
              Crowdfunding is the process of raising funds with the help of people across the country,
              using donation-based fundraising platforms as the medium. Crowdfunding on FundBridge
              helps fund your emergency medical treatment or chosen cause with free 24*7 support
              & expert assistance. Anyone can raise funds on donation platforms - from a newborn
              child, senior citizens to NGOs & more!
            </p>
            <p>
              With donation-based crowdfunding, getting financial help for patients in India is
              convenient and reliable. Unlike medical loans and insurance, fundraising via online
              crowdfunding platforms requires no liability to pay back the funds raised. So, all
              the amount generated can be used to cover the cost of emergency medical treatment.
            </p>
            <button className="btn btn-premium" onClick={handleStartCampaign}>Start Your Campaign</button>
          </div>
          <div className="info-image-container">
            <img src={indiaMap} alt="India Crowdfunding Map" className="info-image" />
          </div>
        </div>
      </section>

      {/* WHY CHOOSE MEDICAL FUNDRAISING */}
      <section className="why-section">
        <div className="why-grid">
          <div className="why-content">
            <h2>You can Choose Medical Fundraising with FundBridge if</h2>
            <ul className="why-list">
              <li>You need funds urgently</li>
              <li>You have limited savings</li>
              <li>Medical Loans and Insurance are not enough</li>
            </ul>
            <p className="why-text">
              Get financial help for medical treatment by raising funds
              with the support of donors and well-wishers online.
            </p>
            <button className="btn btn-outline" onClick={() => setShowCampaignModal(true)}>GET A CALLBACK</button>
          </div>
          <div className="why-image-container">
            <img src={phoneMockup} alt="Medical Fundraising Phone Mockup" className="why-image" />
          </div>
        </div>
      </section>

      {/* CAMPAIGNS BY CATEGORY */}
      <div id="discover-causes" style={{ marginBottom: '80px' }}>
        <div className="section-header" style={{ textAlign: 'center', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: '8px' }}>
          <h2 className="section-title" style={{ fontSize: '48px' }}>Empowering Change</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '18px', maxWidth: '600px', margin: '0 auto' }}>Join thousands of donors in supporting verified causes. Browse our active fundraisers and make a difference today.</p>
        </div>

        {/* SINGLE ROW CAMPAIGN SLIDER */}
        <div style={{ marginBottom: '80px' }}>
          <div className="section-header" style={{ marginBottom: '24px' }}>
            <h2 className="section-title">Active Campaigns</h2>
            <div style={{ color: 'var(--text-secondary)', fontSize: '14px', fontWeight: '600' }}>
              {campaigns.length} Causes Needs Your Support
            </div>
          </div>

          <div className="slider-container">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 4 },
              }}
              className="mySwiper"
            >
              {campaigns.map((c, index) => {
                const progress = Math.min(Math.round((c.raised_amount / c.goal_amount) * 100), 100);
                const isUrgent = c.category === 'Emergency' || c.raised_amount < (c.goal_amount * 0.1);

                return (
                  <SwiperSlide key={c.id}>
                    <div
                      className={`campaign-card ${isUrgent ? 'urgent-highlight' : ''}`}
                      style={{ animationDelay: `${index * 0.1}s`, cursor: 'pointer' }}
                      onClick={() => setSelectedCampaign(c)}
                    >
                      <div className="campaign-image-container">
                        <div className="card-badges">
                          {isUrgent && <div className="badge-urgent">URGENT</div>}
                        </div>
                        {c.image ? (
                          <img
                            src={c.image.startsWith("http") ? c.image : `${API_BASE_URL}${c.image}`}
                            alt={c.title}
                            className="campaign-image"
                            onError={(e) => { e.target.style.display = "none"; }}
                          />
                        ) : (
                          <div className="campaign-image" style={{ background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>No Image</div>
                        )}
                        <div className="campaign-card-icon">
                          <BriefcaseMedical size={20} color={isUrgent ? 'var(--brand-red)' : '#666'} />
                        </div>
                      </div>
                      <div className="campaign-content">
                        <h3 className="campaign-title">{c.title}</h3>
                        <div className="campaign-author">by {c.user_username || "FundBridge Team"}</div>

                        <div className="share-buttons">
                          <button className="share-btn whatsapp">
                            <MessageCircle size={14} /> Share
                          </button>
                          <button className="share-btn facebook">
                            <Share2 size={14} /> Share
                          </button>
                        </div>

                        <div className="progress-container">
                          <div className="progress-stats">
                            <span className="raised-amt">
                              ₹{Number(c.raised_amount).toLocaleString()} Raised
                            </span>
                            <span className="percent-amt">
                              {progress}%
                            </span>
                          </div>
                          <div className="progress-bar-bg">
                            <div
                              className="progress-bar-fill"
                              style={{ width: `${progress}%` }}
                            ></div>
                          </div>
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePayment(c.id);
                          }}
                          style={{
                            marginTop: "16px",
                            width: "100%",
                            padding: "12px",
                            background: "#22c55e",
                            color: "white",
                            border: "none",
                            borderRadius: "10px",
                            fontWeight: "bold",
                            cursor: "pointer",
                            fontSize: "15px"
                          }}
                        >
                          Donate Now
                        </button>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>

        {/* CTA CARD */}
        <div style={{ marginBottom: '80px' }}>
          <div
            className="campaign-card"
            style={{
              cursor: 'pointer',
              background: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              minHeight: '300px',
              width: '100%',
              maxWidth: '800px',
              margin: '0 auto',
              border: '2px dashed #ddd',
              boxShadow: 'none'
            }}
            onClick={handleStartCampaign}
          >
            <div style={{ padding: '40px' }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: '#f8f9fa',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px',
                fontSize: '32px',
                color: 'var(--brand-orange)',
                border: '1px solid #eee'
              }}>+</div>
              <h3 style={{ marginBottom: '12px', color: '#333' }}>Start Your Own Cause</h3>
              <p style={{ color: '#666', marginBottom: '24px', maxWidth: '500px' }}>Have a mission you want to fund? Start your campaign in minutes and reach thousands of donors.</p>
              <button className="donate-btn" style={{ maxWidth: '200px', margin: '0 auto' }}>Launch Now</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;

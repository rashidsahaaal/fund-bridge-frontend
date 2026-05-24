
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./index.css";
import indiaMap from "./assets/india_map.png";
import phoneMockup from "./assets/phone_mockup.png";

// Swiper Imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Icons
import { Share2, Phone, MessageCircle, Heart, BriefcaseMedical } from 'lucide-react';

// Pages
import Home from "./Pages/Home";
import About from "./Pages/About";
import HowItWorks from "./Pages/HowItWorks";
import SuccessStories from "./Pages/SuccessStories";
import Contact from "./Pages/Contact";

// Components
import ScrollToTop from "./Components/ScrollToTop";

const API_BASE_URL = import.meta.env.VITE_API_URL || "https://fundbridge-backend-rashid.onrender.com";

function App() {
const [campaigns, setCampaigns] = useState([
  {
    id: 1,
    title: "Clean Water for Rural Communities",
    description: "Providing clean water access.",
    raised_amount: 13150,
    goal_amount: 50000,
    image: "https://images.unsplash.com/photo-1542810634-71277d95dcbb"
  },
  {
    id: 2,
    title: "Education for Every Child",
    description: "Helping children get education.",
    raised_amount: 8800,
    goal_amount: 25000,
    image: "https://images.unsplash.com/photo-1509099836639-18ba1795216d"
  },
  {
    id: 3,
    title: "Emergency Medical Relief Fund",
    description: "Emergency support for patients.",
    raised_amount: 45000,
    goal_amount: 100000,
    image: "https://images.unsplash.com/photo-1584515933487-779824d29309"
  }
]);  // Auth state
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [username, setUsername] = useState(localStorage.getItem("username") || null);
  
  // Modals state
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showCampaignModal, setShowCampaignModal] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  const [authForm, setAuthForm] = useState({ username: "", password: "", email: "" });
  const [campaignForm, setCampaignForm] = useState({ title: "", description: "", goal_amount: "", image: "", category: "Medical" });
  const [authError, setAuthError] = useState("");
  const [donations, setDonations] = useState([]);



  useEffect(() => {
    fetchCampaigns();
  }, []);

  useEffect(() => {
    if (selectedCampaign) {
      fetchDonations(selectedCampaign.id);
    }
  }, [selectedCampaign?.id]);

  const fetchDonations = (id) => {
    fetch(`${API_BASE_URL}/api/v1/campaigns/${id}/donations/`)
      .then(res => res.json())
      .then(data => setDonations(data))
      .catch(err => console.error("Error fetching donations", err));
  };

  const fetchCampaigns = () => {
    fetch(`${API_BASE_URL}/api/v1/campaigns/`)
      .then(res => res.json())
.then(data => {
    if (data.length > 0) {
        setCampaigns(data);
    }
        // Update selected campaign if it's currently open to show new progress
        if (selectedCampaign) {
          const updated = data.find(c => c.id === selectedCampaign.id);
          if (updated) setSelectedCampaign(updated);
        }
      })
      .catch(err => console.error("Error fetching campaigns", err));
  };

  const handleAuthChange = (e) => {
    setAuthForm({ ...authForm, [e.target.name]: e.target.value });
    setAuthError("");
  };

  const handleCampaignChange = (e) => {
    if (e.target.name === "image") {
        // Keeping simplicity, expecting an image URL or File
        // The original App.jsx used FormData for files. If the user uses a file, we handle it:
        setCampaignForm({ ...campaignForm, image: e.target.files[0] });
    } else {
        setCampaignForm({ ...campaignForm, [e.target.name]: e.target.value });
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    fetch(`${API_BASE_URL}/api/v1/users/signup/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: authForm.username,
        password: authForm.password,
        email: authForm.email
      })
    })
    .then(async (res) => {
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Signup failed");
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.username);
      setToken(data.token);
      setUsername(data.username);
      setShowSignupModal(false);
      setAuthForm({ username: "", password: "", email: "" });
    })
    .catch(err => setAuthError(err.message));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    fetch(`${API_BASE_URL}/api/v1/users/login/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: authForm.username,
        password: authForm.password
      })
    })
    .then(async (res) => {
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.username);
      setToken(data.token);
      setUsername(data.username);
      setShowLoginModal(false);
      setAuthForm({ username: "", password: "", email: "" });
    })
    .catch(err => setAuthError(err.message));
  };

  const handleLogout = () => {
    fetch(`${API_BASE_URL}/api/v1/users/logout/`, {
      method: "POST",
      headers: { 
        "Authorization": `Token ${token}`,
        "Content-Type": "application/json"
      }
    }).finally(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      setToken(null);
      setUsername(null);
    });
  };

  const handleCreateCampaign = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", campaignForm.title);
    data.append("description", campaignForm.description);
    data.append("goal_amount", campaignForm.goal_amount);
    data.append("category", campaignForm.category);
    if (campaignForm.image) data.append("image", campaignForm.image);

    fetch(`${API_BASE_URL}/api/v1/campaigns/create/`, {
      method: "POST",
      headers: {
        "Authorization": `Token ${token}`
      },
      body: data,
    })
      .then(async res => {
        const isJson = res.headers.get('content-type')?.includes('application/json');
        const data = isJson ? await res.json() : null;

        if (!res.ok) {
          const errorMessage = data && data.error 
            ? (typeof data.error === 'object' ? JSON.stringify(data.error) : data.error)
            : `Server error (${res.status}): ${res.statusText}`;
          throw new Error(errorMessage);
        }
        return data;
      })
      .then(() => {
        setShowCampaignModal(false);
        setCampaignForm({ title: "", description: "", goal_amount: "", image: "" });
        fetchCampaigns();
      })
      .catch(err => setAuthError(err.message));
  };

const handleStartCampaign = () => {
  if (!token) {
    setAuthError("Please log in to start a campaign");
    setShowLoginModal(true);
  } else {
    setAuthError("");
    setShowCampaignModal(true);
  }
};

// ✅ PAYMENT FUNCTION
const handlePayment = async (campaignId) => {
  try {
    const amount = prompt("Enter donation amount");

    if (!amount) return;

    const res = await fetch(`${API_BASE_URL}/api/v1/campaigns/create-order/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount }),
    });

const data = await res.json();
console.log(data);

const options = {
  key: "rzp_test_SmO8VFqcmVGATf",
  amount: data.amount,
  currency: "INR",
  name: "FundBridge",
  description: "Donation",
  order_id: data.id,

  handler: async function (response) {
    console.log(response);
    
    // Verify payment with backend
    try {
      const verifyRes = await fetch(`${API_BASE_URL}/api/v1/campaigns/verify-payment/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token ? `Token ${token}` : ""
        },
        body: JSON.stringify({
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
          campaign_id: campaignId,
          amount: amount
        }),
      });

      if (verifyRes.ok) {
        alert("Payment successful and recorded!");
        fetchCampaigns(); // Refresh to show updated progress
        fetchDonations(campaignId); // Refresh donations list
      } else {
        const errorData = await verifyRes.json();
        alert("Payment verification failed: " + (errorData.error || "Unknown error"));
      }
    } catch (err) {
      console.error("Verification error:", err);
      alert("Error verifying payment");
    }
  },
};

if (!window.Razorpay) {
  alert("Razorpay SDK failed to load");
  return;
}

const rzp = new window.Razorpay(options);
rzp.open();
  } catch (err) {
    console.error(err);
    alert("Payment failed");
  }
};

  const scrollToCategory = (id) => {
    if (window.location.pathname !== "/") {
      window.location.href = `/#${id}`;
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="app-container">
        {/* HEADER */}
        <header className="header">
          <Link to="/" className="logo" style={{ textDecoration: 'none' }}>FundBridge</Link>
        <div className="nav-actions">
          {token ? (
            <>
              <span className="greeting">Hi, {username}</span>
              <button className="btn btn-premium" onClick={handleStartCampaign}>
                <span>+</span> Start Campaign
              </button>
              <button className="btn" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <button className="btn" onClick={() => setShowLoginModal(true)}>Log In</button>
              <button className="btn btn-premium" onClick={handleStartCampaign}>Start Campaign</button>
            </>
          )}
        </div>
      </header>

        <Routes>
          <Route path="/" element={
            <Home 
              campaigns={campaigns}
              handleStartCampaign={handleStartCampaign}
              handlePayment={handlePayment}
              setSelectedCampaign={setSelectedCampaign}
              token={token}
              setShowSignupModal={setShowSignupModal}
              setShowCampaignModal={setShowCampaignModal}
            />
          } />
          <Route path="/about" element={<About />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/success-stories" element={<SuccessStories />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="logo" style={{ textDecoration: 'none' }}>FundBridge</Link>
            <p>Empowering lives through community-driven crowdfunding. Together, we make a difference.</p>
          </div>
          <div className="footer-links">
            <h4>Causes</h4>
            <ul>
              <li><button className="footer-link-btn" onClick={() => scrollToCategory('discover-causes')}>Medical</button></li>
              <li><button className="footer-link-btn" onClick={() => scrollToCategory('discover-causes')}>Education</button></li>
              <li><button className="footer-link-btn" onClick={() => scrollToCategory('discover-causes')}>Emergency</button></li>
              <li><button className="footer-link-btn" onClick={() => scrollToCategory('discover-causes')}>Non-Profit</button></li>
            </ul>
          </div>
          <div className="footer-links">
            <h4>Company</h4>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/how-it-works">How it works</Link></li>
              <li><Link to="/success-stories">Success Stories</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          <div className="footer-newsletter">
            <h4>Stay Updated</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '16px' }}>Join our newsletter for impact stories.</p>
            <div className="newsletter-form">
              <input className="form-input" placeholder="Email address" style={{ padding: '10px 14px', fontSize: '14px' }} />
              <button className="btn btn-primary" style={{ padding: '10px 16px' }}>Join</button>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div>© 2026 FundBridge. All rights reserved.</div>
          <div style={{ display: 'flex', gap: '24px' }}>
            <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy Policy</a>
            <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Terms of Service</a>
          </div>
        </div>
      </footer>

      {/* LOGIN MODAL */}
      {showLoginModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-btn" onClick={() => setShowLoginModal(false)}>✕</button>
            <h2 style={{ marginBottom: '8px' }}>Welcome Back</h2>
            <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '32px' }}>Enter your details to continue</p>
            {authError && <div className="error-message">{authError}</div>}
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label>Username</label>
                <input className="form-input" name="username" placeholder="Enter your username" value={authForm.username} onChange={handleAuthChange} required />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input className="form-input" type="password" name="password" placeholder="••••••••" value={authForm.password} onChange={handleAuthChange} required />
              </div>
              <button className="btn btn-primary" type="submit" style={{ width: '100%', marginTop: '12px', padding: '14px' }}>Login to Account</button>
            </form>
          </div>
        </div>
      )}

      {/* SIGNUP MODAL */}
      {showSignupModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-btn" onClick={() => setShowSignupModal(false)}>✕</button>
            <h2 style={{ marginBottom: '8px' }}>Create Account</h2>
            <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '32px' }}>Join our community of changemakers</p>
            {authError && <div className="error-message">{authError}</div>}
            <form onSubmit={handleSignup}>
              <div className="form-group">
                <label>Username</label>
                <input className="form-input" name="username" placeholder="Choose a username" value={authForm.username} onChange={handleAuthChange} required />
              </div>
              <div className="form-group">
                <label>Email (Optional)</label>
                <input className="form-input" name="email" type="email" placeholder="you@example.com" value={authForm.email} onChange={handleAuthChange} />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input className="form-input" type="password" name="password" placeholder="••••••••" value={authForm.password} onChange={handleAuthChange} required />
              </div>
              <button className="btn btn-primary" type="submit" style={{ width: '100%', marginTop: '12px', padding: '14px' }}>Create Account</button>
            </form>
          </div>
        </div>
      )}

      {/* CREATE CAMPAIGN MODAL */}
      {showCampaignModal && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '600px' }}>
            <button className="close-btn" onClick={() => setShowCampaignModal(false)}>✕</button>
            <h2 style={{ marginBottom: '8px' }}>Start a Campaign</h2>
            <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '32px' }}>Fill in the details to launch your cause</p>
            {authError && <div className="error-message">{authError}</div>}
            <form onSubmit={handleCreateCampaign}>
              <div className="form-group">
                <label>Campaign Title</label>
                <input className="form-input" name="title" placeholder="e.g. Help Sarah's Medical Treatment" value={campaignForm.title} onChange={handleCampaignChange} required />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea className="form-input form-textarea" name="description" placeholder="Share the story behind your cause..." value={campaignForm.description} onChange={handleCampaignChange} required />
              </div>
              <div className="form-group">
                <label>Goal Amount (₹)</label>
                <input className="form-input" type="number" name="goal_amount" placeholder="0" value={campaignForm.goal_amount} onChange={handleCampaignChange} required />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select className="form-input" name="category" value={campaignForm.category} onChange={handleCampaignChange} required>
                  <option value="Medical">Medical</option>
                  <option value="Education">Education</option>
                  <option value="Emergency">Emergency</option>
                  <option value="Non-Profit">Non-Profit</option>
                </select>
              </div>
              <div className="form-group">
                <label>Campaign Image</label>
                <input className="form-input" type="file" name="image" onChange={handleCampaignChange} style={{ padding: '8px' }} />
              </div>
              <button className="btn btn-primary" type="submit" style={{ width: '100%', marginTop: '12px', padding: '14px' }}>Launch Campaign</button>
            </form>
          </div>
        </div>
      )}
      {/* CAMPAIGN DETAIL MODAL */}
      {selectedCampaign && (
        <div className="modal-overlay" onClick={() => setSelectedCampaign(null)}>
          <div className="modal-content" style={{ maxWidth: '900px', padding: '0', overflow: 'hidden', background: '#fff' }} onClick={e => e.stopPropagation()}>
            <button className="close-btn" style={{ zIndex: 10, background: 'rgba(255,255,255,0.8)', color: '#333' }} onClick={() => setSelectedCampaign(null)}>✕</button>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', minHeight: '550px' }}>
              <div style={{ height: '100%', position: 'relative' }}>
                {selectedCampaign.image ? (
                  <img
                    src={selectedCampaign.image.startsWith("http") ? selectedCampaign.image : `${API_BASE_URL}${selectedCampaign.image}`}
                    alt={selectedCampaign.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <div style={{ width: '100%', height: '100%', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>No Image</div>
                )}
                <div className="card-badges" style={{ padding: '20px' }}>
                    <div className="badge-urgent" style={{ borderRadius: '4px' }}>URGENT</div>
                </div>
              </div>
              
              <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', color: '#333' }}>
                <h2 style={{ textAlign: 'left', marginBottom: '8px', fontSize: '28px', color: '#1e293b' }}>{selectedCampaign.title}</h2>
                <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '24px' }}>by {selectedCampaign.user_username || "FundBridge Team"}</div>
                
                <div style={{ marginBottom: '24px', flexGrow: 1, overflowY: 'auto', maxHeight: '150px', paddingRight: '10px', color: '#475569', lineHeight: '1.7', fontSize: '16px' }}>
                  {selectedCampaign.description}
                </div>

                {donations.length > 0 && (
                  <div style={{ marginBottom: '24px' }}>
                    <h4 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '12px', color: '#1e293b' }}>Recent Supporters ({donations.length})</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {donations.map((d) => (
                        <div key={d.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc', padding: '10px 16px', borderRadius: '12px', border: '1px solid #f1f5f9' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary), var(--secondary))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '12px', fontWeight: '800' }}>
                              {(d.user_username || "G")[0].toUpperCase()}
                            </div>
                            <span style={{ fontSize: '14px', fontWeight: '600', color: '#334155' }}>{d.user_username || "Guest Donor"}</span>
                          </div>
                          <span style={{ fontSize: '14px', fontWeight: '700', color: 'var(--brand-green)' }}>₹{d.amount.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="share-buttons" style={{ justifyContent: 'flex-start', marginBottom: '32px' }}>
                    <button className="share-btn whatsapp" style={{ padding: '10px 20px' }}>
                        <MessageCircle size={18} /> Share on WhatsApp
                    </button>
                    <button className="share-btn facebook" style={{ padding: '10px 20px' }}>
                        <Share2 size={18} /> Share on Facebook
                    </button>
                </div>

                <div className="progress-container" style={{ marginBottom: '24px', background: '#f8f9fa', padding: '20px', borderRadius: '16px' }}>
                  <div className="progress-stats">
                    <span style={{ fontSize: '18px', color: 'var(--brand-green)' }}>₹{Number(selectedCampaign.raised_amount).toLocaleString()} raised</span>
                    <span style={{ color: 'var(--brand-green)', fontSize: '18px' }}>{Math.min(Math.round((selectedCampaign.raised_amount / selectedCampaign.goal_amount) * 100), 100)}%</span>
                  </div>
                  <div className="progress-bar-bg" style={{ height: '12px' }}>
                    <div className="progress-bar-fill" style={{ width: `${Math.min(Math.round((selectedCampaign.raised_amount / selectedCampaign.goal_amount) * 100), 100)}%` }}></div>
                  </div>
                  <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'space-between', color: '#64748b', fontWeight: '600' }}>
                    <span>Goal: ₹{Number(selectedCampaign.goal_amount).toLocaleString()}</span>


                  </div>


                <button
                  onClick={() => handlePayment(selectedCampaign.id)}
                  style={{
                    marginTop: "20px",
                    width: "100%",
                    padding: "14px",
                    background: "#22c55e",
                    color: "white",
                    border: "none",
                    borderRadius: "12px",
                    fontSize: "16px",
                    fontWeight: "bold",
                    cursor: "pointer"
                  }}
                >
                  Donate Now
                </button>

                
                </div>

              </div>
            </div>
          </div>
        </div>

      )}

      

      {/* FLOATING ACTION BUTTON */}
      <div className="fab" onClick={handleStartCampaign}>
        <span>+</span>
        <div className="fab-label">Start a Campaign</div>
      </div>
      </div>
    </Router>
  );

  
}



export default App;
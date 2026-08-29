import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Landing() {
  const navigate = useNavigate()
  const typewriterRef = useRef(null)

  useEffect(() => {
    const words = ['PDF', 'Website', 'YouTube', 'Doc']
    let wordIndex = 0, charIndex = 0, deleting = false
    const el = typewriterRef.current
    if (!el) return

    function type() {
      const word = words[wordIndex]
      if (!deleting) {
        el.textContent = word.slice(0, charIndex + 1)
        charIndex++
        if (charIndex === word.length) {
          deleting = true
          setTimeout(type, 1800)
          return
        }
      } else {
        el.textContent = word.slice(0, charIndex - 1)
        charIndex--
        if (charIndex === 0) {
          deleting = false
          wordIndex = (wordIndex + 1) % words.length
        }
      }
      setTimeout(type, deleting ? 60 : 100)
    }
    type()
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') })
    }, { threshold: 0.12 })
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        html, body, #root {
          overflow-x: hidden !important;
          max-width: 100vw !important;
          width: 100% !important;
        }
        section, footer, nav, div { max-width: 100vw; }
        img, svg { max-width: 100%; height: auto; }

        .dot-grid {
          background-image: radial-gradient(circle, #e0e0e0 1px, transparent 1px);
          background-size: 28px 28px;
        }
        .reveal { opacity: 0; transform: translateY(32px); transition: all 0.7s cubic-bezier(0.4,0,0.2,1); }
        .reveal.visible { opacity: 1; transform: translateY(0); }
        .reveal-delay-1 { transition-delay: 0.1s; }
        .reveal-delay-2 { transition-delay: 0.2s; }
        .reveal-delay-3 { transition-delay: 0.3s; }
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(1.3)} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes blink { 50%{border-color:transparent} }
        @keyframes chatIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes dot { 0%,80%,100%{opacity:0.3;transform:scale(0.8)} 40%{opacity:1;transform:scale(1.1)} }
        @keyframes slideInLeft { from{opacity:0;transform:translateX(-20px)} to{opacity:1;transform:translateX(0)} }

        .chat-msg { opacity: 0; animation: chatIn 0.5s ease forwards; }
        .chat-msg:nth-child(1) { animation-delay: 0.3s; }
        .chat-msg:nth-child(2) { animation-delay: 1.2s; }
        .chat-msg:nth-child(3) { animation-delay: 2.2s; }
        .chat-msg:nth-child(4) { animation-delay: 3.2s; }

        nav {
          position: fixed;
          top: 32px;
          left: 0; right: 0;
          z-index: 100;
          padding: 0 40px;
        }
        .nav-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(255,255,255,0.85);
          backdrop-filter: blur(20px);
          border: 1px solid #e2e2e2;
          border-radius: 100px;
          padding: 14px 28px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.08);
          transition: all 0.3s ease;
        }
        .nav-logo {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 20px;
          color: #0a0a0a;
        }
        .nav-links { display: flex; gap: 32px; }
        .nav-links a {
          font-size: 14px; font-weight: 500;
          color: #5a5a5a; text-decoration: none;
          transition: color 0.2s;
        }
        .nav-links a:hover { color: #0a0a0a; }
        .nav-cta {
          background: #0a0a0a; color: #ffffff;
          border: none; border-radius: 100px;
          padding: 10px 24px; font-size: 14px;
          font-weight: 600; cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          transition: all 0.2s;
        }
        .nav-cta:hover { background: #333; transform: translateY(-1px); }

.char-card { 
  background:#fff;
  border:1.5px solid #e2e2e2;
  border-radius:24px;
  padding:40px 32px;
  text-align:center;
  transition:all 0.35s;
  min-height: 420px;
  display: flex;
  flex-direction: column;
}
.char-card button {
  margin-top: 24px !important;
}
.char-card p {
  margin-bottom: auto;
}
        .char-card:hover { transform:translateY(-8px);box-shadow:0 20px 60px rgba(0,0,0,0.1);border-color:#0a0a0a;border-width:2px; }

        .feat-card { background:#f8f8f8;border:1.5px solid #e2e2e2;border-radius:20px;padding:32px;transition:all 0.3s;cursor:default; }
        .feat-card:hover { transform:translateY(-4px);box-shadow:0 12px 40px rgba(0,0,0,0.15);background:#0a0a0a;border-color:#0a0a0a; }

        .cta-feature-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
          position: relative;
          z-index: 1;
        }
        .cta-feat-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px; padding: 22px 20px;
          transition: all 0.3s ease;
        }
        .cta-feat-card:hover {
          background: #ffffff; border-color: #ffffff;
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(0,0,0,0.4);
        }
        .cta-feat-card:hover .cta-feat-title { color: #0a0a0a; }
        .cta-feat-card:hover .cta-feat-desc { color: #5a5a5a; }
        .cta-feat-icon { font-size: 28px; margin-bottom: 12px; }
        .cta-feat-title { font-family: 'Syne', sans-serif; font-size: 15px; font-weight: 700; color: #fff; margin-bottom: 6px; }
        .cta-feat-desc { font-size: 12.5px; color: rgba(255,255,255,0.45); line-height: 1.55; }

        .step .step-num { transition: all 0.35s; }
        .step:hover .step-num {
          background: #0a0a0a !important; color: #ffffff !important;
          border-color: #0a0a0a !important;
          transform: scale(1.15) translateY(-4px);
          box-shadow: 0 12px 32px rgba(0,0,0,0.25);
        }

        .browser-frame { animation: float 6s ease-in-out infinite; }
        .conf-badge { animation: slideInLeft 1s ease 0.5s both; }
        .source-badge { animation: slideInLeft 1s ease 0.8s both; }
        section { width: 100%; overflow: hidden; }

        /* hero buttons */
        .hero-btns {
          display: flex;
          gap: 14px;
          align-items: center;
          margin-bottom: 40px;
        }
        .hero-btn-primary {
          background: #0a0a0a; color: #fff;
          border: none; border-radius: 100px;
          padding: 16px 32px; font-size: 16px;
          font-weight: 600;
          display: flex; align-items: center; justify-content: center;
          gap: 8px; cursor: pointer;
          font-family: 'DM Sans', sans-serif;
        }
        .hero-btn-secondary {
          background: transparent; color: #0a0a0a;
          border: 1.5px solid #e2e2e2; border-radius: 100px;
          padding: 16px 32px; font-size: 16px;
          font-weight: 500; cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          display: flex; align-items: center; justify-content: center;
          gap: 6px;
        }

        /* stats bar */
        .stats-grid {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 40px;
          text-align: center;
        }

        /* mobile tweaks */
        @media (max-width: 768px) {
          .browser-frame, .conf-badge, .source-badge { display: none !important; }

          nav { top: 50px !important; padding: 0 12px !important; }
          .nav-inner { padding: 8px 14px !important; }
          .nav-links { display: none !important; }
          .nav-logo { font-size: 15px !important; }
          .nav-cta { padding: 7px 12px !important; font-size: 11px !important; }

          /* hero */
          .hero-section {
            padding: 130px 20px 40px !important;
            min-height: auto !important;
          }
          .hero-inner {
            grid-template-columns: 1fr !important;
            display: flex !important;
            flex-direction: column !important;
            gap: 30px !important;
          }
          .hero-mockup { display: none !important; }
          .hero-h1 {
            font-size: 38px !important;
            line-height: 1.1 !important;
          }
          .hero-p { font-size: 15px !important; }

          /* buttons sit side by side at equal width */
          .hero-btns {
            display: flex !important;
            flex-direction: row !important;
            gap: 10px !important;
            width: 100% !important;
            margin-bottom: 28px !important;
          }
          .hero-btn-primary,
          .hero-btn-secondary {
            flex: 1 !important;
            padding: 14px 12px !important;
            font-size: 12px !important;
            height: 50px !important;
            white-space: nowrap !important;
            min-width: 0 !important;
          }

          /* stats become a 2x2 grid */
          .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 32px !important;
          }

          /* characters */
          .chars-grid {
            grid-template-columns: 1fr !important;
            max-width: 400px !important;
            margin: 0 auto !important;
          }
          .char-card { padding: 32px 24px !important; min-height: auto !important; }
          section[id="sources"] { padding: 60px 20px !important; }
          section[id="sources"] h2 { font-size: 32px !important; }

          /* features */
          section[id="features"] { padding: 60px 20px !important; }
          section[id="features"] h2 { font-size: 32px !important; }
          .features-grid { grid-template-columns: 1fr !important; gap: 16px !important; }
          .feat-card { padding: 24px !important; }

          /* how it works */
          section[id="how-it-works"] { padding: 60px 20px !important; }
          section[id="how-it-works"] h2 { font-size: 32px !important; }
          .steps-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .step-line { display: none !important; }
          .step { padding: 0 !important; }

          /* cta */
          .cta-section { padding: 60px 20px !important; }
          .cta-inner { padding: 50px 24px !important; border-radius: 24px !important; }
          .cta-inner h2 { font-size: 32px !important; }
          .cta-feature-grid { grid-template-columns: 1fr !important; gap: 12px !important; }

          /* footer */
          footer { padding: 40px 20px 30px !important; }
          .footer-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .footer-bottom { flex-direction: column !important; text-align: center !important; gap: 8px !important; }

          /* top banner */
          .top-banner { font-size: 11px !important; padding: 8px 14px !important; }
        }

        @media (max-width: 480px) {
          .hero-h1 { font-size: 30px !important; }
          h2 { font-size: 26px !important; }
        }
      `}</style>

      {/* Banner */}
      <div className="top-banner" style={{background:'#0a0a0a',color:'#fff',textAlign:'center',padding:'10px 24px',fontSize:'13px',fontWeight:500}}>
        🚀 Now supports YouTube videos and any website URL →
      </div>

      {/* Nav */}
<nav>
  <div className="nav-inner">
    <div className="nav-logo" onClick={() => window.scrollTo({top:0,behavior:'smooth'})} style={{cursor:'pointer'}}>TalkDox 🧠</div>
    <div className="nav-links">
      <a href="#features">Features</a>
      <a href="#how-it-works">How It Works</a>
      <a href="#sources">Sources</a>
      <a href="https://github.com/Vansh150705/TalkDox" target="_blank" rel="noopener noreferrer" style={{display:'flex',alignItems:'center',gap:6}}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
        GitHub
      </a>
    </div>
    <button className="nav-cta" onClick={() => navigate('/upload')}>Get Started Free →</button>
  </div>
</nav>

      {/* Hero */}
      <section className="hero-section dot-grid" style={{minHeight:'100vh',display:'flex',alignItems:'center',padding:'140px 40px 80px',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',width:700,height:700,background:'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 70%)',pointerEvents:'none'}}/>
        <div className="hero-inner" style={{maxWidth:1200,margin:'0 auto',width:'100%',display:'grid',gridTemplateColumns:'1fr 1fr',gap:60,alignItems:'center',position:'relative',zIndex:2}}>

          {/* Left */}
          <div>
            <div style={{display:'inline-flex',alignItems:'center',gap:8,background:'#f8f8f8',border:'1px solid #e2e2e2',borderRadius:100,padding:'6px 14px',fontSize:12,fontWeight:600,letterSpacing:'0.08em',textTransform:'uppercase',color:'#5a5a5a',marginBottom:24}}>
              <span style={{width:6,height:6,background:'#22c55e',borderRadius:'50%',animation:'pulse 2s infinite',display:'block'}}/>
              Powered by Gemini 2.5 Flash
            </div>
            <h1 className="hero-h1" style={{fontFamily:'Syne,sans-serif',fontSize:60,fontWeight:800,lineHeight:1.05,letterSpacing:'-0.04em',marginBottom:20}}>
              Chat with <em style={{fontStyle:'italic',fontWeight:300}}>any</em>
              <br/>
              <span ref={typewriterRef} style={{borderRight:'3px solid #0a0a0a',paddingRight:4,animation:'blink 1s step-end infinite',whiteSpace:'nowrap'}}>PDF</span>
              <br/>instantly.
            </h1>
<p className="hero-p" style={{fontSize:18,fontWeight:400,color:'#5a5a5a',lineHeight:1.7,marginBottom:36,maxWidth:480}}>
  Upload any document (PDF, Word, TXT, Markdown), paste a website URL, or drop a YouTube link. TalkDox reads it, understands it, and lets you have a full AI conversation with it.
</p>

            <div className="hero-btns">
              <button className="hero-btn-primary" onClick={() => navigate('/upload')}>
                Get Started Free <span>→</span>
              </button>
              <a href="https://github.com/Vansh150705/TalkDox" target="_blank" rel="noopener noreferrer" style={{textDecoration:'none',display:'flex'}}>
                <button className="hero-btn-secondary">
                  ⭐ Star on GitHub
                </button>
              </a>
            </div>

            <div style={{fontSize:13,color:'#a0a0a0',display:'flex',alignItems:'center',gap:8,flexWrap:'wrap'}}>
              <div style={{display:'flex'}}>
                {['Felix','Anita','Bob','Sara'].map((seed,i) => (
                  <img key={seed} src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`} alt="" style={{width:28,height:28,borderRadius:'50%',border:'2px solid white',marginLeft:i===0?0:-8}}/>
                ))}
              </div>
              Trusted by <strong style={{margin:'0 4px'}}>500+</strong> students & professionals
            </div>
          </div>

          {/* Right — Browser Mockup */}
          <div className="hero-mockup" style={{position:'relative',height:520}}>
            <div className="conf-badge" style={{position:'absolute',top:80,left:-20,background:'#fff',border:'1px solid #e2e2e2',borderRadius:12,padding:'10px 14px',boxShadow:'0 8px 24px rgba(0,0,0,0.1)',fontSize:11,zIndex:10}}>
              <div style={{fontSize:10,fontWeight:600,color:'#a0a0a0',textTransform:'uppercase',letterSpacing:'0.06em'}}>AI Confidence</div>
              <div style={{width:120,height:6,background:'#e2e2e2',borderRadius:3,marginTop:4,overflow:'hidden'}}>
                <div style={{height:'100%',width:'87%',background:'#22c55e',borderRadius:3}}/>
              </div>
              <div style={{fontSize:11,marginTop:4,color:'#22c55e',fontWeight:600}}>87% — High</div>
            </div>

            <div className="browser-frame" style={{background:'#fff',border:'1.5px solid #e2e2e2',borderRadius:16,overflow:'hidden',boxShadow:'0 24px 80px rgba(0,0,0,0.12)',position:'absolute',right:0,top:20,width:'100%'}}>
              <div style={{background:'#f8f8f8',padding:'12px 16px',display:'flex',alignItems:'center',gap:12,borderBottom:'1px solid #e2e2e2'}}>
                <div style={{display:'flex',gap:6}}>
                  {['#ff5f57','#febc2e','#28c840'].map(c=><span key={c} style={{width:10,height:10,borderRadius:'50%',background:c,display:'block'}}/>)}
                </div>
                <div style={{flex:1,background:'#fff',border:'1px solid #e2e2e2',borderRadius:8,padding:'5px 12px',fontSize:11,color:'#a0a0a0'}}>
                  🔒 talkdox.ai/chat
                </div>
              </div>
              <div style={{padding:20,display:'grid',gridTemplateColumns:'1fr 1.2fr',gap:16,height:380}}>
                <div style={{background:'#f8f8f8',borderRadius:12,padding:16,border:'1px solid #e2e2e2'}}>
                  <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:14}}>
                    <div style={{width:32,height:32,background:'#fee2e2',borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',fontSize:16}}>📄</div>
                    <div>
                      <div style={{fontSize:12,fontWeight:600}}>research_paper.pdf</div>
                      <div style={{fontSize:10,color:'#a0a0a0'}}>24 pages · 12,840 words</div>
                    </div>
                  </div>
                  {[100,85,92,70,88,60,95,75,82].map((w,i)=>(
                    <div key={i} style={{height:8,background:'#e2e2e2',borderRadius:4,marginBottom:6,width:`${w}%`,opacity:0.5+i*0.05}}/>
                  ))}
                </div>
                <div style={{display:'flex',flexDirection:'column',gap:10,overflow:'hidden'}}>
                  {[
                    {role:'ai', text:"Hi! I've indexed your document. What would you like to know?"},
                    {role:'user', text:"What are the main conclusions?"},
                    {role:'ai', text:"The paper concludes that transformer-based models outperform CNNs by 23%..."},
                    {role:'user', text:"Summarize the methodology"},
                  ].map((msg,i)=>(
                    <div key={i} className="chat-msg" style={{display:'flex',gap:8,alignItems:'flex-end',flexDirection:msg.role==='user'?'row-reverse':'row'}}>
                      <div style={{width:28,height:28,borderRadius:'50%',background:msg.role==='ai'?'#0a0a0a':'#e2e2e2',flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center',fontSize:14}}>
                        {msg.role==='ai'?'🧠':'👤'}
                      </div>
                      <div style={{maxWidth:'85%',padding:'10px 13px',borderRadius:msg.role==='ai'?'14px 14px 14px 4px':'14px 14px 4px 14px',fontSize:11.5,lineHeight:1.5,background:msg.role==='ai'?'#f8f8f8':'#0a0a0a',color:msg.role==='ai'?'#0a0a0a':'#fff',border:msg.role==='ai'?'1px solid #e2e2e2':'none'}}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  <div style={{display:'flex',gap:8,alignItems:'center',border:'1px solid #e2e2e2',borderRadius:12,padding:'10px 14px',marginTop:'auto',background:'#fff'}}>
                    <input readOnly placeholder="Ask anything about your document..." style={{flex:1,border:'none',outline:'none',fontSize:11,color:'#5a5a5a',background:'transparent'}}/>
                    <button style={{background:'#0a0a0a',color:'white',border:'none',borderRadius:8,width:26,height:26,display:'flex',alignItems:'center',justifyContent:'center',fontSize:12}}>→</button>
                  </div>
                </div>
              </div>
            </div>
<div className="source-badge" style={{position:'absolute',bottom:60,left:-30,background:'#0a0a0a',color:'#fff',borderRadius:12,padding:'10px 14px',fontSize:11,fontWeight:600,zIndex:10,display:'flex',alignItems:'center',gap:6}}>
  📄 Document indexed · 847 chunks
</div>
          </div>
        </div>
      </section>

      {/* Characters */}
      <section id="sources" style={{padding:'100px 40px',background:'#f8f8f8',overflow:'hidden'}}>
        <p className="reveal" style={{textAlign:'center',fontSize:12,fontWeight:600,letterSpacing:'0.12em',textTransform:'uppercase',color:'#a0a0a0',marginBottom:16}}>Works with any source</p>
        <h2 className="reveal" style={{textAlign:'center',fontFamily:'Syne,sans-serif',fontSize:52,fontWeight:800,letterSpacing:'-0.04em',lineHeight:1.05,marginBottom:16}}>Meet your<br/><em style={{fontWeight:300}}>AI reading buddies</em></h2>
        <p className="reveal" style={{textAlign:'center',fontSize:18,color:'#5a5a5a',marginBottom:80}}>Three sources. One unified AI. Infinite understanding.</p>

        <div className="chars-grid" style={{maxWidth:1200,margin:'0 auto',display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:32}}>
{[
  {id:'pdf', tag:'📄 Doc', name:'Paige the Doc Reader', desc:'Upload PDFs, Word docs, text, or markdown files. Paige reads every word and answers your questions instantly.',
    svg: <svg viewBox="0 0 200 200" fill="none" style={{width:200,height:200,margin:'0 auto 28px'}}>
      <circle cx="100" cy="85" r="38" fill="#fef3c7"/>
      <ellipse cx="100" cy="52" rx="30" ry="14" fill="#1a1a1a"/>
      <rect x="70" y="52" width="60" height="10" rx="5" fill="#1a1a1a"/>
      <circle cx="88" cy="82" r="5" fill="#1a1a1a"/><circle cx="112" cy="82" r="5" fill="#1a1a1a"/>
      <path d="M88 96 Q100 106 112 96" stroke="#1a1a1a" strokeWidth="2.5" fill="none"/>
      <path d="M62 135 Q62 118 100 118 Q138 118 138 135 L142 170 Q100 175 58 170 Z" fill="#ef4444"/>
      <rect x="82" y="168" width="14" height="28" rx="7" fill="#1a1a1a"/><rect x="104" y="168" width="14" height="28" rx="7" fill="#1a1a1a"/>
    </svg>
  },
  {id:'web', tag:'🌐 Website', name:'Webb the Web Surfer', desc:'Paste any URL. Webb scrapes the entire page and lets you chat with the actual content — articles, docs, anything.', delay:'reveal-delay-2',
    svg: <svg viewBox="0 0 200 200" fill="none" style={{width:200,height:200,margin:'0 auto 28px'}}>
      <circle cx="100" cy="85" r="38" fill="#dbeafe"/>
      <rect x="72" y="48" width="56" height="16" rx="8" fill="#f59e0b"/>
      <circle cx="88" cy="82" r="9" stroke="#1a1a1a" strokeWidth="2" fill="none"/><circle cx="112" cy="82" r="9" stroke="#1a1a1a" strokeWidth="2" fill="none"/>
      <path d="M86 96 Q100 108 114 96" stroke="#1a1a1a" strokeWidth="2.5" fill="none"/>
      <path d="M62 135 Q62 118 100 118 Q138 118 138 135 L142 170 Q100 175 58 170 Z" fill="#2563eb"/>
      <circle cx="100" cy="144" r="10" stroke="white" strokeWidth="1.5" fill="none"/>
      <rect x="82" y="168" width="14" height="28" rx="7" fill="#1a1a1a"/><rect x="104" y="168" width="14" height="28" rx="7" fill="#1a1a1a"/>
    </svg>
  },
  {id:'youtube', tag:'▶ YouTube', name:'Yuki the Video Nerd', desc:'Drop a YouTube link. Yuki extracts the full transcript and lets you chat with the entire video — no watching required.', delay:'reveal-delay-3',
    svg: <svg viewBox="0 0 200 200" fill="none" style={{width:200,height:200,margin:'0 auto 28px'}}>
      <circle cx="100" cy="85" r="38" fill="#fce7f3"/>
      <ellipse cx="100" cy="54" rx="32" ry="16" fill="#7c3aed"/>
      <circle cx="88" cy="82" r="5" fill="#1a1a1a"/><circle cx="112" cy="82" r="5" fill="#1a1a1a"/>
      <path d="M88 97 Q100 107 112 97" stroke="#1a1a1a" strokeWidth="2.5" fill="none"/>
      <path d="M62 135 Q62 118 100 118 Q138 118 138 135 L142 170 Q100 175 58 170 Z" fill="#dc2626"/>
      <rect x="88" y="134" width="24" height="18" rx="4" fill="white"/>
      <path d="M95 139 L108 143 L95 147 Z" fill="#dc2626"/>
      <rect x="82" y="168" width="14" height="28" rx="7" fill="#1a1a1a"/><rect x="104" y="168" width="14" height="28" rx="7" fill="#1a1a1a"/>
    </svg>
  }
].map(char => (
  <div key={char.name} className={`char-card reveal ${char.delay}`}>
    {char.svg}
    <div style={{display:'inline-block',background:'#f0f0f0',borderRadius:100,padding:'4px 12px',fontSize:11,fontWeight:600,letterSpacing:'0.06em',textTransform:'uppercase',color:'#5a5a5a',marginBottom:12}}>{char.tag}</div>
    <h3 style={{fontFamily:'Syne,sans-serif',fontSize:26,fontWeight:800,letterSpacing:'-0.03em',marginBottom:10}}>{char.name}</h3>
    <p style={{fontSize:15,color:'#5a5a5a',lineHeight:1.65}}>{char.desc}</p>
    <button onClick={() => navigate(`/upload?tab=${char.id}`)} style={{marginTop:24,background:'#0a0a0a',color:'#fff',border:'none',borderRadius:100,padding:'12px 28px',fontSize:14,fontWeight:600,width:'100%'}}>
      Try with {char.id === 'pdf' ? 'Doc' : char.tag.split(' ')[1]} →
    </button>
  </div>
))}
        </div>
      </section>

      {/* Stats Bar */}
      <div style={{background:'#0a0a0a',padding:'48px 40px'}}>
        <div className="stats-grid">
          {[['3','Sources Supported'],['9','AI Features'],['3','Agentic Layers'],['∞','Questions Answered']].map(([num,label],i)=>(
            <div key={label} className={`reveal reveal-delay-${i}`}>
              <div style={{fontFamily:'Syne,sans-serif',fontSize:56,fontWeight:800,color:'#fff',letterSpacing:'-0.04em',lineHeight:1,marginBottom:8}}>{num}</div>
              <div style={{fontSize:13,color:'rgba(255,255,255,0.4)',textTransform:'uppercase',letterSpacing:'0.1em',fontWeight:500}}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <section id="features" style={{padding:'100px 40px',background:'#fff'}}>
        <div style={{maxWidth:1200,margin:'0 auto'}}>
          <div className="reveal" style={{marginBottom:60}}>
            <div style={{fontSize:12,fontWeight:600,letterSpacing:'0.12em',textTransform:'uppercase',color:'#a0a0a0',marginBottom:12}}>Everything you need</div>
            <h2 style={{fontFamily:'Syne,sans-serif',fontSize:52,fontWeight:800,letterSpacing:'-0.04em',lineHeight:1.05,maxWidth:500}}>Not just Q&A.<br/>A full AI layer.</h2>
          </div>
          <div className="features-grid" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:20}}>
            {[
              {icon:'💬',title:'Smart Q&A',desc:'Ask anything. Get precise answers grounded in your actual content. 3 Agentic AI layers ensure accuracy.'},
              {icon:'🧬',title:'Document DNA',desc:'Auto-generated fingerprint on upload — domain, tone, complexity, key themes, and an unusual insight.'},
              {icon:'🔀',title:'Doc vs Doc',desc:'Upload two sources and compare them side by side. Dual vector retrieval. Colour-coded source attribution.'},
              {icon:'🕐',title:'Timeline Extractor',desc:'One click extracts every date, deadline, and milestone into a colour-coded visual timeline.'},
              {icon:'🃏',title:'Smart Flashcards',desc:'Generate study flashcards from any document, website, or YouTube video. Filter by difficulty level.'},
              {icon:'🛠',title:'5 Automation Tools',desc:'Summary, Quiz, Email, Contradiction Finder, Action Items. One click each. Instant output.'},
            ].map((f,i)=>(
             <div key={f.title} className={`feat-card reveal reveal-delay-${(i%3)+1}`}
                onMouseEnter={e => {
                  e.currentTarget.style.background = '#0a0a0a'
                  e.currentTarget.style.borderColor = '#0a0a0a'
                  e.currentTarget.querySelector('.feat-icon-wrap').style.background = 'rgba(255,255,255,0.08)'
                  e.currentTarget.querySelector('.feat-icon-wrap').style.borderColor = 'rgba(255,255,255,0.1)'
                  e.currentTarget.querySelector('.feat-title').style.color = '#ffffff'
                  e.currentTarget.querySelector('.feat-desc').style.color = 'rgba(255,255,255,0.5)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = '#f8f8f8'
                  e.currentTarget.style.borderColor = '#e2e2e2'
                  e.currentTarget.querySelector('.feat-icon-wrap').style.background = '#fff'
                  e.currentTarget.querySelector('.feat-icon-wrap').style.borderColor = '#e2e2e2'
                  e.currentTarget.querySelector('.feat-title').style.color = '#0a0a0a'
                  e.currentTarget.querySelector('.feat-desc').style.color = '#5a5a5a'
                }}
              >
                <div className="feat-icon-wrap" style={{width:48,height:48,borderRadius:14,background:'#fff',border:'1px solid #e2e2e2',display:'flex',alignItems:'center',justifyContent:'center',fontSize:22,marginBottom:20,boxShadow:'0 2px 8px rgba(0,0,0,0.06)',transition:'all 0.3s'}}>{f.icon}</div>
                <h3 className="feat-title" style={{fontSize:20,fontWeight:700,letterSpacing:'-0.02em',marginBottom:10,color:'#0a0a0a',transition:'color 0.3s'}}>{f.title}</h3>
                <p className="feat-desc" style={{fontSize:14,color:'#5a5a5a',lineHeight:1.65,transition:'color 0.3s'}}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" style={{padding:'100px 40px',background:'#f8f8f8',borderTop:'1px solid #e2e2e2'}}>
        <div style={{maxWidth:1200,margin:'0 auto'}}>
          <div className="reveal" style={{marginBottom:60}}>
            <div style={{fontSize:12,fontWeight:600,letterSpacing:'0.12em',textTransform:'uppercase',color:'#a0a0a0',marginBottom:12}}>How it works</div>
            <h2 style={{fontFamily:'Syne,sans-serif',fontSize:52,fontWeight:800,letterSpacing:'-0.04em',lineHeight:1.05}}>Three steps.<br/>That's it.</h2>
          </div>
          <div className="steps-grid" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:0,position:'relative'}}>
            <div className="step-line" style={{position:'absolute',top:56,left:'calc(100%/6)',right:'calc(100%/6)',height:'1.5px',background:'linear-gradient(to right, #e2e2e2, #0a0a0a, #e2e2e2)'}}/>
            {[
              {num:'01',title:'Connect Your Source',desc:'Upload any document, paste a website URL, or drop a YouTube link. TalkDox handles all sources instantly.'},
              {num:'02',title:'AI Indexes & Understands',desc:'Content is chunked, embedded via Gemini, and indexed in FAISS. Your Agentic RAG pipeline is ready.'},
              {num:'03',title:'Start Chatting',desc:'Ask questions, extract timelines, generate flashcards, compare documents — all in one place.'},
            ].map((step,i)=>(
              <div key={step.num} className={`step reveal reveal-delay-${i+1}`} style={{textAlign:'center',position:'relative',zIndex:1,padding:'0 24px'}}>
                <div className="step-num" style={{width:56,height:56,borderRadius:'50%',background:'#fff',border:'1.5px solid #e2e2e2',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 24px',fontFamily:'Syne,sans-serif',fontWeight:800,fontSize:20,position:'relative',zIndex:2,boxShadow:'0 4px 12px rgba(0,0,0,0.08)'}}>{step.num}</div>
                <h3 style={{fontSize:22,fontWeight:700,letterSpacing:'-0.02em',marginBottom:10}}>{step.title}</h3>
                <p style={{fontSize:14,color:'#5a5a5a',lineHeight:1.65}}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section" style={{padding:'80px 40px',background:'#fff'}}>
        <div className="cta-inner" style={{maxWidth:1200,margin:'0 auto',background:'#0a0a0a',borderRadius:32,padding:'80px 60px',position:'relative',overflow:'hidden'}}>
          <div style={{position:'absolute',inset:0,backgroundImage:'radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)',backgroundSize:'24px 24px'}}/>
          <div style={{textAlign:'center',marginBottom:60,position:'relative',zIndex:1}}>
            <div className="reveal" style={{display:'inline-flex',alignItems:'center',gap:8,background:'rgba(255,255,255,0.08)',border:'1px solid rgba(255,255,255,0.12)',borderRadius:100,padding:'6px 14px',fontSize:11,fontWeight:600,letterSpacing:'0.1em',textTransform:'uppercase',color:'rgba(255,255,255,0.6)',marginBottom:24}}>
              <span style={{width:6,height:6,background:'#22c55e',borderRadius:'50%',animation:'pulse 2s infinite',display:'block'}}/>
              Everything Inside TalkDox
            </div>
            <h2 className="reveal" style={{color:'#fff',fontFamily:'Syne,sans-serif',fontSize:52,fontWeight:800,letterSpacing:'-0.04em',lineHeight:1.05,marginBottom:16}}>
              Way more than<br/><em style={{fontStyle:'italic',fontWeight:300,color:'rgba(255,255,255,0.5)'}}>just a chatbot.</em>
            </h2>
            <p className="reveal reveal-delay-1" style={{color:'rgba(255,255,255,0.5)',fontSize:17,maxWidth:580,margin:'0 auto'}}>
              From Agentic RAG and adaptive AI personas to timeline extraction and flashcards — TalkDox is a full AI intelligence layer for any content.
            </p>
          </div>

          <div className="cta-feature-grid">
            {[
              {icon:'💬',title:'Smart Q&A',desc:'Ask anything, get answers grounded in your source'},
              {icon:'🧬',title:'Document DNA',desc:'Auto-profile any source — domain, tone, complexity'},
              {icon:'🔀',title:'Doc vs Doc Compare',desc:'Dual vector retrieval with colour-coded sources'},
              {icon:'🕐',title:'Timeline Extractor',desc:'Visualise every date, deadline and milestone'},
              {icon:'🃏',title:'Smart Flashcards',desc:'Auto-generate study cards with difficulty levels'},
              {icon:'🛠',title:'5 Automation Tools',desc:'Summary, Quiz, Email, Contradictions, Actions'},
              {icon:'🤖',title:'3 Agentic Layers',desc:'Clarification, Self-Reflection, Confidence'},
              {icon:'📊',title:'Session Analytics',desc:'Track confidence trends and keyword patterns'},
              {icon:'⚖️',title:'AI Personas',desc:'Chat as a Lawyer, Doctor, Teacher, or Analyst'},
              {icon:'🎯',title:'Response Modes',desc:'ELI5, Executive Brief, or Devil\'s Advocate'},
              {icon:'🌐',title:'Multilingual',desc:'Auto-detects language, responds in same one'},
              {icon:'🎙',title:'Voice Input',desc:'Speak your questions using browser speech API'},
            ].map((f) => (
              <div key={f.title} className="cta-feat-card">
                <div className="cta-feat-icon">{f.icon}</div>
                <div className="cta-feat-title">{f.title}</div>
                <div className="cta-feat-desc">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{background:'#f8f8f8',borderTop:'1px solid #e2e2e2',padding:'60px 40px 40px'}}>
        <div style={{maxWidth:1200,margin:'0 auto'}}>
          <div className="footer-grid" style={{display:'grid',gridTemplateColumns:'2fr 1fr 1fr',gap:40,marginBottom:48}}>
            <div>
              <div style={{fontFamily:'Syne,sans-serif',fontWeight:800,fontSize:22,marginBottom:12}}>TalkDox 🧠</div>
              <p style={{fontSize:14,color:'#5a5a5a',lineHeight:1.6,maxWidth:300}}>Chat with any document, website, or YouTube video — powered by Google Gemini 2.5 Flash.</p>
            </div>

            <div>
              <h4 style={{fontSize:13,fontWeight:700,textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:16,color:'#a0a0a0'}}>Product</h4>
              {[
                {name:'Features',href:'#features'},
                {name:'How It Works',href:'#how-it-works'},
                {name:'Sources',href:'#sources'},
              ].map(l=>(
                <a key={l.name} href={l.href} style={{display:'block',fontSize:14,color:'#5a5a5a',textDecoration:'none',marginBottom:10}}>{l.name}</a>
              ))}
              <span onClick={() => navigate('/upload')} style={{display:'block',fontSize:14,color:'#5a5a5a',cursor:'pointer'}}>Try TalkDox →</span>
            </div>

            <div>
              <h4 style={{fontSize:13,fontWeight:700,textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:16,color:'#a0a0a0'}}>Connect</h4>
              {[
                {name:'GitHub',href:'https://github.com/gautamsingh'},
                {name:'LinkedIn',href:'https://www.linkedin.com/in/gautamsingh139/'},
              ].map(l=>(
                <a key={l.name} href={l.href} target="_blank" rel="noopener noreferrer" style={{display:'block',fontSize:14,color:'#5a5a5a',textDecoration:'none',marginBottom:10}}>{l.name}</a>
              ))}
              <div style={{marginTop:14,paddingTop:14,borderTop:'1px solid #e2e2e2'}}>
                <div style={{fontSize:11,color:'#a0a0a0',marginBottom:4,fontWeight:600,letterSpacing:'0.05em',textTransform:'uppercase'}}>Reach out</div>
                <div style={{fontSize:13,color:'#0a0a0a',fontWeight:600}}>gautamsr46gmail.com</div>
              </div>
            </div>
          </div>

          <div className="footer-bottom" style={{borderTop:'1px solid #e2e2e2',paddingTop:24,display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:12}}>
            <span style={{fontSize:13,color:'#a0a0a0'}}>© 2026 TalkDox AI. All rights reserved.</span>
            <span style={{fontSize:13,color:'#a0a0a0'}}>Built by <strong style={{color:'#0a0a0a'}}>Gautam Singh Rajput</strong></span>
          </div>
        </div>
      </footer>
    </>
  )
}
document.addEventListener("DOMContentLoaded", function() {
  const facts = [
    "Broccoli contains sulforaphane — your cells' tiny bodyguards.",
    "Eating fiber-rich veggies helps your gut biome party like it's Friday.",
    "Leafy greens are full of vitamin K — your bones give a standing ovation.",
    "Carotenoids in carrots help keep your eyes tuned in for life."
  ];

  function randomFact(){
    return facts[Math.floor(Math.random()*facts.length)];
  }

  const factBtn = document.getElementById('fact-btn');
  const factOutput = document.getElementById('fact-output');
  const sassBtn = document.getElementById('sass-meter');
  const signupForm = document.getElementById('signup-form');
  const signupMsg = document.getElementById('signup-msg');

  function playBeep(){
    try{
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const o = ctx.createOscillator(); const g = ctx.createGain();
      o.type = 'square'; o.frequency.value = 440; g.gain.value = 0.02;
      o.connect(g); g.connect(ctx.destination);
      o.start(); setTimeout(()=>{ o.stop(); ctx.close(); }, 80);
    }catch(e){ /* ignore if unavailable */ }
  }

  if(factBtn){
    factBtn.addEventListener('click', ()=>{ factOutput.textContent = randomFact(); playBeep(); });
  }

  if(sassBtn){
    sassBtn.addEventListener('click', ()=>{
      const levels = ["Mildly sassy 😏","Sass queen 👑","Over-the-top sassy 💅","Calm & leafy 🍃"];
      const pick = levels[Math.floor(Math.random()*levels.length)];
      alert('Sass Meter: ' + pick); playBeep();
    });
  }

  if(signupForm){
    signupForm.addEventListener('submit', (e)=>{
      e.preventDefault();
      playBeep();
      const email = document.getElementById('email').value;
      if(!email || !email.includes('@')){ signupMsg.textContent = 'Enter a real email, silly.'; signupMsg.style.color='crimson'; return; }
      signupMsg.style.color='green';
      signupMsg.textContent = 'You\'re on the list — expect sass + facts in your inbox.';
      // Note: This demo does not actually send emails.
    });
  }

  // Bit card interactions: click to show a playful description
  document.querySelectorAll('.bit-card, .bit-card-small').forEach(el=>{
    el.addEventListener('click', ()=>{
      const name = el.dataset.name || 'Veggie';
      const bits = el.dataset.bits || '';
      factOutput.textContent = `${name}: ${bits}. Pixel power activated!`;
      playBeep();
    });
    el.addEventListener('keydown', (e)=>{ if(e.key === 'Enter' || e.key === ' ') el.click(); });
  });

  console.log('Interactive features loaded.');
});
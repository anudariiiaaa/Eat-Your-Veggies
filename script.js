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

  if(factBtn){
    factBtn.addEventListener('click', ()=>{ factOutput.textContent = randomFact(); });
  }

  if(sassBtn){
    sassBtn.addEventListener('click', ()=>{
      const levels = ["Mildly sassy 😏","Sass queen 👑","Over-the-top sassy 💅","Calm & leafy 🍃"];
      const pick = levels[Math.floor(Math.random()*levels.length)];
      alert('Sass Meter: ' + pick);
    });
  }

  if(signupForm){
    signupForm.addEventListener('submit', (e)=>{
      e.preventDefault();
      const email = document.getElementById('email').value;
      if(!email || !email.includes('@')){ signupMsg.textContent = 'Enter a real email, silly.'; signupMsg.style.color='crimson'; return; }
      signupMsg.style.color='green';
      signupMsg.textContent = 'You're on the list — expect sass + facts in your inbox.';
      // Note: This demo does not actually send emails.
    });
  }

  // Bitaminds interactivity
  const toast = document.createElement('div');
  toast.className = 'toast';
  document.body.appendChild(toast);

  const bitCards = document.querySelectorAll('.bit-card');

  function loadBitaminds(){
    const raw = localStorage.getItem('bitaminds');
    return raw ? JSON.parse(raw) : {};
  }

  function saveBitaminds(data){
    localStorage.setItem('bitaminds', JSON.stringify(data));
  }

  function showToast(msg){
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(()=>{ toast.classList.remove('show'); }, 1800);
  }

  function updateCounts(){
    const data = loadBitaminds();
    bitCards.forEach(card => {
      const id = card.dataset.id;
      const countEl = card.querySelector('.count');
      countEl.textContent = data[id] || 0;
    });
  }

  bitCards.forEach(card => {
    const btn = card.querySelector('.collect-btn');
    btn.addEventListener('click', ()=>{
      const id = card.dataset.id;
      const names = {
        carrot: 'Night Vision',
        broccoli: 'Tiny Bodyguards',
        spinach: 'Strength Up',
        tomato: 'Heart Buddy',
        sweetpotato: 'Energy Boost'
      };
      const data = loadBitaminds();
      data[id] = (data[id] || 0) + 1;
      saveBitaminds(data);
      updateCounts();
      showToast(`+1 Bitamind: ${names[id]} acquired!`);
      // little 8-bit jingle (tiny beep via WebAudio, optional):
      try{
        const ctx = new (window.AudioContext||window.webkitAudioContext)();
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = 'square';
        o.frequency.value = 600;
        o.connect(g); g.connect(ctx.destination);
        g.gain.value = 0.06;
        o.start();
        setTimeout(()=>{ o.stop(); ctx.close(); }, 90);
      }catch(e){/* ignore audio errors */}
    });
  });

  updateCounts();

  console.log('Interactive features loaded. Bitaminds active.');
});
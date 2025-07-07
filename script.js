// main.js (micro‑animation demo)
document.querySelectorAll('section').forEach(sec=>{
  const obs=new IntersectionObserver(([e])=>{
    e.target.classList.toggle('reveal',e.isIntersecting)
  },{threshold:.1});
  obs.observe(sec);
});


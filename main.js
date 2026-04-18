// ─── CURSOR ───
const cur = document.getElementById('cursor');
const curRing = document.getElementById('cursor-ring');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',(e)=>{
  mx=e.clientX;my=e.clientY;
  cur.style.left=mx+'px';cur.style.top=my+'px';
});
(function animCursor(){
  rx+=(mx-rx)*0.12;ry+=(my-ry)*0.12;
  curRing.style.left=rx+'px';curRing.style.top=ry+'px';
  requestAnimationFrame(animCursor);
})();
document.querySelectorAll('a,button,.course-item,.vg-cell').forEach(el=>{
  el.addEventListener('mouseenter',()=>document.body.classList.add('cursor-hover'));
  el.addEventListener('mouseleave',()=>document.body.classList.remove('cursor-hover'));
});

// ─── CANVAS PARTICLE FIELD ───
(function(){
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  let W,H,particles=[];
  function resize(){W=canvas.width=window.innerWidth;H=canvas.height=window.innerHeight;}
  resize();window.addEventListener('resize',resize);
  class P{
    constructor(){
      this.x=Math.random()*W;
      this.y=Math.random()*H;
      this.size=Math.random()*1.5+0.2;
      this.speedX=(Math.random()-0.5)*0.3;
      this.speedY=(Math.random()-0.5)*0.3;
      this.opacity=Math.random()*0.4+0.05;
      this.pulse=Math.random()*Math.PI*2;
    }
    update(){
      this.x+=this.speedX;this.y+=this.speedY;
      this.pulse+=0.008;
      if(this.x<0)this.x=W;if(this.x>W)this.x=0;
      if(this.y<0)this.y=H;if(this.y>H)this.y=0;
    }
    draw(){
      const op=this.opacity*(0.7+0.3*Math.sin(this.pulse));
      ctx.beginPath();
      ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
      ctx.fillStyle=`rgba(200,255,0,${op})`;
      ctx.fill();
    }
  }
  for(let i=0;i<120;i++)particles.push(new P());
  function drawConnections(){
    for(let i=0;i<particles.length;i++){
      for(let j=i+1;j<particles.length;j++){
        const dx=particles[i].x-particles[j].x;
        const dy=particles[i].y-particles[j].y;
        const dist=Math.sqrt(dx*dx+dy*dy);
        if(dist<120){
          const op=(1-dist/120)*0.06;
          ctx.beginPath();
          ctx.moveTo(particles[i].x,particles[i].y);
          ctx.lineTo(particles[j].x,particles[j].y);
          ctx.strokeStyle=`rgba(200,255,0,${op})`;
          ctx.lineWidth=0.5;
          ctx.stroke();
        }
      }
    }
  }
  function animate(){
    ctx.clearRect(0,0,W,H);
    drawConnections();
    particles.forEach(p=>{p.update();p.draw();});
    requestAnimationFrame(animate);
  }
  animate();
})();

// ─── PRELOADER ───
let pct=0;
const prog=document.getElementById('preProgress');
const cnt=document.getElementById('preCount');
const preloader=document.getElementById('preloader');
const iv=setInterval(()=>{
  pct+=Math.random()*4+1;
  if(pct>=100){pct=100;clearInterval(iv);
    setTimeout(()=>{
      preloader.classList.add('loaded');
      setTimeout(()=>{preloader.classList.add('exit');},800);
    },400);
  }
  prog.style.width=pct+'%';
  cnt.textContent=Math.floor(pct)+'%';
},30);

// ─── NAVBAR SCROLL ───
window.addEventListener('scroll',()=>{
  document.getElementById('nav').classList.toggle('scrolled',window.scrollY>80);
});

// ─── INTERSECTION OBSERVER ───
const obs=new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){e.target.classList.add('vis');}
  });
},{threshold:0.1,rootMargin:'0px 0px -60px 0px'});
document.querySelectorAll('.ml,.md,.sc,.ci,.vc,.qt,.qs,.re,.rd,.rr,.vgt').forEach(el=>obs.observe(el));
// Titles with overflow hidden
document.querySelectorAll('.ct,.rt').forEach(el=>obs.observe(el));
document.querySelectorAll('.cs').forEach(el=>obs.observe(el));

// ─── FORM ───
function handleSubmit(e){
  e.preventDefault();
  const btn =document.getElementById('submitBtn');
  const txt=document.getElementById('btnText');
  btn.classList.add('success');
  txt.textContent='Entered ✦ We will be in touch';
  btn.style.letterSpacing='0.1em';
  setTimeout(()=>{
    btn.classList.remove('success');
    txt.textContent='Submit to Lottery';
    btn.style.letterSpacing='';
    e.target.reset();
  },4000);
}

// ─── SMOOTH ANCHOR ───
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    e.preventDefault();
    const t=document.querySelector(a.getAttribute('href'));
    if(t)t.scrollIntoView({behavior:'smooth',block:'start'});
  });
});

//  ─── PARALLAX BG TEXT ───
 const bgTxt=document.querySelector('.hero-bg-text');
 window.addEventListener('scroll',()=>{
   if(bgTxt){bgTxt.style.transform=`translate(-50%,calc(-50% + ${window.scrollY*0.3}px))`;}
 });
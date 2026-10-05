const AudioCtx=window.AudioContext||window.webkitAudioContext;let ctx;
function ac(){if(!ctx)ctx=new AudioCtx();return ctx}
function osc(c,type,f0,f1,t0,d,g=.10){const o=c.createOscillator(),v=c.createGain();o.type=type;o.frequency.setValueAtTime(f0,t0);if(f1)o.frequency.exponentialRampToValueAtTime(Math.max(30,f1),t0+d);v.gain.setValueAtTime(.0001,t0);v.gain.exponentialRampToValueAtTime(g,t0+.01);v.gain.exponentialRampToValueAtTime(.0001,t0+d);o.connect(v).connect(c.destination);o.start(t0);o.stop(t0+d+.02)}
function noise(c,t0,d,g=.035){const b=c.createBuffer(1,Math.ceil(c.sampleRate*d),c.sampleRate),a=b.getChannelData(0);for(let i=0;i<a.length;i++)a[i]=(Math.random()*2-1)*(1-i/a.length);const s=c.createBufferSource(),v=c.createGain();s.buffer=b;v.gain.setValueAtTime(g,t0);v.gain.exponentialRampToValueAtTime(.0001,t0+d);s.connect(v).connect(c.destination);s.start(t0)}
function rouletteTicks(c,variant){
  const t0=c.currentTime+.02;
  const duration=3.2;
  let t=0;
  let i=0;
  while(t<duration){
    const p=t/duration;
    const interval=.045 + Math.pow(p,2.35)*.34;
    const tt=t0+t;
    if(variant==="wood"){
      osc(c,"triangle",420,320,tt,.045,1.0);
      if(i%3===0) noise(c,tt,.025,.012);
    }else if(variant==="tonal"){
      const f=i%2===0?620:560;
      osc(c,"sine",f,f*.98,tt,.038,1.0);
    }else{
      osc(c,"square",760,540,tt,.028,1.0);
      noise(c,tt,.018,.01);
    }
    t+=interval;
    i++;
  }
  const end=t0+duration;
  if(variant==="wood") osc(c,"triangle",300,220,end,.11,1.0);
  if(variant==="tonal") osc(c,"sine",520,390,end,.12,1.0);
  if(variant==="mechanical") osc(c,"square",430,280,end,.08,1.0);
}
const fx={
"deny-soft":c=>{let t=c.currentTime;osc(c,"triangle",380,210,t,.12,.10);noise(c,t,.08,.035)},
"deny-double":c=>{let t=c.currentTime;osc(c,"square",250,220,t,.06,.10);osc(c,"square",220,170,t+.09,.08,.10)},
"deny-low":c=>{let t=c.currentTime;osc(c,"sine",180,90,t,.24,.10)},
"reward-sparkle":c=>{let t=c.currentTime;[660,880,1175].forEach((f,i)=>osc(c,"sine",f,f*1.06,t+i*.07,.22,.10))},
"reward-pop":c=>{let t=c.currentTime;noise(c,t,.06,.04);osc(c,"triangle",520,920,t,.22,.10);osc(c,"sine",1040,1320,t+.11,.22,.10)},
"reward-jackpot":c=>{let t=c.currentTime;[523,659,784,1046].forEach((f,i)=>osc(c,i<2?"triangle":"sine",f,f*1.02,t+i*.06,.28,.10))},
"roulette-tick-wood":c=>rouletteTicks(c,"wood"),
"roulette-tick-tonal":c=>rouletteTicks(c,"tonal"),
"roulette-tick-mechanical":c=>rouletteTicks(c,"mechanical"),
"master-warm":c=>{let t=c.currentTime;[392,523,659].forEach((f,i)=>osc(c,"sine",f,f,t+i*.12,.42,.10))},
"master-premium":c=>{let t=c.currentTime;[440,554,659,880].forEach((f,i)=>osc(c,"triangle",f,f*1.03,t+i*.09,.34,.10))},
"master-flourish":c=>{let t=c.currentTime;osc(c,"sine",330,660,t,.36,.10);osc(c,"sine",660,990,t+.18,.42,.10);noise(c,t+.24,.12,.03)},
"master-fanfare":c=>{let t=c.currentTime;[523,659,784].forEach((f,i)=>osc(c,"triangle",f,f*1.02,t+i*.14,.62,.085));[784,988,1175].forEach((f,i)=>osc(c,"sine",f,f,t+.62+i*.12,.78,.075));osc(c,"sine",523,1046,t+1.02,.7,.07)},
"master-cascade":c=>{let t=c.currentTime;[392,494,587,784,988].forEach((f,i)=>osc(c,i<3?"triangle":"sine",f,f*1.015,t+i*.18,.72,.072));[659,784,988,1318].forEach((f,i)=>osc(c,"sine",f,f,t+1.05+i*.13,.9,.06));noise(c,t+1.25,.18,.018)},
"master-celebration":c=>{let t=c.currentTime;[330,392,494].forEach((f,i)=>osc(c,"triangle",f,f*1.02,t+i*.16,.8,.065));[523,659,784,1046].forEach((f,i)=>osc(c,"sine",f,f,t+.72+i*.18,1.05,.065));[784,988,1175,1568].forEach((f,i)=>osc(c,"sine",f,f,t+1.65+i*.14,.95,.052));osc(c,"sine",523,1046,t+2.15,.85,.055);noise(c,t+2.4,.22,.016)},
"timeout-drop":c=>{let t=c.currentTime;osc(c,"sine",420,110,t,.62,.10)},
"timeout-two":c=>{let t=c.currentTime;osc(c,"triangle",330,300,t,.18,.10);osc(c,"triangle",180,150,t+.24,.28,.10)},
"timeout-clock":c=>{let t=c.currentTime;[0,.16,.32].forEach((x,i)=>osc(c,"square",i<2?520:220,i<2?500:170,t+x,.08,.10))},
"timeout-bell":c=>{let t=c.currentTime;osc(c,"sine",660,520,t,.28,.075);osc(c,"sine",330,260,t+.2,.48,.065)},
"timeout-pulse":c=>{let t=c.currentTime;[0,.22,.46].forEach((x,i)=>osc(c,"triangle",260-i*35,210-i*30,t+x,.16,.075))},
"timeout-soft-stop":c=>{let t=c.currentTime;osc(c,"sine",520,330,t,.34,.07);osc(c,"triangle",260,130,t+.24,.56,.075);noise(c,t+.28,.16,.012)},
"timeout-long-fall":c=>{let t=c.currentTime;osc(c,"sine",620,260,t,.72,.072);osc(c,"triangle",310,120,t+.38,.92,.075);osc(c,"sine",155,105,t+1.02,.5,.05)},
"timeout-long-bell":c=>{let t=c.currentTime;osc(c,"sine",660,520,t,.36,.068);osc(c,"sine",440,300,t+.28,.72,.065);osc(c,"triangle",220,140,t+.72,.8,.06);noise(c,t+.42,.18,.01)},
"timeout-long-resolve":c=>{let t=c.currentTime;[392,330,262].forEach((f,i)=>osc(c,"sine",f,f*.94,t+i*.28,.72,.065));osc(c,"triangle",196,110,t+.86,1.0,.07)}
};
document.addEventListener("click",e=>{const b=e.target.closest("[data-sound]");if(!b)return;const c=ac();if(c.state==="suspended")c.resume();fx[b.dataset.sound]?.(c)});
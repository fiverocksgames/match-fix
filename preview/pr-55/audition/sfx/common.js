const AudioCtx=window.AudioContext||window.webkitAudioContext;let ctx;
function ac(){if(!ctx)ctx=new AudioCtx();return ctx}
function osc(c,type,f0,f1,t0,d,g=.09){const o=c.createOscillator(),v=c.createGain();o.type=type;o.frequency.setValueAtTime(f0,t0);if(f1)o.frequency.exponentialRampToValueAtTime(Math.max(30,f1),t0+d);v.gain.setValueAtTime(.0001,t0);v.gain.exponentialRampToValueAtTime(g,t0+.01);v.gain.exponentialRampToValueAtTime(.0001,t0+d);o.connect(v).connect(c.destination);o.start(t0);o.stop(t0+d+.02)}
function noise(c,t0,d,g=.035){const b=c.createBuffer(1,Math.ceil(c.sampleRate*d),c.sampleRate),a=b.getChannelData(0);for(let i=0;i<a.length;i++)a[i]=(Math.random()*2-1)*(1-i/a.length);const s=c.createBufferSource(),v=c.createGain();s.buffer=b;v.gain.setValueAtTime(g,t0);v.gain.exponentialRampToValueAtTime(.0001,t0+d);s.connect(v).connect(c.destination);s.start(t0)}
const fx={
"deny-soft":c=>{let t=c.currentTime;osc(c,"triangle",380,210,t,.12,.065);noise(c,t,.08,.02)},
"deny-double":c=>{let t=c.currentTime;osc(c,"square",250,220,t,.06,.04);osc(c,"square",220,170,t+.09,.08,.035)},
"deny-low":c=>{let t=c.currentTime;osc(c,"sine",180,90,t,.24,.055)},
"reward-sparkle":c=>{let t=c.currentTime;[660,880,1175].forEach((f,i)=>osc(c,"sine",f,f*1.06,t+i*.07,.22,.055))},
"reward-pop":c=>{let t=c.currentTime;noise(c,t,.06,.025);osc(c,"triangle",520,920,t,.22,.07);osc(c,"sine",1040,1320,t+.11,.22,.04)},
"reward-jackpot":c=>{let t=c.currentTime;[523,659,784,1046].forEach((f,i)=>osc(c,i<2?"triangle":"sine",f,f*1.02,t+i*.06,.28,.05))},
"master-warm":c=>{let t=c.currentTime;[392,523,659].forEach((f,i)=>osc(c,"sine",f,f,t+i*.12,.42,.055))},
"master-premium":c=>{let t=c.currentTime;[440,554,659,880].forEach((f,i)=>osc(c,"triangle",f,f*1.03,t+i*.09,.34,.048))},
"master-flourish":c=>{let t=c.currentTime;osc(c,"sine",330,660,t,.36,.05);osc(c,"sine",660,990,t+.18,.42,.05);noise(c,t+.24,.12,.012)},
"timeout-drop":c=>{let t=c.currentTime;osc(c,"sine",420,110,t,.62,.055)},
"timeout-two":c=>{let t=c.currentTime;osc(c,"triangle",330,300,t,.18,.045);osc(c,"triangle",180,150,t+.24,.28,.05)},
"timeout-clock":c=>{let t=c.currentTime;[0,.16,.32].forEach((x,i)=>osc(c,"square",i<2?520:220,i<2?500:170,t+x,.08,.025))}
};
document.addEventListener("click",e=>{const b=e.target.closest("[data-sound]");if(!b)return;const c=ac();if(c.state==="suspended")c.resume();fx[b.dataset.sound]?.(c)});
const GRID="111111111110000000000000011110011111111235677777766666555544444433332222111111000000|111111111100000000000001111100111111013578888877776666655544444433333222221111100000|111111110000000000001110000001111101468888888777777666555554444344333222222111100000|111001100000000000000000100110110136889999998877776666555544444443333322222211111000|111111000000000000000000001100002688888777888887766666555444444443332322222211100010|100000000000000000000000011000158888875100012335776665555444444433332232222211100000|365433210000000000000001100004898888899987420000134665544444444433333322222111100000|999999999852640000000100001059988888888898875310100233444444444333333322222111000000|743433454552799757610000110399988888899997655543221111233334433333333322222111000000|541055432552024688875200001899998887666554455554443222112333333333332222222111000000|443385332345310245667665205989898885200000001232234433333333333333322222221210000000|322322344334544224555545746988998999887339400001222344344333322221111111212100000000|322222222211332221116542354798999988888744101122122344433322222211111111111000000000|333323321121112210004642224258888887565454432121121344444323333322221111111000000000|333333332222121000001653423107888888776554432111233445554333223333332222210000000000|333322222222210000000354542207887777776555554444444578653222222111122222200000000000|332223233322100000010363234415787777766655555554578897642123211000111112000000000000|222233332221000010010793023224677777766655555556888997541123212111111111000000000000|222333322221010010010022223445577766666665555567777896531223332222221120000000000000|233333332121000100000002334555567776666655555434579976521223343322221210000000000000|333333333322001000110003434455567777766555441168999865421233344433222200000000000000|322333233332200001100002444555567777766554421999877654321233343333222000000000000000|332222333333320000000001544556667777777655531410456554221334444333221000000000000000|333334444344433221000000354556667777777777764220044454222344443332310000000000000000|444444444444334444443110045556677777788887787777401011123334443333000000000000000000|444444444455565555444333115666667778888898899999636311223444443320000000000000000000|444455565444434556666554412766666677766556766434546312223434443100000000000000000000|454443210000000000011345551476666666555420000123321122223444320000000000000000000011|100000000111111100012323305466566667766655443211211221234333100111211100000000011111|110000011222210023156559205645666666555545554322211113444310111222212233210000111111|000123344321154059676784005655566655654443333333223234432112112211122222222211111100|467777677776776316766770114766545777667665433334554444101232122124433211111111100000|676666777778766667677860124667653467766655444434543210034334311145456777776432220011|665466666777776678788860345666666445666655555554322212565443422444565666776566522432|787533455666676678777772555555555555555666664312455347654444334555666666655646772133|688986434445556778899880155556666555555443211367653476544443345456665666656767787523|555668877777766789999997036555566666554333579976545765544443555666655675567777545942|767788888888999789999999614544433443345689988766678755555445656666656765678643345625|889888887888889989999999997766666667899998777777787655555456667766567657875348878877|888877888889999999999999999999999999988888778877876666655576777765677688743699799998|888888889999999999999999999999999888888889887678776665555777777666776897459977999997|888999999999999999999999999999998888888888776798776666557777777667778976799579999954|889999999999999999999999999999999888887777777997776777679888776677789778984899997346|889999999999999999999999999998888888988888779988777789899998776677897799839999963898|888999999999999999999999998888888888888888799887799999999987776888988999379999659988|999999999999999999999998888888888888888888998877999999999887778999999996699998799899".split("|");
const WORD="ESTHERILOVEYOU";
const art=document.getElementById("art");
let html="",k=0;
for(const row of GRID){for(const d of row){html+='<i class="l'+d+'">'+WORD[k%WORD.length]+'</i>';k++}html+="\n"}
art.innerHTML=html;
const cells=[...art.querySelectorAll("i")];
const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;

function reveal(){
  if(reduce){cells.forEach(c=>c.classList.add("on"));return}
  const cols=GRID[0].length;
  cells.forEach((c,i)=>{const r=Math.floor(i/cols),x=i%cols;
    setTimeout(()=>c.classList.add("on"),r*55+x*6+Math.random()*250)});
}

/* song: YouTube player, hidden, loops, starts on the gate tap */
const VID="mE_XFgyPhJU";
let yt=null,ytReady=false,wantPlay=false;
window.onYouTubeIframeAPIReady=function(){
  yt=new YT.Player("yt",{width:200,height:200,videoId:VID,
    playerVars:{autoplay:0,controls:0,loop:1,playlist:VID,playsinline:1,rel:0},
    events:{onReady:()=>{ytReady=true;if(wantPlay)playSong()}}});
};
if(window.YT&&YT.Player)onYouTubeIframeAPIReady();
function playSong(){wantPlay=true;if(!ytReady)return;yt.unMute();yt.setVolume(100);yt.playVideo()}

document.getElementById("open").addEventListener("click",()=>{
  document.getElementById("gate").classList.add("gone");
  playSong();
  reveal();burst();
});

/* floating strawberries and hearts */
const cv=document.getElementById("sky"),ctx=cv.getContext("2d");
let W,H,dpr,parts=[];
function size(){dpr=devicePixelRatio||1;W=innerWidth;H=innerHeight;cv.width=W*dpr;cv.height=H*dpr;ctx.setTransform(dpr,0,0,dpr,0,0)}
size();addEventListener("resize",size);
function heart(x,y,s,c){ctx.fillStyle=c;ctx.beginPath();ctx.moveTo(x,y+s*.3);
  ctx.bezierCurveTo(x,y,x-s*.5,y,x-s*.5,y+s*.3);ctx.bezierCurveTo(x-s*.5,y+s*.6,x,y+s*.8,x,y+s);
  ctx.bezierCurveTo(x,y+s*.8,x+s*.5,y+s*.6,x+s*.5,y+s*.3);ctx.bezierCurveTo(x+s*.5,y,x,y,x,y+s*.3);ctx.fill()}
function berry(x,y,s){ctx.fillStyle="#e2334a";ctx.beginPath();ctx.moveTo(x-s*.45,y);
  ctx.quadraticCurveTo(x-s*.5,y+s*.6,x,y+s);ctx.quadraticCurveTo(x+s*.5,y+s*.6,x+s*.45,y);
  ctx.quadraticCurveTo(x,y-s*.15,x-s*.45,y);ctx.fill();
  ctx.fillStyle="#3e9b5a";ctx.beginPath();ctx.ellipse(x,y,s*.38,s*.12,0,0,7);ctx.fill();
  ctx.fillStyle="#1e2a4a";for(const [a,b] of [[-.2,.3],[.15,.35],[0,.55],[-.15,.7],[.18,.62]]){ctx.beginPath();ctx.arc(x+a*s,y+b*s,s*.035,0,7);ctx.fill()}}
function spawn(burst){parts.push({x:Math.random()*W,y:burst?H*.5+Math.random()*80:H+30,s:12+Math.random()*16,
  v:burst?-(2+Math.random()*3):-(.3+Math.random()*.6),dx:burst?(Math.random()-.5)*3:0,w:Math.random()*6,
  t:Math.random()<.45?"b":"h",c:Math.random()<.5?"#e2334a":"#f7a8b5",life:1})}
function burst(){if(reduce)return;for(let i=0;i<40;i++)spawn(true)}
if(!reduce){for(let i=0;i<10;i++){spawn(false);parts[i].y=Math.random()*H}}
let last=0;
function tick(t){
  ctx.clearRect(0,0,W,H);
  if(!reduce&&t-last>1400&&parts.length<22){spawn(false);last=t}
  for(const p of parts){p.y+=p.v;p.x+=p.dx+Math.sin((t/900)+p.w)*.3;p.dx*=.98;if(p.v<-.9)p.v*=.985;
    ctx.globalAlpha=.55;p.t==="b"?berry(p.x,p.y,p.s):heart(p.x,p.y,p.s,p.c)}
  ctx.globalAlpha=1;parts=parts.filter(p=>p.y>-60);
  requestAnimationFrame(tick)}
requestAnimationFrame(tick);

/* ---------- cute extras ---------- */
const $=id=>document.getElementById(id);
const DAY=864e5,today=new Date();today.setHours(0,0,0,0);

/* counters: together since Sep 1 2026, birthday Nov 10 */
const since=new Date(2026,8,1);
$("together").textContent=Math.max(0,Math.round((today-since)/DAY));
let bd=new Date(today.getFullYear(),10,10);if(bd<today)bd=new Date(today.getFullYear()+1,10,10);
const left=Math.round((bd-today)/DAY);
if(left===0){$("bday").textContent="Today!";$("bdayLbl").textContent="happy birthday, my love"}
else{$("bday").textContent=left;$("bdayLbl").textContent=left===1?"day until your birthday":"days until your birthday"}

/* effects canvas on top: tap hearts, confetti, sparkles */
const fx=$("fx"),fc=fx.getContext("2d");let fxp=[];
function fxSize(){fx.width=innerWidth*dpr;fx.height=innerHeight*dpr;fc.setTransform(dpr,0,0,dpr,0,0)}
fxSize();addEventListener("resize",fxSize);
function fheart(x,y,s,c){fc.fillStyle=c;fc.beginPath();fc.moveTo(x,y+s*.3);
  fc.bezierCurveTo(x,y,x-s*.5,y,x-s*.5,y+s*.3);fc.bezierCurveTo(x-s*.5,y+s*.6,x,y+s*.8,x,y+s);
  fc.bezierCurveTo(x,y+s*.8,x+s*.5,y+s*.6,x+s*.5,y+s*.3);fc.bezierCurveTo(x+s*.5,y,x,y,x,y+s*.3);fc.fill()}
function star(x,y,s,c){fc.fillStyle=c;fc.beginPath();for(let i=0;i<8;i++){const r=i%2?s*.25:s,a=i*Math.PI/4;fc.lineTo(x+Math.cos(a)*r,y+Math.sin(a)*r)}fc.fill()}
const COLS=["#e2334a","#f7a8b5","#ffd36b","#3e9b5a","#ec8a9a","#fff"];
function hearts(x,y,n){if(reduce)return;for(let i=0;i<n;i++){const a=Math.random()*Math.PI*2,v=1+Math.random()*3;
  fxp.push({k:"h",x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v-2,s:8+Math.random()*10,c:COLS[i%2],l:1})}}
function confetti(n){if(reduce)return;for(let i=0;i<n;i++)fxp.push({k:"c",x:Math.random()*innerWidth,y:-20-Math.random()*200,
  vx:(Math.random()-.5)*2,vy:2+Math.random()*3,s:6+Math.random()*6,r:Math.random()*6,c:COLS[i%COLS.length],l:1})}
function sparkle(x,y){if(reduce)return;fxp.push({k:"s",x,y,vx:(Math.random()-.5),vy:-.5-Math.random(),s:3+Math.random()*4,c:COLS[2+(Math.random()*2|0)*2],l:1})}
(function fxTick(){fc.clearRect(0,0,innerWidth,innerHeight);
  for(const p of fxp){p.x+=p.vx;p.y+=p.vy;
    if(p.k==="h"){p.vy+=.08;p.l-=.015;fc.globalAlpha=Math.max(p.l,0);fheart(p.x,p.y,p.s,p.c)}
    else if(p.k==="c"){p.r+=.1;p.x+=Math.sin(p.r)*.6;if(p.y>innerHeight+20)p.l=0;fc.globalAlpha=1;fc.save();fc.translate(p.x,p.y);fc.rotate(p.r);fc.fillStyle=p.c;fc.fillRect(-p.s/2,-p.s/4,p.s,p.s/2);fc.restore()}
    else{p.l-=.03;fc.globalAlpha=Math.max(p.l,0);star(p.x,p.y,p.s,p.c)}}
  fc.globalAlpha=1;fxp=fxp.filter(p=>p.l>0);requestAnimationFrame(fxTick)})();

/* tap anywhere: little heart pop; mouse: sparkle trail */
addEventListener("pointerdown",e=>{if(!e.target.closest("#gate"))hearts(e.clientX,e.clientY,7)});
let lastS=0;addEventListener("pointermove",e=>{if(e.pointerType!=="mouse")return;const t=performance.now();if(t-lastS>40){sparkle(e.clientX,e.clientY);lastS=t}});

/* opening the gate also drops confetti */
$("open").addEventListener("click",()=>confetti(120));

/* cake: blow out candles */
const candles=[...document.querySelectorAll(".candle")];
candles.forEach(c=>c.addEventListener("click",e=>{e.stopPropagation();if(c.classList.contains("out"))return;
  c.classList.add("out");const r=c.getBoundingClientRect();sparkle(r.left+r.width/2,r.top);sparkle(r.left+r.width/2,r.top+6);
  const lit=candles.filter(x=>!x.classList.contains("out")).length;
  if(lit){$("cakeHint").textContent=lit+" more to go"}
  else{$("cakeHint").textContent="Wish made! I hope every bit of it comes true ♥";confetti(160);
    setTimeout(()=>{candles.forEach(x=>x.classList.remove("out"));$("cakeHint").textContent="tap the candles to make another wish"},6000)}}));

/* love jar */
const REASONS=["The way you laugh at your own jokes before you finish them.","Your hand hearts. Every single one.",
  "You make lazy afternoons feel like a holiday.","Your pout. Still undefeated.","You are my favorite notification.",
  "How you make ordinary days feel soft and bright.","Your smile fixes everything in about two seconds.",
  "You are my calm place.","Strawberry picnics with you are the best plans ever.","You make me want to be better, every day.",
  "Even your silly faces are cute.","You are my good thing."];
let bag=[];
$("jar").addEventListener("click",e=>{if(!bag.length)bag=REASONS.slice().sort(()=>Math.random()-.5);
  const j=$("jar"),r=$("reason");j.classList.remove("wiggle");void j.offsetWidth;j.classList.add("wiggle");
  r.textContent=bag.pop();r.classList.remove("pop");void r.offsetWidth;r.classList.add("pop");
  const b=j.getBoundingClientRect();hearts(b.left+b.width/2,b.top+20,10)});

/* envelope */
$("env").addEventListener("click",()=>{const env=$("env"),L=$("letter");const open=!env.classList.contains("open");
  env.classList.toggle("open",open);env.setAttribute("aria-expanded",open);$("envHint").textContent=open?"tap to close":"tap to open";
  if(open){setTimeout(()=>{L.hidden=false;L.classList.add("show")},500);const b=env.getBoundingClientRect();hearts(b.left+b.width/2,b.top,12)}
  else{L.hidden=true;L.classList.remove("show")}});

/* strawberry buddy */
const LINES=["Hi Esther!","You look cute today.","He really likes you, you know.","Boop!","Have you smiled yet?",
  "Strawberry hug!","You are berry special.","Go open the envelope!","Try the love jar!"];
let bt;$("buddy").addEventListener("click",()=>{const b=$("bubble");b.textContent=LINES[Math.random()*LINES.length|0];b.classList.add("on");
  clearTimeout(bt);bt=setTimeout(()=>b.classList.remove("on"),2600)});

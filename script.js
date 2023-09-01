const d = document;
const hole = d.getElementsByClassName("hole")[0];
const wall = d.getElementsByClassName("wall")[0];
const char = d.getElementsByClassName("char")[0];
const gs = d.getElementsByClassName("container")[0];
const gover = d.getElementsByClassName("gameover")[0];
const scr = d.getElementsByClassName("score")[0];
const scrd = d.getElementsByClassName("scored")[0];
const cs = getComputedStyle(char);
const ws = getComputedStyle(wall);
const hs = getComputedStyle(hole);
const gss = getComputedStyle(gs);
let haveStart = 0;
let i = 0;
let isStart = 0;
let isGameover = 0;
let score = 0;
let rn = 0;

function isCollide(a, b) {
  if (a.getPropertyValue("left") != b.getPropertyValue("left")) {
    gameOver();
    return true;
  } else {
    score++;
    return false;
  }
}

function gameOver() {
  gs.style.setProperty("display", "none");
  gover.style.setProperty("display", "block");
  scr.style.setProperty("display", "none");
  gover.querySelector("span").innerText = score;
  isStart = 0;
  i = 0;
  score = 0;
  isGameover = 1;
}

function start() {
   if(isGameover){
     score--;
     gs.style.setProperty("display", "flex");
     gover.style.setProperty("display", "none");
     scr.style.setProperty("display", "block");
     isGameover = 0;
     isStart = 1;
   }
  
  if(!haveStart){
    haveStart = 1;
    load();
  }
}

scr.onclick = ()=>{
  if(!isStart)
  start();
}
gover.onclick = ()=>{
  if(!isStart)
  start();
}


wall.onanimationiteration = () => {
  
  let x = isCollide(hs, cs);
  holeMove(isStart);
  
  scr.querySelector("span").innerText = score;
  
};
const move = (dir) => {
  let l = parseInt(cs.getPropertyValue("left"));

  if (dir === 0 && l != 0) {
    l -= 30;
  }
  if (dir === 1 && l != 270) {
    l += 30;
  }
  char.style.setProperty("left", l + "px");
};
d.onkeydown = function (event) {

  let c = event.keyCode;

  if (c == 13 && !isStart) {
    start();
  }
  if (c == 37 || c == 65 || c == 97) {
    move(0);
  }
  if (c == 39 || c == 68 || c == 100) {
    move(1);
  }
};
function holeMove(x) {
  if (x) {
    while (rn == parseInt(hs.getPropertyValue("left"))) {
      rn = Math.floor(Math.random() * 9) * 30;
    }

    hole.style.left = rn + "px";
  }
}
function load() {
  const a = setInterval(() => {
    scr.innerHTML = `${++i}`;
    if (i == 4) {
      isStart = 1;
      scr.innerHTML = `Score:<span class="scored">${score}</span>`;
      wall.style.setProperty("animation-name", "moveWall");
      clearInterval(a);
    }
  },1000);
}
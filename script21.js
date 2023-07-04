var carackter=document.querySelector('.carackter');
var game=document.querySelector('.game');
var interval;
var both = 0;
var counter=0;
var curentBlock=[];



function moveleft() {
  var left = parseInt(window.getComputedStyle(carackter).getPropertyValue('left'));
  if (left > 0) {
    carackter.style.left = left - 3 + 'px';
  }

}

function moveright() {
  var left = parseInt(window.getComputedStyle(carackter).getPropertyValue('left'));
  if (left < 780) {
    carackter.style.left = left + 3 + 'px';
  }
}




document.addEventListener("keydown",e=> {
  if (both == 0) {
    both++;
    if (e.key === "ArrowLeft") {
      interval = setInterval(moveleft, 1);
    }
    if (e.key === "ArrowRight") {
      interval = setInterval(moveright, 1);
    }
  }
});

document.addEventListener("keyup", e=> {
  clearInterval(interval);
  both = 0;
});




setInterval(function(){
var blocklast=document.getElementById('block'+(counter-1));
var holelast=document.getElementById('hole'+(counter-1));
if(counter>0){
var blocklastTop = parseInt(window.getComputedStyle(blocklast).getPropertyValue('top'));
var holelastTop = parseInt(window.getComputedStyle(holelast).getPropertyValue('top'));
}

if(blocklastTop<400 || counter==0){
var block=document.createElement('div');
var hole=document.createElement('div');
block.setAttribute("class","block");
hole.setAttribute("class","hole");
block.setAttribute("id","block"+ counter);
hole.setAttribute("id","hole"+ counter);
block.style.top=blocklastTop +100 +'px';
hole.style.top=holelastTop +100 +'px';
var randam=Math.floor(Math.random() * 360)
hole.style.left=randam+'px'
game.appendChild(block);
game.appendChild(hole);
curentBlock.push(counter);
counter++;
}

var caracktetTop = parseInt(window.getComputedStyle(carackter).getPropertyValue('top'));
var carackterLeft = parseInt(window.getComputedStyle(carackter).getPropertyValue('left'));
var drop=0;

if(caracktetTop <= 0){
  alert("Game over. Score: "+(counter-9));
  clearInterval(block);
  location.reload();
}
for(i=0;i<curentBlock.length;i++){
  let current=curentBlock[i];
  let iblock=document.getElementById('block'+ current);
  let ihole=document.getElementById('hole'+ current);
  var iBlockTop = parseFloat(window.getComputedStyle(iblock).getPropertyValue('top'));
  let iholeLeft = parseFloat(window.getComputedStyle(ihole).getPropertyValue("left"));
  iblock.style.top=iBlockTop - 0.5 + 'px';
  ihole.style.top=iBlockTop- 0.5 + 'px';
  if(iBlockTop<-20){
    curentBlock.shift();
    iblock.remove();
    ihole.remove();
  }

  if(iBlockTop-20<caracktetTop && iBlockTop>caracktetTop){
    drop++;
    if(iholeLeft<=carackterLeft && iholeLeft+20>=carackterLeft){
drop=0;
    }
  }

}
if(drop==0){
  if(caracktetTop<480){
    carackter.style.top=caracktetTop + 2 +'px';
  }

 
}else{
  carackter.style.top=caracktetTop - 0.5 +'px'
}
},1)
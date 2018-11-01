var font;
var vehicle=[];
var text='';
function preload(){
  font = loadFont('./AvenirNextLTPro-Demi.otf')
}

function setup() {
 createCanvas(700, 300);    
  textChanged();
}

function textChanged(){
  vehicle=[];
	text=document.getElementById("name").value;
  var pt=font.textToPoints(text,30,170,160);
  pt.forEach( p=>{
    let veh=new Vehicles(p.x,p.y);
    vehicle.push(veh);    
  }) 
}

function draw() {
  background(0);
  vehicle.forEach(v=>{
    v.behaviour();
  	v.update();
    v.show();
  })
}
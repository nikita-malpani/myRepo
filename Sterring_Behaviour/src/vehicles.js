function Vehicles(x, y) {

  this.pos = createVector(random(width), random(height));
  this.target = createVector(x, y);
  this.vel = p5.Vector.random2D();
  this.acc = createVector();
  this.maxSpeed = 4;
  this.maxForce = 1;
}

Vehicles.prototype.behaviour = function() {
  var arrive = this.arrive(this.target);
  var mouse = createVector(mouseX, mouseY);
  var flee = this.flee(mouse);
  
  arrive.mult(1);
  flee.mult(4);
  
  this.applyForce(flee);
  this.applyForce(arrive);
}

Vehicles.prototype.applyForce = function(f) {
  this.acc.add(f);
}

Vehicles.prototype.arrive = function(target) {
  var desired = p5.Vector.sub(target, this.pos);
  var dist = desired.mag();
  var speed = this.maxSpeed;
  if (dist < 100) {
    speed = map(dist, 0, 100, 0, this.maxSpeed);
  }
  desired.setMag(speed);
  var steer = p5.Vector.sub(desired, this.vel);
  steer.limit(this.maxForce);
  return steer;
}

Vehicles.prototype.flee = function(target) {
  var desired = p5.Vector.sub(target, this.pos);
  var dist = desired.mag();
  if (dist < 50) {
    desired.setMag(this.maxSpeed);
    desired.mult(-1);
    var steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxForce);
    return steer;
  } else {
    return createVector(0, 0);
  }

}

Vehicles.prototype.update = function() {
  this.pos.add(this.vel);
  this.vel.add(this.acc);
  this.acc.mult(0);
}

Vehicles.prototype.show = function() {
  stroke(random(0,225),random(0,225),random(0,225));
  strokeWeight(6);
  point(this.pos.x, this.pos.y);
}
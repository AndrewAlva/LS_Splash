// Detect if user used mobile to visit the site to disable html5 canvas and prevent bugs and delays
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    $('#dotCanvas').remove();
    
} else{
  function rand(min,max)
  {
      return Math.floor(Math.random()*(max-min+1)+min);
  }

  var canvas,ctx,w,h;

  canvas = document.getElementById("dotCanvas");

  w = window.innerWidth;
  h = window.innerHeight;

  canvas.width = w;
  canvas.height = h;

  ctx = canvas.getContext('2d');


  var particleNum,minDist;
  particleNum = 110;
  minDist = w/2;

  var particles = [];

  function particle(){
    this.x = Math.random()*w,
    this.y = Math.random()*h,
    this.vx = rand(-1,1),
    this.vy = Math.random(),
    this.radius = 2,
    this.draw = function() {
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fill();
    }
  }
  function paintCanvas(){
    ctx.fillStyle = 'rgba(28,28,28,1)';
    ctx.fillRect(0,0,w,h);
  }

  for (i=0; i<particleNum;i++){
    particles.push(new particle());
  }

  // Initial mouse position
  var mouse = {x: -100, y: -100};

  // When mouse is moving, update cursor position
  document.addEventListener('mousemove', function(e){ 
      mouse.x = e.clientX || e.pageX; 
      mouse.y = e.clientY || e.pageY 
  }, false);

  function draw(){
    paintCanvas();
    for(i=0;i<particles.length;i++){
      p=particles[i];
      p.draw();
      update();
      for(var j=i+1;j<particles.length;j++){
        p2= particles[j];
        distance(mouse,p2);
      }
    }
  }
  function update(){
    p = particles[i];
    p.x += p.vx;
    p.y += p.vy;
    
    if(p.x > w){
      p.x = 0;
    }
    else if(p.x<0){
      p.x = w;
    }
    
    if(p.y > h){
      p.y = 0;
    }
    else if(p.y<0){
      p.y = h;
    }
    
  }
  function distance(p1,p2){
    
    var dist;
    var dx = p1.x - p2.x;
    var dy = p1.y - p2.y;
    
    dist = Math.sqrt(dx*dx + dy*dy);
    
    if (dist <= minDist){
      ctx.beginPath();
      ctx.strokeStyle = "rgba(255,255,255,"+ (0.2-dist/minDist) +")";
      p1.vx=0;
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.lineWidth=0.3;
      ctx.stroke();
      ctx.closePath();
    }
  }
  setInterval(function(){
    draw(); 
  },30);


  draw();
}
// var myVar = setInterval(createDots, 1000/30);
var canvas = document.querySelector('canvas'),
      ctx = canvas.getContext('2d'),
      colorDot = 'rgb(30,30,60)',
      color = 'rgb(0,0,20)';
  canvas.width = window.innerWidth/1.2;
  canvas.height = window.innerHeight/2;
  canvas.style.display = 'block';
  ctx.fillStyle = colorDot;
  ctx.lineWidth = .1;
  ctx.strokeStyle = color;

var canvasDots = function() {
  console.log(11)
  

  var mousePosition = {
    x: 30 * canvas.width / 100,
    y: 30 * canvas.height / 100
  };

  var dots = {
    nb: 350,
    distance: 50,
    d_radius: 90,
    array: []
  };

  function Dot(){
    this.x = Math.random() * window.innerWidth/1.2;
    this.y = Math.random() * window.innerHeight/2;

    this.vx = -.5 + Math.random();
    this.vy = -.5 + Math.random();

    this.radius = Math.random()*2;
  }

  Dot.prototype = {
    create: function(){
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      ctx.fill();
    },

    animate: function(){
      for(i = 0; i < dots.nb; i++){

        var dot = dots.array[i];

        if(dot.y < 0 || dot.y > window.innerHeight/2){
          dot.vx = dot.vx;
          dot.vy = - dot.vy;
        }
        else if(dot.x < 0 || dot.x > window.innerWidth/1.2){
          dot.vx = - dot.vx;
          dot.vy = dot.vy;
        }
        dot.x += dot.vx;
        dot.y += dot.vy;
      }
    },

    line: function(){
      for(i = 0; i < dots.nb; i++){
        for(j = 0; j < dots.nb; j++){
          i_dot = dots.array[i];
          j_dot = dots.array[j];

          if((i_dot.x - j_dot.x) < dots.distance && (i_dot.y - j_dot.y) < dots.distance && (i_dot.x - j_dot.x) > - dots.distance && (i_dot.y - j_dot.y) > - dots.distance){
            if((i_dot.x - mousePosition.x) < dots.d_radius && (i_dot.y - mousePosition.y) < dots.d_radius && (i_dot.x - mousePosition.x) > - dots.d_radius && (i_dot.y - mousePosition.y) > - dots.d_radius){
              ctx.beginPath();
              ctx.moveTo(i_dot.x, i_dot.y);
              ctx.lineTo(j_dot.x, j_dot.y);
              ctx.stroke();
              ctx.closePath();
            }
          }
        }
      }
    }
  };

  function createDots(){
    ctx.clearRect(0, 0, 10000, 10000);

    window.onresize = function(){
      for(i = 0; i < dots.nb; i++){
        dots.array[i] = new Dot();
      }

    }

    for(i = 0; i < dots.nb; i++){
      dots.array.push(new Dot());
      // console.log(canvas.height);
      dot = dots.array[i];

      dot.create();
    }



    dot.line();
    dot.animate();


    if(mousePosition.x > 0 * window.innerWidth/1.2 && mousePosition.x < 0.4 * window.innerWidth/1.2 && mousePosition.y > 0.05 * window.innerHeight/2 && mousePosition.y < 0.3 * window.innerHeight/2){
      ctx.font = "18px courier";
      ctx.fillText("Philosophy",mousePosition.x+20,mousePosition.y+30);
    }
    if(mousePosition.x > 0.35 * window.innerWidth/1.2 && mousePosition.x < 0.65 * window.innerWidth/1.2 && mousePosition.y > 0.4 * window.innerHeight/2 && mousePosition.y < 0.6 * window.innerHeight/2){
      ctx.font = "18px courier";
      ctx.fillText("Design",mousePosition.x+20,mousePosition.y+30);
    }
    if(mousePosition.x > 0.7 * window.innerWidth/1.2 && mousePosition.x < 1 * window.innerWidth/1.2 && mousePosition.y > 0.05 * window.innerHeight/2 && mousePosition.y < 0.3 * window.innerHeight/2){
      ctx.font = "18px courier";
      ctx.fillText("Psychology",mousePosition.x+20,mousePosition.y+30);
    }
    if(mousePosition.x > 0.05 * window.innerWidth/1.2 && mousePosition.x < 0.3 * window.innerWidth/1.2 && mousePosition.y > 0.4 * window.innerHeight/2 && mousePosition.y < 0.6 * window.innerHeight/2){
      ctx.font = "18px courier";
      ctx.fillText("Artificial Intelligence",mousePosition.x+20,mousePosition.y+30);
    }
    if(mousePosition.x > 0.7 * window.innerWidth/1.2 && mousePosition.x < 0.95 * window.innerWidth/1.2 && mousePosition.y > 0.4 * window.innerHeight/2 && mousePosition.y < 0.6 * window.innerHeight/2){
      ctx.font = "18px courier";
      ctx.fillText("Coding",mousePosition.x+20,mousePosition.y+30);
    }
    if(mousePosition.x > 0 * window.innerWidth/1.2 && mousePosition.x < 0.4 * window.innerWidth/1.2 && mousePosition.y > 0.7 * window.innerHeight/2 && mousePosition.y < 0.9 * window.innerHeight/2){
      ctx.font = "18px courier";
      ctx.fillText("Entrepreneurship & Ownership",mousePosition.x+20,mousePosition.y+30);
    }
    if(mousePosition.x > 0.7 * window.innerWidth/1.2 && mousePosition.x < 1 * window.innerWidth/1.2 && mousePosition.y > 0.7 * window.innerHeight/2 && mousePosition.y < 0.9 * window.innerHeight/2){
      ctx.font = "18px courier";
      ctx.fillText("Business",mousePosition.x+20,mousePosition.y+30);
    }
  }


  window.onmousemove = function(parameter) {
    mousePosition.x = parameter.pageX - 125;
    mousePosition.y = parameter.pageY - 120;
  }

  // createDots();

  // mousePosition.x = window.innerWidth / 2;
  // mousePosition.y = window.innerHeight / 2;

  setInterval(createDots, 1000/30);
  // function createTips(){
  //   if(mousePosition.x > 200){
  //     ctx.fillText("Hello World",mousePosition.x,mousePosition.y);
  //   }
  // }
};

window.onload = function() {
  canvasDots();
};

// window.onresize = function(){
//   if ((window.innerWidth - x1) * (window.innerWidth - x1) > 10000){
//     canvasDots();
//     x1 = window.innerWidth;
//   };
// };
  

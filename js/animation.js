// var myVar = setInterval(createDots, 1000/30);
var canvas = document.querySelector('canvas'),
      ctx = canvas.getContext('2d'),
      colorDot = 'rgb(230,230,230)',
      color = 'rgb(250,250,250)',
      colorListUnit = ['rgb(250,250,250)'],
      colorList=[],
      colorNum=90;
  for (var i = colorNum-1; i >= 0; i--) {
    colorList = colorList.concat(colorListUnit);
  }
  colorDots = colorList.concat(['rgb(50,50,50)']);
  canvas.width = window.innerWidth/1;
  canvas.height = window.innerHeight/1.6;
  canvas.style.display = 'block';
  ctx.fillStyle = colorDot;
  ctx.lineWidth = .2;
  ctx.strokeStyle = color;
  console.log(colorDots);

var canvasDots = function() {
  
  var mousePosition = {
    x: 30 * canvas.width / 100,
    y: 30 * canvas.height / 100
  };

  var dots = {
    nb: 350,
    distance: 80,
    d_radius: 120,
    array: []
  };

  function Dot(){
    this.x = Math.random() * window.innerWidth/1;
    this.y = Math.random() * window.innerHeight/1.6;

    this.vx = -.5 + Math.random();
    this.vy = -.5 + Math.random();

    this.radius = Math.random()*2;
  }

  Dot.prototype = {
    create: function(){
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      ctx.fillStyle = colorDots[Math.floor(Math.random() * (colorNum+1))];
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
            if((i_dot.x - mousePosition.x) < dots.d_radius/3 && (i_dot.y - mousePosition.y) < dots.d_radius/3 && (i_dot.x - mousePosition.x) > - dots.d_radius/3 && (i_dot.y - mousePosition.y) > - dots.d_radius/3){
              ctx.beginPath();
              ctx.strokeStyle = color;
              ctx.moveTo(i_dot.x, i_dot.y);
              ctx.lineTo(j_dot.x, j_dot.y);
              ctx.stroke(); 
              ctx.closePath();
            } else if ((i_dot.x - mousePosition.x) < dots.d_radius/2 && (i_dot.y - mousePosition.y) < dots.d_radius/2 && (i_dot.x - mousePosition.x) > - dots.d_radius/2 && (i_dot.y - mousePosition.y) > - dots.d_radius/2) {
              ctx.beginPath();
              ctx.strokeStyle = 'rgb(120,120,120)';
              ctx.moveTo(i_dot.x, i_dot.y);
              ctx.lineTo(j_dot.x, j_dot.y);
              ctx.stroke();
              ctx.closePath();
            } else if ((i_dot.x - mousePosition.x) < dots.d_radius && (i_dot.y - mousePosition.y) < dots.d_radius && (i_dot.x - mousePosition.x) > - dots.d_radius && (i_dot.y - mousePosition.y) > - dots.d_radius) {
              ctx.beginPath();
              ctx.strokeStyle = 'rgb(50,50,50)';
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

    //left, top
    if(mousePosition.x > 0 * canvas.width && mousePosition.x < 0.4 * canvas.width && mousePosition.y > 0.05 * canvas.height && mousePosition.y < 0.3 * canvas.height){
      ctx.font = "600 16px Kite One";
      ctx.fillStyle = "#FFFFFF";
      ctx.fillText("Philosophy",mousePosition.x+20,mousePosition.y+30);
    }
    //middle, middle
    if(mousePosition.x > 0.35 * canvas.width && mousePosition.x < 0.65 * canvas.width && mousePosition.y > 0.4 * canvas.height && mousePosition.y < 0.6 * canvas.height){
      ctx.font = "600 16px Kite One";
      ctx.fillStyle = "#FFFFFF";
      ctx.fillText("Design",mousePosition.x+20,mousePosition.y+30);
    }
    //right, top
    if(mousePosition.x > 0.7 * canvas.width && mousePosition.x < 1 * canvas.width && mousePosition.y > 0.05 * canvas.height && mousePosition.y < 0.3 * canvas.height){
      ctx.font = "600 16px Kite One";
      ctx.fillStyle = '#FFFFFF';
      ctx.fillText("Psychology",mousePosition.x+20,mousePosition.y+30);
    }
    //left, middle
    if(mousePosition.x > 0.05 * canvas.width && mousePosition.x < 0.3 * canvas.width && mousePosition.y > 0.4 * canvas.height && mousePosition.y < 0.6 * canvas.height){
      ctx.font = "600 16px Kite One";
      ctx.fillStyle = '#FFFFFF';
      ctx.fillText("Economics",mousePosition.x+20,mousePosition.y+30);
    }
    //right, middle
    if(mousePosition.x > 0.7 * canvas.width && mousePosition.x < 0.95 * canvas.width && mousePosition.y > 0.4 * canvas.height && mousePosition.y < 0.6 * canvas.height){
      ctx.font = "600 16px Kite One";
      ctx.fillStyle = '#FFFFFF';
      ctx.fillText("Coding",mousePosition.x+20,mousePosition.y+30);
    }
    //left, bottom
    if(mousePosition.x > 0 * canvas.width && mousePosition.x < 0.4 * canvas.width && mousePosition.y > 0.7 * canvas.height && mousePosition.y < 0.9 * canvas.height){
      ctx.font = "600 16px Kite One";
      ctx.fillStyle = '#FFFFFF';
      ctx.fillText("Entrepreneurship & Ownership",mousePosition.x+20,mousePosition.y+30);
    }
    //right, bottom
    if(mousePosition.x > 0.7 * canvas.width && mousePosition.x < 1 * canvas.width && mousePosition.y > 0.7 * canvas.height && mousePosition.y < 0.9 * canvas.height){
      ctx.font = "600 16px Kite One";
      ctx.fillStyle = '#FFFFFF' ;
      ctx.fillText("History",mousePosition.x+20,mousePosition.y+30);
    }
  }


  window.onmousemove = function(parameter) {
    mousePosition.x = parameter.pageX - 15;
    mousePosition.y = parameter.pageY - 100;
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
  

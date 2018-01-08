var pixelRatio = window.devicePixelRatio
var wWidth
var wHeight
var wArea

var nodes = new Array(Math.sqrt(wArea) /3 | 0)

var canvas = document.createElement('canvas')
var ctx = canvas.getContext('2d')

var $container = document.getElementById('animation')

// if (pixelRatio !== 1) {
//   // if retina screen, scale canvas
//   canvas.style.transform = 'scale(' + 1 / pixelRatio + ')'
//   // canvas.style.transformOrigin = '0 0'
// }
canvas.id = 'nodegarden'

$container.appendChild(canvas)

init()
render()

window.addEventListener('resize', init)

function init() {
  wWidth = window.innerWidth/2.8 * pixelRatio
  wHeight = window.innerHeight/3.4 * pixelRatio
  wArea = wWidth * wHeight

  // calculate nodes needed
  nodes.length = Math.sqrt(wArea) /3 | 0

  // set canvas size
  canvas.width = wWidth
  canvas.height = wHeight

  // create nodes
  var i, len
  for (i = 0, len = nodes.length; i < len; i++) {
    if (nodes[i]) {
      continue
    }
    nodes[i] = {
      x: Math.random() * wWidth,
      y: Math.random() * wHeight,
      vx: Math.random() * 1 - 0.5,
      vy: Math.random() * 1 - 0.5,
      m: Math.random() * 3 + 1,
      link: null,
      pos: false
    }
  }
}

function render() {
  var distance
  var direction
  var force
  var xForce, yForce
  var xDistance, yDistance
  var i, j, nodeA, nodeB, len

  // request new animationFrame
  requestAnimationFrame(render)

  // clear canvas
  ctx.clearRect(0, 0, wWidth, wHeight)

  // update links
  for (i = 0, len = nodes.length - 1; i < len; i++) {
    for (j = i + 1; j < len + 1; j++) {
      nodeA = nodes[i]
      nodeB = nodes[j]
      xDistance = nodeB.x - nodeA.x
      yDistance = nodeB.y - nodeA.y

      // calculate distance
      distance = Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2))

      if (distance < nodeA.m / 2 + nodeB.m / 2) {
        // collision: remove smaller or equal
        if (nodeA.m <= nodeB.m) {
          nodeA.x = Math.random() * wWidth
          nodeA.y = Math.random() * wHeight
          nodeA.vx = Math.random() * 1 - 0.5
          nodeA.vy = Math.random() * 1 - 0.5
          nodeA.m = Math.random() * 3 + 1

        }

        if (nodeB.m <= nodeA.m) {
          nodeB.x = Math.random() * wWidth
          nodeB.y = Math.random() * wHeight
          nodeB.vx = Math.random() * 1 - 0.5
          nodeB.vy = Math.random() * 1 - 0.5
          nodeB.m = Math.random() * 3 + 1

        }
        continue
      }

      if (distance > 200) {
        // distance over 200 pixels - ignore gravity
        continue
      }

      // calculate gravity direction
      direction = {
        x: xDistance / distance,
        y: yDistance / distance
      }

      // calculate gravity force
      force = 0.03* (10 * nodeA.m * nodeB.m) / Math.pow(distance, 2)

      if (force > 0.001) {
        // cap force to a maximum value of 0.025
        force = 0.001
      }

      // draw gravity lines
      ctx.beginPath()
      ctx.strokeStyle = 'rgba(120,120,150,' + (Math.pow(force,1.9) *500000) + ')'
      ctx.moveTo(nodeA.x, nodeA.y)
      ctx.lineTo(nodeB.x, nodeB.y)
      ctx.stroke()

      xForce = force * direction.x*0.7
      yForce = force * direction.y*0.7

      // calculate new velocity after gravity
      if (nodeA.pos !== nodeB.pos) {
        nodeA.vx -= xForce
        nodeA.vy -= yForce

        nodeB.vx += xForce
        nodeB.vy += yForce
      } else {
        nodeA.vx += xForce
        nodeA.vy += yForce

        nodeB.vx -= xForce
        nodeB.vy -= yForce
      }
    }
  }
  // update nodes
  for (i = 0, len = nodes.length; i < len; i++) {
    ctx.beginPath()
    ctx.arc(nodes[i].x, nodes[i].y, nodes[i].m, 0, 2 * Math.PI)
    ctx.fillStyle = 'rgba(60,60,90,' + ((nodes[i].m-1)/3-0.2) + ')'
    ctx.fill()

    nodes[i].x += nodes[i].vx
    nodes[i].y += nodes[i].vy

    if (nodes[i].x > wWidth + 10  || nodes[i].x < -10 || nodes[i].y > wHeight + 10 || nodes[i].y <-10) {
      // if node over screen limits - reset to a init position
      nodes[i].x = Math.random() * wWidth
      nodes[i].y = Math.random() * wHeight
      nodes[i].vx = Math.random() * 1 - 0.5
      nodes[i].vy = Math.random() * 1 - 0.5
      nodes[i].m = Math.random() * 1 + 1
    }

  }
}

const color = "white";
const sparkles = 50;
let [x, y, prevX, prevY] = [400, 300, 400, 300];
let [width, height, scrollLeft, scrollTop] = [800, 600, 0, 0];
const tiny = [], stars = [], starVelocities = [], starX = [], starY = [], tinyX = [], tinyY = [], tinyVelocities = [];

window.onload = () => {
  if (document.getElementById) {
    initSparkles();
    updateDimensions();
    animateSparkles();
  }
};

function initSparkles() {
  for (let i = 0; i < sparkles; i++) {
    const tinySparkle = createDiv(3, 3, "sparkle");
    const starSparkle = createDiv(5, 5, "sparkle");
    
    tinySparkle.style.visibility = "hidden";
    document.body.appendChild(tiny[i] = tinySparkle);
    tinyVelocities[i] = 0;
    
    starSparkle.style.backgroundColor = "transparent";
    starSparkle.style.visibility = "hidden";
    
    const left = createDiv(1, 5);
    const down = createDiv(5, 1);
    starSparkle.appendChild(left);
    starSparkle.appendChild(down);
    left.style.top = "2px";
    down.style.left = "2px";
    
    document.body.appendChild(stars[i] = starSparkle);
    starVelocities[i] = 0;
  }
}

function animateSparkles() {
  if (Math.abs(x - prevX) > 1 || Math.abs(y - prevY) > 1) {
    [prevX, prevY] = [x, y];
    for (let i = 0; i < sparkles; i++) {
      if (!starVelocities[i]) {
        stars[i].style.left = (starX[i] = x) + "px";
        stars[i].style.top = (starY[i] = y + 1) + "px";
        stars[i].style.clip = "rect(0, 5px, 5px, 0)";
        stars[i].childNodes.forEach(node => node.style.backgroundColor = color === "random" ? getRandomColor() : color);
        stars[i].style.visibility = "visible";
        starVelocities[i] = 50;
        break;
      }
    }
  }

  for (let i = 0; i < sparkles; i++) {
    if (starVelocities[i]) updateStar(i);
    if (tinyVelocities[i]) updateTiny(i);
  }
  
  setTimeout(animateSparkles, 40);
}

function tangatangaka() {
  var x = document.getElementById("enter");
  x.style.display = "none";
}

function updateStar(i) {
  if (--starVelocities[i] === 25) stars[i].style.clip = "rect(1px, 4px, 4px, 1px)";
  if (starVelocities[i]) {
    starY[i] += 1 + Math.random() * 3;
    starX[i] += (i % 5 - 2) / 5;
    if (starY[i] < height + scrollTop) {
      stars[i].style.top = starY[i] + "px";
      stars[i].style.left = starX[i] + "px";
    } else {
      stars[i].style.visibility = "hidden";
      starVelocities[i] = 0;
    }
  } else {
    tinyVelocities[i] = 50;
    tiny[i].style.top = (tinyY[i] = starY[i]) + "px";
    tiny[i].style.left = (tinyX[i] = starX[i]) + "px";
    tiny[i].style.width = "2px";
    tiny[i].style.height = "2px";
    tiny[i].style.backgroundColor = stars[i].childNodes[0].style.backgroundColor;
    stars[i].style.visibility = "hidden";
    tiny[i].style.visibility = "visible";
  }
}

function updateTiny(i) {
  if (--tinyVelocities[i] === 25) {
    tiny[i].style.width = "1px";
    tiny[i].style.height = "1px";
  }
  if (tinyVelocities[i]) {
    tinyY[i] += 1 + Math.random() * 3;
    tinyX[i] += (i % 5 - 2) / 5;
    if (tinyY[i] < height + scrollTop) {
      tiny[i].style.top = tinyY[i] + "px";
      tiny[i].style.left = tinyX[i] + "px";
    } else {
      tiny[i].style.visibility = "hidden";
      tinyVelocities[i] = 0;
    }
  } else {
    tiny[i].style.visibility = "hidden";
  }
}

function updateScroll() {
  const body = document.body;
  const docElem = document.documentElement;
  scrollTop = window.pageYOffset || body.scrollTop || docElem.scrollTop || 0;
  scrollLeft = window.pageXOffset || body.scrollLeft || docElem.scrollLeft || 0;
}

function updateDimensions() {
  width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 800;
  height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 600;
}

function createDiv(height, width, className = "") {
  const div = document.createElement("div");
  Object.assign(div.style, { position: "absolute", height: `${height}px`, width: `${width}px`, overflow: "hidden" });
  if (className) div.className = className;
  return div;
}

function getRandomColor() {
  const c = [255, Math.random() * 256 | 0, Math.random() * (256 - c[1] / 2) | 0];
  c.sort(() => Math.random() - 0.5);
  return `rgb(${c.join(", ")})`;
}

document.onmousemove = e => {
  x = e.pageX;
  y = e.pageY;
};

window.onscroll = updateScroll;
window.onresize = updateDimensions;

document.addEventListener("DOMContentLoaded", function () {
    VanillaTilt.init(document.getElementById("cedzu"), {
      max: 5, speed: 200, glare: true, "max-glare": 0.5, "glare-prerender": false,
      "max-rotation": 20,
      "perspective": 1000,
      "scale": 1.1,
    });
  });

  var TxtType = function (el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = "";
    this.tick();
    this.isDeleting = false;
  };
  TxtType.prototype.tick = function () {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];
    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }
    this.el.innerHTML = '<span class = "wrap" >' + this.txt + "</span>";
    var that = this;
    var delta = 200 - Math.random() * 100;
    if (this.isDeleting) {
      delta /= 2;
    }
    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === "") {
      this.isDeleting = false;
      this.loopNum++;
      delta = 500;
    }
    setTimeout(function () {
      that.tick();
    }, delta);
  };
  window.onload = function () {
    var elements = document.getElementsByClassName("typewrite");
    for (var i = 0; i < elements.length; i++) {
      var toRotate = elements[i].getAttribute("data-type");
      var period = elements[i].getAttribute("data-period");
      if (toRotate) {
        new TxtType(elements[i], JSON.parse(toRotate), period);
      }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
    document.body.appendChild(css);
  };

  

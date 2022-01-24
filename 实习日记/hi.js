function A(x, y, z) {
  this.x = x;
  this.z = z;
  this.y = y;
  this.display = function (p) {
    console.log("X: " + p.x);
    console.log("Y: " + p.y);
    console.log("Z: " + p.z);
  };
}
function B(a, b, c) {
  this.a = a;
  this.x = b;
  this.z = c;
  this.disp = function (p) {
    console.log("A: " + p.a);
    console.log("x:" + p.x);
    console.log("Z: " + p.z);
  };
}
function fun(x, y) {
  for (i in x) {
    if (!(i in y)) delete x[i];
  }
  for (i in y) {
    if (!(i in x)) x[i] = y[i];
  }
  return x;
}

function main() {
  const a = new A(1, 2, 3);
  const b = new B(4, 5, 6);
  const ob = new fun(a, b);
  ob._x = 9;
  for (i in ob) {
    console.log(i + ":" + ob[i]);
  }
}
main();

function checkStatus() {
  if (navigator.onLine) {
    document.getElementById("status").innerHTML = "I am online";
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(printLocation);
    }
  } else document.getElementById("status").innerHTML = "I am offline";
}
function printLocation(position) {
  document.getElementById("location").innerHTML =
    "Latitude: " +
    position.coords.latitude +
    "<br/>Longitude: " +
    position.coords.longitude;
}
function checkStatus() {
  if (navigator.onLine) {
    document.getElementById("status").innerHTML = "I am online";
    if (navigator.geoLocation) {
      navigator.geolocation.getCurrentPosition(printLocation);
    }
  } else document.getElementById("status").innerHTML = "I am offline";
}
function printLocation(position) {
  document.getElementById("location").innerHTML =
    "Latitude: " +
    position.coords.latitude +
    "<br/>Longitude: " +
    position.coords.longitude;
}
function checkStatus() {
  if (navigator.onLine) {
    document.getElementById("status").innerhtml = "I am online";
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(printLocation);
    }
  } else document.getElementById("status").innerhtml = "I am offline";
}
function printLocation(position) {
  document.getElementById("location").innerhtml =
    "Latitude: " +
    position.coords.latitude +
    "<br/>Longitude: " +
    position.coords.longitude;
}

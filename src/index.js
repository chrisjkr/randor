/* global Clipboard */

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://ssl.google-analytics.com/ga.js','ga');

ga('create', 'UA-88337677-2', 'auto');
ga('send', 'pageview');

var hexEl = document.getElementById('hex')
var rgbEl = document.getElementById('rgb')
var bodyEl = document.body
var flashEl = document.getElementById('flash')
var anotherEl = document.getElementById('another')
var hex
var rgb

hexEl.addEventListener('click', clip)
rgbEl.addEventListener('click', clip)
anotherEl.addEventListener('click', function () {
  updateColour()
  ga('send', 'event', {
    eventCategory: 'Button',
    eventAction: 'click',
    eventLabel: 'Generate colour'
  })
})

updateColour()

function updateColour (thisOne) {
  hex = thisOne ? thisOne : generateColour()
  rgb = hexToRgb(hex)
  var luma = getLuma(rgb)

  hexEl.innerHTML = hex
  rgbEl.innerHTML = rgb.rgb

  bodyEl.style.backgroundColor = hex
  luma < 120 ? bodyEl.style.color = 'white' : bodyEl.style.color = 'black'
}

function generateColour () {
  return '#' + Math.random().toString(16).slice(2, 8)
}

function hexToRgb(hex) {
  hex = hex.substring(1)
  var dec = parseInt(hex, 16)
  var rgb = {
    r: (dec >> 16) & 0xff,
    g: (dec >> 8) & 0xff,
    b: (dec >> 0) & 0xff
  }
  rgb.rgb = 'rgb(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ')'
  return rgb
}

function getLuma(rgb) {
  return 0.2126 * rgb.r + 0.7152 * rgb.g + 0.0722 * rgb.b
}

function clip () {
  var c = new Clipboard('#' + this.id)
  c.on('success', function (e) {
    e.clearSelection()
    flashMessage('Copied!')
  })
}

function flashMessage (msg) {
  flashEl.innerHTML = '<div class="text">' + msg + '</div>'
  flashEl.style.backgroundColor = hex
  flashEl.style.display = 'block'

  setTimeout(function () {
    flashEl.style.display = 'none'
  }, 800)
}
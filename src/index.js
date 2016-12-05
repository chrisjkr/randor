/* global Clipboard */

var hexEl = document.getElementById('hex')
var rgbEl = document.getElementById('rgb')
var bodyEl = document.body

hexEl.addEventListener('click', clip)
rgbEl.addEventListener('click', clip)

handler()

function handler () {
  var hex = generateColour()
  var rgb = hexToRgb(hex)
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
  new Clipboard('#' + this.id)
}
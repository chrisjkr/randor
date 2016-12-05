handler()

function handler () {
  var hex = generateColour()
  var rgb = hexToRgb(hex)
  var luma = getLuma(rgb)

  document.getElementById('hex').innerHTML = hex
  document.getElementById('rgb').innerHTML = rgb.rgb
  document.getElementById('luma').innerHTML = luma

  document.body.style.backgroundColor = hex
  luma < 120 ? document.body.style.color = 'white' : document.body.style.color = 'black'
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
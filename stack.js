
//fit a series of elements into another, with consistent sizing.

var h = require('hyperscript')
function px(n) { return n+'px' }

//do what flexbox should do!

function each(set, iter) {
  for(var i = 0; i < set.length; i++)
    iter(set[i], i, set)
}

function int (i) { return parseInt(i) }

var T
function tester () {
  if(T) return T
  T = h('div', {style: {display: 'hidden', position: 'absolute'}})
  document.body.appendChild(T)
  return T
}

function getHeight (el) {
  var style = getComputedStyle(el)
  //this will only work if tree has already been added to the DOM.
  return int(style.height) + int(style.marginTop) + int(style.marginBottom)
}

module.exports = function (opts) {

  var div = h('div', opts)

  function resize (h) {
    var height = h ? int(div.style.heigh = px(h)) : getHeight(div)
    var fitted = 0
    var used = 0
    each(div.children, function (el) {
      if(!el.fitted)
        used += getHeight(el)
      else
        fitted ++
    }, 0)

    var fit = (height - used) / fitted
    console.log(height, used, fitted, fit)
    each(div.children, function (el) {
      if(el.fitted)
        el.style.height = px(fit)
    })

    return div
  }

  //fixed/natural size
  div.addFixed = function (el) {
    div.appendChild(el)
    return div
  }

  //expand/shrink to fit.
  div.addFitted = function (el) {
    el.fitted = true
    div.appendChild(el)
    return div
  }

  div.resize = resize

  return div

}












var h = require('hyperscript')
//a container that is always the full height of the screen
// and never allows a vertical scrollbar. (may be set to any width though)
function px(n) { return n+'px' }

function SMY () {
  //chrome: detect the top scroll
  if('undefined' === typeof window.scrollMaxY) {
    scrollTo(scrollX, 1000)
    var r = scrollY
    scrollTo(scrollX, 0)
    return r
  }
  //firefox: scrollMaxY
  else
    return window.scrollMaxY
}

function each(set, iter) {
  for(var i = 0; i < set.length; i++)
    iter(set[i], i, set)
}

module.exports = function () {
  var dock = h('div'),  _height

  dock.style.height = px(innerHeight)
  if(SMY()) resize()
  function resize () {
    //the SMY seems to be sized by previous frame.
    //this causes a problem when we are zooming in.
    var smy = _height <= innerHeight ? Math.max(SMY() || 0, 0) : 0
    var height = innerHeight - smy
    dock.style.height = px(height)
    _height = height

    //if this resize caused a scrollbar to appear, fix it.
    //this will only happen the first time (so there is no recursion)
    if(SMY() != 0) resize()
    else
      each(dock.children, function (el) {
        console.log('resize', el.resize)
        el.resize && el.resize(height)
      })

  }

  window.onresize = resize
  window.onscroll = function () {
    if(SMY()) resize()
  }

  return dock
}





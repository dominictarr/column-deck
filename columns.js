function px(n) { return n+'px' }
var container = require('./container')


module.exports = function columns (opts) {
  opts = opts || {}

  var width = opts.width || 400
  var margin = opts.margin || 20

  var div = container()
  div.style.display = 'flex'
  div.style.flexFlow = 'row nowrap'
  div.style.alignItems = 'stretch'

  div.add = function (el) {
    div.style.width = px((1+div.children.length)*width)
    el.style.width = px(width - margin)
    el.style.marginLeft = px(margin)
    el.style.marginTop = px(0)
    el.style.overflowY = 'hidden'

    div.appendChild(el)

    //scrollIntoView after a short delay to allow
    //time to resize if vertical scrollbar was added.
   setTimeout(function () {
      el.scrollIntoView()
    }, 10)
  }

  return div
}


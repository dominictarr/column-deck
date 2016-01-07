
var h = require('hyperscript')

function px(n) { return n+'px' }

function hsl (h,s,l) {
  return 'hsl(' + (h|0) + ', ' + (s || 100) + '%, ' + (l||50) + '%)'
}


function columns (width) {
  var div = h('div', {
    style: {
      margin: px(0),
      padding: px(0),
      overflowX: 'scroll',
      overflowY: 'hidden',
      border: px(1)
    }
  })

  div.style.height = px(innerHeight)

  div.add = function (el) {
    div.style.width = px((1+div.children.length)*width)
    el.style.width = px(width - 20)
    el.style.marginLeft = px(20)
    el.style.marginTop = px(0)
    el.style.height = px(innerHeight - 5)
    el.style.display = 'inline-block'
//    el.style.overflow = 'auto'
    el.resize = function (e) {
      el.style.height = div.style.height
    }
    div.appendChild(el)
    el.scrollIntoView()
    ADDED = el
  }

  return div
}

function each(set, iter) {
  for(var i = 0; i < set.length; i++)
    iter(set[i], i, set)
}

var dock = columns(400)
dock.style.height = px(innerHeight)
window.onresize = function () {
  console.log('resize', innerHeight)
  dock.style.height = px(innerHeight)
  each(dock.children, function (el) {
    el.resize()
  })
}

document.body.style.margin = px(0)
document.body.style.padding = px(0)

var c = 0
document.body.appendChild(
  h('h1', {style: {margin: px(0) }},
    h('a', '+', {href: '#', onclick: function () {
      dock.add(
        h('div', {style: {
            background: hsl(Math.random()*360)},
          },
          //okay! if we want a fixed size header (we do)
          //then we can't use a percent size (the scroller will overflow)
          //so we'd need an onresize listener.
          //simple solution is to have a spacer that packs down
          //the scrolled elements (!like a spacer gif, classic!)
          //
          h('h1', c++, {style:{height: px(100), width: px(400-20), margin: px(0), background: 'gray'}}),

          h('div', {
            style: { overflow: 'auto', height: px(652), padding: px(0), margin: px(0)}
          },
            (function () { 
              var a = []
              for(var i = 0; i < 100; i++)
                a.push(h('h1', 'hello!'))
              return a
            })()
          )
        )
      )
    }, style: {position: 'fixed', right: px(20), top: px(20)}})
  )
)

document.body.appendChild(dock)





var h = require('hyperscript')
var Stack = require('./stack')
var Columns = require('./columns')

function px(n) { return n+'px' }

function hsl (h,s,l) {
  return 'hsl(' + (h|0) + ', ' + (s || 100) + '%, ' + (l||50) + '%)'
}

function each(set, iter) {
  for(var i = 0; i < set.length; i++)
    iter(set[i], i, set)
}

var dock = Columns({width: 400, margin: 20})

document.body.style.margin = px(0)
document.body.style.padding = px(0)

var c = 0
document.body.appendChild(
  h('h1', {style: {margin: px(0) }},
    h('a', '+', {href: '#', onclick: function () {
      var el
      dock.add(
        el = Stack({style: {
          background: hsl(Math.random()*360)}
        })
        .addFixed(
          h('h1', c++, {style:{
              height: px(100), margin: px(0), background: 'gray'
            }},
            h('a', 'Close', {href:'#', onclick: function () {
              dock.removeChild(el)
            }})
          )
        )
        .addFitted(
          h('div', {
            style: {
              overflow: 'auto',
              padding: px(0), margin: px(0)
            }
          },
            (function () {
              var a = []
              for(var i = 0; i < 100; i++)
                a.push(h('h1', 'hello! ', i))
              return a
            })()
          )
        )
      )
    }, style: {position: 'fixed', right: px(20), top: px(20)}})
  )
)

document.body.appendChild(dock)




















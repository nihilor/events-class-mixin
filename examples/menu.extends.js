const EventsClassMixin = require('../index.class.js')
class Menu extends EventsClassMixin {}
let   menu = new Menu()

//  create a subscription for 'click'
let clickId = menu.subscribe('click', event => console.log(`Item clicked: ${event}`))
//  publish an event 'click'
menu.publish('click', 'main')

//  create a subscription for 'input'
let inputId = menu.on('input', (event, data) => console.log(`The value for ${data} is '${event}'`), 'email')
//  publish an event 'input'
menu.emit('input', 'john@apple.seed')

//  unsubscribe from 'click' and publish an event 'click'
menu.unsubscribe(clickId, 'click')
menu.publish('click', 'no subscriber available')

//  unsubscribe from 'input' and publish an event 'input'
menu.off(inputId, 'input')
menu.emit('input', 'no subscriber available')
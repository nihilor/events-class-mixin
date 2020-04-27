const EventsClassMixin = require('../index.class.js')
class Eventer extends EventsClassMixin {}
let   ev = new Eventer()

console.log('--  RUN 1')
ev.subscribe('forminput', (event, data) => console.log({ event, data }))
ev.publish('forminput', 'Test 1')
ev.publish('forminput', { prename: 'John', surname: 'Apple' })

console.log('--  RUN 2')
ev.subscribe('formvalidate', (event, data) => console.log({ event, data }), 'ADDITIONAL')
ev.publish('formvalidate', 'Test 2')
ev.publish('formvalidate', { prename: 'John', surname: 'Snow' })

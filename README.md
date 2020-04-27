# events-class-mixin

A mixin for a simple, reusable Events implementation in Javascript.

## What?

Events follow the publish and subscribe pattern. Sender called publisher emit their messages, receiver called subscriber receive these messages. The benefit: Publisher and subscriber of events do not need to know each other.

## How?

Publisher and subscriber communicate via an intermediary, the event. The event has a unique name. The receiver just subscribes for a named event and provides a callback. The sender emits a named event and optionally provides additional information. In this case, the `events-class-mixin` works as the intermediary, notifing all subscribers as soon as an event occurs.

Extending a class from `EventsClassMixin`:

```javascript
const EventsClassMixin = require('events-class-mixin/index.class')
class AClass extends EventsClassMixin {}
let   anObject = new AClass()
```

Compose a class by assigning the object properties:

```javascript
const eventsMixin = require('events-class-mixin/index.object')
class AClass {}
Object.assign(AClass.prototype, eventsMixin)
let   anObject = new AClass()
```

Compose an object by assigning the object properties:

```javascript
const eventsMixin = require('events-class-mixin/index.object')
let   anObject = {}
Object.assign(anObject, eventsMixin)
```

Please note the difference between assigning the events mixin to a class or to an object. For classes you have to add the properties to `prototype`.

```javascript
class AClass {}
Object.assign(AClass.prototype, eventsMixin)

let   anObject = {}
Object.assign(anObject, eventsMixin)
```

## Install

The mixin is available, installable and manageable via NPM.

```shell
npm install events-class-mixin --save
```

## API

### Create a subscription

To create a subscription, call `subscribe` or its shortform `on`, specifiy the events name and provide a callback:

```javascript
subscribe (eventName, subscriptionCallback, [...subscriptionParams]): subscriptionId
on        (eventName, subscriptionCallback, [...subscriptionParams]): subscriptionId
```

`subscribe()` returns the subscription id to explicitly identify the subscription. This id is a Javascript Symbol and must be stored in a variable.

*Optional:* You may provide additional parameters for the subscription that will be passed through the callback of the subscription.

```javascript
ev.subscribe('input', event => console.log(`the event sent '${event}'`))
ev.subscribe('input', (event, data) => console.log(`the event sent '${event}' and '${data}'`), 'Data')
```

### Publish an event

To publish an event, call `publish` or its shortform `emit`. Provide the events name as the first argument and additional data as the second argument.

```javascript
publish (eventName, eventData)
emit    (eventName, eventData)
```

`publish()` has no return value, because it's a fire-and-forget mechanism.

```javascript
ev.publish('input', 'Hello world!')
)
// output of first subscription: the event sent 'Hello world!'
// output of seconds subscription: the event sent 'Hello world!' and 'Data'
```

### Delete a subscription

It's also possible to remove a previously created subscription. Call `unsubscribe` or its shortform `off`, provide the subscription id returned by `subscribe` or `on` and also provide the events name. The events name wouldn't be necessary, but serves as an additional locking mechanism to prevent accidental deletion. 

```javascript
unsubscribe (subscriptionId, eventName)
off         (subscriptionId, eventName)
```

Neither `unsubscribe()` nor `off()` return a value.

```javascript
ev.unsubscribe(subscriptionId, 'input')
ev.off(subscriptionId, 'input')
```

## Example

In `./examples/menu.js` you will find a very simple example mimicking a menu. The example is not representative, but explains the functionality of Events and the pub-sub-pattern very clearly. First of all the script creates a subscription to `click`, providing a callback that simply logs the received value. In the second step it creates an subscription to `input`, provides an additional parameter with the value `email` and logs the received values to the console. Last but not least, the both subscriptions will be revoked, so the finally emitted events won't trigger any output.

```javascript
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
```

## LICENSE

MIT License

Copyright (c) 2020 Mark Lubkowitz

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

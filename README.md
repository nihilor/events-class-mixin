# events-class-mixin

A mixin for a simple, reusable Events implementation in Javascript.

## What?

...

## How?

...

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

To publish an event, call `publish`. Provide the events name as the first argument and additional data as the second argument.

```javascript
publish (eventName, eventData)
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

...

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

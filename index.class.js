let errorMessages = {
    1:  `.subscribe() expects at least two arguments, the event name and the subscription callback.`,
    2:  '.subscribe() expects a string for the event name.',
    3:  '.subscribe() expects a function for the subscription callback.',
    10: '.unsubscribe() expects exactly two arguments, the subscription id and the event name.',
    11: '.unsubscribe() expects a Symbol for the subscription id.',
    12: '.unsubscribe() expects a string for the event name.',
    20: '.publish() expects at least one argument, the event name.',
    21: '.publish() expects a string for the event name.'
}

class EventsClassMixin {
    _subscriptions = {}

    on () {
        this.subscribe.apply(this, arguments)
    }

    subscribe (eventName, subscriptionCallback, ...subscriptionParams) {
        //  check
        if (arguments.length < 2)
            throw new Error(errorMessages[1])
        if (typeof arguments[0] !== 'string')
            throw new TypeError(errorMessages[2])
        if (typeof arguments[1] !== 'function')
            throw new TypeError(errorMessages[3])

        //  register event
        if (eventName in this._subscriptions === false)
            this._subscriptions[eventName] = []

        //  add subscription
        let subscriptionId = Symbol(`Subscription for the event '${eventName}'`)
        this._subscriptions[eventName].push({
            id: subscriptionId,
            fn: subscriptionCallback,
            pr: subscriptionParams
        })

        return subscriptionId
    }

    off () {
        this.unsubscribe.apply(this, arguments)
    }

    unsubscribe (subscriptionId, eventName) {
        //  check
        if (arguments.length !== 2)
            throw new Error(errorMessages[10])
        if (typeof arguments[0] !== 'symbol')
            throw new TypeError(errorMessages[11])
        if (typeof arguments[1] !== 'string')
            throw new TypeError(errorMessages[12])
        
        //  remove subscription
        if (eventName in this._subscriptions)
            this._subscriptions[eventName] = this._subscriptions[eventName].filter(subscription => subscription.id !== subscriptionId)
    }

    publish (eventName, ...eventParams) {
        //  check
        if (arguments.length < 1)
            throw new Error(errorMessages[20])
        if (typeof arguments[0] !== 'string')
            throw new TypeError(errorMessages[21])

        //  pick up latches
        if (eventName in this._subscriptions) {
            this._subscriptions[eventName].forEach(subscription => {
                subscription.fn.apply(this, [].concat(eventParams, subscription.pr))
            })
        }
    }
}

module.exports = EventsClassMixin
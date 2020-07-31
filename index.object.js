let eventsMixin = {
    _subscriptions: {},

    on: function () {
        return this.subscribe.apply(this, arguments)
    },

    subscribe: function (eventName, subscriptionCallback, ...subscriptionParams) {
        //  check
        if (arguments.length < 2)
            throw new Error(`.subscribe() expects at least two arguments, the event name and the subscription callback.`)
        if (typeof arguments[0] !== 'string')
            throw new TypeError('.subscribe() expects a string for the event name.')
        if (typeof arguments[1] !== 'function')
            throw new TypeError('.subscribe() expects a function for the subscription callback.')

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
    },

    off: function () {
        this.unsubscribe.apply(this, arguments)
    },

    unsubscribe: function (subscriptionId, eventName) {
        //  check
        if (arguments.length !== 2)
            throw new Error('.unsubscribe() expects exactly two arguments, the subscription id and the event name.')
        if (typeof arguments[0] !== 'symbol')
            throw new TypeError('.unsubscribe() expects a Symbol for the subscription id.')
        if (typeof arguments[1] !== 'string')
            throw new TypeError('.unsubscribe() expects a string for the event name.')
        
        //  remove subscription
        if (eventName in this._subscriptions)
            this._subscriptions[eventName] = this._subscriptions[eventName].filter(subscription => subscription.id !== subscriptionId)
    },

    emit: function () {
        this.publish.apply(this, arguments)
    },

    publish: function (eventName, ...eventParams) {
        //  check
        if (arguments.length < 1)
            throw new Error('.publish() expects at least one argument, the event name.')
        if (typeof arguments[0] !== 'string')
            throw new TypeError('.publish() expects a string for the event name.')

        //  pick up latches
        if (eventName in this._subscriptions) {
            this._subscriptions[eventName].forEach(subscription => {
                subscription.fn.apply(this, [].concat(eventParams, subscription.pr))
            })
        }
    }
}

module.exports = eventsMixin
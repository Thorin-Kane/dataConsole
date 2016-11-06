'use strict';
export default class State {
    static _this = null;
    static getInstance() {
        if (!State._this) {
            State._this = new State();
        }

        return State._this;
    }
    constructor() {
        this._state = {};
        this._subscriptions = {};
    }

    set(key, value) {
        this._state[key] = value;
        if (this._subscriptions[key]) {
            this._subscriptions[key].map((item) => {
                item.call(this, key, value);
            });
        }
    }

    get(key) {
        return this._state[key];
    }

    subscribe(key, cb) {
        if (!this._subscriptions[key]) {
            this._subscriptions[key] = [];
        }

        this._subscriptions[key].push(cb);

        return this.unsubscribe.bind(this, [key, this._subscriptions[key].length - 1]);
    }

    unsubscribe(info) {
        this._subscriptions[info[0]].splice(info[1], 1);
    }

 }

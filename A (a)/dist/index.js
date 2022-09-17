"use strict";
class Queue {
    constructor() {
        this.q = [];
    }
    enqueue(value) {
        this.q.push(value);
        return this.q;
    }
    dequeue() {
        return this.q.splice(0, 1)[0];
    }
    getQueue() {
        return this.q;
    }
    size() {
        return this.q.length;
    }
}
class Stack {
    constructor() {
        this.q = [];
    }
    enqueue(value) {
        this.q.push(value);
        return this.q;
    }
    dequeue() {
        return this.q.splice(this.q.length - 1, 1)[0];
    }
    getQueue() {
        return this.q;
    }
    size() {
        return this.q.length;
    }
}
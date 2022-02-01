export default class Queue {
    constructor() {
        this.container = [];
    }

    isEmpty() {
        return !this.container.length;
    }

    peek() {
        return this.isEmpty() ? null : this.container[0];
    }

    enqueue(value) {
        this.container.push(value);
    }

    dequeue() {
        return this.isEmpty() ? null : this.container.shift();
    }

    toString() {
        return this.container.toString();
    }
}

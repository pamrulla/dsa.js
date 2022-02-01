export default class Stack {
    constructor() {
        this.container = [];
    }

    size() {
        return this.container.length;
    }

    isEmpty() {
        return !this.size();
    }

    peek() {
        return this.isEmpty() ? null : this.container[this.size() - 1];
    }

    push(value) {
        this.container.push(value);
    }

    pop() {
        return this.isEmpty() ? null : this.container.pop();
    }

    toArray() {
        return [...this.container].reverse();
    }

    toString() {
        return this.toArray().toString();
    }
}
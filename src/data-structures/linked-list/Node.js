export default class Node {
    constructor(value, next = null) {
        this.value = value;
        this.next = next;
    }

    /**
     * 
     * @returns {string}
     */
    toString() {
        return `${this.value}`;
    }
}


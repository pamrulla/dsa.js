export default class Node {
    constructor(value, next = null) {
        this.value = value;
        this.next = next;
    }

    /**
     * 
     * @returns {string}
     */
    toString(callback) {
        return callback ? callback(this.value) : `${this.value}`;
    }
}


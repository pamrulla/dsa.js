import Node from './Node';
import Comparator from "../utils/comparator/Comparator";

export default class LinkedList {
    constructor(comparator) {
        /** @var Node */
        this.head = null;

        /** @var Node */
        this.tail = null;

        this.compare = new Comparator(comparator);
    }

    /**
     * 
     * @param {*} value 
     * @returns {LinkedList}
     */
    prepend(value) {
        //* Create a new node with current head as the next node
        const newNode = new Node(value, this.head);

        //* Make the new node as the head of the list
        this.head = newNode;

        //* If there is no tail yet, make the new node a tail
        if (!this.tail) {
            this.tail = newNode;
        }

        return this;
    }

    /**
     * 
     * @param {*} value 
     * @returns {LinkedList}
     */
    append(value) {
        const newNode = new Node(value);

        //* If there is no head yet, make the new node a head and tail
        if(!this.head) {
            this.head = newNode;
            this.tail = newNode;

            return this;
        }

        //* Attach new node to the end of the linked list
        this.tail.next = newNode;
        this.tail = newNode;

        return this;
    }

    /**
     * 
     * @param {*} value 
     * @param {*} index 
     * @returns {LinkedList}
     */
    insert(value, index) {
        const idx = index < 0 ? 0 : index;

        //* If the index is 0, attach the new node at the beginning of the LinkedList
        if(idx === 0) {
            return this.prepend(value);
        }

        let count = 1;
        let currentNode = this.head;
        const newNode = new Node(value);

        while (currentNode) {
            if(count === idx) break;

            currentNode = currentNode.next;
            count += 1;
        }

        if(currentNode) {
            newNode.next = currentNode.next;
            currentNode.next = newNode;
        } else {
            if(this.tail) {
                this.tail.next = newNode;
                this.tail = newNode;
            } else {
                this.head = newNode;
                this.tail = newNode;
            }
        }
        return this;
    }

    /**
     * 
     * @param {*} value 
     * @returns {Node}
     */
    delete(value) {
        if(!this.head) {
            return null;
        }

        let deleteNode = null;

        while (this.head && this.compare.equal(this.head.value, value)) {
            deleteNode = this.head;
            this.head = this.head.next;
        }

        let currentNode = this.head;

        if(currentNode !== null) {
            while (currentNode.next) {
                if(this.compare.equal(currentNode.next.value, value)) {
                    deleteNode = currentNode.next;
                    currentNode.next = currentNode.next.next;
                } else {
                    currentNode = currentNode.next;
                }
            }
        }

        if(this.compare.equal(this.tail.value, value)) {
            this.tail = currentNode;
        }

        return deleteNode;
    }
    
    /**
     * 
     * @param {*} value 
     * @returns {Node}
     */
    find({value = undefined, callback = undefined}) {
        if(!this.head) {
            return null;
        }

        let currentNode = this.head;

        while (currentNode) {

            if(callback && callback(currentNode.value)) {
                return currentNode;
            }

            if(value !== undefined && this.compare.equal(currentNode.value, value)) {
                return currentNode
            }
            currentNode = currentNode.next;
        }

        return null;
    }

    /**
     * 
     * @returns {Node}
     */
    deleteTail() {
        let deletedTail = this.head;

        if(this.head === this.tail) {
            this.head = null;
            this.tail = null;
            return deletedTail;
        }

        let currentNode = this.head;
        while (currentNode.next) {
            if(!currentNode.next.next) {
                deletedTail = currentNode.next;
                currentNode.next = null;
            } else {
                currentNode = currentNode.next;
            }
        }

        this.tail = currentNode;

        return deletedTail;
    }

    /**
     * 
     * @returns {Node}
     */
    deleteHead() {
        if(!this.head) {
            return null;
        }

        const deletedHead = this.head;

        if(this.head.next) {
            this.head = this.head.next;
        } else {
            this.head = null;
            this.tail = null;
        }

        return deletedHead;
    }

    /**
     * 
     * @param {*[]} values - Array of values that need to be convereted to linked list 
     * @returns {LinkedList}
     */
    fromArray(values) {
        values.forEach(e => {
            this.append(e);
        });

        return this;
    }
    
    /**
     * 
     * @returns {Node[]}
     */
    toArray() {
        let nodes = [];

        let currentNode = this.head;
        while (currentNode) {
            nodes.push(currentNode);
            currentNode = currentNode.next;
        }

        return nodes;
    }

    /**
     * 
     * @returns {string}
     */
    toString(callback) {
        return this.toArray().map(n => n.toString(callback)).toString();
    }

    /**
     * 
     * @returns {LinkedList}
     */
    reverse() {
        let currentNode = this.head;
        let prevNode = null;
        let nextNode = null;

        while (currentNode) {
            nextNode = currentNode.next;

            currentNode.next = prevNode;

            prevNode = currentNode;
            currentNode = nextNode;
        }

        this.tail = this.head;
        this.head = prevNode;

        return this;
    }
}

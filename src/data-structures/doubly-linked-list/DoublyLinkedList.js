import Node from "./Node";

export default class DoublyLinkedList {
    constructor() {
        /** @var Node */
        this.head = null;

        /** @var Node */
        this.tail = null;
    }

    prepend(value) {
        const newNode = new Node(value, this.head);

        if (this.head) {
            this.head.previous = newNode;
        }
        this.head = newNode;

        if (!this.tail) {
            this.tail = newNode;
        }

        return this;
    }

    append(value) {
        const newNode = new Node(value);

        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
            return this;
        }

        this.tail.next = newNode;
        newNode.previous = this.tail;
        this.tail = newNode;
        
        return this;
    }

    delete(value) {
        if(!this.head) {
            return null;
        }
        console.log('$$$');

        let deletedNode = null;
        let currentNode = this.head;

        while(currentNode) {
            if(currentNode.value === value) {
                console.log('#');
                deletedNode = currentNode;

                if(deletedNode === this.head) {
                    this.head = deletedNode.next;
                    if(this.head) {
                        this.head.previous = null;
                    }

                    if(deletedNode === this.tail) {
                        this.tail = null;
                    }
                } else if(deletedNode === this.tail) {
                    this.tail = deletedNode.previous;
                    this.tail.next = null;
                } else {
                    console.log('##');
                    const prev = deletedNode.previous;
                    const next = deletedNode.next;

                    prev.next = next;
                    next.previous = prev;
                }
            }
            console.log('###');
            currentNode = currentNode.next;
        }
        return deletedNode;
    }

    find(value) {
        if(!this.head) {
            return null;
        }

        let currentNode = this.head;

        while (currentNode) {
            if(currentNode.value === value) {
                return currentNode;
            }
            currentNode = currentNode.next;
        }
        return null;
    }

    deleteTail() {
        if(!this.tail) {
            return null;
        }

        if(this.head === this.tail) {
            const deletedNode = this.tail;
            this.head = null;
            this.tail = null;
            return deletedNode;
        }
        
        const deletedNode = this.tail;
        this.tail = deletedNode.previous;
        this.tail.next = null;

        return deletedNode;
    }

    deleteHead() {
        if(!this.head) {
            return null;
        }

        const deletedNode = this.head;

        if(this.head === this.tail) {
            this.head = null;
            this.tail = null;
        } else {
            this.head = deletedNode.next;
            this.head.previous = null;
        }
        return deletedNode;
    }

    toArray() {
        let nodes = [];

        let currentNode = this.head;
        while (currentNode) {
            nodes.push(currentNode);
            currentNode = currentNode.next;
        }
        return nodes;
    }

    fromArray(values) {
        values.forEach(e => this.append(e));
        return this;
    }

    toString() {
        return this.toArray().map(e => e.toString()).toString();
    }

    reverse() {
        let curr = this.head;
        let next = null;
        let prev = null;

        while (curr) {
            next = curr.next;
            prev = curr.previous;

            curr.next = prev;
            curr.previous = next;

            prev = curr;
            curr = next;
        }

        this.tail = this.head;
        this.head = prev;

        return this;
    }
}
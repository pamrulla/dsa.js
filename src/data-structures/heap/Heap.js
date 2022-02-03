import Comparator from "../utils/comparator/Comparator";

export default class Heap  {

    constructor(compareFunction) {
        if(new.target === Heap) {
            throw new TypeError('Cannot construct Heap instance directly');
        }

        this.container = [];
        this.compare = new Comparator(compareFunction);
    }

    getLeftChildIndex(parentIndex) {
        return (parentIndex * 2) + 1;
    }

    getRightChildIndex(parentIndex) {
        return (parentIndex * 2) + 2;
    }

    getParentIndex(childIndex) {
        return Math.floor((childIndex - 1)/ 2);
    }

    hasParent(childIndex) {
        return this.getParentIndex(childIndex) >= 0;
    }

    hasLeftChild(parentIndex) {
        return this.container[this.getLeftChildIndex(parentIndex)];
    }

    hasRightChild(parentIndex) {
        return this.container[this.getRightChildIndex(parentIndex)];
    }

    rightChild(parentIndex) {
        return this.container[this.getRightChildIndex(parentIndex)];
    }

    leftChild(parentIndex) {
        return this.container[this.getLeftChildIndex(parentIndex)];
    }

    parent(childIndex) {
        return this.container[this.getParentIndex(childIndex)];
    }

    swap(indexOne, indexTwo) {
        const tmp = this.container[indexOne];
        this.container[indexOne] = this.container[indexTwo];
        this.container[indexTwo] = tmp;
    }

    peek() {
        return this.container.length ? this.container[0] : null;
    }

    poll() {
        if(this.container.length === 0) {
            return null;
        } else if(this.container.length === 1) {
            return this.container.pop();
        }

        const item = this.container[0];

        this.container[0] = this.container.pop();
        this.heapifyDown();

        return item;
    }

    add(item) {
        this.container.push(item);
        this.heapiyUp();
        return this;
    }

    remove(item, comparator = this.compare) {
        const numberOfItemsToRemove = this.find(item, comparator).length;

        for(let i = 0; i < numberOfItemsToRemove; i++) {
            const indexToRemove = this.find(item, comparator).pop();

            if(indexToRemove === (this.container.length - 1)) {
                this.container.pop();
            } else {
                this.container[indexToRemove] = this.container.pop();

                const parentItem = this.parent(indexToRemove);

                if(this.hasLeftChild(indexToRemove) && 
                    (!parentItem || this.pairIsInCorrectOrder(parentItem, this.container[indexToRemove]))) {
                        this.heapifyDown(indexToRemove);
                    } else {
                        this.heapiyUp(indexToRemove);
                    }
            }
        }

        return this;
    }

    find(item, comparator = this.compare) {
        return this.container.reduce((res, n, i) => {
            if(comparator.equal(item, n)) {
                res.push(i);
            }
            return res;
        }, []);
    }

    isEmpty() {
        return !this.container.length;
    }

    toString() {
        return this.container.toString();
    }

    pairIsInCorrectOrder(firstElement, secondElement) {
        throw new Error(`
            You have to implement heap pai comparison method.
        `);
    }

    heapiyUp(startIndex) {
        let currentIndex = startIndex || this.container.length - 1;

        while(this.hasParent(currentIndex) &&
            !this.pairIsInCorrectOrder(this.parent(currentIndex), this.container[currentIndex])    
        ) {
            this.swap(currentIndex, this.getParentIndex(currentIndex));
            currentIndex = this.getParentIndex(currentIndex);
        }
    }

    heapifyDown(startIndex = 0) {
        let currentIndex = startIndex;
        let nextIndex = null;

        while(this.hasLeftChild(currentIndex)) {
            if(
                this.hasRightChild(currentIndex) &&
                this.pairIsInCorrectOrder(this.rightChild(currentIndex), this.leftChild(currentIndex))
            ) {
                nextIndex = this.getRightChildIndex(currentIndex);
            } else {
                nextIndex = this.getLeftChildIndex(currentIndex);
            }

            if(this.pairIsInCorrectOrder(this.container[currentIndex], this.container[nextIndex])) {
                break;
            }

            this.swap(currentIndex, nextIndex);
            currentIndex = nextIndex;
        }
    }
}

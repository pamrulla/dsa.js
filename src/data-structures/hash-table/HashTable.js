import LinkedList from '../linked-list/LinkedList';

const defaultHashtableSize = 32;

export default class HashTable  {
    #buckets;
    #keys;
    
    constructor(hashTableSize = defaultHashtableSize) {
        this.#buckets = Array(hashTableSize).fill(null).map(() => new LinkedList());

        this.#keys = {};
    }

    #getBucketAndFindNode(key) {
        const keyHash = this.hash(key);
        const bucketList = this.#buckets[keyHash];
        const node = bucketList.find({callback: (v) => v.key === key});
        return {keyHash, bucketList, node};
    }

    size() {
        return this.#buckets.length;
    }

    /**
     * Simple hash function
     * @param {*} key 
     */
    hash(key) {
        const hash = Array.from(key).reduce(
            (acc, k) => acc + k.charCodeAt(0),
            0, 
        );

        return hash % this.#buckets.length;
    }

    set(key, value) {
        const {keyHash, bucketList, node} = this.#getBucketAndFindNode(key);
        this.#keys[key] = keyHash;

        if(!node) {
            bucketList.append({key, value});
        } else {
            node.value.value = value;
        }
    }

    delete(key) {
        const {bucketList, node} = this.#getBucketAndFindNode(key);
        delete this.#keys[key];
        
        if(node) {
            return bucketList.delete(node.value);
        }

        return null;
    }

    get(key) {
        const {node} = this.#getBucketAndFindNode(key);

        return node ? node.value.value : undefined;
    }

    has(key) {
        return Object.hasOwnProperty.call(this.#keys, key);
    }

    getKeys() {
        return Object.keys(this.#keys);
    }

    getValues() {
        return this.#buckets.reduce((values, bucket) => {
            const bucketValues = bucket.toArray()
                .map(n => n.value.value);
            return values.concat(bucketValues);
        }, []);
    }
}

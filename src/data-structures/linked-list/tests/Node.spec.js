import Node from '../Node';

describe('LinkedList Node', () => {
    it('should create list node with value', () => {
        const node = new Node(1);

        expect(node.value).toBe(1);
        expect(node.next).toBeNull();
    });

    it('should link nodes with value', () => {
        const node1 = new Node(1);
        const node2 = new Node(10, node1);

        expect(node1.value).toBe(1);
        expect(node1.next).toBeNull();
        expect(node2.value).toBe(10);
        expect(node2.next).toBe(node1);
    });

    it('should convert node to string', () => {
        const node = new Node(1);

        expect(node.toString()).toBe('1');
    });
});
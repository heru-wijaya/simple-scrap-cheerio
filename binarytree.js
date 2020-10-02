class Node {
    constructor(element) {
        this.element = element;
        this.left = null;
        this.right = null;
    }
}

class BinaryTree {
    constructor() {
        this.root = null;
    }

    getRoot() {
        return this.root;
    }

    insert(data) {
        let node = new Node(data);
        if (this.root == null) {
            this.root = node;
        } else {
            this.insertNode(this.root, node);
        }
    }

    insertNode(currentNode, newNode) {
        if (currentNode.element > newNode.element) {
            if (currentNode.left == null) {
                currentNode.left = newNode
            } else {
                this.insertNode(currentNode.left, newNode);
            }
        } else {
            if (currentNode.right == null) {
                currentNode.right = newNode
            } else {
                this.insertNode(currentNode.right, newNode);
            }
        }
    }

    remove(data) {
        this.root = this.removeNode(this.root, data);
    }

    removeNode(currentNode, data) {
        if (currentNode == null) {
            currentNode = null;
        } else if (currentNode.element < data) {
            currentNode.right = this.removeNode(currentNode.right, data);
        } else if (currentNode.element > data) {
            currentNode.left = this.removeNode(currentNode.left, data);
        } else {
            if (currentNode.left == null && currentNode.right == null) {
                currentNode = null;
            } else if (currentNode.left == null) {
                currentNode = currentNode.right;
            } else if (currentNode.right == null) {
                currentNode = currentNode.left;
            } else {
                let min = this.findMinNode(currentNode.right);
                currentNode.element = min;
            }
        }

        return currentNode;
    }

    findMinNode(node) {
        if (node.left == null) {
            return node;
        } else {
            this.findMinNode(node.left);
        }
    }

    inOrder(node) {
        if (node != null) {
            this.inOrder(node.left);
            console.log(node.element);
            this.inOrder(node.right);
        }
    }
}

const BT = new BinaryTree();

BT.insert(10);
BT.insert(3);
BT.insert(5);
BT.insert(11);
BT.insert(9);
BT.insert(7);
BT.insert(14);
BT.insert(13);
BT.insert(12);
BT.remove(11);

let root = BT.getRoot();
BT.inOrder(root);
// console.log(BT);
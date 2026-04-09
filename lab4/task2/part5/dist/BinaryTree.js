import { BinaryTreeNode } from "./BinaryTreeNode.js";
export class BinaryTree {
    constructor() {
        this.root = null;
    }
    insert(value) {
        this.root = this.insertNode(this.root, value);
    }
    search(value) {
        return this.searchNode(this.root, value);
    }
    remove(value) {
        this.root = this.removeNode(this.root, value);
    }
    update(oldValue, newValue) {
        const existingNode = this.search(oldValue);
        if (existingNode === null) {
            return false;
        }
        this.remove(oldValue);
        this.insert(newValue);
        return true;
    }
    height() {
        return this.getHeight(this.root);
    }
    inorder() {
        const values = [];
        this.collectInorder(this.root, values);
        return values;
    }
    insertNode(node, value) {
        if (node === null) {
            return new BinaryTreeNode(value);
        }
        if (value < node.value) {
            node.left = this.insertNode(node.left, value);
        }
        else if (value > node.value) {
            node.right = this.insertNode(node.right, value);
        }
        return node;
    }
    searchNode(node, value) {
        if (node === null) {
            return null;
        }
        if (value === node.value) {
            return node;
        }
        if (value < node.value) {
            return this.searchNode(node.left, value);
        }
        return this.searchNode(node.right, value);
    }
    removeNode(node, value) {
        if (node === null) {
            return null;
        }
        if (value < node.value) {
            node.left = this.removeNode(node.left, value);
            return node;
        }
        if (value > node.value) {
            node.right = this.removeNode(node.right, value);
            return node;
        }
        if (node.left === null && node.right === null) {
            return null;
        }
        if (node.left === null) {
            return node.right;
        }
        if (node.right === null) {
            return node.left;
        }
        const minRight = this.findMin(node.right);
        node.value = minRight.value;
        node.right = this.removeNode(node.right, minRight.value);
        return node;
    }
    findMin(node) {
        let current = node;
        while (current.left !== null) {
            current = current.left;
        }
        return current;
    }
    getHeight(node) {
        if (node === null) {
            return 0;
        }
        const leftHeight = this.getHeight(node.left);
        const rightHeight = this.getHeight(node.right);
        return Math.max(leftHeight, rightHeight) + 1;
    }
    collectInorder(node, values) {
        if (node === null) {
            return;
        }
        this.collectInorder(node.left, values);
        values.push(node.value);
        this.collectInorder(node.right, values);
    }
}

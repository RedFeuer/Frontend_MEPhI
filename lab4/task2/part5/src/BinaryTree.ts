import { BinaryTreeNode } from "./BinaryTreeNode.js";

export class BinaryTree {
  private root: BinaryTreeNode | null;

  public constructor() {
    this.root = null;
  }

  public insert(value: number): void {
    this.root = this.insertNode(this.root, value);
  }

  public search(value: number): BinaryTreeNode | null {
    return this.searchNode(this.root, value);
  }

  public remove(value: number): void {
    this.root = this.removeNode(this.root, value);
  }

  public update(oldValue: number, newValue: number): boolean {
    const existingNode: BinaryTreeNode | null = this.search(oldValue);

    if (existingNode === null) {
      return false;
    }

    this.remove(oldValue);
    this.insert(newValue);
    return true;
  }

  public height(): number {
    return this.getHeight(this.root);
  }

  public inorder(): number[] {
    const values: number[] = [];
    this.collectInorder(this.root, values);
    return values;
  }

  private insertNode(node: BinaryTreeNode | null, value: number): BinaryTreeNode {
    if (node === null) {
      return new BinaryTreeNode(value);
    }

    if (value < node.value) {
      node.left = this.insertNode(node.left, value);
    } else if (value > node.value) {
      node.right = this.insertNode(node.right, value);
    }

    return node;
  }

  private searchNode(node: BinaryTreeNode | null, value: number): BinaryTreeNode | null {
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

  private removeNode(node: BinaryTreeNode | null, value: number): BinaryTreeNode | null {
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

    const minRight: BinaryTreeNode = this.findMin(node.right);
    node.value = minRight.value;
    node.right = this.removeNode(node.right, minRight.value);

    return node;
  }

  private findMin(node: BinaryTreeNode): BinaryTreeNode {
    let current: BinaryTreeNode = node;

    while (current.left !== null) {
      current = current.left;
    }

    return current;
  }

  private getHeight(node: BinaryTreeNode | null): number {
    if (node === null) {
      return 0;
    }

    const leftHeight: number = this.getHeight(node.left);
    const rightHeight: number = this.getHeight(node.right);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  private collectInorder(node: BinaryTreeNode | null, values: number[]): void {
    if (node === null) {
      return;
    }

    this.collectInorder(node.left, values);
    values.push(node.value);
    this.collectInorder(node.right, values);
  }
}
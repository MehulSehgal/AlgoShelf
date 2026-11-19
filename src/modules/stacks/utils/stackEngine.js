/**
 * Core Stack Data Structure Model with Array Backing
 */
export class ArrayStack {
  constructor(capacity = 7) {
    if (!Number.isInteger(capacity) || capacity <= 0) {
      throw new Error("Stack capacity must be a positive integer.");
    }
    this.capacity = capacity;
    this.items = [];
  }

  isFull() {
    return this.items.length >= this.capacity;
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }

  topIndex() {
    return this.items.length - 1;
  }

  peek() {
    if (this.isEmpty()) return null;
    return this.items[this.items.length - 1];
  }

  push(value) {
    if (typeof value !== "number" || !Number.isFinite(value)) {
      throw new Error("Pushed value must be a valid number.");
    }
    if (this.isFull()) {
      throw new Error(`Stack Overflow: Capacity of ${this.capacity} reached.`);
    }
    this.items.push(value);
    return this.items.length - 1;
  }

  pop() {
    if (this.isEmpty()) {
      throw new Error("Stack Underflow: Stack is empty.");
    }
    return this.items.pop();
  }

  toArray() {
    return [...this.items];
  }
}

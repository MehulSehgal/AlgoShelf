/**
 * Comprehensive Unit Tests for ArrayStack Model
 */
import { ArrayStack } from "./stackEngine.js";

export function runStackSelfTests() {
  const results = [];

  // Test 1: Empty stack initialization & topIndex -1
  const stack = new ArrayStack(4);
  results.push({
    name: "Initial state is empty and size is 0",
    pass: stack.isEmpty() && stack.size() === 0,
  });
  results.push({
    name: "topIndex returns -1 for empty stack",
    pass: stack.topIndex() === -1,
  });

  // Test 2: Peek on empty stack returns null and does not modify size
  const emptyPeek = stack.peek();
  results.push({
    name: "peek() on an empty stack returns null",
    pass: emptyPeek === null && stack.size() === 0,
  });

  // Test 3: Underflow throws error on pop() from empty stack
  let underflowCaught = false;
  try {
    stack.pop();
  } catch (err) {
    underflowCaught = err.message.includes("Stack Underflow");
  }
  results.push({
    name: "Underflow: pop() on an empty stack throws error",
    pass: underflowCaught,
  });

  // Test 4: Push elements and peek does not modify size
  stack.push(10);
  stack.push(20);
  const sizeBeforePeek = stack.size();
  const peekVal = stack.peek();
  results.push({
    name: "Pushes increment size and update topIndex",
    pass: stack.size() === 2 && stack.topIndex() === 1,
  });
  results.push({
    name: "peek() returns top element without modifying stack size",
    pass: peekVal === 20 && stack.size() === sizeBeforePeek,
  });

  // Test 5: Popping all elements preserves LIFO order
  stack.push(30);
  const pop1 = stack.pop(); // 30
  const pop2 = stack.pop(); // 20
  const pop3 = stack.pop(); // 10
  results.push({
    name: "Popping all elements preserves strict LIFO order",
    pass: pop1 === 30 && pop2 === 20 && pop3 === 10 && stack.isEmpty(),
  });

  // Test 6: Full detection and Overflow
  stack.push(100);
  stack.push(200);
  stack.push(300);
  stack.push(400); // capacity 4 reached
  results.push({
    name: "Full detection when capacity reached",
    pass: stack.isFull() && stack.size() === 4,
  });

  let overflowCaught = false;
  try {
    stack.push(500);
  } catch (err) {
    overflowCaught = err.message.includes("Stack Overflow");
  }
  results.push({
    name: "Overflow: push() beyond capacity throws error",
    pass: overflowCaught,
  });

  // Test 7: toArray() returns an independent copy
  const arrCopy = stack.toArray();
  arrCopy.push(999);
  results.push({
    name: "toArray() returns an independent copy that does not mutate internal items",
    pass: stack.size() === 4 && stack.peek() === 400 && !stack.toArray().includes(999),
  });

  // Test 8: Boundary testing with stack of capacity 1
  const singleStack = new ArrayStack(1);
  results.push({
    name: "Capacity 1 stack initializes empty",
    pass: singleStack.isEmpty() && !singleStack.isFull(),
  });
  singleStack.push(42);
  results.push({
    name: "Capacity 1 stack is full after 1 push",
    pass: singleStack.isFull() && singleStack.peek() === 42,
  });
  let singleOverflow = false;
  try {
    singleStack.push(99);
  } catch {
    singleOverflow = true;
  }
  results.push({
    name: "Capacity 1 stack throws overflow on second push",
    pass: singleOverflow,
  });
  const singlePopped = singleStack.pop();
  results.push({
    name: "Capacity 1 stack pops to empty",
    pass: singlePopped === 42 && singleStack.isEmpty(),
  });

  // Test 9: Constructor capacity validation
  let invalidCapacityCaught = false;
  try {
    new ArrayStack(0);
  } catch {
    invalidCapacityCaught = true;
  }
  try {
    new ArrayStack(-5);
  } catch {
    invalidCapacityCaught = invalidCapacityCaught && true;
  }
  try {
    new ArrayStack(3.5);
  } catch {
    invalidCapacityCaught = invalidCapacityCaught && true;
  }
  results.push({
    name: "Constructor rejects non-positive or non-integer capacities",
    pass: invalidCapacityCaught,
  });

  // Test 10: Value validation on push
  let invalidValueCaught = false;
  try {
    stack.pop(); // create room
    stack.push("invalid-string");
  } catch {
    invalidValueCaught = true;
  }
  results.push({
    name: "push() rejects non-numeric elements",
    pass: invalidValueCaught,
  });

  return results;
}

/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val); // Populate the list with initial values
  }

  /** push(val): add new value to end of list. */
  push(val) {
    const newNode = new Node(val);

    // If the list is empty, set both head and tail to the new node
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }

    this.length += 1;
  }

  /** unshift(val): add new value to start of list. */
  unshift(val) {
    const newNode = new Node(val);

    // If the list is empty, set both head and tail to the new node
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }

    this.length += 1;
  }

  /** pop(): return & remove last item. */
  pop() {
    if (!this.head) throw new Error("Cannot pop from an empty list");

    // If there is only one item in the list, handle the case separately
    if (this.length === 1) {
      const val = this.head.val;
      this.head = null;
      this.tail = null;
      this.length -= 1;
      return val;
    }

    // Traverse the list to find the second-to-last node
    let current = this.head;
    while (current.next !== this.tail) {
      current = current.next;
    }

    const val = this.tail.val;
    this.tail = current;
    this.tail.next = null;
    this.length -= 1;
    return val;
  }

  /** shift(): return & remove first item. */
  shift() {
    if (!this.head) throw new Error("Cannot shift from an empty list");

    const val = this.head.val;
    this.head = this.head.next;

    if (!this.head) this.tail = null; // If we removed the last node, reset the tail

    this.length -= 1;
    return val;
  }

  /** getAt(idx): get val at idx. */
  getAt(idx) {
    if (idx < 0 || idx >= this.length) throw new Error("Invalid index");

    let current = this.head;
    let count = 0;

    // Traverse the list to the requested index
    while (count !== idx) {
      current = current.next;
      count += 1;
    }

    return current.val;
  }

  /** setAt(idx, val): set val at idx to val */
  setAt(idx, val) {
    if (idx < 0 || idx >= this.length) throw new Error("Invalid index");

    let current = this.head;
    let count = 0;

    // Traverse the list to the requested index
    while (count !== idx) {
      current = current.next;
      count += 1;
    }

    current.val = val;
  }

  /** insertAt(idx, val): add node w/val before idx. */
  insertAt(idx, val) {
    if (idx < 0 || idx > this.length) throw new Error("Invalid index");

    // Handle inserting at the beginning or the end
    if (idx === 0) return this.unshift(val);
    if (idx === this.length) return this.push(val);

    let current = this.head;
    let count = 0;

    // Traverse the list to the node before the requested index
    while (count !== idx - 1) {
      current = current.next;
      count += 1;
    }

    const newNode = new Node(val);
    newNode.next = current.next;
    current.next = newNode;

    this.length += 1;
  }

  /** removeAt(idx): return & remove item at idx */
  removeAt(idx) {
    if (idx < 0 || idx >= this.length) throw new Error("Invalid index");

    // Handle removing the first or last node
    if (idx === 0) return this.shift();
    if (idx === this.length - 1) return this.pop();

    let current = this.head;
    let count = 0;

    // Traverse the list to the node before the requested index
    while (count !== idx - 1) {
      current = current.next;
      count += 1;
    }

    const val = current.next.val;
    current.next = current.next.next;

    this.length -= 1;
    return val;
  }

  /** average(): return an average of all values in the list */
  average() {
    if (!this.length) return 0;

    let total = 0;
    let current = this.head;

    // Traverse the list and sum all values
    while (current) {
      total += current.val;
      current = current.next;
    }

    return total / this.length;
  }
}

module.exports = LinkedList;

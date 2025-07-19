// Iterator インターフェース
class Iterator {
  getNext() {
    throw new Error("getNext() must be implemented");
  }

  hasMore() {
    throw new Error("hasMore() must be implemented");
  }
}

// Concrete Iterator
class AlphabeticalOrderIterator extends Iterator {
  constructor(collection, reverse = false) {
    super();
    this.collection = collection;
    this.reverse = reverse;
    this.position = reverse ? collection.getCount() - 1 : 0;
  }

  getNext() {
    const item = this.collection.getItems()[this.position];
    this.position += this.reverse ? -1 : 1;
    return item;
  }

  hasMore() {
    if (this.reverse) {
      return this.position >= 0;
    }
    return this.position < this.collection.getCount();
  }
}

// Collection インターフェース
class Iterable {
  getIterator() {
    throw new Error("getIterator() must be implemented");
  }
}

// Concrete Collection
class WordsCollection extends Iterable {
  constructor() {
    super();
    this.items = [];
  }

  getItems() {
    return this.items;
  }

  getCount() {
    return this.items.length;
  }

  addItem(item) {
    this.items.push(item);
  }

  getIterator() {
    return new AlphabeticalOrderIterator(this);
  }

  getReverseIterator() {
    return new AlphabeticalOrderIterator(this, true);
  }
}

// Client Code
const collection = new WordsCollection();
collection.addItem("First");
collection.addItem("Second");
collection.addItem("Third");

const iterator = collection.getIterator();

console.log("Straight traversal:");
while (iterator.hasMore()) {
  console.log(iterator.getNext());
}

console.log("");
console.log("Reverse traversal:");
const reverseIterator = collection.getReverseIterator();
while (reverseIterator.hasMore()) {
  console.log(reverseIterator.getNext());
}

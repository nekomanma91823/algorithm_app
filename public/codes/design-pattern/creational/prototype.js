// Prototype クラス
class ComponentWithBackReference {
  constructor(prototype) {
    this.prototype = prototype;
  }
}

class Prototype {
  constructor() {
    this.primitive = null;
    this.component = null;
    this.circularReference = null;
  }

  clone() {
    const clone = Object.create(Object.getPrototypeOf(this));
    clone.primitive = this.primitive;
    clone.component = Object.assign({}, this.component);
    clone.circularReference = {
      ...this.circularReference,
      prototype: clone,
    };
    return clone;
  }
}

// 使用例
const p1 = new Prototype();
p1.primitive = 245;
p1.component = new Date();
p1.circularReference = new ComponentWithBackReference(p1);

const p2 = p1.clone();

if (p1.primitive === p2.primitive) {
  console.log("Primitive field values have been carried over to a clone. Yay!");
} else {
  console.log("Primitive field values have not been copied. Booo!");
}

if (p1.component === p2.component) {
  console.log("Simple component has not been cloned. Booo!");
} else {
  console.log("Simple component has been cloned. Yay!");
}

if (p1.circularReference === p2.circularReference) {
  console.log("Component with back reference has not been cloned. Booo!");
} else {
  console.log("Component with back reference has been cloned. Yay!");
}

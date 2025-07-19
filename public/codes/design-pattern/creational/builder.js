// Product クラス
class Product {
  constructor() {
    this.parts = [];
  }

  listParts() {
    console.log(`Product parts: ${this.parts.join(", ")}\n`);
  }
}

// Builder インターフェース
class Builder {
  reset() {
    throw new Error("reset() must be implemented");
  }

  producePartA() {
    throw new Error("producePartA() must be implemented");
  }

  producePartB() {
    throw new Error("producePartB() must be implemented");
  }

  producePartC() {
    throw new Error("producePartC() must be implemented");
  }
}

// Concrete Builder
class ConcreteBuilder extends Builder {
  constructor() {
    super();
    this.reset();
  }

  reset() {
    this.product = new Product();
  }

  producePartA() {
    this.product.parts.push("PartA1");
  }

  producePartB() {
    this.product.parts.push("PartB1");
  }

  producePartC() {
    this.product.parts.push("PartC1");
  }

  getProduct() {
    const result = this.product;
    this.reset();
    return result;
  }
}

// Director
class Director {
  setBuilder(builder) {
    this.builder = builder;
  }

  buildMinimalViableProduct() {
    this.builder.producePartA();
  }

  buildFullFeaturedProduct() {
    this.builder.producePartA();
    this.builder.producePartB();
    this.builder.producePartC();
  }
}

// 使用例
const director = new Director();
const builder = new ConcreteBuilder();
director.setBuilder(builder);

console.log("Standard basic product:");
director.buildMinimalViableProduct();
builder.getProduct().listParts();

console.log("Standard full featured product:");
director.buildFullFeaturedProduct();
builder.getProduct().listParts();

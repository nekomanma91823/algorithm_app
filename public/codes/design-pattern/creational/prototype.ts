class Prototype {
  public primitive: any;
  public component: object;
  public circularReference: ComponentWithBackReference;

  constructor(primitive: any, component: object, circularReference: ComponentWithBackReference) {
    this.primitive = primitive;
    this.component = component;
    this.circularReference = circularReference;
  }

  public clone(): this {
    const clone = Object.create(this);

    clone.component = Object.create(this.component);

    // Clone an object that has a circular reference. Meticulously clone the
    // circular reference object, otherwise the cloned object will point to the
    // original object's circular reference object.
    clone.circularReference = Object.create(this.circularReference);
    clone.circularReference.prototype = {
      ...Object.create(this.circularReference.prototype),
      circularReference: clone,
    };

    return clone;
  }
}

class ComponentWithBackReference {
  public prototype: Prototype;

  constructor(prototype: Prototype) {
    this.prototype = prototype;
  }
}

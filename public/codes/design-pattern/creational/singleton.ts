class Singleton {
  private static instance: Singleton;

  private constructor() {
    // private constructor
  }

  public static getInstance(): Singleton {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }
    return Singleton.instance;
  }
}

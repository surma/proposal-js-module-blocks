const secretMarker = "___thisIsAModuleBlock";
export class ModuleBlock {
  constructor(body) {
    if (typeof body !== "string") {
      throw Error("Unexpected parameter type");
    }
    this[secretMarker] = true;
    this._body = body;
    this._blobURL = URL.createObjectURL(
      new Blob([body], { type: "text/javascript" })
    );
  }
  toString() {
    return `module {${this._body}}`;
  }
  static fixup(obj) {
    if (typeof obj !== "object") {
      return obj;
    }
    if (!(secretMarker in obj)) {
      return obj;
    }
    Object.setPrototypeOf(obj, ModuleBlock.prototype);
    return obj;
  }
  [Symbol.toPrimitive]() {
    return this._blobURL;
  }
}

self.ModuleBlock = ModuleBlock;
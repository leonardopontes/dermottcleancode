// Single Responsibility Principle (SRP)
// Bad
class UserSettings {
    constructor(user) {
      this.user = user;
    }
  
    changeSettings(settings) {
      if (this.verifyCredentials()) {
        // ...
      }
    }
  
    verifyCredentials() {
      // ...
    }
  }
// Good
class UserAuth {
    constructor(user) {
      this.user = user;
    }
  
    verifyCredentials() {
      // ...
    }
  }
  
  class UserSettings {
    constructor(user) {
      this.user = user;
      this.auth = new UserAuth(user);
    }
  
    changeSettings(settings) {
      if (this.auth.verifyCredentials()) {
        // ...
      }
    }
  }
  
// Open/Closed Principle (OCP)
// Bad
class AjaxAdapter extends Adapter {
    constructor() {
      super();
      this.name = "ajaxAdapter";
    }
  }
  
  class NodeAdapter extends Adapter {
    constructor() {
      super();
      this.name = "nodeAdapter";
    }
  }
  
  class HttpRequester {
    constructor(adapter) {
      this.adapter = adapter;
    }
  
    fetch(url) {
      if (this.adapter.name === "ajaxAdapter") {
        return makeAjaxCall(url).then(response => {
          // transform response and return
        });
      } else if (this.adapter.name === "nodeAdapter") {
        return makeHttpCall(url).then(response => {
          // transform response and return
        });
      }
    }
  }
  
  function makeAjaxCall(url) {
    // request and return promise
  }
  
  function makeHttpCall(url) {
    // request and return promise
  }
// Good
class AjaxAdapter extends Adapter {
    constructor() {
      super();
      this.name = "ajaxAdapter";
    }
  
    request(url) {
      // request and return promise
    }
  }
  
  class NodeAdapter extends Adapter {
    constructor() {
      super();
      this.name = "nodeAdapter";
    }
  
    request(url) {
      // request and return promise
    }
  }
  
  class HttpRequester {
    constructor(adapter) {
      this.adapter = adapter;
    }
  
    fetch(url) {
      return this.adapter.request(url).then(response => {
        // transform response and return
      });
    }
  }

// Liskov Substitution Principle (LSP)
// Bad
class Rectangle {
    constructor() {
      this.width = 0;
      this.height = 0;
    }
  
    setColor(color) {
      // ...
    }
  
    render(area) {
      // ...
    }
  
    setWidth(width) {
      this.width = width;
    }
  
    setHeight(height) {
      this.height = height;
    }
  
    getArea() {
      return this.width * this.height;
    }
  }
  
  class Square extends Rectangle {
    setWidth(width) {
      this.width = width;
      this.height = width;
    }
  
    setHeight(height) {
      this.width = height;
      this.height = height;
    }
  }
  
  function renderLargeRectangles(rectangles) {
    rectangles.forEach(rectangle => {
      rectangle.setWidth(4);
      rectangle.setHeight(5);
      const area = rectangle.getArea(); // BAD: Returns 25 for Square. Should be 20.
      rectangle.render(area);
    });
  }
  
  const rectangles = [new Rectangle(), new Rectangle(), new Square()];
  renderLargeRectangles(rectangles);
// Good
class Shape {
    setColor(color) {
      // ...
    }
  
    render(area) {
      // ...
    }
  }
  
  class Rectangle extends Shape {
    constructor(width, height) {
      super();
      this.width = width;
      this.height = height;
    }
  
    getArea() {
      return this.width * this.height;
    }
  }
  
  class Square extends Shape {
    constructor(length) {
      super();
      this.length = length;
    }
  
    getArea() {
      return this.length * this.length;
    }
  }
  
  function renderLargeShapes(shapes) {
    shapes.forEach(shape => {
      const area = shape.getArea();
      shape.render(area);
    });
  }
  
  const shapes = [new Rectangle(4, 5), new Rectangle(4, 5), new Square(5)];
  renderLargeShapes(shapes);

// Interface Segregation Principle (ISP)
// Bad
class DOMTraverser {
    constructor(settings) {
      this.settings = settings;
      this.setup();
    }
  
    setup() {
      this.rootNode = this.settings.rootNode;
      this.settings.animationModule.setup();
    }
  
    traverse() {
      // ...
    }
  }
  
  const $ = new DOMTraverser({
    rootNode: document.getElementsByTagName("body"),
    animationModule() {} // Most of the time, we won't need to animate when traversing.
    // ...
  });
// Good
class DOMTraverser {
    constructor(settings) {
      this.settings = settings;
      this.options = settings.options;
      this.setup();
    }
  
    setup() {
      this.rootNode = this.settings.rootNode;
      this.setupOptions();
    }
  
    setupOptions() {
      if (this.options.animationModule) {
        // ...
      }
    }
  
    traverse() {
      // ...
    }
  }
  
  const $ = new DOMTraverser({
    rootNode: document.getElementsByTagName("body"),
    options: {
      animationModule() {}
    }
  });

// Dependency Inversion Principle (DIP)
// Bad
class InventoryRequester {
    constructor() {
      this.REQ_METHODS = ["HTTP"];
    }
  
    requestItem(item) {
      // ...
    }
  }
  
  class InventoryTracker {
    constructor(items) {
      this.items = items;
  
      // BAD: We have created a dependency on a specific request implementation.
      // We should just have requestItems depend on a request method: `request`
      this.requester = new InventoryRequester();
    }
  
    requestItems() {
      this.items.forEach(item => {
        this.requester.requestItem(item);
      });
    }
  }
  
  const inventoryTracker = new InventoryTracker(["apples", "bananas"]);
  inventoryTracker.requestItems();
// Good
class InventoryTracker {
    constructor(items, requester) {
      this.items = items;
      this.requester = requester;
    }
  
    requestItems() {
      this.items.forEach(item => {
        this.requester.requestItem(item);
      });
    }
  }
  
  class InventoryRequesterV1 {
    constructor() {
      this.REQ_METHODS = ["HTTP"];
    }
  
    requestItem(item) {
      // ...
    }
  }
  
  class InventoryRequesterV2 {
    constructor() {
      this.REQ_METHODS = ["WS"];
    }
  
    requestItem(item) {
      // ...
    }
  }
  
  // By constructing our dependencies externally and injecting them, we can easily
  // substitute our request module for a fancy new one that uses WebSockets.
  const inventoryTracker = new InventoryTracker(
    ["apples", "bananas"],
    new InventoryRequesterV2()
  );
  inventoryTracker.requestItems();
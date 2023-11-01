// Don't over-optimize
// Bad
// On old browsers, each iteration with uncached `list.length` would be costly
// because of `list.length` recomputation. In modern browsers, this is optimized.
for (let i = 0, len = list.length; i < len; i++) {
    // ...
  }
// Good
for (let i = 0; i < list.length; i++) {
    // ...
  }

// Remove dead code
// Bad
function oldRequestModule(url) {
    // ...
  }
  
  function newRequestModule(url) {
    // ...
  }
  
  const req = newRequestModule;
  inventoryTracker("apples", req, "www.inventory-awesome.io");
// Good
function newRequestModule(url) {
    // ...
  }
  
  const req = newRequestModule;
  inventoryTracker("apples", req, "www.inventory-awesome.io");  
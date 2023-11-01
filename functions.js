// Argumentos de função (2 ou menos, idealmente)
// Bad
function createMenu(title, body, buttonText, cancellable) {
    // ...
  }
  
  createMenu("Foo", "Bar", "Baz", true);
// Good
function createMenu({ title, body, buttonText, cancellable }) {
    // ...
  }
  
  createMenu({
    title: "Foo",
    body: "Bar",
    buttonText: "Baz",
    cancellable: true
  });
  
// Funções devem fazer uma coisa
// Bad
function emailClients(clients) {
    clients.forEach(client => {
      const clientRecord = database.lookup(client);
      if (clientRecord.isActive()) {
        email(client);
      }
    });
  }
// Good
function emailActiveClients(clients) {
    clients.filter(isActiveClient).forEach(email);
  }
  
  function isActiveClient(client) {
    const clientRecord = database.lookup(client);
    return clientRecord.isActive();
  }
  
// Os nomes das funções devem dizer o que fazem
// Bad
function addToDate(date, month) {
    // ...
  }
  
  const date = new Date();
  
  // It's hard to tell from the function name what is added
  addToDate(date, 1);
// Good
function addMonthToDate(month, date) {
    // ...
  }
  
  const date = new Date();
  addMonthToDate(1, date);
  
// As funções devem ter apenas um nível de abstração
// Bad
function parseBetterJSAlternative(code) {
    const REGEXES = [
      // ...
    ];
  
    const statements = code.split(" ");
    const tokens = [];
    REGEXES.forEach(REGEX => {
      statements.forEach(statement => {
        // ...
      });
    });
  
    const ast = [];
    tokens.forEach(token => {
      // lex...
    });
  
    ast.forEach(node => {
      // parse...
    });
  }
// Good
function parseBetterJSAlternative(code) {
    const tokens = tokenize(code);
    const syntaxTree = parse(tokens);
    syntaxTree.forEach(node => {
      // parse...
    });
  }
  
  function tokenize(code) {
    const REGEXES = [
      // ...
    ];
  
    const statements = code.split(" ");
    const tokens = [];
    REGEXES.forEach(REGEX => {
      statements.forEach(statement => {
        tokens.push(/* ... */);
      });
    });
  
    return tokens;
  }
  
  function parse(tokens) {
    const syntaxTree = [];
    tokens.forEach(token => {
      syntaxTree.push(/* ... */);
    });
  
    return syntaxTree;
  }
  
// Remover código duplicado
// Bad
function showDeveloperList(developers) {
    developers.forEach(developer => {
      const expectedSalary = developer.calculateExpectedSalary();
      const experience = developer.getExperience();
      const githubLink = developer.getGithubLink();
      const data = {
        expectedSalary,
        experience,
        githubLink
      };
  
      render(data);
    });
  }
  
  function showManagerList(managers) {
    managers.forEach(manager => {
      const expectedSalary = manager.calculateExpectedSalary();
      const experience = manager.getExperience();
      const portfolio = manager.getMBAProjects();
      const data = {
        expectedSalary,
        experience,
        portfolio
      };
  
      render(data);
    });
  }  
// Good
function showEmployeeList(employees) {
    employees.forEach(employee => {
      const expectedSalary = employee.calculateExpectedSalary();
      const experience = employee.getExperience();
  
      const data = {
        expectedSalary,
        experience
      };
  
      switch (employee.type) {
        case "manager":
          data.portfolio = employee.getMBAProjects();
          break;
        case "developer":
          data.githubLink = employee.getGithubLink();
          break;
      }
  
      render(data);
    });
  }

// Defina Objetos padrão com Object.assign
// Bad
const menuConfig = {
    title: null,
    body: "Bar",
    buttonText: null,
    cancellable: true
  };
  
  function createMenu(config) {
    config.title = config.title || "Foo";
    config.body = config.body || "Bar";
    config.buttonText = config.buttonText || "Baz";
    config.cancellable =
      config.cancellable !== undefined ? config.cancellable : true;
  }
  
  createMenu(menuConfig);
// Good
const menuConfig = {
    title: "Order",
    // User did not include 'body' key
    buttonText: "Send",
    cancellable: true
  };
  
  function createMenu(config) {
    let finalConfig = Object.assign(
      {
        title: "Foo",
        body: "Bar",
        buttonText: "Baz",
        cancellable: true
      },
      config
    );
    return finalConfig
    // config now equals: {title: "Order", body: "Bar", buttonText: "Send", cancellable: true}
    // ...
  }
  
  createMenu(menuConfig);

// Don't use flags as function parameters
// Bad
function createFile(name, temp) {
    if (temp) {
      fs.create(`./temp/${name}`);
    } else {
      fs.create(name);
    }
  }
// Good
function createFile(name) {
    fs.create(name);
  }
  
  function createTempFile(name) {
    createFile(`./temp/${name}`);
  }
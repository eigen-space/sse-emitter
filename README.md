# About

This is a simple SSE emitter service which sends events.
1. Easily integrates with Express
2. Generates ids for messages automatically
3. Provides endless connection
4. Reduces any delays in data transportation
5. Triggers default event handler `onmessage`

# Usage

1. Create an instance:
    ```
    private sseEmitter = new SseEmitter();
    ```
2. Assign it on a GET-route:
    ```
    this.app.get(environment.routes.events.base, this.sseEmitter.init.bind(this.sseEmitter));
    ```
3. Send any messages in any structure you need:
    ```
    this.sseEmitter.send({ 
        type: 'ON_ENTITY_SAVED', 
        content: { id: 228, name: 'Nikita' }
    });
    ```
4. On the client side you will get a message as described above. You should
   just add a handler on the default `message` event. For instance, on
   browser implementation it is:
   ```
   this.sseEmitter.onmessage = (event) => console.log(event.data)
   ``` 

# Why do we have that dependencies?

* `@eigenspace/logger` - logs actions in the server.

# Why do we have that dev dependencies?

* `@eigenspace/common-types` - common types such as dictionary, etc.
* `@eigenspace/codestyle` - includes lint rules, config for typescript.
* `@eigenspace/commit-linter` - linter for commit messages.
* `@eigenspace/helper-scripts` - is used for publish package.
* `@types/*` - contains type definitions for specific library.
* `clean-webpack-plugin` - it's used for clean bundle before run building.
* `ts-loader` - it's used to load typescript code with webpack.
* `typescript` - is a superset of JavaScript that have static type-checking and ECMAScript features.
* `husky` - used for configure git hooks.
* `eslint` - it checks code for readability, maintainability, and functionality errors.
* `eslint-plugin-eigenspace-script` - includes set of script linting rules and configuration for them.
* `lint-staged` - used for configure linters against staged git files.
* `webpack` - it creates app bundle for dev. mode and production.
* `copy-webpack-plugin` - used for copying mocks to dev server.
* `webpack-cli` - cli for webpack, provides commands for tasks.

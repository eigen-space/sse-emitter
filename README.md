# About

This is a simple SSE service.
1. It generates ids for messages automatically
2. It provides endless connection
3. It reduces any delays in data transportation
4. It triggers default event handler `onmessage`

# Message

```
{
    type: 'string',
    content: Dictionary
}
```

# Usage

1. Create an instance:
    ```
    private eventsAppService = new EventsAppService();
    ```
2. Assign it on a get route:
    ```
    this.app.get(environment.routes.events.base, this.eventsAppService.init.bind(this.eventsAppService));
    ```
3. Send any messages in the following structure:
    ```
    this.eventsAppService.send({ 
        type: 'ON_ENTITY_SAVED', 
        content: { id: 228, name: 'Nikita' }
    });
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

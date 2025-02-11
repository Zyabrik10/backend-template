# Root Level Structure

At the root level are essential configuration files like package.json, README.md, .envand .gitignore. These files provide project metadata, documentation, and version control information.

## Entry Point

`./src/app.js` - entry point

```
/project-name/src
|-- app.js
|-- ...
```

## Controllers

Separate concerns by placing controllers in a controllers directory. Each controller should handle a specific aspect of your application's business logic.

```
/project-name/src
|-- controllers
|   |-- user.controller.js
|   |-- auth.controller.js
|   |-- ...
|-- ...

```

## Models

Store database models in a models directory. If you're using an ORM like Sequelize, place model definitions here.

```
/project-name/src
|-- models
|   |-- index.js
|   |-- User.js
|   |-- Post.js
|   |-- ...
|-- ...

```

## Routes

Keep route definitions in a routes directory. Organize routes based on features or entities they represent.

```
/my-nodejs-app/src
|-- routes
|   |-- index.js
|   |-- user.routes.js
|   |-- auth.routes.js
|   |-- ...
|-- ...
```

## Services

For reusable business logic or external service integrations like Stripe for payment or AWS s3 for object storage, create a services directory.

```
/project-name/src
|-- services
|   |-- email.service.js
|   |-- payment.service.js
|   |-- ...
|-- ...
```

## Middlewares

Place middleware functions in a middlewares directory. These functions can include logging, authentication, error handling, etc.

```
/project-name/src
|-- middlewares
|   |-- logging.middleware.js
|   |-- auth.middleware.js
|   |-- ...
|-- ...
```

## Utilities

```
/project-name/src
|-- utils
|   |-- helperFunctions.js
|   |-- constants.js
|   |-- ...
|-- ...
```

## Configuration Files

Keep configuration files in a config directory. This includes environment-specific configurations for databases, third-party services, and settings.

```
/project-name/src
|-- config
|   |-- database.config.js
|   |-- server.config.js
|   |-- ...
|-- ...
```

## Tests

Separate test files from source code. Place them in a tests or __tests__ directory.

```
/project-name/src
|-- __tests__
|   |-- userController.test.js
|   |-- ...
|-- ...
```

---

| File | Purpose |
| ---- | ------- |
| routes/todo.routes.js | Defines API endpoints, keeps it clean by delegating logic to controllers |
| controllers/todo.controller.js | Handles business logic (e.g., modifying data, returning responses) |
| middleware/todo.middleware.js | Handles pre-route checks (e.g., finding a todo, validation, authentication) |


---

- `Middleware` → Used for request preprocessing (e.g., checking if a todo exists before passing it to controllers).
- `Controllers` → Contain logic like creating, updating, or deleting todos.
- `Routes` → Just define API endpoints and connect them to controllers.

# Restaurant Menu GraphQL API

A GraphQL API for managing restaurant menu data built with Node.js and Apollo Server.

## Features

- GraphQL API endpoints for menu management
- Categories and menu items CRUD operations
- Automated testing with Jest
- GraphQL Playground for API exploration
- Proper error handling and validation
- Development mode with hot reloading

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/restaurant-menu-api.git
cd restaurant-menu-api
```

2. Install dependencies:

```bash
npm install
```

## Running the Application

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

The server will start at `http://localhost:4000`

## Testing

Run the automated tests:

```bash
npm test
```

Run tests with coverage:

```bash
npm test -- --coverage
```

## API Usage

You can access the GraphQL playground at `http://localhost:4000` in development mode.

### Example Queries

#### Get All Categories

```graphql
query GetAllCategories {
  categories {
    id
    name
    items {
      id
      name
      description
      price
    }
  }
}
```

#### Get Specific Menu Item

```graphql
query GetMenuItem {
  menuItem(id: "wedge-salad") {
    name
    description
    price
  }
}
```

#### Add New Menu Item

```graphql
mutation AddMenuItem {
  addMenuItem(
    categoryId: "appetizers"
    name: "Garlic Bread"
    description: "Toasted bread with garlic butter"
    price: 5.95
  ) {
    id
    name
    description
    price
  }
}
```

### Using Apollo Sandbox

1. Visit [Apollo Sandbox](https://studio.apollographql.com/sandbox/explorer)
2. Enter your local server URL (`http://localhost:4000`)
3. Use the Explorer to build and test queries
4. Execute operations using the Play button

## Project Structure

```
restaurant-menu-api/
├── src/
│   ├── index.js          # Server entry point
│   ├── schema.js         # GraphQL schema definitions
│   ├── resolvers.js      # GraphQL resolvers
│   └── data/
│       └── menuData.js   # Menu data store
├── tests/
│   └── menu.test.js      # Automated tests
├── package.json
└── README.md
```

## Available Scripts

- `npm start`: Start the production server
- `npm run dev`: Start development server with hot reloading
- `npm test`: Run tests
- `npm test -- --coverage`: Run tests with coverage report

## Schema Overview

### Types

- `MenuItem`: Represents a single menu item
- `Category`: Represents a menu category containing items
- `Query`: Available query operations
- `Mutation`: Available mutation operations

### Main Operations

#### Queries

- `categories`: Get all menu categories
- `category(id: ID!)`: Get a specific category
- `menuItems`: Get all menu items
- `menuItem(id: ID!)`: Get a specific menu item

#### Mutations

- `addCategory`: Create a new category
- `addMenuItem`: Add a new menu item
- `updateMenuItem`: Update an existing menu item
- `deleteMenuItem`: Remove a menu item

## Error Handling

The API includes proper error handling for:

- Invalid operations
- Non-existent items
- Validation errors
- Server errors

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details

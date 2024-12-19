const { gql } = require("apollo-server");

const typeDefs = gql`
  type MenuItem {
    id: ID!
    name: String!
    description: String
    price: Float
    note: String
    category: Category!
  }

  type Size {
    name: String!
    price: Float!
  }

  type UpgradeOptions {
    price: Float!
    items: [String!]!
  }

  type SandwichOptions {
    bread: [String!]
    sizes: [Size!]
  }

  type CategoryOptions {
    sides: [String!]
    upgrades: UpgradeOptions
    bread: [String!]
    tortillas: [String!]
  }

  type Subcategory {
    id: ID!
    name: String!
    description: String
    options: SandwichOptions
    items: [MenuItem!]!
  }

  type Category {
    id: ID!
    name: String!
    description: String
    basePrice: Float
    options: CategoryOptions
    items: [MenuItem!]
    subcategories: [Subcategory!]
  }

  type Query {
    categories: [Category!]!
    category(id: ID!): Category
    subcategory(id: ID!): Subcategory

    menuItems: [MenuItem!]!
    menuItem(id: ID!): MenuItem
    menuItemsByCategory(categoryId: ID!): [MenuItem!]!

    sandwiches: Category
    hotSandwiches: [MenuItem!]!
    coldSandwiches: [MenuItem!]!

    availableSides: [String!]!
    availableUpgrades: [String!]!
  }

  type Mutation {
    addCategory(name: String!, description: String, basePrice: Float): Category!

    updateCategory(
      id: ID!
      name: String
      description: String
      basePrice: Float
    ): Category!

    deleteCategory(id: ID!): Boolean!

    addMenuItem(
      categoryId: ID!
      name: String!
      description: String
      price: Float
      note: String
    ): MenuItem!

    updateMenuItem(
      id: ID!
      name: String
      description: String
      price: Float
      note: String
    ): MenuItem!

    deleteMenuItem(id: ID!): Boolean!

    addCategoryOption(
      categoryId: ID!
      optionType: String!
      value: String!
    ): Category!

    removeCategoryOption(
      categoryId: ID!
      optionType: String!
      value: String!
    ): Category!
  }
`;

module.exports = { typeDefs };

const { resolvers } = require("../src/resolvers");

const mockMenuData = {
  categories: [
    {
      id: "appetizers",
      name: "Appetizers",
      items: [
        {
          id: "wedge-salad",
          name: "Iceberg Wedge Salad with House Cured Bacon",
          description: "tomato salsa gorgonzola",
          price: 7.5,
        },
        {
          id: "brussels-sprouts",
          name: "Sautéed Shredded Brussels Sprouts",
          description: "bacon hazelnuts gorgonzola",
          price: 6.95,
        },
      ],
    },
    {
      id: "entrees",
      name: "Entrees",
      items: [
        {
          id: "farfalle-pasta",
          name: "Farfalle Pasta with Braised Pork in Tomato Cream",
          description: "capers butternut squash kale",
          price: 12.95,
        },
      ],
    },
  ],
};

describe("Menu API Resolvers", () => {
  const context = { menuData: mockMenuData };

  describe("Query Resolvers", () => {
    describe("categories", () => {
      it("should return all categories", () => {
        const result = resolvers.Query.categories(null, {}, context);
        expect(result).toEqual(mockMenuData.categories);
        expect(result).toHaveLength(2);
      });
    });

    describe("category", () => {
      it("should return a specific category by id", () => {
        const result = resolvers.Query.category(
          null,
          { id: "appetizers" },
          context
        );
        expect(result).toEqual(mockMenuData.categories[0]);
      });

      it("should return null for non-existent category", () => {
        const result = resolvers.Query.category(
          null,
          { id: "non-existent" },
          context
        );
        expect(result).toBeUndefined();
      });
    });

    describe("menuItems", () => {
      it("should return all menu items across categories", () => {
        const result = resolvers.Query.menuItems(null, {}, context);
        expect(result).toHaveLength(3); // 2 appetizers + 1 entree
      });
    });

    describe("menuItem", () => {
      it("should return a specific menu item by id", () => {
        const result = resolvers.Query.menuItem(
          null,
          { id: "wedge-salad" },
          context
        );
        expect(result).toEqual(mockMenuData.categories[0].items[0]);
      });

      it("should return null for non-existent menu item", () => {
        const result = resolvers.Query.menuItem(
          null,
          { id: "non-existent" },
          context
        );
        expect(result).toBeNull();
      });
    });
  });

  describe("Mutation Resolvers", () => {
    describe("addCategory", () => {
      it("should add a new category", () => {
        const newCategory = {
          name: "Desserts",
          description: "Sweet treats",
          basePrice: null,
        };

        const result = resolvers.Mutation.addCategory(
          null,
          newCategory,
          context
        );
        expect(result).toMatchObject({
          id: "desserts",
          ...newCategory,
          items: [],
        });
      });
    });

    describe("addMenuItem", () => {
      it("should add a new menu item to a category", () => {
        const newItem = {
          categoryId: "appetizers",
          name: "New Appetizer",
          description: "Test description",
          price: 9.99,
        };

        const result = resolvers.Mutation.addMenuItem(null, newItem, context);
        expect(result).toMatchObject({
          id: "new-appetizer",
          name: newItem.name,
          description: newItem.description,
          price: newItem.price,
        });
      });

      it("should throw error for invalid category", () => {
        const newItem = {
          categoryId: "invalid",
          name: "Test Item",
        };

        expect(() => {
          resolvers.Mutation.addMenuItem(null, newItem, context);
        }).toThrow("Category not found");
      });
    });

    describe("updateMenuItem", () => {
      it("should update an existing menu item", () => {
        const updates = {
          id: "wedge-salad",
          price: 8.5,
        };

        const result = resolvers.Mutation.updateMenuItem(
          null,
          updates,
          context
        );
        expect(result.price).toBe(8.5);
      });

      it("should throw error for non-existent menu item", () => {
        const updates = {
          id: "non-existent",
          price: 9.99,
        };

        expect(() => {
          resolvers.Mutation.updateMenuItem(null, updates, context);
        }).toThrow("Menu item not found");
      });
    });
  });

  describe("Type Resolvers", () => {
    describe("MenuItem.category", () => {
      it("should resolve category for menu item", () => {
        const menuItem = mockMenuData.categories[0].items[0];
        const result = resolvers.MenuItem.category(menuItem, {}, context);
        expect(result).toEqual(mockMenuData.categories[0]);
      });
    });
  });

  describe("Edge Cases", () => {
    it("should handle empty categories", () => {
      const emptyContext = { menuData: { categories: [] } };
      const result = resolvers.Query.categories(null, {}, emptyContext);
      expect(result).toEqual([]);
    });

    it("should handle categories without items", () => {
      const noItemsContext = {
        menuData: {
          categories: [
            {
              id: "empty",
              name: "Empty Category",
            },
          ],
        },
      };
      const result = resolvers.Query.menuItems(null, {}, noItemsContext);
      expect(result).toEqual([]);
    });
  });
});

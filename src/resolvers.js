const resolvers = {
  Query: {
    categories: (_, __, { menuData }) => menuData.categories,

    category: (_, { id }, { menuData }) =>
      menuData.categories.find((cat) => cat.id === id),

    subcategory: (_, { id }, { menuData }) => {
      for (const category of menuData.categories) {
        if (category.subcategories) {
          const sub = category.subcategories.find((sub) => sub.id === id);
          if (sub) return sub;
        }
      }
      return null;
    },

    menuItems: (_, __, { menuData }) => {
      const items = [];
      menuData.categories.forEach((category) => {
        if (category.items) {
          items.push(...category.items);
        }
        if (category.subcategories) {
          category.subcategories.forEach((sub) => {
            if (sub.items) {
              items.push(...sub.items);
            }
          });
        }
      });
      return items;
    },

    menuItem: (_, { id }, { menuData }) => {
      for (const category of menuData.categories) {
        if (category.items) {
          const item = category.items.find((item) => item.id === id);
          if (item) return item;
        }
        if (category.subcategories) {
          for (const sub of category.subcategories) {
            if (sub.items) {
              const item = sub.items.find((item) => item.id === id);
              if (item) return item;
            }
          }
        }
      }
      return null;
    },

    menuItemsByCategory: (_, { categoryId }, { menuData }) => {
      const category = menuData.categories.find((cat) => cat.id === categoryId);
      return category ? category.items || [] : [];
    },

    sandwiches: (_, __, { menuData }) =>
      menuData.categories.find((cat) => cat.id === "sandwiches"),

    hotSandwiches: (_, __, { menuData }) => {
      const sandwichCategory = menuData.categories.find(
        (cat) => cat.id === "sandwiches"
      );
      const hotSandwiches = sandwichCategory?.subcategories?.find(
        (sub) => sub.id === "hot-sandwiches"
      );
      return hotSandwiches?.items || [];
    },

    coldSandwiches: (_, __, { menuData }) => {
      const sandwichCategory = menuData.categories.find(
        (cat) => cat.id === "sandwiches"
      );
      const coldSandwiches = sandwichCategory?.subcategories?.find(
        (sub) => sub.id === "cold-sandwiches"
      );
      return coldSandwiches?.items || [];
    },

    availableSides: (_, __, { menuData }) => {
      const allSides = new Set();
      menuData.categories.forEach((category) => {
        if (category.options?.sides) {
          category.options.sides.forEach((side) => allSides.add(side));
        }
      });
      return Array.from(allSides);
    },

    availableUpgrades: (_, __, { menuData }) => {
      const allUpgrades = new Set();
      menuData.categories.forEach((category) => {
        if (category.options?.upgrades?.items) {
          category.options.upgrades.items.forEach((upgrade) =>
            allUpgrades.add(upgrade)
          );
        }
      });
      return Array.from(allUpgrades);
    },
  },

  Mutation: {
    addCategory: (_, { name, description, basePrice }, { menuData }) => {
      const newCategory = {
        id: name.toLowerCase().replace(/\s+/g, "-"),
        name,
        description,
        basePrice,
        items: [],
      };
      menuData.categories.push(newCategory);
      return newCategory;
    },

    updateCategory: (_, { id, ...updates }, { menuData }) => {
      const categoryIndex = menuData.categories.findIndex(
        (cat) => cat.id === id
      );
      if (categoryIndex === -1) throw new Error("Category not found");

      menuData.categories[categoryIndex] = {
        ...menuData.categories[categoryIndex],
        ...updates,
      };
      return menuData.categories[categoryIndex];
    },

    deleteCategory: (_, { id }, { menuData }) => {
      const initialLength = menuData.categories.length;
      menuData.categories = menuData.categories.filter((cat) => cat.id !== id);
      return menuData.categories.length !== initialLength;
    },

    addMenuItem: (_, { categoryId, ...itemData }, { menuData }) => {
      const category = menuData.categories.find((cat) => cat.id === categoryId);
      if (!category) throw new Error("Category not found");

      const newItem = {
        id: itemData.name.toLowerCase().replace(/\s+/g, "-"),
        ...itemData,
        category: categoryId,
      };

      if (!category.items) category.items = [];
      category.items.push(newItem);
      return newItem;
    },

    updateMenuItem: (_, { id, ...updates }, { menuData }) => {
      for (const category of menuData.categories) {
        if (category.items) {
          const itemIndex = category.items.findIndex((item) => item.id === id);
          if (itemIndex !== -1) {
            category.items[itemIndex] = {
              ...category.items[itemIndex],
              ...updates,
            };
            return category.items[itemIndex];
          }
        }
      }
      throw new Error("Menu item not found");
    },

    deleteMenuItem: (_, { id }, { menuData }) => {
      for (const category of menuData.categories) {
        if (category.items) {
          const initialLength = category.items.length;
          category.items = category.items.filter((item) => item.id !== id);
          if (category.items.length !== initialLength) return true;
        }
      }
      return false;
    },

    addCategoryOption: (_, { categoryId, optionType, value }, { menuData }) => {
      const category = menuData.categories.find((cat) => cat.id === categoryId);
      if (!category) throw new Error("Category not found");

      if (!category.options) category.options = {};
      if (!category.options[optionType]) category.options[optionType] = [];

      if (!category.options[optionType].includes(value)) {
        category.options[optionType].push(value);
      }

      return category;
    },

    removeCategoryOption: (
      _,
      { categoryId, optionType, value },
      { menuData }
    ) => {
      const category = menuData.categories.find((cat) => cat.id === categoryId);
      if (!category) throw new Error("Category not found");

      if (category.options?.[optionType]) {
        category.options[optionType] = category.options[optionType].filter(
          (option) => option !== value
        );
      }

      return category;
    },
  },

  MenuItem: {
    category: (menuItem, _, { menuData }) => {
      return menuData.categories.find(
        (cat) =>
          cat.items?.some((item) => item.id === menuItem.id) ||
          cat.subcategories?.some((sub) =>
            sub.items?.some((item) => item.id === menuItem.id)
          )
      );
    },
  },
};

module.exports = { resolvers };

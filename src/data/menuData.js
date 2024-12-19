const menuData = {
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
        {
          id: "kale-salad",
          name: "Kale Salad",
          description: "parmesan crisp corn radish garlic-lemon vinaigrette",
          price: 7.5,
        },
        {
          id: "goat-cheese",
          name: "Pecan Crusted Utah Goat Cheese with Basil-Mint Pesto",
          description: "grilled tomato salsa crostini",
          price: 6.95,
        },
        {
          id: "eggrolls",
          name: "Chicken and Cabbage Eggrolls",
          description: "hot & sour dipping sauce",
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
        {
          id: "bratwurst",
          name: "Stout Braised Bratwurst",
          description:
            "horseradish mashed potatoes roasted root veggies grilled onion",
          price: 13.95,
        },
        {
          id: "salmon-tofu",
          name: "Salmon & Crispy Tofu in Yellow Curry Sauce",
          description: "vegetable sauté golden raisin chutney",
          price: 15.95,
        },
        {
          id: "sesame-shrimp",
          name: "Sesame Shrimp",
          description:
            "udon noodles ramen broth shiitake mushrooms bean sprouts scallions",
          price: 13.95,
        },
      ],
    },
    {
      id: "sandwiches",
      name: "Sandwiches",
      description:
        "Served with choice of house pasta salad, green salad, or fresh fruit.",
      options: {
        sides: ["house pasta salad", "green salad", "fresh fruit"],
        upgrades: {
          price: 1.5,
          items: [
            "½ pasta salad of the day",
            "French onion soup",
            "soup of the day",
          ],
        },
      },
      subcategories: [
        {
          id: "cold-sandwiches",
          name: "Cold Sandwiches",
          description: "Choice of sourdough, whole wheat, or rye bread",
          options: {
            bread: ["sourdough", "whole wheat", "rye"],
            sizes: [
              { name: "half", price: 7.95 },
              { name: "full", price: 9.25 },
            ],
          },
          items: [
            {
              id: "turkey-avocado",
              name: "Turkey & Avocado",
              description: "with tomato",
            },
            {
              id: "pub-club",
              name: "Pub Club",
              description: "turkey, bacon, lettuce, tomato",
            },
            {
              id: "roast-beef-swiss",
              name: "Rare Roast Beef & Swiss",
              description: "sweet-hot mustard, lettuce, red onion",
            },
            {
              id: "veggie",
              name: "Veggie",
              description: "pepper jack, avocado, sprout, tomato",
            },
          ],
        },
        {
          id: "hot-sandwiches",
          name: "Hot Sandwiches",
          description: "Choice of whole wheat or cheese & onion bun",
          options: {
            bread: ["whole wheat bun", "cheese & onion bun"],
          },
          items: [
            {
              id: "southwest-chicken",
              name: "Southwest Chicken Breast",
              description:
                "Grilled Onion, Poblano Pepper, Tomato, Lettuce, Jack Cheese",
              price: 9.5,
            },
            {
              id: "portobello",
              name: "Portobello Fresh Mozzarella",
              description:
                "Caramelized Onion, Roasted Pepper, Tomato, Field Greens, Basil Aioli",
              price: 9.5,
            },
            {
              id: "bbq-pork",
              name: "Chipotle BBQ Pork Sandwich",
              description: "with Pickled Jalapeño Slaw",
              price: 9.5,
            },
            {
              id: "bacon-burger",
              name: "Bacon Burger",
              description: "Swiss, Lettuce, Tomato",
              price: 9.25,
              note: "* Consumer advisory note",
            },
          ],
        },
      ],
    },
    {
      id: "soup-salad-combos",
      name: "Soup & Salad Combos",
      items: [
        {
          id: "soup",
          name: "French Onion or Soup of the Day",
          price: 4.95,
        },
        {
          id: "soup-combo-1",
          name: "Soup with Side",
          description: "with small green salad, fresh fruit or house pasta",
          price: 7.25,
        },
        {
          id: "soup-combo-2",
          name: "Soup with Pasta",
          description: "with half pasta of the day",
          price: 8.75,
        },
      ],
    },
    {
      id: "fajitas",
      name: "Fajitas",
      description:
        "Served with red rice, black beans, grilled tomato salad, choice of corn or flour tortillas",
      basePrice: 10.95,
      options: {
        tortillas: ["corn", "flour"],
      },
      items: [
        {
          id: "chicken-fajitas",
          name: "Chicken Fajitas",
          description:
            "Chicken Onions, Poblano and Bell Peppers, Guacamole, Two Salsas",
        },
        {
          id: "steak-fajitas",
          name: "Sirloin Steak Fajitas",
          description:
            "Onions, Poblano and Bell Peppers, Carrots, Onion, Guacamole, Two Salsas",
        },
      ],
    },
    {
      id: "tacos",
      name: "Tacos",
      description:
        "Served with red rice, black beans, corn & romaine salad, tortilla chips",
      basePrice: 9.95,
      items: [
        {
          id: "fish-tacos",
          name: "Beer Battered Fish",
          description: "with Jalapeño Remoulade, Roasted Salsa, Cabbage",
        },
        {
          id: "carne-asada-tacos",
          name: "Carne Asada",
          description: "marinated sirloin with Guacamole, Tomatillo Salsa",
        },
      ],
    },
  ],
};

module.exports = { menuData };

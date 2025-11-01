// More info about enabling, testing, and submitting mods: https://R74ncom.github.io/InfiniteChef-Mods/

// Jerky Mod - Adds various types of dried meat jerky

// Base jerky ingredient
addIngredient("jerky_base", {
    color: "#8B4513", // saddle brown
    innerColor: "#654321", // dark brown
    type: "meat",
    shape: "rectangle_rounded",
    tempMin: 40,
    tempMax: 200
});

// Beef Jerky
addIngredient("beef_jerky", {
    color: "#5C4033", // dark brown
    innerColor: "#8B4513", // saddle brown
    type: "jerky_base",
    shape: "meat_strip",
    reactions: {
        salt: { set1: "salted_beef_jerky" },
        spice: { set1: "spicy_beef_jerky" }
    }
});

// Spicy Beef Jerky
addIngredient("spicy_beef_jerky", {
    color: "#8B0000", // dark red
    innerColor: "#A52A2A", // brown
    type: "beef_jerky",
    shape: "meat_strip",
    reactions: {
        honey: { set1: "sweet_spicy_jerky" }
    }
});

// Salted Beef Jerky
addIngredient("salted_beef_jerky", {
    color: "#D2B48C", // tan
    innerColor: "#8B4513", // saddle brown
    type: "beef_jerky",
    shape: "meat_strip"
});

// Sweet & Spicy Jerky
addIngredient("sweet_spicy_jerky", {
    color: "#B22222", // firebrick
    innerColor: "#8B4513", // saddle brown
    type: "spicy_beef_jerky",
    shape: "meat_strip"
});

// Turkey Jerky
addIngredient("turkey_jerky", {
    color: "#DEB887", // burlywood
    innerColor: "#F5DEB3", // wheat
    type: "jerky_base",
    shape: "meat_strip_thin",
    reactions: {
        spice: { set1: "spicy_turkey_jerky" },
        herb: { set1: "herbed_turkey_jerky" }
    }
});

// Spicy Turkey Jerky
addIngredient("spicy_turkey_jerky", {
    color: "#CD853F", // peru
    innerColor: "#F5DEB3", // wheat
    type: "turkey_jerky",
    shape: "meat_strip_thin"
});

// Herbed Turkey Jerky
addIngredient("herbed_turkey_jerky", {
    color: "#556B2F", // dark olive green
    innerColor: "#F5DEB3", // wheat
    type: "turkey_jerky",
    shape: "meat_strip_thin"
});

// Fish Jerky
addIngredient("fish_jerky", {
    color: "#F0E68C", // khaki
    innerColor: "#FFF8DC", // cornsilk
    type: "jerky_base",
    shape: "fish_body",
    reactions: {
        salt: { set1: "salted_fish_jerky" },
        lemon: { set1: "lemon_fish_jerky" }
    }
});

// Salted Fish Jerky
addIngredient("salted_fish_jerky", {
    color: "#F5F5DC", // beige
    innerColor: "#FFF8DC", // cornsilk
    type: "fish_jerky",
    shape: "fish_body"
});

// Lemon Fish Jerky
addIngredient("lemon_fish_jerky", {
    color: "#FFD700", // gold
    innerColor: "#FFF8DC", // cornsilk
    type: "fish_jerky",
    shape: "fish_body"
});

// Jerky Recipes

// Basic beef jerky recipe (meat + salt + drying)
addRecipe("meat+salt+&heat:low+&time:30", "beef_jerky");

// Spicy beef jerky
addRecipe("beef_jerky+spice", "spicy_beef_jerky");

// Turkey jerky
addRecipe("turkey+salt+&heat:low+&time:25", "turkey_jerky");

// Fish jerky
addRecipe("fish+salt+&heat:low+&time:20", "fish_jerky");

// Sweet and spicy jerky
addRecipe("spicy_beef_jerky+honey", "sweet_spicy_jerky");

// Herbed turkey jerky
addRecipe("turkey_jerky+herb", "herbed_turkey_jerky");

// Lemon fish jerky
addRecipe("fish_jerky+lemon", "lemon_fish_jerky");

// Stack mode recipes for mass production
addRecipe("&stack:meat+salt+&heat:low", "beef_jerky");
addRecipe("&stack:turkey+salt+&heat:low", "turkey_jerky");
addRecipe("&stack:fish+salt+&heat:low", "fish_jerky");

// Jerky drying rack tool
addTool("drying_rack", {
    func: function(placed) {
        if (placed.type === "meat" || placed.type === "turkey" || placed.type === "fish") {
            placed.temp = 50; // Low consistent temperature for drying
            placed.timer = placed.timer ? placed.timer + 1 : 1;
            
            // Convert to jerky after sufficient time
            if (placed.timer > 25) {
                if (placed.type === "meat") placed.type = "beef_jerky";
                else if (placed.type === "turkey") placed.type = "turkey_jerky";
                else if (placed.type === "fish") placed.type = "fish_jerky";
            }
        }
    },
    onSelect: function() { console.log("Drying rack selected - place meat on it to make jerky!"); },
    shape: "rack",
    spin: false,
    color: "#8B4513"
});

// Jerky seasoning tool
addTool("jerky_seasoner", {
    func: function(placed) {
        if (placed.type.includes("jerky")) {
            // Add visual effect for seasoning
            placed.color = "#" + Math.floor(Math.random()*16777215).toString(16);
        }
    },
    onSelect: function() { console.log("Seasoning tool - use on jerky to add flavor!"); },
    shape: "shaker",
    spin: true,
    color: "#FFD700"
});

// Edit existing meat to work better with jerky recipes
editIngredient("meat", {
    reactions: {
        salt: { set1: "salted_meat", tempMin: 40 },
        "drying_rack": { set1: "beef_jerky", timeMin: 25 }
    }
});

editIngredient("turkey", {
    reactions: {
        salt: { set1: "salted_turkey", tempMin: 40 },
        "drying_rack": { set1: "turkey_jerky", timeMin: 20 }
    }
});

editIngredient("fish", {
    reactions: {
        salt: { set1: "salted_fish", tempMin: 40 },
        "drying_rack": { set1: "fish_jerky", timeMin: 15 }
    }
});

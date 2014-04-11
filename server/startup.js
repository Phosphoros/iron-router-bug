Meteor.startup(function() {
  if (Pizze.find().count() <= 0) {
    var pizze = ["Funghi", "Margherita", "Salame", "Prosciutto", "Prosciutto e Funghi", "Parma", "Napoli", "Tonno"];
    pizze.forEach(function(name) {
      Pizze.insert({
        name: name
      });
    });
  }

  if (Burgers.find().count() <= 0) {
    var burgers = ["Hamburger", "Cheeseburger", "Bacon Cheesburger", "Double Cheeseburger", "Death by Bacon", "Bacon & Egg Burger",
      "Chicken Burger"
    ];
    burgers.forEach(function(name) {
      Burgers.insert({
        name: name
      });
    });
  }
});
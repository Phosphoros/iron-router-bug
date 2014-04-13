Meteor.methods({
  'buy-pizza': function(pizzaId) {
    Pizze.update({
      _id: pizzaId
    }, {
      $inc: {
        clicked: 1
      }
    });
  },
  'buy-burger': function(burgerId) {
    Burgers.update({
      _id: burgerId
    }, {
      $inc: {
        clicked: 1
      }
    });
  }
});
var Fiber = Meteor.require('fibers');

function sleep(ms) {
  var fiber = Fiber.current;
  setTimeout(function() {
    fiber.run();
  }, ms);
  Fiber.yield();
}

Meteor.publish("burgers", function() {
  sleep(1000);
  return Burgers.find();
});

Meteor.publish("singleBurger", function(_id) {
  sleep(1000);
  return Burgers.find(_id);
});

Meteor.publish("pizze", function() {
  sleep(1000);
  return Pizze.find();
});

Meteor.publish("pizza", function(_id) {
  sleep(1000);
  return Pizze.find(_id);
});
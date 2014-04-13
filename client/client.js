Session.set("documentsPerPage", 3);
Session.set("maxSize", 4);

Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading'
});

Router.map(function() {
  this.route("main", {
    path: "/",
    action: function() {
      Router.go("burgers");
    }
  });

  this.route('burgers', {
    waitOn: function() {
      return Meteor.subscribe("burgers");
    },
    action: function() {
      if (this.ready()) {
        this.render();
      }
    },
    data: function() {
      if (this.ready()) {
        var burgers = Burgers.find({}, {
          sort: {
            name: 1
          },
          skip: (this.params.page - 1) * Session.get("documentsPerPage"),
          limit: Session.get("documentsPerPage")
        });
        var pages = getPages(this.params.page, Burgers.find({}).count(), this.params, this.route.originalPath);

        return {
          burgers: burgers,
          pages: pages
        }
      }
    }
  });

  this.route('burger', {
    path: '/burgers/:_id',
    waitOn: function() {
      return Meteor.subscribe("singleBurger", this.params._id);
    },
    action: function() {
      if (this.ready()) {
        this.render();
      }
    },
    data: function() {
      return Burgers.findOne(this.params._id);
    }
  });

  this.route('pizze', {
    waitOn: function() {
      return Meteor.subscribe("pizze");
    },
    action: function() {
      if (this.ready()) {
        this.render();
      }
    },
    data: function() {
      if (this.ready()) {
        var pizze = Pizze.find({}, {
          sort: {
            name: 1
          },
          skip: (this.params.page - 1) * Session.get("documentsPerPage"),
          limit: Session.get("documentsPerPage")
        }).fetch();
        var pages = getPages(this.params.page, Pizze.find({}).count(), this.params, this.route.originalPath);

        return {
          pizze: pizze,
          pages: pages
        }
      }
    }
  });

  this.route('pizza', {
    path: '/pizze/:_id',
    waitOn: function() {
      return Meteor.subscribe("pizza", this.params._id);
    },
    action: function() {
      if (this.ready()) {
        this.render();
      }
    },
    data: function() {
      return Pizze.findOne(this.params._id);
    }
  });
});

Template.burgers.events({
  'click button': function(event) {
    Meteor.call("buy-burger", $(event.currentTarget).attr("burgerId"));
  }
});

Template.pizze.events({
  'click button': function(event) {
    Meteor.call("buy-pizza", $(event.currentTarget).attr("pizzaId"));
  }
});
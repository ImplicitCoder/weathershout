Meteor.methods({
  addShout: function (text, name){
    Shouts.insert({
      text: text,
      createdAt: new Date(),
      name: name
    });
  }
});

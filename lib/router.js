Router.configure({
  waitOn: function(){
    return [Meteor.subscribe('shouts')];
  }
})


Router.route('/', function () {
   this.render('Home');
});

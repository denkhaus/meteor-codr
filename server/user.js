

Accounts.onCreateUser(function(options, user) {
  var userProperties = {
     profile: options.profile || {},   
     isAdmin: false   
  };

  user = _.extend(user, userProperties);  

  if (options.email)
    user.profile.email = options.email;

  if (!user.profile.name)
    user.profile.name = user.username;
 
  if (!Meteor.users.find().count() )
    user.isAdmin = true;

  createDefaultSettings(user._id);	
  return user;
});
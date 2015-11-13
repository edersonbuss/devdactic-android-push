// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','ionic.service.core', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    
    
    var io = Ionic.io();
    var push = new Ionic.Push({
      "debug": true,
      "onNotification": function(notification) {
        alert('Received push notification!');
        var payload = notification.payload;
       console.log(notification, payload);
      },
       "onRegister": function(data) {
           console.log(data.token);
      },
      "pluginConfig": {
        "android": {
          "iconColor": "#0000FF"
        }
        
      }
    });
    var user = Ionic.User.current();
    
    if (!user.id) {
      user.id = Ionic.User.anonymousId();
    }
    
    // Just add some dummy data..
    user.set('name', 'Ederson');
    user.set('bio', 'This is my little bio');
    user.set('id_empresa', '12345');
    user.save();
    console.log("User saved:"+user);
    console.log("Ok teste 1");
   
    var callback = function(pushToken) {
      console.log("Device token:"+pushToken.token);
      alert("Device token:"+pushToken.token);
      //push.addTokenToUser(user);
      user.addPushToken(pushToken);
      var success = function (response) {
            console.log('user was saved');
        };

        var failure = function (error) {
            console.log('user was NOT saved' + error);
        };

        user.save().then(success, failure);
        console.log("Ok teste 2");
    };
    console.log("antes de push.register");
    push.register(callback);
    console.log("depois de push.register");
    
  
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});

//angular.module('starter.services', [])

app.service('LoginService', ['$http', 'ApiEndPoint', function($http, ApiEndPoint) {
    return {
        loginUser: function(name, pw) {
            return $http({
                method: 'POST',
                url: ApiEndPoint.url + '/user/login/',
                crossDomain:true,
                data: {
                    user: name,
                    password: pw
                }
            }).success(function(data) {
            }).error(function(data) {
            });
        }
    }
}]);

app.service('AccountService', ['$http', 'ApiEndPoint', function($http, ApiEndPoint) {
    return {
        getBalance: function(user) {
            return $http({
                method: 'POST',
                url: ApiEndPoint.url + '/account/getBalance/',
                crossDomain:true,
                data: {
                    user: user
                }
            }).success(function(data, status, headers, config) {
            }).error(function(data, status, headers, config) {
            });
        },
        getMovements: function(user) {
            return $http({
                method: 'POST',
                url: ApiEndPoint.url + '/account/getMovements/',
                crossDomain:true,
                data: {
                    user: user
                }
            }).success(function(data, status, headers, config) {
            }).error(function(data, status, headers, config) {
            });
        },
        completeMovement: function(movement) {
            return $http({
                method: 'POST',
                url: ApiEndPoint.url + '/account/completeMovement/',
                crossDomain: true,
                data: {
                    movement: movement
                }
            }).success(function(data, status, headers, config){

            }).error(function(data, status, headers, config){

            });
        },
        liquidation: function(movement) {
            return $http({
                method: 'POST',
                url: ApiEndPoint.url + '/account/liquidation/',
                crossDomain: true,
            }).success(function(data, status, headers, config){

            }).error(function(data, status, headers, config){

            });
        }
    }
}]);

app.factory('SessionService', ['$http', function($http){
  return {
      set:function(key,value){
        return localStorage.setItem(key,JSON.stringify(value));
      },
      get:function(key){
       return JSON.parse(localStorage.getItem(key));
      },
      destroy:function(key){
       return localStorage.removeItem(key);
      }
    };
}]);

app.factory('Chats', [function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
}]);

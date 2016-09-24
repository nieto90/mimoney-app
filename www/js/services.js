//angular.module('starter.services', [])

app.service('LoginService', ['$http', 'AccountService', function($http, AccountService) {
    return {
        loginUser: function(name, pw) {
            return $http({
                method: 'POST',
                url: 'http://192.168.0.159:8000/api' + '/user/login/',
                
                crossDomain:true,
                data: {
                    user: name,
                    password: pw
                }
            }).success(function(data) {
                return data;
            }).error(function(data) {
                //console.log(data);
            });
        }
    }
}]);

app.service('AccountService', ['$http',function($http) {
    return {
        getAccount: function(user) {
            return $http({
                method: 'POST',
                url: 'http://192.168.0.159:8000/api' + '/account/getAccount/',
                crossDomain:true,
                data: {
                    user: user
                }
            }).success(function(data, status, headers, config) {
                //console.log(data);
            }).error(function(data, status, headers, config) {
                //console.log(data);
            });
        },
        getMovements: function(user) {
            return $http({
                method: 'POST',
                url: 'http://192.168.0.159:8000/api' + '/account/getMovements/',
                crossDomain:true,
                data: {
                    user: user
                }
            }).success(function(data, status, headers, config) {
                //console.log(data);
            }).error(function(data, status, headers, config) {
                //console.log(data);
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

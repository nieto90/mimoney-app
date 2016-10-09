//angular.module('starter.services', [])

app.service('LoginService', ['$http', 'ApiEndPoint', function($http, ApiEndPoint) {
    return {
        loginUser: function(name, pw, ip) {
            return $http({
                method: 'POST',
                url: ApiEndPoint.url + ip + ApiEndPoint.port + '/api/user/login/',
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
        getBalance: function(user, ip) {
            return $http({
                method: 'POST',
                url: ApiEndPoint.url + ip + ApiEndPoint.port + '/api/account/getBalance/',
                crossDomain:true,
                data: {
                    user: user
                }
            }).success(function(data, status, headers, config) {
            }).error(function(data, status, headers, config) {
            });
        },
        getMovements: function(user, ip) {
            return $http({
                method: 'POST',
                url: ApiEndPoint.url + ip + ApiEndPoint.port + '/api/account/getMovements/',
                crossDomain:true,
                data: {
                    user: user
                }
            }).success(function(data, status, headers, config) {
            }).error(function(data, status, headers, config) {
            });
        },
        getAllMovements: function(user, ip) {
            return $http({
                method: 'POST',
                url: ApiEndPoint.url + ip + ApiEndPoint.port + '/api/account/getAllMovements/',
                crossDomain:true,
                data: {
                    user: user
                }
            }).success(function(data, status, headers, config) {
            }).error(function(data, status, headers, config) {
            });
        },
        completeMovement: function(movement, ip) {
            return $http({
                method: 'POST',
                url: ApiEndPoint.url + ip + ApiEndPoint.port + '/api/account/completeMovement/',
                crossDomain: true,
                data: {
                    movement: movement
                }
            }).success(function(data, status, headers, config){

            }).error(function(data, status, headers, config){

            });
        },
        liquidation: function(ip) {
            return $http({
                method: 'POST',
                url: ApiEndPoint.url + ip + ApiEndPoint.port + '/api/account/liquidation/',
                crossDomain: true,
            }).success(function(data, status, headers, config){

            }).error(function(data, status, headers, config){

            });
        },
        saveMovement: function(ip, data){
            return $http({
                method: 'POST',
                url: ApiEndPoint.url + ip + ApiEndPoint.port + '/api/account/saveMovement/',
                crossDomain: true,
                data: data
            }).success(function(data, status, headers, config){

            }).error(function(data, status, headers, config){

            });
        }
    }
}]);

app.service('CategoryService', ['$http', 'ApiEndPoint', function($http, ApiEndPoint){
    return {
      getCategories: function(ip){
        return $http({
          method: 'POST',
          url: ApiEndPoint.url + ip + ApiEndPoint.port + '/api/category/getCategories/',
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
      },
      exist: function(key){
        return localStorage.getItem(key) != 'undefined' && localStorage.getItem(key) != null;
      },
      empty: function(){
        localStorage.clear();
      }
    };
}]);

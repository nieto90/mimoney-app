//angular.module('starter.controllers', [])

app.controller('LoginCtrl', ['$scope', 'LoginService', 'SessionService', '$ionicPopup', '$state', function($scope, LoginService, SessionService, $ionicPopup, $state, $http) {
    $scope.data = {};

    $scope.login = function() {
        LoginService.loginUser($scope.data.username, $scope.data.password).success(function(data) {
            SessionService.set('user',data.user);
            $state.go('tab.dash');
        }).error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: data.title,
                template: data.message
            });
        });
    };
}]);

app.controller('DashCtrl', ['$scope', 'AccountService', 'SessionService', '$ionicPopup', function($scope, AccountService, SessionService, $ionicPopup) {
    $scope.account = {};
    AccountService.getAccount(SessionService.get('user').id).success(function(data){
      $scope.account = data.account;
    }).error(function(data){
      var alertPopup = $ionicPopup.alert({
          title: data.title,
          template: data.message
      });
    });
    AccountService.getMovements(SessionService.get('user').id).success(function(data){
      $scope.movements = data.movements;
    }).error(function(data){
      var alertPopup = $ionicPopup.alert({
          title: data.title,
          template: data.message
      });
    });
}]);

app.controller('ChatsCtrl', ['Chats', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
}]);

app.controller('ChatDetailCtrl', ['Chats', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
}]);

app.controller('AccountCtrl', [function($scope) {
  $scope.settings = {
    enableFriends: true
  };
}]);

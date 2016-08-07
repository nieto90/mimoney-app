//angular.module('starter.controllers', [])

app.controller('LoginCtrl', ['$scope', 'LoginService', '$ionicPopup', '$state', function($scope, LoginService, $ionicPopup, $state, $http) {
    $scope.data = {};

    $scope.login = function() {
        LoginService.loginUser($scope.data.username, $scope.data.password).success(function(data) {
            $scope.data = {};
            $scope.user = data.user;
            $state.go('tab.dash');
        }).error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: data.title,
                template: data.message
            });
        });
    };

    $scope.test = function(){
      console.log("1");
      console.log($scope.data);
    };
}]);

app.controller('DashCtrl', ['AccountService', function($scope, AccountService, $http) {
    $scope.account = {};
    AccountService.getAccount(AccountService.getUser).success(function(data){
        $scope.account = data.account;
        //console.log(data);
    }).error(function(data){
        console.log(data);
    });

    // $scope.login = function() {
    //     LoginService.loginUser($scope.data.username, $scope.data.password).success(function(data) {
    //         $scope.data = {};
    //         $scope.user = data.user;
    //         $state.go('tab.dash');
    //     }).error(function(data) {
    //       console.log(data);
    //         var alertPopup = $ionicPopup.alert({
    //             title: 'Login failed!',
    //             template: 'Please check your credentials!'
    //         });
    //     });
    // }
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

//angular.module('starter.controllers', [])

app.controller('LoginCtrl', ['$scope', 'LoginService', 'SessionService', '$ionicPopup', '$state', function($scope, LoginService, SessionService, $ionicPopup, $state, $http) {
    $scope.data = {};

    if (SessionService.get('user')) {
        $state.go('tab.dash');
    }

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

    if (SessionService.get('balance')) {
        $scope.balance = SessionService.get('balance');
    }

    if (SessionService.get('movements')) {
        $scope.movements = SessionService.get('movements');
    }

    AccountService.getBalance(SessionService.get('user').id).success(function(data){
      $scope.balance = data.balance;
      SessionService.set('balance', data.balance);
    }).error(function(data){
      var alertPopup = $ionicPopup.alert({
          title: data.title,
          template: data.message
      });
    });
    AccountService.getMovements(SessionService.get('user').id).success(function(data){
      $scope.movements = data.movements;
      SessionService.set('movements', data.movements);
    }).error(function(data){
      var alertPopup = $ionicPopup.alert({
          title: data.title,
          template: data.message
      });
    });

    $scope.showCompleteMovementPopUp = function(movement){
        var confirmPopup = $ionicPopup.confirm({
            title: 'Completar movimiento?',
            template: movement.amount + '€ en concepto de ' + movement.concept
        });

        confirmPopup.then(function(res) {
            if(res) {
                AccountService.completeMovement(movement.id).success(function(data){

                }).error(function(data){
                  var alertPopup = $ionicPopup.alert({
                      title: data.title,
                      template: data.message
                  });
                });
            }
        });
    };

    $scope.liquidation = function(){
        var confirmPopup = $ionicPopup.confirm({
            title: 'Liquidación',
            template: 'Quieres liquidar todos los movimientos?'
        });
        confirmPopup.then(function(res) {
            if(res) {
              AccountService.liquidation().success(function(data){
                $scope.movements = {};
                SessionService.set('movements', {});
                $scope.balance = {'in': 0, 'out': 0, 'total': 0};
                SessionService.set('balance', $scope.balance);
                var alertPopup = $ionicPopup.alert({
                    title: "Completado!",
                    template: "Has liquidado todos los movimientos."
                });
              }).error(function(data){
                var alertPopup = $ionicPopup.alert({
                    title: data.title,
                    template: data.message
                });
              });
            }
        });
    };
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

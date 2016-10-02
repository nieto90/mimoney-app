//angular.module('starter.controllers', [])

app.controller('LoginCtrl', ['$scope', 'LoginService', 'SessionService', '$ionicPopup', '$state', function($scope, LoginService, SessionService, $ionicPopup, $state, $http) {
    $scope.data = {};
    $scope.data.ip = 156;

    if (!SessionService.exist('ip')) {
        SessionService.set('ip', $scope.data.ip);
    }

    if (SessionService.exist('user')) {
        $state.go('tab.dash');
    }

    $scope.login = function() {
        LoginService.loginUser($scope.data.username, $scope.data.password, SessionService.get('ip')).success(function(data) {
            SessionService.set('user',data.user);
            $state.go('tab.dash');
        }).error(function(data) {
            if (data == null){
              var alertPopup = $ionicPopup.alert({
                  title: "404",
                  template: "La IP no es correcta"
              });
            } else{
              var alertPopup = $ionicPopup.alert({
                  title: data.title,
                  template: data.message
              });
            }
        });
    };

    $scope.changeIP = function(){
      var myPopup = $ionicPopup.show({
        template: '<input type="number" ng-model="data.ip" value="'+$scope.data.ip+'">',
        title: 'IP',
        subTitle: 'Asigna una nueva IP:',
        scope: $scope,
        buttons: [
          { text: 'Cancel' },
          {
            text: '<b>Save</b>',
            type: 'button-positive',
            onTap: function(e) {
              return $scope.data.ip;
            }
          }
        ]
      });
      myPopup.then(function(res) {
        if(res)
          SessionService.set('ip', res);
      });
    }
}]);

app.controller('DashCtrl', ['$scope', 'AccountService', 'SessionService', '$ionicPopup', 'ApiEndPoint', '$state', function($scope, AccountService, SessionService, $ionicPopup, ApiEndPoint, $state) {
    if (!SessionService.exist('user')) {
        $state.go('login');
    }

    $scope.url = ApiEndPoint.url + SessionService.get('ip') + ApiEndPoint.port;

    if (SessionService.exist('balance')) {
        $scope.balance = SessionService.get('balance');
    }

    if (SessionService.exist('movements')) {
        $scope.movements = SessionService.get('movements');
    }

    $scope.reload = function(){
      AccountService.getBalance(SessionService.get('user').id, SessionService.get('ip')).success(function(data){
        $scope.balance = data.balance;
        SessionService.set('balance', data.balance);
      }).error(function(data){
        var alertPopup = $ionicPopup.alert({
            title: data.title,
            template: data.message
        });
      });
      AccountService.getMovements(SessionService.get('user').id, SessionService.get('ip')).success(function(data){
        $scope.movements = data.movements;
        SessionService.set('movements', data.movements);
      }).error(function(data){
        var alertPopup = $ionicPopup.alert({
            title: data.title,
            template: data.message
        });
      });
      $scope.$broadcast('scroll.refreshComplete');
    };

    $scope.showCompleteMovementPopUp = function(movement){
        var confirmPopup = $ionicPopup.confirm({
            title: 'Completar movimiento?',
            template: movement.amount + '€ en concepto de ' + movement.concept
        });

        confirmPopup.then(function(res) {
            if(res) {
                AccountService.completeMovement(movement.id, SessionService.get('ip')).success(function(data){
                  $scope.reload();
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
              AccountService.liquidation(SessionService.get('ip')).success(function(data){
                $scope.movements = {};
                SessionService.set('movements', {});
                $scope.balance = {'in': 0, 'out': 0, 'total': 0};
                SessionService.set('balance', $scope.balance);
                var alertPopup = $ionicPopup.alert({
                    title: "Completado!",
                    template: "Has liquidado todos los movimientos."
                });
                $scope.reload();
              }).error(function(data){
                var alertPopup = $ionicPopup.alert({
                    title: data.title,
                    template: data.message
                });
              });
            }
        });
    };
    $scope.reload();
}]);

app.controller('ConfigCtrl', ['$scope', '$ionicPopup', 'SessionService', '$state', function($scope, $ionicPopup, SessionService, $state){
  $scope.data = {};
  $scope.data.ip = 0;
  $scope.changeIP = function(){
    if (SessionService.exist('ip')){
      $scope.data.ip = SessionService.get('ip');
    }
    var myPopup = $ionicPopup.show({
      template: '<input type="number" ng-model="data.ip" value="'+$scope.data.ip+'">',
      title: 'IP',
      subTitle: 'Asigna una nueva IP:',
      scope: $scope,
      buttons: [
        { text: 'Cancel' },
        {
          text: '<b>Save</b>',
          type: 'button-positive',
          onTap: function(e) {
            return $scope.data.ip;
          }
        }
      ]
    });
    myPopup.then(function(res) {
      if(res)
        SessionService.set('ip', res);
    });
  };
  $scope.logout = function(){
    SessionService.destroy('user');
    $state.go('login');
  };
}]);

app.controller('NewCtrl', ['$scope', '$state', 'CategoryService', 'AccountService', 'ApiEndPoint', '$ionicPopup', 'SessionService', function($scope, $state, CategoryService, AccountService, ApiEndPoint, $ionicPopup, SessionService){
  if (!SessionService.exist('user')) {
      $state.go('login');
  }

  $scope.url = ApiEndPoint.url + SessionService.get('ip') + ApiEndPoint.port;
  $scope.data = {};

  CategoryService.getCategories(SessionService.get('ip')).success(function(data){
    $scope.categories = data.categories;
    SessionService.set('categories', data.categories);
  }).error(function(data){
    var alertPopup = $ionicPopup.alert({
        title: data.title,
        template: data.message
    });
  });

  $scope.saveMovement = function(){
    $scope.data.user = SessionService.get('user').id;
    AccountService.saveMovement(SessionService.get('ip'), $scope.data).success(function(data){
      $state.go('tab.dash');
    }).error(function(data){
      var alertPopup = $ionicPopup.alert({
          title: data.title,
          template: data.message
      });
    });
  }
}]);
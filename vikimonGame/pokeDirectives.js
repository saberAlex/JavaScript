

pokeFight.directive('modal', function () {
    return {
      templateUrl: "directives/modalSuper.html",
      restrict: 'E',
      transclude: true,
      replace:true,
      link: function postLink(scope, element, attrs) {
        scope.title = attrs.title;
        scope.$watch(attrs.visible, function(value){
          if(value == true)
            $(element).modal('show');
          else
            $(element).modal('hide');
        });

        $(element).on('shown.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = true;
          });
        });

        $(element).on('hidden.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = false;
          });
        });
      }
    };
  });

pokeFight.directive('normalAttackModal', function() {
 return {
  templateUrl: "directives/normalAttack.html",
  restrict: 'E',
  transclude: true,
  replace: true,
  link: function postLink(scope, element, attrs) {
    scope.title = attrs.title;
    scope.$watch(attrs.visible, function(value) {
      if(value == true) {
        $(element).modal('show');
      } else {
        $(element).modal('hide');
      }
    });

    $(element).on('shown.bs.normalAttackModal', function(){
      scope.$apply(function() {
        scope.$parent[attrs.visible] = true;
      });
    });

    $(element).on('hidden.bs.normalAttackModal', function() {
      scope.$apply(function() {
        scope.$parent[attrs.visible] = false;
      });
    });
  }

 };
});

pokeFight.directive('defenseModal', function() {
  return {
    templateUrl: "directives/modalDefense.html",
    restrict: 'E',
    transclude: true,
    replace: true, 
    link: function postLink(scope, element, attrs) {
      scope.title = attrs.title;
      scope.$watch(attrs.visible, function(value) {
        if(value == true) {
          $(element).modal('show');
        } else {
          $(element).modal('hide');
        }
      });

      $(element).on('shown.bs.defenseModal', function() {
        scope.$apply( function() {
          scope.$parent[attrs.visible] = true;
        });
      });

      $(element).on('hidden.bs.defenseModal', function() {
        scope.$apply( function() {
          scope.$parent[attrs.visible] = false;
        })
      })


    }
  };
});

pokeFight.directive('enemyModal', function() {
  return {
    templateUrl: "directives/infoEnemy.html",
    restrict:'E',
    transclude: true,
    replace: true,
    link: function postLink(scope, element, attrs) {
      scope.title = attrs.title;
      scope.$watch(attrs.visible, function(value) {
        if(value == true) {
          $(element).modal('show');
        } else {
          $(element).modal('hide');
        }
      });
      $(element).on('shown.bs.enemyModal', function() {
        scope.$apply( function() {
          scope.$parent[attrs.visible] = true;
        });
      });
      $(element).on('hidden.bs.enemyModal', function() {
        scope.$apply( function() {
          scope.$parent[attrs.visible] = false;
        })
      })

    }
  }
});

pokeFight.directive('gameOver', function() {
  return {
    templateUrl: "directives/modalGameOver.html",
    restrict:'E',
    transclude: true,
    replace: true,
    link: function postLink(scope, element, attrs) {
      scope.title = attrs.title;
      scope.$watch(attrs.visible, function(value) {
        if(value == true) {
          $(element).modal('show');
        } else {
          $(element).modal('hide');
        }
      });

      $(element).on('shown.bs.gameOver', function() {
        scope.$apply(function() {
          scope.$parent[attrs.visible] = true;
        });
      });
      $(element).on('hidden.bs.gameOver', function() {
        scope.$apply(function() {
          scope.$parent[attrs.visible] = false;
        });
      });
    }
  }
});

pokeFight.directive('infoModal', function() {
  return {
    templateUrl: "directives/infoModal.html",
    restrict:'E',
    transclude: true,
    replace: true,
    link: function postLink(scope, element, attrs) {
      scope.title = attrs.title;
      scope.$watch(attrs.visible, function(value) {
        if(value == true) {
          $(element).modal('show');
        } else {
          $(element).modal('hide');
        }
      });

      $(element).on('shown.bs.infoModal', function() {
        scope.$apply(function() {
          scope.$parent[attrs.visible] = true;
        });
      });
      $(element).on('hidden.bs.infoModal', function() {
        scope.$apply(function() {
          scope.$parent[attrs.visible] = false;
        });
      });
      document.getElementById("backsound").play();
      document.getElementById('access').play();

    }
  }
})
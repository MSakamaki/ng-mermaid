'use strict';

angular.module('ngMermaid',['ngSanitize'])
  .directive('ngMermaid', ['$timeout', function ($timeout) {
    var interval=2000,
      cssReplace = function(cssRule){
        return cssRule
            .replace('ng\:cloak','ng--cloak')
            .replace('ng\:form','ng--form');
      },
      mminit = function(){
        try{
          mermaid.init();
        }catch(e){
          return e;
        }
      };

    return {
      restrict: 'E',
      transclude: true,
      replace: true,
      template: '<div>'+
                   '<ng-transclude ng-show="false"></ng-transclude>'+
                   '<div class="{{is_mermaid}}" ng-bind-html="model"></div>'+
                '</div>',
      scope: {
        nmModel: '=nmModel',
        nmRefreshinterval: '=nmRefreshinterval'
      },
      compile: function(tElement, tAttrs, transclude){
        // angularjs ng:xxx style escape 
        for(var styleidx in document.styleSheets){
          for(var cssridx in document.styleSheets[styleidx].cssRules){
            var cssroule = document.styleSheets[styleidx].cssRules[cssridx];
            if(cssroule.selectorText){
              cssroule.selectorText = cssReplace(cssroule.selectorText);
              cssroule.cssText = cssReplace(cssroule.cssText);
            }
          }
        }

        return function (scope, element, attrs, ctrl) {
          scope.model=scope.nmModel || element.text();
          scope.interval = scope.nmRefreshinterval || interval;
          scope.is_mermaid = 'mermaid';
          if(scope.nmModel){
            scope.$watch('nmModel', function(){
              scope.model = scope.nmModel;
              angular.forEach(element[0].querySelectorAll("[data-processed]"),
                function(v,k){
                  v.removeAttribute("data-processed");
                });
              $timeout(mminit, scope.interval);
            });
          }
          if(scope.nmRefreshinterval){
            scope.$watch('nmRefreshinterval',function(){
              scope.interval = scope.nmRefreshinterval || scope.interval;
            });
          }
        }
      }
    };
  }]);

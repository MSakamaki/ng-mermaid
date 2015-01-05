'use strict';

angular.module('ngMermaid',['ngSanitize'])
  .directive('ngMermaid', ['$sce','$timeout', function ($sce, $timeout) {
    //alert('init ngmermaid');
    var cssReplace = function(cssRule){
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
        nmModel: '=nmModel'
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
          
          scope.is_mermaid = 'mermaid';
          if(scope.nmModel){
            scope.$watch('nmModel',function(){
                scope.model = scope.nmModel;
                angular.forEach(element[0].querySelectorAll("[data-processed]"),
                  function(v,k){
                    v.removeAttribute("data-processed");
                  });
                $timeout(mminit,2000);
            });
          }
        }
      }
    };
  }]);

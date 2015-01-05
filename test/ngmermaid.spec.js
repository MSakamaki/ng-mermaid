'use strict';

var assert = chai.assert;

describe('Directive: imAlphanum', function () {

  // load the directive's module
  beforeEach(module('ngMermaid'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  describe('check compile', function(){
    it('inner html',inject(function ($compile) {
      element = angular.element('<ng-mermaid></ng-mermaid>');
      element = $compile(element)(scope);
      assert.equal(element[0].outerHTML,
        '<div class="ng-scope ng-isolate-scope"><ng-transclude ng-show="false"></ng-transclude><div class="{{is_mermaid}} ng-binding" ng-bind-html="model"></div></div>');
    }));
  });
});

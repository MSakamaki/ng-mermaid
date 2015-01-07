'use strict';

var assert = chai.assert;

describe('Directive: ngMermaid', function () {

  // load the directive's module
  beforeEach(module('ngMermaid'));

  var element,scope,q,timeout,
    ls = {
      DoIt: function(){
        var deferred = q.defer();
        timeout(function(){
          deferred.resolve(true);
        },1000);
        return deferred.promise;
      }
    };

  beforeEach(inject(function ($rootScope, $q, $timeout) {
    scope = $rootScope.$new();
    q=$q;
    timeout=$timeout;
  }));
  describe('check compile', function(){
    it('Tag is empty', inject(function ($compile) {
      element = angular.element('<ng-mermaid></ng-mermaid>');
      element = $compile(element)(scope)[0];
      ls.DoIt().then(function(ret){assert.isTrue(ret, 'DoIt resolve found')});
      timeout.flush(); 
      assert.equal(element.tagName, 'DIV');
      assert.equal(element.childNodes[0].tagName, 'NG-TRANSCLUDE');
      assert.equal(element.childNodes[1].tagName, 'DIV');
      assert.equal(element.childNodes[1].className, 'mermaid');
      assert.equal(element.childNodes[1].childNodes.length, 0);
    }));

    it('enclosed in its own tag', inject(function ($compile) {
      element = angular.element('<ng-mermaid>graph TD; A-->B;</ng-mermaid>');
      element = $compile(element)(scope)[0];
      ls.DoIt().then(function(ret){assert.isTrue(ret, 'DoIt resolve found')});
      timeout.flush(); 
      assert.equal(element.tagName, 'DIV');
      assert.equal(element.childNodes[0].tagName, 'NG-TRANSCLUDE');
      assert.equal(element.childNodes[1].tagName, 'DIV');
      assert.equal(element.childNodes[1].className, 'mermaid');
      assert.equal(element.childNodes[1].childNodes[0].textContent, 'graph TD; A-->B;');
    }));

    it('data binding in element tag', inject(function ($compile) {
      element = angular.element('<ng-mermaid nm-model="\'graph TD; A-->B;\'"></ng-mermaid>');
      element = $compile(element)(scope)[0];
      ls.DoIt().then(function(ret){assert.isTrue(ret, 'DoIt resolve found')});
      timeout.flush(); 
      assert.equal(element.tagName, 'DIV');
      assert.equal(element.childNodes[0].tagName, 'NG-TRANSCLUDE');
      assert.equal(element.childNodes[1].tagName, 'DIV');
      assert.equal(element.childNodes[1].className, 'mermaid');
      assert.equal(element.childNodes[1].childNodes[0].textContent, 'graph TD; A-->B;');
    }));

    describe('nm-model binding',function(){
      it('setting', inject(function ($compile) {
        element = angular.element('<ng-mermaid nm-model="\'graph TD; nmmodel-->binding;\'" nm-refreshinterval="3000"></ng-mermaid>');
        element = $compile(element)(scope);
        ls.DoIt().then(function(ret){assert.isTrue(ret, 'DoIt resolve found')});
        timeout.flush(); 
        assert.equal(scope.$$childTail.model, 'graph TD; nmmodel-->binding;');
      }));
    });

    describe('nm-refreshinterval binding',function(){
      it('setting', inject(function ($compile) {
        element = angular.element('<ng-mermaid nm-model="\'graph TD; A-->K;\'" nm-refreshinterval="3000"></ng-mermaid>');
        element = $compile(element)(scope);
        ls.DoIt().then(function(ret){assert.isTrue(ret, 'DoIt resolve found')});
        timeout.flush(); 
        assert.equal(scope.$$childTail.interval, 3000);
      }));
      
      it('default 2000', inject(function ($compile) {
        element = angular.element('<ng-mermaid nm-model="\'graph TD; A-->K;\'"></ng-mermaid>');
        element = $compile(element)(scope);
        ls.DoIt().then(function(ret){assert.isTrue(ret, 'DoIt resolve found')});
        timeout.flush(); 
        assert.equal(scope.$$childTail.interval, 2000);
      }));
    });
  });
  
});

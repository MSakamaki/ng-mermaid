AngularJS mermaid module
======


### [mermaid](https://github.com/knsv/mermaid)


## [example page](http://msakamaki.github.io/ng-mermaid/)



### using

```
bower i ng-mermaid
```

#### include

```html

    <script src="./lib/angular/angular.js"></script>
    <script src="./lib/mermaid/dist/mermaid.full.js"></script>
    <script src="./lib/angular-sanitize/angular-sanitize.js"></script>
    <script src="./lib/ng-mermaid/dist/ngmermaid.js"></script>
    <script>
        'use strict';
        var myApp = angular.module('exampleapp',['ngMermaid']);
    </script>

```

### exapmle

#### binding case

```html
        <div ng-controller="ctrls">
            <textarea ng-model="mymodel" style="width:100%;" rows="10"></textarea> 
            <ng-mermaid nm-model="mymodel" ></ng-mermaid>
        </div>
```

#### tag case

```html
        <div>
            <ng-mermaid>
                graph TD; A-->B; A-->C; B-->D; C-->D;
            </ng-mermaid>
        </div>
```


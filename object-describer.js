'use strict';

try { angular.module("kubernetesUI") } catch(e) { angular.module("kubernetesUI", []) }

angular.module('kubernetesUI')
.factory('KubernetesObjectDescriber', [function() {
  function KubernetesObjectDescriber() {
    this.kinds = {
      "Pod" : {
        templateUrl: "views/pod.html"
      },
      "Service" : {
        templateUrl: "views/service.html"
      },
      "ReplicationController" : {
        templateUrl: "views/replication-controller.html"
      }  
    };
  }

  KubernetesObjectDescriber.prototype.registerKind = function(kind, templateUrl, overwrite) {
    if (this.kinds[kind] && !overwrite) {
      throw "KubernetesObjectDescriber.registerKind :: kind " + kind + " is already registered."
    }
    if (!templateUrl) {
      throw "KubernetesObjectDescriber.registerKind :: templateUrl is required."
    }
    this.kinds[kind] = {
      templateUrl: templateUrl
    };
  };

  KubernetesObjectDescriber.prototype.templateUrlForKind = function(kind) {
    if (kind && this.kinds[kind]) {
      return this.kinds[kind].templateUrl;
    }
    return 'views/default-describer.html';
  };

  return new KubernetesObjectDescriber();
}])
.directive("kubernetesObjectDescriber", function(KubernetesObjectDescriber, $templateCache, $compile) {
  return {
    restrict: 'E',
    scope: {
      resource: '=',
      kind: '@',
      moreDetailsLink: '@'
    },
    link: function(scope, element, attrs) {
      // TODO test this for any potential XSS vulnerabilities
      var templateUrl = KubernetesObjectDescriber.templateUrlForKind(scope.kind);
      element.html($templateCache.get(templateUrl));
      $compile(element.contents())(scope);
    }
  }
})
.directive("kubernetesObjectDescribeLabels", function() {
  return {
    restrict: 'E',
    scope: {
      resource: '='
    },
    templateUrl: 'views/labels.html'
  }
})
.directive("kubernetesObjectDescribeAnnotations", function() {
  return {
    restrict: 'E',
    scope: {
      resource: '='
    },
    templateUrl: 'views/annotations.html'
  }
})
.directive("kubernetesObjectDescribeMetadata", function() {
  return {
    restrict: 'E',
    scope: {
      resource: '='
    },
    templateUrl: 'views/metadata.html'
  }
})
.directive("kubernetesObjectDescribeHeader", function() {
  return {
    restrict: 'E',
    scope: {
      resource: '=',
      kind: '='
    },
    templateUrl: 'views/header.html'
  }
})
.directive("kubernetesObjectDescribeFooter", function() {
  return {
    restrict: 'E',
    scope: {
      resource: '='
    },
    templateUrl: 'views/footer.html'
  }
})
.directive("kubernetesObjectDescribePodTemplate", function() {
  return {
    restrict: 'E',
    scope: {
      template: '='
    },
    templateUrl: 'views/pod-template.html'
  }
})
.directive("kubernetesObjectDescribeVolumes", function() {
  return {
    restrict: 'E',
    scope: {
      volumes: '='
    },
    templateUrl: 'views/volumes.html'
  }
})
.directive("kubernetesObjectDescribeContainers", function() {
  return {
    restrict: 'E',
    scope: {
      containers: '='
    },
    templateUrl: 'views/containers.html'
  }
});
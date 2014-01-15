'use strict';

angular.module('yoWorktajmApp')
  .directive('registerSubmit', function ($parse, RegistrationService) {
    return {
      restrict: 'A',
      require: ['registerSubmit', '?form'],
      controller: ['$scope', function ($scope) {
        this.attempted = false;
        this.userExists = false;
        
        var formController = null;
        
        this.setAttempted = function() {
            this.attempted = true;
        };

        this.setUserExists = function () {
          this.userExists = true;
        };
        
        this.setFormController = function(controller) {
          formController = controller;
        };
        
        this.needsAttention = function (fieldModelController) {
          if (!formController) return false;
          
          if (fieldModelController) {
            return fieldModelController.$invalid && (fieldModelController.$dirty || this.attempted);
          } else {
            return formController && formController.$invalid && (formController.$dirty || this.attempted);
          }
        };
      }],
      compile: function(cElement, cAttributes, transclude) {
        return {
          pre: function(scope, formElement, attributes, controllers) {          
            var submitController = controllers[0];
            var formController = (controllers.length > 1) ? controllers[1] : null;
            
            submitController.setFormController(formController);
            
            scope.rc = scope.rc || {};
            scope.rc[attributes.name] = submitController;
          },
          post: function(scope, formElement, attributes, controllers) {
            var submitController = controllers[0];
            var formController = (controllers.length > 1) ? controllers[1] : null;
            var fn = $parse(attributes.registerSubmit);
            
            formElement.bind('submit', function () {
              submitController.setAttempted();
              if (!scope.$$phase) scope.$apply();
              
              if (!formController.$valid) return false;

              // Validate user
              console.log('Validating user: %s', scope.registration.email);
              RegistrationService.isEmailAvailable(scope.registration.email).then(function (available) {
                formController.email.$setValidity('uniqueEmail', false);
                if (available) {
                  console.log('The provided email is available, proceeding with registration');
                  _.defer(function () {
                    scope.$apply(function() {
                      fn(scope, {$event:event});
                    });
                  });                 
                } else {
                  // Assign error status to email
                  console.log('The provided email is already registered');
                  return false;                  
                }
              }, function () {
                return false;
              });      
            });
          }
        };
      }      
    };
  });

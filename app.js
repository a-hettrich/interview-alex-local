window.$ = window.jQuery = require('jquery');

require('angular/angular.js');
require('angular-route');

require('angular-ui-bootstrap');
require('angular-resource');


var app = angular.module('interviewApp', [
    'ngRoute'
]);
app.controller('companiesCtrl', ['$scope', '$http', function companiesCtrl($scope, $http) {
    $scope.companies = []
    function getCompanies(){
        $http.get('http://127.0.0.1:5006/companies').then(function(response){
            
            $scope.companies = response.data.objects
        })
    }
    

    $scope.addCompany = function(){
        $http.post('http://127.0.0.1:5006/add_companies', {name: $scope.company_name}).then(function(response){
            getCompanies()
        })
    }

    $scope.addEmployee = function(){
        $http.post('http://127.0.0.1:5006/add_employee', {name: $scope.employee_name,company_id:$scope.company_id}).then(function(response){
            getCompanies()
        })
    }
    

    getCompanies()
}]);

function appConfig($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('');

    $routeProvider.when('/', {
        templateUrl: '/companies.html',
        controller: 'companiesCtrl'
    });
}

appConfig.$inject = ['$routeProvider', '$locationProvider'];
app.config(appConfig);
app.run();


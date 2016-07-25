function headerDirective () {
	return {
		restrict: "AE",
		templateUrl:"./templates/header.html"
	}
}
function carouselDirective (){
	return {
		restrict: "E",
		templateUrl:"./templates/carousel.html"
	};
};
function linesDirective () {
	return {
		restrict: "A",
		templateUrl: "./templates/fourlines.html"
	}
}
function partnersDirective (){
	return {
		restrict: "E",
		templateUrl: "./templates/partners.html"
	};
};
function footerDirective (){
	return{
		restrict:"EA",
		templateUrl: "./templates/footer.html"
	}
}

function indexController ($scope, $http) {
	var ENDPOINT = "./data/main-img.json";
	var mainimg = [];
	$http.get(ENDPOINT).then(function(response){
		$scope.mainimg = response.data
	});
};
function carouselController($scope, $http){
	var ENDPOINT = "./data/carousel.json"; 
	$http.get(ENDPOINT).then(function(response){
		$scope.slides = response.data;
	});
};
function partnersController($scope, $http){
	var ENDPOINT = "./data/partners.json"; 
	$scope.partners = [];
	$http.get(ENDPOINT).then(function(response){
		$scope.partners = response.data;
	});
};
function galleryController($scope, $http){
	var URL = "data/gallery.json";
	$scope.gallery = [];
	$http.get(URL).then(function(response){
		$scope.gallery = response.data;
	});
};
var findPicture = function (array,id) {
var arrayCategoriasActuales = [];
  for (var i=0; i<array.length; i++) {
    if (array[i].id == id) {  //me da el id del objeto en el que estoy.
      //return array[i];
      //break;
    arrayCategoriasActuales.push(array[i]);   //objeto entero.
    };
  };
  return arrayCategoriasActuales;
};
function setConfig($locationProvider, $routeProvider){
	    $locationProvider.html5Mode(true);
		$routeProvider
		.when('/', {
			controller:"indexController",
			templateUrl:"./templates/index.html",
			controllerAs: "header"
		})
		.when('/showPictures/:mainimgsId', {
			controller:"showController",
			templateUrl:"./templates/show.html",
			controllerAs: "show"
		})
		.when('/gallery',{
			controller: "galleryController",
			templateUrl: "./templates/gallery.html"
		});
};

function showController($scope, $routeParams, $http){
	var ENDPOINT = "./data/galleryid.json";
	var mainimgsId = $routeParams.mainimgsId;
	$http.get(ENDPOINT).then(function(response){
		var mainimgs = response.data;   //variable local)
		$scope.mainimgs = findPicture(mainimgs, mainimgsId); //(elemento del atributo scope)
	});
};


(function(){
	var app = angular.module('myApp', ['ngRoute']);
	app.config(['$locationProvider','$routeProvider', setConfig]);
	app.directive("headerDirective", headerDirective);
	app.directive("linesDirective", linesDirective);
	app.directive('carouselDirective', carouselDirective);
	app.directive("partnersDirective", partnersDirective);
	app.directive("footerDirective", footerDirective);
	app.controller("indexController", ["$scope", "$http", indexController]);
	app.controller("carouselController", ["$scope", "$http", carouselController]);
	app.controller("partnersController", ["$scope", "$http", partnersController]);
	app.controller("galleryController", ["$scope", "$http", galleryController]);
	app.controller("showController", ["$scope", "$routeParams", "$http", showController])
})();
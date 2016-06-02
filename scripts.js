/*
Note this example will work only over
http and NOT https because of a http resource used below.
*/

var app = angular.module('Weather', []);

app.factory('WeatherApi', function($http) {
  var obj = {};
  
  obj.getLoc = function() {
    return $http.jsonp("http://ipinfo.io/json?callback=JSON_CALLBACK");
  };
  obj.getCurrent = function(city) {
    var api = "http://api.openweathermap.org/data/2.5/weather?q=";
    var units = "&units=metric";
    var appid = "&APPID=061f24cf3cde2f60644a8240302983f2"
    var cb = "&callback=JSON_CALLBACK";
    
    return $http.jsonp(api + city + units+ appid + cb);
  };
  return obj
});

app.controller('MainCtrl', function($scope, WeatherApi) {
  $scope.Data = {};
  $scope.Data.unit ='C';
  $scope.Data.sysChange = false;
  WeatherApi.getLoc().success(function(data) {
    var city = data.city + ',' + data.country;
    $scope.Data.city = data.city;
    $scope.Data.country = data.country;
    WeatherApi.getCurrent(city).success(function(data) {
      CurrentWeather(data)
    });
  });

  function CurrentWeather(data) {
    $scope.Data.temp = Math.round(data.main.temp);
    $scope.Data.Cel = Math.round(data.main.temp);
    $scope.Data.des = data.weather[0].main;
    $scope.Data.Fah = Math.round( ($scope.Data.temp * 9)/5 + 32 );
    return IconGen($scope.Data.des);
  }

  function IconGen(city) {
    var city = city.toLowerCase()
    switch (city) {
      case 'dizzle':
        addIcon(city)
        break;
      case 'clouds':
        addIcon(city)
        break;
      case 'rain':
        addIcon(city)
        break;
      case 'snow':
        addIcon(city)
        break;
      case 'clear':
        addIcon(city)
        break;
      case 'thunderstom':
        addIcon(city)
        break;
      default:
    $('div.clouds').removeClass('hide');
    }
  }

  function addIcon(city) {
    $('div.' + city).removeClass('hide');
  }
  
  $scope.Data.sys= function(){
   if($scope.Data.sysChange){
     $scope.Data.unit ='C';
     $scope.Data.temp = $scope.Data.Cel;
     return $scope.Data.sysChange = false;
     }
    $scope.Data.unit ='F';
    $scope.Data.temp = $scope.Data.Fah;
    return $scope.Data.sysChange = true;
  }
  
  
});
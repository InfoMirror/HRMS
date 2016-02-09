'use strict';

angular.module('angularRestfulAuth')
    .factory('Main', ['$http', function ($http) {
            var baseUrl = 'localhost:9006';
            return {
                login: function (formdata,success,error) {
                     /*$http.post('/login', formdata).success(function(data){
                      return data;  
                    });*/
                    $http.post('/login', formdata).success(success).error(error)
                      
                }
            }

            //     return {
            //      save: function(data, success, error) {
            //        $http.post(baseUrl + '/signin', data).success(success).error(error)
            //     },
            //     signin: function(data, success, error) {
            //         $http.post(baseUrl + '/authenticate', data).success(success).error(error)
            //     },
            //     me: function(success, error) {
            //         $http.get(baseUrl + '/me/').success(success).error(error)
            //     },
            //     logout: function(success) {
            //         changeUser({});
            //        delete $localStorage.token;
            //        success();
            //    }
            // };
            //return null;
    }
]);
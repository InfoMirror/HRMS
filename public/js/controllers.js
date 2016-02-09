'use strict';

/* Controllers */

angular.module('angularRestfulAuth')
    .controller('HomeCtrl', ['$rootScope', '$scope','$http','$window','Main','$location', function ($rootScope, $scope,$http,$window,Main,$location) {
        $scope.m = 4;
        alert();
        $scope.employeeData={};
        $scope.profiledetail='Hello User';
        $scope.init = function(){
            $scope.profile="Hello User";
        }

        $scope.signin = function () {
                        var myParams = {
                            'clientid': '142159620286-m8khm27vosmf3ovj9lbgrtj1vqd52jtj.apps.googleusercontent.com',
                            'cookiepolicy': 'single_host_origin',
                            'callback': $scope.loginCallback,
                            'approvalprompt': 'force',
                            'scope': 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.profile.emails.read'
                        };
            gapi.auth.signIn(myParams);
        };



         $scope.loginCallback= function(result) {
           // alert(0);
            if (result['status']['signed_in']) {
                var request = gapi.client.plus.people.get({
                    'userId': 'me'
                });
                request.execute(function (resp) {
                    var email = '';
                    if (resp['emails']) {
                        for (var i = 0; i < resp['emails'].length; i++) {
                            if (resp['emails'][i]['type'] == 'account') {
                                email = resp['emails'][i]['value'];
                            }
                        }
                    }

                    var str = "Name:" + resp['displayName'] + "<br>";
                   /* str += "Image:" + resp['image']['url'] + "<br>";
                    str += "<img src='" + resp['image']['url'] + "' /><br>";

                    str += "URL:" + resp['url'] + "<br>";*/
                    str += "Email:" + email + "<br>";
                    //alert(str);
                    $scope.profile = str;
                    if(resp["domain"]=='infoobjects.com'){
                        //alert('right user');
                        
                        var formdata={
                            email:email
                        }
                       // alert(formdata['email']);
                        /*$scope.login = function(){
                            $http.post('/login',formdata)
                            .success(function (data){
                                $scope.employeeData = data;
                                alert($scope.employeeData);
                            })
                            .error(function(data){
                                console.log('Error: '+data);
                            });
                        };*/
                        Main.login(formdata,function(res){
                           // alert(res.data.UserId);
                            $scope.profiledetail=JSON.stringify(res.data);
                            alert($scope.profiledetail);
                               $location.path('/');
                        });
                       // alert(resut);
                    }else{
                       
                         gapi.auth.signOut();
    location.reload();
                    }
                    //$window.location.href='http://localhost:9006/';
                    
           //response.redirect('http://localhost:9006/');
                });

            }

        }
         
         

$scope.logout= function()
{
    gapi.auth.signOut();
    location.reload();
}
        function onLoadCallback() {
            gapi.client.setApiKey('AIzaSyCNpwkECtLeyE5eRqNxoCmOjG9DQuL3Dp8');
            gapi.client.load('plus', 'v1', function () {});
        }
        
        $scope.init();
       
    }])

.controller('MeCtrl', ['$rootScope', '$scope', '$location', 'Main', function ($rootScope, $scope, $location, Main) {

    // Main.me(function(res) {
    // //    $scope.myDetails = res;
    //  }, function() {
    //      $rootScope.error = 'Failed to fetch details';
    //  })
}]);
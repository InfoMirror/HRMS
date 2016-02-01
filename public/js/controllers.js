'use strict';

/* Controllers */

angular.module('angularRestfulAuth')
    .controller('HomeCtrl', ['$rootScope', '$scope','$http','$window','Main', function ($rootScope, $scope,$http,$window,Main) {
        $scope.m = 4;

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
            /*
            $http.get('http://localhost:9006/#/signin/dosignin', {
                "msg": "hi"
            }).success(function (data) {
                console.log(data);
            });*/
            gapi.auth.signIn(myParams);
        };



         $scope.loginCallback= function(result) {
            
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
                        alert('right user');
                        
                        var formdata={
                            email:email
                        }
                        alert(formdata['email']);
                        Main.login(formdata,function(res){
                               $location.path('/home');
                        });
                    }else{
                        alert('wrong user');
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
        //  $scope.signup = function() {
        //     var formData = {
        //        email: $scope.email,
        //       password: $scope.password
        //   }

        //    Main.save(formData, function(res) {
        //        $localStorage.token = res.data.token;
        //       $location.path('/me');
        //  }, function() {
        //     $rootScope.error = 'Failed to signup';
        //  })
        // };

        //  $scope.me = function() {
        //    Main.me(function(res) {
        //         $scope.myDetails = res;
        //     }, function() {
        //        $rootScope.error = 'Failed to fetch details';
        //    })
        //  };

        // $scope.logout = function() {
        //  Main.logout(function() {
        //      $location.path('/');
        //  }, function() {
        //     $rootScope.error = 'Failed to logout';
        // });
        //  };
    }])

.controller('MeCtrl', ['$rootScope', '$scope', '$location', 'Main', function ($rootScope, $scope, $location, Main) {

    // Main.me(function(res) {
    // //    $scope.myDetails = res;
    //  }, function() {
    //      $rootScope.error = 'Failed to fetch details';
    //  })
}]);
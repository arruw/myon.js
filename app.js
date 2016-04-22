var app = angular.module('app', [])
.controller('mainCtrl', ['$scope', function($scope) {
    
    $scope.data = {
        "First Name": "Matjaž",
        "Last Name": "Mav",
        "Gender": "Male",
        "Birth Date": "1994-10-24T20:00:00.000Z",
        "Contacts": {
            "Email": "matjaz.mav@gmail.com",
            "Twitter": "http://twitter.com/matjazmav",
            "Skype": "skype:live:matjaz.mav_1?chat",
            "LinkedIn": "https://si.linkedin.com/in/matjazmav",
            "Mobile": null
        },
        "Hobies": [
            "Programing",
            "Running"
        ]
    };
    
    $('#json').html(myon.renderJson($scope.data, 2));
    
}]);
myApp.controller('InstructionsController', ['$scope', '$rootScope', 'Authentication', 'sharedExercises', '$window', '$ionicSideMenuDelegate', '$ionicPopover',
  function($scope, $rootScope, Authentication, sharedExercises, $window, $ionicSideMenuDelegate, $ionicPopover) {
    $scope.sideEffects = [];
    $scope.sideEffects[0] = {
        name: "Side Effects",
        items: [
            "Accidentally learning music theory.",
            "Extreme thumb strengthening.",
            "Having the time of your life."
        ]
    }
    
    $scope.notes = [];
    $scope.notes[0] = {
        name: "Reading notes",
        items: [
            {
                noteValue: "q",
                text: "\u00A0\u00A0\u00A0A quarter note lasts one beat." 
            },
            {
                noteValue: "h",
                text: "\u00A0\u00A0\u00A0A half note: two beats." 
            },
            {
                noteValue: "w",
                text: "A whole note: four beats." 
            }
        ]
    }
    
    $scope.rests = [];
    $scope.rests[0] = {
        name: "Reading rests",
        items: [
            {
                noteValue: "\u00A0Q",
                text: "\u00A0\u00A0A quarter rest: 1 beat." 
            },
            {
                noteValue: "H",
                text: "\u00A0A half rest: 2 beats." 
            },
            {
                noteValue: "W",
                text: "\u00A0A whole rest: 4 beats." 
            }
        ]
    }

    $scope.advancedNotes = [];
    $scope.advancedNotes[0] = {
        name: "Reading notes in Level 2+",
        items: [
            {
                noteValue: "s",
                text: "\u00A0\u00A0\u00A0A 16th note: 1/4th of a beat." 
            },
            {
                noteValue: "S",
                text: "\u00A0\u00A0\u00A0\u00A0A 16th rest." 
            },
            {
                noteValue: "e",
                text: "\u00A0\u00A0An 8th note: 1/2 of a beat." 
            },
            {
                noteValue: "W",
                text: "\u00A0An 8th rest." 
            },
            {
                noteValue: "q.",
                text: "\u00A0\u00A0A dotted 1/4 note: 1.5 beats." 
            },
            {
                noteValue: "Q.",
                text: "\u00A0\u00A0A dotted 1/4 rest." 
            },
            {
                noteValue: "h.",
                text: "\u00A0\u00A0A dotted 1/2 note: 3 beats." 
            },
            {
                noteValue: "H.",
                text: "A dotted 1/2 rest." 
            },
            // {
            //     noteValue: "Pqqq",
            //     text: "\u00A03 beats in two counts." 
            // }
            // place link to verbose text that thoroughly explains combinations of eighths and sixteenths
            // and triplets
        ]
    }



    /*
    * if given group is the selected group, deselect it
    * else, select the given group
    */

    $scope.toggleGroup = function(group) {
        if ($scope.isGroupShown(group)) {
            $scope.shownGroup = null;
        } else {
            $scope.shownGroup = group;
        }
        // console.log($scope.groups);
    };
    $scope.isGroupShown = function(group) {
        return $scope.shownGroup === group;
    };


}]); // Controller

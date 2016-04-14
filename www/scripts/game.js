myApp.controller('GameController', ['$scope', '$rootScope', 'Authentication', 'sharedExercises', '$ionicPopup', '$timeout', '$firebaseAuth', 'FIREBASE_URL',
  function($scope, $rootScope, Authentication, sharedExercises, $ionicPopup, $timeout, $firebaseAuth, FIREBASE_URL) {
    var ref = new Firebase(FIREBASE_URL);
    var auth = $firebaseAuth(ref);

    $scope.testText = "dg fg";

    // simplify game and add a metronome

    //48 = whole note, 24 = half note, 12 = quarter note, 6 = eigth note, 3 = sixteenth note. 8-8-8 = quarter triplet.
    var noteValues = [3, 6, 12, 18, 24, 36, 48];
    // easy mode
    // var noteValues = [12, 24, 48];

    $scope.globalLevel=1;

    $scope.changeLevel = function() {
        if ($scope.globalLevel>2) {
            $scope.globalLevel=0
        }
        $scope.globalLevel++;
        console.log("globalLevel", $scope.globalLevel);
    }

    var generateGameRhythm = function(level) {
        var gameRhythm = [];
        console.log("globalLevel", $scope.globalLevel);
        // Level 1 will only select quarter notes, half notes, or whole notes
        if (level===1) {
            limit=72;
            noteValues = [12, 24, 48];
            while (limit>0) {
                var randIndex = Math.floor(Math.random()*3);
                if (limit<48) {
                    randIndex = Math.floor(Math.random()*2);
                }
                if (limit<24) {
                    randIndex = Math.floor(Math.random()*1);
                }
                if (limit<12) {
                    randIndex = Math.floor(Math.random());
                }
                var randNoteVal = noteValues[randIndex];
                
                gameRhythm.push(randNoteVal);
                total+=randNoteVal;
                limit-=randNoteVal;
            }
        // Level 2 will only select eigth notes, quarter notes, half notes, dotted half notes, or whole notes 
        } else if (level===2) {
            limit = 96;
            noteValues = [6, 12, 24, 36, 48];
            while (limit>0) {
                var randIndex = Math.floor(Math.random()*5);
                if (limit<48) {
                    randIndex = Math.floor(Math.random()*4);
                }
                if (limit<36) {
                    randIndex = Math.floor(Math.random()*3);
                }
                if (limit<24) {
                    randIndex = Math.floor(Math.random()*2);
                }
                if (limit<12) {
                    randIndex = Math.floor(Math.random()*1);
                }
                if (limit<6) {
                    randIndex = Math.floor(Math.random());
                }
                var randNoteVal = noteValues[randIndex];
                gameRhythm.push(randNoteVal);
                total+=randNoteVal;
                limit-=randNoteVal;
            }
        // Level 2 will only select from every possible option
        } else {
            noteValues = [3, 6, 12, 18, 24, 36, 48];
            limit = 192;
            while (limit>0) {
                var randIndex = Math.floor(Math.random()*6);
                if (limit<48) {
                    randIndex = Math.floor(Math.random()*5);
                }
                if (limit<36) {
                    randIndex = Math.floor(Math.random()*4);
                }
                if (limit<24) {
                    randIndex = Math.floor(Math.random()*3);
                }
                if (limit<18) {
                    randIndex = Math.floor(Math.random()*2);
                }
                if (limit<12) {
                    randIndex = Math.floor(Math.random()*1);
                }
                if (limit<6) {
                    randIndex = Math.floor(Math.random());
                }
                var randNoteVal = noteValues[randIndex];
                
                if (randNoteVal!=24) {
                    gameRhythm.push(randNoteVal);
                } else {
                    randChance = Math.random();
                    if (randChance>.33) {
                        gameRhythm.push(randNoteVal)
                    } else {
                        for (var i=0; i<3; i++) {
                            gameRhythm.push(8);
                        }
                    }
                }
                total+=randNoteVal;
                limit-=randNoteVal;
            }
        }
        var randIndex;
        var total=0;

        console.log(total);
        return gameRhythm;
    }

    var timeItv;
    $scope.time = 0;

    var userRhythm = [];

    $scope.accuracy;

    var incrementTime = function() {
        $scope.time+=1;
    }

    $scope.popColor = "light";
    var randPopColor = ["green", "orange", "deep-orange", "light-blue", "teal", "blue", "red", "pink"];

    $scope.pulse = "";

    var pulseTimer;
    // event argument to register x and y positioning
    $scope.startTime = function(event) {
        timeItv = setInterval(incrementTime, 10);

        $scope.pulse = "pulse";

        var randPCndex = Math.floor(Math.random()*randPopColor.length);
        $scope.popColor = randPopColor[randPCndex] + " popColor";  
        console.log("x", event.offsetX, "y", event.pageY);


        
    }

    $scope.animated = "";
    $scope.pulse1 = "";
    $scope.pulse2 = "";
    // $scope.pulseOk = false;
    // $scope.pulseOk2 = false;

    $scope.pulsateCorners = function(circleId) {
        // $scope.pulse = "pulse";
        // $scope.animated = "animated";

        // console.log("setting first pulse");  
        
        if (circleId === 'cc1') {
            // $scope.pulseOk = !$scope.pulseOk;
            console.log("setting first pulse");
            $scope.pulse1 = "pulse";
        } else if (circleId === "cc2") {
            // $scope.pulseOk2 = !$scope.pulseOk2;
            $scope.pulse2 = "pulse";
        }
        // figure out how to isolate the circleId so that only that Id animates depending on which side you click on.
    } 


    $scope.drumX = 0;
    $scope.drumY = 0;

    $scope.findPos = function(event) {
        // console.log("x", event.offsetX, "y", event.pageY);
        if (event.offsetX!=0) {
            $scope.drumX = event.offsetX;
        }

        // $scope.drumX = event.offsetX;
        if (event.offsetY!=0) {
            $scope.drumY = event.offsetY;    
        }
    }

    

    $scope.stopTime = function() {
        $scope.popColor = "light";    
        // $scope.pulse = "";

        // clearInterval(pulseTimer);
        // setTimeout(function() {
            $scope.pulse1 = "";
            $scope.pulse2 = "";
        // }, 50);
        
        console.log(userRhythm.length, "UR l")
        if ($scope.time === 0) {
            $scope.time = 1;
        }
        userRhythm.push($scope.time);
        clearInterval(timeItv);
        $scope.time=0;
        if (userRhythm.length == gameRhythm.length || userRhythm.length>gameRhythm.length) {
            console.log("compare", gameRhythm, "to", userRhythm)
            console.log("run the compare function!");
            var accuracy = (compareRhythms(gameRhythm, userRhythm)*100).toFixed(2);
            
            if (accuracy == NaN) {
                console.log("setting to 0.")
                $scope.accuracy = 0.1;
            }
            $scope.accuracy=accuracy;
            console.log("accuracy", accuracy);
            userRhythm = [];
        }

        // removeClass
        $scope.animated = "";
        
        

    }

    var gameRhythm;
    $scope.gameRhythmDisplay="";


    // var noteValues = [3, 6, 12, 18, 24, 36, 48];

    var numPairs = {
        3: "s",
        6: "e",
        12: "q",
        18: "q.",
        24: "h",
        36: "h.",
        48: "w",

    }

    // if accuracy = NAN, then set to 0.

    var rhythmDisplay = function(rhythm) {
        var rhythmDisplay = "c \u00A0";
        var rhythmDisplay = "";
        for (var i=0; i<rhythm.length; i++) {
            var letter;
            if (rhythm[i]===8) {
                rhythmDisplay+= "Pqqq";
                i+=2;
            }
            else if ((i<rhythm.length-3)&&((rhythm[i]===3)&&(rhythm[i+1]===3)&&(rhythm[i+2]===3)&&(rhythm[i+3]===3))) {
                rhythmDisplay+="dffg";
                i+=3;
            }
            else if ((i<rhythm.length-2)&&((rhythm[i]===3)&&(rhythm[i+1]===3)&&(rhythm[i+2]===6))) {
                rhythmDisplay+="dgy";
                i+=2;
            }
            else if ((i<rhythm.length-2)&&((rhythm[i]===3)&&(rhythm[i+1]===6)&&(rhythm[i+2]===6))) {
                rhythmDisplay+="dty";
                i+=2;
            }       
            else if ((i<rhythm.length-2)&&((rhythm[i]===6)&&(rhythm[i+1]===3)&&(rhythm[i+2]===3))) {
                rhythmDisplay+="rdg";
                i+=2;
            }
            else if ((i<rhythm.length-1)&&((rhythm[i]===6)&&(rhythm[i+1]===6))) {
                rhythmDisplay+="ry";
                i+=1;
            } 
            else if ((i<rhythm.length-1)&&((rhythm[i]===6)&&(rhythm[i+1]===3))) {
                rhythmDisplay+="rg";
                i+=1;
            }
            else if ((i<rhythm.length-1)&&((rhythm[i]===3)&&(rhythm[i+1]===6))) {
                rhythmDisplay+="dy";
                i+=1;
            }
            else if ((i<rhythm.length-1)&&((rhythm[i]===3)&&(rhythm[i+1]===3))) {
                rhythmDisplay+="dg";
                i+=1;
            }           
            else {
                letter = numPairs[rhythm[i]];
                // 15% chance of rest instead of normal note
                var randRest = Math.random();
                if (randRest<=.15) {
                    letter = letter.toUpperCase();
                    // remove restNote and go back an index
                    // gameRhythm.splice(i,1);
                    rhythm.splice(i, 1);
                    gameRhythm = rhythm;
                    i-=1;
                    // gameRhythm[i] = 1;
                }
                rhythmDisplay += letter;
                letter = letter.toLowerCase();
            }
            
            switch(letter) {
                case "e":
                    rhythmDisplay += "\u00A0";
                    break;
                case "q":
                    rhythmDisplay += "\u00A0\u00A0";
                    break;
                case "q.":
                    rhythmDisplay += "\u00A0\u00A0\u00A0";
                    break;
                case "h":
                    rhythmDisplay += "\u00A0\u00A0\u00A0\u00A0";
                    break;
                case "h.":
                    rhythmDisplay += "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0";
                    break;
                case "w":
                    rhythmDisplay += "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0";
                    break;
                default:
                    rhythmDisplay += "";
                    break;  
            }
        }
        console.log(rhythmDisplay);
        return rhythmDisplay;
    }

    
    // var previous=undefined;
    
    $scope.generateGRhythm = function() {
        // $scope.globalLevel = level;
        userRhythm = [];
        gameRhythm = generateGameRhythm($scope.globalLevel);
        $scope.gameRhythmDisplay=rhythmDisplay(gameRhythm); 
        console.log(gameRhythm);

        // var randBIndex = Math.floor(Math.random()*randBackground.length);
        // previous = randBackground[randBIndex];

    }


    var compareRhythms = function(rhythm1, rhythm2) {

        var rhythm1Divisor = rhythm1[0];
        var rhythm1total = 0;
        for (var r1=0; r1<rhythm1.length; r1++) {
            rhythm1total+=(rhythm1[r1]/rhythm1Divisor);
        }

        // userRhythm
        var rhythm2Divisor = rhythm2[0];
        var rhythm2total = 0;
        for (var r2=0; r2<rhythm2.length; r2++) {
            if (rhythm2[r2]!=1) {
                rhythm2total+=(rhythm2[r2]/rhythm2Divisor);    
            } else {
                rhythm2total+=0.95;
            }
            
        }

        if (rhythm1total/rhythm2total>0&&rhythm1total/rhythm2total<1) {
            return rhythm1total/rhythm2total;
        } else {
            return rhythm2total/rhythm1total;
        }
    }



}]); // Controller


// TODO:
// add a metronome
// add an easy level

// prevent NaN from appearing on the screen!

// CONSIDER
// better algorithm?
// develop a new algorithm that tracks the length of time that the user taps on the screen
// as the user taps on the screen, you keep track of their taps and releases
// these taps and releases get measured over a timeline
// i.e.
// hold--------release hold-release hold-release
// looks like a half note, quarter note, quarter note.
// you build an array of numbers that resemble these holds and releases.
// you then compare the array to the game array
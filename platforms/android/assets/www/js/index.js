/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var app = {
    // Application Constructor
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function () {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();

/*-------------------------------------------------
NAME: MEGAN PETERSEN
SID: 215123769
--------------------------------------------------*/

//GLOBAL:

 window.baseURl = "http://introtoapps.com/datastore.php?appid=215123769";
var displayName = '';
var currentUsername = '';
var storage = window.localStorage;


//snippet from onsen to make popovers work
//https://onsen.io/v2/api/js/ons-popover.html
//if i rewrite jquery the animation does weird things so i've left it as normal js

var showPopoverq1 = function(target) {
    document.getElementById('popoverq1').show(target);
};
var showPopoverq2 = function(target) {
    document.getElementById('popoverq2').show(target);
};
var showPopoverq3 = function(target) {
    document.getElementById('popoverq3').show(target);
};
var hidePopover = function() {
    document.getElementById('popoverq1').hide();
    document.getElementById('popoverq2').hide();
    document.getElementById('popoverq3').hide();
};

//popover on exam page must be separate or it stops the other popovers
var showPopoverExam = function(target) {
    document.getElementById('popoverexam').show(target);
};
var hidePopoverExam = function() {
    document.getElementById('popoverexam').hide();
};


//alert variables declared outside of functions so they can be used by multiple screens
//alerts for logout, menu and submit quiz
var $alertLogout = $("<ons-alert-dialog animation='default'><div class='alert-dialog-title'>Logout?</div><div class='alert-dialog-content'>Are you sure you want to logout?</div><div class='alert-dialog-footer'><button class='alert-dialog-button' onclick='showLogin()'>OK</button><button class='alert-dialog-button' onclick='alertCancel()'>Cancel</button></div></ons-alert-dialog>");

var $alertMenu = $("<ons-alert-dialog animation='default'><div class='alert-dialog-title'>Exit Quiz?</div><div class='alert-dialog-content'>Your progress will not be saved.</div><div class='alert-dialog-footer'><button class='alert-dialog-button' onclick='showMenu()'>OK</button><button class='alert-dialog-button' onclick='alertCancel()'>Cancel</button></div></ons-alert-dialog>");

var $alertSubmit = $("<ons-alert-dialog animation='default'><div class='alert-dialog-title'>Submit Quiz?</div><div class='alert-dialog-content'>Do you want to submit the quiz?</div><div class='alert-dialog-footer'><button class='alert-dialog-button' onclick='showStatistics()'>OK</button><button class='alert-dialog-button' onclick='alertCancel()'>Cancel</button></div></ons-alert-dialog>");


//one function to cancel/hide any of the alerts, used by multiple screens
function alertCancel() {
    $alertMenu.hide();
    $alertLogout.hide();
    $alertSubmit.hide();
}

   // function to update value of label 
    function updateValue() {
        x = document.getElementById("q7rangeMood").value;
        document.getElementById("labelValue").innerHTML = x;
        
    }

   

/*------------------------------
LOGIN PAGE - FUNCTIONS
------------------------------*/
    
    //checks inputted values with the values stored in the datastore
     function loadUser(username, password) {
            
            var url = baseURl + "&action=load&objectid=" + encodeURIComponent(username) + ".user";
            
                $.ajax({
                url: url,
                cache: false
            })
			
                .done(function(data) {
					var jdata = JSON.parse(data);
                
                //check user inputted pw/username are both same as the datastore
                if (jdata.username == username && jdata.password == password) {
				console.log("user + pw match");
                //sets global variables name and username if user/pw are correct
				displayName = jdata.name;
				currentUsername = jdata.username;
				
				showMenu();
				} else {
                alert("Username or password is incorrect.");
				console.log('error user doesnt exist or password is wrong.');
				}
            
            //if request fails
            })  .fail(function (jqXHR, textStatus) {
                alert("Request failed: user doesnt exist" + textStatus);
            });        
        }
    
/*------------------------------
LOGIN PAGE
------------------------------*/

function showLogin() {

    console.log("begin showLogin()");


    //variables declared and appendTo elements
    //everything wrapped in an ons-page tag

    var $page = $("<ons-page></ons-page>");
    $("<div class='logo'></div>").appendTo($page);
    $("<div id='title' class='title'>QUIZI</div>").appendTo($page);

    //container for login fields and login button
    var $conFields = $("<div class='conFields'></div>").appendTo($page);
    var $username = $("<ons-input id='username' modifier='underbar' placeholder='Username'  float></ons-input>").appendTo($conFields);
    $("<br/>").appendTo($conFields);
    $("<br/>").appendTo($conFields);
    var $pw = $("<ons-input id='pw' modifier='underbar' type='password' placeholder='Password' float></ons-input>").appendTo($conFields);


    //footer and empty divs for spacing
    $("<div class='break'></div>").appendTo($conFields);
    $("<div class='footer'></div>").appendTo($page);
    $("<div class='break'></div>").appendTo($conFields);

    
    //for hashing the password (see sha.js) used: 
    //http://www.webtoolkit.info/javascript_sha256.html

    //when login button is clicked, checks that the two passwords are the same and not equal to nothing
    var $btnLogin = $("<ons-button class='buttoncs'>Login</ons-button>").appendTo($conFields).on("click", function(){
        
        //get values from user input
        var userinput = $('#username').val();
        var pwinput = $('#pw').val();
        
        if (userinput == '') {
            alert('Please enter a username.');
        } else if (pwinput == '') {
            alert('Please enter a password.');
        } else 
            //hashes the password then checks with the datastore if the details are the same
           var shapwinput = SHA256(pwinput)
            loadUser(userinput, shapwinput);
        
    });

    $("<br/>").appendTo($conFields);

    var $btnSignUp = $("<ons-button modifier='quiet' >Sign Up</ons-button>").appendTo($conFields).on("click", function(){
        showSignUp();
    });

    $("#maincontent").html($page);
    
}

/*------------------------------
SIGNUP PAGE - FUNCTIONS
------------------------------*/

            //function to create a user and input into the datastore.
            function createUser(_username, _password, _name) {
            var userObject = {
                username : _username, 
                password : _password,
                name : _name 
            };
            
            var data = JSON.stringify(userObject);
            //save data (username/pw/name) to .user of the current user
            var url = baseURl + "&action=save&objectid=" + encodeURIComponent(_username) + ".user&data=" + encodeURIComponent(data);
            
                $.ajax({
                url: url,
                cache: false
            })
    
                .done(function(data) {
                
            })  .fail(function (jqXHR, textStatus) {
                alert("Request failed: " + textStatus);
            });
            
            //initialize empty array [] for answersExam so that appending arrays work
            var url = baseURl + "&action=save&objectid=" + encodeURIComponent(_username) + ".answersExam&data=%5B%5D"
            
            $.ajax({
                url: url,
                cache: false
            })

                .done(function(data) {

                })  .fail(function (jqXHR, textStatus) {
                alert("Request failed: " + textStatus);
            });
                
            //initialize empty array [] for answersMood so that appending arrays work     
            var url = baseURl + "&action=save&objectid=" + encodeURIComponent(_username) + ".answersMood&data=%5B%5D"
                     
            $.ajax({
                url: url,
                cache: false
            })
           
                .done(function(data) {
        
            showLogin();
                
            //if request fails
            })  .fail(function (jqXHR, textStatus) {
                alert("Request failed: " + textStatus);
            });    
        }

/*------------------------------
SIGNUP PAGE
------------------------------*/
function showSignUp() {
    console.log("begin showSignUp()");

    //variables declared and appendTo elements
    //everything wrapped in an ons-page tag

    var $page = $("<ons-page></ons-page>");
    $("<div class='logo'></div>").appendTo($page);
    $("<div class='title'>QUIZI</div>").appendTo($page);


    //container for login fields and login button
    var $conFields = $("<div class='conFields2'></div>").appendTo($page);
    var $name = $("<ons-input id='name' modifier='underbar' placeholder='Name'  float></ons-input>").appendTo($conFields);
    $("<br/>").appendTo($conFields);
    $("<br/>").appendTo($conFields);
    var $username = $("<ons-input id='username' modifier='underbar' placeholder='Username' float></ons-input>").appendTo($conFields);
    $("<br/>").appendTo($conFields);
    $("<br/>").appendTo($conFields);
    var $pw = $("<ons-input id='pw' modifier='underbar' type='password' placeholder='Password' float></ons-input>").appendTo($conFields);
    $("<br/>").appendTo($conFields);
    $("<br/>").appendTo($conFields);
    var $cpw = $("<ons-input id='cpw' modifier='underbar' type='password' placeholder='Confirm password' float></ons-input>").appendTo($conFields);


    //footer and empty divs for spacing
    $("<div class='break'></div>").appendTo($conFields);
    $("<div class='footer'></div>").appendTo($page);
    $("<div class='break'></div>").appendTo($conFields);


    //Login button goes to Menu screen
    var $btnSignUp = $("<ons-button class='buttoncs'>Sign Up</ons-button>").appendTo($conFields).on("click", function(){
        
        // get variables from user input
        var snameinput = $('#name').val();
        var suserinput = $('#username').val();
        var spwinput = $('#pw').val();
        var scpwinput = $('#cpw').val();
        
        //validate sign up field - check if there is input and if the passwords match.
        function validate(){
            if(snameinput == '') {
                alert('Please enter a name.');
               
               }
            else if (suserinput == '') {
                alert('Please enter a username.');
                     
                     }
            else if(spwinput != scpwinput) {
                alert("Error: Passwords don't match!");
            } else {
                console.log('validation complete');
      
                var shaspwinput = SHA256(spwinput);
                createUser(suserinput, shaspwinput, snameinput);
	            ons.notification.toast({message: 'Sign up successful, please log in.', timeout: 3000});
                showLogin();
                }
        }
        validate();
                                                                                                    
    }); 
                                                                                                    
    $("<br/>").appendTo($conFields);

    var $btnLogin = $("<ons-button modifier='quiet' >Login</ons-button>").appendTo($conFields).on("click", function(){
        showLogin();
    });
    $("#maincontent").html($page);
}


/*------------------------------
MENU PAGE
------------------------------*/
function showMenu() {
    console.log("begin showMenu()");

    //everything wrapped in an ons-page tag
    var $page = $("<ons-page></ons-page>");


    //toolbar - consists of heading(center), left(logout icon button), right(logo icon)
    var $toolbar = $("<ons-toolbar></ons-toolbar>").appendTo($page)
    var $tbcenter = $("<div class='center'></div>").appendTo($toolbar);
    $("<span class='menu'>Menu</span>").appendTo($tbcenter);
    var $tbright = $("<div class='right'></div>").appendTo($toolbar);
    var $tbleft = $("<div class='left'></div>").appendTo($toolbar);
    //left button to show alert
    var $tbbutton = $("<ons-toolbar-button></ons-toolbar-button>").appendTo($tbleft).on("click",         function() {
        $alertLogout.appendTo($page);
        $alertLogout.show();
        });;
    //icons for toolbar
    $("<ons-icon class='myicon'></ons-icon>").appendTo($tbright);
    $("<ons-icon icon='fa-user-circle-o'></ons-icon>").appendTo($tbbutton);


    //list to show the possible quiz types
    var $onsList = $("<ons-list></ons-list>").appendTo($page);
    //quiz buttons - mood + exam
    var $onsListMood = $("<ons-list-item tappable class='quizlistitem'></ons-list-item>").appendTo($onsList).on("click", function() {
        showQuizMood(); });
    var $onsListExam = $("<ons-list-item tappable  class='quizlistitem'></ons-list-item>").appendTo($onsList).on("click", function() {
        showQuizExam(); });
    var $onsListResults = $("<ons-list-item tappable  class='quizlistitem'></ons-list-item>").appendTo($onsList).on("click", function() {
        showResultsMenu(); });
    
    //append text to list title/subtitle
    $("<span class='list-item__title'>Mood Quiz</span>").appendTo($onsListMood);
    $("<span class='list-item__subtitle'>How are you feeling today?</span>").appendTo($onsListMood);
    $("<span class='list-item__title'>Exam Quiz</span>").appendTo($onsListExam);
    $("<span class='list-item__subtitle'>Test your knowledge!</span>").appendTo($onsListExam);
    $("<span class='list-item__title'>View Results</span>").appendTo($onsListResults);
    $("<span class='list-item__subtitle'>View your results for completed quizzes!</span>").appendTo($onsListResults);


    //footer that remains in same place
    $("<div class='footer'><div id='welcome'>Hello, Unregistered.</div></div>").appendTo($page);


    $("#maincontent").html($page);
	
	$("#welcome").html('Hello, ' + displayName + '!');
}

/*------------------------------
QUIZ PAGE - MOOD - FUNCTIONS
------------------------------*/
 // takes answers and send to the datastore in the form of an array
        function submitMoodQuiz(_answers) {
            var data = JSON.stringify(_answers);
            
            //appends each answer set as a new array to .answersMood
            var url = baseURl + "&action=append&objectid=" + encodeURIComponent(currentUsername) + ".answersMood&data=" + encodeURIComponent(data);
            
            $.ajax({
                url: url,
                cache: false
            })
                .done(function(data) {
                //goes back to menu after saves answers to datastore
                showMenu();
        
            //if request fails
                })  
                .fail(function (jqXHR, textStatus) {
                alert("Request failed: " + textStatus);
                });
        }

/*------------------------------
QUIZ PAGE - MOOD
------------------------------*/
function showQuizMood() {
    console.log("begin showQuizMood()");

    //everything wrapped in an ons-page tag
    var $page = $("<ons-page></ons-page>");


    //toolbar - consists of heading(center), left(logout icon button), right(logo icon)
    var $toolbar = $("<ons-toolbar></ons-toolbar>").appendTo($page)
    var $tbcenter = $("<div class='center'></div>").appendTo($toolbar);
    $("<span class='menu'>Mood Quiz</span>").appendTo($tbcenter);
    var $tbright = $("<div class='right'></div>").appendTo($toolbar);
    var $tbleft = $("<div class='left'></div>").appendTo($toolbar);
    //logout button to show alert
    var $tbbutton = $("<ons-toolbar-button></ons-toolbar-button>").appendTo($tbleft).on("click",         function() {
        $alertLogout.appendTo($page);
        $alertLogout.show();
        });;
    //menu button to show alert
    var $tbbutton2 = $("<ons-toolbar-button></ons-toolbar-button>").appendTo($tbright).on("click",         function() {
        $alertMenu.appendTo($page);
        $alertMenu.show();
        });;
    //icons for toolbar
    $("<ons-icon icon='home'></ons-icon>").appendTo($tbbutton2);
    $("<ons-icon icon='fa-user-circle-o'></ons-icon>").appendTo($tbbutton);


    //carousel container - swipeable
    var $Carcontainer = $("<ons-carousel fullscreen swipeable auto-scroll overscrollable id='carousel'></ons-carousel>").appendTo($page);

    //question 1 - popover + date input
    var $car1 = $("<ons-carousel-item></ons-carousel-item>").appendTo($Carcontainer);
    var $car1content = $("<div id='q1nMood' class='quiznumber'>Q1:</div><div class='quizhelp'><ons-button class='quizhelpbtn' onclick='showPopoverq1(this)'><ons-icon class='quizicon' icon='question-circle'></ons-icon></ons-button></div><div id='q1tMood' class='quizques'>Date </div><div class='quizanswer'><ons-input id='q1aMood' type='date'></ons-input></div><div class='break'></div>").appendTo($car1);
    //popover hint
    $("<ons-popover direction='up' id='popoverq1' cancelable><p id='pop1Mood'>The date you started this quiz.</p><p><ons-button class='buttoncs2' onclick='hidePopover()'>Close</ons-button></p></ons-popover>").appendTo($page);

    //question 2 - popover + text input
    var $car2 = $("<ons-carousel-item></ons-carousel-item>").appendTo($Carcontainer);
    var $car2content = $("<div class='quiznumber'>Q2:</div><div class='quizhelp'><ons-button class='quizhelpbtn' onclick='showPopoverq2(this)'><ons-icon class='quizicon' icon='question-circle'></ons-icon></ons-button></div><div id='q2tMood' class='quizques'>Name</div><div class='quizanswer'><ons-input id='q2aMood' placeholder='Enter your full name.'></ons-input></div>").appendTo($car2);
    //popover hint
    $("<ons-popover direction='up' id='popoverq2' cancelable><p id='pop2Mood'>Your full name.</p><p><ons-button class='buttoncs2' onclick='hidePopover()'>Close</ons-button></p></ons-popover>").appendTo($page);

    //question 3 - popover + text area
    var $car3 = $("<ons-carousel-item></ons-carousel-item>").appendTo($Carcontainer);
    var $car3content = $("<div class='quiznumber'>Q3:</div><div class='quizhelp'><ons-button class='quizhelpbtn' onclick='showPopoverq3(this)'><ons-icon class='quizicon' icon='question-circle'></ons-icon></ons-button></div><div class='quizques' id='q3tMood' >Diary </div><div class='quizanswer'><textarea class='textarea' placeholder='Enter your diary entry.' id='q3aMood'></textarea></div>").appendTo($car3);
    //popover hint
    $("<ons-popover direction='up' id='popoverq3' cancelable><p id='pop3Mood'>Write 4 paragraphs.</p><p><ons-button class='buttoncs2' onclick='hidePopover()'>Close</ons-button></p></ons-popover>").appendTo($page);

    //question 4 - radio button
    // 1 = male, 2 = female, 3 = depends
    var $car4 = $("<ons-carousel-item></ons-carousel-item>").appendTo($Carcontainer);
    var $car4content = $("<div class='quiznumber'>Q4:</div><div class='quizques' id='q4tMood'>Gender</div><div class='quizanswer'><ons-list-item  tappable><label class='left'><ons-radio name='gender' value ='1' input-id='radio-1' checked></ons-radio></label><label for='radio-1' id='q4radio1Mood' class='center'>Male</label></ons-list-item><ons-list-item tappable><label class='left'><ons-radio name='gender' value='2' input-id='radio-2'></ons-radio></label><label for='radio-2' id='q4radio2Mood' class='center'>Female</label></ons-list-item><ons-list-item tappable><label class='left'><ons-radio name='gender' value='3' input-id='radio-3'></ons-radio></label><label for='radio-3' class='center' id='q4radio3Mood'>Depends what day it is</label></ons-list-item></div>").appendTo($car4);


    //question 5 - mini carousel
    var $car5 = $("<ons-carousel-item></ons-carousel-item>").appendTo($Carcontainer);
    var $car5content = $("<div class='quiznumber'>Q5:</div><div class='quizques' id='q5tMood'>Mood</div><div class='quizanswer'><ons-carousel var='q5car' id='q5aMood' style='height: 100px; width:90%' swipeable auto-scroll overscrollable><ons-carousel-item style='background-color: #3B4C66;'><div id='q5car1Mood' style='text-align: center; font-size: 30px; margin-top: 30px; color: #fff;'>Sad 😭</div></ons-carousel-item><ons-carousel-item style='background-color: #49BDC3;'><div id='q5car2Mood' style='text-align: center; font-size: 30px; margin-top: 30px; color: #fff;'>Happy ☺️</div></ons-carousel-item><ons-carousel-item style='background-color: #FFC300;'><div id='q5car3Mood' style='text-align: center; font-size: 30px; margin-top: 30px; color: #fff;'>Laughing 😆</div></ons-carousel-item></ons-carousel></div>").appendTo($car5);

    //question 6 - gradient slider
    var $car6 = $("<ons-carousel-item></ons-carousel-item>").appendTo($Carcontainer);
    var $car6content = $("<div class='quiznumber'>Q6:</div><div class='quizques' id='q6tMood' >Happiness Today</div><div class='quizanswer'><ons-range class='quizrangemood' min='0' max='10' step='1' id='q6rangeMood' style='width: 90%;' value='5'></ons-range></div>").appendTo($car6);
    
    
    //question 7 - slider with value
    var $car7 = $("<ons-carousel-item></ons-carousel-item>").appendTo($Carcontainer);
    var $car7content = $("<div class='quiznumber'>Q7:</div><div class='quizques' id='q7tMood'>Blood Alcohol:</div><div class='quizanswer'><ons-range class='quizrangeBAC' min='0' max='0.5' step='0.01' id='q7rangeMood' onchange='updateValue()' style='width: 90%;' value='0.05'></ons-range><br/><br/><label class='quizlabel'>Level: </label><label class='quizlabel' id='labelValue'>0.05</label></div>").appendTo($car7);
    
    
    //footer that remains in same place
    var $footer = $("<div class='footer'><div id='welcome'>Hello, Unregistered.</div></div>").appendTo($page);

    var $buttoncontainer = $("<div class='confieldsSubmit'></div>").appendTo($footer);

    //Submit button floats with footer, shows submit alert
    var $quizMoodSubmit = $("<ons-button class='quizmoodbtn'>Submit</ons-button>").appendTo($buttoncontainer).on("click", function() {

		//get index of carousel
        var getcarou = document.getElementById('q5aMood');
        console.log('getcarou var =' + getcarou);
        //get user input of all answers
		var Moodq1 = $("#q1aMood").val();
        var Moodq2 = $("#q2aMood").val();
        var Moodq3 = $("#q3aMood").val();
        var Moodq4 = $("input[type='radio'][name='gender']:checked").val();
        var Moodq5 = getcarou.getActiveIndex();
        var Moodq6 = $("#q6rangeMood").val();
        var Moodq7 = $("#q7rangeMood").val();
	   
        //put all answers in an array to process
        var answers = [Moodq1, Moodq2, Moodq3, Moodq4, Moodq5, Moodq6, Moodq7];
        submitMoodQuiz(answers);
		
    });
    
    //Mini carousel in quiz
    //Function to slide left/back
    var quizprev = function() {
        var quizcarousel = $('quizcarousel');
        quizcarousel.quizprev();
    };
    //Function to slide right/forward
    var quiznext = function() {
        var quizcarousel = $('quizcarousel');
        quizcarousel.quiznext();
        
    };

    //Main carousel
    //Function to slide left/back
    var prev = function() {
        var carousel = $('carousel');
        carousel.prev();
    };
    //Function to slide right/forward
    var next = function() {
        var carousel = $('carousel');
        carousel.next();
    };

    $("#maincontent").html($page);
    $("#welcome").html('Hello, ' + displayName + '!');

    //add JSON file info to questions using IDs
    var JSONQuestions = new Array();
    $.getJSON('quizzes_sample.json', function (data) {
        JSONQuestions = data;
    })
    .fail(function() {
        console.log('error: JSON not loaded'); 
    })
    .done(function() {
    console.log( "JSON loaded!" );
    console.log("result: " + JSONQuestions[0]["questions"][0]["text"]);
    
    $("#q1tMood").html(JSONQuestions[0]["questions"][0]["text"]);
    $("#q2tMood").html(JSONQuestions[0]["questions"][1]["text"]);
    $("#q3tMood").html(JSONQuestions[0]["questions"][2]["text"]);
    $("#q4tMood").html(JSONQuestions[0]["questions"][3]["text"]);
        
    $("#pop1Mood").html(JSONQuestions[0]["questions"][0]["help"]);
    $("#pop2Mood").html(JSONQuestions[0]["questions"][1]["help"]);
    $("#pop3Mood").html(JSONQuestions[0]["questions"][2]["help"]);

    $("#q4radio1Mood").html(JSONQuestions[0]["questions"][3]["options"][0]);
    $("#q4radio2Mood").html(JSONQuestions[0]["questions"][3]["options"][1]);
    $("#q4radio3Mood").html(JSONQuestions[0]["questions"][3]["options"][2]);

    $("#q5car1Mood").html(JSONQuestions[0]["questions"][4]["options"][0] + " " + JSONQuestions[0]["questions"][4]["optionVisuals"][0]);
    $("#q5car2Mood").html(JSONQuestions[0]["questions"][4]["options"][1] + " " + JSONQuestions[0]["questions"][4]["optionVisuals"][1]);
    $("#q5car3Mood").html(JSONQuestions[0]["questions"][4]["options"][2] + " " + JSONQuestions[0]["questions"][4]["optionVisuals"][2]);
    }); 
}


/*------------------------------
QUIZ PAGE - EXAM (STUDENT INFO)
------------------------------*/
function showQuizExam() {
    console.log("begin showQuizExam");

    //everything wrapped in an ons-page tag
    var $page = $("<ons-page></ons-page>");

    //toolbar - consists of heading(center), left(logout icon button), right(logo icon)
    var $toolbar = $("<ons-toolbar></ons-toolbar>").appendTo($page)
    var $tbcenter = $("<div class='center'></div>").appendTo($toolbar);
    $("<span class='menu'>Exam Quiz - Info</span>").appendTo($tbcenter);
    var $tbright = $("<div class='right'></div>").appendTo($toolbar);
    var $tbleft = $("<div class='left'></div>").appendTo($toolbar);
    //logout button to show alert
    var $tbbutton = $("<ons-toolbar-button></ons-toolbar-button>").appendTo($tbleft).on("click", function() {
        $alertLogout.appendTo($page);
        $alertLogout.show();
    });;
    //menu button to show alert
    var $tbbutton2 = $("<ons-toolbar-button></ons-toolbar-button>").appendTo($tbright).on("click", function() {
        $alertMenu.appendTo($page);
        $alertMenu.show();
    });;
    //icons for toolbar
    $("<ons-icon icon='home'></ons-icon>").appendTo($tbbutton2);
    $("<ons-icon icon='fa-user-circle-o'></ons-icon>").appendTo($tbbutton);


    //question 1 - text input + validation error message for design purposes
    $("<div class='quiznumber'>Q1:</div><div class='quizques'>Student ID:</div><div class='quizanswer'><ons-input id='infoID' placeholder='Enter your SID.'></ons-input><br/></div>").appendTo($page);


    //question 2 - text input + popover
    $("<div class='quiznumber'>Q2:</div><div class='quizhelp'><ons-button class='quizhelpbtn' onclick='showPopoverExam(this)'><ons-icon class='quizicon' icon='question-circle'></ons-icon></ons-button></div><div class='quizques'>Name:</div><div class='quizanswer'><ons-input id='infoName' placeholder='Enter your full name.'></ons-input></div>").appendTo($page);
    //popover hint
    $("<ons-popover direction='up' id='popoverexam' cancelable><p>Your full name.</p><p><ons-button class='buttoncs2' onclick='hidePopoverExam()'>Close</ons-button></p></ons-popover>").appendTo($page);


    //footer that remains in same place
    var $footer = $("<div class='footer'><div id='welcome'>Hello, Unregistered.</div><br/>Student ID: <span id='infoExamID'></span><br/>Student name: <span id='infoExamName'></span></div>").appendTo($page);

    var $buttoncontainer = $("<div class='confieldsSubmit'></div>").appendTo($footer);
    
    var $quizMoodNext = $("<ons-button class='quizmoodbtn'>Next</ons-button>").appendTo($buttoncontainer).on("click", function() {
        
        var inputID = $('#infoID').val();
        var inputName = $('#infoName').val();
                
        if (inputID === '') {
            alert('Please enter your Student ID.');
        } else if (inputName === '') {
            alert('Please enter your name.');
        } else 
        //set storage of ID and name to be displayed in footer
        storage.setItem("infoID" , JSON.stringify(inputID));
        storage.setItem("infoName" , JSON.stringify(inputName));
        showQuizExamQ();
        
        
       
    });

    $("#maincontent").html($page);
	
	$("#welcome").html('Hello, ' + displayName + '!');


}

/*----------------------------------------
QUIZ PAGE - EXAM (QUESTIONS) - FUNCTIONS
----------------------------------------*/

// takes answers and send to the datastore in the form of an array
function submitExamQuiz(_answers) {
            var data = JSON.stringify(_answers);
            
            //appends each answers as a new array to .answersExam
            var url = baseURl + "&action=append&objectid=" + encodeURIComponent(currentUsername) + ".answersExam&data=" + encodeURIComponent(data);
            
            $.ajax({
                url: url,
                cache: false
            })
                .done(function(data) {
                //when successfully complete run this function
                showMenu();
        
        
            //if request fails
            })  .fail(function (jqXHR, textStatus) {
                alert("Request failed: " + textStatus);
            });
            
        } 


/*------------------------------
QUIZ PAGE - EXAM (QUESTIONS)
------------------------------*/
function showQuizExamQ() {
    console.log("begin showQuizExamQ");


    //everything wrapped in an ons-page tag
    //kept ons-page for this quiz so that it is scrollable = a more traditional quiz type (exam)
    //rather than carousel slide.
    var $page = $("<ons-page></ons-page>");


    //toolbar - consists of heading(center), left(logout icon button), right(logo icon)
    var $toolbar = $("<ons-toolbar></ons-toolbar>").appendTo($page)
    var $tbcenter = $("<div class='center'></div>").appendTo($toolbar);
    $("<span class='menu'>Exam Quiz</span>").appendTo($tbcenter);
    var $tbright = $("<div class='right'></div>").appendTo($toolbar);
    var $tbleft = $("<div class='left'></div>").appendTo($toolbar);
    //logout button to show alert
    var $tbbutton = $("<ons-toolbar-button></ons-toolbar-button>").appendTo($tbleft).on("click", function() {
        $alertLogout.appendTo($page);
        $alertLogout.show();
    });;
    //menu button to show alert
    var $tbbutton2 = $("<ons-toolbar-button></ons-toolbar-button>").appendTo($tbright).on("click", function() {
        $alertMenu.appendTo($page);
        $alertMenu.show();
    });;
    //icons for toolbar
    $("<ons-icon icon='home'></ons-icon>").appendTo($tbbutton2);
    $("<ons-icon icon='fa-user-circle-o'></ons-icon>").appendTo($tbbutton);


    //question 3 - input text
    $("<div class='quiznumber'>Q3:</div><div class='quizques'>What is the capital of Australia?</div><div class='quizanswer'><ons-input id='q3aExam' placeholder='Enter your answer.'></ons-input><div class='break'></div></div>").appendTo($page);


    //question 4 - input text
    $("<div class='quiznumber'>Q4:</div><div class='quizques'>What is the largest state in Australia?</div><div class='quizanswer'><ons-input id='q4aExam' placeholder='Enter your answer.'></ons-input><br/><div class='break'></div></div>").appendTo($page);


    //question 5 - radio button
    // 0 = sydney, 1 = brisbane, 2 = melbourne
    $("<div class='quiznumber'>Q5:</div><div class='quizques'>What is the capital of Victoria?</div><div class='quizanswer'><ons-list-item  tappable><label class='left'><ons-radio name='capitalaus' value='Sydney' input-id='radio-1' checked></ons-radio></label><label for='radio-1' class='center'>Sydney</label></ons-list-item><ons-list-item tappable><label class='left'><ons-radio name='capitalaus' value='Brisbane' input-id='radio-2'></ons-radio></label><label for='radio-2' class='center'>Brisbane</label></ons-list-item><ons-list-item tappable><label class='left'><ons-radio name='capitalaus' value='Melbourne' input-id='radio-3'></ons-radio></label><label for='radio-3' class='center'>Melbourne</label></ons-list-item><div class='break'></div></div>").appendTo($page);

    //values "ACT","NSW","NT","QLD","SA","TAS","VIC","WA"
    //question 6 - multichoice checkbox button
    $("<div class='quiznumber'>Q6:</div><div class='quizques'>Which are the territories of Australia?</div><div class='quizanswer'>  <ons-list-item tappable><label class='left'><ons-checkbox name='terraus' value='ACT' input-id='check-1'></ons-checkbox></label><label for='check-1' class='center'>ACT</label></ons-list-item><ons-list-item tappable><label class='left'><ons-checkbox name='terraus' value='NSW' input-id='check-2'></ons-checkbox></label><label for='check-2' class='center'>NSW</label></ons-list-item><ons-list-item tappable><label class='left'><ons-checkbox name='terraus' value='NT' input-id='check-3'></ons-checkbox></label><label for='check-3' class='center'>NT</label></ons-list-item><ons-list-item tappable><label class='left'><ons-checkbox name='terraus' value='QLD' input-id='check-4'></ons-checkbox></label><label for='check-4' class='center'>QLD</label></ons-list-item><ons-list-item tappable><label class='left'><ons-checkbox name='terraus' value='SA' input-id='check-5'></ons-checkbox></label><label for='check-5' class='center'>SA</label></ons-list-item><ons-list-item tappable><label class='left'><ons-checkbox name='terraus' value='TAS' input-id='check-6'></ons-checkbox></label><label for='check-6' class='center'>TAS</label></ons-list-item><ons-list-item tappable><label class='left'><ons-checkbox name='terraus' value='VIC' input-id='check-7'></ons-checkbox></label><label for='check-7' class='center'>VIC</label></ons-list-item><ons-list-item tappable><label class='left'><ons-checkbox name='terraus' value='WA' input-id='check-8'></ons-checkbox></label><label for='check-8' class='center'>WA</label></ons-list-item></div>").appendTo($page);
    //breaks for page spacing
    $("<div class='break'></div><div class='break'></div><div class='break'></div><div class='break'></div>").appendTo($page);


    //footer that remains in same place
    var $footer = $("<div class='footer'><div id='welcome'>Hello, Unregistered.</div><br/>Student ID: <span id='infoExamID'></span><br/>Student name: <span id='infoExamName'></span></div>").appendTo($page);

    var $buttoncontainer = $("<div class='confieldsSubmit'></div>").appendTo($footer);
    
    //Submit button floats with footer, shows submit alert
    var $quizMoodSubmit = $("<ons-button class='quizmoodbtn'>Submit</ons-button>").appendTo($buttoncontainer).on("click", function() {	
		//get user input from forms, checkbox as an array
        var Examq3 = $("#q3aExam").val();
        var Examq4 = $("#q4aExam").val();
        var Examq5 = $("input[type='radio'][name='capitalaus']:checked").val();
        var Examq6 = [];

        //add each checkbox that is checked and then add to array
        $('input[name="terraus"]:checked').each(function() { 
            Examq6.push($(this).val());
            });
	   
        //put all inputs in an array
        var answers = [Examq3, Examq4, Examq5, Examq6];
        
        console.log('array of answers = ' + answers);
        submitExamQuiz(answers);
		
    });

    $("#maincontent").html($page);
	$("#welcome").html('Hello, ' + displayName + '!');
    
    var a = storage.getItem("infoID");
    var b = storage.getItem("infoName");
    console.log('names a and b; ' + a + b);
    
    var tempid = JSON.parse(a);               
    var tempname = JSON.parse(b);                
    
    console.log('names tempid, tempname; ' + tempid + tempname);

    
    $('#infoExamID').html(tempid);
    $('#infoExamName').html(tempname);

}

/*------------------------------
STATISTICS/RESULTS PAGE
------------------------------*/

    //creates page content of mood answers
    //uses local storage to find out which attempt the user is viewing
    //uses this to get the correct attempt answer array from the datastore
    //places the user's answers in a disabled version of the quiz, so users can see 
    //what they had previously answered
    function getMoodAnswers() {
            var url = baseURl + "&action=load&objectid=" + encodeURIComponent(currentUsername) + ".answersMood";
        
            $.ajax({
                url: url,
                cache: false
            })
                .done(function(data) {
                var jdata = JSON.parse(data);
                //use local storage to get correct array of which user attempt (ie. quiz attempt 2).
                var temp = storage.getItem("resultrefMood");                
                var jtemp = JSON.parse(temp);
                var newContent = '';
        
        //add q1 disabled
        newContent += "<div class='quiznumber'>Q1:</div><div class='quizques'>Date </div><div class='quizanswer'><ons-input disabled id='q1aMood' type='date'></ons-input></div><div class='break'></div>";
                
        //add q2 disabled
        newContent += "<div class='quiznumber'>Q2:</div><div class='quizques'>Name </div><div class='quizanswer'><ons-input id='q2aMood' disabled placeholder='Enter your full name.'></ons-input><br/><div class='break'></div></div>";
                
        //add q3 disabled
        newContent += "<div class='quiznumber'>Q3:</div><div class='quizques'>Diary </div><div class='quizanswer'><textarea id='q3aMood' disabled class='textarea' placeholder='Enter your diary entry.'></textarea><br/><div class='break'></div></div>"; 
                
        //add q4 disabled
        newContent += "<div class='quiznumber'>Q4:</div><div class='quizques'>Gender </div><div class='quizanswer'><ons-list-item><label class='left'><ons-radio disabled name='gender' id='1' value='1' input-id='radio-1'></ons-radio></label><label for='radio-1' class='center'>Male</label></ons-list-item><ons-list-item tappable><label class='left'><ons-radio id='2' value='2' disabled='true' name='gender' input-id='radio-2'></ons-radio></label><label for='radio-2' class='center'>Female</label></ons-list-item><ons-list-item tappable><label class='left'><ons-radio id='3' value='3' disabled='true' name='gender' input-id='radio-3'></ons-radio></label><label for='radio-3' class='center'>Depends what day it is</label></ons-list-item><div class='break'></div></div>";
                
        //add q5 disabled
        newContent += "<div class='quiznumber'>Q5:</div><div class='quizques' id='q5tMood'>Mood </div><div class='quizanswer'><ons-carousel disabled var='q5car' id='q5aMood2' style='height: 100px; width:90%' swipeable auto-scroll overscrollable><ons-carousel-item style='background-color: #3B4C66;'><div id='q5car1Mood' style='text-align: center; font-size: 30px; margin-top: 30px; color: #fff;'>Sad 😭</div></ons-carousel-item><ons-carousel-item style='background-color: #49BDC3;'><div id='q5car2Mood' style='text-align: center; font-size: 30px; margin-top: 30px; color: #fff;'>Happy ☺️</div></ons-carousel-item><ons-carousel-item style='background-color: #FFC300;'><div id='q5car3Mood' style='text-align: center; font-size: 30px; margin-top: 30px; color: #fff;'>Laughing 😆</div></ons-carousel-item></ons-carousel></div>";
                
        //add q6 disabled
        newContent += "<div class='quiznumber'>Q6:</div><div class='quizques' id='q6tMood' >Happiness Today</div><div class='quizanswer'><ons-range disabled class='quizrangemood' min='0' max='10' step='1' id='q6rangeMood' style='width: 90%;' value='5'></ons-range></div>";
                
        //add q7 disabled
        newContent += "<div class='quiznumber'>Q7:</div><div class='quizques' id='q7tMood' >Blood Alcohol </div><div class='quizanswer'><ons-range disabled class='quizrangeBAC' min='0' max='0.5' step='0.01' id='q7rangeMood' onchange='updateValue()' style='width: 90%;' value='0.05'></ons-range><br/><br/><label class='quizlabel'>Level: </label><label class='quizlabel' id='labelValue'>0.05</label></div><div class='break'</div>";
                
                //add disabled content to page
                document.getElementById('addedcontent').innerHTML = newContent;
                
                //using ID's, input datastore data into the associated quiz answer box.
                var getcarous = document.getElementById('q5aMood2');
                console.log("carous= " + getcarous);
                $("#q1aMood").val(jdata[jtemp][0]);
                $("#q2aMood").val(jdata[jtemp][1]);
                $("#q3aMood").val(jdata[jtemp][2]);
                document.getElementById(jdata[jtemp][3]).checked = true;
                getcarous.setActiveIndex(jdata[jtemp][4]);
                $("#q6rangeMood").val(jdata[jtemp][5]);
                $("#q7rangeMood").val(jdata[jtemp][6]);
                $("#labelValue").html(jdata[jtemp][6])
                $('#resultname').html(displayName);

            //if request fails
            })  .fail(function (jqXHR, textStatus) {
                alert("Request failed: " + textStatus);
            });
        }

    //validates answers and sets mark as well as the same functionality as getMoodAnswers();
    //creates page content of exam answers
    //uses local storage to find out which attempt the user is viewing
    //uses this to get the correct attempt answer array from the datastore
    //places the user's answers in a disabled version of the quiz, so users can see 
    //what they had previously answered
    //validates the answers from datastore
    //changes message to correct/incorrect depending on validation
    //calculates mark at end
    function getExamAnswers() {
            
            //appends each answers as a new array
            var url = baseURl + "&action=load&objectid=" + encodeURIComponent(currentUsername) + ".answersExam";

            $.ajax({
                url: url,
                cache: false
            })
                .done(function(data) {
                var jdata = JSON.parse(data);
                var temp = storage.getItem("resultref");
                
                var jtemp = JSON.parse(temp);
                var newContent = '';
                //initialize marks
                var marks = 0;
                
        //add q3 disabled
        newContent += "<div class='quiznumber'>Q3:</div><div class='quizques'>What is the capital of Australia?</div><div class='quizanswer'><ons-input disabled='true' type='text' id='q3aExam'  placeholder='Enter your answer.'></ons-input><div class='break'></div></div></ons-input><div class='break'></div></div>";
        
        //validate q3 using datastore answers
        if(jdata[jtemp][0] == 'Canberra'){
            newContent += "<ons-icon class='correctq' icon='fa-check'></ons-icon><div class='revques'><span class='boldtxt'>Correct! </span></div>";
            //add marks
            marks += 5;
        }
        else {
             newContent += "<ons-icon class='incorrectq' icon='fa-times'></ons-icon><div class='revques'><span class='boldtxt'>Correct answer: Canberra </span></div>";
        }
                
        //add q4 disabled
        newContent += "<div class='quiznumber'>Q4:</div><div class='quizques'>What is the largest state in Australia?</div><div class='quizanswer'><ons-input id='q4aExam' disabled='true' placeholder='Enter your answer.'></ons-input><br/><div class='break'></div></div>";

                
        //validate q4 using datastore answers
        if(jdata[jtemp][1] == 'Western Australia' || jdata[jtemp][1] == 'WA'){                  
            newContent += "<ons-icon class='correctq' icon='fa-check'></ons-icon><div class='revques'><span class='boldtxt'>Correct! </span></div>";
            //add marks
            marks += 5;
           }
        else {
             newContent += "<ons-icon class='incorrectq' icon='fa-times'></ons-icon><div class='revques'><span class='boldtxt'>Correct answer: WA or Western Australia </span></div>";
        }            
       
                
        //add q5 disabled
        newContent += "<div class='quiznumber'>Q5:</div><div class='quizques'>What is the capital of Victoria?</div><div class='quizanswer'><ons-list-item  tappable><label class='left'><ons-radio disabled='true' name='capitalaus' id='Sydney' value='Sydney' input-id='radio-1'></ons-radio></label><label for='radio-1' class='center'>Sydney</label></ons-list-item><ons-list-item tappable><label class='left'><ons-radio id='Brisbane' value='Brisbane' disabled='true' name='capitalaus' input-id='radio-2'></ons-radio></label><label for='radio-2' class='center'>Brisbane</label></ons-list-item><ons-list-item tappable><label class='left'><ons-radio id='Melbourne' value='Melbourne' disabled='true' name='capitalaus' input-id='radio-3'></ons-radio></label><label for='radio-3' class='center'>Melbourne</label></ons-list-item><div class='break'></div></div>";
                

        //validate q5 using datastore
        if(jdata[jtemp][2] == 'Melbourne'){              
            newContent += "<ons-icon class='correctq' icon='fa-check'></ons-icon><div class='revques'><span class='boldtxt'>Correct! </span></div>";
            //add marks
            marks += 5;
           }
        else {
             newContent += "<ons-icon class='incorrectq' icon='fa-times'></ons-icon><div class='revques'><span class='boldtxt'>Correct answer: Melbourne </span></div>";
        }
        
        //add q6 disabled
        newContent += "<div class='quiznumber'>Q6:</div><div class='quizques'>Which are the territories of Australia?</div><div class='quizanswer'><ons-list-item tappable><label class='left'><ons-checkbox name='terraus' disabled='true' id='ACT' value='ACT' input-id='check-1'></ons-checkbox></label><label for='check-1' class='center'>ACT</label></ons-list-item><ons-list-item tappable><label class='left'><ons-checkbox name='terraus' disabled='true' id='NSW' value='NSW' input-id='check-2'></ons-checkbox></label><label for='check-2' class='center'>NSW</label></ons-list-item><ons-list-item tappable><label class='left'><ons-checkbox name='terraus' disabled='true' id='NT' value='NT' input-id='check-3'></ons-checkbox></label><label for='check-3' class='center'>NT</label></ons-list-item><ons-list-item tappable><label class='left'><ons-checkbox name='terraus' disabled='true' id='QLD' value='QLD' input-id='check-4'></ons-checkbox></label><label for='check-4' class='center'>QLD</label></ons-list-item><ons-list-item tappable><label class='left'><ons-checkbox name='terraus' disabled='true' id='SA' value='SA' input-id='check-5'></ons-checkbox></label><label for='check-5' class='center'>SA</label></ons-list-item><ons-list-item tappable><label class='left'><ons-checkbox name='terraus' disabled='true' id='TAS' value='TAS' input-id='check-6'></ons-checkbox></label><label for='check-6' class='center'>TAS</label></ons-list-item><ons-list-item tappable><label class='left'><ons-checkbox name='terraus' disabled='true' id='VIC' value='VIC' input-id='check-7'></ons-checkbox></label><label for='check-7' class='center'>VIC</label></ons-list-item><ons-list-item tappable><label class='left'><ons-checkbox name='terraus' disabled='true' id='WA' value='WA' input-id='check-8'></ons-checkbox></label><label for='check-8' class='center'>WA</label></ons-list-item></div><div class='break'></div>"        
                
        //validate q6 using data store;
        //check if length of checkbox array is == 2 as there are 2 answers, prevents user from getting question right if they had NT and ACT but also another answer.
        if(jdata[jtemp][3].length == 2){
          //check if answers are [0] = ACT and [1] = NT, as the position of answers will always be static as answers are added into the array by a loop.
          if(jdata[jtemp][3][0] == 'ACT' && jdata[jtemp][3][1] == 'NT'){
               newContent += "<ons-icon class='correctq' icon='fa-check'></ons-icon><div class='revques'><span class='boldtxt'>Correct! </span></div>";
               //add marks 
               marks += 5;
             }
            
            else {
                newContent += "<ons-icon class='incorrectq' icon='fa-times'></ons-icon><div class='revques'><span class='boldtxt'>Correct answer: ACT and NT </span></div>";
            }
           }
        else {
             newContent += "<ons-icon class='incorrectq' icon='fa-times'></ons-icon><div class='revques'><span class='boldtxt'>Correct answer: ACT and NT </span></div>";
        }            
                
                
                //finishing adding content
                document.getElementById('addedcontent').innerHTML = newContent;
                
                //add users input from quiz to disabled ver.
                $("#q3aExam").val(jdata[jtemp][0]);
                $("#q4aExam").val(jdata[jtemp][1]);
                document.getElementById(jdata[jtemp][2]).checked = true;
                //use a loop to put checkbox answers from datastore
                countCheck = 1;
                for (var m = 0; m < jdata[jtemp][3].length; m++) {        
                    document.getElementById(jdata[jtemp][3][m]).checked = true;
                    countCheck ++; 
                }
            $('#resultname').html(displayName);
            $('.resultspercent').html(marks + '/20 !');
            //if request fails
            })  .fail(function (jqXHR, textStatus) {
                alert("Request failed: " + textStatus);
            });
        }

//page that displays exam answers
//using getExamAnswers()
function showDetailResults() {
    //everything wrapped in an ons-page tag
    //scrollable results for easy viewing
    var $page = $("<ons-page></ons-page>");

    //toolbar - consists of heading(center), left(logout icon button), right(logo icon)
    var $toolbar = $("<ons-toolbar></ons-toolbar>").appendTo($page)
    var $tbcenter = $("<div class='center'></div>").appendTo($toolbar);
    $("<span class='menu'>Results</span>").appendTo($tbcenter);
    var $tbright = $("<div class='right'></div>").appendTo($toolbar);
    var $tbleft = $("<div class='left'></div>").appendTo($toolbar);
    //logout button to show alert
    var $tbbutton = $("<ons-toolbar-button></ons-toolbar-button>").appendTo($tbleft).on("click", function() {
        $alertLogout.appendTo($page);
        $alertLogout.show();
    });;
    //menu button to show alert
    var $tbbutton2 = $("<ons-toolbar-button></ons-toolbar-button>").appendTo($tbright).on("click", function() {
        showMenu();
    });;
    //icons for toolbar
    $("<ons-icon icon='home'></ons-icon>").appendTo($tbbutton2);
    $("<ons-icon icon='fa-user-circle-o'></ons-icon>").appendTo($tbbutton);


    //Text based on results
    $("<div class='quiznumber'>Results for: <span id='resultname'></span> <br/><span class='resultspercent'> 85% </span></div>").appendTo($page);
    $("<div class='break'></div>").appendTo($page);
    $("<div class='quiznumber'>Submitted answers:</div><div id='addedcontent'></div>").appendTo($page);


    getExamAnswers();

    $("<div class='break'></div><div class='break'></div><div class='break'></div>").appendTo($page);
    $("<div class='footer'><div id='welcome'>Hello, Unregistered.</div><br/>Student ID: <span id='infoExamID'></span><br/>Student name: <span id='infoExamName'></span></div>").appendTo($page);
   

    $("#maincontent").html($page);
	$("#welcome").html('Hello, ' + displayName + '!');
 
    var a = storage.getItem("infoID");
    var b = storage.getItem("infoName");
    console.log('names a and b; ' + a + b);
    
    var tempid = JSON.parse(a);               
    var tempname = JSON.parse(b);                
    
    console.log('names tempid, tempname; ' + tempid + tempname);

    
    $('#infoExamID').html(tempid);
    $('#infoExamName').html(tempname);

}

//page that displays mood answers
//using getMoodAnswers()
function showDetailResultsMood() {
    console.log("begin showDetailResultsMood");

    //everything wrapped in an ons-page tag
    //scrollable results for easy viewing
    var $page = $("<ons-page></ons-page>");

    //toolbar - consists of heading(center), left(logout icon button), right(logo icon)
    var $toolbar = $("<ons-toolbar></ons-toolbar>").appendTo($page)
    var $tbcenter = $("<div class='center'></div>").appendTo($toolbar);
    $("<span class='menu'>Results</span>").appendTo($tbcenter);
    var $tbright = $("<div class='right'></div>").appendTo($toolbar);
    var $tbleft = $("<div class='left'></div>").appendTo($toolbar);
    //logout button to show alert
    var $tbbutton = $("<ons-toolbar-button></ons-toolbar-button>").appendTo($tbleft).on("click",         function() {
        $alertLogout.appendTo($page);
        $alertLogout.show();
    });;
    //menu button to show alert
    var $tbbutton2 = $("<ons-toolbar-button></ons-toolbar-button>").appendTo($tbright).on("click",         function() {
        showMenu();
    });;
    //icons for toolbar
    $("<ons-icon icon='home'></ons-icon>").appendTo($tbbutton2);
    $("<ons-icon icon='fa-user-circle-o'></ons-icon>").appendTo($tbbutton);


    //Text based on results
    $("<div class='quiznumber'>Hello, <span id='resultname'></span></div>").appendTo($page);
    $("<div class='break'></div>").appendTo($page);
    $("<div class='quiznumber'>Entry input:</div><div id='addedcontent'></div>").appendTo($page);


    getMoodAnswers();
    $("<div class='break'></div><div class='break'></div><div class='break'></div>").appendTo($page);
    $("<div class='footer'><div id='welcome'>Hello, Unregistered.</div></div>").appendTo($page);


    $("#maincontent").html($page);
	$("#welcome").html('Hello, ' + displayName + '!');

}
    //Generates ons-list of all attempts for both Mood quiz and Exam quiz.
    //Generates a loop that creates an on-click event for each attempt list item
    //The on-click event assigns a variable that is stored in localstorage that keeps track of which attempt
    //the user has clicked on so that when getting attempt from data-store the correct attempt is passed.
    //User can click on any of the attempts and be shown their entries in detail for that attempt.
    function loadResultsMenu() {
        
        //GENERATE LIST FOR EXAM    
            var url = baseURl + "&action=load&objectid=" + encodeURIComponent(currentUsername) + ".answersExam";
                
            $.ajax({
                url: url,
                cache: false
            })
                .done(function(data) {
				    var jdata = JSON.parse(data);

                    //checks if there are any answers in .answersExam
                    if(jdata.length >= 1){
                    var newContent = '';
                    //loop that creates a new ons-list item from the array length stored in data store
                    count = 1;
                        for (var i = 0; i < jdata.length; i++) {
                        newContent += "<ons-list-item tappable id='"+i+"' class='quizlistitem'><div class='center list-item__center'><div class='list-item__title'>Exam Quiz Attempt </div><span class='list-item__title'>" + count;
                        newContent += "</span></div></ons-list-item>";
                        count ++;    
                    }
                    //add content to page
                    document.getElementById('addedcontent').innerHTML = newContent;
            
                    //a loop that creates an on-click func using the length of quizlistitem's created
                    var c = document.getElementsByClassName("quizlistitem");     
                    for (var i = 0; i < c.length; i++) {
                
                    //when onclick func is clicked, gets a variable for which in the array and then stores
                    //into local storage for later reference when getting results from datastore.
                        c[i].onclick = function() {
                        var temp = $(this).attr('id');
                            
                        storage.setItem("resultref" , JSON.stringify(temp));
                        showDetailResults();
                        }
                    }        
                    
                        // if there are no entries, make an unclickable list item which says 'no attempt for quiz yet'8
                    } else if(jdata.length == 0) {
                        newContent2 = '';
                        console.log('else; user has no results for exam quiz');
                        newContent2 += "<ons-list-item class='quizlistitem'><div class='center list-item__center'><span class='list-item__title'>No attempts for Exam Quiz yet!</span></div></ons-list-item>";
                        console.log("adding error to log");
                        document.getElementById('addedcontent').innerHTML = newContent2; 
                    }
                
                //if request fails
                })  .fail(function (jqXHR, textStatus) {
                    alert("Request failed:" + textStatus);
                });
        
         
         
        //GENERATE LIST FOR MOOD    
            var url = baseURl + "&action=load&objectid=" + encodeURIComponent(currentUsername) + ".answersMood";
            
            $.ajax({
                url: url,
                cache: false
            })
                .done(function(data) {
                    //checks if there are any answers in .answersMood
					var jdata = JSON.parse(data);
                    if(jdata.length >= 1){
                        
                        //loop that creates a new ons-list item from the array length stored in data store
                        var newContentMood = '';
                        count = 1;
                        for (var i = 0; i < jdata.length; i++) {
                                newContentMood += "<ons-list-item tappable id='"+i+"' class='quizlistitemMood'><div class='center list-item__center'><div class='list-item__title'>Mood Quiz Attempt </div><span class='list-item__title'>" + count;
                                newContentMood += "</span></div></ons-list-item>";
                                count ++; 
                        }
                    //add content to page
                    document.getElementById('addedcontentMood').innerHTML = newContentMood;
                    
                    //a loop that creates an on-click func using the length of quizlistitem's created        
                    var d = document.getElementsByClassName("quizlistitemMood"); 
                    for (var i = 0; i < d.length; i++) {
                    
                    //when onclick func is clicked, gets a variable for which in the array and then stores
                    //into local storage for later reference when getting results from datastore.
                        d[i].onclick = function() {
                            var tempMood = $(this).attr('id');
                            console.log(tempMood);
    
                            storage.setItem("resultrefMood" , JSON.stringify(tempMood));
                            showDetailResultsMood();
                        }
                    }        
                    
                // if there are no entries, make an unclickable list item which says 'no attempt for quiz yet'8
                } else if(jdata.length == 0) {
                    newContentMood2 = '';
                    console.log('else; user has no results for Mood quiz');
                    newContentMood2 += "<ons-list-item class='quizlistitem'><div class='center list-item__center'><span class='list-item__title'>No entries for Mood Quiz yet!</span></div></ons-list-item>";
                    console.log("adding error to log");
                    document.getElementById('addedcontentMood').innerHTML = newContentMood2; 
                 }

            //if request fails
            })  .fail(function (jqXHR, textStatus) {
                alert("Request failed: user doesnt exist" + textStatus);
            });

     
     }


/*------------------------------
 RESULTS OPTION PAGE
------------------------------*/
function showResultsMenu() {
    
    //everything wrapped in an ons-page tag
    var $page = $("<ons-page></ons-page>");


    //toolbar - consists of heading(center), left(logout icon button), right(logo icon)
    var $toolbar = $("<ons-toolbar></ons-toolbar>").appendTo($page)
    var $tbcenter = $("<div class='center'></div>").appendTo($toolbar);
    $("<span class='menu'>Results</span>").appendTo($tbcenter);
    var $tbright = $("<div class='right'></div>").appendTo($toolbar);
    var $tbleft = $("<div class='left'></div>").appendTo($toolbar);
    //left button to show alert
    var $tbbutton = $("<ons-toolbar-button></ons-toolbar-button>").appendTo($tbleft).on("click",         function() {
        $alertLogout.appendTo($page);
        $alertLogout.show();
        });;
    //menu button to show alert
    var $tbbutton2 = $("<ons-toolbar-button></ons-toolbar-button>").appendTo($tbright).on("click", function() {
        showMenu();
    });;
    //icons for toolbar
    $("<ons-icon icon='home'></ons-icon>").appendTo($tbbutton2);
    $("<ons-icon icon='fa-user-circle-o'></ons-icon>").appendTo($tbbutton);

    //list to show the possible quiz types
    var $onsList = $("<ons-list id='addedcontent'></ons-list>").appendTo($page);
    var $onsListMood = $("<ons-list id='addedcontentMood'></ons-list>").appendTo($page);    


    //footer that remains in same place
    $("<div class='footer'><div id='welcome'>Hello, Unregistered.</div></div>").appendTo($page);


    $("#maincontent").html($page);
	
	$("#welcome").html('Hello, ' + displayName + '!');
    loadResultsMenu(); 
}



/*-----------------------
DOCUMENT.READY FUNCTION
------------------------*/

$(document).ready(function () {
 showLogin();

});
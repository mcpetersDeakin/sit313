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


/*-------------------------------------------------
FUNCTIONS + VARIABLES OUTSIDE OF SCREEN FUNCTIONS
--------------------------------------------------*/

//GLOBAL:

 window.baseURl = "http://introtoapps.com/datastore.php?appid=215123769";
 window.currentUsername = null;
var smd = '';
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


    //Login button goes to Menu screen
    var $btnLogin = $("<ons-button class='buttoncs'>Login</ons-button>").appendTo($conFields).on("click", function(){

        var userinput = $('#username').val();
        var pwinput = $('#pw').val();
        
        
        
    });

    $("<br/>").appendTo($conFields);

    var $btnSignUp = $("<ons-button modifier='quiet' >Sign Up</ons-button>").appendTo($conFields).on("click", function(){
        showSignUp();
    });

    $("#maincontent").html($page);
    
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
        
        
        var snameinput = $('#name').val();
        var suserinput = $('#username').val();
        var spwinput = $('#pw').val();
        var scpwinput = $('#cpw').val();
       
        console.log('snameinput = ' + snameinput + ' suserinput = ' + suserinput + ' spwinput = ' + spwinput + ' scpwinput= ' + scpwinput);
        
  if(spwinput.value != scpwinput.value) {
   alert('ur pws dont match!');
  } else {
    console.log('pws match');
    //createUser(suserinput, scpwinput, 21);
  }
        validate();

        
        function validate(){
            if(snameinput == '') {
                console.log('no name');
               
               }
            else if (suserinput == '') {
                console.log('no username');
                     
                     }
  else if(spwinput.value != scpwinput.value) {
    console.log("Passwords Don't Match");
  } else {
   console.log('validation complete');
  }
}

        
        
        
        
        

        
        ons.notification.toast({message: 'Sign up successful, please log in.', timeout: 3000});
        showLogin();
    });
    
    
            function createUser(_username, _password, _age) {
            var userObject = {
                //black text is whatever is inside username box - user's data. dont use = in objects, use a colon and use commas at end except the last one.
                username : _username, 
                password : _password,
                age : _age 
            };
            //data must be a string. want it to be a string of above variables ^ user, pw, age
            //easiest way to do this is to use JSON.stringify() and JSON.parse()
            
            var data = JSON.stringify(userObject);
            alert("data to be saved " + data);
            
            //create a url for saving
            //always have & symbol before variables except the first one which is a ? ie. .php?appid=123&user=meg
            var url = baseURl + "&action=save&objectid=" + encodeURIComponent(_username) + ".user&data=" + encodeURIComponent(data);
            alert("URL: " + url);
            
            //this block of code is the actual request
            $.ajax({
                url: url,
                cache: false
            })
            //note: data below has nothing to do with var data = JSON.stringify, different scope bc opened up curly brackets.
                .done(function(data) {
                //when successfully complete run this function
                alert("Result from server: " + data);
                $("body").append(data);
            
            //if request fails
            })  .fail(function (jqXHR, textStatus) {
                alert("Request failed: " + textStatus);
            });
            
        }
    
    
    
    

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
    //append text to list title/subtitle
    $("<span class='list-item__title'>Mood Quiz</span>").appendTo($onsListMood);
    $("<span class='list-item__subtitle'>How are you feeling today?</span>").appendTo($onsListMood);
    $("<span class='list-item__title'>Exam Quiz</span>").appendTo($onsListExam);
    $("<span class='list-item__subtitle'>Test your knowledge!</span>").appendTo($onsListExam);


    //footer that remains in same place
    $("<div class='footer'></div>").appendTo($page);


    $("#maincontent").html($page);
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
    var $car1content = $("<div id='q1nMood' class='quiznumber'>Q1:</div><div class='quizhelp'><ons-button class='quizhelpbtn' onclick='showPopoverq1(this)'><ons-icon class='quizicon' icon='question-circle'></ons-icon></ons-button></div><div id='q1tMood' class='quizques'></div><div class='quizanswer'><ons-input id='q1aMood' type='date'></ons-input></div><div class='break'></div>").appendTo($car1);
    //popover hint
    $("<ons-popover direction='up' id='popoverq1' cancelable><p id='pop1Mood'></p><p><ons-button class='buttoncs2' onclick='hidePopover()'>Close</ons-button></p></ons-popover>").appendTo($page);

    //question 2 - popover + text input
    var $car2 = $("<ons-carousel-item></ons-carousel-item>").appendTo($Carcontainer);
    var $car2content = $("<div class='quiznumber'>Q2:</div><div class='quizhelp'><ons-button class='quizhelpbtn' onclick='showPopoverq2(this)'><ons-icon class='quizicon' icon='question-circle'></ons-icon></ons-button></div><div id='q2tMood' class='quizques'></div><div class='quizanswer'><ons-input id='q2aMood' placeholder='Enter your full name.'></ons-input></div>").appendTo($car2);
    //popover hint
    $("<ons-popover direction='up' id='popoverq2' cancelable><p id='pop2Mood'></p><p><ons-button class='buttoncs2' onclick='hidePopover()'>Close</ons-button></p></ons-popover>").appendTo($page);

    //question 3 - popover + text area
    var $car3 = $("<ons-carousel-item></ons-carousel-item>").appendTo($Carcontainer);
    var $car3content = $("<div class='quiznumber'>Q3:</div><div class='quizhelp'><ons-button class='quizhelpbtn' onclick='showPopoverq3(this)'><ons-icon class='quizicon' icon='question-circle'></ons-icon></ons-button></div><div class='quizques' id='q3tMood' ></div><div class='quizanswer'><textarea class='textarea' placeholder='Enter your diary entry.' id='q3aMood'></textarea></div>").appendTo($car3);
    //popover hint
    $("<ons-popover direction='up' id='popoverq3' cancelable><p id='pop3Mood'>Write 4 paragraphs.</p><p><ons-button class='buttoncs2' onclick='hidePopover()'>Close</ons-button></p></ons-popover>").appendTo($page);

    //question 4 - radio button
    var $car4 = $("<ons-carousel-item></ons-carousel-item>").appendTo($Carcontainer);
    var $car4content = $("<div class='quiznumber'>Q4:</div><div class='quizques' id='q4tMood'></div><div class='quizanswer'><ons-list-item  tappable><label class='left'><ons-radio name='gender' input-id='radio-1' checked></ons-radio></label><label for='radio-1' id='q4radio1Mood' class='center'></label></ons-list-item><ons-list-item tappable><label class='left'><ons-radio name='gender' input-id='radio-2'></ons-radio></label><label for='radio-2' id='q4radio2Mood' class='center'></label></ons-list-item><ons-list-item tappable><label class='left'><ons-radio name='gender' input-id='radio-3'></ons-radio></label><label for='radio-3' class='center' id='q4radio3Mood'></label></ons-list-item></div>").appendTo($car4);

    

    //question 5 - mini carousel
    var $car5 = $("<ons-carousel-item></ons-carousel-item>").appendTo($Carcontainer);
    var $car5content = $("<div class='quiznumber'>Q5:</div><div class='quizques' id='q5tMood'></div><div class='quizanswer'><ons-carousel var='q5car' id='bacon' style='height: 100px; width:90%' swipeable auto-scroll overscrollable><ons-carousel-item style='background-color: #3B4C66;'><div id='q5car1Mood' style='text-align: center; font-size: 30px; margin-top: 30px; color: #fff;'></div></ons-carousel-item><ons-carousel-item style='background-color: #49BDC3;'><div id='q5car2Mood' style='text-align: center; font-size: 30px; margin-top: 30px; color: #fff;'></div></ons-carousel-item><ons-carousel-item style='background-color: #FFC300;'><div id='q5car3Mood' style='text-align: center; font-size: 30px; margin-top: 30px; color: #fff;'></div></ons-carousel-item></ons-carousel></div>").appendTo($car5);
    
    
    //TODO - load JSON for gradient slider!
    //question 6 - gradient slider
    var $car6 = $("<ons-carousel-item></ons-carousel-item>").appendTo($Carcontainer);
    var $car6content = $("<div class='quiznumber'>Q6:</div><div class='quizques' id='q6tMood' ></div><div class='quizanswer'><ons-range class='quizrangemood' min='0' max='10' step='1' id='q6rangeMood' style='width: 90%;' value='5'></ons-range></div>").appendTo($car6);
    
    
    //TODO - load JSON for slider
    //question 7 - slider with value
    var $car7 = $("<ons-carousel-item></ons-carousel-item>").appendTo($Carcontainer);
    var $car7content = $("<div class='quiznumber'>Q7:</div><div class='quizques' id='q7tMood' >Blood Alcohol:</div><div class='quizanswer'><ons-range class='quizrangeBAC' min='0' max='0.5' step='0.01' id='q7rangeMood' onchange='updateValue()' style='width: 90%;' value='0.05'></ons-range><br/><br/><label class='quizlabel'>Level: </label><label class='quizlabel' id='labelValue'>0.05</label></div>").appendTo($car7);
   

    
    //footer that remains in same place
    var $footer = $("<div class='footer'></div>").appendTo($page);

    var $buttoncontainer = $("<div class='confieldsSubmit'></div>").appendTo($footer);

    //Submit button floats with footer, shows submit alert
    var $quizMoodSubmit = $("<ons-button class='quizmoodbtn'>Submit</ons-button>").appendTo($buttoncontainer).on("click", function() {
        $alertSubmit.appendTo($page);
        $alertSubmit.show();
    });
    

    //practiced q7 on codepen :
    /*
    JS:
    function updateTextInput() { 
  x = document.getElementById('ranger').value;
document.getElementById("text").innerHTML = x;

        }

function updater() {
  x = document.getElementById('ranger').value;  
  document.getElementById('ranger').value = x;
  document.getElementById('text').innerHTML = x;

}

HTML:
<input type="range" id='ranger' name="rangeInput" min="0" max="100" value="20" onchange="updateTextInput();">

<p id='text'>hi there</p>
 
<button onclick="updater()">change val to y = 50</button>
    
    */

    var $quizMoodSave = $("<ons-button class='quizmoodbtn'>Save</ons-button>").appendTo($buttoncontainer).on("click", function() {
        var Moodq1 = $("#q1aMood").val();
        var Moodq2 = $("#q2aMood").val();
        var Moodq3 = $("#q3aMood").val();
      //  var Moodq4 = $("input[name=gender]:checked").val();
        var Moodq6 = $("#q6rangeMood").val();
        var Moodq7 = $("#q7rangeMood").val();
        console.log("q 1: " + Moodq1 + " q2: " + Moodq2 + " q3: " + Moodq3 + " q6: " + Moodq6 + " q7: " + Moodq7);
        
       
    //console.log(q5car.getActiveIndex());

       // var quizcarousel = $('#bacon');
       // q5car.last();
       // console.log(quizcarousel)
            
//getItemIndex
//getActiveIndex **2k16
//getActiveCarouselItemIndex


  
  
        
//console.log('q5: ' + 'getactive index thing' + cartest.getActiveCarouselItemIndex());
        
        //To switch to a specific item the setActiveIndex(index) method is used.
        
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
    
    
    //add JSON file info to questions
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
    $("<div class='quiznumber'>Q1:</div><div class='quizques'>Student ID:</div><div class='quizanswer'><ons-input placeholder='Enter your SID.'></ons-input><br/><span class='validatesid'>*Error: Invalid SID. SID must be numbers only.<span></div>").appendTo($page);


    //question 2 - text input + popover
    $("<div class='quiznumber'>Q2:</div><div class='quizhelp'><ons-button class='quizhelpbtn' onclick='showPopoverExam(this)'><ons-icon class='quizicon' icon='question-circle'></ons-icon></ons-button></div><div class='quizques'>Name:</div><div class='quizanswer'><ons-input placeholder='Enter your full name.'></ons-input></div>").appendTo($page);
    //popover hint
    $("<ons-popover direction='up' id='popoverexam' cancelable><p>Your full name.</p><p><ons-button class='buttoncs2' onclick='hidePopoverExam()'>Close</ons-button></p></ons-popover>").appendTo($page);


    //footer that remains in same place
    var $footer = $("<div class='footer'></div>").appendTo($page);

    var $buttoncontainer = $("<div class='confieldsSubmit'></div>").appendTo($footer);
    //Submit button floats with footer, shows submit alert
    var $quizMoodSave = $("<ons-button class='quizmoodbtn'>Save</ons-button>").appendTo($buttoncontainer).on("click", function() {
    });

    var $quizMoodNext = $("<ons-button class='quizmoodbtn'>Next</ons-button>").appendTo($buttoncontainer).on("click", function() {
        showQuizExamQ();
    });



    $("#maincontent").html($page);

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
    $("<div class='quiznumber'>Q3:</div><div class='quizques'>What is the capital of Australia?</div><div class='quizanswer'><ons-input  placeholder='Enter your answer.'></ons-input><div class='break'></div></div>").appendTo($page);


    //question 4 - input text
    $("<div class='quiznumber'>Q4:</div><div class='quizques'>What is the largest state in Australia?</div><div class='quizanswer'><ons-input placeholder='Enter your answer.'></ons-input><br/><div class='break'></div></div>").appendTo($page);


    //question 5 - radio button
    $("<div class='quiznumber'>Q5:</div><div class='quizques'>What is the capital of Victoria?</div><div class='quizanswer'><ons-list-item  tappable><label class='left'><ons-radio name='capitalaus' input-id='radio-1' checked></ons-radio></label><label for='radio-1' class='center'>Sydney</label></ons-list-item><ons-list-item tappable><label class='left'><ons-radio name='capitalaus' input-id='radio-2'></ons-radio></label><label for='radio-2' class='center'>Brisbane</label></ons-list-item><ons-list-item tappable><label class='left'><ons-radio name='capitalaus' input-id='radio-3'></ons-radio></label><label for='radio-3' class='center'>Melbourne</label></ons-list-item><div class='break'></div></div>").appendTo($page);


    //question 6 - multichoice checkbox button
    $("<div class='quiznumber'>Q6:</div><div class='quizques'>Which are the territories of Australia?</div><div class='quizanswer'>  <ons-list-item tappable><label class='left'><ons-checkbox input-id='check-1'></ons-checkbox></label><label for='check-1' class='center'>ACT</label></ons-list-item><ons-list-item tappable><label class='left'><ons-checkbox input-id='check-2'></ons-checkbox></label><label for='check-2' class='center'>NSW</label></ons-list-item><ons-list-item tappable><label class='left'><ons-checkbox input-id='check-3'></ons-checkbox></label><label for='check-3' class='center'>NT</label></ons-list-item><ons-list-item tappable><label class='left'><ons-checkbox input-id='check-4'></ons-checkbox></label><label for='check-4' class='center'>QLD</label></ons-list-item><ons-list-item tappable><label class='left'><ons-checkbox input-id='check-5'></ons-checkbox></label><label for='check-5' class='center'>SA</label></ons-list-item><ons-list-item tappable><label class='left'><ons-checkbox input-id='check-6'></ons-checkbox></label><label for='check-6' class='center'>TAS</label></ons-list-item><ons-list-item tappable><label class='left'><ons-checkbox input-id='check-7'></ons-checkbox></label><label for='check-7' class='center'>VIC</label></ons-list-item><ons-list-item tappable><label class='left'><ons-checkbox input-id='check-8'></ons-checkbox></label><label for='check-8' class='center'>WA</label></ons-list-item></div>").appendTo($page);
    //breaks for page spacing
    $("<div class='break'></div><div class='break'></div><div class='break'></div><div class='break'></div>").appendTo($page);


    //footer that remains in same place
    var $footer = $("<div class='footer'></div>").appendTo($page);

    var $buttoncontainer = $("<div class='confieldsSubmit'></div>").appendTo($footer);
    //Submit button floats with footer, shows submit alert
    var $quizMoodPrev = $("<ons-button class='quizmoodbtn'>Back</ons-button>").appendTo($buttoncontainer).on("click", function() {
        showQuizExam();
    });
    var $quizMoodSave = $("<ons-button class='quizmoodbtn'>Save</ons-button>").appendTo($buttoncontainer).on("click", function() {

    });
    var $quizMoodSubmit = $("<ons-button class='quizmoodbtn'>Submit</ons-button>").appendTo($buttoncontainer).on("click", function() {
        $alertSubmit.appendTo($page);
        $alertSubmit.show();
    });



    $("#maincontent").html($page);

}


/*------------------------------
STATISTICS/RESULTS PAGE
------------------------------*/

function showStatistics() {
    console.log("begin showStatistics");

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


    //Text based on results (not yet functional)
    $("<div class='quiznumber'>Well done, Name! <br/><span class='resultspercent'> 85% </span></div>").appendTo($page);


    //break for spacing
    $("<div class='break'></div>").appendTo($page);


    //Recorded answers heading
    $("<div class='quiznumber'>Recorded answers:</div>").appendTo($page);


    //question 3 - copied from exam question but disabled version
    $("<div class='quiznumber'>Q3:</div><div class='quizques'>What is the capital of Australia?</div><div class='quizanswer'><ons-input  disabled='true' placeholder='Enter your answer.'></ons-input><div class='break'></div></div><ons-icon class='correctq' icon='fa-check'></ons-icon><div class='revques'><span class='boldtxt'>Correct! </span><br/>80% of students answered this question correctly.</div>").appendTo($page);


    //question 4 - copied from exam question but disabled version
    $("<div class='quiznumber'>Q4:</div><div class='quizques'>What is the largest state in Australia?</div><div class='quizanswer'><ons-input disabled='true' placeholder='Enter your answer.'></ons-input><br/><div class='break'></div></div><ons-icon class='correctq' icon='fa-check'></ons-icon><div class='revques'><span class='boldtxt'>Correct! </span><br/>80% of students answered this question correctly.</div>").appendTo($page);


    //question 5 - copied from exam question but disabled version
    $("<div class='quiznumber'>Q5:</div><div class='quizques'>What is the capital of Victoria?</div><div class='quizanswer'><ons-list-item  tappable><label class='left'><ons-radio disabled='true' name='capitalaus' input-id='radio-1' checked></ons-radio></label><label for='radio-1' class='center'>Sydney</label></ons-list-item><ons-list-item tappable><label class='left'><ons-radio disabled='true' name='capitalaus' input-id='radio-2'></ons-radio></label><label for='radio-2' class='center'>Brisbane</label></ons-list-item><ons-list-item tappable><label class='left'><ons-radio disabled='true' name='capitalaus' input-id='radio-3'></ons-radio></label><label for='radio-3' class='center'>Melbourne</label></ons-list-item><div class='break'></div></div><ons-icon class='incorrectq' icon='fa-times'></ons-icon><div class='revques'><span class='boldtxt'>Correct answer: Melbourne. </span><br/>65% of students answered this question correctly.</div>").appendTo($page);


    //question 6 - copied from exam question but disabled version
    $("<div class='quiznumber'>Q6:</div><div class='quizques'>Which are the territories of Australia?</div><div class='quizanswer'>  <ons-list-item tappable><label class='left'><ons-checkbox checked disabled='true' input-id='check-1'></ons-checkbox></label><label for='check-1' class='center'>ACT</label></ons-list-item><ons-list-item tappable><label class='left'><ons-checkbox disabled='true' input-id='check-2'></ons-checkbox></label><label for='check-2' class='center'>NSW</label></ons-list-item><ons-list-item tappable><label class='left'><ons-checkbox disabled='true' checked input-id='check-3'></ons-checkbox></label><label for='check-3' class='center'>NT</label></ons-list-item><ons-list-item tappable><label class='left'><ons-checkbox disabled='true' input-id='check-4'></ons-checkbox></label><label for='check-4' class='center'>QLD</label></ons-list-item><ons-list-item tappable><label class='left'><ons-checkbox disabled='true' input-id='check-5'></ons-checkbox></label><label for='check-5' class='center'>SA</label></ons-list-item><ons-list-item tappable><label class='left'><ons-checkbox disabled='true' input-id='check-6'></ons-checkbox></label><label for='check-6' class='center'>TAS</label></ons-list-item><ons-list-item tappable><label class='left'><ons-checkbox disabled='true' input-id='check-7'></ons-checkbox></label><label for='check-7' class='center'>VIC</label></ons-list-item><ons-list-item tappable><label class='left'><ons-checkbox disabled='true' input-id='check-8'></ons-checkbox></label><label for='check-8' class='center'>WA</label></ons-list-item></div><div class='break'></div><ons-icon class='correctq' icon='fa-check'></ons-icon><div class='revques'><span class='boldtxt'>Correct! </span><br/>80% of students answered this question correctly.</div>").appendTo($page);

    //break for spacing
    $("<div class='break'></div><div class='break'></div><div class='break'></div>").appendTo($page);


    //footer that remains in same place
    $("<div class='footer'></div>").appendTo($page);


    $("#maincontent").html($page);
}



/*-----------------------
DOCUMENT.READY FUNCTION
------------------------*/

$(document).ready(function () {

 //Load login when document is ready
 //so users start at the login page
 showQuizMood();


});

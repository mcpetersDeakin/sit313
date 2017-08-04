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

//how to create jquery properly: https://stackoverflow.com/questions/10619445/the-preferred-way-of-creating-a-new-element-with-jquery

//** can use the page var you created instead of $("#box"):


//$("#box").append("<div></div>");

//var div = $("<div></div>");
//$("#box").append(div);

//using variables can:
//$div.click(function(){ /* ... */ });
//$("#box").append($div);

/*---------
FUNCTIONS
---------*/
//Login page //

//snippet from onsen to make popovers work
//https://onsen.io/v2/api/js/ons-popover.html
//if i rewrite jquery the animation does weird things so i've left it as normal js

var showPopoverq1 = function(target) {
  document
    .getElementById('popoverq1')
    .show(target);
};

var showPopoverq2 = function(target) {
  document.getElementById('popoverq2').show(target);
};

var showPopoverq3 = function(target) {
  document.getElementById('popoverq3').show(target);
};

var showPopoverExam = function(target) {
  document
    .getElementById('popoverexam')
    .show(target);
};


var hidePopover = function() {
  document.getElementById('popoverq1').hide();
  document.getElementById('popoverq2').hide();
  document.getElementById('popoverq3').hide();
};
   
var hidePopoverExam = function() {
    document.getElementById('popoverexam').hide();
};
  

    
var $alerttest = $("<ons-alert-dialog animation='default'><div class='alert-dialog-title'>Logout?</div><div class='alert-dialog-content'>Are you sure you want to logout?</div><div class='alert-dialog-footer'><button class='alert-dialog-button' onclick='showLogin()'>OK</button><button class='alert-dialog-button' onclick='alertCancel()'>Cancel</button></div></ons-alert-dialog>");

var $alertMenu = $("<ons-alert-dialog animation='default'><div class='alert-dialog-title'>Exit Quiz?</div><div class='alert-dialog-content'>Your progress will not be saved.</div><div class='alert-dialog-footer'><button class='alert-dialog-button' onclick='showMenu()'>OK</button><button class='alert-dialog-button' onclick='alertCancel()'>Cancel</button></div></ons-alert-dialog>");

var $alertSubmit = $("<ons-alert-dialog animation='default'><div class='alert-dialog-title'>Submit Quiz?</div><div class='alert-dialog-content'>Do you want to submit the quiz?</div><div class='alert-dialog-footer'><button class='alert-dialog-button' onclick='showStatistics()'>OK</button><button class='alert-dialog-button' onclick='alertCancel()'>Cancel</button></div></ons-alert-dialog>");



function alertCancel() {
    $alertMenu.hide();
    $alerttest.hide();
    $alertSubmit.hide();

}

function showLogin() {
    console.log("begin showLogin()");
    
    //variables declared and appendto elements
    var $page = $("<ons-page></ons-page>"); 
    $("<div class='logo'></div>").appendTo($page);
    $("<div class='title'>QUIZI</div>").appendTo($page);    
    var $conFields = $("<div class='conFields'></div>").appendTo($page);
    var $username = $("<ons-input id='username' modifier='underbar' placeholder='Username'  float></ons-input>").appendTo($conFields);
    $("<br/>").appendTo($conFields);
    $("<br/>").appendTo($conFields);
    var $pw = $("<ons-input id='pw' modifier='underbar' type='password' placeholder='Password' float></ons-input>").appendTo($conFields);    
    $("<div class='break'></div>").appendTo($conFields);
    $("<div class='footer'></div>").appendTo($page);    
    $("<div class='break'></div>").appendTo($conFields);
    
    //button
    var $btnSignUp = $("<ons-button class='buttoncs'>Register</ons-button>").appendTo($conFields).on("click", function(){
        showMenu();
    });
    $("<span>                 </span>").appendTo($conFields);

    var $btnLogin = $("<ons-button class='buttoncs'>Login</ons-button>").appendTo($conFields).on("click", function(){
        showMenu();
    });

    
    //main
    $("#maincontent").html($page);
}



//SignUp page

function showSignUp() {
    console.log("begin showSignUp()");
    
    //variables declared and appendto elements
    var $page = $("<ons-page></ons-page>"); 
    $("<div class='logo'></div>").appendTo($page);
    $("<div class='title'>QUIZI</div>").appendTo($page);    
    


    
    //main
    $("#maincontent").html($page);
}



//Menu page//
function showMenu() {
    console.log("begin showMenu()");
    
    //variables
    var $page = $("<ons-page></ons-page>"); 
   

   //toolbar
    var $toolbar = $("<ons-toolbar></ons-toolbar>").appendTo($page)
    var $tbcenter = $("<div class='center'></div>").appendTo($toolbar); 
    $("<span class='menu'>Menu</span>").appendTo($tbcenter);
    var $tbright = $("<div class='right'></div>").appendTo($toolbar); 
    var $tbleft = $("<div class='left'></div>").appendTo($toolbar); 
    //logout button
    var $tbbutton = $("<ons-toolbar-button></ons-toolbar-button>").appendTo($tbleft).on("click",         function() {
        $alerttest.appendTo($page);
        $alerttest.show();
        });; 
    
    $("<ons-icon class='myicon'></ons-icon>").appendTo($tbright);
    $("<ons-icon icon='fa-user-circle-o'></ons-icon>").appendTo($tbbutton);
    var $onsList = $("<ons-list></ons-list>").appendTo($page);
    //quiz buttons
    var $onsListMood = $("<ons-list-item tappable class='quizlistitem'></ons-list-item>").appendTo($onsList).on("click",       function() {
            showQuizMood(); 
        });    
    
    var $onsListExam = $("<ons-list-item tappable  class='quizlistitem'></ons-list-item>").appendTo($onsList).on("click", function() {
    showQuizExam();
    });
    $("<span class='list-item__title'>Mood Quiz</span>").appendTo($onsListMood);
    $("<span class='list-item__subtitle'>How are you feeling today?</span>").appendTo($onsListMood);
    $("<span class='list-item__title'>Exam Quiz</span>").appendTo($onsListExam);
    $("<span class='list-item__subtitle'>Test your knowledge!</span>").appendTo($onsListExam);
    $("<div class='footer'></div>").appendTo($page);
  
  
    //solution to alert for multipages? maybe create a <div class='alert'></div> in html
    //then append the alert var to the alert class div, that way when overwriting the html
    //it doesnt overwrite the alert class bc its outisde of main content?
    //which shouldnt matter bc its hiding by default ??
    

    $("#maincontent").html($page);
}

//Quiz page (Mood)//
function showQuizMood() {
    console.log("begin showQuizMood()");
        
    var $page = $("<ons-page></ons-page>"); 

     
    //toolbar
    var $toolbar = $("<ons-toolbar></ons-toolbar>").appendTo($page)
    var $tbcenter = $("<div class='center'></div>").appendTo($toolbar); 
    $("<span class='menu'>Mood Quiz</span>").appendTo($tbcenter);
    var $tbright = $("<div class='right'></div>").appendTo($toolbar); 
    var $tbleft = $("<div class='left'></div>").appendTo($toolbar); 
    //logout button
    var $tbbutton = $("<ons-toolbar-button></ons-toolbar-button>").appendTo($tbleft).on("click",         function() {
        $alerttest.appendTo($page);
        $alerttest.show();
        });; 
    //menu button
    var $tbbutton2 = $("<ons-toolbar-button></ons-toolbar-button>").appendTo($tbright).on("click",         function() {
        $alertMenu.appendTo($page);
        $alertMenu.show();
        });; 
    //icons for toolbar
    $("<ons-icon icon='home'></ons-icon>").appendTo($tbbutton2);
    $("<ons-icon icon='fa-user-circle-o'></ons-icon>").appendTo($tbbutton);
    
    //carousel
    var $Carcontainer = $("<ons-carousel fullscreen swipeable auto-scroll overscrollable id='carousel'></ons-carousel>").appendTo($page);
    
    var $car1 = $("<ons-carousel-item></ons-carousel-item>").appendTo($Carcontainer);
    var $car1content = $("<div class='quiznumber'>Q1:</div><div class='quizhelp'><ons-button class='quizhelpbtn' onclick='showPopoverq1(this)'><ons-icon class='quizicon' icon='question-circle'></ons-icon></ons-button></div><div class='quizques'>Date:</div><div class='quizanswer'><ons-input type='date'></ons-input></div><div class='break'></div>").appendTo($car1);

    $("<ons-popover direction='up' id='popoverq1' cancelable><p>The date you started this quiz.</p><p><ons-button class='buttoncs2' onclick='hidePopover()'>Close</ons-button></p></ons-popover>").appendTo($page);
    
    var $car2 = $("<ons-carousel-item></ons-carousel-item>").appendTo($Carcontainer);    
    var $car2content = $("<div class='quiznumber'>Q2:</div><div class='quizhelp'><ons-button class='quizhelpbtn' onclick='showPopoverq2(this)'><ons-icon class='quizicon' icon='question-circle'></ons-icon></ons-button></div><div class='quizques'>Full name:</div><div class='quizanswer'><ons-input class='text-input' placeholder='Enter your full name.'></ons-input></div>").appendTo($car2);



    $("<ons-popover direction='up' id='popoverq2' cancelable><p>Your full name.</p><p><ons-button class='buttoncs2' onclick='hidePopover()'>Close</ons-button></p></ons-popover>").appendTo($page);
    
    var $car3 = $("<ons-carousel-item></ons-carousel-item>").appendTo($Carcontainer);
    var $car3content = $("<div class='quiznumber'>Q3:</div><div class='quizhelp'><ons-button class='quizhelpbtn' onclick='showPopoverq3(this)'><ons-icon class='quizicon' icon='question-circle'></ons-icon></ons-button></div><div class='quizques'>Diary:</div><div class='quizanswer'><textarea class='textarea' placeholder='Enter your diary entry.'></textarea></div>").appendTo($car3);
    
        
    $("<ons-popover direction='up' id='popoverq3' cancelable><p>Write 4 paragraphs.</p><p><ons-button class='buttoncs2' onclick='hidePopover()'>Close</ons-button></p></ons-popover>").appendTo($page);
    
    var $car4 = $("<ons-carousel-item></ons-carousel-item>").appendTo($Carcontainer);
    var $car4content = $("<div class='quiznumber'>Q4:</div><div class='quizques'>Gender:</div><div class='quizanswer'><ons-list-item  tappable><label class='left'><ons-radio name='gender' input-id='radio-1' checked></ons-radio></label><label for='radio-1' class='center'>Male</label></ons-list-item><ons-list-item tappable><label class='left'><ons-radio name='gender' input-id='radio-2'></ons-radio></label><label for='radio-2' class='center'>Female</label></ons-list-item><ons-list-item tappable><label class='left'><ons-radio name='gender' input-id='radio-3'></ons-radio></label><label for='radio-3' class='center'>Depends what day it is</label></ons-list-item></div>").appendTo($car4);
    
    var $car5 = $("<ons-carousel-item></ons-carousel-item>").appendTo($Carcontainer);    
    var $car5content = $("<div class='quiznumber'>Q5:</div><div class='quizques'>Mood:</div><div class='quizanswer'><ons-carousel style='height: 100px; width:90%' swipeable auto-scroll overscrollable id='quizcarousel'><ons-carousel-item style='background-color: #3B4C66;'><div style='text-align: center; font-size: 30px; margin-top: 30px; color: #fff;'>SAD :(</div></ons-carousel-item><ons-carousel-item style='background-color: #49BDC3;'><div style='text-align: center; font-size: 30px; margin-top: 30px; color: #fff;'>HAPPY :)</div></ons-carousel-item><ons-carousel-item style='background-color: #FFC300;'><div style='text-align: center; font-size: 30px; margin-top: 30px; color: #fff;'>LAUGHING :D</div></ons-carousel-item></ons-carousel></div>").appendTo($car5);
    
    var $car6 = $("<ons-carousel-item></ons-carousel-item>").appendTo($Carcontainer);
    var $car6content = $("<div class='quiznumber'>Q6:</div><div class='quizques'>Happiness Today:</div><div class='quizanswer'><ons-range class='quizrangemood' min='0' max='10' step='1' style='width: 90%;' value='5'></ons-range></div>").appendTo($car6);
    
    var $car7 = $("<ons-carousel-item></ons-carousel-item>").appendTo($Carcontainer);    
    var $car7content = $("<div class='quiznumber'>Q7:</div><div class='quizques'>Blood Alcohol:</div><div class='quizanswer'><ons-range class='quizrangeBAC' min='0' max='0.5' step='0.01' style='width: 90%;' value='0.05'></ons-range><br/><br/><label class='quizlabel'>Level: 0.05</label></div>").appendTo($car7);
    
    
    var $footer = $("<div class='footer'></div>").appendTo($page);

    var $quizMoodSubmit = $("<div class='confieldsSubmit'><ons-button class='quizmoodbtn'>Submit</ons-button></div>").appendTo($footer).on("click", function() {
            
        $alertSubmit.appendTo($page);
        $alertSubmit.show(); 
        });    
    


 var quizprev = function() {
  var quizcarousel = $('quizcarousel');
  quizcarousel.quizprev();
};

var quiznext = function() {
  var quizcarousel = $('quizcarousel');
  quizcarousel.quiznext();
};

//code snippet from onsen ui about carousels       

 var prev = function() {
  var carousel = $('carousel');
  carousel.prev();
};

var next = function() {
  var carousel = $('carousel');
  carousel.next();
};
  

    
    $("#maincontent").html($page);   
}



//Quiz page (Exam)
function showQuizExam() {
    console.log("begin showQuizExam");
    //variables
    var $page = $("<ons-page></ons-page>"); 
   
 //toolbar
    var $toolbar = $("<ons-toolbar></ons-toolbar>").appendTo($page)
    var $tbcenter = $("<div class='center'></div>").appendTo($toolbar); 
    $("<span class='menu'>Exam Quiz</span>").appendTo($tbcenter);
    var $tbright = $("<div class='right'></div>").appendTo($toolbar); 
    var $tbleft = $("<div class='left'></div>").appendTo($toolbar); 
    //logout button
    var $tbbutton = $("<ons-toolbar-button></ons-toolbar-button>").appendTo($tbleft).on("click",         function() {
        $alerttest.appendTo($page);
        $alerttest.show();
        });; 
    //menu button
    var $tbbutton2 = $("<ons-toolbar-button></ons-toolbar-button>").appendTo($tbright).on("click",         function() {
        $alertMenu.appendTo($page);
        $alertMenu.show();
        });; 
    //icons for toolbar
    $("<ons-icon icon='home'></ons-icon>").appendTo($tbbutton2);
    $("<ons-icon icon='fa-user-circle-o'></ons-icon>").appendTo($tbbutton);
    
    
    $("<div class='quiznumber'>Q1:</div><div class='quizques'>Student ID:</div><div class='quizanswer'><ons-input placeholder='Enter your SID.'></ons-input><br/><span class='validatesid'>*Error: Invalid SID. SID must be numbers only.<span></div>").appendTo($page);

    $("<div class='quiznumber'>Q2:</div><div class='quizhelp'><ons-button class='quizhelpbtn' onclick='showPopoverExam(this)'><ons-icon class='quizicon' icon='question-circle'></ons-icon></ons-button></div><div class='quizques'>Name:</div><div class='quizanswer'><ons-input class='text-input' placeholder='Enter your full name.'></ons-input></div>").appendTo($page);
    
    $("<ons-popover direction='up' id='popoverexam' cancelable><p>Your full name.</p><p><ons-button class='buttoncs2' onclick='hidePopoverExam()'>Close</ons-button></p></ons-popover>").appendTo($page);

    var $footer = $("<div class='footer'></div>").appendTo($page);

    var $quizMoodSubmit = $("<div class='confieldsSubmit'><ons-button class='quizmoodbtn'>Next</ons-button></div>").appendTo($footer).on("click", function() {
            
    showQuizExamQ();
        });    
    
    
    $("#maincontent").html($page);   
    
}

function showQuizExamQ() {
    console.log("begin showQuizExamQ");
    //variables
    var $page = $("<ons-page></ons-page>"); 
   
 //toolbar
    var $toolbar = $("<ons-toolbar></ons-toolbar>").appendTo($page)
    var $tbcenter = $("<div class='center'></div>").appendTo($toolbar); 
    $("<span class='menu'>Exam Quiz</span>").appendTo($tbcenter);
    var $tbright = $("<div class='right'></div>").appendTo($toolbar); 
    var $tbleft = $("<div class='left'></div>").appendTo($toolbar); 
    //logout button
    var $tbbutton = $("<ons-toolbar-button></ons-toolbar-button>").appendTo($tbleft).on("click",         function() {
        $alerttest.appendTo($page);
        $alerttest.show();
        });; 
    //menu button
    var $tbbutton2 = $("<ons-toolbar-button></ons-toolbar-button>").appendTo($tbright).on("click",         function() {
        $alertMenu.appendTo($page);
        $alertMenu.show();
        });; 
    //icons for toolbar
    $("<ons-icon icon='home'></ons-icon>").appendTo($tbbutton2);
    $("<ons-icon icon='fa-user-circle-o'></ons-icon>").appendTo($tbbutton);
        
    
    $("<div class='quiznumber'>Q3:</div><div class='quizques'>What is the capital of Australia?</div><div class='quizanswer'><ons-input class='text-input' placeholder='Enter your answer.'></ons-input><div class='break'></div></div>").appendTo($page);
    
    $("<div class='quiznumber'>Q4:</div><div class='quizques'>What is the largest state in Australia?</div><div class='quizanswer'><ons-input class='text-input' placeholder='Enter your answer.'></ons-input><br/><div class='break'></div></div>").appendTo($page);
    
    $("<div class='quiznumber'>Q5:</div><div class='quizques'>What is the capital of Victoria?</div><div class='quizanswer'><ons-list-item  tappable><label class='left'><ons-radio name='capitalaus' input-id='radio-1' checked></ons-radio></label><label for='radio-1' class='center'>Sydney</label></ons-list-item><ons-list-item tappable><label class='left'><ons-radio name='capitalaus' input-id='radio-2'></ons-radio></label><label for='radio-2' class='center'>Brisbane</label></ons-list-item><ons-list-item tappable><label class='left'><ons-radio name='capitalaus' input-id='radio-3'></ons-radio></label><label for='radio-3' class='center'>Melbourne</label></ons-list-item><div class='break'></div></div>").appendTo($page);
    
    $("<div class='quiznumber'>Q6:</div><div class='quizques'>Which are the territories of Australia?</div><div class='quizanswer'>  <ons-list-item tappable><label class='left'><ons-checkbox input-id='check-1'></ons-checkbox></label><label for='check-1' class='center'>ACT</label></ons-list-item><ons-list-item tappable><label class='left'><ons-checkbox input-id='check-2'></ons-checkbox></label><label for='check-2' class='center'>NSW</label></ons-list-item><ons-list-item tappable><label class='left'><ons-checkbox input-id='check-3'></ons-checkbox></label><label for='check-3' class='center'>NT</label></ons-list-item><ons-list-item tappable><label class='left'><ons-checkbox input-id='check-4'></ons-checkbox></label><label for='check-4' class='center'>QLD</label></ons-list-item><ons-list-item tappable><label class='left'><ons-checkbox input-id='check-5'></ons-checkbox></label><label for='check-5' class='center'>SA</label></ons-list-item><ons-list-item tappable><label class='left'><ons-checkbox input-id='check-6'></ons-checkbox></label><label for='check-6' class='center'>TAS</label></ons-list-item><ons-list-item tappable><label class='left'><ons-checkbox input-id='check-7'></ons-checkbox></label><label for='check-7' class='center'>VIC</label></ons-list-item><ons-list-item tappable><label class='left'><ons-checkbox input-id='check-8'></ons-checkbox></label><label for='check-8' class='center'>WA</label></ons-list-item></div>").appendTo($page);

    $("<div class='break'></div><div class='break'></div><div class='break'></div><div class='break'></div>").appendTo($page);
    
    var $footer = $("<div class='footer'></div>").appendTo($page);

    var $quizMoodSubmit = $("<div class='confieldsSubmit'><ons-button class='quizmoodbtn'>Submit</ons-button></div>").appendTo($footer).on("click", function() {
            
        $alertSubmit.appendTo($page);
        $alertSubmit.show(); 
        });    
    
    $("#maincontent").html($page);   
    
}


//Statistics page

function showStatistics() {
    console.log("begin showStatistics");
    //variables
    var $page = $("<ons-page></ons-page>"); 
    
    //div container holding stats at top, and another div container holding answers wrong
    
    //toolbar
    var $toolbar = $("<ons-toolbar></ons-toolbar>").appendTo($page)
    var $tbcenter = $("<div class='center'></div>").appendTo($toolbar); 
    $("<span class='menu'>Results</span>").appendTo($tbcenter);
    var $tbright = $("<div class='right'></div>").appendTo($toolbar); 
    var $tbleft = $("<div class='left'></div>").appendTo($toolbar); 
    //logout button
    var $tbbutton = $("<ons-toolbar-button></ons-toolbar-button>").appendTo($tbleft).on("click",         function() {
        $alerttest.appendTo($page);
        $alerttest.show();
        });; 
    //menu button
    var $tbbutton2 = $("<ons-toolbar-button></ons-toolbar-button>").appendTo($tbright).on("click",         function() {
        showMenu();
        });; 
    //icons for toolbar
    $("<ons-icon icon='home'></ons-icon>").appendTo($tbbutton2);
    $("<ons-icon icon='fa-user-circle-o'></ons-icon>").appendTo($tbbutton);
    
    $("<div class='quiznumber'>Well done, Name! <br/><span class='resultspercent'> 85% </span></div>").appendTo($page);
  
    $("<div class='break'></div>").appendTo($page);
   
    $("<div class='quiznumber'>Recorded answers:</div>").appendTo($page);

        $("<div class='quiznumber'>Q3:</div><div class='quizques'>What is the capital of Australia?</div><div class='quizanswer'><ons-input class='text-input' disabled='true' placeholder='Enter your answer.'></ons-input><div class='break'></div></div><ons-icon class='correctq' icon='fa-check'></ons-icon><div class='revques'><span class='boldtxt'>Correct! </span><br/>80% of students answered this question correctly.</div>").appendTo($page);
    
    $("<div class='quiznumber'>Q4:</div><div class='quizques'>What is the largest state in Australia?</div><div class='quizanswer'><ons-input disabled='true' class='text-input' placeholder='Enter your answer.'></ons-input><br/><div class='break'></div></div><ons-icon class='correctq' icon='fa-check'></ons-icon><div class='revques'><span class='boldtxt'>Correct! </span><br/>80% of students answered this question correctly.</div>").appendTo($page);
    
    $("<div class='quiznumber'>Q5:</div><div class='quizques'>What is the capital of Victoria?</div><div class='quizanswer'><ons-list-item  tappable><label class='left'><ons-radio disabled='true' name='capitalaus' input-id='radio-1' checked></ons-radio></label><label for='radio-1' class='center'>Sydney</label></ons-list-item><ons-list-item tappable><label class='left'><ons-radio disabled='true' name='capitalaus' input-id='radio-2'></ons-radio></label><label for='radio-2' class='center'>Brisbane</label></ons-list-item><ons-list-item tappable><label class='left'><ons-radio disabled='true' name='capitalaus' input-id='radio-3'></ons-radio></label><label for='radio-3' class='center'>Melbourne</label></ons-list-item><div class='break'></div></div><ons-icon class='incorrectq' icon='fa-times'></ons-icon><div class='revques'><span class='boldtxt'>Correct answer: Melbourne. </span><br/>65% of students answered this question correctly.</div>").appendTo($page);

    
    $("<div class='quiznumber'>Q6:</div><div class='quizques'>Which are the territories of Australia?</div><div class='quizanswer'>  <ons-list-item tappable><label class='left'><ons-checkbox checked disabled='true' input-id='check-1'></ons-checkbox></label><label for='check-1' class='center'>ACT</label></ons-list-item><ons-list-item tappable><label class='left'><ons-checkbox disabled='true' input-id='check-2'></ons-checkbox></label><label for='check-2' class='center'>NSW</label></ons-list-item><ons-list-item tappable><label class='left'><ons-checkbox disabled='true' checked input-id='check-3'></ons-checkbox></label><label for='check-3' class='center'>NT</label></ons-list-item><ons-list-item tappable><label class='left'><ons-checkbox disabled='true' input-id='check-4'></ons-checkbox></label><label for='check-4' class='center'>QLD</label></ons-list-item><ons-list-item tappable><label class='left'><ons-checkbox disabled='true' input-id='check-5'></ons-checkbox></label><label for='check-5' class='center'>SA</label></ons-list-item><ons-list-item tappable><label class='left'><ons-checkbox disabled='true' input-id='check-6'></ons-checkbox></label><label for='check-6' class='center'>TAS</label></ons-list-item><ons-list-item tappable><label class='left'><ons-checkbox disabled='true' input-id='check-7'></ons-checkbox></label><label for='check-7' class='center'>VIC</label></ons-list-item><ons-list-item tappable><label class='left'><ons-checkbox disabled='true' input-id='check-8'></ons-checkbox></label><label for='check-8' class='center'>WA</label></ons-list-item></div><div class='break'></div><ons-icon class='correctq' icon='fa-check'></ons-icon><div class='revques'><span class='boldtxt'>Correct! </span><br/>80% of students answered this question correctly.</div>").appendTo($page);
    



    $("<div class='break'></div><div class='break'></div><div class='break'></div>").appendTo($page);

    
    $("<div class='footer'></div>").appendTo($page);


    $("#maincontent").html($page);   
}



/*-----------------------
DOCUMENT.READY FUNCTION
------------------------*/

$(document).ready(function () {

 showLogin();
    

});









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

var hidePopover = function() {
  document.getElementById('popoverq1').hide();
  document.getElementById('popoverq2').hide();
  document.getElementById('popoverq3').hide();

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
   
$("<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent at sem vitae est venenatis efficitur a convallis leo. Mauris facilisis tellus ac nisl tempus finibus eget eu justo. Ut semper arcu id neque feugiat, ut aliquet nunc sollicitudin. Donec nulla velit, ullamcorper non molestie eget, ullamcorper iaculis urna. Pellentesque ultrices mauris sed dapibus aliquet. Vivamus maximus ultricies libero a pulvinar. Vestibulum mollis vulputate ipsum sit amet ornare. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Phasellus id fringilla mauris. Nullam elementum finibus erat a mattis. Integer quis elit augue. Mauris molestie, est eu suscipit luctus, ligula sapien venenatis odio, eget luctus odio purus eget augue. Sed eu ullamcorper metus. Vestibulum magna erat, placerat eu iaculis a, vehicula a sem. In sed vestibulum leo, sit amet vestibulum dolor.Pellentesque ultricies iaculis nunc at iaculis. Cras imperdiet urna ipsum, eu tempus quam pellentesque cursus. Vivamus sed sem nisl. Nunc laoreet urna id ex malesuada vulputate. Morbi ac mauris velit. Mauris aliquet nulla quam, in feugiat nulla viverra at. Proin eget sodales ipsum. Nam non ullamcorper dolor. Nunc luctus purus id lectus elementum, id blandit velit blandit. Morbi eget dui eu justo dictum interdum. Nulla rhoncus at lorem at eleifend. Aliquam iaculis ipsum vitae odio efficitur maximus vel sit amet nulla.Phasellus feugiat sapien eget erat pretium, et ullamcorper ex fermentum. Nam sapien ipsum, consectetur ut gravida sit amet, bibendum in metus. Mauris non molestie mauris. Sed feugiat lobortis urna. In hac habitasse platea dictumst. Mauris semper ultricies tellus ac pretium. Vivamus lobortis convallis lacinia. Proin vel gravida ante. Quisque posuere ante ac erat egestas, et maximus enim ultricies. Aenean id nisl arcu.Nullam scelerisque faucibus enim, sit amet luctus magna gravida ac. Fusce et felis finibus, pretium enim placerat, pharetra libero. Duis faucibus lorem eget est interdum lacinia. Ut eget aliquam sem. Nam congue, nulla quis rhoncus feugiat, mauris lectus mollis dolor, sit amet ullamcorper diam leo blandit justo. Aenean vulputate auctor euismod. Maecenas efficitur interdum est, eget egestas orci mattis non. Nunc vehicula dictum urna, eu interdum lacus dictum sit amet. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed cursus urna eros, in elementum nulla facilisis sed.Morbi a sodales justo. Vivamus id erat nec sem congue tempus sit amet eget tortor. Donec pharetra, lorem eget fringilla suscipit, nibh leo ultrices urna, nec efficitur nisi tellus vel sapien. Integer pulvinar dui magna, gravida posuere arcu aliquet non. Phasellus semper elementum sapien vitae bibendum. Nulla auctor pellentesque odio, et hendrerit ligula porttitor semper. Nulla scelerisque viverra eros, eget dapibus libero auctor vitae. Aliquam tempus velit sit amet porttitor ultricies. Vivamus quis dignissim dui, at blandit arcu. Donec cursus, enim vel tincidunt dignissim, justo augue aliquet lacus, nec tempus nunc est vel erat. Nam dapibus bibendum vestibulum. Pellentesque nec consectetur velit. Quisque pharetra eros elit, nec dignissim leo eleifend convallis. Donec pulvinar quam ac leo suscipit, vel semper nulla molestie. Curabitur lectus est, sodales a dignissim ac, aliquam ac ex. Aenean condimentum urna turpis, vitae hendrerit massa finibus vel.</p>").appendTo($page);
    
    
    
    
    $("#maincontent").html($page);   
    
}

//Statistics page

function showStatistics() {
    console.log("begin showStatistics");
    //variables
    var $page = $("<ons-page></ons-page>"); 
    
    //div container holding stats at top, and another div container holding answers wrong
    
    
    $("<div class='footer'></div>").appendTo($page);


    $("#maincontent").html($page);   
}



/*-----------------------
DOCUMENT.READY FUNCTION
------------------------*/

$(document).ready(function () {
    
  

    
 showQuizMood();
    

});









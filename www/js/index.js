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

var $alerttest = $("<ons-alert-dialog animation='default' cancelable><div class='alert-dialog-title'>Logout?</div><div class='alert-dialog-content'>Are you sure you want to logout?</div><div class='alert-dialog-footer'><button class='alert-dialog-button' onclick='showLogin()'>OK</button><button class='alert-dialog-button' onclick='alertCancel()'>Cancel</button></div></ons-alert-dialog>");

var $alertMenu = $("<ons-alert-dialog animation='default' cancelable><div class='alert-dialog-title'>Exit Quiz?</div><div class='alert-dialog-content'>Are you sure you want to exit the quiz? Your progress will not be saved.</div><div class='alert-dialog-footer'><button class='alert-dialog-button' onclick='showMenu()'>OK</button><button class='alert-dialog-button' onclick='alertCancel()'>Cancel</button></div></ons-alert-dialog>");

function alertCancel() {
    $alertMenu.hide();
    $alerttest.hide();
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
    var $onsListMood = $("<ons-list-item tappable></ons-list-item>").appendTo($onsList).on("click",       function() {
            showQuizMood(); 
        });    
    
    var $onsListExam = $("<ons-list-item tappable></ons-list-item>").appendTo($onsList).on("click", function() {
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

    var $footer = $("<div class='footer'></div>").appendTo($page);
    var $btnReview = $("<ons-button class='buttonfooter' onclick='showSummary()'>Review</ons-button>").appendTo($footer);
      $("<span>                 </span>").appendTo($footer);
    var $btnQuit = $("<ons-button class='buttonfooter'>Quit</ons-button>").appendTo($footer).on("click", function(){
        $alertMenu.appendTo($page);
        $alertMenu.show();
    });
     
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
    
    var $tbbutton2 = $("<ons-toolbar-button></ons-toolbar-button>").appendTo($tbright).on("click",         function() {
        $alertMenu.appendTo($page);
        $alertMenu.show();
        });; 
    
    $("<ons-icon icon='home'></ons-icon>").appendTo($tbbutton2);
    $("<ons-icon icon='fa-user-circle-o'></ons-icon>").appendTo($tbbutton);
    var $onsList = $("<ons-list></ons-list>").appendTo($page);
    
    $("<div class='footer'></div>").appendTo($page);

    $("#maincontent").html($page);   
}



//Quiz page (Exam)
function showQuizExam() {
    console.log("begin showQuizExam");
    //variables
    var $page = $("<ons-page></ons-page>"); 
    
    const quizContainer = $("<div id='quiz'></div>").appendTo($page)
    const resultsContainer = $("<div id='results'></div>").appendTo($page)
    const $btnSubmit = $("<ons-button id='results' class='buttoncs'>Submit</ons-button>").appendTo($conFields).on("click", function(){
        showResults();
    });
    
    function buildQuiz() {
        
    }
    
    function showResults() {
        
    }
    
    $("<div class='footer'></div>").appendTo($page);

    $("#maincontent").html($page);   
    
}




//Summary page//
function showSummary() {
    console.log("begin showSummary");
    //variables
    var $page = $("<ons-page></ons-page>"); 
    
    
    
    $("<div class='footer'></div>").appendTo($page);

    $("#maincontent").html($page);   
}

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









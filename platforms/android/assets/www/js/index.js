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

function showLogin() {
    console.log("begin showLogin()");
    
   var $page = $("<div></div>"); 

    var $conFields = $("<div class='conFields'></div>");
    var $username = $("<ons-input id='username' modifier='underbar' placeholder='Username'  float></ons-input>");
    var $pw = $("<ons-input id='pw' modifier='underbar' type='password' placeholder='Password' float></ons-input>");
    var $btnLogin = $("<ons-button class='buttoncs'>Login</ons-button>");
    
/*    btnLogin.on("click", function(){
         showMenu();
    }); */
    
    //functions
    $btnLogin.click(function(){
        showMenu();
    });
    
    //append elements
    $("<div class='logo'></div>").appendTo($page);
    $("<div class='title'>QUIZI</div>").appendTo($page);
    $("<div class='linebreak'></div>").appendTo($page);

    $conFields.appendTo($page);
    $username.appendTo($conFields);
    $("<br/>").appendTo($conFields);
        $("<br/>").appendTo($conFields);

    $pw.appendTo($conFields);
    $("<div class='break'></div>").appendTo($conFields);
    $btnLogin.appendTo($conFields);
    $("<div class='footer'></div>").appendTo($page);

    
    //main
    $("#maincontent").html($page);

}


//Menu page//
function showMenu() {
    
    console.log("begin showMenu()");
    var page = $("<div></div>");
    var btnQuiz = $(ons._util.createElement("<ons-button>go to quiz</ons-button>"));
    btnQuiz.on("click", function(){
         showQuizMood();
    });
    page.html(btnQuiz)
    $("#maincontent").html(page);
}

//Quiz page (Mood)//
function showQuizMood() {
    console.log("begin showQuizMood()");
    var page = $("<div></div>"); //clear the page so new content can be added
    var btnMenu = $(ons._util.createElement("<ons-button modifier='quiet'>go to menu</ons-button>"));
    btnMenu.on("click", function(){
         showMenu();
     });
    page.html("<h1>quiz page</h1>")
    page.append(btnMenu)
    $("#maincontent").html(page);   
}

//Quiz page (Exam)//

//var div = document.createElement('div');
//div.innerHTML = '<ons-button></ons-button>'
//document.body.appendChild(div);
//Answered page//


//Summary/statistics page//




/*-----------------------
DOCUMENT.READY FUNCTION
------------------------*/

$(document).ready(function () {
    showLogin();
        


});









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
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
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


/*---------
FUNCTIONS
---------*/
//Login page //
function showLogin() {
    console.log("begin showLogin()");
    //variables
    var page = $("<div></div>");
    var usernameLabel = $("<p>Username: </p>");
    var username = $("<input type='text'></input>");
    var pwLabel = $("<p>Password: </p>");
    var pw = $("<input type='text'></input>");
    var btnLogin = $(ons._util.createElement("<ons-button>Login</ons-button>"));
    btnLogin.on("click", function(){
         showMenu();
    });
    
    
    //append
    page.html("<div class='logo'></div")
    usernameLabel.append(username);
    page.append(usernameLabel);
    pwLabel.append(pw);
    page.append(pwLabel);
    page.append(btnLogin)

    
    //main
    $("#maincontent").html(page);

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

/* maincontent div is your page basically. 
*/

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


//Answered page//


//Summary/statistics page//




/*-----------------------
DOCUMENT.READY FUNCTION
------------------------*/

$(document).ready(function () {
    showLogin();
        
    
                        /*console.log("test");

                        var button = $(ons._util.createElement("<ons-button> button name </ons-button>"));

                        button.on("click", function() {
                         alert("test button dynamically")
                            });


                            $("#button").append(button);*/


                        // shortcut:
                            // Set function as handler: $("#something").click(myFunction);
                            // Set function as handler: $("#something").on("click", myFunction);
                            // Call function/move logic into the handler $("#something").on("click", function() { myFunction(); });

                        // to make something a jquery object, add $ infront - wraps everything in $() brackets to a jquery object and calls jquery. 



});









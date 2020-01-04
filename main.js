
// Initialize Firebase
var config = {
apiKey: "AIzaSyDwY29wrfZxtVskCDs1Mee4EuZqBVQqk4s",
authDomain: "shit-1209.firebaseapp.com",
databaseURL: "https://shit-1209.firebaseio.com",
projectId: "shit-1209",
storageBucket: "shit-1209.appspot.com",
messagingSenderId: "796380747881"
};
firebase.initializeApp(config);


var userLogin;
$(document).ready(function(){  
	var provider = new firebase.auth.GoogleAuthProvider();
    //所需授權的Scope 
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    provider.setCustomParameters({'login_hint': 'user@example.com'});
    
	firebase.auth().onAuthStateChanged(function(user) {
	  if (user) {
	    userLogin = user;
	    // alert("User is logined")
	    info_box(userLogin['email']+"<br>已登入！");
	    // console.log(userLogin);
	    var timeout = window.setTimeout(game_start(), 3000);
	  } else {
	    userLogin = null;
	    alert("已退出登入！");
	    // info_box("");
	  }
	});
    $("#login_button").click(function(){
    	
    	firebase.auth().signInWithPopup(provider).then(function(result) {
           var token = result.credential.accessToken;
           userLogin = result.user;
           // alert("成功使用 Google 帳號登入！");
           info_box("成功使用 Google 帳號登入！");
        }).catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
            alert(errorMessage)
        });
    });
    
	$("#SignOut").click(function(){
		firebase.auth().signOut().then(function() {
	        
	        window.location.reload();
	    }, function(error) {
	    // console.log("error!");
	    })
	 });
    // $("#getUID").click(function(){
    // 	if (userLogin)
    // 		alert(userLogin['uid']);
    // });   

    var db = firebase.database();

	$("#writeUserData").click(function(){
		db.ref('/users/' + userLogin['uid']).set({
			use_character: "gobo",
			enemy: "sliming",
		    result: "lose",
		    point: 3
		})
		.then(function () {alert("建立成功");})
		.catch(function () {alert("伺服器發生錯誤，請稍後再試");});
	});

	$("#readUserData").click(function(){
		db.ref('/users/' ).once('value', function (snapshot) {
			var data = snapshot.val();
		    console.log(data);
		});
	});                  
});     
       

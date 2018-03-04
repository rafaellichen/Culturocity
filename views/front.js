document.addEventListener("DOMContentLoaded", function() {
    if(localStorage.getItem("SignedUser")!="undefined" && localStorage.getItem("SignedIn")=="true") {
        document.getElementById("right").innerHTML =
        '<li><a href="/profile/'+localStorage.getItem("SignedUser")+'"'+'><span class="glyphicon glyphicon-user"></span> Welcome, '+localStorage.getItem("SignedUser")+'</a></li>\
        <li><a onClick="logOut()"><span class="glyphicon glyphicon-log-out"></span> Log Out</a></li>'
    } else {
        document.getElementById("right").innerHTML =
        '<li><a href="/signup"><span class="glyphicon glyphicon-user"></span> Sign Up</a></li>\
        <li><a href="/login"><span class="glyphicon glyphicon-log-in"></span> Log In</a></li>'
    }
});
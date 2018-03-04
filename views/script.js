function signup() {
    fetch("/signup/"+document.getElementById("usr").value+"/"+document.getElementById("pwd").value)
    .then(response => response.json())
    .then(obj => {
        if(obj.val) {
            localStorage.setItem('SignedIn', "true")
            localStorage.setItem("SignedUser", obj.username)
            window.location.replace("/");
        } else {
            document.getElementById("usr").value = ""
            document.getElementById("pwd").value = ""
            alert(obj.Message)
        }
    })
}

function login() {
    fetch("/login/"+document.getElementById("usr").value+"/"+document.getElementById("pwd").value)
    .then(response => response.json())
    .then(obj => {
        if(obj.val) {
            localStorage.setItem('SignedIn', "true")
            localStorage.setItem("SignedUser", obj.username)
            window.location.replace("/");
        } else {
            document.getElementById("usr").value = ""
            document.getElementById("pwd").value = ""
            alert(obj.message)
        }
    })
}

function logOut() {
    localStorage.setItem("SignedIn", "false")
    window.location.reload()
}

function like(cur) {
    if(localStorage.getItem("SignedIn")=="true") {
        fetch("/like/"+localStorage.getItem("SignedUser")+"/"+cur.value)
        .then(response => response.json())
        .then(obj => {
            if(obj.val) {
                cur.classList.add("btn-danger")
                cur.classList.remove("btn-success")
                cur.innerHTML = "Unlike"
                cur.setAttribute('onclick','unlike(this)')
            }
        })
    } else {
        alert("Please log in first")
    }
}

function unlike(cur) {
    if(localStorage.getItem("SignedIn")=="true") {
        fetch("/unlike/"+localStorage.getItem("SignedUser")+"/"+cur.value)
        .then(response => response.json())
        .then(obj => {
            if(obj.val) {
                cur.classList.remove("btn-danger")
                cur.classList.add("btn-success")
                cur.innerHTML = "Like"
                cur.setAttribute('onclick','like(this)')
            }
        })
    } else {
        alert("Please log in first")
    }
}

document.addEventListener("DOMContentLoaded", function() {
    if(localStorage.getItem("SignedUser")!="undefined" && localStorage.getItem("SignedIn")=="true") {
        document.getElementById("right").innerHTML =
        '<li><a href="/profile/'+localStorage.getItem("SignedUser")+'"'+'><span class="glyphicon glyphicon-user"></span> Welcome, '+localStorage.getItem("SignedUser")+'</a></li>\
        <li><a onClick="logOut()"><span class="glyphicon glyphicon-log-out"></span> Log Out</a></li>'
        fetch("/liked/"+localStorage.getItem("SignedUser"))
        .then(response => response.json())
        .then(obj => {
            obj = obj.filter(function(element) {
                return element!=""
            })
            obj.temp.forEach(element => {
                document.querySelector('button[value="'+element+'"]').classList.add("btn-danger")
                document.querySelector('button[value="'+element+'"]').classList.remove("btn-success")
                document.querySelector('button[value="'+element+'"]').innerHTML = "Unlike"
                document.querySelector('button[value="'+element+'"]').setAttribute('onclick','unlike(this)')
            });
        })
    } else {
        document.getElementById("right").innerHTML =
        '<li><a href="/signup"><span class="glyphicon glyphicon-user"></span> Sign Up</a></li>\
        <li><a href="/login"><span class="glyphicon glyphicon-log-in"></span> Log In</a></li>'
    }
});

$(document).ready(function(){
    $('[data-toggle="popover"]').popover();   
});
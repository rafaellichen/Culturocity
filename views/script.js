function signup() {
    fetch("http://localhost:3000/signup/"+document.getElementById("usr").value+"/"+document.getElementById("pwd").value)
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
    fetch("http://localhost:3000/login/"+document.getElementById("usr").value+"/"+document.getElementById("pwd").value)
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

document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM fully loaded and parsed");
});
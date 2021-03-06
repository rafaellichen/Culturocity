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
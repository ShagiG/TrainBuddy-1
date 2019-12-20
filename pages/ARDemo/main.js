

function verifyMarker() {
    var amarker = document.getElementById("amarker");
    if(amarker.object3D.visible == true) { 
        console.log("marker visible");
        window.location.href = '/pages/Camera/index.html';
    }else{
        console.log("not visible");
    }
}

setInterval(this.verifyMarker, 2000);
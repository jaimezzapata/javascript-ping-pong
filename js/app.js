var r = document.getElementById('right');
var l = document.getElementById('left');
var b = document.getElementById('ball');

var rscore = document.getElementById('scoreleft');
var lscore = document.getElementById('scoreright');
var ogoal = document.getElementById('goal');

var w = window.innerWidth;
var h = window.innerHeight;

var map = [];

onkeydown = onkeyup = function(e) {
    e = e || event; // to deal with IE
    map[e.keyCode] = e.type == 'keydown';
    /*insert conditional here*/
}

function keydown() {
    //if key was up arrow
    if (map[40]) {
        if (nfp(r.style.top) + ps > h - 200)
            r.style.top = h - 200 + "px";
        else
            r.style.top = nfp(r.style.top) + ps + "px";
    }

    //if key was down arrow
    else if (map[38]) {
        if (nfp(r.style.top) - ps < 0)
            r.style.top = 0 + "px";
        else
            r.style.top = nfp(r.style.top) - ps + "px";
    }

    //if key was s
    if (map[83]) {
        if (nfp(l.style.top) + ps > h - 200)
            l.style.top = h - 200 + "px";
        else
            l.style.top = nfp(l.style.top) + ps + "px";
    }

    //if key was w
    else if (map[87]) {
        if (nfp(l.style.top) - ps < 0)
            l.style.top = 0 + "px";
        else
            l.style.top = nfp(l.style.top) - ps + "px";
    }

}
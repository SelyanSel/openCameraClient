function contactBtnClicked(){
    window.location = "mailto:celian.alazard@outlook.fr"
}

function openLink(link){
    window.location = link
}

function github(){
    window.location = "https://github.com/SelyanSel"
}

function setElementVisibility(element, visibility){
    element.hidden = !visibility
    return visibility;
}

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

var connectingIndicator = document.getElementById('connectIndicator')
var errIndicator = document.getElementById('errConnect')
var notConnectIndicator = document.getElementById('notConnected')

setElementVisibility(errIndicator, false)
setElementVisibility(connectingIndicator, false)

async function promptConnect(){
    let response = httpGet('http://192.168.1.62:3000/ping')
    if (response == "pong"){
        alert('hi')
    }
}
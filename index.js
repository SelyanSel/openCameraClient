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

var jsonhouse

var connectingIndicator = document.getElementById('connectIndicator')
var errIndicator = document.getElementById('errConnect')
var notConnectIndicator = document.getElementById('notConnected')
var connectIndicator = document.getElementById('connected')

var serveraddress

setElementVisibility(errIndicator, false)
setElementVisibility(connectIndicator, false)
setElementVisibility(connectingIndicator, false)

async function promptConnect(){
    serveraddress = prompt("Enter the server's address:", "127.0.0.1")
    setElementVisibility(connectingIndicator, true)
    setElementVisibility(notConnectIndicator, false)
    setElementVisibility(connectIndicator, false)
    setElementVisibility(errIndicator, false)
    try {
        let response = await httpGet('http://' + serveraddress + ':3000/ping')
        if (response == "pong"){
            setElementVisibility(connectingIndicator, false)
            setElementVisibility(notConnectIndicator, false)
            setElementVisibility(errIndicator, false)
            connectIndicator.textContent = "fetching..."
            setElementVisibility(connectIndicator, true)
            let response_houseinfo = await httpGet('http://' + serveraddress + ':3000/houseInformation')
            jsonhouse = JSON.parse(response_houseinfo)
            connectIndicator.textContent = "connected to " + jsonhouse['servername'];
        }else{
            setElementVisibility(connectingIndicator, false)
            setElementVisibility(notConnectIndicator, false)
            setElementVisibility(errIndicator, true)
        }  
    } catch (error) {
        setElementVisibility(connectingIndicator, false)
        setElementVisibility(notConnectIndicator, false)
        setElementVisibility(errIndicator, true)
        console.log('[+] ' + error)
    }
}
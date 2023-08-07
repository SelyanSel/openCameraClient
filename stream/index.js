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

function setPanelVisibility(bool){
    setElementVisibility(stream, bool)
    setElementVisibility(view, bool)
    setElementVisibility(disconnect, bool)
}

var jsonhouse

var connectingIndicator = document.getElementById('connectIndicator')
var errIndicator = document.getElementById('errConnect')
var notConnectIndicator = document.getElementById('notConnected')
var connectIndicator = document.getElementById('connected')

// panel elements

var connect = document.getElementById('connect')
var stream = document.getElementById('stream')
var view = document.getElementById('view')
var disconnect = document.getElementById('disconnect')

var isConnected = false

var serverpassword
var serveraddress

// load items from localStorage

serveraddress = localStorage.getItem('address')
serverpassword = localStorage.getItem('password')

// authenticate user (funcion)

async function authUser(){
    try {
        let result = await httpGet('http://' + serveraddress + ':3000/validateUser?password=' + serverpassword)

        if (result !== "valid_user"){
            window.location = "./index.html"
            localStorage.clear()
        }
    } catch (error) {
        window.location = "./index.html"
        localStorage.clear()
    }
}

// authenticate user

authUser()

setPanelVisibility(false)

setElementVisibility(errIndicator, false)
setElementVisibility(connectIndicator, false)
setElementVisibility(connectingIndicator, false)

function disc(){
    isConnected = false
    jsonhouse = {}
    setPanelVisibility(false)
    setElementVisibility(connect,true)
    setElementVisibility(connectingIndicator, false)
    setElementVisibility(notConnectIndicator, false)
    setElementVisibility(connectIndicator, false)
    errIndicator.textContent = "disconnected from server"
    setElementVisibility(errIndicator, true)
}

async function promptConnect(){
    errIndicator.textContent = "error while connecting - seek console for more information"

    // server information
    serveraddress = prompt("Enter the server's address:", "127.0.0.1")
    serverpassword = prompt("Enter the server master password:")

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
            let response_houseinfo = await httpGet('http://' + serveraddress + ':3000/houseInformation?password=' + serverpassword)
            jsonhouse = JSON.parse(response_houseinfo)
            connectIndicator.textContent = "connected to " + jsonhouse['servername'];
            setPanelVisibility(true)
            setElementVisibility(connect,false)
            isConnected = true
        }else{
            setElementVisibility(connectingIndicator, false)
            setElementVisibility(notConnectIndicator, false)
            setElementVisibility(errIndicator, true)
        }  
    } catch (error) {
        if (!isConnected){
            setElementVisibility(connectingIndicator, false)
            setElementVisibility(notConnectIndicator, false)
            setElementVisibility(errIndicator, true)
            console.log('[+] ' + error)
        }
    }
}

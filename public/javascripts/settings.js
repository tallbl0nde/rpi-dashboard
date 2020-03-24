function showAccent(){
    document.getElementById("accent").style.backgroundColor = document.getElementById("accent").value;
    document.getElementById("accentHex").innerHTML = document.getElementById("accent").value;
}
showAccent();

function showFilename(){
    document.getElementById("backgroundName").innerHTML = document.getElementById("backgroundButton").value.split(/(\\|\/)/g).pop();
}
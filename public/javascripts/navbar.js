// Navbar vue instance
var navbar = new Vue({
    el: "#navbar",
    data: {
        showLinks: false,
        hostname: "",
        internalip: "",
    },
    watch: {
        hostname: function(){
            document.title = "Pi Dashboard (" + navbar.hostname + ")";
            setTimeout(navbar.updatePosition, 5);
        },
        internalip: function(){
            setTimeout(navbar.updatePosition, 5);
        }
    },
    methods: {
        // This function needs a really slight delay to work properly
        updatePosition: function(){
            // Only "pad" the login link if navbar is not collapsed
            if (document.body.offsetWidth >= 768){
                document.getElementById("account").style.width = document.getElementById("navleft").offsetWidth + "px";
                document.getElementById("loginlink").classList.add("ml-auto");
            } else {
                document.getElementById("account").style.width = "auto";
                document.getElementById("loginlink").classList.remove("ml-auto");
            }
            navbar.showLinks = true;
        }
    }
});

// GET request for hostname
var xhttp = new XMLHttpRequest();
xhttp.open("GET", "/hostname", true);
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var arr = JSON.parse(this.responseText);

        navbar.hostname = arr.hostname;
        navbar.internalip = "(" + arr.internalip + ")";
    }
}
xhttp.send();

// Adjust login "width" when required (dodgy but it works)
window.addEventListener("resize", navbar.updatePosition);
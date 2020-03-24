// Vue Instance
var vue = new Vue({
    el: '#cards',
    data: {
        cpu: {
            fan_status: "",
            load: "",
            temperature: "",
            uptime: "",
            usage: ""
        },
        memory: {
            ram: {
                total: "",
                used: "",
                free: "",
                percent: ""
            },
            swap: {
                total: "",
                used: "",
                free: "",
                percent: ""
            }
        },
        storage: {
            root: {
                total: "",
                used: "",
                free: "",
                percent: ""
            },
            hdd: {
                total: "",
                used: "",
                free: "",
                percent: ""
            }
        },
        network: {
            wifi: {
                down_total: "",
                down_speed: "",
                up_total: "",
                up_speed: "",
                ip: ""
            },
            vpn: {
                down_total: "",
                down_speed: "",
                up_total: "",
                up_speed: "",
                ip: ""
            }
        }
    }
});

// Options for gauge
var gauge_opts = {
    angle: 0.20,
    lineWidth: 0.12,
    radiusScale: 0.9,
    limitMax: true,
    limitMin: true,
    colorStart: '#007bff',
    colorStop: '#007bff',
    strokeColor: '#EEEEEE',
    generateGradient: false,
    highDpiSupport: true,
    scaleOverride: true
};

// Create gauge object
var cpu_gauge = new Donut(document.getElementById('cpumeter')).setOptions(gauge_opts);
var cpu_text = new TextRenderer(document.getElementById('cpumeter-value'))
cpu_text.render = function(cpu_gauge){
   percentage = cpu_gauge.displayedValue / cpu_gauge.maxValue
   this.el.innerHTML = (percentage >= 0.999) ? 100 + "%" : (percentage * 100).toFixed(1) + "%"
};
cpu_gauge.setTextField(cpu_text);
cpu_gauge.maxValue = 100;
cpu_gauge.setMinValue(0);
cpu_gauge.animationSpeed = 6;
cpu_gauge.set(0);

// Change collapse / expand icon
function toggleIcon(type){
    var span = document.getElementById(type+"-toggle");
    var elements = span.childNodes;
    if (document.getElementById(type+"-body").classList.contains("show")){
        elements[0].classList.remove("fa-chevron-up");
        elements[0].classList.add("fa-chevron-down");
    } else {
        elements[0].classList.remove("fa-chevron-down");
        elements[0].classList.add("fa-chevron-up");
    }
}

// Request stats
function getStats(){
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/stats", true);
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var arr = JSON.parse(this.responseText);

            vue.cpu.usage = arr.cpu.usage;
            vue.cpu.fan_status = arr.cpu.fan_status;
            vue.cpu.load = arr.cpu.load;
            vue.cpu.temperature = (arr.cpu.temperature / 1000).toFixed(1);
            vue.cpu.uptime = arr.cpu.uptime;
            cpu_gauge.set(arr.cpu.usage);

            vue.memory.ram.used = (arr.memory.ram.used / 1000).toFixed(1) + " MB";
            vue.memory.ram.free = (arr.memory.ram.free / 1000).toFixed(1) + " MB";
            vue.memory.ram.total = (arr.memory.ram.total / 1000).toFixed(1) + " MB";
            vue.memory.ram.percent = 100*(arr.memory.ram.used/arr.memory.ram.total);
            vue.memory.ram.percent = vue.memory.ram.percent.toFixed(1) + "%";

            vue.memory.swap.used = (arr.memory.swap.used / 1000).toFixed(1) + " MB";
            vue.memory.swap.free = (arr.memory.swap.free / 1000).toFixed(1) + " MB";
            vue.memory.swap.total = (arr.memory.swap.total / 1000).toFixed(1) + " MB";
            vue.memory.swap.percent = 100*(arr.memory.swap.used/arr.memory.swap.total);
            vue.memory.swap.percent = vue.memory.swap.percent.toFixed(1) + "%";

            vue.storage.root.total = (arr.storage.root.total / 1000000).toFixed(1) + " GB";
            vue.storage.root.used = (arr.storage.root.used / 1000000).toFixed(1) + " GB";
            vue.storage.root.free = (arr.storage.root.free / 1000000).toFixed(1) + " GB";
            vue.storage.root.percent = 100*(arr.storage.root.used/arr.storage.root.total);
            vue.storage.root.percent = vue.storage.root.percent.toFixed(1) + "%";

            vue.storage.hdd.total = (arr.storage.hdd.total / 1000000).toFixed(1) + " GB";
            vue.storage.hdd.used = (arr.storage.hdd.used / 1000000).toFixed(1) + " GB";
            vue.storage.hdd.free = (arr.storage.hdd.free / 1000000).toFixed(1) + " GB";
            vue.storage.hdd.percent = 100*(arr.storage.hdd.used/arr.storage.hdd.total);
            vue.storage.hdd.percent = vue.storage.hdd.percent.toFixed(1) + "%";

            vue.network.wifi.ip = arr.network.wifi.ip;
            vue.network.wifi.down_total = (arr.network.wifi.down_total / 1000000).toFixed(1) + " MB";
            vue.network.wifi.up_total = (arr.network.wifi.up_total / 1000000).toFixed(1) + " MB";
            vue.network.wifi.down_speed = (arr.network.wifi.down_speed / 1000).toFixed(1) + " kB/s";
            vue.network.wifi.up_speed = (arr.network.wifi.up_speed / 1000).toFixed(1) + " kB/s";

            vue.network.vpn.ip = arr.network.vpn.ip;
            vue.network.vpn.down_total = (arr.network.vpn.down_total / 1000000).toFixed(1) + " MB";
            vue.network.vpn.up_total = (arr.network.vpn.up_total / 1000000).toFixed(1) + " MB";
            vue.network.vpn.down_speed = (arr.network.vpn.down_speed / 1000).toFixed(1) + " kB/s";
            vue.network.vpn.up_speed = (arr.network.vpn.up_speed / 1000).toFixed(1) + " kB/s";
        }
    };
    xhttp.send();
}
getStats();
setInterval(getStats, 1500);
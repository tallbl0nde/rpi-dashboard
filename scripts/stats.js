var exec = require('child_process').exec;

// Stats object
var stats = {
    cpu: {},
    memory: {
        ram: {},
        swap: {}
    },
    storage: {
        root: {},
        hdd: {}
    },
    network: {
        wifi: {},
        vpn: {}
    }
};

// CPU
function updateCPU(){
    exec("./scripts/cpu/cpu.sh 1", (err, stdout) => {
        if (err) {
            throw err;
        }

        var tmp_arr = stdout.toString().split(";");
        stats.cpu.usage = tmp_arr[0];
        stats.cpu.temperature = tmp_arr[1];
        stats.cpu.load = tmp_arr[2];
        stats.cpu.uptime = tmp_arr[3];
    });
}

// Memory
function updateMemory(){
    // RAM
    exec("./scripts/memory/ram.sh", (err, stdout) => {
        if (err) {
            throw err;
        }

        var tmp_arr = stdout.toString().split(";");
        stats.memory.ram.total = tmp_arr[0];
        stats.memory.ram.used = tmp_arr[1];
        stats.memory.ram.free = tmp_arr[2];
    });

    // Swap
    exec("./scripts/memory/swap.sh", (err, stdout) => {
        if (err) {
            throw err;
        }

        var tmp_arr = stdout.toString().split(";");
        stats.memory.swap.total = tmp_arr[0];
        stats.memory.swap.used = tmp_arr[1];
        stats.memory.swap.free = tmp_arr[2];
    });
}

// Storage
function updateStorage(){
    // Root
    exec("./scripts/storage/storage.sh /", (err, stdout) => {
        if (err) {
            throw err;
        }

        var tmp_arr = stdout.toString().split(";");
        stats.storage.root.total = tmp_arr[0];
        stats.storage.root.used = tmp_arr[1];
        stats.storage.root.free = tmp_arr[2];
    });

    // HDD
    exec("./scripts/storage/storage.sh /mnt/HDD", (err, stdout) => {
        if (err) {
            throw err;
        }

        var tmp_arr = stdout.toString().split(";");
        stats.storage.hdd.total = tmp_arr[0];
        stats.storage.hdd.used = tmp_arr[1];
        stats.storage.hdd.free = tmp_arr[2];
    });
}

function updateNetwork(){
    // Wifi
    exec("./scripts/network/wifi.sh 0.3", (err, stdout) => {
        if (err) {
            throw err;
        }

        var tmp_arr = stdout.toString().split(";");
        stats.network.wifi.down_speed = tmp_arr[0]/0.3;
        stats.network.wifi.down_total = tmp_arr[1]/0.3;
        stats.network.wifi.up_speed = tmp_arr[2]/0.3;
        stats.network.wifi.up_total = tmp_arr[3]/0.3;
    });

    // VPN
    exec("sudo ./scripts/network/vpn.sh 0.3", (err, stdout) => {
        if (err) {
            throw err;
        }

        var tmp_arr = stdout.toString().split(";");
        stats.network.vpn.down_speed = tmp_arr[0]/0.3;
        stats.network.vpn.down_total = tmp_arr[1]/0.3;
        stats.network.vpn.up_speed = tmp_arr[2]/0.3;
        stats.network.vpn.up_total = tmp_arr[3]/0.3;
    });
}

// IP Addresses
function updateIP(){
    exec("./scripts/network/wifi_ip.sh", (err, stdout) => {
        if (err){
            throw err;
        }

        stats.network.wifi.ip = stdout.toString();
    });
    exec("sudo ./scripts/network/vpn_ip.sh", (err, stdout) => {
        if (err){
            throw err;
        }

        stats.network.vpn.ip = stdout.toString();
    });
}

// Network - wifi
    // Don't spam ip address requests :D
    // if (new Date().getTime()-ip.last_ms > ip.interval){
    //     ip.addr = execSync("./scripts/network/wifi_ip.sh").toString();
    //     ip.vpn_addr = execSync("sudo ./scripts/network/vpn_ip.sh").toString();
    //     ip.last_ms = new Date().getTime();
    // }

// Return stats object
function getStats(){
    return stats;
}

module.exports = {
    updateCPU: updateCPU,
    updateMemory: updateMemory,
    updateStorage: updateStorage,
    updateNetwork: updateNetwork,
    updateIP: updateIP,

    getStats: getStats
}
var express = require('express');
var router = express.Router();

var Stats = require("../scripts/stats.js");
var execSync = require('child_process').execSync;
Stats.updateIP();

router.get("/hostname", function (req, res, next){
    var info = {};

    // Hostname
    info.hostname = execSync("hostname").toString().trim();
    info.internalip = execSync("hostname -I").toString().trim();

    // Send object
    res.json(info);
});

router.get("/stats", function(req, res, next){
    var stats = Stats.getStats();

    // Fan
    stats.cpu.fan_status = execSync("cat /tmpfs/fan").toString();

    Stats.updateCPU();
    Stats.updateMemory();
    Stats.updateStorage();
    Stats.updateNetwork();

    // Send object
    res.json(stats);
});


module.exports = router;

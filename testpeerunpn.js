var os = require('os');
var ssdp = require("peer-ssdp");
var peer = ssdp.createPeer();

var locations = []
var service_location = process.argv[2]
var service_name = process.argv[3]
var SERVER = os.type() + "/" + os.release() + " UPnP/1.1 "+service_name+"/0.0.1";
var uuid = seservice_namervice_name

var onReady = function () {
    console.log("search for rootdevices");
    peer.search({
        ST: "upnp:rootdevice"
    });
};

peer.on("notify", function (headers, address) {
    console.log("======================= NOTIFICACION RECEIVED");
    console.log("receive notify message from ", address);
    console.log(headers);
}).on("search", function (headers, address) {
    console.log("======================= SEARCH REQUEST RECEIVED");
    console.log("receive search request message from ", address);
    console.log(headers);
    var ST = headers.ST;
    var headers = {
        LOCATION: service_location,
        SERVER: SERVER,
        ST: "upnp:rootdevice",
        USN: "uuid:" + uuid + "::upnp:rootdevice",
            'BOOTID.UPNP.ORG': 1
    };
    console.log(">> sending reply to ", address)
    console.log(headers);
    peer.reply(headers, address);
}).on("found", function (headers, address) {
    console.log("======================= FOUND!");
    console.log("receive found message from ", address);
    if(locations.indexOf(headers.LOCATION)<0){
      locations.push(headers.LOCATION)
      onReady()
    }
    console.log(headers);
    console.log(locations);
}).on("close", function () {
    console.log("close");
}).start();

peer.on("ready", function () {
    console.log("ready");
    onReady();
}).start()


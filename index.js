var os = require('os');
var ssdp = require("peer-ssdp");
var peer = ssdp.createPeer();
var events = require('events');
var util = require('util');


function superSsdp(options){
  this.locations = []
  this.disc = []
  this.service_location = options.url
  this.service_name = options.name
  this.SERVER = os.type() + "/" + os.release() + " UPnP/1.1 "+this.service_name+"/0.0.1";
  this.uuid = this.service_name
}

util.inherits(superSsdp, events.EventEmitter);

superSsdp.prototype.start = function () {
  var self = this

  var onReady = function () {
      //console.log('sending info request to the wild')
      peer.search({
          ST: "upnp:rootdevice"
      });
  };

  peer.on("notify", function (headers, address) {
  }).on("search", function (headers, address) {
      //console.log('search>>')
      //console.log('telling about me to:')
      //console.log(address.address)
      //console.log(headers)
      var ST = headers.ST;
      var headers = {
          LOCATION: self.service_location,
          SERVER: self.SERVER,
          ST: "upnp:rootdevice",
          USN: "uuid:" + self.uuid + "::upnp:rootdevice",
              'BOOTID.UPNP.ORG': 1
      };
      //console.log('search>>answer<<')
      //console.log(headers)
      peer.reply(headers, address);
  }).on("found", function (headers, address) {
      //console.log('found>>')
      //console.log(headers)
      if(self.locations.indexOf(headers.LOCATION)<0 
         && headers.LOCATION != self.service_location
         && headers.SERVER.indexOf(self.service_name) >= 0 ){ 
        self.locations.push(headers.LOCATION)
        onReady()
        self.emit('found', headers.LOCATION)
      }
  }).on("close", function () {
        self.disc.splice(address.address,1)
  }).start();

  peer.on("ready", function () {
      onReady();
      setInterval(onReady, 3000);
  }).start()
}

/**
 *  * create an new SSDP Peer
 *   */
exports.createPeer = function (options) {
      var peer = new superSsdp(options);
      return peer;
};

super-ssdp
=========

Implements a <Super Simple> API for peer2peer aplications based based in peer-ssdp node module 
that implements the SSDP device discovery as specified in
http://www.upnp.org/specs/arch/UPnP-arch-DeviceArchitecture-v1.0-20080424.pdf

Installation
------------
npm install super-ssdp

Usage
-----
Announce your peer with ssdp.createPeer()

```
var ssdp = require('super-ssdp');
var ip = require('ip')
ssdp.createPeer({'name': 'CoolP2PAplicationName', 'url':'http://'+ip.address()+':8080'}); 
```

Only peers with the same 'name' will be discovered in the local network.

Every time a new Peer connects, the 'found' signal is emitted:

````
peer.start()

peer.on('found', function(address){
  console.log('OTHER PEER FOUND!!!! >>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<', address)
})

````

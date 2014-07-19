ssdp = require('../index.js')
ip = require('ip')
local_peer = 'http://'+ip.address()+":"+randomInt(6000,7000);
peer = ssdp.createPeer({'name': 'quantic', 'url':local_peer});

function randomInt (low, high) {
  return Math.floor(Math.random() * (high - low) + low);
}

console.log('Starting peer at: '+local_peer)
peer.start()

peer.on('found', function(msj){
  console.log('OTHER PEER FOUND!!!! >>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<', msj)
})


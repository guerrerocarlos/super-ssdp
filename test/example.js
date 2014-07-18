ssdp = require('../index.js')
peer = ssdp.createPeer({'name': 'quantic', 'url':'http://192.168.0.201'});

peer.start()

peer.on('found', function(msj){
  console.log('PEER FOUND!!!! >>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<', msj)
})


var https = require("https");
var fs = require("fs");
https.get("https://www.meethue.com/api/nupnp",function(response){
  var serverData = '';
  response.on('data',function(chunk){
    serverData += chunk;
  });
  response.on('uncaughtException',function(err){
    console.log("uncaughtException: "+err);
  });
  response.on('end',function(){
    var d = JSON.parse(serverData);
		var ip = d[0].internalipaddress;
    console.log(ip);
    var hue = {
                hue:{
                    "ip": ip,
                    "port": ""
                  }
              };
    fs.writeFile('./gate.json', JSON.stringify(hue), function(err) {
      if(err) throw err;
        console.log('success');
    });
  });
});

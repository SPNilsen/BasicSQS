const querystring = require('querystring');
const https = require('http');

exports.handler = async function(event, context) {
 return new Promise((resolve, reject) => {


var records= event.Records;

var attr = records.map(function(obj) {
    return obj.messageAttributes;
});

var UniqueId = attr.map(function(obj) {
    return obj.uniqueId.stringValue;
});

var Token = attr.map(function(obj) {
    return obj.token.stringValue;
});

UniqueId=UniqueId[0];
Token=Token[0];

const data = JSON.stringify({
  uniqueId: UniqueId,
  token:Token,
});

var options = {
  hostname: 'development-env.eba-aa3cqxkf.us-east-2.elasticbeanstalk.com',
  path: '/lambdasqs2',
  method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  },
};
console.log('START');

var req = https.request(options, function(res) {
    console.log('STATUS: ' + res.statusCode);
    res.setEncoding('utf8');
     res.on('data', d => {
    process.stdout.write(d)
  })
    res.on('end', function() {
        console.log("DONE");
        console.log(data);
        resolve(data);
        });
    });
    req.on('error', (e) => {
          reject(e.message);
          console.log(e.message)
        });
        req.write(data)
    req.end();
console.log("END")

});

};

const http = require('http');

const parseCookies = (cookie  = "") => 
    cookie.split(";")
    .map( v => v.split('='))
    .map(([k, ...vs]) => [k, vs.join('=')])
    .reduce( (acc, [k,v]) => {
        acc[k.trim()] = decodeURIComponent(v);
        return acc;
    }, {})


http.createServer( (req, res) =>{
    const cookies = parseCookies(req.headers.cookie);
    console.log(req.url, cookies);
    res.writeHead(200, {'Set-cookie' : "mycookie=test"});
    res.end('hello cookie');

}).listen(8080, (err, data)=> {
    console.log('8080 port opend')
})


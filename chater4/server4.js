const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');

const parseCookies = ( cookies ='') =>
    cookies
        .split(';')
        .map( v => v.split('='))
        .map( ([k ,...vs]) => [k , vs.join('=')])
        .reduce( (acc, [k,v]) => {
            acc[k.trim()] = decodeURIComponent(v);
            return acc;
        }, {})

http.createServer( (req, res) => {
    const cookie = parseCookies(req.headers.cookie);
    console.log(cookie, req.headers.cookie)
    if( req.url.startsWith('/login')){
        const {query} = url.parse(req.url); // /login?name=test > name=test로 파싱
        console.log(req.url)
        console.log(query)
        const {name}  = qs.parse(query); // name=test를 {name: 'test'} 로 파싱
        const expires = new Date();
        res.writeHead(302, {
            Location : '/',
            'Set-cookie' : `name=${encodeURIComponent(name)};Expires=${expires.toString()};httpOnly; Path=/`  // Path => 리다이렉트 주소로 세션 만료시 이동하게 될 주소
        })
        res.end();
    } else if(cookie.name){
        res.writeHead(200, {'Contecnt-Type' : 'text/html; charset=utf-8'});
        res.end(`${cookie.name}님 안녕하세요`);

    } else {
        fs.readFile('./server4.html', (err, data)=> {
            if( err) throw err;
            res.end(data);
        })
    }
}).listen(8080, ()=> {
    console.log(8080)
})
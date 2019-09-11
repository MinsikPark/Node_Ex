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

const session = {}
http.createServer( (req, res) => {
    const cookie = parseCookies(req.headers.cookie);
    console.log(cookie, req.headers.cookie)
    if( req.url.startsWith('/login')){
        const {query} = url.parse(req.url); // /login?name=test > name=test로 파싱
        console.log(req.url)
        console.log(query)
        const {name}  = qs.parse(query); // name=test를 {name: 'test'} 로 파싱
        const expires = new Date();
        expires.setMinutes( expires.getMinutes() + 5);
        const randomInt = +new Date();
        session[randomInt] = {
            name,
            expires
        };
        res.writeHead(302, {
            Location : '/',
            'Set-cookie' : `session=${encodeURIComponent(randomInt)};Expires=${expires.toGMTString()};httpOnly; Path=/`  // Path => 리다이렉트 주소로 세션 만료시 이동하게 될 주소
        })
        res.end();
    } else if( cookie.session && session[cookie.session].expires > new Date()){
        res.writeHead(200, {'Contecnt-Type' : 'text/html;charset=utf-8'});
        res.end(`${session[cookie.session].name}님 안녕하세요`);

    } else {
        fs.readFile('./server4.html', (err, data)=> {
            if( err) throw err;
            res.end(data);
        })
    }
}).listen(8080, ()=> {
    console.log(8080)
})
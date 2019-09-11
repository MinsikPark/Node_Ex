const http = require('http')
const fs = require('fs');

const users = {}

http.createServer(( req, res) => {
    if( req.method === "GET"){
        if(req.url ==='/'){
            return fs.readFile('./restFront.html', (err, data) => {
                if( err) throw err;
                res.end(data);
            })
        } else if( req.url === '/users'){
            res.end( JSON.stringify(users));
        } else if( req.url === '/about'){
            return fs.readFile('./about.html', (err, data) => { 
                if( err) throw err;
                res.end(data);
            })
        }
        return fs.readFile(`.${req.url}`, (err, data) => {
            if( err) {
                res.writeHead(404, 'NOT FOUND');
                res.end('page not found')
            }
            res.end(data);
        })
    } else if( req.method === "POST"){
        if( req.url === '/users'){
            let body = '';
            req.on( 'data', (data) => { // 버퍼스트림을 받는 코드
                body += data;
            })
            return req.on('end', () => { // 버퍼스트림이 모두 끝난 후 실행되는 콜백 지정
                console.log('POST 본문 body : ', body);
                const {name} = JSON.parse(body);
                const id = +new Date();
                users[id] = name;
                res.writeHead(201);
                res.end('등록 성공')
            })
        } 
    } else if( req.method ==='PUT'){
        if( req.url.startsWith('/users')){
            const key= req.url.split('/')[2];
            let body = '';
            req.on('data', ()=>{
                console.log("PUT BODY : ", body);
                users[key] = JSON.parse(body).name;
                return res.end(JSON.stringify(users));
            })
        }
        
    } else if( req.method ==='DELETE'){
        if(req.url.startsWith('/users')){
            const key = req.url.split('/')[2];
            delete users[key];
            return res.end(JSON.stringify(users));
        }
        
    }
    res.writeHead(404,"NOT FOUND");
    return res.end("NOT FOUND");

}).listen(8080)
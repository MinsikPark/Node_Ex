const http = require('http');
const fs = require('fs');

const server = http.createServer( (req, res) => {
    fs.readFile('./server2.html', (err, data)=>{
        if( err) throw err;
        res.end(data);
    })
}).listen( 8081); // 8080 포트를 열어 응답에 대기한다.

// listening 이벤트 등록
server.on( "listening", () => {
    console.log( '8081번 서버의 포트 대기중');
})

// error 이벤트 등록
server.on( "error", ()=> {
    console.error('Error Something');
})
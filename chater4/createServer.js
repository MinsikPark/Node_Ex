const http = require('http');
const fs = require('fs');

const server = http.createServer( (req, res) => {
    res.write('<h1>Hello Node</h1>'); // 응답에 내용을 적음
    res.end("<p>Hello Server</p>"); // 응답을 작성하는 것을 종료한다.
}).listen( 8080); // 8080 포트를 열어 응답에 대기한다.

// listening 이벤트 등록
server.on( "listening", () => {
    console.log( '8080번 서버의 포트 대기중');
})

// error 이벤트 등록
server.on( "error", ()=> {
    console.error('Error Something');
})
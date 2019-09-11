const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if( cluster.isMaster){
    console.log('마스터 프로세스 아이디 : ', process.pid)

    // CPU 개수만큼 워커 생산
    for(let i = 0; i <= numCPUs ; i ++){
        cluster.fork();
    }
    // 워커 종료시
    cluster.on('exit', (worker, code, signal) =>{
        console.log(`${worker.process.pid}가 종료됨`);
        cluster.fork(); //워커가 종료되는 즉시 다시 실행시킨다.
    })
} else {
    http.createServer( (req, res)=>{
        res.write('HELLO');
        res.end('hello Cluster');
        setTimeout(() => {
            process.exit(1); // 만약 모든 워커가 죽으면 서버는 동작하지 않는다.
        }, 1000);
    }).listen(8080);

    console.log(`${process.pid}워커 실행`)
} 
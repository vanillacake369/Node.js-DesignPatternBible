// 소켓 작업이 실행되는 스레드가 블로킹 되는 코드
// data 가 사용가능해질 때까지 스레드를 블로킹
data = socket.read();
// data 사용 가능
print(data)
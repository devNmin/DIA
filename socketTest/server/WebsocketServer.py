import asyncio              # 웹 소켓 모듈을 선언한다.
import websockets           # 클라이언트 접속이 되면 호출된다.
import time
host= "127.0.0.1"
port= 4000
points = {1: {'x':1, 'y':2}, 2: {'x':2, 'y':3}}
socket=''
async def accept(websocket):
    global socket
    socket = websocket
    try:
        await messageSend(websocket, 'socket connected')
        time.sleep(1)
    except websockets.ConnectionClosed:
        print("Connection closed")
        return
    
    while True:
        try:
            await messageSend(websocket, 'socket connected')
        except websockets.ConnectionClosed:
            print("Connection closed")
            break
            
async def messageSend(websocket, message):
    await websocket.send(message)

def connectSocket():
    start_server = websockets.serve(accept, host, port);
    # 비동기로 서버를 대기한다.
    asyncio.get_event_loop().run_until_complete(start_server);
    asyncio.get_event_loop().run_forever();   

    
if __name__ == '__main__':
    connectSocket()
   
    
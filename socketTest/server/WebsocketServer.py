import asyncio              # 웹 소켓 모듈을 선언한다.
import websockets           # 클라이언트 접속이 되면 호출된다.
import time
import json

host= "127.0.0.1"
port= 4000
points = {1: {'x':1, 'y':2}, 2: {'x':2, 'y':3}} 
socket=''
async def accept(websocket):
    global socket
    socket = websocket
    print("tttt")
    print("222222", asyncio.get_event_loop())
    try:
        await messageSend(websocket, 'socket connected')
        print(socket)
        await asyncio.sleep(1)
    except websockets.ConnectionClosed:
        print("Connection closed")
        return
    
    while True:
        try:
            # 좌표 정보를 받아와야대
            # message = (yield)
            # print(message)
            await messageSend(websocket, json.dumps(points))
            await asyncio.sleep(1)
            asyncio.get_event_loop().stop()
        except websockets.ConnectionClosed:
            print("Connection closed")
            break
            
async def messageSend(websocket, message):
    await websocket.send(message)

def connectSocket():
    global socket
    print(socket)
    # async with websockets.serve(accept, host, port):
    #     await asyncio.Future()  # run forever

    start_server = websockets.serve(accept, host, port);
    # 비동기로 서버를 대기한다.
    asyncio.get_event_loop().run_until_complete(start_server);
    asyncio.get_event_loop().run_forever(); 
    
    print("tt ");
    asyncio.get_event_loop().run_until_complete(messageSend(socket, "1"));
    asyncio.get_event_loop().run_until_complete(messageSend(socket, "2"));
    asyncio.get_event_loop().run_until_complete(messageSend(socket, "3"));
    asyncio.get_event_loop().run_until_complete(messageSend(socket, "4"));
    asyncio.get_event_loop().run_until_complete(messageSend(socket, "5"));
    
    # asyncio.get
    # print("rrrrr")
    # while True:
    #     s = input()
    #     if(s == 0):
    #         break
    #     print("11111", asyncio.get_event_loop())
    #     print("sddd", socket)
    #     socket.send("dddddddd")


if __name__ == '__main__':
    connectSocket()
    
   
    
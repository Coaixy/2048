# -*- coding: utf-8 -*-
# Author: Coaixy

import asyncio
import websockets


flag_bool = False
ws = object


async def receive(websocket):
    while True:
        global flag_bool,ws
        data = await websocket.recv()
        if data == "client":
            ws = websocket
            flag_bool = True
        else:
            list = data.split(" : ")
            if flag_bool:
                try:
                    print(list[1])
                    await ws.send(list[1])
                except Exception:
                    break


async def run(websocket):
    while True:
        try:
            await receive(websocket)
        except websockets.ConnectionClosed:
            print('断开连接')
            break

if __name__ == '__main__':
    server = websockets.serve(run, "127.0.0.1", 5000)
    asyncio.get_event_loop().run_until_complete(server)
    asyncio.get_event_loop().run_forever()

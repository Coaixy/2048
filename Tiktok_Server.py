# -*- coding: utf-8 -*-
# Author: XiaoXinYo

import asyncio
import websockets
import json

TIME = 5000
COMMAND = []

async def barrage(websocket):
    global COMMAND
    print('barrage连接成功')
    while True:
        data = await websocket.recv()
        data = json.loads(data)
        for data_count in data:
            content = data[data_count].get('content').lower()
            if content in ['w', 'a', 's', 'd']:
                COMMAND.append(content)

async def game(websocket):
    global TIME, COMMAND
    print('game连接成功')
    information = {'action': 'start_timer', 'time': f'{TIME}'}
    await websocket.send(json.dumps(information))
    while True:
        await asyncio.sleep(TIME / 1000)
        information = {'action': 'execute'}
        if COMMAND:
            information['command'] = max(COMMAND)
            COMMAND = []
        else:
            information['command'] = 'null'
        await websocket.send(json.dumps(information))

async def run(websocket, path):
    while True:
        try:
            path = path[1:]
            if path == 'barrage':
                await barrage(websocket)
            elif path == 'game':
                await game(websocket)
        except websockets.ConnectionClosed:
            print(f'{path}断开连接')
            break

if __name__ == '__main__':
    server = websockets.serve(run, "127.0.0.1", 5000)
    asyncio.get_event_loop().run_until_complete(server)
    asyncio.get_event_loop().run_forever()
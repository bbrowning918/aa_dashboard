import asyncio

import websockets

import config


async def handler(websocket):
    async for message in websocket:
        print(message)


async def main():
    port = config.get_port()
    async with websockets.serve(handler, "", port):
        await asyncio.Future()


if __name__ == "__main__":
    asyncio.run(main())

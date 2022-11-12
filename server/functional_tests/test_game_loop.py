import json
import websockets

from server.app import handler

from .base import AsyncioTestCase


class GameLoopTest(AsyncioTestCase):
    async def test_server_start(self):
        async with websockets.serve(handler, "127.0.0.1", 0) as server:
            host, port = server.sockets[0].getsockname()
            ws_uri = f"ws://{host}:{port}/"

            async with websockets.connect(ws_uri) as client:
                # host starts a game
                await client.send(json.dumps({"type": "start"}))
                response = await client.recv()
                message = json.loads(response)
                # host gets init message back
                self.assertEqual(message["type"], "init")

            # player a joins the game as germany
            # player b joins the game as soviet union

            # player a makes their turn

            # host gets the update
            # player a gets the update
            # player b gets the update

            self.fail("finish the test")

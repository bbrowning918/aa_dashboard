import json
import websockets

from server.app import handler

from .base import AsyncioTestCase


class FunctionalTest(AsyncioTestCase):
    WS_PORT = 8001
    WS_HOST = "127.0.0.1"

    async def test_game_loop(self):
        async with websockets.serve(handler, self.WS_HOST, self.WS_PORT):
            ws_uri = f"ws://{self.WS_HOST}:{self.WS_PORT}/"

            host = await websockets.connect(ws_uri)
            player_a = await websockets.connect(ws_uri)
            player_b = await websockets.connect(ws_uri)

            # host starts a game
            await host.send(json.dumps({"type": "start"}))

            # host gets init message back
            response = await host.recv()
            message = json.loads(response)
            self.assertEqual(message["type"], "init")
            self.assertIn("token", message["payload"])
            self.assertIn("game_ref", message["payload"])
            self.assertIn("qr_code", message["payload"])

            host_token = message["payload"]["token"]
            game_ref = message["payload"]["game_ref"]

            # host joins the game
            await host.send(
                json.dumps({"type": "join", "payload": {"game_ref": game_ref, "token": host_token}}))

            # host gets join message back
            response = await host.recv()
            message = json.loads(response)
            self.assertEqual(message["type"], "join")
            self.assertIn("token", message["payload"])
            self.assertEqual(host_token, message["payload"]["token"])
            self.assertIn("turns", message["payload"])
            self.assertIn("powers", message["payload"])

            # player_a joins game
            await player_a.send(json.dumps({"type": "join", "payload": {"game_ref": game_ref}}))

            # player_a gets join message back
            response = await player_a.recv()
            message = json.loads(response)
            self.assertEqual(message["type"], "join")
            self.assertIn("token", message["payload"])
            self.assertIn("turns", message["payload"])
            self.assertIn("powers", message["payload"])

            player_a_token = message["payload"]["token"]

            # player_a drafts germany
            await player_a.send(
                json.dumps({"type": "draft", "payload": {"token": player_a_token, "powers": ["Germany"]}}))

            # player_a gets update message back
            response = await player_a.recv()
            message = json.loads(response)
            self.assertEqual(message["type"], "update")
            self.assertIn("turns", message["payload"])
            self.assertIn("powers", message["payload"])

            # host sees update from player_a's draft
            response = await host.recv()
            message = json.loads(response)
            self.assertEqual(message["type"], "update")
            self.assertIn("turns", message["payload"])
            self.assertIn("powers", message["payload"])
            # germany disappears from powers

            # player_b joins game
            await player_b.send(json.dumps({"type": "join", "payload": {"game_ref": game_ref}}))

            # player_b gets join message back
            response = await player_b.recv()
            message = json.loads(response)
            self.assertEqual(message["type"], "join")
            self.assertIn("token", message["payload"])
            self.assertIn("turns", message["payload"])
            self.assertIn("powers", message["payload"])

            player_b_token = message["payload"]["token"]

            # player_b drafts soviet union
            await player_b.send(
                json.dumps({"type": "draft", "payload": {"token": player_b_token, "powers": ["Soviet Union"]}}))

            # player_b gets update message back
            response = await player_b.recv()
            message = json.loads(response)
            self.assertEqual(message["type"], "update")
            self.assertIn("turns", message["payload"])
            self.assertIn("powers", message["payload"])

            # player_a sees update from player_b's draft
            response = await player_a.recv()
            message = json.loads(response)
            self.assertEqual(message["type"], "update")
            self.assertIn("turns", message["payload"])
            self.assertIn("powers", message["payload"])

            # host sees update from player_b's draft
            response = await host.recv()
            message = json.loads(response)
            self.assertEqual(message["type"], "update")
            self.assertIn("turns", message["payload"])
            self.assertIn("powers", message["payload"])

            # player_a makes their turn

            # player a sees the update

            # host sees the update from player_a's turn
            # player_b sees the update from player_a's turn

            self.fail("finish the test")

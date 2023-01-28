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

            # host receives init message
            response = await host.recv()
            message = json.loads(response)
            self.assertEqual(message["type"], "init")
            self.assertIsInstance(message["payload"]["qr_code"], str)

            host_token = message["payload"]["token"]
            self.assertIsNotNone(host_token)

            game_ref = message["payload"]["game_ref"]
            self.assertIsNotNone(game_ref)

            # host joins the game
            await host.send(
                json.dumps({"type": "join", "payload": {"game_ref": game_ref, "token": host_token}}))

            # host receives join message
            response = await host.recv()
            message = json.loads(response)
            self.assertEqual(message["type"], "join")
            self.assertEqual(host_token, message["payload"]["token"])

            self.assertCountEqual(message["payload"]["turns"], [
                {"year": 1936, "season": "Summer", "power": "Germany", "start": 20, "spent": 0, "income": 0},
                {"year": 1936, "season": "Summer", "power": "Soviet Union", "start": 8, "spent": 0, "income": 0},
                {"year": 1936, "season": "Summer", "power": "Communist China", "start": 2, "spent": 0, "income": 0},
                {"year": 1936, "season": "Summer", "power": "Japan", "start": 16, "spent": 0, "income": 0},
                {"year": 1936, "season": "Summer", "power": "UK West", "start": 11, "spent": 0, "income": 0},
                {"year": 1936, "season": "Summer", "power": "UK East", "start": 5, "spent": 0, "income": 0},
                {"year": 1936, "season": "Summer", "power": "ANZAC", "start": 3, "spent": 0, "income": 0},
                {"year": 1936, "season": "Summer", "power": "France", "start": 5, "spent": 0, "income": 0},
                {"year": 1936, "season": "Summer", "power": "Italy", "start": 7, "spent": 0, "income": 0},
                {"year": 1936, "season": "Summer", "power": "United States", "start": 6, "spent": 0, "income": 0},
                {"year": 1936, "season": "Summer", "power": "Nationalist China", "start": 6, "spent": 0, "income": 0},
            ])

            self.assertEqual(message["payload"]["powers"], {
                "Germany": False,
                "Soviet Union": False,
                "Communist China": False,
                "Japan": False,
                "UK West": False,
                "UK East": False,
                "ANZAC": False,
                "France": False,
                "Italy": False,
                "United States": False,
                "Nationalist China": False,
            })

            # player_a joins the game
            await player_a.send(json.dumps({"type": "join", "payload": {"game_ref": game_ref}}))

            # player_a receives join message
            response = await player_a.recv()
            message = json.loads(response)
            self.assertEqual(message["type"], "join")

            self.assertEqual(len(message["payload"]["turns"]), 11)
            self.assertEqual(len(message["payload"]["powers"]), 11)

            player_a_token = message["payload"]["token"]
            self.assertIsNotNone(player_a_token)

            # player_a drafts germany
            await player_a.send(
                json.dumps({"type": "draft", "payload": {"token": player_a_token, "powers": ["Germany"]}}))

            # player_a receives update message
            response = await player_a.recv()
            message = json.loads(response)
            self.assertEqual(message["type"], "update")
            self.assertEqual(len(message["payload"]["turns"]), 11)
            self.assertEqual(message["payload"]["powers"], {
                "Germany": True,
                "Soviet Union": False,
                "Communist China": False,
                "Japan": False,
                "UK West": False,
                "UK East": False,
                "ANZAC": False,
                "France": False,
                "Italy": False,
                "United States": False,
                "Nationalist China": False,
            })

            # host receives update from player_a's draft
            response = await host.recv()
            message = json.loads(response)
            self.assertEqual(message["type"], "update")
            self.assertEqual(len(message["payload"]["turns"]), 11)
            self.assertEqual(message["payload"]["powers"], {
                "Germany": True,
                "Soviet Union": False,
                "Communist China": False,
                "Japan": False,
                "UK West": False,
                "UK East": False,
                "ANZAC": False,
                "France": False,
                "Italy": False,
                "United States": False,
                "Nationalist China": False,
            })

            # player_b joins game
            await player_b.send(json.dumps({"type": "join", "payload": {"game_ref": game_ref}}))

            # player_b receives join message
            response = await player_b.recv()
            message = json.loads(response)
            self.assertEqual(message["type"], "join")
            self.assertEqual(len(message["payload"]["turns"]), 11)
            self.assertEqual(message["payload"]["powers"], {
                "Germany": True,
                "Soviet Union": False,
                "Communist China": False,
                "Japan": False,
                "UK West": False,
                "UK East": False,
                "ANZAC": False,
                "France": False,
                "Italy": False,
                "United States": False,
                "Nationalist China": False,
            })

            player_b_token = message["payload"]["token"]
            self.assertIsNotNone(player_b_token)

            # player_b drafts soviet union
            await player_b.send(
                json.dumps({"type": "draft", "payload": {"token": player_b_token, "powers": ["Soviet Union"]}}))

            # player_b receives update message
            response = await player_b.recv()
            message = json.loads(response)
            self.assertEqual(message["type"], "update")
            self.assertEqual(len(message["payload"]["turns"]), 11)
            self.assertEqual(message["payload"]["powers"], {
                "Germany": True,
                "Soviet Union": True,
                "Communist China": False,
                "Japan": False,
                "UK West": False,
                "UK East": False,
                "ANZAC": False,
                "France": False,
                "Italy": False,
                "United States": False,
                "Nationalist China": False,
            })

            # player_a receives update from player_b's draft
            response = await player_a.recv()
            message = json.loads(response)
            self.assertEqual(message["type"], "update")
            self.assertEqual(len(message["payload"]["turns"]), 11)
            self.assertEqual(message["payload"]["powers"], {
                "Germany": True,
                "Soviet Union": True,
                "Communist China": False,
                "Japan": False,
                "UK West": False,
                "UK East": False,
                "ANZAC": False,
                "France": False,
                "Italy": False,
                "United States": False,
                "Nationalist China": False,
            })

            # host receives update from player_b's draft
            response = await host.recv()
            message = json.loads(response)
            self.assertEqual(message["type"], "update")
            self.assertEqual(len(message["payload"]["turns"]), 11)
            self.assertEqual(message["payload"]["powers"], {
                "Germany": True,
                "Soviet Union": True,
                "Communist China": False,
                "Japan": False,
                "UK West": False,
                "UK East": False,
                "ANZAC": False,
                "France": False,
                "Italy": False,
                "United States": False,
                "Nationalist China": False,
            })

            # player_a makes a turn
            new_turn = {"year": 1936, "season": "Winter", "power": "Germany",
                        "start": 20, "spent": 0, "income": 0}
            await player_a.send(
                json.dumps({"type": "turn", "payload": {"token": player_a_token, "turn": new_turn}}))

            # player_a receives update message
            response = await player_a.recv()
            message = json.loads(response)
            self.assertEqual(message["type"], "update")
            self.assertEqual(len(message["payload"]["turns"]), 12)
            self.assertIn(new_turn, message["payload"]["turns"])
            self.assertEqual(message["payload"]["powers"], {
                "Germany": True,
                "Soviet Union": True,
                "Communist China": False,
                "Japan": False,
                "UK West": False,
                "UK East": False,
                "ANZAC": False,
                "France": False,
                "Italy": False,
                "United States": False,
                "Nationalist China": False,
            })

            # host receives the update from player_a's turn
            response = await host.recv()
            message = json.loads(response)
            self.assertEqual(message["type"], "update")
            self.assertEqual(len(message["payload"]["turns"]), 12)
            self.assertIn(new_turn, message["payload"]["turns"])
            self.assertEqual(message["payload"]["powers"], {
                "Germany": True,
                "Soviet Union": True,
                "Communist China": False,
                "Japan": False,
                "UK West": False,
                "UK East": False,
                "ANZAC": False,
                "France": False,
                "Italy": False,
                "United States": False,
                "Nationalist China": False,
            })

            # player_b receives the update from player_a's turn
            response = await player_b.recv()
            message = json.loads(response)
            self.assertEqual(message["type"], "update")
            self.assertEqual(len(message["payload"]["turns"]), 12)
            self.assertIn(new_turn, message["payload"]["turns"])
            self.assertEqual(message["payload"]["powers"], {
                "Germany": True,
                "Soviet Union": True,
                "Communist China": False,
                "Japan": False,
                "UK West": False,
                "UK East": False,
                "ANZAC": False,
                "France": False,
                "Italy": False,
                "United States": False,
                "Nationalist China": False,
            })

import os
import socket


def get_ws_port():
    return int(os.environ.get("PORT_WS", "8001"))


def get_ws_hostname():
    return socket.gethostname()


def get_http_hostname():
    return socket.gethostname()


def get_http_port():
    return int(os.environ.get("PORT_WEB", "3000"))


def get_tinydb_path():
    return str(os.environ.get('TINY_DB_PATH', 'db.json'))

import logging
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


def get_logger():
    level = str(os.environ.get('LOG_LEVEL', 'DEBUG'))

    logging.basicConfig(level=level)
    logger = logging.getLogger('app')
    logger.setLevel(level)

    handler = logging.StreamHandler()
    formatter = logging.Formatter("%(levelname)s:%(name)s.%(funcName)s:%(lineno)d %(message)s")
    handler.setFormatter(formatter)

    logger.addHandler(handler)
    logger.propagate = False

    return logger

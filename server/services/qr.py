import base64
import io

import qrcode


def make_qr_code(game_id):
    buffer = io.BytesIO()
    img = qrcode.make(game_id)
    img.save(buffer)

    return base64.b64encode(buffer.getvalue()).decode()

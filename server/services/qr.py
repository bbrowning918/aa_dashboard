import base64
import io

import qrcode


def make_qr_code(path):
    buffer = io.BytesIO()
    img = qrcode.make(path)
    img.save(buffer)

    return base64.b64encode(buffer.getvalue()).decode()

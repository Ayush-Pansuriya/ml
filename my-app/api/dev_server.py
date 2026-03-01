from http.server import HTTPServer
import sys
import os

sys.path.append(os.path.dirname(__file__))

from predict import handler

def run(server_class=HTTPServer, handler_class=handler):
    server_address = ('', 5328)
    httpd = server_class(server_address, handler_class)
    print(f"Starting Python API server on port 5328...")
    httpd.serve_forever()

if __name__ == "__main__":
    run()

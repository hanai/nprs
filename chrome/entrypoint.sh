#!/bin/sh

nohup socat tcp-listen:9222,reuseaddr,fork tcp:localhost:19222 &
google-chrome \
  --headless \
  --disable-gpu \
  --disable-setuid-sandbox \
  --no-sandbox
  --remote-debugging-port=19222
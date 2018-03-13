#!/bin/bash

# Run full chrome with a bunch of stuff turned off.
nohup google-chrome \
  --headless \
  --no-first-run \
  --disable-gpu \
  --disable-translate \
  --disable-default-apps \
  --disable-extensions \
  --disable-background-networking \
  --disable-sync \
  --metrics-recording-only \
  --safebrowsing-disable-auto-update \
  --disable-setuid-sandbox \
  --remote-debugging-port=9222 'about:blank' &
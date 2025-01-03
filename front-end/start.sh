#!/bin/sh
trap "kill 0" EXIT

# Start Node.js server
PORT=3007 HOSTNAME=0.0.0.0 node server.js > /var/log/nodejs.log 2>&1 &

# Start Nginx
nginx -g 'daemon off;'
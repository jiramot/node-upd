#!/bin/bash

cd /apps
pm2 start dist/app.js -i 0 --no-daemon

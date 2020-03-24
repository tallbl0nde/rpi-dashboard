#!/bin/bash
# User to run web server as
USER="pi"
# Location of script (i.e. this directory)
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

# Start socat (forward traffic from :80 to :3000)
socat tcp-listen:80,reuseaddr,fork tcp:localhost:3000 &

# Start express
pushd $DIR
sudo -u $USER npm start
popd

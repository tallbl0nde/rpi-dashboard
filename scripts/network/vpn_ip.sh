#!/bin/bash
NAMESPACE="vpn"

# Get and return IP
addr=$( ip netns exec $NAMESPACE curl -s https://ifconfig.io )
echo $addr
#!/bin/bash
INTERFACE="wlan0"

# Get and return IP
addr=$( curl -s http://whatismyip.akamai.com/ )
echo $addr
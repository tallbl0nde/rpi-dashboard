#!/bin/bash
# Variables
INTERFACE="tun0"
NAMESPACE="vpn"

# Get rx/tx bytes
rx=$( ip netns exec $NAMESPACE cat /sys/class/net/$INTERFACE/statistics/rx_bytes )
tx=$( ip netns exec $NAMESPACE cat /sys/class/net/$INTERFACE/statistics/tx_bytes )

sleep $1

# Get them again (to determine wifi speed)
new_rx=$( ip netns exec $NAMESPACE cat /sys/class/net/$INTERFACE/statistics/rx_bytes )
new_tx=$( ip netns exec $NAMESPACE cat /sys/class/net/$INTERFACE/statistics/tx_bytes )
rx_speed=$(( new_rx - rx ))
tx_speed=$(( new_tx - tx ))

# <Return> results (in bytes)
echo "$rx_speed;$new_rx;$tx_speed;$new_tx"

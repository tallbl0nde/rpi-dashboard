#!/bin/sh
# Get memory values
total=$( cat /proc/meminfo | grep SwapTotal | awk '{print $2}' )
free=$( cat /proc/meminfo | grep SwapFree | awk '{print $2}' )
used=$(( total - free ))

# Return (in kB)
echo "$total;$used;$free"
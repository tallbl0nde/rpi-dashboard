#!/bin/sh
# Get memory values
total=$( cat /proc/meminfo | grep MemTotal | awk '{print $2}' )
free=$( cat /proc/meminfo | grep MemAvailable | awk '{print $2}' )
used=$(( total - free ))

# Return (in kB)
echo "$total;$used;$free"
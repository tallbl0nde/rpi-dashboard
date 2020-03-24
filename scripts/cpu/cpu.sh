#!/bin/sh
usage=$( mpstat $1 1 | grep -A 5 "%idle" | tail -n 1 | awk -F " " '{print 100 -  $ 12}'a )
temp=$( cat /sys/class/thermal/thermal_zone0/temp )
load=$( cut -d " " -f 1-3 /proc/loadavg | sed 's/ /, /g' )
uptime=$( uptime -p | cut -d " " -f2- )

echo "$usage;$temp;$load;$uptime"
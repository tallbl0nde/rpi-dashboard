#!/bin/sh
# Get disk usage
used=$( df --output=target,used $1 | awk ' NR==2 { print $2 } ' )
total=$( df --output=target,size $1 | awk ' NR==2 { print $2 } ' )
free=$(( total - used ))

# Return values (in bytes)
echo "$total;$used;$free"

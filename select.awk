#!/bin/awk -f
BEGIN {FS="\",\""}
{
    if (NR == 1 && $10 != "" && $11 != "") {
        printf "%s;%s;%s;%s\n",$10,$11,$15,$14
    } else if ($3 != "" && $4 != "") {
        printf "%s;%s;%s;%s\n",$3,$4,$8,$7
    }
}        
END {}
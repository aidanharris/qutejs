#!/bin/bash
# Yes this is an abomination, better more accurrate and reliable methods are welcome!

set -e

if [ -z "$QUTE_DIR" ]
then
  QUTE_DIR="$PWD/qutebrowser"
fi

if [ ! -d "$QUTE_DIR" ]
then
  echo "qutebrowser does not exist at $QUTE_DIR"
  exit 1
fi

cd "$QUTE_DIR/qutebrowser" || exit 1

other_commands=("$(grep -RP '@cmdutils.*name=' | grep -ohP "name=(\"|').*?(\"|')" | cut -c 7- | rev | cut -c 2- | rev)")

commands=($(grep -RP '@cmdutils.*' -a1   | \
  grep -ohE 'def [a-Za-z].*\(' | \
  cut -c 5-                    | \
  rev                          | \
  cut -c 2-                    | \
  rev                          | \
  grep -vE \
    "$(grep -RP '@cmdutils.*name=' -a5 | \
       grep -ohP 'def\s[a-zA-Z].*?\('  | \
       cut -c 5-                       | \
       rev                             | \
       cut -c 2-                       | \
       rev                             | \
       xargs | sed 's/ /\|/g'          | \
       xargs -I '{}' printf "({})")"))

for i in $(seq 0 "${#commands[@]}")
do
  commands=(${commands[*]} "${other_commands[$i]}")
done

IFS=$'\n' commands=($(sort <<<"${commands[@]}"))

javascriptCommands=()

for i in $(seq 0 "${#commands[@]}")
do
  javascriptCommands["$i"]=$(sed -e 's/-/_/g' -e 's/_\(.\)/_\u\1/g' -e 's/_//g' <<< "${commands[$i]}")
done

js=$(printf "${javascriptCommands[*]}" | sed 's/\s/\n/g')
cmds=$(printf "${commands[*]}" | sed 's/\s/\n/g')

cd "$OLDPWD" || exit 1

JSON="$(jq -n -c -M --arg cmds "$cmds" --arg js "$js" '{"commands": ($cmds|split("\n")),"jsCommands": ($js|split("\n"))}')"

if [[ "$@" != *"-q"* ]] && [[ "$1" != *"--quiet"* ]]
then
  echo "$JSON" | jq
fi

echo "$JSON" > commands.json

#!/usr/bin/env bash
# Written in [Amber](https://amber-lang.com/)
# version: 0.3.5-alpha
# date: 2024-09-05 11:54:56
file_exist__1_v0() {
    local path=$1
    [ -f "${path}" ]
    __AS=$?
    if [ $__AS != 0 ]; then
        __AF_file_exist1_v0=0
        return 0
    fi
    __AF_file_exist1_v0=1
    return 0
}
split__21_v0() {
    local text=$1
    local delimiter=$2
    __AMBER_ARRAY_0=()
    local result=("${__AMBER_ARRAY_0[@]}")
    IFS="${delimiter}" read -rd '' -a result < <(printf %s "$text")
    __AS=$?
    __AF_split21_v0=("${result[@]}")
    return 0
}
contains__33_v0() {
    local text=$1
    local phrase=$2
    __AMBER_VAL_0=$(if [[ "${text}" == *"${phrase}"* ]]; then
        echo 1
    fi)
    __AS=$?
    local result="${__AMBER_VAL_0}"
    __AF_contains33_v0=$(
        [ "_${result}" != "_1" ]
        echo $?
    )
    return 0
}
is_command__76_v0() {
    local command=$1
    [ -x "$(command -v ${command})" ]
    __AS=$?
    if [ $__AS != 0 ]; then
        __AF_is_command76_v0=0
        return 0
    fi
    __AF_is_command76_v0=1
    return 0
}
download__118_v0() {
    local url=$1
    local path=$2
    is_command__76_v0 "curl"
    __AF_is_command76_v0__10_9="$__AF_is_command76_v0"
    is_command__76_v0 "wget"
    __AF_is_command76_v0__13_9="$__AF_is_command76_v0"
    is_command__76_v0 "aria2c"
    __AF_is_command76_v0__16_9="$__AF_is_command76_v0"
    if [ "$__AF_is_command76_v0__10_9" != 0 ]; then
        curl -L -o "${path}" "${url}"
        __AS=$?
    elif [ "$__AF_is_command76_v0__13_9" != 0 ]; then
        wget "${url}" -P "${path}"
        __AS=$?
    elif [ "$__AF_is_command76_v0__16_9" != 0 ]; then
        aria2c "${url}" -d "${path}"
        __AS=$?
    else
        __AF_download118_v0=0
        return 0
    fi
    __AF_download118_v0=1
    return 0
}
rm -fr /tmp/amber-git
__AS=$?
download__118_v0 "https://github.com/amber-lang/amber/archive/refs/heads/master.zip" "/tmp/amber-git.zip" >/dev/null 2>&1
__AF_download118_v0__6_11="$__AF_download118_v0"
if [ "$__AF_download118_v0__6_11" != 0 ]; then
    unzip "/tmp/amber-git.zip" -d /tmp/amber-git
    __AS=$?
    __AMBER_VAL_1=$(/usr/bin/ls "/tmp/amber-git/amber-master/src/std/")
    __AS=$?
    std="${__AMBER_VAL_1}"
    split__21_v0 "${std}" "
"
    __AF_split21_v0__10_18=("${__AF_split21_v0[@]}")
    stdlib=("${__AF_split21_v0__10_18[@]}")
    for v in "${stdlib[@]}"; do
        contains__33_v0 "${v}" ".ab"
        __AF_contains33_v0__13_13="$__AF_contains33_v0"
        file_exist__1_v0 "/tmp/amber-git/amber-master/src/std/${v}"
        __AF_file_exist1_v0__13_36="$__AF_file_exist1_v0"
        if [ $(echo "$__AF_contains33_v0__13_13" '&&' "$__AF_file_exist1_v0__13_36" | bc -l | sed '/\./ s/\.\{0,1\}0\{1,\}$//') != 0 ]; then
            amber --docs "/tmp/amber-git/amber-master/src/std/${v}" "./docs/stdlib/doc"
            __AS=$?
            echo "
"
        fi
    done
fi

#!/bin/sh
function error_trap() {
  echo "ERROR: Command failed"
}

trap error_trap ERR

function verify_command()
{
  if ! command -v $1 &>/dev/null
  then
    echo "ERROR :$1: was NOT found."
    exit 0
  fi
}

function uninstall() {
  if [ -d  /usr/local/Cellar/node/ ]; then
    brew unlink node 
    brew uninstall node
  else 
    echo "Nothing to clean"
  fi
}

function install() {
  if [ -d  /usr/local/Cellar/node/ ]; then
    echo "npm is not clean, exiting"
    exit 0
  fi  

  # Install latest npm from brew
  echo "brew update"
  brew update &>/dev/null

  echo "brew install node"
  brew install node &>/dev/null

  echo "brew link node"
  brew link node &>/dev/null

  # Install yeoman
  echo "Installing yeoman"
  npm install -g yo generator-angular &>/dev/null

  # Install karma
  echo "Installing karma-cli"
  npm install -g karma-cli &>/dev/null

  # Install local npm modules
  echo "Installing local npm modules"
  npm install &>/dev/null

  # Install bower packages
  echo "Installing local bower packages"
  bower install &>/dev/null
}

function verify() {
  verify_command npm
  verify_command bower
  verify_command yo
  verify_command karma
}

uninstall
install
verify

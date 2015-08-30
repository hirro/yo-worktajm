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

function install() {


  # Install yeoman
  echo "Installing yeoman"
  npm install -g yo generator-angular

  # Install karma
  echo "Installing karma-cli"
  npm install -g karma-cli

  # Protractor
  echo "Installing protractor"
  npm install -g protractor

  # Bower
  npm install -g bower

  # Install local npm modules
  echo "Installing local npm modules"
  npm install

  # Install bower packages
  echo "Installing local bower packages"
  bower install

  # Install grunt 
  npm install -g grunt-cli

  # Sass
  npm install -g grunt-contrib-sass
}

function verify() {
  verify_command npm
  verify_command bower
  verify_command yo
  verify_command karma
}

install
verify

#!/bin/bash

# Function to clean packages
clean_packages() {
  echo "Cleaning packages..."
  npm run clean:build
  npm run clean:packages
}

# Parse arguments
while getopts "c" opt; do
  case $opt in
    c)
      clean_packages
      ;;
    \?)
      echo "Invalid option: -$OPTARG" >&2
      exit 1
      ;;
  esac
done

ncu -u

npm install
npm run build
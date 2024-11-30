#!/bin/bash

# Function to clean packages
clean_packages() {
  echo "Cleaning packages..."
  npm run clean-packages
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

npm run clean
ncu -u
npm install --legacy-peer-deps
npm run build
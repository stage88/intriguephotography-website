#!/bin/bash

npm run clean
ncu -u
npm run clean-packages
npm install
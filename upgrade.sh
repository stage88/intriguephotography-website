#!/bin/bash

npm run clean
ncu -u
npm run clean-packages
npm install --legacy-peer-deps
npm run build
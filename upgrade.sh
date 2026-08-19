#!/bin/bash
#
# Upgrade the npm dependencies of the project in the current directory.
#
# Usage: upgrade.sh [-c] [-l] [-n]
#   -c  remove the build output and the installed packages first
#   -l  install with --legacy-peer-deps
#   -n  print the available upgrades as JSON and change nothing
#
# Optional npm scripts are run only if the project defines them:
# clean:build and clean:packages (with -c), and build (after the install).

set -euo pipefail

clean=0
legacy_peer_deps=0
check_only=0

# Keep the upgrades inside the peer dependency ranges of the installed packages.
# Without this ncu can bump a package past what its peers allow, and the install
# then fails with ERESOLVE.
ncu_flags=(--peer)

while getopts "cln" opt; do
  case $opt in
    c) clean=1 ;;
    l) legacy_peer_deps=1 ;;
    n) check_only=1 ;;
    \?)
      echo "Usage: $(basename "$0") [-c] [-l] [-n]" >&2
      exit 1
      ;;
  esac
done

# npm exports its configuration to child processes, so a run started with
# "npm run" passes allow-scripts from ~/.npmrc on as if it were a command line
# flag. npm rejects that for project-scoped installs (EALLOWSCRIPTS).
unset npm_config_allow_scripts

if ! command -v ncu >/dev/null 2>&1; then
  echo "npm-check-updates (ncu) is not installed. Run: npm install -g npm-check-updates" >&2
  exit 1
fi

if [ "$check_only" -eq 1 ]; then
  ncu "${ncu_flags[@]}" --jsonUpgraded
  exit 0
fi

# Return 0 if package.json defines the given npm script.
has_script() {
  node -e "const s=require('./package.json').scripts||{};process.exit(s['$1']?0:1)"
}

if [ "$clean" -eq 1 ]; then
  echo "Cleaning packages..."
  if has_script clean:build; then npm run clean:build; fi
  if has_script clean:packages; then npm run clean:packages; fi
fi

ncu -u "${ncu_flags[@]}"

if [ "$legacy_peer_deps" -eq 1 ]; then
  npm install --legacy-peer-deps
else
  npm install
fi

if has_script build; then npm run build; fi

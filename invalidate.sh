#!/bin/bash

set -x

if [ -z "$CLOUDFRONT_DISTRIBUTION_ID" ] 
then
  echo "CLOUDFRONT_DISTRIBUTION_ID is empty"
else
  echo "Creating invalidation on $CLOUDFRONT_DISTRIBUTION_ID"
  aws cloudfront create-invalidation \
    --distribution-id $CLOUDFRONT_DISTRIBUTION_ID \
    --paths "/*"
fi

#!/bin/bash
echo "Deployment commands running"

yarn
yarn build
yarn prisma migrate deploy
wait
yarn prisma generate
pm2 restart Kaguya

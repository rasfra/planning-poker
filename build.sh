#!/bin/bash
npm install --prefix frontend
npm run build --prefix frontend
./gradlew clean assemble
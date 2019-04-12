#!/bin/bash
npm install --prefix frontend
npm run build --prefix frontend
./gradlew clean assemble
java -jar build/libs/planning-poker-0.0.1-SNAPSHOT.jar

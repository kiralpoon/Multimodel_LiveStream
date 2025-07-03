#!/bin/bash

# Start the frontend with local TTS server (frontend only)
echo "Starting MiniCPM-o frontend with LOCAL TTS server (port 32550)..."

# Set environment variable to use local server
export USE_FISH_AUDIO=false

# Start the frontend only
echo "Starting frontend web server..."
npm run dev 
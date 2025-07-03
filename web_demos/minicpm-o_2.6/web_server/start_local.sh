#!/bin/bash

# Start the frontend with local TTS server (default)
echo "Starting MiniCPM-o frontend with LOCAL TTS server (port 32550)..."

# Set environment variable to use local server
export USE_FISH_AUDIO=false

# Start the model server in background
echo "Starting local model server on port 32550..."
python ../model_server.py &
MODEL_SERVER_PID=$!

# Wait a moment for the server to start
sleep 3

# Start the frontend
echo "Starting frontend web server..."
npm run dev

# Cleanup when frontend is stopped
echo "Stopping model server..."
kill $MODEL_SERVER_PID 
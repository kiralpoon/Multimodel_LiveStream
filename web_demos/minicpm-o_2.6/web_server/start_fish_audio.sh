#!/bin/bash

# Start the frontend with Fish Audio TTS server
echo "Starting MiniCPM-o frontend with FISH AUDIO TTS server (port 32551)..."

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "Error: .env file not found!"
    echo "Please create a .env file with your Fish Audio API key:"
    echo "FISH_AUDIO_API_KEY=your_api_key_here"
    exit 1
fi

# Set environment variable to use Fish Audio server
export USE_FISH_AUDIO=true

# Load environment variables (ignore comments and empty lines)
if [ -f ".env" ]; then
    export $(grep -v '^#' .env | grep -v '^$' | xargs)
else
    echo "Warning: .env file not found, using default configuration"
fi

# Check if API key is set
if [ -z "$FISH_AUDIO_API_KEY" ]; then
    echo "Error: FISH_AUDIO_API_KEY not found in .env file!"
    exit 1
fi

# Start the Fish Audio model server in background
echo "Starting Fish Audio model server on port 32551..."
python ../fish_audio_model_server.py &
MODEL_SERVER_PID=$!

# Wait a moment for the server to start
sleep 3

# Start the frontend
echo "Starting frontend web server..."
npm run dev

# Cleanup when frontend is stopped
echo "Stopping Fish Audio model server..."
kill $MODEL_SERVER_PID 
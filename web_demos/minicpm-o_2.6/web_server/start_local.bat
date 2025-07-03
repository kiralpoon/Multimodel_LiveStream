@echo off
REM Start the frontend with local TTS server (default)
echo Starting MiniCPM-o frontend with LOCAL TTS server (port 32550)...

REM Set environment variable to use local server
set USE_FISH_AUDIO=false

REM Start the model server in background
echo Starting local model server on port 32550...
start /B python ../model_server.py

REM Wait a moment for the server to start
timeout /t 3 /nobreak >nul

REM Start the frontend
echo Starting frontend web server...
npm run dev

REM Note: Model server will continue running in background
REM You can stop it manually if needed 
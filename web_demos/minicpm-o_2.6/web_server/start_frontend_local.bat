@echo off
REM Start the frontend with local TTS server (frontend only)
echo Starting MiniCPM-o frontend with LOCAL TTS server (port 32550)...

REM Set environment variable to use local server
set USE_FISH_AUDIO=false

REM Start the frontend only
echo Starting frontend web server...
npm run dev 
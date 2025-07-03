@echo off
REM Start the frontend with Fish Audio TTS server (frontend only)
echo Starting MiniCPM-o frontend with FISH AUDIO TTS server (port 32551)...

REM Check if .env file exists
if not exist ".env" (
    echo Error: .env file not found!
    echo Please create a .env file with your Fish Audio API key:
    echo FISH_AUDIO_API_KEY=your_api_key_here
    pause
    exit /b 1
)

REM Set environment variable to use Fish Audio server
set USE_FISH_AUDIO=true

REM Load environment variables from .env file (skip comments and empty lines)
for /f "tokens=1,2 delims==" %%a in (.env) do (
    if not "%%a"=="" if not "%%a:~0,1%"=="#" set %%a=%%b
)

REM Check if API key is set
if "%FISH_AUDIO_API_KEY%"=="" (
    echo Error: FISH_AUDIO_API_KEY not found in .env file!
    pause
    exit /b 1
)

REM Start the frontend only
echo Starting frontend web server...
npm run dev 
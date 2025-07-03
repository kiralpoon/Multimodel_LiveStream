# MiniCPM-o TTS Server Switching Guide

This guide explains how to switch between the local TTS server and the Fish Audio TTS server in the MiniCPM-o frontend.

## Overview

The system now supports two TTS servers:
- **Local TTS Server** (port 32550): Uses the built-in local TTS model (slower but no API key required)
- **Fish Audio TTS Server** (port 32551): Uses Fish Audio API (much faster, requires API key)

## Asset Directory Location

All reference audio files required by the backend are located in:

```
assets/ref_audios/
```

This directory must exist in the **main project root** (e.g., `/mnt/d/Projects/MiniCPM-o/assets/ref_audios/`).  
The backend will automatically find these files no matter where you launch it from.

## Quick Start

### WSL (Windows Subsystem for Linux) - Recommended

For the best experience, use WSL to run the MiniCPM-o frontend:

```bash
# Navigate to the project directory in WSL
cd /mnt/d/Projects/MiniCPM-o/web_demos/minicpm-o_2.6/web_server

# First time setup - install dependencies
npm install

# Set up environment file
cp env_template.txt .env
# Edit .env and add your Fish Audio API key

# Make scripts executable
chmod +x start_*.sh

# Option 1: Start both backend and frontend together (all-in-one)
./start_local.sh          # Local TTS (backend + frontend)
./start_fish_audio.sh     # Fish Audio TTS (backend + frontend)

# Option 2: Start backend and frontend separately (like original app)
# Terminal 1: Start backend (from project root or anywhere)
cd /mnt/d/Projects/MiniCPM-o
python web_demos/minicpm-o_2.6/model_server.py --port 32550                    # Local TTS backend
python web_demos/minicpm-o_2.6/fish_audio_model_server.py --port 32551        # Fish Audio backend

# Terminal 2: Start frontend only (from web_server)
cd /mnt/d/Projects/MiniCPM-o/web_demos/minicpm-o_2.6/web_server
./start_frontend_local.sh      # Frontend for Local TTS
./start_frontend_fish_audio.sh # Frontend for Fish Audio TTS

# Option 3: Use Python script for more control
python3 start_frontend.py --fish-audio
```

### Option 1: Python Script (Cross-platform)

The most flexible way to start the frontend:

```bash
# Navigate to web_server directory
cd web_server

# Start with Local TTS (default)
python start_frontend.py

# Start with Fish Audio TTS
python start_frontend.py --fish-audio

# Check configuration only
python start_frontend.py --check-only
```

### Option 2: Shell Scripts (Linux/Mac/WSL)

```bash
# Navigate to web_server directory
cd web_server

# Make scripts executable
chmod +x start_*.sh

# All-in-one scripts (backend + frontend)
./start_local.sh          # Local TTS (backend + frontend)
./start_fish_audio.sh     # Fish Audio TTS (backend + frontend)

# Frontend-only scripts (for separate backend/frontend)
./start_frontend_local.sh      # Frontend for Local TTS
./start_frontend_fish_audio.sh # Frontend for Fish Audio TTS
```

### Option 3: Batch Files (Windows)

```cmd
# Navigate to web_server directory
cd web_server

# All-in-one scripts (backend + frontend)
start_local.bat          # Local TTS (backend + frontend)
start_fish_audio.bat     # Fish Audio TTS (backend + frontend)

# Frontend-only scripts (for separate backend/frontend)
start_frontend_local.bat      # Frontend for Local TTS
start_frontend_fish_audio.bat # Frontend for Fish Audio TTS
```

### Option 4: Manual Setup

If you prefer to start servers manually:

1. **Set environment variable:**
   ```bash
   # For Local TTS
   export USE_FISH_AUDIO=false
   
   # For Fish Audio TTS
   export USE_FISH_AUDIO=true
   ```

2. **Start the model server (from project root or anywhere):**
   ```bash
   # Local TTS
   python web_demos/minicpm-o_2.6/model_server.py --port 32550
   
   # Fish Audio TTS
   python web_demos/minicpm-o_2.6/fish_audio_model_server.py --port 32551
   ```

3. **Start the frontend (from web_server directory):**
   ```bash
   cd web_demos/minicpm-o_2.6/web_server
   npm run dev
   ```

> **Note:** The backend now uses robust path resolution and will always find the reference audio files in the main project root, regardless of your current working directory.

## Configuration

### Environment Variables

- `USE_FISH_AUDIO`: Set to `true` or `1` to use Fish Audio, `false` or unset for local TTS
- `FISH_AUDIO_API_KEY`: Your Fish Audio API key (required for Fish Audio mode)

### Port Configuration

- **Local TTS**: Port 32550
- **Fish Audio TTS**: Port 32551
- **Frontend**: Port 8088

The frontend automatically detects which server to connect to based on the `USE_FISH_AUDIO` environment variable.

## WSL Setup Guide

### Prerequisites

1. **Install WSL2** (if not already installed):
   ```bash
   # In Windows PowerShell as Administrator
   wsl --install
   ```

2. **Install Node.js in WSL**:
   ```bash
   # Update package list
   sudo apt update
   
   # Install Node.js and npm
   curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
   sudo apt-get install -y nodejs
   
   # Verify installation
   node --version
   npm --version
   ```

3. **Install Python dependencies**:
   ```bash
   # Navigate to project directory
   cd /mnt/d/Projects/MiniCPM-o/web_demos/minicpm-o_2.6
   
   # Install Fish Audio requirements
   pip3 install -r requirements_fish_audio.txt
   ```

### First Time Setup

```bash
# Navigate to web_server directory
cd /mnt/d/Projects/MiniCPM-o/web_demos/minicpm-o_2.6/web_server

# Install frontend dependencies
npm install

# Set up environment file
cp env_template.txt .env

# Edit .env file with your API key
nano .env  # or use your preferred editor

# Make scripts executable
chmod +x start_local.sh start_fish_audio.sh
```

## Fish Audio Setup

### 1. Get API Key

1. Visit [Fish Audio](https://fish-audio.com/)
2. Sign up for an account
3. Get your API key from the dashboard

### 2. Configure .env File

Edit the `.env` file in the web_server directory:

```bash
# Navigate to web_server directory
cd web_server

# Edit the .env file
nano .env
```

Replace the placeholder with your actual API key:
```env
FISH_AUDIO_API_KEY=your_actual_api_key_here
```

### 3. Install Dependencies

```bash
# Navigate to project directory
cd /mnt/d/Projects/MiniCPM-o/web_demos/minicpm-o_2.6

# Install Fish Audio requirements
pip3 install -r requirements_fish_audio.txt
```

## Troubleshooting

### Common Issues

1. **"npm not found"**
   - Install Node.js and npm in WSL
   - Ensure they're in your PATH

2. **"FISH_AUDIO_API_KEY not found"**
   - Create a `.env` file with your API key
   - Check the file format (no spaces around `=`)

3. **"Port already in use"**
   - Stop any existing servers
   - Check if ports 32550 or 32551 are already in use

4. **"Frontend can't connect to server"**
   - Ensure the model server is running
   - Check that the correct port is being used
   - Verify the `USE_FISH_AUDIO` environment variable is set correctly

5. **"Reference audio file not found"**
   - Make sure the `assets/ref_audios/` directory exists in your main project root
   - The backend will resolve asset paths automatically, regardless of where you launch it
   - If you see a path error, check that the file exists at:
     ```
     /mnt/d/Projects/MiniCPM-o/assets/ref_audios/default.wav
     ```

### WSL-Specific Issues

5. **"Permission denied" when running scripts**
   ```bash
   # Make scripts executable
   chmod +x start_local.sh start_fish_audio.sh
   ```

6. **"File not found" errors**
   - Ensure you're in the correct directory: `/mnt/d/Projects/MiniCPM-o/web_demos/minicpm-o_2.6/web_server`
   - Check that all files are accessible from WSL

7. **"Python not found"**
   ```bash
   # Install Python if needed
   sudo apt update
   sudo apt install python3 python3-pip
   ```

8. **"Audio file not found" errors**
   - The backend now uses robust path resolution and will find assets automatically
   - Audio files are accessed from the main project root (`/mnt/d/Projects/MiniCPM-o/assets/ref_audios/`)
   - Ensure the project structure is intact

9. **"Cannot connect to localhost"**
   - In WSL, use `localhost` or `127.0.0.1` to access the frontend
   - The frontend runs on `http://localhost:8088`
   - Model servers run on ports 32550 (local) or 32551 (Fish Audio)

### Debug Mode

Use the check-only mode to verify your setup:

```bash
python start_frontend.py --check-only
```

This will verify:
- Dependencies are installed
- Environment configuration is correct
- No port conflicts

## Performance Comparison

| Feature | Local TTS | Fish Audio TTS |
|---------|-----------|----------------|
| Speed | Slow (5-10 seconds) | Fast (1-2 seconds) |
| Quality | Good | Excellent |
| API Key Required | No | Yes |
| Internet Required | No | Yes |
| Cost | Free | Pay-per-use |

## Migration from Original Setup

If you were using the original setup:

1. **No changes needed** - the local TTS server still works as before
2. **To use Fish Audio**: Follow the Fish Audio setup steps above
3. **Configuration files**: The system automatically detects which server to use

## Advanced Configuration

### Custom Ports

To use custom ports, modify the `config.js` file:

```javascript
const config = {
  local: {
    port: 32550,  // Change this
    name: 'Local TTS Server'
  },
  fishAudio: {
    port: 32551,  // Change this
    name: 'Fish Audio TTS Server'
  }
};
```

### Multiple Instances

You can run multiple instances with different configurations:

```bash
# Terminal 1: Local TTS
python start_frontend.py

# Terminal 2: Fish Audio TTS (different port)
USE_FISH_AUDIO=true python start_frontend.py
```

## Accessing the Frontend

### From WSL
Once the servers are running, access the frontend at:
- **Frontend**: http://localhost:8088
- **Local TTS Server**: http://localhost:32550
- **Fish Audio TTS Server**: http://localhost:32551

### From Windows
If running in WSL, you can access the frontend from Windows at:
- **Frontend**: http://localhost:8088
- The frontend will automatically connect to the correct TTS server

### From Other Devices
To access from other devices on your network:
- **Frontend**: http://[your-wsl-ip]:8088
- Find your WSL IP with: `ip addr show eth0`

## Support

For issues with:
- **Local TTS**: Check the original MiniCPM-o documentation
- **Fish Audio**: Check the Fish Audio API documentation
- **Frontend**: Check the Vue.js and Vite documentation
- **Integration**: Check this README and the `README_fish_audio.md` file
- **WSL**: Check Microsoft's WSL documentation 
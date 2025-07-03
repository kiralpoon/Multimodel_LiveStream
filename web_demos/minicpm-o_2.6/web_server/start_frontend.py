#!/usr/bin/env python3
"""
Flexible startup script for MiniCPM-o frontend
Supports both local TTS and Fish Audio TTS servers
"""

import argparse
import os
import sys
import subprocess
import time
import signal
from pathlib import Path

def check_dependencies():
    """Check if required dependencies are available"""
    # Check if Node.js and npm are available
    try:
        subprocess.run(['npm', '--version'], check=True, capture_output=True)
    except (subprocess.CalledProcessError, FileNotFoundError):
        print("Error: npm is not installed or not in PATH")
        return False
    
    # Check if Python is available
    try:
        subprocess.run([sys.executable, '--version'], check=True, capture_output=True)
    except subprocess.CalledProcessError:
        print("Error: Python is not available")
        return False
    
    return True

def check_env_file():
    """Check if .env file exists and has required variables"""
    env_file = Path('.env')
    if not env_file.exists():
        return False, "No .env file found"
    
    try:
        with open(env_file, 'r') as f:
            content = f.read()
            # Check if API key exists and is not just a placeholder
            if 'FISH_AUDIO_API_KEY' not in content:
                return False, "FISH_AUDIO_API_KEY not found in .env file"
            if 'your_fish_audio_api_key_here' in content:
                return False, "Please replace the placeholder API key with your actual Fish Audio API key"
    except Exception as e:
        return False, f"Error reading .env file: {e}"
    
    return True, "OK"

def start_model_server(use_fish_audio=False):
    """Start the appropriate model server"""
    if use_fish_audio:
        print("Starting Fish Audio model server on port 32551...")
        server_script = "../fish_audio_model_server.py"
    else:
        print("Starting local model server on port 32550...")
        server_script = "../model_server.py"
    
    try:
        # Start the model server (we're already in web_server directory)
        process = subprocess.Popen([sys.executable, server_script])
        time.sleep(3)  # Wait for server to start
        return process
    except Exception as e:
        print(f"Error starting model server: {e}")
        return None

def start_frontend(use_fish_audio=False):
    """Start the frontend web server"""
    # Set environment variable
    env = os.environ.copy()
    env['USE_FISH_AUDIO'] = 'true' if use_fish_audio else 'false'
    
    print(f"Starting frontend with {'Fish Audio' if use_fish_audio else 'Local'} TTS server...")
    
    try:
        # Start npm dev (we're already in web_server directory)
        process = subprocess.Popen(['npm', 'run', 'dev'], env=env)
        return process
    except Exception as e:
        print(f"Error starting frontend: {e}")
        return None

def main():
    parser = argparse.ArgumentParser(description='Start MiniCPM-o frontend with TTS server')
    parser.add_argument('--fish-audio', action='store_true', 
                       help='Use Fish Audio TTS server (default: use local TTS)')
    parser.add_argument('--check-only', action='store_true',
                       help='Only check dependencies and configuration, don\'t start servers')
    
    args = parser.parse_args()
    
    print("MiniCPM-o Frontend Startup")
    print("=" * 40)
    
    # Check dependencies
    if not check_dependencies():
        sys.exit(1)
    
    # If using Fish Audio, check .env file
    if args.fish_audio:
        env_ok, env_msg = check_env_file()
        if not env_ok:
            print(f"Error: {env_msg}")
            print("Please create a .env file with your Fish Audio API key:")
            print("FISH_AUDIO_API_KEY=your_api_key_here")
            sys.exit(1)
        print("✓ Environment configuration OK")
    
    if args.check_only:
        print("✓ All checks passed")
        return
    
    # Start model server
    model_process = start_model_server(args.fish_audio)
    if not model_process:
        sys.exit(1)
    
    # Start frontend
    frontend_process = start_frontend(args.fish_audio)
    if not frontend_process:
        model_process.terminate()
        sys.exit(1)
    
    print("\n" + "=" * 40)
    print("Servers started successfully!")
    print(f"Frontend: http://localhost:8088")
    print(f"TTS Server: {'Fish Audio (port 32551)' if args.fish_audio else 'Local (port 32550)'}")
    print("Press Ctrl+C to stop all servers")
    print("=" * 40)
    
    try:
        # Wait for processes to complete
        frontend_process.wait()
    except KeyboardInterrupt:
        print("\nStopping servers...")
        frontend_process.terminate()
        model_process.terminate()
        print("Servers stopped")

if __name__ == '__main__':
    main() 
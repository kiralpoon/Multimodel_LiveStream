import os
import httpx
import base64
import logging
from typing import Optional, Dict, Any, List
from dotenv import load_dotenv

# Load environment variables from web_server directory
import pathlib
current_dir = pathlib.Path(__file__).parent
web_server_env = current_dir / "web_server" / ".env"
if web_server_env.exists():
    load_dotenv(web_server_env)
else:
    # Fallback to current directory
    load_dotenv()

logger = logging.getLogger(__name__)

class FishAudioClient:
    """
    Fish Audio API client for text-to-speech conversion.
    
    Based on Fish Audio API documentation:
    https://docs.fish.audio/api-reference/endpoint/openapi-v1/text-to-speech
    """
    
    def __init__(self):
        self.api_key = os.getenv('FISH_AUDIO_API_KEY')
        if not self.api_key:
            raise ValueError("FISH_AUDIO_API_KEY not found in environment variables")
        
        self.base_url = "https://api.fish.audio"
        self.headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }
        
        # Available TTS models from documentation
        self.available_models = ["speech-1.5", "speech-1.6", "s1"]
        
        # Audio format configurations
        self.audio_formats = {
            "wav": {
                "sample_rates": [8000, 16000, 24000, 32000, 44100],
                "default_sample_rate": 44100,
                "description": "WAV/PCM - 16-bit, mono"
            },
            "mp3": {
                "sample_rates": [32000, 44100],
                "default_sample_rate": 44100,
                "bitrates": [64, 128, 192],
                "default_bitrate": 128,
                "description": "MP3 - mono"
            },
            "opus": {
                "sample_rates": [48000],
                "default_sample_rate": 48000,
                "bitrates": [-1000, 24, 32, 48, 64],
                "default_bitrate": 32,
                "description": "Opus - mono"
            }
        }
    
    async def tts(self, text: str, model: str = "speech-1.5", 
                  voice_id: Optional[str] = None, 
                  format: str = "wav", sample_rate: Optional[int] = None,
                  bitrate: Optional[int] = None) -> bytes:
        """
        Convert text to speech using Fish Audio API
        
        Args:
            text: Text to convert to speech
            model: TTS model to use (speech-1.5, speech-1.6, s1)
            voice_id: Voice model ID (if using custom voice)
            format: Audio format (wav, mp3, opus)
            sample_rate: Sample rate for audio output (optional, uses default if not specified)
            bitrate: Bitrate for mp3/opus (optional, uses default if not specified)
            
        Returns:
            Audio data as bytes
            
        Raises:
            ValueError: If parameters are invalid
            Exception: If API request fails
        """
        # Validate model
        if model not in self.available_models:
            raise ValueError(f"Invalid model '{model}'. Available models: {self.available_models}")
        
        # Validate format
        if format not in self.audio_formats:
            raise ValueError(f"Invalid format '{format}'. Available formats: {list(self.audio_formats.keys())}")
        
        # Set default sample rate if not provided
        if sample_rate is None:
            sample_rate = self.audio_formats[format]["default_sample_rate"]
        
        # Validate sample rate for the format
        if sample_rate not in self.audio_formats[format]["sample_rates"]:
            raise ValueError(f"Invalid sample rate {sample_rate} for format {format}. "
                           f"Available: {self.audio_formats[format]['sample_rates']}")
        
        # Set default bitrate for mp3/opus if not provided
        if bitrate is None and format in ["mp3", "opus"]:
            bitrate = self.audio_formats[format]["default_bitrate"]
        
        # Validate bitrate for mp3/opus
        if format in ["mp3", "opus"] and bitrate not in self.audio_formats[format]["bitrates"]:
            raise ValueError(f"Invalid bitrate {bitrate} for format {format}. "
                           f"Available: {self.audio_formats[format]['bitrates']}")
        
        url = f"{self.base_url}/v1/tts"
        
        # Build payload according to API documentation
        payload = {
            "text": text,
            "model": model,
            "format": format,
            "sample_rate": sample_rate
        }
        
        # Add bitrate for mp3/opus formats
        if format in ["mp3", "opus"] and bitrate is not None:
            payload["bitrate"] = bitrate
        
        # Add voice_id if provided
        if voice_id:
            payload["voice_id"] = voice_id
        
        logger.info(f"Sending TTS request: model={model}, format={format}, "
                   f"sample_rate={sample_rate}, text_length={len(text)}")
        
        try:
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    url,
                    headers=self.headers,
                    json=payload,
                    timeout=30.0
                )
                
                if response.status_code == 200:
                    logger.info(f"TTS request successful: {len(response.content)} bytes")
                    return response.content
                elif response.status_code == 401:
                    raise Exception("Invalid API key - please check your FISH_AUDIO_API_KEY")
                elif response.status_code == 402:
                    raise Exception("Insufficient credits - please check your Fish Audio account balance")
                elif response.status_code == 422:
                    error_detail = response.json() if response.headers.get("content-type") == "application/json" else response.text
                    raise Exception(f"Invalid request parameters: {error_detail}")
                else:
                    raise Exception(f"API error {response.status_code}: {response.text}")
                    
        except httpx.TimeoutException:
            raise Exception("Request timeout - Fish Audio API took too long to respond")
        except httpx.RequestError as e:
            raise Exception(f"Network error: {str(e)}")
        except Exception as e:
            raise Exception(f"TTS request failed: {str(e)}")
    
    async def list_models(self) -> Dict[str, Any]:
        """
        Get available TTS models from Fish Audio API
        
        Returns:
            Dictionary containing available models and their information
            
        Raises:
            Exception: If API request fails
        """
        url = f"{self.base_url}/v1/models"
        
        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(
                    url,
                    headers=self.headers,
                    timeout=10.0
                )
                
                if response.status_code == 200:
                    return response.json()
                else:
                    raise Exception(f"Failed to get models: {response.status_code} - {response.text}")
                    
        except Exception as e:
            raise Exception(f"Failed to list models: {str(e)}")
    
    async def get_api_credit(self) -> Dict[str, Any]:
        """
        Get API credit information
        
        Returns:
            Dictionary containing credit information
            
        Raises:
            Exception: If API request fails
        """
        url = f"{self.base_url}/v1/wallet/credit"
        
        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(
                    url,
                    headers=self.headers,
                    timeout=10.0
                )
                
                if response.status_code == 200:
                    return response.json()
                else:
                    raise Exception(f"Failed to get credit info: {response.status_code} - {response.text}")
                    
        except Exception as e:
            raise Exception(f"Failed to get credit info: {str(e)}")
    
    def get_supported_formats(self) -> Dict[str, Any]:
        """
        Get supported audio formats and their configurations
        
        Returns:
            Dictionary containing format configurations
        """
        return self.audio_formats.copy()
    
    def validate_voice_id(self, voice_id: str) -> bool:
        """
        Basic validation for voice ID format
        
        Args:
            voice_id: Voice ID to validate
            
        Returns:
            True if format looks valid, False otherwise
        """
        # Basic validation - voice IDs are typically alphanumeric with possible hyphens
        import re
        pattern = r'^[a-zA-Z0-9\-_]+$'
        return bool(re.match(pattern, voice_id)) 
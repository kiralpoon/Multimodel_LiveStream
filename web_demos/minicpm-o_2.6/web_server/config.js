// Configuration for switching between local and Fish Audio servers
const config = {
  // Default to local server (port 32550)
  local: {
    port: 32550,
    name: 'Local TTS Server'
  },
  // Fish Audio server (port 32551)
  fishAudio: {
    port: 32551,
    name: 'Fish Audio TTS Server'
  }
};

// Get server configuration based on environment variable
function getServerConfig() {
  const useFishAudio = process.env.USE_FISH_AUDIO === 'true' || process.env.USE_FISH_AUDIO === '1';
  return useFishAudio ? config.fishAudio : config.local;
}

// Get the target URL for the current configuration
function getTargetUrl() {
  const serverConfig = getServerConfig();
  return `http://127.0.0.1:${serverConfig.port}`;
}

// Get server name for display
function getServerName() {
  const serverConfig = getServerConfig();
  return serverConfig.name;
}

// Check if using Fish Audio
function isUsingFishAudio() {
  return process.env.USE_FISH_AUDIO === 'true' || process.env.USE_FISH_AUDIO === '1';
}

export { config, getServerConfig, getTargetUrl, getServerName, isUsingFishAudio }; 
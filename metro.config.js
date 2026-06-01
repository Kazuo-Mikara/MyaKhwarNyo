const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');

// 1. Get the base Expo Metro configuration
const config = getDefaultConfig(__dirname);

// 2. Safely inject 'tflite' into the asset extensions array
if (!config.resolver.assetExts.includes('tflite')) {
  config.resolver.assetExts.push('tflite');
}

// 3. Export the modified configuration wrapped with NativeWind
module.exports = withNativeWind(config, { input: './global.css' });
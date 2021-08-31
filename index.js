/**
 * @format
 */

import {AppRegistry} from 'react-native';
import React from 'react';
import App from './App';
import {name as appName} from './app.json';
import LearnReactNative from './LearnReactNative';
import DeezerApp from './src/Deezer/DeezerApp';
import TrackPlayer from 'react-native-track-player';
import service from './service';
import Root from './src/Root';

AppRegistry.registerComponent(appName, () => Root);
TrackPlayer.registerPlaybackService(() => require('./service.js'));

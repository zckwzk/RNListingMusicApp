import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import {getListMusic} from './apis/GetListMusic';
import HeaderMusic from './components/HeaderMusic';
import ListMusic from './components/ListMusic';
import MusicControl from './components/MusicControl';
import SearchInput from './components/SearchInput';

import TrackPlayer, {
  Event,
  useProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player';

const Root = () => {
  const [data, setData] = useState([]);
  const [track, setTrack] = useState([]);
  const [activeTrack, setActiveTrack] = useState({
    title: '',
    artist: '',
    activeIndex: 0,
  });
  const [loading, setLoading] = useState(false);

  const addingTrack = async () => {
    await TrackPlayer.add(track);
  };

  // React.useState(() => {
  //   if (track > 0) {
  //     addingTrack();
  //   }
  // }, [track, setTrack]);

  //trackplayer
  const progress = useProgress();
  useTrackPlayerEvents(
    [
      Event.PlaybackQueueEnded,
      Event.PlaybackTrackChanged,
      Event.RemotePlay,
      Event.RemotePause,
    ],
    async event => {
      if (
        event.type === Event.PlaybackTrackChanged &&
        event.nextTrack !== undefined
      ) {
        const track = await TrackPlayer.getTrack(event.nextTrack);

        const {title, artist, id} = track || {};
        setActiveTrack({
          ...activeTrack,
          title: title,
          artist: artist,
          activeIndex: id,
        });
        // myRef.current.scrollToIndex({
        //   animated: true,
        //   index: id,
        // });
        // setTrackArtwork(artwork);
      } else if (event.type === Event.RemotePause) {
        TrackPlayer.pause();
      } else if (event.type === Event.RemotePlay) {
        TrackPlayer.play();
      } else if (event.type === Event.PlaybackQueueEnded) {
        if (track.length > 0) {
          await TrackPlayer.add(track);
        }

        console.log('Event.PlaybackQueueEnded fired.');
      } else {
      }
    },
  );

  React.useEffect(() => {
    return () => TrackPlayer.destroy();
  }, []);

  const searchMusics = async query => {
    setLoading(true);
    try {
      let response = await getListMusic(query);
      setData(response);

      TrackPlayer.setupPlayer().then(async () => {
        await TrackPlayer.reset();
      });

      let trackList = [];
      response.forEach((music, index) => {
        trackList.push({
          id: index,
          title: music.title,
          url: music.preview,
          artist: music.artist.name,
        });
      });

      setTrack(trackList);
      setLoading(false);
      //console.log(JSON.stringify(response));
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const onPlay = () => {
    console.log('play');
    TrackPlayer.play();
  };
  const onPause = () => {
    console.log('pause');
    TrackPlayer.pause();
  };
  const onPrev = () => {
    console.log('prev');
    TrackPlayer.skipToPrevious();
  };
  const onNext = () => {
    console.log('next');
    TrackPlayer.skipToNext();
  };

  const skipToSong = async index => {
    console.log(index + 'nilai index');
    await TrackPlayer.skip(index);
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderMusic
        title={activeTrack.title}
        artist={activeTrack.artist}
        position={progress.position}
        duration={progress.duration}
      />
      <MusicControl
        onPlay={() => onPlay()}
        onPause={() => onPause()}
        onPrev={() => onPrev()}
        onNext={() => onNext()}
      />
      <SearchInput Cari={text => searchMusics(text)} />
      <ListMusic
        data={data}
        isLoading={loading}
        skipToSong={id => skipToSong(id)}
        activeIndex={activeTrack.activeIndex}
      />
    </SafeAreaView>
  );
};

export default Root;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
});

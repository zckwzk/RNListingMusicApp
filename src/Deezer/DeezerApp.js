import React, {useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  FlatList,
  Image,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import Axios from 'axios';

import Slider from '@react-native-community/slider';
import TrackPlayer, {
  Capability,
  Event,
  RepeatMode,
  State,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

TrackPlayer.updateOptions({
  stopWithApp: false,
});

const DeezerApp = () => {
  const myRef = useRef(null);

  const [data, setData] = React.useState([]);
  const [text, setText] = React.useState('');
  const [track, setTrack] = React.useState([]);

  const [loading, setLoading] = React.useState(false);
  const playbackState = usePlaybackState();
  const progress = useProgress();

  const [trackArtwork, setTrackArtwork] = useState();
  const [trackTitle, setTrackTitle] = useState();
  const [trackArtist, setTrackArtist] = useState();
  const [activeIndex, setActiveIndex] = useState(0);

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
        setTrackTitle(title);
        setTrackArtist(artist);
        setActiveIndex(id);
        myRef.current.scrollToIndex({
          animated: true,
          index: id,
        });
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
        if (track.length > 0) {
          await TrackPlayer.add(track);
        }
      }
    },
  );

  React.useEffect(() => {
    return () => TrackPlayer.destroy();
  }, []);

  const getListMusic = async (query = 'taylor') => {
    try {
      setLoading(true);
      setTrackTitle('');
      setTrackArtist('');
      setActiveIndex(null);
      //await TrackPlayer.reset();

      let config = {
        method: 'get',
        url: 'https://deezerdevs-deezer.p.rapidapi.com/search',
        // `headers` are custom headers to be sent
        headers: {
          'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com',
          'x-rapidapi-key':
            'f2849f26d9msh09954d0dd87637ep1386fcjsn48c1f9309d39',
        },
        params: {
          q: query,
        },
      };
      const response = await Axios(config);
      let songs = response.data.data;

      let trackList = [];
      songs.forEach((music, index) => {
        trackList.push({
          id: index,
          title: music.title,
          url: music.preview,
          artist: music.artist.name,
        });
      });

      TrackPlayer.setupPlayer().then(async () => {
        await TrackPlayer.reset();
      });
      setData(response.data.data);
      setTrack([...trackList]);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const searchMusic = async () => {
    getListMusic(text);
  };

  return (
    <View style={styles.container}>
      <View style={styles.blocInfo}>
        <Text numberOfLines={1} style={styles.songTitle}>
          {trackTitle}
        </Text>
        <Text style={styles.songArtist}>{trackArtist}</Text>
        <Slider
          style={styles.progressContainer}
          value={progress.position}
          minimumValue={0}
          maximumValue={progress.duration}
          thumbTintColor="#FFD479"
          minimumTrackTintColor="#FFD479"
          maximumTrackTintColor="#FFFFFF"
          onSlidingComplete={async value => {
            await TrackPlayer.seekTo(value);
          }}
        />
        <View style={styles.progressLabelContainer}>
          <Text style={styles.progressLabelText}>
            {new Date(progress.position * 1000).toISOString().substr(14, 5)}
          </Text>
          <Text style={styles.progressLabelText}>
            {new Date((progress.duration - progress.position) * 1000)
              .toISOString()
              .substr(14, 5)}
          </Text>
        </View>
      </View>
      <View style={styles.containerControl}>
        <TouchableOpacity onPress={() => TrackPlayer.play()}>
          <View style={[styles.box, {backgroundColor: 'green'}]}>
            <Text style={[styles.text, {color: 'white'}]}>Play</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => TrackPlayer.pause()}>
          <View style={[styles.box]}>
            <Text style={styles.text}>Pause</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => TrackPlayer.skipToPrevious()}>
          <View style={[styles.box]}>
            <Text style={styles.text}>Prev</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => TrackPlayer.skipToNext()}>
          <View style={[styles.box]}>
            <Text style={styles.text}>Next</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TextInput
          style={styles.input}
          onChangeText={text => setText(text)}
          value={text}
        />
        <TouchableOpacity
          onPress={() => {
            searchMusic();
          }}>
          <Text style={styles.buttonCari}>Cari</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.blockList}>
        {loading ? (
          <ActivityIndicator size="large" color="#00ff00" />
        ) : (
          <FlatList
            ref={myRef}
            data={data ? data : []}
            initialScrollIndex={activeIndex}
            renderItem={({item, index}) => (
              <CardListSong
                item={item}
                isActive={activeIndex == index}
                index={index}
              />
            )}
            keyExtractor={item => item.id}
          />
        )}
      </View>
    </View>
  );
};

const CardListSong = item => {
  let data = item.item;
  return (
    <TouchableOpacity
      onPress={async () => {
        await TrackPlayer.skip(item.index);
      }}>
      <View
        style={[
          styles.cardListSong,
          {backgroundColor: item.isActive ? 'green' : 'black'},
        ]}>
        <Image
          style={styles.logoImage}
          source={{
            uri: data.album.cover_small,
          }}
        />
        <View style={{width: '60%'}}>
          <Text numberOfLines={1} style={styles.songListTitle}>
            {data.title}
          </Text>
          {/* <Text style={styles.songListAlbum}>{data.album.title}</Text> */}
          <Text style={styles.songListArtist}>{data.artist.name}</Text>
        </View>

        <View style={styles.blockRank}>
          <Text style={[styles.songListTitle, {textAlign: 'right'}]}>
            rank{'\n'}
            {data.rank}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default DeezerApp;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
    // flexDirection: 'row',
    // flexWrap: 'wrap',
    justifyContent: 'flex-start',
    //alignItems: 'center',
    alignContent: 'center',
  },
  containerControl: {
    //backgroundColor: 'red',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    //alignItems: 'center',
    alignContent: 'center',
  },
  box: {
    width: 0.2 * windowWidth,

    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    marginBottom: 20,
    borderRadius: 4,
  },
  text: {
    fontWeight: '600',
    fontSize: 20,
    color: 'black',
  },
  blocInfo: {
    //position: 'absolute',
    //backgroundColor: 'red',
    width: '100%',
    paddingHorizontal: 40,
    marginTop: 20,
  },
  songTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    width: '90%',
  },
  songArtist: {
    fontSize: 16,
    fontWeight: '400',
    color: 'white',
    textAlign: 'center',
  },
  progressContainer: {
    height: 40,
    // width: '100%',
    //width: 380,
    marginTop: 25,
    flexDirection: 'row',
    paddingHorizontal: 40,
  },
  progressLabelContainer: {
    width: '100%',
    paddingHorizontal: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressLabelText: {
    color: 'white',
    fontVariant: ['tabular-nums'],
  },

  cardListSong: {
    width: '100%',
    //backgroundColor: 'red',
    marginVertical: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: 'green',
    borderRadius: 4,
    flexDirection: 'row',
  },

  logoImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },

  blockRank: {
    marginLeft: 'auto',
    //backgroundColor: 'red',
  },

  songListTitle: {
    color: 'white',
    fontWeight: 'bold',
    maxWidth: '100%',
    //backgroundColor: 'red',
  },
  songListAlbum: {
    color: 'white',
    fontWeight: '400',
  },
  songListArtist: {
    color: 'white',
    fontWeight: '100',
    fontSize: 12,
  },
  blockList: {
    backgroundColor: 'black',
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  input: {
    width: '60%',
    borderColor: 'green',
    borderWidth: 1,
    alignSelf: 'center',
    padding: 4,
    borderRadius: 5,
    marginRight: 10,
    color: 'green',
  },
  buttonCari: {
    color: 'white',
    backgroundColor: 'red',
    alignSelf: 'center',
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
});

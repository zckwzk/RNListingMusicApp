import Axios from 'axios';

export const getListMusic = async (query = 'taylor') => {
  //   try {
  //     //   setLoading(true);
  //     //   setTrackTitle('');
  //     //   setTrackArtist('');
  //     //   setActiveIndex(null);
  //     //await TrackPlayer.reset();

  let config = {
    method: 'get',
    url: 'https://deezerdevs-deezer.p.rapidapi.com/search',
    // `headers` are custom headers to be sent
    headers: {
      'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com',
      'x-rapidapi-key': 'f2849f26d9msh09954d0dd87637ep1386fcjsn48c1f9309d39',
    },
    params: {
      q: query,
    },
  };
  let response = await Axios(config);
  return response.data.data;

  //   let trackList = [];
  //   songs.forEach((music, index) => {
  //     trackList.push({
  //       id: index,
  //       title: music.title,
  //       url: music.preview,
  //       artist: music.artist.name,
  //     });
  //   });

  //   TrackPlayer.setupPlayer().then(async () => {
  //     await TrackPlayer.reset();
  //   });
  //   setData(response.data.data);
  //   setTrack([...trackList]);
  //   setLoading(false);
  //   } catch (error) {
  //     return error;
  //     //console.error(error);
  //   }
};

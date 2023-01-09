export const testPlaylistTracks = {
  items: [
    {
      added_at: '2015-09-25T01:01:45Z',
      track: {
        album: {
          name: 'All American',
        },
        artists: [
          {
            id: '382aq8Pij5V2nE2JMHMoxl',
            name: 'Hoodie Allen',
          },
          {
            id: '7uHOp2UvCRbPU1sNKk57hv',
            name: 'Jhameel',
          },
        ],
        duration_ms: 201226,
        name: 'No Faith in Brooklyn (feat. Jhameel)',
        uri: 'spotify:track:4V8uu21mnpyg7BElNNJdPs',
      },
    },
    {
      added_at: '2015-09-25T01:03:25Z',
      track: {
        album: {
          name: 'Americoustic',
        },
        artists: [
          {
            id: '382aq8Pij5V2nE2JMHMoxl',
            name: 'Hoodie Allen',
          },
        ],
        duration_ms: 224385,
        name: 'No Interruption (Acoustic)',
        uri: 'spotify:track:5zRTc6uDvHqssG2fvnVS1N',
      },
    },
  ],
};

export const testPlaylists = {
  href: 'https://api.spotify.com/v1/users/hyoriftw/playlists?offset=0&limit=2',
  items: [
    {
      collaborative: false,
      description: 'A blend of music for Mason and soleilene. Updates daily.',
      external_urls: {
        spotify: 'https://open.spotify.com/playlist/37i9dQZF1EJuEvuYur0edN',
      },
      href: 'https://api.spotify.com/v1/playlists/37i9dQZF1EJuEvuYur0edN',
      id: '37i9dQZF1EJuEvuYur0edN',
      images: [
        {
          height: null,
          url: 'https://blend-playlist-covers.spotifycdn.com/v2/blend_LARGE-royal-aqua-en.jpg',
          width: null,
        },
      ],
      name: 'soleilene + Mason',
      owner: {
        display_name: 'Spotify',
        external_urls: {
          spotify: 'https://open.spotify.com/user/spotify',
        },
        href: 'https://api.spotify.com/v1/users/spotify',
        id: 'spotify',
        type: 'user',
        uri: 'spotify:user:spotify',
      },
      primary_color: null,
      public: false,
      snapshot_id: 'MCwwMDAwMDAwMGM2MWM2ZmFjYmQ1YTFhZDRhYmE1NzNiMDA4YjcxMWZk',
      tracks: {
        href: 'https://api.spotify.com/v1/playlists/37i9dQZF1EJuEvuYur0edN/tracks',
        total: 50,
      },
      type: 'playlist',
      uri: 'spotify:playlist:37i9dQZF1EJuEvuYur0edN',
    },
    {
      collaborative: false,
      description:
        'Your weekly mixtape of fresh music. Enjoy new music and deep cuts picked for you. Updates every Monday.',
      external_urls: {
        spotify: 'https://open.spotify.com/playlist/37i9dQZEVXcCPbJu1aDMKe',
      },
      href: 'https://api.spotify.com/v1/playlists/37i9dQZEVXcCPbJu1aDMKe',
      id: '37i9dQZEVXcCPbJu1aDMKe',
      images: [
        {
          height: null,
          url: 'https://newjams-images.scdn.co/image/ab676477000033ad/dt/v3/discover-weekly/a69XARx5gLdfszYpLw2u5olpvXQ18YXGh2Rf4D5Ln_wa4cf6u-vN6epMHnWM4ckqiyHbkCLeIgIQQdjnxsfmq8Tw8fAFmKTD8_xlTwnMaeA7uHY6Kxd-wLJj2v_oJ08KxZbj_wpiCGAvRx7GQoyOQyGmkKz6ChmsRQRpjsFTQ8P-UBskV83okfNjOV4_K7SeSU8jL2IimItcER1JCIuCaGH_RCjyNcaYncoaSvz1kf7xpxJA8Xmt6CnIaLXfLyF4kp2CyZItdPW1_TQ3j69TLO-H5ejdGXXrtivIZNOwf5Xo0dqWN2bzBDFH0mPnkvF7VAFNz8tpnETBUv2FLGw8n_xwGRJmcTICkwfFKnbN0DRJIa4jrx_HM3gsmmuw5bzYv8ZxG-wHOou96hCRxSlOI3-WBafeHQY4gPHzRZlobww=/MTI6NjE6NTFUMDMtMjEtMg==',
          width: null,
        },
      ],
      name: 'Discover Weekly',
      owner: {
        display_name: 'Spotify',
        external_urls: {
          spotify: 'https://open.spotify.com/user/spotify',
        },
        href: 'https://api.spotify.com/v1/users/spotify',
        id: 'spotify',
        type: 'user',
        uri: 'spotify:user:spotify',
      },
      primary_color: null,
      public: false,
      snapshot_id: 'MCwwMDAwMDAwMGRjZTkxODQyMTVjNTllNzA0NDhhYWU2NTk4YmRmZjVm',
      tracks: {
        href: 'https://api.spotify.com/v1/playlists/37i9dQZEVXcCPbJu1aDMKe/tracks',
        total: 30,
      },
      type: 'playlist',
      uri: 'spotify:playlist:37i9dQZEVXcCPbJu1aDMKe',
    },
  ],
  limit: 2,
  next: 'https://api.spotify.com/v1/users/hyoriftw/playlists?offset=2&limit=2',
  offset: 0,
  previous: null,
  total: 25,
};

export const testAlbumTracks = {
  href: 'https://api.spotify.com/v1/albums/4YomxhmDglPvD93W3T6l1V/tracks?offset=0&limit=20&locale=en-US,en;q=0.9,fr;q=0.8',
  items: [
    {
      artists: [
        {
          external_urls: {
            spotify: 'https://open.spotify.com/artist/45eNHdiiabvmbp4erw26rg',
          },
          href: 'https://api.spotify.com/v1/artists/45eNHdiiabvmbp4erw26rg',
          id: '45eNHdiiabvmbp4erw26rg',
          name: 'ILLENIUM',
          type: 'artist',
          uri: 'spotify:artist:45eNHdiiabvmbp4erw26rg',
        },
        {
          external_urls: {
            spotify: 'https://open.spotify.com/artist/1vSN1fsvrzpbttOYGsliDr',
          },
          href: 'https://api.spotify.com/v1/artists/1vSN1fsvrzpbttOYGsliDr',
          id: '1vSN1fsvrzpbttOYGsliDr',
          name: 'Tori Kelly',
          type: 'artist',
          uri: 'spotify:artist:1vSN1fsvrzpbttOYGsliDr',
        },
      ],
      available_markets: [
        'US',
        'UY',
        'UZ',
        'VC',
        'VE',
        'VN',
        'VU',
        'WS',
        'XK',
        'ZA',
        'ZM',
        'ZW',
      ],
      disc_number: 1,
      duration_ms: 230571,
      explicit: false,
      external_urls: {
        spotify: 'https://open.spotify.com/track/1suqXPrYygZ7BYiSfaVZE4',
      },
      href: 'https://api.spotify.com/v1/tracks/1suqXPrYygZ7BYiSfaVZE4',
      id: '1suqXPrYygZ7BYiSfaVZE4',
      is_local: false,
      name: 'Blame Myself',
      preview_url:
        'https://p.scdn.co/mp3-preview/aa4819369cd1f8aae7611775a424c593e8717120?cid=70cd45ebb41f48b0a582a6a6ecf23f72',
      track_number: 1,
      type: 'track',
      uri: 'spotify:track:1suqXPrYygZ7BYiSfaVZE4',
    },
    {
      artists: [
        {
          external_urls: {
            spotify: 'https://open.spotify.com/artist/45eNHdiiabvmbp4erw26rg',
          },
          href: 'https://api.spotify.com/v1/artists/45eNHdiiabvmbp4erw26rg',
          id: '45eNHdiiabvmbp4erw26rg',
          name: 'ILLENIUM',
          type: 'artist',
          uri: 'spotify:artist:45eNHdiiabvmbp4erw26rg',
        },
        {
          external_urls: {
            spotify: 'https://open.spotify.com/artist/7gHscNMDI8FF8pcgrV8eIn',
          },
          href: 'https://api.spotify.com/v1/artists/7gHscNMDI8FF8pcgrV8eIn',
          id: '7gHscNMDI8FF8pcgrV8eIn',
          name: 'Matt Maeson',
          type: 'artist',
          uri: 'spotify:artist:7gHscNMDI8FF8pcgrV8eIn',
        },
      ],
      available_markets: [
        'US',
        'UY',
        'UZ',
        'VC',
        'VE',
        'VN',
        'VU',
        'WS',
        'XK',
        'ZA',
        'ZM',
        'ZW',
      ],
      disc_number: 1,
      duration_ms: 240000,
      explicit: false,
      external_urls: {
        spotify: 'https://open.spotify.com/track/0R7d7JyYRKcuTEO1j0Wkcw',
      },
      href: 'https://api.spotify.com/v1/tracks/0R7d7JyYRKcuTEO1j0Wkcw',
      id: '0R7d7JyYRKcuTEO1j0Wkcw',
      is_local: false,
      name: 'Heavenly Side',
      preview_url:
        'https://p.scdn.co/mp3-preview/240f551d42f0cfecdff76cb74e2590b1a0048fcc?cid=70cd45ebb41f48b0a582a6a6ecf23f72',
      track_number: 2,
      type: 'track',
      uri: 'spotify:track:0R7d7JyYRKcuTEO1j0Wkcw',
    },
  ],
  limit: 20,
  next: null,
  offset: 0,
  previous: null,
  total: 2,
};

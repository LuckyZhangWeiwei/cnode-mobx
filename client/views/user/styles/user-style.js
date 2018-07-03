import avatarBg from './bg.jpg'

export default () => (
  {
    root: {},
    avatar: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      // backgroundImage: `url(${avatarBg})`,
      // backgroundSize: 'cover',
      padding: 20,
      paddingTop: 60,
      paddingBottom: 40,
    },
    avatarImg: {
      width: 60,
      height: 60,
      marginBottom: 30,
      // marginTop: 20,
    },
    userName: {
      color: '#fff',
      zIndex: '1',
      fontSize: 14,
      marginTop: -30,
    },
    bg: {
      backgroundImage: `url(${avatarBg})`,
      backgroundSize: 'cover',
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      '&::after': {
        content: '\' \'',
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,.4)',
      },
    },
  }
)

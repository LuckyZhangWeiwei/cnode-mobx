export const topicDetailStyle = theme => (
  {
    header: {
      padding: 20,
      borderBottom: '1px solid #dfdfdf',
      '& h3': {
        margin: 0,
      },
    },
    body: {
      padding: 20,
      '& img': {
        maxWidth: '80%',
        maxHeight: '80%',
        marginBottom: '2px',
        marginTop: '2px',
      },
      '& ul, & ol': {
        paddingLeft: 30,
        '& li': {
          marginBottom: 7,
        },
      },
    },
    content: {
      '& img': {
        maxHeight: '100%',
        maxWidth: '100%',
        marginBottom: '2px',
        marginTop: '2px',
      },
      fontSize: '.9rem',
      padding: '.5rem',

    },
    replyHeader: {
      padding: '10px 20px',
      backgroundColor: theme.palette.primary[500],
      color: '#fff',
      display: 'flex',
      justifyContent: 'space-between',
    },
    replyBody: {
      padding: 20,
    },
    replies: {
      margin: '0 24px',
      marginBottom: 24,
    },
    notLoginButtonSection: {
      textAlign: 'center',
      padding: '5px 0',
    },
    LoginBtn: {
      '@media screen and (max-width: 480px)': {
        width: '100%',
      },
      margin: '3px',
    },
    '@media screen and (max-width: 480px)': {
      replies: {
        margin: '0 10px',
        marginBottom: 24,
      },
    },
    replyEditor: {
      position: 'relative',
      padding: 24,
      // borderBottom: '1px solid #dfdfdf',
      '& .CodeMirror': {
        height: 150,
        minHeight: 'auto',
        '& .CodeMirror-scroll': {
          minHeight: 'auto',
        },
      },
    },
    replyButton: {
      position: 'absolute',
      right: 40,
      bottom: 65,
      zIndex: 101,
      opacity: 0.1,
      transition: 'opacity .3s',
      '&:hover': {
        opacity: 1,
      },
    },
    loadingContainer: {
      padding: '40px 0',
      display: 'flex',
      justifyContent: 'space-around',
    },
    containerBar: {
      overflow: 'hidden',
    },
  }
)

export default topicDetailStyle

export const replyStyle = {
  root: {
    display: 'flex',
    alignItems: 'flex-start',
    padding: 10,
    paddingBottom: 0,
    borderBottom: '1px solid #dfdfdf',
    '&:last-child': {
      borderBottom: 'none',
    },
    position: 'relative',
  },
  left: {
    marginRight: 20,
  },
  right: {
    '& img': {
      maxWidth: '80%',
      maxHeight: '80%',
      display: 'block',
      marginRight: 40,
    },
  },
  replyContent: {
    wordBreak: 'break-all',
    // wordWrap: 'break-word',
    // whiteSpace: 'pre-wrap',
    fontSize: '.9rem',
  },
}

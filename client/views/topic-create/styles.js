export default {
  root: {
    padding: 20,
    position: 'relative',
  },
  title: {
    marginBottom: 20,
  },
  selectItem: {
    display: 'inline-flex',
    alignItems: 'center',
  },
  replyEditor: {
    position: 'relative',
    padding: 24,
    borderBottom: '1px solid #dfdfdf',
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
    right: 30,
    bottom: 20,
    zIndex: 1000,
    opacity: '.3',
    '&:hover': {
      opacity: '1',
    },
  },
}

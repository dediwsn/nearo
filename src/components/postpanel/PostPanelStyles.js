export const styles = theme => ({
  flex: {
    flex: 1,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
    padding: 0,
    maxHeight: 150
  },
  column: {
    flexBasis: '33.33%',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  customTFRoot: {
    paddingTop: 10,
    backgroundColor: '#fff',
    height: '100vh',
  },
  customTFInput: {
    padding: 10,
    color: 'black',
    fontSize: 14,
    height: '100vh',
  },
  button: {
    textTransform: 'Capitalize',
  },
  chip: {
    margin: theme.spacing.unit,
  },
})

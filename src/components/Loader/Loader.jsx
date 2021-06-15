import React from 'react';
import { CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    position: 'relative',
    display: 'flex',
  },
  bottom: {
    color: 'green',
    opacity: 0.3,
  },
  top: {
    color: 'green',
    opacity: 0.9,
    animationDuration: '450ms',
    position: 'absolute',
    left: 0,
  },
  circle: {
    strokeLinecap: 'round',
  },
}));

const Loader = ({ size = 50, color = '#26CA42' }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress
        variant="determinate"
        className={classes.bottom}
        size={size}
        thickness={4}
        value={100}
      />
      <CircularProgress
        variant="indeterminate"
        disableShrink
        className={classes.top}
        style={{ color }}
        classes={{
          circle: classes.circle,
        }}
        size={size}
        thickness={4}
      />
    </div>
  );
};

export default Loader;

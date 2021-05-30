import * as React from 'react';
import clsx from 'clsx';
import { Link as GatsbyLink } from 'gatsby';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import useNeighbor from '../utils/useNeighbor';
import { SitePageContextPrevious, SitePageContextNext } from '../../graphql-types';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'row',
      [theme.breakpoints.only('xs')]: {
        flexDirection: 'column',
      },
    },
    buttonContainer: {
      flexGrow: 1,
    },
    buttonRight: {
      textAlign: 'right',
    },
  })
);

interface Props {
  previous?: SitePageContextPrevious | null;
  next?: SitePageContextNext | null;
}

function PageNavigation({ previous, next }: Props): JSX.Element {
  const classes = useStyles();
  const prev = useNeighbor(previous);
  const nxt = useNeighbor(next);
  return (
    <div className={classes.root}>
      {prev ? (
        <div className={classes.buttonContainer}>
          <Button
            color="secondary"
            component={GatsbyLink}
            startIcon={
              <Icon>
                <ArrowBackIosIcon />
              </Icon>
            }
            to={prev.to}
          >
            {prev.title}
          </Button>
        </div>
      ) : null}
      {nxt ? (
        <div className={clsx(classes.buttonContainer, classes.buttonRight)}>
          <Button
            color="secondary"
            component={GatsbyLink}
            endIcon={
              <Icon>
                <ArrowForwardIosIcon />
              </Icon>
            }
            to={nxt.to}
          >
            {nxt.title}
          </Button>
        </div>
      ) : null}
    </div>
  );
}

PageNavigation.defaultProps = {
  next: undefined,
  previous: undefined,
};

export default PageNavigation;

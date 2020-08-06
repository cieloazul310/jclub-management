import * as React from 'react';
import clsx from 'clsx';
import { Link as GatsbyLink } from 'gatsby';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { Mode } from '../types';
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
  mode: Mode;
  previous?: SitePageContextPrevious | null;
  next?: SitePageContextNext | null;
}

function PageNavigation({ mode, previous, next }: Props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {previous ? (
        <div className={classes.buttonContainer}>
          <Button
            color="secondary"
            component={GatsbyLink}
            startIcon={
              <Icon>
                <ArrowBackIosIcon />
              </Icon>
            }
            to={mode === 'club' ? `/club/${previous.slug}` : `/year/${previous.year}`}
          >
            {previous.name || `${previous.year}年`}
          </Button>
        </div>
      ) : null}
      {next ? (
        <div className={clsx(classes.buttonContainer, classes.buttonRight)}>
          <Button
            color="secondary"
            component={GatsbyLink}
            endIcon={
              <Icon>
                <ArrowForwardIosIcon />
              </Icon>
            }
            to={mode === 'club' ? `/club/${next.slug}` : `/year/${next.year}`}
          >
            {next.name || `${next.year}年`}
          </Button>
        </div>
      ) : null}
    </div>
  );
}

export default PageNavigation;

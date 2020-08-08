import * as React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import ListItem from './ListItem';
import { Edge, Mode, Tab } from '../../types';
import useStateEdges from '../../utils/useStateEdges';

interface Props {
  edges: Edge[];
  mode: Mode;
  tab: Tab;
}

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
  })
);

function FinancialList({ edges, mode, tab }: Props) {
  const classes = useStyles();
  const stateEdges = useStateEdges(edges, mode);
  return (
    <div className={classes.root}>
      <Container maxWidth="sm" disableGutters>
        {stateEdges.map((edge, index) => (
          <ListItem key={edge.node.id ?? index} edge={edge} mode={mode} tab={tab} index={index} />
        ))}
      </Container>
    </div>
  );
}

export default FinancialList;

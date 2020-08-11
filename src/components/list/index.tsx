import * as React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import ListItem from './ListItem';
import { ContentBasisLarge } from '../Basis';
import { AdInListFooter } from '../Ads';
import useStateEdges from '../../utils/useStateEdges';
import useIsMobile from '../../utils/useIsMobile';
import { Edge, Mode, Tab } from '../../types';

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
  const isMobile = useIsMobile();
  return (
    <div className={classes.root}>
      <Container maxWidth="sm" disableGutters>
        {stateEdges.map((edge, index) => (
          <ListItem key={edge.node.id ?? index} edge={edge} mode={mode} tab={tab} index={index} />
        ))}
        {isMobile ? (
          <ContentBasisLarge>
            <AdInListFooter />
          </ContentBasisLarge>
        ) : null}
      </Container>
    </div>
  );
}

export default FinancialList;

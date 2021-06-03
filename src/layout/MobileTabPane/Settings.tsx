import * as React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import MobileTabPane, { MobileTabPaneProps } from './index';
import { ContentBasis, ContentBasisLarge } from '../../components/Basis';
import StateHandler from '../DrawerInner/StateHandler';
import ThemeHandler from '../DrawerInner/ThemeHandler';

function SettingsTabPane({ mobileTab }: Omit<MobileTabPaneProps, 'children' | 'value' | 'mobileOnly'>): JSX.Element {
  return (
    <MobileTabPane value="settings" mobileOnly mobileTab={mobileTab}>
      <ContentBasisLarge>
        <Container maxWidth="md">
          <Typography variant="h3" component="h2" gutterBottom>
            設定
          </Typography>
          <ContentBasis>
            <StateHandler />
            <Divider />
            <ThemeHandler />
          </ContentBasis>
        </Container>
      </ContentBasisLarge>
    </MobileTabPane>
  );
}

export default SettingsTabPane;

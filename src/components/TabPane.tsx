import * as React from 'react';
import Container, { ContainerProps } from '@material-ui/core/Container';

interface Props extends ContainerProps {
  value: number;
  index: number;
}

function TabPane({ value, index, children, ...props }: Props): JSX.Element {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Container {...props}>{children}</Container>}
    </div>
  );
}

export default TabPane;

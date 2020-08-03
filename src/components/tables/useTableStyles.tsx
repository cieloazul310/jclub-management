import { makeStyles, createStyles } from '@material-ui/core/styles';

export default makeStyles((theme) =>
  createStyles({
    head: {
      fontWeight: 'bold',
      fontSize: theme.typography.caption.fontSize,
      padding: theme.spacing(1, 0.5),
      minWidth: '6em',
    },
    label: {
      position: 'sticky',
      left: 0,
      zIndex: 3,
      minWidth: '8em',
      borderRight: `1px solid ${theme.palette.divider}`,
    },
    tbodyLabel: {
      fontWeight: 'bold',
      zIndex: 2,
      background: theme.palette.background.default,
    },
    emphasized: {
      fontWeight: 'bold',
      background: theme.palette.background.default,
    },
    colspan: {
      borderLeft: `1px solid ${theme.palette.divider}`,
    },
  })
);

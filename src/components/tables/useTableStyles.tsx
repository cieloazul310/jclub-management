import { makeStyles, createStyles } from '@material-ui/core/styles';

export default makeStyles((theme) =>
  createStyles({
    head: {
      fontWeight: 'bold',
      fontSize: theme.typography.caption.fontSize,
      padding: theme.spacing(1, 0.5),
    },
    label: {
      position: 'sticky',
      left: 0,
      zIndex: 3,
      borderRight: `1px solid ${theme.palette.divider}`,
    },
    tbodyLabel: {
      fontWeight: 'bold',
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

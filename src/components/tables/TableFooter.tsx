import * as React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Snackbar from '@material-ui/core/Snackbar';
import FileCopyIcon from '@material-ui/icons/FileCopy';

interface Props {
  tableId: string;
}

function TableToolbar({ tableId }: Props) {
  const [open, setOpen] = React.useState(false);
  const _handleClose = () => {
    setOpen(false);
  };
  const _onCopy = () => {
    const table = document.querySelector(`#${tableId}`);
    if (table) {
      const range = document.createRange();
      const selection = document.getSelection();

      selection?.removeAllRanges();

      try {
        range.selectNodeContents(table);
        selection?.addRange(range);
      } catch (e) {
        range.selectNode(table);
        selection?.addRange(range);
      }

      document.execCommand('copy');
      selection?.removeRange(range);
      setOpen(true);
    }
  };
  return (
    <div>
      <Toolbar>
        <Tooltip title="クリップボードにコピー">
          <IconButton edge="start" onClick={_onCopy}>
            <FileCopyIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
      <Snackbar
        open={open}
        onClose={_handleClose}
        message="クリップボードにコピーしました"
        autoHideDuration={2500}
        action={
          <Button color="secondary" size="small" onClick={_handleClose}>
            OK
          </Button>
        }
      />
    </div>
  );
}

export default TableToolbar;

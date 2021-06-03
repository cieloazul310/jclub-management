import * as React from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Snackbar from '@material-ui/core/Snackbar';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import useTableId from '../../utils/useTableId';
import { Tab } from '../../types';

interface Props {
  tab: Tab;
  disabled: boolean;
}

function CopyButton({ tab, disabled }: Props): JSX.Element {
  const tableId = useTableId(tab);
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const onClick = () => {
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
      selection?.removeAllRanges();
      setOpen(true);
    }
  };

  return (
    <>
      <Tooltip title="表をクリップボードにコピー">
        <span>
          <IconButton onClick={onClick} disabled={disabled}>
            <FileCopyIcon />
          </IconButton>
        </span>
      </Tooltip>
      <Snackbar
        open={open}
        onClose={handleClose}
        message="クリップボードにコピーしました"
        autoHideDuration={2500}
        action={
          <Button color="secondary" size="small" onClick={handleClose}>
            OK
          </Button>
        }
      />
    </>
  );
}

export default CopyButton;

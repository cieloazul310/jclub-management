import * as React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Snackbar from '@material-ui/core/Snackbar';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { Mode } from '../../types';
import { SitePageContextNext, SitePageContextPrevious } from '../../../graphql-types';

interface Props {
  tableId: string;
  mode: Mode;
  next?: SitePageContextNext | null;
  previous?: SitePageContextPrevious | null;
}

function TableToolbar({ tableId, next, previous, mode }: Props) {
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
        <Tooltip title={mode === 'club' ? '前のクラブへ' : '前年度へ'}>
          <span>
            <IconButton
              component={GatsbyLink}
              edge="start"
              to={mode === 'club' ? `/club/${previous?.slug}` : `/year/${previous?.year}`}
              disabled={!previous}
              style={!previous ? { pointerEvents: 'none' } : {}}
            >
              <ArrowBackIcon />
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title={mode === 'club' ? '次のクラブへ' : '次年度へ'}>
          <span>
            <IconButton
              component={GatsbyLink}
              to={mode === 'club' ? `/club/${next?.slug}` : `/year/${next?.year}`}
              disabled={!next}
              style={!next ? { pointerEvents: 'none' } : {}}
            >
              <ArrowForwardIcon />
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title="クリップボードにコピー">
          <IconButton onClick={_onCopy}>
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

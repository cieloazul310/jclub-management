import * as React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FilterListIcon from '@material-ui/icons/FilterList';
import CheckIcon from '@material-ui/icons/Check';
import RemoveIcon from '@material-ui/icons/Remove';
import { useAppState, useDispatch } from '../../utils/AppStateContext';
import { FilterCategory } from '../../utils/AppState';

interface Props {
  disabled: boolean;
}

function FilterButton({ disabled }: Props) {
  const { filterCategories } = useAppState();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const _handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const _handleClose = () => {
    setAnchorEl(null);
  };
  const _toggleCategory = (category: FilterCategory) => () => {
    dispatch({ type: 'TOGGLE_FILTERCATEGORY', category });
  };

  return (
    <>
      <Tooltip title="フィルタ">
        <span>
          <IconButton onClick={_handleClick} color={filterCategories.length === 4 ? 'inherit' : 'primary'} disabled={disabled}>
            <FilterListIcon />
          </IconButton>
        </span>
      </Tooltip>
      <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={_handleClose} keepMounted>
        <MenuItem onClick={_toggleCategory('J1')}>
          <ListItemIcon>{filterCategories.includes('J1') ? <CheckIcon /> : <RemoveIcon />}</ListItemIcon>
          J1
        </MenuItem>
        <MenuItem onClick={_toggleCategory('J2')}>
          <ListItemIcon>{filterCategories.includes('J2') ? <CheckIcon /> : <RemoveIcon />}</ListItemIcon>J2
        </MenuItem>
        <MenuItem onClick={_toggleCategory('J3')}>
          <ListItemIcon>{filterCategories.includes('J3') ? <CheckIcon /> : <RemoveIcon />}</ListItemIcon>J3
        </MenuItem>
        <MenuItem onClick={_toggleCategory('others')}>
          <ListItemIcon>{filterCategories.includes('others') ? <CheckIcon /> : <RemoveIcon />}</ListItemIcon>JFL・地域
        </MenuItem>
      </Menu>
    </>
  );
}

export default FilterButton;

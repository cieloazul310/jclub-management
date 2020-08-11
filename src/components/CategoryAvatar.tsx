import * as React from 'react';
import clsx from 'clsx';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { j1color, j2color, j3color, othersColor } from '../utils/categoryColors';

const useCategoryStyles = makeStyles((theme) =>
  createStyles({
    J1: {
      color: theme.palette.getContrastText(j1color[theme.palette.type === 'light' ? 600 : 300]),
      background: j1color[theme.palette.type === 'light' ? 600 : 300],
    },
    J2: {
      color: theme.palette.getContrastText(j2color[theme.palette.type === 'light' ? 600 : 300]),
      background: j2color[theme.palette.type === 'light' ? 600 : 300],
    },
    J3: {
      color: theme.palette.getContrastText(j3color[theme.palette.type === 'light' ? 600 : 300]),
      background: j3color[theme.palette.type === 'light' ? 600 : 300],
    },
    others: {
      color: theme.palette.getContrastText(othersColor[theme.palette.type === 'light' ? 600 : 300]),
      background: othersColor[theme.palette.type === 'light' ? 600 : 300],
    },
    label: {
      padding: theme.spacing(0, 1),
      borderRadius: 4,
      fontWeight: theme.typography.fontWeightBold,
    },
    textSmall: {
      fontSize: theme.typography.caption.fontSize,
      fontWeight: theme.typography.fontWeightBold,
    },
  })
);

interface Props {
  category: string;
}

function CategoryAvatar({ category }: Props) {
  const filterCategory = category === 'J1' || category === 'J2' || category === 'J3' ? category : 'others';
  const classes = useCategoryStyles();
  return (
    <Avatar className={clsx(classes[filterCategory], { [classes.textSmall]: !['J1', 'J2', 'J3', 'JFL'].includes(category) })}>
      {category}
    </Avatar>
  );
}

export default CategoryAvatar;

export function CategoryLabel({ category }: Props) {
  const filterCategory = category === 'J1' || category === 'J2' || category === 'J3' ? category : 'others';
  const classes = useCategoryStyles();
  return <span className={clsx(classes.label, classes[filterCategory])}>{category}</span>;
}

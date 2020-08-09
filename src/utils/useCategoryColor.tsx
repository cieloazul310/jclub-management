import * as React from 'react';
import useTheme from '@material-ui/core/styles/useTheme';
import { j1color, j2color, j3color, othersColor } from './categoryColors';
import { FilterCategory } from './AppState';

const categoryColors = {
  J1: j1color,
  J2: j2color,
  J3: j3color,
  others: othersColor,
};

function useCategoryColor(category: FilterCategory) {
  const theme = useTheme();
  return React.useMemo(() => {
    const paletteType = theme.palette.type;
    const shade = paletteType === 'light' ? 600 : 800;
    const color = categoryColors[category][shade];
    return {
      color,
      contrastText: theme.palette.getContrastText(color),
    };
  }, [theme, category]);
}

export default useCategoryColor;

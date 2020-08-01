import * as React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import { useJ1Clubs, useJ2Clubs, useJ3Clubs, useAllYears, Clubs } from '../../utils/graphql-hooks';

interface CategoryLinksProps {
  title: string;
  clubs: Clubs;
}

function CategoryLinks({ title, clubs }: CategoryLinksProps) {
  const storaged = typeof window === 'object' ? sessionStorage.getItem(`${title}Open`) : null;
  const initialOpen = storaged ? (JSON.parse(storaged) as boolean) : false;
  const [open, setOpen] = React.useState(initialOpen);
  const _toggleOpen = () => {
    setOpen(!open);
  };
  React.useEffect(() => {
    sessionStorage.setItem(`${title}Open`, JSON.stringify(open));
  }, [title, open]);

  return (
    <>
      <ListItem button onClick={_toggleOpen}>
        <ListItemText primary={title} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {clubs.map(({ node }, index) => (
            <ListItem key={node.short_name ?? index} button dense component={GatsbyLink} to="#">
              <ListItemText primary={node.name} />
            </ListItem>
          ))}
        </List>
      </Collapse>
    </>
  );
}

function YearsLinks() {
  const years = useAllYears();
  const storaged = typeof window === 'object' ? sessionStorage.getItem('yearsOpen') : null;
  const initialOpen = storaged ? (JSON.parse(storaged) as boolean) : false;
  const [open, setOpen] = React.useState(initialOpen);
  const _toggleOpen = () => {
    setOpen(!open);
  };
  React.useEffect(() => {
    sessionStorage.setItem('yearsOpen', JSON.stringify(open));
  }, [open]);

  return (
    <>
      <ListItem button onClick={_toggleOpen}>
        <ListItemText primary="年別" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {years.map(({ year, id }, index) => (
            <ListItem key={id ?? index} button dense component={GatsbyLink} to="#">
              <ListItemText primary={year} />
            </ListItem>
          ))}
        </List>
      </Collapse>
    </>
  );
}

function DrawerLinks() {
  const j1clubs = useJ1Clubs();
  const j2clubs = useJ2Clubs();
  const j3clubs = useJ3Clubs();
  return (
    <List subheader={<ListSubheader>経営情報</ListSubheader>}>
      <CategoryLinks title="J1" clubs={j1clubs} />
      <CategoryLinks title="J2" clubs={j2clubs} />
      <CategoryLinks title="J3" clubs={j3clubs} />
      <YearsLinks />
    </List>
  );
}

export default DrawerLinks;

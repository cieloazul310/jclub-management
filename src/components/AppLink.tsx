/* eslint-disable */
import * as React from 'react';
import { Link as GatsbyLink, GatsbyLinkProps, withPrefix } from 'gatsby';
import MuiLink, { LinkProps as MuiLinkProps } from '@material-ui/core/Link';
import Button, { ButtonProps } from '@material-ui/core/Button';
import { useLocation } from '@reach/router';
import clsx from 'clsx';

type GatsbyLinkComposedProps<T = Record<string, unknown>> = Omit<GatsbyLinkProps<T>, 'ref'>;

const GatsbyLinkComposed = React.forwardRef<unknown, GatsbyLinkComposedProps>((props, ref) => {
  const { to, state, ...other } = props;
  return <GatsbyLink to={to} state={state} ref={ref} {...other} />;
});
interface LinkPropsBase {
  activeClassName?: string;
  innerRef?: React.Ref<HTMLAnchorElement>;
  naked?: boolean;
}

export type AppLinkProps = LinkPropsBase & GatsbyLinkComposedProps & Omit<MuiLinkProps, 'href'>;

export function AppLink(props: AppLinkProps): JSX.Element {
  const {
    activeClassName = 'active',
    className: classNameProps,
    color = 'secondary',
    underline = 'hover',
    innerRef,
    naked,
    to,
    ...other
  } = props;
  const { pathname } = useLocation();

  const className = clsx(classNameProps, {
    [activeClassName]: pathname === withPrefix(to) && activeClassName,
  });

  if (naked) {
    return <GatsbyLinkComposed className={className} ref={innerRef} to={to} {...other} />;
  }

  return (
    <MuiLink component={GatsbyLinkComposed} className={className} to={to} ref={innerRef} color={color} underline={underline} {...other} />
  );
}

interface ButtonPropsBase {
  innerRef?: React.Ref<HTMLAnchorElement>;
}

export type AppLinkButtonProps = ButtonPropsBase & GatsbyLinkComposedProps & Omit<ButtonProps, 'href'>;

export function AppLinkButton(props: AppLinkButtonProps): JSX.Element {
  const { className, color = 'secondary', innerRef, to, ...other } = props;

  return <Button component={GatsbyLinkComposed} className={className} to={to} ref={innerRef} color={color} {...other} />;
}

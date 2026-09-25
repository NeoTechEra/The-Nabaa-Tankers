import React from 'react';
import { useRouter } from '../context/RouterContext';

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
  children: React.ReactNode;
  activeClassName?: string;
  exact?: boolean;
}

export const Link: React.FC<LinkProps> = ({
  to,
  children,
  className = '',
  activeClassName = '',
  exact = false,
  onClick,
  ...props
}) => {
  const { navigate, basePath, lang } = useRouter();

  // Calculate actual destination href with language prefix if appropriate
  let targetHref = to;
  if (!to.startsWith('http') && !to.startsWith('#') && !to.startsWith('mailto:') && !to.startsWith('tel:')) {
    if (lang === 'ar' && !to.startsWith('/ar') && !to.startsWith('/en')) {
      targetHref = to === '/' ? '/ar' : `/ar${to}`;
    }
  }

  // Determine active state based on clean basePath
  const normalizedTo = to.replace(/^\/(ar|en)/, '') || '/';
  const isActive = exact 
    ? basePath === normalizedTo 
    : normalizedTo === '/' 
      ? basePath === '/' 
      : basePath.startsWith(normalizedTo);

  const combinedClassName = `${className} ${isActive && activeClassName ? activeClassName : ''}`.trim();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(e);
    }

    // Allow user to Cmd+Click or Ctrl+Click to open in new tab
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
      return;
    }

    // Let external links open normally
    if (to.startsWith('http') || to.startsWith('mailto:') || to.startsWith('tel:')) {
      return;
    }

    e.preventDefault();
    navigate(to);
  };

  return (
    <a
      href={targetHref}
      onClick={handleClick}
      className={combinedClassName}
      aria-current={isActive ? 'page' : undefined}
      {...props}
    >
      {children}
    </a>
  );
};

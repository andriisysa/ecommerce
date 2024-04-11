import { Route } from 'next';
import { useRouter } from 'next/navigation';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { NoSsr } from '@mui/material';
import MuiBreadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

import { IBreadcrumbsProps } from './Breadcrumbs.types';
// styles
import styles from './styles.module.scss';

const Breadcrumbs = (props: IBreadcrumbsProps) => {
  const { push } = useRouter();

  const { items, classes: { wrapper, titleWrapperProps, titleProps } = {} } =
    props;

  function handleClick(
    event:
      | React.MouseEvent<HTMLAnchorElement, MouseEvent>
      | React.MouseEvent<HTMLSpanElement, MouseEvent>,
    link?: string
  ) {
    if (event.preventDefault) event.preventDefault();
    if (link) push(link as Route);
  }

  return (
    <NoSsr>
      <MuiBreadcrumbs
        separator={
          <NavigateNextIcon
            fontSize="small"
            classes={{ root: styles.separator }}
          />
        }
        classes={{
          root: styles.root,
          ol: styles.ol,
          li: styles.li,
          separator: styles.separatorLi,
        }}
      >
        {(items || []).map((item, id) =>
          item.link ? (
            <Link
              key={id}
              underline="hover"
              href={item.link}
              onClick={(e) => handleClick(e, item.link)}
            >
              {item.label}
            </Link>
          ) : (
            <span key={id}>{item.label}</span>
          )
        )}
      </MuiBreadcrumbs>
    </NoSsr>
  );
};

export default Breadcrumbs;

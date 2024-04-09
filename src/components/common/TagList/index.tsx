import { Skeleton } from '@mui/material';

import styles from './styles.module.scss';
import { ITagListProps } from './Tag.types';
import TagItem from './TagItem';

const TagList = (props: ITagListProps) => {
  const { tags, selected, limit, loading = false, onClick } = props;

  return (
    <div className={styles.listContainer}>
      {loading
        ? [0, 1, 2].map((key) => (
            <Skeleton
              key={key}
              className={styles.loadingItem}
              animation="wave"
            />
          ))
        : (tags || []).slice(0, limit || tags.length).map((tag, index) => (
            <TagItem
              key={index}
              item={tag}
              active={tag.label === selected?.label}
              onClick={() => {
                if (onClick) onClick(tag);
              }}
            />
          ))}
    </div>
  );
};

export default TagList;

// styles
import Avatar from '@/components/common/Avatar';
import Card from '@/components/common/Card';
import { IHomeReviews } from '@/types/staticPages.types';

import styles from './styles.module.scss';

interface IProps {
  data: IHomeReviews;
}

const Reviews = ({ data }: IProps) => {
  const { title, items } = data;

  return (
    <section className={styles.section}>
      <h1 dangerouslySetInnerHTML={{ __html: title }} />
      <div className={styles.content}>
        <div className={styles.reviews}>
          {(items || []).map(({ id, name, avatar, content }) => (
            <Card key={id} classes={{ wrapper: styles.card }}>
              <div className={styles.container}>
                <div className={styles.userInfo}>
                  <Avatar
                    imgUrl={avatar?.url || ''}
                    name={name}
                    classes={{
                      avatarRoot: styles.avatarRoot,
                      avatarName: styles.avatarName,
                    }}
                  />
                </div>
                <p dangerouslySetInnerHTML={{ __html: content }} />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;

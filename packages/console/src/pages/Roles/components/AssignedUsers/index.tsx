import type { User } from '@logto/schemas';

import UserAvatar from '@/components/UserAvatar';

import * as styles from './index.module.scss';

type Props = {
  users: Array<Pick<User, 'avatar' | 'id'>>;
  count: number;
};

const AssignedUsers = ({ users, count }: Props) =>
  count ? (
    <div className={styles.users}>
      <div className={styles.avatars}>
        {users.map(({ id, avatar }) => (
          <UserAvatar key={id} url={avatar} className={styles.avatar} />
        ))}
      </div>
      {count > 2 && <span className={styles.count}>{count.toLocaleString()}</span>}
    </div>
  ) : (
    <div className={styles.empty}>-</div>
  );

export default AssignedUsers;

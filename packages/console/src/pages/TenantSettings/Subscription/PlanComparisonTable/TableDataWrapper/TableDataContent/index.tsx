import Success from '@/assets/icons/success.svg';

import * as styles from './index.module.scss';

type Props = {
  content: string;
};

function TableDataContent({ content }: Props) {
  const hasCheckmark = typeof content === 'string' && content.includes('✓');
  if (hasCheckmark) {
    const [before, after] = content.split('✓');

    return (
      <div className={styles.check}>
        {before && <span>{before}</span>}
        <Success />
        {after && <span>{after}</span>}
      </div>
    );
  }

  return <span>{content}</span>;
}

export default TableDataContent;

import { ConnectorType } from '@logto/schemas';

import { ConnectorMetadata } from '../types';

export const metadata: ConnectorMetadata = {
  id: 'aliyun-dm',
  type: ConnectorType.Email,
  name: {
    en: 'Aliyun Direct Mail',
    zh_CN: '阿里云邮件推送',
  },
  logo: './logo.png',
  description: {
    en: 'A simple and efficient email service to help you send transactional notifications and batch email.',
    zh_CN:
      '邮件推送（DirectMail）是款简单高效的电子邮件群发服务，构建在阿里云基础之上，帮您快速、精准地实现事务邮件、通知邮件和批量邮件的发送。',
  },
};

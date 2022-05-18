import { Passcode } from '@logto/schemas';

export const maskUserInfo = ({ type, value }: { type: 'email' | 'phone'; value: string }) => {
  if (!value) {
    return value;
  }

  if (type === 'phone') {
    return `****${value.slice(-4)}`;
  }

  const [name = '', domain = ''] = value.split('@');

  const preview = name.length > 4 ? `${name.slice(0, 4)}` : '';

  return `${preview}****@${domain}`;
};

export const maskPasscodeString = (passcode: string) => passcode.replace(/^.{3}/, '***');

export const maskPasscode = (passcode: Passcode) => ({
  ...passcode,
  code: maskPasscodeString(passcode.code),
});

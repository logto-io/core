import { generateCodeVerifier, generateState, generateCodeChallenge } from '@logto/js';

import { generatePassword, generateUsername } from './utils';

type Account = {
  username: string;
  password: string;
};

type ContextData = {
  account: Account;
  codeVerifier: string;
  codeChallenge: string;
  state: string;
  authorizationEndpoint: string;
  tokenEndpoint: string;
  authorizationCode: string;
  interactionCookie: string;
  nextRedirectTo: string;
};

type ContextDataKey = keyof ContextData;

type ContextStore = {
  getData: <T extends ContextDataKey>(key: T) => ContextData[T];
  setData: <T extends ContextDataKey>(key: T, value: ContextData[T]) => void;
};

const createContextStore = (): ContextStore => {
  const data: ContextData = {
    account: { username: '', password: '' },
    codeVerifier: '',
    codeChallenge: '',
    state: '',
    interactionCookie: '',
    authorizationCode: '',
    authorizationEndpoint: '',
    tokenEndpoint: '',
    nextRedirectTo: '',
  };

  return {
    getData: <T extends ContextDataKey>(key: T) => data[key],
    setData: <T extends ContextDataKey>(key: T, value: ContextData[T]) => {
      // eslint-disable-next-line @silverhand/fp/no-mutation
      data[key] = value;
    },
  };
};

export class LogtoContext {
  private readonly contextData: ContextStore = createContextStore();

  public async init() {
    const account = {
      username: generateUsername(),
      password: generatePassword(),
    };
    const codeVerifier = generateCodeVerifier();
    const codeChallenge = await generateCodeChallenge(codeVerifier);

    this.setData('account', account);
    this.setData('codeVerifier', codeVerifier);
    this.setData('codeChallenge', codeChallenge);
    this.setData('state', generateState());
  }

  public get account(): Account {
    return this.getData('account');
  }

  public get codeVerifier(): string {
    return this.getData('codeVerifier');
  }

  public get codeChallenge(): string {
    return this.getData('codeChallenge');
  }

  public get state(): string {
    return this.getData('state');
  }

  public get authorizationCode(): string {
    return this.getData('authorizationCode');
  }

  public get interactionCookie(): string {
    return this.getData('interactionCookie');
  }

  public get authorizationEndpoint(): string {
    return this.getData('authorizationEndpoint');
  }

  public get tokenEndpoint(): string {
    return this.getData('tokenEndpoint');
  }

  public get nextRedirectTo(): string {
    return this.getData('nextRedirectTo');
  }

  public setData<T extends ContextDataKey>(key: T, value: ContextData[T]): void {
    this.contextData.setData(key, value);
  }

  private getData<T extends ContextDataKey>(key: T): ContextData[T] {
    return this.contextData.getData(key);
  }
}

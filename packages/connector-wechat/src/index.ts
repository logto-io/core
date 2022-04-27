/**
 * The Implementation of OpenID Connect of WeChat Web Open Platform.
 * https://developers.weixin.qq.com/doc/oplatform/Website_App/WeChat_Login/Wechat_Login.html
 */

import {
  ConnectorMetadata,
  GetAccessToken,
  GetAuthorizationUri,
  ValidateConfig,
  GetUserInfo,
  ConnectorError,
  ConnectorErrorCodes,
  SocialConnector,
  GetConnectorConfig,
} from '@logto/connector-types';
import { assert } from '@silverhand/essentials';
import got, { RequestError as GotRequestError } from 'got';
import { stringify } from 'query-string';

import {
  authorizationEndpoint,
  accessTokenEndpoint,
  userInfoEndpoint,
  scope,
  defaultMetadata,
  defaultTimeout,
  weChatConfigGuard,
  WeChatConfig,
} from './constant';

// As creating a WeChat Web/Mobile application needs a real App or Website record, the real test is temporarily not finished.
// TODO: test with our own wechat mobile/web application (LOG-1910), already tested with other verified wechat web application

export class WeChatConnector implements SocialConnector {
  public metadata: ConnectorMetadata = defaultMetadata;

  public getConfig: GetConnectorConfig<WeChatConfig>;

  constructor(getConnectorConfig: GetConnectorConfig<WeChatConfig>) {
    this.getConfig = getConnectorConfig;
  }

  public validateConfig: ValidateConfig = async (config: unknown) => {
    const result = weChatConfigGuard.safeParse(config);

    if (!result.success) {
      throw new ConnectorError(ConnectorErrorCodes.InvalidConfig, result.error.message);
    }
  };

  public getAuthorizationUri: GetAuthorizationUri = async (redirectUri, state) => {
    const { appId } = await this.getConfig(this.metadata.id);

    return `${authorizationEndpoint}?${stringify({
      appid: appId,
      redirect_uri: encodeURI(redirectUri), // The variable `redirectUri` should match {appId, appSecret}
      response_type: 'code',
      scope,
      state,
    })}`;
  };

  public getAccessToken: GetAccessToken = async (code) => {
    type AccessTokenResponse = {
      access_token?: string;
      openid?: string;
      expires_in?: number; // In seconds
      refresh_token?: string;
      scope?: string;
      errcode?: number;
    };

    const { appId: appid, appSecret: secret } = await this.getConfig(this.metadata.id);

    const {
      access_token: accessToken,
      openid,
      errcode,
    } = await got
      .get(accessTokenEndpoint, {
        searchParams: { appid, secret, code, grant_type: 'authorization_code' },
        timeout: defaultTimeout,
      })
      .json<AccessTokenResponse>();

    assert(
      errcode !== 40_029 && accessToken && openid,
      new ConnectorError(ConnectorErrorCodes.SocialAuthCodeInvalid)
    );

    return { accessToken, openid };
  };

  public getUserInfo: GetUserInfo = async (accessTokenObject) => {
    type UserInfoResponse = {
      unionid?: string;
      headimgurl?: string;
      nickname?: string;
      errcode?: number;
      errmsg?: string;
    };

    const { accessToken, openid } = accessTokenObject;

    try {
      const { unionid, headimgurl, nickname, errcode, errmsg } = await got
        .get(userInfoEndpoint, {
          searchParams: { access_token: accessToken, openid },
          timeout: defaultTimeout,
        })
        .json<UserInfoResponse>();

      if (!openid || errcode || errmsg) {
        // 'openid' is defined as a required input argument in WeChat API doc, but it does not necessarily to
        // be the return value from getAccessToken per testing.
        // In another word, 'openid' is required but the response of getUserInfo is consistent as long as
        // access_token is valid.
        // We are expecting to get 41009 'missing openid' response according to the developers doc, but the
        // fact is that we still got 40001 'invalid credentials' response.
        if (errcode === 40_001) {
          throw new ConnectorError(ConnectorErrorCodes.SocialAccessTokenInvalid);
        }

        throw new Error(errmsg);
      }

      return { id: unionid ?? openid, avatar: headimgurl, name: nickname };
    } catch (error: unknown) {
      if (error instanceof GotRequestError && error.response?.statusCode === 401) {
        throw new ConnectorError(ConnectorErrorCodes.SocialAccessTokenInvalid);
      }

      throw error;
    }
  };
}

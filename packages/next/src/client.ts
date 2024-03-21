import { CookieStorage } from '@logto/node';

import type { Adapters, LogtoNextConfig } from './types';

export default class LogtoNextBaseClient {
  protected navigateUrl?: string;
  protected storage?: CookieStorage;
  constructor(
    protected readonly config: LogtoNextConfig,
    protected readonly adapters: Adapters
  ) {}

  protected createNodeClient(
    getCookie: (name: string) => string | undefined,
    setCookie: (name: string, value: string) => void
  ) {
    this.storage = new CookieStorage(
      {
        encryptionKey: this.config.cookieSecret,
        getCookie,
        setCookie,
      },
      this.config.cookieSecure
    );

    return new this.adapters.NodeClient(this.config, {
      storage: this.storage,
      navigate: (url) => {
        this.navigateUrl = url;
      },
    });
  }
}

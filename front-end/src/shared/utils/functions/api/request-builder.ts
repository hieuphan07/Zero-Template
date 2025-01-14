export interface IRequestBuilder {
  setPrefix(prefix: string): this;
  setVersion(version: string): this;
  setResourcePath(resourcePath: string): this;
  buildUrl(additionalPath?: string): string;
}

export class RequestBuilder implements IRequestBuilder {
  private prefix: string = process.env.NEXT_PUBLIC_API_PREFIX || "api";
  private version: string = process.env.NEXT_PUBLIC_API_VERSION || "v1";
  private resourcePath: string = process.env.NEXT_PUBLIC_API_RESOURCE_PATH || "auth";

  setPrefix(prefix: string): this {
    this.prefix = prefix;
    return this;
  }

  setVersion(version: string): this {
    this.version = version;
    return this;
  }

  setResourcePath(resourcePath: string): this {
    this.resourcePath = resourcePath;
    return this;
  }

  buildUrl(additionalPath?: string): string {
    const baseUrl = `${process.env.NEXT_PUBLIC_URL_API}/${this.prefix}/${this.version}/${this.resourcePath}`;
    return additionalPath ? `${baseUrl}/${additionalPath}` : baseUrl;
  }
}

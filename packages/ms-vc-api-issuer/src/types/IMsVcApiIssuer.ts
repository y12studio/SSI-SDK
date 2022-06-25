import { IAgentContext, IPluginMethodMap } from '@veramo/core'
import { IMsAuthenticationClientCredentialArgs } from '@sphereon/ms-authenticator'

export interface IMsVcApiIssuer extends IPluginMethodMap {
  issuanceRequestMsVc(issuanceInfo: IIssueRequest, context: IRequiredContext) : Promise<IIssueRequestResponse>
}

export interface IIssueRequest {
  auhenticationInfo: IMsAuthenticationClientCredentialArgs
  issuanceConfig: IssuanceConfig
}

export interface IIssueRequestResponse {
  id: string
  requestId: string
  url: string
  expiry: Date
  pin: string
}

export interface Registration {
  clientName: string;
}

export interface Headers {
  apiKey: string;
}

export interface Callback {
  url: string;
  state: string;
  headers: Headers;
}

export interface Pin {
  value: string;
  length: number;
}

export interface Issuance {
  type: string;
  manifest: string;
  pin: Pin;
  claims: Map<string, string>;
}

export interface IssuanceConfig {
  authority: string;
  includeQRCode: boolean;
  registration: Registration;
  callback: Callback;
  issuance: Issuance;
}

export type IRequiredContext = IAgentContext<Record<string, never>>

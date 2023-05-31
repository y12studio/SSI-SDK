import { FindOptionsWhere } from 'typeorm'
import {
  IBasicCredentialLocaleBranding,
  IBasicIssuerLocaleBranding,
  ICredentialBranding,
  IIssuerBranding,
  ILocaleBranding
} from './issuanceBranding'
import { CredentialBrandingEntity } from '../../entities/issuanceBranding/CredentialBrandingEntity'
import { IssuerBrandingEntity } from '../../entities/issuanceBranding/IssuerBrandingEntity'
import { IssuerLocaleBrandingEntity } from '../../entities/issuanceBranding/IssuerLocaleBrandingEntity'
import { CredentialLocaleBrandingEntity } from '../../entities/issuanceBranding/CredentialLocaleBrandingEntity'

// TODO these types assume the store is a db which is not always the case, same for contacts
export type FindCredentialBrandingArgs = FindOptionsWhere<CredentialBrandingEntity>[]
export type FindIssuerBrandingArgs = FindOptionsWhere<IssuerBrandingEntity>[]
export type FindCredentialLocaleBrandingArgs = FindOptionsWhere<CredentialLocaleBrandingEntity>[]
export type FindIssuerLocaleBrandingArgs = FindOptionsWhere<IssuerLocaleBrandingEntity>[]

export interface IAddCredentialBrandingArgs {
  vcHash: string
  issuerCorrelationId: string
  localeBranding: Array<IBasicCredentialLocaleBranding> //IBasicLocaleBranding
}

export interface IGetCredentialBrandingArgs {
  filter?: FindCredentialBrandingArgs
}

export interface IUpdateCredentialBrandingArgs {
  credentialBranding: Omit<ICredentialBranding, 'localeBranding' | 'createdAt' | 'lastUpdatedAt'>
}

export interface IRemoveCredentialBrandingArgs {
  credentialBrandingId: string
}

export interface IAddCredentialLocaleBrandingArgs {
  credentialBrandingId: string
  localeBranding: Array<IBasicCredentialLocaleBranding> //IBasicLocaleBranding
}

export interface IUpdateCredentialLocaleBrandingArgs {
  localeBranding: Omit<ILocaleBranding, 'createdAt' | 'lastUpdatedAt'>
}

export interface IRemoveCredentialLocaleBrandingArgs {
  credentialLocaleBrandingId: string
}

export interface IGetCredentialLocaleBrandingArgs {
  filter?: FindCredentialLocaleBrandingArgs
}

export interface IAddIssuerBrandingArgs {
  issuerCorrelationId: string
  localeBranding: Array<IBasicIssuerLocaleBranding> //IBasicLocaleBranding
}

export interface IGetIssuerBrandingArgs {
  filter?: FindIssuerBrandingArgs
}

export interface IUpdateIssuerBrandingArgs {
  issuerBranding: Omit<IIssuerBranding, 'localeBranding' | 'createdAt' | 'lastUpdatedAt'>
}

export interface IRemoveIssuerBrandingArgs {
  issuerBrandingId: string
}

export interface IAddIssuerLocaleBrandingArgs {
  issuerBrandingId: string
  localeBranding: Array<IBasicIssuerLocaleBranding> //IBasicLocaleBranding
}

export interface IUpdateIssuerLocaleBrandingArgs {
  localeBranding: Omit<ILocaleBranding, 'createdAt' | 'lastUpdatedAt'>
}

export interface IRemoveIssuerLocaleBrandingArgs {
  issuerLocaleBrandingId: string
}

export interface IGetIssuerLocaleBrandingArgs {
  filter?: FindIssuerLocaleBrandingArgs
}

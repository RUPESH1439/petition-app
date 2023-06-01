export interface IError {
  message: string
}

export type ID = {
  id: number
}
export interface PersonalUser {
  id: number
  name?: string
  birthdateYear?: string
  createdAt?: string
  updatedAt?: string
  publishedAt?: null
  gender?: GenderAttrs & ID
  governorate?: GovernorateAttrs & ID
  owner: OwnerAttrs & ID
}

export interface OrganizationUser {
  id: number
  arName?: string
  enName?: string
  nearestLandmark?: string
  CEOName?: string
  permitNumber?: string
  organizationPhone?: string
  EstablishedYear?: string
  createdAt?: string
  updatedAt?: string
  publishedAt?: null
  logo?: Image // TODO integrate logo
  permitImage?: any
  gender?: GenderAttrs & ID
  governorate?: GovernorateAttrs & ID
  owner?: OwnerAttrs & ID
}

export interface UpdatePetitionStat {
  views?: number
  shares?: number
  id: number
}

export interface UpdatePersonalUser {
  name?: string
  birthdateYear?: string
  gender?: number
  phoneNumber?: string
  governorate?: number
  ip?: string
}

export type CreatePersonalUser = UpdatePersonalUser

export interface SignPetitionPayload {
  petitionId: number
  signers: number[]
}

export interface UpdateOrganization {
  arName?: string
  enName?: string
  nearestLandmark?: string
  CEOName?: string
  permitNumber?: string
  organizationPhone?: string
  EstablishedYear?: string
  publishedAt?: null
  logo?: number
  permitImage?: number
  gender?: number
  governorate?: number
  ip?: string
}

export type CreateOrganization = UpdateOrganization

export interface UploadMedia {
  uri: string
  type: string
  name: string
}

export interface MediaResponse {
  id: number
  url?: string
}

export interface CreatePetition {
  creator?: number
  title?: string
  governorate?: number
  category?: number
  hideName?: boolean
  description?: string
  image?: number
}

export type EditPetition = CreatePetition & ID

export interface UpdateOwner {
  isPrivileged?: boolean
  phoneVerified?: boolean
  phoneNumber?: string
  lat?: number
  long?: number
  facebookLink?: string
  instagramLink?: string
  websiteLink?: string
  signedPetitions?: number[]
  arName?: string
  enName?: string
  image?: number
}

export interface GenderAttrs {
  arType?: string
  enType?: string
  createdAt?: string
  updatedAt?: string
  publishedAt?: string
}
export interface Gender {
  id: number
  attributes: GenderAttrs
}

export interface Petition {
  id: number
  attributes: PetitionAttrs
}

export interface IGovernorate {
  id: number
  arName?: string
  enName?: string
  isCountry?: boolean
  createdAt?: boolean
}

export interface ICategory {
  id: number
  arName?: string
  enName?: string
  createdAt?: boolean
}

export interface IPetitionStat {
  id: number
  views?: string
  shares?: string
  createdAt?: string
}

export interface IOwner {
  id: number
  username?: string
  email?: string
  provider?: any
  confirmed?: boolean
  blocked?: false
  createdAt?: string
  isPrivileged?: boolean
  phoneVerified?: boolean
  phoneNumber?: string
  userType?: string
  lat?: number
  long?: number
  facebookLink?: string
  instagramLink?: string
  websiteLink?: string
  arName?: string
  enName?: string
  image?: Image & ID
  signedPetitions?: IPetition[]
}

export interface IPetition {
  id: number
  hideName?: boolean
  description?: string
  title?: string
  image?: Image & ID
  createdAt?: string
  governorate: IGovernorate
  category: ICategory
  creator: IOwner
  signers: IOwner[]
  petition_stat: IPetitionStat
}

export interface Image {
  name?: string
  alternativeText?: any
  caption?: any
  width?: number
  height?: number
  formats?: any
  hash?: string
  ext?: string
  mime?: string
  size?: number
  url?: string
  previewUrl?: any
  provider?: string
  provider_metadata?: any
  createdAt?: string
  updatedAt?: string
}

export interface PetitionAttrs {
  hideName: string
  description: string
  title: string
  image: {
    data: {
      id: number
      attributes: Image
    }
  }
  createdAt: string
  governorate: {
    data: Governorate
  }
  category: {
    data: PetitionCategory
  }
  creator: {
    data: Owner
  }
  signers: {
    data: Owner[]
  }
  petition_stat: {
    data: PetitionStat
  }
}

export interface PetitionStat {
  id: number
  attributes: PetitionStatAttrs
}
export interface PetitionStatAttrs {
  views: string
  shares: string
}

export interface PetitionCategoryAttrs {
  arName?: string
  enName?: string
  createdAt?: string
  updatedAt?: string
  publishedAt?: string
}
export interface PetitionCategory {
  id: number
  attributes: PetitionCategoryAttrs
}

export interface GovernorateAttrs {
  arName?: string
  enName?: string
  isCountry?: boolean
  createdAt?: string
  updatedAt?: string
  publishedAt?: string
}

export interface Governorate {
  id: number
  attributes: GovernorateAttrs
}

export interface OwnerAttrs {
  username?: string
  email?: string
  provider?: any
  confirmed?: boolean
  blocked?: false
  createdAt: string
  updatedAt: string
  isPrivileged: boolean
  phoneVerified: boolean
  phoneNumber: string
  userType: string
  lat: number
  long: number
  facebookLink: string
  instagramLink: string
  websiteLink: string
  arName: string
  enName: string
  image: {
    data: {
      id: number
      attributes: Image
    }
  }
}
export interface Owner {
  id: number
  attributes: OwnerAttrs
}

// TODO update org

export interface OrganizationAttr {
  arName: string
  enName: string
  nearestLandmark: string
  CEOName: string
  permitNumber: string
  organizationPhone: string
  EstablishedYear: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  logo: {
    data: any
  }
  permitImage: {
    data: any
  }
  governorate?: {
    data: Governorate
  }
  owner?: {
    data: Owner
  }
}
export interface Organization {
  id: number
  attributes?: OrganizationAttr
}

export interface VerifyOtpResponse {
  status?: string
  valid?: boolean
}

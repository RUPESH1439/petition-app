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
  logo?: any // TODO integrate logo
  permitImage?: any
  gender?: GenderAttrs & ID
  governorate?: GovernorateAttrs & ID
  owner?: OwnerAttrs & ID
}

export interface UpdatePersonalUser {
  name?: string
  birthdateYear?: string
  gender?: number
  phoneNumber?: string
  governorate?: number
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
  logo?: any // TODO integrate logo
  permitImage?: any
  gender?: number
  governorate?: number
}

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
  id: string
  attributes: PetitionAttrs
}

export interface PetitionAttrs {
  hideName: string
  description: string
  title: string
  image: any
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

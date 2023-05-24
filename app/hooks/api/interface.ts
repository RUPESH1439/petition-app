export interface IError {
  message: string
}

export type ID = {
  id: number
}
export interface PersonalUser {
  id: number
  name: string
  birthdateYear: string
  createdAt: string
  updatedAt: string
  publishedAt?: null
  gender: GenderAttrs & ID
  governorate?: GovernorateAttrs & ID
  owner: OwnerAttrs & ID
}

export interface OrganizationUser {
  id: number
  name: string
  birthdateYear: string
  createdAt: string
  updatedAt: string
  publishedAt?: null
  gender: GenderAttrs & ID
  governorate?: GovernorateAttrs & ID
  owner: OwnerAttrs & ID
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

export interface PetitionCategoryAttrs {
  arName?: string
  erName?: string
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

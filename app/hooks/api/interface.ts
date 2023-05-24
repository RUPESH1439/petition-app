export interface Gender {
  id: number
  attributes: {
    arType?: string
    enType?: string
    createdAt?: string
    updatedAt?: string
    publishedAt?: string
  }
}

export interface PetitionCategory {
  id: number
  attributes: {
    arName?: string
    erName?: string
    createdAt?: string
    updatedAt?: string
    publishedAt?: string
  }
}

export interface Governorate {
  id: number
  attributes: {
    arType?: string
    enType?: string
    isCountry?: boolean
    createdAt?: string
    updatedAt?: string
    publishedAt?: string
  }
}

export interface Owner {
  id: number
  attributes: {
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
}

// TODO update org

export interface Organization {
  id: number
  attributes?: {
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
}

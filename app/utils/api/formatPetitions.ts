import { Petition } from "app/hooks/api/interface"

export default function formatPetitions(
  petitionsData: Petition[],
  isRTL: boolean,
  currentUserId: number,
) {
  return petitionsData?.map(({ id, attributes }) => {
    const {
      hideName,
      title,
      description,
      governorate,
      category,
      creator,
      signers,
      // eslint-disable-next-line camelcase
      petition_stat,
      createdAt,
    } = attributes ?? {}
    const isOrg = creator?.data?.attributes?.userType === "organization"
    const isSigned =
      signers?.data?.findIndex((signer) => signer?.id === currentUserId) !== undefined
    return {
      id,
      city: isRTL ? governorate?.data?.attributes?.arName : governorate?.data?.attributes?.enName,
      // eslint-disable-next-line camelcase
      viewsCount: petition_stat?.data?.attributes?.views,
      signsCount: signers?.data?.length ?? 0,
      title,
      isOrg,
      isPrivileged: creator?.data?.attributes?.isPrivileged,
      date: new Date(createdAt),
      description,
      photoUrl: "https://ui-avatars.com/api/?name=Delfina+Ghimire&rounded=true?bold=true",
      name: isRTL ? creator?.data?.attributes?.arName : creator?.data?.attributes?.enName,
      category: isRTL ? category?.data?.attributes?.arName : category?.data?.attributes?.enName,
      status: !currentUserId ? "forGuest" : isSigned ? "signed" : "unsigned",
      isAnonymous: hideName,
    }
  })
}

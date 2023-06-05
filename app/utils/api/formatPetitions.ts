import { Petition } from "app/hooks/api/interface"

export default function formatPetitions(
  petitionsData: Petition[],
  isRTL: boolean,
  currentUserId: number,
) {
  return petitionsData
    ? petitionsData?.map((petition) => {
        const { id, attributes } = petition ?? {}
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
          image,
        } = attributes ?? {}
        const isOrg = creator?.data?.attributes?.userType === "organization"
        const isSigned = signers?.data?.findIndex((signer) => signer?.id === currentUserId) !== -1
        return {
          id,
          city: isRTL
            ? governorate?.data?.attributes?.arName
            : governorate?.data?.attributes?.enName,
          // eslint-disable-next-line camelcase
          viewsCount: petition_stat?.data?.attributes?.views,
          signsCount: signers?.data?.length ?? 0,
          title,
          isOrg,
          isPrivileged: creator?.data?.attributes?.isPrivileged,
          date: new Date(createdAt),
          description,
          photoUrl: creator?.data?.attributes?.image?.data?.attributes?.url,
          name: isRTL ? creator?.data?.attributes?.arName : creator?.data?.attributes?.enName,
          category: isRTL ? category?.data?.attributes?.arName : category?.data?.attributes?.enName,
          status: !currentUserId
            ? "forGuest"
            : isSigned
            ? "signed"
            : ("unsigned" as "forGuest" | "signed" | "unsigned"),
          isAnonymous: !!hideName,
          signers: signers?.data?.map((signer) => signer?.id),
          petitionImageUrl: image?.data?.attributes?.url,
          petition,
          creatorId: creator?.data?.id,
          // eslint-disable-next-line camelcase
          petitionStatId: petition_stat?.data?.id,
        }
      })
    : []
}

import { OrganizationUser, PersonalUser } from "app/hooks/api/interface"

export default function formatUserData(response) {
  const attrs = response?.data?.data?.attributes
  return {
    id: response?.data?.data?.id,
    ...attrs,
    gender: { id: attrs?.gender?.data?.id, ...attrs?.gender?.data?.attributes },
    governorate: { id: attrs?.governorate?.data?.id, ...attrs?.governorate?.data?.attributes },
    owner: { id: attrs?.owner?.data?.id, ...attrs?.owner?.data?.attributes },
    logo: { id: attrs?.logo?.data?.id, ...attrs?.logo?.data?.attributes },
    permitImage: { id: attrs?.permitImage?.data?.id, ...attrs?.permitImage?.data?.attributes },
  } as PersonalUser | OrganizationUser
}

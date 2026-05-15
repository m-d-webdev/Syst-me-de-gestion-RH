const NEXT_PUBLIC_DOCUMENTS = process.env.NEXT_PUBLIC_DOCUMENTS

export const decision_de_stage_url = (id, lang = "ar") => {
    return `${NEXT_PUBLIC_DOCUMENTS}/training-document/${lang}/${id}`
}
export const attestation_de_stage_url = (id) => {
    return `${NEXT_PUBLIC_DOCUMENTS}/training-diplome/${id}`
}
export const Notification_de_fin_de_stage_url = (id) => {
    return `${NEXT_PUBLIC_DOCUMENTS}/end-training/${id}`
}
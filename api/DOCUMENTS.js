import { isLocalFun } from "@/lib/utils";

let NEXT_PUBLIC_DOCUMENTS = process.env.NEXT_PUBLIC_DOCUMENTS

const isLocal = isLocalFun();

if (isLocal) {
    NEXT_PUBLIC_DOCUMENTS = process.env.NEXT_PUBLIC_DOCUMENTS || process.env.NEXT_PUBLIC_DOCUMENTS_LOCAL
}
export const decision_de_stage_url = (id, lang = "ar") => {
    return `${NEXT_PUBLIC_DOCUMENTS}/training-document/${lang}/${id}`
}
export const attestation_de_stage_url = (id, lang = "ar") => {
    return `${NEXT_PUBLIC_DOCUMENTS}/training-diplome/${lang}/${id}`
}
export const Notification_de_fin_de_stage_url = (id) => {
    return `${NEXT_PUBLIC_DOCUMENTS}/end-training/${id}`
}
export const engagement_de_stage_url = (id, lang = "ar") => {
    return `${NEXT_PUBLIC_DOCUMENTS}/engagement/${lang}/${id}`
}
export const attestation_de_reception = (id, lang = "ar") => {
    return `${NEXT_PUBLIC_DOCUMENTS}/attestation_de_reception/${lang}/${id}`
}
// ----------- EMPLOYER --------------
export const demande_explication = (id, lang = "ar") => {
    return `${NEXT_PUBLIC_DOCUMENTS}/demande_explication/${lang}/${id}`
}
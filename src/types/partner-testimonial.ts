export type PartnerTestimonial = {
    id: string
    partner_name: string
    partner_title?: string | null
    testimonial: string
    avatar_url?: string | null
    display_order: number
    is_active: boolean
    created_at: string
    updated_at?: string | null
}

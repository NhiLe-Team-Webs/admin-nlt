// src/services/partnerTestimonials.ts
import { supabase } from '@/lib/supabase'

export type PartnerRow = {
    id: string
    partner_name: string
    partner_title: string | null
    testimonial: string
    avatar_url: string | null
    display_order: number | null
    is_active: boolean | null
    created_at?: string
    updated_at?: string | null
}

export async function listTestimonials() {
    const { data, error } = await supabase
        .from('partner_testimonials')
        .select('*')
        .order('display_order', { ascending: true })
        .order('created_at', { ascending: false })
    if (error) throw new Error(error.message)
    return (data ?? []) as PartnerRow[]
}

// INSERT — không gọi .select() nữa
export async function insertTestimonial(payload: {
    partner_name: string
    partner_title?: string | null
    testimonial: string
    avatar_url?: string | null
    display_order?: number
    is_active?: boolean
}) {
    const { error } = await supabase
        .from('partner_testimonials')
        .insert([{
            partner_name: payload.partner_name,
            partner_title: payload.partner_title ?? null,
            testimonial: payload.testimonial,
            avatar_url: payload.avatar_url ?? null,
            display_order: payload.display_order ?? 0,
            is_active: payload.is_active ?? true,
        }])

    if (error) throw new Error(error.message)
    // không cần return data, ContentPartners đã refetch ngay sau đó
    return true
}

// UPDATE — không gọi .select() nữa
export async function updateTestimonial(
    id: string,
    patch: Partial<Omit<PartnerRow, 'id'>>
) {
    console.log('🔧 updating id:', id) // debug
    const { data, error } = await supabase
        .from('partner_testimonials')
        .update(patch)
        .eq('id', id)
        .select('*') // lấy lại bản ghi sau update
        .maybeSingle() // tránh lỗi "multiple rows"

    if (error) throw new Error(error.message)
    return data as PartnerRow
}


export async function deleteTestimonial(id: string) {
    const { error } = await supabase
        .from('partner_testimonials')
        .delete()
        .eq('id', id)
    if (error) throw new Error(error.message)
}

export async function uploadAvatar(file: File) {
    const ext = (file.name.split('.').pop() || 'jpg').toLowerCase()
    const path = `partner_testimonials/${crypto.randomUUID()}.${ext}`
    const bucket = 'partners_images'

    const { error: upErr } = await supabase.storage
        .from(bucket)
        .upload(path, file, {
            cacheControl: '3600',
            upsert: false,
            contentType: file.type || 'image/*',
        })
    if (upErr) throw new Error(upErr.message)

    const { data } = supabase.storage.from(bucket).getPublicUrl(path)
    return data.publicUrl
}

// Đổi display_order cho 1 bản ghi
export async function updateDisplayOrder(id: string, display_order: number) {
    const { error } = await supabase
        .from('partner_testimonials')
        .update({ display_order })
        .eq('id', id)
    if (error) throw new Error(error.message)
}

// Hoán đổi display_order giữa 2 bản ghi
export async function swapDisplayOrder(
    a: { id: string; display_order: number },
    b: { id: string; display_order: number }
) {
    await updateDisplayOrder(a.id, b.display_order)
    await updateDisplayOrder(b.id, a.display_order)
}

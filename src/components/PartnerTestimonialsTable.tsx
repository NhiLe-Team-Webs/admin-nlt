import { useEffect, useState } from 'react'
import { listTestimonials } from '@/services/partnerTestimonials'
import type { PartnerRow } from '@/services/partnerTestimonials'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

export default function PartnerTestimonialsTable() {
    const [items, setItems] = useState<PartnerRow[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [search, setSearch] = useState('')

    async function load() {
        try {
            setLoading(true)
            const rows = await listTestimonials()
            setItems(rows)
            setError(null)
        } catch (e: any) {
            setError(e.message ?? 'Fetch failed')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { load() }, []) // lần đầu

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <div className="text-lg font-semibold">Partner Testimonials</div>
                <div className="flex gap-2">
                    <Input
                        placeholder="Tìm theo tên, title, nội dung…"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="w-64"
                    />
                    <Button onClick={load}>Tìm</Button>
                    <Button variant="default">Thêm mới</Button>
                </div>
            </div>

            {loading && <div>Đang tải…</div>}
            {error && <div className="text-red-600">Lỗi: {error}</div>}

            {!loading && !error && (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Order</TableHead>
                            <TableHead>Avatar</TableHead>
                            <TableHead>Partner</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Testimonial</TableHead>
                            <TableHead>Active</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {items.map(it => (
                            <TableRow key={it.id}>
                                <TableCell>{it.display_order}</TableCell>
                                <TableCell>
                                    {it.avatar_url ? (
                                        <img src={it.avatar_url} alt="" className="h-9 w-9 rounded-full object-cover" />
                                    ) : '—'}
                                </TableCell>
                                <TableCell>{it.partner_name}</TableCell>
                                <TableCell>{it.partner_title}</TableCell>
                                <TableCell className="max-w-[420px]">
                                    <span className="line-clamp-2">{it.testimonial}</span>
                                </TableCell>
                                <TableCell>{it.is_active ? 'Yes' : 'No'}</TableCell>
                                <TableCell className="text-right">
                                    <Button variant="outline" size="sm" className="mr-2">Edit</Button>
                                    <Button variant="outline" size="sm">Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}

                        {items.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={7}>Chưa có dữ liệu</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            )}
        </div>
    )
}

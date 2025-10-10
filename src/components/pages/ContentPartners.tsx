import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Plus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Dùng toàn bộ CRUD qua service (không gọi supabase trực tiếp trong component)
import {
  listTestimonials,
  insertTestimonial,
  updateTestimonial,
  deleteTestimonial,
  uploadAvatar,
} from "@/services/partnerTestimonials"
import type { PartnerRow } from "@/services/partnerTestimonials"

// UI model (giữ tên field cũ để không phải sửa JSX nhiều)
interface Partner {
  id: string
  name: string
  title: string
  testimonial: string
  avatar: string
  display_order?: number
  is_active?: boolean
}

// ---- Helper: map DB -> UI ----
function dbToUi(r: PartnerRow): Partner {
  return {
    id: r.id,
    name: r.partner_name ?? "",
    title: r.partner_title ?? "",
    testimonial: r.testimonial ?? "",
    avatar: r.avatar_url ?? "",
    display_order: r.display_order ?? 0,
    is_active: r.is_active ?? true,
  }
}

export const ContentPartners = () => {
  const [partners, setPartners] = useState<Partner[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null)
  const [isEditing, setIsEditing] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    title: "",
    testimonial: "",
    avatar: "", // sẽ set sau khi upload
  })

  const { toast } = useToast()

  // ------- Fetch list qua service -------
  async function refetch() {
    try {
      const rows = await listTestimonials()
      setPartners(rows.map(dbToUi))
    } catch (e: any) {
      toast({ title: "Lỗi tải dữ liệu", description: e.message, variant: "destructive" })
    }
  }

  useEffect(() => {
    refetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const openAddModal = () => {
    setSelectedPartner(null)
    setIsEditing(false)
    setFormData({
      name: "",
      title: "",
      testimonial: "",
      avatar: "",
    })
    setIsModalOpen(true)
  }

  const openEditModal = (partner: Partner) => {
    setSelectedPartner(partner)
    setIsEditing(true)
    setFormData({
      name: partner.name,
      title: partner.title,
      testimonial: partner.testimonial,
      avatar: partner.avatar,
    })
    setIsModalOpen(true)
  }

  // ------- Insert / Update qua service -------
  const handleSave = async () => {
    if (!formData.name.trim() || !formData.testimonial.trim()) {
      toast({
        title: "Lỗi",
        description: "Vui lòng điền đầy đủ Tên và Nội dung.",
        variant: "destructive",
      })
      return
    }

    try {
      if (isEditing && selectedPartner) {
        await updateTestimonial(selectedPartner.id, {
          partner_name: formData.name,
          partner_title: formData.title || null,
          testimonial: formData.testimonial,
          avatar_url: formData.avatar || null,
        })
        toast({ title: "Cập nhật thành công" })
      } else {
        const nextOrder =
          partners.length > 0 ? Math.max(...partners.map((p) => p.display_order || 0)) + 1 : 1

        await insertTestimonial({
          partner_name: formData.name,
          partner_title: formData.title || null,
          testimonial: formData.testimonial,
          avatar_url: formData.avatar || null,
          display_order: nextOrder,
          is_active: true,
        })
        toast({ title: "Thêm thành công" })
      }

      setIsModalOpen(false)
      await refetch() // Refetch + cập nhật UI
    } catch (e: any) {
      toast({ title: "Lỗi lưu dữ liệu", description: e.message, variant: "destructive" })
    }
  }

  // ------- Delete qua service -------
  const handleDelete = async (partnerId: string) => {
    if (!confirm("Bạn chắc chắn muốn xóa?")) return
    try {
      await deleteTestimonial(partnerId)
      toast({ title: "Xóa thành công", variant: "destructive" })
      await refetch()
    } catch (e: any) {
      toast({ title: "Lỗi xóa", description: e.message, variant: "destructive" })
    }
  }

  // ------- Upload avatar lên Storage (service trả về public URL) -------
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      const publicUrl = await uploadAvatar(file)
      setFormData((prev) => ({ ...prev, avatar: publicUrl }))
      toast({ title: "Upload ảnh thành công" })
    } catch (e: any) {
      toast({ title: "Upload thất bại", description: e.message, variant: "destructive" })
    }
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Quản lý: Đối tác</h2>
          <p className="text-muted-foreground mt-1">Thêm, sửa, hoặc xóa các đánh giá của đối tác.</p>
        </div>
        <Button onClick={openAddModal} className="flex items-center space-x-2">
          <Plus className="w-5 h-5" />
          <span>Thêm đối tác</span>
        </Button>
      </div>

      <div className="bg-card rounded-2xl shadow-lg border border-border">
        <ul>
          {partners.map((partner, index) => (
            <li
              key={partner.id}
              className={`flex items-start p-6 space-x-6 ${index < partners.length - 1 ? "border-b border-border" : ""
                }`}
            >
              <img
                src={partner.avatar || "https://placehold.co/96x96?text=Avatar"}
                className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                alt={partner.name}
              />
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-card-foreground">{partner.name}</p>
                    <p className="text-sm text-muted-foreground">{partner.title}</p>
                  </div>
                  <div className="space-x-3 flex-shrink-0">
                    <button
                      onClick={() => openEditModal(partner)}
                      className="text-sm font-semibold text-primary hover:text-primary/80"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDelete(partner.id)}
                      className="text-sm font-semibold text-destructive hover:text-destructive/80"
                    >
                      Xóa
                    </button>
                  </div>
                </div>
                <p className="mt-3 text-card-foreground italic leading-relaxed">
                  "{partner.testimonial}"
                </p>
              </div>
            </li>
          ))}
          {partners.length === 0 && (
            <li className="p-6 text-sm text-muted-foreground">Chưa có dữ liệu</li>
          )}
        </ul>
      </div>

      {/* Partner Add/Edit Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{isEditing ? "Chỉnh sửa đối tác" : "Thêm đối tác mới"}</DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <Label className="text-sm font-medium mb-2">Ảnh đại diện</Label>
                <div className="aspect-square bg-accent rounded-lg overflow-hidden">
                  <img
                    src={formData.avatar || "https://placehold.co/300x300?text=Avatar"}
                    alt="Partner Avatar Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="partner-avatar-upload"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById("partner-avatar-upload")?.click()}
                  className="mt-2 w-full"
                >
                  Chọn ảnh
                </Button>
              </div>

              <div className="md:col-span-2 space-y-6">
                <div>
                  <Label htmlFor="partner-name" className="text-sm font-medium mb-2">
                    Tên đối tác
                  </Label>
                  <Input
                    id="partner-name"
                    placeholder="Ví dụ: Hoàng An"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  />
                </div>

                <div>
                  <Label htmlFor="partner-title" className="text-sm font-medium mb-2">
                    Chức vụ & Công ty
                  </Label>
                  <Input
                    id="partner-title"
                    placeholder="Ví dụ: CEO Timbre Group"
                    value={formData.title}
                    onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                  />
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="partner-testimonial" className="text-sm font-medium mb-2">
                Nội dung đánh giá
              </Label>
              <Textarea
                id="partner-testimonial"
                rows={6}
                placeholder="Nhập nội dung testimonial của đối tác..."
                value={formData.testimonial}
                onChange={(e) => setFormData((prev) => ({ ...prev, testimonial: e.target.value }))}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-border">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Hủy
            </Button>
            <Button onClick={handleSave}>Lưu đối tác</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

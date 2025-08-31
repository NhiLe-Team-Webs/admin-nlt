import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

export const Settings = () => {
  const [adminName, setAdminName] = useState('Nhi Le Admin');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [contactEmail, setContactEmail] = useState('contact@nhileteam.com');
  const [facebookUrl, setFacebookUrl] = useState('');
  const [telegramUrl, setTelegramUrl] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [instagramUrl, setInstagramUrl] = useState('');
  
  const { toast } = useToast();

  const handleSaveAccount = () => {
    if (newPassword && newPassword !== confirmPassword) {
      toast({
        title: "Lỗi",
        description: "Mật khẩu mới và xác nhận mật khẩu không khớp.",
        variant: "destructive"
      });
      return;
    }

    if (newPassword && !currentPassword) {
      toast({
        title: "Lỗi",
        description: "Vui lòng nhập mật khẩu hiện tại để thay đổi mật khẩu.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Lưu thành công",
      description: "Thông tin tài khoản đã được cập nhật.",
    });

    // Clear password fields after successful save
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleSaveGeneralInfo = () => {
    toast({
      title: "Lưu thành công",
      description: "Thông tin chung của website đã được cập nhật.",
    });
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground">Cài đặt</h2>
        <p className="text-muted-foreground mt-1">
          Quản lý tài khoản và thông tin chung của trang web.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Admin Account Card */}
          <Card>
            <CardHeader>
              <CardTitle>Tài khoản Admin</CardTitle>
              <CardDescription>
                Cập nhật thông tin cá nhân và mật khẩu của bạn.
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Tên hiển thị
                </label>
                <Input
                  value={adminName}
                  onChange={(e) => setAdminName(e.target.value)}
                  className="w-full lg:w-2/3"
                />
              </div>
              
              <Separator />
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Mật khẩu hiện tại
                </label>
                <Input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full lg:w-2/3"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Mật khẩu mới
                </label>
                <Input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full lg:w-2/3"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Xác nhận mật khẩu mới
                </label>
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full lg:w-2/3"
                />
              </div>
              
              <div className="flex justify-end pt-4">
                <Button onClick={handleSaveAccount}>
                  Lưu thay đổi
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* General Website Info Card */}
          <Card>
            <CardHeader>
              <CardTitle>Thông tin chung của Website</CardTitle>
              <CardDescription>
                Các thông tin này sẽ được hiển thị ở chân trang web.
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email liên hệ chính
                </label>
                <Input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full lg:w-2/3"
                />
              </div>
              
              <Separator />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Facebook URL
                  </label>
                  <Input
                    value={facebookUrl}
                    onChange={(e) => setFacebookUrl(e.target.value)}
                    placeholder="https://facebook.com/..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Telegram URL
                  </label>
                  <Input
                    value={telegramUrl}
                    onChange={(e) => setTelegramUrl(e.target.value)}
                    placeholder="https://t.me/..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    YouTube URL
                  </label>
                  <Input
                    value={youtubeUrl}
                    onChange={(e) => setYoutubeUrl(e.target.value)}
                    placeholder="https://youtube.com/..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Instagram URL
                  </label>
                  <Input
                    value={instagramUrl}
                    onChange={(e) => setInstagramUrl(e.target.value)}
                    placeholder="https://instagram.com/..."
                  />
                </div>
              </div>
              
              <div className="flex justify-end pt-4">
                <Button onClick={handleSaveGeneralInfo}>
                  Lưu thông tin
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
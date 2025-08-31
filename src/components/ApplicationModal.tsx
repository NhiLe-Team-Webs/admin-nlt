import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Application {
  id: string;
  name: string;
  email: string;
  source: string;
  date: string;
  status: string;
  telegram?: string;
  motivation?: string;
  goals?: string;
  timeCommitment?: string;
}

interface ApplicationModalProps {
  application: Application | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusChange: (status: string) => void;
}

export const ApplicationModal = ({ application, isOpen, onClose, onStatusChange }: ApplicationModalProps) => {
  if (!application) return null;

  const handleStatusUpdate = (status: string) => {
    onStatusChange(status);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Chi tiết ứng viên</DialogTitle>
          <p className="text-sm text-muted-foreground">{application.name}</p>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto space-y-6 py-4">
          <div>
            <h4 className="text-sm font-semibold text-muted-foreground mb-1">Email</h4>
            <p className="text-foreground">{application.email}</p>
          </div>
          
          {application.telegram && (
            <div>
              <h4 className="text-sm font-semibold text-muted-foreground mb-1">Telegram</h4>
              <p className="text-foreground">{application.telegram}</p>
            </div>
          )}
          
          {application.motivation && (
            <div>
              <h4 className="text-sm font-semibold text-muted-foreground mb-1">Tại sao bạn muốn tham gia NhiLe Team?</h4>
              <p className="text-foreground leading-relaxed">{application.motivation}</p>
            </div>
          )}
          
          {application.goals && (
            <div>
              <h4 className="text-sm font-semibold text-muted-foreground mb-1">Bạn mong muốn nhận được điều gì nhất?</h4>
              <p className="text-foreground leading-relaxed">{application.goals}</p>
            </div>
          )}
          
          {application.timeCommitment && (
            <div>
              <h4 className="text-sm font-semibold text-muted-foreground mb-1">Cam kết thời gian</h4>
              <p className="text-foreground">{application.timeCommitment}</p>
            </div>
          )}
        </div>
        
        <div className="flex items-center justify-end space-x-3 pt-4 border-t border-border">
          <Button 
            variant="outline" 
            onClick={() => handleStatusUpdate('rejected')}
          >
            Từ chối
          </Button>
          <Button 
            variant="secondary"
            onClick={() => handleStatusUpdate('contacted')}
          >
            Đã liên hệ
          </Button>
          <Button 
            onClick={() => handleStatusUpdate('accepted')}
          >
            Chấp nhận
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
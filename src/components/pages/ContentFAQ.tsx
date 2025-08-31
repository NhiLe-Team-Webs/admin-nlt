import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2 } from "lucide-react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const mockFAQs: FAQItem[] = [
  {
    id: '1',
    question: 'Tham gia NhiLe Team có mất phí không?',
    answer: 'Hoàn toàn không. NhiLe Team hoạt động dựa trên tinh thần cống hiến và chia sẻ. Tất cả các khóa học và hoạt động đều miễn phí cho các thành viên.'
  },
  {
    id: '2',
    question: 'Yêu cầu đầu vào để trở thành thành viên là gì?',
    answer: 'Chúng tôi tìm kiếm những cá nhân có tinh thần ham học hỏi, sẵn sàng cam kết thời gian và quan trọng nhất là phù hợp với giá trị cốt lõi: Tâm - Tầm - Đức. Các yêu cầu cụ thể về kỹ năng sẽ phụ thuộc vào từng nhóm học nghề.'
  }
];

export const ContentFAQ = () => {
  const [faqs, setFaqs] = useState(mockFAQs);
  const [isOpen, setIsOpen] = useState(false);
  const [editingFAQ, setEditingFAQ] = useState<FAQItem | null>(null);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const { toast } = useToast();

  const handleNewFAQ = () => {
    setEditingFAQ(null);
    setQuestion('');
    setAnswer('');
    setIsOpen(true);
  };

  const handleEditFAQ = (faq: FAQItem) => {
    setEditingFAQ(faq);
    setQuestion(faq.question);
    setAnswer(faq.answer);
    setIsOpen(true);
  };

  const handleSave = () => {
    if (!question.trim() || !answer.trim()) {
      toast({
        title: "Lỗi",
        description: "Vui lòng nhập đầy đủ câu hỏi và câu trả lời.",
        variant: "destructive"
      });
      return;
    }

    if (editingFAQ) {
      setFaqs(faqs.map(faq => 
        faq.id === editingFAQ.id 
          ? { ...faq, question: question.trim(), answer: answer.trim() }
          : faq
      ));
      toast({
        title: "Cập nhật thành công",
        description: "Câu hỏi thường gặp đã được cập nhật.",
      });
    } else {
      const newFAQ: FAQItem = {
        id: Date.now().toString(),
        question: question.trim(),
        answer: answer.trim()
      };
      setFaqs([...faqs, newFAQ]);
      toast({
        title: "Thêm thành công",
        description: "Câu hỏi thường gặp mới đã được thêm.",
      });
    }

    setIsOpen(false);
    setQuestion('');
    setAnswer('');
    setEditingFAQ(null);
  };

  const handleDelete = (id: string) => {
    setFaqs(faqs.filter(faq => faq.id !== id));
    toast({
      title: "Xóa thành công",
      description: "Câu hỏi thường gặp đã được xóa.",
    });
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Quản lý: FAQ</h2>
          <p className="text-muted-foreground mt-1">
            Thêm, sửa, xóa các câu hỏi thường gặp.
          </p>
        </div>
        
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleNewFAQ} className="flex items-center">
              <Plus className="w-5 h-5 mr-2" />
              Thêm câu hỏi mới
            </Button>
          </DialogTrigger>
          
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>
                {editingFAQ ? 'Chỉnh sửa câu hỏi' : 'Thêm câu hỏi mới'}
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Câu hỏi
                </label>
                <Input
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Nhập câu hỏi..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Câu trả lời
                </label>
                <Textarea
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Nhập câu trả lời..."
                  rows={5}
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Hủy
              </Button>
              <Button onClick={handleSave}>
                Lưu
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq) => (
            <AccordionItem 
              key={faq.id} 
              value={faq.id}
              className="bg-card rounded-xl shadow-lg border border-border mb-4"
            >
              <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                <span className="font-semibold text-card-foreground pr-4">
                  {faq.question}
                </span>
              </AccordionTrigger>
              
              <AccordionContent className="px-6 pb-6">
                <div className="text-muted-foreground mb-4">
                  {faq.answer}
                </div>
                
                <div className="flex justify-end space-x-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEditFAQ(faq)}
                    className="text-primary hover:text-primary/80"
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Sửa
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(faq.id)}
                    className="text-destructive hover:text-destructive/80"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Xóa
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        
        {faqs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              Chưa có câu hỏi thường gặp nào. Hãy thêm câu hỏi đầu tiên!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
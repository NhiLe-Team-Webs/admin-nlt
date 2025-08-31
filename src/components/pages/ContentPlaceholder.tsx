interface ContentPlaceholderProps {
  title: string;
  description: string;
}

export const ContentPlaceholder = ({ title, description }: ContentPlaceholderProps) => {
  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-foreground">{title}</h2>
      <p className="text-muted-foreground mt-1">{description}</p>
      
      <div className="mt-8 bg-card p-12 rounded-2xl shadow-lg border border-border text-center">
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-card-foreground mb-2">Chức năng đang phát triển</h3>
          <p className="text-muted-foreground">
            Trang này sẽ được triển khai trong các phiên bản tiếp theo. 
            Vui lòng quay lại sau để trải nghiệm đầy đủ tính năng.
          </p>
        </div>
      </div>
    </div>
  );
};
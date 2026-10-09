type WindowContentProps = {
  children: React.ReactNode;
};

const WindowContent = ({
  children,
}: WindowContentProps) => {
  return (
    <div className="min-h-0 flex-1 overflow-auto">
      {children}
    </div>
  );
};

export default WindowContent;
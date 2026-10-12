const FileManagerApp = () => {
  const items = [
    { name: "Documents", type: "Folder" },
    { name: "Downloads", type: "Folder" },
    { name: "projects", type: "Folder" },
    { name: "readme.txt", type: "File" },
  ];

  return (
    <div className="min-h-full bg-[#080D18] p-5 text-slate-200">
      <p className="text-xs uppercase tracking-[0.2em] text-cyan-300/60">
        Virtual Filesystem
      </p>

      <h3 className="mt-4 text-lg font-semibold text-cyan-50">
        /home/cyber
      </h3>

      <div className="mt-5 space-y-2">
        {items.map((item) => (
          <div
            key={item.name}
            className="flex items-center justify-between rounded-lg border border-white/5 bg-white/3 px-3 py-3"
          >
            <span className="text-sm">{item.name}</span>
            <span className="text-xs text-cyan-300/50">
              {item.type}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileManagerApp;
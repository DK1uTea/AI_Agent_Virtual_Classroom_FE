const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-6 animate-fade-in">

        <div className="h-20 w-20 animate-spin rounded-full bg-gradient-to-tr from-primary to-purple-500 p-[5px] shadow-lg">
          <div className="h-full w-full rounded-full bg-background" />
        </div>

        <p className="text-base text-muted-foreground tracking-wide">
          Please wait...
        </p>

      </div>
    </div>
  );
};

export default Loading;

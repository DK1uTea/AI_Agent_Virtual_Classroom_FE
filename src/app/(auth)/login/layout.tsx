const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <div>Header</div>
      {children}
    </main>
  );
};

export default Layout;
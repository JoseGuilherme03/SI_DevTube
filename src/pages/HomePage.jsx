export const HomePage = () => {
  return (
    <div className="flex flex-col bg-black h-screen w-screen text-white gap-10">
      <header className="h-20 border-b border-blue-500 flex items-center justify-center">
        <h1 className="text-5xl font-bold">DevTube</h1>
      </header>
      <main className="flex flex-col gap-10">
        <div className="flex flex-col px-10 gap-8">
          <h2 className="text-4xl">Category</h2>
          <div className="w-96 h-72 bg-white rounded-xl"></div>
        </div>
        <div className="flex flex-col px-10 gap-8">
          <h2 className="text-4xl">Category</h2>
          <div className="w-96 h-72 bg-white rounded-xl"></div>
        </div>
      </main>
    </div>
  );
};

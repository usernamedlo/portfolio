"use client"
const design = () => {
  return (
    <div className={`flex flex-col h-screen`}>
      <header>
        <nav className="bg-[#333333] h-12 w-full flex items-center justify-between px-4 flex-row lg:justify-between z-40 absolute">
          <a
            href="/"
            rel="noopener noreferrer"
            className="flex-grow flex justify-center lg:justify-start"
          >
            <div className="flex items-center">
              <img
                src="../../apple_logo.png"
                alt="Apple Logo"
                className="h-7 mr-4"
              />
              <strong className="text-white text-xl">
                <h3>usernamedlo</h3>
              </strong>
            </div>
          </a>
        </nav>
      </header>
      <main className="main-container h-screen overflow-hidden w-full">
        <div className="flex justify-center items-start mt-20 h-full">
          <div className="flex flex-col items-center">
            <div className="text-4xl font-bold text-center">
              <p>WORK IN PROGRESS</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default design;

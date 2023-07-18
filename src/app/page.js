import React from "react";

export default function Home() {
  return (
    <>
      <header>
        <div className="w-full h-4 flex flex-wrap bg-[#333333]">
          <div className="w-full lg:w-5/12 p-2">
            {/* Placeholder for content to match your existing grid layout */}
          </div>
          <div className="w-full lg:w-7/12 p-2 flex justify-end">
          </div>
        </div>
      </header>
      <main className="main-container"></main>
    </>
  );
}

//tu sais m'adapter ce code pour que la balise main soit l'endroit de drag and drop. Le header ne doit pas bouger, on ne doit pas pouvoir y déposer des icons
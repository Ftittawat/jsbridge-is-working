'use client'
import { useState } from "react";

declare global {
  interface Window {
    Android?: {
      closeWebView: () => void;
      openExternalBrowser: (url: string) => void;
    }
  }
}

export default function Home() {
  const [inputText, setInputText] = useState("");
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };
  const closeView = () => {
    if (window.Android && window.Android.closeWebView) {
      window.Android.closeWebView();
    }
  }
  const openBrowser = (url: string) => {
    if (window.Android && window.Android?.openExternalBrowser) {
      window.Android?.openExternalBrowser(url)
    }
  }
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen h-full p-8 pt-16 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header
        className="flex justify-end w-full"
      >
        <button
            className="rounded-full transition-colors flex items-center justify-center hover:border-transparent text-xl sm:text-2xl h-10 w-10"
            onClick={closeView}
        >
          X
        </button>
      </header>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <input
            type="url"
            placeholder="Enter URL"
            className="border border-gray-300 text-black rounded px-4 py-2 text-sm sm:text-base w-full sm:w-96"
            value={inputText}
            onChange={handleInputChange}
          />
          <button
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            onClick={() => openBrowser(inputText)}
          >
            Open URL
          </button>
        </div>
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <button
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            onClick={closeView}
          >
            Close WebView
          </button>
          {/* <button
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
          >
            Close WebView
          </button> */}
          {/* <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a> */}
        </div>
      </main>
    </div>
  );
}

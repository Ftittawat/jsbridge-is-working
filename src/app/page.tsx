'use client'
import { useEffect, useState } from "react";

declare global {
  interface Window {
    Android?: {
      closeWebView: () => void
      openExternalBrowser: (url: string) => void
      getKeyboardHeight: () => void
    }
    webkit?: {
      messageHandlers?: {
        iOSApp?: {
          closeWebView: () => void
          openExternalBrowser: (url: string) => void
          getKeyboardHeight: () => void
        }
      }
    }
  }
}

export default function Home() {
  const [inputText, setInputText] = useState("")
  const [height, setHeight] = useState("0")

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value)
  }

  const closeView = () => {
    console.log("closeView");
    if (window.Android && window.Android.closeWebView) {
      window.Android.closeWebView()
    } else if (window.webkit?.messageHandlers?.iOSApp) {
      window.webkit.messageHandlers.iOSApp.closeWebView()
    }
  }

  const openBrowser = (url: string) => {
    if (window.Android && window.Android?.openExternalBrowser) {
      window.Android?.openExternalBrowser(url)
    } else if (window.webkit?.messageHandlers?.iOSApp) {
      window.webkit.messageHandlers.iOSApp.openExternalBrowser(url)
    }
  }

  const keyboardHeight = () => {
    if (window.Android && window.Android.getKeyboardHeight) {
      window.Android.getKeyboardHeight()
    } else if (window.webkit?.messageHandlers?.iOSApp) {
      window.webkit.messageHandlers.iOSApp.getKeyboardHeight()
    }
  }

  useEffect(() => {
    (window as any).getKeyboardHeight = (result: string) => {
      setHeight(result);
      console.log("Result:", result);
    };
  }, []);

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
      <main className="flex flex-col gap-5 row-start-2 items-center w-full">
        {/* <div className="flex gap-4 items-center flex-col sm:flex-row">
          <h1 className="font-poppins font-semibold text-white text-4xl text-end p-5 pb-2 pr-10 leading-[4rem]">
            <span className="text-4xl max-lg:text-2xl">JsBridge is Working</span>
          </h1>
        </div> */}
        <div className="flex gap-4 items-center flex-col sm:flex-row max-sm:w-full max-w-96">
          <input
            type="url"
            placeholder="https://...."
            className="border border-gray-300 text-black rounded px-4 py-2 text-base w-full sm:w-96"
            value={inputText}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <button
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#ccc] text-base h-10 sm:h-12 px-5 sm:px-6"
            onClick={() => openBrowser(inputText)}
          >
            Open URL
          </button>
        </div>
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <button
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#ccc] text-base h-10 sm:h-12 px-5 sm:px-6"
            onClick={() => openBrowser("https://www.google.co.th/")}
          >
            Open Google.com
          </button>
        </div>
        <div className="flex gap-1 items-center flex-col sm:flex-row">
          <h1 className="font-poppins font-semibold text-white text-4xl text-end p-5 pb-2 pr-10 leading-[4rem]">
            <span className="text-2xl max-lg:text-xl">{height}</span>
          </h1>
        </div>
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <button
             className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#ccc] text-base h-10 sm:h-12 px-5 sm:px-6"
             onClick={keyboardHeight}
          >
            getKeyboardHeight
          </button>
        </div>
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <button
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#ccc] text-base h-10 sm:h-12 px-5 sm:px-6"
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

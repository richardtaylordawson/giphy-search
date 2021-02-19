import React, { useState, useEffect } from "react"

export const InstallButton = () => {
  const [showInstallBtn, setShowInstallBtn] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined" && typeof navigator !== "undefined") {
      const isIOS =
        navigator.userAgent.includes("iPhone") ||
        navigator.userAgent.includes("iPad") ||
        (navigator.userAgent.includes("Macintosh") &&
          typeof navigator.maxTouchPoints === "number" &&
          navigator.maxTouchPoints > 2)

      const isSupportingBrowser = window.hasOwnProperty(
        "BeforeInstallPromptEvent"
      )

      const isStandalone = window.matchMedia("(display-mode: standalone)")
        .matches

      if (isStandalone) {
        setShowInstallBtn(false)
      } else {
        setShowInstallBtn(
          isIOS ||
            (isSupportingBrowser &&
              (localStorage.getItem("giphySearchInstalled") === "" ||
                localStorage.getItem("giphySearchInstalled") === "false"))
        )
      }

      // This will only be called if the browser is eligible and PWA has NOT been installed yet
      window.addEventListener("beforeinstallprompt", () => {
        localStorage.setItem("giphySearchInstalled", "false")
        setShowInstallBtn(true)
      })

      window.addEventListener("appinstalled", () => {
        localStorage.setItem("giphySearchInstalled", "true")
      })
    }
  }, [])

  let installButton

  if (showInstallBtn) {
    installButton = (
      <div
        className="install-btn"
        onClick={() => {
          if (typeof document !== "undefined") {
            document.querySelector("pwa-install").openPrompt()
          }
        }}
      >
        <button>
          <span class="hide-for-small">Install</span> +
        </button>
      </div>
    )
  }

  return (
    <div>
      {installButton}
      <pwa-install
        usecustom
        iconpath="https://giphy-search.richardtaylordawson.com/images/favicon.png"
        manifestpath="/manifest.json"
      ></pwa-install>
    </div>
  )
}

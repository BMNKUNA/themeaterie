import Image from "next/image"
import { Facebook, Instagram } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-black text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex items-center">
            <Image src="/themeateriewhite.png" alt="The Meaterie" width={220} height={110} className="h-20 w-auto" />
          </div>

          <div className="flex items-center space-x-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Facebook">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Instagram">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="X">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z"
                  fill="currentColor"
                />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="TikTok">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M16.6 5.82s.51.5 0 0A4.278 4.278 0 0 1 19.25 5a4.25 4.25 0 0 1-2.65 4.32v2.1A8.32 8.32 0 0 0 12 10c-4.418 0-8 3.582-8 8v1c0 .552.448 1 1 1h1c0-3.866 3.134-7 7-7a6.5 6.5 0 0 1 4 1.38v5.7a1 1 0 0 0 1 .92h2a1 1 0 0 0 1-1V6.72a1 1 0 0 0-.9-.99h-2.07a1 1 0 0 0-.93.99v.1Z"
                  fill="currentColor"
                />
              </svg>
            </a>
            <span className="text-gray-400 text-xs">© {new Date().getFullYear()} The Meaterie</span>
            <span className="text-gray-500 text-xs">
              <a
                href="https://www.mondenkuna.co.za"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Made by M.Nkuna
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}

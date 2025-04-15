import Image from "next/image"
import { Facebook, Instagram } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Image src="/themeateriewhite.png" alt="The Meaterie" width={180} height={90} className="h-16 w-auto" />
            <p className="mt-2 text-gray-400 max-w-md">Authentic braied kasi meat made in the heart of Soweto.</p>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <div className="flex space-x-6 mb-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Facebook">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Instagram">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="X">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z"
                    fill="currentColor"
                  />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="TikTok">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M16.6 5.82s.51.5 0 0A4.278 4.278 0 0 1 19.25 5a4.25 4.25 0 0 1-2.65 4.32v2.1A8.32 8.32 0 0 0 12 10c-4.418 0-8 3.582-8 8v1c0 .552.448 1 1 1h1c0-3.866 3.134-7 7-7a6.5 6.5 0 0 1 4 1.38v5.7a1 1 0 0 0 1 .92h2a1 1 0 0 0 1-1V6.72a1 1 0 0 0-.9-.99h-2.07a1 1 0 0 0-.93.99v.1Z"
                    fill="currentColor"
                  />
                </svg>
              </a>
            </div>
            <p className="text-gray-400 text-sm">© {new Date().getFullYear()} The Meaterie. All rights reserved.</p>
            <p className="text-gray-500 text-sm mt-1">
              Designed by{" "}
              <a
                href="https://www.mondenkuna.co.za"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                M.Nkuna
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

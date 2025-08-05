export default function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-gray-950 mt-auto"> 
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-gray-400"> 
            © 2025 My Movie List. สร้างด้วย ❤️ สำหรับคนรักหนัง
          </div>

          <div className="flex items-center space-x-4 text-sm text-gray-400"> 
            <span>ข้อมูลหนังจาก</span>
            <a
              href="https://www.themoviedb.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-red-500 transition-colors" 
            >
              The Movie Database (TMDB)
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

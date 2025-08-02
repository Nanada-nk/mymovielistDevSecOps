export default function Footer() {
  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-muted-foreground">
            © 2025 My Movie List. สร้างด้วย ❤️ สำหรับคนรักหนัง
          </div>

          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <span>ข้อมูลหนังจาก</span>
            <a
              href="https://www.themoviedb.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              The Movie Database (TMDB)
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

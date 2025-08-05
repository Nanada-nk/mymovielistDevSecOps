import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Search } from "lucide-react";
import { tmdbApi } from "../api/tmdbApi";
import MovieCard from "../components/MovieCard";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const [allInitialMovies, setAllInitialMovies] = useState([]);
  const [initialDisplayCount, setInitialDisplayCount] = useState(10);
  const MOVIES_PER_LOAD = 12;

  const searchMovies = async (searchQuery = query, pageNum = 1) => {
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      console.log("Searching for:", searchQuery, "Page:", pageNum); 
      console.log("About to call tmdbApi.searchMovies..."); 

      const response = await tmdbApi.searchMovies(searchQuery, pageNum);
      console.log("Search response:", response);

   
      if (!response) {
        console.error("No response from API");
        throw new Error("No response from API");
      }

    
      let responseData;
      let resultsArray;

      if (Array.isArray(response)) {
        resultsArray = response;
        responseData = {
          results: response,
          total_pages: 1,
          total_results: response.length,
          page: pageNum,
        };
      } else if (response.data && response.data.results) {
        responseData = response.data;
        resultsArray = response.data.results;
      } else if (response.results) {
        responseData = response;
        resultsArray = response.results;
      } else {
        responseData = response;
        resultsArray = response.results || [];
      }

      console.log("Response data:", responseData);
      console.log("Results array length:", resultsArray?.length || 0); 

      if (resultsArray && Array.isArray(resultsArray)) {
        if (pageNum === 1) {
          setMovies(resultsArray);
          setHasSearched(true);
        } else {
          setMovies((prev) => [...prev, ...resultsArray]);
        }
        setTotalPages(responseData.total_pages || 1);
        setPage(pageNum);

        
        if (resultsArray.length === 0 && pageNum === 1) {
          console.log("No movies found for query:", searchQuery);
        }
      } else {
        if (pageNum === 1) {
          setMovies([]);
          setHasSearched(true);
        }
        setTotalPages(0);
      }
    } catch (error) {
      console.error("Search failed:", error);
      console.error("Error details:", error.response?.data || error.message);
      setError("เกิดข้อผิดพลาดในการค้นหา กรุณาลองใหม่อีกครั้ง");
      if (pageNum === 1) {
        setMovies([]);
        setTotalPages(0);
        setHasSearched(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchInitialMovies = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await tmdbApi.getAllMovies();
        let fetchedMovies = response.data.results || [];

        
        fetchedMovies.sort((a, b) => a.id - b.id);

        setAllInitialMovies(fetchedMovies); 
        setInitialDisplayCount(MOVIES_PER_LOAD); 
      } catch (err) {
        console.error("Failed to fetch initial movies:", err);
        setError("ไม่สามารถโหลดหนังเริ่มต้นได้");
        setAllInitialMovies([]);
        setInitialDisplayCount(0);
      } finally {
        setIsLoading(false);
      }
    };

    if (!hasSearched && !query.trim()) {
      fetchInitialMovies();
    }
  }, [hasSearched, query]);


  const loadMoreInitialMovies = () => {
    setInitialDisplayCount(prevCount => prevCount + MOVIES_PER_LOAD);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    searchMovies(query, 1);
  };

  const loadMore = () => {
    if (page < totalPages) {
      searchMovies(query, page + 1);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>ค้นหาหนัง</CardTitle>
          <CardDescription>ค้นหาหนังจากฐานข้อมูล TMDB</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="ค้นหาชื่อหนัง..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "กำลังค้นหา..." : "ค้นหา"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="text-center text-red-600">
              <p>{error}</p>
            </div>
          </CardContent>
        </Card>
      )}

     
      {!error && hasSearched && movies.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">ผลการค้นหา</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>

          {page < totalPages && (
            <div className="text-center">
              <Button onClick={loadMore} variant="outline" disabled={isLoading}>
                {isLoading ? "กำลังโหลด..." : "โหลดเพิ่มเติม"}
              </Button>
            </div>
          )}
        </div>
      )}

  
      {!error && hasSearched && movies.length === 0 && (
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-lg font-semibold mb-2">ไม่พบหนังที่ค้นหา</h3>
            <p className="text-muted-foreground mb-4">
              ลองใช้คำค้นหาอื่น หรือตรวจสอบการสะกดให้ถูกต้อง
            </p>
          </CardContent>
        </Card>
      )}

     
      {!hasSearched && !isLoading && allInitialMovies.length > 0 && (
        <div className="space-y-4">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">หนังเริ่มต้น</CardTitle>
            <CardDescription className="text-muted-foreground">
              หนังที่คุณอาจสนใจจาก TMDB
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
           
              {allInitialMovies.slice(0, initialDisplayCount).map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>

            
            {initialDisplayCount < allInitialMovies.length && (
              <div className="text-center mt-4">
                <Button onClick={loadMoreInitialMovies} variant="outline" disabled={isLoading}>
                  {isLoading ? "กำลังโหลด..." : "โหลดเพิ่มเติม"}
                </Button>
              </div>
            )}
          </CardContent>
        </div>
      )}

     
      {!hasSearched && !isLoading && allInitialMovies.length === 0 && !error && (
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-6xl mb-4">🎬</div>
            <h3 className="text-lg font-semibold mb-2">ค้นหาหนังที่คุณสนใจ</h3>
            <p className="text-muted-foreground">
              พิมพ์ชื่อหนังในช่องค้นหาด้านบนเพื่อเริ่มต้น
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}




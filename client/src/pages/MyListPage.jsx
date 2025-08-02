// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Input } from "@/components/ui/input";
// import { Search } from "lucide-react";
// import { movieApi } from "../api/movieApi";
// import MovieCard from "../components/MovieCard";

// export default function MyListPage() {
//   const [movies, setMovies] = useState([]);
//   const [filteredMovies, setFilteredMovies] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [activeTab, setActiveTab] = useState("all");
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchMovies = async () => {
//       try {
//         const data = await movieApi.getUserMovies();
//         setMovies(data);
//         setFilteredMovies(data);
//       } catch (error) {
//         console.error("Failed to fetch movies:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchMovies();
//   }, []);

//   useEffect(() => {
//     let filtered = movies;

//     // Filter by status
//     if (activeTab !== "all") {
//       filtered = filtered.filter(
//         (movie) => movie.status === activeTab.toUpperCase()
//       );
//     }

//     // Filter by search query
//     if (searchQuery) {
//       filtered = filtered.filter((movie) =>
//         movie.title.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }

//     setFilteredMovies(filtered);
//   }, [movies, activeTab, searchQuery]);

//   const getStatusCount = (status) => {
//     if (status === "all") return movies.length;
//     return movies.filter((movie) => movie.status === status.toUpperCase())
//       .length;
//   };

//   if (isLoading) {
//     return <div className="text-center">กำลังโหลด...</div>;
//   }

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-3xl font-bold">รายการหนังของฉัน</h1>
//         <p className="text-muted-foreground">
//           จัดการและดูหนังทั้งหมดในรายการของคุณ
//         </p>
//       </div>

//       {/* Search */}
//       <Card>
//         <CardContent className="pt-6">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//             <Input
//               placeholder="ค้นหาหนังในรายการ..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="pl-10"
//             />
//           </div>
//         </CardContent>
//       </Card>

//       {/* Tabs */}
//       <Tabs value={activeTab} onValueChange={setActiveTab}>
//         <TabsList className="grid w-full grid-cols-4">
//           <TabsTrigger value="all">
//             ทั้งหมด ({getStatusCount("all")})
//           </TabsTrigger>
//           <TabsTrigger value="liked">
//             ชอบ ({getStatusCount("liked")})
//           </TabsTrigger>
//           <TabsTrigger value="disliked">
//             ไม่ชอบ ({getStatusCount("disliked")})
//           </TabsTrigger>
//           <TabsTrigger value="watch_later">
//             ดูภายหลัง ({getStatusCount("watch_later")})
//           </TabsTrigger>
//         </TabsList>

//         <TabsContent value={activeTab} className="mt-6">
//           {filteredMovies.length === 0 ? (
//             <Card>
//               <CardContent className="pt-6 text-center">
//                 <p className="text-muted-foreground mb-4">
//                   {searchQuery
//                     ? "ไม่พบหนังที่ค้นหา"
//                     : activeTab === "all"
//                     ? "ยังไม่มีหนังในรายการ"
//                     : `ไม่มีหนังในหมวด ${
//                         activeTab === "liked"
//                           ? "ชอบ"
//                           : activeTab === "disliked"
//                           ? "ไม่ชอบ"
//                           : "ดูภายหลัง"
//                       }`}
//                 </p>
//                 {!searchQuery && activeTab === "all" && (
//                   <Button asChild>
//                     <a href="/search">เริ่มค้นหาหนัง</a>
//                   </Button>
//                 )}
//               </CardContent>
//             </Card>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//               {filteredMovies.map((movie) => (
//                 <MovieCard
//                   key={movie.id}
//                   movie={movie}
//                   showStatus={true}
//                   onStatusChange={() => {
//                     // Refresh the list after status change
//                     window.location.reload();
//                   }}
//                 />
//               ))}
//             </div>
//           )}
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// }




import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; 
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { movieApi } from "../api/movieApi.js";
import MovieCard from "../components/MovieCard.jsx";

export default function MyListPage() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all"); 
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMovies = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await movieApi.getUserMovies();
      setMovies(response.data);
    } catch (err) {
      console.error("Failed to fetch movies:", err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  
  useEffect(() => {
    let currentFiltered = movies;

    
    if (activeTab === "liked") {
      currentFiltered = currentFiltered.filter((movie) => movie.status === "LIKED");
    } else if (activeTab === "disliked") {
      currentFiltered = currentFiltered.filter((movie) => movie.status === "DISLIKED");
    } else if (activeTab === "watch_later") {
    
      currentFiltered = currentFiltered.filter((movie) => movie.isWatchLater === true);
    }

    if (searchQuery) {
      currentFiltered = currentFiltered.filter((movie) =>
        movie.title && movie.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredMovies(currentFiltered);
  }, [movies, activeTab, searchQuery]); 

  const getStatusCount = (statusTab) => {

    if (!movies || !Array.isArray(movies)) {
      return 0;
    }

    if (statusTab === "all") return movies.length;
    if (statusTab === "liked") {
      return movies.filter((movie) => movie.status === "LIKED").length;
    }
    if (statusTab === "disliked") {
      return movies.filter((movie) => movie.status === "DISLIKED").length;
    }
    if (statusTab === "watch_later") {
 
      return movies.filter((movie) => movie.isWatchLater === true).length;
    }
    return 0;
  };

  if (isLoading) {
    return <div className="text-center">กำลังโหลด...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">เกิดข้อผิดพลาดในการโหลดข้อมูล: {error.message}</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">รายการหนังของฉัน</h1>
        <p className="text-muted-foreground">
          จัดการและดูหนังทั้งหมดในรายการของคุณ
        </p>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="ค้นหาหนังในรายการ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* *** Tabs *** */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">
            ทั้งหมด ({getStatusCount("all")})
          </TabsTrigger>
          <TabsTrigger value="liked">
            ชอบ ({getStatusCount("liked")})
          </TabsTrigger>
          <TabsTrigger value="disliked">
            ไม่ชอบ ({getStatusCount("disliked")})
          </TabsTrigger>
          <TabsTrigger value="watch_later">
            ดูภายหลัง ({getStatusCount("watch_later")})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          {Array.isArray(filteredMovies) && filteredMovies.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="text-muted-foreground mb-4">
                  {searchQuery
                    ? "ไม่พบหนังที่ค้นหา"
                    : activeTab === "all"
                      ? "ยังไม่มีหนังในรายการ"
                      : `ไม่มีหนังในหมวด ${activeTab === "liked"
                        ? "ชอบ"
                        : activeTab === "disliked"
                          ? "ไม่ชอบ"
                          : "ดูภายหลัง"
                      }`}
                </p>
                {!searchQuery && activeTab === "all" && ( 
                  <Button asChild>
                    <a href="/search">เริ่มค้นหาหนัง</a>
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Array.isArray(filteredMovies) && filteredMovies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  showStatus={true}
                  onStatusChange={fetchMovies} 
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

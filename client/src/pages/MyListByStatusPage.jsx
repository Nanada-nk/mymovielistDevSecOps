// import { useState, useEffect } from "react";
// import { useParams, Link } from "react-router";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { ArrowLeft } from "lucide-react";
// import { movieApi } from "../api/movieApi";
// import MovieCard from "../components/MovieCard";

// export default function MyListByStatusPage() {
//   const { status } = useParams();
//   const [movies, setMovies] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   const statusConfig = {
//     liked: {
//       title: "หนังที่ชอบ",
//       emoji: "👍",
//       description: "หนังที่คุณให้คะแนนชอบ",
//     },
//     disliked: {
//       title: "หนังที่ไม่ชอบ",
//       emoji: "👎",
//       description: "หนังที่คุณให้คะแนนไม่ชอบ",
//     },
//     watch_later: {
//       title: "ดูภายหลัง",
//       emoji: "📚",
//       description: "หนังที่คุณบันทึกไว้เพื่อดูภายหลัง",
//     },
//   };

//   const currentConfig = statusConfig[status] || statusConfig.liked;

//   useEffect(() => {
//     const fetchMovies = async () => {
//       try {
//         const data = await movieApi.getUserMoviesByStatus(status.toUpperCase());
//         setMovies(data);
//       } catch (error) {
//         console.error("Failed to fetch movies:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     if (status && statusConfig[status]) {
//       fetchMovies();
//     }
//   }, [status]);

//   if (!statusConfig[status]) {
//     return (
//       <div className="text-center">
//         <h1 className="text-2xl font-bold mb-4">หน้าไม่พบ</h1>
//         <Button asChild>
//           <Link to="/my-list">กลับไปรายการหนัง</Link>
//         </Button>
//       </div>
//     );
//   }

//   if (isLoading) {
//     return <div className="text-center">กำลังโหลด...</div>;
//   }

//   return (
//     <div className="space-y-6">
//       <Button asChild variant="ghost">
//         <Link to="/my-list">
//           <ArrowLeft className="mr-2 h-4 w-4" />
//           กลับไปรายการหนัง
//         </Link>
//       </Button>

//       <div className="flex items-center gap-3">
//         <span className="text-4xl">{currentConfig.emoji}</span>
//         <div>
//           <h1 className="text-3xl font-bold">{currentConfig.title}</h1>
//           <p className="text-muted-foreground">{currentConfig.description}</p>
//         </div>
//       </div>

//       {movies.length === 0 ? (
//         <Card>
//           <CardContent className="pt-6 text-center">
//             <div className="text-6xl mb-4">{currentConfig.emoji}</div>
//             <h3 className="text-lg font-semibold mb-2">
//               ยังไม่มีหนังในหมวด {currentConfig.title}
//             </h3>
//             <p className="text-muted-foreground mb-4">
//               เริ่มค้นหาและเพิ่มหนังในรายการของคุณ
//             </p>
//             <Button asChild>
//               <Link to="/search">ค้นหาหนัง</Link>
//             </Button>
//           </CardContent>
//         </Card>
//       ) : (
//         <>
//           <div className="flex items-center justify-between">
//             <p className="text-muted-foreground">พบ {movies.length} เรื่อง</p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//             {movies.map((movie) => (
//               <MovieCard
//                 key={movie.id}
//                 movie={movie}
//                 showStatus={true}
//                 onStatusChange={() => {
//                   // Remove from current list if status changed
//                   setMovies((prev) => prev.filter((m) => m.id !== movie.id));
//                 }}
//               />
//             ))}
//           </div>
//         </>
//       )}
//     </div>
//   );
// }


import { useState, useEffect, useCallback } from "react"; // เพิ่ม useCallback
import { useParams, Link } from "react-router"; // <<<< เปลี่ยนเป็น react-router-dom
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { movieApi } from "../api/movieApi";
import MovieCard from "../components/MovieCard";

export default function MyListByStatusPage() {
  const { status } = useParams(); // ดึง status จาก URL parameters
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null); // เพิ่ม state สำหรับ error

  const statusConfig = {
    liked: {
      title: "หนังที่ชอบ",
      emoji: "👍",
      description: "หนังที่คุณให้คะแนนชอบ",
      apiStatus: "LIKED", // <<<< เพิ่ม: ค่าสถานะสำหรับ API
    },
    disliked: {
      title: "หนังที่ไม่ชอบ",
      emoji: "👎",
      description: "หนังที่คุณให้คะแนนไม่ชอบ",
      apiStatus: "DISLIKED", // <<<< เพิ่ม: ค่าสถานะสำหรับ API
    },
    watch_later: {
      title: "ดูภายหลัง",
      emoji: "📚",
      description: "หนังที่คุณบันทึกไว้เพื่อดูภายหลัง",
      apiStatus: "WATCH_LATER_BOOLEAN", // <<<< เพิ่ม: ค่าพิเศษสำหรับ Watch Later
    },
  };

  const currentConfig = statusConfig[status] || statusConfig.liked;

  const fetchMoviesByStatus = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      let response;
      if (currentConfig.apiStatus === "WATCH_LATER_BOOLEAN") {
        // <<<< Logic พิเศษสำหรับ Watch Later
        // movieApi.getUserMoviesByStatus อาจจะต้องรับ param ที่บอกว่า filter ด้วย isWatchLater
        // หรือสร้าง API endpoint ใหม่สำหรับ isWatchLater โดยเฉพาะ
        // แต่ตอนนี้เราจะใช้ getUserMovies() แล้ว filter ที่ frontend
        // เนื่องจาก backend endpoint /my-list?status=WATCH_LATER ไม่มีแล้ว
        response = await movieApi.getUserMovies(); // <<<< ดึงหนังทั้งหมดมาก่อน
        const filteredData = response.data.filter(movie => movie.isWatchLater === true);
        setMovies(filteredData);
      } else {
        // สำหรับ LIKED หรือ DISLIKED
        response = await movieApi.getUserMoviesByStatus(currentConfig.apiStatus);
        setMovies(response.data); // <<<< แก้ไขตรงนี้: ต้องเข้าถึง response.data
      }
    } catch (err) {
      console.error(`Failed to fetch movies for status ${status}:`, err);
      setError(err);
      setMovies([]); // ตั้งเป็น array ว่างถ้ามี error เพื่อป้องกัน crash
    } finally {
      setIsLoading(false);
    }
  }, [status, currentConfig.apiStatus]); // Dependency array: currentConfig.apiStatus ก็ควรอยู่ในนี้

  useEffect(() => {
    if (status && statusConfig[status]) {
      fetchMoviesByStatus();
    }
  }, []); // เพิ่ม statusConfig ใน dependency

  // เพิ่มการจัดการ Error ถ้า status ที่ส่งมาไม่ถูกต้อง
  if (!statusConfig[status]) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">หน้าไม่พบ</h1>
        <p className="text-muted-foreground mb-4">
          หมวดหมู่ '{status}' ไม่ถูกต้อง โปรดตรวจสอบ URL
        </p>
        <Button asChild>
          <Link to="/my-list">กลับไปรายการหนังทั้งหมด</Link>
        </Button>
      </div>
    );
  }

  if (isLoading) {
    return <div className="text-center">กำลังโหลด...</div>;
  }

  return (
    <div className="space-y-6">
      <Button asChild variant="ghost">
        <Link to="/my-list">
          <ArrowLeft className="mr-2 h-4 w-4" />
          กลับไปรายการหนัง
        </Link>
      </Button>

      <div className="flex items-center gap-3">
        <span className="text-4xl">{currentConfig.emoji}</span>
        <div>
          <h1 className="text-3xl font-bold">{currentConfig.title}</h1>
          <p className="text-muted-foreground">{currentConfig.description}</p>
        </div>
      </div>

      {Array.isArray(movies) && movies.length === 0 ? ( // <<<< ตรวจสอบ Array.isArray
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-6xl mb-4">{currentConfig.emoji}</div>
            <h3 className="text-lg font-semibold mb-2">
              ยังไม่มีหนังในหมวด {currentConfig.title}
            </h3>
            <p className="text-muted-foreground mb-4">
              เริ่มค้นหาและเพิ่มหนังในรายการของคุณ
            </p>
            <Button asChild>
              <Link to="/search">ค้นหาหนัง</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">พบ {movies.length} เรื่อง</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* <<<< ตรวจสอบ Array.isArray อีกครั้งก่อน map */}
            {Array.isArray(movies) && movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                showStatus={true}
                onStatusChange={fetchMoviesByStatus} // <<<< เรียกฟังก์ชัน fetch เพื่อโหลดข้อมูลใหม่
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

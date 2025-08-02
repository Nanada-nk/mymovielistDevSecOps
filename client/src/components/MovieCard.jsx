// import { useState } from "react";
// import { Link } from "react-router";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardFooter } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Star, Calendar, Heart, ThumbsDown, BookmarkPlus } from "lucide-react";
// import { useUserStore } from "../stores/useUserStore";
// import { movieApi } from "../api/movieApi";

// export default function MovieCard({
//   movie,
//   showStatus = false,
//   onStatusChange,
// }) {
//   const { isAuthenticated } = useUserStore();
//   const [isLoading, setIsLoading] = useState(false);
//   const [currentStatus, setCurrentStatus] = useState(movie.status);

//   const posterUrl = movie.poster_path
//     ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
//     : movie.poster_url || "/placeholder-movie.jpg";

//   const handleStatusChange = async (newStatus) => {
//     if (!isAuthenticated) return;

//     setIsLoading(true);
//     try {
//       if (currentStatus === newStatus) {
//         // Remove from list if clicking the same status
//         await movieApi.removeFromList(movie.id);
//         setCurrentStatus(null);
//       } else {
//         // Add or update status
//         await movieApi.addToList({
//           tmdb_id: movie.id,
//           title: movie.title,
//           poster_path: movie.poster_path,
//           release_date: movie.release_date,
//           vote_average: movie.vote_average,
//           status: newStatus,
//         });
//         setCurrentStatus(newStatus);
//       }

//       if (onStatusChange) {
//         onStatusChange();
//       }
//     } catch (error) {
//       console.error("Failed to update movie status:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const getStatusBadge = (status) => {
//     switch (status) {
//       case "LIKED":
//         return <Badge className="bg-green-100 text-green-800">👍 ชอบ</Badge>;
//       case "DISLIKED":
//         return <Badge className="bg-red-100 text-red-800">👎 ไม่ชอบ</Badge>;
//       case "WATCH_LATER":
//         return (
//           <Badge className="bg-blue-100 text-blue-800">📚 ดูภายหลัง</Badge>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <Card className="overflow-hidden">
//       <div className="aspect-[2/3] relative">
//         <img
//           src={posterUrl}
//           alt={movie.title}
//           className="w-full h-full object-cover"
//         />
//         {showStatus && currentStatus && (
//           <div className="absolute top-2 right-2">
//             {getStatusBadge(currentStatus)}
//           </div>
//         )}
//       </div>

//       <CardContent className="p-4">
//         <Link
//           to={`/movie/${movie.id}`}
//           className="block hover:text-primary transition-colors"
//         >
//           <h3 className="font-semibold text-sm line-clamp-2 mb-2">
//             {movie.title}
//           </h3>
//         </Link>

//         <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
//           {movie.vote_average && (
//             <div className="flex items-center gap-1">
//               <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
//               <span>{movie.vote_average.toFixed(1)}</span>
//             </div>
//           )}
//           {movie.release_date && (
//             <div className="flex items-center gap-1">
//               <Calendar className="h-3 w-3" />
//               <span>{new Date(movie.release_date).getFullYear()}</span>
//             </div>
//           )}
//         </div>
//       </CardContent>

//       {isAuthenticated && (
//         <CardFooter className="p-4 pt-0">
//           <div className="flex gap-1 w-full">
//             <Button
//               size="sm"
//               variant={currentStatus === "LIKED" ? "default" : "outline"}
//               onClick={() => handleStatusChange("LIKED")}
//               disabled={isLoading}
//               className="flex-1"
//             >
//               <Heart className="h-3 w-3" />
//             </Button>
//             <Button
//               size="sm"
//               variant={currentStatus === "DISLIKED" ? "destructive" : "outline"}
//               onClick={() => handleStatusChange("DISLIKED")}
//               disabled={isLoading}
//               className="flex-1"
//             >
//               <ThumbsDown className="h-3 w-3" />
//             </Button>
//             <Button
//               size="sm"
//               variant={currentStatus === "WATCH_LATER" ? "default" : "outline"}
//               onClick={() => handleStatusChange("WATCH_LATER")}
//               disabled={isLoading}
//               className="flex-1"
//             >
//               <BookmarkPlus className="h-3 w-3" />
//             </Button>
//           </div>
//         </CardFooter>
//       )}
//     </Card>
//   );
// }


import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Calendar, Heart, ThumbsDown, BookmarkPlus } from "lucide-react";
import { useUserStore } from "../stores/useUserStore.js";
import { movieApi } from "../api/movieApi.js";

export default function MovieCard({
  movie,
  showStatus = false,
  onStatusChange,
}) {
  const { user, isAuthenticated } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);
  const [currentLikeDislikeStatus, setCurrentLikeDislikeStatus] = useState(movie.status || null);
  const [isMovieWatchLater, setIsMovieWatchLater] = useState(movie.isWatchLater || false);

  useEffect(() => {
    setCurrentLikeDislikeStatus(movie.status || null);
    setIsMovieWatchLater(movie.isWatchLater || false);
  }, [movie.status, movie.isWatchLater]);


  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
    : movie.poster_url || "/placeholder-movie.jpg";

  const handleStatusChange = async (type, value) => {
    if (!isAuthenticated || !user || !user.id) {
      console.error("User not authenticated or User ID not available.");
      return;
    }

    setIsLoading(true);
    try {
      let payloadStatus = currentLikeDislikeStatus;
      let payloadIsWatchLater = isMovieWatchLater;

      if (type === 'LIKED_DISLIKED') {
        if (currentLikeDislikeStatus === value) {
          payloadStatus = null;
        } else {
          payloadStatus = value;
        }
      } else if (type === 'WATCH_LATER') {
        payloadIsWatchLater = !isMovieWatchLater;
      }

      const requestPayload = {
        userId: user.id,
        movieId: movie.id,
        title: movie.title,
        posterUrl: posterUrl,
        voteAverage: movie.vote_average,
        releaseDate: movie.release_date,
        status: payloadStatus,
        isWatchLater: payloadIsWatchLater,
      };

      console.log("Sending payload:", requestPayload); // ตรวจสอบ payload ก่อนส่ง

      await movieApi.addToList(requestPayload);

      setCurrentLikeDislikeStatus(payloadStatus);
      setIsMovieWatchLater(payloadIsWatchLater);

      if (onStatusChange) {
        onStatusChange();
      }
    } catch (error) {
      console.error("Failed to update movie status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = (status, isWatchLater) => {
    const badges = [];
    if (status === "LIKED") {
        badges.push(<Badge key="liked" className="bg-green-100 text-green-800">👍 ชอบ</Badge>);
    } else if (status === "DISLIKED") {
        badges.push(<Badge key="disliked" className="bg-red-100 text-red-800">👎 ไม่ชอบ</Badge>);
    }
    if (isWatchLater) {
        badges.push(<Badge key="watchlater" className="bg-blue-100 text-blue-800">📚 ดูภายหลัง</Badge>);
    }
    return <div className="flex gap-1">{badges}</div>;
  };

  return (
    <Card className="overflow-hidden">
      <div className="aspect-[2/3] relative">
        <img
          src={posterUrl}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        {showStatus && (currentLikeDislikeStatus || isMovieWatchLater) && (
          <div className="absolute top-2 right-2">
            {getStatusBadge(currentLikeDislikeStatus, isMovieWatchLater)}
          </div>
        )}
      </div>

      <CardContent className="p-4">
        <Link
          to={`/movie/${movie.id}`}
          className="block hover:text-primary transition-colors"
        >
          <h3 className="font-semibold text-sm line-clamp-2 mb-2">
            {movie.title}
          </h3>
        </Link>

        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
          {movie.vote_average && (
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span>{movie.vote_average.toFixed(1)}</span>
            </div>
          )}
          {movie.release_date && (
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{new Date(movie.release_date).getFullYear()}</span>
            </div>
          )}
        </div>
      </CardContent>

      {isAuthenticated && (
        <CardFooter className="p-4 pt-0">
          <div className="flex gap-1 w-full">
            <Button
              size="sm"
              variant={currentLikeDislikeStatus === "LIKED" ? "default" : "outline"}
              onClick={() => handleStatusChange("LIKED_DISLIKED", "LIKED")}
              disabled={isLoading}
              className="flex-1"
            >
              <Heart className="h-3 w-3" />
            </Button>
            <Button
              size="sm"
              variant={currentLikeDislikeStatus === "DISLIKED" ? "destructive" : "outline"}
              onClick={() => handleStatusChange("LIKED_DISLIKED", "DISLIKED")}
              disabled={isLoading}
              className="flex-1"
            >
              <ThumbsDown className="h-3 w-3" />
            </Button>
            <Button
              size="sm"
              variant={isMovieWatchLater ? "default" : "outline"}
              onClick={() => handleStatusChange("WATCH_LATER")}
              disabled={isLoading}
              className="flex-1"
            >
              <BookmarkPlus className="h-3 w-3" />
            </Button>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
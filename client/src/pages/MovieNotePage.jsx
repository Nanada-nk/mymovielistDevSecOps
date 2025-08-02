import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Save } from "lucide-react";
import { tmdbApi } from "../api/tmdbApi";
import { movieApi } from "../api/movieApi";

export default function MovieNotePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [note, setNote] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [existingNote, setExistingNote] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [movieData, noteData] = await Promise.all([
          tmdbApi.getMovieDetails(id),
          movieApi.getMovieNote(id).catch(() => null), // Note might not exist
        ]);

        setMovie(movieData);
        if (noteData) {
          setExistingNote(noteData);
          setNote(noteData.content);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleSave = async () => {
    if (!note.trim()) {
      alert("กรุณาเขียนโน้ตก่อนบันทึก");
      return;
    }

    setIsSaving(true);
    try {
      if (existingNote) {
        await movieApi.updateMovieNote(existingNote.id, { content: note });
      } else {
        await movieApi.createMovieNote({
          movie_id: id,
          content: note,
        });
      }

      alert("บันทึกโน้ตเรียบร้อยแล้ว");
      navigate(`/movie/${id}`);
    } catch (error) {
      console.error("Failed to save note:", error);
      alert("เกิดข้อผิดพลาดในการบันทึก");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="text-center">กำลังโหลด...</div>;
  }

  if (!movie) {
    return <div className="text-center">ไม่พบข้อมูลหนัง</div>;
  }

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
    : "/placeholder-movie.jpg";

  return (
    <div className="space-y-6">
      <Button asChild variant="ghost">
        <Link to={`/movie/${id}`}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          กลับไปหน้าหนัง
        </Link>
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Movie Info */}
        <div className="md:col-span-1">
          <Card>
            <CardContent className="pt-6">
              <img
                src={posterUrl}
                alt={movie.title}
                className="w-full rounded-lg mb-4"
              />
              <h3 className="font-semibold text-lg mb-2">{movie.title}</h3>
              <p className="text-sm text-muted-foreground">
                {new Date(movie.release_date).getFullYear()}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Note Editor */}
        <div className="md:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                📝 {existingNote ? "แก้ไขโน้ต" : "เขียนโน้ตใหม่"}
              </CardTitle>
              <CardDescription>
                เขียนความคิดเห็น บทวิจารณ์ หรือโน้ตส่วนตัวเกี่ยวกับหนังเรื่องนี้
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="note">เนื้อหาโน้ต</Label>
                <Textarea
                  id="note"
                  placeholder="เขียนโน้ตของคุณที่นี่..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={15}
                  className="mt-2"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  {note.length} ตัวอักษร
                </p>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={handleSave}
                  disabled={isSaving || !note.trim()}
                  className="flex items-center gap-2"
                >
                  <Save className="h-4 w-4" />
                  {isSaving ? "กำลังบันทึก..." : "บันทึกโน้ต"}
                </Button>

                <Button asChild variant="outline">
                  <Link to={`/movie/${id}`}>ยกเลิก</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Tips */}
          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="text-base">
                💡 เคล็ดลับการเขียนโน้ต
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• เขียนความรู้สึกแรกหลังดูหนัง</li>
                <li>• บันทึกฉากหรือเนื้อหาที่ประทับใจ</li>
                <li>• เปรียบเทียบกับหนังเรื่องอื่น</li>
                <li>• บันทึกคะแนนที่ให้และเหตุผล</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

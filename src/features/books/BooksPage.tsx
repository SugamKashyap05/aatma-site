import { useState } from "react";
import { BookOpen } from "lucide-react";
import { BookLibrary } from "./BookLibrary";
import { BookReader } from "./BookReader";
import type { Book } from "@/data/books";
import PageLayout from "@/components/ui/PageLayout";
import { useDevice } from "@/context/DeviceContext";

export function BooksPage() {
  const [activeBook, setActiveBook] = useState<Book | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const { tier } = useDevice();

  const handleRead = (b: Book) => {
    setActiveBook(b);
    window.scrollTo({ top: 0 });
  };

  const handleDownload = (b: Book) => {
    setDownloadingId(b.id);
    const url = b.externalDownloadUrl || b.filePath;
    const a = document.createElement("a");
    a.href = url;
    a.download = url.split("/").pop() || `${b.slug}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    // Reset the "Preparing download…" state after a short delay
    setTimeout(() => setDownloadingId(null), 1500);
  };

  // Reader view
  if (activeBook) {
    return <BookReader book={activeBook} onBack={() => setActiveBook(null)} />;
  }

  // Library view
  return (
    <PageLayout
      badge="Digital Library"
      badgeIcon={<BookOpen size={14} />}
      title={
        <>
          AATMA <span className="text-gold">Publications</span>
        </>
      }
      subtitle="Research, history, and policy documents from the association's work."
    >
      <div className="py-20 md:py-28">
        <BookLibrary
          onRead={handleRead}
          onDownload={handleDownload}
          downloadingId={downloadingId}
          showHeader={false}
        />
      </div>
    </PageLayout>
  );
}

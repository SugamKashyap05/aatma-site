import { useState } from "react";
import { BookLibrary } from "./BookLibrary";
import { BookReader } from "./BookReader";
import type { Book } from "@/data/books";
import { AmbientMotion } from "@/features/ambient/AmbientMotion";

export function BooksPage() {
  const [activeBook, setActiveBook] = useState<Book | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

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
    <section className="relative min-h-screen py-20 md:py-28 overflow-hidden" role="main" aria-label="Book library">
      <AmbientMotion variant="fog" theme="green" layers={2} speed={50} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(201,168,76,0.08)_0%,rgba(0,0,0,0)_55%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <BookLibrary onRead={handleRead} onDownload={handleDownload} downloadingId={downloadingId} />
      </div>
    </section>
  );
}

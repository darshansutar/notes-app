import Header from '../components/Header';
import Footer from '../components/Footer';
import FolderManager from '../components/FolderManager';

export default function Folders() {
  return (
    <div className="flex flex-col min-h-screen font-[family-name:var(--font-geist-sans)]">
      <Header />
      <main className="flex-grow bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
        <FolderManager />
      </main>
      <Footer />
    </div>
  );
}
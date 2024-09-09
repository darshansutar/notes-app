import Header from "./components/Header";
import Footer from "./components/Footer";
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen font-[family-name:var(--font-geist-sans)]">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center p-4 sm:p-8 bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
        <div className="max-w-3xl w-full bg-white rounded-lg shadow-2xl p-4 sm:p-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 text-center text-gray-800">Welcome to Your Note App</h1>
          <p className="text-lg sm:text-xl text-center mb-6 sm:mb-8 text-gray-600">
            Capture your thoughts, organize your ideas, and boost your productivity.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              className="rounded-full bg-purple-600 text-white px-6 py-3 text-lg font-medium hover:bg-purple-700 transition duration-300 ease-in-out transform hover:scale-105 text-center"
              href="/notes"
            >
              Create Note
            </Link>
            <Link
              className="rounded-full bg-pink-500 text-white px-6 py-3 text-lg font-medium hover:bg-pink-600 transition duration-300 ease-in-out transform hover:scale-105 text-center"
              href="/folders"
            >
              Manage Folders
            </Link>
          </div>
        </div>
        <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8 w-full max-w-4xl">
          {['Easy to Use', 'Organize', 'Sync'].map((title, index) => (
            <div key={index} className="bg-white p-4 sm:p-6 rounded-lg shadow-lg">
              <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-gray-800">{title}</h2>
              <p className="text-gray-600">
                {index === 0 && "Intuitive interface for seamless note-taking experience."}
                {index === 1 && "Categorize and tag your notes for quick access."}
                {index === 2 && "Access your notes from any device, anytime."}
              </p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

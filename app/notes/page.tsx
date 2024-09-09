'use client';

import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Popup from '../components/Popup';

interface Note {
  id: number;
  title: string;
  content: string;
  folderId: number | null;
}

interface Folder {
  id: number;
  name: string;
  description: string;
}

export default function Notes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState({ title: '', content: '', folderId: null as number | null });
  const [folders, setFolders] = useState<Folder[]>([]);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Fetch folders from localStorage
    const storedFolders = localStorage.getItem('folders');
    if (storedFolders) {
      setFolders(JSON.parse(storedFolders));
    }

    // Fetch notes from localStorage
    const storedNotes = localStorage.getItem('notes');
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewNote({ ...newNote, [name]: name === 'folderId' ? (value ? parseInt(value) : null) : value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newNote.title && newNote.content) {
      const updatedNotes = [{ ...newNote, id: Date.now() }, ...notes];
      setNotes(updatedNotes);
      localStorage.setItem('notes', JSON.stringify(updatedNotes));
      setNewNote({ title: '', content: '', folderId: null });
      setShowPopup(true);
    }
  };

  return (
    <div className="flex flex-col min-h-screen font-[family-name:var(--font-geist-sans)] relative">
      <Header />
      <main className="flex-grow bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 p-4 sm:p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 text-center text-white">Create a New Note</h1>
          
          <form onSubmit={handleSubmit} className="mb-6 sm:mb-8 bg-white rounded-lg shadow-2xl p-4 sm:p-8">
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Note Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={newNote.title}
                onChange={handleInputChange}
                placeholder="Enter note title"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent text-black placeholder-gray-400"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">Note Content</label>
              <textarea
                id="content"
                name="content"
                value={newNote.content}
                onChange={handleInputChange}
                placeholder="Enter note content"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent text-black placeholder-gray-400"
                rows={6}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="folderId" className="block text-sm font-medium text-gray-700 mb-1">Select Folder</label>
              <select
                id="folderId"
                name="folderId"
                value={newNote.folderId || ''}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent text-black"
              >
                <option value="">No Folder</option>
                {folders.map(folder => (
                  <option key={folder.id} value={folder.id}>{folder.name}</option>
                ))}
              </select>
            </div>
            <button type="submit" className="w-full bg-purple-600 text-white px-6 py-3 rounded-full text-lg font-medium hover:bg-purple-700 transition duration-300 ease-in-out transform hover:scale-105">
              Save Note
            </button>
          </form>
        </div>
      </main>
      <Footer />
      <Popup 
        message="Note saved successfully!" 
        isVisible={showPopup} 
        onClose={() => setShowPopup(false)} 
        type="success"
      />
    </div>
  );
}
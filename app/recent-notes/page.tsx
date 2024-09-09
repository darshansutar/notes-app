'use client';

import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaTrash, FaFolder, FaDownload, FaEdit, FaSave } from 'react-icons/fa';
import jsPDF from 'jspdf';
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

export default function RecentNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [folders, setFolders] = useState<Folder[]>([]);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupType, setPopupType] = useState<'success' | 'delete'>('success');
  const [noteToDelete, setNoteToDelete] = useState<number | null>(null);

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

  const deleteNoteWithoutConfirmation = (id: number) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
  };

  const confirmDeleteNote = (id: number) => {
    setNoteToDelete(id);
    setPopupMessage('Are you sure you want to delete this note?');
    setPopupType('delete');
    setShowPopup(true);
  };

  const deleteNoteAfterConfirmation = () => {
    if (noteToDelete) {
      deleteNoteWithoutConfirmation(noteToDelete);
      setShowPopup(false);
      setNoteToDelete(null);
      setPopupMessage('Note deleted successfully!');
      setPopupType('success');
      setShowPopup(true);
    }
  };

  const downloadNotePDF = (note: Note) => {
    const pdf = new jsPDF();
    
    // Add title
    pdf.setFontSize(18);
    pdf.text(note.title, 20, 20);
    
    // Add content
    pdf.setFontSize(12);
    const splitContent = pdf.splitTextToSize(note.content, 180);
    pdf.text(splitContent, 20, 30);
    
    // Add folder information if available
    if (note.folderId) {
      const folder = folders.find(f => f.id === note.folderId);
      if (folder) {
        pdf.setFontSize(10);
        pdf.text(`Folder: ${folder.name}`, 20, pdf.internal.pageSize.height - 20);
      }
    }
    
    // Save the PDF
    pdf.save(`${note.title}.pdf`);
  };

  const startEditing = (note: Note) => {
    setEditingNote({ ...note });
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditingNote(prev => prev ? { ...prev, [name]: value } : null);
  };

  const saveEdit = () => {
    if (editingNote) {
      const updatedNotes = notes.map(note => 
        note.id === editingNote.id ? editingNote : note
      );
      setNotes(updatedNotes);
      localStorage.setItem('notes', JSON.stringify(updatedNotes));
      setEditingNote(null);
    }
  };

  return (
    <div className="flex flex-col min-h-screen font-[family-name:var(--font-geist-sans)]">
      <Header />
      <main className="flex-grow bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 p-4 sm:p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 text-center text-white">Recent Notes</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {notes.map(note => (
              <div key={note.id} className="bg-white rounded-lg shadow-md p-4 sm:p-6 hover:shadow-lg transition duration-300 relative">
                {editingNote && editingNote.id === note.id ? (
                  <>
                    <input
                      type="text"
                      name="title"
                      value={editingNote.title}
                      onChange={handleEditChange}
                      className="w-full p-2 mb-2 border border-gray-300 rounded-md text-black"
                    />
                    <textarea
                      name="content"
                      value={editingNote.content}
                      onChange={handleEditChange}
                      className="w-full p-2 mb-2 border border-gray-300 rounded-md text-black"
                      rows={4}
                    />
                    <button
                      onClick={saveEdit}
                      className="absolute top-2 right-2 text-green-500 hover:text-green-700 transition duration-300"
                      aria-label="Save changes"
                    >
                      <FaSave />
                    </button>
                  </>
                ) : (
                  <>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{note.title}</h3>
                    <p className="text-gray-600 mb-4">{note.content.substring(0, 100)}...</p>
                    {note.folderId && (
                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <FaFolder className="mr-1" />
                        {folders.find(f => f.id === note.folderId)?.name}
                      </div>
                    )}
                    <div className="absolute top-2 right-2 flex space-x-2">
                      <button
                        onClick={() => startEditing(note)}
                        className="text-blue-500 hover:text-blue-700 transition duration-300"
                        aria-label="Edit note"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => downloadNotePDF(note)}
                        className="text-green-500 hover:text-green-700 transition duration-300"
                        aria-label="Download note as PDF"
                      >
                        <FaDownload />
                      </button>
                      <button
                        onClick={() => confirmDeleteNote(note.id)}
                        className="text-red-500 hover:text-red-700 transition duration-300"
                        aria-label="Delete note"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <Popup 
        message={popupMessage}
        isVisible={showPopup}
        onClose={() => setShowPopup(false)}
        onConfirm={deleteNoteAfterConfirmation}
        type={popupType}
      />
    </div>
  );
}
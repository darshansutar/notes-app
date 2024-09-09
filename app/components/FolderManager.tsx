'use client';

import { useState, useEffect } from 'react';
import { FaFolder, FaTrash, FaEdit, FaPlus, FaSave } from 'react-icons/fa';
import Popup from './Popup';

interface Folder {
  id: number;
  name: string;
  description: string;
}

export default function FolderManager() {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [newFolder, setNewFolder] = useState({ name: '', description: '' });
  const [editingFolder, setEditingFolder] = useState<Folder | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupType, setPopupType] = useState<'success' | 'delete'>('success');
  const [folderToDelete, setFolderToDelete] = useState<number | null>(null);

  useEffect(() => {
    const storedFolders = localStorage.getItem('folders');
    if (storedFolders) {
      setFolders(JSON.parse(storedFolders));
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewFolder({ ...newFolder, [name]: value });
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditingFolder(prev => prev ? { ...prev, [name]: value } : null);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newFolder.name) {
      const updatedFolders = [...folders, { ...newFolder, id: Date.now() }];
      setFolders(updatedFolders);
      localStorage.setItem('folders', JSON.stringify(updatedFolders));
      setNewFolder({ name: '', description: '' });
      setShowPopup(true);
    }
  };

  const confirmDeleteFolder = (id: number) => {
    setFolderToDelete(id);
    setPopupMessage('Are you sure you want to delete this folder?');
    setPopupType('delete');
    setShowPopup(true);
  };

  const deleteFolder = () => {
    if (folderToDelete) {
      const updatedFolders = folders.filter(folder => folder.id !== folderToDelete);
      setFolders(updatedFolders);
      localStorage.setItem('folders', JSON.stringify(updatedFolders));
      setShowPopup(false);
      setFolderToDelete(null);
      setPopupMessage('Folder deleted successfully!');
      setPopupType('success');
      setShowPopup(true);
    }
  };

  const startEditing = (folder: Folder) => {
    setEditingFolder(folder);
  };

  const saveEdit = () => {
    if (editingFolder) {
      const updatedFolders = folders.map(folder => 
        folder.id === editingFolder.id ? editingFolder : folder
      );
      setFolders(updatedFolders);
      localStorage.setItem('folders', JSON.stringify(updatedFolders));
      setEditingFolder(null);
      setShowPopup(true);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-8 relative">
      <h1 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 text-center text-white">Manage Folders</h1>
      
      <form onSubmit={handleSubmit} className="mb-6 sm:mb-8 bg-white rounded-lg shadow-2xl p-4 sm:p-8">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Folder Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={newFolder.name}
            onChange={handleInputChange}
            placeholder="Enter folder name"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent text-black placeholder-gray-400"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            id="description"
            name="description"
            value={newFolder.description}
            onChange={handleInputChange}
            placeholder="Enter folder description"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent text-black placeholder-gray-400"
            rows={3}
          />
        </div>
        <button type="submit" className="w-full bg-purple-600 text-white px-6 py-3 rounded-full text-lg font-medium hover:bg-purple-700 transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center">
          <FaPlus className="mr-2" /> Create Folder
        </button>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        {folders.map(folder => (
          <div key={folder.id} className="bg-white rounded-lg shadow-md p-4 sm:p-6 relative hover:shadow-lg transition duration-300 border border-gray-200">
            {editingFolder && editingFolder.id === folder.id ? (
              <>
                <input
                  type="text"
                  name="name"
                  value={editingFolder.name}
                  onChange={handleEditChange}
                  className="w-full p-2 mb-2 border border-gray-300 rounded-md text-black"
                />
                <textarea
                  name="description"
                  value={editingFolder.description}
                  onChange={handleEditChange}
                  className="w-full p-2 mb-2 border border-gray-300 rounded-md text-black"
                  rows={3}
                />
                <button
                  onClick={saveEdit}
                  className="absolute bottom-2 right-2 text-green-500 hover:text-green-700 transition duration-300"
                  aria-label="Save changes"
                >
                  <FaSave />
                </button>
              </>
            ) : (
              <>
                <FaFolder className="text-4xl text-purple-500 mb-3" />
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{folder.name}</h2>
                <p className="text-gray-600 mb-4">{folder.description}</p>
                <div className="absolute top-2 right-2 flex space-x-2">
                  <button
                    onClick={() => confirmDeleteFolder(folder.id)}
                    className="text-red-500 hover:text-red-700 transition duration-300"
                    aria-label="Delete folder"
                  >
                    <FaTrash />
                  </button>
                  <button
                    onClick={() => startEditing(folder)}
                    className="text-blue-500 hover:text-blue-700 transition duration-300"
                    aria-label="Edit folder"
                  >
                    <FaEdit />
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
      <Popup 
        message={popupMessage}
        isVisible={showPopup}
        onClose={() => setShowPopup(false)}
        onConfirm={deleteFolder}
        type={popupType}
      />
    </div>
  );
}
'use client'

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Hobby {
  id: number;
  name: string;
  pages: string[];
}

const MAX_HOBBIES = 5;
const MIN_HOBBIES = 1;

export default function HobbyEditor() {
  const [hobbyInput, setHobbyInput] = useState('');
  const [pageInput, setPageInput] = useState('');
  const [hobbies, setHobbies] = useState<Hobby[]>([
    { id: 1, name: 'Hobby 1', pages: [] },
  ]);
  const [selectedHobbyId, setSelectedHobbyId] = useState<number>(1);

  const addHobbyFromInput = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hobbyInput.trim() || hobbies.length >= MAX_HOBBIES) return;

    const newId = hobbies[hobbies.length - 1]?.id + 1 || 1;
    const newHobby: Hobby = {
      id: newId,
      name: hobbyInput.trim(),
      pages: [],
    };

    setHobbies([...hobbies, newHobby]);
    setSelectedHobbyId(newId);
    setHobbyInput('');
  };

  const deleteSelectedHobby = () => {
    const filtered = hobbies.filter(h => h.id !== selectedHobbyId);

    if (filtered.length < MIN_HOBBIES) {
      alert(`At least ${MIN_HOBBIES} hobby must remain.`);
      return;
    }

    setHobbies(filtered);
    setSelectedHobbyId(filtered[0].id);
  };

  const addPageToSelectedHobby = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pageInput.trim()) return;

    setHobbies(prev =>
      prev.map(hobby =>
        hobby.id === selectedHobbyId
          ? { ...hobby, pages: [...hobby.pages, pageInput.trim()] }
          : hobby
      )
    );
    setPageInput('');
  };

  const selectedHobby = hobbies.find(h => h.id === selectedHobbyId);

  return (
    <div className="px-10">
      <div className="pt-[1.5vh] pb-[1.5vh]">
        <h1 className="font-bold text-2xl">Hobby Editor</h1>
      </div>

      <div className="grid grid-cols-3 gap-4 relative w-full max-w-full items-start">
        <h3 className="font-bold text-md pb-[1vh] col-span-3">Hobbies</h3>

        <div className="col-span-3 flex flex-wrap gap-2 items-center">
          {hobbies.map(hobby => (
            <button
              key={hobby.id}
              className={`px-4 py-2 rounded border transition-all ${
                hobby.id === selectedHobbyId ? 'bg-blue-200' : 'bg-gray-100'
              }`}
              onClick={() => setSelectedHobbyId(hobby.id)}
            >
              {hobby.name}
            </button>
          ))}
          {hobbies.length > MIN_HOBBIES && (
            <Button
              size="icon"
              variant="destructive"
              onClick={deleteSelectedHobby}
              title="Delete Selected Hobby"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>

        <form onSubmit={addHobbyFromInput} className="col-span-3 mt-4 space-y-2">
          <input
            type="text"
            placeholder="Enter hobby name"
            className="border rounded p-2 w-full"
            value={hobbyInput}
            onChange={(e) => setHobbyInput(e.target.value)}
          />
          <Button type="submit" disabled={hobbies.length >= MAX_HOBBIES}>
            Add Hobby
          </Button>
        </form>
      </div>

      <div className="grid grid-cols-3 gap-4 relative w-full max-w-full items-start pt-[2.5vh]">
        <h3 className="font-bold text-md pb-[1vh] col-span-3">Pages</h3>
        <div className="col-span-3 bg-gray-200 rounded p-4 space-y-4">
          {selectedHobby ? (
            <>
              <div className="flex flex-wrap gap-2">
                {selectedHobby.pages.map((page, idx) => (
                  <div
                    key={idx}
                    className="flex items-center bg-white border px-3 py-1 rounded-md shadow-sm hover:bg-blue-50 cursor-pointer relative"
                  >
                    <button className="mr-2 text-sm">{page}</button>
                    <X
                      className="w-3 h-3 text-red-500 hover:text-red-700 ml-2"
                      onClick={() => {
                        setHobbies(prev =>
                          prev.map(hobby =>
                            hobby.id === selectedHobbyId
                              ? {
                                  ...hobby,
                                  pages: hobby.pages.filter((_, i) => i !== idx),
                                }
                              : hobby
                          )
                        );
                      }}
                    />
                  </div>
                ))}
              </div>
              <form onSubmit={addPageToSelectedHobby} className="flex gap-2 pt-2">
                <input
                  type="text"
                  placeholder="Enter page name"
                  className="border rounded p-2 flex-1"
                  value={pageInput}
                  onChange={(e) => setPageInput(e.target.value)}
                />
                <Button type="submit">
                  Add Page
                </Button>
              </form>
            </>
          ) : (
            <p>Select a hobby to manage its pages.</p>
          )}
        </div>
      </div>
    </div>
  );
}

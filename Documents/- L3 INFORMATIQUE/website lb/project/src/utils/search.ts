import { Perfume } from '../types/perfume';
import { perfumes } from '../data/perfumes';

export const searchPerfumes = (query: string): Perfume[] => {
  const searchTerm = query.toLowerCase().trim();
  
  return perfumes.filter(perfume => {
    const matchesName = perfume.name.toLowerCase().includes(searchTerm);
    const matchesNotes = perfume.notes.some(note => 
      note.toLowerCase().includes(searchTerm)
    );
    const matchesType = perfume.type.toLowerCase().includes(searchTerm);
    
    return matchesName || matchesNotes || matchesType;
  });
};
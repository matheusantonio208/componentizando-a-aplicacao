import { Button } from './Button';
import { GenreResponseProps } from '../App';
import { useEffect, useState } from 'react';
import { api } from '../services/api';

interface SidebarProps {
  onSelectGenreId: (id: number) => void;
  selectedGenreId: number;
}

export function SideBar({ onSelectGenreId, selectedGenreId }: SidebarProps) {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then((response) => {
      setGenres(response.data);
    });
  }, []);

  return (
    <nav className='sidebar'>
      <span>
        Watch<p>Me</p>
      </span>

      <div className='buttons-container'>
        {genres.map((genre) => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => onSelectGenreId(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>
    </nav>
  );
}

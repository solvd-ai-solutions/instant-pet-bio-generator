import React, { useCallback } from 'react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from 'sonner@2.0.3';

interface PhotoUploadProps {
  photos: string[];
  onPhotosChange: (photos: string[]) => void;
}

export function PhotoUpload({ photos, onPhotosChange }: PhotoUploadProps) {
  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newPhotos = Array.from(files).map(file => URL.createObjectURL(file));
      onPhotosChange([...photos, ...newPhotos]);
      toast.success(`${files.length} photo${files.length > 1 ? 's' : ''} uploaded!`);
    }
  }, [photos, onPhotosChange]);

  const removePhoto = useCallback((index: number) => {
    const newPhotos = photos.filter((_, i) => i !== index);
    onPhotosChange(newPhotos);
    toast.success('Photo removed');
  }, [photos, onPhotosChange]);

  const addSamplePhoto = useCallback(() => {
    const samplePhotos = [
      'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=400&fit=crop&crop=faces',
      'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=400&fit=crop&crop=faces',
      'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=400&fit=crop&crop=faces',
      'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=400&fit=crop&crop=faces',
      'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=400&h=400&fit=crop&crop=faces'
    ];
    
    const randomPhoto = samplePhotos[Math.floor(Math.random() * samplePhotos.length)];
    if (!photos.includes(randomPhoto)) {
      onPhotosChange([...photos, randomPhoto]);
      toast.success('Sample photo added!');
    }
  }, [photos, onPhotosChange]);

  return (
    <div className="space-y-4 h-full flex flex-col">
      {/* Upload Actions */}
      <div className="flex-shrink-0">
        <div className="flex gap-2 mb-3">
          <label className="flex-1">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileUpload}
              className="hidden"
            />
            <Button className="btn-mint w-full text-sm" type="button">
              📁 Upload Photos
            </Button>
          </label>
          <Button 
            onClick={addSamplePhoto}
            variant="secondary" 
            className="px-3"
            type="button"
          >
            🎲
          </Button>
        </div>
        
        {photos.length === 0 && (
          <div className="text-center py-6 border-2 border-dashed border-gray-300 rounded-solvd">
            <div className="text-4xl mb-2">📸</div>
            <p className="text-sm text-muted-foreground mb-2">No photos uploaded yet</p>
            <p className="text-xs text-muted-foreground">
              Upload photos or try a sample to get started
            </p>
          </div>
        )}
      </div>

      {/* Photo Grid */}
      {photos.length > 0 && (
        <div className="flex-1 overflow-auto">
          <div className="grid grid-cols-2 gap-2 h-full">
            {photos.map((photo, index) => (
              <div key={index} className="relative group">
                <div className="aspect-square overflow-hidden rounded-solvd outline outline-2 outline-black">
                  <ImageWithFallback
                    src={photo}
                    alt={`Pet photo ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  onClick={() => removePhoto(index)}
                  className="absolute -top-2 -right-2 bg-white text-black rounded-full w-6 h-6 flex items-center justify-center outline outline-2 outline-black opacity-0 group-hover:opacity-100 transition-opacity text-sm"
                  type="button"
                >
                  ❌
                </button>
                {index === 0 && (
                  <div className="absolute bottom-1 left-1 bg-mint text-white px-2 py-1 text-xs rounded-solvd outline outline-2 outline-mint font-medium">
                    📌 Primary
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Photo Tips */}
      {photos.length > 0 && (
        <div className="bg-muted outline outline-2 outline-black rounded-solvd p-2 flex-shrink-0">
          <div className="text-xs text-muted-foreground">
            💡 <strong>Tip:</strong> The first photo will be used as the primary image in generated content.
          </div>
        </div>
      )}
    </div>
  );
}
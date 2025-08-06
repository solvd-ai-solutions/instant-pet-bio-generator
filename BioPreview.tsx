import React from 'react';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface PetDetails {
  name: string;
  age: string;
  breed: string;
  energyLevel: string;
  size: string;
  quirks: string[];
  specialNeeds: string;
}

interface GeneratedBio {
  headline: string;
  description: string;
  callToAction: string;
}

interface BioPreviewProps {
  details: PetDetails;
  photos: string[];
  bio: GeneratedBio | null;
}

export function BioPreview({ details, photos, bio }: BioPreviewProps) {
  const hasContent = details.name || photos.length > 0 || bio;

  if (!hasContent) {
    return (
      <div className="h-full flex items-center justify-center text-center">
        <div>
          <div className="text-4xl mb-3">📋</div>
          <h4 className="font-semibold text-black mb-2">Preview Your Adoption Card</h4>
          <p className="text-sm text-muted-foreground">
            Add pet details and photos to see how your adoption card will look
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-auto">
      <div className="card-base">
        <div className="p-4 space-y-5">
          {/* Pet Photo */}
          {photos.length > 0 && (
            <div className="w-full">
              <div className="aspect-square max-w-xs mx-auto overflow-hidden rounded-solvd outline outline-2 outline-black">
                <ImageWithFallback
                  src={photos[0]}
                  alt={details.name || 'Pet photo'}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          {/* Pet Basic Info */}
          <div className="space-y-3">
            {details.name && (
              <h3 className="text-xl font-semibold text-black">{details.name}</h3>
            )}
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              {details.breed && (
                <span className="flex items-center gap-1">
                  <span>🐕</span>
                  {details.breed}
                </span>
              )}
              {details.age && (
                <span className="flex items-center gap-1">
                  <span>🎂</span>
                  {details.age}
                </span>
              )}
              {details.size && (
                <span className="flex items-center gap-1">
                  <span>📏</span>
                  {details.size}
                </span>
              )}
              {details.energyLevel && (
                <span className="flex items-center gap-1">
                  <span>⚡</span>
                  {details.energyLevel}
                </span>
              )}
            </div>
          </div>

          {/* Personality Traits */}
          {details.quirks.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                <span>🌟</span>
                Personality:
              </p>
              <div className="flex flex-wrap gap-2">
                {details.quirks.map((quirk, index) => (
                  <Badge 
                    key={index} 
                    className="bg-mint text-white outline outline-2 outline-mint text-xs rounded-solvd font-medium"
                  >
                    {quirk}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Generated Bio */}
          {bio && (
            <div className="space-y-4">
              {bio.headline && (
                <div>
                  <h4 className="font-semibold text-coral">{bio.headline}</h4>
                </div>
              )}
              
              {bio.description && (
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {bio.description}
                </p>
              )}
              
              {bio.callToAction && (
                <p className="text-sm font-medium text-mint italic">
                  {bio.callToAction}
                </p>
              )}
            </div>
          )}

          {/* Special Notes */}
          {details.specialNeeds && (
            <div className="bg-coral bg-opacity-10 outline outline-2 outline-coral rounded-solvd p-3">
              <div className="flex items-start gap-2">
                <span className="text-coral mt-0.5">⚠️</span>
                <div>
                  <p className="font-medium text-coral text-sm mb-1">Special Notes:</p>
                  <p className="text-sm text-muted-foreground">{details.specialNeeds}</p>
                </div>
              </div>
            </div>
          )}

          {/* Adoption CTA */}
          <div className="bg-lavender bg-opacity-10 outline outline-2 outline-lavender rounded-solvd p-3 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span>❤️</span>
              <span className="font-semibold text-lavender">Ready to Adopt?</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Contact our adoption team to meet {details.name || 'this wonderful pet'} today!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
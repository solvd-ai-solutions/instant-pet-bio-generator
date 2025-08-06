import React, { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { toast } from 'sonner@2.0.3';

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

interface BioGeneratorProps {
  details: PetDetails;
  photos: string[];
  onBioGenerated: (bio: GeneratedBio) => void;
}

export function BioGenerator({ details, photos, onBioGenerated }: BioGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedBio, setGeneratedBio] = useState<GeneratedBio | null>(null);

  const generateBio = async () => {
    if (!details.name.trim()) {
      toast.error('Please enter a pet name first!');
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI generation delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    const sampleBios = [
      {
        headline: `${details.name} is ready to steal your heart!`,
        description: `Meet ${details.name}, a wonderful ${details.age || 'young'} ${details.breed || 'mixed breed'} who's looking for a loving family. ${details.quirks.length > 0 ? `This sweet ${details.size || 'medium-sized'} pup is ${details.quirks.slice(0, 2).join(' and ')}.` : `This ${details.size || 'medium-sized'} companion has so much love to give.`} ${details.energyLevel ? `With a ${details.energyLevel} energy level, ${details.name} would thrive with an active family who can match their enthusiasm.` : ''} ${details.specialNeeds ? `Please note: ${details.specialNeeds}` : ''}`,
        callToAction: `${details.name} can't wait to meet you! Contact us today to arrange a meet and greet.`
      },
      {
        headline: `Your new best friend ${details.name} is waiting!`,
        description: `${details.name} is a ${details.age || 'beautiful'} ${details.breed || 'mixed breed'} with a heart full of love to share. ${details.quirks.length > 0 ? `Known for being ${details.quirks.slice(0, 3).join(', ')}, ` : ''}${details.name} brings joy wherever they go. This ${details.size || 'wonderful'} companion is looking for a family who will appreciate their unique personality and give them the loving home they deserve.`,
        callToAction: `Ready to add ${details.name} to your family? Apply for adoption today!`
      },
      {
        headline: `${details.name}: The perfect addition to your family!`,
        description: `Looking for a loyal companion? Meet ${details.name}! This ${details.age || 'amazing'} ${details.breed || 'mixed breed'} is everything you could want in a pet. ${details.quirks.length > 0 ? `${details.name} is ${details.quirks.slice(0, 2).join(' and ')}, making them ` : 'They are '}the perfect match for a family seeking a ${details.energyLevel || 'loving'} four-legged friend. ${details.specialNeeds ? `Special care notes: ${details.specialNeeds}` : ''}`,
        callToAction: `Don't let ${details.name} wait any longer - schedule your visit today!`
      }
    ];

    const randomBio = sampleBios[Math.floor(Math.random() * sampleBios.length)];
    
    setGeneratedBio(randomBio);
    onBioGenerated(randomBio);
    setIsGenerating(false);
    toast.success('Bio generated successfully!');
  };

  const regenerateBio = () => {
    setGeneratedBio(null);
    generateBio();
  };

  const hasRequiredInfo = details.name.trim().length > 0;

  return (
    <div className="space-y-4 h-full flex flex-col">
      {/* Generation Controls */}
      <div className="flex-shrink-0 space-y-3">
        <Button 
          onClick={generateBio}
          disabled={!hasRequiredInfo || isGenerating}
          className="btn-coral w-full"
        >
          {isGenerating ? (
            <>
              <span className="mr-2">⏳</span>
              Generating Bio...
            </>
          ) : (
            <>
              <span className="mr-2">✨</span>
              Generate Bio
            </>
          )}
        </Button>

        {generatedBio && (
          <Button 
            onClick={regenerateBio}
            variant="secondary"
            className="w-full"
            disabled={isGenerating}
          >
            <span className="mr-2">🔄</span>
            Regenerate
          </Button>
        )}

        {!hasRequiredInfo && (
          <div className="bg-muted outline outline-2 outline-black rounded-solvd p-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>💡</span>
              <span>Enter a pet name to generate a bio</span>
            </div>
          </div>
        )}
      </div>

      {/* Generated Content */}
      {generatedBio && (
        <div className="p-3 flex-1 overflow-auto space-y-4">
          <div className="space-y-2">
            <Badge className="bg-coral text-white outline outline-2 outline-coral rounded-solvd text-sm font-medium">
              📢 Headline
            </Badge>
            <p className="text-sm font-medium leading-relaxed">{generatedBio.headline}</p>
          </div>
          
          <div className="space-y-2">
            <Badge className="bg-coral text-white outline outline-2 outline-coral rounded-solvd text-sm font-medium">
              📝 Description
            </Badge>
            <p className="text-sm leading-relaxed">{generatedBio.description}</p>
          </div>
          
          <div className="space-y-2">
            <Badge className="bg-coral text-white outline outline-2 outline-coral rounded-solvd text-sm font-medium">
              📢 Call to Action
            </Badge>
            <p className="text-sm italic font-medium leading-relaxed">{generatedBio.callToAction}</p>
          </div>
        </div>
      )}

      {!generatedBio && hasRequiredInfo && (
        <div className="flex-1 flex items-center justify-center text-center">
          <div>
            <div className="text-4xl mb-3">🤖</div>
            <h4 className="font-semibold text-black mb-2">AI Bio Generator Ready</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Click "Generate Bio" to create a compelling adoption story for {details.name}
            </p>
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <span>📊</span>
              <span>Uses: Pet details, traits, and personality</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
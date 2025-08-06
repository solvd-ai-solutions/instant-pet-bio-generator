import React from 'react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';

interface PetDetails {
  name: string;
  age: string;
  breed: string;
  energyLevel: string;
  size: string;
  quirks: string[];
  specialNeeds: string;
}

interface KeywordInputProps {
  details: PetDetails;
  onDetailsChange: (details: PetDetails) => void;
}

export function KeywordInput({ details, onDetailsChange }: KeywordInputProps) {
  const updateDetail = (field: keyof PetDetails, value: string | string[]) => {
    onDetailsChange({ ...details, [field]: value });
  };

  const addQuirk = (quirk: string) => {
    if (quirk.trim() && !details.quirks.includes(quirk.trim())) {
      updateDetail('quirks', [...details.quirks, quirk.trim()]);
    }
  };

  const removeQuirk = (index: number) => {
    updateDetail('quirks', details.quirks.filter((_, i) => i !== index));
  };

  const handleQuirkKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const input = e.currentTarget;
      addQuirk(input.value);
      input.value = '';
    }
  };

  const commonQuirks = [
    'Loves tennis balls', 'Great with kids', 'Playful', 'Gentle giant', 
    'Lap dog', 'Fetch enthusiast', 'Good with cats', 'House trained'
  ];

  return (
    <div className="space-y-4 h-full">
      {/* Basic Info Section */}
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <Label htmlFor="name" className="text-lavender font-medium text-xs">🏷️ Pet Name *</Label>
            <Input
              id="name"
              placeholder="e.g., Buddy"
              value={details.name}
              onChange={(e) => updateDetail('name', e.target.value)}
              className="focus:outline-mint text-sm h-10"
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="age" className="text-lavender font-medium text-xs">🎂 Age</Label>
            <Input
              id="age"
              placeholder="e.g., 3 years"
              value={details.age}
              onChange={(e) => updateDetail('age', e.target.value)}
              className="focus:outline-mint text-sm h-10"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <Label htmlFor="breed" className="text-lavender font-medium text-xs">🐕 Breed</Label>
            <Input
              id="breed"
              placeholder="e.g., Lab Mix"
              value={details.breed}
              onChange={(e) => updateDetail('breed', e.target.value)}
              className="focus:outline-mint text-sm h-10"
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="size" className="text-lavender font-medium text-xs">📏 Size</Label>
            <Select value={details.size} onValueChange={(value) => updateDetail('size', value)}>
              <SelectTrigger className="input-base focus:outline-mint text-sm h-10">
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent className="card-base">
                <SelectItem value="small">🐾 Small (0-25 lbs)</SelectItem>
                <SelectItem value="medium">🐕 Medium (26-60 lbs)</SelectItem>
                <SelectItem value="large">🐕‍🦺 Large (61-100 lbs)</SelectItem>
                <SelectItem value="extra-large">🐕 Extra Large (100+ lbs)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Energy Level and Trait Input Section */}
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <Label htmlFor="energy" className="text-lavender font-medium text-xs">⚡ Energy Level</Label>
            <Select value={details.energyLevel} onValueChange={(value) => updateDetail('energyLevel', value)}>
              <SelectTrigger className="input-base focus:outline-mint text-sm h-10">
                <SelectValue placeholder="Select energy level" />
              </SelectTrigger>
              <SelectContent className="card-base">
                <SelectItem value="low">😴 Low - Calm & relaxed</SelectItem>
                <SelectItem value="moderate">🚶 Moderate - Balanced activity</SelectItem>
                <SelectItem value="high">🏃 High - Active & playful</SelectItem>
                <SelectItem value="very-high">🚀 Very High - Energetic athlete</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <Label className="text-lavender font-medium text-xs">✨ Add Trait</Label>
            <Input
              placeholder="Type trait + Enter"
              onKeyPress={handleQuirkKeyPress}
              className="focus:outline-mint text-sm h-10"
            />
          </div>
        </div>
      </div>

      {/* Current Traits Section */}
      {details.quirks.length > 0 && (
        <div className="space-y-2">
          <Label className="text-lavender font-medium text-xs">🌟 Personality Traits</Label>
          <div className="flex flex-wrap gap-1">
            {details.quirks.map((quirk, index) => (
              <Badge 
                key={index} 
                className="bg-lavender text-white outline outline-2 outline-lavender rounded-solvd flex items-center gap-1 px-2 py-1 text-xs font-medium"
              >
                <span>{quirk}</span>
                <button
                  onClick={() => removeQuirk(index)}
                  className="hover:bg-black hover:bg-opacity-20 rounded-full p-0.5 ml-1"
                  type="button"
                >
                  ❌
                </button>
              </Badge>
            ))}
          </div>
        </div>
      )}
      
      {/* Quick Add Traits Section */}
      <div className="space-y-2">
        <Label className="text-xs text-muted-foreground">⚡ Quick add traits:</Label>
        <div className="flex flex-wrap gap-1">
          {commonQuirks.map((quirk) => (
            <button
              key={quirk}
              className="bg-white text-black outline outline-1 outline-gray-300 cursor-pointer text-xs rounded px-2 py-1 font-normal flex items-center gap-1 hover:outline-black transition-colors"
              onClick={() => addQuirk(quirk)}
              type="button"
            >
              <span>➕</span>
              <span>{quirk}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Special Notes Section */}
      <div className="space-y-1 flex-1 flex flex-col">
        <Label htmlFor="special-needs" className="text-lavender font-medium text-xs">📋 Special Notes</Label>
        <Textarea
          id="special-needs"
          placeholder="Medical conditions, special needs, behavioral notes..."
          value={details.specialNeeds}
          onChange={(e) => updateDetail('specialNeeds', e.target.value)}
          className="min-h-16 focus:outline-mint resize-none text-sm flex-1"
        />
      </div>
    </div>
  );
}
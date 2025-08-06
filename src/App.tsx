import React, { useState } from 'react';
import { Heart, Sparkles, Camera, FileText, Download, Upload, Plus, X } from 'lucide-react';

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

export default function App() {
  const [photos, setPhotos] = useState<string[]>([]);
  const [details, setDetails] = useState<PetDetails>({
    name: '',
    age: '',
    breed: '',
    energyLevel: 'Medium',
    size: 'Medium',
    quirks: [],
    specialNeeds: ''
  });
  const [generatedBio, setGeneratedBio] = useState<GeneratedBio | null>(null);
  const [newQuirk, setNewQuirk] = useState('');

  const completionPercentage = (() => {
    let score = 0;
    if (photos.length > 0) score += 20;
    if (details.name) score += 15;
    if (details.breed) score += 10;
    if (details.age) score += 10;
    if (details.size) score += 5;
    if (details.energyLevel) score += 10;
    if (details.quirks.length > 0) score += 10;
    if (generatedBio) score += 20;
    return Math.min(score, 100);
  })();

  const generateBio = () => {
    if (!details.name) return;
    
    const quirksText = details.quirks.length > 0 ? ` ${details.name} is known for being ${details.quirks.join(', ')}.` : '';
    const specialNeedsText = details.specialNeeds ? ` Please note: ${details.specialNeeds}` : '';
    
    setGeneratedBio({
      headline: `Meet ${details.name}!`,
      description: `${details.name} is a ${details.age || 'young'} ${details.breed || 'wonderful companion'} with ${details.energyLevel.toLowerCase()} energy levels. This ${details.size.toLowerCase()}-sized friend is looking for their forever home.${quirksText}${specialNeedsText}`,
      callToAction: `Ready to meet ${details.name}? Contact us today to schedule a visit!`
    });
  };

  const addQuirk = () => {
    if (newQuirk.trim() && !details.quirks.includes(newQuirk.trim())) {
      setDetails(prev => ({
        ...prev,
        quirks: [...prev.quirks, newQuirk.trim()]
      }));
      setNewQuirk('');
    }
  };

  const removeQuirk = (quirkToRemove: string) => {
    setDetails(prev => ({
      ...prev,
      quirks: prev.quirks.filter(quirk => quirk !== quirkToRemove)
    }));
  };

  return (
    <div className="min-h-screen bg-white font-inter">
      {/* Demo Banner */}
      <div className="bg-lavender text-white px-4 py-2 flex items-center justify-center text-sm border-2 border-black">
        <Sparkles className="w-4 h-4 mr-2" />
        <span className="font-semibold">SOLVD AI DESIGN SYSTEM</span>
        <span className="font-normal ml-2">• Complete Pet Bio Generator</span>
      </div>
      
      {/* Header */}
      <header className="bg-white border-b-2 border-black p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1 min-w-0">
              <h1 className="text-3xl font-bold mb-2">🐾 Instant Pet Bio Generator</h1>
              <p className="text-base text-gray-600">
                Create compelling adoption bios in minutes. Upload photos, add details, 
                and generate heartwarming descriptions that help pets find their forever homes.
              </p>
            </div>
            
            {/* Progress Indicator */}
            <div className="flex items-center gap-4 flex-shrink-0 ml-6">
              <div className="text-right">
                <div className="text-sm font-medium">{completionPercentage}% Complete</div>
                <div className="w-24 h-2 bg-gray-200 rounded-md overflow-hidden mt-1 border-2 border-black">
                  <div 
                    className="h-full bg-mint transition-all duration-500 ease-out rounded-md"
                    style={{ width: `${completionPercentage}%` }}
                  />
                </div>
              </div>
              
              <div className="flex gap-2">
                {photos.length > 0 && (
                  <div className="bg-mint text-white border-2 border-mint text-xs px-2 py-1 rounded-sm font-medium">
                    <Camera className="w-3 h-3 mr-1 inline" />
                    {photos.length} photo{photos.length !== 1 ? 's' : ''}
                  </div>
                )}
                {details.name && (
                  <div className="bg-lavender text-white border-2 border-lavender text-xs px-2 py-1 rounded-sm font-medium">
                    <Heart className="w-3 h-3 mr-1 inline" />
                    {details.name}
                  </div>
                )}
                {generatedBio && (
                  <div className="bg-coral text-white border-2 border-coral text-xs px-2 py-1 rounded-sm font-medium">
                    <Sparkles className="w-3 h-3 mr-1 inline" />
                    Bio Ready
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - 6 Panel Layout */}
      <main className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          
          {/* 1. Pet Details Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-md border-2 border-black h-full transition-all duration-200 ease-in-out hover:shadow-lg">
              <div className="p-6 border-b-2 border-black">
                <div className="flex items-center gap-2 text-lavender font-semibold">
                  <FileText className="w-5 h-5" />
                  Pet Details
                </div>
              </div>
              <div className="p-6 flex-1 overflow-auto">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Basic Information</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium block mb-1">Pet Name *</label>
                        <input
                          className="block w-full rounded-md px-2 py-2 text-base bg-white text-black border-2 border-black transition-colors duration-200 ease-in-out focus:border-mint focus:outline-none"
                          value={details.name}
                          onChange={(e) => setDetails({...details, name: e.target.value})}
                          placeholder="Enter pet's name"
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-sm font-medium block mb-1">Age</label>
                          <input
                            className="block w-full rounded-md px-2 py-2 text-base bg-white text-black border-2 border-black transition-colors duration-200 ease-in-out focus:border-mint focus:outline-none"
                            value={details.age}
                            onChange={(e) => setDetails({...details, age: e.target.value})}
                            placeholder="e.g., 2 years"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium block mb-1">Breed</label>
                          <input
                            className="block w-full rounded-md px-2 py-2 text-base bg-white text-black border-2 border-black transition-colors duration-200 ease-in-out focus:border-mint focus:outline-none"
                            value={details.breed}
                            onChange={(e) => setDetails({...details, breed: e.target.value})}
                            placeholder="e.g., Golden Retriever"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-sm font-medium block mb-1">Size</label>
                          <select
                            className="block w-full rounded-md px-2 py-2 text-base bg-white text-black border-2 border-black transition-colors duration-200 ease-in-out focus:border-mint focus:outline-none"
                            value={details.size}
                            onChange={(e) => setDetails({...details, size: e.target.value})}
                          >
                            <option>Small</option>
                            <option>Medium</option>
                            <option>Large</option>
                            <option>Extra Large</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-sm font-medium block mb-1">Energy Level</label>
                          <select
                            className="block w-full rounded-md px-2 py-2 text-base bg-white text-black border-2 border-black transition-colors duration-200 ease-in-out focus:border-mint focus:outline-none"
                            value={details.energyLevel}
                            onChange={(e) => setDetails({...details, energyLevel: e.target.value})}
                          >
                            <option>Low</option>
                            <option>Medium</option>
                            <option>High</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Personality & Quirks</h3>
                    <div>
                      <div className="flex gap-2 mb-2">
                        <input
                          className="block flex-1 rounded-md px-2 py-2 text-base bg-white text-black border-2 border-black transition-colors duration-200 ease-in-out focus:border-mint focus:outline-none"
                          value={newQuirk}
                          onChange={(e) => setNewQuirk(e.target.value)}
                          placeholder="Add a personality trait"
                          onKeyPress={(e) => e.key === 'Enter' && addQuirk()}
                        />
                        <button
                          onClick={addQuirk}
                          className="inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium bg-mint text-white border-2 border-mint transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:shadow-lg hover:bg-white hover:text-black"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {details.quirks.map((quirk, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center gap-1 bg-lavender/20 text-lavender px-2 py-1 rounded border border-lavender"
                          >
                            {quirk}
                            <button
                              onClick={() => removeQuirk(quirk)}
                              className="text-lavender hover:text-black transition-colors"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Special Needs</h3>
                    <textarea
                      className="block w-full rounded-md px-2 py-2 text-base bg-white text-black border-2 border-black transition-colors duration-200 ease-in-out focus:border-mint focus:outline-none resize-none"
                      rows={3}
                      value={details.specialNeeds}
                      onChange={(e) => setDetails({...details, specialNeeds: e.target.value})}
                      placeholder="Any special care requirements..."
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Pet Photos Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-md border-2 border-black h-full transition-all duration-200 ease-in-out hover:shadow-lg">
              <div className="p-6 border-b-2 border-black">
                <div className="flex items-center gap-2 text-mint font-semibold">
                  <Camera className="w-5 h-5" />
                  Pet Photos
                  {photos.length > 0 && (
                    <div className="bg-mint text-white border-2 border-mint text-xs px-2 py-1 rounded-sm font-medium">
                      {photos.length}
                    </div>
                  )}
                </div>
              </div>
              <div className="p-6 flex-1 overflow-hidden">
                <div className="h-full flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-gray-400 rounded-lg">
                  <div className="w-12 h-12 text-gray-400 mb-4">
                    <Upload className="w-12 h-12" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Upload Pet Photos</h3>
                  <p className="text-sm text-gray-600 mb-4 max-w-sm">
                    Drag and drop photos here, or click to browse. Multiple photos help create better bios!
                  </p>
                  <button className="inline-flex items-center justify-center rounded-md px-4 py-2 text-base font-medium bg-mint text-white border-2 border-mint transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:shadow-lg hover:bg-white hover:text-black">
                    <Camera className="w-4 h-4 mr-2" />
                    Choose Photos
                  </button>
                  <p className="text-xs text-gray-500 mt-2">
                    Photo upload functionality coming soon...
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 3. AI Bio Generator Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-md border-2 border-black h-full transition-all duration-200 ease-in-out hover:shadow-lg">
              <div className="p-6 border-b-2 border-black">
                <div className="flex items-center gap-2 text-coral font-semibold mb-2">
                  <Sparkles className="w-5 h-5" />
                  AI Bio Generator
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-md border-2 border-black">
                  <span className="text-xs">⚠️</span>
                  <span className="text-xs text-gray-600">
                    Demo Mode • Generates sample content only
                  </span>
                </div>
              </div>
              <div className="p-6 flex-1 overflow-auto">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Generate Bio</h3>
                    <div className="bg-mint text-white border-2 border-mint text-xs px-2 py-1 rounded-sm font-medium">
                      <Sparkles className="w-3 h-3 mr-1 inline" />
                      AI Powered
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-50 rounded border-2 border-gray-300">
                      <h4 className="font-medium text-sm mb-2">Bio will include:</h4>
                      <ul className="text-xs text-gray-600 space-y-1">
                        <li>✓ Pet's name and basic info</li>
                        <li>✓ Personality traits</li>
                        <li>✓ Special needs (if any)</li>
                        <li>✓ Call-to-action</li>
                      </ul>
                    </div>
                    
                    <button
                      className="inline-flex items-center justify-center rounded-md px-5 py-3 text-lg font-medium bg-coral text-white border-2 border-coral transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:shadow-lg hover:bg-white hover:text-black w-full disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={generateBio}
                      disabled={!details.name}
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate Bio
                    </button>
                    
                    {!details.name && (
                      <p className="text-xs text-gray-500 text-center">
                        Enter a pet name to generate bio
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 4. Adoption Card Preview */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-md border-2 border-black h-full transition-all duration-200 ease-in-out hover:shadow-lg">
              <div className="p-6 border-b-2 border-black">
                <div className="flex items-center gap-2 text-mint font-semibold">
                  <Heart className="w-5 h-5" />
                  Adoption Card Preview
                </div>
              </div>
              <div className="p-6 flex-1 overflow-auto">
                {generatedBio ? (
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded border-2 border-gray-300">
                      <h3 className="text-xl font-bold text-coral mb-3">{generatedBio.headline}</h3>
                      <p className="text-sm leading-relaxed mb-4">{generatedBio.description}</p>
                      <div className="p-3 bg-coral/10 rounded border border-coral">
                        <p className="text-sm font-medium text-coral">{generatedBio.callToAction}</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <button className="inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium bg-mint text-white border-2 border-mint transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:shadow-lg hover:bg-white hover:text-black flex-1">
                        <Heart className="w-4 h-4 mr-1" />
                        Love This!
                      </button>
                      <button 
                        onClick={generateBio}
                        className="inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium bg-white text-black border-2 border-black transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:shadow-lg hover:bg-mint hover:text-white flex-1"
                      >
                        <Sparkles className="w-4 h-4 mr-1" />
                        Regenerate
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 border-2 border-gray-300">
                      <Heart className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Adoption Card Preview</h3>
                    <p className="text-sm text-gray-600 max-w-sm">
                      Fill out the pet details and generate a bio to see your adoption card preview here.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 5. Export Options */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-md border-2 border-black h-full transition-all duration-200 ease-in-out hover:shadow-lg">
              <div className="p-6 border-b-2 border-black">
                <div className="flex items-center gap-2 text-coral font-semibold">
                  <Download className="w-5 h-5" />
                  Export Options
                </div>
              </div>
              <div className="p-6 flex-1 overflow-auto">
                {generatedBio ? (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold mb-4">Export Your Bio</h3>
                    
                    <div className="space-y-3">
                      <button className="inline-flex items-center justify-center rounded-md px-4 py-3 text-base font-medium bg-white text-black border-2 border-black transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:shadow-lg hover:bg-mint hover:text-white w-full text-left">
                        <div className="flex items-center justify-between w-full">
                          <div>
                            <div className="font-medium">📄 Copy Text</div>
                            <div className="text-sm text-gray-600">Copy bio to clipboard</div>
                          </div>
                          <Download className="w-4 h-4" />
                        </div>
                      </button>
                      
                      <button className="inline-flex items-center justify-center rounded-md px-4 py-3 text-base font-medium bg-white text-black border-2 border-black transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:shadow-lg hover:bg-lavender hover:text-white w-full text-left">
                        <div className="flex items-center justify-between w-full">
                          <div>
                            <div className="font-medium">📱 Social Media</div>
                            <div className="text-sm text-gray-600">Optimized for posting</div>
                          </div>
                          <Download className="w-4 h-4" />
                        </div>
                      </button>
                      
                      <button className="inline-flex items-center justify-center rounded-md px-4 py-3 text-base font-medium bg-white text-black border-2 border-black transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:shadow-lg hover:bg-coral hover:text-white w-full text-left">
                        <div className="flex items-center justify-between w-full">
                          <div>
                            <div className="font-medium">🖼️ Card Image</div>
                            <div className="text-sm text-gray-600">Download as image</div>
                          </div>
                          <Download className="w-4 h-4" />
                        </div>
                      </button>
                    </div>
                    
                    <div className="pt-4 border-t-2 border-gray-300">
                      <p className="text-xs text-gray-500 text-center">
                        Export functionality coming soon...
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 border-2 border-gray-300">
                      <Download className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Export Options</h3>
                    <p className="text-sm text-gray-600 max-w-sm">
                      Generate a bio first to see export options for sharing your pet's story.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 6. Tips & Stats Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-md border-2 border-black h-full transition-all duration-200 ease-in-out hover:shadow-lg">
              <div className="p-6 border-b-2 border-black">
                <div className="flex items-center gap-2 text-lavender font-semibold">
                  <Sparkles className="w-5 h-5" />
                  Tips & Stats
                </div>
              </div>
              <div className="p-6 flex-1 overflow-auto">
                <div className="space-y-4">
                  <div className="p-3 bg-mint/10 rounded border border-mint">
                    <h4 className="font-medium text-sm mb-2 text-mint">✨ Pro Tips</h4>
                    <ul className="text-xs text-gray-600 space-y-1">
                      <li>• Add 3-5 personality traits</li>
                      <li>• Include age and breed info</li>
                      <li>• Mention special needs clearly</li>
                      <li>• Use positive, warm language</li>
                    </ul>
                  </div>
                  
                  <div className="p-3 bg-gray-50 rounded border-2 border-gray-300">
                    <h4 className="font-medium text-sm mb-2">📊 Your Progress</h4>
                    <div className="text-xs text-gray-600 space-y-1">
                      <div className="flex justify-between">
                        <span>Completion:</span>
                        <span className="font-medium text-black">{completionPercentage}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Details filled:</span>
                        <span className="font-medium text-black">
                          {[details.name, details.age, details.breed, details.size, details.energyLevel].filter(Boolean).length}/5
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Personality traits:</span>
                        <span className="font-medium text-black">{details.quirks.length}</span>
                      </div>
                    </div>
                  </div>
                  
                  {generatedBio && (
                    <div className="p-3 bg-coral/10 rounded border border-coral">
                      <h4 className="font-medium text-sm mb-2 text-coral">🎉 Bio Generated!</h4>
                      <p className="text-xs text-gray-600">
                        Your bio is ready to help {details.name} find a loving home!
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t-2 border-black bg-gray-100 px-6 py-4 mt-12">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm text-gray-600">
            Made with ❤️ for animal shelters • Helping pets find their forever homes
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Built with Solvd AI Solutions Design System
          </p>
        </div>
      </footer>
    </div>
  );
}

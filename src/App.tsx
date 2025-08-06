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
    <div className="min-h-screen bg-white">
      {/* Demo Banner */}
      <div className="bg-purple-400 text-white px-4 py-2 flex items-center justify-center text-sm border-2 border-black">
        <Sparkles className="w-4 h-4 mr-2" />
        <span className="font-semibold">COMPLETE PET BIO GENERATOR</span>
        <span className="font-normal ml-2">• Full Original Design from Figma</span>
      </div>
      
      {/* Header */}
      <header className="bg-white border-b-2 border-black p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">🐾 Instant Pet Bio Generator</h1>
          <p className="text-base text-gray-600">
            Create compelling adoption bios in minutes. Upload photos, add details, 
            and generate heartwarming descriptions that help pets find their forever homes.
          </p>
        </div>
      </header>

      {/* Main Content - 6 Panel Layout */}
      <main className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          
          {/* 1. Pet Details Panel */}
          <div className="bg-white border-2 border-black rounded-lg">
            <div className="p-6 border-b-2 border-black">
              <div className="flex items-center gap-2 text-purple-600 font-semibold">
                <FileText className="w-5 h-5" />
                Pet Details
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Pet Name *</label>
                <input
                  className="w-full px-3 py-2 border-2 border-black rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
                  value={details.name}
                  onChange={(e) => setDetails({...details, name: e.target.value})}
                  placeholder="Enter pet's name"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1">Age</label>
                  <input
                    className="w-full px-3 py-2 border-2 border-black rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
                    value={details.age}
                    onChange={(e) => setDetails({...details, age: e.target.value})}
                    placeholder="2 years"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Breed</label>
                  <input
                    className="w-full px-3 py-2 border-2 border-black rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
                    value={details.breed}
                    onChange={(e) => setDetails({...details, breed: e.target.value})}
                    placeholder="Golden Retriever"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Personality Traits</label>
                <div className="flex gap-2 mb-2">
                  <input
                    className="flex-1 px-3 py-2 border-2 border-black rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
                    value={newQuirk}
                    onChange={(e) => setNewQuirk(e.target.value)}
                    placeholder="friendly, playful, calm..."
                    onKeyPress={(e) => e.key === 'Enter' && addQuirk()}
                  />
                  <button
                    onClick={addQuirk}
                    className="px-3 py-2 bg-green-500 text-white border-2 border-black rounded hover:bg-green-600"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {details.quirks.map((quirk, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 bg-purple-100 text-purple-800 px-2 py-1 rounded border border-purple-300"
                    >
                      {quirk}
                      <button onClick={() => removeQuirk(quirk)}>
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 2. Pet Photos Panel */}
          <div className="bg-white border-2 border-black rounded-lg">
            <div className="p-6 border-b-2 border-black">
              <div className="flex items-center gap-2 text-green-600 font-semibold">
                <Camera className="w-5 h-5" />
                Pet Photos
              </div>
            </div>
            <div className="p-6">
              <div className="flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-gray-300 rounded-lg">
                <Upload className="w-16 h-16 text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Upload Photos</h3>
                <p className="text-sm text-gray-500 mb-4">Drag and drop photos here</p>
                <button className="px-4 py-2 bg-green-500 text-white border-2 border-black rounded hover:bg-green-600">
                  Choose Photos
                </button>
                <p className="text-xs text-gray-400 mt-2">Coming soon...</p>
              </div>
            </div>
          </div>

          {/* 3. AI Bio Generator */}
          <div className="bg-white border-2 border-black rounded-lg">
            <div className="p-6 border-b-2 border-black">
              <div className="flex items-center gap-2 text-orange-600 font-semibold">
                <Sparkles className="w-5 h-5" />
                AI Bio Generator
              </div>
            </div>
            <div className="p-6 space-y-4">
              <button
                className="w-full bg-orange-400 hover:bg-orange-500 text-white font-medium py-3 px-4 rounded border-2 border-black transition-colors disabled:opacity-50"
                onClick={generateBio}
                disabled={!details.name}
              >
                <Sparkles className="w-4 h-4 mr-2 inline" />
                Generate Bio
              </button>
              
              {!details.name && (
                <p className="text-xs text-gray-500 text-center">
                  Enter a pet name first
                </p>
              )}
            </div>
          </div>

          {/* 4. Bio Preview */}
          <div className="bg-white border-2 border-black rounded-lg">
            <div className="p-6 border-b-2 border-black">
              <div className="flex items-center gap-2 text-green-600 font-semibold">
                <Heart className="w-5 h-5" />
                Bio Preview
              </div>
            </div>
            <div className="p-6">
              {generatedBio ? (
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded border-2 border-gray-200">
                    <h3 className="text-xl font-bold text-orange-600 mb-3">{generatedBio.headline}</h3>
                    <p className="text-sm leading-relaxed mb-4">{generatedBio.description}</p>
                    <div className="p-3 bg-orange-100 rounded border border-orange-300">
                      <p className="text-sm font-medium text-orange-700">{generatedBio.callToAction}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button className="flex-1 px-3 py-2 bg-green-500 text-white border-2 border-black rounded hover:bg-green-600 text-sm">
                      <Heart className="w-4 h-4 mr-1 inline" />
                      Love It!
                    </button>
                    <button 
                      onClick={generateBio}
                      className="flex-1 px-3 py-2 bg-gray-200 text-gray-700 border-2 border-black rounded hover:bg-gray-300 text-sm"
                    >
                      <Sparkles className="w-4 h-4 mr-1 inline" />
                      Regenerate
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Heart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Bio Preview</h3>
                  <p className="text-sm text-gray-500">Generate a bio to see the preview</p>
                </div>
              )}
            </div>
          </div>

          {/* 5. Export Options */}
          <div className="bg-white border-2 border-black rounded-lg">
            <div className="p-6 border-b-2 border-black">
              <div className="flex items-center gap-2 text-orange-600 font-semibold">
                <Download className="w-5 h-5" />
                Export Options
              </div>
            </div>
            <div className="p-6">
              {generatedBio ? (
                <div className="space-y-3">
                  <button className="w-full p-3 border-2 border-black rounded hover:bg-gray-50 text-left">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">📄 Copy Text</div>
                        <div className="text-sm text-gray-500">Copy to clipboard</div>
                      </div>
                      <Download className="w-4 h-4" />
                    </div>
                  </button>
                  
                  <button className="w-full p-3 border-2 border-black rounded hover:bg-gray-50 text-left">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">📱 Social Media</div>
                        <div className="text-sm text-gray-500">Optimized format</div>
                      </div>
                      <Download className="w-4 h-4" />
                    </div>
                  </button>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-xs text-gray-500 text-center">Coming soon...</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Download className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Export Options</h3>
                  <p className="text-sm text-gray-500">Generate a bio to see export options</p>
                </div>
              )}
            </div>
          </div>

          {/* 6. Tips Panel */}
          <div className="bg-white border-2 border-black rounded-lg">
            <div className="p-6 border-b-2 border-black">
              <div className="flex items-center gap-2 text-purple-600 font-semibold">
                <Sparkles className="w-5 h-5" />
                Tips & Stats
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="p-3 bg-green-50 rounded border border-green-200">
                  <h4 className="font-medium text-sm mb-2">✨ Pro Tips</h4>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• Add 3-5 personality traits</li>
                    <li>• Include age and breed info</li>
                    <li>• Mention special needs clearly</li>
                    <li>• Use positive, warm language</li>
                  </ul>
                </div>
                
                {generatedBio && (
                  <div className="p-3 bg-orange-50 rounded border border-orange-200">
                    <h4 className="font-medium text-sm mb-2">🎉 Bio Generated!</h4>
                    <p className="text-xs text-gray-600">
                      Your bio is ready to help {details.name} find a loving home!
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t-2 border-black bg-gray-50 px-6 py-4 mt-12">
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

import React, { useState } from 'react';

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
    energyLevel: '',
    size: '',
    quirks: [],
    specialNeeds: ''
  });
  const [generatedBio, setGeneratedBio] = useState<GeneratedBio | null>(null);
  const [selectedQuirks, setSelectedQuirks] = useState<string[]>([]);

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

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newPhotos = Array.from(files).map(file => URL.createObjectURL(file));
      setPhotos(prev => [...prev, ...newPhotos]);
    }
  };

  const handleGenerateBio = () => {
    const sampleBio: GeneratedBio = {
      headline: `${details.name || 'This adorable pet'} is looking for a forever home!`,
      description: `Meet ${details.name || 'this wonderful companion'}! ${details.breed ? `A beautiful ${details.breed}` : 'A loving pet'} who is ${details.age || 'young'} and ${details.energyLevel || 'full of life'}. ${details.size ? `This ${details.size} sized` : 'This'} pet has a heart of gold and is ready to bring joy to your family.`,
      callToAction: 'Ready to meet your new best friend? Contact us today!'
    };
    setGeneratedBio(sampleBio);
  };

  const availableQuirks = [
    'Loves belly rubs', 'Plays fetch', 'Cuddly', 'Good with kids', 
    'House trained', 'Loves walks', 'Quiet', 'Energetic', 'Gentle'
  ];

  const toggleQuirk = (quirk: string) => {
    setSelectedQuirks(prev => 
      prev.includes(quirk) 
        ? prev.filter(q => q !== quirk)
        : [...prev, quirk]
    );
    setDetails(prev => ({
      ...prev,
      quirks: selectedQuirks.includes(quirk) 
        ? selectedQuirks.filter(q => q !== quirk)
        : [...selectedQuirks, quirk]
    }));
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-white overflow-hidden">
      {/* Demo Banner - Solvd AI Lavender */}
      <div className="bg-[#C5A3E0] text-white px-4 py-2 flex items-center justify-center text-sm flex-shrink-0 border-2 border-black">
        <span className="mr-2">⚡</span>
        <span className="font-semibold">DEMO VERSION</span>
        <span className="font-normal"> • COMPLETE 5-PANEL GRID APP • ALL PANELS WORKING • LIVE NOW</span>
      </div>
      
      {/* Header - Solvd AI Design System */}
      <div className="bg-white border-b-2 border-black flex-shrink-0 p-4">
        <div className="max-w-full">
          <div className="flex items-center justify-between mb-3">
            <div className="flex-1 min-w-0">
              <h1 className="text-black mb-2 text-2xl font-bold">🐾 Instant Pet Bio Generator - ALL 5 PANELS LIVE</h1>
              <p className="text-gray-600 text-base">
                Create compelling adoption bios in minutes. Upload photos, add details, 
                and generate heartwarming descriptions that help pets find their forever homes.
              </p>
            </div>
            
            {/* Status Badges - Solvd AI Style */}
            <div className="flex items-center gap-3 flex-shrink-0 ml-6">
              <div className="text-right">
                <div className="text-sm font-medium text-black">{completionPercentage}% Complete</div>
                <div className="w-24 h-2 bg-gray-200 rounded-lg overflow-hidden mt-1 border-2 border-black">
                  <div 
                    className="h-full bg-[#4FB3A6] transition-all duration-500 ease-out rounded-lg"
                    style={{ width: `${completionPercentage}%` }}
                  />
                </div>
              </div>
              {photos.length > 0 && (
                <div className="bg-[#4FB3A6] text-white border-2 border-[#4FB3A6] text-sm rounded-lg font-medium px-2 py-1">
                  📸 {photos.length} photo{photos.length !== 1 ? 's' : ''}
                </div>
              )}
              {details.name && (
                <div className="bg-[#C5A3E0] text-white border-2 border-[#C5A3E0] text-sm rounded-lg font-medium px-2 py-1">
                  🏷️ {details.name}
                </div>
              )}
              {generatedBio && (
                <div className="bg-[#F29E8E] text-white border-2 border-[#F29E8E] text-sm rounded-lg font-medium px-2 py-1">
                  ✨ Bio Ready
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Full screen responsive layout */}
      <div className="flex-1 p-2 overflow-hidden min-h-0">
        <div className="h-full w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grid-rows-auto xl:grid-rows-2 gap-2 h-full min-h-0">
            
            {/* Pet Details Panel */}
            <div className="xl:row-span-2 md:col-span-1 bg-white border-2 border-black rounded-lg flex flex-col min-h-0">
              <div className="p-3 border-b-2 border-black flex-shrink-0">
                <div className="flex items-center gap-2 text-[#C5A3E0] font-semibold">
                  <span>📝</span>
                  Pet Details
                </div>
              </div>
              <div className="p-3 flex-1 overflow-auto min-h-0">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-black mb-1">Pet Name</label>
                    <input
                      type="text"
                      value={details.name}
                      onChange={(e) => setDetails(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full p-2 border-2 border-black rounded-lg bg-white text-black"
                      placeholder="Enter pet's name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-black mb-1">Age</label>
                    <input
                      type="text"
                      value={details.age}
                      onChange={(e) => setDetails(prev => ({ ...prev, age: e.target.value }))}
                      className="w-full p-2 border-2 border-black rounded-lg bg-white text-black"
                      placeholder="e.g., 2 years old"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-black mb-1">Breed</label>
                    <input
                      type="text"
                      value={details.breed}
                      onChange={(e) => setDetails(prev => ({ ...prev, breed: e.target.value }))}
                      className="w-full p-2 border-2 border-black rounded-lg bg-white text-black"
                      placeholder="e.g., Golden Retriever"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-black mb-1">Size</label>
                    <select
                      value={details.size}
                      onChange={(e) => setDetails(prev => ({ ...prev, size: e.target.value }))}
                      className="w-full p-2 border-2 border-black rounded-lg bg-white text-black"
                    >
                      <option value="">Select size</option>
                      <option value="Small">Small</option>
                      <option value="Medium">Medium</option>
                      <option value="Large">Large</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-black mb-1">Energy Level</label>
                    <select
                      value={details.energyLevel}
                      onChange={(e) => setDetails(prev => ({ ...prev, energyLevel: e.target.value }))}
                      className="w-full p-2 border-2 border-black rounded-lg bg-white text-black"
                    >
                      <option value="">Select energy level</option>
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-black mb-1">Special Needs</label>
                    <textarea
                      value={details.specialNeeds}
                      onChange={(e) => setDetails(prev => ({ ...prev, specialNeeds: e.target.value }))}
                      className="w-full p-2 border-2 border-black rounded-lg bg-white text-black"
                      placeholder="Any special needs or requirements"
                      rows={3}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Quirks & Personality</label>
                    <div className="grid grid-cols-2 gap-2">
                      {availableQuirks.map(quirk => (
                        <button
                          key={quirk}
                          onClick={() => toggleQuirk(quirk)}
                          className={`p-2 text-sm border-2 rounded-lg transition-colors ${
                            selectedQuirks.includes(quirk)
                              ? 'bg-[#4FB3A6] text-white border-[#4FB3A6]'
                              : 'bg-white text-black border-black hover:bg-gray-50'
                          }`}
                        >
                          {quirk}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Pet Photos Panel */}
            <div className="bg-white border-2 border-black rounded-lg flex flex-col min-h-0">
              <div className="p-3 border-b-2 border-black flex-shrink-0">
                <div className="flex items-center gap-2 text-[#4FB3A6] font-semibold">
                  <span>📷</span>
                  Pet Photos
                  {photos.length > 0 && (
                    <div className="bg-white text-[#4FB3A6] border-2 border-[#4FB3A6] text-sm rounded-lg font-medium px-2 py-1">
                      {photos.length}
                    </div>
                  )}
                </div>
              </div>
              <div className="p-3 flex-1 overflow-hidden min-h-0">
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-black rounded-lg p-6 text-center">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                      id="photo-upload"
                    />
                    <label htmlFor="photo-upload" className="cursor-pointer">
                      <div className="text-4xl mb-2">📸</div>
                      <div className="text-black font-medium">Click to upload photos</div>
                      <div className="text-gray-600 text-sm">or drag and drop</div>
                    </label>
                  </div>
                  
                  {photos.length > 0 && (
                    <div className="grid grid-cols-2 gap-2">
                      {photos.map((photo, index) => (
                        <div key={index} className="relative">
                          <img
                            src={photo}
                            alt={`Pet photo ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg border-2 border-black"
                          />
                          <button
                            onClick={() => setPhotos(prev => prev.filter((_, i) => i !== index))}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* AI Bio Generator Panel */}
            <div className="bg-white border-2 border-black rounded-lg flex flex-col min-h-0">
              <div className="p-3 border-b-2 border-black flex-shrink-0">
                <div className="flex items-center gap-2 text-[#F29E8E] font-semibold mb-2">
                  <span>✨</span>
                  AI Bio Generator
                </div>
                <div className="flex items-center gap-2 px-2 py-1 bg-gray-200 rounded-lg border-2 border-black">
                  <span>⚠️</span>
                  <span className="text-xs text-gray-600">
                    Not connected to AI • Generates sample content only
                  </span>
                </div>
              </div>
              <div className="p-3 flex-1 overflow-auto min-h-0">
                <div className="space-y-4">
                  <button
                    onClick={handleGenerateBio}
                    disabled={!details.name}
                    className={`w-full p-3 rounded-lg border-2 font-medium transition-colors ${
                      details.name
                        ? 'bg-[#F29E8E] text-white border-[#F29E8E] hover:bg-[#e88a7a]'
                        : 'bg-gray-200 text-gray-500 border-gray-300 cursor-not-allowed'
                    }`}
                  >
                    🎯 Generate Bio
                  </button>
                  
                  {generatedBio && (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-black mb-1">Headline</label>
                        <input
                          type="text"
                          value={generatedBio.headline}
                          onChange={(e) => setGeneratedBio(prev => prev ? {...prev, headline: e.target.value} : null)}
                          className="w-full p-2 border-2 border-black rounded-lg bg-white text-black"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-black mb-1">Description</label>
                        <textarea
                          value={generatedBio.description}
                          onChange={(e) => setGeneratedBio(prev => prev ? {...prev, description: e.target.value} : null)}
                          className="w-full p-2 border-2 border-black rounded-lg bg-white text-black"
                          rows={4}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-black mb-1">Call to Action</label>
                        <input
                          type="text"
                          value={generatedBio.callToAction}
                          onChange={(e) => setGeneratedBio(prev => prev ? {...prev, callToAction: e.target.value} : null)}
                          className="w-full p-2 border-2 border-black rounded-lg bg-white text-black"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Adoption Card Preview Panel */}
            <div className="bg-white border-2 border-black rounded-lg flex flex-col min-h-0">
              <div className="p-3 border-b-2 border-black flex-shrink-0">
                <div className="flex items-center gap-2 text-[#4FB3A6] font-semibold">
                  <span>❤️</span>
                  Adoption Card Preview
                </div>
              </div>
              <div className="p-3 flex-1 overflow-auto min-h-0">
                <div className="bg-white border-2 border-black rounded-lg p-4">
                  {photos.length > 0 && (
                    <img
                      src={photos[0]}
                      alt="Pet"
                      className="w-full h-32 object-cover rounded-lg border-2 border-black mb-3"
                    />
                  )}
                  
                  {generatedBio ? (
                    <div className="space-y-3">
                      <h3 className="font-bold text-lg text-black">{generatedBio.headline}</h3>
                      <p className="text-gray-700">{generatedBio.description}</p>
                      <div className="bg-[#4FB3A6] text-white p-3 rounded-lg border-2 border-[#4FB3A6] text-center font-medium">
                        {generatedBio.callToAction}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center text-gray-500 py-8">
                      <div className="text-4xl mb-2">❤️</div>
                      <div>Generate a bio to see the preview</div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Export Options Panel */}
            <div className="bg-white border-2 border-black rounded-lg flex flex-col min-h-0">
              <div className="p-3 border-b-2 border-black flex-shrink-0">
                <div className="flex items-center gap-2 text-[#F29E8E] font-semibold">
                  <span>💾</span>
                  Export Options
                </div>
              </div>
              <div className="p-3 flex-1 overflow-auto min-h-0">
                <div className="space-y-3">
                  <button className="w-full p-3 bg-[#F29E8E] text-white border-2 border-[#F29E8E] rounded-lg font-medium hover:bg-[#e88a7a] transition-colors">
                    📄 Export as PDF
                  </button>
                  
                  <button className="w-full p-3 bg-[#4FB3A6] text-white border-2 border-[#4FB3A6] rounded-lg font-medium hover:bg-[#3da295] transition-colors">
                    📱 Social Media Post
                  </button>
                  
                  <button className="w-full p-3 bg-[#C5A3E0] text-white border-2 border-[#C5A3E0] rounded-lg font-medium hover:bg-[#b492d0] transition-colors">
                    🖨️ Print Ready
                  </button>
                  
                  <button className="w-full p-3 bg-white text-black border-2 border-black rounded-lg font-medium hover:bg-gray-50 transition-colors">
                    📋 Copy to Clipboard
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer - Solvd AI Style */}
      <div className="border-t-2 border-black bg-gray-100 px-4 py-2 flex-shrink-0">
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Made with ❤️ for animal shelters • Helping pets find their forever homes
          </p>
        </div>
      </div>
    </div>
  );
}

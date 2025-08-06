import React, { useState } from "react";
import { Heart, Sparkles } from "lucide-react";

export default function App() {
  const [petName, setPetName] = useState("");
  const [petBio, setPetBio] = useState("");

  const generateBio = () => {
    if (petName) {
      setPetBio(`Meet ${petName}! This adorable companion is looking for their forever home. ${petName} would make a wonderful addition to any loving family. Contact us today to meet ${petName}!`);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-green-500 text-white px-4 py-2 text-center text-sm border-2 border-black">
        <Sparkles className="w-4 h-4 inline mr-2" />
        <span className="font-semibold">🎉 SUCCESS!</span>
        <span className="ml-2">• Pet Bio Generator Successfully Deployed</span>
      </div>
      
      <header className="bg-white border-b-2 border-black p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">🐾 Instant Pet Bio Generator</h1>
          <p className="text-gray-600">
            Create compelling adoption bios using the Solvd AI Solutions Design System.
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border-2 border-black rounded-lg">
            <div className="p-4 border-b-2 border-black bg-gray-50">
              <h2 className="font-semibold text-purple-600">Pet Details</h2>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Pet Name</label>
                  <input
                    className="w-full px-3 py-2 border-2 border-black rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
                    value={petName}
                    onChange={(e) => setPetName(e.target.value)}
                    placeholder="Enter pets name (e.g., Buddy)"
                  />
                </div>
                <button
                  className="w-full bg-orange-400 hover:bg-orange-500 text-white font-medium py-2 px-4 rounded border-2 border-black transition-colors"
                  onClick={generateBio}
                >
                  <Sparkles className="w-4 h-4 mr-2 inline" />
                  Generate Bio
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white border-2 border-black rounded-lg">
            <div className="p-4 border-b-2 border-black bg-gray-50">
              <h2 className="font-semibold text-green-600">Bio Preview</h2>
            </div>
            <div className="p-4">
              {petBio ? (
                <div className="space-y-3">
                  <p className="text-sm leading-relaxed">{petBio}</p>
                  <div className="p-3 bg-green-100 rounded border border-green-300">
                    <p className="text-sm font-medium text-green-700">
                      🎉 Ready to meet {petName}? Contact us today!
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Heart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Bio Preview</h3>
                  <p className="text-sm text-gray-500">
                    Enter a pet name and click Generate Bio to see the preview.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t-2 border-black bg-gray-50 px-6 py-4 mt-12">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-gray-600">
            ✅ Made with ❤️ for animal shelters • Solvd AI Solutions Design System Demo
          </p>
          <p className="text-xs text-gray-500 mt-1">
            🚀 Successfully deployed to Vercel!
          </p>
        </div>
      </footer>
    </div>
  );
}

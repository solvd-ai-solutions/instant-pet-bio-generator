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

interface ExportOptionsProps {
  details: PetDetails;
  photos: string[];
  bio: GeneratedBio | null;
}

export function ExportOptions({ details, photos, bio }: ExportOptionsProps) {
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);

  const generateTextExport = () => {
    let text = '';
    if (details.name) text += `Pet Name: ${details.name}\n`;
    if (details.age) text += `Age: ${details.age}\n`;
    if (details.breed) text += `Breed: ${details.breed}\n`;
    if (details.size) text += `Size: ${details.size}\n`;
    if (details.energyLevel) text += `Energy Level: ${details.energyLevel}\n`;
    if (details.quirks.length > 0) text += `Traits: ${details.quirks.join(', ')}\n`;
    if (details.specialNeeds) text += `Special Notes: ${details.specialNeeds}\n`;
    
    if (bio) {
      text += '\n--- GENERATED BIO ---\n';
      text += `${bio.headline}\n\n`;
      text += `${bio.description}\n\n`;
      text += `${bio.callToAction}\n`;
    }
    
    return text;
  };

  const generateJSONExport = () => {
    return JSON.stringify({
      petDetails: details,
      photoCount: photos.length,
      generatedBio: bio,
      exportDate: new Date().toISOString()
    }, null, 2);
  };

  const generateHTMLExport = () => {
    const photoHTML = photos.length > 0 ? `<img src="${photos[0]}" alt="${details.name}" style="width: 100%; max-width: 400px; border-radius: 8px; margin-bottom: 16px;">` : '';
    
    return `<!DOCTYPE html>
<html>
<head>
    <title>${details.name || 'Pet'} - Adoption Profile</title>
    <style>
        body { font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; line-height: 1.5; }
        .card { border: 2px solid #000; border-radius: 8px; padding: 24px; background: white; }
        .badge { background: #C5A3E0; color: white; padding: 4px 8px; border-radius: 8px; font-size: 12px; margin-right: 8px; }
        .headline { font-size: 24px; font-weight: 600; color: #F29E8E; margin-bottom: 16px; }
    </style>
</head>
<body>
    <div class="card">
        ${photoHTML}
        <h1>${details.name || 'Pet Name'}</h1>
        <p><strong>Breed:</strong> ${details.breed || 'Not specified'}</p>
        <p><strong>Age:</strong> ${details.age || 'Not specified'}</p>
        <p><strong>Size:</strong> ${details.size || 'Not specified'}</p>
        <p><strong>Energy Level:</strong> ${details.energyLevel || 'Not specified'}</p>
        ${details.quirks.length > 0 ? `<p><strong>Traits:</strong> ${details.quirks.map(q => `<span class="badge">${q}</span>`).join('')}</p>` : ''}
        ${bio ? `
        <div style="margin-top: 24px;">
            <h2 class="headline">${bio.headline}</h2>
            <p>${bio.description}</p>
            <p><em>${bio.callToAction}</em></p>
        </div>` : ''}
        ${details.specialNeeds ? `<div style="background: #F29E8E20; border: 2px solid #F29E8E; border-radius: 8px; padding: 16px; margin-top: 16px;"><strong>Special Notes:</strong> ${details.specialNeeds}</div>` : ''}
    </div>
</body>
</html>`;
  };

  const generateSocialMediaPost = () => {
    const hashtags = ['#AdoptDontShop', '#RescuePet', '#ForeverHome', '#AdoptMe'];
    if (details.breed) hashtags.push(`#${details.breed.replace(' ', '')}`);
    
    let post = '';
    if (bio?.headline) post += `${bio.headline}\n\n`;
    if (details.name) post += `🐾 Meet ${details.name}! `;
    if (details.age && details.breed) post += `This ${details.age} ${details.breed} `;
    if (details.quirks.length > 0) post += `is ${details.quirks.slice(0, 2).join(' and ')}. `;
    if (bio?.callToAction) post += `\n\n${bio.callToAction}`;
    post += `\n\n${hashtags.join(' ')}`;
    
    return post;
  };

  const copyToClipboard = async (content: string, format: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedFormat(format);
      toast.success(`${format} copied to clipboard!`);
      setTimeout(() => setCopiedFormat(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      toast.error('Failed to copy content');
    }
  };

  const downloadFile = (content: string, filename: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success(`${filename} downloaded!`);
  };

  if (!details.name && !bio) {
    return (
      <div className="h-full flex items-center justify-center text-center">
        <div>
          <div className="text-4xl mb-3">💾</div>
          <h4 className="font-semibold text-black mb-1">Ready to Export</h4>
          <p className="text-sm text-muted-foreground">
            Complete pet details and generate a bio to enable export options
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 h-full overflow-auto">
      
      {/* Export Status */}
      <div className="flex items-center justify-between flex-shrink-0">
        <h4 className="font-medium text-black">Export Formats</h4>
        <div className="flex gap-2">
          <Badge className="bg-mint text-white outline outline-2 outline-mint text-xs rounded-solvd font-medium">
            📸 {photos.length} photo{photos.length !== 1 ? 's' : ''}
          </Badge>
          {bio && (
            <Badge className="bg-coral text-white outline outline-2 outline-coral text-xs rounded-solvd font-medium">
              ✨ Bio Ready
            </Badge>
          )}
        </div>
      </div>

      <div className="space-y-3 flex-1 overflow-auto">
        {/* Text Export */}
        <div className="card-base p-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span>📄</span>
              <span className="font-medium text-black">Plain Text</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Simple text format for emails and documents
            </p>
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={() => copyToClipboard(generateTextExport(), 'Text')}
                className="btn-mint flex-1"
              >
                {copiedFormat === 'Text' ? <span className="mr-1">✅</span> : <span className="mr-1">📋</span>}
                Copy
              </Button>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => downloadFile(generateTextExport(), `${details.name || 'pet'}-profile.txt`, 'text/plain')}
              >
                💾
              </Button>
            </div>
          </div>
        </div>

        {/* HTML Export */}
        <div className="card-base p-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span>🌐</span>
              <span className="font-medium text-black">HTML Page</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Complete web page with styling and photos
            </p>
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={() => copyToClipboard(generateHTMLExport(), 'HTML')}
                className="btn-lavender flex-1"
              >
                {copiedFormat === 'HTML' ? <span className="mr-1">✅</span> : <span className="mr-1">📋</span>}
                Copy
              </Button>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => downloadFile(generateHTMLExport(), `${details.name || 'pet'}-profile.html`, 'text/html')}
              >
                💾
              </Button>
            </div>
          </div>
        </div>

        {/* JSON Export */}
        <div className="card-base p-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span>⚙️</span>
              <span className="font-medium text-black">JSON Data</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Structured data for integration with other systems
            </p>
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={() => copyToClipboard(generateJSONExport(), 'JSON')}
                className="btn-coral flex-1"
              >
                {copiedFormat === 'JSON' ? <span className="mr-1">✅</span> : <span className="mr-1">📋</span>}
                Copy
              </Button>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => downloadFile(generateJSONExport(), `${details.name || 'pet'}-data.json`, 'application/json')}
              >
                💾
              </Button>
            </div>
          </div>
        </div>

        {/* Social Media Export */}
        <div className="card-base p-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span>📱</span>
              <span className="font-medium text-black">Social Media Post</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Optimized for Facebook, Twitter, Instagram
            </p>
            <Button
              size="sm"
              onClick={() => copyToClipboard(generateSocialMediaPost(), 'Social Media')}
              className="btn-mint w-full"
            >
              {copiedFormat === 'Social Media' ? <span className="mr-1">✅</span> : <span className="mr-1">📋</span>}
              Copy Social Post
            </Button>
          </div>
        </div>
      </div>

      {/* Photo Export Note */}
      {photos.length > 0 && (
        <div className="bg-muted outline outline-2 outline-black rounded-solvd p-3 flex-shrink-0">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>💡</span>
            <span>Photos are embedded in HTML exports. For other formats, save photos separately.</span>
          </div>
        </div>
      )}
    </div>
  );
}
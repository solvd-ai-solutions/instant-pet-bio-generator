export interface BioData {
  headline: string;
  description: string;
  callToAction: string;
}

export interface PetData {
  name: string;
  age: string;
  breed: string;
  energyLevel: string;
  size: string;
  quirks: string[];
  specialNeeds: string;
}

export interface CodexResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

class CodexService {
  private apiKey: string | null = null;
  private baseUrl = 'https://api.openai.com/v1/chat/completions';

  setApiKey(key: string) {
    this.apiKey = key;
  }

  private async makeRequest(prompt: string): Promise<CodexResponse> {
    if (!this.apiKey) {
      throw new Error('API key not set. Please configure your Codex API key.');
    }

    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are an expert pet adoption bio writer. Create compelling, warm, and engaging adoption bios that help pets find their forever homes. Use emojis sparingly but effectively. Keep headlines under 60 characters, descriptions 2-3 sentences, and call-to-actions under 40 characters.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    return response.json();
  }

  private parseBioResponse(content: string): BioData {
    const lines = content.split('\n').filter(line => line.trim());
    
    let headline = '';
    let description = '';
    let callToAction = '';

    for (const line of lines) {
      if (line.toLowerCase().includes('headline') || line.toLowerCase().includes('title')) {
        headline = line.split(':')[1]?.trim() || line.trim();
      } else if (line.toLowerCase().includes('description') || line.toLowerCase().includes('bio')) {
        description = line.split(':')[1]?.trim() || line.trim();
      } else if (line.toLowerCase().includes('call') || line.toLowerCase().includes('action')) {
        callToAction = line.split(':')[1]?.trim() || line.trim();
      }
    }

    if (!headline && !description && !callToAction) {
      const parts = content.split('\n\n');
      if (parts.length >= 3) {
        headline = parts[0].trim();
        description = parts[1].trim();
        callToAction = parts[2].trim();
      } else {
        description = content.trim();
        headline = 'Meet this wonderful pet! 🐾';
        callToAction = 'Adopt Today! ❤️';
      }
    }

    return {
      headline: headline || 'Meet this wonderful pet! 🐾',
      description: description || 'This amazing pet is looking for a forever home!',
      callToAction: callToAction || 'Adopt Today! ❤️'
    };
  }

  async generateBio(petData: PetData, photos: string[] = []): Promise<BioData> {
    const prompt = this.buildPrompt(petData, photos);
    
    try {
      const response = await this.makeRequest(prompt);
      const content = response.choices[0]?.message?.content;
      
      if (!content) {
        throw new Error('No content received from API');
      }

      return this.parseBioResponse(content);
    } catch (error) {
      console.error('Codex API error:', error);
      throw error;
    }
  }

  private buildPrompt(petData: PetData, photos: string[]): string {
    const photoContext = photos.length > 0 
      ? `\nPhotos: ${photos.length} photo(s) uploaded - consider visual appeal in the bio.`
      : '\nPhotos: No photos uploaded - focus on personality and characteristics.';

    return `Generate a compelling pet adoption bio for ${petData.name || 'this wonderful pet'}.

Pet Details:
- Name: ${petData.name || 'Unknown'}
- Age: ${petData.age || 'Unknown'}
- Breed: ${petData.breed || 'Mixed breed'}
- Size: ${petData.size || 'Unknown'}
- Energy Level: ${petData.energyLevel || 'Unknown'}
- Special Needs: ${petData.specialNeeds || 'None'}
- Quirks/Personality: ${petData.quirks.join(', ') || 'None'}${photoContext}

Please provide the bio in this format:
Headline: [catchy headline under 60 characters]
Description: [compelling 2-3 sentence description]
Call to Action: [engaging call-to-action under 40 characters]

Make it warm, engaging, and focused on finding a forever home. Use emojis sparingly but effectively.`;
  }

  async generateDemoBio(petData: PetData): Promise<BioData> {
    await new Promise(resolve => setTimeout(resolve, 2000));

    const name = petData.name || 'this adorable pet';
    const breed = petData.breed || 'mixed breed';
    const age = petData.age || 'young';
    const size = petData.size || 'medium';
    const energy = petData.energyLevel || 'moderate';
    const quirks = petData.quirks.length > 0 ? petData.quirks.join(', ') : 'loving personality';

    const headlines = [
      `Meet ${name}! 🐾`,
      `${name} is looking for love! ❤️`,
      `Adopt ${name} today! 🏠`,
      `${name} needs a forever home! 🐕`,
      `Fall in love with ${name}! 💕`
    ];

    const descriptions = [
      `${name} is a beautiful ${breed} who is ${age} and full of life. This ${size} sized companion has a ${energy} energy level and loves ${quirks}. Ready to bring joy and laughter to your family!`,
      `Say hello to ${name}! This wonderful ${breed} is ${age} and has a heart of gold. With a ${energy} energy level and ${quirks}, ${name} is the perfect addition to any loving home.`,
      `Looking for unconditional love? Meet ${name}! This adorable ${breed} is ${age} and has a ${energy} energy level. ${name} loves ${quirks} and is ready to become your new best friend.`
    ];

    const callToActions = [
      'Adopt Today! 🐾',
      'Meet Your Match! ❤️',
      'Apply Now! 🏠',
      'Contact Us! 📞',
      'Learn More! 💕'
    ];

    return {
      headline: headlines[Math.floor(Math.random() * headlines.length)],
      description: descriptions[Math.floor(Math.random() * descriptions.length)],
      callToAction: callToActions[Math.floor(Math.random() * callToActions.length)]
    };
  }
}

export const codexService = new CodexService();

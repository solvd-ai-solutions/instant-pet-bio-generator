import { BioData, PetData } from './codexService';

export interface ExportOptions {
  format: 'pdf' | 'social' | 'print' | 'clipboard';
  includePhotos: boolean;
  includeContactInfo: boolean;
}

class ExportService {
  async exportToPDF(petData: PetData, bioData: BioData, photos: string[]): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Generating PDF with:', { petData, bioData, photos });
    
    const pdfContent = this.generatePDFContent(petData, bioData, photos);
    this.downloadFile(pdfContent, 'pet-adoption-bio.pdf', 'application/pdf');
  }

  async exportToSocialMedia(petData: PetData, bioData: BioData, photos: string[]): Promise<void> {
    const socialContent = this.generateSocialContent(petData, bioData, photos);
    
    await navigator.clipboard.writeText(socialContent);
    
    this.showNotification('Social media content copied to clipboard! 📱');
  }

  async exportToPrint(petData: PetData, bioData: BioData, photos: string[]): Promise<void> {
    const printContent = this.generatePrintContent(petData, bioData, photos);
    
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.print();
    }
  }

  async copyToClipboard(petData: PetData, bioData: BioData, photos: string[]): Promise<void> {
    const clipboardContent = this.generateClipboardContent(petData, bioData, photos);
    
    try {
      await navigator.clipboard.writeText(clipboardContent);
      this.showNotification('Content copied to clipboard! 📋');
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      this.showNotification('Failed to copy to clipboard. Please try again.');
    }
  }

  private generatePDFContent(petData: PetData, bioData: BioData, photos: string[]): string {
    return `
      <html>
        <head>
          <title>Pet Adoption Bio - ${petData.name}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .pet-info { margin-bottom: 20px; }
            .bio-section { margin-bottom: 20px; }
            .photo-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px; margin: 20px 0; }
            .contact-info { margin-top: 30px; padding: 20px; background: #f5f5f5; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>🐾 Pet Adoption Bio</h1>
            <h2>${petData.name || 'Adorable Pet'}</h2>
          </div>
          
          <div class="pet-info">
            <h3>Pet Details:</h3>
            <p><strong>Name:</strong> ${petData.name || 'Unknown'}</p>
            <p><strong>Age:</strong> ${petData.age || 'Unknown'}</p>
            <p><strong>Breed:</strong> ${petData.breed || 'Mixed breed'}</p>
            <p><strong>Size:</strong> ${petData.size || 'Unknown'}</p>
            <p><strong>Energy Level:</strong> ${petData.energyLevel || 'Unknown'}</p>
            <p><strong>Special Needs:</strong> ${petData.specialNeeds || 'None'}</p>
            <p><strong>Personality:</strong> ${petData.quirks.join(', ') || 'Loving'}</p>
          </div>
          
          <div class="bio-section">
            <h3>Adoption Bio:</h3>
            <h4>${bioData.headline}</h4>
            <p>${bioData.description}</p>
            <p><strong>${bioData.callToAction}</strong></p>
          </div>
          
          ${photos.length > 0 ? `
            <div class="photo-grid">
              <h3>Photos:</h3>
              ${photos.map((photo, index) => `
                <img src="${photo}" alt="Pet photo ${index + 1}" style="max-width: 200px; height: auto;">
              `).join('')}
            </div>
          ` : ''}
          
          <div class="contact-info">
            <h3>Contact Information:</h3>
            <p><strong>Shelter:</strong> [Your Shelter Name]</p>
            <p><strong>Phone:</strong> [Phone Number]</p>
            <p><strong>Email:</strong> [Email Address]</p>
            <p><strong>Address:</strong> [Shelter Address]</p>
          </div>
        </body>
      </html>
    `;
  }

  private generateSocialContent(petData: PetData, bioData: BioData, photos: string[]): string {
    const hashtags = '#PetAdoption #AdoptDontShop #RescuePet #ForeverHome #PetLove';
    
    return `${bioData.headline}

${bioData.description}

${bioData.callToAction}

📞 Contact us for more information!
📍 [Shelter Location]

${hashtags}

#${petData.breed?.replace(/\s+/g, '') || 'MixedBreed'} #${petData.size || 'Medium'}Pet`;
  }

  private generatePrintContent(petData: PetData, bioData: BioData, photos: string[]): string {
    return `
      <html>
        <head>
          <title>Print - ${petData.name}</title>
          <style>
            @media print {
              body { margin: 0; padding: 20px; }
              .no-print { display: none; }
            }
            body { font-family: Arial, sans-serif; }
            .print-header { text-align: center; margin-bottom: 20px; }
            .pet-details { margin-bottom: 20px; }
            .bio-content { margin-bottom: 20px; }
            .contact-section { margin-top: 30px; }
          </style>
        </head>
        <body>
          <div class="print-header">
            <h1>🐾 Pet Adoption Profile</h1>
            <h2>${petData.name || 'Adorable Pet'}</h2>
          </div>
          
          <div class="pet-details">
            <h3>Pet Information:</h3>
            <p><strong>Name:</strong> ${petData.name || 'Unknown'}</p>
            <p><strong>Age:</strong> ${petData.age || 'Unknown'}</p>
            <p><strong>Breed:</strong> ${petData.breed || 'Mixed breed'}</p>
            <p><strong>Size:</strong> ${petData.size || 'Unknown'}</p>
            <p><strong>Energy Level:</strong> ${petData.energyLevel || 'Unknown'}</p>
            <p><strong>Special Needs:</strong> ${petData.specialNeeds || 'None'}</p>
            <p><strong>Personality:</strong> ${petData.quirks.join(', ') || 'Loving'}</p>
          </div>
          
          <div class="bio-content">
            <h3>Adoption Bio:</h3>
            <h4>${bioData.headline}</h4>
            <p>${bioData.description}</p>
            <p><strong>${bioData.callToAction}</strong></p>
          </div>
          
          <div class="contact-section">
            <h3>Contact Information:</h3>
            <p><strong>Shelter:</strong> [Your Shelter Name]</p>
            <p><strong>Phone:</strong> [Phone Number]</p>
            <p><strong>Email:</strong> [Email Address]</p>
            <p><strong>Address:</strong> [Shelter Address]</p>
            <p><strong>Website:</strong> [Website URL]</p>
          </div>
          
          <div class="no-print">
            <button onclick="window.print()">Print This Page</button>
          </div>
        </body>
      </html>
    `;
  }

  private generateClipboardContent(petData: PetData, bioData: BioData, photos: string[]): string {
    return `${bioData.headline}

${bioData.description}

${bioData.callToAction}

Pet Details:
- Name: ${petData.name || 'Unknown'}
- Age: ${petData.age || 'Unknown'}
- Breed: ${petData.breed || 'Mixed breed'}
- Size: ${petData.size || 'Unknown'}
- Energy Level: ${petData.energyLevel || 'Unknown'}
- Special Needs: ${petData.specialNeeds || 'None'}
- Personality: ${petData.quirks.join(', ') || 'Loving'}

Contact: [Your Contact Information]`;
  }

  private downloadFile(content: string, filename: string, mimeType: string): void {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  private showNotification(message: string): void {
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #4FB3A6;
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      border: 2px solid #4FB3A6;
      z-index: 1000;
      font-weight: 500;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 3000);
  }
}

export const exportService = new ExportService();

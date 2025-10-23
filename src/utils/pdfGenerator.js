import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// Reliable PDF generation with fallback strategies
export const generateResumePDF = async (element, fileName = 'Resume_CV.pdf') => {
  if (!element) {
    throw new Error('No resume element provided for PDF generation');
  }

  try {
    console.log('Starting reliable PDF generation for resume element:', element);

    // Ensure the element is visible and has content
    if (!element.offsetWidth || !element.offsetHeight) {
      throw new Error('Resume element is not visible or has no content');
    }

    // Get the exact resume card element (not the wrapper)
    const resumeCard = element.querySelector('.resume-card') || element;
    
    console.log('Resume card element:', resumeCard);
    console.log('Resume card dimensions:', resumeCard.offsetWidth, 'x', resumeCard.offsetHeight);
    
    // Calculate actual content height
    const actualHeight = Math.max(resumeCard.scrollHeight, resumeCard.offsetHeight);
    const a4WidthPx = 794; // A4 width in pixels at 96 DPI
    
    console.log('Actual content height:', actualHeight, 'px');

    // Wait for fonts and images to load
    await new Promise(resolve => {
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(resolve);
      } else {
        setTimeout(resolve, 1000);
      }
    });

    // Additional wait for any dynamic content
    await new Promise(resolve => setTimeout(resolve, 500));

    // Try different capture strategies
    let canvas;
    try {
      console.log('Attempting basic reliable capture...');
      canvas = await captureReliable(resumeCard, a4WidthPx, actualHeight);
    } catch (error) {
      console.warn('Reliable capture failed, trying simple capture:', error);
      try {
        canvas = await captureSimple(resumeCard);
      } catch (fallbackError) {
        console.error('All capture methods failed:', fallbackError);
        throw new Error('Failed to capture resume content. Please try refreshing the page.');
      }
    }

    console.log('Canvas generated successfully:', canvas.width, 'x', canvas.height);

    // Generate PDF with optimal settings
    const pdf = await generatePDFFromCanvas(canvas, fileName);
    
    console.log('PDF download initiated:', fileName);
    return true;
    
  } catch (error) {
    console.error('PDF generation error:', error);
    console.error('Error stack:', error.stack);
    throw new Error(`Failed to generate PDF: ${error.message}`);
  }
};

// Reliable canvas capture with conservative settings
const captureReliable = async (resumeCard, width, height) => {
  return await html2canvas(resumeCard, {
    scale: 2, // Moderate scale to avoid memory issues
    backgroundColor: '#ffffff',
    useCORS: true,
    allowTaint: false,
    logging: true, // Enable logging for debugging
    removeContainer: true,
    foreignObjectRendering: false,
    width: width,
    height: height,
    scrollX: 0,
    scrollY: 0,
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight,
    onclone: (clonedDoc) => {
      console.log('Applying reliable PDF styles...');
      applyReliablePDFStyles(clonedDoc, width, height);
    }
  });
};

// Simple fallback capture
const captureSimple = async (resumeCard) => {
  return await html2canvas(resumeCard, {
    scale: 1, // Low scale for compatibility
    backgroundColor: '#ffffff',
    useCORS: false,
    allowTaint: true,
    logging: true,
    removeContainer: false,
    foreignObjectRendering: true,
    onclone: (clonedDoc) => {
      console.log('Applying simple PDF styles...');
      const clonedElement = clonedDoc.querySelector('.resume-card');
      if (clonedElement) {
        clonedElement.style.transform = 'none';
        clonedElement.style.boxShadow = 'none';
        clonedElement.style.background = '#ffffff';
      }
    }
  });
};

// Apply reliable PDF-specific styles to cloned document
const applyReliablePDFStyles = (clonedDoc, width, height) => {
  console.log('Applying PDF styles to cloned document...');
  
  const clonedElement = clonedDoc.querySelector('.resume-card');
  if (clonedElement) {
    // Remove all potentially problematic styles
    clonedElement.style.boxShadow = 'none';
    clonedElement.style.margin = '0';
    clonedElement.style.border = 'none';
    clonedElement.style.borderRadius = '0';
    clonedElement.style.transform = 'none';
    clonedElement.style.filter = 'none';
    clonedElement.style.backdropFilter = 'none';
    clonedElement.style.opacity = '1';
    
    // Set clean dimensions
    clonedElement.style.width = width + 'px';
    clonedElement.style.maxWidth = width + 'px';
    clonedElement.style.minHeight = height + 'px';
    clonedElement.style.height = 'auto';
    clonedElement.style.padding = '40px';
    
    // Clean background and colors
    clonedElement.style.background = '#ffffff';
    clonedElement.style.backgroundColor = '#ffffff';
    
    // Typography improvements
    clonedElement.style.fontSize = '14px';
    clonedElement.style.lineHeight = '1.4';
    clonedElement.style.color = '#333333';
    clonedElement.style.fontFamily = 'Arial, sans-serif';
    
    // Layout fixes
    clonedElement.style.boxSizing = 'border-box';
    clonedElement.style.overflow = 'visible';
    clonedElement.style.position = 'relative';
    clonedElement.style.zIndex = '1';
  }
  
  // Add global styles to prevent rendering issues
  const style = clonedDoc.createElement('style');
  style.textContent = `
    * {
      box-sizing: border-box !important;
      transform: none !important;
      filter: none !important;
      backdrop-filter: none !important;
      -webkit-transform: none !important;
      -webkit-filter: none !important;
    }
    
    .resume-card {
      transform: none !important;
      scale: none !important;
      background: #ffffff !important;
      overflow: visible !important;
    }
    
    .resume-card * {
      transform: none !important;
      transition: none !important;
      animation: none !important;
    }
    
    /* Hide any problematic elements */
    .download-pdf-btn,
    .resume-download-container {
      display: none !important;
    }
  `;
  clonedDoc.head.appendChild(style);
  
  console.log('PDF styles applied successfully');
};

// Generate PDF from canvas with reliable settings
const generatePDFFromCanvas = async (canvas, fileName) => {
  console.log('Creating PDF from canvas...');
  
  const a4Width = 210; // A4 width in mm
  
  // Calculate height based on canvas aspect ratio to maintain A4 width
  const canvasRatio = canvas.height / canvas.width;
  const pdfHeight = a4Width * canvasRatio;
  
  console.log('PDF dimensions:', {
    width: `${a4Width}mm`,
    height: `${pdfHeight.toFixed(1)}mm`,
    canvas: `${canvas.width}x${canvas.height}px`,
    aspectRatio: canvasRatio.toFixed(3)
  });
  
  // Create PDF with custom height to fit all content
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: [a4Width, pdfHeight],
    compress: true, // Enable compression for better compatibility
    precision: 2 // Lower precision for compatibility
  });
  
  // Convert canvas to image data with moderate quality for reliability
  const imgData = canvas.toDataURL('image/jpeg', 0.95); // Use JPEG with 95% quality
  
  // Add image to PDF
  pdf.addImage(imgData, 'JPEG', 0, 0, a4Width, pdfHeight, '', 'FAST');
  
  console.log('PDF created successfully with full content height');
  pdf.save(fileName);
  
  return pdf;
};
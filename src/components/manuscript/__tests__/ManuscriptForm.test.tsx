/**
 * Unit Tests for ManuscriptForm and related components
 * 
 * Tests cover:
 * - Component rendering
 * - Validation error display
 * - Drag & drop behavior for PDF upload
 * 
 * Requirements: 2.4, 2.5, 3.7, 4.7, 4.8, 4.9
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ManuscriptForm } from '../ManuscriptForm';
import { PersonalInfoSection } from '../PersonalInfoSection';
import { WorkDetailsSection } from '../WorkDetailsSection';
import { PdfUploadSection } from '../PdfUploadSection';
import { validatePdfFile, countWords } from '../../../lib/validations/manuscript';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { manuscriptSchema, ManuscriptFormData } from '../../../lib/validations/manuscript';

// Mock sonner toast
jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

// Wrapper component for testing PersonalInfoSection
function PersonalInfoSectionWrapper() {
  const { register, formState: { errors } } = useForm<ManuscriptFormData>({
    resolver: zodResolver(manuscriptSchema),
    mode: 'onChange',
  });
  return <PersonalInfoSection register={register} errors={errors} />;
}

// Wrapper component for testing WorkDetailsSection
function WorkDetailsSectionWrapper() {
  const { register, formState: { errors }, control } = useForm<ManuscriptFormData>({
    resolver: zodResolver(manuscriptSchema),
    mode: 'onChange',
  });
  return <WorkDetailsSection register={register} errors={errors} control={control} />;
}

describe('ManuscriptForm - Component Rendering', () => {
  it('should render the form with all three sections', () => {
    render(<ManuscriptForm />);
    
    // Check form is rendered
    expect(screen.getByTestId('manuscript-form')).toBeInTheDocument();
    
    // Check all three sections are present
    expect(screen.getByTestId('personal-info-section')).toBeInTheDocument();
    expect(screen.getByTestId('work-details-section')).toBeInTheDocument();
    expect(screen.getByTestId('pdf-upload-section')).toBeInTheDocument();
  });

  it('should render the submit button', () => {
    render(<ManuscriptForm />);
    
    const submitButton = screen.getByTestId('submit-button');
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toHaveTextContent('Envoyer mon manuscrit');
  });

  it('should render the privacy policy text with link', () => {
    render(<ManuscriptForm />);
    
    expect(screen.getByTestId('privacy-policy-text')).toBeInTheDocument();
    expect(screen.getByTestId('privacy-policy-link')).toBeInTheDocument();
    expect(screen.getByTestId('privacy-policy-link')).toHaveAttribute('href', '/politique-confidentialite');
  });

  it('should have submit button disabled initially', () => {
    render(<ManuscriptForm />);
    
    const submitButton = screen.getByTestId('submit-button');
    expect(submitButton).toBeDisabled();
  });
});

describe('PersonalInfoSection - Rendering', () => {
  it('should render section number and title', () => {
    render(<PersonalInfoSectionWrapper />);
    
    expect(screen.getByTestId('section-number')).toHaveTextContent('1');
    expect(screen.getByText('Informations personnelles')).toBeInTheDocument();
  });

  it('should render all personal info fields', () => {
    render(<PersonalInfoSectionWrapper />);
    
    expect(screen.getByTestId('lastName-input')).toBeInTheDocument();
    expect(screen.getByTestId('firstName-input')).toBeInTheDocument();
    expect(screen.getByTestId('phone-input')).toBeInTheDocument();
    expect(screen.getByTestId('residence-input')).toBeInTheDocument();
    expect(screen.getByTestId('email-input')).toBeInTheDocument();
  });

  it('should have correct placeholders', () => {
    render(<PersonalInfoSectionWrapper />);
    
    expect(screen.getByPlaceholderText('Votre nom')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Votre prénom')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('+228 90 00 00 00')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Ville, Pays')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('votre@email.com')).toBeInTheDocument();
  });
});

describe('WorkDetailsSection - Rendering', () => {
  it('should render section number and title', () => {
    render(<WorkDetailsSectionWrapper />);
    
    expect(screen.getByTestId('section-number')).toHaveTextContent('2');
    expect(screen.getByText("Détails de l'œuvre")).toBeInTheDocument();
  });

  it('should render all work details fields', () => {
    render(<WorkDetailsSectionWrapper />);
    
    expect(screen.getByTestId('title-input')).toBeInTheDocument();
    expect(screen.getByTestId('genre-select')).toBeInTheDocument();
    expect(screen.getByTestId('synopsis-textarea')).toBeInTheDocument();
  });

  it('should display max words label', () => {
    render(<WorkDetailsSectionWrapper />);
    
    expect(screen.getByTestId('max-words-label')).toHaveTextContent('Max 500 mots');
  });

  it('should display word count', () => {
    render(<WorkDetailsSectionWrapper />);
    
    expect(screen.getByTestId('word-count')).toHaveTextContent('0 / 500 mots');
  });
});

describe('PdfUploadSection - Rendering', () => {
  const mockOnFileChange = jest.fn();

  beforeEach(() => {
    mockOnFileChange.mockClear();
  });

  it('should render section number and title', () => {
    render(<PdfUploadSection file={null} onFileChange={mockOnFileChange} />);
    
    expect(screen.getByTestId('section-number')).toHaveTextContent('3');
    expect(screen.getByText('Fichier PDF')).toBeInTheDocument();
  });

  it('should render drop zone with upload icon', () => {
    render(<PdfUploadSection file={null} onFileChange={mockOnFileChange} />);
    
    expect(screen.getByTestId('drop-zone')).toBeInTheDocument();
    expect(screen.getByTestId('upload-icon')).toBeInTheDocument();
  });

  it('should display drop zone text', () => {
    render(<PdfUploadSection file={null} onFileChange={mockOnFileChange} />);
    
    expect(screen.getByTestId('drop-text-main')).toHaveTextContent('Glissez votre fichier PDF ici');
    expect(screen.getByTestId('drop-text-secondary')).toHaveTextContent('ou cliquez pour parcourir');
    expect(screen.getByTestId('file-constraints')).toHaveTextContent('PDF uniquement, max 10 Mo');
  });

  it('should display file name when file is selected', () => {
    const mockFile = new File(['test content'], 'test-manuscript.pdf', { type: 'application/pdf' });
    
    render(<PdfUploadSection file={mockFile} onFileChange={mockOnFileChange} />);
    
    expect(screen.getByTestId('file-selected')).toBeInTheDocument();
    expect(screen.getByTestId('file-name')).toHaveTextContent('test-manuscript.pdf');
  });

  it('should display remove button when file is selected', () => {
    const mockFile = new File(['test content'], 'test-manuscript.pdf', { type: 'application/pdf' });
    
    render(<PdfUploadSection file={mockFile} onFileChange={mockOnFileChange} />);
    
    expect(screen.getByTestId('remove-file-button')).toBeInTheDocument();
  });

  it('should display error message when error prop is provided', () => {
    render(
      <PdfUploadSection 
        file={null} 
        onFileChange={mockOnFileChange} 
        error="Le fichier doit être au format PDF"
      />
    );
    
    expect(screen.getByTestId('error-message')).toHaveTextContent('Le fichier doit être au format PDF');
  });
});


describe('Validation Error Display - Requirements 2.4, 2.5', () => {
  it('should display error for empty lastName field', async () => {
    render(<PersonalInfoSectionWrapper />);
    
    const lastNameInput = screen.getByTestId('lastName-input');
    
    // Focus and blur to trigger validation
    fireEvent.focus(lastNameInput);
    fireEvent.change(lastNameInput, { target: { value: 'a' } });
    fireEvent.change(lastNameInput, { target: { value: '' } });
    fireEvent.blur(lastNameInput);
    
    await waitFor(() => {
      const errorElement = screen.queryByTestId('lastName-error');
      expect(errorElement).toBeInTheDocument();
    });
  });

  it('should display error for invalid email format', async () => {
    render(<PersonalInfoSectionWrapper />);
    
    const emailInput = screen.getByTestId('email-input');
    
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.blur(emailInput);
    
    await waitFor(() => {
      const errorElement = screen.queryByTestId('email-error');
      expect(errorElement).toBeInTheDocument();
    });
  });

  it('should display error for whitespace-only lastName', async () => {
    render(<PersonalInfoSectionWrapper />);
    
    const lastNameInput = screen.getByTestId('lastName-input');
    
    fireEvent.change(lastNameInput, { target: { value: '   ' } });
    fireEvent.blur(lastNameInput);
    
    await waitFor(() => {
      const errorElement = screen.queryByTestId('lastName-error');
      expect(errorElement).toBeInTheDocument();
    });
  });
});

describe('Synopsis Word Count - Requirement 3.7', () => {
  it('should update word count as user types', async () => {
    render(<WorkDetailsSectionWrapper />);
    
    const synopsisTextarea = screen.getByTestId('synopsis-textarea');
    
    fireEvent.change(synopsisTextarea, { target: { value: 'This is a test synopsis' } });
    
    await waitFor(() => {
      expect(screen.getByTestId('word-count')).toHaveTextContent('5 / 500 mots');
    });
  });

  it('should display warning when synopsis exceeds 500 words', async () => {
    render(<WorkDetailsSectionWrapper />);
    
    const synopsisTextarea = screen.getByTestId('synopsis-textarea');
    
    // Generate text with more than 500 words
    const longText = Array(510).fill('mot').join(' ');
    
    fireEvent.change(synopsisTextarea, { target: { value: longText } });
    
    await waitFor(() => {
      expect(screen.getByTestId('synopsis-warning')).toBeInTheDocument();
      expect(screen.getByTestId('synopsis-warning')).toHaveTextContent('Le synopsis dépasse la limite de 500 mots');
    });
  });
});

describe('PDF File Validation - Requirements 4.8, 4.9', () => {
  it('should return error for null file', () => {
    const error = validatePdfFile(null);
    expect(error).toBe('Veuillez sélectionner un fichier PDF');
  });

  it('should return error for non-PDF file', () => {
    const nonPdfFile = new File(['test'], 'test.txt', { type: 'text/plain' });
    const error = validatePdfFile(nonPdfFile);
    expect(error).toBe('Le fichier doit être au format PDF');
  });

  it('should return error for file exceeding 10 Mo', () => {
    // Create a mock file larger than 10 Mo
    const largeContent = new ArrayBuffer(11 * 1024 * 1024);
    const largeFile = new File([largeContent], 'large.pdf', { type: 'application/pdf' });
    const error = validatePdfFile(largeFile);
    expect(error).toBe('Le fichier ne peut pas dépasser 10 Mo');
  });

  it('should return null for valid PDF file', () => {
    const validPdf = new File(['test content'], 'valid.pdf', { type: 'application/pdf' });
    const error = validatePdfFile(validPdf);
    expect(error).toBeNull();
  });
});

describe('PdfUploadSection - Drag & Drop Behavior', () => {
  const mockOnFileChange = jest.fn();

  beforeEach(() => {
    mockOnFileChange.mockClear();
  });

  it('should handle dragOver event', () => {
    render(<PdfUploadSection file={null} onFileChange={mockOnFileChange} />);
    
    const dropZone = screen.getByTestId('drop-zone');
    
    fireEvent.dragOver(dropZone, {
      dataTransfer: { files: [] },
    });
    
    // Check that the drop zone has the dragging state (border-gold class)
    expect(dropZone).toHaveClass('border-gold');
  });

  it('should handle dragLeave event', () => {
    render(<PdfUploadSection file={null} onFileChange={mockOnFileChange} />);
    
    const dropZone = screen.getByTestId('drop-zone');
    
    // First trigger dragOver
    fireEvent.dragOver(dropZone, {
      dataTransfer: { files: [] },
    });
    
    // Then trigger dragLeave
    fireEvent.dragLeave(dropZone, {
      dataTransfer: { files: [] },
    });
    
    // Check that the drop zone no longer has the dragging state
    expect(dropZone).not.toHaveClass('bg-primary/10');
  });

  it('should handle drop event with valid PDF file', () => {
    render(<PdfUploadSection file={null} onFileChange={mockOnFileChange} />);
    
    const dropZone = screen.getByTestId('drop-zone');
    const validPdf = new File(['test content'], 'test.pdf', { type: 'application/pdf' });
    
    fireEvent.drop(dropZone, {
      dataTransfer: {
        files: [validPdf],
      },
    });
    
    expect(mockOnFileChange).toHaveBeenCalledWith(validPdf);
  });

  it('should reject non-PDF file on drop', () => {
    render(<PdfUploadSection file={null} onFileChange={mockOnFileChange} />);
    
    const dropZone = screen.getByTestId('drop-zone');
    const invalidFile = new File(['test content'], 'test.txt', { type: 'text/plain' });
    
    fireEvent.drop(dropZone, {
      dataTransfer: {
        files: [invalidFile],
      },
    });
    
    // Should call onFileChange with null due to validation error
    expect(mockOnFileChange).toHaveBeenCalledWith(null);
  });

  it('should handle click to open file selector', async () => {
    render(<PdfUploadSection file={null} onFileChange={mockOnFileChange} />);
    
    const dropZone = screen.getByTestId('drop-zone');
    const fileInput = screen.getByTestId('file-input');
    
    // Mock click on file input
    const clickSpy = jest.spyOn(fileInput, 'click');
    
    fireEvent.click(dropZone);
    
    expect(clickSpy).toHaveBeenCalled();
    clickSpy.mockRestore();
  });

  it('should handle keyboard navigation (Enter key)', async () => {
    render(<PdfUploadSection file={null} onFileChange={mockOnFileChange} />);
    
    const dropZone = screen.getByTestId('drop-zone');
    const fileInput = screen.getByTestId('file-input');
    
    const clickSpy = jest.spyOn(fileInput, 'click');
    
    dropZone.focus();
    fireEvent.keyDown(dropZone, { key: 'Enter' });
    
    expect(clickSpy).toHaveBeenCalled();
    clickSpy.mockRestore();
  });

  it('should handle keyboard navigation (Space key)', async () => {
    render(<PdfUploadSection file={null} onFileChange={mockOnFileChange} />);
    
    const dropZone = screen.getByTestId('drop-zone');
    const fileInput = screen.getByTestId('file-input');
    
    const clickSpy = jest.spyOn(fileInput, 'click');
    
    dropZone.focus();
    fireEvent.keyDown(dropZone, { key: ' ' });
    
    expect(clickSpy).toHaveBeenCalled();
    clickSpy.mockRestore();
  });

  it('should remove file when remove button is clicked', async () => {
    const mockFile = new File(['test content'], 'test.pdf', { type: 'application/pdf' });
    
    render(<PdfUploadSection file={mockFile} onFileChange={mockOnFileChange} />);
    
    const removeButton = screen.getByTestId('remove-file-button');
    
    fireEvent.click(removeButton);
    
    expect(mockOnFileChange).toHaveBeenCalledWith(null);
  });
});

describe('countWords utility function', () => {
  it('should count words correctly', () => {
    expect(countWords('hello world')).toBe(2);
    expect(countWords('one two three four five')).toBe(5);
    expect(countWords('')).toBe(0);
    expect(countWords('   ')).toBe(0);
    expect(countWords('word')).toBe(1);
  });

  it('should handle multiple spaces between words', () => {
    expect(countWords('hello    world')).toBe(2);
    expect(countWords('  hello  world  ')).toBe(2);
  });

  it('should handle newlines and tabs', () => {
    expect(countWords('hello\nworld')).toBe(2);
    expect(countWords('hello\tworld')).toBe(2);
    expect(countWords('hello\n\nworld')).toBe(2);
  });
});

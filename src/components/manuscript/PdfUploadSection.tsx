"use client";

import { useRef, useState, useCallback } from "react";
import { cn } from "../../lib/utils";
import { Upload, FileText, X } from "lucide-react";
import { validatePdfFile } from "../../lib/validations/manuscript";

/**
 * Props pour le composant PdfUploadSection
 */
interface PdfUploadSectionProps {
  file: File | null;
  onFileChange: (file: File | null) => void;
  error?: string;
}

/**
 * PdfUploadSection - Section 3 du formulaire de soumission de manuscrit
 * 
 * Permet l'upload d'un fichier PDF via:
 * - Zone de drag & drop avec bordure pointillée
 * - Clic pour parcourir les fichiers
 * 
 * Affiche:
 * - Icône de téléchargement verte
 * - Texte "Glissez votre fichier PDF ici"
 * - Texte "ou cliquez pour parcourir"
 * - Indication "PDF uniquement, max 10 Mo"
 * - Nom du fichier sélectionné
 * - Erreurs de validation
 * 
 * Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9
 */
export function PdfUploadSection({ file, onFileChange, error }: PdfUploadSectionProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Erreur à afficher (priorité à l'erreur externe)
  const displayError = error || localError;

  /**
   * Gère la sélection d'un fichier (via input ou drop)
   */
  const handleFileSelect = useCallback((selectedFile: File | null) => {
    setLocalError(null);
    
    if (selectedFile) {
      // Valider le fichier
      const validationError = validatePdfFile(selectedFile);
      if (validationError) {
        setLocalError(validationError);
        onFileChange(null);
        return;
      }
    }
    
    onFileChange(selectedFile);
  }, [onFileChange]);

  /**
   * Gère le clic sur la zone de drop pour ouvrir le sélecteur de fichiers
   */
  const handleClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  /**
   * Gère le changement de fichier via l'input
   */
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    handleFileSelect(selectedFile);
  }, [handleFileSelect]);

  /**
   * Gère l'événement dragOver pour activer l'état de drag
   */
  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  /**
   * Gère l'événement dragLeave pour désactiver l'état de drag
   */
  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  /**
   * Gère le drop d'un fichier
   */
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files?.[0] || null;
    handleFileSelect(droppedFile);
  }, [handleFileSelect]);

  /**
   * Supprime le fichier sélectionné
   */
  const handleRemoveFile = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setLocalError(null);
    onFileChange(null);
    // Reset l'input file
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [onFileChange]);

  /**
   * Gère la navigation au clavier pour l'accessibilité
   */
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  }, [handleClick]);

  return (
    <div className="space-y-4" data-testid="pdf-upload-section">
      {/* En-tête de section avec numéro */}
      <div className="flex items-center gap-3 mb-4">
        {/* Numéro "3" dans un cercle or */}
        <div
          className={cn(
            "w-8 h-8",
            "rounded-full",
            "bg-gold",
            "flex items-center justify-center",
            "text-dark font-semibold text-sm"
          )}
          data-testid="section-number"
        >
          3
        </div>
        <h2 className="text-lg font-semibold text-gold">
          Fichier PDF
        </h2>
      </div>

      {/* Zone de drag & drop */}
      <div
        role="button"
        tabIndex={0}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "relative",
          "border-2 border-dashed rounded-lg",
          "p-8",
          "flex flex-col items-center justify-center",
          "cursor-pointer",
          "transition-all duration-200",
          // État normal
          !isDragging && !displayError && "border-dark-lighter bg-dark hover:border-gold hover:bg-gold/5",
          // État drag actif
          isDragging && "border-gold bg-gold/10",
          // État erreur
          displayError && "border-red-400 bg-red-900/20"
        )}
        aria-label="Zone de dépôt de fichier PDF"
        aria-describedby={displayError ? "pdf-error" : undefined}
        data-testid="drop-zone"
      >
        {/* Input file caché */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,application/pdf"
          onChange={handleInputChange}
          className="hidden"
          aria-hidden="true"
          data-testid="file-input"
        />

        {file ? (
          /* Affichage du fichier sélectionné */
          <div className="flex flex-col items-center gap-3" data-testid="file-selected">
            <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
              <FileText className="w-6 h-6 text-gold" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-light" data-testid="file-name">
                {file.name}
              </span>
              <button
                type="button"
                onClick={handleRemoveFile}
                className={cn(
                  "p-1 rounded-full",
                  "text-light-dimmed hover:text-red-400",
                  "hover:bg-red-900/20",
                  "transition-colors"
                )}
                aria-label="Supprimer le fichier"
                data-testid="remove-file-button"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <span className="text-xs text-light-dimmed">
              {(file.size / (1024 * 1024)).toFixed(2)} Mo
            </span>
          </div>
        ) : (
          /* Zone de drop vide */
          <>
            {/* Icône de téléchargement or */}
            <div
              className={cn(
                "w-12 h-12",
                "rounded-full",
                "bg-gold/10",
                "flex items-center justify-center",
                "mb-4"
              )}
              data-testid="upload-icon"
            >
              <Upload className="w-6 h-6 text-gold" />
            </div>

            {/* Texte principal */}
            <p className="text-base font-semibold text-light mb-1" data-testid="drop-text-main">
              Glissez votre fichier PDF ici
            </p>

            {/* Texte secondaire */}
            <p className="text-sm text-light-dimmed mb-3" data-testid="drop-text-secondary">
              ou cliquez pour parcourir
            </p>

            {/* Indication format et taille */}
            <p className="text-xs text-light-dimmed" data-testid="file-constraints">
              PDF uniquement, max 10 Mo
            </p>
          </>
        )}
      </div>

      {/* Message d'erreur */}
      {displayError && (
        <p
          id="pdf-error"
          className="text-sm text-red-400 mt-2"
          role="alert"
          data-testid="error-message"
        >
          {displayError}
        </p>
      )}
    </div>
  );
}

export default PdfUploadSection;

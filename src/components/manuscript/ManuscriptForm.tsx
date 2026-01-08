"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { cn } from "../../lib/utils";
import { 
  manuscriptSchema, 
  ManuscriptFormData, 
  validatePdfFile 
} from "../../lib/validations/manuscript";
import { PersonalInfoSection } from "./PersonalInfoSection";
import { WorkDetailsSection } from "./WorkDetailsSection";
import { PdfUploadSection } from "./PdfUploadSection";

/**
 * Props pour le composant ManuscriptForm
 */
interface ManuscriptFormProps {
  onSubmitSuccess?: () => void;
}

/**
 * ManuscriptForm - Formulaire principal de soumission de manuscrit
 * 
 * Intègre les trois sections:
 * - PersonalInfoSection (Informations personnelles)
 * - WorkDetailsSection (Détails de l'œuvre)
 * - PdfUploadSection (Fichier PDF)
 * 
 * Gère:
 * - Validation avec react-hook-form et Zod
 * - État du fichier PDF séparément
 * - Soumission avec état de chargement
 * - Affichage du message de succès
 * - Texte de politique de confidentialité
 * 
 * Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 7.1, 7.2, 7.3
 */
export function ManuscriptForm({ onSubmitSuccess }: ManuscriptFormProps) {
  // État du fichier PDF (géré séparément car File n'est pas sérialisable)
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfError, setPdfError] = useState<string | undefined>(undefined);
  
  // État de soumission
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Configuration de react-hook-form avec Zod
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
    reset,
  } = useForm<ManuscriptFormData>({
    resolver: zodResolver(manuscriptSchema),
    mode: "onChange",
    defaultValues: {
      lastName: "",
      firstName: "",
      phone: "",
      residence: "",
      email: "",
      title: "",
      genre: "",
      synopsis: "",
    },
  });

  /**
   * Gère le changement de fichier PDF
   */
  const handleFileChange = (file: File | null) => {
    setPdfFile(file);
    // Effacer l'erreur si un fichier valide est sélectionné
    if (file) {
      const error = validatePdfFile(file);
      setPdfError(error || undefined);
    } else {
      setPdfError(undefined);
    }
  };

  /**
   * Vérifie si le formulaire est complet et valide
   */
  const isFormComplete = isValid && pdfFile !== null && !pdfError;

  /**
   * Gère la soumission du formulaire
   */
  const onSubmit = async (data: ManuscriptFormData) => {
    // Les données du formulaire seront utilisées lors de l'intégration API
    console.log("Données du formulaire:", data);
    // Valider le fichier PDF
    const fileError = validatePdfFile(pdfFile);
    if (fileError) {
      setPdfError(fileError);
      return;
    }

    setIsSubmitting(true);

    try {
      // Simuler l'envoi du formulaire (à remplacer par l'API réelle)
      // Les données du formulaire (data) et le fichier PDF (pdfFile) seront envoyés à l'API
      console.log("Fichier PDF:", pdfFile);
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Succès
      setIsSuccess(true);
      toast.success("Votre manuscrit a été soumis avec succès !");
      
      // Réinitialiser le formulaire
      reset();
      setPdfFile(null);
      setPdfError(undefined);

      // Callback de succès
      onSubmitSuccess?.();
    } catch {
      toast.error("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Afficher le message de succès
  if (isSuccess) {
    return (
      <div 
        className="bg-dark-light rounded-2xl shadow-lg p-8 text-center border border-dark-lighter"
        data-testid="success-message"
      >
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gold/10 flex items-center justify-center">
          <svg 
            className="w-8 h-8 text-gold" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M5 13l4 4L19 7" 
            />
          </svg>
        </div>
        <h2 className="text-2xl font-serif font-semibold text-gold mb-2">
          Manuscrit envoyé !
        </h2>
        <p className="text-light-dimmed mb-6">
          Merci pour votre soumission. Notre comité de lecture examinera votre manuscrit 
          et vous répondra sous 4 à 6 semaines.
        </p>
        <button
          type="button"
          onClick={() => setIsSuccess(false)}
          className={cn(
            "px-6 py-2.5",
            "bg-gold text-dark",
            "rounded-lg font-medium",
            "hover:bg-gold-light",
            "transition-colors"
          )}
        >
          Soumettre un autre manuscrit
        </button>
      </div>
    );
  }

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)}
      className={cn(
        "bg-dark-light",
        "rounded-2xl",
        "shadow-lg",
        "p-6 md:p-8",
        "border border-dark-lighter"
      )}
      data-testid="manuscript-form"
    >
      {/* Section 1: Informations personnelles */}
      <PersonalInfoSection 
        register={register} 
        errors={errors} 
      />

      {/* Séparateur */}
      <div className="border-t border-dark-lighter my-6" />

      {/* Section 2: Détails de l'œuvre */}
      <WorkDetailsSection 
        register={register} 
        errors={errors} 
        control={control}
      />

      {/* Séparateur */}
      <div className="border-t border-dark-lighter my-6" />

      {/* Section 3: Fichier PDF */}
      <PdfUploadSection 
        file={pdfFile} 
        onFileChange={handleFileChange} 
        error={pdfError}
      />

      {/* Séparateur */}
      <div className="border-t border-dark-lighter my-6" />

      {/* Bouton de soumission et politique de confidentialité */}
      <div className="space-y-4">
        {/* Bouton de soumission */}
        <button
          type="submit"
          disabled={!isFormComplete || isSubmitting}
          className={cn(
            "w-full",
            "px-6 py-3",
            "rounded-lg",
            "font-medium",
            "transition-all duration-200",
            "flex items-center justify-center gap-2",
            isFormComplete && !isSubmitting
              ? "bg-gold text-dark hover:bg-gold-light cursor-pointer"
              : "bg-dark-lighter text-light-dimmed cursor-not-allowed"
          )}
          data-testid="submit-button"
        >
          {isSubmitting ? (
            <>
              {/* Spinner de chargement */}
              <svg 
                className="animate-spin h-5 w-5 text-white" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24"
                data-testid="loading-spinner"
              >
                <circle 
                  className="opacity-25" 
                  cx="12" 
                  cy="12" 
                  r="10" 
                  stroke="currentColor" 
                  strokeWidth="4"
                />
                <path 
                  className="opacity-75" 
                  fill="currentColor" 
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <span>Envoi en cours...</span>
            </>
          ) : (
            <>
              <span>Envoyer mon manuscrit</span>
              <span aria-hidden="true">&gt;</span>
            </>
          )}
        </button>

        {/* Texte de politique de confidentialité */}
        <p 
          className="text-sm text-light-dimmed text-center"
          data-testid="privacy-policy-text"
        >
          En soumettant ce formulaire, vous acceptez notre{" "}
          <a 
            href="/politique-confidentialite" 
            className="text-gold hover:underline"
            data-testid="privacy-policy-link"
          >
            politique de confidentialité
          </a>
        </p>
      </div>
    </form>
  );
}

export default ManuscriptForm;

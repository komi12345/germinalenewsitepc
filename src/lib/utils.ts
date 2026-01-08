import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combine les classes CSS avec clsx et tailwind-merge
 * Permet de fusionner intelligemment les classes Tailwind
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formate un prix en FCFA avec séparateur milliers (espace)
 * @param price - Prix en centimes (ou unités entières selon usage)
 * @param inCentimes - Si true, divise par 100 avant formatage (défaut: false)
 * @returns Prix formaté avec suffixe "FCFA" (ex: "15 000 FCFA")
 */
export function formatPrice(price: number, inCentimes: boolean = false): string {
  const amount = inCentimes ? price / 100 : price;
  
  // Formatage avec séparateur milliers (espace)
  const formattedAmount = Math.round(amount)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  
  return `${formattedAmount} FCFA`;
}

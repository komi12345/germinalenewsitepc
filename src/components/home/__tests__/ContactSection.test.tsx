import { render, screen, cleanup } from "@testing-library/react";
import { ContactSection } from "../ContactSection";

const GERMINALE_MAP_URL =
  "https://maps.google.com/maps/search/Les%20Editions%20Germinale/@6.2360676,1.18908594,17z?hl=fr";
const GERMINALE_EMBED_URL =
  "https://maps.google.com/maps?q=Les%20Editions%20Germinale&ll=6.2360676,1.18908594&z=17&hl=fr&output=embed";

describe("ContactSection - Localisation", () => {
  afterEach(() => {
    cleanup();
    jest.restoreAllMocks();
  });

  it("rend la section de contact avec le bon data-testid", () => {
    render(<ContactSection />);

    const section = screen.getByTestId("contact-section");
    expect(section).toBeInTheDocument();
  });

  it("synchronise parfaitement l'iframe et le bouton avec la localisation", () => {
    render(<ContactSection />);

    // Vérification de l'iframe (Embed)
    const iframe = screen.getByTitle("Localisation Éditions Germinale");
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute("src", GERMINALE_EMBED_URL);

    // Vérification du bouton (Lien direct)
    const directionLink = screen.getByRole("link", {
      name: "Obtenir l'itinéraire",
    });
    expect(directionLink).toHaveAttribute("href", GERMINALE_MAP_URL);
  });

  it("ouvre la localisation dans un nouvel onglet avec les bons attributs", () => {
    render(<ContactSection />);

    const directionLink = screen.getByRole("link", {
      name: "Obtenir l'itinéraire",
    });

    expect(directionLink).toHaveAttribute("target", "_blank");
    expect(directionLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("ne génère pas d’erreurs console au rendu", () => {
    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    render(<ContactSection />);

    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });
});


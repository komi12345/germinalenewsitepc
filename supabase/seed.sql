-- ============================================
-- Éditions Germinale - Données de test (Seed)
-- Version: 1.0.0
-- ============================================

-- Récupérer les IDs des auteurs
DO $$
DECLARE
    author_kourouma UUID;
    author_ba UUID;
    author_laye UUID;
    author_badian UUID;
    author_ousmane UUID;
    author_beti UUID;
    cat_romans UUID;
    cat_poesie UUID;
    cat_contes UUID;
    cat_jeunesse UUID;
    col_romans UUID;
    col_poesie UUID;
    col_contes UUID;
    col_jeunesse UUID;
BEGIN
    -- Récupérer les IDs des auteurs
    SELECT id INTO author_kourouma FROM public.authors WHERE slug = 'ahmadou-kourouma';
    SELECT id INTO author_ba FROM public.authors WHERE slug = 'mariama-ba';
    SELECT id INTO author_laye FROM public.authors WHERE slug = 'camara-laye';
    SELECT id INTO author_badian FROM public.authors WHERE slug = 'seydou-badian';
    SELECT id INTO author_ousmane FROM public.authors WHERE slug = 'sembene-ousmane';
    SELECT id INTO author_beti FROM public.authors WHERE slug = 'mongo-beti';
    
    -- Récupérer les IDs des catégories
    SELECT id INTO cat_romans FROM public.categories WHERE slug = 'romans';
    SELECT id INTO cat_poesie FROM public.categories WHERE slug = 'poesie';
    SELECT id INTO cat_contes FROM public.categories WHERE slug = 'contes-legendes';
    SELECT id INTO cat_jeunesse FROM public.categories WHERE slug = 'litterature-jeunesse';
    
    -- Récupérer les IDs des collections
    SELECT id INTO col_romans FROM public.collections WHERE slug = 'romans-africains';
    SELECT id INTO col_poesie FROM public.collections WHERE slug = 'poesie-francophone';
    SELECT id INTO col_contes FROM public.collections WHERE slug = 'contes-legendes';
    SELECT id INTO col_jeunesse FROM public.collections WHERE slug = 'litterature-jeunesse';
    
    -- Insérer les livres
    INSERT INTO public.books (title, slug, description, excerpt, cover_image, price, original_price, pages_count, publication_date, author_id, category_id, is_new, is_featured) VALUES
    ('Le Soleil des Indépendances', 'soleil-independances', 
     'Premier roman africain écrit en français à utiliser un style d écriture profondément ancré dans la tradition orale africaine.',
     'Fama Doumbouya, prince déchu du Horodougou, erre dans une Afrique post-coloniale...',
     '/images/placeholder-book.svg', 8500, 10000, 208, '1968-01-01', author_kourouma, cat_romans, FALSE, TRUE),
    
    ('Une si longue lettre', 'si-longue-lettre', 
     'Un roman épistolaire poignant sur la condition féminine au Sénégal.',
     'Ramatoulaye raconte sa vie après le décès de son mari...',
     '/images/placeholder-book.svg', 7500, 9000, 165, '1979-01-01', author_ba, cat_romans, FALSE, TRUE),
    
    ('L''Enfant noir', 'enfant-noir', 
     'Récit autobiographique de l enfance de l auteur en Guinée.',
     'Un voyage nostalgique dans la Guinée traditionnelle...',
     '/images/placeholder-book.svg', 6500, 8000, 224, '1953-01-01', author_laye, cat_romans, FALSE, TRUE),
    
    ('Sous l''orage', 'sous-orage', 
     'Le conflit entre tradition et modernité dans le Mali contemporain.',
     'Kany est tiraillée entre l amour et les traditions...',
     '/images/placeholder-book.svg', 5500, 7000, 186, '1957-01-01', author_badian, cat_romans, TRUE, FALSE),
    
    ('Les Bouts de bois de Dieu', 'bouts-bois-dieu', 
     'La grève des cheminots du Dakar-Niger en 1947-1948.',
     'Une fresque épique de la lutte ouvrière africaine...',
     '/images/placeholder-book.svg', 9000, 11000, 379, '1960-01-01', author_ousmane, cat_romans, FALSE, TRUE),
    
    ('Ville cruelle', 'ville-cruelle', 
     'La vie dans une ville coloniale africaine.',
     'Banda arrive à Tanga plein d espoir...',
     '/images/placeholder-book.svg', 7000, 8500, 256, '1954-01-01', author_beti, cat_romans, TRUE, FALSE),
    
    ('En attendant le vote des bêtes sauvages', 'vote-betes-sauvages', 
     'Une satire politique de l Afrique post-coloniale.',
     'Le récit de la vie d un dictateur africain...',
     '/images/placeholder-book.svg', 9500, 12000, 384, '1998-01-01', author_kourouma, cat_romans, TRUE, TRUE),
    
    ('Le Vieux Nègre et la Médaille', 'vieux-negre-medaille', 
     'La déception d un fidèle serviteur de la colonisation.',
     'Meka attend sa médaille avec fierté...',
     '/images/placeholder-book.svg', 6000, 7500, 192, '1956-01-01', author_beti, cat_romans, FALSE, FALSE),
    
    ('Xala', 'xala', 
     'Une critique acerbe de la bourgeoisie sénégalaise.',
     'El Hadji Abdou Kader Bèye prend une troisième épouse...',
     '/images/placeholder-book.svg', 7500, 9000, 178, '1973-01-01', author_ousmane, cat_romans, FALSE, TRUE),
    
    ('Un chant écarlate', 'chant-ecarlate', 
     'L histoire d un mariage mixte au Sénégal.',
     'Mireille et Ousmane s aiment malgré leurs différences...',
     '/images/placeholder-book.svg', 8000, 9500, 248, '1981-01-01', author_ba, cat_romans, TRUE, FALSE);
    
    -- Associer les livres aux collections
    INSERT INTO public.collection_books (collection_id, book_id, display_order)
    SELECT col_romans, id, ROW_NUMBER() OVER (ORDER BY created_at)
    FROM public.books WHERE category_id = cat_romans LIMIT 5;
    
END $$;

-- Mise à jour des compteurs
UPDATE public.authors SET books_count = (
    SELECT COUNT(*) FROM public.books WHERE author_id = authors.id
);

COMMIT;

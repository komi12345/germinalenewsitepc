-- ============================================
-- Éditions Germinale - Schéma de base de données Supabase
-- Version: 1.0.0
-- ============================================

-- Activer les extensions nécessaires
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================
-- TYPES ÉNUMÉRÉS
-- ============================================

CREATE TYPE user_role AS ENUM ('user', 'author', 'admin');
CREATE TYPE manuscript_status AS ENUM ('pending', 'under_review', 'accepted', 'rejected', 'published');
CREATE TYPE order_status AS ENUM ('pending', 'paid', 'failed', 'refunded', 'cancelled');
CREATE TYPE notification_type AS ENUM ('info', 'success', 'warning', 'order', 'manuscript', 'system');

-- ============================================
-- TABLE: profiles (extension de auth.users)
-- ============================================

CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    phone TEXT,
    bio TEXT,
    role user_role DEFAULT 'user' NOT NULL,
    is_verified BOOLEAN DEFAULT FALSE,
    newsletter_subscribed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Index pour les recherches fréquentes
CREATE INDEX idx_profiles_email ON public.profiles(email);
CREATE INDEX idx_profiles_role ON public.profiles(role);

-- ============================================
-- TABLE: categories
-- ============================================

CREATE TABLE public.categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    icon TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_categories_slug ON public.categories(slug);
CREATE INDEX idx_categories_active ON public.categories(is_active);

-- ============================================
-- TABLE: collections
-- ============================================

CREATE TABLE public.collections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    cover_image TEXT,
    price INTEGER NOT NULL DEFAULT 0,
    original_price INTEGER,
    discount_percent INTEGER DEFAULT 0,
    is_limited BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    books_count INTEGER DEFAULT 0,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_collections_slug ON public.collections(slug);
CREATE INDEX idx_collections_active ON public.collections(is_active);

-- ============================================
-- TABLE: authors
-- ============================================

CREATE TABLE public.authors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    bio TEXT,
    avatar_url TEXT,
    website TEXT,
    social_links JSONB DEFAULT '{}',
    is_verified BOOLEAN DEFAULT FALSE,
    books_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_authors_slug ON public.authors(slug);
CREATE INDEX idx_authors_user_id ON public.authors(user_id);

-- ============================================
-- TABLE: books
-- ============================================

CREATE TABLE public.books (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    excerpt TEXT,
    cover_image TEXT,
    pdf_url TEXT,
    preview_pdf_url TEXT,
    price INTEGER NOT NULL DEFAULT 0,
    original_price INTEGER,
    pages_count INTEGER,
    language TEXT DEFAULT 'fr',
    isbn TEXT,
    publication_date DATE,
    author_id UUID REFERENCES public.authors(id) ON DELETE SET NULL,
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    is_new BOOLEAN DEFAULT TRUE,
    is_featured BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    views_count INTEGER DEFAULT 0,
    sales_count INTEGER DEFAULT 0,
    rating_average DECIMAL(2,1) DEFAULT 0,
    rating_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_books_slug ON public.books(slug);
CREATE INDEX idx_books_author ON public.books(author_id);
CREATE INDEX idx_books_category ON public.books(category_id);
CREATE INDEX idx_books_active ON public.books(is_active);
CREATE INDEX idx_books_featured ON public.books(is_featured);
CREATE INDEX idx_books_new ON public.books(is_new);

-- ============================================
-- TABLE: collection_books (relation many-to-many)
-- ============================================

CREATE TABLE public.collection_books (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    collection_id UUID NOT NULL REFERENCES public.collections(id) ON DELETE CASCADE,
    book_id UUID NOT NULL REFERENCES public.books(id) ON DELETE CASCADE,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    UNIQUE(collection_id, book_id)
);

CREATE INDEX idx_collection_books_collection ON public.collection_books(collection_id);
CREATE INDEX idx_collection_books_book ON public.collection_books(book_id);

-- ============================================
-- TABLE: orders
-- ============================================

CREATE TABLE public.orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_number TEXT NOT NULL UNIQUE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    status order_status DEFAULT 'pending' NOT NULL,
    total_amount INTEGER NOT NULL DEFAULT 0,
    currency TEXT DEFAULT 'XOF',
    payment_method TEXT,
    payment_reference TEXT,
    fedapay_transaction_id TEXT,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    paid_at TIMESTAMPTZ
);

CREATE INDEX idx_orders_user ON public.orders(user_id);
CREATE INDEX idx_orders_status ON public.orders(status);
CREATE INDEX idx_orders_number ON public.orders(order_number);

-- ============================================
-- TABLE: order_items
-- ============================================

CREATE TABLE public.order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    book_id UUID REFERENCES public.books(id) ON DELETE SET NULL,
    collection_id UUID REFERENCES public.collections(id) ON DELETE SET NULL,
    item_type TEXT NOT NULL CHECK (item_type IN ('book', 'collection')),
    title TEXT NOT NULL,
    price INTEGER NOT NULL,
    quantity INTEGER DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_order_items_order ON public.order_items(order_id);

-- ============================================
-- TABLE: user_library (livres achetés par l'utilisateur)
-- ============================================

CREATE TABLE public.user_library (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    book_id UUID NOT NULL REFERENCES public.books(id) ON DELETE CASCADE,
    order_id UUID REFERENCES public.orders(id) ON DELETE SET NULL,
    purchased_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    last_read_at TIMESTAMPTZ,
    reading_progress INTEGER DEFAULT 0,
    is_favorite BOOLEAN DEFAULT FALSE,
    UNIQUE(user_id, book_id)
);

CREATE INDEX idx_user_library_user ON public.user_library(user_id);
CREATE INDEX idx_user_library_book ON public.user_library(book_id);

-- ============================================
-- TABLE: manuscripts
-- ============================================

CREATE TABLE public.manuscripts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    genre TEXT NOT NULL,
    synopsis TEXT NOT NULL,
    author_bio TEXT,
    pdf_url TEXT NOT NULL,
    cover_letter TEXT,
    status manuscript_status DEFAULT 'pending' NOT NULL,
    reviewer_notes TEXT,
    reviewed_by UUID REFERENCES public.profiles(id),
    reviewed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_manuscripts_user ON public.manuscripts(user_id);
CREATE INDEX idx_manuscripts_status ON public.manuscripts(status);

-- ============================================
-- TABLE: notifications
-- ============================================

CREATE TABLE public.notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    type notification_type DEFAULT 'info' NOT NULL,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    link TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_notifications_user ON public.notifications(user_id);
CREATE INDEX idx_notifications_read ON public.notifications(is_read);
CREATE INDEX idx_notifications_created ON public.notifications(created_at DESC);

-- ============================================
-- TABLE: reviews
-- ============================================

CREATE TABLE public.reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    book_id UUID NOT NULL REFERENCES public.books(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title TEXT,
    content TEXT,
    is_verified_purchase BOOLEAN DEFAULT FALSE,
    is_approved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    UNIQUE(user_id, book_id)
);

CREATE INDEX idx_reviews_book ON public.reviews(book_id);
CREATE INDEX idx_reviews_user ON public.reviews(user_id);
CREATE INDEX idx_reviews_approved ON public.reviews(is_approved);

-- ============================================
-- TABLE: newsletter_subscribers
-- ============================================

CREATE TABLE public.newsletter_subscribers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT NOT NULL UNIQUE,
    name TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    subscribed_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    unsubscribed_at TIMESTAMPTZ
);

CREATE INDEX idx_newsletter_email ON public.newsletter_subscribers(email);
CREATE INDEX idx_newsletter_active ON public.newsletter_subscribers(is_active);

-- ============================================
-- TABLE: blog_articles
-- ============================================

CREATE TABLE public.blog_articles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    excerpt TEXT,
    content TEXT NOT NULL,
    cover_image TEXT,
    author_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    category TEXT,
    tags TEXT[],
    is_published BOOLEAN DEFAULT FALSE,
    views_count INTEGER DEFAULT 0,
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_blog_slug ON public.blog_articles(slug);
CREATE INDEX idx_blog_published ON public.blog_articles(is_published);

-- ============================================
-- FONCTIONS ET TRIGGERS
-- ============================================

-- Fonction pour mettre à jour updated_at automatiquement
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers pour updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON public.categories
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_collections_updated_at BEFORE UPDATE ON public.collections
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_authors_updated_at BEFORE UPDATE ON public.authors
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_books_updated_at BEFORE UPDATE ON public.books
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON public.orders
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_manuscripts_updated_at BEFORE UPDATE ON public.manuscripts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON public.reviews
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_articles_updated_at BEFORE UPDATE ON public.blog_articles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Fonction pour créer un profil automatiquement après inscription
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name, avatar_url)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name'),
        NEW.raw_user_meta_data->>'avatar_url'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger pour créer le profil après inscription
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Fonction pour générer un numéro de commande unique
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TEXT AS $$
DECLARE
    new_number TEXT;
BEGIN
    new_number := 'EG-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || LPAD(FLOOR(RANDOM() * 10000)::TEXT, 4, '0');
    RETURN new_number;
END;
$$ LANGUAGE plpgsql;

-- Fonction pour mettre à jour le compteur de livres dans une collection
CREATE OR REPLACE FUNCTION update_collection_books_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE public.collections SET books_count = books_count + 1 WHERE id = NEW.collection_id;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE public.collections SET books_count = books_count - 1 WHERE id = OLD.collection_id;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_collection_count
    AFTER INSERT OR DELETE ON public.collection_books
    FOR EACH ROW EXECUTE FUNCTION update_collection_books_count();

-- Fonction pour mettre à jour la moyenne des notes d'un livre
CREATE OR REPLACE FUNCTION update_book_rating()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE public.books SET
        rating_average = (SELECT AVG(rating)::DECIMAL(2,1) FROM public.reviews WHERE book_id = COALESCE(NEW.book_id, OLD.book_id) AND is_approved = TRUE),
        rating_count = (SELECT COUNT(*) FROM public.reviews WHERE book_id = COALESCE(NEW.book_id, OLD.book_id) AND is_approved = TRUE)
    WHERE id = COALESCE(NEW.book_id, OLD.book_id);
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_book_rating_trigger
    AFTER INSERT OR UPDATE OR DELETE ON public.reviews
    FOR EACH ROW EXECUTE FUNCTION update_book_rating();

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Activer RLS sur toutes les tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.authors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.books ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.collection_books ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_library ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.manuscripts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_articles ENABLE ROW LEVEL SECURITY;

-- Policies pour profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles
    FOR SELECT USING (TRUE);

-- Policies pour categories (lecture publique)
CREATE POLICY "Categories are viewable by everyone" ON public.categories
    FOR SELECT USING (is_active = TRUE);

CREATE POLICY "Admins can manage categories" ON public.categories
    FOR ALL USING (
        EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
    );

-- Policies pour collections (lecture publique)
CREATE POLICY "Collections are viewable by everyone" ON public.collections
    FOR SELECT USING (is_active = TRUE);

CREATE POLICY "Admins can manage collections" ON public.collections
    FOR ALL USING (
        EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
    );

-- Policies pour authors (lecture publique)
CREATE POLICY "Authors are viewable by everyone" ON public.authors
    FOR SELECT USING (TRUE);

CREATE POLICY "Authors can update their own profile" ON public.authors
    FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Admins can manage authors" ON public.authors
    FOR ALL USING (
        EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
    );

-- Policies pour books (lecture publique)
CREATE POLICY "Books are viewable by everyone" ON public.books
    FOR SELECT USING (is_active = TRUE);

CREATE POLICY "Admins can manage books" ON public.books
    FOR ALL USING (
        EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
    );

-- Policies pour collection_books
CREATE POLICY "Collection books are viewable by everyone" ON public.collection_books
    FOR SELECT USING (TRUE);

CREATE POLICY "Admins can manage collection books" ON public.collection_books
    FOR ALL USING (
        EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
    );

-- Policies pour orders
CREATE POLICY "Users can view their own orders" ON public.orders
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can create orders" ON public.orders
    FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admins can view all orders" ON public.orders
    FOR SELECT USING (
        EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
    );

-- Policies pour order_items
CREATE POLICY "Users can view their own order items" ON public.order_items
    FOR SELECT USING (
        EXISTS (SELECT 1 FROM public.orders WHERE id = order_id AND user_id = auth.uid())
    );

-- Policies pour user_library
CREATE POLICY "Users can view their own library" ON public.user_library
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can update their library items" ON public.user_library
    FOR UPDATE USING (user_id = auth.uid());

-- Policies pour manuscripts
CREATE POLICY "Users can view their own manuscripts" ON public.manuscripts
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can create manuscripts" ON public.manuscripts
    FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own manuscripts" ON public.manuscripts
    FOR UPDATE USING (user_id = auth.uid() AND status = 'pending');

CREATE POLICY "Admins can view all manuscripts" ON public.manuscripts
    FOR SELECT USING (
        EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
    );

CREATE POLICY "Admins can update manuscripts" ON public.manuscripts
    FOR UPDATE USING (
        EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
    );

-- Policies pour notifications
CREATE POLICY "Users can view their own notifications" ON public.notifications
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can update their own notifications" ON public.notifications
    FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "System can create notifications" ON public.notifications
    FOR INSERT WITH CHECK (TRUE);

-- Policies pour reviews
CREATE POLICY "Reviews are viewable by everyone" ON public.reviews
    FOR SELECT USING (is_approved = TRUE);

CREATE POLICY "Users can create reviews" ON public.reviews
    FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own reviews" ON public.reviews
    FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Users can delete their own reviews" ON public.reviews
    FOR DELETE USING (user_id = auth.uid());

-- Policies pour newsletter_subscribers
CREATE POLICY "Anyone can subscribe to newsletter" ON public.newsletter_subscribers
    FOR INSERT WITH CHECK (TRUE);

CREATE POLICY "Admins can view subscribers" ON public.newsletter_subscribers
    FOR SELECT USING (
        EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
    );

-- Policies pour blog_articles
CREATE POLICY "Published articles are viewable by everyone" ON public.blog_articles
    FOR SELECT USING (is_published = TRUE);

CREATE POLICY "Admins can manage articles" ON public.blog_articles
    FOR ALL USING (
        EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
    );

-- ============================================
-- DONNÉES INITIALES (SEED)
-- ============================================

-- Catégories
INSERT INTO public.categories (name, slug, description, display_order) VALUES
('Romans', 'romans', 'Romans et fiction littéraire', 1),
('Poésie', 'poesie', 'Recueils de poésie et vers', 2),
('Contes et Légendes', 'contes-legendes', 'Contes traditionnels et légendes africaines', 3),
('Littérature Jeunesse', 'litterature-jeunesse', 'Livres pour enfants et adolescents', 4),
('Essais', 'essais', 'Essais et ouvrages de réflexion', 5),
('Nouvelles', 'nouvelles', 'Recueils de nouvelles', 6),
('Théâtre', 'theatre', 'Pièces de théâtre', 7),
('Biographies', 'biographies', 'Récits de vie et autobiographies', 8);

-- Collections
INSERT INTO public.collections (name, slug, description, cover_image, price, original_price, discount_percent, is_limited) VALUES
('Romans Africains', 'romans-africains', 'Découvrez les plus belles plumes du continent africain à travers des récits captivants.', '/images/placeholder-collection.svg', 5000, 7500, 33, FALSE),
('Poésie Francophone', 'poesie-francophone', 'Une collection de poèmes qui célèbrent la beauté de la langue française.', '/images/placeholder-collection.svg', 3500, 5000, 30, FALSE),
('Contes et Légendes', 'contes-legendes', 'Les histoires traditionnelles qui ont bercé des générations.', '/images/placeholder-collection.svg', 4500, 6000, 25, TRUE),
('Littérature Jeunesse', 'litterature-jeunesse', 'Des livres pour éveiller l imagination des plus jeunes.', '/images/placeholder-collection.svg', 2500, 3500, 28, FALSE);

-- Auteurs
INSERT INTO public.authors (name, slug, bio, is_verified) VALUES
('Ahmadou Kourouma', 'ahmadou-kourouma', 'Écrivain ivoirien, auteur du célèbre "Le Soleil des Indépendances"', TRUE),
('Mariama Bâ', 'mariama-ba', 'Écrivaine sénégalaise, pionnière de la littérature féminine africaine', TRUE),
('Camara Laye', 'camara-laye', 'Écrivain guinéen, auteur de "L Enfant noir"', TRUE),
('Seydou Badian', 'seydou-badian', 'Écrivain et homme politique malien', TRUE),
('Sembène Ousmane', 'sembene-ousmane', 'Écrivain et cinéaste sénégalais, père du cinéma africain', TRUE),
('Mongo Beti', 'mongo-beti', 'Écrivain camerounais engagé', TRUE);

COMMIT;

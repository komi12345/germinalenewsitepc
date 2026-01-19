-- ============================================
-- Éditions Germinale - Configuration Storage Supabase
-- Version: 1.0.0
-- ============================================

-- Créer les buckets de stockage
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
    ('avatars', 'avatars', TRUE, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']),
    ('book-covers', 'book-covers', TRUE, 10485760, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml']),
    ('collection-covers', 'collection-covers', TRUE, 10485760, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml']),
    ('manuscripts', 'manuscripts', FALSE, 52428800, ARRAY['application/pdf']),
    ('ebooks', 'ebooks', FALSE, 104857600, ARRAY['application/pdf']);

-- Policies pour avatars (public read, auth write)
CREATE POLICY "Avatar images are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'avatars');

CREATE POLICY "Users can upload their own avatar"
ON storage.objects FOR INSERT
WITH CHECK (
    bucket_id = 'avatars' 
    AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can update their own avatar"
ON storage.objects FOR UPDATE
USING (
    bucket_id = 'avatars' 
    AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete their own avatar"
ON storage.objects FOR DELETE
USING (
    bucket_id = 'avatars' 
    AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Policies pour book-covers (public)
CREATE POLICY "Book covers are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'book-covers');

CREATE POLICY "Admins can manage book covers"
ON storage.objects FOR ALL
USING (
    bucket_id = 'book-covers'
    AND EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE id = auth.uid() AND role = 'admin'
    )
);

-- Policies pour collection-covers (public)
CREATE POLICY "Collection covers are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'collection-covers');

CREATE POLICY "Admins can manage collection covers"
ON storage.objects FOR ALL
USING (
    bucket_id = 'collection-covers'
    AND EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE id = auth.uid() AND role = 'admin'
    )
);

-- Policies pour manuscripts (private, user own)
CREATE POLICY "Users can upload manuscripts"
ON storage.objects FOR INSERT
WITH CHECK (
    bucket_id = 'manuscripts'
    AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can view their own manuscripts"
ON storage.objects FOR SELECT
USING (
    bucket_id = 'manuscripts'
    AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Admins can view all manuscripts"
ON storage.objects FOR SELECT
USING (
    bucket_id = 'manuscripts'
    AND EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE id = auth.uid() AND role = 'admin'
    )
);

-- Policies pour ebooks (private, purchased only)
CREATE POLICY "Users can download purchased ebooks"
ON storage.objects FOR SELECT
USING (
    bucket_id = 'ebooks'
    AND EXISTS (
        SELECT 1 FROM public.user_library ul
        JOIN public.books b ON ul.book_id = b.id
        WHERE ul.user_id = auth.uid()
        AND b.pdf_url LIKE '%' || name || '%'
    )
);

CREATE POLICY "Admins can manage ebooks"
ON storage.objects FOR ALL
USING (
    bucket_id = 'ebooks'
    AND EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE id = auth.uid() AND role = 'admin'
    )
);

COMMIT;

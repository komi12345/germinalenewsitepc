export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type UserRole = "user" | "author" | "admin";
export type ManuscriptStatus = "pending" | "under_review" | "accepted" | "rejected" | "published";
export type OrderStatus = "pending" | "paid" | "failed" | "refunded" | "cancelled";
export type NotificationType = "info" | "success" | "warning" | "order" | "manuscript" | "system";

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          phone: string | null;
          bio: string | null;
          role: UserRole;
          is_verified: boolean;
          newsletter_subscribed: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          phone?: string | null;
          bio?: string | null;
          role?: UserRole;
          is_verified?: boolean;
          newsletter_subscribed?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          phone?: string | null;
          bio?: string | null;
          role?: UserRole;
          is_verified?: boolean;
          newsletter_subscribed?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          icon: string | null;
          is_active: boolean;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          icon?: string | null;
          is_active?: boolean;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          icon?: string | null;
          is_active?: boolean;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      collections: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          cover_image: string | null;
          price: number;
          original_price: number | null;
          discount_percent: number;
          is_limited: boolean;
          is_active: boolean;
          books_count: number;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          cover_image?: string | null;
          price?: number;
          original_price?: number | null;
          discount_percent?: number;
          is_limited?: boolean;
          is_active?: boolean;
          books_count?: number;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          cover_image?: string | null;
          price?: number;
          original_price?: number | null;
          discount_percent?: number;
          is_limited?: boolean;
          is_active?: boolean;
          books_count?: number;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      authors: {
        Row: {
          id: string;
          user_id: string | null;
          name: string;
          slug: string;
          bio: string | null;
          avatar_url: string | null;
          website: string | null;
          social_links: Json;
          is_verified: boolean;
          books_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          name: string;
          slug: string;
          bio?: string | null;
          avatar_url?: string | null;
          website?: string | null;
          social_links?: Json;
          is_verified?: boolean;
          books_count?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          name?: string;
          slug?: string;
          bio?: string | null;
          avatar_url?: string | null;
          website?: string | null;
          social_links?: Json;
          is_verified?: boolean;
          books_count?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      books: {
        Row: {
          id: string;
          title: string;
          slug: string;
          description: string | null;
          excerpt: string | null;
          cover_image: string | null;
          pdf_url: string | null;
          preview_pdf_url: string | null;
          price: number;
          original_price: number | null;
          pages_count: number | null;
          language: string;
          isbn: string | null;
          publication_date: string | null;
          author_id: string | null;
          category_id: string | null;
          is_new: boolean;
          is_featured: boolean;
          is_active: boolean;
          views_count: number;
          sales_count: number;
          rating_average: number;
          rating_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          description?: string | null;
          excerpt?: string | null;
          cover_image?: string | null;
          pdf_url?: string | null;
          preview_pdf_url?: string | null;
          price?: number;
          original_price?: number | null;
          pages_count?: number | null;
          language?: string;
          isbn?: string | null;
          publication_date?: string | null;
          author_id?: string | null;
          category_id?: string | null;
          is_new?: boolean;
          is_featured?: boolean;
          is_active?: boolean;
          views_count?: number;
          sales_count?: number;
          rating_average?: number;
          rating_count?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          description?: string | null;
          excerpt?: string | null;
          cover_image?: string | null;
          pdf_url?: string | null;
          preview_pdf_url?: string | null;
          price?: number;
          original_price?: number | null;
          pages_count?: number | null;
          language?: string;
          isbn?: string | null;
          publication_date?: string | null;
          author_id?: string | null;
          category_id?: string | null;
          is_new?: boolean;
          is_featured?: boolean;
          is_active?: boolean;
          views_count?: number;
          sales_count?: number;
          rating_average?: number;
          rating_count?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      collection_books: {
        Row: {
          id: string;
          collection_id: string;
          book_id: string;
          display_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          collection_id: string;
          book_id: string;
          display_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          collection_id?: string;
          book_id?: string;
          display_order?: number;
          created_at?: string;
        };
      };
      orders: {
        Row: {
          id: string;
          order_number: string;
          user_id: string;
          status: OrderStatus;
          total_amount: number;
          currency: string;
          payment_method: string | null;
          payment_reference: string | null;
          fedapay_transaction_id: string | null;
          metadata: Json;
          created_at: string;
          updated_at: string;
          paid_at: string | null;
        };
        Insert: {
          id?: string;
          order_number: string;
          user_id: string;
          status?: OrderStatus;
          total_amount?: number;
          currency?: string;
          payment_method?: string | null;
          payment_reference?: string | null;
          fedapay_transaction_id?: string | null;
          metadata?: Json;
          created_at?: string;
          updated_at?: string;
          paid_at?: string | null;
        };
        Update: {
          id?: string;
          order_number?: string;
          user_id?: string;
          status?: OrderStatus;
          total_amount?: number;
          currency?: string;
          payment_method?: string | null;
          payment_reference?: string | null;
          fedapay_transaction_id?: string | null;
          metadata?: Json;
          created_at?: string;
          updated_at?: string;
          paid_at?: string | null;
        };
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          book_id: string | null;
          collection_id: string | null;
          item_type: string;
          title: string;
          price: number;
          quantity: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          order_id: string;
          book_id?: string | null;
          collection_id?: string | null;
          item_type: string;
          title: string;
          price: number;
          quantity?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          order_id?: string;
          book_id?: string | null;
          collection_id?: string | null;
          item_type?: string;
          title?: string;
          price?: number;
          quantity?: number;
          created_at?: string;
        };
      };
      user_library: {
        Row: {
          id: string;
          user_id: string;
          book_id: string;
          order_id: string | null;
          purchased_at: string;
          last_read_at: string | null;
          reading_progress: number;
          is_favorite: boolean;
        };
        Insert: {
          id?: string;
          user_id: string;
          book_id: string;
          order_id?: string | null;
          purchased_at?: string;
          last_read_at?: string | null;
          reading_progress?: number;
          is_favorite?: boolean;
        };
        Update: {
          id?: string;
          user_id?: string;
          book_id?: string;
          order_id?: string | null;
          purchased_at?: string;
          last_read_at?: string | null;
          reading_progress?: number;
          is_favorite?: boolean;
        };
      };
      manuscripts: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          genre: string;
          synopsis: string;
          author_bio: string | null;
          pdf_url: string;
          cover_letter: string | null;
          status: ManuscriptStatus;
          reviewer_notes: string | null;
          reviewed_by: string | null;
          reviewed_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          genre: string;
          synopsis: string;
          author_bio?: string | null;
          pdf_url: string;
          cover_letter?: string | null;
          status?: ManuscriptStatus;
          reviewer_notes?: string | null;
          reviewed_by?: string | null;
          reviewed_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          genre?: string;
          synopsis?: string;
          author_bio?: string | null;
          pdf_url?: string;
          cover_letter?: string | null;
          status?: ManuscriptStatus;
          reviewer_notes?: string | null;
          reviewed_by?: string | null;
          reviewed_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      notifications: {
        Row: {
          id: string;
          user_id: string;
          type: NotificationType;
          title: string;
          message: string;
          link: string | null;
          is_read: boolean;
          metadata: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          type?: NotificationType;
          title: string;
          message: string;
          link?: string | null;
          is_read?: boolean;
          metadata?: Json;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          type?: NotificationType;
          title?: string;
          message?: string;
          link?: string | null;
          is_read?: boolean;
          metadata?: Json;
          created_at?: string;
        };
      };
      reviews: {
        Row: {
          id: string;
          user_id: string;
          book_id: string;
          rating: number;
          title: string | null;
          content: string | null;
          is_verified_purchase: boolean;
          is_approved: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          book_id: string;
          rating: number;
          title?: string | null;
          content?: string | null;
          is_verified_purchase?: boolean;
          is_approved?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          book_id?: string;
          rating?: number;
          title?: string | null;
          content?: string | null;
          is_verified_purchase?: boolean;
          is_approved?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      newsletter_subscribers: {
        Row: {
          id: string;
          email: string;
          name: string | null;
          is_active: boolean;
          subscribed_at: string;
          unsubscribed_at: string | null;
        };
        Insert: {
          id?: string;
          email: string;
          name?: string | null;
          is_active?: boolean;
          subscribed_at?: string;
          unsubscribed_at?: string | null;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string | null;
          is_active?: boolean;
          subscribed_at?: string;
          unsubscribed_at?: string | null;
        };
      };
      blog_articles: {
        Row: {
          id: string;
          title: string;
          slug: string;
          excerpt: string | null;
          content: string;
          cover_image: string | null;
          author_id: string | null;
          category: string | null;
          tags: string[] | null;
          is_published: boolean;
          views_count: number;
          published_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          excerpt?: string | null;
          content: string;
          cover_image?: string | null;
          author_id?: string | null;
          category?: string | null;
          tags?: string[] | null;
          is_published?: boolean;
          views_count?: number;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          excerpt?: string | null;
          content?: string;
          cover_image?: string | null;
          author_id?: string | null;
          category?: string | null;
          tags?: string[] | null;
          is_published?: boolean;
          views_count?: number;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Functions: {
      generate_order_number: {
        Args: Record<string, never>;
        Returns: string;
      };
    };
    Enums: {
      user_role: UserRole;
      manuscript_status: ManuscriptStatus;
      order_status: OrderStatus;
      notification_type: NotificationType;
    };
  };
}

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type Category = Database["public"]["Tables"]["categories"]["Row"];
export type Collection = Database["public"]["Tables"]["collections"]["Row"];
export type Author = Database["public"]["Tables"]["authors"]["Row"];
export type Book = Database["public"]["Tables"]["books"]["Row"];
export type Order = Database["public"]["Tables"]["orders"]["Row"];
export type OrderItem = Database["public"]["Tables"]["order_items"]["Row"];
export type UserLibraryItem = Database["public"]["Tables"]["user_library"]["Row"];
export type Manuscript = Database["public"]["Tables"]["manuscripts"]["Row"];
export type Notification = Database["public"]["Tables"]["notifications"]["Row"];
export type Review = Database["public"]["Tables"]["reviews"]["Row"];
export type NewsletterSubscriber = Database["public"]["Tables"]["newsletter_subscribers"]["Row"];
export type BlogArticle = Database["public"]["Tables"]["blog_articles"]["Row"];

export type BookWithAuthor = Book & {
  author: Author | null;
  category: Category | null;
};

export type CollectionWithBooks = Collection & {
  books: BookWithAuthor[];
};

export type OrderWithItems = Order & {
  items: OrderItem[];
};

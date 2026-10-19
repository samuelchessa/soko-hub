
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id)
        ON DELETE CASCADE,
    full_name TEXT NOT NULL DEFAULT '',
    role TEXT NOT NULL DEFAULT 'customer'
        CHECK (role IN ('customer', 'seller', 'admin')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE public.categories (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    item_type TEXT NOT NULL
        CHECK (item_type IN ('product', 'service'))
);

CREATE TABLE public.catalogue_items (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    item_type TEXT NOT NULL
        CHECK (item_type IN ('product', 'service')),
    category_id BIGINT REFERENCES public.categories(id),
    brand TEXT,
    model TEXT,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE public.listings (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    seller_id UUID NOT NULL REFERENCES auth.users(id)
        ON DELETE CASCADE,
    catalogue_item_id BIGINT NOT NULL
        REFERENCES public.catalogue_items(id),
    price NUMERIC(12, 2) NOT NULL CHECK (price >= 0),
    price_unit TEXT,
    item_condition TEXT,
    description TEXT,
    status TEXT NOT NULL DEFAULT 'active'
        CHECK (status IN ('active', 'inactive')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX listings_item_idx
    ON public.listings(catalogue_item_id);

CREATE INDEX listings_seller_idx
    ON public.listings(seller_id);

CREATE INDEX listings_price_idx
    ON public.listings(price);

CREATE INDEX catalogue_name_idx
    ON public.catalogue_items(name);

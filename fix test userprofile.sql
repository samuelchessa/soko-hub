
UPDATE public.profiles
SET
    full_name = 'Ruth bilha',
    role = 'seller'
WHERE id = (
    SELECT id
    FROM auth.users
    WHERE email = 'oboteruth851@gmail.com'
)
RETURNING id, full_name, role;

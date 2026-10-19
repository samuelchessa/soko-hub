
SELECT
    u.id AS auth_user_id,
    u.email,
    p.full_name,
    p.role,
    p.created_at
FROM auth.users AS u
LEFT JOIN public.profiles AS p
    ON p.id = u.id
ORDER BY u.created_at DESC
LIMIT 5;

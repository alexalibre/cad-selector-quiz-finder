
-- Insert Alex as an admin user directly into the admin_users table
-- We'll use a fixed UUID for consistency
INSERT INTO public.admin_users (id, email, role) 
VALUES ('550e8400-e29b-41d4-a716-446655440000', 'alex@admin.com', 'admin')
ON CONFLICT (id) DO NOTHING;

-- Create a function to handle admin user creation without email verification
CREATE OR REPLACE FUNCTION public.create_admin_user(user_email text, user_password text)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  user_id uuid := '550e8400-e29b-41d4-a716-446655440000';
  result json;
BEGIN
  -- Insert the user into auth.users with email confirmed
  INSERT INTO auth.users (
    id,
    instance_id,
    email,
    encrypted_password,
    email_confirmed_at,
    created_at,
    updated_at,
    confirmation_token,
    email_change,
    email_change_token_new,
    recovery_token
  ) VALUES (
    user_id,
    '00000000-0000-0000-0000-000000000000',
    user_email,
    crypt(user_password, gen_salt('bf')),
    now(),
    now(),
    now(),
    '',
    '',
    '',
    ''
  ) ON CONFLICT (id) DO UPDATE SET
    email = user_email,
    encrypted_password = crypt(user_password, gen_salt('bf')),
    email_confirmed_at = now(),
    updated_at = now();

  -- Ensure the user is in admin_users table
  INSERT INTO public.admin_users (id, email, role)
  VALUES (user_id, user_email, 'admin')
  ON CONFLICT (id) DO UPDATE SET
    email = user_email,
    role = 'admin';

  result := json_build_object('success', true, 'user_id', user_id);
  RETURN result;
EXCEPTION
  WHEN others THEN
    result := json_build_object('success', false, 'error', SQLERRM);
    RETURN result;
END;
$$;

-- Execute the function to create the admin user
SELECT public.create_admin_user('alex@admin.com', 'Alibre');

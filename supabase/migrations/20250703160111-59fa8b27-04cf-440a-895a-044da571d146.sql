
-- Create a function to handle new user registration and automatically add them as admin
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  -- Insert into admin_users table for all new users (you can modify this logic later)
  INSERT INTO public.admin_users (id, email, role)
  VALUES (NEW.id, NEW.email, 'admin');
  RETURN NEW;
EXCEPTION
  WHEN others THEN
    -- If insertion fails, still return NEW to allow user creation
    RETURN NEW;
END;
$$;

-- Create trigger to automatically add new users as admins
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

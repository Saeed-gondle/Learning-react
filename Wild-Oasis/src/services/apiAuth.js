import supabase, { supabaseUrl } from './supabase';

export const login = async ({ email, password }) => {
  let { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  if (error) {
    throw error;
  }
  return data;
};
export const getCurrentUser = async () => {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    console.error('Error fetching user:', error);
    return null;
  }
  return data?.user || null;
};

export const logout = async () => {
  console.log('Logging out user');
  let { error } = await supabase.auth.signOut();
  if (error) {
    throw error;
  }
};
export const signup = async ({ fullName, email, password }) => {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      fullName,
      avatar:
        'https://ui-avatars.com/api/?name=' +
        fullName.replace(/\s+/g, '+') +
        '&background=random&color=fff',
    },
  });
  if (error) {
    throw error;
  }

  return data;
};

export const updateCurrentUser = async ({
  password,
  fullName,
  avatar,
}) => {
  let updateData = {};
  if (password) updateData.password = password;
  if (fullName) updateData.fullName = fullName;

  const { data, error } = await supabase.auth.updateUser({
    data: updateData,
  });
  if (error) {
    throw error;
  }
  if (!avatar) {
    return data;
  }
  const fileName = `avatars/${data.user.id}/${Date.now()}_${avatar.name}`;
  const { error: uploadError } = await supabase.storage
    .from('avatars')
    .upload(fileName, avatar, {
      cacheControl: '3600',
      upsert: true,
    });
  if (uploadError) {
    throw new Error(
      'Failed to upload avatar: ' + uploadError.message
    );
  }
  const { data: updatedUser, error: updatedUserError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      },
    });
  if (updatedUserError) {
    throw new Error(
      'Failed to update user with avatar URL: ' +
        updatedUserError.message
    );
  }
  return updatedUser;
};

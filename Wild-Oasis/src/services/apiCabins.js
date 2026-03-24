import supabase, { supabaseUrl } from './supabase';

export async function getCabins() {
  const { data, error } = await supabase.from('cabins').select('*');
  if (error) {
    console.log(error);
    throw new Error('cabins could not be loaded!💥 ');
  }
  return data;
}
export async function createOrUpdateCabin(newCabin, id) {
  const hasImagePath =
    typeof newCabin.image === 'string' &&
    (newCabin.image.startsWith(supabaseUrl) ||
      newCabin.image.startsWith('https://images.unsplash.com'));
  let imageName;
  let imagePath = newCabin.image;

  // Generate new image path if uploading a file
  if (!hasImagePath) {
    imageName = `${Math.random()}-${newCabin.image.name.replaceAll('/', '')}`;
    imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  }

  // 1. Create or update cabin
  let query = supabase.from('cabins');

  if (!id) {
    query = query.insert([{ ...newCabin, image: imagePath }]);
  }

  if (id) {
    query = query
      .update({ ...newCabin, image: imagePath })
      .eq('id', id);
  }

  const { data, error } = await query.select();

  if (error) {
    console.error(error);
    throw new Error(error.message || 'Cabin could not be saved');
  }

  // 2. Upload image if new file
  if (!hasImagePath) {
    const { error: storageError } = await supabase.storage
      .from('cabin-images')
      .upload(imageName, newCabin.image);

    if (storageError) {
      await supabase.from('cabins').delete().eq('id', data[0].id);

      console.error(storageError);
      throw new Error(
        'Cabin image could not be uploaded and cabin was not created'
      );
    }
  }

  return data;
}
export async function deleteCabin(id) {
  const { data, error } = await supabase
    .from('cabins')
    .delete()
    .eq('id', id)
    .select();

  if (error) {
    throw new Error('Cabin could not be deleted');
  }

  return data;
}

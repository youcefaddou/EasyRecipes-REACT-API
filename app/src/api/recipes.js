const API_URL = 'http://localhost:3000';

export async function fetchRecipes() {
  const res = await fetch(`${API_URL}/recipes`);
  if (!res.ok) throw new Error('Erreur lors du chargement des recettes');
  return res.json();
}

export async function fetchRecipe(id) {
  const res = await fetch(`${API_URL}/recipes/${id}`);
  if (!res.ok) throw new Error('Erreur lors du chargement de la recette');
  return res.json();
}

export async function deleteRecipe(id) {
  const res = await fetch(`${API_URL}/recipes/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Erreur lors de la suppression');
  return res.json();
}

export async function updateRecipe(id, data) {
  const res = await fetch(`${API_URL}/recipes/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Erreur lors de la modification');
  return res.json();
}

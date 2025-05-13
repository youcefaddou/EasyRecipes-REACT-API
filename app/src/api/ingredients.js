const API_URL = 'http://localhost:3000';

export async function fetchIngredients() {
  const res = await fetch(`${API_URL}/ingredients`);
  if (!res.ok) throw new Error('Erreur lors du chargement des ingrédients');
  return res.json();
}

export async function deleteIngredient(id) {
  const res = await fetch(`${API_URL}/ingredients/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Erreur lors de la suppression');
  return res.json();
}

export async function updateIngredient(id, data) {
  const res = await fetch(`${API_URL}/ingredients/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Erreur lors de la modification');
  return res.json();
}

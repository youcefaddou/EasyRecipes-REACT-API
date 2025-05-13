import { useEffect, useState } from 'react';
import { fetchIngredients, deleteIngredient, updateIngredient } from '../api/ingredients';

export default function Ingredients() {
  const [ingredients, setIngredients] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState('');

  useEffect(() => {
    fetchIngredients().then(setIngredients).catch(console.error);
  }, []);

  const handleDelete = async (id) => {
    await deleteIngredient(id);
    setIngredients(ingredients.filter(i => i._id !== id));
  };

  const handleEdit = (ingredient) => {
    setEditId(ingredient._id);
    setEditName(ingredient.name);
  };

  const handleUpdate = async (id) => {
    const updated = await updateIngredient(id, { name: editName });
    setIngredients(ingredients.map(i => i._id === id ? updated.ingredient : i));
    setEditId(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Ingrédients</h1>
      <ul>
        {ingredients.map(ingredient => (
          <li key={ingredient._id} className="mb-2">
            {editId === ingredient._id ? (
              <>
                <input
                  value={editName}
                  onChange={e => setEditName(e.target.value)}
                  className="border px-2 py-1"
                />
                <button onClick={() => handleUpdate(ingredient._id)} className="ml-2 text-green-600">Valider</button>
                <button onClick={() => setEditId(null)} className="ml-2 text-gray-600">Annuler</button>
              </>
            ) : (
              <>
                <span>{ingredient.name} - {ingredient.quantity}</span>
                <button onClick={() => handleEdit(ingredient)} className="ml-2 text-blue-600">Modifier</button>
                <button onClick={() => handleDelete(ingredient._id)} className="ml-2 text-red-600">Supprimer</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

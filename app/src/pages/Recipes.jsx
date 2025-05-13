import { useEffect, useState } from 'react';
import { fetchRecipes, deleteRecipe, updateRecipe } from '../api/recipes';

const API_URL = 'http://localhost:3000';

export default function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [error, setError] = useState(null);

  // Ajout recette
  const [showAddRecipe, setShowAddRecipe] = useState(false);
  const [newRecipe, setNewRecipe] = useState({
    title: '',
    instructions: '',
    prepareTime: '',
    cookingTime: '',
    difficulty: 'facile',
    category: 'plat principal'
  });

  // Menu déroulant ingrédients
  const [openIngredients, setOpenIngredients] = useState({});

  // Gestion ingrédients par recette
  const [ingredientInputs, setIngredientInputs] = useState({});
  const [editIngredient, setEditIngredient] = useState({});
  const [editIngredientValue, setEditIngredientValue] = useState({});

  useEffect(() => {
    fetchRecipes()
      .then(setRecipes)
      .catch(err => setError(err.message));
  }, []);

  const handleDelete = async (id) => {
    await deleteRecipe(id);
    setRecipes(recipes.filter(r => r._id !== id));
  };

  const handleEdit = (recipe) => {
    setEditId(recipe._id);
    setEditTitle(recipe.title);
  };

  const handleUpdate = async (id) => {
    const updated = await updateRecipe(id, { title: editTitle });
    setRecipes(recipes.map(r => r._id === id ? updated.recipe : r));
    setEditId(null);
  };

  // Ajout recette
  const handleAddRecipe = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/recipes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRecipe)
      });
      if (!res.ok) throw new Error('Erreur lors de la création');
      const data = await res.json();
      setRecipes([...recipes, data.recipe]);
      setShowAddRecipe(false);
      setNewRecipe({
        title: '',
        instructions: '',
        prepareTime: '',
        cookingTime: '',
        difficulty: 'facile',
        category: 'plat principal'
      });
    } catch (err) {
      setError(err.message);
    }
  };

  // Gestion menu déroulant ingrédients
  const toggleIngredients = (id) => {
    setOpenIngredients(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Ajout ingrédient à une recette
  const handleAddIngredient = async (recipeId) => {
    const { name = '', quantity = '' } = ingredientInputs[recipeId] || {};
    if (!name || !quantity) return;
    try {
      const res = await fetch(`${API_URL}/recipes/${recipeId}/ingredients`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, quantity })
      });
      if (!res.ok) throw new Error('Erreur ajout ingrédient');
      const data = await res.json();
      setRecipes(recipes.map(r =>
        r._id === recipeId
          ? { ...r, ingredients: [...(r.ingredients || []), data.ingredient] }
          : r
      ));
      setIngredientInputs({ ...ingredientInputs, [recipeId]: { name: '', quantity: '' } });
    } catch (err) {
      setError(err.message);
    }
  };

  // Suppression ingrédient d'une recette
  const handleDeleteIngredient = async (recipeId, ingredientId) => {
    try {
      const res = await fetch(`${API_URL}/recipes/${recipeId}/ingredients/${ingredientId}`, {
        method: 'DELETE'
      });
      if (!res.ok) throw new Error('Erreur suppression ingrédient');
      setRecipes(recipes.map(r =>
        r._id === recipeId
          ? { ...r, ingredients: r.ingredients.filter(i => i._id !== ingredientId) }
          : r
      ));
    } catch (err) {
      setError(err.message);
    }
  };

  // Edition ingrédient d'une recette
  const handleEditIngredient = (recipeId, ingredient) => {
    setEditIngredient({ recipeId, ingredientId: ingredient._id });
    setEditIngredientValue({ name: ingredient.name, quantity: ingredient.quantity });
  };

  const handleUpdateIngredient = async (recipeId, ingredientId) => {
    try {
      const res = await fetch(`${API_URL}/recipes/${recipeId}/ingredients/${ingredientId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editIngredientValue)
      });
      if (!res.ok) throw new Error('Erreur modification ingrédient');
      const data = await res.json();
      setRecipes(recipes.map(r =>
        r._id === recipeId
          ? {
              ...r,
              ingredients: r.ingredients.map(i =>
                i._id === ingredientId ? data.ingredient : i
              )
            }
          : r
      ));
      setEditIngredient({});
      setEditIngredientValue({});
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Les Recettes</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}

      {/* Bouton ajout recette */}
      <button
        className="mb-4 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
        onClick={() => setShowAddRecipe(!showAddRecipe)}
      >
        {showAddRecipe ? 'Annuler' : 'Ajouter une recette'}
      </button>

      {/* Formulaire ajout recette */}
      {showAddRecipe && (
        <form onSubmit={handleAddRecipe} className="mb-6 border p-4 rounded bg-gray-50">
          <div className="mb-2">
            <input
              className="border px-2 py-1 w-full"
              placeholder="Titre"
              value={newRecipe.title}
              onChange={e => setNewRecipe({ ...newRecipe, title: e.target.value })}
              required
            />
          </div>
          <div className="mb-2">
            <textarea
              className="border px-2 py-1 w-full"
              placeholder="Instructions"
              value={newRecipe.instructions}
              onChange={e => setNewRecipe({ ...newRecipe, instructions: e.target.value })}
              required
            />
          </div>
          <div className="mb-2 flex gap-2">
            <input
              className="border px-2 py-1 flex-1"
              placeholder="Temps de préparation"
              value={newRecipe.prepareTime}
              onChange={e => setNewRecipe({ ...newRecipe, prepareTime: e.target.value })}
            />
            <input
              className="border px-2 py-1 flex-1"
              placeholder="Temps de cuisson"
              value={newRecipe.cookingTime}
              onChange={e => setNewRecipe({ ...newRecipe, cookingTime: e.target.value })}
            />
          </div>
          <div className="mb-2 flex gap-2">
            <select
              className="border px-2 py-1"
              value={newRecipe.difficulty}
              onChange={e => setNewRecipe({ ...newRecipe, difficulty: e.target.value })}
            >
              <option value="facile">Facile</option>
              <option value="moyen">Moyen</option>
              <option value="difficile">Difficile</option>
            </select>
            <select
              className="border px-2 py-1"
              value={newRecipe.category}
              onChange={e => setNewRecipe({ ...newRecipe, category: e.target.value })}
            >
              <option value="entrée">Entrée</option>
              <option value="plat principal">Plat principal</option>
              <option value="dessert">Dessert</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Ajouter
          </button>
        </form>
      )}

      <ul>
        {recipes.map(recipe => (
          <li key={recipe._id} className="mb-6 border-b pb-4">
            {editId === recipe._id ? (
              <>
                <input
                  value={editTitle}
                  onChange={e => setEditTitle(e.target.value)}
                  className="border px-2 py-1"
                />
                <button onClick={() => handleUpdate(recipe._id)} className="ml-2 text-green-600">Valider</button>
                <button onClick={() => setEditId(null)} className="ml-2 text-gray-600">Annuler</button>
              </>
            ) : (
              <>
                <span className="font-semibold text-lg">{recipe.title}</span>
                <button onClick={() => handleEdit(recipe)} className="ml-2 text-blue-600">Modifier</button>
                <button onClick={() => handleDelete(recipe._id)} className="ml-2 text-red-600">Supprimer</button>
              </>
            )}

            {/* Infos recette */}
            <div className="mt-2 text-sm text-gray-700">
              <div><span className="font-medium">Instructions :</span> {recipe.instructions}</div>
              <div>
                <span className="font-medium">Préparation :</span> {recipe.prepareTime || '-'} | 
                <span className="font-medium ml-2">Cuisson :</span> {recipe.cookingTime || '-'}
              </div>
              <div>
                <span className="font-medium">Difficulté :</span> {recipe.difficulty} | 
                <span className="font-medium ml-2">Catégorie :</span> {recipe.category}
              </div>
            </div>

            {/* Menu déroulant ingrédients */}
            <div className="mt-3">
              <button
                className="text-orange-600 underline"
                onClick={() => toggleIngredients(recipe._id)}
              >
                {openIngredients[recipe._id] ? 'Masquer les ingrédients' : 'Voir les ingrédients'}
              </button>
              {openIngredients[recipe._id] && (
                <div className="mt-2 ml-2 bg-orange-50 rounded p-3">
                  {/* Liste ingrédients */}
                  <ul>
                    {(recipe.ingredients || []).map(ing => (
                      <li key={ing._id} className="flex items-center mb-2">
                        {editIngredient.ingredientId === ing._id && editIngredient.recipeId === recipe._id ? (
                          <>
                            <input
                              className="border px-1 py-0.5 mr-1"
                              value={editIngredientValue.name}
                              onChange={e => setEditIngredientValue(val => ({ ...val, name: e.target.value }))}
                              placeholder="Nom"
                            />
                            <input
                              className="border px-1 py-0.5 mr-1"
                              value={editIngredientValue.quantity}
                              onChange={e => setEditIngredientValue(val => ({ ...val, quantity: e.target.value }))}
                              placeholder="Quantité"
                            />
                            <button
                              className="text-green-600 mr-1"
                              onClick={() => handleUpdateIngredient(recipe._id, ing._id)}
                            >Valider</button>
                            <button
                              className="text-gray-600"
                              onClick={() => setEditIngredient({})}
                            >Annuler</button>
                          </>
                        ) : (
                          <>
                            <span>{ing.name} - {ing.quantity}</span>
                            <button
                              className="ml-2 text-blue-600"
                              onClick={() => handleEditIngredient(recipe._id, ing)}
                            >Modifier</button>
                            <button
                              className="ml-2 text-red-600"
                              onClick={() => handleDeleteIngredient(recipe._id, ing._id)}
                            >Supprimer</button>
                          </>
                        )}
                      </li>
                    ))}
                  </ul>
                  {/* Ajout ingrédient */}
                  <div className="flex gap-2 mt-2">
                    <input
                      className="border px-1 py-0.5"
                      placeholder="Nom"
                      value={ingredientInputs[recipe._id]?.name || ''}
                      onChange={e =>
                        setIngredientInputs(inputs => ({
                          ...inputs,
                          [recipe._id]: {
                            ...inputs[recipe._id],
                            name: e.target.value
                          }
                        }))
                      }
                    />
                    <input
                      className="border px-1 py-0.5"
                      placeholder="Quantité"
                      value={ingredientInputs[recipe._id]?.quantity || ''}
                      onChange={e =>
                        setIngredientInputs(inputs => ({
                          ...inputs,
                          [recipe._id]: {
                            ...inputs[recipe._id],
                            quantity: e.target.value
                          }
                        }))
                      }
                    />
                    <button
                      className="bg-green-600 text-white px-2 py-1 rounded"
                      onClick={() => handleAddIngredient(recipe._id)}
                      type="button"
                    >Ajouter</button>
                  </div>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
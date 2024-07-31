import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [ingredients, setIngredients] = useState([]);
  const [newIngredientName, setNewIngredientName] = useState('');
  const [newIngredientQuantity, setNewIngredientQuantity] = useState(0);
  const [servings, setServings] = useState(1);
  const [unit, setUnit] = useState('g');

  const units = ['g', 'kg', 'ml', 'l', 'tsp', 'tbsp'];

  const addIngredient = () => {
    if (newIngredientName.trim() !== '') {
      setIngredients([
        ...ingredients,
        { name: newIngredientName, quantity: newIngredientQuantity, unit },
      ]);
      setNewIngredientName('');
      setNewIngredientQuantity(0);
    }
  };

  const removeIngredient = (index) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients.splice(index, 1);
    setIngredients(updatedIngredients);
  };

  const calculateTotalIngredients = () => {
    return ingredients.map((ingredient) => ({
      name: ingredient.name,
      totalQuantity: ingredient.quantity * servings,
      unit: ingredient.unit,
    }));
  };

  return (
    <div style={{ backgroundColor:  'lightgreen', height: '100vh' }}>
    <div /* className="container my-5" */>
      <h2 className="text-center mb-4">Calcolatore di Ingredienti</h2>
      <div className="d-flex justify-content-center mb-4">
        <img src="/img/logo.png" alt="Logo" className="img-fluid" style={{ maxWidth: '40%' }} />
      </div>

      <h3 className="mb-3">Ingredienti</h3>
      {ingredients.map((ingredient, index) => (
        <div key={index} className="d-flex align-items-center mb-3">
          <input
            type="text"
            className="form-control me-2"
            value={ingredient.name}
            readOnly
          />
          <input
            type="number"
            className="form-control me-2"
            value={ingredient.quantity}
            readOnly
          />
          <input
            type="text"
            className="form-control me-2"
            value={ingredient.unit}
            readOnly
          />
          <button
            className="btn btn-danger"
            onClick={() => removeIngredient(index)}
          >
            Remove
          </button>
        </div>
      ))}

      <div className="d-flex align-items-center mb-3">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Ingredient Name"
          value={newIngredientName}
          onChange={(e) => setNewIngredientName(e.target.value)}
        />
        <input
          type="number"
          className="form-control me-2"
          min={0}
          value={newIngredientQuantity}
          onChange={(e) => setNewIngredientQuantity(e.target.value)}
        />
        <select
          className="form-select me-2"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
        >
          {units.map((u, i) => (
            <option key={i} value={u}>
              {u}
            </option>
          ))}
        </select>
        <button className="btn btn-primary" onClick={addIngredient}>
          Add
        </button>
      </div>

      <h3 className="mb-3">Portate</h3>
      <input
        type="number"
        className="form-control mb-3"
        min={1}
        value={servings}
        onChange={(e) => setServings(e.target.value)}
      />

      <h3 className="mb-3">Totale Ingredienti Necessari</h3>
      <ul className="list-group">
        {calculateTotalIngredients().map((ingredient, index) => (
          <li key={index} className="list-group-item">
            {ingredient.name}: {ingredient.totalQuantity} {ingredient.unit}
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
}

export default App;
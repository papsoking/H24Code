import { useState, useEffect, useCallback } from "react";

// URL de l'API backend
const API_URL = import.meta.env.VITE_URL_BACKEND;

function App() {
  const [snippets, setSnippets] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", category: "PHP", code: "" });
  const [filter, setFilter] = useState("");

  // Fonction pour récupérer les snippets depuis l'API
  const fetchSnippets = useCallback(async () => {
    try {
      const res = await fetch(filter ? `${API_URL}?category=${filter}` : API_URL);
      const data = await res.json();
      setSnippets(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des snippets :", error);
    };
  }, [filter]);

  useEffect(() => {
    fetchSnippets();
  }, [fetchSnippets]);

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setForm({ title: "", description: "", category: "PHP", code: "" });
      fetchSnippets();
    } catch (error) {
      console.error("Erreur lors de l'ajout du snippet :", error);
    }
  };

  // Fonction pour copier le code dans le presse-papiers
  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    alert("Code copié !");
  };

  return (
    <div className="App">
      <h1>📚 Snippets App</h1>

      {/* Formulaire */}
      <form onSubmit={handleSubmit} className="snippet-form">
        <div>
          <input
            type="text"
            placeholder="Titre"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          >
            <option>PHP</option>
            <option>HTML</option>
            <option>CSS</option>
          </select>
        </div>
        
        <div>
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          ></textarea>
          <textarea
            placeholder="Code..."
            value={form.code}
            onChange={(e) => setForm({ ...form, code: e.target.value })}
            required
          ></textarea>
        </div>
        <button type="submit">Ajouter</button>
      </form>

      {/* Filtre */}
      <div className="filter-buttons">
        <button onClick={() => setFilter("")}>Tous</button>
        <button onClick={() => setFilter("PHP")}>PHP</button>
        <button onClick={() => setFilter("HTML")}>HTML</button>
        <button onClick={() => setFilter("CSS")}>CSS</button>
      </div>

      {/* Liste des snippets */}
      <ul>
        {snippets.map((s) => (
          <li key={s.id}>
            <h3>{s.title} ({s.category})</h3>
            <p>{s.description}</p>
            <pre>{s.code}</pre>
            <button onClick={() => copyCode(s.code)} id="copier">Copier</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

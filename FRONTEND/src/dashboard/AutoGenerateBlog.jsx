import React, { useState } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";

const AutoGenerateBlog = () => {
  const [formData, setFormData] = useState({
    topic: "",
    tone: "informative",
    keywords: "",
    length: "medium",
    category: "Automation",
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const token = localStorage.getItem("token"); // admin auth token
      const res = await axios.post(
        "http://localhost:4000/api/blog/auto-generate",
        {
          ...formData,
          keywords: formData.keywords
            ? formData.keywords.split(",").map((k) => k.trim())
            : [],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setResult(res.data.blog);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-2xl mt-10">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Auto Generate Blog</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="topic"
          placeholder="Enter blog topic"
          value={formData.topic}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2"
          required
        />

        <select
          name="tone"
          value={formData.tone}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2"
        >
          <option value="informative">Informative</option>
          <option value="casual">Casual</option>
          <option value="professional">Professional</option>
          <option value="funny">Funny</option>
        </select>

        <input
          type="text"
          name="keywords"
          placeholder="Enter keywords (comma separated)"
          value={formData.keywords}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2"
        />

        <select
          name="length"
          value={formData.length}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2"
        >
          <option value="short">Short</option>
          <option value="medium">Medium</option>
          <option value="long">Long</option>
        </select>

        <input
          type="text"
          name="category"
          placeholder="Category (default: Automation)"
          value={formData.category}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={20} /> Generating...
            </>
          ) : (
            "Generate Blog"
          )}
        </button>
      </form>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {result && (
        <div className="mt-6 p-4 border rounded-lg bg-gray-50">
          <h2 className="text-xl font-bold">{result.title}</h2>
          <p className="text-gray-600">{result.about}</p>
          {result.blogImage?.url && (
            <img
              src={result.blogImage.url}
              alt="Blog"
              className="mt-4 rounded-lg w-full"
            />
          )}
          <p className="text-sm mt-2 text-gray-500">
            Created by {result.adminName} |{" "}
            {new Date(result.updatedAt).toLocaleString()}
          </p>
        </div>
      )}
    </div>
  );
};

export default AutoGenerateBlog;

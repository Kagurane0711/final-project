import React from "react";
import { Link } from "react-router-dom";
import useUsers from "../store/users.js";
import useBookStore from "../store/BookStore.js";
import { getAssetUrl } from "../services/api.js";

export default function Books({
  id,
  cover,
  title,
  category,
  author,
  permalink,
  onDelete,
}) {
  const { user } = useUsers();
  const { removeBooks } = useBookStore();
  const isAdmin = user?.role === "admin";

  const handleRemove = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm(`Apakah Anda yakin ingin menghapus buku "${title}"?`)) {
      try {
        await removeBooks(id);
        if (onDelete) {
          onDelete(id);
        }
      } catch (err) {
        alert("Gagal menghapus buku: " + (err.response?.data?.message || err.message));
      }
    }
  };

  const previewUrl = `/preview/${id}${permalink ? `/${permalink}` : ""}`;
  const updateUrl = `/update/${id}${permalink ? `/${permalink}` : ""}`;
  const coverImageSrc = getAssetUrl(cover);

  return (
    <div className="flex flex-col h-full bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden dark:bg-gray-800 dark:border-gray-700">
      <Link to={previewUrl} className="relative block aspect-[3/4] overflow-hidden bg-gray-100">
        <img
          className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105"
          src={coverImageSrc}
          alt={`Sampul buku ${title || ""}`}
          loading="lazy"
        />
      </Link>

      <div className="flex flex-col flex-1 p-4 justify-between">
        <div>
          <Link to={previewUrl}>
            <h3
              className="text-base font-semibold text-gray-900 hover:text-blue-600 line-clamp-2 dark:text-white transition-colors"
              title={title}
            >
              {title}
            </h3>
          </Link>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Penulis: <span className="text-gray-700 dark:text-gray-300 font-medium">{author || "-"}</span>
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Kategori:{" "}
            <span className="inline-block px-2 py-0.5 text-[11px] font-medium bg-blue-50 text-blue-700 rounded-full dark:bg-blue-900/30 dark:text-blue-300">
              {Array.isArray(category) ? category.join(", ") : category || "-"}
            </span>
          </p>
        </div>

        {isAdmin && (
          <div className="flex items-center space-x-2 pt-3 mt-3 border-t border-gray-100 dark:border-gray-700">
            <Link
              to={updateUrl}
              className="flex-1 text-center px-3 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              Edit
            </Link>
            <button
              type="button"
              onClick={handleRemove}
              className="flex-1 text-center px-3 py-1.5 text-xs font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
            >
              Hapus
            </button>
          </div>
        )}
      </div>
    </div>
  );
}


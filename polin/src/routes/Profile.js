import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar.js";
import Books from "../components/books.js";
import Footer from "../components/footer.js";
import { Link } from "react-router-dom";
import { logout } from "../authProvider";
import useUsers from "../store/users.js";

const Profile = () => {
  const { user, fetchUser, userFavorites, fetchFav, changeRole } = useUsers();
  const [isAdminState, setIsAdminState] = useState(false);
  const [togglingRole, setTogglingRole] = useState(false);

  useEffect(() => {
    fetchUser();
    fetchFav();
  }, [fetchUser, fetchFav]);

  useEffect(() => {
    if (user?.role === "admin") {
      setIsAdminState(true);
    } else {
      setIsAdminState(false);
    }
  }, [user]);

  const handleToggleAdmin = async (e) => {
    const newStatus = e.target.checked;
    setTogglingRole(true);
    try {
      await changeRole(newStatus ? 1 : 0);
      setIsAdminState(newStatus);
    } catch (err) {
      alert("Gagal mengubah role admin: " + (err.message || "Error"));
    } finally {
      setTogglingRole(false);
    }
  };

  const fullName = user
    ? [user.given_name, user.family_name].filter(Boolean).join(" ") || "Pengguna Polin"
    : "Memuat profil...";

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <div className="sticky top-0 z-40 bg-white shadow-sm">
        <Navbar />
      </div>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left Column: Profile Card */}
          <div className="md:col-span-4 lg:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 flex flex-col items-center text-center">
              <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-blue-50 dark:border-gray-700 shadow-sm mb-4">
                {user?.picture ? (
                  <img
                    className="w-full h-full object-cover"
                    src={user.picture}
                    alt={fullName}
                  />
                ) : (
                  <div className="w-full h-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-3xl">
                    {user?.given_name ? user.given_name.charAt(0) : "U"}
                  </div>
                )}
              </div>

              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                {fullName}
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {user?.email || ""}
              </p>

              <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                {isAdminState ? "Administrator" : "Pembaca"}
              </div>

              {/* Admin toggle */}
              <div className="w-full mt-6 pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Mode Admin
                </span>
                <label
                  htmlFor="admin-toggle"
                  className="inline-flex relative items-center cursor-pointer"
                >
                  <input
                    type="checkbox"
                    id="admin-toggle"
                    checked={isAdminState}
                    disabled={togglingRole}
                    onChange={handleToggleAdmin}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              {/* Action buttons */}
              <div className="w-full mt-6 space-y-3">
                {isAdminState && (
                  <Link
                    to="/upload"
                    className="w-full block text-center py-2.5 px-4 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm transition-colors"
                  >
                    + Upload Buku Baru
                  </Link>
                )}

                <button
                  type="button"
                  onClick={logout}
                  className="w-full py-2.5 px-4 text-sm font-medium text-red-600 hover:text-white bg-red-50 hover:bg-red-600 rounded-xl transition-colors border border-red-200 hover:border-transparent"
                >
                  Keluar (Sign Out)
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Favorites & Activities */}
          <div className="md:col-span-8 lg:col-span-9 space-y-8">
            {/* Favorites Section */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-6 bg-blue-600 rounded-full"></span>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Buku Favorit
                  </h2>
                </div>
                <span className="text-xs text-gray-500 bg-gray-100 dark:bg-gray-700 px-2.5 py-1 rounded-full font-medium">
                  {userFavorites.length} buku
                </span>
              </div>

              {userFavorites.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl">
                  <p className="text-gray-500 text-sm">
                    Belum ada buku favorit yang ditambahkan.
                  </p>
                  <Link
                    to="/"
                    className="inline-block mt-3 text-sm text-blue-600 font-medium hover:underline"
                  >
                    Jelajahi buku sekarang &rarr;
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {userFavorites.map((element) => (
                    <Books
                      key={element.id}
                      id={element.id}
                      cover={element.cover_url}
                      title={element.title}
                      category={element.categories}
                      author={element.author}
                      permalink={element.permalink}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Bookmarks Section */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
              <div className="flex items-center space-x-2 mb-4">
                <span className="w-2.5 h-6 bg-yellow-500 rounded-full"></span>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Bookmark Halaman Terakhir
                </h2>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl text-sm text-gray-600 dark:text-gray-300">
                {sessionStorage.getItem("pageNumber") ? (
                  <p>
                    Anda terakhir membaca sampai halaman{" "}
                    <span className="font-bold text-blue-600">
                      {sessionStorage.getItem("pageNumber")}
                    </span>
                    .
                  </p>
                ) : (
                  <p>Belum ada bookmark halaman aktif saat ini.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;


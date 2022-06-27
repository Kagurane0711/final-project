import create from "zustand"
import axios from "axios"
import { accessToken } from "../authProvider.js"

const useUsers = create((set) => ({
        user: [],
        userFavorites: [],
        fetchUser: async (url) => {
            const response = await axios({
                method: "get",
                url: url,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                }
            })
            // console.log("response", response);
            if (response.status === 200) {
                set({ user: await response.data})
                set({ loggedIn: true})
            }
        },
        fetchFav: async (url) => {
            const response = await axios({
                method: "get",
                url: url,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                }
            })
            // console.log("response", response);
            if (response.status === 200) {
                set({ userFavorites: await response.data})
            }
        },
        addFavorite: async (id) => {
            const response = await axios({
                method: "put",
                url: `${process.env.REACT_APP_API_BASE_URL}/user/favorites/add?book_id=${id}`,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                }
            })
            console.log("response", response)
        },
        removeFavorite: async (id) => {
            const response = await axios({
                method: "delete",
                url: `${process.env.REACT_APP_API_BASE_URL}/user/favorites/remove?book_id=${id}`,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                }
            })
            console.log("response", response)
        },
        changeRole: async () => {
            const response = await axios({
                method: "post",
                url: `${process.env.REACT_APP_API_BASE_URL}/user/admin/set?enabled=1`,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                }
            })
            console.log("response", response)
        },
    })
)

export default useUsers;
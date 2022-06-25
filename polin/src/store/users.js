import create from "zustand"
import { devtools } from "zustand/middleware"
import axios from "axios"
import { accessToken } from "../authProvider.js"

const useUsers = create((set) => ({
        user: [],
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
    })
)

export default useUsers;
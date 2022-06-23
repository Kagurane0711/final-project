import create from "zustand"
import { devtools } from "zustand/middleware"
import axios from "axios"

const useUsers = create((set) => ({
        user: [],
        fetchUser: async (url) => {
            const response = await axios.get(url);
            console.log("response", response);
            set({ user: await response.data})
        },
    })
)

export default useUsers;
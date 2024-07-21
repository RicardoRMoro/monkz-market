import axios from "axios"

export const signIn = () => {
    window.location.href = "http://localhost:5000/api/v1/auth/steam"
}

export const signOut = (setUser) => {
    axios.post('http://localhost:5000/api/logout', {}, { withCredentials: true })
        .then(() => {
            if (setUser) setUser(null)
        })
        .catch(err => {
            console.error(err)
        })
}

// check if user is authenticated
export const checkUser = async (setUser) => {
    try {
        const response = await axios.get('http://localhost:5000/api/me', { withCredentials: true })
        setUser(response.data)
    } catch {
        setUser(null)
    }
}
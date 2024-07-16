import express from "express"
import session from "express-session"
import dotenv from "dotenv"
dotenv.config()
import SteamSignIn from "steam-signin"
import axios from "axios"

const app = express()

const realm = process.env.API_URL
const signIn = new SteamSignIn(realm)

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
}))


//isso aqui inicializa o login, vem do front-end e redireciona pro login da steam
app.get('/api/v1/auth/steam', (req, res) => {
    res.statusCode = 302
    res.setHeader(
        "Location",
        signIn.getUrl(process.env.API_URL + '/api/auth/steam/return')
    )
    res.end()
})


//o retorno depois do login
app.get('/api/v1/auth/steam/return', async (req, res) => {
    res.setHeader('Content-Type', 'text/plain')
    try {
        let steamId = await signIn.verifyLogin(req.url)

        const steamid64 = steamId.getSteamID64()
        const response = await axios.get(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${process.env.STEAM_API_KEY}&steamids=${steamid64}`)
        const { avatarfull, personaname } = response.data.response.players[0]

        req.session.user = {
            steamid64,
            avatarfull,
            personaname,
        }
        await req.session.save()
    
        res.redirect(process.env.FRONT_URL)
    } catch (error) {
        console.error(error)
        return res.status(500).send('There was an error signing in.')
    }
})

// rota home, retornando os dados do usuario se ele estiver logado
app.get('/', (req, res) => {
    const { user } = req.session
    res.status(200).send(user)
})

app.listen(5000, () =>{ console.log("server rodando") })
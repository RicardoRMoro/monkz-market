import express from "express"
import session from "express-session"
import dotenv from "dotenv"
import SteamSignIn from "steam-signin"
import axios from "axios"
import pg from "pg"
import crypto from "crypto"
import cors from "cors"

dotenv.config()

const { Pool } = pg
const app = express()
const realm = process.env.API_URL
const signIn = new SteamSignIn(realm)
const pool = new Pool({
    "host": "localhost",
    "user": "postgres",
    "port": 5432,
    "ssl": false,
    "database": "bodeskins",
    "password": "pica123",
    "max" : 20, //quantas conexões simultaneas existem no pool
    "connectionTimeoutMillis" : 0, //quanto tempo cliente espera até ter uma pool livre, 0 é forever
    "idleTimeoutMillis" : 0 //deixar 0 pra manter as 20 conexões mesmo que estejam iddle
})

app.use(cors({
    origin: process.env.FRONT_URL, 
    credentials: true
}))

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
}))


//isso aqui inicializa o login, front-end bate nessa rota endpoint que redireciona pro login da steam
app.get('/api/v1/auth/steam', (req, res) => {
    res.statusCode = 302
    res.setHeader(
        "Location",
        signIn.getUrl(process.env.API_URL + '/api/auth/steam/return')
    )
    res.end()
})


//o retorno depois do login
app.get('/api/auth/steam/return', async (req, res) => {
    res.setHeader('Content-Type', 'text/plain')
    try {
        let steamId = await signIn.verifyLogin(req.url)

        const steamid64 = steamId.getSteamID64()
        const response = await axios.get(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${process.env.STEAM_API_KEY}&steamids=${steamid64}`)
        const { avatarfull, personaname, avatar, communityvisibilitystate } = response.data.response.players[0]

        const hash_id = crypto.createHash('sha256').update(steamid64).digest('hex')

        await pool.query(
            `INSERT INTO users (steamid64, avatarfull, personaname, avatar, communityvisibilitystate, hash_id)
             VALUES ($1, $2, $3, $4, $5, $6)
             ON CONFLICT (steamid64) DO UPDATE SET
             avatarfull = EXCLUDED.avatarfull,
             personaname = EXCLUDED.personaname,
             avatar = EXCLUDED.avatar,
             communityvisibilitystate = EXCLUDED.communityvisibilitystate,
             hash_id = EXCLUDED.hash_id`,
            [steamid64, avatarfull, personaname, avatar, communityvisibilitystate, hash_id]
        )

        req.session.user = {
            steamid64,
            avatarfull,
            personaname,
            avatar,
            communityvisibilitystate,
        }
        await req.session.save()
    
        res.redirect(process.env.FRONT_URL)
    } catch (error) {
        console.error(error)
        return res.status(500).send('There was an error signing in.')
    }
})

app.get('/api/me', (req, res) => {
    const { user } = req.session
    if (!user) {
        return res.status(401).send('User not logged in.')
    }

    res.status(200).send(user)
})

app.listen(5000, () =>{ console.log("server rodando") })
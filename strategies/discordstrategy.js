const DiscordStrategy = require('passport-discord').Strategy;
const passport = require('passport');
const mongoDB = require('../DB/mongoDB');
const DiscordUser = require('../DB/mongoModels/DiscordUser.js')

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    const user = await DiscordUser.findById(id);
    if (user) done(null, user);
});

passport.use(new DiscordStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CLIENT_REDIRECT,
    scope: ['identify', 'email', 'guilds']
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const user = await DiscordStrategy.findOne({ discordId: profile.id });
        if(user) {
            done(null, user);
        } else {
            const newUser = await DiscordStrategy.create({
                id: { type: String, required: true },
                username: { type: String, required: true }
            });
            const savedUser = await newUser.save();
            done(null, savedUser);
        }
    } catch (e) {
        console.log(e);
        done(error, null);
    }
}));

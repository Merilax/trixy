const DiscordStrategy = require('passport-discord').Strategy;
const passport = require('passport');
const DiscordUser = require('../DB/modals/DiscordUser')

passport.serializeUser( (user, done) => {
    done(null, user._id);
});

passport.deserializeUser( async (_id, done) => {
    const user = await DiscordUser.findById(_id);
    if (user) done(null, user);
});

passport.use(new DiscordStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CLIENT_REDIRECT,
    scope: ['identify', 'email', 'guilds']
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const user = await DiscordUser.findOne({ discordId: profile.id });
        if(user) {
            done(null, user);
        } else {
            const newUser = await DiscordUser.create({
                discordId: profile.id,
                username: profile.username
            });
            const savedUser = await newUser.save();
            done(null, savedUser);
        }
    } catch (err) {
        console.log(err);
        done(err, null);
    }
}));

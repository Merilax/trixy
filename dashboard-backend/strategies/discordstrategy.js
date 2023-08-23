const DiscordStrategy = require('passport-discord').Strategy;
const passport = require('passport');
const DiscordUser = require('../../bot/DB/modals/DiscordUser')

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
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
        const user = await DiscordUser.findOne({ userId: profile.id });
        if (user) {
            console.log(user);
            await user.update({ username: profile.username, useravatar: profile.avatar, guilds: profile.guilds });
            const updatedUser = await DiscordUser.findOne({ userId: profile.id });
            done(null, updatedUser);
        } else {
            console.log("null user");
            const newUser = await DiscordUser.create({
                userId: profile.id,
                username: profile.username,
                useravatar: profile.avatar,
                guilds: profile.guilds
            });
            console.log(newUser);
            const savedUser = await newUser.save();
            console.log(savedUser);
            done(null, savedUser);
        }
    } catch (err) {
        console.log(err);
        done(err, null);
    }
}));

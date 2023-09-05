# TRIXY-DEPRECATED

0.1.6 >> Added autoresponses.  
0.1.7 >> Added `dice` command. 

---

# TRIXY

1.0.0 >> New command system and double argument handlers.  
1.1.0 >> Added `kick` and `ban` commands.  
1.2.0 >> Added a suggestion function.  
1.3.0 >> Added a message purge function.  
1.3.1 >> Improved kick and ban commands to work without role names.  
1.4.0 >> Added commands to reboot and kill the bot.  
1.4.1 >> Added owner id limitations.  
1.4.2 >> Added a primitive role system.  
1.5.0 >> Added `mute` command.  
1.5.1 >> Added command cooldown.  
1.6.0 >> Added testing environment.  
1.7.0 >> Added raid filter.  
1.7.1 >> Added bot `admin only` limitation option.  
1.8.0 >> Added `serverinfo` command.  
1.9.0 >> Added owner-only `say` command.  
1.10.0 >> Added `admincheck` command.  
1.11.0 >> Added `MESSAGE_DELETED` event handler.  
1.12.0 >> Heavy code cleanup.  
1.13.0 >> Added folder systems.  
1.14.0 >> Added weak http request handler.  
1.15.0 >> Fixed MMFPEG dependencies. Granted ability to connect/speak in voice channels.  
1.15.1 >> Fixed music module internal latency drops.  

---

# TRIXY V2

2.0.0 >> Reworked command handler into a folder system. `kill` and `reboot` commands removed. Testing environment removed, now using test build Trixy Pioneer.  
2.1.0 >> New `kick` and `ban` commands.  
2.1.1 >> New images added.  
2.2.0 >> New console logger.  
2.3.0 >> Added `dog` and `fox` commands.  
2.3.1 >> Bot is no longer case sensitive with prefix.  
2.4.0 >> Added `mute` and `unnmute` commands. Added JSON database and timed events.  
2.5.0 >> Modified `help` and `server` command. Added `user` command.  
2.5.1 >> New emotes for commands. Fixed `addrole` and `removerole` commands.  
2.6.0 >> Added `weather` and `cosmos` commands.  
2.7.0 >> Added `fact` command. Fixed handling for bad http requests.  
2.8.0 >> Added `remindme` command.  
2.8.1 >> Bugfix patch.    
2.9.0 >> Music commands reworked into folders. Music Core removed.  
2.10.0 >> Reworked autoresponses into a JSON colection.  
2.11.0 >> Added `youtube` command. Improved command handler with subfolders.  
2.11.1 >> Fixed `addrole` and `removerole` commands, again.  
2.12.0 >> `help` command now shows details about specific commands if specified.  
2.13.0 >> `server` command will now show the role list if accompanied by a <roles> argument. `suggest` command now works remotely.  
2.13.1 >> Bugfix patch.  
2.14.R - REVERTED >> Trixy now pings her partner, Vairen, to wake him up.  
2.13.2 >> Changes on 1.14.R reverted, no longer needed. Instead, `shutdown` command added.
2.14.0 >> Updated discord.js to v12. `youtube` command removed, `bird` command added. Code cleanup.
2.14.1 >> Code cleanup.
2.14.2 >> Fixed all music commands. Added `np`, `queue`, `pause` and `resume` commands. `leave` command renamed to `stop`.
2.15.0 >> Added leveling system. Added `levelsystem`, `level` and `leaderboard` commands.
2.15.1 >> Added `leveldelete` command.
2.15.2 >> Fixed all moderation commands, improved level system and fixed `leaderboard` command. Minor code cleanup.
2.16.0 >> Added `prefix` command for custom prefix support. Reworked `remind` and `mute` commands to work on databases. `mute` command now accepts durations again. Fixed more commands, minor code cleanup. Fixed an issue with `weather` timezones. `help` command now includes command usages.

---

# TRIXY V3

3.0.0 >> Set up Express, finished basic website, linked databases. All music commands and dependencies removed to comply with YouTube ToS.
3.1.0 >> Implemented Canvas for the `level` command. Bugfixes.
3.1.1 >> Added `usercolor` command to change xp card colour (and any future user defined colours) from a command rather than the web dashboard. Major code cleanup. Bugfixes. Second Core takedown.
3.2.0 >> Restructured folder system and adjusted paths. Code cleanup.
3.3.0 >> Added `guildcolor` command. Implemented Canvas into the `leaderboard` command. Improved `leveldelete` command to work with IDs. Fixed some discrepancies with database model handling.
3.4.0 >> Added role rewards by XP. Added `addreward`, `removereward`, `rewardlist` and `rewardtype` commands. Fixed typos and incoherent messages.
3.5.0 >> Bumped Discord.JS to 14.0.2. Fixed `mute` and `unmute` command.
3.6.0 >> Restructured both databases and adjusted code accordingly. Added `levelchannel`, `levelmention` and `mentionoverride` commands. Minor bugfixes.
3.6.1 >> Fixed reminder infinite loop. Fixed level up not specifying the target user.
3.6.2 >> Fixed dashboard login. Fixed level embeds not displaying.
3.6.3 >> `remind` now differentiates between minutes and hours.
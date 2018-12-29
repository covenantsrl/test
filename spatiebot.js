/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var Spatie = {
    announce: function (what) {
        Spatie.log("Announce: " + what);
        Network.sendChat(what);
    },
    calcDiff: function (first, second) {
        var diffX = second.x - first.x;
        var diffY = second.y - first.y;
        var distance = Math.sqrt(diffX * diffX + diffY * diffY);
        return {
            diffX: diffX,
            diffY: diffY,
            distance: distance,
        };
    },
    decodeHtml: function (html) {
        var sp = Spatie;
        sp.htmlDecodeHelper = sp.htmlDecodeHelper || document.createElement("textarea");
        sp.htmlDecodeHelper.innerHTML = html;
        return sp.htmlDecodeHelper.value;
    },
    getDeltaTo: function (what) {
        what = what || this.state.victim;
        if (!what.pos && what.x && what.y) {
            what = { pos: what };
        }
        // accuracy
        var victimPos = Spatie.getPosition(what);
        var myPos = Players.getMe().pos;
        var delta = __assign({}, Spatie.calcDiff(myPos, victimPos), { isAccurate: victimPos.isAccurate });
        return delta;
    },
    getPosition: function (what) {
        // accuracy
        var isAccurate = true;
        var pos = what.pos;
        if (what.lowResPos) {
            isAccurate = Spatie.calcDiff(what.lowResPos, what.pos).distance < 900;
            pos = isAccurate ? pos : what.lowResPos;
        }
        return {
            x: pos.x,
            y: pos.y,
            isAccurate: isAccurate
        };
    },
    getHostilePlayersSortedByDistance: function (excludeID, includeIDs) {
        var _this = this;
        if (excludeID === void 0) { excludeID = null; }
        if (includeIDs === void 0) { includeIDs = null; }
        var allPlayers = Spatie.getPlayers();
        var players = allPlayers.filter(function (p) {
            return p.team !== game.myTeam && p.id !== excludeID && (!includeIDs || includeIDs.indexOf(p.id) > -1);
        });
        players.sort(function (victimA, victimB) {
            var a = _this.getDeltaTo(victimA);
            var b = _this.getDeltaTo(victimB);
            if (a.isAccurate && !b.isAccurate) {
                return -1;
            }
            if (!a.isAccurate && b.isAccurate) {
                return 1;
            }
            if (a.distance < b.distance) {
                return -1;
            }
            if (b.distance < a.distance) {
                return 1;
            }
            return 0;
        });
        return players;
    },
    getPlayers: function () {
        var result = [];
        var playerIDs = Players.getIDs();
        for (var id in playerIDs) {
            if (playerIDs.hasOwnProperty(id)) {
                var p = Players.get(id);
                if (p) {
                    result.push(p);
                }
            }
        }
        return result;
    },
    getRandomNumber: function (lower, upper) {
        return lower + Math.floor(Math.random() * (upper - lower));
    },
    log: function (what) {
        if (what === void 0) { what = null; }
        if (!what) {
            return;
        }
        var sp = Spatie;
        if (Spatie.shouldLog) {
            if (!sp.logger) {
                sp.logger = document.createElement("div");
                document.body.appendChild(sp.logger);
                sp.logger.style = "position: absolute; top: 50px; left: 300px; color: white: width: 600px; height: 500px; overflow: scroll";
            }
            var line = document.createElement("div");
            line.innerText = what;
            sp.logger.insertBefore(line, sp.logger.firstChild);
            if (sp.logger.childElementCount > 100) {
                sp.logger.removeChild(sp.logger.lastChild);
            }
        }
        else {
            if (sp.logger) {
                document.body.removeChild(sp.logger);
                sp.logger = null;
            }
        }
        if (Spatie.shouldLogToConsole) {
            console.log(what);
        }
    },
    shouldLog: false,
    shouldLogToConsole: false,
};
exports.Spatie = Spatie;


/***/ }),
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var FlagInfo = /** @class */ (function () {
    function FlagInfo() {
        this.redFlag = { pos: { x: 0, y: 0 }, taken: false, carrierName: "" };
        this.blueFlag = { pos: { x: 0, y: 0 }, taken: false, carrierName: "" };
        this.redHomeBase = { pos: { x: 8600, y: -940 } };
        this.blueHomeBase = { pos: { x: -9670, y: -1470 } };
    }
    FlagInfo.prototype.setFlagLocation = function (flagNo, posX, posY) {
        var flag = this.getFlag(flagNo);
        flag.pos.x = posX;
        flag.pos.y = posY;
        flag.taken = false;
    };
    FlagInfo.prototype.getFlag = function (flagNo) {
        if (flagNo === 2) {
            return this.redFlag;
        }
        return this.blueFlag;
    };
    FlagInfo.prototype.setFlagTaken = function (flagNo) {
        this.getFlag(flagNo).taken = true;
    };
    FlagInfo.prototype.getFlagInfo = function (flagNo) {
        return this.getFlag(flagNo);
    };
    FlagInfo.prototype.setFlagCarrier = function (flagNo, name) {
        this.getFlag(flagNo).carrierName = name;
    };
    FlagInfo.prototype.getHomebase = function (flagNo) {
        if (flagNo === 2) {
            return this.redHomeBase;
        }
        return this.blueHomeBase;
    };
    return FlagInfo;
}());
// export singleton
var flagInfo = new FlagInfo();
exports.flagInfo = flagInfo;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var spatie_1 = __webpack_require__(2);
var spatiebot_1 = __webpack_require__(11);
var flagInfo_1 = __webpack_require__(9);
function spatiebotInitializer() {
    var currentBot = null;
    var limitUpdates = false;
    var toggleKey = "b";
    var logChat = false;
    var useInsults = false;
    function createNewBot() {
        var newBot = new spatiebot_1.SpatieBot();
        // expose to manipulating in the console
        window.Spatie = spatie_1.Spatie;
        window.SpatieBot = newBot;
        return newBot;
    }
    function createSettingsProvider() {
        // this is the handler that will be executed when new settings are applied
        function onApply(values) {
            limitUpdates = values.limitUpdates;
            toggleKey = values.toggleKey;
            logChat = values.logChat;
            useInsults = values.useInsults;
        }
        // default values for the settings
        var defaultValues = {
            limitUpdates: false,
            toggleKey: "b",
            logChat: false,
            useInsults: false,
        };
        var sp = new SettingsProvider(defaultValues, onApply);
        var section = sp.addSection("SpatieBot settings");
        section.addBoolean("limitUpdates", "Don't update screen when window doesn't have focus (for hosting many bots)");
        section.addBoolean("logChat", "Log chat to console");
        section.addBoolean("useInsults", "Insult 1 of 4 killing this bot");
        section.addString("toggleKey", "Key to press to toggle the bot", { maxLength: 1 });
        return sp;
    }
    SWAM.registerExtension({
        name: "SpatieBot 4.2",
        id: "spatie042",
        description: "Runs one bot",
        author: "Spatie",
        version: "4.2",
        settingsProvider: createSettingsProvider(),
    });
    SWAM.on("gamePrep", function () {
        console.log("Press '" + toggleKey + "' to toggle bot");
        // hijack the Mobs.add function to detect missiles being fired
        var orgMobsAdd = Mobs.add;
        Mobs.add = function (mob, unknown, playerID) {
            // call original function first
            orgMobsAdd.apply(null, arguments);
            if (currentBot) {
                currentBot.onMobAdd(playerID, mob);
            }
        };
        // hijack the updateUpgrades function to detect how many upgrades player has
        // unfortunately this method is only called when applying updates, so
        // we also need to hijack showmessage for this too
        var orgUiUpdateUpgrades = UI.updateUpgrades;
        UI.updateUpgrades = function (upgradeStats, availableUpgrades, type) {
            orgUiUpdateUpgrades.apply(null, arguments);
            if (currentBot) {
                currentBot.upgradeInfo.availableUpgrades = availableUpgrades;
                currentBot.upgradeInfo.upgradeStats = upgradeStats;
            }
        };
        // hijack the showmessage function to detect upgrades
        var orgShowMessage = UI.showMessage;
        UI.showMessage = function (type, message, duration) {
            // call original function first
            orgShowMessage.apply(null, arguments);
            var m = /upgrade/.exec(message);
            if (m) {
                if (currentBot) {
                    currentBot.upgradeInfo.availableUpgrades = currentBot.upgradeInfo.availableUpgrades || 0;
                    currentBot.upgradeInfo.availableUpgrades += 1;
                }
            }
        };
        // hijack the networkFlag function to detect the flag location
        var orgNetworkFlag = Games.networkFlag;
        Games.networkFlag = function () {
            orgNetworkFlag.apply(null, arguments);
            var info = arguments[0];
            if (info.type === 1) {
                flagInfo_1.flagInfo.setFlagLocation(info.flag, info.posX, info.posY);
            }
            else if (info.type === 2) {
                flagInfo_1.flagInfo.setFlagTaken(info.flag);
            }
        };
        // suspend the raw game rendering if the window doesn't have focus
        var orgRender = Graphics.render;
        Graphics.render = function () {
            if (!limitUpdates || document.hasFocus()) {
                orgRender.apply(null, arguments);
            }
        };
    });
    SWAM.on("keyup", function (evt) {
        var key = evt.originalEvent.key;
        if (key === toggleKey.toLocaleUpperCase() || key === toggleKey.toLocaleLowerCase()) {
            if (currentBot) {
                currentBot.dispose();
                currentBot = null;
            }
            else {
                currentBot = createNewBot();
                currentBot.initialize();
            }
        }
    });
    SWAM.on("playerImpacted", function (data) {
        var owner = data.owner;
        var impactedPlayer = data.players[0].id;
        if (currentBot && impactedPlayer === game.myID) {
            currentBot.onHit(owner);
        }
    });
    SWAM.on("playerKilled", function (data, dead, killer) {
        if (currentBot) {
            currentBot.onPlayerKilled(dead.id, killer.id, useInsults);
        }
    });
    SWAM.on("chatLineAdded", function (player, text, type) {
        if (logChat) {
            console.log(player.name + ": " + text);
        }
        if (currentBot) {
            if (text === "-sb-bond") {
                // bond with all other players with 'Bot 'in their names during 3 lives
                currentBot.toggleBonding();
            }
            else if (text === "-sb-target") {
                currentBot.announceTarget();
            }
            else {
                var suggestionRe = /-sb-suggest[: ]+(.*)/;
                var suggestionMatch = suggestionRe.exec(text);
                if (suggestionMatch) {
                    var suggestedVictim = suggestionMatch[1];
                    currentBot.suggestVictim(player.id, suggestedVictim);
                }
                else {
                    var configRe = /-sb-config[: ]+(.*)/;
                    var configMatch = configRe.exec(text);
                    if (configMatch && player.id === game.myID) {
                        currentBot.switchConfig(configMatch[1]);
                    }
                }
            }
        }
    });
}
spatiebotInitializer();


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var botConfigFactory_1 = __webpack_require__(12);
var spatie_1 = __webpack_require__(2);
var spatiebotState_1 = __webpack_require__(13);
var spatiebotCommandExecutor_1 = __webpack_require__(14);
var spatiebotVictimSelection_1 = __webpack_require__(15);
var playerStat_1 = __webpack_require__(16);
var botNavigationHub_1 = __webpack_require__(17);
var insults_1 = __webpack_require__(18);
var flagInfo_1 = __webpack_require__(9);
var botConfigFactory = new botConfigFactory_1.BotConfigFactory();
var lastConfiguration;
var upgradeInfo = {
    availableUpgrades: 0,
    upgradeStats: {}
};
var playerStats = [];
var SpatieBot = /** @class */ (function () {
    function SpatieBot() {
        this.botNavigationHub = new botNavigationHub_1.BotNavigationHub();
        this.upgradeInfo = upgradeInfo;
    }
    SpatieBot.prototype.announceTarget = function () {
        if (!this.isOn()) {
            return;
        }
        var victim = this.state.victim;
        var victimName = victim ? victim.name : "(no target)";
        spatie_1.Spatie.announce("Target: " + victimName);
    };
    SpatieBot.prototype.dispose = function () {
        if (this.state && this.state.heartbeatInterval) {
            clearInterval(this.state.heartbeatInterval);
            this.commandExecutor.clearCommands();
            this.botNavigationHub.destroy();
            this.commandExecutor = null;
            this.botNavigationHub = null;
            this.victimSelection = null;
            this.state = null;
        }
    };
    SpatieBot.prototype.goto = function (x, y) {
        this.state.gotoCoords = { x: x, y: y };
    };
    SpatieBot.prototype.initialize = function (config) {
        var _this = this;
        if (config === void 0) { config = null; }
        if (this.isOn()) {
            return;
        }
        if (lastConfiguration && lastConfiguration.aircraftType !== Players.getMe().type) {
            // not compatible with current aircraft
            lastConfiguration = null;
        }
        config = config ||
            lastConfiguration ||
            botConfigFactory.getConfigByAircraftType(Players.getMe().type);
        lastConfiguration = config;
        this.config = config;
        this.state = new spatiebotState_1.SpatiebotState();
        this.commandExecutor = new spatiebotCommandExecutor_1.SpatiebotCommandExecutor(this.state, this.config);
        this.victimSelection = new spatiebotVictimSelection_1.SpatiebotVictimSelection(this.state, this.config, playerStats);
        this.botNavigationHub = new botNavigationHub_1.BotNavigationHub();
        spatie_1.Spatie.log("Starting bot of type " + this.config.name);
        if (this.config.bondingTimes > 0) {
            this.config.bondingTimes = this.config.bondingTimes - 1;
        }
        this.state.heartbeatInterval = setInterval(function () { return _this.heartbeat(); }, this.config.heartbeatInterval);
    };
    SpatieBot.prototype.logState = function () {
        if (!this.isOn()) {
            spatie_1.Spatie.log("(no state: bot is off)");
            return;
        }
        try {
            spatie_1.Spatie.log(JSON.stringify(this.state));
        }
        catch (error) {
            console.log(this.state);
        }
    };
    SpatieBot.prototype.onHit = function (attackingPlayerID) {
        if (!this.isOn()) {
            return;
        }
        var playerStat = playerStats.filter(function (x) { return x.id === attackingPlayerID; })[0];
        if (!playerStat) {
            playerStat = new playerStat_1.PlayerStat(attackingPlayerID);
            playerStats.push(playerStat);
        }
        playerStat.addHit();
    };
    SpatieBot.prototype.onMobAdd = function (playerID, mob) {
        if (!this.isOn()) {
            return;
        }
        if (playerID === game.myID) {
            return;
        }
        // then call our own event in case of missiles
        var missilesTypes = [
            1,
            2,
            3,
            5,
            6,
            7,
        ];
        var powerupTypes = [
            4,
            8,
            9,
        ];
        if (missilesTypes.indexOf(mob.type) > -1) {
            this.onMissileFired(mob.id);
        }
        else if (powerupTypes.indexOf(mob.type) > -1) {
            this.onPowerupDetected(mob.id);
        }
    };
    SpatieBot.prototype.onPlayerKilled = function (killedID, killerID, useInsults) {
        var _this = this;
        if (!this.isOn()) {
            return;
        }
        if (killedID === game.myID) {
            spatie_1.Spatie.log("I was killed. Restarting.");
            this.dispose();
            setTimeout(function () { return _this.initialize(); }, this.config.respawnTimeout);
            if (useInsults) {
                var randNumber = spatie_1.Spatie.getRandomNumber(0, 3);
                if (randNumber === 0) {
                    var playerName = Players.get(killerID).name;
                    var insult = insults_1.getInsult();
                    spatie_1.Spatie.announce(playerName + ", you " + insult.toLocaleLowerCase());
                }
            }
        }
        else if (this.state.victim && killedID === this.state.victim.id) {
            spatie_1.Spatie.log("Victim was killed, choosing another victim.");
            this.state.victim = null;
            this.state.pathToVictim = null;
        }
    };
    SpatieBot.prototype.switchConfig = function (configName) {
        if (this.config.name !== configName) {
            var newConfig = botConfigFactory.getConfigByName(configName);
            if (newConfig) {
                this.dispose();
                this.initialize(newConfig);
            }
        }
    };
    SpatieBot.prototype.toggleBonding = function () {
        if (!this.isOn()) {
            return;
        }
        if (this.config.bondingTimes) {
            this.config.bondingTimes = null;
            spatie_1.Spatie.announce("Every SpatieBot for itself");
        }
        else {
            this.config.bondingTimes = 3;
            this.state.victim = null;
            spatie_1.Spatie.announce("All SpatieBots, unite!");
        }
    };
    SpatieBot.prototype.suggestVictim = function (playerID, suggestedVictim) {
        if (!this.isOn()) {
            return;
        }
        var suggestedPlayer = Players.getByName(suggestedVictim);
        if (suggestedPlayer && suggestedPlayer.id !== game.myID) {
            this.state.suggestedVictimID = suggestedPlayer.id;
            this.state.suggestingPlayerID = playerID;
        }
    };
    SpatieBot.prototype.applyUpgrades = function () {
        var _this = this;
        var tooEarly = false;
        if (this.state.lastUpgradeApplicationTime) {
            var elapsedSinceLastApplication = Date.now() - this.state.lastUpgradeApplicationTime;
            tooEarly = elapsedSinceLastApplication < 5000;
        }
        var hasEnoughUpgrades = this.upgradeInfo.availableUpgrades >= 5;
        var hasNoRisk = Players.getMe().health >= 0.9;
        if (!tooEarly && hasEnoughUpgrades && hasNoRisk) {
            var count_1 = 0;
            this.state.lastUpgradeApplicationTime = Date.now();
            var upgradeInterval_1 = setInterval(function () {
                Network.sendCommand("upgrade", _this.config.applyUpgradesTo + "");
                count_1 += 1;
                if (count_1 === 5) {
                    clearInterval(upgradeInterval_1);
                }
            }, 400);
        }
    };
    SpatieBot.prototype.approachCoords = function () {
        var coords = this.state.gotoCoords;
        var poi = { pos: coords };
        var delta = spatie_1.Spatie.getDeltaTo(poi);
        this.setSpeedMovement("UP");
        this.setFastMovement(false);
        if (delta.distance > this.config.distanceNear) {
            this.setFastMovement(true);
        }
        else if (delta.distance < this.config.distanceZero) {
            this.setSpeedMovement(null);
            this.state.gotoCoords = null;
        }
    };
    SpatieBot.prototype.approachMob = function () {
        this.setSpeedMovement("UP");
        if (this.state.mob.delta.distance > this.config.distanceClose) {
            this.setFastMovement(true);
        }
    };
    SpatieBot.prototype.approachVictim = function () {
        var victim = this.state.victim;
        if (!victim) {
            this.setSpeedMovement(null);
            return;
        }
        var delta = spatie_1.Spatie.getDeltaTo(victim);
        var direction;
        this.setFastMovement(false);
        if (this.state.isVictimPoweredUp && delta.distance < this.config.distanceNear && !this.hasShield()) {
            // back off
            direction = "DOWN";
        }
        else if (delta.distance > this.config.distanceFar) {
            if (Players.getMe().health > this.config.fleeHealthThresholdMax) {
                this.setFastMovement(true);
            }
            direction = "UP";
        }
        else if (delta.distance > this.config.distanceTooClose) {
            direction = "UP";
        }
        else {
            // too close
            direction = "DOWN";
        }
        this.setSpeedMovement(direction);
    };
    SpatieBot.prototype.detectFlagTaken = function () {
        this.state.flagCarrierID = null;
        var blueFlagCarrierName = getPlayerName($("#blueflag-name").html(), /^([^<>]+)</);
        var redFlagCarrierName = getPlayerName($("#redflag-name").html(), />([^<>]+)$/);
        if (blueFlagCarrierName || redFlagCarrierName) {
            var me = Players.getMe();
            var redPlayer = Players.getByName(blueFlagCarrierName);
            if (redPlayer && redPlayer.team !== me.team) {
                this.state.flagCarrierID = redPlayer.id;
            }
            var bluePlayer = Players.getByName(redFlagCarrierName);
            if (bluePlayer && bluePlayer.team !== me.team) {
                this.state.flagCarrierID = bluePlayer.id;
            }
        }
        flagInfo_1.flagInfo.setFlagCarrier(1, blueFlagCarrierName);
        flagInfo_1.flagInfo.setFlagCarrier(2, redFlagCarrierName);
        function getPlayerName(raw, re) {
            var m = re.exec(raw);
            if (m) {
                return spatie_1.Spatie.decodeHtml(m[1]);
            }
            return null;
        }
    };
    SpatieBot.prototype.detectDangerousObjects = function () {
        this.state.objectToFleeFromID = null;
        if (this.hasShield()) {
            return;
        }
        // detect dangerous missiles
        var missileIDs = this.state.missileIDs || [];
        this.state.missileIDs = [];
        var activeMissiles = [];
        for (var i_1 = 0; i_1 < missileIDs.length; i_1++) {
            var missile = Mobs.get(missileIDs[i_1]);
            if (missile) {
                activeMissiles.push(missile);
                missile.delta = null;
            }
        }
        var dangerFactorForHealth = this.config.fleeHealthThresholdMax / Players.getMe().health;
        if (activeMissiles.length > 0) {
            var myPos_1 = Players.getMe().pos;
            activeMissiles.sort(function (a, b) {
                var deltaA = a.delta || spatie_1.Spatie.calcDiff(myPos_1, a.pos);
                var deltaB = b.delta || spatie_1.Spatie.calcDiff(myPos_1, b.pos);
                a.delta = deltaA;
                b.delta = deltaB;
                if (deltaA.distance < deltaB.distance) {
                    return -1;
                }
                else if (deltaB.distance < deltaA.distance) {
                    return 1;
                }
                return 0;
            });
            var nearestMissile = activeMissiles[0];
            var delta = nearestMissile.delta || spatie_1.Spatie.calcDiff(myPos_1, nearestMissile.pos);
            var dangerFactorForMissile = nearestMissile.exhaust / 18; // = heli missile exhaust
            var dangerDistance = this.config.distanceMissileDangerous * dangerFactorForMissile * dangerFactorForHealth;
            if (delta.distance < dangerDistance) {
                this.state.objectToFleeFromID = nearestMissile.id;
            }
        }
        var activeMissileIDs = activeMissiles.map(function (x) { return x.id; });
        for (var i = 0; i < activeMissileIDs.length; i++) {
            this.state.missileIDs.push(activeMissileIDs[i]);
        }
        // detect nearby enemies
        if (!this.state.objectToFleeFromID) {
            var victimID = this.state.victim ? this.state.victim.id : null;
            var agressivePlayerIDs = void 0;
            if (!this.config.offensive) {
                // if the bot is not an offensive bot, only flee from proven agressive players
                agressivePlayerIDs = playerStats
                    .filter(function (x) { return x.isAgressive; })
                    .map(function (x) { return x.id; });
            }
            var closestEnemy = spatie_1.Spatie.getHostilePlayersSortedByDistance(victimID, agressivePlayerIDs)[0];
            if (closestEnemy) {
                var delta = spatie_1.Spatie.getDeltaTo(closestEnemy);
                var dangerDistance = dangerFactorForHealth * this.config.distanceTooClose;
                if (delta.isAccurate && delta.distance < dangerDistance) {
                    this.state.objectToFleeFromID = closestEnemy.id;
                }
            }
        }
        if (this.state.objectToFleeFromID) {
            this.clearPathFinding();
        }
    };
    SpatieBot.prototype.detectShouldFlee = function () {
        if (this.hasShield()) {
            return;
        }
        if (Players.getMe().health < this.config.fleeHealthThresholdMin) {
            this.state.isFleeing = true;
            this.clearPathFinding();
        }
    };
    SpatieBot.prototype.detectStuckness = function () {
        if (this.state.isStuck) {
            // no need to re-detect
            return;
        }
        var me = Players.getMe();
        var speed = me.speed;
        var seemsStuck = Math.abs(speed.x) < 1 && Math.abs(speed.y) < 1 && me.state.thrustLevel > 0;
        if (seemsStuck) {
            if (!this.state.stucknessTimeout) {
                this.state.stucknessTimeout = Date.now() + this.config.stucknessTimeoutMs;
            }
            else {
                this.state.stucknessTimeout = this.state.stucknessTimeout - this.config.heartbeatInterval;
            }
            var stucknessElapsed = this.state.stucknessTimeout <= 0;
            if (stucknessElapsed) {
                this.state.stucknessTimeout = null;
                this.state.isStuck = true;
                this.clearPathFinding();
                var durationRandomness = spatie_1.Spatie.getRandomNumber(0, 250);
                this.state.stuckTimeStopTurning = Date.now() + this.config.stucknessTurnDurationMs - durationRandomness;
                this.state.stuckTimeStopFlying = Date.now() + this.config.stucknessFlyDurationMs + durationRandomness;
                if (this.state.detectedPowerUps && this.state.detectedPowerUps.length > 0) {
                    // stuckness is probably caused by the powerups?
                    this.state.detectedPowerUps = null;
                }
                // turn a random angle around 90 degrees
                var pi = Math.atan2(0, -1);
                var randomAngle = spatie_1.Spatie.getRandomNumber(pi * 0.3 * 100, pi * 0.4 * 100) / 100;
                var randomDirection = spatie_1.Spatie.getRandomNumber(0, 2);
                randomDirection = randomDirection === 0 ? -1 : 1;
                this.setDesiredAngle(Players.getMe().rot + (randomDirection * randomAngle));
            }
        }
        else {
            this.state.stucknessTimeout = this.state.stucknessTimeout + this.config.heartbeatInterval;
            if (this.state.stucknessTimeout > this.config.stucknessTimeoutMs) {
                this.state.stucknessTimeout = null;
            }
        }
    };
    SpatieBot.prototype.detectVictimPowerUps = function () {
        this.state.isVictimPoweredUp = false;
        if (!this.state.victim) {
            return;
        }
        if (this.state.victim.powerups.rampage || this.state.victim.powerups.shield) {
            this.state.isVictimPoweredUp = true;
        }
    };
    SpatieBot.prototype.fireAtVictim = function () {
        if (this.config.fireConstantly) {
            this.setFire(true, null);
            return;
        }
        // fire at pursuitor(s) while fleeing / carrying flag
        var shouldFire = this.state.isFleeing || this.isPlayerCarryingFlag();
        // always fire when we have an upgrade
        if (!shouldFire) {
            var isRampaging = this.hasRampage();
            shouldFire = isRampaging;
        }
        // otherwise fire if near the victim
        if (!shouldFire) {
            if (this.state.victim) {
                var delta = spatie_1.Spatie.getDeltaTo(this.state.victim);
                shouldFire = delta.distance < this.config.distanceNear;
            }
        }
        var stopFiringTimeout = 1000;
        if (this.state.isFleeing) {
            stopFiringTimeout = 200;
        }
        this.setFire(shouldFire, stopFiringTimeout);
    };
    SpatieBot.prototype.fleeFrom = function (thing) {
        var me = Players.getMe();
        var delta = spatie_1.Spatie.calcDiff(me.pos, thing.pos);
        if (this.config.useSpecial === "WHOMP" && me.energy > 0.4 && delta.distance < this.config.distanceMissileDangerous) {
            // whomp the thing away
            this.setWhomp();
            spatie_1.Spatie.log("WHOMPING, energy level " + me.energy);
        }
        var directionToThing = Math.atan2(delta.diffX, -delta.diffY);
        var pi = Math.atan2(0, -1);
        if (directionToThing < 0) {
            directionToThing = pi * 2 + directionToThing;
        }
        this.setDesiredAngle(directionToThing);
        this.setFastMovement(true);
        this.setSpeedMovement("DOWN");
    };
    SpatieBot.prototype.handleFlee = function () {
        // find the nearest player and flee from it
        if (Players.getMe().health > this.config.fleeHealthThresholdMax || this.hasShield()) {
            this.state.isFleeing = false;
            return;
        }
        var playerToFleeFrom = spatie_1.Spatie.getHostilePlayersSortedByDistance()[0];
        if (!playerToFleeFrom) {
            this.state.isFleeing = false;
            return;
        }
        var delta = spatie_1.Spatie.getDeltaTo(playerToFleeFrom);
        if (delta.distance > this.config.distanceFar * 2) {
            this.state.isFleeing = false;
            return;
        }
        this.fleeFrom(playerToFleeFrom);
    };
    SpatieBot.prototype.handleObjectToFleeFrom = function () {
        // the idea is to face the object and fly backwards
        var obj = Mobs.get(this.state.objectToFleeFromID);
        if (!obj) {
            obj = Players.get(this.state.objectToFleeFromID);
        }
        if (!obj || this.hasShield()) {
            return;
        }
        this.fleeFrom(obj);
    };
    SpatieBot.prototype.handleStuckness = function () {
        var ms = Date.now();
        if (ms < this.state.stuckTimeStopFlying) {
            this.setSpeedMovement("DOWN");
        }
        else if (ms >= this.state.stuckTimeStopFlying) {
            this.setSpeedMovement(null);
            this.state.isStuck = false;
        }
    };
    SpatieBot.prototype.clearPathFinding = function () {
        this.state.pathToMob = null;
        this.state.pathToVictim = null;
        this.state.pathToCoords = null;
        this.state.startedFindingPathToMob = null;
        this.state.startedFindingPathToVictim = null;
        this.state.startedFindingPathToCoords = null;
    };
    SpatieBot.prototype.hasRampage = function () {
        return Players.getMe().powerups.rampage;
    };
    SpatieBot.prototype.hasShield = function () {
        return Players.getMe().powerups.shield;
    };
    SpatieBot.prototype.heartbeat = function () {
        this.state.previous = this.state.name;
        if (this.state.isStuck) {
            this.state.name = "stuck";
            this.handleStuckness();
        }
        else if (this.state.objectToFleeFromID) {
            this.state.name = "flee from object";
            this.detectStuckness();
            this.handleObjectToFleeFrom();
        }
        else if (this.state.isFleeing) {
            this.state.name = "low health flee";
            this.detectStuckness();
            this.handleFlee();
        }
        else if (this.state.gotoCoords && (!this.state.pathToCoords || this.state.pathToCoords.length === 0)) {
            this.state.name = "finding path to coords";
            this.findPathToCoords();
            this.temporaryMoveToCoords();
            this.detectStuckness();
            this.detectShouldFlee();
        }
        else if (this.state.gotoCoords) {
            this.state.name = "go to coords";
            this.findPathToCoords();
            this.followPathDirectionToCoords();
            this.approachCoords();
            this.updatePath(this.state.pathToCoords);
            this.detectShouldFlee();
        }
        else if (this.state.mob && (!this.state.pathToMob || this.state.pathToMob.length === 0)) {
            this.state.name = "finding path to mob";
            this.findPathToMob();
            this.temporaryMoveToMob();
            this.detectStuckness();
            this.detectShouldFlee();
        }
        else if (this.state.mob) {
            this.state.name = "chase mob";
            this.findPathToMob();
            this.followPathDirectionToMob();
            this.approachMob();
            this.updatePath(this.state.pathToMob);
            this.detectShouldFlee();
        }
        else if (this.state.victim && (!this.state.pathToVictim || this.state.pathToVictim.length === 0)) {
            this.state.name = "finding path to victim";
            this.findPathToVictim();
            this.temporaryMoveToVictim();
            this.detectStuckness();
            this.detectShouldFlee();
        }
        else if (this.state.victim) {
            this.state.name = "chase victim " + this.state.victim.name;
            this.findPathToVictim();
            this.followPathDirectionToVictim();
            this.approachVictim();
            this.updatePath(this.state.pathToVictim);
            this.detectVictimPowerUps();
            // this.detectStuckness();
            this.detectShouldFlee();
            this.victimSelection.selectVictim();
        }
        else {
            this.state.name = "finding life purpose";
            this.victimSelection.selectVictim();
        }
        if (this.state.name !== this.state.previous) {
            spatie_1.Spatie.log(this.state.name);
        }
        this.fireAtVictim();
        this.applyUpgrades();
        this.detectAwayFromHome();
        this.detectDangerousObjects();
        this.commandExecutor.executeCommands(this.isPlayerCarryingFlag());
        this.detectFlagTaken();
        this.detectFlagToGrab();
        if (!this.state.gotoCoords) {
            this.detectMobs();
        }
    };
    SpatieBot.prototype.updatePath = function (path) {
        if (!path) {
            return;
        }
        var firstPos = path[0];
        var delta = spatie_1.Spatie.getDeltaTo(firstPos);
        if (delta.distance <= this.config.distanceZero) {
            path.shift();
        }
    };
    SpatieBot.prototype.isPlayerCarryingFlag = function () {
        if (game.gameType !== 2) {
            return false;
        }
        var otherTeam = Players.getMe().team === 1 ? 2 : 1;
        return flagInfo_1.flagInfo.getFlagInfo(otherTeam).carrierName === Players.getMe().name;
    };
    SpatieBot.prototype.detectFlagToGrab = function () {
        if (game.gameType !== 2) {
            return;
        }
        var otherTeam = Players.getMe().team === 1 ? 2 : 1;
        var enemyFlag = flagInfo_1.flagInfo.getFlagInfo(otherTeam);
        if (enemyFlag.taken) {
            if (this.isPlayerCarryingFlag()) {
                // i'm the flag carrier!
                var myHomeBase = flagInfo_1.flagInfo.getHomebase(Players.getMe().team);
                if (this.state.gotoCoords !== myHomeBase.pos) {
                    this.state.gotoCoords = myHomeBase.pos;
                    this.clearPathFinding();
                }
            }
            else {
                this.state.gotoCoords = null;
                this.clearPathFinding();
            }
        }
        else {
            if (this.state.gotoCoords !== enemyFlag.pos) {
                this.state.gotoCoords = enemyFlag.pos;
                this.clearPathFinding();
            }
        }
    };
    // while finding path, do a simple move to victim
    SpatieBot.prototype.temporaryMoveToVictim = function () {
        if (this.state.victim) {
            this.turnTo(this.state.victim);
            this.approachVictim();
        }
    };
    // while finding path, do a simple move to victim
    SpatieBot.prototype.temporaryMoveToMob = function () {
        if (this.state.mob) {
            this.turnTo(this.state.mob);
            this.approachMob();
        }
    };
    // while finding path, do a simple move to victim
    SpatieBot.prototype.temporaryMoveToCoords = function () {
        if (this.state.gotoCoords) {
            var coords = this.state.gotoCoords;
            var poi = { pos: coords };
            this.turnTo(poi);
            this.approachCoords();
        }
    };
    SpatieBot.prototype.detectMobs = function () {
        if (!this.state.detectedPowerUps || this.state.detectedPowerUps.length === 0) {
            return;
        }
        // find closest, and cleanup the detectedPowerups array in the process
        var powerups = [];
        var closestPowerup;
        for (var i = 0; i < this.state.detectedPowerUps.length; i++) {
            var powerup = Mobs.get(this.state.detectedPowerUps[i]);
            if (powerup) {
                powerups.push(powerup.id);
                powerup.delta = spatie_1.Spatie.getDeltaTo(powerup);
                if (powerup.delta.distance <= this.config.distanceFar * 2) {
                    if (!closestPowerup || closestPowerup.delta.distance > powerup.delta.distance) {
                        closestPowerup = powerup;
                    }
                }
            }
        }
        if (closestPowerup !== this.state.mob) {
            this.clearPathFinding();
        }
        this.state.mob = closestPowerup;
        this.state.detectedPowerUps = powerups;
    };
    SpatieBot.prototype.findPathTo = function (label, what, startedDt, callback, error) {
        var _this = this;
        if (!this.botNavigationHub.isReady) {
            return null;
        }
        var reinitializeBotNavigation = function () {
            _this.botNavigationHub.destroy();
            _this.botNavigationHub = new botNavigationHub_1.BotNavigationHub();
        };
        var pathFinderTimeout = 5000;
        if (startedDt) {
            if (Date.now() - startedDt < pathFinderTimeout) {
                return startedDt;
            }
            // timeout elapsed
            // but the worker may still be doing its calculation if it's heavy
            if (this.botNavigationHub.lastAliveSignal && Date.now() - this.botNavigationHub.lastAliveSignal < pathFinderTimeout) {
                // wait some more
                return startedDt;
            }
            // timeout ultimately elapsed
            reinitializeBotNavigation();
            return null; // not ready yet, so try again next time
        }
        var whatPos = spatie_1.Spatie.getPosition(what);
        var whatDelta = spatie_1.Spatie.getDeltaTo(what);
        this.botNavigationHub.findPath(Players.getMe().pos, whatPos, function (path) {
            if (!_this.isOn()) {
                return;
            }
            path.shift(); // my own position;
            callback(path);
            if (whatDelta.distance > _this.config.distanceNear) {
                // wait for a few milliseconds before trying again
                _this.botNavigationHub.isReady = false;
                setTimeout(function () {
                    if (_this.isOn()) {
                        _this.botNavigationHub.isReady = true;
                    }
                }, 800);
            }
        }, function (err) {
            if (!_this.isOn()) {
                return;
            }
            spatie_1.Spatie.log(err);
            reinitializeBotNavigation();
            error(err);
        });
        return Date.now();
    };
    SpatieBot.prototype.findPathToVictim = function () {
        var _this = this;
        this.state.pathToMob = null;
        this.state.startedFindingPathToMob = null;
        this.state.pathToCoords = null;
        this.state.startedFindingPathToCoords = null;
        this.state.startedFindingPathToVictim = this.findPathTo("victim", this.state.victim, this.state.startedFindingPathToVictim, function (path) {
            _this.state.startedFindingPathToVictim = null;
            _this.state.pathToVictim = path;
        }, function (error) {
            _this.state.startedFindingPathToVictim = null;
            _this.state.pathToVictim = null;
        });
    };
    SpatieBot.prototype.findPathToMob = function () {
        var _this = this;
        this.state.pathToVictim = null;
        this.state.startedFindingPathToVictim = null;
        this.state.pathToCoords = null;
        this.state.startedFindingPathToCoords = null;
        this.state.startedFindingPathToMob = this.findPathTo("mob", this.state.mob, this.state.startedFindingPathToMob, function (path) {
            _this.state.startedFindingPathToMob = null;
            _this.state.pathToMob = path;
        }, function (error) {
            _this.state.startedFindingPathToMob = null;
            _this.state.pathToMob = null;
        });
    };
    SpatieBot.prototype.findPathToCoords = function () {
        var _this = this;
        this.state.pathToVictim = null;
        this.state.startedFindingPathToVictim = null;
        this.state.pathToMob = null;
        this.state.startedFindingPathToMob = null;
        var coords = this.state.gotoCoords;
        var poi = { pos: coords };
        this.state.startedFindingPathToCoords = this.findPathTo("poi", poi, this.state.startedFindingPathToCoords, function (path) {
            _this.state.startedFindingPathToCoords = null;
            _this.state.pathToCoords = path;
        }, function (error) {
            _this.state.startedFindingPathToCoords = null;
            _this.state.pathToCoords = null;
        });
    };
    SpatieBot.prototype.detectAwayFromHome = function () {
        if (!this.config.protectHomeBase) {
            return;
        }
        var deltaFromHome = spatie_1.Spatie.calcDiff(Players.getMe().pos, this.config.homeBase);
        if (deltaFromHome.distance > this.config.homeBase.radius) {
            this.state.gotoCoords = this.config.homeBase;
        }
    };
    SpatieBot.prototype.isOn = function () {
        return !!this.state;
    };
    SpatieBot.prototype.onMissileFired = function (missileID) {
        if (!this.isOn()) {
            return;
        }
        // keep track of this missile to flee from it when necessary
        this.state.missileIDs = this.state.missileIDs || [];
        this.state.missileIDs.push(missileID);
    };
    SpatieBot.prototype.onPowerupDetected = function (powerupID) {
        if (!this.isOn()) {
            return;
        }
        if (!this.config.goForUpgrades) {
            return;
        }
        this.state.detectedPowerUps = this.state.detectedPowerUps || [];
        this.state.detectedPowerUps.push(powerupID);
    };
    SpatieBot.prototype.setFire = function (isFiring, stopFiringTimeout) {
        if (stopFiringTimeout === void 0) { stopFiringTimeout = null; }
        this.state.isFiring = isFiring;
        this.state.stopFiringTimeout = stopFiringTimeout;
    };
    SpatieBot.prototype.setDesiredAngle = function (angle) {
        this.state.desiredAngle = angle;
    };
    SpatieBot.prototype.setSpeedMovement = function (speedMovement) {
        this.state.speedMovement = speedMovement;
    };
    SpatieBot.prototype.setFastMovement = function (fast) {
        this.state.fast = fast;
    };
    SpatieBot.prototype.setWhomp = function () {
        this.state.whomp = true;
    };
    SpatieBot.prototype.turnTo = function (what) {
        var delta = spatie_1.Spatie.getDeltaTo(what);
        var targetDirection = Math.atan2(delta.diffX, -delta.diffY);
        var pi = Math.atan2(0, -1);
        if (targetDirection < 0) {
            targetDirection = pi * 2 + targetDirection;
        }
        this.setDesiredAngle(targetDirection);
    };
    SpatieBot.prototype.followPathDirectionToVictim = function () {
        if (!this.state.pathToVictim || this.state.pathToVictim.length === 0) {
            return;
        }
        var nextPoi = {
            pos: this.state.pathToVictim[0]
        };
        this.turnTo(nextPoi);
    };
    SpatieBot.prototype.followPathDirectionToMob = function () {
        if (!this.state.pathToMob || this.state.pathToMob.length === 0) {
            return;
        }
        var nextPoi = {
            pos: this.state.pathToMob[0]
        };
        this.turnTo(nextPoi);
    };
    SpatieBot.prototype.followPathDirectionToCoords = function () {
        if (!this.state.pathToCoords || this.state.pathToCoords.length === 0) {
            return;
        }
        var nextPoi = {
            pos: this.state.pathToCoords[0]
        };
        this.turnTo(nextPoi);
    };
    return SpatieBot;
}());
exports.SpatieBot = SpatieBot;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var BotConfig = /** @class */ (function () {
    function BotConfig() {
    }
    return BotConfig;
}());
exports.BotConfig = BotConfig;
var BotConfigFactory = /** @class */ (function () {
    function BotConfigFactory() {
        this.normalBotConfig = {
            applyUpgradesTo: 4,
            offensive: true,
            bondingTimes: 0,
            distanceFar: 600,
            distanceNear: 450,
            distanceClose: 300,
            distanceTooClose: 200,
            distanceZero: 50,
            distanceMissileDangerous: 300,
            fleeHealthThresholdMin: 0.3,
            fleeHealthThresholdMax: 0.7,
            fireConstantly: false,
            goForUpgrades: true,
            homeBase: null,
            heartbeatInterval: 75,
            name: "normal",
            precision: 0.1,
            protectHomeBase: false,
            throttleInterval: 150,
            respawnTimeout: 4000,
            stucknessTurnDurationMs: 500,
            stucknessFlyDurationMs: 2000,
            stucknessTimeoutMs: 1500,
            useSpecial: "SPEED",
            useStealth: false,
            victimExpireMs: 120 * 1000,
            aircraftType: 1
        };
        this.squareProtectingBotConfig = __assign({}, this.normalBotConfig, {
            applyUpgradesTo: 2,
            offensive: false,
            homeBase: { x: 926, y: -2805, radius: 500 },
            name: "squareProtecting",
            protectHomeBase: true,
        });
        this.agressiveBotConfig = __assign({}, this.normalBotConfig, {
            applyUpgradesTo: 4,
            distanceTooClose: 50,
            distanceMissileDangerous: 50,
            fireConstantly: true,
            fleeHealthThresholdMin: 0.2,
            fleeHealthThresholdMax: 0.5,
            name: "agressive",
            precision: 0.15,
            stucknessTimeoutMs: 1000,
        });
        this.copterBotConfig = __assign({}, this.normalBotConfig, {
            applyUpgradesTo: 2,
            distanceTooClose: 400,
            distanceMissileDangerous: 400,
            fireConstantly: true,
            fleeHealthThresholdMin: 0.5,
            fleeHealthThresholdMax: 0.9,
            name: "copter",
            useSpecial: null,
            aircraftType: 3
        });
        this.tornadoBotConfig = __assign({}, this.normalBotConfig, {
            applyUpgradesTo: 1,
            distanceTooClose: 100,
            distanceMissileDangerous: 200,
            fleeHealthThresholdMin: 0.5,
            fleeHealthThresholdMax: 0.9,
            name: "tornado",
            useSpecial: "FIRE",
            aircraftType: 4
        });
        this.prowlerBotConfig = __assign({}, this.normalBotConfig, {
            distanceNear: 300,
            distanceClose: 200,
            distanceTooClose: 50,
            distanceMissileDangerous: 200,
            name: "prowler",
            useStealth: true,
            useSpecial: "STEALTH",
            aircraftType: 5
        });
        this.goliathBotConfig = __assign({}, this.normalBotConfig, {
            applyUpgradesTo: 1,
            distanceNear: 500,
            distanceClose: 300,
            distanceTooClose: 150,
            distanceMissileDangerous: 280,
            fleeHealthThresholdMin: 0.2,
            fleeHealthThresholdMax: 0.4,
            name: "goliath",
            useSpecial: "WHOMP",
            aircraftType: 2
        });
    }
    BotConfigFactory.prototype.getConfigByName = function (name) {
        var availableConfigs = [
            this.squareProtectingBotConfig,
            this.agressiveBotConfig,
            this.copterBotConfig,
            this.tornadoBotConfig,
            this.prowlerBotConfig,
            this.goliathBotConfig,
        ];
        var result = availableConfigs.filter(function (x) { return x.name === name; })[0];
        return result;
    };
    BotConfigFactory.prototype.getConfigByAircraftType = function (type) {
        switch (type) {
            case 1:
                return this.agressiveBotConfig;
            case 2:
                return this.goliathBotConfig;
            case 3:
                return this.copterBotConfig;
            case 4:
                return this.tornadoBotConfig;
            case 5:
                return this.prowlerBotConfig;
            default:
                return this.normalBotConfig;
        }
    };
    return BotConfigFactory;
}());
exports.BotConfigFactory = BotConfigFactory;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var SpatiebotState = /** @class */ (function () {
    function SpatiebotState() {
    }
    return SpatiebotState;
}());
exports.SpatiebotState = SpatiebotState;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var spatie_1 = __webpack_require__(2);
// rotation speeds per 100 ms
var rotationSpeeds = {
    1: 0.39,
    2: 0.24,
    3: 0.42,
    4: 0.33,
    5: 0.33 // prowler
};
var SpatiebotCommandExecutor = /** @class */ (function () {
    function SpatiebotCommandExecutor(state, config) {
        this.state = state;
        this.config = config;
        var aircraftType = Players.getMe().type;
        this.mySpeed = rotationSpeeds[aircraftType] || 0.33;
    }
    SpatiebotCommandExecutor.prototype.clearCommands = function () {
        Network.sendKey("LEFT", false);
        Network.sendKey("RIGHT", false);
        Network.sendKey("UP", false);
        Network.sendKey("DOWN", false);
        Network.sendKey("FIRE", false);
        Network.sendKey("SPECIAL", false);
    };
    SpatiebotCommandExecutor.prototype.isThrottleTimeElapsedFor = function (what) {
        return !this.state.nextMovementExec[what] || Date.now() > this.state.nextMovementExec[what];
    };
    SpatiebotCommandExecutor.prototype.setThrottleTimeFor = function (what) {
        this.state.nextMovementExec[what] = Date.now() + this.config.throttleInterval;
    };
    SpatiebotCommandExecutor.prototype.isAnyThrottleTimeElapsed = function () {
        if (!this.state.nextMovementExec) {
            return true;
        }
        for (var _i = 0, _a = this.state.nextMovementExec; _i < _a.length; _i++) {
            var p = _a[_i];
            if (this.isThrottleTimeElapsedFor(p)) {
                return true;
            }
        }
        return false;
    };
    SpatiebotCommandExecutor.prototype.executeCommands = function (isPlayerCarryingFlag) {
        var _this = this;
        if (!this.state.nextMovementExec) {
            this.state.nextMovementExec = {};
        }
        var desiredAngleChanged = this.state.lastDesiredAngle !== this.state.desiredAngle;
        var movementChanged = this.state.previousSpeedMovement !== this.state.speedMovement;
        var fireChanged = this.state.previousIsFiring !== this.state.isFiring;
        var whompChanged;
        if (this.config.useSpecial === "WHOMP") {
            whompChanged = this.state.previousWhomp !== this.state.whomp;
        }
        var fastChanged;
        if (this.config.useSpecial === "SPEED") {
            fastChanged = this.state.previousFast !== this.state.fast;
        }
        if (desiredAngleChanged || movementChanged || fastChanged || fireChanged || whompChanged || this.isAnyThrottleTimeElapsed()) {
            if (movementChanged) {
                if (this.state.previousSpeedMovement) {
                    Network.sendKey(this.state.previousSpeedMovement, false);
                }
                this.state.previousSpeedMovement = this.state.speedMovement;
            }
            if (desiredAngleChanged) {
                this.state.lastDesiredAngle = this.state.desiredAngle;
            }
            if (fastChanged) {
                this.state.previousFast = this.state.fast;
            }
            if (fireChanged) {
                this.state.previousIsFiring = this.state.isFiring;
            }
            if (!isNaN(this.state.desiredAngle) && (desiredAngleChanged || this.isThrottleTimeElapsedFor("angle"))) {
                this.turnToDesiredAngle();
                this.setThrottleTimeFor("angle");
            }
            if (this.state.speedMovement && (movementChanged || this.isThrottleTimeElapsedFor("movement"))) {
                Network.sendKey(this.state.speedMovement, true);
                this.setThrottleTimeFor("movement");
            }
            if (this.config.useSpecial === "SPEED" && !isPlayerCarryingFlag) {
                if (fastChanged || this.isThrottleTimeElapsedFor("fast")) {
                    if (this.state.fast) {
                        if (!this.state.fastTimeout) {
                            Network.sendKey("SPECIAL", true);
                            this.state.fastTimeout = setTimeout(function () {
                                Network.sendKey("SPECIAL", false);
                                _this.state.fastTimeout = null;
                            }, 1000);
                        }
                    }
                    else {
                        Network.sendKey("SPECIAL", false);
                    }
                    this.setThrottleTimeFor("fast");
                }
            }
            if (fireChanged || this.isThrottleTimeElapsedFor("fire")) {
                var fireKey_1 = "FIRE";
                if (this.config.useSpecial === "FIRE") {
                    fireKey_1 = "SPECIAL";
                }
                if (this.state.isFiring) {
                    Network.sendKey(fireKey_1, true);
                    // don't turn the firebutton off if fireConstantly is on
                    if (!this.config.fireConstantly) {
                        if (!this.state.fireTimeout) {
                            var stopFiringTimeout = this.state.stopFiringTimeout || 1200;
                            this.state.fireTimeout = setTimeout(function () {
                                _this.state.fireTimeout = null;
                                Network.sendKey(fireKey_1, false);
                                _this.state.isFiring = false;
                            }, stopFiringTimeout);
                        }
                    }
                }
                else {
                    Network.sendKey(fireKey_1, false);
                }
                this.setThrottleTimeFor("fire");
            }
            // don't repeat following special commands on throttle elapsed, because they work one time only
            var doSpecial = false;
            if (this.config.useStealth && this.config.useSpecial === "STEALTH" && !Players.getMe().stealthed) {
                doSpecial = true;
            }
            if (whompChanged) {
                doSpecial = true;
                this.state.whomp = false;
                this.state.previousWhomp = false;
            }
            if (doSpecial) {
                spatie_1.Spatie.log("Sending special");
                Network.sendKey("SPECIAL", true);
                setTimeout(function () { return Network.sendKey("SPECIAL", false); }, 100);
            }
        }
    };
    SpatiebotCommandExecutor.prototype.getRotDelta = function (myRot, desRot) {
        var rotDiff = Math.abs(myRot - desRot);
        var pi = Math.atan2(0, -1);
        var direction;
        if (myRot > desRot) {
            if (rotDiff > pi) {
                direction = "RIGHT";
                rotDiff = rotDiff - pi;
            }
            else {
                direction = "LEFT";
            }
        }
        else if (myRot < desRot) {
            if (rotDiff > pi) {
                direction = "LEFT";
                rotDiff = rotDiff - pi;
            }
            else {
                direction = "RIGHT";
            }
        }
        return { direction: direction, rotDiff: rotDiff };
    };
    SpatiebotCommandExecutor.prototype.turnToDesiredAngle = function () {
        var _this = this;
        if (this.state.angleTimeout) {
            // still turning
            return;
        }
        var desRot = this.state.desiredAngle;
        var rotDelta = this.getRotDelta(Players.getMe().rot, desRot);
        if (rotDelta.rotDiff > this.config.precision) {
            var msNeededToTurn = (rotDelta.rotDiff / this.mySpeed) * 100;
            Network.sendKey(rotDelta.direction === "LEFT" ? "RIGHT" : "LEFT", false);
            Network.sendKey(rotDelta.direction, true);
            var myTimeout = setTimeout(function () {
                Network.sendKey(rotDelta.direction, false);
                _this.state.desiredAngle = undefined; // as opposed to null, because NaN(null) === false
                // wait ping before next update, to know our real angle
                _this.state.angleTimeout = setTimeout(function () { return _this.state.angleTimeout = null; }, game.ping);
            }, msNeededToTurn);
            this.state.angleTimeout = myTimeout;
        }
    };
    return SpatiebotCommandExecutor;
}());
exports.SpatiebotCommandExecutor = SpatiebotCommandExecutor;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var spatie_1 = __webpack_require__(2);
var SpatiebotVictimSelection = /** @class */ (function () {
    function SpatiebotVictimSelection(state, config, playerStats) {
        this.state = state;
        this.config = config;
        this.playerStats = playerStats;
    }
    SpatiebotVictimSelection.prototype.selectVictim = function () {
        if (this.config.offensive) {
            this.selectVictimOffensively();
        }
        else if (this.config.protectHomeBase) {
            this.selectVictimDefensively();
        }
        else {
            // passive bot apparently...
        }
    };
    SpatiebotVictimSelection.prototype.selectVictimDefensively = function () {
        var _this = this;
        this.state.victim = null; // always drop the victim by default.
        var now = Date.now();
        var agressivePlayerIDs = this.playerStats
            .filter(function (x) { return x.isAgressive; })
            .map(function (x) { return x.id; });
        var agressivePlayers = spatie_1.Spatie.getHostilePlayersSortedByDistance(null, agressivePlayerIDs)
            .filter(function (x) { return _this.isVictimValid(x); });
        if (agressivePlayers.length === 0) {
            return;
        }
        this.state.victim = agressivePlayers[0];
    };
    SpatiebotVictimSelection.prototype.selectVictimOffensively = function () {
        var currentVictim = this.state.victim;
        var victim = this.getBestVictim();
        // choose a new victim if no victim selected
        victim = victim || this.chooseNextVictim();
        var changedTarget = !this.isSamePlayer(currentVictim, victim);
        if (changedTarget) {
            if (currentVictim) {
                spatie_1.Spatie.log("Dropped victim " + currentVictim.name);
            }
            if (victim) {
                spatie_1.Spatie.log("Chose new victim " + victim.name);
                this.state.lastTimeVictimWasChosen = Date.now();
                this.state.pathToVictim = null;
            }
            if (!victim || this.state.hasLockOnTarget !== victim.id) {
                this.state.hasLockOnTarget = null;
            }
        }
        // keep the last victim, or if no victim was chosen,
        // remove the id, to be able to reselect the previous
        // victim again if there's only 1 other player
        this.state.previousVictimID = victim ? victim.id : null;
        // also remove the bonding if no victim was chosen: apparently only spatiebots are in the game
        if (!victim) {
            this.config.bondingTimes = 0;
        }
        // always refresh victim object
        this.state.victim = victim ? Players.get(victim.id) : null;
    };
    SpatiebotVictimSelection.prototype.isSamePlayer = function (a, b) {
        if (a && !b || !a && b) {
            return false;
        }
        if (!a && !b) {
            return true;
        }
        return a.id === b.id;
    };
    SpatiebotVictimSelection.prototype.getBestVictim = function () {
        // always choose flag carrier as victim if there is one
        var flagCarrier = this.targetFlagCarrier();
        if (flagCarrier && this.isVictimValid(flagCarrier)) {
            return flagCarrier;
        }
        // use the suggested target
        var suggested = this.takeOverSuggestion();
        if (suggested && this.isVictimValid(suggested)) {
            spatie_1.Spatie.log("Take over suggested");
            return suggested;
        }
        // get the currently selected victim
        var victim = this.state.victim;
        if (!victim) {
            return;
        }
        if (!this.isVictimValid(victim)) {
            // drop victim, take another ones
            spatie_1.Spatie.log("Victim not active, or prowler, or spactating, or expired, or immune");
            return null;
        }
        // if this victim is the locked target, don't reconsider here
        if (this.state.hasLockOnTarget === victim.id) {
            return victim;
        }
        // otherwise, find a target that is closer by
        var closerBy = this.findVictimCloserByThan(victim);
        if (closerBy) {
            return closerBy;
        }
        return victim;
    };
    SpatiebotVictimSelection.prototype.getClosestValidPlayer = function () {
        var players = spatie_1.Spatie.getHostilePlayersSortedByDistance();
        var index = 0;
        while (true) {
            var closestHostilePlayer = players[index];
            if (!closestHostilePlayer) {
                return null;
            }
            if (this.isVictimValid(closestHostilePlayer)) {
                return closestHostilePlayer;
            }
            index++;
        }
    };
    SpatiebotVictimSelection.prototype.findVictimCloserByThan = function (currentVictim) {
        // if there are other players closer by, consider chasing them
        var closestHostilePlayer = this.getClosestValidPlayer();
        if (closestHostilePlayer.id !== currentVictim.id) {
            var victimDistance = spatie_1.Spatie.getDeltaTo(currentVictim);
            var closestPlayerDistance = spatie_1.Spatie.getDeltaTo(closestHostilePlayer);
            var shouldSwitch = void 0;
            if (!closestPlayerDistance.isAccurate || victimDistance.distance < this.config.distanceClose) {
                shouldSwitch = false;
            }
            else if (closestPlayerDistance.isAccurate && !victimDistance.isAccurate) {
                spatie_1.Spatie.log("switch: " + closestHostilePlayer.name + " is more accurate");
                shouldSwitch = true;
            }
            else if (closestPlayerDistance.distance / victimDistance.distance < 0.2) {
                spatie_1.Spatie.log("switch: " + closestHostilePlayer.name + " is way closer");
                shouldSwitch = true;
            }
            if (shouldSwitch) {
                return closestHostilePlayer;
            }
        }
        return null;
    };
    SpatiebotVictimSelection.prototype.isVictimValid = function (victim) {
        var elapsedMsSinceLastChosenVictim = Date.now() - this.state.lastTimeVictimWasChosen;
        var isActive = !!Players.get(victim.id);
        var isSpectating = victim.removedFromMap;
        var isProwler = victim.type === 5;
        var isVictimImmune = !!/^test.*/.exec(victim.name) ||
            (this.config.bondingTimes > 0 && !!/^.+Bot.*/.exec(victim.name));
        var isExpired;
        if (this.state.lastTimeVictimWasChosen) {
            isExpired = elapsedMsSinceLastChosenVictim > this.config.victimExpireMs;
        }
        if (!isActive || isProwler || isSpectating || isExpired || isVictimImmune) {
            return false;
        }
        return true;
    };
    SpatiebotVictimSelection.prototype.chooseNextVictim = function () {
        var players = spatie_1.Spatie.getHostilePlayersSortedByDistance(this.state.previousVictimID);
        // take the nearest player
        var victim = players[0];
        return victim;
    };
    SpatiebotVictimSelection.prototype.targetFlagCarrier = function () {
        if (this.state.flagCarrierID) {
            return Players.get(this.state.flagCarrierID);
        }
        return null;
    };
    SpatiebotVictimSelection.prototype.takeOverSuggestion = function () {
        if (!this.state.suggestedVictimID) {
            return null;
        }
        var suggestedVictim = Players.get(this.state.suggestedVictimID);
        if (!suggestedVictim) {
            return null;
        }
        var randomNumber = spatie_1.Spatie.getRandomNumber(0, 4);
        var newVictim;
        if (randomNumber === 0 && this.state.suggestingPlayerID !== game.myID) {
            // turn agains suggestor
            var suggestingPlayer = Players.get(this.state.suggestingPlayerID);
            newVictim = suggestingPlayer;
        }
        else {
            // take over suggestion
            newVictim = suggestedVictim;
        }
        if (newVictim) {
            spatie_1.Spatie.announce("ok, lock on target: " + newVictim.name);
        }
        this.state.suggestedVictimID = null;
        this.state.suggestingPlayerID = null;
        this.state.hasLockOnTarget = newVictim.id;
        return newVictim;
    };
    return SpatiebotVictimSelection;
}());
exports.SpatiebotVictimSelection = SpatiebotVictimSelection;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var PlayerStat = /** @class */ (function () {
    function PlayerStat(id) {
        this.hitMe = 0;
        this.lastHit = 0;
        this.id = id;
    }
    PlayerStat.prototype.addHit = function () {
        this.lastHit = Date.now();
        this.hitMe += 1;
    };
    Object.defineProperty(PlayerStat.prototype, "isAgressive", {
        get: function () {
            var lastHitDelta = Date.now() - this.lastHit;
            // if the last hit was more than 2 minutes ago, it was probably an accident
            if (lastHitDelta > 2 * 60 * 1000) {
                return false;
            }
            return this.hitMe > 2;
        },
        enumerable: true,
        configurable: true
    });
    return PlayerStat;
}());
exports.PlayerStat = PlayerStat;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var spatie_1 = __webpack_require__(2);
var BotNavigationHub = /** @class */ (function () {
    function BotNavigationHub() {
        var _this = this;
        this.lastRequestID = 0;
        this.worker = new Worker("data:text/javascript;base64,LyoqKioqKi8gKGZ1bmN0aW9uKG1vZHVsZXMpIHsgLy8gd2VicGFja0Jvb3RzdHJhcAovKioqKioqLyAJLy8gVGhlIG1vZHVsZSBjYWNoZQovKioqKioqLyAJdmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTsKLyoqKioqKi8KLyoqKioqKi8gCS8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uCi8qKioqKiovIAlmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7Ci8qKioqKiovCi8qKioqKiovIAkJLy8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlCi8qKioqKiovIAkJaWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHsKLyoqKioqKi8gCQkJcmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7Ci8qKioqKiovIAkJfQovKioqKioqLyAJCS8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpCi8qKioqKiovIAkJdmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0gewovKioqKioqLyAJCQlpOiBtb2R1bGVJZCwKLyoqKioqKi8gCQkJbDogZmFsc2UsCi8qKioqKiovIAkJCWV4cG9ydHM6IHt9Ci8qKioqKiovIAkJfTsKLyoqKioqKi8KLyoqKioqKi8gCQkvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb24KLyoqKioqKi8gCQltb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTsKLyoqKioqKi8KLyoqKioqKi8gCQkvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkCi8qKioqKiovIAkJbW9kdWxlLmwgPSB0cnVlOwovKioqKioqLwovKioqKioqLyAJCS8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlCi8qKioqKiovIAkJcmV0dXJuIG1vZHVsZS5leHBvcnRzOwovKioqKioqLyAJfQovKioqKioqLwovKioqKioqLwovKioqKioqLyAJLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXykKLyoqKioqKi8gCV9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7Ci8qKioqKiovCi8qKioqKiovIAkvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZQovKioqKioqLyAJX193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlczsKLyoqKioqKi8KLyoqKioqKi8gCS8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0cwovKioqKioqLyAJX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7Ci8qKioqKiovIAkJaWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkgewovKioqKioqLyAJCQlPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTsKLyoqKioqKi8gCQl9Ci8qKioqKiovIAl9OwovKioqKioqLwovKioqKioqLyAJLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0cwovKioqKioqLyAJX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykgewovKioqKioqLyAJCWlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykgewovKioqKioqLyAJCQlPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTsKLyoqKioqKi8gCQl9Ci8qKioqKiovIAkJT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTsKLyoqKioqKi8gCX07Ci8qKioqKiovCi8qKioqKiovIAkvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3QKLyoqKioqKi8gCS8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdAovKioqKioqLyAJLy8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zCi8qKioqKiovIAkvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3QKLyoqKioqKi8gCS8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmUKLyoqKioqKi8gCV9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7Ci8qKioqKiovIAkJaWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7Ci8qKioqKiovIAkJaWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTsKLyoqKioqKi8gCQlpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlOwovKioqKioqLyAJCXZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7Ci8qKioqKiovIAkJX193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTsKLyoqKioqKi8gCQlPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7Ci8qKioqKiovIAkJaWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpOwovKioqKioqLyAJCXJldHVybiBuczsKLyoqKioqKi8gCX07Ci8qKioqKiovCi8qKioqKiovIAkvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlcwovKioqKioqLyAJX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7Ci8qKioqKiovIAkJdmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/Ci8qKioqKiovIAkJCWZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6Ci8qKioqKiovIAkJCWZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07Ci8qKioqKiovIAkJX193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpOwovKioqKioqLyAJCXJldHVybiBnZXR0ZXI7Ci8qKioqKiovIAl9OwovKioqKioqLwovKioqKioqLyAJLy8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsCi8qKioqKiovIAlfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07Ci8qKioqKiovCi8qKioqKiovIAkvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfXwovKioqKioqLyAJX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gIiI7Ci8qKioqKiovCi8qKioqKiovCi8qKioqKiovIAkvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHMKLyoqKioqKi8gCXJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDE5KTsKLyoqKioqKi8gfSkKLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi8KLyoqKioqKi8gKFsKLyogMCAqLwovKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7Cgp2YXIgRGlhZ29uYWxNb3ZlbWVudCA9IHsKICAgIEFsd2F5czogMSwKICAgIE5ldmVyOiAyLAogICAgSWZBdE1vc3RPbmVPYnN0YWNsZTogMywKICAgIE9ubHlXaGVuTm9PYnN0YWNsZXM6IDQKfTsKbW9kdWxlLmV4cG9ydHMgPSBEaWFnb25hbE1vdmVtZW50OwoKCi8qKiovIH0pLAovKiAxICovCi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHsKCi8qKgogKiBCYWNrdHJhY2UgYWNjb3JkaW5nIHRvIHRoZSBwYXJlbnQgcmVjb3JkcyBhbmQgcmV0dXJuIHRoZSBwYXRoLgogKiAoaW5jbHVkaW5nIGJvdGggc3RhcnQgYW5kIGVuZCBub2RlcykKICogQHBhcmFtIHtOb2RlfSBub2RlIEVuZCBub2RlCiAqIEByZXR1cm4ge0FycmF5PEFycmF5PG51bWJlcj4+fSB0aGUgcGF0aAogKi8KZnVuY3Rpb24gYmFja3RyYWNlKG5vZGUpIHsKICAgIHZhciBwYXRoID0gW1tub2RlLngsIG5vZGUueV1dOwogICAgd2hpbGUgKG5vZGUucGFyZW50KSB7CiAgICAgICAgbm9kZSA9IG5vZGUucGFyZW50OwogICAgICAgIHBhdGgucHVzaChbbm9kZS54LCBub2RlLnldKTsKICAgIH0KICAgIHJldHVybiBwYXRoLnJldmVyc2UoKTsKfQpleHBvcnRzLmJhY2t0cmFjZSA9IGJhY2t0cmFjZTsKLyoqCiAqIEJhY2t0cmFjZSBmcm9tIHN0YXJ0IGFuZCBlbmQgbm9kZSwgYW5kIHJldHVybiB0aGUgcGF0aC4KICogKGluY2x1ZGluZyBib3RoIHN0YXJ0IGFuZCBlbmQgbm9kZXMpCiAqIEBwYXJhbSB7Tm9kZX0KICogQHBhcmFtIHtOb2RlfQogKi8KZnVuY3Rpb24gYmlCYWNrdHJhY2Uobm9kZUEsIG5vZGVCKSB7CiAgICB2YXIgcGF0aEEgPSBiYWNrdHJhY2Uobm9kZUEpLCBwYXRoQiA9IGJhY2t0cmFjZShub2RlQik7CiAgICByZXR1cm4gcGF0aEEuY29uY2F0KHBhdGhCLnJldmVyc2UoKSk7Cn0KZXhwb3J0cy5iaUJhY2t0cmFjZSA9IGJpQmFja3RyYWNlOwovKioKICogQ29tcHV0ZSB0aGUgbGVuZ3RoIG9mIHRoZSBwYXRoLgogKiBAcGFyYW0ge0FycmF5PEFycmF5PG51bWJlcj4+fSBwYXRoIFRoZSBwYXRoCiAqIEByZXR1cm4ge251bWJlcn0gVGhlIGxlbmd0aCBvZiB0aGUgcGF0aAogKi8KZnVuY3Rpb24gcGF0aExlbmd0aChwYXRoKSB7CiAgICB2YXIgaSwgc3VtID0gMCwgYSwgYiwgZHgsIGR5OwogICAgZm9yIChpID0gMTsgaSA8IHBhdGgubGVuZ3RoOyArK2kpIHsKICAgICAgICBhID0gcGF0aFtpIC0gMV07CiAgICAgICAgYiA9IHBhdGhbaV07CiAgICAgICAgZHggPSBhWzBdIC0gYlswXTsKICAgICAgICBkeSA9IGFbMV0gLSBiWzFdOwogICAgICAgIHN1bSArPSBNYXRoLnNxcnQoZHggKiBkeCArIGR5ICogZHkpOwogICAgfQogICAgcmV0dXJuIHN1bTsKfQpleHBvcnRzLnBhdGhMZW5ndGggPSBwYXRoTGVuZ3RoOwovKioKICogR2l2ZW4gdGhlIHN0YXJ0IGFuZCBlbmQgY29vcmRpbmF0ZXMsIHJldHVybiBhbGwgdGhlIGNvb3JkaW5hdGVzIGx5aW5nCiAqIG9uIHRoZSBsaW5lIGZvcm1lZCBieSB0aGVzZSBjb29yZGluYXRlcywgYmFzZWQgb24gQnJlc2VuaGFtJ3MgYWxnb3JpdGhtLgogKiBodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0JyZXNlbmhhbSdzX2xpbmVfYWxnb3JpdGhtI1NpbXBsaWZpY2F0aW9uCiAqIEBwYXJhbSB7bnVtYmVyfSB4MCBTdGFydCB4IGNvb3JkaW5hdGUKICogQHBhcmFtIHtudW1iZXJ9IHkwIFN0YXJ0IHkgY29vcmRpbmF0ZQogKiBAcGFyYW0ge251bWJlcn0geDEgRW5kIHggY29vcmRpbmF0ZQogKiBAcGFyYW0ge251bWJlcn0geTEgRW5kIHkgY29vcmRpbmF0ZQogKiBAcmV0dXJuIHtBcnJheTxBcnJheTxudW1iZXI+Pn0gVGhlIGNvb3JkaW5hdGVzIG9uIHRoZSBsaW5lCiAqLwpmdW5jdGlvbiBpbnRlcnBvbGF0ZSh4MCwgeTAsIHgxLCB5MSkgewogICAgdmFyIGFicyA9IE1hdGguYWJzLCBsaW5lID0gW10sIHN4LCBzeSwgZHgsIGR5LCBlcnIsIGUyOwogICAgZHggPSBhYnMoeDEgLSB4MCk7CiAgICBkeSA9IGFicyh5MSAtIHkwKTsKICAgIHN4ID0gKHgwIDwgeDEpID8gMSA6IC0xOwogICAgc3kgPSAoeTAgPCB5MSkgPyAxIDogLTE7CiAgICBlcnIgPSBkeCAtIGR5OwogICAgd2hpbGUgKHRydWUpIHsKICAgICAgICBsaW5lLnB1c2goW3gwLCB5MF0pOwogICAgICAgIGlmICh4MCA9PT0geDEgJiYgeTAgPT09IHkxKSB7CiAgICAgICAgICAgIGJyZWFrOwogICAgICAgIH0KICAgICAgICBlMiA9IDIgKiBlcnI7CiAgICAgICAgaWYgKGUyID4gLWR5KSB7CiAgICAgICAgICAgIGVyciA9IGVyciAtIGR5OwogICAgICAgICAgICB4MCA9IHgwICsgc3g7CiAgICAgICAgfQogICAgICAgIGlmIChlMiA8IGR4KSB7CiAgICAgICAgICAgIGVyciA9IGVyciArIGR4OwogICAgICAgICAgICB5MCA9IHkwICsgc3k7CiAgICAgICAgfQogICAgfQogICAgcmV0dXJuIGxpbmU7Cn0KZXhwb3J0cy5pbnRlcnBvbGF0ZSA9IGludGVycG9sYXRlOwovKioKICogR2l2ZW4gYSBjb21wcmVzc2VkIHBhdGgsIHJldHVybiBhIG5ldyBwYXRoIHRoYXQgaGFzIGFsbCB0aGUgc2VnbWVudHMKICogaW4gaXQgaW50ZXJwb2xhdGVkLgogKiBAcGFyYW0ge0FycmF5PEFycmF5PG51bWJlcj4+fSBwYXRoIFRoZSBwYXRoCiAqIEByZXR1cm4ge0FycmF5PEFycmF5PG51bWJlcj4+fSBleHBhbmRlZCBwYXRoCiAqLwpmdW5jdGlvbiBleHBhbmRQYXRoKHBhdGgpIHsKICAgIHZhciBleHBhbmRlZCA9IFtdLCBsZW4gPSBwYXRoLmxlbmd0aCwgY29vcmQwLCBjb29yZDEsIGludGVycG9sYXRlZCwgaW50ZXJwb2xhdGVkTGVuLCBpLCBqOwogICAgaWYgKGxlbiA8IDIpIHsKICAgICAgICByZXR1cm4gZXhwYW5kZWQ7CiAgICB9CiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuIC0gMTsgKytpKSB7CiAgICAgICAgY29vcmQwID0gcGF0aFtpXTsKICAgICAgICBjb29yZDEgPSBwYXRoW2kgKyAxXTsKICAgICAgICBpbnRlcnBvbGF0ZWQgPSBpbnRlcnBvbGF0ZShjb29yZDBbMF0sIGNvb3JkMFsxXSwgY29vcmQxWzBdLCBjb29yZDFbMV0pOwogICAgICAgIGludGVycG9sYXRlZExlbiA9IGludGVycG9sYXRlZC5sZW5ndGg7CiAgICAgICAgZm9yIChqID0gMDsgaiA8IGludGVycG9sYXRlZExlbiAtIDE7ICsraikgewogICAgICAgICAgICBleHBhbmRlZC5wdXNoKGludGVycG9sYXRlZFtqXSk7CiAgICAgICAgfQogICAgfQogICAgZXhwYW5kZWQucHVzaChwYXRoW2xlbiAtIDFdKTsKICAgIHJldHVybiBleHBhbmRlZDsKfQpleHBvcnRzLmV4cGFuZFBhdGggPSBleHBhbmRQYXRoOwovKioKICogU21vb3RoZW4gdGhlIGdpdmUgcGF0aC4KICogVGhlIG9yaWdpbmFsIHBhdGggd2lsbCBub3QgYmUgbW9kaWZpZWQ7IGEgbmV3IHBhdGggd2lsbCBiZSByZXR1cm5lZC4KICogQHBhcmFtIHtQRi5HcmlkfSBncmlkCiAqIEBwYXJhbSB7QXJyYXk8QXJyYXk8bnVtYmVyPj59IHBhdGggVGhlIHBhdGgKICovCmZ1bmN0aW9uIHNtb290aGVuUGF0aChncmlkLCBwYXRoKSB7CiAgICB2YXIgbGVuID0gcGF0aC5sZW5ndGgsIHgwID0gcGF0aFswXVswXSwgLy8gcGF0aCBzdGFydCB4CiAgICB5MCA9IHBhdGhbMF1bMV0sIC8vIHBhdGggc3RhcnQgeQogICAgeDEgPSBwYXRoW2xlbiAtIDFdWzBdLCAvLyBwYXRoIGVuZCB4CiAgICB5MSA9IHBhdGhbbGVuIC0gMV1bMV0sIC8vIHBhdGggZW5kIHkKICAgIHN4LCBzeSwgLy8gY3VycmVudCBzdGFydCBjb29yZGluYXRlCiAgICBleCwgZXksIC8vIGN1cnJlbnQgZW5kIGNvb3JkaW5hdGUKICAgIG5ld1BhdGgsIGksIGosIGNvb3JkLCBsaW5lLCB0ZXN0Q29vcmQsIGJsb2NrZWQ7CiAgICBzeCA9IHgwOwogICAgc3kgPSB5MDsKICAgIG5ld1BhdGggPSBbW3N4LCBzeV1dOwogICAgZm9yIChpID0gMjsgaSA8IGxlbjsgKytpKSB7CiAgICAgICAgY29vcmQgPSBwYXRoW2ldOwogICAgICAgIGV4ID0gY29vcmRbMF07CiAgICAgICAgZXkgPSBjb29yZFsxXTsKICAgICAgICBsaW5lID0gaW50ZXJwb2xhdGUoc3gsIHN5LCBleCwgZXkpOwogICAgICAgIGJsb2NrZWQgPSBmYWxzZTsKICAgICAgICBmb3IgKGogPSAxOyBqIDwgbGluZS5sZW5ndGg7ICsraikgewogICAgICAgICAgICB0ZXN0Q29vcmQgPSBsaW5lW2pdOwogICAgICAgICAgICBpZiAoIWdyaWQuaXNXYWxrYWJsZUF0KHRlc3RDb29yZFswXSwgdGVzdENvb3JkWzFdKSkgewogICAgICAgICAgICAgICAgYmxvY2tlZCA9IHRydWU7CiAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgfQogICAgICAgIH0KICAgICAgICBpZiAoYmxvY2tlZCkgewogICAgICAgICAgICBsYXN0VmFsaWRDb29yZCA9IHBhdGhbaSAtIDFdOwogICAgICAgICAgICBuZXdQYXRoLnB1c2gobGFzdFZhbGlkQ29vcmQpOwogICAgICAgICAgICBzeCA9IGxhc3RWYWxpZENvb3JkWzBdOwogICAgICAgICAgICBzeSA9IGxhc3RWYWxpZENvb3JkWzFdOwogICAgICAgIH0KICAgIH0KICAgIG5ld1BhdGgucHVzaChbeDEsIHkxXSk7CiAgICByZXR1cm4gbmV3UGF0aDsKfQpleHBvcnRzLnNtb290aGVuUGF0aCA9IHNtb290aGVuUGF0aDsKLyoqCiAqIENvbXByZXNzIGEgcGF0aCwgcmVtb3ZlIHJlZHVuZGFudCBub2RlcyB3aXRob3V0IGFsdGVyaW5nIHRoZSBzaGFwZQogKiBUaGUgb3JpZ2luYWwgcGF0aCBpcyBub3QgbW9kaWZpZWQKICogQHBhcmFtIHtBcnJheTxBcnJheTxudW1iZXI+Pn0gcGF0aCBUaGUgcGF0aAogKiBAcmV0dXJuIHtBcnJheTxBcnJheTxudW1iZXI+Pn0gVGhlIGNvbXByZXNzZWQgcGF0aAogKi8KZnVuY3Rpb24gY29tcHJlc3NQYXRoKHBhdGgpIHsKICAgIC8vIG5vdGhpbmcgdG8gY29tcHJlc3MKICAgIGlmIChwYXRoLmxlbmd0aCA8IDMpIHsKICAgICAgICByZXR1cm4gcGF0aDsKICAgIH0KICAgIHZhciBjb21wcmVzc2VkID0gW10sIHN4ID0gcGF0aFswXVswXSwgLy8gc3RhcnQgeAogICAgc3kgPSBwYXRoWzBdWzFdLCAvLyBzdGFydCB5CiAgICBweCA9IHBhdGhbMV1bMF0sIC8vIHNlY29uZCBwb2ludCB4CiAgICBweSA9IHBhdGhbMV1bMV0sIC8vIHNlY29uZCBwb2ludCB5CiAgICBkeCA9IHB4IC0gc3gsIC8vIGRpcmVjdGlvbiBiZXR3ZWVuIHRoZSB0d28gcG9pbnRzCiAgICBkeSA9IHB5IC0gc3ksIC8vIGRpcmVjdGlvbiBiZXR3ZWVuIHRoZSB0d28gcG9pbnRzCiAgICBseCwgbHksIGxkeCwgbGR5LCBzcSwgaTsKICAgIC8vIG5vcm1hbGl6ZSB0aGUgZGlyZWN0aW9uCiAgICBzcSA9IE1hdGguc3FydChkeCAqIGR4ICsgZHkgKiBkeSk7CiAgICBkeCAvPSBzcTsKICAgIGR5IC89IHNxOwogICAgLy8gc3RhcnQgdGhlIG5ldyBwYXRoCiAgICBjb21wcmVzc2VkLnB1c2goW3N4LCBzeV0pOwogICAgZm9yIChpID0gMjsgaSA8IHBhdGgubGVuZ3RoOyBpKyspIHsKICAgICAgICAvLyBzdG9yZSB0aGUgbGFzdCBwb2ludAogICAgICAgIGx4ID0gcHg7CiAgICAgICAgbHkgPSBweTsKICAgICAgICAvLyBzdG9yZSB0aGUgbGFzdCBkaXJlY3Rpb24KICAgICAgICBsZHggPSBkeDsKICAgICAgICBsZHkgPSBkeTsKICAgICAgICAvLyBuZXh0IHBvaW50CiAgICAgICAgcHggPSBwYXRoW2ldWzBdOwogICAgICAgIHB5ID0gcGF0aFtpXVsxXTsKICAgICAgICAvLyBuZXh0IGRpcmVjdGlvbgogICAgICAgIGR4ID0gcHggLSBseDsKICAgICAgICBkeSA9IHB5IC0gbHk7CiAgICAgICAgLy8gbm9ybWFsaXplCiAgICAgICAgc3EgPSBNYXRoLnNxcnQoZHggKiBkeCArIGR5ICogZHkpOwogICAgICAgIGR4IC89IHNxOwogICAgICAgIGR5IC89IHNxOwogICAgICAgIC8vIGlmIHRoZSBkaXJlY3Rpb24gaGFzIGNoYW5nZWQsIHN0b3JlIHRoZSBwb2ludAogICAgICAgIGlmIChkeCAhPT0gbGR4IHx8IGR5ICE9PSBsZHkpIHsKICAgICAgICAgICAgY29tcHJlc3NlZC5wdXNoKFtseCwgbHldKTsKICAgICAgICB9CiAgICB9CiAgICAvLyBzdG9yZSB0aGUgbGFzdCBwb2ludAogICAgY29tcHJlc3NlZC5wdXNoKFtweCwgcHldKTsKICAgIHJldHVybiBjb21wcmVzc2VkOwp9CmV4cG9ydHMuY29tcHJlc3NQYXRoID0gY29tcHJlc3NQYXRoOwoKCi8qKiovIH0pLAovKiAyICovLAovKiAzICovCi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHsKCi8qKgogKiBAbmFtZXNwYWNlIFBGLkhldXJpc3RpYwogKiBAZGVzY3JpcHRpb24gQSBjb2xsZWN0aW9uIG9mIGhldXJpc3RpYyBmdW5jdGlvbnMuCiAqLwptb2R1bGUuZXhwb3J0cyA9IHsKICAgIC8qKgogICAgICogTWFuaGF0dGFuIGRpc3RhbmNlLgogICAgICogQHBhcmFtIHtudW1iZXJ9IGR4IC0gRGlmZmVyZW5jZSBpbiB4LgogICAgICogQHBhcmFtIHtudW1iZXJ9IGR5IC0gRGlmZmVyZW5jZSBpbiB5LgogICAgICogQHJldHVybiB7bnVtYmVyfSBkeCArIGR5CiAgICAgKi8KICAgIG1hbmhhdHRhbjogZnVuY3Rpb24gKGR4LCBkeSkgewogICAgICAgIHJldHVybiBkeCArIGR5OwogICAgfSwKICAgIC8qKgogICAgICogRXVjbGlkZWFuIGRpc3RhbmNlLgogICAgICogQHBhcmFtIHtudW1iZXJ9IGR4IC0gRGlmZmVyZW5jZSBpbiB4LgogICAgICogQHBhcmFtIHtudW1iZXJ9IGR5IC0gRGlmZmVyZW5jZSBpbiB5LgogICAgICogQHJldHVybiB7bnVtYmVyfSBzcXJ0KGR4ICogZHggKyBkeSAqIGR5KQogICAgICovCiAgICBldWNsaWRlYW46IGZ1bmN0aW9uIChkeCwgZHkpIHsKICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KGR4ICogZHggKyBkeSAqIGR5KTsKICAgIH0sCiAgICAvKioKICAgICAqIE9jdGlsZSBkaXN0YW5jZS4KICAgICAqIEBwYXJhbSB7bnVtYmVyfSBkeCAtIERpZmZlcmVuY2UgaW4geC4KICAgICAqIEBwYXJhbSB7bnVtYmVyfSBkeSAtIERpZmZlcmVuY2UgaW4geS4KICAgICAqIEByZXR1cm4ge251bWJlcn0gc3FydChkeCAqIGR4ICsgZHkgKiBkeSkgZm9yIGdyaWRzCiAgICAgKi8KICAgIG9jdGlsZTogZnVuY3Rpb24gKGR4LCBkeSkgewogICAgICAgIHZhciBGID0gTWF0aC5TUVJUMiAtIDE7CiAgICAgICAgcmV0dXJuIChkeCA8IGR5KSA/IEYgKiBkeCArIGR5IDogRiAqIGR5ICsgZHg7CiAgICB9LAogICAgLyoqCiAgICAgKiBDaGVieXNoZXYgZGlzdGFuY2UuCiAgICAgKiBAcGFyYW0ge251bWJlcn0gZHggLSBEaWZmZXJlbmNlIGluIHguCiAgICAgKiBAcGFyYW0ge251bWJlcn0gZHkgLSBEaWZmZXJlbmNlIGluIHkuCiAgICAgKiBAcmV0dXJuIHtudW1iZXJ9IG1heChkeCwgZHkpCiAgICAgKi8KICAgIGNoZWJ5c2hldjogZnVuY3Rpb24gKGR4LCBkeSkgewogICAgICAgIHJldHVybiBNYXRoLm1heChkeCwgZHkpOwogICAgfQp9OwoKCi8qKiovIH0pLAovKiA0ICovCi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHsKCm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3JlcXVpcmVfXygyMyk7CgoKLyoqKi8gfSksCi8qIDUgKi8KLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykgewoKLyoqCiAqIEBhdXRob3IgaW1vciAvIGh0dHBzOi8vZ2l0aHViLmNvbS9pbW9yCiAqLwp2YXIgSGVhcCA9IF9fd2VicGFja19yZXF1aXJlX18oNCk7CnZhciBVdGlsID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKTsKdmFyIEhldXJpc3RpYyA9IF9fd2VicGFja19yZXF1aXJlX18oMyk7CnZhciBEaWFnb25hbE1vdmVtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXygwKTsKLyoqCiAqIEJhc2UgY2xhc3MgZm9yIHRoZSBKdW1wIFBvaW50IFNlYXJjaCBhbGdvcml0aG0KICogQHBhcmFtIHtvYmplY3R9IG9wdAogKiBAcGFyYW0ge2Z1bmN0aW9ufSBvcHQuaGV1cmlzdGljIEhldXJpc3RpYyBmdW5jdGlvbiB0byBlc3RpbWF0ZSB0aGUgZGlzdGFuY2UKICogICAgIChkZWZhdWx0cyB0byBtYW5oYXR0YW4pLgogKi8KZnVuY3Rpb24gSnVtcFBvaW50RmluZGVyQmFzZShvcHQpIHsKICAgIG9wdCA9IG9wdCB8fCB7fTsKICAgIHRoaXMuaGV1cmlzdGljID0gb3B0LmhldXJpc3RpYyB8fCBIZXVyaXN0aWMubWFuaGF0dGFuOwogICAgdGhpcy50cmFja0p1bXBSZWN1cnNpb24gPSBvcHQudHJhY2tKdW1wUmVjdXJzaW9uIHx8IGZhbHNlOwp9Ci8qKgogKiBGaW5kIGFuZCByZXR1cm4gdGhlIHBhdGguCiAqIEByZXR1cm4ge0FycmF5PEFycmF5PG51bWJlcj4+fSBUaGUgcGF0aCwgaW5jbHVkaW5nIGJvdGggc3RhcnQgYW5kCiAqICAgICBlbmQgcG9zaXRpb25zLgogKi8KSnVtcFBvaW50RmluZGVyQmFzZS5wcm90b3R5cGUuZmluZFBhdGggPSBmdW5jdGlvbiAoc3RhcnRYLCBzdGFydFksIGVuZFgsIGVuZFksIGdyaWQpIHsKICAgIHZhciBvcGVuTGlzdCA9IHRoaXMub3Blbkxpc3QgPSBuZXcgSGVhcChmdW5jdGlvbiAobm9kZUEsIG5vZGVCKSB7CiAgICAgICAgcmV0dXJuIG5vZGVBLmYgLSBub2RlQi5mOwogICAgfSksIHN0YXJ0Tm9kZSA9IHRoaXMuc3RhcnROb2RlID0gZ3JpZC5nZXROb2RlQXQoc3RhcnRYLCBzdGFydFkpLCBlbmROb2RlID0gdGhpcy5lbmROb2RlID0gZ3JpZC5nZXROb2RlQXQoZW5kWCwgZW5kWSksIG5vZGU7CiAgICB0aGlzLmdyaWQgPSBncmlkOwogICAgLy8gc2V0IHRoZSBgZ2AgYW5kIGBmYCB2YWx1ZSBvZiB0aGUgc3RhcnQgbm9kZSB0byBiZSAwCiAgICBzdGFydE5vZGUuZyA9IDA7CiAgICBzdGFydE5vZGUuZiA9IDA7CiAgICAvLyBwdXNoIHRoZSBzdGFydCBub2RlIGludG8gdGhlIG9wZW4gbGlzdAogICAgb3Blbkxpc3QucHVzaChzdGFydE5vZGUpOwogICAgc3RhcnROb2RlLm9wZW5lZCA9IHRydWU7CiAgICAvLyB3aGlsZSB0aGUgb3BlbiBsaXN0IGlzIG5vdCBlbXB0eQogICAgd2hpbGUgKCFvcGVuTGlzdC5lbXB0eSgpKSB7CiAgICAgICAgLy8gcG9wIHRoZSBwb3NpdGlvbiBvZiBub2RlIHdoaWNoIGhhcyB0aGUgbWluaW11bSBgZmAgdmFsdWUuCiAgICAgICAgbm9kZSA9IG9wZW5MaXN0LnBvcCgpOwogICAgICAgIG5vZGUuY2xvc2VkID0gdHJ1ZTsKICAgICAgICBpZiAobm9kZSA9PT0gZW5kTm9kZSkgewogICAgICAgICAgICByZXR1cm4gVXRpbC5leHBhbmRQYXRoKFV0aWwuYmFja3RyYWNlKGVuZE5vZGUpKTsKICAgICAgICB9CiAgICAgICAgdGhpcy5faWRlbnRpZnlTdWNjZXNzb3JzKG5vZGUpOwogICAgfQogICAgLy8gZmFpbCB0byBmaW5kIHRoZSBwYXRoCiAgICByZXR1cm4gW107Cn07Ci8qKgogKiBJZGVudGlmeSBzdWNjZXNzb3JzIGZvciB0aGUgZ2l2ZW4gbm9kZS4gUnVucyBhIGp1bXAgcG9pbnQgc2VhcmNoIGluIHRoZQogKiBkaXJlY3Rpb24gb2YgZWFjaCBhdmFpbGFibGUgbmVpZ2hib3IsIGFkZGluZyBhbnkgcG9pbnRzIGZvdW5kIHRvIHRoZSBvcGVuCiAqIGxpc3QuCiAqIEBwcm90ZWN0ZWQKICovCkp1bXBQb2ludEZpbmRlckJhc2UucHJvdG90eXBlLl9pZGVudGlmeVN1Y2Nlc3NvcnMgPSBmdW5jdGlvbiAobm9kZSkgewogICAgdmFyIGdyaWQgPSB0aGlzLmdyaWQsIGhldXJpc3RpYyA9IHRoaXMuaGV1cmlzdGljLCBvcGVuTGlzdCA9IHRoaXMub3Blbkxpc3QsIGVuZFggPSB0aGlzLmVuZE5vZGUueCwgZW5kWSA9IHRoaXMuZW5kTm9kZS55LCBuZWlnaGJvcnMsIG5laWdoYm9yLCBqdW1wUG9pbnQsIGksIGwsIHggPSBub2RlLngsIHkgPSBub2RlLnksIGp4LCBqeSwgZHgsIGR5LCBkLCBuZywganVtcE5vZGUsIGFicyA9IE1hdGguYWJzLCBtYXggPSBNYXRoLm1heDsKICAgIG5laWdoYm9ycyA9IHRoaXMuX2ZpbmROZWlnaGJvcnMobm9kZSk7CiAgICBmb3IgKGkgPSAwLCBsID0gbmVpZ2hib3JzLmxlbmd0aDsgaSA8IGw7ICsraSkgewogICAgICAgIG5laWdoYm9yID0gbmVpZ2hib3JzW2ldOwogICAgICAgIGp1bXBQb2ludCA9IHRoaXMuX2p1bXAobmVpZ2hib3JbMF0sIG5laWdoYm9yWzFdLCB4LCB5KTsKICAgICAgICBpZiAoanVtcFBvaW50KSB7CiAgICAgICAgICAgIGp4ID0ganVtcFBvaW50WzBdOwogICAgICAgICAgICBqeSA9IGp1bXBQb2ludFsxXTsKICAgICAgICAgICAganVtcE5vZGUgPSBncmlkLmdldE5vZGVBdChqeCwgankpOwogICAgICAgICAgICBpZiAoanVtcE5vZGUuY2xvc2VkKSB7CiAgICAgICAgICAgICAgICBjb250aW51ZTsKICAgICAgICAgICAgfQogICAgICAgICAgICAvLyBpbmNsdWRlIGRpc3RhbmNlLCBhcyBwYXJlbnQgbWF5IG5vdCBiZSBpbW1lZGlhdGVseSBhZGphY2VudDoKICAgICAgICAgICAgZCA9IEhldXJpc3RpYy5vY3RpbGUoYWJzKGp4IC0geCksIGFicyhqeSAtIHkpKTsKICAgICAgICAgICAgbmcgPSBub2RlLmcgKyBkOyAvLyBuZXh0IGBnYCB2YWx1ZQogICAgICAgICAgICBpZiAoIWp1bXBOb2RlLm9wZW5lZCB8fCBuZyA8IGp1bXBOb2RlLmcpIHsKICAgICAgICAgICAgICAgIGp1bXBOb2RlLmcgPSBuZzsKICAgICAgICAgICAgICAgIGp1bXBOb2RlLmggPSBqdW1wTm9kZS5oIHx8IGhldXJpc3RpYyhhYnMoanggLSBlbmRYKSwgYWJzKGp5IC0gZW5kWSkpOwogICAgICAgICAgICAgICAganVtcE5vZGUuZiA9IGp1bXBOb2RlLmcgKyBqdW1wTm9kZS5oOwogICAgICAgICAgICAgICAganVtcE5vZGUucGFyZW50ID0gbm9kZTsKICAgICAgICAgICAgICAgIGlmICghanVtcE5vZGUub3BlbmVkKSB7CiAgICAgICAgICAgICAgICAgICAgb3Blbkxpc3QucHVzaChqdW1wTm9kZSk7CiAgICAgICAgICAgICAgICAgICAganVtcE5vZGUub3BlbmVkID0gdHJ1ZTsKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgIGVsc2UgewogICAgICAgICAgICAgICAgICAgIG9wZW5MaXN0LnVwZGF0ZUl0ZW0oanVtcE5vZGUpOwogICAgICAgICAgICAgICAgfQogICAgICAgICAgICB9CiAgICAgICAgfQogICAgfQp9Owptb2R1bGUuZXhwb3J0cyA9IEp1bXBQb2ludEZpbmRlckJhc2U7CgoKLyoqKi8gfSksCi8qIDYgKi8KLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykgewoKLyoqCiAqIEEgbm9kZSBpbiBncmlkLgogKiBUaGlzIGNsYXNzIGhvbGRzIHNvbWUgYmFzaWMgaW5mb3JtYXRpb24gYWJvdXQgYSBub2RlIGFuZCBjdXN0b20KICogYXR0cmlidXRlcyBtYXkgYmUgYWRkZWQsIGRlcGVuZGluZyBvbiB0aGUgYWxnb3JpdGhtcycgbmVlZHMuCiAqIEBjb25zdHJ1Y3RvcgogKiBAcGFyYW0ge251bWJlcn0geCAtIFRoZSB4IGNvb3JkaW5hdGUgb2YgdGhlIG5vZGUgb24gdGhlIGdyaWQuCiAqIEBwYXJhbSB7bnVtYmVyfSB5IC0gVGhlIHkgY29vcmRpbmF0ZSBvZiB0aGUgbm9kZSBvbiB0aGUgZ3JpZC4KICogQHBhcmFtIHtib29sZWFufSBbd2Fsa2FibGVdIC0gV2hldGhlciB0aGlzIG5vZGUgaXMgd2Fsa2FibGUuCiAqLwpmdW5jdGlvbiBOb2RlKHgsIHksIHdhbGthYmxlKSB7CiAgICAvKioKICAgICAqIFRoZSB4IGNvb3JkaW5hdGUgb2YgdGhlIG5vZGUgb24gdGhlIGdyaWQuCiAgICAgKiBAdHlwZSBudW1iZXIKICAgICAqLwogICAgdGhpcy54ID0geDsKICAgIC8qKgogICAgICogVGhlIHkgY29vcmRpbmF0ZSBvZiB0aGUgbm9kZSBvbiB0aGUgZ3JpZC4KICAgICAqIEB0eXBlIG51bWJlcgogICAgICovCiAgICB0aGlzLnkgPSB5OwogICAgLyoqCiAgICAgKiBXaGV0aGVyIHRoaXMgbm9kZSBjYW4gYmUgd2Fsa2VkIHRocm91Z2guCiAgICAgKiBAdHlwZSBib29sZWFuCiAgICAgKi8KICAgIHRoaXMud2Fsa2FibGUgPSAod2Fsa2FibGUgPT09IHVuZGVmaW5lZCA/IHRydWUgOiB3YWxrYWJsZSk7Cn0KbW9kdWxlLmV4cG9ydHMgPSBOb2RlOwoKCi8qKiovIH0pLAovKiA3ICovCi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHsKCnZhciBIZWFwID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0KTsKdmFyIFV0aWwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpOwp2YXIgSGV1cmlzdGljID0gX193ZWJwYWNrX3JlcXVpcmVfXygzKTsKdmFyIERpYWdvbmFsTW92ZW1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDApOwovKioKICogQSogcGF0aC1maW5kZXIuIEJhc2VkIHVwb24gaHR0cHM6Ly9naXRodWIuY29tL2Jncmlucy9qYXZhc2NyaXB0LWFzdGFyCiAqIEBjb25zdHJ1Y3RvcgogKiBAcGFyYW0ge09iamVjdH0gb3B0CiAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0LmFsbG93RGlhZ29uYWwgV2hldGhlciBkaWFnb25hbCBtb3ZlbWVudCBpcyBhbGxvd2VkLgogKiAgICAgRGVwcmVjYXRlZCwgdXNlIGRpYWdvbmFsTW92ZW1lbnQgaW5zdGVhZC4KICogQHBhcmFtIHtib29sZWFufSBvcHQuZG9udENyb3NzQ29ybmVycyBEaXNhbGxvdyBkaWFnb25hbCBtb3ZlbWVudCB0b3VjaGluZwogKiAgICAgYmxvY2sgY29ybmVycy4gRGVwcmVjYXRlZCwgdXNlIGRpYWdvbmFsTW92ZW1lbnQgaW5zdGVhZC4KICogQHBhcmFtIHtEaWFnb25hbE1vdmVtZW50fSBvcHQuZGlhZ29uYWxNb3ZlbWVudCBBbGxvd2VkIGRpYWdvbmFsIG1vdmVtZW50LgogKiBAcGFyYW0ge2Z1bmN0aW9ufSBvcHQuaGV1cmlzdGljIEhldXJpc3RpYyBmdW5jdGlvbiB0byBlc3RpbWF0ZSB0aGUgZGlzdGFuY2UKICogICAgIChkZWZhdWx0cyB0byBtYW5oYXR0YW4pLgogKiBAcGFyYW0ge251bWJlcn0gb3B0LndlaWdodCBXZWlnaHQgdG8gYXBwbHkgdG8gdGhlIGhldXJpc3RpYyB0byBhbGxvdyBmb3IKICogICAgIHN1Ym9wdGltYWwgcGF0aHMsIGluIG9yZGVyIHRvIHNwZWVkIHVwIHRoZSBzZWFyY2guCiAqLwpmdW5jdGlvbiBBU3RhckZpbmRlcihvcHQpIHsKICAgIG9wdCA9IG9wdCB8fCB7fTsKICAgIHRoaXMuYWxsb3dEaWFnb25hbCA9IG9wdC5hbGxvd0RpYWdvbmFsOwogICAgdGhpcy5kb250Q3Jvc3NDb3JuZXJzID0gb3B0LmRvbnRDcm9zc0Nvcm5lcnM7CiAgICB0aGlzLmhldXJpc3RpYyA9IG9wdC5oZXVyaXN0aWMgfHwgSGV1cmlzdGljLm1hbmhhdHRhbjsKICAgIHRoaXMud2VpZ2h0ID0gb3B0LndlaWdodCB8fCAxOwogICAgdGhpcy5kaWFnb25hbE1vdmVtZW50ID0gb3B0LmRpYWdvbmFsTW92ZW1lbnQ7CiAgICBpZiAoIXRoaXMuZGlhZ29uYWxNb3ZlbWVudCkgewogICAgICAgIGlmICghdGhpcy5hbGxvd0RpYWdvbmFsKSB7CiAgICAgICAgICAgIHRoaXMuZGlhZ29uYWxNb3ZlbWVudCA9IERpYWdvbmFsTW92ZW1lbnQuTmV2ZXI7CiAgICAgICAgfQogICAgICAgIGVsc2UgewogICAgICAgICAgICBpZiAodGhpcy5kb250Q3Jvc3NDb3JuZXJzKSB7CiAgICAgICAgICAgICAgICB0aGlzLmRpYWdvbmFsTW92ZW1lbnQgPSBEaWFnb25hbE1vdmVtZW50Lk9ubHlXaGVuTm9PYnN0YWNsZXM7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgZWxzZSB7CiAgICAgICAgICAgICAgICB0aGlzLmRpYWdvbmFsTW92ZW1lbnQgPSBEaWFnb25hbE1vdmVtZW50LklmQXRNb3N0T25lT2JzdGFjbGU7CiAgICAgICAgICAgIH0KICAgICAgICB9CiAgICB9CiAgICAvLyBXaGVuIGRpYWdvbmFsIG1vdmVtZW50IGlzIGFsbG93ZWQgdGhlIG1hbmhhdHRhbiBoZXVyaXN0aWMgaXMgbm90CiAgICAvL2FkbWlzc2libGUuIEl0IHNob3VsZCBiZSBvY3RpbGUgaW5zdGVhZAogICAgaWYgKHRoaXMuZGlhZ29uYWxNb3ZlbWVudCA9PT0gRGlhZ29uYWxNb3ZlbWVudC5OZXZlcikgewogICAgICAgIHRoaXMuaGV1cmlzdGljID0gb3B0LmhldXJpc3RpYyB8fCBIZXVyaXN0aWMubWFuaGF0dGFuOwogICAgfQogICAgZWxzZSB7CiAgICAgICAgdGhpcy5oZXVyaXN0aWMgPSBvcHQuaGV1cmlzdGljIHx8IEhldXJpc3RpYy5vY3RpbGU7CiAgICB9Cn0KLyoqCiAqIEZpbmQgYW5kIHJldHVybiB0aGUgdGhlIHBhdGguCiAqIEByZXR1cm4ge0FycmF5PEFycmF5PG51bWJlcj4+fSBUaGUgcGF0aCwgaW5jbHVkaW5nIGJvdGggc3RhcnQgYW5kCiAqICAgICBlbmQgcG9zaXRpb25zLgogKi8KQVN0YXJGaW5kZXIucHJvdG90eXBlLmZpbmRQYXRoID0gZnVuY3Rpb24gKHN0YXJ0WCwgc3RhcnRZLCBlbmRYLCBlbmRZLCBncmlkKSB7CiAgICB2YXIgb3Blbkxpc3QgPSBuZXcgSGVhcChmdW5jdGlvbiAobm9kZUEsIG5vZGVCKSB7CiAgICAgICAgcmV0dXJuIG5vZGVBLmYgLSBub2RlQi5mOwogICAgfSksIHN0YXJ0Tm9kZSA9IGdyaWQuZ2V0Tm9kZUF0KHN0YXJ0WCwgc3RhcnRZKSwgZW5kTm9kZSA9IGdyaWQuZ2V0Tm9kZUF0KGVuZFgsIGVuZFkpLCBoZXVyaXN0aWMgPSB0aGlzLmhldXJpc3RpYywgZGlhZ29uYWxNb3ZlbWVudCA9IHRoaXMuZGlhZ29uYWxNb3ZlbWVudCwgd2VpZ2h0ID0gdGhpcy53ZWlnaHQsIGFicyA9IE1hdGguYWJzLCBTUVJUMiA9IE1hdGguU1FSVDIsIG5vZGUsIG5laWdoYm9ycywgbmVpZ2hib3IsIGksIGwsIHgsIHksIG5nOwogICAgLy8gc2V0IHRoZSBgZ2AgYW5kIGBmYCB2YWx1ZSBvZiB0aGUgc3RhcnQgbm9kZSB0byBiZSAwCiAgICBzdGFydE5vZGUuZyA9IDA7CiAgICBzdGFydE5vZGUuZiA9IDA7CiAgICAvLyBwdXNoIHRoZSBzdGFydCBub2RlIGludG8gdGhlIG9wZW4gbGlzdAogICAgb3Blbkxpc3QucHVzaChzdGFydE5vZGUpOwogICAgc3RhcnROb2RlLm9wZW5lZCA9IHRydWU7CiAgICAvLyB3aGlsZSB0aGUgb3BlbiBsaXN0IGlzIG5vdCBlbXB0eQogICAgd2hpbGUgKCFvcGVuTGlzdC5lbXB0eSgpKSB7CiAgICAgICAgLy8gcG9wIHRoZSBwb3NpdGlvbiBvZiBub2RlIHdoaWNoIGhhcyB0aGUgbWluaW11bSBgZmAgdmFsdWUuCiAgICAgICAgbm9kZSA9IG9wZW5MaXN0LnBvcCgpOwogICAgICAgIG5vZGUuY2xvc2VkID0gdHJ1ZTsKICAgICAgICAvLyBpZiByZWFjaGVkIHRoZSBlbmQgcG9zaXRpb24sIGNvbnN0cnVjdCB0aGUgcGF0aCBhbmQgcmV0dXJuIGl0CiAgICAgICAgaWYgKG5vZGUgPT09IGVuZE5vZGUpIHsKICAgICAgICAgICAgcmV0dXJuIFV0aWwuYmFja3RyYWNlKGVuZE5vZGUpOwogICAgICAgIH0KICAgICAgICAvLyBnZXQgbmVpZ2JvdXJzIG9mIHRoZSBjdXJyZW50IG5vZGUKICAgICAgICBuZWlnaGJvcnMgPSBncmlkLmdldE5laWdoYm9ycyhub2RlLCBkaWFnb25hbE1vdmVtZW50KTsKICAgICAgICBmb3IgKGkgPSAwLCBsID0gbmVpZ2hib3JzLmxlbmd0aDsgaSA8IGw7ICsraSkgewogICAgICAgICAgICBuZWlnaGJvciA9IG5laWdoYm9yc1tpXTsKICAgICAgICAgICAgaWYgKG5laWdoYm9yLmNsb3NlZCkgewogICAgICAgICAgICAgICAgY29udGludWU7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgeCA9IG5laWdoYm9yLng7CiAgICAgICAgICAgIHkgPSBuZWlnaGJvci55OwogICAgICAgICAgICAvLyBnZXQgdGhlIGRpc3RhbmNlIGJldHdlZW4gY3VycmVudCBub2RlIGFuZCB0aGUgbmVpZ2hib3IKICAgICAgICAgICAgLy8gYW5kIGNhbGN1bGF0ZSB0aGUgbmV4dCBnIHNjb3JlCiAgICAgICAgICAgIG5nID0gbm9kZS5nICsgKCh4IC0gbm9kZS54ID09PSAwIHx8IHkgLSBub2RlLnkgPT09IDApID8gMSA6IFNRUlQyKTsKICAgICAgICAgICAgLy8gY2hlY2sgaWYgdGhlIG5laWdoYm9yIGhhcyBub3QgYmVlbiBpbnNwZWN0ZWQgeWV0LCBvcgogICAgICAgICAgICAvLyBjYW4gYmUgcmVhY2hlZCB3aXRoIHNtYWxsZXIgY29zdCBmcm9tIHRoZSBjdXJyZW50IG5vZGUKICAgICAgICAgICAgaWYgKCFuZWlnaGJvci5vcGVuZWQgfHwgbmcgPCBuZWlnaGJvci5nKSB7CiAgICAgICAgICAgICAgICBuZWlnaGJvci5nID0gbmc7CiAgICAgICAgICAgICAgICBuZWlnaGJvci5oID0gbmVpZ2hib3IuaCB8fCB3ZWlnaHQgKiBoZXVyaXN0aWMoYWJzKHggLSBlbmRYKSwgYWJzKHkgLSBlbmRZKSk7CiAgICAgICAgICAgICAgICBuZWlnaGJvci5mID0gbmVpZ2hib3IuZyArIG5laWdoYm9yLmg7CiAgICAgICAgICAgICAgICBuZWlnaGJvci5wYXJlbnQgPSBub2RlOwogICAgICAgICAgICAgICAgaWYgKCFuZWlnaGJvci5vcGVuZWQpIHsKICAgICAgICAgICAgICAgICAgICBvcGVuTGlzdC5wdXNoKG5laWdoYm9yKTsKICAgICAgICAgICAgICAgICAgICBuZWlnaGJvci5vcGVuZWQgPSB0cnVlOwogICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgZWxzZSB7CiAgICAgICAgICAgICAgICAgICAgLy8gdGhlIG5laWdoYm9yIGNhbiBiZSByZWFjaGVkIHdpdGggc21hbGxlciBjb3N0LgogICAgICAgICAgICAgICAgICAgIC8vIFNpbmNlIGl0cyBmIHZhbHVlIGhhcyBiZWVuIHVwZGF0ZWQsIHdlIGhhdmUgdG8KICAgICAgICAgICAgICAgICAgICAvLyB1cGRhdGUgaXRzIHBvc2l0aW9uIGluIHRoZSBvcGVuIGxpc3QKICAgICAgICAgICAgICAgICAgICBvcGVuTGlzdC51cGRhdGVJdGVtKG5laWdoYm9yKTsKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgfQogICAgICAgIH0gLy8gZW5kIGZvciBlYWNoIG5laWdoYm9yCiAgICB9IC8vIGVuZCB3aGlsZSBub3Qgb3BlbiBsaXN0IGVtcHR5CiAgICAvLyBmYWlsIHRvIGZpbmQgdGhlIHBhdGgKICAgIHJldHVybiBbXTsKfTsKbW9kdWxlLmV4cG9ydHMgPSBBU3RhckZpbmRlcjsKCgovKioqLyB9KSwKLyogOCAqLwovKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7Cgp2YXIgSGVhcCA9IF9fd2VicGFja19yZXF1aXJlX18oNCk7CnZhciBVdGlsID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKTsKdmFyIEhldXJpc3RpYyA9IF9fd2VicGFja19yZXF1aXJlX18oMyk7CnZhciBEaWFnb25hbE1vdmVtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXygwKTsKLyoqCiAqIEEqIHBhdGgtZmluZGVyLgogKiBiYXNlZCB1cG9uIGh0dHBzOi8vZ2l0aHViLmNvbS9iZ3JpbnMvamF2YXNjcmlwdC1hc3RhcgogKiBAY29uc3RydWN0b3IKICogQHBhcmFtIHtPYmplY3R9IG9wdAogKiBAcGFyYW0ge2Jvb2xlYW59IG9wdC5hbGxvd0RpYWdvbmFsIFdoZXRoZXIgZGlhZ29uYWwgbW92ZW1lbnQgaXMgYWxsb3dlZC4KICogICAgIERlcHJlY2F0ZWQsIHVzZSBkaWFnb25hbE1vdmVtZW50IGluc3RlYWQuCiAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0LmRvbnRDcm9zc0Nvcm5lcnMgRGlzYWxsb3cgZGlhZ29uYWwgbW92ZW1lbnQgdG91Y2hpbmcKICogICAgIGJsb2NrIGNvcm5lcnMuIERlcHJlY2F0ZWQsIHVzZSBkaWFnb25hbE1vdmVtZW50IGluc3RlYWQuCiAqIEBwYXJhbSB7RGlhZ29uYWxNb3ZlbWVudH0gb3B0LmRpYWdvbmFsTW92ZW1lbnQgQWxsb3dlZCBkaWFnb25hbCBtb3ZlbWVudC4KICogQHBhcmFtIHtmdW5jdGlvbn0gb3B0LmhldXJpc3RpYyBIZXVyaXN0aWMgZnVuY3Rpb24gdG8gZXN0aW1hdGUgdGhlIGRpc3RhbmNlCiAqICAgICAoZGVmYXVsdHMgdG8gbWFuaGF0dGFuKS4KICogQHBhcmFtIHtudW1iZXJ9IG9wdC53ZWlnaHQgV2VpZ2h0IHRvIGFwcGx5IHRvIHRoZSBoZXVyaXN0aWMgdG8gYWxsb3cgZm9yCiAqICAgICBzdWJvcHRpbWFsIHBhdGhzLCBpbiBvcmRlciB0byBzcGVlZCB1cCB0aGUgc2VhcmNoLgogKi8KZnVuY3Rpb24gQmlBU3RhckZpbmRlcihvcHQpIHsKICAgIG9wdCA9IG9wdCB8fCB7fTsKICAgIHRoaXMuYWxsb3dEaWFnb25hbCA9IG9wdC5hbGxvd0RpYWdvbmFsOwogICAgdGhpcy5kb250Q3Jvc3NDb3JuZXJzID0gb3B0LmRvbnRDcm9zc0Nvcm5lcnM7CiAgICB0aGlzLmRpYWdvbmFsTW92ZW1lbnQgPSBvcHQuZGlhZ29uYWxNb3ZlbWVudDsKICAgIHRoaXMuaGV1cmlzdGljID0gb3B0LmhldXJpc3RpYyB8fCBIZXVyaXN0aWMubWFuaGF0dGFuOwogICAgdGhpcy53ZWlnaHQgPSBvcHQud2VpZ2h0IHx8IDE7CiAgICBpZiAoIXRoaXMuZGlhZ29uYWxNb3ZlbWVudCkgewogICAgICAgIGlmICghdGhpcy5hbGxvd0RpYWdvbmFsKSB7CiAgICAgICAgICAgIHRoaXMuZGlhZ29uYWxNb3ZlbWVudCA9IERpYWdvbmFsTW92ZW1lbnQuTmV2ZXI7CiAgICAgICAgfQogICAgICAgIGVsc2UgewogICAgICAgICAgICBpZiAodGhpcy5kb250Q3Jvc3NDb3JuZXJzKSB7CiAgICAgICAgICAgICAgICB0aGlzLmRpYWdvbmFsTW92ZW1lbnQgPSBEaWFnb25hbE1vdmVtZW50Lk9ubHlXaGVuTm9PYnN0YWNsZXM7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgZWxzZSB7CiAgICAgICAgICAgICAgICB0aGlzLmRpYWdvbmFsTW92ZW1lbnQgPSBEaWFnb25hbE1vdmVtZW50LklmQXRNb3N0T25lT2JzdGFjbGU7CiAgICAgICAgICAgIH0KICAgICAgICB9CiAgICB9CiAgICAvL1doZW4gZGlhZ29uYWwgbW92ZW1lbnQgaXMgYWxsb3dlZCB0aGUgbWFuaGF0dGFuIGhldXJpc3RpYyBpcyBub3QgYWRtaXNzaWJsZQogICAgLy9JdCBzaG91bGQgYmUgb2N0aWxlIGluc3RlYWQKICAgIGlmICh0aGlzLmRpYWdvbmFsTW92ZW1lbnQgPT09IERpYWdvbmFsTW92ZW1lbnQuTmV2ZXIpIHsKICAgICAgICB0aGlzLmhldXJpc3RpYyA9IG9wdC5oZXVyaXN0aWMgfHwgSGV1cmlzdGljLm1hbmhhdHRhbjsKICAgIH0KICAgIGVsc2UgewogICAgICAgIHRoaXMuaGV1cmlzdGljID0gb3B0LmhldXJpc3RpYyB8fCBIZXVyaXN0aWMub2N0aWxlOwogICAgfQp9Ci8qKgogKiBGaW5kIGFuZCByZXR1cm4gdGhlIHRoZSBwYXRoLgogKiBAcmV0dXJuIHtBcnJheTxBcnJheTxudW1iZXI+Pn0gVGhlIHBhdGgsIGluY2x1ZGluZyBib3RoIHN0YXJ0IGFuZAogKiAgICAgZW5kIHBvc2l0aW9ucy4KICovCkJpQVN0YXJGaW5kZXIucHJvdG90eXBlLmZpbmRQYXRoID0gZnVuY3Rpb24gKHN0YXJ0WCwgc3RhcnRZLCBlbmRYLCBlbmRZLCBncmlkKSB7CiAgICB2YXIgY21wID0gZnVuY3Rpb24gKG5vZGVBLCBub2RlQikgewogICAgICAgIHJldHVybiBub2RlQS5mIC0gbm9kZUIuZjsKICAgIH0sIHN0YXJ0T3Blbkxpc3QgPSBuZXcgSGVhcChjbXApLCBlbmRPcGVuTGlzdCA9IG5ldyBIZWFwKGNtcCksIHN0YXJ0Tm9kZSA9IGdyaWQuZ2V0Tm9kZUF0KHN0YXJ0WCwgc3RhcnRZKSwgZW5kTm9kZSA9IGdyaWQuZ2V0Tm9kZUF0KGVuZFgsIGVuZFkpLCBoZXVyaXN0aWMgPSB0aGlzLmhldXJpc3RpYywgZGlhZ29uYWxNb3ZlbWVudCA9IHRoaXMuZGlhZ29uYWxNb3ZlbWVudCwgd2VpZ2h0ID0gdGhpcy53ZWlnaHQsIGFicyA9IE1hdGguYWJzLCBTUVJUMiA9IE1hdGguU1FSVDIsIG5vZGUsIG5laWdoYm9ycywgbmVpZ2hib3IsIGksIGwsIHgsIHksIG5nLCBCWV9TVEFSVCA9IDEsIEJZX0VORCA9IDI7CiAgICAvLyBzZXQgdGhlIGBnYCBhbmQgYGZgIHZhbHVlIG9mIHRoZSBzdGFydCBub2RlIHRvIGJlIDAKICAgIC8vIGFuZCBwdXNoIGl0IGludG8gdGhlIHN0YXJ0IG9wZW4gbGlzdAogICAgc3RhcnROb2RlLmcgPSAwOwogICAgc3RhcnROb2RlLmYgPSAwOwogICAgc3RhcnRPcGVuTGlzdC5wdXNoKHN0YXJ0Tm9kZSk7CiAgICBzdGFydE5vZGUub3BlbmVkID0gQllfU1RBUlQ7CiAgICAvLyBzZXQgdGhlIGBnYCBhbmQgYGZgIHZhbHVlIG9mIHRoZSBlbmQgbm9kZSB0byBiZSAwCiAgICAvLyBhbmQgcHVzaCBpdCBpbnRvIHRoZSBvcGVuIG9wZW4gbGlzdAogICAgZW5kTm9kZS5nID0gMDsKICAgIGVuZE5vZGUuZiA9IDA7CiAgICBlbmRPcGVuTGlzdC5wdXNoKGVuZE5vZGUpOwogICAgZW5kTm9kZS5vcGVuZWQgPSBCWV9FTkQ7CiAgICAvLyB3aGlsZSBib3RoIHRoZSBvcGVuIGxpc3RzIGFyZSBub3QgZW1wdHkKICAgIHdoaWxlICghc3RhcnRPcGVuTGlzdC5lbXB0eSgpICYmICFlbmRPcGVuTGlzdC5lbXB0eSgpKSB7CiAgICAgICAgLy8gcG9wIHRoZSBwb3NpdGlvbiBvZiBzdGFydCBub2RlIHdoaWNoIGhhcyB0aGUgbWluaW11bSBgZmAgdmFsdWUuCiAgICAgICAgbm9kZSA9IHN0YXJ0T3Blbkxpc3QucG9wKCk7CiAgICAgICAgbm9kZS5jbG9zZWQgPSB0cnVlOwogICAgICAgIC8vIGdldCBuZWlnYm91cnMgb2YgdGhlIGN1cnJlbnQgbm9kZQogICAgICAgIG5laWdoYm9ycyA9IGdyaWQuZ2V0TmVpZ2hib3JzKG5vZGUsIGRpYWdvbmFsTW92ZW1lbnQpOwogICAgICAgIGZvciAoaSA9IDAsIGwgPSBuZWlnaGJvcnMubGVuZ3RoOyBpIDwgbDsgKytpKSB7CiAgICAgICAgICAgIG5laWdoYm9yID0gbmVpZ2hib3JzW2ldOwogICAgICAgICAgICBpZiAobmVpZ2hib3IuY2xvc2VkKSB7CiAgICAgICAgICAgICAgICBjb250aW51ZTsKICAgICAgICAgICAgfQogICAgICAgICAgICBpZiAobmVpZ2hib3Iub3BlbmVkID09PSBCWV9FTkQpIHsKICAgICAgICAgICAgICAgIHJldHVybiBVdGlsLmJpQmFja3RyYWNlKG5vZGUsIG5laWdoYm9yKTsKICAgICAgICAgICAgfQogICAgICAgICAgICB4ID0gbmVpZ2hib3IueDsKICAgICAgICAgICAgeSA9IG5laWdoYm9yLnk7CiAgICAgICAgICAgIC8vIGdldCB0aGUgZGlzdGFuY2UgYmV0d2VlbiBjdXJyZW50IG5vZGUgYW5kIHRoZSBuZWlnaGJvcgogICAgICAgICAgICAvLyBhbmQgY2FsY3VsYXRlIHRoZSBuZXh0IGcgc2NvcmUKICAgICAgICAgICAgbmcgPSBub2RlLmcgKyAoKHggLSBub2RlLnggPT09IDAgfHwgeSAtIG5vZGUueSA9PT0gMCkgPyAxIDogU1FSVDIpOwogICAgICAgICAgICAvLyBjaGVjayBpZiB0aGUgbmVpZ2hib3IgaGFzIG5vdCBiZWVuIGluc3BlY3RlZCB5ZXQsIG9yCiAgICAgICAgICAgIC8vIGNhbiBiZSByZWFjaGVkIHdpdGggc21hbGxlciBjb3N0IGZyb20gdGhlIGN1cnJlbnQgbm9kZQogICAgICAgICAgICBpZiAoIW5laWdoYm9yLm9wZW5lZCB8fCBuZyA8IG5laWdoYm9yLmcpIHsKICAgICAgICAgICAgICAgIG5laWdoYm9yLmcgPSBuZzsKICAgICAgICAgICAgICAgIG5laWdoYm9yLmggPSBuZWlnaGJvci5oIHx8CiAgICAgICAgICAgICAgICAgICAgd2VpZ2h0ICogaGV1cmlzdGljKGFicyh4IC0gZW5kWCksIGFicyh5IC0gZW5kWSkpOwogICAgICAgICAgICAgICAgbmVpZ2hib3IuZiA9IG5laWdoYm9yLmcgKyBuZWlnaGJvci5oOwogICAgICAgICAgICAgICAgbmVpZ2hib3IucGFyZW50ID0gbm9kZTsKICAgICAgICAgICAgICAgIGlmICghbmVpZ2hib3Iub3BlbmVkKSB7CiAgICAgICAgICAgICAgICAgICAgc3RhcnRPcGVuTGlzdC5wdXNoKG5laWdoYm9yKTsKICAgICAgICAgICAgICAgICAgICBuZWlnaGJvci5vcGVuZWQgPSBCWV9TVEFSVDsKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgIGVsc2UgewogICAgICAgICAgICAgICAgICAgIC8vIHRoZSBuZWlnaGJvciBjYW4gYmUgcmVhY2hlZCB3aXRoIHNtYWxsZXIgY29zdC4KICAgICAgICAgICAgICAgICAgICAvLyBTaW5jZSBpdHMgZiB2YWx1ZSBoYXMgYmVlbiB1cGRhdGVkLCB3ZSBoYXZlIHRvCiAgICAgICAgICAgICAgICAgICAgLy8gdXBkYXRlIGl0cyBwb3NpdGlvbiBpbiB0aGUgb3BlbiBsaXN0CiAgICAgICAgICAgICAgICAgICAgc3RhcnRPcGVuTGlzdC51cGRhdGVJdGVtKG5laWdoYm9yKTsKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgfQogICAgICAgIH0gLy8gZW5kIGZvciBlYWNoIG5laWdoYm9yCiAgICAgICAgLy8gcG9wIHRoZSBwb3NpdGlvbiBvZiBlbmQgbm9kZSB3aGljaCBoYXMgdGhlIG1pbmltdW0gYGZgIHZhbHVlLgogICAgICAgIG5vZGUgPSBlbmRPcGVuTGlzdC5wb3AoKTsKICAgICAgICBub2RlLmNsb3NlZCA9IHRydWU7CiAgICAgICAgLy8gZ2V0IG5laWdib3VycyBvZiB0aGUgY3VycmVudCBub2RlCiAgICAgICAgbmVpZ2hib3JzID0gZ3JpZC5nZXROZWlnaGJvcnMobm9kZSwgZGlhZ29uYWxNb3ZlbWVudCk7CiAgICAgICAgZm9yIChpID0gMCwgbCA9IG5laWdoYm9ycy5sZW5ndGg7IGkgPCBsOyArK2kpIHsKICAgICAgICAgICAgbmVpZ2hib3IgPSBuZWlnaGJvcnNbaV07CiAgICAgICAgICAgIGlmIChuZWlnaGJvci5jbG9zZWQpIHsKICAgICAgICAgICAgICAgIGNvbnRpbnVlOwogICAgICAgICAgICB9CiAgICAgICAgICAgIGlmIChuZWlnaGJvci5vcGVuZWQgPT09IEJZX1NUQVJUKSB7CiAgICAgICAgICAgICAgICByZXR1cm4gVXRpbC5iaUJhY2t0cmFjZShuZWlnaGJvciwgbm9kZSk7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgeCA9IG5laWdoYm9yLng7CiAgICAgICAgICAgIHkgPSBuZWlnaGJvci55OwogICAgICAgICAgICAvLyBnZXQgdGhlIGRpc3RhbmNlIGJldHdlZW4gY3VycmVudCBub2RlIGFuZCB0aGUgbmVpZ2hib3IKICAgICAgICAgICAgLy8gYW5kIGNhbGN1bGF0ZSB0aGUgbmV4dCBnIHNjb3JlCiAgICAgICAgICAgIG5nID0gbm9kZS5nICsgKCh4IC0gbm9kZS54ID09PSAwIHx8IHkgLSBub2RlLnkgPT09IDApID8gMSA6IFNRUlQyKTsKICAgICAgICAgICAgLy8gY2hlY2sgaWYgdGhlIG5laWdoYm9yIGhhcyBub3QgYmVlbiBpbnNwZWN0ZWQgeWV0LCBvcgogICAgICAgICAgICAvLyBjYW4gYmUgcmVhY2hlZCB3aXRoIHNtYWxsZXIgY29zdCBmcm9tIHRoZSBjdXJyZW50IG5vZGUKICAgICAgICAgICAgaWYgKCFuZWlnaGJvci5vcGVuZWQgfHwgbmcgPCBuZWlnaGJvci5nKSB7CiAgICAgICAgICAgICAgICBuZWlnaGJvci5nID0gbmc7CiAgICAgICAgICAgICAgICBuZWlnaGJvci5oID0gbmVpZ2hib3IuaCB8fAogICAgICAgICAgICAgICAgICAgIHdlaWdodCAqIGhldXJpc3RpYyhhYnMoeCAtIHN0YXJ0WCksIGFicyh5IC0gc3RhcnRZKSk7CiAgICAgICAgICAgICAgICBuZWlnaGJvci5mID0gbmVpZ2hib3IuZyArIG5laWdoYm9yLmg7CiAgICAgICAgICAgICAgICBuZWlnaGJvci5wYXJlbnQgPSBub2RlOwogICAgICAgICAgICAgICAgaWYgKCFuZWlnaGJvci5vcGVuZWQpIHsKICAgICAgICAgICAgICAgICAgICBlbmRPcGVuTGlzdC5wdXNoKG5laWdoYm9yKTsKICAgICAgICAgICAgICAgICAgICBuZWlnaGJvci5vcGVuZWQgPSBCWV9FTkQ7CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICBlbHNlIHsKICAgICAgICAgICAgICAgICAgICAvLyB0aGUgbmVpZ2hib3IgY2FuIGJlIHJlYWNoZWQgd2l0aCBzbWFsbGVyIGNvc3QuCiAgICAgICAgICAgICAgICAgICAgLy8gU2luY2UgaXRzIGYgdmFsdWUgaGFzIGJlZW4gdXBkYXRlZCwgd2UgaGF2ZSB0bwogICAgICAgICAgICAgICAgICAgIC8vIHVwZGF0ZSBpdHMgcG9zaXRpb24gaW4gdGhlIG9wZW4gbGlzdAogICAgICAgICAgICAgICAgICAgIGVuZE9wZW5MaXN0LnVwZGF0ZUl0ZW0obmVpZ2hib3IpOwogICAgICAgICAgICAgICAgfQogICAgICAgICAgICB9CiAgICAgICAgfSAvLyBlbmQgZm9yIGVhY2ggbmVpZ2hib3IKICAgIH0gLy8gZW5kIHdoaWxlIG5vdCBvcGVuIGxpc3QgZW1wdHkKICAgIC8vIGZhaWwgdG8gZmluZCB0aGUgcGF0aAogICAgcmV0dXJuIFtdOwp9Owptb2R1bGUuZXhwb3J0cyA9IEJpQVN0YXJGaW5kZXI7CgoKLyoqKi8gfSksCi8qIDkgKi8sCi8qIDEwICovLAovKiAxMSAqLywKLyogMTIgKi8sCi8qIDEzICovLAovKiAxNCAqLywKLyogMTUgKi8sCi8qIDE2ICovLAovKiAxNyAqLywKLyogMTggKi8sCi8qIDE5ICovCi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHsKCiJ1c2Ugc3RyaWN0IjsKCk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAiX19lc01vZHVsZSIsIHsgdmFsdWU6IHRydWUgfSk7CnZhciBib3ROYXZpZ2F0aW9uXzEgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIwKTsKdmFyIGJvdE5hdmlnYXRpb24gPSBuZXcgYm90TmF2aWdhdGlvbl8xLkJvdE5hdmlnYXRpb24oKTsKb25tZXNzYWdlID0gZnVuY3Rpb24gKGV2ZW50KSB7CiAgICB2YXIgYXJncyA9IGV2ZW50LmRhdGE7CiAgICB2YXIgYWN0aW9uID0gYXJnc1swXTsKICAgIHZhciBwbSA9IHNlbGYucG9zdE1lc3NhZ2U7IC8vIHR5cGVzY3JpcHQgYmluZGluZyBpcyBub3QgaGVscGluZyBoZXJlCiAgICBib3ROYXZpZ2F0aW9uLnNldExvZ0Z1bmN0aW9uKGxvZyk7CiAgICBib3ROYXZpZ2F0aW9uLnNldFNpZ25hbEFsaXZlRnVuY3Rpb24oc2lnbmFsQWxpdmUpOwogICAgdHJ5IHsKICAgICAgICBpZiAoYWN0aW9uID09PSAiZmluZFBhdGgiKSB7CiAgICAgICAgICAgIHZhciBteVBvcyA9IGFyZ3NbMV07CiAgICAgICAgICAgIHZhciBvdGhlclBvcyA9IGFyZ3NbMl07CiAgICAgICAgICAgIHZhciByZXF1ZXN0SUQgPSBhcmdzWzNdOwogICAgICAgICAgICB2YXIgcGF0aCA9IGJvdE5hdmlnYXRpb24uZmluZFBhdGgobXlQb3MsIG90aGVyUG9zLCByZXF1ZXN0SUQpOwogICAgICAgICAgICAvLyBjYWxsYmFjawogICAgICAgICAgICBwbShbImZpbmRQYXRoIiwgcGF0aCwgcmVxdWVzdElEXSk7CiAgICAgICAgfQogICAgICAgIGVsc2UgaWYgKGFjdGlvbiA9PT0gInNldE1vdW50YWlucyIpIHsKICAgICAgICAgICAgdmFyIG1vdW50YWlucyA9IGFyZ3NbMV07CiAgICAgICAgICAgIGJvdE5hdmlnYXRpb24uc2V0TW91bnRhaW5zKG1vdW50YWlucyk7CiAgICAgICAgICAgIHBtKFsiUkVBRFkiXSk7CiAgICAgICAgfQogICAgICAgIGVsc2UgewogICAgICAgICAgICBwbShbIkVSUk9SIiwgInVua25vd24gYWN0aW9uICIgKyBhY3Rpb25dKTsKICAgICAgICB9CiAgICB9CiAgICBjYXRjaCAoZXJyKSB7CiAgICAgICAgbG9nKCJlcnJvcjoiICsgZXJyLm1lc3NhZ2UpOwogICAgICAgIHBtKFsiRVJST1IiXSk7CiAgICB9CiAgICBmdW5jdGlvbiBsb2cod2hhdCkgewogICAgICAgIHBtKFsiTE9HIiwgd2hhdF0pOwogICAgfQogICAgZnVuY3Rpb24gc2lnbmFsQWxpdmUoKSB7CiAgICAgICAgcG0oWyJTSUdOQUxfQUxJVkUiXSk7CiAgICB9Cn07CgoKLyoqKi8gfSksCi8qIDIwICovCi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHsKCiJ1c2Ugc3RyaWN0IjsKCk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAiX19lc01vZHVsZSIsIHsgdmFsdWU6IHRydWUgfSk7CnZhciBwYXRoZmluZGluZ18xID0gX193ZWJwYWNrX3JlcXVpcmVfXygyMSk7CnZhciBuYXZDb25maWcgPSB7CiAgICAvLyBtYXAgaXMgLTE2MzUyIHRvIDE2MzUyIGluIHRoZSB4IGRpcmVjdGlvbiBhbmQgLTgxNjAgdG8gODE2MCBpbiB0aGUgeS1kaXJlY3Rpb24KICAgIG1hcFByb3BlcnRpZXM6IHsgbGVmdDogLTE2MzUyLCB0b3A6IC04MTYwLCByaWdodDogMTYzNTIsIGJvdHRvbTogODE2MCB9LAogICAgbWF4R3JpZExlbmd0aDogMjUwMCwKICAgIG1hcmdpblN0ZXA6IDUwMCwKICAgIHNjYWxlOiAwLjI1Cn07CnZhciBCb3ROYXZpZ2F0aW9uID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkgewogICAgZnVuY3Rpb24gQm90TmF2aWdhdGlvbigpIHsKICAgIH0KICAgIEJvdE5hdmlnYXRpb24ucHJvdG90eXBlLnNldExvZ0Z1bmN0aW9uID0gZnVuY3Rpb24gKGxvZ0Z1bmN0aW9uKSB7CiAgICAgICAgdGhpcy5sb2cgPSBsb2dGdW5jdGlvbjsKICAgIH07CiAgICBCb3ROYXZpZ2F0aW9uLnByb3RvdHlwZS5zZXRTaWduYWxBbGl2ZUZ1bmN0aW9uID0gZnVuY3Rpb24gKHNpZ25hbEFsaXZlKSB7CiAgICAgICAgdGhpcy5zaWduYWxBbGl2ZSA9IHNpZ25hbEFsaXZlOwogICAgfTsKICAgIEJvdE5hdmlnYXRpb24ucHJvdG90eXBlLnNldE1vdW50YWlucyA9IGZ1bmN0aW9uIChtb3VudGFpbnMpIHsKICAgICAgICB0aGlzLm1vdW50YWlucyA9IG1vdW50YWlucy5tYXAoZnVuY3Rpb24gKG0pIHsKICAgICAgICAgICAgcmV0dXJuIHsKICAgICAgICAgICAgICAgIHg6IG0ueCAqIG5hdkNvbmZpZy5zY2FsZSwKICAgICAgICAgICAgICAgIHk6IG0ueSAqIG5hdkNvbmZpZy5zY2FsZSwKICAgICAgICAgICAgICAgIHNpemU6IG0uc2l6ZSAqIG5hdkNvbmZpZy5zY2FsZSwKICAgICAgICAgICAgfTsKICAgICAgICB9KTsKICAgIH07CiAgICBCb3ROYXZpZ2F0aW9uLnByb3RvdHlwZS5nZXRHcmlkID0gZnVuY3Rpb24gKHdpZHRoLCBoZWlnaHQsIGxlZnQsIHRvcCkgewogICAgICAgIHZhciBncmlkID0gbmV3IHBhdGhmaW5kaW5nXzEuR3JpZChNYXRoLmNlaWwod2lkdGgpLCBNYXRoLmNlaWwoaGVpZ2h0KSk7CiAgICAgICAgdGhpcy5tb3VudGFpbnMuZm9yRWFjaChmdW5jdGlvbiAobW91bnRhaW4pIHsKICAgICAgICAgICAgaWYgKG1vdW50YWluLnggPCBsZWZ0IC0gbW91bnRhaW4uc2l6ZSB8fCBtb3VudGFpbi54ID4gbGVmdCArIHdpZHRoICsgbW91bnRhaW4uc2l6ZSkgewogICAgICAgICAgICAgICAgcmV0dXJuOwogICAgICAgICAgICB9CiAgICAgICAgICAgIGlmIChtb3VudGFpbi55IDwgdG9wIC0gbW91bnRhaW4uc2l6ZSB8fCBtb3VudGFpbi55ID4gdG9wICsgaGVpZ2h0ICsgbW91bnRhaW4uc2l6ZSkgewogICAgICAgICAgICAgICAgcmV0dXJuOwogICAgICAgICAgICB9CiAgICAgICAgICAgIC8vIHJlbW92ZSB3YWxrYWJpbGl0eSBvZiB0aGlzIG1vdW50YWluCiAgICAgICAgICAgIHZhciBtb3VudGFpbkxlZnQgPSBtb3VudGFpbi54IC0gbW91bnRhaW4uc2l6ZTsKICAgICAgICAgICAgdmFyIG1vdW50YWluUmlnaHQgPSBtb3VudGFpbi54ICsgbW91bnRhaW4uc2l6ZTsKICAgICAgICAgICAgdmFyIG1vdW50YWluVG9wID0gbW91bnRhaW4ueSAtIG1vdW50YWluLnNpemU7CiAgICAgICAgICAgIHZhciBtb3VudGFpbkJvdHRvbSA9IG1vdW50YWluLnkgKyBtb3VudGFpbi5zaXplOwogICAgICAgICAgICBmb3IgKHZhciBpID0gbW91bnRhaW5MZWZ0OyBpIDw9IG1vdW50YWluUmlnaHQ7IGkrKykgewogICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IG1vdW50YWluVG9wOyBqIDw9IG1vdW50YWluQm90dG9tOyBqKyspIHsKICAgICAgICAgICAgICAgICAgICB2YXIgZ3JpZFggPSBNYXRoLmZsb29yKGkgLSBsZWZ0KTsKICAgICAgICAgICAgICAgICAgICB2YXIgZ3JpZFkgPSBNYXRoLmZsb29yKGogLSB0b3ApOwogICAgICAgICAgICAgICAgICAgIGlmIChncmlkWCA8IDAgfHwgZ3JpZFggPj0gd2lkdGggfHwgZ3JpZFkgPCAwIHx8IGdyaWRZID49IGhlaWdodCkgewogICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTsKICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgZ3JpZC5zZXRXYWxrYWJsZUF0KGdyaWRYLCBncmlkWSwgZmFsc2UpOwogICAgICAgICAgICAgICAgfQogICAgICAgICAgICB9CiAgICAgICAgfSk7CiAgICAgICAgcmV0dXJuIGdyaWQ7CiAgICB9OwogICAgQm90TmF2aWdhdGlvbi5wcm90b3R5cGUuaXNWYWxpZCA9IGZ1bmN0aW9uIChwb3MpIHsKICAgICAgICB2YXIgbWFyZ2luID0gMzIgKiBuYXZDb25maWcuc2NhbGU7CiAgICAgICAgcmV0dXJuIHBvcy54ID4gbmF2Q29uZmlnLm1hcFByb3BlcnRpZXMubGVmdCAqIG5hdkNvbmZpZy5zY2FsZSArIG1hcmdpbiAmJgogICAgICAgICAgICBwb3MueCA8IG5hdkNvbmZpZy5tYXBQcm9wZXJ0aWVzLnJpZ2h0ICogbmF2Q29uZmlnLnNjYWxlIC0gbWFyZ2luICYmCiAgICAgICAgICAgIHBvcy55ID4gbmF2Q29uZmlnLm1hcFByb3BlcnRpZXMudG9wICogbmF2Q29uZmlnLnNjYWxlICsgbWFyZ2luICYmCiAgICAgICAgICAgIHBvcy55IDwgbmF2Q29uZmlnLm1hcFByb3BlcnRpZXMuYm90dG9tICogbmF2Q29uZmlnLnNjYWxlIC0gbWFyZ2luOwogICAgfTsKICAgIEJvdE5hdmlnYXRpb24ucHJvdG90eXBlLnNjYWxlID0gZnVuY3Rpb24gKHBvcykgewogICAgICAgIGlmIChwb3Muc2NhbGUpIHsKICAgICAgICAgICAgLy8gaGFzIGFscmVhZHkgYmVlbiBzY2FsZWQKICAgICAgICAgICAgcmV0dXJuIHBvczsKICAgICAgICB9CiAgICAgICAgcmV0dXJuIHsKICAgICAgICAgICAgeDogcG9zLnggKiBuYXZDb25maWcuc2NhbGUsCiAgICAgICAgICAgIHk6IHBvcy55ICogbmF2Q29uZmlnLnNjYWxlLAogICAgICAgICAgICBzY2FsZTogbmF2Q29uZmlnLnNjYWxlCiAgICAgICAgfTsKICAgIH07CiAgICBCb3ROYXZpZ2F0aW9uLnByb3RvdHlwZS5maW5kUGF0aCA9IGZ1bmN0aW9uIChteVBvcywgb3RoZXJQb3MsIHJlcXVlc3RJRCwgbWFyZ2luKSB7CiAgICAgICAgaWYgKG1hcmdpbiA9PT0gdm9pZCAwKSB7IG1hcmdpbiA9IDA7IH0KICAgICAgICB0aGlzLnNpZ25hbEFsaXZlKCk7CiAgICAgICAgbXlQb3MgPSB0aGlzLnNjYWxlKG15UG9zKTsKICAgICAgICBvdGhlclBvcyA9IHRoaXMuc2NhbGUob3RoZXJQb3MpOwogICAgICAgIGlmICghdGhpcy5pc1ZhbGlkKG15UG9zKSB8fCAhdGhpcy5pc1ZhbGlkKG90aGVyUG9zKSkgewogICAgICAgICAgICB0aGlzLmxvZygibm90IHZhbGlkIGZvciAiICsgcmVxdWVzdElEKTsKICAgICAgICAgICAgcmV0dXJuIFtdOwogICAgICAgIH0KICAgICAgICB2YXIgaGFsdmFyaW4gPSBtYXJnaW4gLyAyOwogICAgICAgIHZhciBncmlkTGVmdDsKICAgICAgICB2YXIgZ3JpZFdpZHRoID0gTWF0aC5taW4obmF2Q29uZmlnLm1heEdyaWRMZW5ndGgsIE1hdGguYWJzKG90aGVyUG9zLnggLSBteVBvcy54KSArIG1hcmdpbik7CiAgICAgICAgaWYgKG90aGVyUG9zLnggPiBteVBvcy54KSB7CiAgICAgICAgICAgIGdyaWRMZWZ0ID0gbXlQb3MueCAtIGhhbHZhcmluOwogICAgICAgIH0KICAgICAgICBlbHNlIHsKICAgICAgICAgICAgZ3JpZExlZnQgPSBteVBvcy54IC0gZ3JpZFdpZHRoICsgMSArIGhhbHZhcmluOwogICAgICAgIH0KICAgICAgICBpZiAoZ3JpZExlZnQgPCBuYXZDb25maWcubWFwUHJvcGVydGllcy5sZWZ0ICogbmF2Q29uZmlnLnNjYWxlKSB7CiAgICAgICAgICAgIGdyaWRMZWZ0ID0gbmF2Q29uZmlnLm1hcFByb3BlcnRpZXMubGVmdCAqIG5hdkNvbmZpZy5zY2FsZTsKICAgICAgICB9CiAgICAgICAgaWYgKGdyaWRMZWZ0ICsgZ3JpZFdpZHRoID4gbmF2Q29uZmlnLm1hcFByb3BlcnRpZXMucmlnaHQgKiBuYXZDb25maWcuc2NhbGUpIHsKICAgICAgICAgICAgZ3JpZExlZnQgPSBuYXZDb25maWcubWFwUHJvcGVydGllcy5yaWdodCAqIG5hdkNvbmZpZy5zY2FsZSAtIGdyaWRXaWR0aCAtIDE7CiAgICAgICAgfQogICAgICAgIHZhciBncmlkVG9wOwogICAgICAgIHZhciBncmlkSGVpZ2h0ID0gTWF0aC5taW4obmF2Q29uZmlnLm1heEdyaWRMZW5ndGgsIE1hdGguYWJzKG90aGVyUG9zLnkgLSBteVBvcy55KSArIG1hcmdpbik7CiAgICAgICAgaWYgKG90aGVyUG9zLnkgPiBteVBvcy55KSB7CiAgICAgICAgICAgIGdyaWRUb3AgPSBteVBvcy55IC0gaGFsdmFyaW47CiAgICAgICAgfQogICAgICAgIGVsc2UgewogICAgICAgICAgICBncmlkVG9wID0gbXlQb3MueSAtIGdyaWRIZWlnaHQgKyAxICsgaGFsdmFyaW47CiAgICAgICAgfQogICAgICAgIGlmIChncmlkVG9wIDwgbmF2Q29uZmlnLm1hcFByb3BlcnRpZXMudG9wICogbmF2Q29uZmlnLnNjYWxlKSB7CiAgICAgICAgICAgIGdyaWRUb3AgPSBuYXZDb25maWcubWFwUHJvcGVydGllcy50b3AgKiBuYXZDb25maWcuc2NhbGU7CiAgICAgICAgfQogICAgICAgIGlmIChncmlkVG9wICsgZ3JpZEhlaWdodCA+IG5hdkNvbmZpZy5tYXBQcm9wZXJ0aWVzLmJvdHRvbSAqIG5hdkNvbmZpZy5zY2FsZSkgewogICAgICAgICAgICBncmlkVG9wID0gbmF2Q29uZmlnLm1hcFByb3BlcnRpZXMuYm90dG9tICogbmF2Q29uZmlnLnNjYWxlIC0gZ3JpZEhlaWdodCAtIDE7CiAgICAgICAgfQogICAgICAgIC8vIGdldCBncmlkIHdpdGggbW91bnRhaW5zCiAgICAgICAgdmFyIGdyaWQgPSB0aGlzLmdldEdyaWQoZ3JpZFdpZHRoLCBncmlkSGVpZ2h0LCBncmlkTGVmdCwgZ3JpZFRvcCk7CiAgICAgICAgdmFyIEJlc3RGaXJzdEZpbmRlcjIgPSBwYXRoZmluZGluZ18xLkJlc3RGaXJzdEZpbmRlcjsgLy8gQHR5cGVzIGRlZmluaXRpb25zIGFyZSBub3QgY29ycmVjdAogICAgICAgIHZhciBmaW5kZXIgPSBuZXcgQmVzdEZpcnN0RmluZGVyMih7CiAgICAgICAgICAgIGFsbG93RGlhZ29uYWw6IHRydWUKICAgICAgICB9KTsKICAgICAgICB2YXIgZnJvbVggPSBNYXRoLmZsb29yKG15UG9zLnggLSBncmlkTGVmdCk7CiAgICAgICAgdmFyIGZyb21ZID0gTWF0aC5mbG9vcihteVBvcy55IC0gZ3JpZFRvcCk7CiAgICAgICAgdmFyIHRvWCA9IG90aGVyUG9zLnggLSBncmlkTGVmdDsKICAgICAgICB2YXIgdG9ZID0gb3RoZXJQb3MueSAtIGdyaWRUb3A7CiAgICAgICAgLy8gdGFyZ2V0IG1heSBub3QgYmUgInZpc2libGUiIGluIG91ciBncmlkCiAgICAgICAgaWYgKHRvWCA8IDApIHsKICAgICAgICAgICAgdG9YID0gMDsKICAgICAgICB9CiAgICAgICAgaWYgKHRvWCA+PSBncmlkV2lkdGgpIHsKICAgICAgICAgICAgdG9YID0gZ3JpZFdpZHRoIC0gMTsKICAgICAgICB9CiAgICAgICAgdmFyIHNlYXJjaERpcmVjdGlvbiA9IDE7CiAgICAgICAgaWYgKHRvWSA8IDApIHsKICAgICAgICAgICAgdG9ZID0gMDsKICAgICAgICB9CiAgICAgICAgaWYgKHRvWSA+PSBncmlkSGVpZ2h0KSB7CiAgICAgICAgICAgIHRvWSA9IGdyaWRIZWlnaHQgLSAxOwogICAgICAgICAgICBzZWFyY2hEaXJlY3Rpb24gPSAtMTsKICAgICAgICB9CiAgICAgICAgdG9YID0gTWF0aC5mbG9vcih0b1gpOwogICAgICAgIHRvWSA9IE1hdGguZmxvb3IodG9ZKTsKICAgICAgICAvLyBwcmV2ZW50IHRvIHJvdW5kIHRvIGFuIHVud2Fsa2FibGUgcGxhY2U6IGdvIHVwIG9yIGRvd24gdW50aWwgYSB3YWxrYWJsZSBwbGFjZSB3YXMgZm91bmQKICAgICAgICB3aGlsZSAoIWdyaWQuaXNXYWxrYWJsZUF0KHRvWCwgdG9ZKSAmJiB0b1kgPiAwICYmIHRvWSA8IGdyaWRIZWlnaHQgLSAxKSB7CiAgICAgICAgICAgIHRvWSArPSBzZWFyY2hEaXJlY3Rpb247CiAgICAgICAgfQogICAgICAgIHdoaWxlICghZ3JpZC5pc1dhbGthYmxlQXQoZnJvbVgsIGZyb21ZKSAmJiBmcm9tWSA+IDAgJiYgZnJvbVkgPCBncmlkSGVpZ2h0IC0gMSkgewogICAgICAgICAgICBmcm9tWSArPSBzZWFyY2hEaXJlY3Rpb247CiAgICAgICAgfQogICAgICAgIHZhciBwYXRoID0gZmluZGVyLmZpbmRQYXRoKGZyb21YLCBmcm9tWSwgdG9YLCB0b1ksIGdyaWQpOwogICAgICAgIGlmIChwYXRoLmxlbmd0aCA+IDApIHsKICAgICAgICAgICAgcGF0aCA9IHBhdGhmaW5kaW5nXzEuVXRpbC5zbW9vdGhlblBhdGgoZ3JpZCwgcGF0aCk7CiAgICAgICAgICAgIHZhciByZXN1bHQgPSBbXTsKICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwYXRoLmxlbmd0aDsgaSsrKSB7CiAgICAgICAgICAgICAgICB2YXIgeCA9IChwYXRoW2ldWzBdICsgZ3JpZExlZnQpIC8gbmF2Q29uZmlnLnNjYWxlOwogICAgICAgICAgICAgICAgdmFyIHkgPSAocGF0aFtpXVsxXSArIGdyaWRUb3ApIC8gbmF2Q29uZmlnLnNjYWxlOwogICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goeyB4OiB4LCB5OiB5IH0pOwogICAgICAgICAgICB9CiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7CiAgICAgICAgfQogICAgICAgIGVsc2UgewogICAgICAgICAgICAvLyB0aGlzIGlzIGFuIHVud2Fsa2FibGUgcGF0aC4gVHJ5IGJyb2FkZW5pbmcgdGhlIGdyaWQgdG8gZmluZCBhIHdheSBhcm91bmQgYW4gb2JzdGFjbGUgKG1vdW50YWluKQogICAgICAgICAgICBpZiAobWFyZ2luID49IG5hdkNvbmZpZy5tYXhHcmlkTGVuZ3RoKSB7CiAgICAgICAgICAgICAgICB0aGlzLmxvZygidWx0aW1hdGVseSB1bndhbGthYmxlIGZvciAiICsgcmVxdWVzdElEKTsKICAgICAgICAgICAgICAgIHJldHVybiBbXTsgLy8gc29ycnksIGNhbid0IGZpbmQgYSBwYXRoCiAgICAgICAgICAgIH0KICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmluZFBhdGgobXlQb3MsIG90aGVyUG9zLCByZXF1ZXN0SUQsIG1hcmdpbiArIChuYXZDb25maWcubWFyZ2luU3RlcCAqIG5hdkNvbmZpZy5zY2FsZSkpOwogICAgICAgIH0KICAgIH07CiAgICByZXR1cm4gQm90TmF2aWdhdGlvbjsKfSgpKTsKZXhwb3J0cy5Cb3ROYXZpZ2F0aW9uID0gQm90TmF2aWdhdGlvbjsKCgovKioqLyB9KSwKLyogMjEgKi8KLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykgewoKbW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIyKTsKCgovKioqLyB9KSwKLyogMjIgKi8KLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykgewoKbW9kdWxlLmV4cG9ydHMgPSB7CiAgICAnSGVhcCc6IF9fd2VicGFja19yZXF1aXJlX18oNCksCiAgICAnTm9kZSc6IF9fd2VicGFja19yZXF1aXJlX18oNiksCiAgICAnR3JpZCc6IF9fd2VicGFja19yZXF1aXJlX18oMjUpLAogICAgJ1V0aWwnOiBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpLAogICAgJ0RpYWdvbmFsTW92ZW1lbnQnOiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApLAogICAgJ0hldXJpc3RpYyc6IF9fd2VicGFja19yZXF1aXJlX18oMyksCiAgICAnQVN0YXJGaW5kZXInOiBfX3dlYnBhY2tfcmVxdWlyZV9fKDcpLAogICAgJ0Jlc3RGaXJzdEZpbmRlcic6IF9fd2VicGFja19yZXF1aXJlX18oMjYpLAogICAgJ0JyZWFkdGhGaXJzdEZpbmRlcic6IF9fd2VicGFja19yZXF1aXJlX18oMjcpLAogICAgJ0RpamtzdHJhRmluZGVyJzogX193ZWJwYWNrX3JlcXVpcmVfXygyOCksCiAgICAnQmlBU3RhckZpbmRlcic6IF9fd2VicGFja19yZXF1aXJlX18oOCksCiAgICAnQmlCZXN0Rmlyc3RGaW5kZXInOiBfX3dlYnBhY2tfcmVxdWlyZV9fKDI5KSwKICAgICdCaUJyZWFkdGhGaXJzdEZpbmRlcic6IF9fd2VicGFja19yZXF1aXJlX18oMzApLAogICAgJ0JpRGlqa3N0cmFGaW5kZXInOiBfX3dlYnBhY2tfcmVxdWlyZV9fKDMxKSwKICAgICdJREFTdGFyRmluZGVyJzogX193ZWJwYWNrX3JlcXVpcmVfXygzMiksCiAgICAnSnVtcFBvaW50RmluZGVyJzogX193ZWJwYWNrX3JlcXVpcmVfXygzMyksCn07CgoKLyoqKi8gfSksCi8qIDIzICovCi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHsKCi8qIFdFQlBBQ0sgVkFSIElOSkVDVElPTiAqLyhmdW5jdGlvbihtb2R1bGUpIHsvLyBHZW5lcmF0ZWQgYnkgQ29mZmVlU2NyaXB0IDEuOC4wCihmdW5jdGlvbiAoKSB7CiAgICB2YXIgSGVhcCwgZGVmYXVsdENtcCwgZmxvb3IsIGhlYXBpZnksIGhlYXBwb3AsIGhlYXBwdXNoLCBoZWFwcHVzaHBvcCwgaGVhcHJlcGxhY2UsIGluc29ydCwgbWluLCBubGFyZ2VzdCwgbnNtYWxsZXN0LCB1cGRhdGVJdGVtLCBfc2lmdGRvd24sIF9zaWZ0dXA7CiAgICBmbG9vciA9IE1hdGguZmxvb3IsIG1pbiA9IE1hdGgubWluOwogICAgLyoKICAgIERlZmF1bHQgY29tcGFyaXNvbiBmdW5jdGlvbiB0byBiZSB1c2VkCiAgICAgKi8KICAgIGRlZmF1bHRDbXAgPSBmdW5jdGlvbiAoeCwgeSkgewogICAgICAgIGlmICh4IDwgeSkgewogICAgICAgICAgICByZXR1cm4gLTE7CiAgICAgICAgfQogICAgICAgIGlmICh4ID4geSkgewogICAgICAgICAgICByZXR1cm4gMTsKICAgICAgICB9CiAgICAgICAgcmV0dXJuIDA7CiAgICB9OwogICAgLyoKICAgIEluc2VydCBpdGVtIHggaW4gbGlzdCBhLCBhbmQga2VlcCBpdCBzb3J0ZWQgYXNzdW1pbmcgYSBpcyBzb3J0ZWQuCiAgICAKICAgIElmIHggaXMgYWxyZWFkeSBpbiBhLCBpbnNlcnQgaXQgdG8gdGhlIHJpZ2h0IG9mIHRoZSByaWdodG1vc3QgeC4KICAgIAogICAgT3B0aW9uYWwgYXJncyBsbyAoZGVmYXVsdCAwKSBhbmQgaGkgKGRlZmF1bHQgYS5sZW5ndGgpIGJvdW5kIHRoZSBzbGljZQogICAgb2YgYSB0byBiZSBzZWFyY2hlZC4KICAgICAqLwogICAgaW5zb3J0ID0gZnVuY3Rpb24gKGEsIHgsIGxvLCBoaSwgY21wKSB7CiAgICAgICAgdmFyIG1pZDsKICAgICAgICBpZiAobG8gPT0gbnVsbCkgewogICAgICAgICAgICBsbyA9IDA7CiAgICAgICAgfQogICAgICAgIGlmIChjbXAgPT0gbnVsbCkgewogICAgICAgICAgICBjbXAgPSBkZWZhdWx0Q21wOwogICAgICAgIH0KICAgICAgICBpZiAobG8gPCAwKSB7CiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignbG8gbXVzdCBiZSBub24tbmVnYXRpdmUnKTsKICAgICAgICB9CiAgICAgICAgaWYgKGhpID09IG51bGwpIHsKICAgICAgICAgICAgaGkgPSBhLmxlbmd0aDsKICAgICAgICB9CiAgICAgICAgd2hpbGUgKGxvIDwgaGkpIHsKICAgICAgICAgICAgbWlkID0gZmxvb3IoKGxvICsgaGkpIC8gMik7CiAgICAgICAgICAgIGlmIChjbXAoeCwgYVttaWRdKSA8IDApIHsKICAgICAgICAgICAgICAgIGhpID0gbWlkOwogICAgICAgICAgICB9CiAgICAgICAgICAgIGVsc2UgewogICAgICAgICAgICAgICAgbG8gPSBtaWQgKyAxOwogICAgICAgICAgICB9CiAgICAgICAgfQogICAgICAgIHJldHVybiAoW10uc3BsaWNlLmFwcGx5KGEsIFtsbywgbG8gLSBsb10uY29uY2F0KHgpKSwgeCk7CiAgICB9OwogICAgLyoKICAgIFB1c2ggaXRlbSBvbnRvIGhlYXAsIG1haW50YWluaW5nIHRoZSBoZWFwIGludmFyaWFudC4KICAgICAqLwogICAgaGVhcHB1c2ggPSBmdW5jdGlvbiAoYXJyYXksIGl0ZW0sIGNtcCkgewogICAgICAgIGlmIChjbXAgPT0gbnVsbCkgewogICAgICAgICAgICBjbXAgPSBkZWZhdWx0Q21wOwogICAgICAgIH0KICAgICAgICBhcnJheS5wdXNoKGl0ZW0pOwogICAgICAgIHJldHVybiBfc2lmdGRvd24oYXJyYXksIDAsIGFycmF5Lmxlbmd0aCAtIDEsIGNtcCk7CiAgICB9OwogICAgLyoKICAgIFBvcCB0aGUgc21hbGxlc3QgaXRlbSBvZmYgdGhlIGhlYXAsIG1haW50YWluaW5nIHRoZSBoZWFwIGludmFyaWFudC4KICAgICAqLwogICAgaGVhcHBvcCA9IGZ1bmN0aW9uIChhcnJheSwgY21wKSB7CiAgICAgICAgdmFyIGxhc3RlbHQsIHJldHVybml0ZW07CiAgICAgICAgaWYgKGNtcCA9PSBudWxsKSB7CiAgICAgICAgICAgIGNtcCA9IGRlZmF1bHRDbXA7CiAgICAgICAgfQogICAgICAgIGxhc3RlbHQgPSBhcnJheS5wb3AoKTsKICAgICAgICBpZiAoYXJyYXkubGVuZ3RoKSB7CiAgICAgICAgICAgIHJldHVybml0ZW0gPSBhcnJheVswXTsKICAgICAgICAgICAgYXJyYXlbMF0gPSBsYXN0ZWx0OwogICAgICAgICAgICBfc2lmdHVwKGFycmF5LCAwLCBjbXApOwogICAgICAgIH0KICAgICAgICBlbHNlIHsKICAgICAgICAgICAgcmV0dXJuaXRlbSA9IGxhc3RlbHQ7CiAgICAgICAgfQogICAgICAgIHJldHVybiByZXR1cm5pdGVtOwogICAgfTsKICAgIC8qCiAgICBQb3AgYW5kIHJldHVybiB0aGUgY3VycmVudCBzbWFsbGVzdCB2YWx1ZSwgYW5kIGFkZCB0aGUgbmV3IGl0ZW0uCiAgICAKICAgIFRoaXMgaXMgbW9yZSBlZmZpY2llbnQgdGhhbiBoZWFwcG9wKCkgZm9sbG93ZWQgYnkgaGVhcHB1c2goKSwgYW5kIGNhbiBiZQogICAgbW9yZSBhcHByb3ByaWF0ZSB3aGVuIHVzaW5nIGEgZml4ZWQgc2l6ZSBoZWFwLiBOb3RlIHRoYXQgdGhlIHZhbHVlCiAgICByZXR1cm5lZCBtYXkgYmUgbGFyZ2VyIHRoYW4gaXRlbSEgVGhhdCBjb25zdHJhaW5zIHJlYXNvbmFibGUgdXNlIG9mCiAgICB0aGlzIHJvdXRpbmUgdW5sZXNzIHdyaXR0ZW4gYXMgcGFydCBvZiBhIGNvbmRpdGlvbmFsIHJlcGxhY2VtZW50OgogICAgICAgIGlmIGl0ZW0gPiBhcnJheVswXQogICAgICAgICAgaXRlbSA9IGhlYXByZXBsYWNlKGFycmF5LCBpdGVtKQogICAgICovCiAgICBoZWFwcmVwbGFjZSA9IGZ1bmN0aW9uIChhcnJheSwgaXRlbSwgY21wKSB7CiAgICAgICAgdmFyIHJldHVybml0ZW07CiAgICAgICAgaWYgKGNtcCA9PSBudWxsKSB7CiAgICAgICAgICAgIGNtcCA9IGRlZmF1bHRDbXA7CiAgICAgICAgfQogICAgICAgIHJldHVybml0ZW0gPSBhcnJheVswXTsKICAgICAgICBhcnJheVswXSA9IGl0ZW07CiAgICAgICAgX3NpZnR1cChhcnJheSwgMCwgY21wKTsKICAgICAgICByZXR1cm4gcmV0dXJuaXRlbTsKICAgIH07CiAgICAvKgogICAgRmFzdCB2ZXJzaW9uIG9mIGEgaGVhcHB1c2ggZm9sbG93ZWQgYnkgYSBoZWFwcG9wLgogICAgICovCiAgICBoZWFwcHVzaHBvcCA9IGZ1bmN0aW9uIChhcnJheSwgaXRlbSwgY21wKSB7CiAgICAgICAgdmFyIF9yZWY7CiAgICAgICAgaWYgKGNtcCA9PSBudWxsKSB7CiAgICAgICAgICAgIGNtcCA9IGRlZmF1bHRDbXA7CiAgICAgICAgfQogICAgICAgIGlmIChhcnJheS5sZW5ndGggJiYgY21wKGFycmF5WzBdLCBpdGVtKSA8IDApIHsKICAgICAgICAgICAgX3JlZiA9IFthcnJheVswXSwgaXRlbV0sIGl0ZW0gPSBfcmVmWzBdLCBhcnJheVswXSA9IF9yZWZbMV07CiAgICAgICAgICAgIF9zaWZ0dXAoYXJyYXksIDAsIGNtcCk7CiAgICAgICAgfQogICAgICAgIHJldHVybiBpdGVtOwogICAgfTsKICAgIC8qCiAgICBUcmFuc2Zvcm0gbGlzdCBpbnRvIGEgaGVhcCwgaW4tcGxhY2UsIGluIE8oYXJyYXkubGVuZ3RoKSB0aW1lLgogICAgICovCiAgICBoZWFwaWZ5ID0gZnVuY3Rpb24gKGFycmF5LCBjbXApIHsKICAgICAgICB2YXIgaSwgX2ksIF9qLCBfbGVuLCBfcmVmLCBfcmVmMSwgX3Jlc3VsdHMsIF9yZXN1bHRzMTsKICAgICAgICBpZiAoY21wID09IG51bGwpIHsKICAgICAgICAgICAgY21wID0gZGVmYXVsdENtcDsKICAgICAgICB9CiAgICAgICAgX3JlZjEgPSAoZnVuY3Rpb24gKCkgewogICAgICAgICAgICBfcmVzdWx0czEgPSBbXTsKICAgICAgICAgICAgZm9yICh2YXIgX2ogPSAwLCBfcmVmID0gZmxvb3IoYXJyYXkubGVuZ3RoIC8gMik7IDAgPD0gX3JlZiA/IF9qIDwgX3JlZiA6IF9qID4gX3JlZjsgMCA8PSBfcmVmID8gX2orKyA6IF9qLS0pIHsKICAgICAgICAgICAgICAgIF9yZXN1bHRzMS5wdXNoKF9qKTsKICAgICAgICAgICAgfQogICAgICAgICAgICByZXR1cm4gX3Jlc3VsdHMxOwogICAgICAgIH0pLmFwcGx5KHRoaXMpLnJldmVyc2UoKTsKICAgICAgICBfcmVzdWx0cyA9IFtdOwogICAgICAgIGZvciAoX2kgPSAwLCBfbGVuID0gX3JlZjEubGVuZ3RoOyBfaSA8IF9sZW47IF9pKyspIHsKICAgICAgICAgICAgaSA9IF9yZWYxW19pXTsKICAgICAgICAgICAgX3Jlc3VsdHMucHVzaChfc2lmdHVwKGFycmF5LCBpLCBjbXApKTsKICAgICAgICB9CiAgICAgICAgcmV0dXJuIF9yZXN1bHRzOwogICAgfTsKICAgIC8qCiAgICBVcGRhdGUgdGhlIHBvc2l0aW9uIG9mIHRoZSBnaXZlbiBpdGVtIGluIHRoZSBoZWFwLgogICAgVGhpcyBmdW5jdGlvbiBzaG91bGQgYmUgY2FsbGVkIGV2ZXJ5IHRpbWUgdGhlIGl0ZW0gaXMgYmVpbmcgbW9kaWZpZWQuCiAgICAgKi8KICAgIHVwZGF0ZUl0ZW0gPSBmdW5jdGlvbiAoYXJyYXksIGl0ZW0sIGNtcCkgewogICAgICAgIHZhciBwb3M7CiAgICAgICAgaWYgKGNtcCA9PSBudWxsKSB7CiAgICAgICAgICAgIGNtcCA9IGRlZmF1bHRDbXA7CiAgICAgICAgfQogICAgICAgIHBvcyA9IGFycmF5LmluZGV4T2YoaXRlbSk7CiAgICAgICAgaWYgKHBvcyA9PT0gLTEpIHsKICAgICAgICAgICAgcmV0dXJuOwogICAgICAgIH0KICAgICAgICBfc2lmdGRvd24oYXJyYXksIDAsIHBvcywgY21wKTsKICAgICAgICByZXR1cm4gX3NpZnR1cChhcnJheSwgcG9zLCBjbXApOwogICAgfTsKICAgIC8qCiAgICBGaW5kIHRoZSBuIGxhcmdlc3QgZWxlbWVudHMgaW4gYSBkYXRhc2V0LgogICAgICovCiAgICBubGFyZ2VzdCA9IGZ1bmN0aW9uIChhcnJheSwgbiwgY21wKSB7CiAgICAgICAgdmFyIGVsZW0sIHJlc3VsdCwgX2ksIF9sZW4sIF9yZWY7CiAgICAgICAgaWYgKGNtcCA9PSBudWxsKSB7CiAgICAgICAgICAgIGNtcCA9IGRlZmF1bHRDbXA7CiAgICAgICAgfQogICAgICAgIHJlc3VsdCA9IGFycmF5LnNsaWNlKDAsIG4pOwogICAgICAgIGlmICghcmVzdWx0Lmxlbmd0aCkgewogICAgICAgICAgICByZXR1cm4gcmVzdWx0OwogICAgICAgIH0KICAgICAgICBoZWFwaWZ5KHJlc3VsdCwgY21wKTsKICAgICAgICBfcmVmID0gYXJyYXkuc2xpY2Uobik7CiAgICAgICAgZm9yIChfaSA9IDAsIF9sZW4gPSBfcmVmLmxlbmd0aDsgX2kgPCBfbGVuOyBfaSsrKSB7CiAgICAgICAgICAgIGVsZW0gPSBfcmVmW19pXTsKICAgICAgICAgICAgaGVhcHB1c2hwb3AocmVzdWx0LCBlbGVtLCBjbXApOwogICAgICAgIH0KICAgICAgICByZXR1cm4gcmVzdWx0LnNvcnQoY21wKS5yZXZlcnNlKCk7CiAgICB9OwogICAgLyoKICAgIEZpbmQgdGhlIG4gc21hbGxlc3QgZWxlbWVudHMgaW4gYSBkYXRhc2V0LgogICAgICovCiAgICBuc21hbGxlc3QgPSBmdW5jdGlvbiAoYXJyYXksIG4sIGNtcCkgewogICAgICAgIHZhciBlbGVtLCBpLCBsb3MsIHJlc3VsdCwgX2ksIF9qLCBfbGVuLCBfcmVmLCBfcmVmMSwgX3Jlc3VsdHM7CiAgICAgICAgaWYgKGNtcCA9PSBudWxsKSB7CiAgICAgICAgICAgIGNtcCA9IGRlZmF1bHRDbXA7CiAgICAgICAgfQogICAgICAgIGlmIChuICogMTAgPD0gYXJyYXkubGVuZ3RoKSB7CiAgICAgICAgICAgIHJlc3VsdCA9IGFycmF5LnNsaWNlKDAsIG4pLnNvcnQoY21wKTsKICAgICAgICAgICAgaWYgKCFyZXN1bHQubGVuZ3RoKSB7CiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0OwogICAgICAgICAgICB9CiAgICAgICAgICAgIGxvcyA9IHJlc3VsdFtyZXN1bHQubGVuZ3RoIC0gMV07CiAgICAgICAgICAgIF9yZWYgPSBhcnJheS5zbGljZShuKTsKICAgICAgICAgICAgZm9yIChfaSA9IDAsIF9sZW4gPSBfcmVmLmxlbmd0aDsgX2kgPCBfbGVuOyBfaSsrKSB7CiAgICAgICAgICAgICAgICBlbGVtID0gX3JlZltfaV07CiAgICAgICAgICAgICAgICBpZiAoY21wKGVsZW0sIGxvcykgPCAwKSB7CiAgICAgICAgICAgICAgICAgICAgaW5zb3J0KHJlc3VsdCwgZWxlbSwgMCwgbnVsbCwgY21wKTsKICAgICAgICAgICAgICAgICAgICByZXN1bHQucG9wKCk7CiAgICAgICAgICAgICAgICAgICAgbG9zID0gcmVzdWx0W3Jlc3VsdC5sZW5ndGggLSAxXTsKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgfQogICAgICAgICAgICByZXR1cm4gcmVzdWx0OwogICAgICAgIH0KICAgICAgICBoZWFwaWZ5KGFycmF5LCBjbXApOwogICAgICAgIF9yZXN1bHRzID0gW107CiAgICAgICAgZm9yIChpID0gX2ogPSAwLCBfcmVmMSA9IG1pbihuLCBhcnJheS5sZW5ndGgpOyAwIDw9IF9yZWYxID8gX2ogPCBfcmVmMSA6IF9qID4gX3JlZjE7IGkgPSAwIDw9IF9yZWYxID8gKytfaiA6IC0tX2opIHsKICAgICAgICAgICAgX3Jlc3VsdHMucHVzaChoZWFwcG9wKGFycmF5LCBjbXApKTsKICAgICAgICB9CiAgICAgICAgcmV0dXJuIF9yZXN1bHRzOwogICAgfTsKICAgIF9zaWZ0ZG93biA9IGZ1bmN0aW9uIChhcnJheSwgc3RhcnRwb3MsIHBvcywgY21wKSB7CiAgICAgICAgdmFyIG5ld2l0ZW0sIHBhcmVudCwgcGFyZW50cG9zOwogICAgICAgIGlmIChjbXAgPT0gbnVsbCkgewogICAgICAgICAgICBjbXAgPSBkZWZhdWx0Q21wOwogICAgICAgIH0KICAgICAgICBuZXdpdGVtID0gYXJyYXlbcG9zXTsKICAgICAgICB3aGlsZSAocG9zID4gc3RhcnRwb3MpIHsKICAgICAgICAgICAgcGFyZW50cG9zID0gKHBvcyAtIDEpID4+IDE7CiAgICAgICAgICAgIHBhcmVudCA9IGFycmF5W3BhcmVudHBvc107CiAgICAgICAgICAgIGlmIChjbXAobmV3aXRlbSwgcGFyZW50KSA8IDApIHsKICAgICAgICAgICAgICAgIGFycmF5W3Bvc10gPSBwYXJlbnQ7CiAgICAgICAgICAgICAgICBwb3MgPSBwYXJlbnRwb3M7CiAgICAgICAgICAgICAgICBjb250aW51ZTsKICAgICAgICAgICAgfQogICAgICAgICAgICBicmVhazsKICAgICAgICB9CiAgICAgICAgcmV0dXJuIGFycmF5W3Bvc10gPSBuZXdpdGVtOwogICAgfTsKICAgIF9zaWZ0dXAgPSBmdW5jdGlvbiAoYXJyYXksIHBvcywgY21wKSB7CiAgICAgICAgdmFyIGNoaWxkcG9zLCBlbmRwb3MsIG5ld2l0ZW0sIHJpZ2h0cG9zLCBzdGFydHBvczsKICAgICAgICBpZiAoY21wID09IG51bGwpIHsKICAgICAgICAgICAgY21wID0gZGVmYXVsdENtcDsKICAgICAgICB9CiAgICAgICAgZW5kcG9zID0gYXJyYXkubGVuZ3RoOwogICAgICAgIHN0YXJ0cG9zID0gcG9zOwogICAgICAgIG5ld2l0ZW0gPSBhcnJheVtwb3NdOwogICAgICAgIGNoaWxkcG9zID0gMiAqIHBvcyArIDE7CiAgICAgICAgd2hpbGUgKGNoaWxkcG9zIDwgZW5kcG9zKSB7CiAgICAgICAgICAgIHJpZ2h0cG9zID0gY2hpbGRwb3MgKyAxOwogICAgICAgICAgICBpZiAocmlnaHRwb3MgPCBlbmRwb3MgJiYgIShjbXAoYXJyYXlbY2hpbGRwb3NdLCBhcnJheVtyaWdodHBvc10pIDwgMCkpIHsKICAgICAgICAgICAgICAgIGNoaWxkcG9zID0gcmlnaHRwb3M7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgYXJyYXlbcG9zXSA9IGFycmF5W2NoaWxkcG9zXTsKICAgICAgICAgICAgcG9zID0gY2hpbGRwb3M7CiAgICAgICAgICAgIGNoaWxkcG9zID0gMiAqIHBvcyArIDE7CiAgICAgICAgfQogICAgICAgIGFycmF5W3Bvc10gPSBuZXdpdGVtOwogICAgICAgIHJldHVybiBfc2lmdGRvd24oYXJyYXksIHN0YXJ0cG9zLCBwb3MsIGNtcCk7CiAgICB9OwogICAgSGVhcCA9IChmdW5jdGlvbiAoKSB7CiAgICAgICAgSGVhcC5wdXNoID0gaGVhcHB1c2g7CiAgICAgICAgSGVhcC5wb3AgPSBoZWFwcG9wOwogICAgICAgIEhlYXAucmVwbGFjZSA9IGhlYXByZXBsYWNlOwogICAgICAgIEhlYXAucHVzaHBvcCA9IGhlYXBwdXNocG9wOwogICAgICAgIEhlYXAuaGVhcGlmeSA9IGhlYXBpZnk7CiAgICAgICAgSGVhcC51cGRhdGVJdGVtID0gdXBkYXRlSXRlbTsKICAgICAgICBIZWFwLm5sYXJnZXN0ID0gbmxhcmdlc3Q7CiAgICAgICAgSGVhcC5uc21hbGxlc3QgPSBuc21hbGxlc3Q7CiAgICAgICAgZnVuY3Rpb24gSGVhcChjbXApIHsKICAgICAgICAgICAgdGhpcy5jbXAgPSBjbXAgIT0gbnVsbCA/IGNtcCA6IGRlZmF1bHRDbXA7CiAgICAgICAgICAgIHRoaXMubm9kZXMgPSBbXTsKICAgICAgICB9CiAgICAgICAgSGVhcC5wcm90b3R5cGUucHVzaCA9IGZ1bmN0aW9uICh4KSB7CiAgICAgICAgICAgIHJldHVybiBoZWFwcHVzaCh0aGlzLm5vZGVzLCB4LCB0aGlzLmNtcCk7CiAgICAgICAgfTsKICAgICAgICBIZWFwLnByb3RvdHlwZS5wb3AgPSBmdW5jdGlvbiAoKSB7CiAgICAgICAgICAgIHJldHVybiBoZWFwcG9wKHRoaXMubm9kZXMsIHRoaXMuY21wKTsKICAgICAgICB9OwogICAgICAgIEhlYXAucHJvdG90eXBlLnBlZWsgPSBmdW5jdGlvbiAoKSB7CiAgICAgICAgICAgIHJldHVybiB0aGlzLm5vZGVzWzBdOwogICAgICAgIH07CiAgICAgICAgSGVhcC5wcm90b3R5cGUuY29udGFpbnMgPSBmdW5jdGlvbiAoeCkgewogICAgICAgICAgICByZXR1cm4gdGhpcy5ub2Rlcy5pbmRleE9mKHgpICE9PSAtMTsKICAgICAgICB9OwogICAgICAgIEhlYXAucHJvdG90eXBlLnJlcGxhY2UgPSBmdW5jdGlvbiAoeCkgewogICAgICAgICAgICByZXR1cm4gaGVhcHJlcGxhY2UodGhpcy5ub2RlcywgeCwgdGhpcy5jbXApOwogICAgICAgIH07CiAgICAgICAgSGVhcC5wcm90b3R5cGUucHVzaHBvcCA9IGZ1bmN0aW9uICh4KSB7CiAgICAgICAgICAgIHJldHVybiBoZWFwcHVzaHBvcCh0aGlzLm5vZGVzLCB4LCB0aGlzLmNtcCk7CiAgICAgICAgfTsKICAgICAgICBIZWFwLnByb3RvdHlwZS5oZWFwaWZ5ID0gZnVuY3Rpb24gKCkgewogICAgICAgICAgICByZXR1cm4gaGVhcGlmeSh0aGlzLm5vZGVzLCB0aGlzLmNtcCk7CiAgICAgICAgfTsKICAgICAgICBIZWFwLnByb3RvdHlwZS51cGRhdGVJdGVtID0gZnVuY3Rpb24gKHgpIHsKICAgICAgICAgICAgcmV0dXJuIHVwZGF0ZUl0ZW0odGhpcy5ub2RlcywgeCwgdGhpcy5jbXApOwogICAgICAgIH07CiAgICAgICAgSGVhcC5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiAoKSB7CiAgICAgICAgICAgIHJldHVybiB0aGlzLm5vZGVzID0gW107CiAgICAgICAgfTsKICAgICAgICBIZWFwLnByb3RvdHlwZS5lbXB0eSA9IGZ1bmN0aW9uICgpIHsKICAgICAgICAgICAgcmV0dXJuIHRoaXMubm9kZXMubGVuZ3RoID09PSAwOwogICAgICAgIH07CiAgICAgICAgSGVhcC5wcm90b3R5cGUuc2l6ZSA9IGZ1bmN0aW9uICgpIHsKICAgICAgICAgICAgcmV0dXJuIHRoaXMubm9kZXMubGVuZ3RoOwogICAgICAgIH07CiAgICAgICAgSGVhcC5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbiAoKSB7CiAgICAgICAgICAgIHZhciBoZWFwOwogICAgICAgICAgICBoZWFwID0gbmV3IEhlYXAoKTsKICAgICAgICAgICAgaGVhcC5ub2RlcyA9IHRoaXMubm9kZXMuc2xpY2UoMCk7CiAgICAgICAgICAgIHJldHVybiBoZWFwOwogICAgICAgIH07CiAgICAgICAgSGVhcC5wcm90b3R5cGUudG9BcnJheSA9IGZ1bmN0aW9uICgpIHsKICAgICAgICAgICAgcmV0dXJuIHRoaXMubm9kZXMuc2xpY2UoMCk7CiAgICAgICAgfTsKICAgICAgICBIZWFwLnByb3RvdHlwZS5pbnNlcnQgPSBIZWFwLnByb3RvdHlwZS5wdXNoOwogICAgICAgIEhlYXAucHJvdG90eXBlLnRvcCA9IEhlYXAucHJvdG90eXBlLnBlZWs7CiAgICAgICAgSGVhcC5wcm90b3R5cGUuZnJvbnQgPSBIZWFwLnByb3RvdHlwZS5wZWVrOwogICAgICAgIEhlYXAucHJvdG90eXBlLmhhcyA9IEhlYXAucHJvdG90eXBlLmNvbnRhaW5zOwogICAgICAgIEhlYXAucHJvdG90eXBlLmNvcHkgPSBIZWFwLnByb3RvdHlwZS5jbG9uZTsKICAgICAgICByZXR1cm4gSGVhcDsKICAgIH0pKCk7CiAgICBpZiAodHlwZW9mIG1vZHVsZSAhPT0gInVuZGVmaW5lZCIgJiYgbW9kdWxlICE9PSBudWxsID8gbW9kdWxlLmV4cG9ydHMgOiB2b2lkIDApIHsKICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IEhlYXA7CiAgICB9CiAgICBlbHNlIHsKICAgICAgICB3aW5kb3cuSGVhcCA9IEhlYXA7CiAgICB9Cn0pLmNhbGwodGhpcyk7CgovKiBXRUJQQUNLIFZBUiBJTkpFQ1RJT04gKi99LmNhbGwodGhpcywgX193ZWJwYWNrX3JlcXVpcmVfXygyNCkobW9kdWxlKSkpCgovKioqLyB9KSwKLyogMjQgKi8KLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykgewoKbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobW9kdWxlKSB7CiAgICBpZiAoIW1vZHVsZS53ZWJwYWNrUG9seWZpbGwpIHsKICAgICAgICBtb2R1bGUuZGVwcmVjYXRlID0gZnVuY3Rpb24gKCkgeyB9OwogICAgICAgIG1vZHVsZS5wYXRocyA9IFtdOwogICAgICAgIC8vIG1vZHVsZS5wYXJlbnQgPSB1bmRlZmluZWQgYnkgZGVmYXVsdAogICAgICAgIGlmICghbW9kdWxlLmNoaWxkcmVuKQogICAgICAgICAgICBtb2R1bGUuY2hpbGRyZW4gPSBbXTsKICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kdWxlLCAibG9hZGVkIiwgewogICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLAogICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHsKICAgICAgICAgICAgICAgIHJldHVybiBtb2R1bGUubDsKICAgICAgICAgICAgfQogICAgICAgIH0pOwogICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsICJpZCIsIHsKICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSwKICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7CiAgICAgICAgICAgICAgICByZXR1cm4gbW9kdWxlLmk7CiAgICAgICAgICAgIH0KICAgICAgICB9KTsKICAgICAgICBtb2R1bGUud2VicGFja1BvbHlmaWxsID0gMTsKICAgIH0KICAgIHJldHVybiBtb2R1bGU7Cn07CgoKLyoqKi8gfSksCi8qIDI1ICovCi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHsKCnZhciBOb2RlID0gX193ZWJwYWNrX3JlcXVpcmVfXyg2KTsKdmFyIERpYWdvbmFsTW92ZW1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDApOwovKioKICogVGhlIEdyaWQgY2xhc3MsIHdoaWNoIHNlcnZlcyBhcyB0aGUgZW5jYXBzdWxhdGlvbiBvZiB0aGUgbGF5b3V0IG9mIHRoZSBub2Rlcy4KICogQGNvbnN0cnVjdG9yCiAqIEBwYXJhbSB7bnVtYmVyfEFycmF5PEFycmF5PChudW1iZXJ8Ym9vbGVhbik+Pn0gd2lkdGhfb3JfbWF0cml4IE51bWJlciBvZiBjb2x1bW5zIG9mIHRoZSBncmlkLCBvciBtYXRyaXgKICogQHBhcmFtIHtudW1iZXJ9IGhlaWdodCBOdW1iZXIgb2Ygcm93cyBvZiB0aGUgZ3JpZC4KICogQHBhcmFtIHtBcnJheTxBcnJheTwobnVtYmVyfGJvb2xlYW4pPj59IFttYXRyaXhdIC0gQSAwLTEgbWF0cml4CiAqICAgICByZXByZXNlbnRpbmcgdGhlIHdhbGthYmxlIHN0YXR1cyBvZiB0aGUgbm9kZXMoMCBvciBmYWxzZSBmb3Igd2Fsa2FibGUpLgogKiAgICAgSWYgdGhlIG1hdHJpeCBpcyBub3Qgc3VwcGxpZWQsIGFsbCB0aGUgbm9kZXMgd2lsbCBiZSB3YWxrYWJsZS4gICovCmZ1bmN0aW9uIEdyaWQod2lkdGhfb3JfbWF0cml4LCBoZWlnaHQsIG1hdHJpeCkgewogICAgdmFyIHdpZHRoOwogICAgaWYgKHR5cGVvZiB3aWR0aF9vcl9tYXRyaXggIT09ICdvYmplY3QnKSB7CiAgICAgICAgd2lkdGggPSB3aWR0aF9vcl9tYXRyaXg7CiAgICB9CiAgICBlbHNlIHsKICAgICAgICBoZWlnaHQgPSB3aWR0aF9vcl9tYXRyaXgubGVuZ3RoOwogICAgICAgIHdpZHRoID0gd2lkdGhfb3JfbWF0cml4WzBdLmxlbmd0aDsKICAgICAgICBtYXRyaXggPSB3aWR0aF9vcl9tYXRyaXg7CiAgICB9CiAgICAvKioKICAgICAqIFRoZSBudW1iZXIgb2YgY29sdW1ucyBvZiB0aGUgZ3JpZC4KICAgICAqIEB0eXBlIG51bWJlcgogICAgICovCiAgICB0aGlzLndpZHRoID0gd2lkdGg7CiAgICAvKioKICAgICAqIFRoZSBudW1iZXIgb2Ygcm93cyBvZiB0aGUgZ3JpZC4KICAgICAqIEB0eXBlIG51bWJlcgogICAgICovCiAgICB0aGlzLmhlaWdodCA9IGhlaWdodDsKICAgIC8qKgogICAgICogQSAyRCBhcnJheSBvZiBub2Rlcy4KICAgICAqLwogICAgdGhpcy5ub2RlcyA9IHRoaXMuX2J1aWxkTm9kZXMod2lkdGgsIGhlaWdodCwgbWF0cml4KTsKfQovKioKICogQnVpbGQgYW5kIHJldHVybiB0aGUgbm9kZXMuCiAqIEBwcml2YXRlCiAqIEBwYXJhbSB7bnVtYmVyfSB3aWR0aAogKiBAcGFyYW0ge251bWJlcn0gaGVpZ2h0CiAqIEBwYXJhbSB7QXJyYXk8QXJyYXk8bnVtYmVyfGJvb2xlYW4+Pn0gW21hdHJpeF0gLSBBIDAtMSBtYXRyaXggcmVwcmVzZW50aW5nCiAqICAgICB0aGUgd2Fsa2FibGUgc3RhdHVzIG9mIHRoZSBub2Rlcy4KICogQHNlZSBHcmlkCiAqLwpHcmlkLnByb3RvdHlwZS5fYnVpbGROb2RlcyA9IGZ1bmN0aW9uICh3aWR0aCwgaGVpZ2h0LCBtYXRyaXgpIHsKICAgIHZhciBpLCBqLCBub2RlcyA9IG5ldyBBcnJheShoZWlnaHQpOwogICAgZm9yIChpID0gMDsgaSA8IGhlaWdodDsgKytpKSB7CiAgICAgICAgbm9kZXNbaV0gPSBuZXcgQXJyYXkod2lkdGgpOwogICAgICAgIGZvciAoaiA9IDA7IGogPCB3aWR0aDsgKytqKSB7CiAgICAgICAgICAgIG5vZGVzW2ldW2pdID0gbmV3IE5vZGUoaiwgaSk7CiAgICAgICAgfQogICAgfQogICAgaWYgKG1hdHJpeCA9PT0gdW5kZWZpbmVkKSB7CiAgICAgICAgcmV0dXJuIG5vZGVzOwogICAgfQogICAgaWYgKG1hdHJpeC5sZW5ndGggIT09IGhlaWdodCB8fCBtYXRyaXhbMF0ubGVuZ3RoICE9PSB3aWR0aCkgewogICAgICAgIHRocm93IG5ldyBFcnJvcignTWF0cml4IHNpemUgZG9lcyBub3QgZml0Jyk7CiAgICB9CiAgICBmb3IgKGkgPSAwOyBpIDwgaGVpZ2h0OyArK2kpIHsKICAgICAgICBmb3IgKGogPSAwOyBqIDwgd2lkdGg7ICsraikgewogICAgICAgICAgICBpZiAobWF0cml4W2ldW2pdKSB7CiAgICAgICAgICAgICAgICAvLyAwLCBmYWxzZSwgbnVsbCB3aWxsIGJlIHdhbGthYmxlCiAgICAgICAgICAgICAgICAvLyB3aGlsZSBvdGhlcnMgd2lsbCBiZSB1bi13YWxrYWJsZQogICAgICAgICAgICAgICAgbm9kZXNbaV1bal0ud2Fsa2FibGUgPSBmYWxzZTsKICAgICAgICAgICAgfQogICAgICAgIH0KICAgIH0KICAgIHJldHVybiBub2RlczsKfTsKR3JpZC5wcm90b3R5cGUuZ2V0Tm9kZUF0ID0gZnVuY3Rpb24gKHgsIHkpIHsKICAgIHJldHVybiB0aGlzLm5vZGVzW3ldW3hdOwp9OwovKioKICogRGV0ZXJtaW5lIHdoZXRoZXIgdGhlIG5vZGUgYXQgdGhlIGdpdmVuIHBvc2l0aW9uIGlzIHdhbGthYmxlLgogKiAoQWxzbyByZXR1cm5zIGZhbHNlIGlmIHRoZSBwb3NpdGlvbiBpcyBvdXRzaWRlIHRoZSBncmlkLikKICogQHBhcmFtIHtudW1iZXJ9IHggLSBUaGUgeCBjb29yZGluYXRlIG9mIHRoZSBub2RlLgogKiBAcGFyYW0ge251bWJlcn0geSAtIFRoZSB5IGNvb3JkaW5hdGUgb2YgdGhlIG5vZGUuCiAqIEByZXR1cm4ge2Jvb2xlYW59IC0gVGhlIHdhbGthYmlsaXR5IG9mIHRoZSBub2RlLgogKi8KR3JpZC5wcm90b3R5cGUuaXNXYWxrYWJsZUF0ID0gZnVuY3Rpb24gKHgsIHkpIHsKICAgIHJldHVybiB0aGlzLmlzSW5zaWRlKHgsIHkpICYmIHRoaXMubm9kZXNbeV1beF0ud2Fsa2FibGU7Cn07Ci8qKgogKiBEZXRlcm1pbmUgd2hldGhlciB0aGUgcG9zaXRpb24gaXMgaW5zaWRlIHRoZSBncmlkLgogKiBYWFg6IGBncmlkLmlzSW5zaWRlKHgsIHkpYCBpcyB3aWVyZCB0byByZWFkLgogKiBJdCBzaG91bGQgYmUgYCh4LCB5KSBpcyBpbnNpZGUgZ3JpZGAsIGJ1dCBJIGZhaWxlZCB0byBmaW5kIGEgYmV0dGVyCiAqIG5hbWUgZm9yIHRoaXMgbWV0aG9kLgogKiBAcGFyYW0ge251bWJlcn0geAogKiBAcGFyYW0ge251bWJlcn0geQogKiBAcmV0dXJuIHtib29sZWFufQogKi8KR3JpZC5wcm90b3R5cGUuaXNJbnNpZGUgPSBmdW5jdGlvbiAoeCwgeSkgewogICAgcmV0dXJuICh4ID49IDAgJiYgeCA8IHRoaXMud2lkdGgpICYmICh5ID49IDAgJiYgeSA8IHRoaXMuaGVpZ2h0KTsKfTsKLyoqCiAqIFNldCB3aGV0aGVyIHRoZSBub2RlIG9uIHRoZSBnaXZlbiBwb3NpdGlvbiBpcyB3YWxrYWJsZS4KICogTk9URTogdGhyb3dzIGV4Y2VwdGlvbiBpZiB0aGUgY29vcmRpbmF0ZSBpcyBub3QgaW5zaWRlIHRoZSBncmlkLgogKiBAcGFyYW0ge251bWJlcn0geCAtIFRoZSB4IGNvb3JkaW5hdGUgb2YgdGhlIG5vZGUuCiAqIEBwYXJhbSB7bnVtYmVyfSB5IC0gVGhlIHkgY29vcmRpbmF0ZSBvZiB0aGUgbm9kZS4KICogQHBhcmFtIHtib29sZWFufSB3YWxrYWJsZSAtIFdoZXRoZXIgdGhlIHBvc2l0aW9uIGlzIHdhbGthYmxlLgogKi8KR3JpZC5wcm90b3R5cGUuc2V0V2Fsa2FibGVBdCA9IGZ1bmN0aW9uICh4LCB5LCB3YWxrYWJsZSkgewogICAgdGhpcy5ub2Rlc1t5XVt4XS53YWxrYWJsZSA9IHdhbGthYmxlOwp9OwovKioKICogR2V0IHRoZSBuZWlnaGJvcnMgb2YgdGhlIGdpdmVuIG5vZGUuCiAqCiAqICAgICBvZmZzZXRzICAgICAgZGlhZ29uYWxPZmZzZXRzOgogKiAgKy0tLSstLS0rLS0tKyAgICArLS0tKy0tLSstLS0rCiAqICB8ICAgfCAwIHwgICB8ICAgIHwgMCB8ICAgfCAxIHwKICogICstLS0rLS0tKy0tLSsgICAgKy0tLSstLS0rLS0tKwogKiAgfCAzIHwgICB8IDEgfCAgICB8ICAgfCAgIHwgICB8CiAqICArLS0tKy0tLSstLS0rICAgICstLS0rLS0tKy0tLSsKICogIHwgICB8IDIgfCAgIHwgICAgfCAzIHwgICB8IDIgfAogKiAgKy0tLSstLS0rLS0tKyAgICArLS0tKy0tLSstLS0rCiAqCiAqICBXaGVuIGFsbG93RGlhZ29uYWwgaXMgdHJ1ZSwgaWYgb2Zmc2V0c1tpXSBpcyB2YWxpZCwgdGhlbgogKiAgZGlhZ29uYWxPZmZzZXRzW2ldIGFuZAogKiAgZGlhZ29uYWxPZmZzZXRzWyhpICsgMSkgJSA0XSBpcyB2YWxpZC4KICogQHBhcmFtIHtOb2RlfSBub2RlCiAqIEBwYXJhbSB7RGlhZ29uYWxNb3ZlbWVudH0gZGlhZ29uYWxNb3ZlbWVudAogKi8KR3JpZC5wcm90b3R5cGUuZ2V0TmVpZ2hib3JzID0gZnVuY3Rpb24gKG5vZGUsIGRpYWdvbmFsTW92ZW1lbnQpIHsKICAgIHZhciB4ID0gbm9kZS54LCB5ID0gbm9kZS55LCBuZWlnaGJvcnMgPSBbXSwgczAgPSBmYWxzZSwgZDAgPSBmYWxzZSwgczEgPSBmYWxzZSwgZDEgPSBmYWxzZSwgczIgPSBmYWxzZSwgZDIgPSBmYWxzZSwgczMgPSBmYWxzZSwgZDMgPSBmYWxzZSwgbm9kZXMgPSB0aGlzLm5vZGVzOwogICAgLy8g4oaRCiAgICBpZiAodGhpcy5pc1dhbGthYmxlQXQoeCwgeSAtIDEpKSB7CiAgICAgICAgbmVpZ2hib3JzLnB1c2gobm9kZXNbeSAtIDFdW3hdKTsKICAgICAgICBzMCA9IHRydWU7CiAgICB9CiAgICAvLyDihpIKICAgIGlmICh0aGlzLmlzV2Fsa2FibGVBdCh4ICsgMSwgeSkpIHsKICAgICAgICBuZWlnaGJvcnMucHVzaChub2Rlc1t5XVt4ICsgMV0pOwogICAgICAgIHMxID0gdHJ1ZTsKICAgIH0KICAgIC8vIOKGkwogICAgaWYgKHRoaXMuaXNXYWxrYWJsZUF0KHgsIHkgKyAxKSkgewogICAgICAgIG5laWdoYm9ycy5wdXNoKG5vZGVzW3kgKyAxXVt4XSk7CiAgICAgICAgczIgPSB0cnVlOwogICAgfQogICAgLy8g4oaQCiAgICBpZiAodGhpcy5pc1dhbGthYmxlQXQoeCAtIDEsIHkpKSB7CiAgICAgICAgbmVpZ2hib3JzLnB1c2gobm9kZXNbeV1beCAtIDFdKTsKICAgICAgICBzMyA9IHRydWU7CiAgICB9CiAgICBpZiAoZGlhZ29uYWxNb3ZlbWVudCA9PT0gRGlhZ29uYWxNb3ZlbWVudC5OZXZlcikgewogICAgICAgIHJldHVybiBuZWlnaGJvcnM7CiAgICB9CiAgICBpZiAoZGlhZ29uYWxNb3ZlbWVudCA9PT0gRGlhZ29uYWxNb3ZlbWVudC5Pbmx5V2hlbk5vT2JzdGFjbGVzKSB7CiAgICAgICAgZDAgPSBzMyAmJiBzMDsKICAgICAgICBkMSA9IHMwICYmIHMxOwogICAgICAgIGQyID0gczEgJiYgczI7CiAgICAgICAgZDMgPSBzMiAmJiBzMzsKICAgIH0KICAgIGVsc2UgaWYgKGRpYWdvbmFsTW92ZW1lbnQgPT09IERpYWdvbmFsTW92ZW1lbnQuSWZBdE1vc3RPbmVPYnN0YWNsZSkgewogICAgICAgIGQwID0gczMgfHwgczA7CiAgICAgICAgZDEgPSBzMCB8fCBzMTsKICAgICAgICBkMiA9IHMxIHx8IHMyOwogICAgICAgIGQzID0gczIgfHwgczM7CiAgICB9CiAgICBlbHNlIGlmIChkaWFnb25hbE1vdmVtZW50ID09PSBEaWFnb25hbE1vdmVtZW50LkFsd2F5cykgewogICAgICAgIGQwID0gdHJ1ZTsKICAgICAgICBkMSA9IHRydWU7CiAgICAgICAgZDIgPSB0cnVlOwogICAgICAgIGQzID0gdHJ1ZTsKICAgIH0KICAgIGVsc2UgewogICAgICAgIHRocm93IG5ldyBFcnJvcignSW5jb3JyZWN0IHZhbHVlIG9mIGRpYWdvbmFsTW92ZW1lbnQnKTsKICAgIH0KICAgIC8vIOKGlgogICAgaWYgKGQwICYmIHRoaXMuaXNXYWxrYWJsZUF0KHggLSAxLCB5IC0gMSkpIHsKICAgICAgICBuZWlnaGJvcnMucHVzaChub2Rlc1t5IC0gMV1beCAtIDFdKTsKICAgIH0KICAgIC8vIOKGlwogICAgaWYgKGQxICYmIHRoaXMuaXNXYWxrYWJsZUF0KHggKyAxLCB5IC0gMSkpIHsKICAgICAgICBuZWlnaGJvcnMucHVzaChub2Rlc1t5IC0gMV1beCArIDFdKTsKICAgIH0KICAgIC8vIOKGmAogICAgaWYgKGQyICYmIHRoaXMuaXNXYWxrYWJsZUF0KHggKyAxLCB5ICsgMSkpIHsKICAgICAgICBuZWlnaGJvcnMucHVzaChub2Rlc1t5ICsgMV1beCArIDFdKTsKICAgIH0KICAgIC8vIOKGmQogICAgaWYgKGQzICYmIHRoaXMuaXNXYWxrYWJsZUF0KHggLSAxLCB5ICsgMSkpIHsKICAgICAgICBuZWlnaGJvcnMucHVzaChub2Rlc1t5ICsgMV1beCAtIDFdKTsKICAgIH0KICAgIHJldHVybiBuZWlnaGJvcnM7Cn07Ci8qKgogKiBHZXQgYSBjbG9uZSBvZiB0aGlzIGdyaWQuCiAqIEByZXR1cm4ge0dyaWR9IENsb25lZCBncmlkLgogKi8KR3JpZC5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbiAoKSB7CiAgICB2YXIgaSwgaiwgd2lkdGggPSB0aGlzLndpZHRoLCBoZWlnaHQgPSB0aGlzLmhlaWdodCwgdGhpc05vZGVzID0gdGhpcy5ub2RlcywgbmV3R3JpZCA9IG5ldyBHcmlkKHdpZHRoLCBoZWlnaHQpLCBuZXdOb2RlcyA9IG5ldyBBcnJheShoZWlnaHQpOwogICAgZm9yIChpID0gMDsgaSA8IGhlaWdodDsgKytpKSB7CiAgICAgICAgbmV3Tm9kZXNbaV0gPSBuZXcgQXJyYXkod2lkdGgpOwogICAgICAgIGZvciAoaiA9IDA7IGogPCB3aWR0aDsgKytqKSB7CiAgICAgICAgICAgIG5ld05vZGVzW2ldW2pdID0gbmV3IE5vZGUoaiwgaSwgdGhpc05vZGVzW2ldW2pdLndhbGthYmxlKTsKICAgICAgICB9CiAgICB9CiAgICBuZXdHcmlkLm5vZGVzID0gbmV3Tm9kZXM7CiAgICByZXR1cm4gbmV3R3JpZDsKfTsKbW9kdWxlLmV4cG9ydHMgPSBHcmlkOwoKCi8qKiovIH0pLAovKiAyNiAqLwovKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7Cgp2YXIgQVN0YXJGaW5kZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDcpOwovKioKICogQmVzdC1GaXJzdC1TZWFyY2ggcGF0aC1maW5kZXIuCiAqIEBjb25zdHJ1Y3RvcgogKiBAZXh0ZW5kcyBBU3RhckZpbmRlcgogKiBAcGFyYW0ge09iamVjdH0gb3B0CiAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0LmFsbG93RGlhZ29uYWwgV2hldGhlciBkaWFnb25hbCBtb3ZlbWVudCBpcyBhbGxvd2VkLgogKiAgICAgRGVwcmVjYXRlZCwgdXNlIGRpYWdvbmFsTW92ZW1lbnQgaW5zdGVhZC4KICogQHBhcmFtIHtib29sZWFufSBvcHQuZG9udENyb3NzQ29ybmVycyBEaXNhbGxvdyBkaWFnb25hbCBtb3ZlbWVudCB0b3VjaGluZwogKiAgICAgYmxvY2sgY29ybmVycy4gRGVwcmVjYXRlZCwgdXNlIGRpYWdvbmFsTW92ZW1lbnQgaW5zdGVhZC4KICogQHBhcmFtIHtEaWFnb25hbE1vdmVtZW50fSBvcHQuZGlhZ29uYWxNb3ZlbWVudCBBbGxvd2VkIGRpYWdvbmFsIG1vdmVtZW50LgogKiBAcGFyYW0ge2Z1bmN0aW9ufSBvcHQuaGV1cmlzdGljIEhldXJpc3RpYyBmdW5jdGlvbiB0byBlc3RpbWF0ZSB0aGUgZGlzdGFuY2UKICogICAgIChkZWZhdWx0cyB0byBtYW5oYXR0YW4pLgogKi8KZnVuY3Rpb24gQmVzdEZpcnN0RmluZGVyKG9wdCkgewogICAgQVN0YXJGaW5kZXIuY2FsbCh0aGlzLCBvcHQpOwogICAgdmFyIG9yaWcgPSB0aGlzLmhldXJpc3RpYzsKICAgIHRoaXMuaGV1cmlzdGljID0gZnVuY3Rpb24gKGR4LCBkeSkgewogICAgICAgIHJldHVybiBvcmlnKGR4LCBkeSkgKiAxMDAwMDAwOwogICAgfTsKfQpCZXN0Rmlyc3RGaW5kZXIucHJvdG90eXBlID0gbmV3IEFTdGFyRmluZGVyKCk7CkJlc3RGaXJzdEZpbmRlci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBCZXN0Rmlyc3RGaW5kZXI7Cm1vZHVsZS5leHBvcnRzID0gQmVzdEZpcnN0RmluZGVyOwoKCi8qKiovIH0pLAovKiAyNyAqLwovKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7Cgp2YXIgVXRpbCA9IF9fd2VicGFja19yZXF1aXJlX18oMSk7CnZhciBEaWFnb25hbE1vdmVtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXygwKTsKLyoqCiAqIEJyZWFkdGgtRmlyc3QtU2VhcmNoIHBhdGggZmluZGVyLgogKiBAY29uc3RydWN0b3IKICogQHBhcmFtIHtPYmplY3R9IG9wdAogKiBAcGFyYW0ge2Jvb2xlYW59IG9wdC5hbGxvd0RpYWdvbmFsIFdoZXRoZXIgZGlhZ29uYWwgbW92ZW1lbnQgaXMgYWxsb3dlZC4KICogICAgIERlcHJlY2F0ZWQsIHVzZSBkaWFnb25hbE1vdmVtZW50IGluc3RlYWQuCiAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0LmRvbnRDcm9zc0Nvcm5lcnMgRGlzYWxsb3cgZGlhZ29uYWwgbW92ZW1lbnQgdG91Y2hpbmcKICogICAgIGJsb2NrIGNvcm5lcnMuIERlcHJlY2F0ZWQsIHVzZSBkaWFnb25hbE1vdmVtZW50IGluc3RlYWQuCiAqIEBwYXJhbSB7RGlhZ29uYWxNb3ZlbWVudH0gb3B0LmRpYWdvbmFsTW92ZW1lbnQgQWxsb3dlZCBkaWFnb25hbCBtb3ZlbWVudC4KICovCmZ1bmN0aW9uIEJyZWFkdGhGaXJzdEZpbmRlcihvcHQpIHsKICAgIG9wdCA9IG9wdCB8fCB7fTsKICAgIHRoaXMuYWxsb3dEaWFnb25hbCA9IG9wdC5hbGxvd0RpYWdvbmFsOwogICAgdGhpcy5kb250Q3Jvc3NDb3JuZXJzID0gb3B0LmRvbnRDcm9zc0Nvcm5lcnM7CiAgICB0aGlzLmRpYWdvbmFsTW92ZW1lbnQgPSBvcHQuZGlhZ29uYWxNb3ZlbWVudDsKICAgIGlmICghdGhpcy5kaWFnb25hbE1vdmVtZW50KSB7CiAgICAgICAgaWYgKCF0aGlzLmFsbG93RGlhZ29uYWwpIHsKICAgICAgICAgICAgdGhpcy5kaWFnb25hbE1vdmVtZW50ID0gRGlhZ29uYWxNb3ZlbWVudC5OZXZlcjsKICAgICAgICB9CiAgICAgICAgZWxzZSB7CiAgICAgICAgICAgIGlmICh0aGlzLmRvbnRDcm9zc0Nvcm5lcnMpIHsKICAgICAgICAgICAgICAgIHRoaXMuZGlhZ29uYWxNb3ZlbWVudCA9IERpYWdvbmFsTW92ZW1lbnQuT25seVdoZW5Ob09ic3RhY2xlczsKICAgICAgICAgICAgfQogICAgICAgICAgICBlbHNlIHsKICAgICAgICAgICAgICAgIHRoaXMuZGlhZ29uYWxNb3ZlbWVudCA9IERpYWdvbmFsTW92ZW1lbnQuSWZBdE1vc3RPbmVPYnN0YWNsZTsKICAgICAgICAgICAgfQogICAgICAgIH0KICAgIH0KfQovKioKICogRmluZCBhbmQgcmV0dXJuIHRoZSB0aGUgcGF0aC4KICogQHJldHVybiB7QXJyYXk8QXJyYXk8bnVtYmVyPj59IFRoZSBwYXRoLCBpbmNsdWRpbmcgYm90aCBzdGFydCBhbmQKICogICAgIGVuZCBwb3NpdGlvbnMuCiAqLwpCcmVhZHRoRmlyc3RGaW5kZXIucHJvdG90eXBlLmZpbmRQYXRoID0gZnVuY3Rpb24gKHN0YXJ0WCwgc3RhcnRZLCBlbmRYLCBlbmRZLCBncmlkKSB7CiAgICB2YXIgb3Blbkxpc3QgPSBbXSwgZGlhZ29uYWxNb3ZlbWVudCA9IHRoaXMuZGlhZ29uYWxNb3ZlbWVudCwgc3RhcnROb2RlID0gZ3JpZC5nZXROb2RlQXQoc3RhcnRYLCBzdGFydFkpLCBlbmROb2RlID0gZ3JpZC5nZXROb2RlQXQoZW5kWCwgZW5kWSksIG5laWdoYm9ycywgbmVpZ2hib3IsIG5vZGUsIGksIGw7CiAgICAvLyBwdXNoIHRoZSBzdGFydCBwb3MgaW50byB0aGUgcXVldWUKICAgIG9wZW5MaXN0LnB1c2goc3RhcnROb2RlKTsKICAgIHN0YXJ0Tm9kZS5vcGVuZWQgPSB0cnVlOwogICAgLy8gd2hpbGUgdGhlIHF1ZXVlIGlzIG5vdCBlbXB0eQogICAgd2hpbGUgKG9wZW5MaXN0Lmxlbmd0aCkgewogICAgICAgIC8vIHRha2UgdGhlIGZyb250IG5vZGUgZnJvbSB0aGUgcXVldWUKICAgICAgICBub2RlID0gb3Blbkxpc3Quc2hpZnQoKTsKICAgICAgICBub2RlLmNsb3NlZCA9IHRydWU7CiAgICAgICAgLy8gcmVhY2hlZCB0aGUgZW5kIHBvc2l0aW9uCiAgICAgICAgaWYgKG5vZGUgPT09IGVuZE5vZGUpIHsKICAgICAgICAgICAgcmV0dXJuIFV0aWwuYmFja3RyYWNlKGVuZE5vZGUpOwogICAgICAgIH0KICAgICAgICBuZWlnaGJvcnMgPSBncmlkLmdldE5laWdoYm9ycyhub2RlLCBkaWFnb25hbE1vdmVtZW50KTsKICAgICAgICBmb3IgKGkgPSAwLCBsID0gbmVpZ2hib3JzLmxlbmd0aDsgaSA8IGw7ICsraSkgewogICAgICAgICAgICBuZWlnaGJvciA9IG5laWdoYm9yc1tpXTsKICAgICAgICAgICAgLy8gc2tpcCB0aGlzIG5laWdoYm9yIGlmIGl0IGhhcyBiZWVuIGluc3BlY3RlZCBiZWZvcmUKICAgICAgICAgICAgaWYgKG5laWdoYm9yLmNsb3NlZCB8fCBuZWlnaGJvci5vcGVuZWQpIHsKICAgICAgICAgICAgICAgIGNvbnRpbnVlOwogICAgICAgICAgICB9CiAgICAgICAgICAgIG9wZW5MaXN0LnB1c2gobmVpZ2hib3IpOwogICAgICAgICAgICBuZWlnaGJvci5vcGVuZWQgPSB0cnVlOwogICAgICAgICAgICBuZWlnaGJvci5wYXJlbnQgPSBub2RlOwogICAgICAgIH0KICAgIH0KICAgIC8vIGZhaWwgdG8gZmluZCB0aGUgcGF0aAogICAgcmV0dXJuIFtdOwp9Owptb2R1bGUuZXhwb3J0cyA9IEJyZWFkdGhGaXJzdEZpbmRlcjsKCgovKioqLyB9KSwKLyogMjggKi8KLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykgewoKdmFyIEFTdGFyRmluZGVyID0gX193ZWJwYWNrX3JlcXVpcmVfXyg3KTsKLyoqCiAqIERpamtzdHJhIHBhdGgtZmluZGVyLgogKiBAY29uc3RydWN0b3IKICogQGV4dGVuZHMgQVN0YXJGaW5kZXIKICogQHBhcmFtIHtPYmplY3R9IG9wdAogKiBAcGFyYW0ge2Jvb2xlYW59IG9wdC5hbGxvd0RpYWdvbmFsIFdoZXRoZXIgZGlhZ29uYWwgbW92ZW1lbnQgaXMgYWxsb3dlZC4KICogICAgIERlcHJlY2F0ZWQsIHVzZSBkaWFnb25hbE1vdmVtZW50IGluc3RlYWQuCiAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0LmRvbnRDcm9zc0Nvcm5lcnMgRGlzYWxsb3cgZGlhZ29uYWwgbW92ZW1lbnQgdG91Y2hpbmcKICogICAgIGJsb2NrIGNvcm5lcnMuIERlcHJlY2F0ZWQsIHVzZSBkaWFnb25hbE1vdmVtZW50IGluc3RlYWQuCiAqIEBwYXJhbSB7RGlhZ29uYWxNb3ZlbWVudH0gb3B0LmRpYWdvbmFsTW92ZW1lbnQgQWxsb3dlZCBkaWFnb25hbCBtb3ZlbWVudC4KICovCmZ1bmN0aW9uIERpamtzdHJhRmluZGVyKG9wdCkgewogICAgQVN0YXJGaW5kZXIuY2FsbCh0aGlzLCBvcHQpOwogICAgdGhpcy5oZXVyaXN0aWMgPSBmdW5jdGlvbiAoZHgsIGR5KSB7CiAgICAgICAgcmV0dXJuIDA7CiAgICB9Owp9CkRpamtzdHJhRmluZGVyLnByb3RvdHlwZSA9IG5ldyBBU3RhckZpbmRlcigpOwpEaWprc3RyYUZpbmRlci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBEaWprc3RyYUZpbmRlcjsKbW9kdWxlLmV4cG9ydHMgPSBEaWprc3RyYUZpbmRlcjsKCgovKioqLyB9KSwKLyogMjkgKi8KLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykgewoKdmFyIEJpQVN0YXJGaW5kZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDgpOwovKioKICogQmktZGlyZWNpdGlvbmFsIEJlc3QtRmlyc3QtU2VhcmNoIHBhdGgtZmluZGVyLgogKiBAY29uc3RydWN0b3IKICogQGV4dGVuZHMgQmlBU3RhckZpbmRlcgogKiBAcGFyYW0ge09iamVjdH0gb3B0CiAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0LmFsbG93RGlhZ29uYWwgV2hldGhlciBkaWFnb25hbCBtb3ZlbWVudCBpcyBhbGxvd2VkLgogKiAgICAgRGVwcmVjYXRlZCwgdXNlIGRpYWdvbmFsTW92ZW1lbnQgaW5zdGVhZC4KICogQHBhcmFtIHtib29sZWFufSBvcHQuZG9udENyb3NzQ29ybmVycyBEaXNhbGxvdyBkaWFnb25hbCBtb3ZlbWVudCB0b3VjaGluZwogKiAgICAgYmxvY2sgY29ybmVycy4gRGVwcmVjYXRlZCwgdXNlIGRpYWdvbmFsTW92ZW1lbnQgaW5zdGVhZC4KICogQHBhcmFtIHtEaWFnb25hbE1vdmVtZW50fSBvcHQuZGlhZ29uYWxNb3ZlbWVudCBBbGxvd2VkIGRpYWdvbmFsIG1vdmVtZW50LgogKiBAcGFyYW0ge2Z1bmN0aW9ufSBvcHQuaGV1cmlzdGljIEhldXJpc3RpYyBmdW5jdGlvbiB0byBlc3RpbWF0ZSB0aGUgZGlzdGFuY2UKICogICAgIChkZWZhdWx0cyB0byBtYW5oYXR0YW4pLgogKi8KZnVuY3Rpb24gQmlCZXN0Rmlyc3RGaW5kZXIob3B0KSB7CiAgICBCaUFTdGFyRmluZGVyLmNhbGwodGhpcywgb3B0KTsKICAgIHZhciBvcmlnID0gdGhpcy5oZXVyaXN0aWM7CiAgICB0aGlzLmhldXJpc3RpYyA9IGZ1bmN0aW9uIChkeCwgZHkpIHsKICAgICAgICByZXR1cm4gb3JpZyhkeCwgZHkpICogMTAwMDAwMDsKICAgIH07Cn0KQmlCZXN0Rmlyc3RGaW5kZXIucHJvdG90eXBlID0gbmV3IEJpQVN0YXJGaW5kZXIoKTsKQmlCZXN0Rmlyc3RGaW5kZXIucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQmlCZXN0Rmlyc3RGaW5kZXI7Cm1vZHVsZS5leHBvcnRzID0gQmlCZXN0Rmlyc3RGaW5kZXI7CgoKLyoqKi8gfSksCi8qIDMwICovCi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHsKCnZhciBVdGlsID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKTsKdmFyIERpYWdvbmFsTW92ZW1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDApOwovKioKICogQmktZGlyZWN0aW9uYWwgQnJlYWR0aC1GaXJzdC1TZWFyY2ggcGF0aCBmaW5kZXIuCiAqIEBjb25zdHJ1Y3RvcgogKiBAcGFyYW0ge29iamVjdH0gb3B0CiAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0LmFsbG93RGlhZ29uYWwgV2hldGhlciBkaWFnb25hbCBtb3ZlbWVudCBpcyBhbGxvd2VkLgogKiAgICAgRGVwcmVjYXRlZCwgdXNlIGRpYWdvbmFsTW92ZW1lbnQgaW5zdGVhZC4KICogQHBhcmFtIHtib29sZWFufSBvcHQuZG9udENyb3NzQ29ybmVycyBEaXNhbGxvdyBkaWFnb25hbCBtb3ZlbWVudCB0b3VjaGluZwogKiAgICAgYmxvY2sgY29ybmVycy4gRGVwcmVjYXRlZCwgdXNlIGRpYWdvbmFsTW92ZW1lbnQgaW5zdGVhZC4KICogQHBhcmFtIHtEaWFnb25hbE1vdmVtZW50fSBvcHQuZGlhZ29uYWxNb3ZlbWVudCBBbGxvd2VkIGRpYWdvbmFsIG1vdmVtZW50LgogKi8KZnVuY3Rpb24gQmlCcmVhZHRoRmlyc3RGaW5kZXIob3B0KSB7CiAgICBvcHQgPSBvcHQgfHwge307CiAgICB0aGlzLmFsbG93RGlhZ29uYWwgPSBvcHQuYWxsb3dEaWFnb25hbDsKICAgIHRoaXMuZG9udENyb3NzQ29ybmVycyA9IG9wdC5kb250Q3Jvc3NDb3JuZXJzOwogICAgdGhpcy5kaWFnb25hbE1vdmVtZW50ID0gb3B0LmRpYWdvbmFsTW92ZW1lbnQ7CiAgICBpZiAoIXRoaXMuZGlhZ29uYWxNb3ZlbWVudCkgewogICAgICAgIGlmICghdGhpcy5hbGxvd0RpYWdvbmFsKSB7CiAgICAgICAgICAgIHRoaXMuZGlhZ29uYWxNb3ZlbWVudCA9IERpYWdvbmFsTW92ZW1lbnQuTmV2ZXI7CiAgICAgICAgfQogICAgICAgIGVsc2UgewogICAgICAgICAgICBpZiAodGhpcy5kb250Q3Jvc3NDb3JuZXJzKSB7CiAgICAgICAgICAgICAgICB0aGlzLmRpYWdvbmFsTW92ZW1lbnQgPSBEaWFnb25hbE1vdmVtZW50Lk9ubHlXaGVuTm9PYnN0YWNsZXM7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgZWxzZSB7CiAgICAgICAgICAgICAgICB0aGlzLmRpYWdvbmFsTW92ZW1lbnQgPSBEaWFnb25hbE1vdmVtZW50LklmQXRNb3N0T25lT2JzdGFjbGU7CiAgICAgICAgICAgIH0KICAgICAgICB9CiAgICB9Cn0KLyoqCiAqIEZpbmQgYW5kIHJldHVybiB0aGUgdGhlIHBhdGguCiAqIEByZXR1cm4ge0FycmF5PEFycmF5PG51bWJlcj4+fSBUaGUgcGF0aCwgaW5jbHVkaW5nIGJvdGggc3RhcnQgYW5kCiAqICAgICBlbmQgcG9zaXRpb25zLgogKi8KQmlCcmVhZHRoRmlyc3RGaW5kZXIucHJvdG90eXBlLmZpbmRQYXRoID0gZnVuY3Rpb24gKHN0YXJ0WCwgc3RhcnRZLCBlbmRYLCBlbmRZLCBncmlkKSB7CiAgICB2YXIgc3RhcnROb2RlID0gZ3JpZC5nZXROb2RlQXQoc3RhcnRYLCBzdGFydFkpLCBlbmROb2RlID0gZ3JpZC5nZXROb2RlQXQoZW5kWCwgZW5kWSksIHN0YXJ0T3Blbkxpc3QgPSBbXSwgZW5kT3Blbkxpc3QgPSBbXSwgbmVpZ2hib3JzLCBuZWlnaGJvciwgbm9kZSwgZGlhZ29uYWxNb3ZlbWVudCA9IHRoaXMuZGlhZ29uYWxNb3ZlbWVudCwgQllfU1RBUlQgPSAwLCBCWV9FTkQgPSAxLCBpLCBsOwogICAgLy8gcHVzaCB0aGUgc3RhcnQgYW5kIGVuZCBub2RlcyBpbnRvIHRoZSBxdWV1ZXMKICAgIHN0YXJ0T3Blbkxpc3QucHVzaChzdGFydE5vZGUpOwogICAgc3RhcnROb2RlLm9wZW5lZCA9IHRydWU7CiAgICBzdGFydE5vZGUuYnkgPSBCWV9TVEFSVDsKICAgIGVuZE9wZW5MaXN0LnB1c2goZW5kTm9kZSk7CiAgICBlbmROb2RlLm9wZW5lZCA9IHRydWU7CiAgICBlbmROb2RlLmJ5ID0gQllfRU5EOwogICAgLy8gd2hpbGUgYm90aCB0aGUgcXVldWVzIGFyZSBub3QgZW1wdHkKICAgIHdoaWxlIChzdGFydE9wZW5MaXN0Lmxlbmd0aCAmJiBlbmRPcGVuTGlzdC5sZW5ndGgpIHsKICAgICAgICAvLyBleHBhbmQgc3RhcnQgb3BlbiBsaXN0CiAgICAgICAgbm9kZSA9IHN0YXJ0T3Blbkxpc3Quc2hpZnQoKTsKICAgICAgICBub2RlLmNsb3NlZCA9IHRydWU7CiAgICAgICAgbmVpZ2hib3JzID0gZ3JpZC5nZXROZWlnaGJvcnMobm9kZSwgZGlhZ29uYWxNb3ZlbWVudCk7CiAgICAgICAgZm9yIChpID0gMCwgbCA9IG5laWdoYm9ycy5sZW5ndGg7IGkgPCBsOyArK2kpIHsKICAgICAgICAgICAgbmVpZ2hib3IgPSBuZWlnaGJvcnNbaV07CiAgICAgICAgICAgIGlmIChuZWlnaGJvci5jbG9zZWQpIHsKICAgICAgICAgICAgICAgIGNvbnRpbnVlOwogICAgICAgICAgICB9CiAgICAgICAgICAgIGlmIChuZWlnaGJvci5vcGVuZWQpIHsKICAgICAgICAgICAgICAgIC8vIGlmIHRoaXMgbm9kZSBoYXMgYmVlbiBpbnNwZWN0ZWQgYnkgdGhlIHJldmVyc2VkIHNlYXJjaCwKICAgICAgICAgICAgICAgIC8vIHRoZW4gYSBwYXRoIGlzIGZvdW5kLgogICAgICAgICAgICAgICAgaWYgKG5laWdoYm9yLmJ5ID09PSBCWV9FTkQpIHsKICAgICAgICAgICAgICAgICAgICByZXR1cm4gVXRpbC5iaUJhY2t0cmFjZShub2RlLCBuZWlnaGJvcik7CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICBjb250aW51ZTsKICAgICAgICAgICAgfQogICAgICAgICAgICBzdGFydE9wZW5MaXN0LnB1c2gobmVpZ2hib3IpOwogICAgICAgICAgICBuZWlnaGJvci5wYXJlbnQgPSBub2RlOwogICAgICAgICAgICBuZWlnaGJvci5vcGVuZWQgPSB0cnVlOwogICAgICAgICAgICBuZWlnaGJvci5ieSA9IEJZX1NUQVJUOwogICAgICAgIH0KICAgICAgICAvLyBleHBhbmQgZW5kIG9wZW4gbGlzdAogICAgICAgIG5vZGUgPSBlbmRPcGVuTGlzdC5zaGlmdCgpOwogICAgICAgIG5vZGUuY2xvc2VkID0gdHJ1ZTsKICAgICAgICBuZWlnaGJvcnMgPSBncmlkLmdldE5laWdoYm9ycyhub2RlLCBkaWFnb25hbE1vdmVtZW50KTsKICAgICAgICBmb3IgKGkgPSAwLCBsID0gbmVpZ2hib3JzLmxlbmd0aDsgaSA8IGw7ICsraSkgewogICAgICAgICAgICBuZWlnaGJvciA9IG5laWdoYm9yc1tpXTsKICAgICAgICAgICAgaWYgKG5laWdoYm9yLmNsb3NlZCkgewogICAgICAgICAgICAgICAgY29udGludWU7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgaWYgKG5laWdoYm9yLm9wZW5lZCkgewogICAgICAgICAgICAgICAgaWYgKG5laWdoYm9yLmJ5ID09PSBCWV9TVEFSVCkgewogICAgICAgICAgICAgICAgICAgIHJldHVybiBVdGlsLmJpQmFja3RyYWNlKG5laWdoYm9yLCBub2RlKTsKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgIGNvbnRpbnVlOwogICAgICAgICAgICB9CiAgICAgICAgICAgIGVuZE9wZW5MaXN0LnB1c2gobmVpZ2hib3IpOwogICAgICAgICAgICBuZWlnaGJvci5wYXJlbnQgPSBub2RlOwogICAgICAgICAgICBuZWlnaGJvci5vcGVuZWQgPSB0cnVlOwogICAgICAgICAgICBuZWlnaGJvci5ieSA9IEJZX0VORDsKICAgICAgICB9CiAgICB9CiAgICAvLyBmYWlsIHRvIGZpbmQgdGhlIHBhdGgKICAgIHJldHVybiBbXTsKfTsKbW9kdWxlLmV4cG9ydHMgPSBCaUJyZWFkdGhGaXJzdEZpbmRlcjsKCgovKioqLyB9KSwKLyogMzEgKi8KLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykgewoKdmFyIEJpQVN0YXJGaW5kZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDgpOwovKioKICogQmktZGlyZWN0aW9uYWwgRGlqa3N0cmEgcGF0aC1maW5kZXIuCiAqIEBjb25zdHJ1Y3RvcgogKiBAZXh0ZW5kcyBCaUFTdGFyRmluZGVyCiAqIEBwYXJhbSB7T2JqZWN0fSBvcHQKICogQHBhcmFtIHtib29sZWFufSBvcHQuYWxsb3dEaWFnb25hbCBXaGV0aGVyIGRpYWdvbmFsIG1vdmVtZW50IGlzIGFsbG93ZWQuCiAqICAgICBEZXByZWNhdGVkLCB1c2UgZGlhZ29uYWxNb3ZlbWVudCBpbnN0ZWFkLgogKiBAcGFyYW0ge2Jvb2xlYW59IG9wdC5kb250Q3Jvc3NDb3JuZXJzIERpc2FsbG93IGRpYWdvbmFsIG1vdmVtZW50IHRvdWNoaW5nCiAqICAgICBibG9jayBjb3JuZXJzLiBEZXByZWNhdGVkLCB1c2UgZGlhZ29uYWxNb3ZlbWVudCBpbnN0ZWFkLgogKiBAcGFyYW0ge0RpYWdvbmFsTW92ZW1lbnR9IG9wdC5kaWFnb25hbE1vdmVtZW50IEFsbG93ZWQgZGlhZ29uYWwgbW92ZW1lbnQuCiAqLwpmdW5jdGlvbiBCaURpamtzdHJhRmluZGVyKG9wdCkgewogICAgQmlBU3RhckZpbmRlci5jYWxsKHRoaXMsIG9wdCk7CiAgICB0aGlzLmhldXJpc3RpYyA9IGZ1bmN0aW9uIChkeCwgZHkpIHsKICAgICAgICByZXR1cm4gMDsKICAgIH07Cn0KQmlEaWprc3RyYUZpbmRlci5wcm90b3R5cGUgPSBuZXcgQmlBU3RhckZpbmRlcigpOwpCaURpamtzdHJhRmluZGVyLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEJpRGlqa3N0cmFGaW5kZXI7Cm1vZHVsZS5leHBvcnRzID0gQmlEaWprc3RyYUZpbmRlcjsKCgovKioqLyB9KSwKLyogMzIgKi8KLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykgewoKdmFyIFV0aWwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpOwp2YXIgSGV1cmlzdGljID0gX193ZWJwYWNrX3JlcXVpcmVfXygzKTsKdmFyIE5vZGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDYpOwp2YXIgRGlhZ29uYWxNb3ZlbWVudCA9IF9fd2VicGFja19yZXF1aXJlX18oMCk7Ci8qKgogKiBJdGVyYXRpdmUgRGVlcGluZyBBIFN0YXIgKElEQSopIHBhdGgtZmluZGVyLgogKgogKiBSZWN1cnNpb24gYmFzZWQgb246CiAqICAgaHR0cDovL3d3dy5hcGwuamh1LmVkdS9+aGFsbC9BSS1Qcm9ncmFtbWluZy9JREEtU3Rhci5odG1sCiAqCiAqIFBhdGggcmV0cmFjaW5nIGJhc2VkIG9uOgogKiAgVi4gTmFnZXNod2FyYSBSYW8sIFZpcGluIEt1bWFyIGFuZCBLLiBSYW1lc2gKICogICJBIFBhcmFsbGVsIEltcGxlbWVudGF0aW9uIG9mIEl0ZXJhdGl2ZS1EZWVwaW5nLUEqIiwgSmFudWFyeSAxOTg3LgogKiAgZnRwOi8vZnRwLmNzLnV0ZXhhcy5lZHUvLnNuYXBzaG90L2hvdXJseS4xL3B1Yi9BSS1MYWIvdGVjaC1yZXBvcnRzL1VULUFJLVRSLTg3LTQ2LnBkZgogKgogKiBAYXV0aG9yIEdlcmFyZCBNZWllciAod3d3LmdlcmFyZG1laWVyLmNvbSkKICoKICogQGNvbnN0cnVjdG9yCiAqIEBwYXJhbSB7T2JqZWN0fSBvcHQKICogQHBhcmFtIHtib29sZWFufSBvcHQuYWxsb3dEaWFnb25hbCBXaGV0aGVyIGRpYWdvbmFsIG1vdmVtZW50IGlzIGFsbG93ZWQuCiAqICAgICBEZXByZWNhdGVkLCB1c2UgZGlhZ29uYWxNb3ZlbWVudCBpbnN0ZWFkLgogKiBAcGFyYW0ge2Jvb2xlYW59IG9wdC5kb250Q3Jvc3NDb3JuZXJzIERpc2FsbG93IGRpYWdvbmFsIG1vdmVtZW50IHRvdWNoaW5nCiAqICAgICBibG9jayBjb3JuZXJzLiBEZXByZWNhdGVkLCB1c2UgZGlhZ29uYWxNb3ZlbWVudCBpbnN0ZWFkLgogKiBAcGFyYW0ge0RpYWdvbmFsTW92ZW1lbnR9IG9wdC5kaWFnb25hbE1vdmVtZW50IEFsbG93ZWQgZGlhZ29uYWwgbW92ZW1lbnQuCiAqIEBwYXJhbSB7ZnVuY3Rpb259IG9wdC5oZXVyaXN0aWMgSGV1cmlzdGljIGZ1bmN0aW9uIHRvIGVzdGltYXRlIHRoZSBkaXN0YW5jZQogKiAgICAgKGRlZmF1bHRzIHRvIG1hbmhhdHRhbikuCiAqIEBwYXJhbSB7bnVtYmVyfSBvcHQud2VpZ2h0IFdlaWdodCB0byBhcHBseSB0byB0aGUgaGV1cmlzdGljIHRvIGFsbG93IGZvcgogKiAgICAgc3Vib3B0aW1hbCBwYXRocywgaW4gb3JkZXIgdG8gc3BlZWQgdXAgdGhlIHNlYXJjaC4KICogQHBhcmFtIHtib29sZWFufSBvcHQudHJhY2tSZWN1cnNpb24gV2hldGhlciB0byB0cmFjayByZWN1cnNpb24gZm9yCiAqICAgICBzdGF0aXN0aWNhbCBwdXJwb3Nlcy4KICogQHBhcmFtIHtudW1iZXJ9IG9wdC50aW1lTGltaXQgTWF4aW11bSBleGVjdXRpb24gdGltZS4gVXNlIDw9IDAgZm9yIGluZmluaXRlLgogKi8KZnVuY3Rpb24gSURBU3RhckZpbmRlcihvcHQpIHsKICAgIG9wdCA9IG9wdCB8fCB7fTsKICAgIHRoaXMuYWxsb3dEaWFnb25hbCA9IG9wdC5hbGxvd0RpYWdvbmFsOwogICAgdGhpcy5kb250Q3Jvc3NDb3JuZXJzID0gb3B0LmRvbnRDcm9zc0Nvcm5lcnM7CiAgICB0aGlzLmRpYWdvbmFsTW92ZW1lbnQgPSBvcHQuZGlhZ29uYWxNb3ZlbWVudDsKICAgIHRoaXMuaGV1cmlzdGljID0gb3B0LmhldXJpc3RpYyB8fCBIZXVyaXN0aWMubWFuaGF0dGFuOwogICAgdGhpcy53ZWlnaHQgPSBvcHQud2VpZ2h0IHx8IDE7CiAgICB0aGlzLnRyYWNrUmVjdXJzaW9uID0gb3B0LnRyYWNrUmVjdXJzaW9uIHx8IGZhbHNlOwogICAgdGhpcy50aW1lTGltaXQgPSBvcHQudGltZUxpbWl0IHx8IEluZmluaXR5OyAvLyBEZWZhdWx0OiBubyB0aW1lIGxpbWl0LgogICAgaWYgKCF0aGlzLmRpYWdvbmFsTW92ZW1lbnQpIHsKICAgICAgICBpZiAoIXRoaXMuYWxsb3dEaWFnb25hbCkgewogICAgICAgICAgICB0aGlzLmRpYWdvbmFsTW92ZW1lbnQgPSBEaWFnb25hbE1vdmVtZW50Lk5ldmVyOwogICAgICAgIH0KICAgICAgICBlbHNlIHsKICAgICAgICAgICAgaWYgKHRoaXMuZG9udENyb3NzQ29ybmVycykgewogICAgICAgICAgICAgICAgdGhpcy5kaWFnb25hbE1vdmVtZW50ID0gRGlhZ29uYWxNb3ZlbWVudC5Pbmx5V2hlbk5vT2JzdGFjbGVzOwogICAgICAgICAgICB9CiAgICAgICAgICAgIGVsc2UgewogICAgICAgICAgICAgICAgdGhpcy5kaWFnb25hbE1vdmVtZW50ID0gRGlhZ29uYWxNb3ZlbWVudC5JZkF0TW9zdE9uZU9ic3RhY2xlOwogICAgICAgICAgICB9CiAgICAgICAgfQogICAgfQogICAgLy8gV2hlbiBkaWFnb25hbCBtb3ZlbWVudCBpcyBhbGxvd2VkIHRoZSBtYW5oYXR0YW4gaGV1cmlzdGljIGlzIG5vdAogICAgLy8gYWRtaXNzaWJsZSwgaXQgc2hvdWxkIGJlIG9jdGlsZSBpbnN0ZWFkCiAgICBpZiAodGhpcy5kaWFnb25hbE1vdmVtZW50ID09PSBEaWFnb25hbE1vdmVtZW50Lk5ldmVyKSB7CiAgICAgICAgdGhpcy5oZXVyaXN0aWMgPSBvcHQuaGV1cmlzdGljIHx8IEhldXJpc3RpYy5tYW5oYXR0YW47CiAgICB9CiAgICBlbHNlIHsKICAgICAgICB0aGlzLmhldXJpc3RpYyA9IG9wdC5oZXVyaXN0aWMgfHwgSGV1cmlzdGljLm9jdGlsZTsKICAgIH0KfQovKioKICogRmluZCBhbmQgcmV0dXJuIHRoZSB0aGUgcGF0aC4gV2hlbiBhbiBlbXB0eSBhcnJheSBpcyByZXR1cm5lZCwgZWl0aGVyCiAqIG5vIHBhdGggaXMgcG9zc2libGUsIG9yIHRoZSBtYXhpbXVtIGV4ZWN1dGlvbiB0aW1lIGlzIHJlYWNoZWQuCiAqCiAqIEByZXR1cm4ge0FycmF5PEFycmF5PG51bWJlcj4+fSBUaGUgcGF0aCwgaW5jbHVkaW5nIGJvdGggc3RhcnQgYW5kCiAqICAgICBlbmQgcG9zaXRpb25zLgogKi8KSURBU3RhckZpbmRlci5wcm90b3R5cGUuZmluZFBhdGggPSBmdW5jdGlvbiAoc3RhcnRYLCBzdGFydFksIGVuZFgsIGVuZFksIGdyaWQpIHsKICAgIC8vIFVzZWQgZm9yIHN0YXRpc3RpY3M6CiAgICB2YXIgbm9kZXNWaXNpdGVkID0gMDsKICAgIC8vIEV4ZWN1dGlvbiB0aW1lIGxpbWl0YXRpb246CiAgICB2YXIgc3RhcnRUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7CiAgICAvLyBIZXVyaXN0aWMgaGVscGVyOgogICAgdmFyIGggPSBmdW5jdGlvbiAoYSwgYikgewogICAgICAgIHJldHVybiB0aGlzLmhldXJpc3RpYyhNYXRoLmFicyhiLnggLSBhLngpLCBNYXRoLmFicyhiLnkgLSBhLnkpKTsKICAgIH0uYmluZCh0aGlzKTsKICAgIC8vIFN0ZXAgY29zdCBmcm9tIGEgdG8gYjoKICAgIHZhciBjb3N0ID0gZnVuY3Rpb24gKGEsIGIpIHsKICAgICAgICByZXR1cm4gKGEueCA9PT0gYi54IHx8IGEueSA9PT0gYi55KSA/IDEgOiBNYXRoLlNRUlQyOwogICAgfTsKICAgIC8qKgogICAgICogSURBKiBzZWFyY2ggaW1wbGVtZW50YXRpb24uCiAgICAgKgogICAgICogQHBhcmFtIHtOb2RlfSBUaGUgbm9kZSBjdXJyZW50bHkgZXhwYW5kaW5nIGZyb20uCiAgICAgKiBAcGFyYW0ge251bWJlcn0gQ29zdCB0byByZWFjaCB0aGUgZ2l2ZW4gbm9kZS4KICAgICAqIEBwYXJhbSB7bnVtYmVyfSBNYXhpbXVtIHNlYXJjaCBkZXB0aCAoY3V0LW9mZiB2YWx1ZSkuCiAgICAgKiBAcGFyYW0ge0FycmF5PEFycmF5PG51bWJlcj4+fSBUaGUgZm91bmQgcm91dGUuCiAgICAgKiBAcGFyYW0ge251bWJlcn0gUmVjdXJzaW9uIGRlcHRoLgogICAgICoKICAgICAqIEByZXR1cm4ge09iamVjdH0gZWl0aGVyIGEgbnVtYmVyIHdpdGggdGhlIG5ldyBvcHRpbWFsIGN1dC1vZmYgZGVwdGgsCiAgICAgKiBvciBhIHZhbGlkIG5vZGUgaW5zdGFuY2UsIGluIHdoaWNoIGNhc2UgYSBwYXRoIHdhcyBmb3VuZC4KICAgICAqLwogICAgdmFyIHNlYXJjaCA9IGZ1bmN0aW9uIChub2RlLCBnLCBjdXRvZmYsIHJvdXRlLCBkZXB0aCkgewogICAgICAgIG5vZGVzVmlzaXRlZCsrOwogICAgICAgIC8vIEVuZm9yY2UgdGltZWxpbWl0OgogICAgICAgIGlmICh0aGlzLnRpbWVMaW1pdCA+IDAgJiYKICAgICAgICAgICAgbmV3IERhdGUoKS5nZXRUaW1lKCkgLSBzdGFydFRpbWUgPiB0aGlzLnRpbWVMaW1pdCAqIDEwMDApIHsKICAgICAgICAgICAgLy8gRW5mb3JjZWQgYXMgInBhdGgtbm90LWZvdW5kIi4KICAgICAgICAgICAgcmV0dXJuIEluZmluaXR5OwogICAgICAgIH0KICAgICAgICB2YXIgZiA9IGcgKyBoKG5vZGUsIGVuZCkgKiB0aGlzLndlaWdodDsKICAgICAgICAvLyBXZSd2ZSBzZWFyY2hlZCB0b28gZGVlcCBmb3IgdGhpcyBpdGVyYXRpb24uCiAgICAgICAgaWYgKGYgPiBjdXRvZmYpIHsKICAgICAgICAgICAgcmV0dXJuIGY7CiAgICAgICAgfQogICAgICAgIGlmIChub2RlID09IGVuZCkgewogICAgICAgICAgICByb3V0ZVtkZXB0aF0gPSBbbm9kZS54LCBub2RlLnldOwogICAgICAgICAgICByZXR1cm4gbm9kZTsKICAgICAgICB9CiAgICAgICAgdmFyIG1pbiwgdCwgaywgbmVpZ2hib3VyOwogICAgICAgIHZhciBuZWlnaGJvdXJzID0gZ3JpZC5nZXROZWlnaGJvcnMobm9kZSwgdGhpcy5kaWFnb25hbE1vdmVtZW50KTsKICAgICAgICAvLyBTb3J0IHRoZSBuZWlnaGJvdXJzLCBnaXZlcyBuaWNlciBwYXRocy4gQnV0LCB0aGlzIGRldmlhdGVzCiAgICAgICAgLy8gZnJvbSB0aGUgb3JpZ2luYWwgYWxnb3JpdGhtIC0gc28gSSBsZWZ0IGl0IG91dC4KICAgICAgICAvL25laWdoYm91cnMuc29ydChmdW5jdGlvbihhLCBiKXsKICAgICAgICAvLyAgICByZXR1cm4gaChhLCBlbmQpIC0gaChiLCBlbmQpOwogICAgICAgIC8vfSk7CiAgICAgICAgLypqc2hpbnQgLVcwODQgKi8gLy9EaXNhYmxlIHdhcm5pbmc6IEV4cGVjdGVkIGEgY29uZGl0aW9uYWwgZXhwcmVzc2lvbiBhbmQgaW5zdGVhZCBzYXcgYW4gYXNzaWdubWVudAogICAgICAgIGZvciAoayA9IDAsIG1pbiA9IEluZmluaXR5OyBuZWlnaGJvdXIgPSBuZWlnaGJvdXJzW2tdOyArK2spIHsKICAgICAgICAgICAgLypqc2hpbnQgK1cwODQgKi8gLy9FbmFibGUgd2FybmluZzogRXhwZWN0ZWQgYSBjb25kaXRpb25hbCBleHByZXNzaW9uIGFuZCBpbnN0ZWFkIHNhdyBhbiBhc3NpZ25tZW50CiAgICAgICAgICAgIGlmICh0aGlzLnRyYWNrUmVjdXJzaW9uKSB7CiAgICAgICAgICAgICAgICAvLyBSZXRhaW4gYSBjb3B5IGZvciB2aXN1YWxpc2F0aW9uLiBEdWUgdG8gcmVjdXJzaW9uLCB0aGlzCiAgICAgICAgICAgICAgICAvLyBub2RlIG1heSBiZSBwYXJ0IG9mIG90aGVyIHBhdGhzIHRvby4KICAgICAgICAgICAgICAgIG5laWdoYm91ci5yZXRhaW5Db3VudCA9IG5laWdoYm91ci5yZXRhaW5Db3VudCArIDEgfHwgMTsKICAgICAgICAgICAgICAgIGlmIChuZWlnaGJvdXIudGVzdGVkICE9PSB0cnVlKSB7CiAgICAgICAgICAgICAgICAgICAgbmVpZ2hib3VyLnRlc3RlZCA9IHRydWU7CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgIH0KICAgICAgICAgICAgdCA9IHNlYXJjaChuZWlnaGJvdXIsIGcgKyBjb3N0KG5vZGUsIG5laWdoYm91ciksIGN1dG9mZiwgcm91dGUsIGRlcHRoICsgMSk7CiAgICAgICAgICAgIGlmICh0IGluc3RhbmNlb2YgTm9kZSkgewogICAgICAgICAgICAgICAgcm91dGVbZGVwdGhdID0gW25vZGUueCwgbm9kZS55XTsKICAgICAgICAgICAgICAgIC8vIEZvciBhIHR5cGljYWwgQSogbGlua2VkIGxpc3QsIHRoaXMgd291bGQgd29yazoKICAgICAgICAgICAgICAgIC8vIG5laWdoYm91ci5wYXJlbnQgPSBub2RlOwogICAgICAgICAgICAgICAgcmV0dXJuIHQ7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgLy8gRGVjcmVtZW50IGNvdW50LCB0aGVuIGRldGVybWluZSB3aGV0aGVyIGl0J3MgYWN0dWFsbHkgY2xvc2VkLgogICAgICAgICAgICBpZiAodGhpcy50cmFja1JlY3Vyc2lvbiAmJiAoLS1uZWlnaGJvdXIucmV0YWluQ291bnQpID09PSAwKSB7CiAgICAgICAgICAgICAgICBuZWlnaGJvdXIudGVzdGVkID0gZmFsc2U7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgaWYgKHQgPCBtaW4pIHsKICAgICAgICAgICAgICAgIG1pbiA9IHQ7CiAgICAgICAgICAgIH0KICAgICAgICB9CiAgICAgICAgcmV0dXJuIG1pbjsKICAgIH0uYmluZCh0aGlzKTsKICAgIC8vIE5vZGUgaW5zdGFuY2UgbG9va3VwczoKICAgIHZhciBzdGFydCA9IGdyaWQuZ2V0Tm9kZUF0KHN0YXJ0WCwgc3RhcnRZKTsKICAgIHZhciBlbmQgPSBncmlkLmdldE5vZGVBdChlbmRYLCBlbmRZKTsKICAgIC8vIEluaXRpYWwgc2VhcmNoIGRlcHRoLCBnaXZlbiB0aGUgdHlwaWNhbCBoZXVyaXN0aWMgY29udHJhaW50cywKICAgIC8vIHRoZXJlIHNob3VsZCBiZSBubyBjaGVhcGVyIHJvdXRlIHBvc3NpYmxlLgogICAgdmFyIGN1dE9mZiA9IGgoc3RhcnQsIGVuZCk7CiAgICB2YXIgaiwgcm91dGUsIHQ7CiAgICAvLyBXaXRoIGFuIG92ZXJmbG93IHByb3RlY3Rpb24uCiAgICBmb3IgKGogPSAwOyB0cnVlOyArK2opIHsKICAgICAgICByb3V0ZSA9IFtdOwogICAgICAgIC8vIFNlYXJjaCB0aWxsIGN1dC1vZmYgZGVwdGg6CiAgICAgICAgdCA9IHNlYXJjaChzdGFydCwgMCwgY3V0T2ZmLCByb3V0ZSwgMCk7CiAgICAgICAgLy8gUm91dGUgbm90IHBvc3NpYmxlLCBvciBub3QgZm91bmQgaW4gdGltZSBsaW1pdC4KICAgICAgICBpZiAodCA9PT0gSW5maW5pdHkpIHsKICAgICAgICAgICAgcmV0dXJuIFtdOwogICAgICAgIH0KICAgICAgICAvLyBJZiB0IGlzIGEgbm9kZSwgaXQncyBhbHNvIHRoZSBlbmQgbm9kZS4gUm91dGUgaXMgbm93CiAgICAgICAgLy8gcG9wdWxhdGVkIHdpdGggYSB2YWxpZCBwYXRoIHRvIHRoZSBlbmQgbm9kZS4KICAgICAgICBpZiAodCBpbnN0YW5jZW9mIE5vZGUpIHsKICAgICAgICAgICAgcmV0dXJuIHJvdXRlOwogICAgICAgIH0KICAgICAgICAvLyBUcnkgYWdhaW4sIHRoaXMgdGltZSB3aXRoIGEgZGVlcGVyIGN1dC1vZmYuIFRoZSB0IHNjb3JlCiAgICAgICAgLy8gaXMgdGhlIGNsb3Nlc3Qgd2UgZ290IHRvIHRoZSBlbmQgbm9kZS4KICAgICAgICBjdXRPZmYgPSB0OwogICAgfQogICAgLy8gVGhpcyBfc2hvdWxkXyBuZXZlciB0byBiZSByZWFjaGVkLgogICAgcmV0dXJuIFtdOwp9Owptb2R1bGUuZXhwb3J0cyA9IElEQVN0YXJGaW5kZXI7CgoKLyoqKi8gfSksCi8qIDMzICovCi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHsKCi8qKgogKiBAYXV0aG9yIGFuaWVybyAvIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmllcm8KICovCnZhciBEaWFnb25hbE1vdmVtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXygwKTsKdmFyIEpQRk5ldmVyTW92ZURpYWdvbmFsbHkgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDM0KTsKdmFyIEpQRkFsd2F5c01vdmVEaWFnb25hbGx5ID0gX193ZWJwYWNrX3JlcXVpcmVfXygzNSk7CnZhciBKUEZNb3ZlRGlhZ29uYWxseUlmTm9PYnN0YWNsZXMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDM2KTsKdmFyIEpQRk1vdmVEaWFnb25hbGx5SWZBdE1vc3RPbmVPYnN0YWNsZSA9IF9fd2VicGFja19yZXF1aXJlX18oMzcpOwovKioKICogUGF0aCBmaW5kZXIgdXNpbmcgdGhlIEp1bXAgUG9pbnQgU2VhcmNoIGFsZ29yaXRobQogKiBAcGFyYW0ge09iamVjdH0gb3B0CiAqIEBwYXJhbSB7ZnVuY3Rpb259IG9wdC5oZXVyaXN0aWMgSGV1cmlzdGljIGZ1bmN0aW9uIHRvIGVzdGltYXRlIHRoZSBkaXN0YW5jZQogKiAgICAgKGRlZmF1bHRzIHRvIG1hbmhhdHRhbikuCiAqIEBwYXJhbSB7RGlhZ29uYWxNb3ZlbWVudH0gb3B0LmRpYWdvbmFsTW92ZW1lbnQgQ29uZGl0aW9uIHVuZGVyIHdoaWNoIGRpYWdvbmFsCiAqICAgICAgbW92ZW1lbnQgd2lsbCBiZSBhbGxvd2VkLgogKi8KZnVuY3Rpb24gSnVtcFBvaW50RmluZGVyKG9wdCkgewogICAgb3B0ID0gb3B0IHx8IHt9OwogICAgaWYgKG9wdC5kaWFnb25hbE1vdmVtZW50ID09PSBEaWFnb25hbE1vdmVtZW50Lk5ldmVyKSB7CiAgICAgICAgcmV0dXJuIG5ldyBKUEZOZXZlck1vdmVEaWFnb25hbGx5KG9wdCk7CiAgICB9CiAgICBlbHNlIGlmIChvcHQuZGlhZ29uYWxNb3ZlbWVudCA9PT0gRGlhZ29uYWxNb3ZlbWVudC5BbHdheXMpIHsKICAgICAgICByZXR1cm4gbmV3IEpQRkFsd2F5c01vdmVEaWFnb25hbGx5KG9wdCk7CiAgICB9CiAgICBlbHNlIGlmIChvcHQuZGlhZ29uYWxNb3ZlbWVudCA9PT0gRGlhZ29uYWxNb3ZlbWVudC5Pbmx5V2hlbk5vT2JzdGFjbGVzKSB7CiAgICAgICAgcmV0dXJuIG5ldyBKUEZNb3ZlRGlhZ29uYWxseUlmTm9PYnN0YWNsZXMob3B0KTsKICAgIH0KICAgIGVsc2UgewogICAgICAgIHJldHVybiBuZXcgSlBGTW92ZURpYWdvbmFsbHlJZkF0TW9zdE9uZU9ic3RhY2xlKG9wdCk7CiAgICB9Cn0KbW9kdWxlLmV4cG9ydHMgPSBKdW1wUG9pbnRGaW5kZXI7CgoKLyoqKi8gfSksCi8qIDM0ICovCi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHsKCi8qKgogKiBAYXV0aG9yIGltb3IgLyBodHRwczovL2dpdGh1Yi5jb20vaW1vcgogKi8KdmFyIEp1bXBQb2ludEZpbmRlckJhc2UgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDUpOwp2YXIgRGlhZ29uYWxNb3ZlbWVudCA9IF9fd2VicGFja19yZXF1aXJlX18oMCk7Ci8qKgogKiBQYXRoIGZpbmRlciB1c2luZyB0aGUgSnVtcCBQb2ludCBTZWFyY2ggYWxnb3JpdGhtIGFsbG93aW5nIG9ubHkgaG9yaXpvbnRhbAogKiBvciB2ZXJ0aWNhbCBtb3ZlbWVudHMuCiAqLwpmdW5jdGlvbiBKUEZOZXZlck1vdmVEaWFnb25hbGx5KG9wdCkgewogICAgSnVtcFBvaW50RmluZGVyQmFzZS5jYWxsKHRoaXMsIG9wdCk7Cn0KSlBGTmV2ZXJNb3ZlRGlhZ29uYWxseS5wcm90b3R5cGUgPSBuZXcgSnVtcFBvaW50RmluZGVyQmFzZSgpOwpKUEZOZXZlck1vdmVEaWFnb25hbGx5LnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEpQRk5ldmVyTW92ZURpYWdvbmFsbHk7Ci8qKgogKiBTZWFyY2ggcmVjdXJzaXZlbHkgaW4gdGhlIGRpcmVjdGlvbiAocGFyZW50IC0+IGNoaWxkKSwgc3RvcHBpbmcgb25seSB3aGVuIGEKICoganVtcCBwb2ludCBpcyBmb3VuZC4KICogQHByb3RlY3RlZAogKiBAcmV0dXJuIHtBcnJheTxBcnJheTxudW1iZXI+Pn0gVGhlIHgsIHkgY29vcmRpbmF0ZSBvZiB0aGUganVtcCBwb2ludAogKiAgICAgZm91bmQsIG9yIG51bGwgaWYgbm90IGZvdW5kCiAqLwpKUEZOZXZlck1vdmVEaWFnb25hbGx5LnByb3RvdHlwZS5fanVtcCA9IGZ1bmN0aW9uICh4LCB5LCBweCwgcHkpIHsKICAgIHZhciBncmlkID0gdGhpcy5ncmlkLCBkeCA9IHggLSBweCwgZHkgPSB5IC0gcHk7CiAgICBpZiAoIWdyaWQuaXNXYWxrYWJsZUF0KHgsIHkpKSB7CiAgICAgICAgcmV0dXJuIG51bGw7CiAgICB9CiAgICBpZiAodGhpcy50cmFja0p1bXBSZWN1cnNpb24gPT09IHRydWUpIHsKICAgICAgICBncmlkLmdldE5vZGVBdCh4LCB5KS50ZXN0ZWQgPSB0cnVlOwogICAgfQogICAgaWYgKGdyaWQuZ2V0Tm9kZUF0KHgsIHkpID09PSB0aGlzLmVuZE5vZGUpIHsKICAgICAgICByZXR1cm4gW3gsIHldOwogICAgfQogICAgaWYgKGR4ICE9PSAwKSB7CiAgICAgICAgaWYgKChncmlkLmlzV2Fsa2FibGVBdCh4LCB5IC0gMSkgJiYgIWdyaWQuaXNXYWxrYWJsZUF0KHggLSBkeCwgeSAtIDEpKSB8fAogICAgICAgICAgICAoZ3JpZC5pc1dhbGthYmxlQXQoeCwgeSArIDEpICYmICFncmlkLmlzV2Fsa2FibGVBdCh4IC0gZHgsIHkgKyAxKSkpIHsKICAgICAgICAgICAgcmV0dXJuIFt4LCB5XTsKICAgICAgICB9CiAgICB9CiAgICBlbHNlIGlmIChkeSAhPT0gMCkgewogICAgICAgIGlmICgoZ3JpZC5pc1dhbGthYmxlQXQoeCAtIDEsIHkpICYmICFncmlkLmlzV2Fsa2FibGVBdCh4IC0gMSwgeSAtIGR5KSkgfHwKICAgICAgICAgICAgKGdyaWQuaXNXYWxrYWJsZUF0KHggKyAxLCB5KSAmJiAhZ3JpZC5pc1dhbGthYmxlQXQoeCArIDEsIHkgLSBkeSkpKSB7CiAgICAgICAgICAgIHJldHVybiBbeCwgeV07CiAgICAgICAgfQogICAgICAgIC8vV2hlbiBtb3ZpbmcgdmVydGljYWxseSwgbXVzdCBjaGVjayBmb3IgaG9yaXpvbnRhbCBqdW1wIHBvaW50cwogICAgICAgIGlmICh0aGlzLl9qdW1wKHggKyAxLCB5LCB4LCB5KSB8fCB0aGlzLl9qdW1wKHggLSAxLCB5LCB4LCB5KSkgewogICAgICAgICAgICByZXR1cm4gW3gsIHldOwogICAgICAgIH0KICAgIH0KICAgIGVsc2UgewogICAgICAgIHRocm93IG5ldyBFcnJvcigiT25seSBob3Jpem9udGFsIGFuZCB2ZXJ0aWNhbCBtb3ZlbWVudHMgYXJlIGFsbG93ZWQiKTsKICAgIH0KICAgIHJldHVybiB0aGlzLl9qdW1wKHggKyBkeCwgeSArIGR5LCB4LCB5KTsKfTsKLyoqCiAqIEZpbmQgdGhlIG5laWdoYm9ycyBmb3IgdGhlIGdpdmVuIG5vZGUuIElmIHRoZSBub2RlIGhhcyBhIHBhcmVudCwKICogcHJ1bmUgdGhlIG5laWdoYm9ycyBiYXNlZCBvbiB0aGUganVtcCBwb2ludCBzZWFyY2ggYWxnb3JpdGhtLCBvdGhlcndpc2UKICogcmV0dXJuIGFsbCBhdmFpbGFibGUgbmVpZ2hib3JzLgogKiBAcmV0dXJuIHtBcnJheTxBcnJheTxudW1iZXI+Pn0gVGhlIG5laWdoYm9ycyBmb3VuZC4KICovCkpQRk5ldmVyTW92ZURpYWdvbmFsbHkucHJvdG90eXBlLl9maW5kTmVpZ2hib3JzID0gZnVuY3Rpb24gKG5vZGUpIHsKICAgIHZhciBwYXJlbnQgPSBub2RlLnBhcmVudCwgeCA9IG5vZGUueCwgeSA9IG5vZGUueSwgZ3JpZCA9IHRoaXMuZ3JpZCwgcHgsIHB5LCBueCwgbnksIGR4LCBkeSwgbmVpZ2hib3JzID0gW10sIG5laWdoYm9yTm9kZXMsIG5laWdoYm9yTm9kZSwgaSwgbDsKICAgIC8vIGRpcmVjdGVkIHBydW5pbmc6IGNhbiBpZ25vcmUgbW9zdCBuZWlnaGJvcnMsIHVubGVzcyBmb3JjZWQuCiAgICBpZiAocGFyZW50KSB7CiAgICAgICAgcHggPSBwYXJlbnQueDsKICAgICAgICBweSA9IHBhcmVudC55OwogICAgICAgIC8vIGdldCB0aGUgbm9ybWFsaXplZCBkaXJlY3Rpb24gb2YgdHJhdmVsCiAgICAgICAgZHggPSAoeCAtIHB4KSAvIE1hdGgubWF4KE1hdGguYWJzKHggLSBweCksIDEpOwogICAgICAgIGR5ID0gKHkgLSBweSkgLyBNYXRoLm1heChNYXRoLmFicyh5IC0gcHkpLCAxKTsKICAgICAgICBpZiAoZHggIT09IDApIHsKICAgICAgICAgICAgaWYgKGdyaWQuaXNXYWxrYWJsZUF0KHgsIHkgLSAxKSkgewogICAgICAgICAgICAgICAgbmVpZ2hib3JzLnB1c2goW3gsIHkgLSAxXSk7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgaWYgKGdyaWQuaXNXYWxrYWJsZUF0KHgsIHkgKyAxKSkgewogICAgICAgICAgICAgICAgbmVpZ2hib3JzLnB1c2goW3gsIHkgKyAxXSk7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgaWYgKGdyaWQuaXNXYWxrYWJsZUF0KHggKyBkeCwgeSkpIHsKICAgICAgICAgICAgICAgIG5laWdoYm9ycy5wdXNoKFt4ICsgZHgsIHldKTsKICAgICAgICAgICAgfQogICAgICAgIH0KICAgICAgICBlbHNlIGlmIChkeSAhPT0gMCkgewogICAgICAgICAgICBpZiAoZ3JpZC5pc1dhbGthYmxlQXQoeCAtIDEsIHkpKSB7CiAgICAgICAgICAgICAgICBuZWlnaGJvcnMucHVzaChbeCAtIDEsIHldKTsKICAgICAgICAgICAgfQogICAgICAgICAgICBpZiAoZ3JpZC5pc1dhbGthYmxlQXQoeCArIDEsIHkpKSB7CiAgICAgICAgICAgICAgICBuZWlnaGJvcnMucHVzaChbeCArIDEsIHldKTsKICAgICAgICAgICAgfQogICAgICAgICAgICBpZiAoZ3JpZC5pc1dhbGthYmxlQXQoeCwgeSArIGR5KSkgewogICAgICAgICAgICAgICAgbmVpZ2hib3JzLnB1c2goW3gsIHkgKyBkeV0pOwogICAgICAgICAgICB9CiAgICAgICAgfQogICAgfQogICAgLy8gcmV0dXJuIGFsbCBuZWlnaGJvcnMKICAgIGVsc2UgewogICAgICAgIG5laWdoYm9yTm9kZXMgPSBncmlkLmdldE5laWdoYm9ycyhub2RlLCBEaWFnb25hbE1vdmVtZW50Lk5ldmVyKTsKICAgICAgICBmb3IgKGkgPSAwLCBsID0gbmVpZ2hib3JOb2Rlcy5sZW5ndGg7IGkgPCBsOyArK2kpIHsKICAgICAgICAgICAgbmVpZ2hib3JOb2RlID0gbmVpZ2hib3JOb2Rlc1tpXTsKICAgICAgICAgICAgbmVpZ2hib3JzLnB1c2goW25laWdoYm9yTm9kZS54LCBuZWlnaGJvck5vZGUueV0pOwogICAgICAgIH0KICAgIH0KICAgIHJldHVybiBuZWlnaGJvcnM7Cn07Cm1vZHVsZS5leHBvcnRzID0gSlBGTmV2ZXJNb3ZlRGlhZ29uYWxseTsKCgovKioqLyB9KSwKLyogMzUgKi8KLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykgewoKLyoqCiAqIEBhdXRob3IgaW1vciAvIGh0dHBzOi8vZ2l0aHViLmNvbS9pbW9yCiAqLwp2YXIgSnVtcFBvaW50RmluZGVyQmFzZSA9IF9fd2VicGFja19yZXF1aXJlX18oNSk7CnZhciBEaWFnb25hbE1vdmVtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXygwKTsKLyoqCiAqIFBhdGggZmluZGVyIHVzaW5nIHRoZSBKdW1wIFBvaW50IFNlYXJjaCBhbGdvcml0aG0gd2hpY2ggYWx3YXlzIG1vdmVzCiAqIGRpYWdvbmFsbHkgaXJyZXNwZWN0aXZlIG9mIHRoZSBudW1iZXIgb2Ygb2JzdGFjbGVzLgogKi8KZnVuY3Rpb24gSlBGQWx3YXlzTW92ZURpYWdvbmFsbHkob3B0KSB7CiAgICBKdW1wUG9pbnRGaW5kZXJCYXNlLmNhbGwodGhpcywgb3B0KTsKfQpKUEZBbHdheXNNb3ZlRGlhZ29uYWxseS5wcm90b3R5cGUgPSBuZXcgSnVtcFBvaW50RmluZGVyQmFzZSgpOwpKUEZBbHdheXNNb3ZlRGlhZ29uYWxseS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBKUEZBbHdheXNNb3ZlRGlhZ29uYWxseTsKLyoqCiAqIFNlYXJjaCByZWN1cnNpdmVseSBpbiB0aGUgZGlyZWN0aW9uIChwYXJlbnQgLT4gY2hpbGQpLCBzdG9wcGluZyBvbmx5IHdoZW4gYQogKiBqdW1wIHBvaW50IGlzIGZvdW5kLgogKiBAcHJvdGVjdGVkCiAqIEByZXR1cm4ge0FycmF5PEFycmF5PG51bWJlcj4+fSBUaGUgeCwgeSBjb29yZGluYXRlIG9mIHRoZSBqdW1wIHBvaW50CiAqICAgICBmb3VuZCwgb3IgbnVsbCBpZiBub3QgZm91bmQKICovCkpQRkFsd2F5c01vdmVEaWFnb25hbGx5LnByb3RvdHlwZS5fanVtcCA9IGZ1bmN0aW9uICh4LCB5LCBweCwgcHkpIHsKICAgIHZhciBncmlkID0gdGhpcy5ncmlkLCBkeCA9IHggLSBweCwgZHkgPSB5IC0gcHk7CiAgICBpZiAoIWdyaWQuaXNXYWxrYWJsZUF0KHgsIHkpKSB7CiAgICAgICAgcmV0dXJuIG51bGw7CiAgICB9CiAgICBpZiAodGhpcy50cmFja0p1bXBSZWN1cnNpb24gPT09IHRydWUpIHsKICAgICAgICBncmlkLmdldE5vZGVBdCh4LCB5KS50ZXN0ZWQgPSB0cnVlOwogICAgfQogICAgaWYgKGdyaWQuZ2V0Tm9kZUF0KHgsIHkpID09PSB0aGlzLmVuZE5vZGUpIHsKICAgICAgICByZXR1cm4gW3gsIHldOwogICAgfQogICAgLy8gY2hlY2sgZm9yIGZvcmNlZCBuZWlnaGJvcnMKICAgIC8vIGFsb25nIHRoZSBkaWFnb25hbAogICAgaWYgKGR4ICE9PSAwICYmIGR5ICE9PSAwKSB7CiAgICAgICAgaWYgKChncmlkLmlzV2Fsa2FibGVBdCh4IC0gZHgsIHkgKyBkeSkgJiYgIWdyaWQuaXNXYWxrYWJsZUF0KHggLSBkeCwgeSkpIHx8CiAgICAgICAgICAgIChncmlkLmlzV2Fsa2FibGVBdCh4ICsgZHgsIHkgLSBkeSkgJiYgIWdyaWQuaXNXYWxrYWJsZUF0KHgsIHkgLSBkeSkpKSB7CiAgICAgICAgICAgIHJldHVybiBbeCwgeV07CiAgICAgICAgfQogICAgICAgIC8vIHdoZW4gbW92aW5nIGRpYWdvbmFsbHksIG11c3QgY2hlY2sgZm9yIHZlcnRpY2FsL2hvcml6b250YWwganVtcCBwb2ludHMKICAgICAgICBpZiAodGhpcy5fanVtcCh4ICsgZHgsIHksIHgsIHkpIHx8IHRoaXMuX2p1bXAoeCwgeSArIGR5LCB4LCB5KSkgewogICAgICAgICAgICByZXR1cm4gW3gsIHldOwogICAgICAgIH0KICAgIH0KICAgIC8vIGhvcml6b250YWxseS92ZXJ0aWNhbGx5CiAgICBlbHNlIHsKICAgICAgICBpZiAoZHggIT09IDApIHsgLy8gbW92aW5nIGFsb25nIHgKICAgICAgICAgICAgaWYgKChncmlkLmlzV2Fsa2FibGVBdCh4ICsgZHgsIHkgKyAxKSAmJiAhZ3JpZC5pc1dhbGthYmxlQXQoeCwgeSArIDEpKSB8fAogICAgICAgICAgICAgICAgKGdyaWQuaXNXYWxrYWJsZUF0KHggKyBkeCwgeSAtIDEpICYmICFncmlkLmlzV2Fsa2FibGVBdCh4LCB5IC0gMSkpKSB7CiAgICAgICAgICAgICAgICByZXR1cm4gW3gsIHldOwogICAgICAgICAgICB9CiAgICAgICAgfQogICAgICAgIGVsc2UgewogICAgICAgICAgICBpZiAoKGdyaWQuaXNXYWxrYWJsZUF0KHggKyAxLCB5ICsgZHkpICYmICFncmlkLmlzV2Fsa2FibGVBdCh4ICsgMSwgeSkpIHx8CiAgICAgICAgICAgICAgICAoZ3JpZC5pc1dhbGthYmxlQXQoeCAtIDEsIHkgKyBkeSkgJiYgIWdyaWQuaXNXYWxrYWJsZUF0KHggLSAxLCB5KSkpIHsKICAgICAgICAgICAgICAgIHJldHVybiBbeCwgeV07CiAgICAgICAgICAgIH0KICAgICAgICB9CiAgICB9CiAgICByZXR1cm4gdGhpcy5fanVtcCh4ICsgZHgsIHkgKyBkeSwgeCwgeSk7Cn07Ci8qKgogKiBGaW5kIHRoZSBuZWlnaGJvcnMgZm9yIHRoZSBnaXZlbiBub2RlLiBJZiB0aGUgbm9kZSBoYXMgYSBwYXJlbnQsCiAqIHBydW5lIHRoZSBuZWlnaGJvcnMgYmFzZWQgb24gdGhlIGp1bXAgcG9pbnQgc2VhcmNoIGFsZ29yaXRobSwgb3RoZXJ3aXNlCiAqIHJldHVybiBhbGwgYXZhaWxhYmxlIG5laWdoYm9ycy4KICogQHJldHVybiB7QXJyYXk8QXJyYXk8bnVtYmVyPj59IFRoZSBuZWlnaGJvcnMgZm91bmQuCiAqLwpKUEZBbHdheXNNb3ZlRGlhZ29uYWxseS5wcm90b3R5cGUuX2ZpbmROZWlnaGJvcnMgPSBmdW5jdGlvbiAobm9kZSkgewogICAgdmFyIHBhcmVudCA9IG5vZGUucGFyZW50LCB4ID0gbm9kZS54LCB5ID0gbm9kZS55LCBncmlkID0gdGhpcy5ncmlkLCBweCwgcHksIG54LCBueSwgZHgsIGR5LCBuZWlnaGJvcnMgPSBbXSwgbmVpZ2hib3JOb2RlcywgbmVpZ2hib3JOb2RlLCBpLCBsOwogICAgLy8gZGlyZWN0ZWQgcHJ1bmluZzogY2FuIGlnbm9yZSBtb3N0IG5laWdoYm9ycywgdW5sZXNzIGZvcmNlZC4KICAgIGlmIChwYXJlbnQpIHsKICAgICAgICBweCA9IHBhcmVudC54OwogICAgICAgIHB5ID0gcGFyZW50Lnk7CiAgICAgICAgLy8gZ2V0IHRoZSBub3JtYWxpemVkIGRpcmVjdGlvbiBvZiB0cmF2ZWwKICAgICAgICBkeCA9ICh4IC0gcHgpIC8gTWF0aC5tYXgoTWF0aC5hYnMoeCAtIHB4KSwgMSk7CiAgICAgICAgZHkgPSAoeSAtIHB5KSAvIE1hdGgubWF4KE1hdGguYWJzKHkgLSBweSksIDEpOwogICAgICAgIC8vIHNlYXJjaCBkaWFnb25hbGx5CiAgICAgICAgaWYgKGR4ICE9PSAwICYmIGR5ICE9PSAwKSB7CiAgICAgICAgICAgIGlmIChncmlkLmlzV2Fsa2FibGVBdCh4LCB5ICsgZHkpKSB7CiAgICAgICAgICAgICAgICBuZWlnaGJvcnMucHVzaChbeCwgeSArIGR5XSk7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgaWYgKGdyaWQuaXNXYWxrYWJsZUF0KHggKyBkeCwgeSkpIHsKICAgICAgICAgICAgICAgIG5laWdoYm9ycy5wdXNoKFt4ICsgZHgsIHldKTsKICAgICAgICAgICAgfQogICAgICAgICAgICBpZiAoZ3JpZC5pc1dhbGthYmxlQXQoeCArIGR4LCB5ICsgZHkpKSB7CiAgICAgICAgICAgICAgICBuZWlnaGJvcnMucHVzaChbeCArIGR4LCB5ICsgZHldKTsKICAgICAgICAgICAgfQogICAgICAgICAgICBpZiAoIWdyaWQuaXNXYWxrYWJsZUF0KHggLSBkeCwgeSkpIHsKICAgICAgICAgICAgICAgIG5laWdoYm9ycy5wdXNoKFt4IC0gZHgsIHkgKyBkeV0pOwogICAgICAgICAgICB9CiAgICAgICAgICAgIGlmICghZ3JpZC5pc1dhbGthYmxlQXQoeCwgeSAtIGR5KSkgewogICAgICAgICAgICAgICAgbmVpZ2hib3JzLnB1c2goW3ggKyBkeCwgeSAtIGR5XSk7CiAgICAgICAgICAgIH0KICAgICAgICB9CiAgICAgICAgLy8gc2VhcmNoIGhvcml6b250YWxseS92ZXJ0aWNhbGx5CiAgICAgICAgZWxzZSB7CiAgICAgICAgICAgIGlmIChkeCA9PT0gMCkgewogICAgICAgICAgICAgICAgaWYgKGdyaWQuaXNXYWxrYWJsZUF0KHgsIHkgKyBkeSkpIHsKICAgICAgICAgICAgICAgICAgICBuZWlnaGJvcnMucHVzaChbeCwgeSArIGR5XSk7CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICBpZiAoIWdyaWQuaXNXYWxrYWJsZUF0KHggKyAxLCB5KSkgewogICAgICAgICAgICAgICAgICAgIG5laWdoYm9ycy5wdXNoKFt4ICsgMSwgeSArIGR5XSk7CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICBpZiAoIWdyaWQuaXNXYWxrYWJsZUF0KHggLSAxLCB5KSkgewogICAgICAgICAgICAgICAgICAgIG5laWdoYm9ycy5wdXNoKFt4IC0gMSwgeSArIGR5XSk7CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgIH0KICAgICAgICAgICAgZWxzZSB7CiAgICAgICAgICAgICAgICBpZiAoZ3JpZC5pc1dhbGthYmxlQXQoeCArIGR4LCB5KSkgewogICAgICAgICAgICAgICAgICAgIG5laWdoYm9ycy5wdXNoKFt4ICsgZHgsIHldKTsKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgIGlmICghZ3JpZC5pc1dhbGthYmxlQXQoeCwgeSArIDEpKSB7CiAgICAgICAgICAgICAgICAgICAgbmVpZ2hib3JzLnB1c2goW3ggKyBkeCwgeSArIDFdKTsKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgIGlmICghZ3JpZC5pc1dhbGthYmxlQXQoeCwgeSAtIDEpKSB7CiAgICAgICAgICAgICAgICAgICAgbmVpZ2hib3JzLnB1c2goW3ggKyBkeCwgeSAtIDFdKTsKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgfQogICAgICAgIH0KICAgIH0KICAgIC8vIHJldHVybiBhbGwgbmVpZ2hib3JzCiAgICBlbHNlIHsKICAgICAgICBuZWlnaGJvck5vZGVzID0gZ3JpZC5nZXROZWlnaGJvcnMobm9kZSwgRGlhZ29uYWxNb3ZlbWVudC5BbHdheXMpOwogICAgICAgIGZvciAoaSA9IDAsIGwgPSBuZWlnaGJvck5vZGVzLmxlbmd0aDsgaSA8IGw7ICsraSkgewogICAgICAgICAgICBuZWlnaGJvck5vZGUgPSBuZWlnaGJvck5vZGVzW2ldOwogICAgICAgICAgICBuZWlnaGJvcnMucHVzaChbbmVpZ2hib3JOb2RlLngsIG5laWdoYm9yTm9kZS55XSk7CiAgICAgICAgfQogICAgfQogICAgcmV0dXJuIG5laWdoYm9yczsKfTsKbW9kdWxlLmV4cG9ydHMgPSBKUEZBbHdheXNNb3ZlRGlhZ29uYWxseTsKCgovKioqLyB9KSwKLyogMzYgKi8KLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykgewoKLyoqCiAqIEBhdXRob3IgaW1vciAvIGh0dHBzOi8vZ2l0aHViLmNvbS9pbW9yCiAqLwp2YXIgSnVtcFBvaW50RmluZGVyQmFzZSA9IF9fd2VicGFja19yZXF1aXJlX18oNSk7CnZhciBEaWFnb25hbE1vdmVtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXygwKTsKLyoqCiAqIFBhdGggZmluZGVyIHVzaW5nIHRoZSBKdW1wIFBvaW50IFNlYXJjaCBhbGdvcml0aG0gd2hpY2ggbW92ZXMKICogZGlhZ29uYWxseSBvbmx5IHdoZW4gdGhlcmUgYXJlIG5vIG9ic3RhY2xlcy4KICovCmZ1bmN0aW9uIEpQRk1vdmVEaWFnb25hbGx5SWZOb09ic3RhY2xlcyhvcHQpIHsKICAgIEp1bXBQb2ludEZpbmRlckJhc2UuY2FsbCh0aGlzLCBvcHQpOwp9CkpQRk1vdmVEaWFnb25hbGx5SWZOb09ic3RhY2xlcy5wcm90b3R5cGUgPSBuZXcgSnVtcFBvaW50RmluZGVyQmFzZSgpOwpKUEZNb3ZlRGlhZ29uYWxseUlmTm9PYnN0YWNsZXMucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gSlBGTW92ZURpYWdvbmFsbHlJZk5vT2JzdGFjbGVzOwovKioKICogU2VhcmNoIHJlY3Vyc2l2ZWx5IGluIHRoZSBkaXJlY3Rpb24gKHBhcmVudCAtPiBjaGlsZCksIHN0b3BwaW5nIG9ubHkgd2hlbiBhCiAqIGp1bXAgcG9pbnQgaXMgZm91bmQuCiAqIEBwcm90ZWN0ZWQKICogQHJldHVybiB7QXJyYXk8QXJyYXk8bnVtYmVyPj59IFRoZSB4LCB5IGNvb3JkaW5hdGUgb2YgdGhlIGp1bXAgcG9pbnQKICogICAgIGZvdW5kLCBvciBudWxsIGlmIG5vdCBmb3VuZAogKi8KSlBGTW92ZURpYWdvbmFsbHlJZk5vT2JzdGFjbGVzLnByb3RvdHlwZS5fanVtcCA9IGZ1bmN0aW9uICh4LCB5LCBweCwgcHkpIHsKICAgIHZhciBncmlkID0gdGhpcy5ncmlkLCBkeCA9IHggLSBweCwgZHkgPSB5IC0gcHk7CiAgICBpZiAoIWdyaWQuaXNXYWxrYWJsZUF0KHgsIHkpKSB7CiAgICAgICAgcmV0dXJuIG51bGw7CiAgICB9CiAgICBpZiAodGhpcy50cmFja0p1bXBSZWN1cnNpb24gPT09IHRydWUpIHsKICAgICAgICBncmlkLmdldE5vZGVBdCh4LCB5KS50ZXN0ZWQgPSB0cnVlOwogICAgfQogICAgaWYgKGdyaWQuZ2V0Tm9kZUF0KHgsIHkpID09PSB0aGlzLmVuZE5vZGUpIHsKICAgICAgICByZXR1cm4gW3gsIHldOwogICAgfQogICAgLy8gY2hlY2sgZm9yIGZvcmNlZCBuZWlnaGJvcnMKICAgIC8vIGFsb25nIHRoZSBkaWFnb25hbAogICAgaWYgKGR4ICE9PSAwICYmIGR5ICE9PSAwKSB7CiAgICAgICAgLy8gaWYgKChncmlkLmlzV2Fsa2FibGVBdCh4IC0gZHgsIHkgKyBkeSkgJiYgIWdyaWQuaXNXYWxrYWJsZUF0KHggLSBkeCwgeSkpIHx8CiAgICAgICAgLy8gKGdyaWQuaXNXYWxrYWJsZUF0KHggKyBkeCwgeSAtIGR5KSAmJiAhZ3JpZC5pc1dhbGthYmxlQXQoeCwgeSAtIGR5KSkpIHsKICAgICAgICAvLyByZXR1cm4gW3gsIHldOwogICAgICAgIC8vIH0KICAgICAgICAvLyB3aGVuIG1vdmluZyBkaWFnb25hbGx5LCBtdXN0IGNoZWNrIGZvciB2ZXJ0aWNhbC9ob3Jpem9udGFsIGp1bXAgcG9pbnRzCiAgICAgICAgaWYgKHRoaXMuX2p1bXAoeCArIGR4LCB5LCB4LCB5KSB8fCB0aGlzLl9qdW1wKHgsIHkgKyBkeSwgeCwgeSkpIHsKICAgICAgICAgICAgcmV0dXJuIFt4LCB5XTsKICAgICAgICB9CiAgICB9CiAgICAvLyBob3Jpem9udGFsbHkvdmVydGljYWxseQogICAgZWxzZSB7CiAgICAgICAgaWYgKGR4ICE9PSAwKSB7CiAgICAgICAgICAgIGlmICgoZ3JpZC5pc1dhbGthYmxlQXQoeCwgeSAtIDEpICYmICFncmlkLmlzV2Fsa2FibGVBdCh4IC0gZHgsIHkgLSAxKSkgfHwKICAgICAgICAgICAgICAgIChncmlkLmlzV2Fsa2FibGVBdCh4LCB5ICsgMSkgJiYgIWdyaWQuaXNXYWxrYWJsZUF0KHggLSBkeCwgeSArIDEpKSkgewogICAgICAgICAgICAgICAgcmV0dXJuIFt4LCB5XTsKICAgICAgICAgICAgfQogICAgICAgIH0KICAgICAgICBlbHNlIGlmIChkeSAhPT0gMCkgewogICAgICAgICAgICBpZiAoKGdyaWQuaXNXYWxrYWJsZUF0KHggLSAxLCB5KSAmJiAhZ3JpZC5pc1dhbGthYmxlQXQoeCAtIDEsIHkgLSBkeSkpIHx8CiAgICAgICAgICAgICAgICAoZ3JpZC5pc1dhbGthYmxlQXQoeCArIDEsIHkpICYmICFncmlkLmlzV2Fsa2FibGVBdCh4ICsgMSwgeSAtIGR5KSkpIHsKICAgICAgICAgICAgICAgIHJldHVybiBbeCwgeV07CiAgICAgICAgICAgIH0KICAgICAgICAgICAgLy8gV2hlbiBtb3ZpbmcgdmVydGljYWxseSwgbXVzdCBjaGVjayBmb3IgaG9yaXpvbnRhbCBqdW1wIHBvaW50cwogICAgICAgICAgICAvLyBpZiAodGhpcy5fanVtcCh4ICsgMSwgeSwgeCwgeSkgfHwgdGhpcy5fanVtcCh4IC0gMSwgeSwgeCwgeSkpIHsKICAgICAgICAgICAgLy8gcmV0dXJuIFt4LCB5XTsKICAgICAgICAgICAgLy8gfQogICAgICAgIH0KICAgIH0KICAgIC8vIG1vdmluZyBkaWFnb25hbGx5LCBtdXN0IG1ha2Ugc3VyZSBvbmUgb2YgdGhlIHZlcnRpY2FsL2hvcml6b250YWwKICAgIC8vIG5laWdoYm9ycyBpcyBvcGVuIHRvIGFsbG93IHRoZSBwYXRoCiAgICBpZiAoZ3JpZC5pc1dhbGthYmxlQXQoeCArIGR4LCB5KSAmJiBncmlkLmlzV2Fsa2FibGVBdCh4LCB5ICsgZHkpKSB7CiAgICAgICAgcmV0dXJuIHRoaXMuX2p1bXAoeCArIGR4LCB5ICsgZHksIHgsIHkpOwogICAgfQogICAgZWxzZSB7CiAgICAgICAgcmV0dXJuIG51bGw7CiAgICB9Cn07Ci8qKgogKiBGaW5kIHRoZSBuZWlnaGJvcnMgZm9yIHRoZSBnaXZlbiBub2RlLiBJZiB0aGUgbm9kZSBoYXMgYSBwYXJlbnQsCiAqIHBydW5lIHRoZSBuZWlnaGJvcnMgYmFzZWQgb24gdGhlIGp1bXAgcG9pbnQgc2VhcmNoIGFsZ29yaXRobSwgb3RoZXJ3aXNlCiAqIHJldHVybiBhbGwgYXZhaWxhYmxlIG5laWdoYm9ycy4KICogQHJldHVybiB7QXJyYXk8QXJyYXk8bnVtYmVyPj59IFRoZSBuZWlnaGJvcnMgZm91bmQuCiAqLwpKUEZNb3ZlRGlhZ29uYWxseUlmTm9PYnN0YWNsZXMucHJvdG90eXBlLl9maW5kTmVpZ2hib3JzID0gZnVuY3Rpb24gKG5vZGUpIHsKICAgIHZhciBwYXJlbnQgPSBub2RlLnBhcmVudCwgeCA9IG5vZGUueCwgeSA9IG5vZGUueSwgZ3JpZCA9IHRoaXMuZ3JpZCwgcHgsIHB5LCBueCwgbnksIGR4LCBkeSwgbmVpZ2hib3JzID0gW10sIG5laWdoYm9yTm9kZXMsIG5laWdoYm9yTm9kZSwgaSwgbDsKICAgIC8vIGRpcmVjdGVkIHBydW5pbmc6IGNhbiBpZ25vcmUgbW9zdCBuZWlnaGJvcnMsIHVubGVzcyBmb3JjZWQuCiAgICBpZiAocGFyZW50KSB7CiAgICAgICAgcHggPSBwYXJlbnQueDsKICAgICAgICBweSA9IHBhcmVudC55OwogICAgICAgIC8vIGdldCB0aGUgbm9ybWFsaXplZCBkaXJlY3Rpb24gb2YgdHJhdmVsCiAgICAgICAgZHggPSAoeCAtIHB4KSAvIE1hdGgubWF4KE1hdGguYWJzKHggLSBweCksIDEpOwogICAgICAgIGR5ID0gKHkgLSBweSkgLyBNYXRoLm1heChNYXRoLmFicyh5IC0gcHkpLCAxKTsKICAgICAgICAvLyBzZWFyY2ggZGlhZ29uYWxseQogICAgICAgIGlmIChkeCAhPT0gMCAmJiBkeSAhPT0gMCkgewogICAgICAgICAgICBpZiAoZ3JpZC5pc1dhbGthYmxlQXQoeCwgeSArIGR5KSkgewogICAgICAgICAgICAgICAgbmVpZ2hib3JzLnB1c2goW3gsIHkgKyBkeV0pOwogICAgICAgICAgICB9CiAgICAgICAgICAgIGlmIChncmlkLmlzV2Fsa2FibGVBdCh4ICsgZHgsIHkpKSB7CiAgICAgICAgICAgICAgICBuZWlnaGJvcnMucHVzaChbeCArIGR4LCB5XSk7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgaWYgKGdyaWQuaXNXYWxrYWJsZUF0KHgsIHkgKyBkeSkgJiYgZ3JpZC5pc1dhbGthYmxlQXQoeCArIGR4LCB5KSkgewogICAgICAgICAgICAgICAgbmVpZ2hib3JzLnB1c2goW3ggKyBkeCwgeSArIGR5XSk7CiAgICAgICAgICAgIH0KICAgICAgICB9CiAgICAgICAgLy8gc2VhcmNoIGhvcml6b250YWxseS92ZXJ0aWNhbGx5CiAgICAgICAgZWxzZSB7CiAgICAgICAgICAgIHZhciBpc05leHRXYWxrYWJsZTsKICAgICAgICAgICAgaWYgKGR4ICE9PSAwKSB7CiAgICAgICAgICAgICAgICBpc05leHRXYWxrYWJsZSA9IGdyaWQuaXNXYWxrYWJsZUF0KHggKyBkeCwgeSk7CiAgICAgICAgICAgICAgICB2YXIgaXNUb3BXYWxrYWJsZSA9IGdyaWQuaXNXYWxrYWJsZUF0KHgsIHkgKyAxKTsKICAgICAgICAgICAgICAgIHZhciBpc0JvdHRvbVdhbGthYmxlID0gZ3JpZC5pc1dhbGthYmxlQXQoeCwgeSAtIDEpOwogICAgICAgICAgICAgICAgaWYgKGlzTmV4dFdhbGthYmxlKSB7CiAgICAgICAgICAgICAgICAgICAgbmVpZ2hib3JzLnB1c2goW3ggKyBkeCwgeV0pOwogICAgICAgICAgICAgICAgICAgIGlmIChpc1RvcFdhbGthYmxlKSB7CiAgICAgICAgICAgICAgICAgICAgICAgIG5laWdoYm9ycy5wdXNoKFt4ICsgZHgsIHkgKyAxXSk7CiAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgICAgIGlmIChpc0JvdHRvbVdhbGthYmxlKSB7CiAgICAgICAgICAgICAgICAgICAgICAgIG5laWdoYm9ycy5wdXNoKFt4ICsgZHgsIHkgLSAxXSk7CiAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgaWYgKGlzVG9wV2Fsa2FibGUpIHsKICAgICAgICAgICAgICAgICAgICBuZWlnaGJvcnMucHVzaChbeCwgeSArIDFdKTsKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgIGlmIChpc0JvdHRvbVdhbGthYmxlKSB7CiAgICAgICAgICAgICAgICAgICAgbmVpZ2hib3JzLnB1c2goW3gsIHkgLSAxXSk7CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgIH0KICAgICAgICAgICAgZWxzZSBpZiAoZHkgIT09IDApIHsKICAgICAgICAgICAgICAgIGlzTmV4dFdhbGthYmxlID0gZ3JpZC5pc1dhbGthYmxlQXQoeCwgeSArIGR5KTsKICAgICAgICAgICAgICAgIHZhciBpc1JpZ2h0V2Fsa2FibGUgPSBncmlkLmlzV2Fsa2FibGVBdCh4ICsgMSwgeSk7CiAgICAgICAgICAgICAgICB2YXIgaXNMZWZ0V2Fsa2FibGUgPSBncmlkLmlzV2Fsa2FibGVBdCh4IC0gMSwgeSk7CiAgICAgICAgICAgICAgICBpZiAoaXNOZXh0V2Fsa2FibGUpIHsKICAgICAgICAgICAgICAgICAgICBuZWlnaGJvcnMucHVzaChbeCwgeSArIGR5XSk7CiAgICAgICAgICAgICAgICAgICAgaWYgKGlzUmlnaHRXYWxrYWJsZSkgewogICAgICAgICAgICAgICAgICAgICAgICBuZWlnaGJvcnMucHVzaChbeCArIDEsIHkgKyBkeV0pOwogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICBpZiAoaXNMZWZ0V2Fsa2FibGUpIHsKICAgICAgICAgICAgICAgICAgICAgICAgbmVpZ2hib3JzLnB1c2goW3ggLSAxLCB5ICsgZHldKTsKICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICBpZiAoaXNSaWdodFdhbGthYmxlKSB7CiAgICAgICAgICAgICAgICAgICAgbmVpZ2hib3JzLnB1c2goW3ggKyAxLCB5XSk7CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICBpZiAoaXNMZWZ0V2Fsa2FibGUpIHsKICAgICAgICAgICAgICAgICAgICBuZWlnaGJvcnMucHVzaChbeCAtIDEsIHldKTsKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgfQogICAgICAgIH0KICAgIH0KICAgIC8vIHJldHVybiBhbGwgbmVpZ2hib3JzCiAgICBlbHNlIHsKICAgICAgICBuZWlnaGJvck5vZGVzID0gZ3JpZC5nZXROZWlnaGJvcnMobm9kZSwgRGlhZ29uYWxNb3ZlbWVudC5Pbmx5V2hlbk5vT2JzdGFjbGVzKTsKICAgICAgICBmb3IgKGkgPSAwLCBsID0gbmVpZ2hib3JOb2Rlcy5sZW5ndGg7IGkgPCBsOyArK2kpIHsKICAgICAgICAgICAgbmVpZ2hib3JOb2RlID0gbmVpZ2hib3JOb2Rlc1tpXTsKICAgICAgICAgICAgbmVpZ2hib3JzLnB1c2goW25laWdoYm9yTm9kZS54LCBuZWlnaGJvck5vZGUueV0pOwogICAgICAgIH0KICAgIH0KICAgIHJldHVybiBuZWlnaGJvcnM7Cn07Cm1vZHVsZS5leHBvcnRzID0gSlBGTW92ZURpYWdvbmFsbHlJZk5vT2JzdGFjbGVzOwoKCi8qKiovIH0pLAovKiAzNyAqLwovKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7CgovKioKICogQGF1dGhvciBpbW9yIC8gaHR0cHM6Ly9naXRodWIuY29tL2ltb3IKICovCnZhciBKdW1wUG9pbnRGaW5kZXJCYXNlID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1KTsKdmFyIERpYWdvbmFsTW92ZW1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDApOwovKioKICogUGF0aCBmaW5kZXIgdXNpbmcgdGhlIEp1bXAgUG9pbnQgU2VhcmNoIGFsZ29yaXRobSB3aGljaCBtb3ZlcwogKiBkaWFnb25hbGx5IG9ubHkgd2hlbiB0aGVyZSBpcyBhdCBtb3N0IG9uZSBvYnN0YWNsZS4KICovCmZ1bmN0aW9uIEpQRk1vdmVEaWFnb25hbGx5SWZBdE1vc3RPbmVPYnN0YWNsZShvcHQpIHsKICAgIEp1bXBQb2ludEZpbmRlckJhc2UuY2FsbCh0aGlzLCBvcHQpOwp9CkpQRk1vdmVEaWFnb25hbGx5SWZBdE1vc3RPbmVPYnN0YWNsZS5wcm90b3R5cGUgPSBuZXcgSnVtcFBvaW50RmluZGVyQmFzZSgpOwpKUEZNb3ZlRGlhZ29uYWxseUlmQXRNb3N0T25lT2JzdGFjbGUucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gSlBGTW92ZURpYWdvbmFsbHlJZkF0TW9zdE9uZU9ic3RhY2xlOwovKioKICogU2VhcmNoIHJlY3Vyc2l2ZWx5IGluIHRoZSBkaXJlY3Rpb24gKHBhcmVudCAtPiBjaGlsZCksIHN0b3BwaW5nIG9ubHkgd2hlbiBhCiAqIGp1bXAgcG9pbnQgaXMgZm91bmQuCiAqIEBwcm90ZWN0ZWQKICogQHJldHVybiB7QXJyYXk8QXJyYXk8bnVtYmVyPj59IFRoZSB4LCB5IGNvb3JkaW5hdGUgb2YgdGhlIGp1bXAgcG9pbnQKICogICAgIGZvdW5kLCBvciBudWxsIGlmIG5vdCBmb3VuZAogKi8KSlBGTW92ZURpYWdvbmFsbHlJZkF0TW9zdE9uZU9ic3RhY2xlLnByb3RvdHlwZS5fanVtcCA9IGZ1bmN0aW9uICh4LCB5LCBweCwgcHkpIHsKICAgIHZhciBncmlkID0gdGhpcy5ncmlkLCBkeCA9IHggLSBweCwgZHkgPSB5IC0gcHk7CiAgICBpZiAoIWdyaWQuaXNXYWxrYWJsZUF0KHgsIHkpKSB7CiAgICAgICAgcmV0dXJuIG51bGw7CiAgICB9CiAgICBpZiAodGhpcy50cmFja0p1bXBSZWN1cnNpb24gPT09IHRydWUpIHsKICAgICAgICBncmlkLmdldE5vZGVBdCh4LCB5KS50ZXN0ZWQgPSB0cnVlOwogICAgfQogICAgaWYgKGdyaWQuZ2V0Tm9kZUF0KHgsIHkpID09PSB0aGlzLmVuZE5vZGUpIHsKICAgICAgICByZXR1cm4gW3gsIHldOwogICAgfQogICAgLy8gY2hlY2sgZm9yIGZvcmNlZCBuZWlnaGJvcnMKICAgIC8vIGFsb25nIHRoZSBkaWFnb25hbAogICAgaWYgKGR4ICE9PSAwICYmIGR5ICE9PSAwKSB7CiAgICAgICAgaWYgKChncmlkLmlzV2Fsa2FibGVBdCh4IC0gZHgsIHkgKyBkeSkgJiYgIWdyaWQuaXNXYWxrYWJsZUF0KHggLSBkeCwgeSkpIHx8CiAgICAgICAgICAgIChncmlkLmlzV2Fsa2FibGVBdCh4ICsgZHgsIHkgLSBkeSkgJiYgIWdyaWQuaXNXYWxrYWJsZUF0KHgsIHkgLSBkeSkpKSB7CiAgICAgICAgICAgIHJldHVybiBbeCwgeV07CiAgICAgICAgfQogICAgICAgIC8vIHdoZW4gbW92aW5nIGRpYWdvbmFsbHksIG11c3QgY2hlY2sgZm9yIHZlcnRpY2FsL2hvcml6b250YWwganVtcCBwb2ludHMKICAgICAgICBpZiAodGhpcy5fanVtcCh4ICsgZHgsIHksIHgsIHkpIHx8IHRoaXMuX2p1bXAoeCwgeSArIGR5LCB4LCB5KSkgewogICAgICAgICAgICByZXR1cm4gW3gsIHldOwogICAgICAgIH0KICAgIH0KICAgIC8vIGhvcml6b250YWxseS92ZXJ0aWNhbGx5CiAgICBlbHNlIHsKICAgICAgICBpZiAoZHggIT09IDApIHsgLy8gbW92aW5nIGFsb25nIHgKICAgICAgICAgICAgaWYgKChncmlkLmlzV2Fsa2FibGVBdCh4ICsgZHgsIHkgKyAxKSAmJiAhZ3JpZC5pc1dhbGthYmxlQXQoeCwgeSArIDEpKSB8fAogICAgICAgICAgICAgICAgKGdyaWQuaXNXYWxrYWJsZUF0KHggKyBkeCwgeSAtIDEpICYmICFncmlkLmlzV2Fsa2FibGVBdCh4LCB5IC0gMSkpKSB7CiAgICAgICAgICAgICAgICByZXR1cm4gW3gsIHldOwogICAgICAgICAgICB9CiAgICAgICAgfQogICAgICAgIGVsc2UgewogICAgICAgICAgICBpZiAoKGdyaWQuaXNXYWxrYWJsZUF0KHggKyAxLCB5ICsgZHkpICYmICFncmlkLmlzV2Fsa2FibGVBdCh4ICsgMSwgeSkpIHx8CiAgICAgICAgICAgICAgICAoZ3JpZC5pc1dhbGthYmxlQXQoeCAtIDEsIHkgKyBkeSkgJiYgIWdyaWQuaXNXYWxrYWJsZUF0KHggLSAxLCB5KSkpIHsKICAgICAgICAgICAgICAgIHJldHVybiBbeCwgeV07CiAgICAgICAgICAgIH0KICAgICAgICB9CiAgICB9CiAgICAvLyBtb3ZpbmcgZGlhZ29uYWxseSwgbXVzdCBtYWtlIHN1cmUgb25lIG9mIHRoZSB2ZXJ0aWNhbC9ob3Jpem9udGFsCiAgICAvLyBuZWlnaGJvcnMgaXMgb3BlbiB0byBhbGxvdyB0aGUgcGF0aAogICAgaWYgKGdyaWQuaXNXYWxrYWJsZUF0KHggKyBkeCwgeSkgfHwgZ3JpZC5pc1dhbGthYmxlQXQoeCwgeSArIGR5KSkgewogICAgICAgIHJldHVybiB0aGlzLl9qdW1wKHggKyBkeCwgeSArIGR5LCB4LCB5KTsKICAgIH0KICAgIGVsc2UgewogICAgICAgIHJldHVybiBudWxsOwogICAgfQp9OwovKioKICogRmluZCB0aGUgbmVpZ2hib3JzIGZvciB0aGUgZ2l2ZW4gbm9kZS4gSWYgdGhlIG5vZGUgaGFzIGEgcGFyZW50LAogKiBwcnVuZSB0aGUgbmVpZ2hib3JzIGJhc2VkIG9uIHRoZSBqdW1wIHBvaW50IHNlYXJjaCBhbGdvcml0aG0sIG90aGVyd2lzZQogKiByZXR1cm4gYWxsIGF2YWlsYWJsZSBuZWlnaGJvcnMuCiAqIEByZXR1cm4ge0FycmF5PEFycmF5PG51bWJlcj4+fSBUaGUgbmVpZ2hib3JzIGZvdW5kLgogKi8KSlBGTW92ZURpYWdvbmFsbHlJZkF0TW9zdE9uZU9ic3RhY2xlLnByb3RvdHlwZS5fZmluZE5laWdoYm9ycyA9IGZ1bmN0aW9uIChub2RlKSB7CiAgICB2YXIgcGFyZW50ID0gbm9kZS5wYXJlbnQsIHggPSBub2RlLngsIHkgPSBub2RlLnksIGdyaWQgPSB0aGlzLmdyaWQsIHB4LCBweSwgbngsIG55LCBkeCwgZHksIG5laWdoYm9ycyA9IFtdLCBuZWlnaGJvck5vZGVzLCBuZWlnaGJvck5vZGUsIGksIGw7CiAgICAvLyBkaXJlY3RlZCBwcnVuaW5nOiBjYW4gaWdub3JlIG1vc3QgbmVpZ2hib3JzLCB1bmxlc3MgZm9yY2VkLgogICAgaWYgKHBhcmVudCkgewogICAgICAgIHB4ID0gcGFyZW50Lng7CiAgICAgICAgcHkgPSBwYXJlbnQueTsKICAgICAgICAvLyBnZXQgdGhlIG5vcm1hbGl6ZWQgZGlyZWN0aW9uIG9mIHRyYXZlbAogICAgICAgIGR4ID0gKHggLSBweCkgLyBNYXRoLm1heChNYXRoLmFicyh4IC0gcHgpLCAxKTsKICAgICAgICBkeSA9ICh5IC0gcHkpIC8gTWF0aC5tYXgoTWF0aC5hYnMoeSAtIHB5KSwgMSk7CiAgICAgICAgLy8gc2VhcmNoIGRpYWdvbmFsbHkKICAgICAgICBpZiAoZHggIT09IDAgJiYgZHkgIT09IDApIHsKICAgICAgICAgICAgaWYgKGdyaWQuaXNXYWxrYWJsZUF0KHgsIHkgKyBkeSkpIHsKICAgICAgICAgICAgICAgIG5laWdoYm9ycy5wdXNoKFt4LCB5ICsgZHldKTsKICAgICAgICAgICAgfQogICAgICAgICAgICBpZiAoZ3JpZC5pc1dhbGthYmxlQXQoeCArIGR4LCB5KSkgewogICAgICAgICAgICAgICAgbmVpZ2hib3JzLnB1c2goW3ggKyBkeCwgeV0pOwogICAgICAgICAgICB9CiAgICAgICAgICAgIGlmIChncmlkLmlzV2Fsa2FibGVBdCh4LCB5ICsgZHkpIHx8IGdyaWQuaXNXYWxrYWJsZUF0KHggKyBkeCwgeSkpIHsKICAgICAgICAgICAgICAgIG5laWdoYm9ycy5wdXNoKFt4ICsgZHgsIHkgKyBkeV0pOwogICAgICAgICAgICB9CiAgICAgICAgICAgIGlmICghZ3JpZC5pc1dhbGthYmxlQXQoeCAtIGR4LCB5KSAmJiBncmlkLmlzV2Fsa2FibGVBdCh4LCB5ICsgZHkpKSB7CiAgICAgICAgICAgICAgICBuZWlnaGJvcnMucHVzaChbeCAtIGR4LCB5ICsgZHldKTsKICAgICAgICAgICAgfQogICAgICAgICAgICBpZiAoIWdyaWQuaXNXYWxrYWJsZUF0KHgsIHkgLSBkeSkgJiYgZ3JpZC5pc1dhbGthYmxlQXQoeCArIGR4LCB5KSkgewogICAgICAgICAgICAgICAgbmVpZ2hib3JzLnB1c2goW3ggKyBkeCwgeSAtIGR5XSk7CiAgICAgICAgICAgIH0KICAgICAgICB9CiAgICAgICAgLy8gc2VhcmNoIGhvcml6b250YWxseS92ZXJ0aWNhbGx5CiAgICAgICAgZWxzZSB7CiAgICAgICAgICAgIGlmIChkeCA9PT0gMCkgewogICAgICAgICAgICAgICAgaWYgKGdyaWQuaXNXYWxrYWJsZUF0KHgsIHkgKyBkeSkpIHsKICAgICAgICAgICAgICAgICAgICBuZWlnaGJvcnMucHVzaChbeCwgeSArIGR5XSk7CiAgICAgICAgICAgICAgICAgICAgaWYgKCFncmlkLmlzV2Fsa2FibGVBdCh4ICsgMSwgeSkpIHsKICAgICAgICAgICAgICAgICAgICAgICAgbmVpZ2hib3JzLnB1c2goW3ggKyAxLCB5ICsgZHldKTsKICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgaWYgKCFncmlkLmlzV2Fsa2FibGVBdCh4IC0gMSwgeSkpIHsKICAgICAgICAgICAgICAgICAgICAgICAgbmVpZ2hib3JzLnB1c2goW3ggLSAxLCB5ICsgZHldKTsKICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgIH0KICAgICAgICAgICAgZWxzZSB7CiAgICAgICAgICAgICAgICBpZiAoZ3JpZC5pc1dhbGthYmxlQXQoeCArIGR4LCB5KSkgewogICAgICAgICAgICAgICAgICAgIG5laWdoYm9ycy5wdXNoKFt4ICsgZHgsIHldKTsKICAgICAgICAgICAgICAgICAgICBpZiAoIWdyaWQuaXNXYWxrYWJsZUF0KHgsIHkgKyAxKSkgewogICAgICAgICAgICAgICAgICAgICAgICBuZWlnaGJvcnMucHVzaChbeCArIGR4LCB5ICsgMV0pOwogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICAgICBpZiAoIWdyaWQuaXNXYWxrYWJsZUF0KHgsIHkgLSAxKSkgewogICAgICAgICAgICAgICAgICAgICAgICBuZWlnaGJvcnMucHVzaChbeCArIGR4LCB5IC0gMV0pOwogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgfQogICAgICAgIH0KICAgIH0KICAgIC8vIHJldHVybiBhbGwgbmVpZ2hib3JzCiAgICBlbHNlIHsKICAgICAgICBuZWlnaGJvck5vZGVzID0gZ3JpZC5nZXROZWlnaGJvcnMobm9kZSwgRGlhZ29uYWxNb3ZlbWVudC5JZkF0TW9zdE9uZU9ic3RhY2xlKTsKICAgICAgICBmb3IgKGkgPSAwLCBsID0gbmVpZ2hib3JOb2Rlcy5sZW5ndGg7IGkgPCBsOyArK2kpIHsKICAgICAgICAgICAgbmVpZ2hib3JOb2RlID0gbmVpZ2hib3JOb2Rlc1tpXTsKICAgICAgICAgICAgbmVpZ2hib3JzLnB1c2goW25laWdoYm9yTm9kZS54LCBuZWlnaGJvck5vZGUueV0pOwogICAgICAgIH0KICAgIH0KICAgIHJldHVybiBuZWlnaGJvcnM7Cn07Cm1vZHVsZS5leHBvcnRzID0gSlBGTW92ZURpYWdvbmFsbHlJZkF0TW9zdE9uZU9ic3RhY2xlOwoKCi8qKiovIH0pCi8qKioqKiovIF0pOw=="); // replaced by build step in webpack
        // (worker code is found in appworker.ts)
        // config.doodads contains info about all mountains
        var mountains = config.walls.map(function (x) {
            return {
                x: x[0],
                y: x[1],
                size: x[2]
            };
        });
        spatie_1.Spatie.log("new worker");
        this.worker.postMessage(["setMountains", mountains]);
        this.worker.onmessage = function (e) { return _this.onWorkerMessage(e); };
        this.worker.onerror = function (e) { return _this.onError(e); };
    }
    BotNavigationHub.prototype.findPath = function (myPos, otherPos, callback, errorCallback) {
        if (!this.isReady) {
            // wait for other action to be finished
            return;
        }
        this.lastRequestID++;
        this.findPathCallback = callback;
        this.errorCallback = errorCallback;
        this.worker.postMessage(["findPath", { x: myPos.x, y: myPos.y }, { x: otherPos.x, y: otherPos.y }, this.lastRequestID]);
    };
    BotNavigationHub.prototype.destroy = function () {
        if (this.worker) {
            this.worker.terminate();
            this.worker = null;
        }
    };
    BotNavigationHub.prototype.onWorkerMessage = function (e) {
        var args = e.data;
        var action = args[0];
        if (action === "ERROR") {
            spatie_1.Spatie.log("Error calling worker.");
            this.onError(args.slice(1));
        }
        else if (action === "READY") {
            spatie_1.Spatie.log("worker ready!");
            this.isReady = true;
        }
        else if (action === "LOG") {
            spatie_1.Spatie.log.apply(spatie_1.Spatie, args.slice(1));
        }
        else if (action === "SIGNAL_ALIVE") {
            // worker is still working
            this.lastAliveSignal = Date.now();
        }
        else if (action === "findPath") {
            var path = args[1];
            var requestID = args[2];
            if (requestID === this.lastRequestID) {
                var callback = this.findPathCallback;
                this.findPathCallback = null;
                this.errorCallback = null;
                callback(path);
            }
        }
    };
    BotNavigationHub.prototype.onError = function (error) {
        var errorCallback = this.errorCallback;
        this.errorCallback = null;
        this.findPathCallback = null;
        if (errorCallback) {
            errorCallback(error);
        }
    };
    return BotNavigationHub;
}());
exports.BotNavigationHub = BotNavigationHub;
window.BotNavigationClient = BotNavigationHub;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var spatie_1 = __webpack_require__(2);
var nouns = ["ABYDOCOMIST",
    "BEDSWERVER",
    "BESPAWLER",
    "BOBOLYNE",
    "CUMBERWORLD",
    "DALCOP",
    "DEW-BEATER",
    "DORBEL",
    "DRATE-POKE",
    "DRIGGLE-DRAGGLE",
    "FOPDOODLE",
    "FUSTYLUGS",
    "FUSTILARIAN",
    "GILLIE-WET-FOOT",
    "GNASHGAB",
    "GOBERMOUCH",
    "GOWPENFUL-O'-ANYTHING",
    "KLAZOMANIAC",
    "LEASING-MONGER",
    "LOITER-SACK",
    "LUBBERWORT",
    "MUCK-SPOUT",
    "MUMBLECRUST",
    "QUISBY",
    "RAGGABRASH",
    "RAKEFIRE",
    "ROIDERBANKS",
    "SADDLE-GOOSE",
    "SCOBBERLOTCHER",
    "SKELPIE-LIMMER",
    "SMELL-FEAST",
    "SMELLFUNGUS",
    "SNOUTBAND",
    "SORNER",
    "STAMPCRAB",
    "STYMPHALIST",
    "TALLOWCATCH",
    "TRIPTAKER",
    "WANDOUGHT",
    "WHIFFLE-WHAFFLE",
    "YALDSON",
    "ZOILIST"];
var adjectives = [
    "Arrogant",
    "Big-headed",
    "Self-centred",
    "Vain",
    "Boastful",
    "Pompous",
    "Callous",
    "Cynical",
    "Overcritical",
    "Patronising",
    "Aloof",
    "Impolite",
    "Inconsiderate",
    "Thoughtless",
    "Confrontational",
    "Defensive",
    "Hostile",
    "Belligerent",
    "Bitchy",
    "Nasty",
    "Bossy",
    "Cruel",
    "Domineering",
    "Deceitful",
    "Dishonest",
    "Machiavellian",
    "Sneaky",
    "Untrustworthy",
    "Dogmatic",
    "Inflexible",
    "Intolerant",
    "Narrow-minded",
    "Stubborn",
    "Obstinate",
    "Pig-headed",
    "Fussy",
    "Indiscreet",
    "Tactless",
    "Unpredictable",
    "Vague",
    "Impatient",
    "Unreliable",
    "Jealous",
    "Possessive",
    "Resentful",
    "Secretive",
    "Idle",
    "Careless",
    "Irresponsible",
    "Untidy",
    "Cowardly",
    "Foolish",
    "Gullible",
    "Indecisive",
    "Weak-willed",
    "Quick-tempered",
    "Grumpy",
    "Moody",
    "Pessimistic",
    "Sullen",
    "Touchy",
    "Overemotional",
    "Clingy",
    "Finicky",
    "Silly",
    "Vulgar"
];
function getInsult() {
    var nounIndex = spatie_1.Spatie.getRandomNumber(0, nouns.length + 1);
    var adjIndex = spatie_1.Spatie.getRandomNumber(0, adjectives.length + 1);
    return adjectives[adjIndex] + " " + nouns[nounIndex];
}
exports.getInsult = getInsult;


/***/ })
/******/ ]);
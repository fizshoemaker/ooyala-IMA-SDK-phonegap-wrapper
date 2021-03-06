
// Constants
const PLAYER_PLUGIN = "OoyalaIMA";
const ACTION_SET_MSGBUSEVENTHANDLER = "setMessageBusEventHandler";
const ACTION_CREATE_PLAYER = "createPlayer";

const ACTION_SET_EMBEDCODE = "setEmbedCode";
const ACTION_SET_EMBEDCODES = "setEmbedCodes";
const ACTION_SET_EMBEDCODE_WITHADSETCODE = "setEmbedCodeWithAdSetCode";
const ACTION_SET_EMBEDCODES_WITHADSETCODE = "setEmbedCodesWithAdSetCode";
const ACTION_SET_EXTERNALID = "setExternalId";
const ACTION_SET_EXTERNALIDS = "setExternalIds";
const ACTION_CHANGECURRENTITEM = "changeCurrentItem";
const ACTION_GET_METADATA = "getMetadata";
const ACTION_GET_EMBEDCODE = "getEmbedCode";
const ACTION_GET_AUTHTOKEN = "getAuthToken";
const ACTION_GET_CUSTOMDRMDATA = "getCustomDRMData";
const ACTION_SET_CUSTOMDRMDATA = "setCustomDRMData";
const ACTION_GET_STATE = "getState";
const ACTION_PAUSE = "pause";
const ACTION_PLAY = "play";
const ACTION_PLAYWITHINITIALTIME = "playWithInitialTime";
const ACTION_SUSPEND = "suspend";
const ACTION_RESUME = "resume";
const ACTION_ISFULLSCREEN = "isFullscreen";
const ACTION_GET_TOPBAROFFSET = "getTopBarOffset";
const ACTION_GET_PLAYHEADTIME = "getPlayheadTime";
const ACTION_SET_PLAYHEADTIME = "setPlayheadTime";
const ACTION_SEEKABLE = "seekable";
const ACTION_SEEK = "seek";
const ACTION_PREVIOUSVIDEO = "previousVideo";
const ACTION_NEXTVIDEO = "nextVideo";
const ACTION_GET_ACTIONATEND = "getActionAtEnd";
const ACTION_SET_ACTIONATEND = "setActionAtEnd";
const ACTION_SET_CLOSEDCAPTIONSLANGUAGE = "setClosedCaptionsLanguage";
const ACTION_SET_CLOSEDCAPTIONSPRESENTATIONSTYLE = "setClosedCaptionsPresentationStyle";
const ACTION_GET_CLOSEDCAPTIONSLANGUAGE = "getClosedCaptionsLanguage";
const ACTION_GET_AVAILABLECLOSEDCAPTIONSLANGUAGES = "getAvailableClosedCaptionsLanguages";
const ACTION_GET_BITRATE = "getBitrate";
const ACTION_ISPLAYING = "isPlaying";
const ACTION_ISADPLAYING = "isAdPlaying";
const ACTION_SEEKTOPERCENT = "seekToPercent";
const ACTION_GET_DURATION = "getDuration";
const ACTION_GET_BUFFER_PERCENTAGE = "getBufferPercentage";
const ACTION_GET_PLAYHEAD_PERCENTAGE = "getPlayheadPercentage";
const ACTION_SET_ADS_SEEKABLE = "setAdsSeekable";
const ACTION_SET_SEEKABLE = "setSeekable";
const ACTION_RESETADS = "resetAds";
const ACTION_SKIPAD = "skipAd";
const ACTION_ISSHOWINGAD = "isShowingAd";
const ACTION_SET_CLOSEDCAPTIONSBOTTOMMARGIN = "setClosedCaptionsBottomMargin";
const ACTION_DISPLAYCLOSEDCAPTIONTEXT = "displayClosedCaptionText";
const ACTION_SET_CUSTOMANALYTICSTAGS = "setCustomAnalyticsTags";
const ACTION_GET_SEEKSTYLE = "getSeekStyle";
const ACTION_GET_CUEPOINTSINMILLISECONDS = "getCuePointsInMilliSeconds";
const ACTION_GET_CUEPOINTSINPERCENTAGE = "getCuePointsInPercentage";

const ACTION_SET_ADURLOVERRIDE = "setAdUrlOverride";
const ACTION_SET_ADTAGPARAMS = "setAdTagParameters";

var _callbacks = {};
var MessageBus = {
    handler : function(jsonObj) {
        var callbacks = _callbacks[jsonObj.event];
        callbacks.forEach(function(item) {
            item.callback(jsonObj.params);
        });
    },

    subscribe : function(eventName, subscriber, callback) {
        if (!_callbacks[eventName]) {
            _callbacks[eventName] = new Array();
        }

        _callbacks[eventName].push({"subscriber": subscriber, "callback": callback});
    }
}

var OoyalaIMA = function () {};

OoyalaIMA.prototype.createPlayer = function (pcode, domain) {
    ooyala_player.mb = MessageBus;

    cordova.exec(MessageBus.handler, null, PLAYER_PLUGIN,
            ACTION_SET_MSGBUSEVENTHANDLER, []);
    cordova.exec(null, null, PLAYER_PLUGIN, ACTION_CREATE_PLAYER, [{"pcode":pcode, "domain":domain}]);

    return ooyala_player;
}

OoyalaIMA.prototype.createPlayer = function (pcode, domain, x, y, width, height) {
    ooyala_player.mb = MessageBus;

    cordova.exec(MessageBus.handler, null, PLAYER_PLUGIN,
            ACTION_SET_MSGBUSEVENTHANDLER, []);
    cordova.exec(null, null, PLAYER_PLUGIN, ACTION_CREATE_PLAYER,
        [{"pcode":pcode, "domain":domain, "left":x, "top":y, "width":width, "height":height}]);

    return ooyala_player;
}

var ooyala_player = {
    mb : null,
    imaManager : null,

    setEmbedCode: function(embedCode, success, failure) {
        cordova.exec(success, failure, PLAYER_PLUGIN, ACTION_SET_EMBEDCODE, [embedCode]);
    },

    setEmbedCodes: function(embedCodes, success, failure) {
        cordova.exec(success, failure, PLAYER_PLUGIN, ACTION_SET_EMBEDCODES, embedCodes);
    },

    setEmbedCodeWithAdSetCode: function(embedCode, adsetcode, success, failure) {
        cordova.exec(success, failure, PLAYER_PLUGIN, ACTION_SET_EMBEDCODE_WITHADSETCODE,
         [{"EmbedCode":embedCode, "AdSetCode":adsetcode}]);
    },

    setEmbedCodesWithAdSetCode: function(embedCodes, adsetcode, success, failure) {
        cordova.exec(success, failure, PLAYER_PLUGIN, ACTION_SET_EMBEDCODES_WITHADSETCODE,
         [{"EmbedCodes":embedCodes, "AdSetCode":adsetcode}]);
    },

    setExternalId: function(externalID, success, failure) {
        cordova.exec(success, failure, PLAYER_PLUGIN, ACTION_SET_EXTERNALID, [externalID]);
    },

    setExternalIds: function(externalIDs, success, failure) {
        cordova.exec(success, failure, PLAYER_PLUGIN, ACTION_SET_EXTERNALIDS, externalIDs);
    },

    changeCurrentItem: function(item, success, failure) {
        cordova.exec(success, failure, PLAYER_PLUGIN, ACTION_CHANGECURRENTITEM, [item]);
    },

    getMetadata : function(success, failure) {
        cordova.exec(success, failure, PLAYER_PLUGIN, ACTION_GET_METADATA, []);
    },

    getEmbedCode: function(success, failure) {
        cordova.exec(success, failure, PLAYER_PLUGIN, ACTION_GET_EMBEDCODE, []);
    },

    getAuthToken: function(success, failure) {
        cordova.exec(success, failure, PLAYER_PLUGIN, ACTION_GET_AUTHTOKEN, []);
    },

    getCustomDRMData: function(success, failure) {
        cordova.exec(success, failure, PLAYER_PLUGIN, ACTION_GET_CUSTOMDRMDATA, []);
    },

    setCustomDRMData: function(customDRMData, success, failure) {
        cordova.exec(success, failure, PLAYER_PLUGIN, ACTION_SET_CUSTOMDRMDATA, [customDRMData]);
    },

    getState: function(success, failure) {
        cordova.exec(success, failure, PLAYER_PLUGIN, ACTION_GET_STATE, []);
    },

    pause: function(success, failure) {
        cordova.exec(success, failure, PLAYER_PLUGIN, ACTION_PAUSE, []);
    },

    play: function(success, failure) {
        cordova.exec(success, failure, PLAYER_PLUGIN, ACTION_PLAY, []);
    },

    playWithInitialTime: function(time, success, failure) {
        cordova.exec(success, failure, PLAYER_PLUGIN, ACTION_PLAYWITHINITIALTIME, [time]);
    },

    suspend: function(success, failure) {
        cordova.exec(success, failure, PLAYER_PLUGIN, ACTION_SUSPEND, []);
    },

    resume: function(success, failure) {
        cordova.exec(success, failure, PLAYER_PLUGIN, ACTION_RESUME, []);
    },

    isFullscreen: function(success, failure) {
        cordova.exec(success, failure, PLAYER_PLUGIN, ACTION_ISFULLSCREEN, []);
    },

    getTopBarOffset: function(success, failure) {
        cordova.exec(success, failure, PLAYER_PLUGIN, ACTION_GET_TOPBAROFFSET, []);
    },

    getPlayheadTime: function(success, failure) {
        cordova.exec(success, failure, PLAYER_PLUGIN, ACTION_GET_PLAYHEADTIME, []);
    },

    setPlayheadTime: function(time, success, failure) {
        cordova.exec(success, failure, PLAYER_PLUGIN, ACTION_SET_PLAYHEADTIME, [time]);
    },

    seekable: function(success, failure) {
        cordova.exec(success, failure, PLAYER_PLUGIN, ACTION_SEEKABLE, []);
    },

    seek: function(time, success, failure) {
        cordova.exec(success, failure, PLAYER_PLUGIN, ACTION_SEEK, [time]);
    },

    previousVideo: function(what, success, failure) {
        cordova.exec(success, failure, PLAYER_PLUGIN, ACTION_PREVIOUSVIDEO, [what]);
    },

    nextVideo: function(what, success, failure) {
        cordova.exec(success, failure, PLAYER_PLUGIN, ACTION_NEXTVIDEO, [what]);
    },

    getActionAtEnd: function(success, failure) {
        cordova.exec(success, failure, PLAYER_PLUGIN, ACTION_GET_ACTIONATEND, []);
    },

    setActionAtEnd: function(actionAtEnd, success, failure) {
        cordova.exec(success, failure, PLAYER_PLUGIN, ACTION_SET_ACTIONATEND, [actionAtEnd]);
    },

    setClosedCaptionsLanguage: function(lang, success, failure) {
        cordova.exec(success, failure, PLAYER_PLUGIN, ACTION_SET_CLOSEDCAPTIONSLANGUAGE, [lang]);
    },

    setClosedCaptionsPresentationStyle: function(style, success, failure) {
        cordova.exec(success, failure, PLAYER_PLUGIN, ACTION_SET_CLOSEDCAPTIONSPRESENTATIONSTYLE, [style]);
    },

    getClosedCaptionsLanguage: function(success, failure) {
        cordova.exec(success, failure, PLAYER_PLUGIN, ACTION_GET_CLOSEDCAPTIONSLANGUAGE, []);
    },

    getAvailableClosedCaptionsLanguages: function(success, failure) {
        cordova.exec(success, failure, PLAYER_PLUGIN, ACTION_GET_AVAILABLECLOSEDCAPTIONSLANGUAGES, []);
    },

    getBitrate: function(success, failure) {
        cordova.exec(success, failure, PLAYER_PLUGIN, ACTION_GET_BITRATE, []);
    },

    isPlaying: function(success, failure) {
        cordova.exec(success, failure, PLAYER_PLUGIN, ACTION_ISPLAYING, []);
    },

    isAdPlaying: function(success, failure) {
        cordova.exec(success, failure, PLAYER_PLUGIN, ACTION_ISADPLAYING, []);
    },

    seekToPercent: function(percent, success, failure) {
        cordova.exec(success, failure, PLAYER_PLUGIN, ACTION_SEEKTOPERCENT, [percent]);
    },

    getDuration: function(success, failure) {
        cordova.exec(success, failure, PLAYER_PLUGIN, ACTION_GET_DURATION, []);
    },

    getBufferPercentage: function(success, failure) {
        cordova.exec(success, failure, PLAYER_PLUGIN, ACTION_GET_BUFFER_PERCENTAGE, []);
    },

    getPlayheadPercentage: function(success, failure) {
        cordova.exec(success, failure, PLAYER_PLUGIN, ACTION_GET_PLAYHEAD_PERCENTAGE, []);
    },

    setAdsSeekable: function(flag, success, failure) {
        cordova.exec(success, failure, PLAYER_PLUGIN, ACTION_SET_ADS_SEEKABLE, [flag]);
    },

    setSeekable: function(flag, success, failure) {
        cordova.exec(success, failure, PLAYER_PLUGIN, ACTION_SET_SEEKABLE, [flag]);
    },

    resetAds: function(success, failure) {
        cordova.exec(success, failure, PLAYER_PLUGIN, ACTION_RESETADS, []);
    },

    skipAd: function(success, failure) {
        cordova.exec(success, failure, PLAYER_PLUGIN, ACTION_SKIPAD, []);
    },

    isShowingAd: function(success, failure) {
        cordova.exec(success, failure, PLAYER_PLUGIN, ACTION_ISSHOWINGAD, []);
    },

    setClosedCaptionsBottomMargin: function(bottomMargin, success, failure) {
        cordova.exec(success, failure, PLAYER_PLUGIN, ACTION_SET_CLOSEDCAPTIONSBOTTOMMARGIN, [bottomMargin]);
    },

    displayClosedCaptionText: function(txt, success, failure) {
        cordova.exec(success, failure, PLAYER_PLUGIN, ACTION_DISPLAYCLOSEDCAPTIONTEXT, [txt]);
    },

    setCustomAnalyticsTags: function(tags, success, failure) {
        cordova.exec(success, failure, PLAYER_PLUGIN, ACTION_SET_CUSTOMANALYTICSTAGS, tags);
    },

    getSeekStyle: function(success, failure) {
        cordova.exec(success, failure, PLAYER_PLUGIN, ACTION_GET_SEEKSTYLE, []);
    },

    getCuePointsInMilliSeconds: function(success, failure) {
        cordova.exec(success, failure, PLAYER_PLUGIN, ACTION_GET_CUEPOINTSINMILLISECONDS, []);
    },

    getCuePointsInPercentage: function(success, failure) {
        cordova.exec(success, failure, PLAYER_PLUGIN, ACTION_GET_CUEPOINTSINPERCENTAGE, []);
    },

    setAdUrlOverride: function(url, success, failure) {
        cordova.exec(success, failure, PLAYER_PLUGIN, ACTION_SET_ADURLOVERRIDE, [url]);
    },

    setAdTagParameters: function(params, success, failure) {
        cordova.exec(success, failure, PLAYER_PLUGIN, ACTION_SET_ADTAGPARAMS, [params]);
    }
}

// Instantiate LocalNotification
window.ooyalaIMA = new OoyalaIMA();
module.exports = ooyalaIMA;
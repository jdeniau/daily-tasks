webpackJsonp([45],{162:function(e,a,r){!function(e,a){a(r(24))}(0,function(e){"use strict";function a(e,a,r,s){var _="";if(a)switch(r){case"s":_="काही सेकंद";break;case"m":_="एक मिनिट";break;case"mm":_="%d मिनिटे";break;case"h":_="एक तास";break;case"hh":_="%d तास";break;case"d":_="एक दिवस";break;case"dd":_="%d दिवस";break;case"M":_="एक महिना";break;case"MM":_="%d महिने";break;case"y":_="एक वर्ष";break;case"yy":_="%d वर्षे"}else switch(r){case"s":_="काही सेकंदां";break;case"m":_="एका मिनिटा";break;case"mm":_="%d मिनिटां";break;case"h":_="एका तासा";break;case"hh":_="%d तासां";break;case"d":_="एका दिवसा";break;case"dd":_="%d दिवसां";break;case"M":_="एका महिन्या";break;case"MM":_="%d महिन्यां";break;case"y":_="एका वर्षा";break;case"yy":_="%d वर्षां"}return _.replace(/%d/i,e)}var r={1:"१",2:"२",3:"३",4:"४",5:"५",6:"६",7:"७",8:"८",9:"९",0:"०"},s={"१":"1","२":"2","३":"3","४":"4","५":"5","६":"6","७":"7","८":"8","९":"9","०":"0"};return e.defineLocale("mr",{months:"जानेवारी_फेब्रुवारी_मार्च_एप्रिल_मे_जून_जुलै_ऑगस्ट_सप्टेंबर_ऑक्टोबर_नोव्हेंबर_डिसेंबर".split("_"),monthsShort:"जाने._फेब्रु._मार्च._एप्रि._मे._जून._जुलै._ऑग._सप्टें._ऑक्टो._नोव्हें._डिसें.".split("_"),monthsParseExact:!0,weekdays:"रविवार_सोमवार_मंगळवार_बुधवार_गुरूवार_शुक्रवार_शनिवार".split("_"),weekdaysShort:"रवि_सोम_मंगळ_बुध_गुरू_शुक्र_शनि".split("_"),weekdaysMin:"र_सो_मं_बु_गु_शु_श".split("_"),longDateFormat:{LT:"A h:mm वाजता",LTS:"A h:mm:ss वाजता",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY, A h:mm वाजता",LLLL:"dddd, D MMMM YYYY, A h:mm वाजता"},calendar:{sameDay:"[आज] LT",nextDay:"[उद्या] LT",nextWeek:"dddd, LT",lastDay:"[काल] LT",lastWeek:"[मागील] dddd, LT",sameElse:"L"},relativeTime:{future:"%sमध्ये",past:"%sपूर्वी",s:a,m:a,mm:a,h:a,hh:a,d:a,dd:a,M:a,MM:a,y:a,yy:a},preparse:function(e){return e.replace(/[१२३४५६७८९०]/g,function(e){return s[e]})},postformat:function(e){return e.replace(/\d/g,function(e){return r[e]})},meridiemParse:/रात्री|सकाळी|दुपारी|सायंकाळी/,meridiemHour:function(e,a){return 12===e&&(e=0),"रात्री"===a?e<4?e:e+12:"सकाळी"===a?e:"दुपारी"===a?e>=10?e:e+12:"सायंकाळी"===a?e+12:void 0},meridiem:function(e,a,r){return e<4?"रात्री":e<10?"सकाळी":e<17?"दुपारी":e<20?"सायंकाळी":"रात्री"},week:{dow:0,doy:6}})})}});
//# sourceMappingURL=45.f0f44162.chunk.js.map
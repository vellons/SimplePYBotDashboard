(function(e){function t(t){for(var n,a,i=t[0],c=t[1],l=t[2],u=0,d=[];u<i.length;u++)a=i[u],Object.prototype.hasOwnProperty.call(r,a)&&r[a]&&d.push(r[a][0]),r[a]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(e[n]=c[n]);b&&b(t);while(d.length)d.shift()();return s.push.apply(s,l||[]),o()}function o(){for(var e,t=0;t<s.length;t++){for(var o=s[t],n=!0,i=1;i<o.length;i++){var c=o[i];0!==r[c]&&(n=!1)}n&&(s.splice(t--,1),e=a(a.s=o[0]))}return e}var n={},r={app:0},s=[];function a(t){if(n[t])return n[t].exports;var o=n[t]={i:t,l:!1,exports:{}};return e[t].call(o.exports,o,o.exports,a),o.l=!0,o.exports}a.m=e,a.c=n,a.d=function(e,t,o){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(a.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)a.d(o,n,function(t){return e[t]}.bind(null,n));return o},a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="/SimplePYBotDashboard/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],c=i.push.bind(i);i.push=t,i=i.slice();for(var l=0;l<i.length;l++)t(i[l]);var b=c;s.push([0,"chunk-vendors"]),o()})({0:function(e,t,o){e.exports=o("56d7")},2821:function(e,t,o){"use strict";o("9c22")},"3c97":function(e,t,o){"use strict";o("bf0d")},"3dbc":function(e,t,o){},4516:function(e,t,o){"use strict";o("5ad9")},"56d7":function(e,t,o){"use strict";o.r(t);o("e260"),o("e6cf"),o("cca6"),o("a79d");var n=o("7a23"),r=Object(n["I"])("data-v-29271ee2");Object(n["t"])("data-v-29271ee2");var s={class:"home-item"},a=Object(n["h"])("label",{for:"web-server-url"},"Web server url: ",-1),i=Object(n["h"])("br",null,null,-1),c=Object(n["h"])("label",{for:"web-socket-url"},"Websocket url: ",-1),l={key:4,class:"home-item"},b=Object(n["h"])("br",null,null,-1),u={class:"home-item"};Object(n["r"])();var d=r((function(e,t,o,r,d,p){var g=Object(n["y"])("SdkManagement"),f=Object(n["y"])("ServomotorsGroup"),h=Object(n["y"])("SensorsGroup"),O=Object(n["y"])("RobotActions");return Object(n["q"])(),Object(n["e"])("div",null,[!e.loadingRobotConfig&&e.robotConfigAvailable?(Object(n["q"])(),Object(n["e"])(g,{key:0,class:"home-item",robotConfig:e.robotConfig,robotStatus:e.lastWebSocketResponse?e.lastWebSocketResponse:{},version:e.sdkVersion,webServerUrl:e.webServerUrl},null,8,["robotConfig","robotStatus","version","webServerUrl"])):Object(n["f"])("",!0),!e.loadingRobotConfig&&e.robotConfigAvailable&&e.robotConfig.motors?(Object(n["q"])(),Object(n["e"])(f,{key:1,class:"home-item",config:e.robotConfig.motors,motorStatus:e.lastWebSocketResponse.motors?e.lastWebSocketResponse.motors:[],webServerUrl:e.webServerUrl},null,8,["config","motorStatus","webServerUrl"])):Object(n["f"])("",!0),!e.loadingRobotConfig&&e.robotConfigAvailable&&e.robotConfig.sensors?(Object(n["q"])(),Object(n["e"])(h,{key:2,class:"home-item",config:e.robotConfig.sensors,sensorsStatus:e.lastWebSocketResponse.sensors?e.lastWebSocketResponse.sensors:[]},null,8,["config","sensorsStatus"])):Object(n["f"])("",!0),!e.loadingRobotConfig&&e.robotConfigAvailable?(Object(n["q"])(),Object(n["e"])(O,{key:3,class:"home-item",webServerUrl:e.webServerUrl,robotConfig:e.robotConfig,robotStatus:e.lastWebSocketResponse?e.lastWebSocketResponse:{}},null,8,["webServerUrl","robotConfig","robotStatus"])):Object(n["f"])("",!0),Object(n["h"])("div",s,[a,Object(n["H"])(Object(n["h"])("input",{type:"text",id:"web-server-url","onUpdate:modelValue":t[1]||(t[1]=function(t){return e.webServerUrl=t}),class:"server-input",placeholder:"Insert your robot web server address",disabled:e.robotConfigAvailable},null,8,["disabled"]),[[n["D"],e.webServerUrl]]),e.robotConfigAvailable?(Object(n["q"])(),Object(n["e"])("button",{key:1,onClick:t[3]||(t[3]=function(){return p.closeDashboard&&p.closeDashboard.apply(p,arguments)})}," Close dashboard ")):(Object(n["q"])(),Object(n["e"])("button",{key:0,onClick:t[2]||(t[2]=function(){return p.connectToWebServer&&p.connectToWebServer.apply(p,arguments)}),disabled:""===e.webServerUrl}," Connect to web server ",8,["disabled"])),i,c,Object(n["H"])(Object(n["h"])("input",{type:"text",id:"web-socket-url","onUpdate:modelValue":t[4]||(t[4]=function(t){return e.webSocketUrl=t}),class:"server-input",placeholder:"Insert your robot websocket address",disabled:null!==e.webSocket},null,8,["disabled"]),[[n["D"],e.webSocketUrl]]),null===e.webSocket?(Object(n["q"])(),Object(n["e"])("button",{key:2,onClick:t[5]||(t[5]=function(){return p.connectToWebSocket&&p.connectToWebSocket.apply(p,arguments)}),disabled:""===e.webSocketUrl}," Connect to websocket ",8,["disabled"])):(Object(n["q"])(),Object(n["e"])("button",{key:3,onClick:t[6]||(t[6]=function(){return p.closeWebSocket&&p.closeWebSocket.apply(p,arguments)})}," Close websocket "))]),null!==e.webSocket?(Object(n["q"])(),Object(n["e"])("div",l,Object(n["A"])(e.lastWebSocketResponse),1)):Object(n["f"])("",!0),b,Object(n["h"])("div",u,[Object(n["g"])(" Version: "+Object(n["A"])(e.appVersion)+" ",1),e.commitSha?(Object(n["q"])(),Object(n["e"])("span",{key:0,onClick:t[7]||(t[7]=function(){return p.setAllCommitSha&&p.setAllCommitSha.apply(p,arguments)})},"- "+Object(n["A"])(e.commitSha),1)):Object(n["f"])("",!0)])])})),p=(o("b0c0"),o("b64b"),o("96cf"),o("1da1")),g=Object(n["I"])("data-v-c256a23e");Object(n["t"])("data-v-c256a23e");var f={class:"sdk-toolbar"},h={key:0,class:"toolbar-item"},O={class:"toolbar-item speed"},j={for:"speed-range",class:"speed-lbl"},S={class:"toolbar-item system"},v={key:0},m={key:1},k={key:2},y={key:3};Object(n["r"])();var w=g((function(e,t,o,r,s,a){var i,c,l;return Object(n["q"])(),Object(n["e"])("div",f,[o.robotConfig.name?(Object(n["q"])(),Object(n["e"])("div",h,[Object(n["h"])("b",null,Object(n["A"])(o.robotConfig.name),1)])):Object(n["f"])("",!0),Object(n["h"])("div",O,[Object(n["h"])("label",j,Object(n["A"])(e.rangeSpeed),1),Object(n["H"])(Object(n["h"])("input",{id:"speed-range",class:"speed-range","onUpdate:modelValue":t[1]||(t[1]=function(t){return e.rangeSpeed=t}),disabled:e.pending,type:"range",min:"0.1",max:"5",step:"0.1",onChange:t[2]||(t[2]=function(){return a.rangeSpeedChanged&&a.rangeSpeedChanged.apply(a,arguments)}),onFocusin:t[3]||(t[3]=function(t){return e.rangeSpeedDrag=!0}),onFocusout:t[4]||(t[4]=function(t){return e.rangeSpeedDrag=!1})},null,40,["disabled"]),[[n["D"],e.rangeSpeed]])]),Object(n["h"])("div",S,[null!==(i=o.robotStatus.system)&&void 0!==i&&i.temperature?(Object(n["q"])(),Object(n["e"])("span",v,Object(n["A"])((null===(c=o.robotStatus.system)||void 0===c?void 0:c.temperature)+"°C - "),1)):Object(n["f"])("",!0),null!==(l=o.robotStatus.system)&&void 0!==l&&l.timestamp?(Object(n["q"])(),Object(n["e"])("span",m,"(Delay:"+Object(n["A"])(e.statusDelay)+" sec) - "+Object(n["A"])(e.formattedDate),1)):(Object(n["q"])(),Object(n["e"])("span",k,"Connect with websocket to receive realtime data")),o.version?(Object(n["q"])(),Object(n["e"])("span",y,[Object(n["h"])("i",null,Object(n["A"])(" - "+o.version),1)])):Object(n["f"])("",!0)])])})),C=(o("b680"),{name:"SdkManagement",props:{webServerUrl:{type:String,required:!0},robotConfig:{type:Object,required:!0},robotStatus:{type:Object,required:!0},version:{type:String,default:""}},data:function(){return{currentSpeed:1,rangeSpeed:1,rangeSpeedDrag:!1,pending:!1,formattedDate:"",statusDelay:0}},mounted:function(){var e;this.currentSpeed=null===(e=this.robotStatus.sdk)||void 0===e?void 0:e.robot_speed,this.rangeSpeed=this.currentSpeed?this.currentSpeed:1},methods:{rangeSpeedChanged:function(){var e=this;this.pending=!0;var t={robot_speed:parseFloat(this.rangeSpeed)};this.axios.patch(this.webServerUrl+"/sdk/",t).then((function(t){200!==t.status&&(e.$toast.error("Failed to change speed to "+e.rangeSpeed+". Bad response"),e.rangeSpeed=e.currentSpeed),e.pending=!1})).catch((function(){e.$toast.error("Failed to change speed to "+e.rangeSpeed),e.rangeSpeed=e.currentSpeed,e.pending=!1}))}},watch:{robotStatus:function(){var e,t,o;if(this.currentSpeed=null===(e=this.robotStatus.sdk)||void 0===e?void 0:e.robot_speed,this.currentSpeed&&!this.rangeSpeedDrag&&(this.rangeSpeed=parseFloat(this.currentSpeed)),null!==(t=this.robotStatus)&&void 0!==t&&null!==(o=t.system)&&void 0!==o&&o.timestamp){var n=new Date(this.robotStatus.system.timestamp);this.statusDelay=((Date.now()-n)/1e3).toFixed(3),this.formattedDate=("0"+n.getHours()).substr(-2)+":"+("0"+n.getMinutes()).substr(-2)+":"+("0"+n.getSeconds()).substr(-2)+":"+(n.getMilliseconds()+"000").substr(0,3)}}}});o("e536");C.render=w,C.__scopeId="data-v-c256a23e";var A=C,q=(o("7db0"),Object(n["I"])("data-v-16153e0b"));Object(n["t"])("data-v-16153e0b");var U={class:"servomotor-group-container"};Object(n["r"])();var P=q((function(e,t,o,r,s,a){var i=Object(n["y"])("ServoMotor");return Object(n["q"])(),Object(n["e"])("div",U,[(Object(n["q"])(!0),Object(n["e"])(n["a"],null,Object(n["x"])(o.config,(function(e,t,r){return Object(n["q"])(),Object(n["e"])(i,{class:["servomotor",{"servomotor-big":0===r&&Object.keys(o.config).length%2===1}],key:t,webServerUrl:o.webServerUrl,config:e,motorKey:t,socketGoalValue:o.motorStatus.find((function(e){return e.key===t}))?o.motorStatus.find((function(e){return e.key===t})).goal_angle:0,socketCurrentValue:o.motorStatus.find((function(e){return e.key===t}))?o.motorStatus.find((function(e){return e.key===t})).current_angle:null},null,8,["class","webServerUrl","config","motorKey","socketGoalValue","socketCurrentValue"])})),128))])})),_=Object(n["I"])("data-v-8ef31996");Object(n["t"])("data-v-8ef31996");var T={class:"servomotor"},V={class:"infos"},x={class:"info-title"},G=Object(n["g"])(" | "),W={class:"info-angle"},R={class:"inputs-row"},I={class:"input-limit"},D={class:"inputs-wrap"},M=Object(n["h"])("label",{class:"sr-only",for:"goal"},null,-1),$=Object(n["h"])("label",{class:"sr-only",for:"current"},null,-1),F={class:"input-limit"};Object(n["r"])();var H=_((function(e,t,o,r,s,a){return Object(n["q"])(),Object(n["e"])("div",T,[Object(n["h"])("div",V,[Object(n["h"])("button",{disabled:e.pending||parseInt(o.config.angle_limit[0])>parseInt(e.rangeGoalAngle)-e.stepValue,onClick:t[1]||(t[1]=function(){return a.removeStep&&a.removeStep.apply(a,arguments)})},"-"+Object(n["A"])(e.stepValue),9,["disabled"]),Object(n["h"])("span",x,Object(n["A"])(o.motorKey),1),G,Object(n["h"])("span",W,Object(n["A"])(e.rangeGoalAngle),1),Object(n["h"])("button",{disabled:e.pending||parseInt(o.config.angle_limit[1])<parseInt(e.rangeGoalAngle)+e.stepValue,onClick:t[2]||(t[2]=function(){return a.addStep&&a.addStep.apply(a,arguments)})},"+"+Object(n["A"])(e.stepValue),9,["disabled"]),o.config.angle_limit[0]<=0&&o.config.angle_limit[1]>=0?(Object(n["q"])(),Object(n["e"])("button",{key:0,disabled:e.pending||0===parseInt(e.rangeGoalAngle),onClick:t[3]||(t[3]=function(){return a.goToZero&&a.goToZero.apply(a,arguments)})},"0 ",8,["disabled"])):Object(n["f"])("",!0)]),Object(n["h"])("div",R,[Object(n["h"])("div",I,Object(n["A"])(o.config.angle_limit[0]),1),Object(n["h"])("div",D,[M,Object(n["H"])(Object(n["h"])("input",{id:"goal",class:"goal-input",type:"range",onChange:t[4]||(t[4]=function(){return a.rangeGoalChanged&&a.rangeGoalChanged.apply(a,arguments)}),min:o.config.angle_limit[0],"onUpdate:modelValue":t[5]||(t[5]=function(t){return e.rangeGoalAngle=t}),max:o.config.angle_limit[1],step:1},null,40,["min","max"]),[[n["D"],e.rangeGoalAngle]]),$,null!=o.socketCurrentValue?Object(n["H"])((Object(n["q"])(),Object(n["e"])("input",{key:0,id:"current",class:"current-input",type:"range",disabled:"",min:o.config.angle_limit[0],"onUpdate:modelValue":t[6]||(t[6]=function(t){return e.rangeCurrentAngle=t}),max:o.config.angle_limit[1],step:1},null,8,["min","max"])),[[n["D"],e.rangeCurrentAngle]]):Object(n["f"])("",!0)]),Object(n["h"])("div",F,Object(n["A"])(o.config.angle_limit[1]),1)])])})),J={name:"ServoMotor",props:{webServerUrl:{type:String,required:!0},config:{type:Object,required:!0},motorKey:{required:!0},socketGoalValue:{default:0},socketCurrentValue:{default:0}},data:function(){return{rangeCurrentAngle:0,rangeGoalAngle:0,stepValue:5,pending:!1}},mounted:function(){this.rangeGoalAngle=this.socketGoalValue,this.rangeCurrentAngle=this.socketCurrentValue},methods:{rangeGoalChanged:function(){var e=this;this.pending=!0;var t=parseInt(this.rangeGoalAngle);console.log(this.motorKey,t);var o={goal_angle:t};this.axios.patch(this.webServerUrl+"/motors/"+this.motorKey+"/",o).then((function(o){200!==o.status&&e.$toast.error("Failed to move "+e.motorKey+" to "+t+". Bad response"),e.pending=!1})).catch((function(){e.$toast.error("Failed to move "+e.motorKey+" to "+t),e.pending=!1}))},goToZero:function(){this.rangeGoalAngle=0,this.rangeGoalChanged()},removeStep:function(){this.rangeGoalAngle=parseInt(this.rangeGoalAngle)-this.stepValue,this.rangeGoalChanged()},addStep:function(){this.rangeGoalAngle=parseInt(this.rangeGoalAngle)+this.stepValue,this.rangeGoalChanged()}},watch:{socketGoalValue:function(){this.rangeGoalAngle=this.socketGoalValue},socketCurrentValue:function(){this.rangeCurrentAngle=this.socketCurrentValue}}};o("6c60");J.render=H,J.__scopeId="data-v-8ef31996";var K=J,B={name:"ServomotorsGroup",components:{ServoMotor:K},props:{webServerUrl:{type:String,required:!0},config:{type:Object,required:!0},motorStatus:{type:Array,required:!0}}};o("3c97");B.render=P,B.__scopeId="data-v-16153e0b";var N=B,Z=Object(n["I"])("data-v-7d9e03a8");Object(n["t"])("data-v-7d9e03a8");var Q={class:"sensors-group-container"};Object(n["r"])();var Y=Z((function(e,t,o,r,s,a){return Object(n["q"])(),Object(n["e"])("div",Q,[(Object(n["q"])(!0),Object(n["e"])(n["a"],null,Object(n["x"])(o.config,(function(e,t){return Object(n["q"])(),Object(n["e"])("div",{class:"sensors",key:t},[Object(n["h"])("b",null,Object(n["A"])(t),1),Object(n["g"])(": "+Object(n["A"])(o.sensorsStatus.find((function(e){return e.key===t}))?o.sensorsStatus.find((function(e){return e.key===t})).value:"-"),1)])})),128))])})),z={name:"SensorsGroup",props:{config:{type:Object,required:!0},sensorsStatus:{type:Array,required:!0}}};o("d688");z.render=Y,z.__scopeId="data-v-7d9e03a8";var E=z,L=Object(n["I"])("data-v-d5a9ac56");Object(n["t"])("data-v-d5a9ac56");var X={class:"robot-actions"},ee={key:0,class:"robot-actions-item robot-poses"},te=Object(n["h"])("div",{class:"robot-actions-item-title"},"Poses:",-1),oe=Object(n["h"])("option",{disabled:"",value:""},"Poses",-1),ne={class:"robot-actions-item"},re=Object(n["h"])("div",{class:"robot-actions-item-title"},"Point to point:",-1);Object(n["r"])();var se=L((function(e,t,o,r,s,a){return Object(n["q"])(),Object(n["e"])("div",X,[o.robotConfig.poses?(Object(n["q"])(),Object(n["e"])("div",ee,[te,Object(n["h"])("label",null,[Object(n["H"])(Object(n["h"])("select",{"onUpdate:modelValue":t[1]||(t[1]=function(t){return e.selectedPose=t})},[oe,(Object(n["q"])(!0),Object(n["e"])(n["a"],null,Object(n["x"])(o.robotConfig.poses,(function(e,t){return Object(n["q"])(),Object(n["e"])("option",{key:t,value:t},Object(n["A"])(t),9,["value"])})),128))],512),[[n["C"],e.selectedPose]])]),Object(n["h"])("label",null,[""!==e.selectedPose?Object(n["H"])((Object(n["q"])(),Object(n["e"])("input",{key:0,"onUpdate:modelValue":t[2]||(t[2]=function(t){return e.poseSeconds=t}),class:"robot-actions-input",type:"number",min:"0",max:"120",placeholder:"seconds"},null,512)),[[n["D"],e.poseSeconds]]):Object(n["f"])("",!0)]),""!==e.selectedPose?(Object(n["q"])(),Object(n["e"])("button",{key:0,onClick:t[3]||(t[3]=function(){return a.goToPose&&a.goToPose.apply(a,arguments)}),disabled:e.pending}," Go to "+Object(n["A"])(e.selectedPose)+" in "+Object(n["A"])(e.poseSeconds)+" seconds ",9,["disabled"])):Object(n["f"])("",!0)])):Object(n["f"])("",!0),Object(n["h"])("div",ne,[re,Object(n["h"])("label",null,[Object(n["H"])(Object(n["h"])("textarea",{"onUpdate:modelValue":t[4]||(t[4]=function(t){return e.pointToPointMotors=t}),rows:e.textAreaRows,cols:"40",class:"motors-text-area"},null,8,["rows"]),[[n["D"],e.pointToPointMotors]])]),Object(n["h"])("label",null,[""!==e.pointToPointMotors?Object(n["H"])((Object(n["q"])(),Object(n["e"])("input",{key:0,"onUpdate:modelValue":t[5]||(t[5]=function(t){return e.pointToPointSeconds=t}),class:"robot-actions-input",type:"number",min:"0",max:"120",placeholder:"seconds"},null,512)),[[n["D"],e.pointToPointSeconds]]):Object(n["f"])("",!0)]),""!==e.pointToPointMotors?(Object(n["q"])(),Object(n["e"])("button",{key:0,onClick:t[6]||(t[6]=function(){return a.movePointToPoint&&a.movePointToPoint.apply(a,arguments)}),style:{height:"22px"},disabled:e.pending}," Move point to point in "+Object(n["A"])(e.pointToPointSeconds)+" seconds ",9,["disabled"])):Object(n["f"])("",!0),Object(n["h"])("button",{onClick:t[7]||(t[7]=function(){return a.copyCurrentPosition&&a.copyCurrentPosition.apply(a,arguments)}),style:{height:"22px"},disabled:e.pending}," Copy current position ",8,["disabled"])])])})),ae=(o("4fad"),o("3835")),ie=o("5530"),ce=o("a1e9"),le={name:"RobotActions",props:{webServerUrl:{type:String,required:!0},robotConfig:{type:Object,required:!0},robotStatus:{type:Object,required:!0}},data:function(){return{selectedPose:"",poseSeconds:0,pointToPointMotors:"",pointToPointSeconds:0,textAreaRows:4,pending:!1}},methods:{goToPose:function(){var e=this;""===this.poseSeconds&&(this.poseSeconds=0);var t=this.selectedPose;this.selectedPose="",this.pending=!0;var o={seconds:parseFloat(this.poseSeconds)};this.axios.post(this.webServerUrl+"/go-to-pose/"+t+"/",o).then((function(o){200!==o.status&&e.$toast.error("Failed to go to pose "+t+". Bad response"),e.pending=!1})).catch((function(){e.$toast.error("Failed to go to pose "+t),e.pending=!1}))},movePointToPoint:function(){var e=this;if(""===this.pointToPointSeconds&&(this.pointToPointSeconds=0),this.isJsonString(this.pointToPointMotors)){this.pending=!0;var t=Object(ie["a"])({seconds:parseFloat(this.pointToPointSeconds)},JSON.parse(this.pointToPointMotors));this.axios.post(this.webServerUrl+"/move-point-to-point/",t).then((function(t){200!==t.status&&e.$toast.error("Failed to move point to point. Bad response"),e.pending=!1})).catch((function(){e.$toast.error("Failed to go to move point to point"),e.pending=!1}))}else this.$toast.warning("Insert a valid JSON")},copyCurrentPosition:function(){var e=this,t=Object(ce["a"])(this.robotStatus),o=Object(ce["a"])(this.robotConfig)["motors"],n={};this.textAreaRows=2;for(var r=function(){var o=Object(ae["a"])(a[s],1),r=o[0];t["motors"]&&t["motors"].find((function(e){return e.key===r})).goal_angle?n[r]=t["motors"].find((function(e){return e.key===r})).goal_angle:n[r]=0,e.textAreaRows++},s=0,a=Object.entries(o);s<a.length;s++)r();this.pointToPointMotors=JSON.stringify(n,null,2)},isJsonString:function(e){try{JSON.parse(e)}catch(t){return!1}return!0}}};o("2821");le.render=se,le.__scopeId="data-v-d5a9ac56";var be=le,ue={name:"App",components:{SdkManagement:A,ServomotorsGroup:N,SensorsGroup:E,RobotActions:be},data:function(){return{webServerUrl:"",webSocketUrl:"",loadingRobotConfig:!0,webSocket:null,robotConfig:{},robotConfigAvailable:!1,sdkVersion:null,lastWebSocketResponse:{},appVersion:"0.2.0",commitSha:""}},mounted:function(){this.commitSha="089ad8ccfc1774dc6d03db366a17a846929a298d".substring(0,7),setTimeout(this.readQueryConf,100)},methods:{connectToWebServer:function(){var e=Object(p["a"])(regeneratorRuntime.mark((function e(){var t=this;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:this.loadingRobotConfig=!0,this.robotConfigAvailable=!1,this.lastWebSocketResponse={},this.robotConfig={},this.axios.get(this.webServerUrl+"/configuration/").then((function(e){200===e.status?(t.robotConfig=e.data,e.headers.simplepybotsdk&&(t.sdkVersion=e.headers.simplepybotsdk),Object.keys(t.robotConfig).length>0&&(t.robotConfigAvailable=!0),t.robotConfig.id&&(t.loadingRobotConfig=!1,t.$toast.success(t.robotConfig.name+" ready")),localStorage.setItem("webServerUrl",t.webServerUrl)):t.$toast.error("Bad response from "+t.webServerUrl+"/configuration/ code "+e.status)})).catch((function(){t.$toast.error("Connection with "+t.webServerUrl+" failed")}));case 5:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),connectToWebSocket:function(){var e=this,t=this;this.lastWebSocketResponse={},this.webSocket&&(console.log("Close old connection"),this.webSocket.close()),localStorage.setItem("webSocketUrl",this.webSocketUrl),this.webSocket=new WebSocket(this.webSocketUrl+"/"),this.webSocket.onmessage=function(o){if(o.data instanceof Blob){var n=new FileReader;n.onload=function(){t.onWebSocketMessage(JSON.parse(String(n.result)))},n.readAsText(o.data)}else e.onWebSocketMessage(JSON.parse(o.data))},this.webSocket.onerror=function(){e.$toast.warning("Websocket connection error"),e.webSocket=null},this.webSocket.onclose=function(){e.$toast.warning("Websocket connection closed"),e.webSocket=null}},closeWebSocket:function(){this.webSocket.close(),this.$toast.warning("Websocket connection closed"),this.webSocket=null,this.onWebSocketMessage({})},closeDashboard:function(){this.loadingRobotConfig=!0,this.robotConfigAvailable=!1,this.lastWebSocketResponse={},this.robotConfig={},this.loadingRobotConfig=!1,this.$toast.warning("Dashboard closed")},onWebSocketMessage:function(e){this.lastWebSocketResponse=e},readQueryConf:function(){this.$route.query.webserverurl?this.webServerUrl=this.$route.query.webserverurl:localStorage.getItem("webServerUrl")&&(this.webServerUrl=localStorage.getItem("webServerUrl")),this.$route.query.websocketurl?this.webSocketUrl=this.$route.query.websocketurl:localStorage.getItem("webSocketUrl")&&(this.webSocketUrl=localStorage.getItem("webSocketUrl")),this.$route.query.autoconnect&&this.connectToWebServer()},setAllCommitSha:function(){this.commitSha="089ad8ccfc1774dc6d03db366a17a846929a298d"}}};o("4516");ue.render=d,ue.__scopeId="data-v-29271ee2";var de=ue,pe=o("bc3a"),ge=o.n(pe),fe=o("2106"),he=o.n(fe),Oe=o("6c02"),je=o("af56"),Se=Object(n["d"])(de);Se.use(he.a,ge.a);var ve=[{path:"/",name:"App",component:de}],me=Object(Oe["a"])({history:Object(Oe["b"])(),routes:ve});Se.use(me),Se.use(je["a"],{position:"top-right"}),Se.mount("#app")},"5ad9":function(e,t,o){},"6c60":function(e,t,o){"use strict";o("988b")},"988b":function(e,t,o){},"9c22":function(e,t,o){},bf0d:function(e,t,o){},d688:function(e,t,o){"use strict";o("e99f")},e536:function(e,t,o){"use strict";o("3dbc")},e99f:function(e,t,o){}});
//# sourceMappingURL=app.c1b21b05.js.map
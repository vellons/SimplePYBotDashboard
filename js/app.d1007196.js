(function(e){function t(t){for(var n,s,i=t[0],c=t[1],l=t[2],b=0,d=[];b<i.length;b++)s=i[b],Object.prototype.hasOwnProperty.call(a,s)&&a[s]&&d.push(a[s][0]),a[s]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(e[n]=c[n]);u&&u(t);while(d.length)d.shift()();return r.push.apply(r,l||[]),o()}function o(){for(var e,t=0;t<r.length;t++){for(var o=r[t],n=!0,i=1;i<o.length;i++){var c=o[i];0!==a[c]&&(n=!1)}n&&(r.splice(t--,1),e=s(s.s=o[0]))}return e}var n={},a={app:0},r=[];function s(t){if(n[t])return n[t].exports;var o=n[t]={i:t,l:!1,exports:{}};return e[t].call(o.exports,o,o.exports,s),o.l=!0,o.exports}s.m=e,s.c=n,s.d=function(e,t,o){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(s.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)s.d(o,n,function(t){return e[t]}.bind(null,n));return o},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="/SimplePYBotDashboard/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],c=i.push.bind(i);i.push=t,i=i.slice();for(var l=0;l<i.length;l++)t(i[l]);var u=c;r.push([0,"chunk-vendors"]),o()})({0:function(e,t,o){e.exports=o("56d7")},"151e":function(e,t,o){},"19ad":function(e,t,o){"use strict";o("71b7")},"3c97":function(e,t,o){"use strict";o("831c")},4219:function(e,t,o){},"56d7":function(e,t,o){"use strict";o.r(t);o("e260"),o("e6cf"),o("cca6"),o("a79d");var n=o("7a23"),a=Object(n["J"])("data-v-260467a8");Object(n["t"])("data-v-260467a8");var r=Object(n["h"])("label",{for:"web-server-url",class:"server-label"},"Web server url:",-1),s=Object(n["h"])("br",null,null,-1),i=Object(n["h"])("label",{for:"web-socket-url",class:"server-label"},"Websocket url:",-1),c={key:0},l=Object(n["h"])("br",null,null,-1),u={class:"version-label"};Object(n["r"])();var b=a((function(e,t,o,b,d,p){var g=Object(n["z"])("SdkManagement"),h=Object(n["z"])("ServomotorsGroup"),f=Object(n["z"])("CollapsibleBlock"),v=Object(n["z"])("SensorsGroup"),j=Object(n["z"])("RobotActions"),O=Object(n["z"])("GroundMovements");return Object(n["q"])(),Object(n["e"])("div",null,[!e.loadingRobotConfig&&e.robotConfigAvailable?(Object(n["q"])(),Object(n["e"])(f,{key:0,id:"motorsGroup",type:"left-toggle",class:"home-collapse"},{header:a((function(){return[!e.loadingRobotConfig&&e.robotConfigAvailable?(Object(n["q"])(),Object(n["e"])(g,{key:0,style:{"margin-left":"15px"},robotConfig:e.robotConfig,robotStatus:e.lastWebSocketResponse?e.lastWebSocketResponse:{},version:e.sdkVersion,webServerUrl:e.webServerUrl},null,8,["robotConfig","robotStatus","version","webServerUrl"])):Object(n["f"])("",!0)]})),default:a((function(){return[!e.loadingRobotConfig&&e.robotConfigAvailable&&e.robotConfig.motors?(Object(n["q"])(),Object(n["e"])(h,{key:0,config:e.robotConfig.motors,motorStatus:e.lastWebSocketResponse.motors?e.lastWebSocketResponse.motors:[],webServerUrl:e.webServerUrl},null,8,["config","motorStatus","webServerUrl"])):Object(n["f"])("",!0)]})),_:1})):Object(n["f"])("",!0),!e.loadingRobotConfig&&e.robotConfigAvailable?(Object(n["q"])(),Object(n["e"])(f,{key:1,id:"robotActions","toggle-text":"Sensors and Actions",class:"home-collapse"},{default:a((function(){return[!e.loadingRobotConfig&&e.robotConfigAvailable&&e.robotConfig.sensors?(Object(n["q"])(),Object(n["e"])(v,{key:0,style:{"margin-bottom":"15px"},config:e.robotConfig.sensors,sensorsStatus:e.lastWebSocketResponse.sensors?e.lastWebSocketResponse.sensors:[]},null,8,["config","sensorsStatus"])):Object(n["f"])("",!0),!e.loadingRobotConfig&&e.robotConfigAvailable?(Object(n["q"])(),Object(n["e"])(j,{key:1,webServerUrl:e.webServerUrl,robotConfig:e.robotConfig,robotStatus:e.lastWebSocketResponse?e.lastWebSocketResponse:{}},null,8,["webServerUrl","robotConfig","robotStatus"])):Object(n["f"])("",!0)]})),_:1})):Object(n["f"])("",!0),!e.loadingRobotConfig&&e.robotConfigAvailable&&!0===e.robotConfig.enable_twist_controller?(Object(n["q"])(),Object(n["e"])(f,{key:2,id:"movements","toggle-text":"Ground movements",class:"home-collapse"},{default:a((function(){return[!e.loadingRobotConfig&&e.robotConfigAvailable&&!0===e.robotConfig.enable_twist_controller?(Object(n["q"])(),Object(n["e"])(O,{key:0,config:{},twistStatus:e.lastWebSocketResponse.twist?e.lastWebSocketResponse.twist:{},webServerUrl:e.webServerUrl},null,8,["twistStatus","webServerUrl"])):Object(n["f"])("",!0)]})),_:1})):Object(n["f"])("",!0),Object(n["h"])(f,{id:"configurations",class:"home-collapse","toggle-text":!e.loadingRobotConfig&&e.robotConfigAvailable?"Configurations":"Dashboard for Simple Python Robot SDK"},{default:a((function(){return[Object(n["h"])("div",null,[r,Object(n["I"])(Object(n["h"])("input",{type:"text",id:"web-server-url","onUpdate:modelValue":t[1]||(t[1]=function(t){return e.webServerUrl=t}),class:"server-input",placeholder:"Insert your robot web server address",disabled:e.robotConfigAvailable},null,8,["disabled"]),[[n["E"],e.webServerUrl]]),e.robotConfigAvailable?(Object(n["q"])(),Object(n["e"])("button",{key:1,onClick:t[3]||(t[3]=function(){return p.closeDashboard&&p.closeDashboard.apply(p,arguments)}),class:"main-button"}," Close dashboard ")):(Object(n["q"])(),Object(n["e"])("button",{key:0,onClick:t[2]||(t[2]=function(){return p.connectToWebServer&&p.connectToWebServer.apply(p,arguments)}),disabled:""===e.webServerUrl,class:"main-button"}," Connect to web server ",8,["disabled"])),s,i,Object(n["I"])(Object(n["h"])("input",{type:"text",id:"web-socket-url","onUpdate:modelValue":t[4]||(t[4]=function(t){return e.webSocketUrl=t}),class:"server-input",placeholder:"Insert your robot websocket address",disabled:null!==e.webSocket},null,8,["disabled"]),[[n["E"],e.webSocketUrl]]),null===e.webSocket?(Object(n["q"])(),Object(n["e"])("button",{key:2,onClick:t[5]||(t[5]=function(){return p.connectToWebSocket&&p.connectToWebSocket.apply(p,arguments)}),disabled:""===e.webSocketUrl,class:"main-button"}," Connect to websocket ",8,["disabled"])):(Object(n["q"])(),Object(n["e"])("button",{key:3,onClick:t[6]||(t[6]=function(){return p.closeWebSocket&&p.closeWebSocket.apply(p,arguments)}),class:"main-button"}," Close websocket "))]),null!==e.webSocket?(Object(n["q"])(),Object(n["e"])("div",c,Object(n["B"])(e.lastWebSocketResponse),1)):Object(n["f"])("",!0),l,Object(n["h"])("div",u,[Object(n["g"])(" Dashboard version: "+Object(n["B"])(e.appVersion)+" ",1),e.commitSha?(Object(n["q"])(),Object(n["e"])("span",{key:0,onClick:t[7]||(t[7]=function(){return p.setAllCommitSha&&p.setAllCommitSha.apply(p,arguments)})},"- "+Object(n["B"])(e.commitSha),1)):Object(n["f"])("",!0)])]})),_:1},8,["toggle-text"])])})),d=o("1da1"),p=(o("96cf"),o("b64b"),o("b0c0"),Object(n["J"])("data-v-c256a23e"));Object(n["t"])("data-v-c256a23e");var g={class:"sdk-toolbar"},h={key:0,class:"toolbar-item"},f={class:"toolbar-item speed"},v={for:"speed-range",class:"speed-lbl"},j={class:"toolbar-item system"},O={key:0},S={key:1},m={key:2},y={key:3};Object(n["r"])();var k=p((function(e,t,o,a,r,s){var i,c,l;return Object(n["q"])(),Object(n["e"])("div",g,[o.robotConfig.name?(Object(n["q"])(),Object(n["e"])("div",h,[Object(n["h"])("b",null,Object(n["B"])(o.robotConfig.name),1)])):Object(n["f"])("",!0),Object(n["h"])("div",f,[Object(n["h"])("label",v,Object(n["B"])(e.rangeSpeed),1),Object(n["I"])(Object(n["h"])("input",{id:"speed-range",class:"speed-range","onUpdate:modelValue":t[1]||(t[1]=function(t){return e.rangeSpeed=t}),disabled:e.pending,type:"range",min:"0.1",max:"5",step:"0.1",onChange:t[2]||(t[2]=function(){return s.rangeSpeedChanged&&s.rangeSpeedChanged.apply(s,arguments)}),onFocusin:t[3]||(t[3]=function(t){return e.rangeSpeedDrag=!0}),onFocusout:t[4]||(t[4]=function(t){return e.rangeSpeedDrag=!1})},null,40,["disabled"]),[[n["E"],e.rangeSpeed]])]),Object(n["h"])("div",j,[null!==(i=o.robotStatus.system)&&void 0!==i&&i.temperature?(Object(n["q"])(),Object(n["e"])("span",O,Object(n["B"])((null===(c=o.robotStatus.system)||void 0===c?void 0:c.temperature)+"°C - "),1)):Object(n["f"])("",!0),null!==(l=o.robotStatus.system)&&void 0!==l&&l.timestamp?(Object(n["q"])(),Object(n["e"])("span",S,"(Delay:"+Object(n["B"])(e.statusDelay)+" sec) - "+Object(n["B"])(e.formattedDate),1)):(Object(n["q"])(),Object(n["e"])("span",m,"Connect with websocket to receive realtime data")),o.version?(Object(n["q"])(),Object(n["e"])("span",y,[Object(n["h"])("i",null,Object(n["B"])(" - "+o.version),1)])):Object(n["f"])("",!0)])])})),w=(o("b680"),{name:"SdkManagement",props:{webServerUrl:{type:String,required:!0},robotConfig:{type:Object,required:!0},robotStatus:{type:Object,required:!0},version:{type:String,default:""}},data:function(){return{currentSpeed:1,rangeSpeed:1,rangeSpeedDrag:!1,pending:!1,formattedDate:"",statusDelay:0}},mounted:function(){var e;this.currentSpeed=null===(e=this.robotStatus.sdk)||void 0===e?void 0:e.robot_speed,this.rangeSpeed=this.currentSpeed?this.currentSpeed:1},methods:{rangeSpeedChanged:function(){var e=this;this.pending=!0;var t={robot_speed:parseFloat(this.rangeSpeed)};this.axios.patch(this.webServerUrl+"/sdk/",t).then((function(t){200!==t.status&&(e.$toast.error("Failed to change speed to "+e.rangeSpeed+". Bad response"),e.rangeSpeed=e.currentSpeed),e.pending=!1})).catch((function(){e.$toast.error("Failed to change speed to "+e.rangeSpeed),e.rangeSpeed=e.currentSpeed,e.pending=!1}))}},watch:{robotStatus:function(){var e,t,o;if(this.currentSpeed=null===(e=this.robotStatus.sdk)||void 0===e?void 0:e.robot_speed,this.currentSpeed&&!this.rangeSpeedDrag&&(this.rangeSpeed=parseFloat(this.currentSpeed)),null!==(t=this.robotStatus)&&void 0!==t&&null!==(o=t.system)&&void 0!==o&&o.timestamp){var n=new Date(this.robotStatus.system.timestamp);this.statusDelay=((Date.now()-n)/1e3).toFixed(3),this.formattedDate=("0"+n.getHours()).substr(-2)+":"+("0"+n.getMinutes()).substr(-2)+":"+("0"+n.getSeconds()).substr(-2)+":"+(n.getMilliseconds()+"000").substr(0,3)}}}}),C=(o("e536"),o("d959")),x=o.n(C);const q=x()(w,[["render",k],["__scopeId","data-v-c256a23e"]]);var A=q,V=(o("7db0"),Object(n["J"])("data-v-16153e0b"));Object(n["t"])("data-v-16153e0b");var U={class:"servomotor-group-container"};Object(n["r"])();var _=V((function(e,t,o,a,r,s){var i=Object(n["z"])("ServoMotor");return Object(n["q"])(),Object(n["e"])("div",U,[(Object(n["q"])(!0),Object(n["e"])(n["a"],null,Object(n["x"])(o.config,(function(e,t,a){return Object(n["q"])(),Object(n["e"])(i,{class:["servomotor",{"servomotor-big":0===a&&Object.keys(o.config).length%2===1}],key:t,webServerUrl:o.webServerUrl,config:e,motorKey:t,socketGoalValue:o.motorStatus.find((function(e){return e.key===t}))?o.motorStatus.find((function(e){return e.key===t})).goal_angle:0,socketCurrentValue:o.motorStatus.find((function(e){return e.key===t}))?o.motorStatus.find((function(e){return e.key===t})).current_angle:null},null,8,["class","webServerUrl","config","motorKey","socketGoalValue","socketCurrentValue"])})),128))])})),T=Object(n["J"])("data-v-b9aadc66");Object(n["t"])("data-v-b9aadc66");var G={class:"servomotor"},P={class:"infos"},I={class:"info-title"},B=Object(n["g"])(" | "),M={class:"info-angle"},R={class:"inputs-row"},W={class:"inputs-wrap"},D=Object(n["h"])("label",{class:"sr-only",for:"goal"},null,-1),$=Object(n["h"])("label",{class:"sr-only",for:"current"},null,-1);Object(n["r"])();var J=T((function(e,t,o,a,r,s){return Object(n["q"])(),Object(n["e"])("div",G,[Object(n["h"])("div",P,[Object(n["h"])("button",{disabled:e.pending||parseInt(o.config.angle_limit[0])>parseInt(e.rangeGoalAngle)-e.stepValue,onClick:t[1]||(t[1]=function(t){return s.removeStep(e.stepValue)})},"-"+Object(n["B"])(e.stepValue),9,["disabled"]),Object(n["h"])("button",{disabled:e.pending||parseInt(o.config.angle_limit[0])>parseInt(e.rangeGoalAngle)-e.stepValueSmall,onClick:t[2]||(t[2]=function(t){return s.removeStep(e.stepValueSmall)})},"-"+Object(n["B"])(e.stepValueSmall),9,["disabled"]),Object(n["h"])("span",I,Object(n["B"])(o.motorKey),1),B,Object(n["h"])("span",M,Object(n["B"])(e.rangeGoalAngle),1),o.config.angle_limit[0]<=0&&o.config.angle_limit[1]>=0?(Object(n["q"])(),Object(n["e"])("button",{key:0,disabled:e.pending||0===parseInt(e.rangeGoalAngle),onClick:t[3]||(t[3]=function(){return s.goToZero&&s.goToZero.apply(s,arguments)})},"0 ",8,["disabled"])):Object(n["f"])("",!0),Object(n["h"])("button",{disabled:e.pending||parseInt(o.config.angle_limit[1])<parseInt(e.rangeGoalAngle)+e.stepValueSmall,onClick:t[4]||(t[4]=function(t){return s.addStep(e.stepValueSmall)})},"+"+Object(n["B"])(e.stepValueSmall),9,["disabled"]),Object(n["h"])("button",{disabled:e.pending||parseInt(o.config.angle_limit[1])<parseInt(e.rangeGoalAngle)+e.stepValue,onClick:t[5]||(t[5]=function(t){return s.addStep(e.stepValue)})},"+"+Object(n["B"])(e.stepValue),9,["disabled"])]),Object(n["h"])("div",R,[Object(n["h"])("div",{class:"input-limit",onClick:t[6]||(t[6]=function(){return s.goToMin&&s.goToMin.apply(s,arguments)})},Object(n["B"])(o.config.angle_limit[0]),1),Object(n["h"])("div",W,[D,Object(n["I"])(Object(n["h"])("input",{id:"goal",class:"goal-input",type:"range",onChange:t[7]||(t[7]=function(){return s.rangeGoalChanged&&s.rangeGoalChanged.apply(s,arguments)}),min:o.config.angle_limit[0],"onUpdate:modelValue":t[8]||(t[8]=function(t){return e.rangeGoalAngle=t}),max:o.config.angle_limit[1],step:1},null,40,["min","max"]),[[n["E"],e.rangeGoalAngle]]),$,null!=o.socketCurrentValue?Object(n["I"])((Object(n["q"])(),Object(n["e"])("input",{key:0,id:"current",class:"current-input",type:"range",disabled:"",min:o.config.angle_limit[0],"onUpdate:modelValue":t[9]||(t[9]=function(t){return e.rangeCurrentAngle=t}),max:o.config.angle_limit[1],step:1},null,8,["min","max"])),[[n["E"],e.rangeCurrentAngle]]):Object(n["f"])("",!0)]),Object(n["h"])("div",{class:"input-limit",onClick:t[10]||(t[10]=function(){return s.goToMax&&s.goToMax.apply(s,arguments)})},Object(n["B"])(o.config.angle_limit[1]),1)])])})),F={name:"ServoMotor",props:{webServerUrl:{type:String,required:!0},config:{type:Object,required:!0},motorKey:{required:!0},socketGoalValue:{default:0},socketCurrentValue:{default:0}},data:function(){return{rangeCurrentAngle:0,rangeGoalAngle:0,stepValueSmall:1,stepValue:5,pending:!1}},mounted:function(){this.rangeGoalAngle=this.socketGoalValue,this.rangeCurrentAngle=this.socketCurrentValue},methods:{rangeGoalChanged:function(){var e=this;this.pending=!0;var t=parseInt(this.rangeGoalAngle);console.log(this.motorKey,t);var o={goal_angle:t};this.axios.patch(this.webServerUrl+"/motors/"+this.motorKey+"/",o).then((function(o){200!==o.status&&e.$toast.error("Failed to move "+e.motorKey+" to "+t+". Bad response"),e.pending=!1})).catch((function(){e.$toast.error("Failed to move "+e.motorKey+" to "+t),e.pending=!1}))},goToZero:function(){this.rangeGoalAngle=0,this.rangeGoalChanged()},removeStep:function(e){this.rangeGoalAngle=parseInt(this.rangeGoalAngle)-e,this.rangeGoalChanged()},addStep:function(e){this.rangeGoalAngle=parseInt(this.rangeGoalAngle)+e,this.rangeGoalChanged()},goToMin:function(){this.pending||this.rangeGoalAngle===this.config.angle_limit[0]||(this.rangeGoalAngle=this.config.angle_limit[0],this.rangeGoalChanged())},goToMax:function(){this.pending||this.rangeGoalAngle===this.config.angle_limit[1]||(this.rangeGoalAngle=this.config.angle_limit[1],this.rangeGoalChanged())}},watch:{socketGoalValue:function(){this.rangeGoalAngle=this.socketGoalValue},socketCurrentValue:function(){this.rangeCurrentAngle=this.socketCurrentValue}}};o("a863");const E=x()(F,[["render",J],["__scopeId","data-v-b9aadc66"]]);var z=E,L={name:"ServomotorsGroup",components:{ServoMotor:z},props:{webServerUrl:{type:String,required:!0},config:{type:Object,required:!0},motorStatus:{type:Array,required:!0}}};o("3c97");const K=x()(L,[["render",_],["__scopeId","data-v-16153e0b"]]);var N=K,Y=Object(n["J"])("data-v-7d9e03a8");Object(n["t"])("data-v-7d9e03a8");var X={class:"sensors-group-container"};Object(n["r"])();var Z=Y((function(e,t,o,a,r,s){return Object(n["q"])(),Object(n["e"])("div",X,[(Object(n["q"])(!0),Object(n["e"])(n["a"],null,Object(n["x"])(o.config,(function(e,t){return Object(n["q"])(),Object(n["e"])("div",{class:"sensors",key:t},[Object(n["h"])("b",null,Object(n["B"])(t),1),Object(n["g"])(": "+Object(n["B"])(o.sensorsStatus.find((function(e){return e.key===t}))?o.sensorsStatus.find((function(e){return e.key===t})).value:"-"),1)])})),128))])})),Q={name:"SensorsGroup",props:{config:{type:Object,required:!0},sensorsStatus:{type:Array,required:!0}}};o("d688");const H=x()(Q,[["render",Z],["__scopeId","data-v-7d9e03a8"]]);var ee=H,te=Object(n["J"])("data-v-74380957");Object(n["t"])("data-v-74380957");var oe={class:"robot-actions"},ne={key:0,class:"robot-actions-item robot-poses"},ae=Object(n["h"])("div",{class:"robot-actions-item-title"},"Poses:",-1),re=Object(n["h"])("option",{disabled:"",value:""},"Poses",-1),se={class:"robot-actions-item"},ie=Object(n["h"])("div",{class:"robot-actions-item-title"},"Point to point:",-1);Object(n["r"])();var ce=te((function(e,t,o,a,r,s){return Object(n["q"])(),Object(n["e"])("div",oe,[o.robotConfig.poses?(Object(n["q"])(),Object(n["e"])("div",ne,[ae,Object(n["h"])("label",null,[Object(n["I"])(Object(n["h"])("select",{"onUpdate:modelValue":t[1]||(t[1]=function(t){return e.selectedPose=t}),style:{"min-width":"200px"}},[re,(Object(n["q"])(!0),Object(n["e"])(n["a"],null,Object(n["x"])(o.robotConfig.poses,(function(e,t){return Object(n["q"])(),Object(n["e"])("option",{key:t,value:t},Object(n["B"])(t),9,["value"])})),128))],512),[[n["D"],e.selectedPose]])]),Object(n["h"])("label",null,[""!==e.selectedPose?Object(n["I"])((Object(n["q"])(),Object(n["e"])("input",{key:0,"onUpdate:modelValue":t[2]||(t[2]=function(t){return e.poseSeconds=t}),class:"robot-actions-input",type:"number",min:"0",max:"120",placeholder:"seconds"},null,512)),[[n["E"],e.poseSeconds]]):Object(n["f"])("",!0)]),""!==e.selectedPose?(Object(n["q"])(),Object(n["e"])("button",{key:0,onClick:t[3]||(t[3]=function(){return s.goToPose&&s.goToPose.apply(s,arguments)}),disabled:e.pending}," Go to "+Object(n["B"])(e.selectedPose)+" in "+Object(n["B"])(e.poseSeconds)+" seconds ",9,["disabled"])):Object(n["f"])("",!0)])):Object(n["f"])("",!0),Object(n["h"])("div",se,[ie,Object(n["h"])("label",null,[Object(n["I"])(Object(n["h"])("textarea",{"onUpdate:modelValue":t[4]||(t[4]=function(t){return e.pointToPointMotors=t}),rows:e.textAreaRows,cols:"40",class:"motors-text-area"},null,8,["rows"]),[[n["E"],e.pointToPointMotors]])]),Object(n["h"])("label",null,[""!==e.pointToPointMotors?Object(n["I"])((Object(n["q"])(),Object(n["e"])("input",{key:0,"onUpdate:modelValue":t[5]||(t[5]=function(t){return e.pointToPointSeconds=t}),class:"robot-actions-input",type:"number",min:"0",max:"120",placeholder:"seconds"},null,512)),[[n["E"],e.pointToPointSeconds]]):Object(n["f"])("",!0)]),""!==e.pointToPointMotors?(Object(n["q"])(),Object(n["e"])("button",{key:0,onClick:t[6]||(t[6]=function(){return s.movePointToPoint&&s.movePointToPoint.apply(s,arguments)}),style:{height:"22px"},disabled:e.pending}," Move point to point in "+Object(n["B"])(e.pointToPointSeconds)+" seconds ",9,["disabled"])):Object(n["f"])("",!0),Object(n["h"])("button",{onClick:t[7]||(t[7]=function(){return s.copyCurrentPosition&&s.copyCurrentPosition.apply(s,arguments)}),style:{height:"22px"},disabled:e.pending}," Copy current position ",8,["disabled"])])])})),le=o("3835"),ue=o("5530"),be=(o("4fad"),o("a1e9")),de={name:"RobotActions",props:{webServerUrl:{type:String,required:!0},robotConfig:{type:Object,required:!0},robotStatus:{type:Object,required:!0}},data:function(){return{selectedPose:"",poseSeconds:0,pointToPointMotors:"",pointToPointSeconds:0,textAreaRows:4,pending:!1}},methods:{goToPose:function(){var e=this;""===this.poseSeconds&&(this.poseSeconds=0);var t=this.selectedPose;this.selectedPose="",this.pending=!0;var o={seconds:parseFloat(this.poseSeconds)};this.axios.post(this.webServerUrl+"/go-to-pose/"+t+"/",o).then((function(o){200!==o.status&&e.$toast.error("Failed to go to pose "+t+". Bad response"),e.pending=!1})).catch((function(){e.$toast.error("Failed to go to pose "+t),e.pending=!1}))},movePointToPoint:function(){var e=this;if(""===this.pointToPointSeconds&&(this.pointToPointSeconds=0),this.isJsonString(this.pointToPointMotors)){this.pending=!0;var t=Object(ue["a"])({seconds:parseFloat(this.pointToPointSeconds)},JSON.parse(this.pointToPointMotors));this.axios.post(this.webServerUrl+"/move-point-to-point/",t).then((function(t){200!==t.status&&e.$toast.error("Failed to move point to point. Bad response"),e.pending=!1})).catch((function(){e.$toast.error("Failed to go to move point to point"),e.pending=!1}))}else this.$toast.warning("Insert a valid JSON")},copyCurrentPosition:function(){var e=this,t=Object(be["o"])(this.robotStatus),o=Object(be["o"])(this.robotConfig)["motors"],n={};this.textAreaRows=2;for(var a=function(){var o=Object(le["a"])(s[r],1),a=o[0];t["motors"]&&t["motors"].find((function(e){return e.key===a})).goal_angle?n[a]=t["motors"].find((function(e){return e.key===a})).goal_angle:n[a]=0,e.textAreaRows++},r=0,s=Object.entries(o);r<s.length;r++)a();this.pointToPointMotors=JSON.stringify(n,null,2)},isJsonString:function(e){try{JSON.parse(e)}catch(t){return!1}return!0}}};o("93b8");const pe=x()(de,[["render",ce],["__scopeId","data-v-74380957"]]);var ge=pe,he=Object(n["J"])("data-v-4be70c38");Object(n["t"])("data-v-4be70c38");var fe={class:"collapsible-block"},ve={class:"collapsible-content"},je={class:"content-inner"};Object(n["r"])();var Oe=he((function(e,t,o,a,r,s){return Object(n["q"])(),Object(n["e"])("div",fe,[Object(n["h"])("input",{id:o.id,class:"toggle",type:"checkbox",checked:o.checked},null,8,["id","checked"]),"lbl-toggle-text"===o.type?(Object(n["q"])(),Object(n["e"])("label",{key:0,for:o.id,class:["lbl-toggle",[o.type]]},Object(n["B"])(o.toggleText),11,["for"])):Object(n["f"])("",!0),"left-toggle"===o.type?(Object(n["q"])(),Object(n["e"])("label",{key:1,for:o.id,class:["lbl-toggle",[o.type]]},[Object(n["y"])(e.$slots,"header",{},void 0,!0)],10,["for"])):Object(n["f"])("",!0),Object(n["h"])("div",ve,[Object(n["h"])("div",je,[Object(n["y"])(e.$slots,"default",{},void 0,!0)])])])})),Se={name:"CollapsibleBlock",props:{id:{type:String,required:!0},checked:{type:Boolean,default:!0},type:{type:String,default:"lbl-toggle-text"},toggleText:{type:String,default:"Toggle"}}};o("d715");const me=x()(Se,[["render",Oe],["__scopeId","data-v-4be70c38"]]);var ye=me,ke=Object(n["J"])("data-v-5fb4798f");Object(n["t"])("data-v-5fb4798f");var we={class:"movements"},Ce={class:"left-area"},xe={class:"area-group"},qe=Object(n["h"])("div",{class:"axis-label"},"Joystick X:",-1),Ae={class:"axis-value"},Ve={class:"area-group"},Ue=Object(n["h"])("div",{class:"axis-label"},"Joystick Y:",-1),_e={class:"axis-value"},Te={class:"right-area data-area"},Ge={class:"area-group"},Pe=Object(n["h"])("div",{class:"data-label"},"Linear:",-1),Ie={class:"data-value"},Be={class:"area-group data-area"},Me=Object(n["h"])("div",{class:"data-label"},"Angular:",-1),Re={class:"data-value"};Object(n["r"])();var We=ke((function(e,t,o,a,r,s){var i=Object(n["z"])("Joystick");return Object(n["q"])(),Object(n["e"])("div",we,[Object(n["h"])("div",Ce,[Object(n["h"])("div",xe,[qe,Object(n["h"])("div",Ae,Object(n["B"])(e.joystickValue.x?e.joystickValue.x:0),1)]),Object(n["h"])("div",Ve,[Ue,Object(n["h"])("div",_e,Object(n["B"])(e.joystickValue.y?e.joystickValue.y:0),1)])]),Object(n["h"])(i,{class:"joystick-container",idx:"controller1",onChange:s.change},null,8,["onChange"]),Object(n["h"])("div",Te,[Object(n["h"])("div",Ge,[Pe,Object(n["h"])("div",Ie,Object(n["B"])(o.twistStatus.linear?o.twistStatus.linear:"-"),1)]),Object(n["h"])("div",Be,[Me,Object(n["h"])("div",Re,Object(n["B"])(o.twistStatus.angular?o.twistStatus.angular:"-"),1)])])])})),De={style:{width:"128px",position:"relative"}},$e=Object(n["h"])("img",{src:"/images/joystick-base.png",alt:""},null,-1),Je=Object(n["h"])("img",{src:"/images/joystick-red.png",alt:""},null,-1);function Fe(e,t,o,a,r,s){return Object(n["q"])(),Object(n["e"])("div",{id:"joystick_"+o.idx},[Object(n["h"])("div",De,[$e,Object(n["h"])("div",{id:o.idx+"_stick",style:{position:"absolute",left:"32px",top:"32px"}},[Je],8,["id"])])],8,["id"])}var Ee=o("d4ec"),ze=(o("4057"),o("99af"),o("a9e3"),function e(t,o,n){Object(Ee["a"])(this,e),this.id=t;var a=document.getElementById(t);this.dragStart=null,this.touchId=null,this.active=!1,this.value={x:0,y:0};var r=this;function s(e){r.active=!0,a.style.transition="0s",e.preventDefault(),e.changedTouches?r.dragStart={x:e.changedTouches[0].clientX,y:e.changedTouches[0].clientY}:r.dragStart={x:e.clientX,y:e.clientY},e.changedTouches&&(r.touchId=e.changedTouches[0].identifier)}function i(e){if(r.active){var t=null;if(e.changedTouches){for(var s=0;s<e.changedTouches.length;s++)r.touchId===e.changedTouches[s].identifier&&(t=s,e.clientX=e.changedTouches[s].clientX,e.clientY=e.changedTouches[s].clientY);if(null==t)return}var i=e.clientX-r.dragStart.x,c=e.clientY-r.dragStart.y,l=Math.atan2(c,i),u=Math.min(o,Math.hypot(i,c)),b=u*Math.cos(l),d=u*Math.sin(l);a.style.transform="translate3d(".concat(b,"px, ").concat(d,"px, 0px)");var p=u<n?0:o/(o-n)*(u-n),g=p*Math.cos(l),h=p*Math.sin(l),f=parseFloat((g/o).toFixed(3)),v=parseFloat((h/o).toFixed(3));r.value={x:f,y:-v}}}function c(e){r.active&&(e.changedTouches&&r.touchId!==e.changedTouches[0].identifier||(a.style.transition="0.2s",a.style.transform="translate3d(0px, 0px, 0px)",r.value={x:0,y:0},r.touchId=null,r.active=!1))}a.addEventListener("mousedown",s),a.addEventListener("touchstart",s),document.addEventListener("mousemove",i,{passive:!1}),document.addEventListener("touchmove",i,{passive:!1}),document.addEventListener("mouseup",c),document.addEventListener("touchend",c)}),Le={name:"Joystick",props:{idx:{type:String,required:!0},refreshInterval:{type:Number,default:333}},data:function(){return{joystick1:null,lastValue:{},value:{},lastChanged:(new Date).valueOf()+1e3}},mounted:function(){console.log("Joystick "+this.idx+" mounted"),this.joystick1=new ze(this.idx+"_stick",52,8),this.lastValue=this.joystick1.value,this.value=this.lastValue,this.joystickLoop()},methods:{update:function(){this.lastValue=this.joystick1.value,this.lastValue!==this.value&&this.lastChanged+this.refreshInterval<(new Date).valueOf()?(this.lastChanged=(new Date).valueOf(),this.value=this.lastValue,this.$emit("change",this.value)):0!==this.lastValue.x||0!==this.lastValue.y||this.value.x===this.lastValue.x&&this.value.y===this.lastValue.y||(this.lastChanged=(new Date).valueOf(),this.value=this.lastValue,this.$emit("change",this.value))},joystickLoop:function(){requestAnimationFrame(this.joystickLoop),this.update()}}};const Ke=x()(Le,[["render",Fe]]);var Ne=Ke,Ye={name:"GroundMovements",components:{Joystick:Ne},props:{webServerUrl:{type:String,required:!0},config:{type:Object,required:!0},twistStatus:{type:Object,required:!0}},data:function(){return{joystick1:null,joystickValue:{},pending:!1}},methods:{change:function(e){var t=this;this.joystickValue=e,this.pending=!0;var o={linear:{x:this.joystickValue.x,y:this.joystickValue.y,z:0},angular:{x:0,y:0,z:0}};this.axios.post(this.webServerUrl+"/twist/",o).then((function(e){200!==e.status&&t.$toast.error("Failed to send twist. Bad response"),t.pending=!1})).catch((function(){t.$toast.error("Failed to send twist"),t.pending=!1}))}}};o("19ad");const Xe=x()(Ye,[["render",We],["__scopeId","data-v-5fb4798f"]]);var Ze=Xe,Qe={name:"App",components:{CollapsibleBlock:ye,SdkManagement:A,ServomotorsGroup:N,SensorsGroup:ee,RobotActions:ge,GroundMovements:Ze},data:function(){return{webServerUrl:"",webSocketUrl:"",loadingRobotConfig:!0,webSocket:null,robotConfig:{},robotConfigAvailable:!1,sdkVersion:null,lastWebSocketResponse:{},appVersion:"0.4.0",commitSha:""}},mounted:function(){this.commitSha="d52baa5169c33ab905643e90d45fe8f022c19252".substring(0,7),setTimeout(this.readQueryConf,100)},methods:{connectToWebServer:function(){var e=Object(d["a"])(regeneratorRuntime.mark((function e(){var t=this;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:this.loadingRobotConfig=!0,this.robotConfigAvailable=!1,this.lastWebSocketResponse={},this.robotConfig={},this.axios.get(this.webServerUrl+"/configuration/").then((function(e){200===e.status?(t.robotConfig=e.data,e.headers.simplepybotsdk&&(t.sdkVersion=e.headers.simplepybotsdk),Object.keys(t.robotConfig).length>0&&(t.robotConfigAvailable=!0),t.robotConfig.id&&(t.loadingRobotConfig=!1,t.$toast.success(t.robotConfig.name+" ready")),localStorage.setItem("webServerUrl",t.webServerUrl)):t.$toast.error("Bad response from "+t.webServerUrl+"/configuration/ code "+e.status)})).catch((function(){t.$toast.error("Connection with "+t.webServerUrl+" failed")}));case 5:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),connectToWebSocket:function(){var e=this,t=this;this.lastWebSocketResponse={},this.webSocket&&(console.log("Close old connection"),this.webSocket.close()),localStorage.setItem("webSocketUrl",this.webSocketUrl),this.webSocket=new WebSocket(this.webSocketUrl+"/"),this.webSocket.onmessage=function(o){if(o.data instanceof Blob){var n=new FileReader;n.onload=function(){t.onWebSocketMessage(JSON.parse(String(n.result)))},n.readAsText(o.data)}else e.onWebSocketMessage(JSON.parse(o.data))},this.webSocket.onerror=function(){e.$toast.warning("Websocket connection error"),e.webSocket=null},this.webSocket.onclose=function(){e.$toast.warning("Websocket connection closed"),e.webSocket=null}},closeWebSocket:function(){this.webSocket.close(),this.$toast.warning("Websocket connection closed"),this.webSocket=null,this.onWebSocketMessage({})},closeDashboard:function(){this.loadingRobotConfig=!0,this.robotConfigAvailable=!1,this.lastWebSocketResponse={},this.robotConfig={},this.loadingRobotConfig=!1,this.$toast.warning("Dashboard closed")},onWebSocketMessage:function(e){this.lastWebSocketResponse=e},readQueryConf:function(){this.$route.query.webserverurl?this.webServerUrl=this.$route.query.webserverurl:localStorage.getItem("webServerUrl")&&(this.webServerUrl=localStorage.getItem("webServerUrl")),this.$route.query.websocketurl?this.webSocketUrl=this.$route.query.websocketurl:localStorage.getItem("webSocketUrl")&&(this.webSocketUrl=localStorage.getItem("webSocketUrl")),this.$route.query.autoconnect&&this.connectToWebServer()},setAllCommitSha:function(){this.commitSha="d52baa5169c33ab905643e90d45fe8f022c19252"}}};o("a69c");const He=x()(Qe,[["render",b],["__scopeId","data-v-260467a8"]]);var et=He,tt=o("bc3a"),ot=o.n(tt),nt=o("2106"),at=o.n(nt),rt=o("6c02"),st=o("af56"),it=Object(n["d"])(et);it.use(at.a,ot.a);var ct=[{path:"/",name:"App",component:et}],lt=Object(rt["a"])({history:Object(rt["b"])(),routes:ct});it.use(lt),it.use(st["a"],{position:"top-right"}),it.mount("#app")},"6e13":function(e,t,o){},"71b7":function(e,t,o){},"77e5":function(e,t,o){},"831c":function(e,t,o){},"93b8":function(e,t,o){"use strict";o("b581")},a69c:function(e,t,o){"use strict";o("6e13")},a863:function(e,t,o){"use strict";o("151e")},b581:function(e,t,o){},c479:function(e,t,o){},d688:function(e,t,o){"use strict";o("c479")},d715:function(e,t,o){"use strict";o("4219")},e536:function(e,t,o){"use strict";o("77e5")}});
//# sourceMappingURL=app.d1007196.js.map
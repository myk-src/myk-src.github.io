import{d as u,o as d,c as l,a as n,F as i,r,b as e,t as o,g as c,n as p,_ as v}from"./index-DryBahzJ.js";const b={class:"breadboard"},k={class:"power-rail red-rail"},y={class:"breadboard-body"},w={class:"embedded-lcd"},g={class:"lcd-bezel"},E={class:"lcd-screen"},N={class:"comment"},f={class:"comment"},C={class:"comment"},O={class:"comment"},D={class:"comment"},S={class:"comment"},j={class:"comment"},x={class:"comment"},B={class:"pins top-pins"},F={class:"pins bottom-pins"},I={class:"hole-grid"},L={class:"power-rail blue-rail"},R=u({__name:"EmbeddedLCD",props:{resume:{},isFocused:{type:Boolean}},setup(t){return(T,s)=>(d(),l("section",{class:p(["physical-object breadboard-assembly",{focused:t.isFocused}])},[n("div",b,[n("div",k,[(d(),l(i,null,r(30,a=>n("div",{class:"hole",key:"r"+a})),64))]),n("div",y,[n("div",w,[n("div",g,[n("div",E,[s[16]||(s[16]=n("div",{class:"scanline"},null,-1)),n("pre",null,[n("code",null,[s[0]||(s[0]=n("span",{class:"kw"},"module",-1)),s[1]||(s[1]=e()),s[2]||(s[2]=n("span",{class:"fn"},"myk_system_arch",-1)),s[3]||(s[3]=e(` (
  `,-1)),s[4]||(s[4]=n("span",{class:"kw"},"input",-1)),s[5]||(s[5]=e(`  clk,
  `,-1)),s[6]||(s[6]=n("span",{class:"kw"},"output",-1)),s[7]||(s[7]=e(` [31:0] degree
);

`,-1)),n("span",N,"// DEVELOPER:     "+o(t.resume.name),1),s[8]||(s[8]=e(`
`,-1)),n("span",f,"// EDUCATION:     "+o(t.resume.education.school)+" ",1),s[9]||(s[9]=e(`
`,-1)),n("span",C,"// MAJOR:         "+o(t.resume.education.major[0].name),1),s[10]||(s[10]=e(`
`,-1)),n("span",O,"// CONCENTRATION: "+o(t.resume.education.major[0].concentration[0]),1),s[11]||(s[11]=e(`
`,-1)),n("span",D,"//                "+o(t.resume.education.major[0].concentration[1]),1),s[12]||(s[12]=e(`
`,-1)),n("span",S,"// MINORS:        "+o(t.resume.education.minors[0]),1),s[13]||(s[13]=e(`
`,-1)),n("span",j,"//                "+o(t.resume.education.minors[1]),1),s[14]||(s[14]=e(`
`,-1)),n("span",x,"//                "+o(t.resume.education.minors[2]),1),s[15]||(s[15]=c(`

<span class="kw" data-v-9770408a>always</span> @(<span class="kw" data-v-9770408a>posedge</span> clk) <span class="kw" data-v-9770408a>begin</span>
  degree &lt;= <span class="str" data-v-9770408a>&quot;HW/SW Solutions&quot;</span>;
<span class="kw" data-v-9770408a>end</span>
<span class="kw" data-v-9770408a>endmodule</span>`,12))])])])]),n("div",B,[(d(),l(i,null,r(10,a=>n("div",{class:"pin",key:"pt"+a})),64))]),n("div",F,[(d(),l(i,null,r(10,a=>n("div",{class:"pin",key:"pb"+a})),64))])]),n("div",I,[(d(),l(i,null,r(10,a=>n("div",{class:"hole-col",key:"c"+a},[(d(),l(i,null,r(10,m=>n("div",{class:"hole",key:"h"+m})),64))])),64))])]),n("div",L,[(d(),l(i,null,r(30,a=>n("div",{class:"hole",key:"b"+a})),64))])])],2))}}),A=v(R,[["__scopeId","data-v-9770408a"]]);export{A as default};

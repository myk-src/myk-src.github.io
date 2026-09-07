import{d as b,o as a,c as t,a as s,F as d,r as o,b as l,t as c,g as v,n as k,f as y,_ as w}from"./index-Bh6Bfdov.js";const f={class:"breadboard"},g={class:"power-rail red-rail"},_={class:"breadboard-body"},E={class:"embedded-lcd"},C={class:"lcd-bezel"},N={class:"lcd-screen"},x={class:"comment"},D={class:"comment"},T={class:"comment"},j={class:"pins top-pins"},B={class:"pins bottom-pins"},F={class:"hole-grid"},L={class:"power-rail blue-rail"},O=b({__name:"EmbeddedLCD",props:{resume:{},isFocused:{type:Boolean}},setup(r){const p=r,u=y(()=>{if(!p.resume)return"";const i=p.resume.education.major[0].concentration||[];return i.length<=1?i.join(""):`${i.slice(0,-1).join(", ")} and ${i.slice(-1)}`});return(i,n)=>(a(),t("section",{class:k(["physical-object breadboard-assembly",{focused:r.isFocused}])},[s("div",f,[s("div",g,[(a(),t(d,null,o(30,e=>s("div",{class:"hole",key:"r"+e})),64))]),s("div",_,[s("div",E,[s("div",C,[s("div",N,[n[11]||(n[11]=s("div",{class:"scanline"},null,-1)),s("pre",null,[s("code",null,[n[0]||(n[0]=s("span",{class:"kw"},"module",-1)),n[1]||(n[1]=l()),n[2]||(n[2]=s("span",{class:"fn"},"myk_system_arch",-1)),n[3]||(n[3]=l(` (
  `,-1)),n[4]||(n[4]=s("span",{class:"kw"},"input",-1)),n[5]||(n[5]=l(`  clk,
  `,-1)),n[6]||(n[6]=s("span",{class:"kw"},"output",-1)),n[7]||(n[7]=l(` [31:0] degree
);

`,-1)),s("span",x,"// DEVELOPER: "+c(r.resume.name),1),n[8]||(n[8]=l(`
`,-1)),s("span",D,"// EDUCATION: "+c(r.resume.education.school)+" ",1),n[9]||(n[9]=l(`
`,-1)),s("span",T,"// CONCENTRATION: "+c(u.value),1),n[10]||(n[10]=v(`

<span class="kw" data-v-d6ad075b>always</span> @(<span class="kw" data-v-d6ad075b>posedge</span> clk) <span class="kw" data-v-d6ad075b>begin</span>
  degree &lt;= <span class="str" data-v-d6ad075b>&quot;HW/SW Solutions&quot;</span>;
<span class="kw" data-v-d6ad075b>end</span>
<span class="kw" data-v-d6ad075b>endmodule</span>`,12))])])])]),s("div",j,[(a(),t(d,null,o(10,e=>s("div",{class:"pin",key:"pt"+e})),64))]),s("div",B,[(a(),t(d,null,o(10,e=>s("div",{class:"pin",key:"pb"+e})),64))])]),s("div",F,[(a(),t(d,null,o(10,e=>s("div",{class:"hole-col",key:"c"+e},[(a(),t(d,null,o(10,m=>s("div",{class:"hole",key:"h"+m})),64))])),64))])]),s("div",L,[(a(),t(d,null,o(30,e=>s("div",{class:"hole",key:"b"+e})),64))])])],2))}}),V=w(O,[["__scopeId","data-v-d6ad075b"]]);export{V as default};

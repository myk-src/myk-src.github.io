import{d as u,i as p,o as r,c as m,a as n,b as o,t as a,g as v,e as b,f as d,_ as c}from"./index-Cli1CM7w.js";const k={key:0,class:"physical-object embedded-lcd"},g={class:"pcb-substrate"},f={class:"lcd-bezel"},w={class:"lcd-screen"},E={class:"comment"},N={class:"comment"},C={class:"comment"},y=u({__name:"EmbeddedLCD",setup(j){const l=p("resumes"),e=d(()=>{var t;return(t=l==null?void 0:l.value)==null?void 0:t[0]}),i=d(()=>{if(!e.value)return"";const t=e.value.education.major[0].concentration;return t.length<=1?t.join(""):`${t.slice(0,-1).join(", ")}${t.length>2?",":""} and ${t.slice(-1)}`});return(t,s)=>e.value?(r(),m("section",k,[n("div",g,[s[12]||(s[12]=n("div",{class:"mounting-hole tl"},null,-1)),s[13]||(s[13]=n("div",{class:"mounting-hole tr"},null,-1)),s[14]||(s[14]=n("div",{class:"mounting-hole bl"},null,-1)),s[15]||(s[15]=n("div",{class:"mounting-hole br"},null,-1)),n("div",f,[n("div",w,[s[11]||(s[11]=n("div",{class:"scanline"},null,-1)),n("pre",null,[n("code",null,[s[0]||(s[0]=n("span",{class:"kw"},"module",-1)),s[1]||(s[1]=o()),s[2]||(s[2]=n("span",{class:"fn"},"myk_system_arch",-1)),s[3]||(s[3]=o(` (
  `,-1)),s[4]||(s[4]=n("span",{class:"kw"},"input",-1)),s[5]||(s[5]=o(`  clk,
  `,-1)),s[6]||(s[6]=n("span",{class:"kw"},"output",-1)),s[7]||(s[7]=o(` [31:0] degree
);

`,-1)),n("span",E,"// DEVELOPER: "+a(e.value.name),1),s[8]||(s[8]=o(`
`,-1)),n("span",N,"// EDUCATION: "+a(e.value.education.school)+" ",1),s[9]||(s[9]=o(`
`,-1)),n("span",C,"// CONCENTRATION: "+a(i.value),1),s[10]||(s[10]=v(`

<span class="kw" data-v-1579727b>always</span> @(<span class="kw" data-v-1579727b>posedge</span> clk) <span class="kw" data-v-1579727b>begin</span>
  degree &lt;= <span class="str" data-v-1579727b>&quot;HW/SW Solutions&quot;</span>;
<span class="kw" data-v-1579727b>end</span>
<span class="kw" data-v-1579727b>endmodule</span>`,12))])])])])])])):b("",!0)}}),D=c(y,[["__scopeId","data-v-1579727b"]]);export{D as default};

import{d as m,o as l,c as d,a as n,F as i,r as c,g as r,t as o,b as e,n as u,_ as p}from"./index-QR3d2II2.js";const v={class:"breadboard"},b={class:"power-rail red-rail"},k={class:"power-rail blue-rail"},y={class:"breadboard-body"},w={class:"embedded-lcd"},E={class:"pins top-pins"},N={class:"lcd-bezel"},f={class:"lcd-screen"},g={class:"comment"},C={class:"comment"},O={class:"comment"},S={class:"comment"},D={class:"comment"},j={class:"comment"},x={class:"comment"},B={class:"comment"},F={class:"pins bottom-pins"},I={class:"power-rail red-rail"},L={class:"power-rail blue-rail"},R=m({__name:"EmbeddedLCD",props:{resume:{},isFocused:{type:Boolean}},setup(t){return(T,s)=>(l(),d("section",{class:u(["physical-object breadboard-assembly",{focused:t.isFocused}])},[n("div",v,[n("div",b,[(l(),d(i,null,c(30,a=>n("div",{class:"hole",key:"r"+a})),64))]),n("div",k,[(l(),d(i,null,c(30,a=>n("div",{class:"hole",key:"b"+a})),64))]),n("div",y,[n("div",w,[n("div",E,[(l(),d(i,null,c(10,a=>n("div",{class:"pin",key:"pt"+a})),64))]),n("div",N,[n("div",f,[s[17]||(s[17]=n("div",{class:"scanline"},null,-1)),n("pre",null,[n("code",null,[s[0]||(s[0]=r(`<span class="kw" data-v-7ca7057c>module</span> <span class="fn" data-v-7ca7057c>myk_system_arch</span> (
  <span class="kw" data-v-7ca7057c>input</span>  clk,
  <span class="kw" data-v-7ca7057c>output</span> [31:0] degree
);

<span class="comment" data-v-7ca7057c>// DEVELOPER:</span>
`,10)),n("span",g,"//     > "+o(t.resume.name),1),s[1]||(s[1]=e(`
`,-1)),s[2]||(s[2]=n("span",{class:"comment"},"// EDUCATION:",-1)),s[3]||(s[3]=e(`
`,-1)),n("span",C,"//     > "+o(t.resume.education.school),1),s[4]||(s[4]=e(`
`,-1)),s[5]||(s[5]=n("span",{class:"comment"},"// MAJOR:",-1)),s[6]||(s[6]=e(`
`,-1)),n("span",O,"//     > "+o(t.resume.education.major[0].name),1),s[7]||(s[7]=e(`
`,-1)),s[8]||(s[8]=n("span",{class:"comment"},"// CONCENTRATIONS:",-1)),s[9]||(s[9]=e(`
`,-1)),n("span",S,"//     > "+o(t.resume.education.major[0].concentration[0]),1),s[10]||(s[10]=e(`
`,-1)),n("span",D,"//     > "+o(t.resume.education.major[0].concentration[1]),1),s[11]||(s[11]=e(`
`,-1)),s[12]||(s[12]=n("span",{class:"comment"},"// MINORS:",-1)),s[13]||(s[13]=e(`
`,-1)),n("span",j,"//     > "+o(t.resume.education.minors[0]),1),s[14]||(s[14]=e(`
`,-1)),n("span",x,"//     > "+o(t.resume.education.minors[1]),1),s[15]||(s[15]=e(`
`,-1)),n("span",B,"//     > "+o(t.resume.education.minors[2]),1),s[16]||(s[16]=r(`

<span class="kw" data-v-7ca7057c>always</span> @(<span class="kw" data-v-7ca7057c>posedge</span> clk) <span class="kw" data-v-7ca7057c>begin</span>
  degree &lt;= <span class="str" data-v-7ca7057c>&quot;HW/SW Solutions&quot;</span>;
<span class="kw" data-v-7ca7057c>end</span>
<span class="kw" data-v-7ca7057c>endmodule</span>`,12))])])])]),n("div",F,[(l(),d(i,null,c(10,a=>n("div",{class:"pin",key:"pb"+a})),64))])])]),n("div",I,[(l(),d(i,null,c(30,a=>n("div",{class:"hole",key:"r"+a})),64))]),n("div",L,[(l(),d(i,null,c(30,a=>n("div",{class:"hole",key:"b"+a})),64))])])],2))}}),A=p(R,[["__scopeId","data-v-7ca7057c"]]);export{A as default};

(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[395],{5591:function(e,r,s){Promise.resolve().then(s.bind(s,5546)),Promise.resolve().then(s.bind(s,4838)),Promise.resolve().then(s.bind(s,9420)),Promise.resolve().then(s.bind(s,1663)),Promise.resolve().then(s.bind(s,8186)),Promise.resolve().then(s.bind(s,2234)),Promise.resolve().then(s.bind(s,8570)),Promise.resolve().then(s.bind(s,176)),Promise.resolve().then(s.bind(s,4143)),Promise.resolve().then(s.bind(s,2414)),Promise.resolve().then(s.bind(s,1317)),Promise.resolve().then(s.bind(s,516)),Promise.resolve().then(s.bind(s,6362)),Promise.resolve().then(s.bind(s,2699)),Promise.resolve().then(s.bind(s,9426)),Promise.resolve().then(s.bind(s,8575)),Promise.resolve().then(s.bind(s,190)),Promise.resolve().then(s.bind(s,5146)),Promise.resolve().then(s.bind(s,9023)),Promise.resolve().then(s.bind(s,5757)),Promise.resolve().then(s.bind(s,9502)),Promise.resolve().then(s.bind(s,6588)),Promise.resolve().then(s.bind(s,5815)),Promise.resolve().then(s.bind(s,6711)),Promise.resolve().then(s.bind(s,7451))},8792:function(e,r,s){"use strict";s.d(r,{default:function(){return t.a}});var n=s(5250),t=s.n(n)},7907:function(e,r,s){"use strict";var n=s(5313);s.o(n,"useRouter")&&s.d(r,{useRouter:function(){return n.useRouter}}),s.o(n,"useSearchParams")&&s.d(r,{useSearchParams:function(){return n.useSearchParams}})},7451:function(e,r,s){"use strict";s.r(r);var n=s(3827),t=s(7476),i=s(2355),o=s(7615),l=s(6524),a=s(5757),d=s(8792),u=s(7907),m=s(4090);r.default=e=>{let{login:r}=e,s=(0,u.useSearchParams)(),l=(0,u.useRouter)(),[a,c]=(0,m.useState)({identifier:"samad",password:"myPassword"}),b=e=>{c(r=>({...r,[e.target.name]:e.target.value}))};return(0,n.jsxs)(t.x,{className:"border-2 border-gray-200 rounded-md shadow-md p-6 w-[300px]",children:[(0,n.jsx)(i.X,{align:"center",className:"mb-4",children:"Login"}),(0,n.jsxs)("form",{onSubmit:async e=>{e.preventDefault();try{await r(a);let e=s.get("redirectTo");l.push(e||"/me")}catch(e){console.log(e)}},className:"flex flex-col items-center gap-4 ",children:[(0,n.jsx)(h,{label:"identifier",type:"text",onChange:b,name:"identifier",value:a.identifier}),(0,n.jsx)(h,{label:"Password",type:"password",onChange:b,name:"password",value:a.password})," ",(0,n.jsx)(o.z,{className:"border-2 border-gray-800 cursor-pointer",children:"Submit"})]}),(0,n.jsxs)(t.x,{className:" mx-auto cursor-pointer w-full text-center text-sm mt-2",children:["New User?",(0,n.jsx)(d.default,{className:"text-blue-400 underline",href:"/register",children:"Register"})]})]})};let h=e=>{let{label:r,placeholder:s,type:i,onChange:o,name:d,value:u}=e;return(0,n.jsxs)(t.x,{className:"w-full",children:[(0,n.jsx)(l.x,{size:"2",children:r}),(0,n.jsx)(a.TextField.Input,{placeholder:s,size:"1",type:i,onChange:o,name:d,value:u})]})}}},function(e){e.O(0,[615,384,250,971,69,744],function(){return e(e.s=5591)}),_N_E=e.O()}]);
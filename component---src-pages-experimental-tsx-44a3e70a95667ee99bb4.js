(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{Qylq:function(e,t,a){"use strict";a.r(t),a.d(t,"query",(function(){return _}));var n=a("zLVn"),l=a("q1tI"),r=a("Ji2X"),c=a("ofer"),o=a("bXiM"),i=a("lO0E"),m=a("dfam"),s=a("JrkS"),u=a("aBAf"),d=a("XX3T"),b=a("HgyP"),p=a("GHCi"),E=a("PsDL"),v=a("wb2y"),g=a("1NhI"),f=a("6u8J"),x=a("lopY"),T=a("9NZZ"),h=a("R/WZ"),y=a("ZBNC"),w=a("tr08"),C=a("uXem"),k=a.n(C),O=a("eo1q"),N=a.n(O),j=a("uniG"),I=a.n(j),B=a("WElE"),q=a.n(B),M=a("ZPUd"),z=a.n(M),D=a("7VIw"),W=a.n(D),Z=a("QYLo"),L=a("vBUr"),S=a("y+3Z"),Y=a("mqAL"),J=a("nkWA"),P=a("bbla"),X=a("68YK"),U=a("nzq1"),A=["pl","bs","revenue","expense","attd"],G=Object(h.a)((function(e){return Object(y.a)({container:{}})}));function H(e){var t=e.title,a=e.isMobile,o=e.value,i=e.mobileTab,m=e.children,s=Object(n.a)(e,["title","isMobile","value","mobileTab","children"]),u=G({value:o});return l.createElement("div",{role:"tabpanel",hidden:a&&o!==i},a&&o!==i?null:l.createElement(r.a,Object.assign({className:u.container},s),t?l.createElement(c.a,{variant:"h4",component:"h2",gutterBottom:!0},t):null,m))}function Q(e){var t=e.edges,a=e.value,n=e.content,c=e.contentTab;e.setContentTab;return l.createElement("div",{role:"tabpanel",hidden:a!==n},a===n?l.createElement("div",null,l.createElement(R,{value:"figure",contentTab:c},l.createElement(X.a,{edges:t,mode:"club",tab:n})),l.createElement(R,{value:"article",contentTab:c},l.createElement(r.a,{maxWidth:"md"},"pl"===n?l.createElement(U.e,null):"bs"===n?l.createElement(U.c,null):"revenue"===n?l.createElement(U.f,null):"expense"===n?l.createElement(U.d,null):l.createElement(U.a,null)))):null)}function R(e){var t=e.value,a=e.contentTab,n=e.children,r=Object(w.a)(),c=Object(x.a)(r.breakpoints.only("xs"));return l.createElement("div",{hidden:c&&t!==a},c&&t!==a?null:l.createElement("div",null,n))}var V=Object(h.a)((function(e){var t,a;return Object(y.a)({root:(t={paddingTop:64},t[e.breakpoints.only("xs")]={paddingTop:56,paddingBottom:56},t),appBar:{background:"dark"===e.palette.type?e.palette.background.default:void 0,color:"dark"===e.palette.type?e.palette.text.primary:void 0},tabs:(a={position:"sticky",top:function(e){return e.trigger?0:64},background:e.palette.background.paper,zIndex:e.zIndex.appBar-1,boxShadow:e.shadows[1],transition:e.transitions.create("top")},a[e.breakpoints.only("xs")]={top:function(e){return e.trigger?0:56}},a),mobileTabContainer:{display:"flex",flexDirection:"column-reverse"},bottomNavigation:{position:"fixed",width:"100%",bottom:0,zIndex:e.zIndex.appBar,borderTop:"1px solid "+e.palette.divider},fab:{position:"fixed",right:e.spacing(2),bottom:e.spacing(2)},drawerInner:{width:280},drawerToolbar:Object.assign({},e.mixins.toolbar,{display:"flex",alignItems:"center",padding:e.spacing(0,2)})})}));t.default=function(e){var t,a=e.data;console.log(a);var n=Object(w.a)(),r=Object(T.a)(),h=Object(x.a)(n.breakpoints.only("xs")),y=l.useState(!1),C=y[0],O=y[1],j=l.useState("summary"),B=j[0],M=j[1],D=l.useState("pl"),X=D[0],G=D[1],R=l.useState("figure"),_=R[0],K=R[1],F=V({trigger:r}),$=function(e){return void 0===e&&(e=void 0),function(){var t;return O(null!==(t=e)&&void 0!==t?t:!C)}};return l.createElement("div",{className:F.root},l.createElement(f.a,{appear:!1,direction:"down",in:!r},l.createElement(o.a,{className:F.appBar},l.createElement(i.a,null,l.createElement(E.a,{edge:"start",color:"inherit",onClick:$()},l.createElement(I.a,null)),l.createElement(c.a,{variant:"h6",component:"h1"},null===(t=a.clubsYaml)||void 0===t?void 0:t.fullname)))),l.createElement(f.a,{appear:!1,direction:"down",in:!h||"main"===B},l.createElement("nav",{className:F.tabs},l.createElement(m.a,{value:X,variant:"scrollable",indicatorColor:"secondary",textColor:"secondary",onChange:function(e,t){"pl"!==t&&"bs"!==t&&"revenue"!==t&&"expense"!==t&&"attd"!==t||G(t)}},l.createElement(s.a,{label:"損益計算書",value:"pl",wrapped:!0}),l.createElement(s.a,{label:"貸借対照表",value:"bs",wrapped:!0}),l.createElement(s.a,{label:"営業収入",value:"revenue",wrapped:!0}),l.createElement(s.a,{label:"営業費用",value:"expense",wrapped:!0}),l.createElement(s.a,{label:"入場者数",value:"attd",wrapped:!0})))),l.createElement("div",{className:F.mobileTabContainer},l.createElement(H,{title:"概要",isMobile:h,value:"summary",mobileTab:B,maxWidth:"md"},l.createElement(Z.a,{clubsYaml:a.clubsYaml}),l.createElement(U.b,null)),l.createElement(H,{isMobile:h,value:"main",mobileTab:B,maxWidth:"lg",disableGutters:!0},l.createElement(W.a,{index:A.indexOf(X),onChangeIndex:function(e){G(A[e])}},l.createElement(Q,{edges:a.allDataset.edges,value:"pl",content:X,contentTab:_,setContentTab:K}),l.createElement(Q,{edges:a.allDataset.edges,value:"bs",content:X,contentTab:_,setContentTab:K}),l.createElement(Q,{edges:a.allDataset.edges,value:"revenue",content:X,contentTab:_,setContentTab:K}),l.createElement(Q,{edges:a.allDataset.edges,value:"expense",content:X,contentTab:_,setContentTab:K}),l.createElement(Q,{edges:a.allDataset.edges,value:"attd",content:X,contentTab:_,setContentTab:K}))),h?l.createElement(H,{title:"設定",isMobile:h,maxWidth:"md",value:"settings",mobileTab:B},l.createElement(Y.a,null),l.createElement(J.a,null)):null),l.createElement(P.a,null),l.createElement(g.a,{smUp:!0},l.createElement("nav",{className:F.bottomNavigation},l.createElement(b.a,{value:"main"===B?_:B,onChange:function(e,t){"article"===t||"figure"===t?(M("main"),K(t)):"summary"!==t&&"settings"!==t||M(t)},showLabels:!0},l.createElement(p.a,{label:"概要",value:"summary",icon:l.createElement(k.a,null)}),l.createElement(p.a,{label:"表",value:"figure",icon:l.createElement(N.a,null)}),l.createElement(p.a,{label:"解説",value:"article",icon:l.createElement(I.a,null)}),l.createElement(p.a,{label:"設定",value:"settings",icon:l.createElement(q.a,null)})))),l.createElement(g.a,{only:"xs"},l.createElement("div",{className:F.fab},l.createElement(d.a,{color:"secondary",onClick:$()},l.createElement(I.a,null)))),l.createElement(u.a,{open:C,onClose:$(!1),onOpen:$(!0)},l.createElement("div",{className:F.drawerInner},l.createElement("div",{className:F.drawerToolbar},l.createElement(E.a,{edge:"start",onClick:$(!1)},l.createElement(z.a,null))),l.createElement(v.a,null),l.createElement(L.a,null),l.createElement(S.a,null),l.createElement(g.a,{only:"xs"},l.createElement(v.a,null),l.createElement(Y.a,null),l.createElement(J.a,null)))))};var _="110541986"},ZPUd:function(e,t,a){"use strict";var n=a("TqRt");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var l=n(a("q1tI")),r=(0,n(a("8/g6")).default)(l.default.createElement("path",{d:"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"}),"Close");t.default=r}}]);
//# sourceMappingURL=component---src-pages-experimental-tsx-44a3e70a95667ee99bb4.js.map
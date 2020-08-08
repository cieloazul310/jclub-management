(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{"68YK":function(e,t,l){"use strict";var a=l("q1tI"),n=l("Ji2X"),r=l("R/WZ"),c=l("ZBNC"),o=l("ofer"),u=l("wx14"),i=l("Ff2n"),s=l("iuhU"),m=l("H2TA"),d=l("5AJ6"),v=Object(d.a)(a.createElement("path",{d:"M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"}),"Person");var p=a.forwardRef((function(e,t){var l=e.alt,n=e.children,r=e.classes,c=e.className,o=e.component,m=void 0===o?"div":o,d=e.imgProps,p=e.sizes,b=e.src,g=e.srcSet,f=e.variant,E=void 0===f?"circle":f,y=Object(i.a)(e,["alt","children","classes","className","component","imgProps","sizes","src","srcSet","variant"]),h=null,k=function(e){var t=e.src,l=e.srcSet,n=a.useState(!1),r=n[0],c=n[1];return a.useEffect((function(){if(t||l){c(!1);var e=!0,a=new Image;return a.src=t,a.srcSet=l,a.onload=function(){e&&c("loaded")},a.onerror=function(){e&&c("error")},function(){e=!1}}}),[t,l]),r}({src:b,srcSet:g}),w=b||g,x=w&&"error"!==k;return h=x?a.createElement("img",Object(u.a)({alt:l,src:b,srcSet:g,sizes:p,className:r.img},d)):null!=n?n:w&&l?l[0]:a.createElement(v,{className:r.fallback}),a.createElement(m,Object(u.a)({className:Object(s.a)(r.root,r.system,r[E],c,!x&&r.colorDefault),ref:t},y),h)})),b=Object(m.a)((function(e){return{root:{position:"relative",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,width:40,height:40,fontFamily:e.typography.fontFamily,fontSize:e.typography.pxToRem(20),lineHeight:1,borderRadius:"50%",overflow:"hidden",userSelect:"none"},colorDefault:{color:e.palette.background.default,backgroundColor:"light"===e.palette.type?e.palette.grey[400]:e.palette.grey[600]},circle:{},rounded:{borderRadius:e.shape.borderRadius},square:{borderRadius:0},img:{width:"100%",height:"100%",textAlign:"center",objectFit:"cover",color:"transparent",textIndent:1e4},fallback:{width:"75%",height:"75%"}}}),{name:"MuiAvatar"})(p),g=l("nCZa"),f=l("/EAt"),E=l("Uf6+"),y=l("sRsu"),h=l("3PeG"),k=l("PsDL"),w=l("1iKp"),x=l.n(w),_=l("mYdW"),O=l.n(_);var j=function(e){var t=e.edge,l=(e.mode,e.tab);return a.createElement(g.a,null,a.createElement(f.a,{size:"small"},"pl"===l?a.createElement(C,{edge:t}):"bs"===l?a.createElement(N,{edge:t}):"revenue"===l?a.createElement(R,{edge:t}):"expense"===l?a.createElement(S,{edge:t}):a.createElement(F,{edge:t})))};function C(e){var t,l=e.edge.node,n=A(!1),r=n[0],c=n[1];return a.createElement(E.a,null,a.createElement(L,{label:"営業収入",value:a.createElement("strong",null,l.revenue)}),a.createElement(L,{label:"営業費用",value:l.expense}),a.createElement(L,{label:"営業利益",value:l.op_profit}),a.createElement(L,{label:"当期純利益",value:l.profit,open:r,toggleOpen:c,selected:!0}),r?a.createElement(a.Fragment,null,a.createElement(L,{label:"営業外収入",value:l.no_rev,inset:!0}),a.createElement(L,{label:"営業外費用",value:l.no_exp,inset:!0}),a.createElement(L,{label:"経常利益",value:l.ordinary_profit,inset:!0,selected:!0}),a.createElement(L,{label:"特別利益",value:l.sp_rev,inset:!0}),a.createElement(L,{label:"特別損失",value:l.sp_exp,inset:!0}),a.createElement(L,{label:"法人税および住民税等",value:l.tax,inset:!0})):null,(null!==(t=l.year)&&void 0!==t?t:0)>2017?a.createElement(L,{label:"関連する法人の営業収益",value:l.related_revenue||"-"}):null)}function N(e){var t=e.edge.node,l=A(!1),n=l[0],r=l[1],c=A(!1),o=c[0],u=c[1],i=A(!1),s=i[0],m=i[1];return a.createElement(E.a,null,a.createElement(L,{label:"資産の部 (総資産)",value:t.assets,open:n,toggleOpen:r}),n?a.createElement(a.Fragment,null,a.createElement(L,{label:"流動資産",value:t.curr_assets,inset:!0}),a.createElement(L,{label:"固定資産等",value:t.fixed_assets,inset:!0})):null,a.createElement(L,{label:"負債の部 (総負債)",value:t.assets,open:o,toggleOpen:u}),o?a.createElement(a.Fragment,null,a.createElement(L,{label:"流動負債",value:t.curr_liabilities,inset:!0}),a.createElement(L,{label:"固定負債",value:t.fixed_liabilities,inset:!0})):null,a.createElement(L,{label:"資本の部 (純資産)",value:a.createElement("strong",null,t.net_worth),selected:!0,open:s,toggleOpen:m}),a.createElement(L,{label:"資本金",value:t.capital_stock,inset:!0}),s?a.createElement(a.Fragment,null,a.createElement(L,{label:"資本剰余金",value:t.capital_surplus,inset:!0}),a.createElement(L,{label:"利益剰余金",value:t.retained_earnings,inset:!0})):null)}function R(e){var t,l,n=e.edge.node;return a.createElement(E.a,null,a.createElement(L,{label:"営業収入",value:a.createElement("strong",null,n.revenue),selected:!0}),a.createElement(L,{label:"スポンサー収入",value:n.sponsor}),a.createElement(L,{label:"入場料収入",value:n.ticket}),a.createElement(L,{label:"Jリーグ配分金",value:n.broadcast}),(null!==(t=n.year)&&void 0!==t?t:0)>2010?a.createElement(L,{label:"アカデミー関連収入",value:n.academy_rev}):null,(null!==(l=n.year)&&void 0!==l?l:0)>2015?a.createElement(L,{label:"物販収入",value:n.goods_rev}):null,a.createElement(L,{label:"その他収入",value:n.other_revs}))}function S(e){var t,l,n,r,c,o=e.edge.node;return a.createElement(E.a,null,a.createElement(L,{label:"営業費用",value:a.createElement("strong",null,o.expense),selected:!0}),a.createElement(L,{label:"チーム人件費",value:a.createElement("strong",null,o.salary)}),(null!==(t=o.year)&&void 0!==t?t:0)<2011?a.createElement(L,{label:"事業費(チーム人件費を除く)",value:o.manage_exp}):null,(null!==(l=o.year)&&void 0!==l?l:0)>2010?a.createElement(a.Fragment,null,a.createElement(L,{label:"試合関連経費",value:o.game_exp}),a.createElement(L,{label:"トップチーム運営経費",value:o.team_exp}),a.createElement(L,{label:"アカデミー運営経費",value:o.academy_exp}),a.createElement(L,{label:"女子チーム運営経費",value:o.women_exp})):null,(null!==(n=o.year)&&void 0!==n?n:0)>2015?a.createElement(L,{label:"物販関連経費",value:o.goods_rev}):null,a.createElement(L,{label:(null!==(r=o.year)&&void 0!==r?r:0)<2011?"一般管理費":(null!==(c=o.year)&&void 0!==c?c:0)<2016?"販売費および一般管理費(物販含む)":"販売費および一般管理費",value:o.sga}))}function F(e){var t,l,n,r=e.edge.node,c=A(!1),o=c[0],u=c[1],i=A(!1),s=i[0],m=i[1];return a.createElement(E.a,null,a.createElement(L,{label:"入場料収入",value:a.createElement("strong",null,null!==(t=r.ticket)&&void 0!==t?t:"-"),selected:!0}),a.createElement(L,{label:"リーグ戦平均入場者数",value:Math.round((null!==(l=r.league_attd)&&void 0!==l?l:1)/(null!==(n=r.league_games)&&void 0!==n?n:1))}),a.createElement(L,{label:"年間ホームゲーム数",value:r.all_games,open:o,toggleOpen:u}),o?a.createElement(a.Fragment,null,a.createElement(L,{label:"リーグ戦",value:r.league_games,inset:!0}),a.createElement(L,{label:"リーグカップ",value:r.leaguecup_games||"-",inset:!0}),a.createElement(L,{label:"ACL",value:r.acl_games||"-",inset:!0}),a.createElement(L,{label:"プレーオフ",value:r.po_games||"-",inset:!0}),a.createElement(L,{label:"U-23",value:r.second_games||"-",inset:!0})):null,a.createElement(L,{label:"年間総入場者数数",value:r.all_attd,open:s,toggleOpen:m}),s?a.createElement(a.Fragment,null,a.createElement(L,{label:"リーグ戦",value:r.league_attd,inset:!0}),a.createElement(L,{label:"リーグカップ",value:r.leaguecup_attd||"-",inset:!0}),a.createElement(L,{label:"ACL",value:r.acl_attd||"-",inset:!0}),a.createElement(L,{label:"プレーオフ",value:r.po_attd||"-",inset:!0}),a.createElement(L,{label:"U-23",value:r.second_attd||"-",inset:!0})):null,a.createElement(L,{label:"客単価",value:r.ticket&&r.all_attd?Math.round(1e6*r.ticket/r.all_attd):"-"}))}var z=Object(r.a)((function(e){return Object(c.a)({root:{background:function(t){return t.selected?"dark"===e.palette.type?e.palette.background.paper:e.palette.grey[200]:void 0}},label:{paddingLeft:function(t){return t.inset?e.spacing(5):void 0}}})}));function L(e){var t=e.label,l=e.value,n=e.open,r=e.toggleOpen,c=e.inset,o=void 0!==c&&c,u=e.selected,i=z({inset:o,selected:void 0!==u&&u});return a.createElement(y.a,{className:i.root},a.createElement(h.a,{padding:"checkbox"},"boolean"==typeof n&&"function"==typeof r?a.createElement(k.a,{"aria-label":"expand row",size:"small",onClick:r},n?a.createElement(O.a,null):a.createElement(x.a,null)):null),a.createElement(h.a,{className:i.label,component:"th",scope:"row"},t),a.createElement(h.a,{align:"right"},null!=l?l:"-"))}function A(e){var t=a.useState(e),l=t[0],n=t[1];return[l,function(){n(!l)}]}var I=Object(r.a)((function(e){return Object(c.a)({root:{display:"flex",flexDirection:"row",padding:e.spacing(2),borderBottom:"1px solid "+e.palette.divider},avatarWrapper:{display:"flex",flexDirection:"column",alignItems:"center",padding:e.spacing(1)},content:{flexGrow:1,display:"flex",flexDirection:"column"},label:{padding:e.spacing(1,2)}})}));var J=function(e){var t=e.edge,l=e.mode,n=e.tab,r=e.index,c=I(),u=t.node;return a.createElement("div",{className:c.root},a.createElement("div",{className:c.avatarWrapper},a.createElement(b,null,u.category),a.createElement(o.a,{variant:"caption"},u.rank,"位")),a.createElement("div",{className:c.content},a.createElement("div",{className:c.label},a.createElement(o.a,{component:"h3"},a.createElement("strong",null,"club"===l?u.year+"年":r+1+". "+u.name))),a.createElement("div",null,a.createElement(j,{edge:t,mode:l,tab:n}))))},D=l("Z+mu"),q=Object(r.a)((function(e){return Object(c.a)({root:{flexGrow:1}})}));t.a=function(e){var t=e.edges,l=e.mode,r=e.tab,c=(e.next,e.previous,q()),o=Object(D.a)(t,l);return a.createElement("div",{className:c.root},a.createElement(n.a,{maxWidth:"sm",disableGutters:!0},o.map((function(e,t){var n;return a.createElement(J,{key:null!==(n=e.node.id)&&void 0!==n?n:t,edge:e,mode:l,tab:r,index:t})}))))}},GHCi:function(e,t,l){"use strict";var a=l("wx14"),n=l("Ff2n"),r=l("q1tI"),c=l("iuhU"),o=l("H2TA"),u=l("VD++"),i=r.forwardRef((function(e,t){var l=e.classes,o=e.className,i=e.icon,s=e.label,m=e.onChange,d=e.onClick,v=e.selected,p=e.showLabel,b=e.value,g=Object(n.a)(e,["classes","className","icon","label","onChange","onClick","selected","showLabel","value"]);return r.createElement(u.a,Object(a.a)({ref:t,className:Object(c.a)(l.root,o,v?l.selected:!p&&l.iconOnly),focusRipple:!0,onClick:function(e){m&&m(e,b),d&&d(e)}},g),r.createElement("span",{className:l.wrapper},i,r.createElement("span",{className:Object(c.a)(l.label,v?l.selected:!p&&l.iconOnly)},s)))}));t.a=Object(o.a)((function(e){return{root:{transition:e.transitions.create(["color","padding-top"],{duration:e.transitions.duration.short}),padding:"6px 12px 8px",minWidth:80,maxWidth:168,color:e.palette.text.secondary,flex:"1","&$iconOnly":{paddingTop:16},"&$selected":{paddingTop:6,color:e.palette.primary.main}},selected:{},iconOnly:{},wrapper:{display:"inline-flex",alignItems:"center",justifyContent:"center",width:"100%",flexDirection:"column"},label:{fontFamily:e.typography.fontFamily,fontSize:e.typography.pxToRem(12),opacity:1,transition:"font-size 0.2s, opacity 0.2s",transitionDelay:"0.1s","&$iconOnly":{opacity:0,transitionDelay:"0s"},"&$selected":{fontSize:e.typography.pxToRem(14)}}}}),{name:"MuiBottomNavigationAction"})(i)},HgyP:function(e,t,l){"use strict";var a=l("wx14"),n=l("Ff2n"),r=l("q1tI"),c=(l("TOwV"),l("iuhU")),o=l("H2TA"),u=r.forwardRef((function(e,t){var l=e.children,o=e.classes,u=e.className,i=e.component,s=void 0===i?"div":i,m=e.onChange,d=e.showLabels,v=void 0!==d&&d,p=e.value,b=Object(n.a)(e,["children","classes","className","component","onChange","showLabels","value"]);return r.createElement(s,Object(a.a)({className:Object(c.a)(o.root,u),ref:t},b),r.Children.map(l,(function(e,t){if(!r.isValidElement(e))return null;var l=void 0===e.props.value?t:e.props.value;return r.cloneElement(e,{selected:l===p,showLabel:void 0!==e.props.showLabel?e.props.showLabel:v,value:l,onChange:m})})))}));t.a=Object(o.a)((function(e){return{root:{display:"flex",justifyContent:"center",height:56,backgroundColor:e.palette.background.paper}}}),{name:"MuiBottomNavigation"})(u)},QYLo:function(e,t,l){"use strict";var a=l("q1tI"),n=l("ofer"),r=l("hlie"),c=l("wcqa");t.a=function(e){var t=e.clubsYaml;return a.createElement(c.a,null,a.createElement(n.a,{variant:"h6",component:"h2",gutterBottom:!0},null==t?void 0:t.name),a.createElement(n.a,{variant:"body1",component:"ul"},a.createElement("li",null,"正式名称: ",null==t?void 0:t.fullname),a.createElement("li",null,"法人名: ",null==t?void 0:t.company),a.createElement("li",null,"所属カテゴリ: ",null==t?void 0:t.category),a.createElement("li",null,"ホームタウン: ",null==t?void 0:t.hometown),a.createElement("li",null,"活動区域: ",null==t?void 0:t.area),(null==t?void 0:t.settlement)?a.createElement("li",null,"経営情報:"," ",a.createElement(r.a,{href:t.settlement,color:"secondary",target:"_blank",rel:"noopener noreferrer"},t.settlement)):null,(null==t?void 0:t.relatedCompanies)?a.createElement("li",null,"関連する法人: ",t.relatedCompanies.join(", ")):null))}},"Z+mu":function(e,t,l){"use strict";l.d(t,"a",(function(){return c}));var a=l("KQm4"),n=l("q1tI"),r=l("Hmgg");function c(e,t){return function(e,t){var l=Object(r.b)(),c=l.sortKey,u=l.sortAsc;return n.useMemo((function(){return"club"===t?e:Object(a.a)(e).sort((function(e,t){return(u?1:-1)*(o(e,c)-o(t,c))}))}),[t,e,c,u])}(function(e,t){var l=Object(r.b)().filterCategories;return n.useMemo((function(){return"club"===t?e:e.filter((function(e){return l.includes(function(e){var t=e.node.category;return"J1"!==t&&"J2"!==t&&"J3"!==t?"others":t}(e))}))}),[e,t,l])}(e,t),t)}function o(e,t){var l,a,n,r,c,o=e.node;return"rank"===t?function(e){var t;return("J2"===e.category?100:"J3"===e.category?200:"JFL"===e.category?300:"地域"===e.category?400:0)+(null!==(t=e.rank)&&void 0!==t?t:0)}(o):"unit_price"===t?(null!==(l=o.ticket)&&void 0!==l?l:1)/(null!==(a=o.all_attd)&&void 0!==a?a:1):"average_attd"===t?(null!==(n=o.league_attd)&&void 0!==n?n:1)/(null!==(r=o.league_games)&&void 0!==r?r:1):null!==(c=o[t])&&void 0!==c?c:1}},nzq1:function(e,t,l){"use strict";l.d(t,"e",(function(){return c})),l.d(t,"c",(function(){return o})),l.d(t,"f",(function(){return u})),l.d(t,"d",(function(){return i})),l.d(t,"a",(function(){return s})),l.d(t,"b",(function(){return m.a}));var a=l("q1tI"),n=l("Wbzz"),r=l("XC6H");function c(){var e=Object(n.useStaticQuery)("3289793699").markdownRemark;return e?a.createElement(r.a,{markdownRemark:e}):null}function o(){var e=Object(n.useStaticQuery)("3688365194").markdownRemark;return e?a.createElement(r.a,{markdownRemark:e}):null}function u(){var e=Object(n.useStaticQuery)("1743204158").markdownRemark;return e?a.createElement(r.a,{markdownRemark:e}):null}function i(){var e=Object(n.useStaticQuery)("2984817460").markdownRemark;return e?a.createElement(r.a,{markdownRemark:e}):null}function s(){var e=Object(n.useStaticQuery)("4020834276").markdownRemark;return e?a.createElement(r.a,{markdownRemark:e}):null}var m=l("yiPl")}}]);
//# sourceMappingURL=f1e0adbcd3f0d388d6e391bdfd6d0f4e811859fe-15535717fc64c284ddcb.js.map
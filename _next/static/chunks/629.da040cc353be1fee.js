"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[629],{629:function(t,e,s){s.r(e);var a=s(7320),i=s(1720),n=s(425),c=s(3071),o=s.n(c);e.default=t=>{let{mapping:e}=t,[s,c]=(0,i.useState)(!0),{theme:r,resolvedTheme:m}=(0,n.F)(),u=""===o().comment.giscusConfig.themeURL?"dark"===r||"dark"===m?o().comment.giscusConfig.darkTheme:o().comment.giscusConfig.theme:o().comment.giscusConfig.themeURL,d="comments-container",g=(0,i.useCallback)(()=>{c(!1);let t=document.createElement("script");t.src="https://giscus.app/client.js",t.setAttribute("data-repo",o().comment.giscusConfig.repo),t.setAttribute("data-repo-id",o().comment.giscusConfig.repositoryId),t.setAttribute("data-category",o().comment.giscusConfig.category),t.setAttribute("data-category-id",o().comment.giscusConfig.categoryId),t.setAttribute("data-mapping",e),t.setAttribute("data-reactions-enabled",o().comment.giscusConfig.reactions),t.setAttribute("data-emit-metadata",o().comment.giscusConfig.metadata),t.setAttribute("data-theme",u),t.setAttribute("crossorigin","anonymous"),t.async=!0;let s=document.getElementById(d);return s&&s.appendChild(t),()=>{let t=document.getElementById(d);t&&(t.innerHTML="")}},[u,e]);return(0,i.useEffect)(()=>{let t=document.querySelector("iframe.giscus-frame");t&&g()},[g]),(0,a.BX)("div",{className:"pt-6 pb-6 text-center text-gray-700 dark:text-gray-300",children:[s&&(0,a.tZ)("button",{onClick:g,children:"Load Comments"}),(0,a.tZ)("div",{className:"giscus",id:d})]})}}}]);
function i(e){return e==="dark"||e==="light"}function l(e){return e==="dark"?"light":"dark"}function r(){return window.matchMedia==null?"light":window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}function o(){let e=window.localStorage.getItem("theme");return e==null?null:i(e)?e:null}var n=window.document.getElementById("theme-button");n?.addEventListener("click",()=>{let e=o()??r(),d=l(e);window.document.documentElement.classList.toggle("dark"),window.localStorage.setItem("theme",d)});var t=o();if(t!=null){let e=r();(t==="dark"&&e==="light"||t==="light"&&e==="dark")&&window.document.documentElement.classList.toggle("dark")}

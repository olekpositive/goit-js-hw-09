!function(){var t,e=document.querySelector("button[data-start]"),o=document.querySelector("button[data-stop]"),r=document.querySelector("body");e.addEventListener("click",(function(){e.setAttribute("disabled",!0),o.removeAttribute("disabled"),t=setInterval((function(){r.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16))}),1e3)})),o.addEventListener("click",(function(){e.removeAttribute("disabled"),o.setAttribute("disabled",!0),clearInterval(t)}))}();
//# sourceMappingURL=01-color-switcher.e792b605.js.map

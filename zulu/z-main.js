(function(w, d) {
    zaraz.debug = (fI = "") => {
        document.cookie = `zarazDebug=${fI}; path=/`;
        location.reload()
    };
    window.zaraz._al = function(eK, eL, eM) {
        w.zaraz.listeners.push({
            item: eK,
            type: eL,
            callback: eM
        });
        eK.addEventListener(eL, eM)
    };
    zaraz.preview = (dM = "") => {
        document.cookie = `zarazPreview=${dM}; path=/`;
        location.reload()
    };
    zaraz.i = function(fL) {
        const fM = d.createElement("div");
        fM.innerHTML = unescape(fL);
        const fN = fM.querySelectorAll("script");
        for (let fO = 0; fO < fN.length; fO++) {
            const fP = d.createElement("script");
            fN[fO].innerHTML && (fP.innerHTML = fN[fO].innerHTML);
            for (const fQ of fN[fO].attributes) fP.setAttribute(fQ.name, fQ.value);
            d.head.appendChild(fP);
            fN[fO].remove()
        }
        d.body.appendChild(fM)
    };
    zaraz.f = async function(eN, eO) {
        const eP = {
            credentials: "include",
            keepalive: !0,
            mode: "no-cors"
        };
        if (eO) {
            eP.method = "POST";
            eP.body = new URLSearchParams(eO);
            eP.headers = {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }
        return await fetch(eN, eP)
    };
    zaraz.ecommerce = async (eQ, eR, eS) => {
        void 0 !== eR && "object" == typeof eR || (eR = {});
        eR.__zarazEcommerce = !0;
        return await zaraz.track(eQ, eR, eS)
    };
    ! function(eT, eU, eV, eW, eX, eY) {
        function eZ(fa, fb) {
            eY ? eW(fa, fb || 32) : eX.push(fa, fb)
        }

        function e$(fc, fd, fe, ff) {
            return fd && eU.getElementById(fd) || (ff = eU.createElement(fc || "SCRIPT"), fd && (ff.id = fd), fe && (ff.onload = fe), eU.head.appendChild(ff)), ff || {}
        }
        eY = /p/.test(eU.readyState), eT.addEventListener("on" + eV in eT ? eV : "load", (function() {
            for (eY = 1; eX[0];) eZ(eX.shift(), eX.shift())
        })), eZ._ = e$, eT.defer = eZ, eT.deferscript = function(fg, fh, fi, fj) {
            eZ((function() {
                e$("", fh, fj).src = fg
            }), fi)
        }
    }(this, d, "pageshow", setTimeout, []);
    defer((function() {
        for (; zaraz.deferred.length;) zaraz.deferred.pop()();
        Object.defineProperty(zaraz.deferred, "push", {
            configurable: !0,
            enumerable: !1,
            writable: !0,
            value: function(...fk) {
                let fl = Array.prototype.push.apply(this, fk);
                for (; zaraz.deferred.length;) zaraz.deferred.pop()();
                return fl
            }
        })
    }), 5500);
    addEventListener("visibilitychange", (function() {
        for (; zaraz.deferred.length;) zaraz.deferred.pop()()
    }));
    window.zaraz._p = async bn => new Promise((bo => {
        if (bn) {
            bn.e && bn.e.forEach((bp => {
                try {
                    new Function(bp)()
                } catch (bq) {
                    console.error(`Error executing script: ${bp}\n`, bq)
                }
            }));
            Promise.allSettled((bn.f || []).map((br => fetch(br[0], br[1]))))
        }
        bo()
    }));
    zaraz.pageVariables = {};
    zaraz.__zcl = zaraz.__zcl || {};
    zaraz.track = async function(fm, fn, fo) {
        return new Promise(((fp, fq) => {
            const fr = {
                name: fm,
                data: {}
            };
            for (const fs of [localStorage, sessionStorage]) Object.keys(fs || {}).filter((fu => fu.startsWith("_zaraz_"))).forEach((ft => {
                try {
                    fr.data[ft.slice(7)] = JSON.parse(fs.getItem(ft))
                } catch {
                    fr.data[ft.slice(7)] = fs.getItem(ft)
                }
            }));
            Object.keys(zaraz.pageVariables).forEach((fv => fr.data[fv] = JSON.parse(zaraz.pageVariables[fv])));
            Object.keys(zaraz.__zcl).forEach((fw => fr.data[`__zcl_${fw}`] = zaraz.__zcl[fw]));
            fr.data.__zarazMCListeners = zaraz.__zarazMCListeners;
            //
            fr.data = { ...fr.data,
                ...fn
            };
            fr.zarazData = zarazData;
            fetch("/zulu/z", {
                credentials: "include",
                keepalive: !0,
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(fr)
            }).catch((() => {
                //
                return fetch("/zulu/z", {
                    credentials: "include",
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(fr)
                })
            })).then((function(fy) {
                zarazData._let = (new Date).getTime();
                fy.ok || fq();
                return 204 !== fy.status && fy.json()
            })).then((async fx => {
                await zaraz._p(fx);
                "function" == typeof fo && fo()
            })).finally((() => fp()))
        }))
    };
    zaraz.set = function(fz, fA, fB) {
        try {
            fA = JSON.stringify(fA)
        } catch (fC) {
            return
        }
        prefixedKey = "_zaraz_" + fz;
        sessionStorage && sessionStorage.removeItem(prefixedKey);
        localStorage && localStorage.removeItem(prefixedKey);
        delete zaraz.pageVariables[fz];
        if (void 0 !== fA) {
            fB && "session" == fB.scope ? sessionStorage && sessionStorage.setItem(prefixedKey, fA) : fB && "page" == fB.scope ? zaraz.pageVariables[fz] = fA : localStorage && localStorage.setItem(prefixedKey, fA);
            zaraz.__watchVar = {
                key: fz,
                value: fA
            }
        }
    };
    for (const {
            m: fD,
            a: fE
        } of zarazData.q.filter((({
            m: fF
        }) => ["debug", "set"].includes(fF)))) zaraz[fD](...fE);
    for (const {
            m: fG,
            a: fH
        } of zaraz.q) zaraz[fG](...fH);
    delete zaraz.q;
    delete zarazData.q;
    zaraz.fulfilTrigger = function(ej, ek, el, em) {
        zaraz.__zarazTriggerMap || (zaraz.__zarazTriggerMap = {});
        zaraz.__zarazTriggerMap[ej] || (zaraz.__zarazTriggerMap[ej] = "");
        zaraz.__zarazTriggerMap[ej] += "*" + ek + "*";
        zaraz.track("__zarazEmpty", { ...el,
            __zarazClientTriggers: zaraz.__zarazTriggerMap[ej]
        }, em)
    };
    zaraz._c = dI => {
        const {
            event: dJ,
            ...dK
        } = dI;
        zaraz.track(dJ, { ...dK,
            __zarazClientEvent: !0
        })
    };
    zaraz._syncedAttributes = ["altKey", "clientX", "clientY", "pageX", "pageY", "button"];
    zaraz.__zcl.track = !0;
    d.addEventListener("visibilitychange", (dy => {
        zaraz._c({
            event: "visibilityChange",
            visibilityChange: [{
                state: d.visibilityState,
                timestamp: (new Date).getTime()
            }]
        }, 1)
    }));
    zaraz.__zcl.visibilityChange = !0;
    zaraz.__zarazMCListeners = {
        "google-analytics_v4_bbe7": ["visibilityChange"]
    };
    zaraz._p({
        "e": ["(function(w,d){w.zarazData.executed.push(\"d1a08b8a-b49a-4589-a8bb-9877ce491aaf\");w.zarazData.executed.push(\"Pageview\");})(window,document)", "const d = document.createElement('div');d.innerHTML = ``;document.body.appendChild(d);", "\nloadjs.ready('app', function(){\n  setTimeout(function(){\n       window.zaraz.track(\"page_loaded\")\n       loadjs.done(\"page_loaded\")\n  }, 3000);\n\n});\n"],
        "f": [
            ["https://stats.g.doubleclick.net/g/collect?t=dc&aip=1&_r=3&v=1&_v=j86&tid=G-7SH41H6HMK&cid=12ed5aee-340b-4483-a713-96bc09f58c96&_u=KGDAAEADQAAAAC%7E&z=425475684", {}]
        ]
    })
})(window, document);
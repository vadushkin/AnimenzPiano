!function (e, t) {
    "object" == typeof exports && "undefined" != typeof module ? t(exports) : "function" == typeof define && define.amd ? define(["exports"], t) : t((e = "undefined" != typeof globalThis ? globalThis : e || self).__inside__ || (self.__inside__ = {}))
}(this, (function (e) {
    "use strict";
    var t = function () {
        return (t = Object.assign || function (e) {
            for (var t, n = 1, o = arguments.length; n < o; n++) for (var r in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
            return e
        }).apply(this, arguments)
    };
    var n = /#(?:[0-9a-fA-F]{3}){1,2}/, o = /rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)/, r = "__inside__",
        a = '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif', i = {
            accent_color: "#2a2b33",
            foreground_color: "#363636",
            border_color: "#e0e0e0",
            background: "#f3f6f7",
            sidebar_background: "#2a2b33",
            card_background: "#fff",
            content_width: "660px",
            "font.base": a,
            "font.logo": a,
            "font.menu": a,
            "font.heading": a,
            "font.label": a,
            "font.code": a,
            "font.print": a,
            highlight: ["#ffffff", "#e0e0e0", "#f3f6f7", "#95a5b3", "#363636", "#262b2f", "#000000", "#000000", "#5d6c7b", "#40464a", "#2980b9", "#be516e", "#237dac", "#944770", "#239371", "#edf0f3"]
        }, c = "undefined" != typeof document;
    if (c) {
        document.addEventListener("inside:theme", (function (e) {
            document.dispatchEvent(new CustomEvent("inside", {detail: {type: "theme", data: e.detail}}))
        })), document.addEventListener("inside", (function (e) {
            if (!c || "theme" !== e.detail.type) return !1;
            d(e.detail.data)
        }));
        var f = u(), l = function () {
            localStorage.removeItem(r), d(t(t({}, window[r].theme.default), {name: "default"}), !0)
        };
        f && f.hash === (window[r] || {}).hash ? d(f.theme) : l()
    }

    function u() {
        var e = localStorage.getItem(r);
        if (e) try {
            return JSON.parse(e)
        } catch (e) {
        }
    }

    function d(e, t) {
        var n, o, a = document.querySelector('style[is="theme"]'),
            i = document.querySelector('meta[name="theme-color"]'), c = window[r] || {};
        a || ((a = document.createElement("style")).setAttribute("is", "theme"), document.body.appendChild(a));
        var f = "dark" === (e.name || (null === (o = null === (n = u()) || void 0 === n ? void 0 : n.theme) || void 0 === o ? void 0 : o.name)) ? "dark" : "default";
        c.theme[f] = Object.assign({}, c.theme.default, c.theme[f], e), c.color = [_(c.theme[f].sidebar_background).color || c.theme[f].accent_color].concat(_(c.theme[f].background).color || []), t && a.innerHTML || (a.innerHTML = g(c.theme[f]), i && (i.content = c.color[c.color.length - 1])), localStorage.setItem(r, JSON.stringify({
            theme: c.theme[f],
            hash: c.hash
        }))
    }

    function g(e) {
        if (!e) return "";
        var r = function (e, t) {
                var n = {}, o = e.accent_color, r = e.foreground_color, a = e.border_color, i = e.background,
                    c = e.sidebar_background, f = e.card_background, l = e.content_width, u = e.highlight,
                    d = function (e, t) {
                        var n = {};
                        for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && t.indexOf(o) < 0 && (n[o] = e[o]);
                        if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
                            var r = 0;
                            for (o = Object.getOwnPropertySymbols(e); r < o.length; r++) t.indexOf(o[r]) < 0 && Object.prototype.propertyIsEnumerable.call(e, o[r]) && (n[o[r]] = e[o[r]])
                        }
                        return n
                    }(e, ["accent_color", "foreground_color", "border_color", "background", "sidebar_background", "card_background", "content_width", "highlight"]);
                n.accent_color = o ? s(o).hex : t.accent_color, n.foreground_color = r ? s(r).hex : t.foreground_color, n.border_color = a ? s(a).hex : t.border_color, n.background = i ? h(i) : t.background, n.sidebar_background = c ? h(c) : n.accent_color || t.sidebar_background, n.card_background = f ? h(f) : t.card_background;
                var g = d["font.base"] ? p(d["font.base"]) : t["font.base"].split(",");
                n["font.base"] = String(g), n["font.logo"] = d["font.logo"] ? p(d["font.logo"], g).join(",") : t["font.logo"], n["font.menu"] = d["font.menu"] ? p(d["font.menu"], g).join(",") : t["font.menu"], n["font.heading"] = d["font.heading"] ? p(d["font.heading"], g).join(",") : t["font.heading"], n["font.label"] = d["font.label"] ? p(d["font.label"], g).join(",") : t["font.label"], n["font.code"] = d["font.code"] ? p(d["font.code"]).join(",") : t["font.code"], n["font.print"] = d["font.print"] ? p(d["font.print"]).join(",") : t["font.print"];
                var b = function (e) {
                    if (!e) return;
                    if ("number" == typeof e) return {value: e, unit: "px"};
                    var t = e.match(/^(\d+)(%|rem|px)$/);
                    if (t) return {value: +t[1], unit: t[2]}
                }(l);
                n.content_width = b ? b.value + b.unit : t.content_width, Array.isArray(u) ? (n.highlight = u.map((function (e) {
                    return s(e).hex
                })).filter((function (e) {
                    return e
                })), n.highlight.length < 16 && (n.highlight = t.highlight)) : n.highlight = t.highlight;
                return n
            }(e, i), a = (r.card_background.match(n) || r.card_background.match(o) || [])[0] || r.foreground_color,
            c = s(r.accent_color);
        return "html{" + function (e, t) {
            void 0 === e && (e = {});
            void 0 === t && (t = "var");
            return n(e);

            function n(e, o, r) {
                void 0 === o && (o = []);
                var a = function (a) {
                    var i = e[a];
                    if (Array.isArray(i)) i.forEach((function (e, t) {
                        var r, i = t.toString(16);
                        return i.length < 2 && (i = "0" + i), n(((r = {})[i] = e, r), o, a)
                    })); else if ("object" == typeof i) n(i, o, a); else {
                        var c = (r ? r + "_" : "") + a;
                        o.push(["--" + t + "-" + c.replace(/[\._]/g, "-"), i, c])
                    }
                };
                for (var i in e) a(i);
                return o
            }
        }(t(t({}, r), {
            card_color: a,
            accent_color_005: "rgba(" + c.r + "," + c.g + "," + c.b + ",.05)",
            accent_color_01: "rgba(" + c.r + "," + c.g + "," + c.b + ",.1)",
            accent_color_02: "rgba(" + c.r + "," + c.g + "," + c.b + ",.2)",
            accent_color_04: "rgba(" + c.r + "," + c.g + "," + c.b + ",.4)",
            accent_color_08: "rgba(" + c.r + "," + c.g + "," + c.b + ",.8)",
            accent_color: c.hex
        }), "inside").map((function (e) {
            return e.slice(0, 2).join(":")
        })).join(";") + "}"
    }

    function h(e) {
        var t = /(^data:image)|(^[^\(^'^"]*\.(jpg|png|gif|svg))/;
        return e.split(/\s+/).map((function (e) {
            return e.match(t) ? "url(" + e + ")" : e
        })).join(" ")
    }

    function s(e, r) {
        if (e = (e || "").trim(), n.test(e)) return t({hex: e}, m(e));
        if (o.test(e)) {
            var a = e.match(o).slice(1, 4).map((function (e) {
                return +e
            })).filter((function (e) {
                return e < 256
            }));
            if (3 === a.length) return {hex: b.apply(null, a), r: a[0], g: a[1], b: a[2]}
        }
        return r ? t({hex: r}, m(r)) : {}
    }

    function b(e, t, n) {
        return "#" + ((1 << 24) + (e << 16) + (t << 8) + n).toString(16).slice(1)
    }

    function m(e) {
        e = e.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (function (e, t, n, o) {
            return t + t + n + n + o + o
        }));
        var t = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);
        return t ? {r: parseInt(t[1], 16), g: parseInt(t[2], 16), b: parseInt(t[3], 16)} : null
    }

    function p(e, t) {
        void 0 === t && (t = []);
        var n = e ? e.split(",").map((function (e) {
            return e.trim()
        })).filter((function (e) {
            return e
        })) : [];
        return Array.from(new Set(n.concat(t)))
    }

    function _(e) {
        if (!e) return {};
        var t = e.split(/\s+/);
        if (n.test(t[0])) return {color: t[0], image: t.slice(1).join(" ")};
        var o = t.length - 1;
        return t[o] && n.test(t[o]) ? {color: t.pop(), image: t.join(" ")} : {image: e}
    }

    e.css = g, Object.defineProperty(e, "__esModule", {value: !0})
}));

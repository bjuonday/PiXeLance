// ==UserScript==
// @name         PixelBalance

// @version      1.0_256
// @description  A fork of PixelPast - free and open source mod for Tanki Online game
// @author       bjuonday

// @match        https://*.test-eu.tankionline.com/browser-public/index.html?*
// @match        https://tankionline.com/play*
// @match        https://tankionline.com/ru/
// @match        https://tankionline.com/en/

// @icon         https://raw.githubusercontent.com/bjuonday/PixelBalance/main/assets/icon.png

// @downloadURL  https://raw.githubusercontent.com/bjuonday/PixelBalance/main/PixelBalance.user.js
// @updateURL    https://raw.githubusercontent.com/bjuonday/PixelBalance/main/PixelBalance.meta.js

// @grant        GM.xmlHttpRequest
// @grant        GM.addStyle
// @grant        unsafeWindow

// @run-at       document-start

// @connect      githubusercontent.com

// ==/UserScript==

(() => {
    "use strict";

    function t(t) {
        const e = t.trim();
        if (!e) return new Headers;
        const r = e.split("\r\n").map((t => {
            let e = t.split(":");
            return [e[0].trim(), e[1].trim()]
        }));
        return new Headers(r)
    }
    class e {
        constructor(t, e) {
            var r;
            this.rawBody = t, this.init = e, this.body = (r = t, new ReadableStream({
                start(t) {
                    t.enqueue(r), t.close()
                }
            }));
            const {
                headers: n,
                statusCode: i,
                statusText: o,
                finalUrl: s,
                redirected: a
            } = e;
            this.headers = n, this.status = i, this.statusText = o, this.url = s, this.type = "basic", this.redirected = a, this._bodyUsed = !1
        }
        get bodyUsed() {
            return this._bodyUsed
        }
        get ok() {
            return this.status < 300
        }
        arrayBuffer() {
            if (this.bodyUsed) throw new TypeError("Failed to execute 'arrayBuffer' on 'Response': body stream already read");
            return this._bodyUsed = !0, this.rawBody.arrayBuffer()
        }
        blob() {
            if (this.bodyUsed) throw new TypeError("Failed to execute 'blob' on 'Response': body stream already read");
            return this._bodyUsed = !0, Promise.resolve(this.rawBody.slice(0, this.rawBody.size, this.rawBody.type))
        }
        clone() {
            if (this.bodyUsed) throw new TypeError("Failed to execute 'clone' on 'Response': body stream already read");
            return new e(this.rawBody, this.init)
        }
        formData() {
            if (this.bodyUsed) throw new TypeError("Failed to execute 'formData' on 'Response': body stream already read");
            return this._bodyUsed = !0, this.rawBody.text().then(r)
        }
        async json() {
            if (this.bodyUsed) throw new TypeError("Failed to execute 'json' on 'Response': body stream already read");
            return this._bodyUsed = !0, JSON.parse(await this.rawBody.text())
        }
        text() {
            if (this.bodyUsed) throw new TypeError("Failed to execute 'text' on 'Response': body stream already read");
            return this._bodyUsed = !0, this.rawBody.text()
        }
    }

    function r(t) {
        const e = new FormData;
        return t.trim().split("&").forEach((function(t) {
            if (t) {
                const r = t.split("="),
                    n = r.shift()?.replace(/\+/g, " "),
                    i = r.join("=").replace(/\+/g, " ");
                e.append(decodeURIComponent(n), decodeURIComponent(i))
            }
        })), e
    }
    async function n(r, n) {
        const i = new Request(r, n);
        let s;
        return n?.body && (s = await i.text()), await
        function(r, n, i) {
            return new Promise(((s, a) => {
                if (r.signal && r.signal.aborted) return a(new DOMException("Aborted", "AbortError"));
                GM.xmlHttpRequest({
                    url: r.url,
                    method: o(r.method.toUpperCase()),
                    headers: Object.fromEntries(new Headers(n?.headers).entries()),
                    data: i,
                    responseType: "blob",
                    onload(n) {
                        s(function(r, n) {
                            return new e(n.response, {
                                statusCode: n.status,
                                statusText: n.statusText,
                                headers: t(n.responseHeaders),
                                finalUrl: n.finalUrl,
                                redirected: n.finalUrl === r.url
                            })
                        }(r, n))
                    },
                    onabort() {
                        a(new DOMException("Aborted", "AbortError"))
                    },
                    ontimeout() {
                        a(new TypeError("Network request failed, timeout"))
                    },
                    onerror(t) {
                        a(new TypeError("Failed to fetch: " + t.finalUrl))
                    }
                })
            }))
        }(i, n, s)
    }
    const i = ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "TRACE", "OPTIONS", "CONNECT"];

    function o(t) {
        if (e = t, i.includes(e)) return t;
        var e;
        throw new Error(`unsupported http method ${t}`)
    }
    var s = null;
    try {
        s = new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 13, 2, 96, 0, 1, 127, 96, 4, 127, 127, 127, 127, 1, 127, 3, 7, 6, 0, 1, 1, 1, 1, 1, 6, 6, 1, 127, 1, 65, 0, 11, 7, 50, 6, 3, 109, 117, 108, 0, 1, 5, 100, 105, 118, 95, 115, 0, 2, 5, 100, 105, 118, 95, 117, 0, 3, 5, 114, 101, 109, 95, 115, 0, 4, 5, 114, 101, 109, 95, 117, 0, 5, 8, 103, 101, 116, 95, 104, 105, 103, 104, 0, 0, 10, 191, 1, 6, 4, 0, 35, 0, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 126, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 127, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 128, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 129, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 130, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11])), {}).exports
    } catch (t) {}

    function a(t, e, r) {
        this.low = 0 | t, this.high = 0 | e, this.unsigned = !!r
    }

    function u(t) {
        return !0 === (t && t.__isLong__)
    }

    function h(t) {
        var e = Math.clz32(t & -t);
        return t ? 31 - e : e
    }
    a.prototype.__isLong__, Object.defineProperty(a.prototype, "__isLong__", {
        value: !0
    }), a.isLong = u;
    var c = {},
        l = {};

    function f(t, e) {
        var r, n, i;
        return e ? (i = 0 <= (t >>>= 0) && t < 256) && (n = l[t]) ? n : (r = g(t, 0, !0), i && (l[t] = r), r) : (i = -128 <= (t |= 0) && t < 128) && (n = c[t]) ? n : (r = g(t, t < 0 ? -1 : 0, !1), i && (c[t] = r), r)
    }

    function d(t, e) {
        if (isNaN(t)) return e ? L : x;
        if (e) {
            if (t < 0) return L;
            if (t >= w) return T
        } else {
            if (t <= -b) return j;
            if (t + 1 >= b) return S
        }
        return t < 0 ? d(-t, e).neg() : g(t % m | 0, t / m | 0, e)
    }

    function g(t, e, r) {
        return new a(t, e, r)
    }
    a.fromInt = f, a.fromNumber = d, a.fromBits = g;
    var p = Math.pow;

    function y(t, e, r) {
        if (0 === t.length) throw Error("empty string");
        if ("number" == typeof e ? (r = e, e = !1) : e = !!e, "NaN" === t || "Infinity" === t || "+Infinity" === t || "-Infinity" === t) return e ? L : x;
        if ((r = r || 10) < 2 || 36 < r) throw RangeError("radix");
        var n;
        if ((n = t.indexOf("-")) > 0) throw Error("interior hyphen");
        if (0 === n) return y(t.substring(1), e, r).neg();
        for (var i = d(p(r, 8)), o = x, s = 0; s < t.length; s += 8) {
            var a = Math.min(8, t.length - s),
                u = parseInt(t.substring(s, s + a), r);
            if (a < 8) {
                var h = d(p(r, a));
                o = o.mul(h).add(d(u))
            } else o = (o = o.mul(i)).add(d(u))
        }
        return o.unsigned = e, o
    }

    function v(t, e) {
        return "number" == typeof t ? d(t, e) : "string" == typeof t ? y(t, e) : g(t.low, t.high, "boolean" == typeof e ? e : t.unsigned)
    }
    a.fromString = y, a.fromValue = v;
    var m = 4294967296,
        w = m * m,
        b = w / 2,
        E = f(1 << 24),
        x = f(0);
    a.ZERO = x;
    var L = f(0, !0);
    a.UZERO = L;
    var O = f(1);
    a.ONE = O;
    var _ = f(1, !0);
    a.UONE = _;
    var N = f(-1);
    a.NEG_ONE = N;
    var S = g(-1, 2147483647, !1);
    a.MAX_VALUE = S;
    var T = g(-1, -1, !0);
    a.MAX_UNSIGNED_VALUE = T;
    var j = g(0, -2147483648, !1);
    a.MIN_VALUE = j;
    var U = a.prototype;
    U.toInt = function() {
        return this.unsigned ? this.low >>> 0 : this.low
    }, U.toNumber = function() {
        return this.unsigned ? (this.high >>> 0) * m + (this.low >>> 0) : this.high * m + (this.low >>> 0)
    }, U.toString = function(t) {
        if ((t = t || 10) < 2 || 36 < t) throw RangeError("radix");
        if (this.isZero()) return "0";
        if (this.isNegative()) {
            if (this.eq(j)) {
                var e = d(t),
                    r = this.div(e),
                    n = r.mul(e).sub(this);
                return r.toString(t) + n.toInt().toString(t)
            }
            return "-" + this.neg().toString(t)
        }
        for (var i = d(p(t, 6), this.unsigned), o = this, s = "";;) {
            var a = o.div(i),
                u = (o.sub(a.mul(i)).toInt() >>> 0).toString(t);
            if ((o = a).isZero()) return u + s;
            for (; u.length < 6;) u = "0" + u;
            s = "" + u + s
        }
    }, U.getHighBits = function() {
        return this.high
    }, U.getHighBitsUnsigned = function() {
        return this.high >>> 0
    }, U.getLowBits = function() {
        return this.low
    }, U.getLowBitsUnsigned = function() {
        return this.low >>> 0
    }, U.getNumBitsAbs = function() {
        if (this.isNegative()) return this.eq(j) ? 64 : this.neg().getNumBitsAbs();
        for (var t = 0 != this.high ? this.high : this.low, e = 31; e > 0 && 0 == (t & 1 << e); e--);
        return 0 != this.high ? e + 33 : e + 1
    }, U.isZero = function() {
        return 0 === this.high && 0 === this.low
    }, U.eqz = U.isZero, U.isNegative = function() {
        return !this.unsigned && this.high < 0
    }, U.isPositive = function() {
        return this.unsigned || this.high >= 0
    }, U.isOdd = function() {
        return 1 == (1 & this.low)
    }, U.isEven = function() {
        return 0 == (1 & this.low)
    }, U.equals = function(t) {
        return u(t) || (t = v(t)), (this.unsigned === t.unsigned || this.high >>> 31 != 1 || t.high >>> 31 != 1) && this.high === t.high && this.low === t.low
    }, U.eq = U.equals, U.notEquals = function(t) {
        return !this.eq(t)
    }, U.neq = U.notEquals, U.ne = U.notEquals, U.lessThan = function(t) {
        return this.comp(t) < 0
    }, U.lt = U.lessThan, U.lessThanOrEqual = function(t) {
        return this.comp(t) <= 0
    }, U.lte = U.lessThanOrEqual, U.le = U.lessThanOrEqual, U.greaterThan = function(t) {
        return this.comp(t) > 0
    }, U.gt = U.greaterThan, U.greaterThanOrEqual = function(t) {
        return this.comp(t) >= 0
    }, U.gte = U.greaterThanOrEqual, U.ge = U.greaterThanOrEqual, U.compare = function(t) {
        if (u(t) || (t = v(t)), this.eq(t)) return 0;
        var e = this.isNegative(),
            r = t.isNegative();
        return e && !r ? -1 : !e && r ? 1 : this.unsigned ? t.high >>> 0 > this.high >>> 0 || t.high === this.high && t.low >>> 0 > this.low >>> 0 ? -1 : 1 : this.sub(t).isNegative() ? -1 : 1
    }, U.comp = U.compare, U.negate = function() {
        return !this.unsigned && this.eq(j) ? j : this.not().add(O)
    }, U.neg = U.negate, U.add = function(t) {
        u(t) || (t = v(t));
        var e = this.high >>> 16,
            r = 65535 & this.high,
            n = this.low >>> 16,
            i = 65535 & this.low,
            o = t.high >>> 16,
            s = 65535 & t.high,
            a = t.low >>> 16,
            h = 0,
            c = 0,
            l = 0,
            f = 0;
        return l += (f += i + (65535 & t.low)) >>> 16, c += (l += n + a) >>> 16, h += (c += r + s) >>> 16, h += e + o, g((l &= 65535) << 16 | (f &= 65535), (h &= 65535) << 16 | (c &= 65535), this.unsigned)
    }, U.subtract = function(t) {
        return u(t) || (t = v(t)), this.add(t.neg())
    }, U.sub = U.subtract, U.multiply = function(t) {
        if (this.isZero()) return this;
        if (u(t) || (t = v(t)), s) return g(s.mul(this.low, this.high, t.low, t.high), s.get_high(), this.unsigned);
        if (t.isZero()) return this.unsigned ? L : x;
        if (this.eq(j)) return t.isOdd() ? j : x;
        if (t.eq(j)) return this.isOdd() ? j : x;
        if (this.isNegative()) return t.isNegative() ? this.neg().mul(t.neg()) : this.neg().mul(t).neg();
        if (t.isNegative()) return this.mul(t.neg()).neg();
        if (this.lt(E) && t.lt(E)) return d(this.toNumber() * t.toNumber(), this.unsigned);
        var e = this.high >>> 16,
            r = 65535 & this.high,
            n = this.low >>> 16,
            i = 65535 & this.low,
            o = t.high >>> 16,
            a = 65535 & t.high,
            h = t.low >>> 16,
            c = 65535 & t.low,
            l = 0,
            f = 0,
            p = 0,
            y = 0;
        return p += (y += i * c) >>> 16, f += (p += n * c) >>> 16, p &= 65535, f += (p += i * h) >>> 16, l += (f += r * c) >>> 16, f &= 65535, l += (f += n * h) >>> 16, f &= 65535, l += (f += i * a) >>> 16, l += e * c + r * h + n * a + i * o, g((p &= 65535) << 16 | (y &= 65535), (l &= 65535) << 16 | (f &= 65535), this.unsigned)
    }, U.mul = U.multiply, U.divide = function(t) {
        if (u(t) || (t = v(t)), t.isZero()) throw Error("division by zero");
        var e, r, n;
        if (s) return this.unsigned || -2147483648 !== this.high || -1 !== t.low || -1 !== t.high ? g((this.unsigned ? s.div_u : s.div_s)(this.low, this.high, t.low, t.high), s.get_high(), this.unsigned) : this;
        if (this.isZero()) return this.unsigned ? L : x;
        if (this.unsigned) {
            if (t.unsigned || (t = t.toUnsigned()), t.gt(this)) return L;
            if (t.gt(this.shru(1))) return _;
            n = L
        } else {
            if (this.eq(j)) return t.eq(O) || t.eq(N) ? j : t.eq(j) ? O : (e = this.shr(1).div(t).shl(1)).eq(x) ? t.isNegative() ? O : N : (r = this.sub(t.mul(e)), n = e.add(r.div(t)));
            if (t.eq(j)) return this.unsigned ? L : x;
            if (this.isNegative()) return t.isNegative() ? this.neg().div(t.neg()) : this.neg().div(t).neg();
            if (t.isNegative()) return this.div(t.neg()).neg();
            n = x
        }
        for (r = this; r.gte(t);) {
            e = Math.max(1, Math.floor(r.toNumber() / t.toNumber()));
            for (var i = Math.ceil(Math.log(e) / Math.LN2), o = i <= 48 ? 1 : p(2, i - 48), a = d(e), h = a.mul(t); h.isNegative() || h.gt(r);) h = (a = d(e -= o, this.unsigned)).mul(t);
            a.isZero() && (a = O), n = n.add(a), r = r.sub(h)
        }
        return n
    }, U.div = U.divide, U.modulo = function(t) {
        return u(t) || (t = v(t)), s ? g((this.unsigned ? s.rem_u : s.rem_s)(this.low, this.high, t.low, t.high), s.get_high(), this.unsigned) : this.sub(this.div(t).mul(t))
    }, U.mod = U.modulo, U.rem = U.modulo, U.not = function() {
        return g(~this.low, ~this.high, this.unsigned)
    }, U.countLeadingZeros = function() {
        return this.high ? Math.clz32(this.high) : Math.clz32(this.low) + 32
    }, U.clz = U.countLeadingZeros, U.countTrailingZeros = function() {
        return this.low ? h(this.low) : h(this.high) + 32
    }, U.ctz = U.countTrailingZeros, U.and = function(t) {
        return u(t) || (t = v(t)), g(this.low & t.low, this.high & t.high, this.unsigned)
    }, U.or = function(t) {
        return u(t) || (t = v(t)), g(this.low | t.low, this.high | t.high, this.unsigned)
    }, U.xor = function(t) {
        return u(t) || (t = v(t)), g(this.low ^ t.low, this.high ^ t.high, this.unsigned)
    }, U.shiftLeft = function(t) {
        return u(t) && (t = t.toInt()), 0 == (t &= 63) ? this : t < 32 ? g(this.low << t, this.high << t | this.low >>> 32 - t, this.unsigned) : g(0, this.low << t - 32, this.unsigned)
    }, U.shl = U.shiftLeft, U.shiftRight = function(t) {
        return u(t) && (t = t.toInt()), 0 == (t &= 63) ? this : t < 32 ? g(this.low >>> t | this.high << 32 - t, this.high >> t, this.unsigned) : g(this.high >> t - 32, this.high >= 0 ? 0 : -1, this.unsigned)
    }, U.shr = U.shiftRight, U.shiftRightUnsigned = function(t) {
        return u(t) && (t = t.toInt()), 0 == (t &= 63) ? this : t < 32 ? g(this.low >>> t | this.high << 32 - t, this.high >>> t, this.unsigned) : g(32 === t ? this.high : this.high >>> t - 32, 0, this.unsigned)
    }, U.shru = U.shiftRightUnsigned, U.shr_u = U.shiftRightUnsigned, U.rotateLeft = function(t) {
        var e;
        return u(t) && (t = t.toInt()), 0 == (t &= 63) ? this : 32 === t ? g(this.high, this.low, this.unsigned) : t < 32 ? (e = 32 - t, g(this.low << t | this.high >>> e, this.high << t | this.low >>> e, this.unsigned)) : (e = 32 - (t -= 32), g(this.high << t | this.low >>> e, this.low << t | this.high >>> e, this.unsigned))
    }, U.rotl = U.rotateLeft, U.rotateRight = function(t) {
        var e;
        return u(t) && (t = t.toInt()), 0 == (t &= 63) ? this : 32 === t ? g(this.high, this.low, this.unsigned) : t < 32 ? (e = 32 - t, g(this.high << e | this.low >>> t, this.low << e | this.high >>> t, this.unsigned)) : (e = 32 - (t -= 32), g(this.low << e | this.high >>> t, this.high << e | this.low >>> t, this.unsigned))
    }, U.rotr = U.rotateRight, U.toSigned = function() {
        return this.unsigned ? g(this.low, this.high, !1) : this
    }, U.toUnsigned = function() {
        return this.unsigned ? this : g(this.low, this.high, !0)
    }, U.toBytes = function(t) {
        return t ? this.toBytesLE() : this.toBytesBE()
    }, U.toBytesLE = function() {
        var t = this.high,
            e = this.low;
        return [255 & e, e >>> 8 & 255, e >>> 16 & 255, e >>> 24, 255 & t, t >>> 8 & 255, t >>> 16 & 255, t >>> 24]
    }, U.toBytesBE = function() {
        var t = this.high,
            e = this.low;
        return [t >>> 24, t >>> 16 & 255, t >>> 8 & 255, 255 & t, e >>> 24, e >>> 16 & 255, e >>> 8 & 255, 255 & e]
    }, a.fromBytes = function(t, e, r) {
        return r ? a.fromBytesLE(t, e) : a.fromBytesBE(t, e)
    }, a.fromBytesLE = function(t, e) {
        return new a(t[0] | t[1] << 8 | t[2] << 16 | t[3] << 24, t[4] | t[5] << 8 | t[6] << 16 | t[7] << 24, e)
    }, a.fromBytesBE = function(t, e) {
        return new a(t[4] << 24 | t[5] << 16 | t[6] << 8 | t[7], t[0] << 24 | t[1] << 16 | t[2] << 8 | t[3], e)
    };
    const k = a;

    function P(t) {
        return P = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        }, P(t)
    }

    function B() {
        B = function() {
            return t
        };
        var t = {},
            e = Object.prototype,
            r = e.hasOwnProperty,
            n = Object.defineProperty || function(t, e, r) {
                t[e] = r.value
            },
            i = "function" == typeof Symbol ? Symbol : {},
            o = i.iterator || "@@iterator",
            s = i.asyncIterator || "@@asyncIterator",
            a = i.toStringTag || "@@toStringTag";

        function u(t, e, r) {
            return Object.defineProperty(t, e, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }), t[e]
        }
        try {
            u({}, "")
        } catch (t) {
            u = function(t, e, r) {
                return t[e] = r
            }
        }

        function h(t, e, r, i) {
            var o = e && e.prototype instanceof f ? e : f,
                s = Object.create(o.prototype),
                a = new _(i || []);
            return n(s, "_invoke", {
                value: E(t, r, a)
            }), s
        }

        function c(t, e, r) {
            try {
                return {
                    type: "normal",
                    arg: t.call(e, r)
                }
            } catch (t) {
                return {
                    type: "throw",
                    arg: t
                }
            }
        }
        t.wrap = h;
        var l = {};

        function f() {}

        function d() {}

        function g() {}
        var p = {};
        u(p, o, (function() {
            return this
        }));
        var y = Object.getPrototypeOf,
            v = y && y(y(N([])));
        v && v !== e && r.call(v, o) && (p = v);
        var m = g.prototype = f.prototype = Object.create(p);

        function w(t) {
            ["next", "throw", "return"].forEach((function(e) {
                u(t, e, (function(t) {
                    return this._invoke(e, t)
                }))
            }))
        }

        function b(t, e) {
            function i(n, o, s, a) {
                var u = c(t[n], t, o);
                if ("throw" !== u.type) {
                    var h = u.arg,
                        l = h.value;
                    return l && "object" == P(l) && r.call(l, "__await") ? e.resolve(l.__await).then((function(t) {
                        i("next", t, s, a)
                    }), (function(t) {
                        i("throw", t, s, a)
                    })) : e.resolve(l).then((function(t) {
                        h.value = t, s(h)
                    }), (function(t) {
                        return i("throw", t, s, a)
                    }))
                }
                a(u.arg)
            }
            var o;
            n(this, "_invoke", {
                value: function(t, r) {
                    function n() {
                        return new e((function(e, n) {
                            i(t, r, e, n)
                        }))
                    }
                    return o = o ? o.then(n, n) : n()
                }
            })
        }

        function E(t, e, r) {
            var n = "suspendedStart";
            return function(i, o) {
                if ("executing" === n) throw new Error("Generator is already running");
                if ("completed" === n) {
                    if ("throw" === i) throw o;
                    return {
                        value: void 0,
                        done: !0
                    }
                }
                for (r.method = i, r.arg = o;;) {
                    var s = r.delegate;
                    if (s) {
                        var a = x(s, r);
                        if (a) {
                            if (a === l) continue;
                            return a
                        }
                    }
                    if ("next" === r.method) r.sent = r._sent = r.arg;
                    else if ("throw" === r.method) {
                        if ("suspendedStart" === n) throw n = "completed", r.arg;
                        r.dispatchException(r.arg)
                    } else "return" === r.method && r.abrupt("return", r.arg);
                    n = "executing";
                    var u = c(t, e, r);
                    if ("normal" === u.type) {
                        if (n = r.done ? "completed" : "suspendedYield", u.arg === l) continue;
                        return {
                            value: u.arg,
                            done: r.done
                        }
                    }
                    "throw" === u.type && (n = "completed", r.method = "throw", r.arg = u.arg)
                }
            }
        }

        function x(t, e) {
            var r = e.method,
                n = t.iterator[r];
            if (void 0 === n) return e.delegate = null, "throw" === r && t.iterator.return && (e.method = "return", e.arg = void 0, x(t, e), "throw" === e.method) || "return" !== r && (e.method = "throw", e.arg = new TypeError("The iterator does not provide a '" + r + "' method")), l;
            var i = c(n, t.iterator, e.arg);
            if ("throw" === i.type) return e.method = "throw", e.arg = i.arg, e.delegate = null, l;
            var o = i.arg;
            return o ? o.done ? (e[t.resultName] = o.value, e.next = t.nextLoc, "return" !== e.method && (e.method = "next", e.arg = void 0), e.delegate = null, l) : o : (e.method = "throw", e.arg = new TypeError("iterator result is not an object"), e.delegate = null, l)
        }

        function L(t) {
            var e = {
                tryLoc: t[0]
            };
            1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e)
        }

        function O(t) {
            var e = t.completion || {};
            e.type = "normal", delete e.arg, t.completion = e
        }

        function _(t) {
            this.tryEntries = [{
                tryLoc: "root"
            }], t.forEach(L, this), this.reset(!0)
        }

        function N(t) {
            if (t) {
                var e = t[o];
                if (e) return e.call(t);
                if ("function" == typeof t.next) return t;
                if (!isNaN(t.length)) {
                    var n = -1,
                        i = function e() {
                            for (; ++n < t.length;)
                                if (r.call(t, n)) return e.value = t[n], e.done = !1, e;
                            return e.value = void 0, e.done = !0, e
                        };
                    return i.next = i
                }
            }
            return {
                next: S
            }
        }

        function S() {
            return {
                value: void 0,
                done: !0
            }
        }
        return d.prototype = g, n(m, "constructor", {
            value: g,
            configurable: !0
        }), n(g, "constructor", {
            value: d,
            configurable: !0
        }), d.displayName = u(g, a, "GeneratorFunction"), t.isGeneratorFunction = function(t) {
            var e = "function" == typeof t && t.constructor;
            return !!e && (e === d || "GeneratorFunction" === (e.displayName || e.name))
        }, t.mark = function(t) {
            return Object.setPrototypeOf ? Object.setPrototypeOf(t, g) : (t.__proto__ = g, u(t, a, "GeneratorFunction")), t.prototype = Object.create(m), t
        }, t.awrap = function(t) {
            return {
                __await: t
            }
        }, w(b.prototype), u(b.prototype, s, (function() {
            return this
        })), t.AsyncIterator = b, t.async = function(e, r, n, i, o) {
            void 0 === o && (o = Promise);
            var s = new b(h(e, r, n, i), o);
            return t.isGeneratorFunction(r) ? s : s.next().then((function(t) {
                return t.done ? t.value : s.next()
            }))
        }, w(m), u(m, a, "Generator"), u(m, o, (function() {
            return this
        })), u(m, "toString", (function() {
            return "[object Generator]"
        })), t.keys = function(t) {
            var e = Object(t),
                r = [];
            for (var n in e) r.push(n);
            return r.reverse(),
                function t() {
                    for (; r.length;) {
                        var n = r.pop();
                        if (n in e) return t.value = n, t.done = !1, t
                    }
                    return t.done = !0, t
                }
        }, t.values = N, _.prototype = {
            constructor: _,
            reset: function(t) {
                if (this.prev = 0, this.next = 0, this.sent = this._sent = void 0, this.done = !1, this.delegate = null, this.method = "next", this.arg = void 0, this.tryEntries.forEach(O), !t)
                    for (var e in this) "t" === e.charAt(0) && r.call(this, e) && !isNaN(+e.slice(1)) && (this[e] = void 0)
            },
            stop: function() {
                this.done = !0;
                var t = this.tryEntries[0].completion;
                if ("throw" === t.type) throw t.arg;
                return this.rval
            },
            dispatchException: function(t) {
                if (this.done) throw t;
                var e = this;

                function n(r, n) {
                    return s.type = "throw", s.arg = t, e.next = r, n && (e.method = "next", e.arg = void 0), !!n
                }
                for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                    var o = this.tryEntries[i],
                        s = o.completion;
                    if ("root" === o.tryLoc) return n("end");
                    if (o.tryLoc <= this.prev) {
                        var a = r.call(o, "catchLoc"),
                            u = r.call(o, "finallyLoc");
                        if (a && u) {
                            if (this.prev < o.catchLoc) return n(o.catchLoc, !0);
                            if (this.prev < o.finallyLoc) return n(o.finallyLoc)
                        } else if (a) {
                            if (this.prev < o.catchLoc) return n(o.catchLoc, !0)
                        } else {
                            if (!u) throw new Error("try statement without catch or finally");
                            if (this.prev < o.finallyLoc) return n(o.finallyLoc)
                        }
                    }
                }
            },
            abrupt: function(t, e) {
                for (var n = this.tryEntries.length - 1; n >= 0; --n) {
                    var i = this.tryEntries[n];
                    if (i.tryLoc <= this.prev && r.call(i, "finallyLoc") && this.prev < i.finallyLoc) {
                        var o = i;
                        break
                    }
                }
                o && ("break" === t || "continue" === t) && o.tryLoc <= e && e <= o.finallyLoc && (o = null);
                var s = o ? o.completion : {};
                return s.type = t, s.arg = e, o ? (this.method = "next", this.next = o.finallyLoc, l) : this.complete(s)
            },
            complete: function(t, e) {
                if ("throw" === t.type) throw t.arg;
                return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), l
            },
            finish: function(t) {
                for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                    var r = this.tryEntries[e];
                    if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), O(r), l
                }
            },
            catch: function(t) {
                for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                    var r = this.tryEntries[e];
                    if (r.tryLoc === t) {
                        var n = r.completion;
                        if ("throw" === n.type) {
                            var i = n.arg;
                            O(r)
                        }
                        return i
                    }
                }
                throw new Error("illegal catch attempt")
            },
            delegateYield: function(t, e, r) {
                return this.delegate = {
                    iterator: N(t),
                    resultName: e,
                    nextLoc: r
                }, "next" === this.method && (this.arg = void 0), l
            }
        }, t
    }

    function q(t, e) {
        var r = "undefined" != typeof Symbol && t[Symbol.iterator] || t["@@iterator"];
        if (!r) {
            if (Array.isArray(t) || (r = function(t, e) {
                    if (t) {
                        if ("string" == typeof t) return I(t, e);
                        var r = Object.prototype.toString.call(t).slice(8, -1);
                        return "Object" === r && t.constructor && (r = t.constructor.name), "Map" === r || "Set" === r ? Array.from(t) : "Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? I(t, e) : void 0
                    }
                }(t)) || e && t && "number" == typeof t.length) {
                r && (t = r);
                var n = 0,
                    i = function() {};
                return {
                    s: i,
                    n: function() {
                        return n >= t.length ? {
                            done: !0
                        } : {
                            done: !1,
                            value: t[n++]
                        }
                    },
                    e: function(t) {
                        throw t
                    },
                    f: i
                }
            }
            throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }
        var o, s = !0,
            a = !1;
        return {
            s: function() {
                r = r.call(t)
            },
            n: function() {
                var t = r.next();
                return s = t.done, t
            },
            e: function(t) {
                a = !0, o = t
            },
            f: function() {
                try {
                    s || null == r.return || r.return()
                } finally {
                    if (a) throw o
                }
            }
        }
    }

    function I(t, e) {
        (null == e || e > t.length) && (e = t.length);
        for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
        return n
    }

    function A(t, e, r, n, i, o, s) {
        try {
            var a = t[o](s),
                u = a.value
        } catch (t) {
            return void r(t)
        }
        a.done ? e(u) : Promise.resolve(u).then(n, i)
    }

    function R(t) {
        return function() {
            var e = this,
                r = arguments;
            return new Promise((function(n, i) {
                var o = t.apply(e, r);

                function s(t) {
                    A(o, n, i, s, a, "next", t)
                }

                function a(t) {
                    A(o, n, i, s, a, "throw", t)
                }
                s(void 0)
            }))
        }
    }
    var G = function(t) {
            var e, r = null === (e = t.match(/\/(\d+\/\d+\/\d+\/\d+\/\d+)/)) || void 0 === e ? void 0 : e[1];
            if (r) {
                var n = r.split("/").map((function(t) {
                        return parseInt(t, 8)
                    })),
                    i = n[0],
                    o = n[1] << 16 | n[2] << 8 | n[3];
                return new k(o, i).toString()
            }
        },
        F = function t(e, r) {
            return n(e).then(function() {
                var n = R(B().mark((function n(i) {
                    var o, s, a, u, h;
                    return B().wrap((function(n) {
                        for (;;) switch (n.prev = n.next) {
                            case 0:
                                return n.next = 2, i.json();
                            case 2:
                                o = n.sent, s = q(o.files);
                                try {
                                    for (s.s(); !(a = s.n()).done;) u = a.value, h = "".concat(e.replace(e.split("/").at(-1), "")).concat(u.replace("\\", "/")), (u.match(/meta\d+.json/) || u.includes("meta.json")) && t(h, r), r.resourceOverride.push({
                                        file: u.replace("\\", "/"),
                                        id: o.id,
                                        url: h
                                    })
                                } catch (t) {
                                    s.e(t)
                                } finally {
                                    s.f()
                                }
                            case 5:
                            case "end":
                                return n.stop()
                        }
                    }), n)
                })));
                return function(t) {
                    return n.apply(this, arguments)
                }
            }())
        },
        M = function(t) {
            return n(t).then(function() {
                var t = R(B().mark((function t(e) {
                    return B().wrap((function(t) {
                        for (;;) switch (t.prev = t.next) {
                            case 0:
                                return t.t0 = GM, t.next = 3, e.text();
                            case 3:
                                return t.t1 = t.sent, t.abrupt("return", t.t0.addStyle.call(t.t0, t.t1));
                            case 5:
                            case "end":
                                return t.stop()
                        }
                    }), t)
                })));
                return function(e) {
                    return t.apply(this, arguments)
                }
            }())
        },
        Z = function(t, e) {
            return n(t).then((function(t) {
                var r = document.querySelector("html");
                r.textContent = "", addEventListener("load", R(B().mark((function n() {
                    return B().wrap((function(n) {
                        for (;;) switch (n.prev = n.next) {
                            case 0:
                                return n.next = 2, t.text();
                            case 2:
                                r.innerHTML = n.sent, M(e);
                            case 4:
                            case "end":
                                return n.stop()
                        }
                    }), n)
                }))))
            }))
        };
    const C = JSON.parse('{"OV":"https://raw.githubusercontent.com/bjuonday/PixelBalance/main"}');

    function z(t) {
        return z = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        }, z(t)
    }

    function H() {
        H = function() {
            return t
        };
        var t = {},
            e = Object.prototype,
            r = e.hasOwnProperty,
            n = Object.defineProperty || function(t, e, r) {
                t[e] = r.value
            },
            i = "function" == typeof Symbol ? Symbol : {},
            o = i.iterator || "@@iterator",
            s = i.asyncIterator || "@@asyncIterator",
            a = i.toStringTag || "@@toStringTag";

        function u(t, e, r) {
            return Object.defineProperty(t, e, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }), t[e]
        }
        try {
            u({}, "")
        } catch (t) {
            u = function(t, e, r) {
                return t[e] = r
            }
        }

        function h(t, e, r, i) {
            var o = e && e.prototype instanceof f ? e : f,
                s = Object.create(o.prototype),
                a = new _(i || []);
            return n(s, "_invoke", {
                value: E(t, r, a)
            }), s
        }

        function c(t, e, r) {
            try {
                return {
                    type: "normal",
                    arg: t.call(e, r)
                }
            } catch (t) {
                return {
                    type: "throw",
                    arg: t
                }
            }
        }
        t.wrap = h;
        var l = {};

        function f() {}

        function d() {}

        function g() {}
        var p = {};
        u(p, o, (function() {
            return this
        }));
        var y = Object.getPrototypeOf,
            v = y && y(y(N([])));
        v && v !== e && r.call(v, o) && (p = v);
        var m = g.prototype = f.prototype = Object.create(p);

        function w(t) {
            ["next", "throw", "return"].forEach((function(e) {
                u(t, e, (function(t) {
                    return this._invoke(e, t)
                }))
            }))
        }

        function b(t, e) {
            function i(n, o, s, a) {
                var u = c(t[n], t, o);
                if ("throw" !== u.type) {
                    var h = u.arg,
                        l = h.value;
                    return l && "object" == z(l) && r.call(l, "__await") ? e.resolve(l.__await).then((function(t) {
                        i("next", t, s, a)
                    }), (function(t) {
                        i("throw", t, s, a)
                    })) : e.resolve(l).then((function(t) {
                        h.value = t, s(h)
                    }), (function(t) {
                        return i("throw", t, s, a)
                    }))
                }
                a(u.arg)
            }
            var o;
            n(this, "_invoke", {
                value: function(t, r) {
                    function n() {
                        return new e((function(e, n) {
                            i(t, r, e, n)
                        }))
                    }
                    return o = o ? o.then(n, n) : n()
                }
            })
        }

        function E(t, e, r) {
            var n = "suspendedStart";
            return function(i, o) {
                if ("executing" === n) throw new Error("Generator is already running");
                if ("completed" === n) {
                    if ("throw" === i) throw o;
                    return {
                        value: void 0,
                        done: !0
                    }
                }
                for (r.method = i, r.arg = o;;) {
                    var s = r.delegate;
                    if (s) {
                        var a = x(s, r);
                        if (a) {
                            if (a === l) continue;
                            return a
                        }
                    }
                    if ("next" === r.method) r.sent = r._sent = r.arg;
                    else if ("throw" === r.method) {
                        if ("suspendedStart" === n) throw n = "completed", r.arg;
                        r.dispatchException(r.arg)
                    } else "return" === r.method && r.abrupt("return", r.arg);
                    n = "executing";
                    var u = c(t, e, r);
                    if ("normal" === u.type) {
                        if (n = r.done ? "completed" : "suspendedYield", u.arg === l) continue;
                        return {
                            value: u.arg,
                            done: r.done
                        }
                    }
                    "throw" === u.type && (n = "completed", r.method = "throw", r.arg = u.arg)
                }
            }
        }

        function x(t, e) {
            var r = e.method,
                n = t.iterator[r];
            if (void 0 === n) return e.delegate = null, "throw" === r && t.iterator.return && (e.method = "return", e.arg = void 0, x(t, e), "throw" === e.method) || "return" !== r && (e.method = "throw", e.arg = new TypeError("The iterator does not provide a '" + r + "' method")), l;
            var i = c(n, t.iterator, e.arg);
            if ("throw" === i.type) return e.method = "throw", e.arg = i.arg, e.delegate = null, l;
            var o = i.arg;
            return o ? o.done ? (e[t.resultName] = o.value, e.next = t.nextLoc, "return" !== e.method && (e.method = "next", e.arg = void 0), e.delegate = null, l) : o : (e.method = "throw", e.arg = new TypeError("iterator result is not an object"), e.delegate = null, l)
        }

        function L(t) {
            var e = {
                tryLoc: t[0]
            };
            1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e)
        }

        function O(t) {
            var e = t.completion || {};
            e.type = "normal", delete e.arg, t.completion = e
        }

        function _(t) {
            this.tryEntries = [{
                tryLoc: "root"
            }], t.forEach(L, this), this.reset(!0)
        }

        function N(t) {
            if (t) {
                var e = t[o];
                if (e) return e.call(t);
                if ("function" == typeof t.next) return t;
                if (!isNaN(t.length)) {
                    var n = -1,
                        i = function e() {
                            for (; ++n < t.length;)
                                if (r.call(t, n)) return e.value = t[n], e.done = !1, e;
                            return e.value = void 0, e.done = !0, e
                        };
                    return i.next = i
                }
            }
            return {
                next: S
            }
        }

        function S() {
            return {
                value: void 0,
                done: !0
            }
        }
        return d.prototype = g, n(m, "constructor", {
            value: g,
            configurable: !0
        }), n(g, "constructor", {
            value: d,
            configurable: !0
        }), d.displayName = u(g, a, "GeneratorFunction"), t.isGeneratorFunction = function(t) {
            var e = "function" == typeof t && t.constructor;
            return !!e && (e === d || "GeneratorFunction" === (e.displayName || e.name))
        }, t.mark = function(t) {
            return Object.setPrototypeOf ? Object.setPrototypeOf(t, g) : (t.__proto__ = g, u(t, a, "GeneratorFunction")), t.prototype = Object.create(m), t
        }, t.awrap = function(t) {
            return {
                __await: t
            }
        }, w(b.prototype), u(b.prototype, s, (function() {
            return this
        })), t.AsyncIterator = b, t.async = function(e, r, n, i, o) {
            void 0 === o && (o = Promise);
            var s = new b(h(e, r, n, i), o);
            return t.isGeneratorFunction(r) ? s : s.next().then((function(t) {
                return t.done ? t.value : s.next()
            }))
        }, w(m), u(m, a, "Generator"), u(m, o, (function() {
            return this
        })), u(m, "toString", (function() {
            return "[object Generator]"
        })), t.keys = function(t) {
            var e = Object(t),
                r = [];
            for (var n in e) r.push(n);
            return r.reverse(),
                function t() {
                    for (; r.length;) {
                        var n = r.pop();
                        if (n in e) return t.value = n, t.done = !1, t
                    }
                    return t.done = !0, t
                }
        }, t.values = N, _.prototype = {
            constructor: _,
            reset: function(t) {
                if (this.prev = 0, this.next = 0, this.sent = this._sent = void 0, this.done = !1, this.delegate = null, this.method = "next", this.arg = void 0, this.tryEntries.forEach(O), !t)
                    for (var e in this) "t" === e.charAt(0) && r.call(this, e) && !isNaN(+e.slice(1)) && (this[e] = void 0)
            },
            stop: function() {
                this.done = !0;
                var t = this.tryEntries[0].completion;
                if ("throw" === t.type) throw t.arg;
                return this.rval
            },
            dispatchException: function(t) {
                if (this.done) throw t;
                var e = this;

                function n(r, n) {
                    return s.type = "throw", s.arg = t, e.next = r, n && (e.method = "next", e.arg = void 0), !!n
                }
                for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                    var o = this.tryEntries[i],
                        s = o.completion;
                    if ("root" === o.tryLoc) return n("end");
                    if (o.tryLoc <= this.prev) {
                        var a = r.call(o, "catchLoc"),
                            u = r.call(o, "finallyLoc");
                        if (a && u) {
                            if (this.prev < o.catchLoc) return n(o.catchLoc, !0);
                            if (this.prev < o.finallyLoc) return n(o.finallyLoc)
                        } else if (a) {
                            if (this.prev < o.catchLoc) return n(o.catchLoc, !0)
                        } else {
                            if (!u) throw new Error("try statement without catch or finally");
                            if (this.prev < o.finallyLoc) return n(o.finallyLoc)
                        }
                    }
                }
            },
            abrupt: function(t, e) {
                for (var n = this.tryEntries.length - 1; n >= 0; --n) {
                    var i = this.tryEntries[n];
                    if (i.tryLoc <= this.prev && r.call(i, "finallyLoc") && this.prev < i.finallyLoc) {
                        var o = i;
                        break
                    }
                }
                o && ("break" === t || "continue" === t) && o.tryLoc <= e && e <= o.finallyLoc && (o = null);
                var s = o ? o.completion : {};
                return s.type = t, s.arg = e, o ? (this.method = "next", this.next = o.finallyLoc, l) : this.complete(s)
            },
            complete: function(t, e) {
                if ("throw" === t.type) throw t.arg;
                return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), l
            },
            finish: function(t) {
                for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                    var r = this.tryEntries[e];
                    if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), O(r), l
                }
            },
            catch: function(t) {
                for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                    var r = this.tryEntries[e];
                    if (r.tryLoc === t) {
                        var n = r.completion;
                        if ("throw" === n.type) {
                            var i = n.arg;
                            O(r)
                        }
                        return i
                    }
                }
                throw new Error("illegal catch attempt")
            },
            delegateYield: function(t, e, r) {
                return this.delegate = {
                    iterator: N(t),
                    resultName: e,
                    nextLoc: r
                }, "next" === this.method && (this.arg = void 0), l
            }
        }, t
    }

    function V(t, e, r, n, i, o, s) {
        try {
            var a = t[o](s),
                u = a.value
        } catch (t) {
            return void r(t)
        }
        a.done ? e(u) : Promise.resolve(u).then(n, i)
    }

    function D(t, e) {
        for (var r = 0; r < e.length; r++) {
            var n = e[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, J(n.key), n)
        }
    }

    function W(t, e, r) {
        return e && D(t.prototype, e), r && D(t, r), Object.defineProperty(t, "prototype", {
            writable: !1
        }), t
    }

    function Y(t, e, r) {
        return (e = J(e)) in t ? Object.defineProperty(t, e, {
            value: r,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : t[e] = r, t
    }

    function J(t) {
        var e = function(t, e) {
            if ("object" !== z(t) || null === t) return t;
            var r = t[Symbol.toPrimitive];
            if (void 0 !== r) {
                var n = r.call(t, "string");
                if ("object" !== z(n)) return n;
                throw new TypeError("@@toPrimitive must return a primitive value.")
            }
            return String(t)
        }(t);
        return "symbol" === z(e) ? e : String(e)
    }
    var X = W((function t() {
        var e = this;
        ! function(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }(this, t), Y(this, "resourceOverride", []), Y(this, "originalFetch", window.fetch), Y(this, "fetch", function() {
            var t, r = (t = H().mark((function t(r, i) {
                var o, s;
                return H().wrap((function(t) {
                    for (;;) switch (t.prev = t.next) {
                        case 0:
                            if (!(o = G(r))) {
                                t.next = 9;
                                break
                            }
                            s = e.resourceOverride.length - 1;
                        case 3:
                            if (!(s >= 0)) {
                                t.next = 9;
                                break
                            }
                            if (o !== e.resourceOverride[s].id || -1 === r.search(e.resourceOverride[s].file)) {
                                t.next = 6;
                                break
                            }
                            return t.abrupt("return", n(e.resourceOverride[s].url, i));
                        case 6:
                            s--, t.next = 3;
                            break;
                        case 9:
                            return t.abrupt("return", e.originalFetch(r, i));
                        case 10:
                        case "end":
                            return t.stop()
                    }
                }), t)
            })), function() {
                var e = this,
                    r = arguments;
                return new Promise((function(n, i) {
                    var o = t.apply(e, r);

                    function s(t) {
                        V(o, n, i, s, a, "next", t)
                    }

                    function a(t) {
                        V(o, n, i, s, a, "throw", t)
                    }
                    s(void 0)
                }))
            });
            return function(t, e) {
                return r.apply(this, arguments)
            }
        }()), F("".concat(C.OV, "/resources/meta.json"), this), unsafeWindow.fetch = this.fetch
    }));
    switch (location.href) {
        case "https://tankionline.com/ru/":
        case "https://tankionline.com/ru/#":
            Z("".concat(C.OV, "/website/ru/index.html"));
            break;
        case "https://tankionline.com/en/":
        case "https://tankionline.com/en/#":
            Z("".concat(C.OV, "/website/en/index.html"));
            break;
        default:
            unsafeWindow.pixelBalance = new X
    }
})();
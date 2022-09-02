(self.webpackChunk = self.webpackChunk || []).push([[179], {
    255: t => {
        function e(t) {
            return Promise.resolve().then(() => {
                var e = new Error("Cannot find module '" + t + "'");
                throw e.code = "MODULE_NOT_FOUND", e
            })
        }

        e.keys = () => [], e.resolve = e, e.id = 255, t.exports = e
    }, 676: (t, e, n) => {
        "use strict";

        function r(t) {
            return "function" == typeof t
        }

        let s = !1;
        const i = {
            Promise: void 0, set useDeprecatedSynchronousErrorHandling(t) {
                if (t) {
                    const t = new Error;
                    console.warn("DEPRECATED! RxJS was set to use deprecated synchronous error handling behavior by code at: \n" + t.stack)
                } else s && console.log("RxJS: Back to a better error behavior. Thank you. <3");
                s = t
            }, get useDeprecatedSynchronousErrorHandling() {
                return s
            }
        };

        function o(t) {
            setTimeout(() => {
                throw t
            }, 0)
        }

        const a = {
            closed: !0, next(t) {
            }, error(t) {
                if (i.useDeprecatedSynchronousErrorHandling) throw t;
                o(t)
            }, complete() {
            }
        }, c = Array.isArray || (t => t && "number" == typeof t.length);

        function l(t) {
            return null !== t && "object" == typeof t
        }

        const u = (() => {
            function t(t) {
                return Error.call(this), this.message = t ? `${t.length} errors occurred during unsubscription:\n${t.map((t, e) => `${e + 1}) ${t.toString()}`).join("\n  ")}` : "", this.name = "UnsubscriptionError", this.errors = t, this
            }

            return t.prototype = Object.create(Error.prototype), t
        })();

        class h {
            constructor(t) {
                this.closed = !1, this._parentOrParents = null, this._subscriptions = null, t && (this._unsubscribe = t)
            }

            unsubscribe() {
                let t;
                if (this.closed) return;
                let {_parentOrParents: e, _unsubscribe: n, _subscriptions: s} = this;
                if (this.closed = !0, this._parentOrParents = null, this._subscriptions = null, e instanceof h) e.remove(this); else if (null !== e) for (let r = 0; r < e.length; ++r) e[r].remove(this);
                if (r(n)) try {
                    n.call(this)
                } catch (i) {
                    t = i instanceof u ? d(i.errors) : [i]
                }
                if (c(s)) {
                    let e = -1, n = s.length;
                    for (; ++e < n;) {
                        const n = s[e];
                        if (l(n)) try {
                            n.unsubscribe()
                        } catch (i) {
                            t = t || [], i instanceof u ? t = t.concat(d(i.errors)) : t.push(i)
                        }
                    }
                }
                if (t) throw new u(t)
            }

            add(t) {
                let e = t;
                if (!t) return h.EMPTY;
                switch (typeof t) {
                    case"function":
                        e = new h(t);
                    case"object":
                        if (e === this || e.closed || "function" != typeof e.unsubscribe) return e;
                        if (this.closed) return e.unsubscribe(), e;
                        if (!(e instanceof h)) {
                            const t = e;
                            e = new h, e._subscriptions = [t]
                        }
                        break;
                    default:
                        throw new Error("unrecognized teardown " + t + " added to Subscription.")
                }
                let {_parentOrParents: n} = e;
                if (null === n) e._parentOrParents = this; else if (n instanceof h) {
                    if (n === this) return e;
                    e._parentOrParents = [n, this]
                } else {
                    if (-1 !== n.indexOf(this)) return e;
                    n.push(this)
                }
                const r = this._subscriptions;
                return null === r ? this._subscriptions = [e] : r.push(e), e
            }

            remove(t) {
                const e = this._subscriptions;
                if (e) {
                    const n = e.indexOf(t);
                    -1 !== n && e.splice(n, 1)
                }
            }
        }

        function d(t) {
            return t.reduce((t, e) => t.concat(e instanceof u ? e.errors : e), [])
        }

        h.EMPTY = function (t) {
            return t.closed = !0, t
        }(new h);
        const f = "function" == typeof Symbol ? Symbol("rxSubscriber") : "@@rxSubscriber_" + Math.random();

        class p extends h {
            constructor(t, e, n) {
                switch (super(), this.syncErrorValue = null, this.syncErrorThrown = !1, this.syncErrorThrowable = !1, this.isStopped = !1, arguments.length) {
                    case 0:
                        this.destination = a;
                        break;
                    case 1:
                        if (!t) {
                            this.destination = a;
                            break
                        }
                        if ("object" == typeof t) {
                            t instanceof p ? (this.syncErrorThrowable = t.syncErrorThrowable, this.destination = t, t.add(this)) : (this.syncErrorThrowable = !0, this.destination = new g(this, t));
                            break
                        }
                    default:
                        this.syncErrorThrowable = !0, this.destination = new g(this, t, e, n)
                }
            }

            [f]() {
                return this
            }

            static create(t, e, n) {
                const r = new p(t, e, n);
                return r.syncErrorThrowable = !1, r
            }

            next(t) {
                this.isStopped || this._next(t)
            }

            error(t) {
                this.isStopped || (this.isStopped = !0, this._error(t))
            }

            complete() {
                this.isStopped || (this.isStopped = !0, this._complete())
            }

            unsubscribe() {
                this.closed || (this.isStopped = !0, super.unsubscribe())
            }

            _next(t) {
                this.destination.next(t)
            }

            _error(t) {
                this.destination.error(t), this.unsubscribe()
            }

            _complete() {
                this.destination.complete(), this.unsubscribe()
            }

            _unsubscribeAndRecycle() {
                const {_parentOrParents: t} = this;
                return this._parentOrParents = null, this.unsubscribe(), this.closed = !1, this.isStopped = !1, this._parentOrParents = t, this
            }
        }

        class g extends p {
            constructor(t, e, n, s) {
                let i;
                super(), this._parentSubscriber = t;
                let o = this;
                r(e) ? i = e : e && (i = e.next, n = e.error, s = e.complete, e !== a && (o = Object.create(e), r(o.unsubscribe) && this.add(o.unsubscribe.bind(o)), o.unsubscribe = this.unsubscribe.bind(this))), this._context = o, this._next = i, this._error = n, this._complete = s
            }

            next(t) {
                if (!this.isStopped && this._next) {
                    const {_parentSubscriber: e} = this;
                    i.useDeprecatedSynchronousErrorHandling && e.syncErrorThrowable ? this.__tryOrSetError(e, this._next, t) && this.unsubscribe() : this.__tryOrUnsub(this._next, t)
                }
            }

            error(t) {
                if (!this.isStopped) {
                    const {_parentSubscriber: e} = this, {useDeprecatedSynchronousErrorHandling: n} = i;
                    if (this._error) n && e.syncErrorThrowable ? (this.__tryOrSetError(e, this._error, t), this.unsubscribe()) : (this.__tryOrUnsub(this._error, t), this.unsubscribe()); else if (e.syncErrorThrowable) n ? (e.syncErrorValue = t, e.syncErrorThrown = !0) : o(t), this.unsubscribe(); else {
                        if (this.unsubscribe(), n) throw t;
                        o(t)
                    }
                }
            }

            complete() {
                if (!this.isStopped) {
                    const {_parentSubscriber: t} = this;
                    if (this._complete) {
                        const e = () => this._complete.call(this._context);
                        i.useDeprecatedSynchronousErrorHandling && t.syncErrorThrowable ? (this.__tryOrSetError(t, e), this.unsubscribe()) : (this.__tryOrUnsub(e), this.unsubscribe())
                    } else this.unsubscribe()
                }
            }

            __tryOrUnsub(t, e) {
                try {
                    t.call(this._context, e)
                } catch (n) {
                    if (this.unsubscribe(), i.useDeprecatedSynchronousErrorHandling) throw n;
                    o(n)
                }
            }

            __tryOrSetError(t, e, n) {
                if (!i.useDeprecatedSynchronousErrorHandling) throw new Error("bad call");
                try {
                    e.call(this._context, n)
                } catch (r) {
                    return i.useDeprecatedSynchronousErrorHandling ? (t.syncErrorValue = r, t.syncErrorThrown = !0, !0) : (o(r), !0)
                }
                return !1
            }

            _unsubscribe() {
                const {_parentSubscriber: t} = this;
                this._context = null, this._parentSubscriber = null, t.unsubscribe()
            }
        }

        const m = "function" == typeof Symbol && Symbol.observable || "@@observable";

        function y() {
        }

        let v = (() => {
            class t {
                constructor(t) {
                    this._isScalar = !1, t && (this._subscribe = t)
                }

                lift(e) {
                    const n = new t;
                    return n.source = this, n.operator = e, n
                }

                subscribe(t, e, n) {
                    const {operator: r} = this, s = function (t, e, n) {
                        if (t) {
                            if (t instanceof p) return t;
                            if (t[f]) return t[f]()
                        }
                        return t || e || n ? new p(t, e, n) : new p(a)
                    }(t, e, n);
                    if (s.add(r ? r.call(s, this.source) : this.source || i.useDeprecatedSynchronousErrorHandling && !s.syncErrorThrowable ? this._subscribe(s) : this._trySubscribe(s)), i.useDeprecatedSynchronousErrorHandling && s.syncErrorThrowable && (s.syncErrorThrowable = !1, s.syncErrorThrown)) throw s.syncErrorValue;
                    return s
                }

                _trySubscribe(t) {
                    try {
                        return this._subscribe(t)
                    } catch (e) {
                        i.useDeprecatedSynchronousErrorHandling && (t.syncErrorThrown = !0, t.syncErrorValue = e), function (t) {
                            for (; t;) {
                                const {closed: e, destination: n, isStopped: r} = t;
                                if (e || r) return !1;
                                t = n && n instanceof p ? n : null
                            }
                            return !0
                        }(t) ? t.error(e) : console.warn(e)
                    }
                }

                forEach(t, e) {
                    return new (e = b(e))((e, n) => {
                        let r;
                        r = this.subscribe(e => {
                            try {
                                t(e)
                            } catch (s) {
                                n(s), r && r.unsubscribe()
                            }
                        }, n, e)
                    })
                }

                _subscribe(t) {
                    const {source: e} = this;
                    return e && e.subscribe(t)
                }

                [m]() {
                    return this
                }

                pipe(...t) {
                    return 0 === t.length ? this : ((e = t) ? 1 === e.length ? e[0] : function (t) {
                        return e.reduce((t, e) => e(t), t)
                    } : y)(this);
                    var e
                }

                toPromise(t) {
                    return new (t = b(t))((t, e) => {
                        let n;
                        this.subscribe(t => n = t, t => e(t), () => t(n))
                    })
                }
            }

            return t.create = e => new t(e), t
        })();

        function b(t) {
            if (t || (t = i.Promise || Promise), !t) throw new Error("no Promise impl found");
            return t
        }

        const _ = (() => {
            function t() {
                return Error.call(this), this.message = "object unsubscribed", this.name = "ObjectUnsubscribedError", this
            }

            return t.prototype = Object.create(Error.prototype), t
        })();

        class w extends h {
            constructor(t, e) {
                super(), this.subject = t, this.subscriber = e, this.closed = !1
            }

            unsubscribe() {
                if (this.closed) return;
                this.closed = !0;
                const t = this.subject, e = t.observers;
                if (this.subject = null, !e || 0 === e.length || t.isStopped || t.closed) return;
                const n = e.indexOf(this.subscriber);
                -1 !== n && e.splice(n, 1)
            }
        }

        class C extends p {
            constructor(t) {
                super(t), this.destination = t
            }
        }

        let S = (() => {
            class t extends v {
                constructor() {
                    super(), this.observers = [], this.closed = !1, this.isStopped = !1, this.hasError = !1, this.thrownError = null
                }

                [f]() {
                    return new C(this)
                }

                lift(t) {
                    const e = new x(this, this);
                    return e.operator = t, e
                }

                next(t) {
                    if (this.closed) throw new _;
                    if (!this.isStopped) {
                        const {observers: e} = this, n = e.length, r = e.slice();
                        for (let s = 0; s < n; s++) r[s].next(t)
                    }
                }

                error(t) {
                    if (this.closed) throw new _;
                    this.hasError = !0, this.thrownError = t, this.isStopped = !0;
                    const {observers: e} = this, n = e.length, r = e.slice();
                    for (let s = 0; s < n; s++) r[s].error(t);
                    this.observers.length = 0
                }

                complete() {
                    if (this.closed) throw new _;
                    this.isStopped = !0;
                    const {observers: t} = this, e = t.length, n = t.slice();
                    for (let r = 0; r < e; r++) n[r].complete();
                    this.observers.length = 0
                }

                unsubscribe() {
                    this.isStopped = !0, this.closed = !0, this.observers = null
                }

                _trySubscribe(t) {
                    if (this.closed) throw new _;
                    return super._trySubscribe(t)
                }

                _subscribe(t) {
                    if (this.closed) throw new _;
                    return this.hasError ? (t.error(this.thrownError), h.EMPTY) : this.isStopped ? (t.complete(), h.EMPTY) : (this.observers.push(t), new w(this, t))
                }

                asObservable() {
                    const t = new v;
                    return t.source = this, t
                }
            }

            return t.create = (t, e) => new x(t, e), t
        })();

        class x extends S {
            constructor(t, e) {
                super(), this.destination = t, this.source = e
            }

            next(t) {
                const {destination: e} = this;
                e && e.next && e.next(t)
            }

            error(t) {
                const {destination: e} = this;
                e && e.error && this.destination.error(t)
            }

            complete() {
                const {destination: t} = this;
                t && t.complete && this.destination.complete()
            }

            _subscribe(t) {
                const {source: e} = this;
                return e ? this.source.subscribe(t) : h.EMPTY
            }
        }

        function k(t) {
            return t && "function" == typeof t.schedule
        }

        class T extends p {
            constructor(t, e, n) {
                super(), this.parent = t, this.outerValue = e, this.outerIndex = n, this.index = 0
            }

            _next(t) {
                this.parent.notifyNext(this.outerValue, t, this.outerIndex, this.index++, this)
            }

            _error(t) {
                this.parent.notifyError(t, this), this.unsubscribe()
            }

            _complete() {
                this.parent.notifyComplete(this), this.unsubscribe()
            }
        }

        const I = t => e => {
                for (let n = 0, r = t.length; n < r && !e.closed; n++) e.next(t[n]);
                e.complete()
            }, E = "function" == typeof Symbol && Symbol.iterator ? Symbol.iterator : "@@iterator",
            O = t => t && "number" == typeof t.length && "function" != typeof t;

        function A(t) {
            return !!t && "function" != typeof t.subscribe && "function" == typeof t.then
        }

        const R = t => {
            if (t && "function" == typeof t[m]) return n = t, t => {
                const e = n[m]();
                if ("function" != typeof e.subscribe) throw new TypeError("Provided object does not correctly implement Symbol.observable");
                return e.subscribe(t)
            };
            if (O(t)) return I(t);
            if (A(t)) return (t => e => (t.then(t => {
                e.closed || (e.next(t), e.complete())
            }, t => e.error(t)).then(null, o), e))(t);
            if (t && "function" == typeof t[E]) return e = t, t => {
                const n = e[E]();
                for (; ;) {
                    const e = n.next();
                    if (e.done) {
                        t.complete();
                        break
                    }
                    if (t.next(e.value), t.closed) break
                }
                return "function" == typeof n.return && t.add(() => {
                    n.return && n.return()
                }), t
            };
            {
                const e = l(t) ? "an invalid object" : `'${t}'`;
                throw new TypeError(`You provided ${e} where a stream was expected. You can provide an Observable, Promise, Array, or Iterable.`)
            }
            var e, n
        };

        function L(t, e, n, r, s = new T(t, n, r)) {
            if (!s.closed) return e instanceof v ? e.subscribe(s) : R(e)(s)
        }

        class P extends p {
            notifyNext(t, e, n, r, s) {
                this.destination.next(e)
            }

            notifyError(t, e) {
                this.destination.error(t)
            }

            notifyComplete(t) {
                this.destination.complete()
            }
        }

        function j(t, e) {
            return function (n) {
                if ("function" != typeof t) throw new TypeError("argument is not a function. Are you looking for `mapTo()`?");
                return n.lift(new D(t, e))
            }
        }

        class D {
            constructor(t, e) {
                this.project = t, this.thisArg = e
            }

            call(t, e) {
                return e.subscribe(new M(t, this.project, this.thisArg))
            }
        }

        class M extends p {
            constructor(t, e, n) {
                super(t), this.project = e, this.count = 0, this.thisArg = n || this
            }

            _next(t) {
                let e;
                try {
                    e = this.project.call(this.thisArg, t, this.count++)
                } catch (n) {
                    return void this.destination.error(n)
                }
                this.destination.next(e)
            }
        }

        function N(t, e) {
            return new v(n => {
                const r = new h;
                let s = 0;
                return r.add(e.schedule(function () {
                    s !== t.length ? (n.next(t[s++]), n.closed || r.add(this.schedule())) : n.complete()
                })), r
            })
        }

        function H(t, e) {
            return e ? function (t, e) {
                if (null != t) {
                    if (function (t) {
                        return t && "function" == typeof t[m]
                    }(t)) return function (t, e) {
                        return new v(n => {
                            const r = new h;
                            return r.add(e.schedule(() => {
                                const s = t[m]();
                                r.add(s.subscribe({
                                    next(t) {
                                        r.add(e.schedule(() => n.next(t)))
                                    }, error(t) {
                                        r.add(e.schedule(() => n.error(t)))
                                    }, complete() {
                                        r.add(e.schedule(() => n.complete()))
                                    }
                                }))
                            })), r
                        })
                    }(t, e);
                    if (A(t)) return function (t, e) {
                        return new v(n => {
                            const r = new h;
                            return r.add(e.schedule(() => t.then(t => {
                                r.add(e.schedule(() => {
                                    n.next(t), r.add(e.schedule(() => n.complete()))
                                }))
                            }, t => {
                                r.add(e.schedule(() => n.error(t)))
                            }))), r
                        })
                    }(t, e);
                    if (O(t)) return N(t, e);
                    if (function (t) {
                        return t && "function" == typeof t[E]
                    }(t) || "string" == typeof t) return function (t, e) {
                        if (!t) throw new Error("Iterable cannot be null");
                        return new v(n => {
                            const r = new h;
                            let s;
                            return r.add(() => {
                                s && "function" == typeof s.return && s.return()
                            }), r.add(e.schedule(() => {
                                s = t[E](), r.add(e.schedule(function () {
                                    if (n.closed) return;
                                    let t, e;
                                    try {
                                        const n = s.next();
                                        t = n.value, e = n.done
                                    } catch (r) {
                                        return void n.error(r)
                                    }
                                    e ? n.complete() : (n.next(t), this.schedule())
                                }))
                            })), r
                        })
                    }(t, e)
                }
                throw new TypeError((null !== t && typeof t || t) + " is not observable")
            }(t, e) : t instanceof v ? t : new v(R(t))
        }

        function F(t, e, n = Number.POSITIVE_INFINITY) {
            return "function" == typeof e ? r => r.pipe(F((n, r) => H(t(n, r)).pipe(j((t, s) => e(n, t, r, s))), n)) : ("number" == typeof e && (n = e), e => e.lift(new U(t, n)))
        }

        class U {
            constructor(t, e = Number.POSITIVE_INFINITY) {
                this.project = t, this.concurrent = e
            }

            call(t, e) {
                return e.subscribe(new $(t, this.project, this.concurrent))
            }
        }

        class $ extends P {
            constructor(t, e, n = Number.POSITIVE_INFINITY) {
                super(t), this.project = e, this.concurrent = n, this.hasCompleted = !1, this.buffer = [], this.active = 0, this.index = 0
            }

            _next(t) {
                this.active < this.concurrent ? this._tryNext(t) : this.buffer.push(t)
            }

            _tryNext(t) {
                let e;
                const n = this.index++;
                try {
                    e = this.project(t, n)
                } catch (r) {
                    return void this.destination.error(r)
                }
                this.active++, this._innerSub(e, t, n)
            }

            _innerSub(t, e, n) {
                const r = new T(this, void 0, void 0);
                this.destination.add(r), L(this, t, e, n, r)
            }

            _complete() {
                this.hasCompleted = !0, 0 === this.active && 0 === this.buffer.length && this.destination.complete(), this.unsubscribe()
            }

            notifyNext(t, e, n, r, s) {
                this.destination.next(e)
            }

            notifyComplete(t) {
                const e = this.buffer;
                this.remove(t), this.active--, e.length > 0 ? this._next(e.shift()) : 0 === this.active && this.hasCompleted && this.destination.complete()
            }
        }

        function V(t) {
            return t
        }

        function z(t = Number.POSITIVE_INFINITY) {
            return F(V, t)
        }

        function q(t, e) {
            return e ? N(t, e) : new v(I(t))
        }

        function B() {
            return function (t) {
                return t.lift(new W(t))
            }
        }

        class W {
            constructor(t) {
                this.connectable = t
            }

            call(t, e) {
                const {connectable: n} = this;
                n._refCount++;
                const r = new G(t, n), s = e.subscribe(r);
                return r.closed || (r.connection = n.connect()), s
            }
        }

        class G extends p {
            constructor(t, e) {
                super(t), this.connectable = e
            }

            _unsubscribe() {
                const {connectable: t} = this;
                if (!t) return void (this.connection = null);
                this.connectable = null;
                const e = t._refCount;
                if (e <= 0) return void (this.connection = null);
                if (t._refCount = e - 1, e > 1) return void (this.connection = null);
                const {connection: n} = this, r = t._connection;
                this.connection = null, !r || n && r !== n || r.unsubscribe()
            }
        }

        class Z extends v {
            constructor(t, e) {
                super(), this.source = t, this.subjectFactory = e, this._refCount = 0, this._isComplete = !1
            }

            _subscribe(t) {
                return this.getSubject().subscribe(t)
            }

            getSubject() {
                const t = this._subject;
                return t && !t.isStopped || (this._subject = this.subjectFactory()), this._subject
            }

            connect() {
                let t = this._connection;
                return t || (this._isComplete = !1, t = this._connection = new h, t.add(this.source.subscribe(new K(this.getSubject(), this))), t.closed && (this._connection = null, t = h.EMPTY)), t
            }

            refCount() {
                return B()(this)
            }
        }

        const Q = (() => {
            const t = Z.prototype;
            return {
                operator: {value: null},
                _refCount: {value: 0, writable: !0},
                _subject: {value: null, writable: !0},
                _connection: {value: null, writable: !0},
                _subscribe: {value: t._subscribe},
                _isComplete: {value: t._isComplete, writable: !0},
                getSubject: {value: t.getSubject},
                connect: {value: t.connect},
                refCount: {value: t.refCount}
            }
        })();

        class K extends C {
            constructor(t, e) {
                super(t), this.connectable = e
            }

            _error(t) {
                this._unsubscribe(), super._error(t)
            }

            _complete() {
                this.connectable._isComplete = !0, this._unsubscribe(), super._complete()
            }

            _unsubscribe() {
                const t = this.connectable;
                if (t) {
                    this.connectable = null;
                    const e = t._connection;
                    t._refCount = 0, t._subject = null, t._connection = null, e && e.unsubscribe()
                }
            }
        }

        function Y() {
            return new S
        }

        function J(t) {
            for (let e in t) if (t[e] === J) return e;
            throw Error("Could not find renamed property on target object.")
        }

        function X(t, e) {
            for (const n in e) e.hasOwnProperty(n) && !t.hasOwnProperty(n) && (t[n] = e[n])
        }

        function tt(t) {
            if ("string" == typeof t) return t;
            if (Array.isArray(t)) return "[" + t.map(tt).join(", ") + "]";
            if (null == t) return "" + t;
            if (t.overriddenName) return `${t.overriddenName}`;
            if (t.name) return `${t.name}`;
            const e = t.toString();
            if (null == e) return "" + e;
            const n = e.indexOf("\n");
            return -1 === n ? e : e.substring(0, n)
        }

        function et(t, e) {
            return null == t || "" === t ? null === e ? "" : e : null == e || "" === e ? t : t + " " + e
        }

        const nt = J({__forward_ref__: J});

        function rt(t) {
            return t.__forward_ref__ = rt, t.toString = function () {
                return tt(this())
            }, t
        }

        function st(t) {
            return it(t) ? t() : t
        }

        function it(t) {
            return "function" == typeof t && t.hasOwnProperty(nt) && t.__forward_ref__ === rt
        }

        class ot extends Error {
            constructor(t, e) {
                super(function (t, e) {
                    return `${t ? `NG0${t}: ` : ""}${e}`
                }(t, e)), this.code = t
            }
        }

        function at(t) {
            return "string" == typeof t ? t : null == t ? "" : String(t)
        }

        function ct(t) {
            return "function" == typeof t ? t.name || t.toString() : "object" == typeof t && null != t && "function" == typeof t.type ? t.type.name || t.type.toString() : at(t)
        }

        function lt(t, e) {
            const n = e ? ` in ${e}` : "";
            throw new ot("201", `No provider for ${ct(t)} found${n}`)
        }

        function ut(t) {
            return {token: t.token, providedIn: t.providedIn || null, factory: t.factory, value: void 0}
        }

        function ht(t) {
            return {providers: t.providers || [], imports: t.imports || []}
        }

        function dt(t) {
            return ft(t, gt) || ft(t, yt)
        }

        function ft(t, e) {
            return t.hasOwnProperty(e) ? t[e] : null
        }

        function pt(t) {
            return t && (t.hasOwnProperty(mt) || t.hasOwnProperty(vt)) ? t[mt] : null
        }

        const gt = J({"\u0275prov": J}), mt = J({"\u0275inj": J}), yt = J({ngInjectableDef: J}),
            vt = J({ngInjectorDef: J});
        var bt = (() => ((bt = bt || {})[bt.Default = 0] = "Default", bt[bt.Host = 1] = "Host", bt[bt.Self = 2] = "Self", bt[bt.SkipSelf = 4] = "SkipSelf", bt[bt.Optional = 8] = "Optional", bt))();
        let _t;

        function wt(t) {
            const e = _t;
            return _t = t, e
        }

        function Ct(t, e, n) {
            const r = dt(t);
            return r && "root" == r.providedIn ? void 0 === r.value ? r.value = r.factory() : r.value : n & bt.Optional ? null : void 0 !== e ? e : void lt(tt(t), "Injector")
        }

        function St(t) {
            return {toString: t}.toString()
        }

        var xt = (() => ((xt = xt || {})[xt.OnPush = 0] = "OnPush", xt[xt.Default = 1] = "Default", xt))(),
            kt = (() => ((kt = kt || {})[kt.Emulated = 0] = "Emulated", kt[kt.None = 2] = "None", kt[kt.ShadowDom = 3] = "ShadowDom", kt))();
        const Tt = "undefined" != typeof globalThis && globalThis, It = "undefined" != typeof window && window,
            Et = "undefined" != typeof self && "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope && self,
            Ot = "undefined" != typeof global && global, At = Tt || Ot || It || Et, Rt = {}, Lt = [],
            Pt = J({"\u0275cmp": J}), jt = J({"\u0275dir": J}), Dt = J({"\u0275pipe": J}), Mt = J({"\u0275mod": J}),
            Nt = J({"\u0275loc": J}), Ht = J({"\u0275fac": J}), Ft = J({__NG_ELEMENT_ID__: J});
        let Ut = 0;

        function $t(t) {
            return St(() => {
                const e = {}, n = {
                    type: t.type,
                    providersResolver: null,
                    decls: t.decls,
                    vars: t.vars,
                    factory: null,
                    template: t.template || null,
                    consts: t.consts || null,
                    ngContentSelectors: t.ngContentSelectors,
                    hostBindings: t.hostBindings || null,
                    hostVars: t.hostVars || 0,
                    hostAttrs: t.hostAttrs || null,
                    contentQueries: t.contentQueries || null,
                    declaredInputs: e,
                    inputs: null,
                    outputs: null,
                    exportAs: t.exportAs || null,
                    onPush: t.changeDetection === xt.OnPush,
                    directiveDefs: null,
                    pipeDefs: null,
                    selectors: t.selectors || Lt,
                    viewQuery: t.viewQuery || null,
                    features: t.features || null,
                    data: t.data || {},
                    encapsulation: t.encapsulation || kt.Emulated,
                    id: "c",
                    styles: t.styles || Lt,
                    _: null,
                    setInput: null,
                    schemas: t.schemas || null,
                    tView: null
                }, r = t.directives, s = t.features, i = t.pipes;
                return n.id += Ut++, n.inputs = Wt(t.inputs, e), n.outputs = Wt(t.outputs), s && s.forEach(t => t(n)), n.directiveDefs = r ? () => ("function" == typeof r ? r() : r).map(Vt) : null, n.pipeDefs = i ? () => ("function" == typeof i ? i() : i).map(zt) : null, n
            })
        }

        function Vt(t) {
            return Qt(t) || function (t) {
                return t[jt] || null
            }(t)
        }

        function zt(t) {
            return function (t) {
                return t[Dt] || null
            }(t)
        }

        const qt = {};

        function Bt(t) {
            return St(() => {
                const e = {
                    type: t.type,
                    bootstrap: t.bootstrap || Lt,
                    declarations: t.declarations || Lt,
                    imports: t.imports || Lt,
                    exports: t.exports || Lt,
                    transitiveCompileScopes: null,
                    schemas: t.schemas || null,
                    id: t.id || null
                };
                return null != t.id && (qt[t.id] = t.type), e
            })
        }

        function Wt(t, e) {
            if (null == t) return Rt;
            const n = {};
            for (const r in t) if (t.hasOwnProperty(r)) {
                let s = t[r], i = s;
                Array.isArray(s) && (i = s[1], s = s[0]), n[s] = r, e && (e[s] = i)
            }
            return n
        }

        const Gt = $t;

        function Zt(t) {
            return {
                type: t.type,
                name: t.name,
                factory: null,
                pure: !1 !== t.pure,
                onDestroy: t.type.prototype.ngOnDestroy || null
            }
        }

        function Qt(t) {
            return t[Pt] || null
        }

        function Kt(t, e) {
            const n = t[Mt] || null;
            if (!n && !0 === e) throw new Error(`Type ${tt(t)} does not have '\u0275mod' property.`);
            return n
        }

        const Yt = 20, Jt = 10;

        function Xt(t) {
            return Array.isArray(t) && "object" == typeof t[1]
        }

        function te(t) {
            return Array.isArray(t) && !0 === t[1]
        }

        function ee(t) {
            return 0 != (8 & t.flags)
        }

        function ne(t) {
            return 2 == (2 & t.flags)
        }

        function re(t) {
            return 1 == (1 & t.flags)
        }

        function se(t) {
            return null !== t.template
        }

        function ie(t, e) {
            return t.hasOwnProperty(Ht) ? t[Ht] : null
        }

        class oe {
            constructor(t, e, n) {
                this.previousValue = t, this.currentValue = e, this.firstChange = n
            }

            isFirstChange() {
                return this.firstChange
            }
        }

        function ae() {
            return ce
        }

        function ce(t) {
            return t.type.prototype.ngOnChanges && (t.setInput = ue), le
        }

        function le() {
            const t = he(this), e = null == t ? void 0 : t.current;
            if (e) {
                const n = t.previous;
                if (n === Rt) t.previous = e; else for (let t in e) n[t] = e[t];
                t.current = null, this.ngOnChanges(e)
            }
        }

        function ue(t, e, n, r) {
            const s = he(t) || function (t, e) {
                    return t.__ngSimpleChanges__ = e
                }(t, {previous: Rt, current: null}), i = s.current || (s.current = {}), o = s.previous,
                a = this.declaredInputs[n], c = o[a];
            i[a] = new oe(c && c.currentValue, e, o === Rt), t[r] = e
        }

        function he(t) {
            return t.__ngSimpleChanges__ || null
        }

        ae.ngInherit = !0;
        const de = "http://www.w3.org/2000/svg";
        let fe;

        function pe() {
            return void 0 !== fe ? fe : "undefined" != typeof document ? document : void 0
        }

        function ge(t) {
            return !!t.listen
        }

        const me = {createRenderer: (t, e) => pe()};

        function ye(t) {
            for (; Array.isArray(t);) t = t[0];
            return t
        }

        function ve(t, e) {
            return ye(e[t])
        }

        function be(t, e) {
            return ye(e[t.index])
        }

        function _e(t, e) {
            return t.data[e]
        }

        function we(t, e) {
            return t[e]
        }

        function Ce(t, e) {
            const n = e[t];
            return Xt(n) ? n : n[0]
        }

        function Se(t) {
            return 4 == (4 & t[2])
        }

        function xe(t) {
            return 128 == (128 & t[2])
        }

        function ke(t, e) {
            return null == e ? null : t[e]
        }

        function Te(t) {
            t[18] = 0
        }

        function Ie(t, e) {
            t[5] += e;
            let n = t, r = t[3];
            for (; null !== r && (1 === e && 1 === n[5] || -1 === e && 0 === n[5]);) r[5] += e, n = r, r = r[3]
        }

        const Ee = {lFrame: Ke(null), bindingsEnabled: !0, isInCheckNoChangesMode: !1};

        function Oe() {
            return Ee.bindingsEnabled
        }

        function Ae() {
            return Ee.lFrame.lView
        }

        function Re() {
            return Ee.lFrame.tView
        }

        function Le(t) {
            return Ee.lFrame.contextLView = t, t[8]
        }

        function Pe() {
            let t = je();
            for (; null !== t && 64 === t.type;) t = t.parent;
            return t
        }

        function je() {
            return Ee.lFrame.currentTNode
        }

        function De(t, e) {
            const n = Ee.lFrame;
            n.currentTNode = t, n.isParent = e
        }

        function Me() {
            return Ee.lFrame.isParent
        }

        function Ne() {
            Ee.lFrame.isParent = !1
        }

        function He() {
            return Ee.isInCheckNoChangesMode
        }

        function Fe(t) {
            Ee.isInCheckNoChangesMode = t
        }

        function Ue() {
            const t = Ee.lFrame;
            let e = t.bindingRootIndex;
            return -1 === e && (e = t.bindingRootIndex = t.tView.bindingStartIndex), e
        }

        function $e() {
            return Ee.lFrame.bindingIndex++
        }

        function Ve(t, e) {
            const n = Ee.lFrame;
            n.bindingIndex = n.bindingRootIndex = t, ze(e)
        }

        function ze(t) {
            Ee.lFrame.currentDirectiveIndex = t
        }

        function qe() {
            return Ee.lFrame.currentQueryIndex
        }

        function Be(t) {
            Ee.lFrame.currentQueryIndex = t
        }

        function We(t) {
            const e = t[1];
            return 2 === e.type ? e.declTNode : 1 === e.type ? t[6] : null
        }

        function Ge(t, e, n) {
            if (n & bt.SkipSelf) {
                let r = e, s = t;
                for (; r = r.parent, !(null !== r || n & bt.Host || (r = We(s), null === r) || (s = s[15], 10 & r.type));) ;
                if (null === r) return !1;
                e = r, t = s
            }
            const r = Ee.lFrame = Qe();
            return r.currentTNode = e, r.lView = t, !0
        }

        function Ze(t) {
            const e = Qe(), n = t[1];
            Ee.lFrame = e, e.currentTNode = n.firstChild, e.lView = t, e.tView = n, e.contextLView = t, e.bindingIndex = n.bindingStartIndex, e.inI18n = !1
        }

        function Qe() {
            const t = Ee.lFrame, e = null === t ? null : t.child;
            return null === e ? Ke(t) : e
        }

        function Ke(t) {
            const e = {
                currentTNode: null,
                isParent: !0,
                lView: null,
                tView: null,
                selectedIndex: -1,
                contextLView: null,
                elementDepthCount: 0,
                currentNamespace: null,
                currentDirectiveIndex: -1,
                bindingRootIndex: -1,
                bindingIndex: -1,
                currentQueryIndex: 0,
                parent: t,
                child: null,
                inI18n: !1
            };
            return null !== t && (t.child = e), e
        }

        function Ye() {
            const t = Ee.lFrame;
            return Ee.lFrame = t.parent, t.currentTNode = null, t.lView = null, t
        }

        const Je = Ye;

        function Xe() {
            const t = Ye();
            t.isParent = !0, t.tView = null, t.selectedIndex = -1, t.contextLView = null, t.elementDepthCount = 0, t.currentDirectiveIndex = -1, t.currentNamespace = null, t.bindingRootIndex = -1, t.bindingIndex = -1, t.currentQueryIndex = 0
        }

        function tn() {
            return Ee.lFrame.selectedIndex
        }

        function en(t) {
            Ee.lFrame.selectedIndex = t
        }

        function nn() {
            const t = Ee.lFrame;
            return _e(t.tView, t.selectedIndex)
        }

        function rn() {
            Ee.lFrame.currentNamespace = de
        }

        function sn(t, e) {
            for (let n = e.directiveStart, r = e.directiveEnd; n < r; n++) {
                const e = t.data[n].type.prototype, {
                    ngAfterContentInit: r,
                    ngAfterContentChecked: s,
                    ngAfterViewInit: i,
                    ngAfterViewChecked: o,
                    ngOnDestroy: a
                } = e;
                r && (t.contentHooks || (t.contentHooks = [])).push(-n, r), s && ((t.contentHooks || (t.contentHooks = [])).push(n, s), (t.contentCheckHooks || (t.contentCheckHooks = [])).push(n, s)), i && (t.viewHooks || (t.viewHooks = [])).push(-n, i), o && ((t.viewHooks || (t.viewHooks = [])).push(n, o), (t.viewCheckHooks || (t.viewCheckHooks = [])).push(n, o)), null != a && (t.destroyHooks || (t.destroyHooks = [])).push(n, a)
            }
        }

        function on(t, e, n) {
            ln(t, e, 3, n)
        }

        function an(t, e, n, r) {
            (3 & t[2]) === n && ln(t, e, n, r)
        }

        function cn(t, e) {
            let n = t[2];
            (3 & n) === e && (n &= 2047, n += 1, t[2] = n)
        }

        function ln(t, e, n, r) {
            const s = null != r ? r : -1, i = e.length - 1;
            let o = 0;
            for (let a = void 0 !== r ? 65535 & t[18] : 0; a < i; a++) if ("number" == typeof e[a + 1]) {
                if (o = e[a], null != r && o >= r) break
            } else e[a] < 0 && (t[18] += 65536), (o < s || -1 == s) && (un(t, n, e, a), t[18] = (4294901760 & t[18]) + a + 2), a++
        }

        function un(t, e, n, r) {
            const s = n[r] < 0, i = n[r + 1], o = t[s ? -n[r] : n[r]];
            if (s) {
                if (t[2] >> 11 < t[18] >> 16 && (3 & t[2]) === e) {
                    t[2] += 2048;
                    try {
                        i.call(o)
                    } finally {
                    }
                }
            } else try {
                i.call(o)
            } finally {
            }
        }

        const hn = -1;

        class dn {
            constructor(t, e, n) {
                this.factory = t, this.resolving = !1, this.canSeeViewProviders = e, this.injectImpl = n
            }
        }

        function fn(t, e, n) {
            const r = ge(t);
            let s = 0;
            for (; s < n.length;) {
                const i = n[s];
                if ("number" == typeof i) {
                    if (0 !== i) break;
                    s++;
                    const o = n[s++], a = n[s++], c = n[s++];
                    r ? t.setAttribute(e, a, c, o) : e.setAttributeNS(o, a, c)
                } else {
                    const o = i, a = n[++s];
                    gn(o) ? r && t.setProperty(e, o, a) : r ? t.setAttribute(e, o, a) : e.setAttribute(o, a), s++
                }
            }
            return s
        }

        function pn(t) {
            return 3 === t || 4 === t || 6 === t
        }

        function gn(t) {
            return 64 === t.charCodeAt(0)
        }

        function mn(t, e) {
            if (null === e || 0 === e.length) ; else if (null === t || 0 === t.length) t = e.slice(); else {
                let n = -1;
                for (let r = 0; r < e.length; r++) {
                    const s = e[r];
                    "number" == typeof s ? n = s : 0 === n || yn(t, n, s, null, -1 === n || 2 === n ? e[++r] : null)
                }
            }
            return t
        }

        function yn(t, e, n, r, s) {
            let i = 0, o = t.length;
            if (-1 === e) o = -1; else for (; i < t.length;) {
                const n = t[i++];
                if ("number" == typeof n) {
                    if (n === e) {
                        o = -1;
                        break
                    }
                    if (n > e) {
                        o = i - 1;
                        break
                    }
                }
            }
            for (; i < t.length;) {
                const e = t[i];
                if ("number" == typeof e) break;
                if (e === n) {
                    if (null === r) return void (null !== s && (t[i + 1] = s));
                    if (r === t[i + 1]) return void (t[i + 2] = s)
                }
                i++, null !== r && i++, null !== s && i++
            }
            -1 !== o && (t.splice(o, 0, e), i = o + 1), t.splice(i++, 0, n), null !== r && t.splice(i++, 0, r), null !== s && t.splice(i++, 0, s)
        }

        function vn(t) {
            return t !== hn
        }

        function bn(t) {
            return 32767 & t
        }

        function _n(t, e) {
            let n = t >> 16, r = e;
            for (; n > 0;) r = r[15], n--;
            return r
        }

        let wn = !0;

        function Cn(t) {
            const e = wn;
            return wn = t, e
        }

        let Sn = 0;

        function xn(t, e) {
            const n = Tn(t, e);
            if (-1 !== n) return n;
            const r = e[1];
            r.firstCreatePass && (t.injectorIndex = e.length, kn(r.data, t), kn(e, null), kn(r.blueprint, null));
            const s = In(t, e), i = t.injectorIndex;
            if (vn(s)) {
                const t = bn(s), n = _n(s, e), r = n[1].data;
                for (let s = 0; s < 8; s++) e[i + s] = n[t + s] | r[t + s]
            }
            return e[i + 8] = s, i
        }

        function kn(t, e) {
            t.push(0, 0, 0, 0, 0, 0, 0, 0, e)
        }

        function Tn(t, e) {
            return -1 === t.injectorIndex || t.parent && t.parent.injectorIndex === t.injectorIndex || null === e[t.injectorIndex + 8] ? -1 : t.injectorIndex
        }

        function In(t, e) {
            if (t.parent && -1 !== t.parent.injectorIndex) return t.parent.injectorIndex;
            let n = 0, r = null, s = e;
            for (; null !== s;) {
                const t = s[1], e = t.type;
                if (r = 2 === e ? t.declTNode : 1 === e ? s[6] : null, null === r) return hn;
                if (n++, s = s[15], -1 !== r.injectorIndex) return r.injectorIndex | n << 16
            }
            return hn
        }

        function En(t, e, n) {
            !function (t, e, n) {
                let r;
                "string" == typeof n ? r = n.charCodeAt(0) || 0 : n.hasOwnProperty(Ft) && (r = n[Ft]), null == r && (r = n[Ft] = Sn++);
                const s = 255 & r;
                e.data[t + (s >> 5)] |= 1 << s
            }(t, e, n)
        }

        function On(t, e, n) {
            if (n & bt.Optional) return t;
            lt(e, "NodeInjector")
        }

        function An(t, e, n, r) {
            if (n & bt.Optional && void 0 === r && (r = null), 0 == (n & (bt.Self | bt.Host))) {
                const s = t[9], i = wt(void 0);
                try {
                    return s ? s.get(e, r, n & bt.Optional) : Ct(e, r, n & bt.Optional)
                } finally {
                    wt(i)
                }
            }
            return On(r, e, n)
        }

        function Rn(t, e, n, r = bt.Default, s) {
            if (null !== t) {
                const i = function (t) {
                    if ("string" == typeof t) return t.charCodeAt(0) || 0;
                    const e = t.hasOwnProperty(Ft) ? t[Ft] : void 0;
                    return "number" == typeof e ? e >= 0 ? 255 & e : Pn : e
                }(n);
                if ("function" == typeof i) {
                    if (!Ge(e, t, r)) return r & bt.Host ? On(s, n, r) : An(e, n, r, s);
                    try {
                        const t = i(r);
                        if (null != t || r & bt.Optional) return t;
                        lt(n)
                    } finally {
                        Je()
                    }
                } else if ("number" == typeof i) {
                    let s = null, o = Tn(t, e), a = hn, c = r & bt.Host ? e[16][6] : null;
                    for ((-1 === o || r & bt.SkipSelf) && (a = -1 === o ? In(t, e) : e[o + 8], a !== hn && Hn(r, !1) ? (s = e[1], o = bn(a), e = _n(a, e)) : o = -1); -1 !== o;) {
                        const t = e[1];
                        if (Nn(i, o, t.data)) {
                            const t = jn(o, e, n, s, r, c);
                            if (t !== Ln) return t
                        }
                        a = e[o + 8], a !== hn && Hn(r, e[1].data[o + 8] === c) && Nn(i, o, e) ? (s = t, o = bn(a), e = _n(a, e)) : o = -1
                    }
                }
            }
            return An(e, n, r, s)
        }

        const Ln = {};

        function Pn() {
            return new Fn(Pe(), Ae())
        }

        function jn(t, e, n, r, s, i) {
            const o = e[1], a = o.data[t + 8],
                c = Dn(a, o, n, null == r ? ne(a) && wn : r != o && 0 != (3 & a.type), s & bt.Host && i === a);
            return null !== c ? Mn(e, o, c, a) : Ln
        }

        function Dn(t, e, n, r, s) {
            const i = t.providerIndexes, o = e.data, a = 1048575 & i, c = t.directiveStart, l = i >> 20,
                u = s ? a + l : t.directiveEnd;
            for (let h = r ? a : a + l; h < u; h++) {
                const t = o[h];
                if (h < c && n === t || h >= c && t.type === n) return h
            }
            if (s) {
                const t = o[c];
                if (t && se(t) && t.type === n) return c
            }
            return null
        }

        function Mn(t, e, n, r) {
            let s = t[n];
            const i = e.data;
            if (s instanceof dn) {
                const o = s;
                o.resolving && function (t, e) {
                    throw new ot("200", `Circular dependency in DI detected for ${t}`)
                }(ct(i[n]));
                const a = Cn(o.canSeeViewProviders);
                o.resolving = !0;
                const c = o.injectImpl ? wt(o.injectImpl) : null;
                Ge(t, r, bt.Default);
                try {
                    s = t[n] = o.factory(void 0, i, t, r), e.firstCreatePass && n >= r.directiveStart && function (t, e, n) {
                        const {ngOnChanges: r, ngOnInit: s, ngDoCheck: i} = e.type.prototype;
                        if (r) {
                            const r = ce(e);
                            (n.preOrderHooks || (n.preOrderHooks = [])).push(t, r), (n.preOrderCheckHooks || (n.preOrderCheckHooks = [])).push(t, r)
                        }
                        s && (n.preOrderHooks || (n.preOrderHooks = [])).push(0 - t, s), i && ((n.preOrderHooks || (n.preOrderHooks = [])).push(t, i), (n.preOrderCheckHooks || (n.preOrderCheckHooks = [])).push(t, i))
                    }(n, i[n], e)
                } finally {
                    null !== c && wt(c), Cn(a), o.resolving = !1, Je()
                }
            }
            return s
        }

        function Nn(t, e, n) {
            return !!(n[e + (t >> 5)] & 1 << t)
        }

        function Hn(t, e) {
            return !(t & bt.Self || t & bt.Host && e)
        }

        class Fn {
            constructor(t, e) {
                this._tNode = t, this._lView = e
            }

            get(t, e) {
                return Rn(this._tNode, this._lView, t, void 0, e)
            }
        }

        function Un(t) {
            return St(() => {
                const e = t.prototype.constructor, n = e[Ht] || $n(e), r = Object.prototype;
                let s = Object.getPrototypeOf(t.prototype).constructor;
                for (; s && s !== r;) {
                    const t = s[Ht] || $n(s);
                    if (t && t !== n) return t;
                    s = Object.getPrototypeOf(s)
                }
                return t => new t
            })
        }

        function $n(t) {
            return it(t) ? () => {
                const e = $n(st(t));
                return e && e()
            } : ie(t)
        }

        function Vn(t) {
            return function (t, e) {
                if ("class" === e) return t.classes;
                if ("style" === e) return t.styles;
                const n = t.attrs;
                if (n) {
                    const t = n.length;
                    let r = 0;
                    for (; r < t;) {
                        const s = n[r];
                        if (pn(s)) break;
                        if (0 === s) r += 2; else if ("number" == typeof s) for (r++; r < t && "string" == typeof n[r];) r++; else {
                            if (s === e) return n[r + 1];
                            r += 2
                        }
                    }
                }
                return null
            }(Pe(), t)
        }

        const zn = "__parameters__";

        function qn(t, e, n) {
            return St(() => {
                const r = function (t) {
                    return function (...e) {
                        if (t) {
                            const n = t(...e);
                            for (const t in n) this[t] = n[t]
                        }
                    }
                }(e);

                function s(...t) {
                    if (this instanceof s) return r.apply(this, t), this;
                    const e = new s(...t);
                    return n.annotation = e, n;

                    function n(t, n, r) {
                        const s = t.hasOwnProperty(zn) ? t[zn] : Object.defineProperty(t, zn, {value: []})[zn];
                        for (; s.length <= r;) s.push(null);
                        return (s[r] = s[r] || []).push(e), t
                    }
                }

                return n && (s.prototype = Object.create(n.prototype)), s.prototype.ngMetadataName = t, s.annotationCls = s, s
            })
        }

        class Bn {
            constructor(t, e) {
                this._desc = t, this.ngMetadataName = "InjectionToken", this.\u0275prov = void 0, "number" == typeof e ? this.__NG_ELEMENT_ID__ = e : void 0 !== e && (this.\u0275prov = ut({
                    token: this,
                    providedIn: e.providedIn || "root",
                    factory: e.factory
                }))
            }

            toString() {
                return `InjectionToken ${this._desc}`
            }
        }

        const Wn = new Bn("AnalyzeForEntryComponents"), Gn = Function;

        function Zn(t, e) {
            void 0 === e && (e = t);
            for (let n = 0; n < t.length; n++) {
                let r = t[n];
                Array.isArray(r) ? (e === t && (e = t.slice(0, n)), Zn(r, e)) : e !== t && e.push(r)
            }
            return e
        }

        function Qn(t, e) {
            t.forEach(t => Array.isArray(t) ? Qn(t, e) : e(t))
        }

        function Kn(t, e, n) {
            e >= t.length ? t.push(n) : t.splice(e, 0, n)
        }

        function Yn(t, e) {
            return e >= t.length - 1 ? t.pop() : t.splice(e, 1)[0]
        }

        function Jn(t, e, n) {
            let r = tr(t, e);
            return r >= 0 ? t[1 | r] = n : (r = ~r, function (t, e, n, r) {
                let s = t.length;
                if (s == e) t.push(n, r); else if (1 === s) t.push(r, t[0]), t[0] = n; else {
                    for (s--, t.push(t[s - 1], t[s]); s > e;) t[s] = t[s - 2], s--;
                    t[e] = n, t[e + 1] = r
                }
            }(t, r, e, n)), r
        }

        function Xn(t, e) {
            const n = tr(t, e);
            if (n >= 0) return t[1 | n]
        }

        function tr(t, e) {
            return function (t, e, n) {
                let r = 0, s = t.length >> 1;
                for (; s !== r;) {
                    const n = r + (s - r >> 1), i = t[n << 1];
                    if (e === i) return n << 1;
                    i > e ? s = n : r = n + 1
                }
                return ~(s << 1)
            }(t, e)
        }

        const er = {}, nr = /\n/gm, rr = "__source", sr = J({provide: String, useValue: J});
        let ir;

        function or(t) {
            const e = ir;
            return ir = t, e
        }

        function ar(t, e = bt.Default) {
            if (void 0 === ir) throw new Error("inject() must be called from an injection context");
            return null === ir ? Ct(t, void 0, e) : ir.get(t, e & bt.Optional ? null : void 0, e)
        }

        function cr(t, e = bt.Default) {
            return (_t || ar)(st(t), e)
        }

        function lr(t) {
            const e = [];
            for (let n = 0; n < t.length; n++) {
                const r = st(t[n]);
                if (Array.isArray(r)) {
                    if (0 === r.length) throw new Error("Arguments array must have arguments.");
                    let t, n = bt.Default;
                    for (let e = 0; e < r.length; e++) {
                        const s = r[e], i = s.__NG_DI_FLAG__;
                        "number" == typeof i ? -1 === i ? t = s.token : n |= i : t = s
                    }
                    e.push(cr(t, n))
                } else e.push(cr(r))
            }
            return e
        }

        function ur(t, e) {
            return t.__NG_DI_FLAG__ = e, t.prototype.__NG_DI_FLAG__ = e, t
        }

        const hr = ur(qn("Inject", t => ({token: t})), -1), dr = ur(qn("Optional"), 8), fr = ur(qn("SkipSelf"), 4);
        let pr, gr;

        function mr(t) {
            var e;
            return (null === (e = function () {
                if (void 0 === pr && (pr = null, At.trustedTypes)) try {
                    pr = At.trustedTypes.createPolicy("angular", {
                        createHTML: t => t,
                        createScript: t => t,
                        createScriptURL: t => t
                    })
                } catch (e) {
                }
                return pr
            }()) || void 0 === e ? void 0 : e.createHTML(t)) || t
        }

        function yr(t) {
            var e;
            return (null === (e = function () {
                if (void 0 === gr && (gr = null, At.trustedTypes)) try {
                    gr = At.trustedTypes.createPolicy("angular#unsafe-bypass", {
                        createHTML: t => t,
                        createScript: t => t,
                        createScriptURL: t => t
                    })
                } catch (e) {
                }
                return gr
            }()) || void 0 === e ? void 0 : e.createHTML(t)) || t
        }

        class vr {
            constructor(t) {
                this.changingThisBreaksApplicationSecurity = t
            }

            toString() {
                return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see https://g.co/ng/security#xss)`
            }
        }

        class br extends vr {
            getTypeName() {
                return "HTML"
            }
        }

        class _r extends vr {
            getTypeName() {
                return "Style"
            }
        }

        class wr extends vr {
            getTypeName() {
                return "Script"
            }
        }

        class Cr extends vr {
            getTypeName() {
                return "URL"
            }
        }

        class Sr extends vr {
            getTypeName() {
                return "ResourceURL"
            }
        }

        function xr(t) {
            return t instanceof vr ? t.changingThisBreaksApplicationSecurity : t
        }

        function kr(t, e) {
            const n = Tr(t);
            if (null != n && n !== e) {
                if ("ResourceURL" === n && "URL" === e) return !0;
                throw new Error(`Required a safe ${e}, got a ${n} (see https://g.co/ng/security#xss)`)
            }
            return n === e
        }

        function Tr(t) {
            return t instanceof vr && t.getTypeName() || null
        }

        class Ir {
            constructor(t) {
                this.inertDocumentHelper = t
            }

            getInertBodyElement(t) {
                t = "<body><remove></remove>" + t;
                try {
                    const e = (new window.DOMParser).parseFromString(mr(t), "text/html").body;
                    return null === e ? this.inertDocumentHelper.getInertBodyElement(t) : (e.removeChild(e.firstChild), e)
                } catch (e) {
                    return null
                }
            }
        }

        class Er {
            constructor(t) {
                if (this.defaultDoc = t, this.inertDocument = this.defaultDoc.implementation.createHTMLDocument("sanitization-inert"), null == this.inertDocument.body) {
                    const t = this.inertDocument.createElement("html");
                    this.inertDocument.appendChild(t);
                    const e = this.inertDocument.createElement("body");
                    t.appendChild(e)
                }
            }

            getInertBodyElement(t) {
                const e = this.inertDocument.createElement("template");
                if ("content" in e) return e.innerHTML = mr(t), e;
                const n = this.inertDocument.createElement("body");
                return n.innerHTML = mr(t), this.defaultDoc.documentMode && this.stripCustomNsAttrs(n), n
            }

            stripCustomNsAttrs(t) {
                const e = t.attributes;
                for (let r = e.length - 1; 0 < r; r--) {
                    const n = e.item(r).name;
                    "xmlns:ns1" !== n && 0 !== n.indexOf("ns1:") || t.removeAttribute(n)
                }
                let n = t.firstChild;
                for (; n;) n.nodeType === Node.ELEMENT_NODE && this.stripCustomNsAttrs(n), n = n.nextSibling
            }
        }

        const Or = /^(?:(?:https?|mailto|ftp|tel|file|sms):|[^&:/?#]*(?:[/?#]|$))/gi,
            Ar = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+\/]+=*$/i;

        function Rr(t) {
            return (t = String(t)).match(Or) || t.match(Ar) ? t : "unsafe:" + t
        }

        function Lr(t) {
            const e = {};
            for (const n of t.split(",")) e[n] = !0;
            return e
        }

        function Pr(...t) {
            const e = {};
            for (const n of t) for (const t in n) n.hasOwnProperty(t) && (e[t] = !0);
            return e
        }

        const jr = Lr("area,br,col,hr,img,wbr"), Dr = Lr("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),
            Mr = Lr("rp,rt"), Nr = Pr(Mr, Dr),
            Hr = Pr(jr, Pr(Dr, Lr("address,article,aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul")), Pr(Mr, Lr("a,abbr,acronym,audio,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video")), Nr),
            Fr = Lr("background,cite,href,itemtype,longdesc,poster,src,xlink:href"), Ur = Lr("srcset"),
            $r = Pr(Fr, Ur, Lr("abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,scope,scrolling,shape,size,sizes,span,srclang,start,summary,tabindex,target,title,translate,type,usemap,valign,value,vspace,width"), Lr("aria-activedescendant,aria-atomic,aria-autocomplete,aria-busy,aria-checked,aria-colcount,aria-colindex,aria-colspan,aria-controls,aria-current,aria-describedby,aria-details,aria-disabled,aria-dropeffect,aria-errormessage,aria-expanded,aria-flowto,aria-grabbed,aria-haspopup,aria-hidden,aria-invalid,aria-keyshortcuts,aria-label,aria-labelledby,aria-level,aria-live,aria-modal,aria-multiline,aria-multiselectable,aria-orientation,aria-owns,aria-placeholder,aria-posinset,aria-pressed,aria-readonly,aria-relevant,aria-required,aria-roledescription,aria-rowcount,aria-rowindex,aria-rowspan,aria-selected,aria-setsize,aria-sort,aria-valuemax,aria-valuemin,aria-valuenow,aria-valuetext")),
            Vr = Lr("script,style,template");

        class zr {
            constructor() {
                this.sanitizedSomething = !1, this.buf = []
            }

            sanitizeChildren(t) {
                let e = t.firstChild, n = !0;
                for (; e;) if (e.nodeType === Node.ELEMENT_NODE ? n = this.startElement(e) : e.nodeType === Node.TEXT_NODE ? this.chars(e.nodeValue) : this.sanitizedSomething = !0, n && e.firstChild) e = e.firstChild; else for (; e;) {
                    e.nodeType === Node.ELEMENT_NODE && this.endElement(e);
                    let t = this.checkClobberedElement(e, e.nextSibling);
                    if (t) {
                        e = t;
                        break
                    }
                    e = this.checkClobberedElement(e, e.parentNode)
                }
                return this.buf.join("")
            }

            startElement(t) {
                const e = t.nodeName.toLowerCase();
                if (!Hr.hasOwnProperty(e)) return this.sanitizedSomething = !0, !Vr.hasOwnProperty(e);
                this.buf.push("<"), this.buf.push(e);
                const n = t.attributes;
                for (let s = 0; s < n.length; s++) {
                    const t = n.item(s), e = t.name, i = e.toLowerCase();
                    if (!$r.hasOwnProperty(i)) {
                        this.sanitizedSomething = !0;
                        continue
                    }
                    let o = t.value;
                    Fr[i] && (o = Rr(o)), Ur[i] && (r = o, o = (r = String(r)).split(",").map(t => Rr(t.trim())).join(", ")), this.buf.push(" ", e, '="', Wr(o), '"')
                }
                var r;
                return this.buf.push(">"), !0
            }

            endElement(t) {
                const e = t.nodeName.toLowerCase();
                Hr.hasOwnProperty(e) && !jr.hasOwnProperty(e) && (this.buf.push("</"), this.buf.push(e), this.buf.push(">"))
            }

            chars(t) {
                this.buf.push(Wr(t))
            }

            checkClobberedElement(t, e) {
                if (e && (t.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_CONTAINED_BY) === Node.DOCUMENT_POSITION_CONTAINED_BY) throw new Error(`Failed to sanitize html because the element is clobbered: ${t.outerHTML}`);
                return e
            }
        }

        const qr = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g, Br = /([^\#-~ |!])/g;

        function Wr(t) {
            return t.replace(/&/g, "&amp;").replace(qr, function (t) {
                return "&#" + (1024 * (t.charCodeAt(0) - 55296) + (t.charCodeAt(1) - 56320) + 65536) + ";"
            }).replace(Br, function (t) {
                return "&#" + t.charCodeAt(0) + ";"
            }).replace(/</g, "&lt;").replace(/>/g, "&gt;")
        }

        let Gr;

        function Zr(t, e) {
            let n = null;
            try {
                Gr = Gr || function (t) {
                    const e = new Er(t);
                    return function () {
                        try {
                            return !!(new window.DOMParser).parseFromString(mr(""), "text/html")
                        } catch (t) {
                            return !1
                        }
                    }() ? new Ir(e) : e
                }(t);
                let r = e ? String(e) : "";
                n = Gr.getInertBodyElement(r);
                let s = 5, i = r;
                do {
                    if (0 === s) throw new Error("Failed to sanitize html because the input is unstable");
                    s--, r = i, i = n.innerHTML, n = Gr.getInertBodyElement(r)
                } while (r !== i);
                return mr((new zr).sanitizeChildren(Qr(n) || n))
            } finally {
                if (n) {
                    const t = Qr(n) || n;
                    for (; t.firstChild;) t.removeChild(t.firstChild)
                }
            }
        }

        function Qr(t) {
            return "content" in t && function (t) {
                return t.nodeType === Node.ELEMENT_NODE && "TEMPLATE" === t.nodeName
            }(t) ? t.content : null
        }

        var Kr = (() => ((Kr = Kr || {})[Kr.NONE = 0] = "NONE", Kr[Kr.HTML = 1] = "HTML", Kr[Kr.STYLE = 2] = "STYLE", Kr[Kr.SCRIPT = 3] = "SCRIPT", Kr[Kr.URL = 4] = "URL", Kr[Kr.RESOURCE_URL = 5] = "RESOURCE_URL", Kr))();

        function Yr(t) {
            const e = Xr();
            return e ? yr(e.sanitize(Kr.HTML, t) || "") : kr(t, "HTML") ? yr(xr(t)) : Zr(pe(), at(t))
        }

        function Jr(t) {
            const e = Xr();
            return e ? e.sanitize(Kr.URL, t) || "" : kr(t, "URL") ? xr(t) : Rr(at(t))
        }

        function Xr() {
            const t = Ae();
            return t && t[12]
        }

        function ts(t, e) {
            t.__ngContext__ = e
        }

        function es(t) {
            const e = function (t) {
                return t.__ngContext__ || null
            }(t);
            return e ? Array.isArray(e) ? e : e.lView : null
        }

        function ns(t) {
            return t.ngDebugContext
        }

        function rs(t) {
            return t.ngOriginalError
        }

        function ss(t, ...e) {
            t.error(...e)
        }

        class is {
            constructor() {
                this._console = console
            }

            handleError(t) {
                const e = this._findOriginalError(t), n = this._findContext(t), r = function (t) {
                    return t.ngErrorLogger || ss
                }(t);
                r(this._console, "ERROR", t), e && r(this._console, "ORIGINAL ERROR", e), n && r(this._console, "ERROR CONTEXT", n)
            }

            _findContext(t) {
                return t ? ns(t) ? ns(t) : this._findContext(rs(t)) : null
            }

            _findOriginalError(t) {
                let e = rs(t);
                for (; e && rs(e);) e = rs(e);
                return e
            }
        }

        const os = (() => ("undefined" != typeof requestAnimationFrame && requestAnimationFrame || setTimeout).bind(At))();

        function as(t) {
            return t.ownerDocument
        }

        function cs(t) {
            return t instanceof Function ? t() : t
        }

        var ls = (() => ((ls = ls || {})[ls.Important = 1] = "Important", ls[ls.DashCase = 2] = "DashCase", ls))();

        function us(t, e) {
            return (void 0)(t, e)
        }

        function hs(t) {
            const e = t[3];
            return te(e) ? e[3] : e
        }

        function ds(t) {
            return ps(t[13])
        }

        function fs(t) {
            return ps(t[4])
        }

        function ps(t) {
            for (; null !== t && !te(t);) t = t[4];
            return t
        }

        function gs(t, e, n, r, s) {
            if (null != r) {
                let i, o = !1;
                te(r) ? i = r : Xt(r) && (o = !0, r = r[0]);
                const a = ye(r);
                0 === t && null !== n ? null == s ? Cs(e, n, a) : ws(e, n, a, s || null, !0) : 1 === t && null !== n ? ws(e, n, a, s || null, !0) : 2 === t ? function (t, e, n) {
                    const r = xs(t, e);
                    r && function (t, e, n, r) {
                        ge(t) ? t.removeChild(e, n, r) : e.removeChild(n)
                    }(t, r, e, n)
                }(e, a, o) : 3 === t && e.destroyNode(a), null != i && function (t, e, n, r, s) {
                    const i = n[7];
                    i !== ye(n) && gs(e, t, r, i, s);
                    for (let o = Jt; o < n.length; o++) {
                        const s = n[o];
                        As(s[1], s, t, e, r, i)
                    }
                }(e, t, i, n, s)
            }
        }

        function ms(t, e, n) {
            return ge(t) ? t.createElement(e, n) : null === n ? t.createElement(e) : t.createElementNS(n, e)
        }

        function ys(t, e) {
            const n = t[9], r = n.indexOf(e), s = e[3];
            1024 & e[2] && (e[2] &= -1025, Ie(s, -1)), n.splice(r, 1)
        }

        function vs(t, e) {
            if (t.length <= Jt) return;
            const n = Jt + e, r = t[n];
            if (r) {
                const i = r[17];
                null !== i && i !== t && ys(i, r), e > 0 && (t[n - 1][4] = r[4]);
                const o = Yn(t, Jt + e);
                As(r[1], s = r, s[11], 2, null, null), s[0] = null, s[6] = null;
                const a = o[19];
                null !== a && a.detachView(o[1]), r[3] = null, r[4] = null, r[2] &= -129
            }
            var s;
            return r
        }

        function bs(t, e) {
            if (!(256 & e[2])) {
                const n = e[11];
                ge(n) && n.destroyNode && As(t, e, n, 3, null, null), function (t) {
                    let e = t[13];
                    if (!e) return _s(t[1], t);
                    for (; e;) {
                        let n = null;
                        if (Xt(e)) n = e[13]; else {
                            const t = e[10];
                            t && (n = t)
                        }
                        if (!n) {
                            for (; e && !e[4] && e !== t;) Xt(e) && _s(e[1], e), e = e[3];
                            null === e && (e = t), Xt(e) && _s(e[1], e), n = e && e[4]
                        }
                        e = n
                    }
                }(e)
            }
        }

        function _s(t, e) {
            if (!(256 & e[2])) {
                e[2] &= -129, e[2] |= 256, function (t, e) {
                    let n;
                    if (null != t && null != (n = t.destroyHooks)) for (let r = 0; r < n.length; r += 2) {
                        const t = e[n[r]];
                        if (!(t instanceof dn)) {
                            const e = n[r + 1];
                            if (Array.isArray(e)) for (let n = 0; n < e.length; n += 2) {
                                const r = t[e[n]], s = e[n + 1];
                                try {
                                    s.call(r)
                                } finally {
                                }
                            } else try {
                                e.call(t)
                            } finally {
                            }
                        }
                    }
                }(t, e), function (t, e) {
                    const n = t.cleanup, r = e[7];
                    let s = -1;
                    if (null !== n) for (let i = 0; i < n.length - 1; i += 2) if ("string" == typeof n[i]) {
                        const t = n[i + 1], o = "function" == typeof t ? t(e) : ye(e[t]), a = r[s = n[i + 2]],
                            c = n[i + 3];
                        "boolean" == typeof c ? o.removeEventListener(n[i], a, c) : c >= 0 ? r[s = c]() : r[s = -c].unsubscribe(), i += 2
                    } else {
                        const t = r[s = n[i + 1]];
                        n[i].call(t)
                    }
                    if (null !== r) {
                        for (let t = s + 1; t < r.length; t++) (0, r[t])();
                        e[7] = null
                    }
                }(t, e), 1 === e[1].type && ge(e[11]) && e[11].destroy();
                const n = e[17];
                if (null !== n && te(e[3])) {
                    n !== e[3] && ys(n, e);
                    const r = e[19];
                    null !== r && r.detachView(t)
                }
            }
        }

        function ws(t, e, n, r, s) {
            ge(t) ? t.insertBefore(e, n, r, s) : e.insertBefore(n, r, s)
        }

        function Cs(t, e, n) {
            ge(t) ? t.appendChild(e, n) : e.appendChild(n)
        }

        function Ss(t, e, n, r, s) {
            null !== r ? ws(t, e, n, r, s) : Cs(t, e, n)
        }

        function xs(t, e) {
            return ge(t) ? t.parentNode(e) : e.parentNode
        }

        function ks(t, e, n, r) {
            const s = function (t, e, n) {
                return function (t, e, n) {
                    let r = e;
                    for (; null !== r && 40 & r.type;) r = (e = r).parent;
                    if (null === r) return n[0];
                    if (2 & r.flags) {
                        const e = t.data[r.directiveStart].encapsulation;
                        if (e === kt.None || e === kt.Emulated) return null
                    }
                    return be(r, n)
                }(t, e.parent, n)
            }(t, r, e), i = e[11], o = function (t, e, n) {
                return function (t, e, n) {
                    return 40 & t.type ? be(t, n) : null
                }(t, 0, n)
            }(r.parent || e[6], 0, e);
            if (null != s) if (Array.isArray(n)) for (let a = 0; a < n.length; a++) Ss(i, s, n[a], o, !1); else Ss(i, s, n, o, !1)
        }

        function Ts(t, e) {
            if (null !== e) {
                const n = e.type;
                if (3 & n) return be(e, t);
                if (4 & n) return Es(-1, t[e.index]);
                if (8 & n) {
                    const n = e.child;
                    if (null !== n) return Ts(t, n);
                    {
                        const n = t[e.index];
                        return te(n) ? Es(-1, n) : ye(n)
                    }
                }
                if (32 & n) return us(e, t)() || ye(t[e.index]);
                {
                    const n = Is(t, e);
                    return null !== n ? Array.isArray(n) ? n[0] : Ts(hs(t[16]), n) : Ts(t, e.next)
                }
            }
            return null
        }

        function Is(t, e) {
            return null !== e ? t[16][6].projection[e.projection] : null
        }

        function Es(t, e) {
            const n = Jt + t + 1;
            if (n < e.length) {
                const t = e[n], r = t[1].firstChild;
                if (null !== r) return Ts(t, r)
            }
            return e[7]
        }

        function Os(t, e, n, r, s, i, o) {
            for (; null != n;) {
                const a = r[n.index], c = n.type;
                if (o && 0 === e && (a && ts(ye(a), r), n.flags |= 4), 64 != (64 & n.flags)) if (8 & c) Os(t, e, n.child, r, s, i, !1), gs(e, t, s, a, i); else if (32 & c) {
                    const o = us(n, r);
                    let c;
                    for (; c = o();) gs(e, t, s, c, i);
                    gs(e, t, s, a, i)
                } else 16 & c ? Rs(t, e, r, n, s, i) : gs(e, t, s, a, i);
                n = o ? n.projectionNext : n.next
            }
        }

        function As(t, e, n, r, s, i) {
            Os(n, r, t.firstChild, e, s, i, !1)
        }

        function Rs(t, e, n, r, s, i) {
            const o = n[16], a = o[6].projection[r.projection];
            if (Array.isArray(a)) for (let c = 0; c < a.length; c++) gs(e, t, s, a[c], i); else Os(t, e, a, o[3], s, i, !0)
        }

        function Ls(t, e, n) {
            ge(t) ? t.setAttribute(e, "style", n) : e.style.cssText = n
        }

        function Ps(t, e, n) {
            ge(t) ? "" === n ? t.removeAttribute(e, "class") : t.setAttribute(e, "class", n) : e.className = n
        }

        function js(t, e, n) {
            let r = t.length;
            for (; ;) {
                const s = t.indexOf(e, n);
                if (-1 === s) return s;
                if (0 === s || t.charCodeAt(s - 1) <= 32) {
                    const n = e.length;
                    if (s + n === r || t.charCodeAt(s + n) <= 32) return s
                }
                n = s + 1
            }
        }

        const Ds = "ng-template";

        function Ms(t, e, n) {
            let r = 0;
            for (; r < t.length;) {
                let s = t[r++];
                if (n && "class" === s) {
                    if (s = t[r], -1 !== js(s.toLowerCase(), e, 0)) return !0
                } else if (1 === s) {
                    for (; r < t.length && "string" == typeof (s = t[r++]);) if (s.toLowerCase() === e) return !0;
                    return !1
                }
            }
            return !1
        }

        function Ns(t) {
            return 4 === t.type && t.value !== Ds
        }

        function Hs(t, e, n) {
            return e === (4 !== t.type || n ? t.value : Ds)
        }

        function Fs(t, e, n) {
            let r = 4;
            const s = t.attrs || [], i = function (t) {
                for (let e = 0; e < t.length; e++) if (pn(t[e])) return e;
                return t.length
            }(s);
            let o = !1;
            for (let a = 0; a < e.length; a++) {
                const c = e[a];
                if ("number" != typeof c) {
                    if (!o) if (4 & r) {
                        if (r = 2 | 1 & r, "" !== c && !Hs(t, c, n) || "" === c && 1 === e.length) {
                            if (Us(r)) return !1;
                            o = !0
                        }
                    } else {
                        const l = 8 & r ? c : e[++a];
                        if (8 & r && null !== t.attrs) {
                            if (!Ms(t.attrs, l, n)) {
                                if (Us(r)) return !1;
                                o = !0
                            }
                            continue
                        }
                        const u = $s(8 & r ? "class" : c, s, Ns(t), n);
                        if (-1 === u) {
                            if (Us(r)) return !1;
                            o = !0;
                            continue
                        }
                        if ("" !== l) {
                            let t;
                            t = u > i ? "" : s[u + 1].toLowerCase();
                            const e = 8 & r ? t : null;
                            if (e && -1 !== js(e, l, 0) || 2 & r && l !== t) {
                                if (Us(r)) return !1;
                                o = !0
                            }
                        }
                    }
                } else {
                    if (!o && !Us(r) && !Us(c)) return !1;
                    if (o && Us(c)) continue;
                    o = !1, r = c | 1 & r
                }
            }
            return Us(r) || o
        }

        function Us(t) {
            return 0 == (1 & t)
        }

        function $s(t, e, n, r) {
            if (null === e) return -1;
            let s = 0;
            if (r || !n) {
                let n = !1;
                for (; s < e.length;) {
                    const r = e[s];
                    if (r === t) return s;
                    if (3 === r || 6 === r) n = !0; else {
                        if (1 === r || 2 === r) {
                            let t = e[++s];
                            for (; "string" == typeof t;) t = e[++s];
                            continue
                        }
                        if (4 === r) break;
                        if (0 === r) {
                            s += 4;
                            continue
                        }
                    }
                    s += n ? 1 : 2
                }
                return -1
            }
            return function (t, e) {
                let n = t.indexOf(4);
                if (n > -1) for (n++; n < t.length;) {
                    const r = t[n];
                    if ("number" == typeof r) return -1;
                    if (r === e) return n;
                    n++
                }
                return -1
            }(e, t)
        }

        function Vs(t, e, n = !1) {
            for (let r = 0; r < e.length; r++) if (Fs(t, e[r], n)) return !0;
            return !1
        }

        function zs(t, e) {
            return t ? ":not(" + e.trim() + ")" : e
        }

        function qs(t) {
            let e = t[0], n = 1, r = 2, s = "", i = !1;
            for (; n < t.length;) {
                let o = t[n];
                if ("string" == typeof o) if (2 & r) {
                    const e = t[++n];
                    s += "[" + o + (e.length > 0 ? '="' + e + '"' : "") + "]"
                } else 8 & r ? s += "." + o : 4 & r && (s += " " + o); else "" === s || Us(o) || (e += zs(i, s), s = ""), r = o, i = i || !Us(r);
                n++
            }
            return "" !== s && (e += zs(i, s)), e
        }

        const Bs = {};

        function Ws(t) {
            Gs(Re(), Ae(), tn() + t, He())
        }

        function Gs(t, e, n, r) {
            if (!r) if (3 == (3 & e[2])) {
                const r = t.preOrderCheckHooks;
                null !== r && on(e, r, n)
            } else {
                const r = t.preOrderHooks;
                null !== r && an(e, r, 0, n)
            }
            en(n)
        }

        function Zs(t, e) {
            return t << 17 | e << 2
        }

        function Qs(t) {
            return t >> 17 & 32767
        }

        function Ks(t) {
            return 2 | t
        }

        function Ys(t) {
            return (131068 & t) >> 2
        }

        function Js(t, e) {
            return -131069 & t | e << 2
        }

        function Xs(t) {
            return 1 | t
        }

        function ti(t, e) {
            const n = t.contentQueries;
            if (null !== n) for (let r = 0; r < n.length; r += 2) {
                const s = n[r], i = n[r + 1];
                if (-1 !== i) {
                    const n = t.data[i];
                    Be(s), n.contentQueries(2, e[i], i)
                }
            }
        }

        function ei(t, e, n, r, s, i, o, a, c, l) {
            const u = e.blueprint.slice();
            return u[0] = s, u[2] = 140 | r, Te(u), u[3] = u[15] = t, u[8] = n, u[10] = o || t && t[10], u[11] = a || t && t[11], u[12] = c || t && t[12] || null, u[9] = l || t && t[9] || null, u[6] = i, u[16] = 2 == e.type ? t[16] : u, u
        }

        function ni(t, e, n, r, s) {
            let i = t.data[e];
            if (null === i) i = function (t, e, n, r, s) {
                const i = je(), o = Me(), a = t.data[e] = function (t, e, n, r, s, i) {
                    return {
                        type: n,
                        index: r,
                        insertBeforeIndex: null,
                        injectorIndex: e ? e.injectorIndex : -1,
                        directiveStart: -1,
                        directiveEnd: -1,
                        directiveStylingLast: -1,
                        propertyBindings: null,
                        flags: 0,
                        providerIndexes: 0,
                        value: s,
                        attrs: i,
                        mergedAttrs: null,
                        localNames: null,
                        initialInputs: void 0,
                        inputs: null,
                        outputs: null,
                        tViews: null,
                        next: null,
                        projectionNext: null,
                        child: null,
                        parent: e,
                        projection: null,
                        styles: null,
                        stylesWithoutHost: null,
                        residualStyles: void 0,
                        classes: null,
                        classesWithoutHost: null,
                        residualClasses: void 0,
                        classBindings: 0,
                        styleBindings: 0
                    }
                }(0, o ? i : i && i.parent, n, e, r, s);
                return null === t.firstChild && (t.firstChild = a), null !== i && (o ? null == i.child && null !== a.parent && (i.child = a) : null === i.next && (i.next = a)), a
            }(t, e, n, r, s), Ee.lFrame.inI18n && (i.flags |= 64); else if (64 & i.type) {
                i.type = n, i.value = r, i.attrs = s;
                const t = function () {
                    const t = Ee.lFrame, e = t.currentTNode;
                    return t.isParent ? e : e.parent
                }();
                i.injectorIndex = null === t ? -1 : t.injectorIndex
            }
            return De(i, !0), i
        }

        function ri(t, e, n, r) {
            if (0 === n) return -1;
            const s = e.length;
            for (let i = 0; i < n; i++) e.push(r), t.blueprint.push(r), t.data.push(null);
            return s
        }

        function si(t, e, n) {
            Ze(e);
            try {
                const r = t.viewQuery;
                null !== r && ji(1, r, n);
                const s = t.template;
                null !== s && ai(t, e, s, 1, n), t.firstCreatePass && (t.firstCreatePass = !1), t.staticContentQueries && ti(t, e), t.staticViewQueries && ji(2, t.viewQuery, n);
                const i = t.components;
                null !== i && function (t, e) {
                    for (let n = 0; n < e.length; n++) Oi(t, e[n])
                }(e, i)
            } catch (r) {
                throw t.firstCreatePass && (t.incompleteFirstPass = !0), r
            } finally {
                e[2] &= -5, Xe()
            }
        }

        function ii(t, e, n, r) {
            const s = e[2];
            if (256 == (256 & s)) return;
            Ze(e);
            const i = He();
            try {
                Te(e), Ee.lFrame.bindingIndex = t.bindingStartIndex, null !== n && ai(t, e, n, 2, r);
                const o = 3 == (3 & s);
                if (!i) if (o) {
                    const n = t.preOrderCheckHooks;
                    null !== n && on(e, n, null)
                } else {
                    const n = t.preOrderHooks;
                    null !== n && an(e, n, 0, null), cn(e, 0)
                }
                if (function (t) {
                    for (let e = ds(t); null !== e; e = fs(e)) {
                        if (!e[2]) continue;
                        const t = e[9];
                        for (let e = 0; e < t.length; e++) {
                            const n = t[e], r = n[3];
                            0 == (1024 & n[2]) && Ie(r, 1), n[2] |= 1024
                        }
                    }
                }(e), function (t) {
                    for (let e = ds(t); null !== e; e = fs(e)) for (let t = Jt; t < e.length; t++) {
                        const n = e[t], r = n[1];
                        xe(n) && ii(r, n, r.template, n[8])
                    }
                }(e), null !== t.contentQueries && ti(t, e), !i) if (o) {
                    const n = t.contentCheckHooks;
                    null !== n && on(e, n)
                } else {
                    const n = t.contentHooks;
                    null !== n && an(e, n, 1), cn(e, 1)
                }
                !function (t, e) {
                    const n = t.hostBindingOpCodes;
                    if (null !== n) try {
                        for (let t = 0; t < n.length; t++) {
                            const r = n[t];
                            if (r < 0) en(~r); else {
                                const s = r, i = n[++t], o = n[++t];
                                Ve(i, s), o(2, e[s])
                            }
                        }
                    } finally {
                        en(-1)
                    }
                }(t, e);
                const a = t.components;
                null !== a && function (t, e) {
                    for (let n = 0; n < e.length; n++) Ii(t, e[n])
                }(e, a);
                const c = t.viewQuery;
                if (null !== c && ji(2, c, r), !i) if (o) {
                    const n = t.viewCheckHooks;
                    null !== n && on(e, n)
                } else {
                    const n = t.viewHooks;
                    null !== n && an(e, n, 2), cn(e, 2)
                }
                !0 === t.firstUpdatePass && (t.firstUpdatePass = !1), i || (e[2] &= -73), 1024 & e[2] && (e[2] &= -1025, Ie(e[3], -1))
            } finally {
                Xe()
            }
        }

        function oi(t, e, n, r) {
            const s = e[10], i = !He(), o = Se(e);
            try {
                i && !o && s.begin && s.begin(), o && si(t, e, r), ii(t, e, n, r)
            } finally {
                i && !o && s.end && s.end()
            }
        }

        function ai(t, e, n, r, s) {
            const i = tn(), o = 2 & r;
            try {
                en(-1), o && e.length > Yt && Gs(t, e, Yt, He()), n(r, s)
            } finally {
                en(i)
            }
        }

        function ci(t, e, n) {
            if (ee(e)) {
                const r = e.directiveEnd;
                for (let s = e.directiveStart; s < r; s++) {
                    const e = t.data[s];
                    e.contentQueries && e.contentQueries(1, n[s], s)
                }
            }
        }

        function li(t, e, n) {
            Oe() && (function (t, e, n, r) {
                const s = n.directiveStart, i = n.directiveEnd;
                t.firstCreatePass || xn(n, e), ts(r, e);
                const o = n.initialInputs;
                for (let a = s; a < i; a++) {
                    const r = t.data[a], i = se(r);
                    i && Si(e, n, r);
                    const c = Mn(e, t, a, n);
                    ts(c, e), null !== o && xi(0, a - s, c, r, 0, o), i && (Ce(n.index, e)[8] = c)
                }
            }(t, e, n, be(n, e)), 128 == (128 & n.flags) && function (t, e, n) {
                const r = n.directiveStart, s = n.directiveEnd, i = n.index, o = Ee.lFrame.currentDirectiveIndex;
                try {
                    en(i);
                    for (let n = r; n < s; n++) {
                        const r = t.data[n], s = e[n];
                        ze(n), null === r.hostBindings && 0 === r.hostVars && null === r.hostAttrs || vi(r, s)
                    }
                } finally {
                    en(-1), ze(o)
                }
            }(t, e, n))
        }

        function ui(t, e, n = be) {
            const r = e.localNames;
            if (null !== r) {
                let s = e.index + 1;
                for (let i = 0; i < r.length; i += 2) {
                    const o = r[i + 1], a = -1 === o ? n(e, t) : t[o];
                    t[s++] = a
                }
            }
        }

        function hi(t) {
            const e = t.tView;
            return null === e || e.incompleteFirstPass ? t.tView = di(1, null, t.template, t.decls, t.vars, t.directiveDefs, t.pipeDefs, t.viewQuery, t.schemas, t.consts) : e
        }

        function di(t, e, n, r, s, i, o, a, c, l) {
            const u = Yt + r, h = u + s, d = function (t, e) {
                const n = [];
                for (let r = 0; r < e; r++) n.push(r < t ? null : Bs);
                return n
            }(u, h), f = "function" == typeof l ? l() : l;
            return d[1] = {
                type: t,
                blueprint: d,
                template: n,
                queries: null,
                viewQuery: a,
                declTNode: e,
                data: d.slice().fill(null, u),
                bindingStartIndex: u,
                expandoStartIndex: h,
                hostBindingOpCodes: null,
                firstCreatePass: !0,
                firstUpdatePass: !0,
                staticViewQueries: !1,
                staticContentQueries: !1,
                preOrderHooks: null,
                preOrderCheckHooks: null,
                contentHooks: null,
                contentCheckHooks: null,
                viewHooks: null,
                viewCheckHooks: null,
                destroyHooks: null,
                cleanup: null,
                contentQueries: null,
                components: null,
                directiveRegistry: "function" == typeof i ? i() : i,
                pipeRegistry: "function" == typeof o ? o() : o,
                firstChild: null,
                schemas: c,
                consts: f,
                incompleteFirstPass: !1
            }
        }

        function fi(t, e, n, r) {
            const s = Mi(e);
            null === n ? s.push(r) : (s.push(n), t.firstCreatePass && Ni(t).push(r, s.length - 1))
        }

        function pi(t, e, n) {
            for (let r in t) if (t.hasOwnProperty(r)) {
                const s = t[r];
                (n = null === n ? {} : n).hasOwnProperty(r) ? n[r].push(e, s) : n[r] = [e, s]
            }
            return n
        }

        function gi(t, e, n, r, s, i, o, a) {
            const c = be(e, n);
            let l, u = e.inputs;
            var h;
            !a && null != u && (l = u[r]) ? (Fi(t, n, l, r, s), ne(e) && function (t, e) {
                const n = Ce(e, t);
                16 & n[2] || (n[2] |= 64)
            }(n, e.index)) : 3 & e.type && (r = "class" === (h = r) ? "className" : "for" === h ? "htmlFor" : "formaction" === h ? "formAction" : "innerHtml" === h ? "innerHTML" : "readonly" === h ? "readOnly" : "tabindex" === h ? "tabIndex" : h, s = null != o ? o(s, e.value || "", r) : s, ge(i) ? i.setProperty(c, r, s) : gn(r) || (c.setProperty ? c.setProperty(r, s) : c[r] = s))
        }

        function mi(t, e, n, r) {
            let s = !1;
            if (Oe()) {
                const i = function (t, e, n) {
                    const r = t.directiveRegistry;
                    let s = null;
                    if (r) for (let i = 0; i < r.length; i++) {
                        const o = r[i];
                        Vs(n, o.selectors, !1) && (s || (s = []), En(xn(n, e), t, o.type), se(o) ? (bi(t, n), s.unshift(o)) : s.push(o))
                    }
                    return s
                }(t, e, n), o = null === r ? null : {"": -1};
                if (null !== i) {
                    s = !0, wi(n, t.data.length, i.length);
                    for (let t = 0; t < i.length; t++) {
                        const e = i[t];
                        e.providersResolver && e.providersResolver(e)
                    }
                    let r = !1, a = !1, c = ri(t, e, i.length, null);
                    for (let s = 0; s < i.length; s++) {
                        const l = i[s];
                        n.mergedAttrs = mn(n.mergedAttrs, l.hostAttrs), Ci(t, n, e, c, l), _i(c, l, o), null !== l.contentQueries && (n.flags |= 8), null === l.hostBindings && null === l.hostAttrs && 0 === l.hostVars || (n.flags |= 128);
                        const u = l.type.prototype;
                        !r && (u.ngOnChanges || u.ngOnInit || u.ngDoCheck) && ((t.preOrderHooks || (t.preOrderHooks = [])).push(n.index), r = !0), a || !u.ngOnChanges && !u.ngDoCheck || ((t.preOrderCheckHooks || (t.preOrderCheckHooks = [])).push(n.index), a = !0), c++
                    }
                    !function (t, e) {
                        const n = e.directiveEnd, r = t.data, s = e.attrs, i = [];
                        let o = null, a = null;
                        for (let c = e.directiveStart; c < n; c++) {
                            const t = r[c], n = t.inputs, l = null === s || Ns(e) ? null : ki(n, s);
                            i.push(l), o = pi(n, c, o), a = pi(t.outputs, c, a)
                        }
                        null !== o && (o.hasOwnProperty("class") && (e.flags |= 16), o.hasOwnProperty("style") && (e.flags |= 32)), e.initialInputs = i, e.inputs = o, e.outputs = a
                    }(t, n)
                }
                o && function (t, e, n) {
                    if (e) {
                        const r = t.localNames = [];
                        for (let t = 0; t < e.length; t += 2) {
                            const s = n[e[t + 1]];
                            if (null == s) throw new ot("301", `Export of name '${e[t + 1]}' not found!`);
                            r.push(e[t], s)
                        }
                    }
                }(n, r, o)
            }
            return n.mergedAttrs = mn(n.mergedAttrs, n.attrs), s
        }

        function yi(t, e, n, r, s, i) {
            const o = i.hostBindings;
            if (o) {
                let n = t.hostBindingOpCodes;
                null === n && (n = t.hostBindingOpCodes = []);
                const i = ~e.index;
                (function (t) {
                    let e = t.length;
                    for (; e > 0;) {
                        const n = t[--e];
                        if ("number" == typeof n && n < 0) return n
                    }
                    return 0
                })(n) != i && n.push(i), n.push(r, s, o)
            }
        }

        function vi(t, e) {
            null !== t.hostBindings && t.hostBindings(1, e)
        }

        function bi(t, e) {
            e.flags |= 2, (t.components || (t.components = [])).push(e.index)
        }

        function _i(t, e, n) {
            if (n) {
                if (e.exportAs) for (let r = 0; r < e.exportAs.length; r++) n[e.exportAs[r]] = t;
                se(e) && (n[""] = t)
            }
        }

        function wi(t, e, n) {
            t.flags |= 1, t.directiveStart = e, t.directiveEnd = e + n, t.providerIndexes = e
        }

        function Ci(t, e, n, r, s) {
            t.data[r] = s;
            const i = s.factory || (s.factory = ie(s.type)), o = new dn(i, se(s), null);
            t.blueprint[r] = o, n[r] = o, yi(t, e, 0, r, ri(t, n, s.hostVars, Bs), s)
        }

        function Si(t, e, n) {
            const r = be(e, t), s = hi(n), i = t[10],
                o = Ai(t, ei(t, s, null, n.onPush ? 64 : 16, r, e, i, i.createRenderer(r, n), null, null));
            t[e.index] = o
        }

        function xi(t, e, n, r, s, i) {
            const o = i[e];
            if (null !== o) {
                const t = r.setInput;
                for (let e = 0; e < o.length;) {
                    const s = o[e++], i = o[e++], a = o[e++];
                    null !== t ? r.setInput(n, a, s, i) : n[i] = a
                }
            }
        }

        function ki(t, e) {
            let n = null, r = 0;
            for (; r < e.length;) {
                const s = e[r];
                if (0 !== s) if (5 !== s) {
                    if ("number" == typeof s) break;
                    t.hasOwnProperty(s) && (null === n && (n = []), n.push(s, t[s], e[r + 1])), r += 2
                } else r += 2; else r += 4
            }
            return n
        }

        function Ti(t, e, n, r) {
            return new Array(t, !0, !1, e, null, 0, r, n, null, null)
        }

        function Ii(t, e) {
            const n = Ce(e, t);
            if (xe(n)) {
                const t = n[1];
                80 & n[2] ? ii(t, n, t.template, n[8]) : n[5] > 0 && Ei(n)
            }
        }

        function Ei(t) {
            for (let n = ds(t); null !== n; n = fs(n)) for (let t = Jt; t < n.length; t++) {
                const e = n[t];
                if (1024 & e[2]) {
                    const t = e[1];
                    ii(t, e, t.template, e[8])
                } else e[5] > 0 && Ei(e)
            }
            const e = t[1].components;
            if (null !== e) for (let n = 0; n < e.length; n++) {
                const r = Ce(e[n], t);
                xe(r) && r[5] > 0 && Ei(r)
            }
        }

        function Oi(t, e) {
            const n = Ce(e, t), r = n[1];
            !function (t, e) {
                for (let n = e.length; n < t.blueprint.length; n++) e.push(t.blueprint[n])
            }(r, n), si(r, n, n[8])
        }

        function Ai(t, e) {
            return t[13] ? t[14][4] = e : t[13] = e, t[14] = e, e
        }

        function Ri(t) {
            for (; t;) {
                t[2] |= 64;
                const e = hs(t);
                if (0 != (512 & t[2]) && !e) return t;
                t = e
            }
            return null
        }

        function Li(t, e, n) {
            const r = e[10];
            r.begin && r.begin();
            try {
                ii(t, e, t.template, n)
            } catch (s) {
                throw Hi(e, s), s
            } finally {
                r.end && r.end()
            }
        }

        function Pi(t) {
            !function (t) {
                for (let e = 0; e < t.components.length; e++) {
                    const n = t.components[e], r = es(n), s = r[1];
                    oi(s, r, s.template, n)
                }
            }(t[8])
        }

        function ji(t, e, n) {
            Be(0), e(t, n)
        }

        const Di = (() => Promise.resolve(null))();

        function Mi(t) {
            return t[7] || (t[7] = [])
        }

        function Ni(t) {
            return t.cleanup || (t.cleanup = [])
        }

        function Hi(t, e) {
            const n = t[9], r = n ? n.get(is, null) : null;
            r && r.handleError(e)
        }

        function Fi(t, e, n, r, s) {
            for (let i = 0; i < n.length;) {
                const o = n[i++], a = n[i++], c = e[o], l = t.data[o];
                null !== l.setInput ? l.setInput(c, s, r, a) : c[a] = s
            }
        }

        function Ui(t, e, n) {
            let r = n ? t.styles : null, s = n ? t.classes : null, i = 0;
            if (null !== e) for (let o = 0; o < e.length; o++) {
                const t = e[o];
                "number" == typeof t ? i = t : 1 == i ? s = et(s, t) : 2 == i && (r = et(r, t + ": " + e[++o] + ";"))
            }
            n ? t.styles = r : t.stylesWithoutHost = r, n ? t.classes = s : t.classesWithoutHost = s
        }

        const $i = new Bn("INJECTOR", -1);

        class Vi {
            get(t, e = er) {
                if (e === er) {
                    const e = new Error(`NullInjectorError: No provider for ${tt(t)}!`);
                    throw e.name = "NullInjectorError", e
                }
                return e
            }
        }

        const zi = new Bn("Set Injector scope."), qi = {}, Bi = {};
        let Wi;

        function Gi() {
            return void 0 === Wi && (Wi = new Vi), Wi
        }

        function Zi(t, e = null, n = null, r) {
            return new Qi(t, n, e || Gi(), r)
        }

        class Qi {
            constructor(t, e, n, r = null) {
                this.parent = n, this.records = new Map, this.injectorDefTypes = new Set, this.onDestroy = new Set, this._destroyed = !1;
                const s = [];
                e && Qn(e, n => this.processProvider(n, t, e)), Qn([t], t => this.processInjectorType(t, [], s)), this.records.set($i, Yi(void 0, this));
                const i = this.records.get(zi);
                this.scope = null != i ? i.value : null, this.source = r || ("object" == typeof t ? null : tt(t))
            }

            get destroyed() {
                return this._destroyed
            }

            destroy() {
                this.assertNotDestroyed(), this._destroyed = !0;
                try {
                    this.onDestroy.forEach(t => t.ngOnDestroy())
                } finally {
                    this.records.clear(), this.onDestroy.clear(), this.injectorDefTypes.clear()
                }
            }

            get(t, e = er, n = bt.Default) {
                this.assertNotDestroyed();
                const r = or(this);
                try {
                    if (!(n & bt.SkipSelf)) {
                        let e = this.records.get(t);
                        if (void 0 === e) {
                            const n = ("function" == typeof (s = t) || "object" == typeof s && s instanceof Bn) && dt(t);
                            e = n && this.injectableDefInScope(n) ? Yi(Ki(t), qi) : null, this.records.set(t, e)
                        }
                        if (null != e) return this.hydrate(t, e)
                    }
                    return (n & bt.Self ? Gi() : this.parent).get(t, e = n & bt.Optional && e === er ? null : e)
                } catch (i) {
                    if ("NullInjectorError" === i.name) {
                        if ((i.ngTempTokenPath = i.ngTempTokenPath || []).unshift(tt(t)), r) throw i;
                        return function (t, e, n, r) {
                            const s = t.ngTempTokenPath;
                            throw e[rr] && s.unshift(e[rr]), t.message = function (t, e, n, r = null) {
                                t = t && "\n" === t.charAt(0) && "\u0275" == t.charAt(1) ? t.substr(2) : t;
                                let s = tt(e);
                                if (Array.isArray(e)) s = e.map(tt).join(" -> "); else if ("object" == typeof e) {
                                    let t = [];
                                    for (let n in e) if (e.hasOwnProperty(n)) {
                                        let r = e[n];
                                        t.push(n + ":" + ("string" == typeof r ? JSON.stringify(r) : tt(r)))
                                    }
                                    s = `{${t.join(", ")}}`
                                }
                                return `${n}${r ? "(" + r + ")" : ""}[${s}]: ${t.replace(nr, "\n  ")}`
                            }("\n" + t.message, s, n, r), t.ngTokenPath = s, t.ngTempTokenPath = null, t
                        }(i, t, "R3InjectorError", this.source)
                    }
                    throw i
                } finally {
                    or(r)
                }
                var s
            }

            _resolveInjectorDefTypes() {
                this.injectorDefTypes.forEach(t => this.get(t))
            }

            toString() {
                const t = [];
                return this.records.forEach((e, n) => t.push(tt(n))), `R3Injector[${t.join(", ")}]`
            }

            assertNotDestroyed() {
                if (this._destroyed) throw new Error("Injector has already been destroyed.")
            }

            processInjectorType(t, e, n) {
                if (!(t = st(t))) return !1;
                let r = pt(t);
                const s = null == r && t.ngModule || void 0, i = void 0 === s ? t : s, o = -1 !== n.indexOf(i);
                if (void 0 !== s && (r = pt(s)), null == r) return !1;
                if (null != r.imports && !o) {
                    let t;
                    n.push(i);
                    try {
                        Qn(r.imports, r => {
                            this.processInjectorType(r, e, n) && (void 0 === t && (t = []), t.push(r))
                        })
                    } finally {
                    }
                    if (void 0 !== t) for (let e = 0; e < t.length; e++) {
                        const {ngModule: n, providers: r} = t[e];
                        Qn(r, t => this.processProvider(t, n, r || Lt))
                    }
                }
                this.injectorDefTypes.add(i);
                const a = ie(i) || (() => new i);
                this.records.set(i, Yi(a, qi));
                const c = r.providers;
                if (null != c && !o) {
                    const e = t;
                    Qn(c, t => this.processProvider(t, e, c))
                }
                return void 0 !== s && void 0 !== t.providers
            }

            processProvider(t, e, n) {
                let r = Xi(t = st(t)) ? t : st(t && t.provide);
                const s = function (t, e, n) {
                    return Ji(t) ? Yi(void 0, t.useValue) : Yi(function (t, e, n) {
                        let r;
                        if (Xi(t)) {
                            const e = st(t);
                            return ie(e) || Ki(e)
                        }
                        if (Ji(t)) r = () => st(t.useValue); else if ((s = t) && s.useFactory) r = () => t.useFactory(...lr(t.deps || [])); else if (function (t) {
                            return !(!t || !t.useExisting)
                        }(t)) r = () => cr(st(t.useExisting)); else {
                            const e = st(t && (t.useClass || t.provide));
                            if (!function (t) {
                                return !!t.deps
                            }(t)) return ie(e) || Ki(e);
                            r = () => new e(...lr(t.deps))
                        }
                        var s;
                        return r
                    }(t), qi)
                }(t);
                if (Xi(t) || !0 !== t.multi) this.records.get(r); else {
                    let e = this.records.get(r);
                    e || (e = Yi(void 0, qi, !0), e.factory = () => lr(e.multi), this.records.set(r, e)), r = t, e.multi.push(t)
                }
                this.records.set(r, s)
            }

            hydrate(t, e) {
                var n;
                return e.value === qi && (e.value = Bi, e.value = e.factory()), "object" == typeof e.value && e.value && null !== (n = e.value) && "object" == typeof n && "function" == typeof n.ngOnDestroy && this.onDestroy.add(e.value), e.value
            }

            injectableDefInScope(t) {
                if (!t.providedIn) return !1;
                const e = st(t.providedIn);
                return "string" == typeof e ? "any" === e || e === this.scope : this.injectorDefTypes.has(e)
            }
        }

        function Ki(t) {
            const e = dt(t), n = null !== e ? e.factory : ie(t);
            if (null !== n) return n;
            if (t instanceof Bn) throw new Error(`Token ${tt(t)} is missing a \u0275prov definition.`);
            if (t instanceof Function) return function (t) {
                const e = t.length;
                if (e > 0) {
                    const n = function (t, e) {
                        const n = [];
                        for (let r = 0; r < t; r++) n.push("?");
                        return n
                    }(e);
                    throw new Error(`Can't resolve all parameters for ${tt(t)}: (${n.join(", ")}).`)
                }
                const n = function (t) {
                    const e = t && (t[gt] || t[yt]);
                    if (e) {
                        const n = function (t) {
                            if (t.hasOwnProperty("name")) return t.name;
                            const e = ("" + t).match(/^function\s*([^\s(]+)/);
                            return null === e ? "" : e[1]
                        }(t);
                        return console.warn(`DEPRECATED: DI is instantiating a token "${n}" that inherits its @Injectable decorator but does not provide one itself.\nThis will become an error in a future version of Angular. Please add @Injectable() to the "${n}" class.`), e
                    }
                    return null
                }(t);
                return null !== n ? () => n.factory(t) : () => new t
            }(t);
            throw new Error("unreachable")
        }

        function Yi(t, e, n = !1) {
            return {factory: t, value: e, multi: n ? [] : void 0}
        }

        function Ji(t) {
            return null !== t && "object" == typeof t && sr in t
        }

        function Xi(t) {
            return "function" == typeof t
        }

        const to = function (t, e, n) {
            return function (t, e = null, n = null, r) {
                const s = Zi(t, e, n, r);
                return s._resolveInjectorDefTypes(), s
            }({name: n}, e, t, n)
        };

        class eo {
            static create(t, e) {
                return Array.isArray(t) ? to(t, e, "") : to(t.providers, t.parent, t.name || "")
            }
        }

        function no(t, e) {
            sn(es(t)[1], Pe())
        }

        function ro(t) {
            let e = Object.getPrototypeOf(t.type.prototype).constructor, n = !0;
            const r = [t];
            for (; e;) {
                let s;
                if (se(t)) s = e.\u0275cmp || e.\u0275dir; else {
                    if (e.\u0275cmp) throw new Error("Directives cannot inherit Components");
                    s = e.\u0275dir
                }
                if (s) {
                    if (n) {
                        r.push(s);
                        const e = t;
                        e.inputs = so(t.inputs), e.declaredInputs = so(t.declaredInputs), e.outputs = so(t.outputs);
                        const n = s.hostBindings;
                        n && ao(t, n);
                        const i = s.viewQuery, o = s.contentQueries;
                        if (i && io(t, i), o && oo(t, o), X(t.inputs, s.inputs), X(t.declaredInputs, s.declaredInputs), X(t.outputs, s.outputs), se(s) && s.data.animation) {
                            const e = t.data;
                            e.animation = (e.animation || []).concat(s.data.animation)
                        }
                    }
                    const e = s.features;
                    if (e) for (let r = 0; r < e.length; r++) {
                        const s = e[r];
                        s && s.ngInherit && s(t), s === ro && (n = !1)
                    }
                }
                e = Object.getPrototypeOf(e)
            }
            !function (t) {
                let e = 0, n = null;
                for (let r = t.length - 1; r >= 0; r--) {
                    const s = t[r];
                    s.hostVars = e += s.hostVars, s.hostAttrs = mn(s.hostAttrs, n = mn(n, s.hostAttrs))
                }
            }(r)
        }

        function so(t) {
            return t === Rt ? {} : t === Lt ? [] : t
        }

        function io(t, e) {
            const n = t.viewQuery;
            t.viewQuery = n ? (t, r) => {
                e(t, r), n(t, r)
            } : e
        }

        function oo(t, e) {
            const n = t.contentQueries;
            t.contentQueries = n ? (t, r, s) => {
                e(t, r, s), n(t, r, s)
            } : e
        }

        function ao(t, e) {
            const n = t.hostBindings;
            t.hostBindings = n ? (t, r) => {
                e(t, r), n(t, r)
            } : e
        }

        eo.THROW_IF_NOT_FOUND = er, eo.NULL = new Vi, eo.\u0275prov = ut({
            token: eo,
            providedIn: "any",
            factory: () => cr($i)
        }), eo.__NG_ELEMENT_ID__ = -1;
        let co = null;

        function lo() {
            if (!co) {
                const t = At.Symbol;
                if (t && t.iterator) co = t.iterator; else {
                    const t = Object.getOwnPropertyNames(Map.prototype);
                    for (let e = 0; e < t.length; ++e) {
                        const n = t[e];
                        "entries" !== n && "size" !== n && Map.prototype[n] === Map.prototype.entries && (co = n)
                    }
                }
            }
            return co
        }

        class uo {
            constructor(t) {
                this.wrapped = t
            }

            static wrap(t) {
                return new uo(t)
            }

            static unwrap(t) {
                return uo.isWrapped(t) ? t.wrapped : t
            }

            static isWrapped(t) {
                return t instanceof uo
            }
        }

        function ho(t) {
            return !!fo(t) && (Array.isArray(t) || !(t instanceof Map) && lo() in t)
        }

        function fo(t) {
            return null !== t && ("function" == typeof t || "object" == typeof t)
        }

        function po(t, e, n) {
            return t[e] = n
        }

        function go(t, e, n) {
            return !Object.is(t[e], n) && (t[e] = n, !0)
        }

        function mo(t, e, n, r) {
            const s = go(t, e, n);
            return go(t, e + 1, r) || s
        }

        function yo(t, e, n, r) {
            const s = Ae();
            return go(s, $e(), e) && (Re(), function (t, e, n, r, s, i) {
                const o = be(t, e);
                !function (t, e, n, r, s, i, o) {
                    if (null == i) ge(t) ? t.removeAttribute(e, s, n) : e.removeAttribute(s); else {
                        const a = null == o ? at(i) : o(i, r || "", s);
                        ge(t) ? t.setAttribute(e, s, a, n) : n ? e.setAttributeNS(n, s, a) : e.setAttribute(s, a)
                    }
                }(e[11], o, i, t.value, n, r, s)
            }(nn(), s, t, e, n, r)), yo
        }

        function vo(t, e, n, r) {
            return go(t, $e(), n) ? e + at(n) + r : Bs
        }

        function bo(t, e, n, r, s, i, o, a) {
            const c = Ae(), l = Re(), u = t + Yt, h = l.firstCreatePass ? function (t, e, n, r, s, i, o, a, c) {
                const l = e.consts, u = ni(e, t, 4, o || null, ke(l, a));
                mi(e, n, u, ke(l, c)), sn(e, u);
                const h = u.tViews = di(2, u, r, s, i, e.directiveRegistry, e.pipeRegistry, null, e.schemas, l);
                return null !== e.queries && (e.queries.template(e, u), h.queries = e.queries.embeddedTView(u)), u
            }(u, l, c, e, n, r, s, i, o) : l.data[u];
            De(h, !1);
            const d = c[11].createComment("");
            ks(l, c, d, h), ts(d, c), Ai(c, c[u] = Ti(d, c, d, h)), re(h) && li(l, c, h), null != o && ui(c, h, a)
        }

        function _o(t, e = bt.Default) {
            const n = Ae();
            return null === n ? cr(t, e) : Rn(Pe(), n, st(t), e)
        }

        function wo(t, e, n) {
            const r = Ae();
            return go(r, $e(), e) && gi(Re(), nn(), r, t, e, r[11], n, !1), wo
        }

        function Co(t, e, n, r, s) {
            const i = s ? "class" : "style";
            Fi(t, n, e.inputs[i], i, r)
        }

        function So(t, e, n, r) {
            const s = Ae(), i = Re(), o = Yt + t, a = s[11], c = s[o] = ms(a, e, Ee.lFrame.currentNamespace),
                l = i.firstCreatePass ? function (t, e, n, r, s, i, o) {
                    const a = e.consts, c = ni(e, t, 2, s, ke(a, i));
                    return mi(e, n, c, ke(a, o)), null !== c.attrs && Ui(c, c.attrs, !1), null !== c.mergedAttrs && Ui(c, c.mergedAttrs, !0), null !== e.queries && e.queries.elementStart(e, c), c
                }(o, i, s, 0, e, n, r) : i.data[o];
            De(l, !0);
            const u = l.mergedAttrs;
            null !== u && fn(a, c, u);
            const h = l.classes;
            null !== h && Ps(a, c, h);
            const d = l.styles;
            null !== d && Ls(a, c, d), 64 != (64 & l.flags) && ks(i, s, c, l), 0 === Ee.lFrame.elementDepthCount && ts(c, s), Ee.lFrame.elementDepthCount++, re(l) && (li(i, s, l), ci(i, l, s)), null !== r && ui(s, l)
        }

        function xo() {
            let t = Pe();
            Me() ? Ne() : (t = t.parent, De(t, !1));
            const e = t;
            Ee.lFrame.elementDepthCount--;
            const n = Re();
            n.firstCreatePass && (sn(n, t), ee(t) && n.queries.elementEnd(t)), null != e.classesWithoutHost && function (t) {
                return 0 != (16 & t.flags)
            }(e) && Co(n, e, Ae(), e.classesWithoutHost, !0), null != e.stylesWithoutHost && function (t) {
                return 0 != (32 & t.flags)
            }(e) && Co(n, e, Ae(), e.stylesWithoutHost, !1)
        }

        function ko(t, e, n, r) {
            So(t, e, n, r), xo()
        }

        function To(t, e, n) {
            const r = Ae(), s = Re(), i = t + Yt, o = s.firstCreatePass ? function (t, e, n, r, s) {
                const i = e.consts, o = ke(i, r), a = ni(e, t, 8, "ng-container", o);
                return null !== o && Ui(a, o, !0), mi(e, n, a, ke(i, s)), null !== e.queries && e.queries.elementStart(e, a), a
            }(i, s, r, e, n) : s.data[i];
            De(o, !0);
            const a = r[i] = r[11].createComment("");
            ks(s, r, a, o), ts(a, r), re(o) && (li(s, r, o), ci(s, o, r)), null != n && ui(r, o)
        }

        function Io() {
            let t = Pe();
            const e = Re();
            Me() ? Ne() : (t = t.parent, De(t, !1)), e.firstCreatePass && (sn(e, t), ee(t) && e.queries.elementEnd(t))
        }

        function Eo() {
            return Ae()
        }

        function Oo(t) {
            return !!t && "function" == typeof t.then
        }

        function Ao(t) {
            return !!t && "function" == typeof t.subscribe
        }

        const Ro = Ao;

        function Lo(t, e, n, r) {
            const s = Ae(), i = Re(), o = Pe();
            return function (t, e, n, r, s, i, o, a) {
                const c = re(r), l = t.firstCreatePass && Ni(t), u = Mi(e);
                let h = !0;
                if (3 & r.type || a) {
                    const d = be(r, e), f = a ? a(d) : d, p = u.length, g = a ? t => a(ye(t[r.index])) : r.index;
                    if (ge(n)) {
                        let o = null;
                        if (!a && c && (o = function (t, e, n, r) {
                            const s = t.cleanup;
                            if (null != s) for (let i = 0; i < s.length - 1; i += 2) {
                                const t = s[i];
                                if (t === n && s[i + 1] === r) {
                                    const t = e[7], n = s[i + 2];
                                    return t.length > n ? t[n] : null
                                }
                                "string" == typeof t && (i += 2)
                            }
                            return null
                        }(t, e, s, r.index)), null !== o) (o.__ngLastListenerFn__ || o).__ngNextListenerFn__ = i, o.__ngLastListenerFn__ = i, h = !1; else {
                            i = jo(r, e, 0, i, !1);
                            const t = n.listen(f, s, i);
                            u.push(i, t), l && l.push(s, g, p, p + 1)
                        }
                    } else i = jo(r, e, 0, i, !0), f.addEventListener(s, i, o), u.push(i), l && l.push(s, g, p, o)
                } else i = jo(r, e, 0, i, !1);
                const d = r.outputs;
                let f;
                if (h && null !== d && (f = d[s])) {
                    const t = f.length;
                    if (t) for (let n = 0; n < t; n += 2) {
                        const t = e[f[n]][f[n + 1]].subscribe(i), o = u.length;
                        u.push(i, t), l && l.push(s, r.index, o, -(o + 1))
                    }
                }
            }(i, s, s[11], o, t, e, !!n, r), Lo
        }

        function Po(t, e, n, r) {
            try {
                return !1 !== n(r)
            } catch (s) {
                return Hi(t, s), !1
            }
        }

        function jo(t, e, n, r, s) {
            return function n(i) {
                if (i === Function) return r;
                const o = 2 & t.flags ? Ce(t.index, e) : e;
                0 == (32 & e[2]) && Ri(o);
                let a = Po(e, 0, r, i), c = n.__ngNextListenerFn__;
                for (; c;) a = Po(e, 0, c, i) && a, c = c.__ngNextListenerFn__;
                return s && !1 === a && (i.preventDefault(), i.returnValue = !1), a
            }
        }

        function Do(t = 1) {
            return function (t) {
                return (Ee.lFrame.contextLView = function (t, e) {
                    for (; t > 0;) e = e[15], t--;
                    return e
                }(t, Ee.lFrame.contextLView))[8]
            }(t)
        }

        function Mo(t, e, n) {
            return No(t, "", e, "", n), Mo
        }

        function No(t, e, n, r, s) {
            const i = Ae(), o = vo(i, e, n, r);
            return o !== Bs && gi(Re(), nn(), i, t, o, i[11], s, !1), No
        }

        function Ho(t, e, n, r, s) {
            const i = t[n + 1], o = null === e;
            let a = r ? Qs(i) : Ys(i), c = !1;
            for (; 0 !== a && (!1 === c || o);) {
                const n = t[a + 1];
                Fo(t[a], e) && (c = !0, t[a + 1] = r ? Xs(n) : Ks(n)), a = r ? Qs(n) : Ys(n)
            }
            c && (t[n + 1] = r ? Ks(i) : Xs(i))
        }

        function Fo(t, e) {
            return null === t || null == e || (Array.isArray(t) ? t[1] : t) === e || !(!Array.isArray(t) || "string" != typeof e) && tr(t, e) >= 0
        }

        function Uo(t, e) {
            return function (t, e, n, r) {
                const s = Ae(), i = Re(), o = function (t) {
                    const e = Ee.lFrame, n = e.bindingIndex;
                    return e.bindingIndex = e.bindingIndex + 2, n
                }();
                i.firstUpdatePass && function (t, e, n, r) {
                    const s = t.data;
                    if (null === s[n + 1]) {
                        const i = s[tn()], o = function (t, e) {
                            return e >= t.expandoStartIndex
                        }(t, n);
                        (function (t, e) {
                            return 0 != (16 & t.flags)
                        })(i) && null === e && !o && (e = !1), e = function (t, e, n, r) {
                            const s = function (t) {
                                const e = Ee.lFrame.currentDirectiveIndex;
                                return -1 === e ? null : t[e]
                            }(t);
                            let i = e.residualClasses;
                            if (null === s) 0 === e.classBindings && (n = Vo(n = $o(null, t, e, n, r), e.attrs, r), i = null); else {
                                const o = e.directiveStylingLast;
                                if (-1 === o || t[o] !== s) if (n = $o(s, t, e, n, r), null === i) {
                                    let n = function (t, e, n) {
                                        const r = e.classBindings;
                                        if (0 !== Ys(r)) return t[Qs(r)]
                                    }(t, e);
                                    void 0 !== n && Array.isArray(n) && (n = $o(null, t, e, n[1], r), n = Vo(n, e.attrs, r), function (t, e, n, r) {
                                        t[Qs(e.classBindings)] = r
                                    }(t, e, 0, n))
                                } else i = function (t, e, n) {
                                    let r;
                                    const s = e.directiveEnd;
                                    for (let i = 1 + e.directiveStylingLast; i < s; i++) r = Vo(r, t[i].hostAttrs, true);
                                    return Vo(r, e.attrs, true)
                                }(t, e)
                            }
                            return void 0 !== i && (e.residualClasses = i), n
                        }(s, i, e, r), function (t, e, n, r, s, i) {
                            let o = e.classBindings, a = Qs(o), c = Ys(o);
                            t[r] = n;
                            let l, u = !1;
                            if (Array.isArray(n)) {
                                const t = n;
                                l = t[1], (null === l || tr(t, l) > 0) && (u = !0)
                            } else l = n;
                            if (s) if (0 !== c) {
                                const e = Qs(t[a + 1]);
                                t[r + 1] = Zs(e, a), 0 !== e && (t[e + 1] = Js(t[e + 1], r)), t[a + 1] = 131071 & t[a + 1] | r << 17
                            } else t[r + 1] = Zs(a, 0), 0 !== a && (t[a + 1] = Js(t[a + 1], r)), a = r; else t[r + 1] = Zs(c, 0), 0 === a ? a = r : t[c + 1] = Js(t[c + 1], r), c = r;
                            u && (t[r + 1] = Ks(t[r + 1])), Ho(t, l, r, !0), Ho(t, l, r, !1), function (t, e, n, r, s) {
                                const i = t.residualClasses;
                                null != i && "string" == typeof e && tr(i, e) >= 0 && (n[r + 1] = Xs(n[r + 1]))
                            }(e, l, t, r), o = Zs(a, c), e.classBindings = o
                        }(s, i, e, n, o)
                    }
                }(i, t, o, true), e !== Bs && go(s, o, e) && function (t, e, n, r, s, i, o, a) {
                    if (!(3 & e.type)) return;
                    const c = t.data, l = c[a + 1];
                    qo(1 == (1 & l) ? zo(c, e, n, s, Ys(l), o) : void 0) || (qo(i) || function (t) {
                        return 2 == (2 & t)
                    }(l) && (i = zo(c, null, n, s, a, o)), function (t, e, n, r, s) {
                        const i = ge(t);
                        s ? i ? t.addClass(n, r) : n.classList.add(r) : i ? t.removeClass(n, r) : n.classList.remove(r)
                    }(r, 0, ve(tn(), n), s, i))
                }(i, i.data[tn()], s, s[11], t, s[o + 1] = function (t, e) {
                    return null == t || "object" == typeof t && (t = tt(xr(t))), t
                }(e), true, o)
            }(t, e), Uo
        }

        function $o(t, e, n, r, s) {
            let i = null;
            const o = n.directiveEnd;
            let a = n.directiveStylingLast;
            for (-1 === a ? a = n.directiveStart : a++; a < o && (i = e[a], r = Vo(r, i.hostAttrs, s), i !== t);) a++;
            return null !== t && (n.directiveStylingLast = a), r
        }

        function Vo(t, e, n) {
            const r = n ? 1 : 2;
            let s = -1;
            if (null !== e) for (let i = 0; i < e.length; i++) {
                const o = e[i];
                "number" == typeof o ? s = o : s === r && (Array.isArray(t) || (t = void 0 === t ? [] : ["", t]), Jn(t, o, !!n || e[++i]))
            }
            return void 0 === t ? null : t
        }

        function zo(t, e, n, r, s, i) {
            const o = null === e;
            let a;
            for (; s > 0;) {
                const e = t[s], i = Array.isArray(e), c = i ? e[1] : e, l = null === c;
                let u = n[s + 1];
                u === Bs && (u = l ? Lt : void 0);
                let h = l ? Xn(u, r) : c === r ? u : void 0;
                if (i && !qo(h) && (h = Xn(e, r)), qo(h) && (a = h, o)) return a;
                const d = t[s + 1];
                s = o ? Qs(d) : Ys(d)
            }
            if (null !== e) {
                let t = i ? e.residualClasses : e.residualStyles;
                null != t && (a = Xn(t, r))
            }
            return a
        }

        function qo(t) {
            return void 0 !== t
        }

        function Bo(t, e = "") {
            const n = Ae(), r = Re(), s = t + Yt, i = r.firstCreatePass ? ni(r, s, 1, e, null) : r.data[s],
                o = n[s] = function (t, e) {
                    return ge(t) ? t.createText(e) : t.createTextNode(e)
                }(n[11], e);
            ks(r, n, o, i), De(i, !1)
        }

        function Wo(t) {
            return Go("", t, ""), Wo
        }

        function Go(t, e, n) {
            const r = Ae(), s = vo(r, t, e, n);
            return s !== Bs && function (t, e, n) {
                const r = ve(e, t);
                !function (t, e, n) {
                    ge(t) ? t.setValue(e, n) : e.textContent = n
                }(t[11], r, n)
            }(r, tn(), s), Go
        }

        function Zo(t, e, n) {
            const r = Ae();
            return go(r, $e(), e) && gi(Re(), nn(), r, t, e, r[11], n, !0), Zo
        }

        const Qo = void 0;
        var Ko = ["en", [["a", "p"], ["AM", "PM"], Qo], [["AM", "PM"], Qo, Qo], [["S", "M", "T", "W", "T", "F", "S"], ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]], Qo, [["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"], ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]], Qo, [["B", "A"], ["BC", "AD"], ["Before Christ", "Anno Domini"]], 0, [6, 0], ["M/d/yy", "MMM d, y", "MMMM d, y", "EEEE, MMMM d, y"], ["h:mm a", "h:mm:ss a", "h:mm:ss a z", "h:mm:ss a zzzz"], ["{1}, {0}", Qo, "{1} 'at' {0}", Qo], [".", ",", ";", "%", "+", "-", "E", "\xd7", "\u2030", "\u221e", "NaN", ":"], ["#,##0.###", "#,##0%", "\xa4#,##0.00", "#E0"], "USD", "$", "US Dollar", {}, "ltr", function (t) {
            let e = Math.floor(Math.abs(t)), n = t.toString().replace(/^[^.]*\.?/, "").length;
            return 1 === e && 0 === n ? 1 : 5
        }];
        let Yo = {};

        function Jo(t) {
            return t in Yo || (Yo[t] = At.ng && At.ng.common && At.ng.common.locales && At.ng.common.locales[t]), Yo[t]
        }

        var Xo = (() => ((Xo = Xo || {})[Xo.LocaleId = 0] = "LocaleId", Xo[Xo.DayPeriodsFormat = 1] = "DayPeriodsFormat", Xo[Xo.DayPeriodsStandalone = 2] = "DayPeriodsStandalone", Xo[Xo.DaysFormat = 3] = "DaysFormat", Xo[Xo.DaysStandalone = 4] = "DaysStandalone", Xo[Xo.MonthsFormat = 5] = "MonthsFormat", Xo[Xo.MonthsStandalone = 6] = "MonthsStandalone", Xo[Xo.Eras = 7] = "Eras", Xo[Xo.FirstDayOfWeek = 8] = "FirstDayOfWeek", Xo[Xo.WeekendRange = 9] = "WeekendRange", Xo[Xo.DateFormat = 10] = "DateFormat", Xo[Xo.TimeFormat = 11] = "TimeFormat", Xo[Xo.DateTimeFormat = 12] = "DateTimeFormat", Xo[Xo.NumberSymbols = 13] = "NumberSymbols", Xo[Xo.NumberFormats = 14] = "NumberFormats", Xo[Xo.CurrencyCode = 15] = "CurrencyCode", Xo[Xo.CurrencySymbol = 16] = "CurrencySymbol", Xo[Xo.CurrencyName = 17] = "CurrencyName", Xo[Xo.Currencies = 18] = "Currencies", Xo[Xo.Directionality = 19] = "Directionality", Xo[Xo.PluralCase = 20] = "PluralCase", Xo[Xo.ExtraData = 21] = "ExtraData", Xo))();
        const ta = "en-US";
        let ea = ta;

        function na(t) {
            var e, n;
            n = "Expected localeId to be defined", null == (e = t) && function (t, e, n, r) {
                throw new Error(`ASSERTION ERROR: ${t} [Expected=> null != ${e} <=Actual]`)
            }(n, e), "string" == typeof t && (ea = t.toLowerCase().replace(/_/g, "-"))
        }

        class ra {
        }

        class sa {
            resolveComponentFactory(t) {
                throw function (t) {
                    const e = Error(`No component factory found for ${tt(t)}. Did you add it to @NgModule.entryComponents?`);
                    return e.ngComponent = t, e
                }(t)
            }
        }

        class ia {
        }

        function oa(...t) {
        }

        function aa(t, e) {
            return new la(be(t, e))
        }

        ia.NULL = new sa;
        const ca = function () {
            return aa(Pe(), Ae())
        };
        let la = (() => {
            class t {
                constructor(t) {
                    this.nativeElement = t
                }
            }

            return t.__NG_ELEMENT_ID__ = ca, t
        })();

        function ua(t) {
            return t instanceof la ? t.nativeElement : t
        }

        class ha {
        }

        let da = (() => {
            class t {
            }

            return t.__NG_ELEMENT_ID__ = () => fa(), t
        })();
        const fa = function () {
            const t = Ae(), e = Ce(Pe().index, t);
            return function (t) {
                return t[11]
            }(Xt(e) ? e : t)
        };
        let pa = (() => {
            class t {
            }

            return t.\u0275prov = ut({token: t, providedIn: "root", factory: () => null}), t
        })();

        class ga {
            constructor(t) {
                this.full = t, this.major = t.split(".")[0], this.minor = t.split(".")[1], this.patch = t.split(".").slice(2).join(".")
            }
        }

        const ma = new ga("12.1.0");

        class ya {
            constructor() {
            }

            supports(t) {
                return ho(t)
            }

            create(t) {
                return new ba(t)
            }
        }

        const va = (t, e) => e;

        class ba {
            constructor(t) {
                this.length = 0, this._linkedRecords = null, this._unlinkedRecords = null, this._previousItHead = null, this._itHead = null, this._itTail = null, this._additionsHead = null, this._additionsTail = null, this._movesHead = null, this._movesTail = null, this._removalsHead = null, this._removalsTail = null, this._identityChangesHead = null, this._identityChangesTail = null, this._trackByFn = t || va
            }

            forEachItem(t) {
                let e;
                for (e = this._itHead; null !== e; e = e._next) t(e)
            }

            forEachOperation(t) {
                let e = this._itHead, n = this._removalsHead, r = 0, s = null;
                for (; e || n;) {
                    const i = !n || e && e.currentIndex < Sa(n, r, s) ? e : n, o = Sa(i, r, s), a = i.currentIndex;
                    if (i === n) r--, n = n._nextRemoved; else if (e = e._next, null == i.previousIndex) r++; else {
                        s || (s = []);
                        const t = o - r, e = a - r;
                        if (t != e) {
                            for (let n = 0; n < t; n++) {
                                const r = n < s.length ? s[n] : s[n] = 0, i = r + n;
                                e <= i && i < t && (s[n] = r + 1)
                            }
                            s[i.previousIndex] = e - t
                        }
                    }
                    o !== a && t(i, o, a)
                }
            }

            forEachPreviousItem(t) {
                let e;
                for (e = this._previousItHead; null !== e; e = e._nextPrevious) t(e)
            }

            forEachAddedItem(t) {
                let e;
                for (e = this._additionsHead; null !== e; e = e._nextAdded) t(e)
            }

            forEachMovedItem(t) {
                let e;
                for (e = this._movesHead; null !== e; e = e._nextMoved) t(e)
            }

            forEachRemovedItem(t) {
                let e;
                for (e = this._removalsHead; null !== e; e = e._nextRemoved) t(e)
            }

            forEachIdentityChange(t) {
                let e;
                for (e = this._identityChangesHead; null !== e; e = e._nextIdentityChange) t(e)
            }

            diff(t) {
                if (null == t && (t = []), !ho(t)) throw new Error(`Error trying to diff '${tt(t)}'. Only arrays and iterables are allowed`);
                return this.check(t) ? this : null
            }

            onDestroy() {
            }

            check(t) {
                this._reset();
                let e, n, r, s = this._itHead, i = !1;
                if (Array.isArray(t)) {
                    this.length = t.length;
                    for (let e = 0; e < this.length; e++) n = t[e], r = this._trackByFn(e, n), null !== s && Object.is(s.trackById, r) ? (i && (s = this._verifyReinsertion(s, n, r, e)), Object.is(s.item, n) || this._addIdentityChange(s, n)) : (s = this._mismatch(s, n, r, e), i = !0), s = s._next
                } else e = 0, function (t, e) {
                    if (Array.isArray(t)) for (let n = 0; n < t.length; n++) e(t[n]); else {
                        const n = t[lo()]();
                        let r;
                        for (; !(r = n.next()).done;) e(r.value)
                    }
                }(t, t => {
                    r = this._trackByFn(e, t), null !== s && Object.is(s.trackById, r) ? (i && (s = this._verifyReinsertion(s, t, r, e)), Object.is(s.item, t) || this._addIdentityChange(s, t)) : (s = this._mismatch(s, t, r, e), i = !0), s = s._next, e++
                }), this.length = e;
                return this._truncate(s), this.collection = t, this.isDirty
            }

            get isDirty() {
                return null !== this._additionsHead || null !== this._movesHead || null !== this._removalsHead || null !== this._identityChangesHead
            }

            _reset() {
                if (this.isDirty) {
                    let t;
                    for (t = this._previousItHead = this._itHead; null !== t; t = t._next) t._nextPrevious = t._next;
                    for (t = this._additionsHead; null !== t; t = t._nextAdded) t.previousIndex = t.currentIndex;
                    for (this._additionsHead = this._additionsTail = null, t = this._movesHead; null !== t; t = t._nextMoved) t.previousIndex = t.currentIndex;
                    this._movesHead = this._movesTail = null, this._removalsHead = this._removalsTail = null, this._identityChangesHead = this._identityChangesTail = null
                }
            }

            _mismatch(t, e, n, r) {
                let s;
                return null === t ? s = this._itTail : (s = t._prev, this._remove(t)), null !== (t = null === this._unlinkedRecords ? null : this._unlinkedRecords.get(n, null)) ? (Object.is(t.item, e) || this._addIdentityChange(t, e), this._reinsertAfter(t, s, r)) : null !== (t = null === this._linkedRecords ? null : this._linkedRecords.get(n, r)) ? (Object.is(t.item, e) || this._addIdentityChange(t, e), this._moveAfter(t, s, r)) : t = this._addAfter(new _a(e, n), s, r), t
            }

            _verifyReinsertion(t, e, n, r) {
                let s = null === this._unlinkedRecords ? null : this._unlinkedRecords.get(n, null);
                return null !== s ? t = this._reinsertAfter(s, t._prev, r) : t.currentIndex != r && (t.currentIndex = r, this._addToMoves(t, r)), t
            }

            _truncate(t) {
                for (; null !== t;) {
                    const e = t._next;
                    this._addToRemovals(this._unlink(t)), t = e
                }
                null !== this._unlinkedRecords && this._unlinkedRecords.clear(), null !== this._additionsTail && (this._additionsTail._nextAdded = null), null !== this._movesTail && (this._movesTail._nextMoved = null), null !== this._itTail && (this._itTail._next = null), null !== this._removalsTail && (this._removalsTail._nextRemoved = null), null !== this._identityChangesTail && (this._identityChangesTail._nextIdentityChange = null)
            }

            _reinsertAfter(t, e, n) {
                null !== this._unlinkedRecords && this._unlinkedRecords.remove(t);
                const r = t._prevRemoved, s = t._nextRemoved;
                return null === r ? this._removalsHead = s : r._nextRemoved = s, null === s ? this._removalsTail = r : s._prevRemoved = r, this._insertAfter(t, e, n), this._addToMoves(t, n), t
            }

            _moveAfter(t, e, n) {
                return this._unlink(t), this._insertAfter(t, e, n), this._addToMoves(t, n), t
            }

            _addAfter(t, e, n) {
                return this._insertAfter(t, e, n), this._additionsTail = null === this._additionsTail ? this._additionsHead = t : this._additionsTail._nextAdded = t, t
            }

            _insertAfter(t, e, n) {
                const r = null === e ? this._itHead : e._next;
                return t._next = r, t._prev = e, null === r ? this._itTail = t : r._prev = t, null === e ? this._itHead = t : e._next = t, null === this._linkedRecords && (this._linkedRecords = new Ca), this._linkedRecords.put(t), t.currentIndex = n, t
            }

            _remove(t) {
                return this._addToRemovals(this._unlink(t))
            }

            _unlink(t) {
                null !== this._linkedRecords && this._linkedRecords.remove(t);
                const e = t._prev, n = t._next;
                return null === e ? this._itHead = n : e._next = n, null === n ? this._itTail = e : n._prev = e, t
            }

            _addToMoves(t, e) {
                return t.previousIndex === e || (this._movesTail = null === this._movesTail ? this._movesHead = t : this._movesTail._nextMoved = t), t
            }

            _addToRemovals(t) {
                return null === this._unlinkedRecords && (this._unlinkedRecords = new Ca), this._unlinkedRecords.put(t), t.currentIndex = null, t._nextRemoved = null, null === this._removalsTail ? (this._removalsTail = this._removalsHead = t, t._prevRemoved = null) : (t._prevRemoved = this._removalsTail, this._removalsTail = this._removalsTail._nextRemoved = t), t
            }

            _addIdentityChange(t, e) {
                return t.item = e, this._identityChangesTail = null === this._identityChangesTail ? this._identityChangesHead = t : this._identityChangesTail._nextIdentityChange = t, t
            }
        }

        class _a {
            constructor(t, e) {
                this.item = t, this.trackById = e, this.currentIndex = null, this.previousIndex = null, this._nextPrevious = null, this._prev = null, this._next = null, this._prevDup = null, this._nextDup = null, this._prevRemoved = null, this._nextRemoved = null, this._nextAdded = null, this._nextMoved = null, this._nextIdentityChange = null
            }
        }

        class wa {
            constructor() {
                this._head = null, this._tail = null
            }

            add(t) {
                null === this._head ? (this._head = this._tail = t, t._nextDup = null, t._prevDup = null) : (this._tail._nextDup = t, t._prevDup = this._tail, t._nextDup = null, this._tail = t)
            }

            get(t, e) {
                let n;
                for (n = this._head; null !== n; n = n._nextDup) if ((null === e || e <= n.currentIndex) && Object.is(n.trackById, t)) return n;
                return null
            }

            remove(t) {
                const e = t._prevDup, n = t._nextDup;
                return null === e ? this._head = n : e._nextDup = n, null === n ? this._tail = e : n._prevDup = e, null === this._head
            }
        }

        class Ca {
            constructor() {
                this.map = new Map
            }

            put(t) {
                const e = t.trackById;
                let n = this.map.get(e);
                n || (n = new wa, this.map.set(e, n)), n.add(t)
            }

            get(t, e) {
                const n = this.map.get(t);
                return n ? n.get(t, e) : null
            }

            remove(t) {
                const e = t.trackById;
                return this.map.get(e).remove(t) && this.map.delete(e), t
            }

            get isEmpty() {
                return 0 === this.map.size
            }

            clear() {
                this.map.clear()
            }
        }

        function Sa(t, e, n) {
            const r = t.previousIndex;
            if (null === r) return r;
            let s = 0;
            return n && r < n.length && (s = n[r]), r + e + s
        }

        class xa {
            constructor() {
            }

            supports(t) {
                return t instanceof Map || fo(t)
            }

            create() {
                return new ka
            }
        }

        class ka {
            constructor() {
                this._records = new Map, this._mapHead = null, this._appendAfter = null, this._previousMapHead = null, this._changesHead = null, this._changesTail = null, this._additionsHead = null, this._additionsTail = null, this._removalsHead = null, this._removalsTail = null
            }

            get isDirty() {
                return null !== this._additionsHead || null !== this._changesHead || null !== this._removalsHead
            }

            forEachItem(t) {
                let e;
                for (e = this._mapHead; null !== e; e = e._next) t(e)
            }

            forEachPreviousItem(t) {
                let e;
                for (e = this._previousMapHead; null !== e; e = e._nextPrevious) t(e)
            }

            forEachChangedItem(t) {
                let e;
                for (e = this._changesHead; null !== e; e = e._nextChanged) t(e)
            }

            forEachAddedItem(t) {
                let e;
                for (e = this._additionsHead; null !== e; e = e._nextAdded) t(e)
            }

            forEachRemovedItem(t) {
                let e;
                for (e = this._removalsHead; null !== e; e = e._nextRemoved) t(e)
            }

            diff(t) {
                if (t) {
                    if (!(t instanceof Map || fo(t))) throw new Error(`Error trying to diff '${tt(t)}'. Only maps and objects are allowed`)
                } else t = new Map;
                return this.check(t) ? this : null
            }

            onDestroy() {
            }

            check(t) {
                this._reset();
                let e = this._mapHead;
                if (this._appendAfter = null, this._forEach(t, (t, n) => {
                    if (e && e.key === n) this._maybeAddToChanges(e, t), this._appendAfter = e, e = e._next; else {
                        const r = this._getOrCreateRecordForKey(n, t);
                        e = this._insertBeforeOrAppend(e, r)
                    }
                }), e) {
                    e._prev && (e._prev._next = null), this._removalsHead = e;
                    for (let t = e; null !== t; t = t._nextRemoved) t === this._mapHead && (this._mapHead = null), this._records.delete(t.key), t._nextRemoved = t._next, t.previousValue = t.currentValue, t.currentValue = null, t._prev = null, t._next = null
                }
                return this._changesTail && (this._changesTail._nextChanged = null), this._additionsTail && (this._additionsTail._nextAdded = null), this.isDirty
            }

            _insertBeforeOrAppend(t, e) {
                if (t) {
                    const n = t._prev;
                    return e._next = t, e._prev = n, t._prev = e, n && (n._next = e), t === this._mapHead && (this._mapHead = e), this._appendAfter = t, t
                }
                return this._appendAfter ? (this._appendAfter._next = e, e._prev = this._appendAfter) : this._mapHead = e, this._appendAfter = e, null
            }

            _getOrCreateRecordForKey(t, e) {
                if (this._records.has(t)) {
                    const n = this._records.get(t);
                    this._maybeAddToChanges(n, e);
                    const r = n._prev, s = n._next;
                    return r && (r._next = s), s && (s._prev = r), n._next = null, n._prev = null, n
                }
                const n = new Ta(t);
                return this._records.set(t, n), n.currentValue = e, this._addToAdditions(n), n
            }

            _reset() {
                if (this.isDirty) {
                    let t;
                    for (this._previousMapHead = this._mapHead, t = this._previousMapHead; null !== t; t = t._next) t._nextPrevious = t._next;
                    for (t = this._changesHead; null !== t; t = t._nextChanged) t.previousValue = t.currentValue;
                    for (t = this._additionsHead; null != t; t = t._nextAdded) t.previousValue = t.currentValue;
                    this._changesHead = this._changesTail = null, this._additionsHead = this._additionsTail = null, this._removalsHead = null
                }
            }

            _maybeAddToChanges(t, e) {
                Object.is(e, t.currentValue) || (t.previousValue = t.currentValue, t.currentValue = e, this._addToChanges(t))
            }

            _addToAdditions(t) {
                null === this._additionsHead ? this._additionsHead = this._additionsTail = t : (this._additionsTail._nextAdded = t, this._additionsTail = t)
            }

            _addToChanges(t) {
                null === this._changesHead ? this._changesHead = this._changesTail = t : (this._changesTail._nextChanged = t, this._changesTail = t)
            }

            _forEach(t, e) {
                t instanceof Map ? t.forEach(e) : Object.keys(t).forEach(n => e(t[n], n))
            }
        }

        class Ta {
            constructor(t) {
                this.key = t, this.previousValue = null, this.currentValue = null, this._nextPrevious = null, this._next = null, this._prev = null, this._nextAdded = null, this._nextRemoved = null, this._nextChanged = null
            }
        }

        function Ia() {
            return new Ea([new ya])
        }

        let Ea = (() => {
            class t {
                constructor(t) {
                    this.factories = t
                }

                static create(e, n) {
                    if (null != n) {
                        const t = n.factories.slice();
                        e = e.concat(t)
                    }
                    return new t(e)
                }

                static extend(e) {
                    return {provide: t, useFactory: n => t.create(e, n || Ia()), deps: [[t, new fr, new dr]]}
                }

                find(t) {
                    const e = this.factories.find(e => e.supports(t));
                    if (null != e) return e;
                    throw new Error(`Cannot find a differ supporting object '${t}' of type '${n = t, n.name || typeof n}'`);
                    var n
                }
            }

            return t.\u0275prov = ut({token: t, providedIn: "root", factory: Ia}), t
        })();

        function Oa() {
            return new Aa([new xa])
        }

        let Aa = (() => {
            class t {
                constructor(t) {
                    this.factories = t
                }

                static create(e, n) {
                    if (n) {
                        const t = n.factories.slice();
                        e = e.concat(t)
                    }
                    return new t(e)
                }

                static extend(e) {
                    return {provide: t, useFactory: n => t.create(e, n || Oa()), deps: [[t, new fr, new dr]]}
                }

                find(t) {
                    const e = this.factories.find(e => e.supports(t));
                    if (e) return e;
                    throw new Error(`Cannot find a differ supporting object '${t}'`)
                }
            }

            return t.\u0275prov = ut({token: t, providedIn: "root", factory: Oa}), t
        })();

        function Ra(t, e, n, r, s = !1) {
            for (; null !== n;) {
                const i = e[n.index];
                if (null !== i && r.push(ye(i)), te(i)) for (let t = Jt; t < i.length; t++) {
                    const e = i[t], n = e[1].firstChild;
                    null !== n && Ra(e[1], e, n, r)
                }
                const o = n.type;
                if (8 & o) Ra(t, e, n.child, r); else if (32 & o) {
                    const t = us(n, e);
                    let s;
                    for (; s = t();) r.push(s)
                } else if (16 & o) {
                    const t = Is(e, n);
                    if (Array.isArray(t)) r.push(...t); else {
                        const n = hs(e[16]);
                        Ra(n[1], n, t, r, !0)
                    }
                }
                n = s ? n.projectionNext : n.next
            }
            return r
        }

        class La {
            constructor(t, e) {
                this._lView = t, this._cdRefInjectingView = e, this._appRef = null, this._attachedToViewContainer = !1
            }

            get rootNodes() {
                const t = this._lView, e = t[1];
                return Ra(e, t, e.firstChild, [])
            }

            get context() {
                return this._lView[8]
            }

            set context(t) {
                this._lView[8] = t
            }

            get destroyed() {
                return 256 == (256 & this._lView[2])
            }

            destroy() {
                if (this._appRef) this._appRef.detachView(this); else if (this._attachedToViewContainer) {
                    const t = this._lView[3];
                    if (te(t)) {
                        const e = t[8], n = e ? e.indexOf(this) : -1;
                        n > -1 && (vs(t, n), Yn(e, n))
                    }
                    this._attachedToViewContainer = !1
                }
                bs(this._lView[1], this._lView)
            }

            onDestroy(t) {
                fi(this._lView[1], this._lView, null, t)
            }

            markForCheck() {
                Ri(this._cdRefInjectingView || this._lView)
            }

            detach() {
                this._lView[2] &= -129
            }

            reattach() {
                this._lView[2] |= 128
            }

            detectChanges() {
                Li(this._lView[1], this._lView, this.context)
            }

            checkNoChanges() {
                !function (t, e, n) {
                    Fe(!0);
                    try {
                        Li(t, e, n)
                    } finally {
                        Fe(!1)
                    }
                }(this._lView[1], this._lView, this.context)
            }

            attachToViewContainerRef() {
                if (this._appRef) throw new Error("This view is already attached directly to the ApplicationRef!");
                this._attachedToViewContainer = !0
            }

            detachFromAppRef() {
                var t;
                this._appRef = null, As(this._lView[1], t = this._lView, t[11], 2, null, null)
            }

            attachToAppRef(t) {
                if (this._attachedToViewContainer) throw new Error("This view is already attached to a ViewContainer!");
                this._appRef = t
            }
        }

        class Pa extends La {
            constructor(t) {
                super(t), this._view = t
            }

            detectChanges() {
                Pi(this._view)
            }

            checkNoChanges() {
                !function (t) {
                    Fe(!0);
                    try {
                        Pi(t)
                    } finally {
                        Fe(!1)
                    }
                }(this._view)
            }

            get context() {
                return null
            }
        }

        const ja = function (t) {
            return function (t, e, n) {
                if (ne(t) && !n) {
                    const n = Ce(t.index, e);
                    return new La(n, n)
                }
                return 47 & t.type ? new La(e[16], e) : null
            }(Pe(), Ae(), 16 == (16 & t))
        };
        let Da = (() => {
            class t {
            }

            return t.__NG_ELEMENT_ID__ = ja, t
        })();
        const Ma = [new xa], Na = new Ea([new ya]), Ha = new Aa(Ma), Fa = function () {
            return za(Pe(), Ae())
        };
        let Ua = (() => {
            class t {
            }

            return t.__NG_ELEMENT_ID__ = Fa, t
        })();
        const $a = Ua, Va = class extends $a {
            constructor(t, e, n) {
                super(), this._declarationLView = t, this._declarationTContainer = e, this.elementRef = n
            }

            createEmbeddedView(t) {
                const e = this._declarationTContainer.tViews,
                    n = ei(this._declarationLView, e, t, 16, null, e.declTNode, null, null, null, null);
                n[17] = this._declarationLView[this._declarationTContainer.index];
                const r = this._declarationLView[19];
                return null !== r && (n[19] = r.createEmbeddedView(e)), si(e, n, t), new La(n)
            }
        };

        function za(t, e) {
            return 4 & t.type ? new Va(e, t, aa(t, e)) : null
        }

        class qa {
        }

        class Ba {
        }

        const Wa = function () {
            return Ja(Pe(), Ae())
        };
        let Ga = (() => {
            class t {
            }

            return t.__NG_ELEMENT_ID__ = Wa, t
        })();
        const Za = Ga, Qa = class extends Za {
            constructor(t, e, n) {
                super(), this._lContainer = t, this._hostTNode = e, this._hostLView = n
            }

            get element() {
                return aa(this._hostTNode, this._hostLView)
            }

            get injector() {
                return new Fn(this._hostTNode, this._hostLView)
            }

            get parentInjector() {
                const t = In(this._hostTNode, this._hostLView);
                if (vn(t)) {
                    const e = _n(t, this._hostLView), n = bn(t);
                    return new Fn(e[1].data[n + 8], e)
                }
                return new Fn(null, this._hostLView)
            }

            clear() {
                for (; this.length > 0;) this.remove(this.length - 1)
            }

            get(t) {
                const e = Ka(this._lContainer);
                return null !== e && e[t] || null
            }

            get length() {
                return this._lContainer.length - Jt
            }

            createEmbeddedView(t, e, n) {
                const r = t.createEmbeddedView(e || {});
                return this.insert(r, n), r
            }

            createComponent(t, e, n, r, s) {
                const i = n || this.parentInjector;
                if (!s && null == t.ngModule && i) {
                    const t = i.get(qa, null);
                    t && (s = t)
                }
                const o = t.create(i, r, void 0, s);
                return this.insert(o.hostView, e), o
            }

            insert(t, e) {
                const n = t._lView, r = n[1];
                if (te(n[3])) {
                    const e = this.indexOf(t);
                    if (-1 !== e) this.detach(e); else {
                        const e = n[3], r = new Qa(e, e[6], e[3]);
                        r.detach(r.indexOf(t))
                    }
                }
                const s = this._adjustIndex(e), i = this._lContainer;
                !function (t, e, n, r) {
                    const s = Jt + r, i = n.length;
                    r > 0 && (n[s - 1][4] = e), r < i - Jt ? (e[4] = n[s], Kn(n, Jt + r, e)) : (n.push(e), e[4] = null), e[3] = n;
                    const o = e[17];
                    null !== o && n !== o && function (t, e) {
                        const n = t[9];
                        e[16] !== e[3][3][16] && (t[2] = !0), null === n ? t[9] = [e] : n.push(e)
                    }(o, e);
                    const a = e[19];
                    null !== a && a.insertView(t), e[2] |= 128
                }(r, n, i, s);
                const o = Es(s, i), a = n[11], c = xs(a, i[7]);
                return null !== c && function (t, e, n, r, s, i) {
                    r[0] = s, r[6] = e, As(t, r, n, 1, s, i)
                }(r, i[6], a, n, c, o), t.attachToViewContainerRef(), Kn(Ya(i), s, t), t
            }

            move(t, e) {
                return this.insert(t, e)
            }

            indexOf(t) {
                const e = Ka(this._lContainer);
                return null !== e ? e.indexOf(t) : -1
            }

            remove(t) {
                const e = this._adjustIndex(t, -1), n = vs(this._lContainer, e);
                n && (Yn(Ya(this._lContainer), e), bs(n[1], n))
            }

            detach(t) {
                const e = this._adjustIndex(t, -1), n = vs(this._lContainer, e);
                return n && null != Yn(Ya(this._lContainer), e) ? new La(n) : null
            }

            _adjustIndex(t, e = 0) {
                return null == t ? this.length + e : t
            }
        };

        function Ka(t) {
            return t[8]
        }

        function Ya(t) {
            return t[8] || (t[8] = [])
        }

        function Ja(t, e) {
            let n;
            const r = e[t.index];
            if (te(r)) n = r; else {
                let s;
                if (8 & t.type) s = ye(r); else {
                    const n = e[11];
                    s = n.createComment("");
                    const r = be(t, e);
                    ws(n, xs(n, r), s, function (t, e) {
                        return ge(t) ? t.nextSibling(e) : e.nextSibling
                    }(n, r), !1)
                }
                e[t.index] = n = Ti(r, e, s, t), Ai(e, n)
            }
            return new Qa(n, t, e)
        }

        const Xa = {};

        class tc extends ia {
            constructor(t) {
                super(), this.ngModule = t
            }

            resolveComponentFactory(t) {
                const e = Qt(t);
                return new rc(e, this.ngModule)
            }
        }

        function ec(t) {
            const e = [];
            for (let n in t) t.hasOwnProperty(n) && e.push({propName: t[n], templateName: n});
            return e
        }

        const nc = new Bn("SCHEDULER_TOKEN", {providedIn: "root", factory: () => os});

        class rc extends ra {
            constructor(t, e) {
                super(), this.componentDef = t, this.ngModule = e, this.componentType = t.type, this.selector = t.selectors.map(qs).join(","), this.ngContentSelectors = t.ngContentSelectors ? t.ngContentSelectors : [], this.isBoundToModule = !!e
            }

            get inputs() {
                return ec(this.componentDef.inputs)
            }

            get outputs() {
                return ec(this.componentDef.outputs)
            }

            create(t, e, n, r) {
                const s = (r = r || this.ngModule) ? function (t, e) {
                        return {
                            get: (n, r, s) => {
                                const i = t.get(n, Xa, s);
                                return i !== Xa || r === Xa ? i : e.get(n, r, s)
                            }
                        }
                    }(t, r.injector) : t, i = s.get(ha, me), o = s.get(pa, null),
                    a = i.createRenderer(null, this.componentDef), c = this.componentDef.selectors[0][0] || "div",
                    l = n ? function (t, e, n) {
                        if (ge(t)) return t.selectRootElement(e, n === kt.ShadowDom);
                        let r = "string" == typeof e ? t.querySelector(e) : e;
                        return r.textContent = "", r
                    }(a, n, this.componentDef.encapsulation) : ms(i.createRenderer(null, this.componentDef), c, function (t) {
                        const e = t.toLowerCase();
                        return "svg" === e ? de : "math" === e ? "http://www.w3.org/1998/MathML/" : null
                    }(c)), u = this.componentDef.onPush ? 576 : 528,
                    h = {components: [], scheduler: os, clean: Di, playerHandler: null, flags: 0},
                    d = di(0, null, null, 1, 0, null, null, null, null, null),
                    f = ei(null, d, h, u, null, null, i, a, o, s);
                let p, g;
                Ze(f);
                try {
                    const t = function (t, e, n, r, s, i) {
                        const o = n[1];
                        n[20] = t;
                        const a = ni(o, 20, 2, "#host", null), c = a.mergedAttrs = e.hostAttrs;
                        null !== c && (Ui(a, c, !0), null !== t && (fn(s, t, c), null !== a.classes && Ps(s, t, a.classes), null !== a.styles && Ls(s, t, a.styles)));
                        const l = r.createRenderer(t, e),
                            u = ei(n, hi(e), null, e.onPush ? 64 : 16, n[20], a, r, l, null, null);
                        return o.firstCreatePass && (En(xn(a, n), o, e.type), bi(o, a), wi(a, n.length, 1)), Ai(n, u), n[20] = u
                    }(l, this.componentDef, f, i, a);
                    if (l) if (n) fn(a, l, ["ng-version", ma.full]); else {
                        const {attrs: t, classes: e} = function (t) {
                            const e = [], n = [];
                            let r = 1, s = 2;
                            for (; r < t.length;) {
                                let i = t[r];
                                if ("string" == typeof i) 2 === s ? "" !== i && e.push(i, t[++r]) : 8 === s && n.push(i); else {
                                    if (!Us(s)) break;
                                    s = i
                                }
                                r++
                            }
                            return {attrs: e, classes: n}
                        }(this.componentDef.selectors[0]);
                        t && fn(a, l, t), e && e.length > 0 && Ps(a, l, e.join(" "))
                    }
                    if (g = _e(d, Yt), void 0 !== e) {
                        const t = g.projection = [];
                        for (let n = 0; n < this.ngContentSelectors.length; n++) {
                            const r = e[n];
                            t.push(null != r ? Array.from(r) : null)
                        }
                    }
                    p = function (t, e, n, r, s) {
                        const i = n[1], o = function (t, e, n) {
                            const r = Pe();
                            t.firstCreatePass && (n.providersResolver && n.providersResolver(n), Ci(t, r, e, ri(t, e, 1, null), n));
                            const s = Mn(e, t, r.directiveStart, r);
                            ts(s, e);
                            const i = be(r, e);
                            return i && ts(i, e), s
                        }(i, n, e);
                        if (r.components.push(o), t[8] = o, s && s.forEach(t => t(o, e)), e.contentQueries) {
                            const t = Pe();
                            e.contentQueries(1, o, t.directiveStart)
                        }
                        const a = Pe();
                        return !i.firstCreatePass || null === e.hostBindings && null === e.hostAttrs || (en(a.index), yi(n[1], a, 0, a.directiveStart, a.directiveEnd, e), vi(e, o)), o
                    }(t, this.componentDef, f, h, [no]), si(d, f, null)
                } finally {
                    Xe()
                }
                return new sc(this.componentType, p, aa(g, f), f, g)
            }
        }

        class sc extends class {
        } {
            constructor(t, e, n, r, s) {
                super(), this.location = n, this._rootLView = r, this._tNode = s, this.instance = e, this.hostView = this.changeDetectorRef = new Pa(r), this.componentType = t
            }

            get injector() {
                return new Fn(this._tNode, this._rootLView)
            }

            destroy() {
                this.hostView.destroy()
            }

            onDestroy(t) {
                this.hostView.onDestroy(t)
            }
        }

        const ic = new Map;

        class oc extends qa {
            constructor(t, e) {
                super(), this._parent = e, this._bootstrapComponents = [], this.injector = this, this.destroyCbs = [], this.componentFactoryResolver = new tc(this);
                const n = Kt(t), r = t[Nt] || null;
                r && na(r), this._bootstrapComponents = cs(n.bootstrap), this._r3Injector = Zi(t, e, [{
                    provide: qa,
                    useValue: this
                }, {
                    provide: ia,
                    useValue: this.componentFactoryResolver
                }], tt(t)), this._r3Injector._resolveInjectorDefTypes(), this.instance = this.get(t)
            }

            get(t, e = eo.THROW_IF_NOT_FOUND, n = bt.Default) {
                return t === eo || t === qa || t === $i ? this : this._r3Injector.get(t, e, n)
            }

            destroy() {
                const t = this._r3Injector;
                !t.destroyed && t.destroy(), this.destroyCbs.forEach(t => t()), this.destroyCbs = null
            }

            onDestroy(t) {
                this.destroyCbs.push(t)
            }
        }

        class ac extends Ba {
            constructor(t) {
                super(), this.moduleType = t, null !== Kt(t) && function (t) {
                    const e = new Set;
                    !function t(n) {
                        const r = Kt(n, !0), s = r.id;
                        null !== s && (function (t, e, n) {
                            if (e && e !== n) throw new Error(`Duplicate module registered for ${t} - ${tt(e)} vs ${tt(e.name)}`)
                        }(s, ic.get(s), n), ic.set(s, n));
                        const i = cs(r.imports);
                        for (const o of i) e.has(o) || (e.add(o), t(o))
                    }(t)
                }(t)
            }

            create(t) {
                return new oc(this.moduleType, t)
            }
        }

        function cc(t, e, n, r) {
            return hc(Ae(), Ue(), t, e, n, r)
        }

        function lc(t, e, n, r, s) {
            return dc(Ae(), Ue(), t, e, n, r, s)
        }

        function uc(t, e) {
            const n = t[e];
            return n === Bs ? void 0 : n
        }

        function hc(t, e, n, r, s, i) {
            const o = e + n;
            return go(t, o, s) ? po(t, o + 1, i ? r.call(i, s) : r(s)) : uc(t, o + 1)
        }

        function dc(t, e, n, r, s, i, o) {
            const a = e + n;
            return mo(t, a, s, i) ? po(t, a + 2, o ? r.call(o, s, i) : r(s, i)) : uc(t, a + 2)
        }

        function fc(t, e, n, r, s, i, o, a) {
            const c = e + n;
            return function (t, e, n, r, s) {
                const i = mo(t, e, n, r);
                return go(t, e + 2, s) || i
            }(t, c, s, i, o) ? po(t, c + 3, a ? r.call(a, s, i, o) : r(s, i, o)) : uc(t, c + 3)
        }

        function pc(t, e) {
            const n = Re();
            let r;
            const s = t + Yt;
            n.firstCreatePass ? (r = function (t, e) {
                if (e) for (let n = e.length - 1; n >= 0; n--) {
                    const r = e[n];
                    if (t === r.name) return r
                }
                throw new ot("302", `The pipe '${t}' could not be found!`)
            }(e, n.pipeRegistry), n.data[s] = r, r.onDestroy && (n.destroyHooks || (n.destroyHooks = [])).push(s, r.onDestroy)) : r = n.data[s];
            const i = r.factory || (r.factory = ie(r.type)), o = wt(_o);
            try {
                const t = Cn(!1), e = i();
                return Cn(t), function (t, e, n, r) {
                    n >= t.data.length && (t.data[n] = null, t.blueprint[n] = null), e[n] = r
                }(n, Ae(), s, e), e
            } finally {
                wt(o)
            }
        }

        function gc(t, e, n) {
            const r = t + Yt, s = Ae(), i = we(s, r);
            return vc(s, yc(s, r) ? hc(s, Ue(), e, i.transform, n, i) : i.transform(n))
        }

        function mc(t, e, n, r) {
            const s = t + Yt, i = Ae(), o = we(i, s);
            return vc(i, yc(i, s) ? dc(i, Ue(), e, o.transform, n, r, o) : o.transform(n, r))
        }

        function yc(t, e) {
            return t[1].data[e].pure
        }

        function vc(t, e) {
            return uo.isWrapped(e) && (e = uo.unwrap(e), t[Ee.lFrame.bindingIndex] = Bs), e
        }

        function bc(t) {
            return e => {
                setTimeout(t, void 0, e)
            }
        }

        const _c = class extends S {
            constructor(t = !1) {
                super(), this.__isAsync = t
            }

            emit(t) {
                super.next(t)
            }

            subscribe(t, e, n) {
                var r, s, i;
                let o = t, a = e || (() => null), c = n;
                if (t && "object" == typeof t) {
                    const e = t;
                    o = null === (r = e.next) || void 0 === r ? void 0 : r.bind(e), a = null === (s = e.error) || void 0 === s ? void 0 : s.bind(e), c = null === (i = e.complete) || void 0 === i ? void 0 : i.bind(e)
                }
                this.__isAsync && (a = bc(a), o && (o = bc(o)), c && (c = bc(c)));
                const l = super.subscribe({next: o, error: a, complete: c});
                return t instanceof h && t.add(l), l
            }
        };

        function wc() {
            return this._results[lo()]()
        }

        class Cc {
            constructor(t = !1) {
                this._emitDistinctChangesOnly = t, this.dirty = !0, this._results = [], this._changesDetected = !1, this._changes = null, this.length = 0, this.first = void 0, this.last = void 0;
                const e = lo(), n = Cc.prototype;
                n[e] || (n[e] = wc)
            }

            get changes() {
                return this._changes || (this._changes = new _c)
            }

            get(t) {
                return this._results[t]
            }

            map(t) {
                return this._results.map(t)
            }

            filter(t) {
                return this._results.filter(t)
            }

            find(t) {
                return this._results.find(t)
            }

            reduce(t, e) {
                return this._results.reduce(t, e)
            }

            forEach(t) {
                this._results.forEach(t)
            }

            some(t) {
                return this._results.some(t)
            }

            toArray() {
                return this._results.slice()
            }

            toString() {
                return this._results.toString()
            }

            reset(t, e) {
                const n = this;
                n.dirty = !1;
                const r = Zn(t);
                (this._changesDetected = !function (t, e, n) {
                    if (t.length !== e.length) return !1;
                    for (let r = 0; r < t.length; r++) {
                        let s = t[r], i = e[r];
                        if (n && (s = n(s), i = n(i)), i !== s) return !1
                    }
                    return !0
                }(n._results, r, e)) && (n._results = r, n.length = r.length, n.last = r[this.length - 1], n.first = r[0])
            }

            notifyOnChanges() {
                !this._changes || !this._changesDetected && this._emitDistinctChangesOnly || this._changes.emit(this)
            }

            setDirty() {
                this.dirty = !0
            }

            destroy() {
                this.changes.complete(), this.changes.unsubscribe()
            }
        }

        Symbol;

        class Sc {
            constructor(t) {
                this.queryList = t, this.matches = null
            }

            clone() {
                return new Sc(this.queryList)
            }

            setDirty() {
                this.queryList.setDirty()
            }
        }

        class xc {
            constructor(t = []) {
                this.queries = t
            }

            createEmbeddedView(t) {
                const e = t.queries;
                if (null !== e) {
                    const n = null !== t.contentQueries ? t.contentQueries[0] : e.length, r = [];
                    for (let t = 0; t < n; t++) {
                        const n = e.getByIndex(t);
                        r.push(this.queries[n.indexInDeclarationView].clone())
                    }
                    return new xc(r)
                }
                return null
            }

            insertView(t) {
                this.dirtyQueriesWithMatches(t)
            }

            detachView(t) {
                this.dirtyQueriesWithMatches(t)
            }

            dirtyQueriesWithMatches(t) {
                for (let e = 0; e < this.queries.length; e++) null !== Hc(t, e).matches && this.queries[e].setDirty()
            }
        }

        class kc {
            constructor(t, e, n = null) {
                this.predicate = t, this.flags = e, this.read = n
            }
        }

        class Tc {
            constructor(t = []) {
                this.queries = t
            }

            elementStart(t, e) {
                for (let n = 0; n < this.queries.length; n++) this.queries[n].elementStart(t, e)
            }

            elementEnd(t) {
                for (let e = 0; e < this.queries.length; e++) this.queries[e].elementEnd(t)
            }

            embeddedTView(t) {
                let e = null;
                for (let n = 0; n < this.length; n++) {
                    const r = null !== e ? e.length : 0, s = this.getByIndex(n).embeddedTView(t, r);
                    s && (s.indexInDeclarationView = n, null !== e ? e.push(s) : e = [s])
                }
                return null !== e ? new Tc(e) : null
            }

            template(t, e) {
                for (let n = 0; n < this.queries.length; n++) this.queries[n].template(t, e)
            }

            getByIndex(t) {
                return this.queries[t]
            }

            get length() {
                return this.queries.length
            }

            track(t) {
                this.queries.push(t)
            }
        }

        class Ic {
            constructor(t, e = -1) {
                this.metadata = t, this.matches = null, this.indexInDeclarationView = -1, this.crossesNgTemplate = !1, this._appliesToNextNode = !0, this._declarationNodeIndex = e
            }

            elementStart(t, e) {
                this.isApplyingToNode(e) && this.matchTNode(t, e)
            }

            elementEnd(t) {
                this._declarationNodeIndex === t.index && (this._appliesToNextNode = !1)
            }

            template(t, e) {
                this.elementStart(t, e)
            }

            embeddedTView(t, e) {
                return this.isApplyingToNode(t) ? (this.crossesNgTemplate = !0, this.addMatch(-t.index, e), new Ic(this.metadata)) : null
            }

            isApplyingToNode(t) {
                if (this._appliesToNextNode && 1 != (1 & this.metadata.flags)) {
                    const e = this._declarationNodeIndex;
                    let n = t.parent;
                    for (; null !== n && 8 & n.type && n.index !== e;) n = n.parent;
                    return e === (null !== n ? n.index : -1)
                }
                return this._appliesToNextNode
            }

            matchTNode(t, e) {
                const n = this.metadata.predicate;
                if (Array.isArray(n)) for (let r = 0; r < n.length; r++) {
                    const s = n[r];
                    this.matchTNodeWithReadOption(t, e, Ec(e, s)), this.matchTNodeWithReadOption(t, e, Dn(e, t, s, !1, !1))
                } else n === Ua ? 4 & e.type && this.matchTNodeWithReadOption(t, e, -1) : this.matchTNodeWithReadOption(t, e, Dn(e, t, n, !1, !1))
            }

            matchTNodeWithReadOption(t, e, n) {
                if (null !== n) {
                    const r = this.metadata.read;
                    if (null !== r) if (r === la || r === Ga || r === Ua && 4 & e.type) this.addMatch(e.index, -2); else {
                        const n = Dn(e, t, r, !1, !1);
                        null !== n && this.addMatch(e.index, n)
                    } else this.addMatch(e.index, n)
                }
            }

            addMatch(t, e) {
                null === this.matches ? this.matches = [t, e] : this.matches.push(t, e)
            }
        }

        function Ec(t, e) {
            const n = t.localNames;
            if (null !== n) for (let r = 0; r < n.length; r += 2) if (n[r] === e) return n[r + 1];
            return null
        }

        function Oc(t, e, n, r) {
            return -1 === n ? function (t, e) {
                return 11 & t.type ? aa(t, e) : 4 & t.type ? za(t, e) : null
            }(e, t) : -2 === n ? function (t, e, n) {
                return n === la ? aa(e, t) : n === Ua ? za(e, t) : n === Ga ? Ja(e, t) : void 0
            }(t, e, r) : Mn(t, t[1], n, e)
        }

        function Ac(t, e, n, r) {
            const s = e[19].queries[r];
            if (null === s.matches) {
                const r = t.data, i = n.matches, o = [];
                for (let t = 0; t < i.length; t += 2) {
                    const s = i[t];
                    o.push(s < 0 ? null : Oc(e, r[s], i[t + 1], n.metadata.read))
                }
                s.matches = o
            }
            return s.matches
        }

        function Rc(t, e, n, r) {
            const s = t.queries.getByIndex(n), i = s.matches;
            if (null !== i) {
                const o = Ac(t, e, s, n);
                for (let t = 0; t < i.length; t += 2) {
                    const n = i[t];
                    if (n > 0) r.push(o[t / 2]); else {
                        const s = i[t + 1], o = e[-n];
                        for (let t = Jt; t < o.length; t++) {
                            const e = o[t];
                            e[17] === e[3] && Rc(e[1], e, s, r)
                        }
                        if (null !== o[9]) {
                            const t = o[9];
                            for (let e = 0; e < t.length; e++) {
                                const n = t[e];
                                Rc(n[1], n, s, r)
                            }
                        }
                    }
                }
            }
            return r
        }

        function Lc(t) {
            const e = Ae(), n = Re(), r = qe();
            Be(r + 1);
            const s = Hc(n, r);
            if (t.dirty && Se(e) === (2 == (2 & s.metadata.flags))) {
                if (null === s.matches) t.reset([]); else {
                    const i = s.crossesNgTemplate ? Rc(n, e, r, []) : Ac(n, e, s, r);
                    t.reset(i, ua), t.notifyOnChanges()
                }
                return !0
            }
            return !1
        }

        function Pc(t, e, n) {
            const r = Re();
            r.firstCreatePass && (Nc(r, new kc(t, e, n), -1), 2 == (2 & e) && (r.staticViewQueries = !0)), Mc(r, Ae(), e)
        }

        function jc(t, e, n, r) {
            const s = Re();
            if (s.firstCreatePass) {
                const i = Pe();
                Nc(s, new kc(e, n, r), i.index), function (t, e) {
                    const n = t.contentQueries || (t.contentQueries = []);
                    e !== (n.length ? n[n.length - 1] : -1) && n.push(t.queries.length - 1, e)
                }(s, t), 2 == (2 & n) && (s.staticContentQueries = !0)
            }
            Mc(s, Ae(), n)
        }

        function Dc() {
            return t = Ae(), e = qe(), t[19].queries[e].queryList;
            var t, e
        }

        function Mc(t, e, n) {
            const r = new Cc(4 == (4 & n));
            fi(t, e, r, r.destroy), null === e[19] && (e[19] = new xc), e[19].queries.push(new Sc(r))
        }

        function Nc(t, e, n) {
            null === t.queries && (t.queries = new Tc), t.queries.track(new Ic(e, n))
        }

        function Hc(t, e) {
            return t.queries.getByIndex(e)
        }

        const Fc = new Bn("Application Initializer");
        let Uc = (() => {
            class t {
                constructor(t) {
                    this.appInits = t, this.resolve = oa, this.reject = oa, this.initialized = !1, this.done = !1, this.donePromise = new Promise((t, e) => {
                        this.resolve = t, this.reject = e
                    })
                }

                runInitializers() {
                    if (this.initialized) return;
                    const t = [], e = () => {
                        this.done = !0, this.resolve()
                    };
                    if (this.appInits) for (let n = 0; n < this.appInits.length; n++) {
                        const e = this.appInits[n]();
                        if (Oo(e)) t.push(e); else if (Ro(e)) {
                            const n = new Promise((t, n) => {
                                e.subscribe({complete: t, error: n})
                            });
                            t.push(n)
                        }
                    }
                    Promise.all(t).then(() => {
                        e()
                    }).catch(t => {
                        this.reject(t)
                    }), 0 === t.length && e(), this.initialized = !0
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(cr(Fc, 8))
            }, t.\u0275prov = ut({token: t, factory: t.\u0275fac}), t
        })();
        const $c = new Bn("AppId"), Vc = {
            provide: $c, useFactory: function () {
                return `${zc()}${zc()}${zc()}`
            }, deps: []
        };

        function zc() {
            return String.fromCharCode(97 + Math.floor(25 * Math.random()))
        }

        const qc = new Bn("Platform Initializer"), Bc = new Bn("Platform ID"), Wc = new Bn("appBootstrapListener");
        let Gc = (() => {
            class t {
                log(t) {
                    console.log(t)
                }

                warn(t) {
                    console.warn(t)
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)
            }, t.\u0275prov = ut({token: t, factory: t.\u0275fac}), t
        })();
        const Zc = new Bn("LocaleId"), Qc = new Bn("DefaultCurrencyCode");

        class Kc {
            constructor(t, e) {
                this.ngModuleFactory = t, this.componentFactories = e
            }
        }

        const Yc = function (t) {
            return new ac(t)
        }, Jc = Yc, Xc = function (t) {
            return Promise.resolve(Yc(t))
        }, tl = function (t) {
            const e = Yc(t), n = cs(Kt(t).declarations).reduce((t, e) => {
                const n = Qt(e);
                return n && t.push(new rc(n)), t
            }, []);
            return new Kc(e, n)
        }, el = tl, nl = function (t) {
            return Promise.resolve(tl(t))
        };
        let rl = (() => {
            class t {
                constructor() {
                    this.compileModuleSync = Jc, this.compileModuleAsync = Xc, this.compileModuleAndAllComponentsSync = el, this.compileModuleAndAllComponentsAsync = nl
                }

                clearCache() {
                }

                clearCacheFor(t) {
                }

                getModuleId(t) {
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)
            }, t.\u0275prov = ut({token: t, factory: t.\u0275fac}), t
        })();
        const sl = (() => Promise.resolve(0))();

        function il(t) {
            "undefined" == typeof Zone ? sl.then(() => {
                t && t.apply(null, null)
            }) : Zone.current.scheduleMicroTask("scheduleMicrotask", t)
        }

        class ol {
            constructor({
                            enableLongStackTrace: t = !1,
                            shouldCoalesceEventChangeDetection: e = !1,
                            shouldCoalesceRunChangeDetection: n = !1
                        }) {
                if (this.hasPendingMacrotasks = !1, this.hasPendingMicrotasks = !1, this.isStable = !0, this.onUnstable = new _c(!1), this.onMicrotaskEmpty = new _c(!1), this.onStable = new _c(!1), this.onError = new _c(!1), "undefined" == typeof Zone) throw new Error("In this configuration Angular requires Zone.js");
                Zone.assertZonePatched();
                const r = this;
                r._nesting = 0, r._outer = r._inner = Zone.current, Zone.TaskTrackingZoneSpec && (r._inner = r._inner.fork(new Zone.TaskTrackingZoneSpec)), t && Zone.longStackTraceZoneSpec && (r._inner = r._inner.fork(Zone.longStackTraceZoneSpec)), r.shouldCoalesceEventChangeDetection = !n && e, r.shouldCoalesceRunChangeDetection = n, r.lastRequestAnimationFrameId = -1, r.nativeRequestAnimationFrame = function () {
                    let t = At.requestAnimationFrame, e = At.cancelAnimationFrame;
                    if ("undefined" != typeof Zone && t && e) {
                        const n = t[Zone.__symbol__("OriginalDelegate")];
                        n && (t = n);
                        const r = e[Zone.__symbol__("OriginalDelegate")];
                        r && (e = r)
                    }
                    return {nativeRequestAnimationFrame: t, nativeCancelAnimationFrame: e}
                }().nativeRequestAnimationFrame, function (t) {
                    const e = () => {
                        !function (t) {
                            t.isCheckStableRunning || -1 !== t.lastRequestAnimationFrameId || (t.lastRequestAnimationFrameId = t.nativeRequestAnimationFrame.call(At, () => {
                                t.fakeTopEventTask || (t.fakeTopEventTask = Zone.root.scheduleEventTask("fakeTopEventTask", () => {
                                    t.lastRequestAnimationFrameId = -1, ll(t), t.isCheckStableRunning = !0, cl(t), t.isCheckStableRunning = !1
                                }, void 0, () => {
                                }, () => {
                                })), t.fakeTopEventTask.invoke()
                            }), ll(t))
                        }(t)
                    };
                    t._inner = t._inner.fork({
                        name: "angular",
                        properties: {isAngularZone: !0},
                        onInvokeTask: (n, r, s, i, o, a) => {
                            try {
                                return ul(t), n.invokeTask(s, i, o, a)
                            } finally {
                                (t.shouldCoalesceEventChangeDetection && "eventTask" === i.type || t.shouldCoalesceRunChangeDetection) && e(), hl(t)
                            }
                        },
                        onInvoke: (n, r, s, i, o, a, c) => {
                            try {
                                return ul(t), n.invoke(s, i, o, a, c)
                            } finally {
                                t.shouldCoalesceRunChangeDetection && e(), hl(t)
                            }
                        },
                        onHasTask: (e, n, r, s) => {
                            e.hasTask(r, s), n === r && ("microTask" == s.change ? (t._hasPendingMicrotasks = s.microTask, ll(t), cl(t)) : "macroTask" == s.change && (t.hasPendingMacrotasks = s.macroTask))
                        },
                        onHandleError: (e, n, r, s) => (e.handleError(r, s), t.runOutsideAngular(() => t.onError.emit(s)), !1)
                    })
                }(r)
            }

            static isInAngularZone() {
                return !0 === Zone.current.get("isAngularZone")
            }

            static assertInAngularZone() {
                if (!ol.isInAngularZone()) throw new Error("Expected to be in Angular Zone, but it is not!")
            }

            static assertNotInAngularZone() {
                if (ol.isInAngularZone()) throw new Error("Expected to not be in Angular Zone, but it is!")
            }

            run(t, e, n) {
                return this._inner.run(t, e, n)
            }

            runTask(t, e, n, r) {
                const s = this._inner, i = s.scheduleEventTask("NgZoneEvent: " + r, t, al, oa, oa);
                try {
                    return s.runTask(i, e, n)
                } finally {
                    s.cancelTask(i)
                }
            }

            runGuarded(t, e, n) {
                return this._inner.runGuarded(t, e, n)
            }

            runOutsideAngular(t) {
                return this._outer.run(t)
            }
        }

        const al = {};

        function cl(t) {
            if (0 == t._nesting && !t.hasPendingMicrotasks && !t.isStable) try {
                t._nesting++, t.onMicrotaskEmpty.emit(null)
            } finally {
                if (t._nesting--, !t.hasPendingMicrotasks) try {
                    t.runOutsideAngular(() => t.onStable.emit(null))
                } finally {
                    t.isStable = !0
                }
            }
        }

        function ll(t) {
            t.hasPendingMicrotasks = !!(t._hasPendingMicrotasks || (t.shouldCoalesceEventChangeDetection || t.shouldCoalesceRunChangeDetection) && -1 !== t.lastRequestAnimationFrameId)
        }

        function ul(t) {
            t._nesting++, t.isStable && (t.isStable = !1, t.onUnstable.emit(null))
        }

        function hl(t) {
            t._nesting--, cl(t)
        }

        class dl {
            constructor() {
                this.hasPendingMicrotasks = !1, this.hasPendingMacrotasks = !1, this.isStable = !0, this.onUnstable = new _c, this.onMicrotaskEmpty = new _c, this.onStable = new _c, this.onError = new _c
            }

            run(t, e, n) {
                return t.apply(e, n)
            }

            runGuarded(t, e, n) {
                return t.apply(e, n)
            }

            runOutsideAngular(t) {
                return t()
            }

            runTask(t, e, n, r) {
                return t.apply(e, n)
            }
        }

        let fl = (() => {
            class t {
                constructor(t) {
                    this._ngZone = t, this._pendingCount = 0, this._isZoneStable = !0, this._didWork = !1, this._callbacks = [], this.taskTrackingZone = null, this._watchAngularEvents(), t.run(() => {
                        this.taskTrackingZone = "undefined" == typeof Zone ? null : Zone.current.get("TaskTrackingZone")
                    })
                }

                _watchAngularEvents() {
                    this._ngZone.onUnstable.subscribe({
                        next: () => {
                            this._didWork = !0, this._isZoneStable = !1
                        }
                    }), this._ngZone.runOutsideAngular(() => {
                        this._ngZone.onStable.subscribe({
                            next: () => {
                                ol.assertNotInAngularZone(), il(() => {
                                    this._isZoneStable = !0, this._runCallbacksIfReady()
                                })
                            }
                        })
                    })
                }

                increasePendingRequestCount() {
                    return this._pendingCount += 1, this._didWork = !0, this._pendingCount
                }

                decreasePendingRequestCount() {
                    if (this._pendingCount -= 1, this._pendingCount < 0) throw new Error("pending async requests below zero");
                    return this._runCallbacksIfReady(), this._pendingCount
                }

                isStable() {
                    return this._isZoneStable && 0 === this._pendingCount && !this._ngZone.hasPendingMacrotasks
                }

                _runCallbacksIfReady() {
                    if (this.isStable()) il(() => {
                        for (; 0 !== this._callbacks.length;) {
                            let t = this._callbacks.pop();
                            clearTimeout(t.timeoutId), t.doneCb(this._didWork)
                        }
                        this._didWork = !1
                    }); else {
                        let t = this.getPendingTasks();
                        this._callbacks = this._callbacks.filter(e => !e.updateCb || !e.updateCb(t) || (clearTimeout(e.timeoutId), !1)), this._didWork = !0
                    }
                }

                getPendingTasks() {
                    return this.taskTrackingZone ? this.taskTrackingZone.macroTasks.map(t => ({
                        source: t.source,
                        creationLocation: t.creationLocation,
                        data: t.data
                    })) : []
                }

                addCallback(t, e, n) {
                    let r = -1;
                    e && e > 0 && (r = setTimeout(() => {
                        this._callbacks = this._callbacks.filter(t => t.timeoutId !== r), t(this._didWork, this.getPendingTasks())
                    }, e)), this._callbacks.push({doneCb: t, timeoutId: r, updateCb: n})
                }

                whenStable(t, e, n) {
                    if (n && !this.taskTrackingZone) throw new Error('Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?');
                    this.addCallback(t, e, n), this._runCallbacksIfReady()
                }

                getPendingRequestCount() {
                    return this._pendingCount
                }

                findProviders(t, e, n) {
                    return []
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(cr(ol))
            }, t.\u0275prov = ut({token: t, factory: t.\u0275fac}), t
        })(), pl = (() => {
            class t {
                constructor() {
                    this._applications = new Map, yl.addToWindow(this)
                }

                registerApplication(t, e) {
                    this._applications.set(t, e)
                }

                unregisterApplication(t) {
                    this._applications.delete(t)
                }

                unregisterAllApplications() {
                    this._applications.clear()
                }

                getTestability(t) {
                    return this._applications.get(t) || null
                }

                getAllTestabilities() {
                    return Array.from(this._applications.values())
                }

                getAllRootElements() {
                    return Array.from(this._applications.keys())
                }

                findTestabilityInTree(t, e = !0) {
                    return yl.findTestabilityInTree(this, t, e)
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)
            }, t.\u0275prov = ut({token: t, factory: t.\u0275fac}), t
        })();

        class gl {
            addToWindow(t) {
            }

            findTestabilityInTree(t, e, n) {
                return null
            }
        }

        let ml, yl = new gl, vl = !0, bl = !1;
        const _l = new Bn("AllowMultipleToken");

        class wl {
            constructor(t, e) {
                this.name = t, this.token = e
            }
        }

        function Cl(t, e, n = []) {
            const r = `Platform: ${e}`, s = new Bn(r);
            return (e = []) => {
                let i = Sl();
                if (!i || i.injector.get(_l, !1)) if (t) t(n.concat(e).concat({provide: s, useValue: !0})); else {
                    const t = n.concat(e).concat({provide: s, useValue: !0}, {provide: zi, useValue: "platform"});
                    !function (t) {
                        if (ml && !ml.destroyed && !ml.injector.get(_l, !1)) throw new Error("There can be only one platform. Destroy the previous one to create a new one.");
                        ml = t.get(xl);
                        const e = t.get(qc, null);
                        e && e.forEach(t => t())
                    }(eo.create({providers: t, name: r}))
                }
                return function (t) {
                    const e = Sl();
                    if (!e) throw new Error("No platform exists!");
                    if (!e.injector.get(t, null)) throw new Error("A platform with a different configuration has been created. Please destroy it first.");
                    return e
                }(s)
            }
        }

        function Sl() {
            return ml && !ml.destroyed ? ml : null
        }

        let xl = (() => {
            class t {
                constructor(t) {
                    this._injector = t, this._modules = [], this._destroyListeners = [], this._destroyed = !1
                }

                bootstrapModuleFactory(t, e) {
                    const n = function (t, e) {
                        let n;
                        return n = "noop" === t ? new dl : ("zone.js" === t ? void 0 : t) || new ol({
                            enableLongStackTrace: (bl = !0, vl),
                            shouldCoalesceEventChangeDetection: !!(null == e ? void 0 : e.ngZoneEventCoalescing),
                            shouldCoalesceRunChangeDetection: !!(null == e ? void 0 : e.ngZoneRunCoalescing)
                        }), n
                    }(e ? e.ngZone : void 0, {
                        ngZoneEventCoalescing: e && e.ngZoneEventCoalescing || !1,
                        ngZoneRunCoalescing: e && e.ngZoneRunCoalescing || !1
                    }), r = [{provide: ol, useValue: n}];
                    return n.run(() => {
                        const e = eo.create({providers: r, parent: this.injector, name: t.moduleType.name}),
                            s = t.create(e), i = s.injector.get(is, null);
                        if (!i) throw new Error("No ErrorHandler. Is platform module (BrowserModule) included?");
                        return n.runOutsideAngular(() => {
                            const t = n.onError.subscribe({
                                next: t => {
                                    i.handleError(t)
                                }
                            });
                            s.onDestroy(() => {
                                Il(this._modules, s), t.unsubscribe()
                            })
                        }), function (t, e, n) {
                            try {
                                const r = n();
                                return Oo(r) ? r.catch(n => {
                                    throw e.runOutsideAngular(() => t.handleError(n)), n
                                }) : r
                            } catch (r) {
                                throw e.runOutsideAngular(() => t.handleError(r)), r
                            }
                        }(i, n, () => {
                            const t = s.injector.get(Uc);
                            return t.runInitializers(), t.donePromise.then(() => (na(s.injector.get(Zc, ta) || ta), this._moduleDoBootstrap(s), s))
                        })
                    })
                }

                bootstrapModule(t, e = []) {
                    const n = kl({}, e);
                    return function (t, e, n) {
                        const r = new ac(n);
                        return Promise.resolve(r)
                    }(0, 0, t).then(t => this.bootstrapModuleFactory(t, n))
                }

                _moduleDoBootstrap(t) {
                    const e = t.injector.get(Tl);
                    if (t._bootstrapComponents.length > 0) t._bootstrapComponents.forEach(t => e.bootstrap(t)); else {
                        if (!t.instance.ngDoBootstrap) throw new Error(`The module ${tt(t.instance.constructor)} was bootstrapped, but it does not declare "@NgModule.bootstrap" components nor a "ngDoBootstrap" method. Please define one of these.`);
                        t.instance.ngDoBootstrap(e)
                    }
                    this._modules.push(t)
                }

                onDestroy(t) {
                    this._destroyListeners.push(t)
                }

                get injector() {
                    return this._injector
                }

                destroy() {
                    if (this._destroyed) throw new Error("The platform has already been destroyed!");
                    this._modules.slice().forEach(t => t.destroy()), this._destroyListeners.forEach(t => t()), this._destroyed = !0
                }

                get destroyed() {
                    return this._destroyed
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(cr(eo))
            }, t.\u0275prov = ut({token: t, factory: t.\u0275fac}), t
        })();

        function kl(t, e) {
            return Array.isArray(e) ? e.reduce(kl, t) : Object.assign(Object.assign({}, t), e)
        }

        let Tl = (() => {
            class t {
                constructor(t, e, n, r, s) {
                    this._zone = t, this._injector = e, this._exceptionHandler = n, this._componentFactoryResolver = r, this._initStatus = s, this._bootstrapListeners = [], this._views = [], this._runningTick = !1, this._stable = !0, this.componentTypes = [], this.components = [], this._onMicrotaskEmptySubscription = this._zone.onMicrotaskEmpty.subscribe({
                        next: () => {
                            this._zone.run(() => {
                                this.tick()
                            })
                        }
                    });
                    const i = new v(t => {
                        this._stable = this._zone.isStable && !this._zone.hasPendingMacrotasks && !this._zone.hasPendingMicrotasks, this._zone.runOutsideAngular(() => {
                            t.next(this._stable), t.complete()
                        })
                    }), o = new v(t => {
                        let e;
                        this._zone.runOutsideAngular(() => {
                            e = this._zone.onStable.subscribe(() => {
                                ol.assertNotInAngularZone(), il(() => {
                                    this._stable || this._zone.hasPendingMacrotasks || this._zone.hasPendingMicrotasks || (this._stable = !0, t.next(!0))
                                })
                            })
                        });
                        const n = this._zone.onUnstable.subscribe(() => {
                            ol.assertInAngularZone(), this._stable && (this._stable = !1, this._zone.runOutsideAngular(() => {
                                t.next(!1)
                            }))
                        });
                        return () => {
                            e.unsubscribe(), n.unsubscribe()
                        }
                    });
                    this.isStable = function (...t) {
                        let e = Number.POSITIVE_INFINITY, n = null, r = t[t.length - 1];
                        return k(r) ? (n = t.pop(), t.length > 1 && "number" == typeof t[t.length - 1] && (e = t.pop())) : "number" == typeof r && (e = t.pop()), null === n && 1 === t.length && t[0] instanceof v ? t[0] : z(e)(q(t, n))
                    }(i, o.pipe(t => {
                        return B()((e = Y, function (t) {
                            let n;
                            n = "function" == typeof e ? e : function () {
                                return e
                            };
                            const r = Object.create(t, Q);
                            return r.source = t, r.subjectFactory = n, r
                        })(t));
                        var e
                    }))
                }

                bootstrap(t, e) {
                    if (!this._initStatus.done) throw new Error("Cannot bootstrap as there are still asynchronous initializers running. Bootstrap components in the `ngDoBootstrap` method of the root module.");
                    let n;
                    n = t instanceof ra ? t : this._componentFactoryResolver.resolveComponentFactory(t), this.componentTypes.push(n.componentType);
                    const r = n.isBoundToModule ? void 0 : this._injector.get(qa),
                        s = n.create(eo.NULL, [], e || n.selector, r), i = s.location.nativeElement,
                        o = s.injector.get(fl, null), a = o && s.injector.get(pl);
                    return o && a && a.registerApplication(i, o), s.onDestroy(() => {
                        this.detachView(s.hostView), Il(this.components, s), a && a.unregisterApplication(i)
                    }), this._loadComponent(s), s
                }

                tick() {
                    if (this._runningTick) throw new Error("ApplicationRef.tick is called recursively");
                    try {
                        this._runningTick = !0;
                        for (let t of this._views) t.detectChanges()
                    } catch (t) {
                        this._zone.runOutsideAngular(() => this._exceptionHandler.handleError(t))
                    } finally {
                        this._runningTick = !1
                    }
                }

                attachView(t) {
                    const e = t;
                    this._views.push(e), e.attachToAppRef(this)
                }

                detachView(t) {
                    const e = t;
                    Il(this._views, e), e.detachFromAppRef()
                }

                _loadComponent(t) {
                    this.attachView(t.hostView), this.tick(), this.components.push(t), this._injector.get(Wc, []).concat(this._bootstrapListeners).forEach(e => e(t))
                }

                ngOnDestroy() {
                    this._views.slice().forEach(t => t.destroy()), this._onMicrotaskEmptySubscription.unsubscribe()
                }

                get viewCount() {
                    return this._views.length
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(cr(ol), cr(eo), cr(is), cr(ia), cr(Uc))
            }, t.\u0275prov = ut({token: t, factory: t.\u0275fac}), t
        })();

        function Il(t, e) {
            const n = t.indexOf(e);
            n > -1 && t.splice(n, 1)
        }

        class El {
        }

        class Ol {
        }

        const Al = {factoryPathPrefix: "", factoryPathSuffix: ".ngfactory"};
        let Rl = (() => {
            class t {
                constructor(t, e) {
                    this._compiler = t, this._config = e || Al
                }

                load(t) {
                    return this.loadAndCompile(t)
                }

                loadAndCompile(t) {
                    let [e, r] = t.split("#");
                    return void 0 === r && (r = "default"), n(255)(e).then(t => t[r]).then(t => Ll(t, e, r)).then(t => this._compiler.compileModuleAsync(t))
                }

                loadFactory(t) {
                    let [e, r] = t.split("#"), s = "NgFactory";
                    return void 0 === r && (r = "default", s = ""), n(255)(this._config.factoryPathPrefix + e + this._config.factoryPathSuffix).then(t => t[r + s]).then(t => Ll(t, e, r))
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(cr(rl), cr(Ol, 8))
            }, t.\u0275prov = ut({token: t, factory: t.\u0275fac}), t
        })();

        function Ll(t, e, n) {
            if (!t) throw new Error(`Cannot find '${n}' in '${e}'`);
            return t
        }

        const Pl = Cl(null, "core", [{provide: Bc, useValue: "unknown"}, {provide: xl, deps: [eo]}, {
            provide: pl,
            deps: []
        }, {provide: Gc, deps: []}]), jl = [{provide: Tl, useClass: Tl, deps: [ol, eo, is, ia, Uc]}, {
            provide: nc,
            deps: [ol],
            useFactory: function (t) {
                let e = [];
                return t.onStable.subscribe(() => {
                    for (; e.length;) e.pop()()
                }), function (t) {
                    e.push(t)
                }
            }
        }, {provide: Uc, useClass: Uc, deps: [[new dr, Fc]]}, {provide: rl, useClass: rl, deps: []}, Vc, {
            provide: Ea,
            useFactory: function () {
                return Na
            },
            deps: []
        }, {
            provide: Aa, useFactory: function () {
                return Ha
            }, deps: []
        }, {
            provide: Zc, useFactory: function (t) {
                return na(t = t || "undefined" != typeof $localize && $localize.locale || ta), t
            }, deps: [[new hr(Zc), new dr, new fr]]
        }, {provide: Qc, useValue: "USD"}];
        let Dl = (() => {
            class t {
                constructor(t) {
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(cr(Tl))
            }, t.\u0275mod = Bt({type: t}), t.\u0275inj = ht({providers: jl}), t
        })(), Ml = null;

        function Nl() {
            return Ml
        }

        const Hl = new Bn("DocumentToken");
        let Fl = (() => {
            class t {
                historyGo(t) {
                    throw new Error("Not implemented")
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)
            }, t.\u0275prov = ut({factory: Ul, token: t, providedIn: "platform"}), t
        })();

        function Ul() {
            return cr(Vl)
        }

        const $l = new Bn("Location Initialized");
        let Vl = (() => {
            class t extends Fl {
                constructor(t) {
                    super(), this._doc = t, this._init()
                }

                _init() {
                    this.location = window.location, this._history = window.history
                }

                getBaseHrefFromDOM() {
                    return Nl().getBaseHref(this._doc)
                }

                onPopState(t) {
                    const e = Nl().getGlobalEventTarget(this._doc, "window");
                    return e.addEventListener("popstate", t, !1), () => e.removeEventListener("popstate", t)
                }

                onHashChange(t) {
                    const e = Nl().getGlobalEventTarget(this._doc, "window");
                    return e.addEventListener("hashchange", t, !1), () => e.removeEventListener("hashchange", t)
                }

                get href() {
                    return this.location.href
                }

                get protocol() {
                    return this.location.protocol
                }

                get hostname() {
                    return this.location.hostname
                }

                get port() {
                    return this.location.port
                }

                get pathname() {
                    return this.location.pathname
                }

                get search() {
                    return this.location.search
                }

                get hash() {
                    return this.location.hash
                }

                set pathname(t) {
                    this.location.pathname = t
                }

                pushState(t, e, n) {
                    zl() ? this._history.pushState(t, e, n) : this.location.hash = n
                }

                replaceState(t, e, n) {
                    zl() ? this._history.replaceState(t, e, n) : this.location.hash = n
                }

                forward() {
                    this._history.forward()
                }

                back() {
                    this._history.back()
                }

                historyGo(t = 0) {
                    this._history.go(t)
                }

                getState() {
                    return this._history.state
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(cr(Hl))
            }, t.\u0275prov = ut({factory: ql, token: t, providedIn: "platform"}), t
        })();

        function zl() {
            return !!window.history.pushState
        }

        function ql() {
            return new Vl(cr(Hl))
        }

        function Bl(t, e) {
            if (0 == t.length) return e;
            if (0 == e.length) return t;
            let n = 0;
            return t.endsWith("/") && n++, e.startsWith("/") && n++, 2 == n ? t + e.substring(1) : 1 == n ? t + e : t + "/" + e
        }

        function Wl(t) {
            const e = t.match(/#|\?|$/), n = e && e.index || t.length;
            return t.slice(0, n - ("/" === t[n - 1] ? 1 : 0)) + t.slice(n)
        }

        function Gl(t) {
            return t && "?" !== t[0] ? "?" + t : t
        }

        let Zl = (() => {
            class t {
                historyGo(t) {
                    throw new Error("Not implemented")
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)
            }, t.\u0275prov = ut({factory: Ql, token: t, providedIn: "root"}), t
        })();

        function Ql(t) {
            const e = cr(Hl).location;
            return new Yl(cr(Fl), e && e.origin || "")
        }

        const Kl = new Bn("appBaseHref");
        let Yl = (() => {
            class t extends Zl {
                constructor(t, e) {
                    if (super(), this._platformLocation = t, this._removeListenerFns = [], null == e && (e = this._platformLocation.getBaseHrefFromDOM()), null == e) throw new Error("No base href set. Please provide a value for the APP_BASE_HREF token or add a base element to the document.");
                    this._baseHref = e
                }

                ngOnDestroy() {
                    for (; this._removeListenerFns.length;) this._removeListenerFns.pop()()
                }

                onPopState(t) {
                    this._removeListenerFns.push(this._platformLocation.onPopState(t), this._platformLocation.onHashChange(t))
                }

                getBaseHref() {
                    return this._baseHref
                }

                prepareExternalUrl(t) {
                    return Bl(this._baseHref, t)
                }

                path(t = !1) {
                    const e = this._platformLocation.pathname + Gl(this._platformLocation.search),
                        n = this._platformLocation.hash;
                    return n && t ? `${e}${n}` : e
                }

                pushState(t, e, n, r) {
                    const s = this.prepareExternalUrl(n + Gl(r));
                    this._platformLocation.pushState(t, e, s)
                }

                replaceState(t, e, n, r) {
                    const s = this.prepareExternalUrl(n + Gl(r));
                    this._platformLocation.replaceState(t, e, s)
                }

                forward() {
                    this._platformLocation.forward()
                }

                back() {
                    this._platformLocation.back()
                }

                historyGo(t = 0) {
                    var e, n;
                    null === (n = (e = this._platformLocation).historyGo) || void 0 === n || n.call(e, t)
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(cr(Fl), cr(Kl, 8))
            }, t.\u0275prov = ut({token: t, factory: t.\u0275fac}), t
        })(), Jl = (() => {
            class t extends Zl {
                constructor(t, e) {
                    super(), this._platformLocation = t, this._baseHref = "", this._removeListenerFns = [], null != e && (this._baseHref = e)
                }

                ngOnDestroy() {
                    for (; this._removeListenerFns.length;) this._removeListenerFns.pop()()
                }

                onPopState(t) {
                    this._removeListenerFns.push(this._platformLocation.onPopState(t), this._platformLocation.onHashChange(t))
                }

                getBaseHref() {
                    return this._baseHref
                }

                path(t = !1) {
                    let e = this._platformLocation.hash;
                    return null == e && (e = "#"), e.length > 0 ? e.substring(1) : e
                }

                prepareExternalUrl(t) {
                    const e = Bl(this._baseHref, t);
                    return e.length > 0 ? "#" + e : e
                }

                pushState(t, e, n, r) {
                    let s = this.prepareExternalUrl(n + Gl(r));
                    0 == s.length && (s = this._platformLocation.pathname), this._platformLocation.pushState(t, e, s)
                }

                replaceState(t, e, n, r) {
                    let s = this.prepareExternalUrl(n + Gl(r));
                    0 == s.length && (s = this._platformLocation.pathname), this._platformLocation.replaceState(t, e, s)
                }

                forward() {
                    this._platformLocation.forward()
                }

                back() {
                    this._platformLocation.back()
                }

                historyGo(t = 0) {
                    var e, n;
                    null === (n = (e = this._platformLocation).historyGo) || void 0 === n || n.call(e, t)
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(cr(Fl), cr(Kl, 8))
            }, t.\u0275prov = ut({token: t, factory: t.\u0275fac}), t
        })(), Xl = (() => {
            class t {
                constructor(t, e) {
                    this._subject = new _c, this._urlChangeListeners = [], this._platformStrategy = t;
                    const n = this._platformStrategy.getBaseHref();
                    this._platformLocation = e, this._baseHref = Wl(eu(n)), this._platformStrategy.onPopState(t => {
                        this._subject.emit({url: this.path(!0), pop: !0, state: t.state, type: t.type})
                    })
                }

                path(t = !1) {
                    return this.normalize(this._platformStrategy.path(t))
                }

                getState() {
                    return this._platformLocation.getState()
                }

                isCurrentPathEqualTo(t, e = "") {
                    return this.path() == this.normalize(t + Gl(e))
                }

                normalize(e) {
                    return t.stripTrailingSlash(function (t, e) {
                        return t && e.startsWith(t) ? e.substring(t.length) : e
                    }(this._baseHref, eu(e)))
                }

                prepareExternalUrl(t) {
                    return t && "/" !== t[0] && (t = "/" + t), this._platformStrategy.prepareExternalUrl(t)
                }

                go(t, e = "", n = null) {
                    this._platformStrategy.pushState(n, "", t, e), this._notifyUrlChangeListeners(this.prepareExternalUrl(t + Gl(e)), n)
                }

                replaceState(t, e = "", n = null) {
                    this._platformStrategy.replaceState(n, "", t, e), this._notifyUrlChangeListeners(this.prepareExternalUrl(t + Gl(e)), n)
                }

                forward() {
                    this._platformStrategy.forward()
                }

                back() {
                    this._platformStrategy.back()
                }

                historyGo(t = 0) {
                    var e, n;
                    null === (n = (e = this._platformStrategy).historyGo) || void 0 === n || n.call(e, t)
                }

                onUrlChange(t) {
                    this._urlChangeListeners.push(t), this._urlChangeSubscription || (this._urlChangeSubscription = this.subscribe(t => {
                        this._notifyUrlChangeListeners(t.url, t.state)
                    }))
                }

                _notifyUrlChangeListeners(t = "", e) {
                    this._urlChangeListeners.forEach(n => n(t, e))
                }

                subscribe(t, e, n) {
                    return this._subject.subscribe({next: t, error: e, complete: n})
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(cr(Zl), cr(Fl))
            }, t.normalizeQueryParams = Gl, t.joinWithSlash = Bl, t.stripTrailingSlash = Wl, t.\u0275prov = ut({
                factory: tu,
                token: t,
                providedIn: "root"
            }), t
        })();

        function tu() {
            return new Xl(cr(Zl), cr(Fl))
        }

        function eu(t) {
            return t.replace(/\/index.html$/, "")
        }

        var nu = (() => ((nu = nu || {})[nu.Zero = 0] = "Zero", nu[nu.One = 1] = "One", nu[nu.Two = 2] = "Two", nu[nu.Few = 3] = "Few", nu[nu.Many = 4] = "Many", nu[nu.Other = 5] = "Other", nu))();

        class ru {
        }

        let su = (() => {
            class t extends ru {
                constructor(t) {
                    super(), this.locale = t
                }

                getPluralCategory(t, e) {
                    switch (function (t) {
                        return function (t) {
                            const e = function (t) {
                                return t.toLowerCase().replace(/_/g, "-")
                            }(t);
                            let n = Jo(e);
                            if (n) return n;
                            const r = e.split("-")[0];
                            if (n = Jo(r), n) return n;
                            if ("en" === r) return Ko;
                            throw new Error(`Missing locale data for the locale "${t}".`)
                        }(t)[Xo.PluralCase]
                    }(e || this.locale)(t)) {
                        case nu.Zero:
                            return "zero";
                        case nu.One:
                            return "one";
                        case nu.Two:
                            return "two";
                        case nu.Few:
                            return "few";
                        case nu.Many:
                            return "many";
                        default:
                            return "other"
                    }
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(cr(Zc))
            }, t.\u0275prov = ut({token: t, factory: t.\u0275fac}), t
        })(), iu = (() => {
            class t {
                constructor(t, e, n, r) {
                    this._iterableDiffers = t, this._keyValueDiffers = e, this._ngEl = n, this._renderer = r, this._iterableDiffer = null, this._keyValueDiffer = null, this._initialClasses = [], this._rawClass = null
                }

                set klass(t) {
                    this._removeClasses(this._initialClasses), this._initialClasses = "string" == typeof t ? t.split(/\s+/) : [], this._applyClasses(this._initialClasses), this._applyClasses(this._rawClass)
                }

                set ngClass(t) {
                    this._removeClasses(this._rawClass), this._applyClasses(this._initialClasses), this._iterableDiffer = null, this._keyValueDiffer = null, this._rawClass = "string" == typeof t ? t.split(/\s+/) : t, this._rawClass && (ho(this._rawClass) ? this._iterableDiffer = this._iterableDiffers.find(this._rawClass).create() : this._keyValueDiffer = this._keyValueDiffers.find(this._rawClass).create())
                }

                ngDoCheck() {
                    if (this._iterableDiffer) {
                        const t = this._iterableDiffer.diff(this._rawClass);
                        t && this._applyIterableChanges(t)
                    } else if (this._keyValueDiffer) {
                        const t = this._keyValueDiffer.diff(this._rawClass);
                        t && this._applyKeyValueChanges(t)
                    }
                }

                _applyKeyValueChanges(t) {
                    t.forEachAddedItem(t => this._toggleClass(t.key, t.currentValue)), t.forEachChangedItem(t => this._toggleClass(t.key, t.currentValue)), t.forEachRemovedItem(t => {
                        t.previousValue && this._toggleClass(t.key, !1)
                    })
                }

                _applyIterableChanges(t) {
                    t.forEachAddedItem(t => {
                        if ("string" != typeof t.item) throw new Error(`NgClass can only toggle CSS classes expressed as strings, got ${tt(t.item)}`);
                        this._toggleClass(t.item, !0)
                    }), t.forEachRemovedItem(t => this._toggleClass(t.item, !1))
                }

                _applyClasses(t) {
                    t && (Array.isArray(t) || t instanceof Set ? t.forEach(t => this._toggleClass(t, !0)) : Object.keys(t).forEach(e => this._toggleClass(e, !!t[e])))
                }

                _removeClasses(t) {
                    t && (Array.isArray(t) || t instanceof Set ? t.forEach(t => this._toggleClass(t, !1)) : Object.keys(t).forEach(t => this._toggleClass(t, !1)))
                }

                _toggleClass(t, e) {
                    (t = t.trim()) && t.split(/\s+/g).forEach(t => {
                        e ? this._renderer.addClass(this._ngEl.nativeElement, t) : this._renderer.removeClass(this._ngEl.nativeElement, t)
                    })
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(_o(Ea), _o(Aa), _o(la), _o(da))
            }, t.\u0275dir = Gt({
                type: t,
                selectors: [["", "ngClass", ""]],
                inputs: {klass: ["class", "klass"], ngClass: "ngClass"}
            }), t
        })();

        class ou {
            constructor(t, e, n, r) {
                this.$implicit = t, this.ngForOf = e, this.index = n, this.count = r
            }

            get first() {
                return 0 === this.index
            }

            get last() {
                return this.index === this.count - 1
            }

            get even() {
                return this.index % 2 == 0
            }

            get odd() {
                return !this.even
            }
        }

        let au = (() => {
            class t {
                constructor(t, e, n) {
                    this._viewContainer = t, this._template = e, this._differs = n, this._ngForOf = null, this._ngForOfDirty = !0, this._differ = null
                }

                set ngForOf(t) {
                    this._ngForOf = t, this._ngForOfDirty = !0
                }

                set ngForTrackBy(t) {
                    this._trackByFn = t
                }

                get ngForTrackBy() {
                    return this._trackByFn
                }

                set ngForTemplate(t) {
                    t && (this._template = t)
                }

                ngDoCheck() {
                    if (this._ngForOfDirty) {
                        this._ngForOfDirty = !1;
                        const n = this._ngForOf;
                        if (!this._differ && n) try {
                            this._differ = this._differs.find(n).create(this.ngForTrackBy)
                        } catch (e) {
                            throw new Error(`Cannot find a differ supporting object '${n}' of type '${t = n, t.name || typeof t}'. NgFor only supports binding to Iterables such as Arrays.`)
                        }
                    }
                    var t;
                    if (this._differ) {
                        const t = this._differ.diff(this._ngForOf);
                        t && this._applyChanges(t)
                    }
                }

                _applyChanges(t) {
                    const e = [];
                    t.forEachOperation((t, n, r) => {
                        if (null == t.previousIndex) {
                            const n = this._viewContainer.createEmbeddedView(this._template, new ou(null, this._ngForOf, -1, -1), null === r ? void 0 : r),
                                s = new cu(t, n);
                            e.push(s)
                        } else if (null == r) this._viewContainer.remove(null === n ? void 0 : n); else if (null !== n) {
                            const s = this._viewContainer.get(n);
                            this._viewContainer.move(s, r);
                            const i = new cu(t, s);
                            e.push(i)
                        }
                    });
                    for (let n = 0; n < e.length; n++) this._perViewChange(e[n].view, e[n].record);
                    for (let n = 0, r = this._viewContainer.length; n < r; n++) {
                        const t = this._viewContainer.get(n);
                        t.context.index = n, t.context.count = r, t.context.ngForOf = this._ngForOf
                    }
                    t.forEachIdentityChange(t => {
                        this._viewContainer.get(t.currentIndex).context.$implicit = t.item
                    })
                }

                _perViewChange(t, e) {
                    t.context.$implicit = e.item
                }

                static ngTemplateContextGuard(t, e) {
                    return !0
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(_o(Ga), _o(Ua), _o(Ea))
            }, t.\u0275dir = Gt({
                type: t,
                selectors: [["", "ngFor", "", "ngForOf", ""]],
                inputs: {ngForOf: "ngForOf", ngForTrackBy: "ngForTrackBy", ngForTemplate: "ngForTemplate"}
            }), t
        })();

        class cu {
            constructor(t, e) {
                this.record = t, this.view = e
            }
        }

        let lu = (() => {
            class t {
                constructor(t, e) {
                    this._viewContainer = t, this._context = new uu, this._thenTemplateRef = null, this._elseTemplateRef = null, this._thenViewRef = null, this._elseViewRef = null, this._thenTemplateRef = e
                }

                set ngIf(t) {
                    this._context.$implicit = this._context.ngIf = t, this._updateView()
                }

                set ngIfThen(t) {
                    hu("ngIfThen", t), this._thenTemplateRef = t, this._thenViewRef = null, this._updateView()
                }

                set ngIfElse(t) {
                    hu("ngIfElse", t), this._elseTemplateRef = t, this._elseViewRef = null, this._updateView()
                }

                _updateView() {
                    this._context.$implicit ? this._thenViewRef || (this._viewContainer.clear(), this._elseViewRef = null, this._thenTemplateRef && (this._thenViewRef = this._viewContainer.createEmbeddedView(this._thenTemplateRef, this._context))) : this._elseViewRef || (this._viewContainer.clear(), this._thenViewRef = null, this._elseTemplateRef && (this._elseViewRef = this._viewContainer.createEmbeddedView(this._elseTemplateRef, this._context)))
                }

                static ngTemplateContextGuard(t, e) {
                    return !0
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(_o(Ga), _o(Ua))
            }, t.\u0275dir = Gt({
                type: t,
                selectors: [["", "ngIf", ""]],
                inputs: {ngIf: "ngIf", ngIfThen: "ngIfThen", ngIfElse: "ngIfElse"}
            }), t
        })();

        class uu {
            constructor() {
                this.$implicit = null, this.ngIf = null
            }
        }

        function hu(t, e) {
            if (e && !e.createEmbeddedView) throw new Error(`${t} must be a TemplateRef, but received '${tt(e)}'.`)
        }

        let du = (() => {
            class t {
                constructor(t, e, n) {
                    this._ngEl = t, this._differs = e, this._renderer = n, this._ngStyle = null, this._differ = null
                }

                set ngStyle(t) {
                    this._ngStyle = t, !this._differ && t && (this._differ = this._differs.find(t).create())
                }

                ngDoCheck() {
                    if (this._differ) {
                        const t = this._differ.diff(this._ngStyle);
                        t && this._applyChanges(t)
                    }
                }

                _setStyle(t, e) {
                    const [n, r] = t.split(".");
                    null != (e = null != e && r ? `${e}${r}` : e) ? this._renderer.setStyle(this._ngEl.nativeElement, n, e) : this._renderer.removeStyle(this._ngEl.nativeElement, n)
                }

                _applyChanges(t) {
                    t.forEachRemovedItem(t => this._setStyle(t.key, null)), t.forEachAddedItem(t => this._setStyle(t.key, t.currentValue)), t.forEachChangedItem(t => this._setStyle(t.key, t.currentValue))
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(_o(la), _o(Aa), _o(da))
            }, t.\u0275dir = Gt({type: t, selectors: [["", "ngStyle", ""]], inputs: {ngStyle: "ngStyle"}}), t
        })();

        class fu {
            createSubscription(t, e) {
                return t.subscribe({
                    next: e, error: t => {
                        throw t
                    }
                })
            }

            dispose(t) {
                t.unsubscribe()
            }

            onDestroy(t) {
                t.unsubscribe()
            }
        }

        class pu {
            createSubscription(t, e) {
                return t.then(e, t => {
                    throw t
                })
            }

            dispose(t) {
            }

            onDestroy(t) {
            }
        }

        const gu = new pu, mu = new fu;
        let yu = (() => {
            class t {
                constructor(t) {
                    this._ref = t, this._latestValue = null, this._subscription = null, this._obj = null, this._strategy = null
                }

                ngOnDestroy() {
                    this._subscription && this._dispose()
                }

                transform(t) {
                    return this._obj ? t !== this._obj ? (this._dispose(), this.transform(t)) : this._latestValue : (t && this._subscribe(t), this._latestValue)
                }

                _subscribe(t) {
                    this._obj = t, this._strategy = this._selectStrategy(t), this._subscription = this._strategy.createSubscription(t, e => this._updateLatestValue(t, e))
                }

                _selectStrategy(e) {
                    if (Oo(e)) return gu;
                    if (Ao(e)) return mu;
                    throw Error(`InvalidPipeArgument: '${e}' for pipe '${tt(t)}'`)
                }

                _dispose() {
                    this._strategy.dispose(this._subscription), this._latestValue = null, this._subscription = null, this._obj = null
                }

                _updateLatestValue(t, e) {
                    t === this._obj && (this._latestValue = e, this._ref.markForCheck())
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(_o(Da, 16))
            }, t.\u0275pipe = Zt({name: "async", type: t, pure: !1}), t
        })(), vu = (() => {
            class t {
                constructor(t) {
                    this.differs = t, this.keyValues = []
                }

                transform(t, e = bu) {
                    if (!t || !(t instanceof Map) && "object" != typeof t) return null;
                    this.differ || (this.differ = this.differs.find(t).create());
                    const n = this.differ.diff(t);
                    return n && (this.keyValues = [], n.forEachItem(t => {
                        this.keyValues.push({key: t.key, value: t.currentValue})
                    }), this.keyValues.sort(e)), this.keyValues
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(_o(Aa, 16))
            }, t.\u0275pipe = Zt({name: "keyvalue", type: t, pure: !1}), t
        })();

        function bu(t, e) {
            const n = t.key, r = e.key;
            if (n === r) return 0;
            if (void 0 === n) return 1;
            if (void 0 === r) return -1;
            if (null === n) return 1;
            if (null === r) return -1;
            if ("string" == typeof n && "string" == typeof r) return n < r ? -1 : 1;
            if ("number" == typeof n && "number" == typeof r) return n - r;
            if ("boolean" == typeof n && "boolean" == typeof r) return n < r ? -1 : 1;
            const s = String(n), i = String(r);
            return s == i ? 0 : s < i ? -1 : 1
        }

        let _u = (() => {
            class t {
            }

            return t.\u0275fac = function (e) {
                return new (e || t)
            }, t.\u0275mod = Bt({type: t}), t.\u0275inj = ht({providers: [{provide: ru, useClass: su}]}), t
        })(), wu = (() => {
            class t {
            }

            return t.\u0275prov = ut({token: t, providedIn: "root", factory: () => new Cu(cr(Hl), window)}), t
        })();

        class Cu {
            constructor(t, e) {
                this.document = t, this.window = e, this.offset = () => [0, 0]
            }

            setOffset(t) {
                this.offset = Array.isArray(t) ? () => t : t
            }

            getScrollPosition() {
                return this.supportsScrolling() ? [this.window.pageXOffset, this.window.pageYOffset] : [0, 0]
            }

            scrollToPosition(t) {
                this.supportsScrolling() && this.window.scrollTo(t[0], t[1])
            }

            scrollToAnchor(t) {
                if (!this.supportsScrolling()) return;
                const e = function (t, e) {
                    const n = t.getElementById(e) || t.getElementsByName(e)[0];
                    if (n) return n;
                    if ("function" == typeof t.createTreeWalker && t.body && (t.body.createShadowRoot || t.body.attachShadow)) {
                        const n = t.createTreeWalker(t.body, NodeFilter.SHOW_ELEMENT);
                        let r = n.currentNode;
                        for (; r;) {
                            const t = r.shadowRoot;
                            if (t) {
                                const n = t.getElementById(e) || t.querySelector(`[name="${e}"]`);
                                if (n) return n
                            }
                            r = n.nextNode()
                        }
                    }
                    return null
                }(this.document, t);
                e && (this.scrollToElement(e), this.attemptFocus(e))
            }

            setHistoryScrollRestoration(t) {
                if (this.supportScrollRestoration()) {
                    const e = this.window.history;
                    e && e.scrollRestoration && (e.scrollRestoration = t)
                }
            }

            scrollToElement(t) {
                const e = t.getBoundingClientRect(), n = e.left + this.window.pageXOffset,
                    r = e.top + this.window.pageYOffset, s = this.offset();
                this.window.scrollTo(n - s[0], r - s[1])
            }

            attemptFocus(t) {
                return t.focus(), this.document.activeElement === t
            }

            supportScrollRestoration() {
                try {
                    if (!this.supportsScrolling()) return !1;
                    const t = Su(this.window.history) || Su(Object.getPrototypeOf(this.window.history));
                    return !(!t || !t.writable && !t.set)
                } catch (t) {
                    return !1
                }
            }

            supportsScrolling() {
                try {
                    return !!this.window && !!this.window.scrollTo && "pageXOffset" in this.window
                } catch (t) {
                    return !1
                }
            }
        }

        function Su(t) {
            return Object.getOwnPropertyDescriptor(t, "scrollRestoration")
        }

        class xu extends class extends class {
        } {
            constructor() {
                super(...arguments), this.supportsDOMEvents = !0
            }
        } {
            static makeCurrent() {
                var t;
                t = new xu, Ml || (Ml = t)
            }

            onAndCancel(t, e, n) {
                return t.addEventListener(e, n, !1), () => {
                    t.removeEventListener(e, n, !1)
                }
            }

            dispatchEvent(t, e) {
                t.dispatchEvent(e)
            }

            remove(t) {
                t.parentNode && t.parentNode.removeChild(t)
            }

            createElement(t, e) {
                return (e = e || this.getDefaultDocument()).createElement(t)
            }

            createHtmlDocument() {
                return document.implementation.createHTMLDocument("fakeTitle")
            }

            getDefaultDocument() {
                return document
            }

            isElementNode(t) {
                return t.nodeType === Node.ELEMENT_NODE
            }

            isShadowRoot(t) {
                return t instanceof DocumentFragment
            }

            getGlobalEventTarget(t, e) {
                return "window" === e ? window : "document" === e ? t : "body" === e ? t.body : null
            }

            getBaseHref(t) {
                const e = (Tu = Tu || document.querySelector("base"), Tu ? Tu.getAttribute("href") : null);
                return null == e ? null : function (t) {
                    ku = ku || document.createElement("a"), ku.setAttribute("href", t);
                    const e = ku.pathname;
                    return "/" === e.charAt(0) ? e : `/${e}`
                }(e)
            }

            resetBaseElement() {
                Tu = null
            }

            getUserAgent() {
                return window.navigator.userAgent
            }

            getCookie(t) {
                return function (t, e) {
                    e = encodeURIComponent(e);
                    for (const n of t.split(";")) {
                        const t = n.indexOf("="), [r, s] = -1 == t ? [n, ""] : [n.slice(0, t), n.slice(t + 1)];
                        if (r.trim() === e) return decodeURIComponent(s)
                    }
                    return null
                }(document.cookie, t)
            }
        }

        let ku, Tu = null;
        const Iu = new Bn("TRANSITION_ID"), Eu = [{
            provide: Fc, useFactory: function (t, e, n) {
                return () => {
                    n.get(Uc).donePromise.then(() => {
                        const n = Nl();
                        Array.prototype.slice.apply(e.querySelectorAll("style[ng-transition]")).filter(e => e.getAttribute("ng-transition") === t).forEach(t => n.remove(t))
                    })
                }
            }, deps: [Iu, Hl, eo], multi: !0
        }];

        class Ou {
            static init() {
                var t;
                t = new Ou, yl = t
            }

            addToWindow(t) {
                At.getAngularTestability = (e, n = !0) => {
                    const r = t.findTestabilityInTree(e, n);
                    if (null == r) throw new Error("Could not find testability for element.");
                    return r
                }, At.getAllAngularTestabilities = () => t.getAllTestabilities(), At.getAllAngularRootElements = () => t.getAllRootElements(), At.frameworkStabilizers || (At.frameworkStabilizers = []), At.frameworkStabilizers.push(t => {
                    const e = At.getAllAngularTestabilities();
                    let n = e.length, r = !1;
                    const s = function (e) {
                        r = r || e, n--, 0 == n && t(r)
                    };
                    e.forEach(function (t) {
                        t.whenStable(s)
                    })
                })
            }

            findTestabilityInTree(t, e, n) {
                if (null == e) return null;
                const r = t.getTestability(e);
                return null != r ? r : n ? Nl().isShadowRoot(e) ? this.findTestabilityInTree(t, e.host, !0) : this.findTestabilityInTree(t, e.parentElement, !0) : null
            }
        }

        let Au = (() => {
            class t {
                build() {
                    return new XMLHttpRequest
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)
            }, t.\u0275prov = ut({token: t, factory: t.\u0275fac}), t
        })();
        const Ru = new Bn("EventManagerPlugins");
        let Lu = (() => {
            class t {
                constructor(t, e) {
                    this._zone = e, this._eventNameToPlugin = new Map, t.forEach(t => t.manager = this), this._plugins = t.slice().reverse()
                }

                addEventListener(t, e, n) {
                    return this._findPluginFor(e).addEventListener(t, e, n)
                }

                addGlobalEventListener(t, e, n) {
                    return this._findPluginFor(e).addGlobalEventListener(t, e, n)
                }

                getZone() {
                    return this._zone
                }

                _findPluginFor(t) {
                    const e = this._eventNameToPlugin.get(t);
                    if (e) return e;
                    const n = this._plugins;
                    for (let r = 0; r < n.length; r++) {
                        const e = n[r];
                        if (e.supports(t)) return this._eventNameToPlugin.set(t, e), e
                    }
                    throw new Error(`No event manager plugin found for event ${t}`)
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(cr(Ru), cr(ol))
            }, t.\u0275prov = ut({token: t, factory: t.\u0275fac}), t
        })();

        class Pu {
            constructor(t) {
                this._doc = t
            }

            addGlobalEventListener(t, e, n) {
                const r = Nl().getGlobalEventTarget(this._doc, t);
                if (!r) throw new Error(`Unsupported event target ${r} for event ${e}`);
                return this.addEventListener(r, e, n)
            }
        }

        let ju = (() => {
            class t {
                constructor() {
                    this._stylesSet = new Set
                }

                addStyles(t) {
                    const e = new Set;
                    t.forEach(t => {
                        this._stylesSet.has(t) || (this._stylesSet.add(t), e.add(t))
                    }), this.onStylesAdded(e)
                }

                onStylesAdded(t) {
                }

                getAllStyles() {
                    return Array.from(this._stylesSet)
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)
            }, t.\u0275prov = ut({token: t, factory: t.\u0275fac}), t
        })(), Du = (() => {
            class t extends ju {
                constructor(t) {
                    super(), this._doc = t, this._hostNodes = new Map, this._hostNodes.set(t.head, [])
                }

                _addStylesToHost(t, e, n) {
                    t.forEach(t => {
                        const r = this._doc.createElement("style");
                        r.textContent = t, n.push(e.appendChild(r))
                    })
                }

                addHost(t) {
                    const e = [];
                    this._addStylesToHost(this._stylesSet, t, e), this._hostNodes.set(t, e)
                }

                removeHost(t) {
                    const e = this._hostNodes.get(t);
                    e && e.forEach(Mu), this._hostNodes.delete(t)
                }

                onStylesAdded(t) {
                    this._hostNodes.forEach((e, n) => {
                        this._addStylesToHost(t, n, e)
                    })
                }

                ngOnDestroy() {
                    this._hostNodes.forEach(t => t.forEach(Mu))
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(cr(Hl))
            }, t.\u0275prov = ut({token: t, factory: t.\u0275fac}), t
        })();

        function Mu(t) {
            Nl().remove(t)
        }

        const Nu = {
            svg: "http://www.w3.org/2000/svg",
            xhtml: "http://www.w3.org/1999/xhtml",
            xlink: "http://www.w3.org/1999/xlink",
            xml: "http://www.w3.org/XML/1998/namespace",
            xmlns: "http://www.w3.org/2000/xmlns/"
        }, Hu = /%COMP%/g;

        function Fu(t, e, n) {
            for (let r = 0; r < e.length; r++) {
                let s = e[r];
                Array.isArray(s) ? Fu(t, s, n) : (s = s.replace(Hu, t), n.push(s))
            }
            return n
        }

        function Uu(t) {
            return e => {
                if ("__ngUnwrap__" === e) return t;
                !1 === t(e) && (e.preventDefault(), e.returnValue = !1)
            }
        }

        let $u = (() => {
            class t {
                constructor(t, e, n) {
                    this.eventManager = t, this.sharedStylesHost = e, this.appId = n, this.rendererByCompId = new Map, this.defaultRenderer = new Vu(t)
                }

                createRenderer(t, e) {
                    if (!t || !e) return this.defaultRenderer;
                    switch (e.encapsulation) {
                        case kt.Emulated: {
                            let n = this.rendererByCompId.get(e.id);
                            return n || (n = new zu(this.eventManager, this.sharedStylesHost, e, this.appId), this.rendererByCompId.set(e.id, n)), n.applyToHost(t), n
                        }
                        case 1:
                        case kt.ShadowDom:
                            return new qu(this.eventManager, this.sharedStylesHost, t, e);
                        default:
                            if (!this.rendererByCompId.has(e.id)) {
                                const t = Fu(e.id, e.styles, []);
                                this.sharedStylesHost.addStyles(t), this.rendererByCompId.set(e.id, this.defaultRenderer)
                            }
                            return this.defaultRenderer
                    }
                }

                begin() {
                }

                end() {
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(cr(Lu), cr(Du), cr($c))
            }, t.\u0275prov = ut({token: t, factory: t.\u0275fac}), t
        })();

        class Vu {
            constructor(t) {
                this.eventManager = t, this.data = Object.create(null)
            }

            destroy() {
            }

            createElement(t, e) {
                return e ? document.createElementNS(Nu[e] || e, t) : document.createElement(t)
            }

            createComment(t) {
                return document.createComment(t)
            }

            createText(t) {
                return document.createTextNode(t)
            }

            appendChild(t, e) {
                t.appendChild(e)
            }

            insertBefore(t, e, n) {
                t && t.insertBefore(e, n)
            }

            removeChild(t, e) {
                t && t.removeChild(e)
            }

            selectRootElement(t, e) {
                let n = "string" == typeof t ? document.querySelector(t) : t;
                if (!n) throw new Error(`The selector "${t}" did not match any elements`);
                return e || (n.textContent = ""), n
            }

            parentNode(t) {
                return t.parentNode
            }

            nextSibling(t) {
                return t.nextSibling
            }

            setAttribute(t, e, n, r) {
                if (r) {
                    e = r + ":" + e;
                    const s = Nu[r];
                    s ? t.setAttributeNS(s, e, n) : t.setAttribute(e, n)
                } else t.setAttribute(e, n)
            }

            removeAttribute(t, e, n) {
                if (n) {
                    const r = Nu[n];
                    r ? t.removeAttributeNS(r, e) : t.removeAttribute(`${n}:${e}`)
                } else t.removeAttribute(e)
            }

            addClass(t, e) {
                t.classList.add(e)
            }

            removeClass(t, e) {
                t.classList.remove(e)
            }

            setStyle(t, e, n, r) {
                r & (ls.DashCase | ls.Important) ? t.style.setProperty(e, n, r & ls.Important ? "important" : "") : t.style[e] = n
            }

            removeStyle(t, e, n) {
                n & ls.DashCase ? t.style.removeProperty(e) : t.style[e] = ""
            }

            setProperty(t, e, n) {
                t[e] = n
            }

            setValue(t, e) {
                t.nodeValue = e
            }

            listen(t, e, n) {
                return "string" == typeof t ? this.eventManager.addGlobalEventListener(t, e, Uu(n)) : this.eventManager.addEventListener(t, e, Uu(n))
            }
        }

        class zu extends Vu {
            constructor(t, e, n, r) {
                super(t), this.component = n;
                const s = Fu(r + "-" + n.id, n.styles, []);
                e.addStyles(s), this.contentAttr = "_ngcontent-%COMP%".replace(Hu, r + "-" + n.id), this.hostAttr = "_nghost-%COMP%".replace(Hu, r + "-" + n.id)
            }

            applyToHost(t) {
                super.setAttribute(t, this.hostAttr, "")
            }

            createElement(t, e) {
                const n = super.createElement(t, e);
                return super.setAttribute(n, this.contentAttr, ""), n
            }
        }

        class qu extends Vu {
            constructor(t, e, n, r) {
                super(t), this.sharedStylesHost = e, this.hostEl = n, this.shadowRoot = n.attachShadow({mode: "open"}), this.sharedStylesHost.addHost(this.shadowRoot);
                const s = Fu(r.id, r.styles, []);
                for (let i = 0; i < s.length; i++) {
                    const t = document.createElement("style");
                    t.textContent = s[i], this.shadowRoot.appendChild(t)
                }
            }

            nodeOrShadowRoot(t) {
                return t === this.hostEl ? this.shadowRoot : t
            }

            destroy() {
                this.sharedStylesHost.removeHost(this.shadowRoot)
            }

            appendChild(t, e) {
                return super.appendChild(this.nodeOrShadowRoot(t), e)
            }

            insertBefore(t, e, n) {
                return super.insertBefore(this.nodeOrShadowRoot(t), e, n)
            }

            removeChild(t, e) {
                return super.removeChild(this.nodeOrShadowRoot(t), e)
            }

            parentNode(t) {
                return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(t)))
            }
        }

        let Bu = (() => {
            class t extends Pu {
                constructor(t) {
                    super(t)
                }

                supports(t) {
                    return !0
                }

                addEventListener(t, e, n) {
                    return t.addEventListener(e, n, !1), () => this.removeEventListener(t, e, n)
                }

                removeEventListener(t, e, n) {
                    return t.removeEventListener(e, n)
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(cr(Hl))
            }, t.\u0275prov = ut({token: t, factory: t.\u0275fac}), t
        })();
        const Wu = ["alt", "control", "meta", "shift"], Gu = {
            "\b": "Backspace",
            "\t": "Tab",
            "\x7f": "Delete",
            "\x1b": "Escape",
            Del: "Delete",
            Esc: "Escape",
            Left: "ArrowLeft",
            Right: "ArrowRight",
            Up: "ArrowUp",
            Down: "ArrowDown",
            Menu: "ContextMenu",
            Scroll: "ScrollLock",
            Win: "OS"
        }, Zu = {
            A: "1",
            B: "2",
            C: "3",
            D: "4",
            E: "5",
            F: "6",
            G: "7",
            H: "8",
            I: "9",
            J: "*",
            K: "+",
            M: "-",
            N: ".",
            O: "/",
            "`": "0",
            "\x90": "NumLock"
        }, Qu = {alt: t => t.altKey, control: t => t.ctrlKey, meta: t => t.metaKey, shift: t => t.shiftKey};
        let Ku = (() => {
            class t extends Pu {
                constructor(t) {
                    super(t)
                }

                supports(e) {
                    return null != t.parseEventName(e)
                }

                addEventListener(e, n, r) {
                    const s = t.parseEventName(n), i = t.eventCallback(s.fullKey, r, this.manager.getZone());
                    return this.manager.getZone().runOutsideAngular(() => Nl().onAndCancel(e, s.domEventName, i))
                }

                static parseEventName(e) {
                    const n = e.toLowerCase().split("."), r = n.shift();
                    if (0 === n.length || "keydown" !== r && "keyup" !== r) return null;
                    const s = t._normalizeKey(n.pop());
                    let i = "";
                    if (Wu.forEach(t => {
                        const e = n.indexOf(t);
                        e > -1 && (n.splice(e, 1), i += t + ".")
                    }), i += s, 0 != n.length || 0 === s.length) return null;
                    const o = {};
                    return o.domEventName = r, o.fullKey = i, o
                }

                static getEventFullKey(t) {
                    let e = "", n = function (t) {
                        let e = t.key;
                        if (null == e) {
                            if (e = t.keyIdentifier, null == e) return "Unidentified";
                            e.startsWith("U+") && (e = String.fromCharCode(parseInt(e.substring(2), 16)), 3 === t.location && Zu.hasOwnProperty(e) && (e = Zu[e]))
                        }
                        return Gu[e] || e
                    }(t);
                    return n = n.toLowerCase(), " " === n ? n = "space" : "." === n && (n = "dot"), Wu.forEach(r => {
                        r != n && (0, Qu[r])(t) && (e += r + ".")
                    }), e += n, e
                }

                static eventCallback(e, n, r) {
                    return s => {
                        t.getEventFullKey(s) === e && r.runGuarded(() => n(s))
                    }
                }

                static _normalizeKey(t) {
                    switch (t) {
                        case"esc":
                            return "escape";
                        default:
                            return t
                    }
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(cr(Hl))
            }, t.\u0275prov = ut({token: t, factory: t.\u0275fac}), t
        })(), Yu = (() => {
            class t {
            }

            return t.\u0275fac = function (e) {
                return new (e || t)
            }, t.\u0275prov = ut({
                factory: function () {
                    return cr(Xu)
                }, token: t, providedIn: "root"
            }), t
        })();

        function Ju(t) {
            return new Xu(t.get(Hl))
        }

        let Xu = (() => {
            class t extends Yu {
                constructor(t) {
                    super(), this._doc = t
                }

                sanitize(t, e) {
                    if (null == e) return null;
                    switch (t) {
                        case Kr.NONE:
                            return e;
                        case Kr.HTML:
                            return kr(e, "HTML") ? xr(e) : Zr(this._doc, String(e)).toString();
                        case Kr.STYLE:
                            return kr(e, "Style") ? xr(e) : e;
                        case Kr.SCRIPT:
                            if (kr(e, "Script")) return xr(e);
                            throw new Error("unsafe value used in a script context");
                        case Kr.URL:
                            return Tr(e), kr(e, "URL") ? xr(e) : Rr(String(e));
                        case Kr.RESOURCE_URL:
                            if (kr(e, "ResourceURL")) return xr(e);
                            throw new Error("unsafe value used in a resource URL context (see https://g.co/ng/security#xss)");
                        default:
                            throw new Error(`Unexpected SecurityContext ${t} (see https://g.co/ng/security#xss)`)
                    }
                }

                bypassSecurityTrustHtml(t) {
                    return new br(t)
                }

                bypassSecurityTrustStyle(t) {
                    return new _r(t)
                }

                bypassSecurityTrustScript(t) {
                    return new wr(t)
                }

                bypassSecurityTrustUrl(t) {
                    return new Cr(t)
                }

                bypassSecurityTrustResourceUrl(t) {
                    return new Sr(t)
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(cr(Hl))
            }, t.\u0275prov = ut({
                factory: function () {
                    return Ju(cr($i))
                }, token: t, providedIn: "root"
            }), t
        })();
        const th = Cl(Pl, "browser", [{provide: Bc, useValue: "browser"}, {
            provide: qc, useValue: function () {
                xu.makeCurrent(), Ou.init()
            }, multi: !0
        }, {
            provide: Hl, useFactory: function () {
                return function (t) {
                    fe = t
                }(document), document
            }, deps: []
        }]), eh = [[], {provide: zi, useValue: "root"}, {
            provide: is, useFactory: function () {
                return new is
            }, deps: []
        }, {provide: Ru, useClass: Bu, multi: !0, deps: [Hl, ol, Bc]}, {
            provide: Ru,
            useClass: Ku,
            multi: !0,
            deps: [Hl]
        }, [], {provide: $u, useClass: $u, deps: [Lu, Du, $c]}, {provide: ha, useExisting: $u}, {
            provide: ju,
            useExisting: Du
        }, {provide: Du, useClass: Du, deps: [Hl]}, {provide: fl, useClass: fl, deps: [ol]}, {
            provide: Lu,
            useClass: Lu,
            deps: [Ru, ol]
        }, {
            provide: class {
            }, useClass: Au, deps: []
        }, []];
        let nh = (() => {
            class t {
                constructor(t) {
                    if (t) throw new Error("BrowserModule has already been loaded. If you need access to common directives such as NgIf and NgFor from a lazy loaded module, import CommonModule instead.")
                }

                static withServerTransition(e) {
                    return {
                        ngModule: t,
                        providers: [{provide: $c, useValue: e.appId}, {provide: Iu, useExisting: $c}, Eu]
                    }
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(cr(t, 12))
            }, t.\u0275mod = Bt({type: t}), t.\u0275inj = ht({providers: eh, imports: [_u, Dl]}), t
        })();

        function rh() {
            return new sh(cr(Hl))
        }

        let sh = (() => {
            class t {
                constructor(t) {
                    this._doc = t, this._dom = Nl()
                }

                addTag(t, e = !1) {
                    return t ? this._getOrCreateElement(t, e) : null
                }

                addTags(t, e = !1) {
                    return t ? t.reduce((t, n) => (n && t.push(this._getOrCreateElement(n, e)), t), []) : []
                }

                getTag(t) {
                    return t && this._doc.querySelector(`meta[${t}]`) || null
                }

                getTags(t) {
                    if (!t) return [];
                    const e = this._doc.querySelectorAll(`meta[${t}]`);
                    return e ? [].slice.call(e) : []
                }

                updateTag(t, e) {
                    if (!t) return null;
                    e = e || this._parseSelector(t);
                    const n = this.getTag(e);
                    return n ? this._setMetaElementAttributes(t, n) : this._getOrCreateElement(t, !0)
                }

                removeTag(t) {
                    this.removeTagElement(this.getTag(t))
                }

                removeTagElement(t) {
                    t && this._dom.remove(t)
                }

                _getOrCreateElement(t, e = !1) {
                    if (!e) {
                        const e = this._parseSelector(t), n = this.getTag(e);
                        if (n && this._containsAttributes(t, n)) return n
                    }
                    const n = this._dom.createElement("meta");
                    return this._setMetaElementAttributes(t, n), this._doc.getElementsByTagName("head")[0].appendChild(n), n
                }

                _setMetaElementAttributes(t, e) {
                    return Object.keys(t).forEach(n => e.setAttribute(this._getMetaKeyMap(n), t[n])), e
                }

                _parseSelector(t) {
                    const e = t.name ? "name" : "property";
                    return `${e}="${t[e]}"`
                }

                _containsAttributes(t, e) {
                    return Object.keys(t).every(n => e.getAttribute(this._getMetaKeyMap(n)) === t[n])
                }

                _getMetaKeyMap(t) {
                    return ih[t] || t
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(cr(Hl))
            }, t.\u0275prov = ut({factory: rh, token: t, providedIn: "root"}), t
        })();
        const ih = {httpEquiv: "http-equiv"};

        function oh() {
            return new ah(cr(Hl))
        }

        let ah = (() => {
            class t {
                constructor(t) {
                    this._doc = t
                }

                getTitle() {
                    return this._doc.title
                }

                setTitle(t) {
                    this._doc.title = t || ""
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(cr(Hl))
            }, t.\u0275prov = ut({factory: oh, token: t, providedIn: "root"}), t
        })();

        function ch(...t) {
            let e = t[t.length - 1];
            return k(e) ? (t.pop(), N(t, e)) : q(t)
        }

        "undefined" != typeof window && window;

        class lh extends S {
            constructor(t) {
                super(), this._value = t
            }

            get value() {
                return this.getValue()
            }

            _subscribe(t) {
                const e = super._subscribe(t);
                return e && !e.closed && t.next(this._value), e
            }

            getValue() {
                if (this.hasError) throw this.thrownError;
                if (this.closed) throw new _;
                return this._value
            }

            next(t) {
                super.next(this._value = t)
            }
        }

        const uh = {};

        class hh {
            constructor(t) {
                this.resultSelector = t
            }

            call(t, e) {
                return e.subscribe(new dh(t, this.resultSelector))
            }
        }

        class dh extends P {
            constructor(t, e) {
                super(t), this.resultSelector = e, this.active = 0, this.values = [], this.observables = []
            }

            _next(t) {
                this.values.push(uh), this.observables.push(t)
            }

            _complete() {
                const t = this.observables, e = t.length;
                if (0 === e) this.destination.complete(); else {
                    this.active = e, this.toRespond = e;
                    for (let n = 0; n < e; n++) {
                        const e = t[n];
                        this.add(L(this, e, e, n))
                    }
                }
            }

            notifyComplete(t) {
                0 == (this.active -= 1) && this.destination.complete()
            }

            notifyNext(t, e, n, r, s) {
                const i = this.values, o = this.toRespond ? i[n] === uh ? --this.toRespond : this.toRespond : 0;
                i[n] = e, 0 === o && (this.resultSelector ? this._tryResultSelector(i) : this.destination.next(i.slice()))
            }

            _tryResultSelector(t) {
                let e;
                try {
                    e = this.resultSelector.apply(this, t)
                } catch (n) {
                    return void this.destination.error(n)
                }
                this.destination.next(e)
            }
        }

        const fh = (() => {
            function t() {
                return Error.call(this), this.message = "no elements in sequence", this.name = "EmptyError", this
            }

            return t.prototype = Object.create(Error.prototype), t
        })();

        function ph(...t) {
            return z(1)(ch(...t))
        }

        const gh = new v(t => t.complete());

        function mh(t) {
            return t ? function (t) {
                return new v(e => t.schedule(() => e.complete()))
            }(t) : gh
        }

        function yh(t) {
            return new v(e => {
                let n;
                try {
                    n = t()
                } catch (r) {
                    return void e.error(r)
                }
                return (n ? H(n) : mh()).subscribe(e)
            })
        }

        function vh(t, e) {
            return "function" == typeof e ? n => n.pipe(vh((n, r) => H(t(n, r)).pipe(j((t, s) => e(n, t, r, s))))) : e => e.lift(new bh(t))
        }

        class bh {
            constructor(t) {
                this.project = t
            }

            call(t, e) {
                return e.subscribe(new _h(t, this.project))
            }
        }

        class _h extends P {
            constructor(t, e) {
                super(t), this.project = e, this.index = 0
            }

            _next(t) {
                let e;
                const n = this.index++;
                try {
                    e = this.project(t, n)
                } catch (r) {
                    return void this.destination.error(r)
                }
                this._innerSub(e, t, n)
            }

            _innerSub(t, e, n) {
                const r = this.innerSubscription;
                r && r.unsubscribe();
                const s = new T(this, void 0, void 0);
                this.destination.add(s), this.innerSubscription = L(this, t, e, n, s)
            }

            _complete() {
                const {innerSubscription: t} = this;
                t && !t.closed || super._complete(), this.unsubscribe()
            }

            _unsubscribe() {
                this.innerSubscription = null
            }

            notifyComplete(t) {
                this.destination.remove(t), this.innerSubscription = null, this.isStopped && super._complete()
            }

            notifyNext(t, e, n, r, s) {
                this.destination.next(e)
            }
        }

        const wh = (() => {
            function t() {
                return Error.call(this), this.message = "argument out of range", this.name = "ArgumentOutOfRangeError", this
            }

            return t.prototype = Object.create(Error.prototype), t
        })();

        function Ch(t) {
            return e => 0 === t ? mh() : e.lift(new Sh(t))
        }

        class Sh {
            constructor(t) {
                if (this.total = t, this.total < 0) throw new wh
            }

            call(t, e) {
                return e.subscribe(new xh(t, this.total))
            }
        }

        class xh extends p {
            constructor(t, e) {
                super(t), this.total = e, this.count = 0
            }

            _next(t) {
                const e = this.total, n = ++this.count;
                n <= e && (this.destination.next(t), n === e && (this.destination.complete(), this.unsubscribe()))
            }
        }

        function kh(t, e) {
            let n = !1;
            return arguments.length >= 2 && (n = !0), function (r) {
                return r.lift(new Th(t, e, n))
            }
        }

        class Th {
            constructor(t, e, n = !1) {
                this.accumulator = t, this.seed = e, this.hasSeed = n
            }

            call(t, e) {
                return e.subscribe(new Ih(t, this.accumulator, this.seed, this.hasSeed))
            }
        }

        class Ih extends p {
            constructor(t, e, n, r) {
                super(t), this.accumulator = e, this._seed = n, this.hasSeed = r, this.index = 0
            }

            get seed() {
                return this._seed
            }

            set seed(t) {
                this.hasSeed = !0, this._seed = t
            }

            _next(t) {
                if (this.hasSeed) return this._tryNext(t);
                this.seed = t, this.destination.next(t)
            }

            _tryNext(t) {
                const e = this.index++;
                let n;
                try {
                    n = this.accumulator(this.seed, t, e)
                } catch (r) {
                    this.destination.error(r)
                }
                this.seed = n, this.destination.next(n)
            }
        }

        function Eh(t, e) {
            return function (n) {
                return n.lift(new Oh(t, e))
            }
        }

        class Oh {
            constructor(t, e) {
                this.predicate = t, this.thisArg = e
            }

            call(t, e) {
                return e.subscribe(new Ah(t, this.predicate, this.thisArg))
            }
        }

        class Ah extends p {
            constructor(t, e, n) {
                super(t), this.predicate = e, this.thisArg = n, this.count = 0
            }

            _next(t) {
                let e;
                try {
                    e = this.predicate.call(this.thisArg, t, this.count++)
                } catch (n) {
                    return void this.destination.error(n)
                }
                e && this.destination.next(t)
            }
        }

        function Rh(t) {
            return function (e) {
                const n = new Lh(t), r = e.lift(n);
                return n.caught = r
            }
        }

        class Lh {
            constructor(t) {
                this.selector = t
            }

            call(t, e) {
                return e.subscribe(new Ph(t, this.selector, this.caught))
            }
        }

        class Ph extends P {
            constructor(t, e, n) {
                super(t), this.selector = e, this.caught = n
            }

            error(t) {
                if (!this.isStopped) {
                    let n;
                    try {
                        n = this.selector(t, this.caught)
                    } catch (e) {
                        return void super.error(e)
                    }
                    this._unsubscribeAndRecycle();
                    const r = new T(this, void 0, void 0);
                    this.add(r), L(this, n, void 0, void 0, r)
                }
            }
        }

        function jh(t, e) {
            return F(t, e, 1)
        }

        function Dh(t) {
            return function (e) {
                return 0 === t ? mh() : e.lift(new Mh(t))
            }
        }

        class Mh {
            constructor(t) {
                if (this.total = t, this.total < 0) throw new wh
            }

            call(t, e) {
                return e.subscribe(new Nh(t, this.total))
            }
        }

        class Nh extends p {
            constructor(t, e) {
                super(t), this.total = e, this.ring = new Array, this.count = 0
            }

            _next(t) {
                const e = this.ring, n = this.total, r = this.count++;
                e.length < n ? e.push(t) : e[r % n] = t
            }

            _complete() {
                const t = this.destination;
                let e = this.count;
                if (e > 0) {
                    const n = this.count >= this.total ? this.total : this.count, r = this.ring;
                    for (let s = 0; s < n; s++) {
                        const s = e++ % n;
                        t.next(r[s])
                    }
                }
                t.complete()
            }
        }

        function Hh(t = $h) {
            return e => e.lift(new Fh(t))
        }

        class Fh {
            constructor(t) {
                this.errorFactory = t
            }

            call(t, e) {
                return e.subscribe(new Uh(t, this.errorFactory))
            }
        }

        class Uh extends p {
            constructor(t, e) {
                super(t), this.errorFactory = e, this.hasValue = !1
            }

            _next(t) {
                this.hasValue = !0, this.destination.next(t)
            }

            _complete() {
                if (this.hasValue) return this.destination.complete();
                {
                    let e;
                    try {
                        e = this.errorFactory()
                    } catch (t) {
                        e = t
                    }
                    this.destination.error(e)
                }
            }
        }

        function $h() {
            return new fh
        }

        function Vh(t = null) {
            return e => e.lift(new zh(t))
        }

        class zh {
            constructor(t) {
                this.defaultValue = t
            }

            call(t, e) {
                return e.subscribe(new qh(t, this.defaultValue))
            }
        }

        class qh extends p {
            constructor(t, e) {
                super(t), this.defaultValue = e, this.isEmpty = !0
            }

            _next(t) {
                this.isEmpty = !1, this.destination.next(t)
            }

            _complete() {
                this.isEmpty && this.destination.next(this.defaultValue), this.destination.complete()
            }
        }

        function Bh(t, e) {
            const n = arguments.length >= 2;
            return r => r.pipe(t ? Eh((e, n) => t(e, n, r)) : V, Ch(1), n ? Vh(e) : Hh(() => new fh))
        }

        function Wh(t, e, n) {
            return function (r) {
                return r.lift(new Gh(t, e, n))
            }
        }

        class Gh {
            constructor(t, e, n) {
                this.nextOrObserver = t, this.error = e, this.complete = n
            }

            call(t, e) {
                return e.subscribe(new Zh(t, this.nextOrObserver, this.error, this.complete))
            }
        }

        class Zh extends p {
            constructor(t, e, n, s) {
                super(t), this._tapNext = y, this._tapError = y, this._tapComplete = y, this._tapError = n || y, this._tapComplete = s || y, r(e) ? (this._context = this, this._tapNext = e) : e && (this._context = e, this._tapNext = e.next || y, this._tapError = e.error || y, this._tapComplete = e.complete || y)
            }

            _next(t) {
                try {
                    this._tapNext.call(this._context, t)
                } catch (e) {
                    return void this.destination.error(e)
                }
                this.destination.next(t)
            }

            _error(t) {
                try {
                    this._tapError.call(this._context, t)
                } catch (t) {
                    return void this.destination.error(t)
                }
                this.destination.error(t)
            }

            _complete() {
                try {
                    this._tapComplete.call(this._context)
                } catch (t) {
                    return void this.destination.error(t)
                }
                return this.destination.complete()
            }
        }

        class Qh {
            constructor(t) {
                this.callback = t
            }

            call(t, e) {
                return e.subscribe(new Kh(t, this.callback))
            }
        }

        class Kh extends p {
            constructor(t, e) {
                super(t), this.add(new h(e))
            }
        }

        class Yh {
            constructor(t, e) {
                this.id = t, this.url = e
            }
        }

        class Jh extends Yh {
            constructor(t, e, n = "imperative", r = null) {
                super(t, e), this.navigationTrigger = n, this.restoredState = r
            }

            toString() {
                return `NavigationStart(id: ${this.id}, url: '${this.url}')`
            }
        }

        class Xh extends Yh {
            constructor(t, e, n) {
                super(t, e), this.urlAfterRedirects = n
            }

            toString() {
                return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`
            }
        }

        class td extends Yh {
            constructor(t, e, n) {
                super(t, e), this.reason = n
            }

            toString() {
                return `NavigationCancel(id: ${this.id}, url: '${this.url}')`
            }
        }

        class ed extends Yh {
            constructor(t, e, n) {
                super(t, e), this.error = n
            }

            toString() {
                return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`
            }
        }

        class nd extends Yh {
            constructor(t, e, n, r) {
                super(t, e), this.urlAfterRedirects = n, this.state = r
            }

            toString() {
                return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`
            }
        }

        class rd extends Yh {
            constructor(t, e, n, r) {
                super(t, e), this.urlAfterRedirects = n, this.state = r
            }

            toString() {
                return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`
            }
        }

        class sd extends Yh {
            constructor(t, e, n, r, s) {
                super(t, e), this.urlAfterRedirects = n, this.state = r, this.shouldActivate = s
            }

            toString() {
                return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`
            }
        }

        class id extends Yh {
            constructor(t, e, n, r) {
                super(t, e), this.urlAfterRedirects = n, this.state = r
            }

            toString() {
                return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`
            }
        }

        class od extends Yh {
            constructor(t, e, n, r) {
                super(t, e), this.urlAfterRedirects = n, this.state = r
            }

            toString() {
                return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`
            }
        }

        class ad {
            constructor(t) {
                this.route = t
            }

            toString() {
                return `RouteConfigLoadStart(path: ${this.route.path})`
            }
        }

        class cd {
            constructor(t) {
                this.route = t
            }

            toString() {
                return `RouteConfigLoadEnd(path: ${this.route.path})`
            }
        }

        class ld {
            constructor(t) {
                this.snapshot = t
            }

            toString() {
                return `ChildActivationStart(path: '${this.snapshot.routeConfig && this.snapshot.routeConfig.path || ""}')`
            }
        }

        class ud {
            constructor(t) {
                this.snapshot = t
            }

            toString() {
                return `ChildActivationEnd(path: '${this.snapshot.routeConfig && this.snapshot.routeConfig.path || ""}')`
            }
        }

        class hd {
            constructor(t) {
                this.snapshot = t
            }

            toString() {
                return `ActivationStart(path: '${this.snapshot.routeConfig && this.snapshot.routeConfig.path || ""}')`
            }
        }

        class dd {
            constructor(t) {
                this.snapshot = t
            }

            toString() {
                return `ActivationEnd(path: '${this.snapshot.routeConfig && this.snapshot.routeConfig.path || ""}')`
            }
        }

        class fd {
            constructor(t, e, n) {
                this.routerEvent = t, this.position = e, this.anchor = n
            }

            toString() {
                return `Scroll(anchor: '${this.anchor}', position: '${this.position ? `${this.position[0]}, ${this.position[1]}` : null}')`
            }
        }

        const pd = "primary";

        class gd {
            constructor(t) {
                this.params = t || {}
            }

            has(t) {
                return Object.prototype.hasOwnProperty.call(this.params, t)
            }

            get(t) {
                if (this.has(t)) {
                    const e = this.params[t];
                    return Array.isArray(e) ? e[0] : e
                }
                return null
            }

            getAll(t) {
                if (this.has(t)) {
                    const e = this.params[t];
                    return Array.isArray(e) ? e : [e]
                }
                return []
            }

            get keys() {
                return Object.keys(this.params)
            }
        }

        function md(t) {
            return new gd(t)
        }

        function yd(t) {
            const e = Error("NavigationCancelingError: " + t);
            return e.ngNavigationCancelingError = !0, e
        }

        function vd(t, e, n) {
            const r = n.path.split("/");
            if (r.length > t.length) return null;
            if ("full" === n.pathMatch && (e.hasChildren() || r.length < t.length)) return null;
            const s = {};
            for (let i = 0; i < r.length; i++) {
                const e = r[i], n = t[i];
                if (e.startsWith(":")) s[e.substring(1)] = n; else if (e !== n.path) return null
            }
            return {consumed: t.slice(0, r.length), posParams: s}
        }

        function bd(t, e) {
            const n = t ? Object.keys(t) : void 0, r = e ? Object.keys(e) : void 0;
            if (!n || !r || n.length != r.length) return !1;
            let s;
            for (let i = 0; i < n.length; i++) if (s = n[i], !_d(t[s], e[s])) return !1;
            return !0
        }

        function _d(t, e) {
            if (Array.isArray(t) && Array.isArray(e)) {
                if (t.length !== e.length) return !1;
                const n = [...t].sort(), r = [...e].sort();
                return n.every((t, e) => r[e] === t)
            }
            return t === e
        }

        function wd(t) {
            return Array.prototype.concat.apply([], t)
        }

        function Cd(t) {
            return t.length > 0 ? t[t.length - 1] : null
        }

        function Sd(t, e) {
            for (const n in t) t.hasOwnProperty(n) && e(t[n], n)
        }

        function xd(t) {
            return Ro(t) ? t : Oo(t) ? H(Promise.resolve(t)) : ch(t)
        }

        const kd = {
            exact: function t(e, n, r) {
                if (!jd(e.segments, n.segments)) return !1;
                if (!Ad(e.segments, n.segments, r)) return !1;
                if (e.numberOfChildren !== n.numberOfChildren) return !1;
                for (const s in n.children) {
                    if (!e.children[s]) return !1;
                    if (!t(e.children[s], n.children[s], r)) return !1
                }
                return !0
            }, subset: Ed
        }, Td = {
            exact: function (t, e) {
                return bd(t, e)
            }, subset: function (t, e) {
                return Object.keys(e).length <= Object.keys(t).length && Object.keys(e).every(n => _d(t[n], e[n]))
            }, ignored: () => !0
        };

        function Id(t, e, n) {
            return kd[n.paths](t.root, e.root, n.matrixParams) && Td[n.queryParams](t.queryParams, e.queryParams) && !("exact" === n.fragment && t.fragment !== e.fragment)
        }

        function Ed(t, e, n) {
            return Od(t, e, e.segments, n)
        }

        function Od(t, e, n, r) {
            if (t.segments.length > n.length) {
                const s = t.segments.slice(0, n.length);
                return !!jd(s, n) && !e.hasChildren() && !!Ad(s, n, r)
            }
            if (t.segments.length === n.length) {
                if (!jd(t.segments, n)) return !1;
                if (!Ad(t.segments, n, r)) return !1;
                for (const n in e.children) {
                    if (!t.children[n]) return !1;
                    if (!Ed(t.children[n], e.children[n], r)) return !1
                }
                return !0
            }
            {
                const s = n.slice(0, t.segments.length), i = n.slice(t.segments.length);
                return !!jd(t.segments, s) && !!Ad(t.segments, s, r) && !!t.children.primary && Od(t.children.primary, e, i, r)
            }
        }

        function Ad(t, e, n) {
            return e.every((e, r) => Td[n](t[r].parameters, e.parameters))
        }

        class Rd {
            constructor(t, e, n) {
                this.root = t, this.queryParams = e, this.fragment = n
            }

            get queryParamMap() {
                return this._queryParamMap || (this._queryParamMap = md(this.queryParams)), this._queryParamMap
            }

            toString() {
                return Nd.serialize(this)
            }
        }

        class Ld {
            constructor(t, e) {
                this.segments = t, this.children = e, this.parent = null, Sd(e, (t, e) => t.parent = this)
            }

            hasChildren() {
                return this.numberOfChildren > 0
            }

            get numberOfChildren() {
                return Object.keys(this.children).length
            }

            toString() {
                return Hd(this)
            }
        }

        class Pd {
            constructor(t, e) {
                this.path = t, this.parameters = e
            }

            get parameterMap() {
                return this._parameterMap || (this._parameterMap = md(this.parameters)), this._parameterMap
            }

            toString() {
                return Bd(this)
            }
        }

        function jd(t, e) {
            return t.length === e.length && t.every((t, n) => t.path === e[n].path)
        }

        class Dd {
        }

        class Md {
            parse(t) {
                const e = new Kd(t);
                return new Rd(e.parseRootSegment(), e.parseQueryParams(), e.parseFragment())
            }

            serialize(t) {
                var e;
                return `/${Fd(t.root, !0)}${function (t) {
                    const e = Object.keys(t).map(e => {
                        const n = t[e];
                        return Array.isArray(n) ? n.map(t => `${$d(e)}=${$d(t)}`).join("&") : `${$d(e)}=${$d(n)}`
                    }).filter(t => !!t);
                    return e.length ? `?${e.join("&")}` : ""
                }(t.queryParams)}${"string" == typeof t.fragment ? `#${e = t.fragment, encodeURI(e)}` : ""}`
            }
        }

        const Nd = new Md;

        function Hd(t) {
            return t.segments.map(t => Bd(t)).join("/")
        }

        function Fd(t, e) {
            if (!t.hasChildren()) return Hd(t);
            if (e) {
                const e = t.children.primary ? Fd(t.children.primary, !1) : "", n = [];
                return Sd(t.children, (t, e) => {
                    e !== pd && n.push(`${e}:${Fd(t, !1)}`)
                }), n.length > 0 ? `${e}(${n.join("//")})` : e
            }
            {
                const e = function (t, e) {
                    let n = [];
                    return Sd(t.children, (t, r) => {
                        r === pd && (n = n.concat(e(t, r)))
                    }), Sd(t.children, (t, r) => {
                        r !== pd && (n = n.concat(e(t, r)))
                    }), n
                }(t, (e, n) => n === pd ? [Fd(t.children.primary, !1)] : [`${n}:${Fd(e, !1)}`]);
                return 1 === Object.keys(t.children).length && null != t.children.primary ? `${Hd(t)}/${e[0]}` : `${Hd(t)}/(${e.join("//")})`
            }
        }

        function Ud(t) {
            return encodeURIComponent(t).replace(/%40/g, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",")
        }

        function $d(t) {
            return Ud(t).replace(/%3B/gi, ";")
        }

        function Vd(t) {
            return Ud(t).replace(/\(/g, "%28").replace(/\)/g, "%29").replace(/%26/gi, "&")
        }

        function zd(t) {
            return decodeURIComponent(t)
        }

        function qd(t) {
            return zd(t.replace(/\+/g, "%20"))
        }

        function Bd(t) {
            return `${Vd(t.path)}${e = t.parameters, Object.keys(e).map(t => `;${Vd(t)}=${Vd(e[t])}`).join("")}`;
            var e
        }

        const Wd = /^[^\/()?;=#]+/;

        function Gd(t) {
            const e = t.match(Wd);
            return e ? e[0] : ""
        }

        const Zd = /^[^=?&#]+/, Qd = /^[^?&#]+/;

        class Kd {
            constructor(t) {
                this.url = t, this.remaining = t
            }

            parseRootSegment() {
                return this.consumeOptional("/"), "" === this.remaining || this.peekStartsWith("?") || this.peekStartsWith("#") ? new Ld([], {}) : new Ld([], this.parseChildren())
            }

            parseQueryParams() {
                const t = {};
                if (this.consumeOptional("?")) do {
                    this.parseQueryParam(t)
                } while (this.consumeOptional("&"));
                return t
            }

            parseFragment() {
                return this.consumeOptional("#") ? decodeURIComponent(this.remaining) : null
            }

            parseChildren() {
                if ("" === this.remaining) return {};
                this.consumeOptional("/");
                const t = [];
                for (this.peekStartsWith("(") || t.push(this.parseSegment()); this.peekStartsWith("/") && !this.peekStartsWith("//") && !this.peekStartsWith("/(");) this.capture("/"), t.push(this.parseSegment());
                let e = {};
                this.peekStartsWith("/(") && (this.capture("/"), e = this.parseParens(!0));
                let n = {};
                return this.peekStartsWith("(") && (n = this.parseParens(!1)), (t.length > 0 || Object.keys(e).length > 0) && (n.primary = new Ld(t, e)), n
            }

            parseSegment() {
                const t = Gd(this.remaining);
                if ("" === t && this.peekStartsWith(";")) throw new Error(`Empty path url segment cannot have parameters: '${this.remaining}'.`);
                return this.capture(t), new Pd(zd(t), this.parseMatrixParams())
            }

            parseMatrixParams() {
                const t = {};
                for (; this.consumeOptional(";");) this.parseParam(t);
                return t
            }

            parseParam(t) {
                const e = Gd(this.remaining);
                if (!e) return;
                this.capture(e);
                let n = "";
                if (this.consumeOptional("=")) {
                    const t = Gd(this.remaining);
                    t && (n = t, this.capture(n))
                }
                t[zd(e)] = zd(n)
            }

            parseQueryParam(t) {
                const e = function (t) {
                    const e = t.match(Zd);
                    return e ? e[0] : ""
                }(this.remaining);
                if (!e) return;
                this.capture(e);
                let n = "";
                if (this.consumeOptional("=")) {
                    const t = function (t) {
                        const e = t.match(Qd);
                        return e ? e[0] : ""
                    }(this.remaining);
                    t && (n = t, this.capture(n))
                }
                const r = qd(e), s = qd(n);
                if (t.hasOwnProperty(r)) {
                    let e = t[r];
                    Array.isArray(e) || (e = [e], t[r] = e), e.push(s)
                } else t[r] = s
            }

            parseParens(t) {
                const e = {};
                for (this.capture("("); !this.consumeOptional(")") && this.remaining.length > 0;) {
                    const n = Gd(this.remaining), r = this.remaining[n.length];
                    if ("/" !== r && ")" !== r && ";" !== r) throw new Error(`Cannot parse url '${this.url}'`);
                    let s;
                    n.indexOf(":") > -1 ? (s = n.substr(0, n.indexOf(":")), this.capture(s), this.capture(":")) : t && (s = pd);
                    const i = this.parseChildren();
                    e[s] = 1 === Object.keys(i).length ? i.primary : new Ld([], i), this.consumeOptional("//")
                }
                return e
            }

            peekStartsWith(t) {
                return this.remaining.startsWith(t)
            }

            consumeOptional(t) {
                return !!this.peekStartsWith(t) && (this.remaining = this.remaining.substring(t.length), !0)
            }

            capture(t) {
                if (!this.consumeOptional(t)) throw new Error(`Expected "${t}".`)
            }
        }

        class Yd {
            constructor(t) {
                this._root = t
            }

            get root() {
                return this._root.value
            }

            parent(t) {
                const e = this.pathFromRoot(t);
                return e.length > 1 ? e[e.length - 2] : null
            }

            children(t) {
                const e = Jd(t, this._root);
                return e ? e.children.map(t => t.value) : []
            }

            firstChild(t) {
                const e = Jd(t, this._root);
                return e && e.children.length > 0 ? e.children[0].value : null
            }

            siblings(t) {
                const e = Xd(t, this._root);
                return e.length < 2 ? [] : e[e.length - 2].children.map(t => t.value).filter(e => e !== t)
            }

            pathFromRoot(t) {
                return Xd(t, this._root).map(t => t.value)
            }
        }

        function Jd(t, e) {
            if (t === e.value) return e;
            for (const n of e.children) {
                const e = Jd(t, n);
                if (e) return e
            }
            return null
        }

        function Xd(t, e) {
            if (t === e.value) return [e];
            for (const n of e.children) {
                const r = Xd(t, n);
                if (r.length) return r.unshift(e), r
            }
            return []
        }

        class tf {
            constructor(t, e) {
                this.value = t, this.children = e
            }

            toString() {
                return `TreeNode(${this.value})`
            }
        }

        function ef(t) {
            const e = {};
            return t && t.children.forEach(t => e[t.value.outlet] = t), e
        }

        class nf extends Yd {
            constructor(t, e) {
                super(t), this.snapshot = e, lf(this, t)
            }

            toString() {
                return this.snapshot.toString()
            }
        }

        function rf(t, e) {
            const n = function (t, e) {
                    const n = new af([], {}, {}, "", {}, pd, e, null, t.root, -1, {});
                    return new cf("", new tf(n, []))
                }(t, e), r = new lh([new Pd("", {})]), s = new lh({}), i = new lh({}), o = new lh({}), a = new lh(""),
                c = new sf(r, s, o, a, i, pd, e, n.root);
            return c.snapshot = n.root, new nf(new tf(c, []), n)
        }

        class sf {
            constructor(t, e, n, r, s, i, o, a) {
                this.url = t, this.params = e, this.queryParams = n, this.fragment = r, this.data = s, this.outlet = i, this.component = o, this._futureSnapshot = a
            }

            get routeConfig() {
                return this._futureSnapshot.routeConfig
            }

            get root() {
                return this._routerState.root
            }

            get parent() {
                return this._routerState.parent(this)
            }

            get firstChild() {
                return this._routerState.firstChild(this)
            }

            get children() {
                return this._routerState.children(this)
            }

            get pathFromRoot() {
                return this._routerState.pathFromRoot(this)
            }

            get paramMap() {
                return this._paramMap || (this._paramMap = this.params.pipe(j(t => md(t)))), this._paramMap
            }

            get queryParamMap() {
                return this._queryParamMap || (this._queryParamMap = this.queryParams.pipe(j(t => md(t)))), this._queryParamMap
            }

            toString() {
                return this.snapshot ? this.snapshot.toString() : `Future(${this._futureSnapshot})`
            }
        }

        function of(t, e = "emptyOnly") {
            const n = t.pathFromRoot;
            let r = 0;
            if ("always" !== e) for (r = n.length - 1; r >= 1;) {
                const t = n[r], e = n[r - 1];
                if (t.routeConfig && "" === t.routeConfig.path) r--; else {
                    if (e.component) break;
                    r--
                }
            }
            return function (t) {
                return t.reduce((t, e) => ({
                    params: Object.assign(Object.assign({}, t.params), e.params),
                    data: Object.assign(Object.assign({}, t.data), e.data),
                    resolve: Object.assign(Object.assign({}, t.resolve), e._resolvedData)
                }), {params: {}, data: {}, resolve: {}})
            }(n.slice(r))
        }

        class af {
            constructor(t, e, n, r, s, i, o, a, c, l, u) {
                this.url = t, this.params = e, this.queryParams = n, this.fragment = r, this.data = s, this.outlet = i, this.component = o, this.routeConfig = a, this._urlSegment = c, this._lastPathIndex = l, this._resolve = u
            }

            get root() {
                return this._routerState.root
            }

            get parent() {
                return this._routerState.parent(this)
            }

            get firstChild() {
                return this._routerState.firstChild(this)
            }

            get children() {
                return this._routerState.children(this)
            }

            get pathFromRoot() {
                return this._routerState.pathFromRoot(this)
            }

            get paramMap() {
                return this._paramMap || (this._paramMap = md(this.params)), this._paramMap
            }

            get queryParamMap() {
                return this._queryParamMap || (this._queryParamMap = md(this.queryParams)), this._queryParamMap
            }

            toString() {
                return `Route(url:'${this.url.map(t => t.toString()).join("/")}', path:'${this.routeConfig ? this.routeConfig.path : ""}')`
            }
        }

        class cf extends Yd {
            constructor(t, e) {
                super(e), this.url = t, lf(this, e)
            }

            toString() {
                return uf(this._root)
            }
        }

        function lf(t, e) {
            e.value._routerState = t, e.children.forEach(e => lf(t, e))
        }

        function uf(t) {
            const e = t.children.length > 0 ? ` { ${t.children.map(uf).join(", ")} } ` : "";
            return `${t.value}${e}`
        }

        function hf(t) {
            if (t.snapshot) {
                const e = t.snapshot, n = t._futureSnapshot;
                t.snapshot = n, bd(e.queryParams, n.queryParams) || t.queryParams.next(n.queryParams), e.fragment !== n.fragment && t.fragment.next(n.fragment), bd(e.params, n.params) || t.params.next(n.params), function (t, e) {
                    if (t.length !== e.length) return !1;
                    for (let n = 0; n < t.length; ++n) if (!bd(t[n], e[n])) return !1;
                    return !0
                }(e.url, n.url) || t.url.next(n.url), bd(e.data, n.data) || t.data.next(n.data)
            } else t.snapshot = t._futureSnapshot, t.data.next(t._futureSnapshot.data)
        }

        function df(t, e) {
            var n, r;
            return bd(t.params, e.params) && jd(n = t.url, r = e.url) && n.every((t, e) => bd(t.parameters, r[e].parameters)) && !(!t.parent != !e.parent) && (!t.parent || df(t.parent, e.parent))
        }

        function ff(t, e, n) {
            if (n && t.shouldReuseRoute(e.value, n.value.snapshot)) {
                const r = n.value;
                r._futureSnapshot = e.value;
                const s = function (t, e, n) {
                    return e.children.map(e => {
                        for (const r of n.children) if (t.shouldReuseRoute(e.value, r.value.snapshot)) return ff(t, e, r);
                        return ff(t, e)
                    })
                }(t, e, n);
                return new tf(r, s)
            }
            {
                if (t.shouldAttach(e.value)) {
                    const n = t.retrieve(e.value);
                    if (null !== n) {
                        const t = n.route;
                        return pf(e, t), t
                    }
                }
                const n = new sf(new lh((r = e.value).url), new lh(r.params), new lh(r.queryParams), new lh(r.fragment), new lh(r.data), r.outlet, r.component, r),
                    s = e.children.map(e => ff(t, e));
                return new tf(n, s)
            }
            var r
        }

        function pf(t, e) {
            if (t.value.routeConfig !== e.value.routeConfig) throw new Error("Cannot reattach ActivatedRouteSnapshot created from a different route");
            if (t.children.length !== e.children.length) throw new Error("Cannot reattach ActivatedRouteSnapshot with a different number of children");
            e.value._futureSnapshot = t.value;
            for (let n = 0; n < t.children.length; ++n) pf(t.children[n], e.children[n])
        }

        function gf(t) {
            return "object" == typeof t && null != t && !t.outlets && !t.segmentPath
        }

        function mf(t) {
            return "object" == typeof t && null != t && t.outlets
        }

        function yf(t, e, n, r, s) {
            let i = {};
            return r && Sd(r, (t, e) => {
                i[e] = Array.isArray(t) ? t.map(t => `${t}`) : `${t}`
            }), new Rd(n.root === t ? e : vf(n.root, t, e), i, s)
        }

        function vf(t, e, n) {
            const r = {};
            return Sd(t.children, (t, s) => {
                r[s] = t === e ? n : vf(t, e, n)
            }), new Ld(t.segments, r)
        }

        class bf {
            constructor(t, e, n) {
                if (this.isAbsolute = t, this.numberOfDoubleDots = e, this.commands = n, t && n.length > 0 && gf(n[0])) throw new Error("Root segment cannot have matrix parameters");
                const r = n.find(mf);
                if (r && r !== Cd(n)) throw new Error("{outlets:{}} has to be the last command")
            }

            toRoot() {
                return this.isAbsolute && 1 === this.commands.length && "/" == this.commands[0]
            }
        }

        class _f {
            constructor(t, e, n) {
                this.segmentGroup = t, this.processChildren = e, this.index = n
            }
        }

        function wf(t, e, n) {
            if (t || (t = new Ld([], {})), 0 === t.segments.length && t.hasChildren()) return Cf(t, e, n);
            const r = function (t, e, n) {
                let r = 0, s = e;
                const i = {match: !1, pathIndex: 0, commandIndex: 0};
                for (; s < t.segments.length;) {
                    if (r >= n.length) return i;
                    const e = t.segments[s], o = n[r];
                    if (mf(o)) break;
                    const a = `${o}`, c = r < n.length - 1 ? n[r + 1] : null;
                    if (s > 0 && void 0 === a) break;
                    if (a && c && "object" == typeof c && void 0 === c.outlets) {
                        if (!Tf(a, c, e)) return i;
                        r += 2
                    } else {
                        if (!Tf(a, {}, e)) return i;
                        r++
                    }
                    s++
                }
                return {match: !0, pathIndex: s, commandIndex: r}
            }(t, e, n), s = n.slice(r.commandIndex);
            if (r.match && r.pathIndex < t.segments.length) {
                const e = new Ld(t.segments.slice(0, r.pathIndex), {});
                return e.children.primary = new Ld(t.segments.slice(r.pathIndex), t.children), Cf(e, 0, s)
            }
            return r.match && 0 === s.length ? new Ld(t.segments, {}) : r.match && !t.hasChildren() ? Sf(t, e, n) : r.match ? Cf(t, 0, s) : Sf(t, e, n)
        }

        function Cf(t, e, n) {
            if (0 === n.length) return new Ld(t.segments, {});
            {
                const r = function (t) {
                    return mf(t[0]) ? t[0].outlets : {[pd]: t}
                }(n), s = {};
                return Sd(r, (n, r) => {
                    "string" == typeof n && (n = [n]), null !== n && (s[r] = wf(t.children[r], e, n))
                }), Sd(t.children, (t, e) => {
                    void 0 === r[e] && (s[e] = t)
                }), new Ld(t.segments, s)
            }
        }

        function Sf(t, e, n) {
            const r = t.segments.slice(0, e);
            let s = 0;
            for (; s < n.length;) {
                const i = n[s];
                if (mf(i)) {
                    const t = xf(i.outlets);
                    return new Ld(r, t)
                }
                if (0 === s && gf(n[0])) {
                    r.push(new Pd(t.segments[e].path, kf(n[0]))), s++;
                    continue
                }
                const o = mf(i) ? i.outlets.primary : `${i}`, a = s < n.length - 1 ? n[s + 1] : null;
                o && a && gf(a) ? (r.push(new Pd(o, kf(a))), s += 2) : (r.push(new Pd(o, {})), s++)
            }
            return new Ld(r, {})
        }

        function xf(t) {
            const e = {};
            return Sd(t, (t, n) => {
                "string" == typeof t && (t = [t]), null !== t && (e[n] = Sf(new Ld([], {}), 0, t))
            }), e
        }

        function kf(t) {
            const e = {};
            return Sd(t, (t, n) => e[n] = `${t}`), e
        }

        function Tf(t, e, n) {
            return t == n.path && bd(e, n.parameters)
        }

        class If {
            constructor(t, e, n, r) {
                this.routeReuseStrategy = t, this.futureState = e, this.currState = n, this.forwardEvent = r
            }

            activate(t) {
                const e = this.futureState._root, n = this.currState ? this.currState._root : null;
                this.deactivateChildRoutes(e, n, t), hf(this.futureState.root), this.activateChildRoutes(e, n, t)
            }

            deactivateChildRoutes(t, e, n) {
                const r = ef(e);
                t.children.forEach(t => {
                    const e = t.value.outlet;
                    this.deactivateRoutes(t, r[e], n), delete r[e]
                }), Sd(r, (t, e) => {
                    this.deactivateRouteAndItsChildren(t, n)
                })
            }

            deactivateRoutes(t, e, n) {
                const r = t.value, s = e ? e.value : null;
                if (r === s) if (r.component) {
                    const s = n.getContext(r.outlet);
                    s && this.deactivateChildRoutes(t, e, s.children)
                } else this.deactivateChildRoutes(t, e, n); else s && this.deactivateRouteAndItsChildren(e, n)
            }

            deactivateRouteAndItsChildren(t, e) {
                this.routeReuseStrategy.shouldDetach(t.value.snapshot) ? this.detachAndStoreRouteSubtree(t, e) : this.deactivateRouteAndOutlet(t, e)
            }

            detachAndStoreRouteSubtree(t, e) {
                const n = e.getContext(t.value.outlet);
                if (n && n.outlet) {
                    const e = n.outlet.detach(), r = n.children.onOutletDeactivated();
                    this.routeReuseStrategy.store(t.value.snapshot, {componentRef: e, route: t, contexts: r})
                }
            }

            deactivateRouteAndOutlet(t, e) {
                const n = e.getContext(t.value.outlet), r = n && t.value.component ? n.children : e, s = ef(t);
                for (const i of Object.keys(s)) this.deactivateRouteAndItsChildren(s[i], r);
                n && n.outlet && (n.outlet.deactivate(), n.children.onOutletDeactivated(), n.attachRef = null, n.resolver = null, n.route = null)
            }

            activateChildRoutes(t, e, n) {
                const r = ef(e);
                t.children.forEach(t => {
                    this.activateRoutes(t, r[t.value.outlet], n), this.forwardEvent(new dd(t.value.snapshot))
                }), t.children.length && this.forwardEvent(new ud(t.value.snapshot))
            }

            activateRoutes(t, e, n) {
                const r = t.value, s = e ? e.value : null;
                if (hf(r), r === s) if (r.component) {
                    const s = n.getOrCreateContext(r.outlet);
                    this.activateChildRoutes(t, e, s.children)
                } else this.activateChildRoutes(t, e, n); else if (r.component) {
                    const e = n.getOrCreateContext(r.outlet);
                    if (this.routeReuseStrategy.shouldAttach(r.snapshot)) {
                        const t = this.routeReuseStrategy.retrieve(r.snapshot);
                        this.routeReuseStrategy.store(r.snapshot, null), e.children.onOutletReAttached(t.contexts), e.attachRef = t.componentRef, e.route = t.route.value, e.outlet && e.outlet.attach(t.componentRef, t.route.value), Ef(t.route)
                    } else {
                        const n = function (t) {
                            for (let e = t.parent; e; e = e.parent) {
                                const t = e.routeConfig;
                                if (t && t._loadedConfig) return t._loadedConfig;
                                if (t && t.component) return null
                            }
                            return null
                        }(r.snapshot), s = n ? n.module.componentFactoryResolver : null;
                        e.attachRef = null, e.route = r, e.resolver = s, e.outlet && e.outlet.activateWith(r, s), this.activateChildRoutes(t, null, e.children)
                    }
                } else this.activateChildRoutes(t, null, n)
            }
        }

        function Ef(t) {
            hf(t.value), t.children.forEach(Ef)
        }

        class Of {
            constructor(t, e) {
                this.routes = t, this.module = e
            }
        }

        function Af(t) {
            return "function" == typeof t
        }

        function Rf(t) {
            return t instanceof Rd
        }

        const Lf = Symbol("INITIAL_VALUE");

        function Pf() {
            return vh(t => function (...t) {
                let e = null, n = null;
                return k(t[t.length - 1]) && (n = t.pop()), "function" == typeof t[t.length - 1] && (e = t.pop()), 1 === t.length && c(t[0]) && (t = t[0]), q(t, n).lift(new hh(e))
            }(t.map(t => t.pipe(Ch(1), function (...t) {
                const e = t[t.length - 1];
                return k(e) ? (t.pop(), n => ph(t, n, e)) : e => ph(t, e)
            }(Lf)))).pipe(kh((t, e) => {
                let n = !1;
                return e.reduce((t, r, s) => {
                    if (t !== Lf) return t;
                    if (r === Lf && (n = !0), !n) {
                        if (!1 === r) return r;
                        if (s === e.length - 1 || Rf(r)) return r
                    }
                    return t
                }, t)
            }, Lf), Eh(t => t !== Lf), j(t => Rf(t) ? t : !0 === t), Ch(1)))
        }

        let jf = (() => {
            class t {
            }

            return t.\u0275fac = function (e) {
                return new (e || t)
            }, t.\u0275cmp = $t({
                type: t, selectors: [["ng-component"]], decls: 1, vars: 0, template: function (t, e) {
                    1 & t && ko(0, "router-outlet")
                }, directives: function () {
                    return [Pp]
                }, encapsulation: 2
            }), t
        })();

        function Df(t, e = "") {
            for (let n = 0; n < t.length; n++) {
                const r = t[n];
                Mf(r, Nf(e, r))
            }
        }

        function Mf(t, e) {
            t.children && Df(t.children, e)
        }

        function Nf(t, e) {
            return e ? t || e.path ? t && !e.path ? `${t}/` : !t && e.path ? e.path : `${t}/${e.path}` : "" : t
        }

        function Hf(t) {
            const e = t.children && t.children.map(Hf),
                n = e ? Object.assign(Object.assign({}, t), {children: e}) : Object.assign({}, t);
            return !n.component && (e || n.loadChildren) && n.outlet && n.outlet !== pd && (n.component = jf), n
        }

        function Ff(t) {
            return t.outlet || pd
        }

        function Uf(t, e) {
            const n = t.filter(t => Ff(t) === e);
            return n.push(...t.filter(t => Ff(t) !== e)), n
        }

        const $f = {matched: !1, consumedSegments: [], lastChild: 0, parameters: {}, positionalParamSegments: {}};

        function Vf(t, e, n) {
            var r;
            if ("" === e.path) return "full" === e.pathMatch && (t.hasChildren() || n.length > 0) ? Object.assign({}, $f) : {
                matched: !0,
                consumedSegments: [],
                lastChild: 0,
                parameters: {},
                positionalParamSegments: {}
            };
            const s = (e.matcher || vd)(n, t, e);
            if (!s) return Object.assign({}, $f);
            const i = {};
            Sd(s.posParams, (t, e) => {
                i[e] = t.path
            });
            const o = s.consumed.length > 0 ? Object.assign(Object.assign({}, i), s.consumed[s.consumed.length - 1].parameters) : i;
            return {
                matched: !0,
                consumedSegments: s.consumed,
                lastChild: s.consumed.length,
                parameters: o,
                positionalParamSegments: null !== (r = s.posParams) && void 0 !== r ? r : {}
            }
        }

        function zf(t, e, n, r, s = "corrected") {
            if (n.length > 0 && function (t, e, n) {
                return n.some(n => qf(t, e, n) && Ff(n) !== pd)
            }(t, n, r)) {
                const s = new Ld(e, function (t, e, n, r) {
                    const s = {};
                    s.primary = r, r._sourceSegment = t, r._segmentIndexShift = e.length;
                    for (const i of n) if ("" === i.path && Ff(i) !== pd) {
                        const n = new Ld([], {});
                        n._sourceSegment = t, n._segmentIndexShift = e.length, s[Ff(i)] = n
                    }
                    return s
                }(t, e, r, new Ld(n, t.children)));
                return s._sourceSegment = t, s._segmentIndexShift = e.length, {segmentGroup: s, slicedSegments: []}
            }
            if (0 === n.length && function (t, e, n) {
                return n.some(n => qf(t, e, n))
            }(t, n, r)) {
                const i = new Ld(t.segments, function (t, e, n, r, s, i) {
                    const o = {};
                    for (const a of r) if (qf(t, n, a) && !s[Ff(a)]) {
                        const n = new Ld([], {});
                        n._sourceSegment = t, n._segmentIndexShift = "legacy" === i ? t.segments.length : e.length, o[Ff(a)] = n
                    }
                    return Object.assign(Object.assign({}, s), o)
                }(t, e, n, r, t.children, s));
                return i._sourceSegment = t, i._segmentIndexShift = e.length, {segmentGroup: i, slicedSegments: n}
            }
            const i = new Ld(t.segments, t.children);
            return i._sourceSegment = t, i._segmentIndexShift = e.length, {segmentGroup: i, slicedSegments: n}
        }

        function qf(t, e, n) {
            return (!(t.hasChildren() || e.length > 0) || "full" !== n.pathMatch) && "" === n.path
        }

        function Bf(t, e, n, r) {
            return !!(Ff(t) === r || r !== pd && qf(e, n, t)) && ("**" === t.path || Vf(e, t, n).matched)
        }

        function Wf(t, e, n) {
            return 0 === e.length && !t.children[n]
        }

        class Gf {
            constructor(t) {
                this.segmentGroup = t || null
            }
        }

        class Zf {
            constructor(t) {
                this.urlTree = t
            }
        }

        function Qf(t) {
            return new v(e => e.error(new Gf(t)))
        }

        function Kf(t) {
            return new v(e => e.error(new Zf(t)))
        }

        function Yf(t) {
            return new v(e => e.error(new Error(`Only absolute redirects can have named outlets. redirectTo: '${t}'`)))
        }

        class Jf {
            constructor(t, e, n, r, s) {
                this.configLoader = e, this.urlSerializer = n, this.urlTree = r, this.config = s, this.allowRedirects = !0, this.ngModule = t.get(qa)
            }

            apply() {
                const t = zf(this.urlTree.root, [], [], this.config).segmentGroup, e = new Ld(t.segments, t.children);
                return this.expandSegmentGroup(this.ngModule, this.config, e, pd).pipe(j(t => this.createUrlTree(Xf(t), this.urlTree.queryParams, this.urlTree.fragment))).pipe(Rh(t => {
                    if (t instanceof Zf) return this.allowRedirects = !1, this.match(t.urlTree);
                    if (t instanceof Gf) throw this.noMatchError(t);
                    throw t
                }))
            }

            match(t) {
                return this.expandSegmentGroup(this.ngModule, this.config, t.root, pd).pipe(j(e => this.createUrlTree(Xf(e), t.queryParams, t.fragment))).pipe(Rh(t => {
                    if (t instanceof Gf) throw this.noMatchError(t);
                    throw t
                }))
            }

            noMatchError(t) {
                return new Error(`Cannot match any routes. URL Segment: '${t.segmentGroup}'`)
            }

            createUrlTree(t, e, n) {
                const r = t.segments.length > 0 ? new Ld([], {[pd]: t}) : t;
                return new Rd(r, e, n)
            }

            expandSegmentGroup(t, e, n, r) {
                return 0 === n.segments.length && n.hasChildren() ? this.expandChildren(t, e, n).pipe(j(t => new Ld([], t))) : this.expandSegment(t, n, e, n.segments, r, !0)
            }

            expandChildren(t, e, n) {
                const r = [];
                for (const s of Object.keys(n.children)) "primary" === s ? r.unshift(s) : r.push(s);
                return H(r).pipe(jh(r => {
                    const s = n.children[r], i = Uf(e, r);
                    return this.expandSegmentGroup(t, i, s, r).pipe(j(t => ({segment: t, outlet: r})))
                }), kh((t, e) => (t[e.outlet] = e.segment, t), {}), function (t, e) {
                    const n = arguments.length >= 2;
                    return r => r.pipe(t ? Eh((e, n) => t(e, n, r)) : V, Dh(1), n ? Vh(e) : Hh(() => new fh))
                }())
            }

            expandSegment(t, e, n, r, s, i) {
                return H(n).pipe(jh(o => this.expandSegmentAgainstRoute(t, e, n, o, r, s, i).pipe(Rh(t => {
                    if (t instanceof Gf) return ch(null);
                    throw t
                }))), Bh(t => !!t), Rh((t, n) => {
                    if (t instanceof fh || "EmptyError" === t.name) {
                        if (Wf(e, r, s)) return ch(new Ld([], {}));
                        throw new Gf(e)
                    }
                    throw t
                }))
            }

            expandSegmentAgainstRoute(t, e, n, r, s, i, o) {
                return Bf(r, e, s, i) ? void 0 === r.redirectTo ? this.matchSegmentAgainstRoute(t, e, r, s, i) : o && this.allowRedirects ? this.expandSegmentAgainstRouteUsingRedirect(t, e, n, r, s, i) : Qf(e) : Qf(e)
            }

            expandSegmentAgainstRouteUsingRedirect(t, e, n, r, s, i) {
                return "**" === r.path ? this.expandWildCardWithParamsAgainstRouteUsingRedirect(t, n, r, i) : this.expandRegularSegmentAgainstRouteUsingRedirect(t, e, n, r, s, i)
            }

            expandWildCardWithParamsAgainstRouteUsingRedirect(t, e, n, r) {
                const s = this.applyRedirectCommands([], n.redirectTo, {});
                return n.redirectTo.startsWith("/") ? Kf(s) : this.lineralizeSegments(n, s).pipe(F(n => {
                    const s = new Ld(n, {});
                    return this.expandSegment(t, s, e, n, r, !1)
                }))
            }

            expandRegularSegmentAgainstRouteUsingRedirect(t, e, n, r, s, i) {
                const {matched: o, consumedSegments: a, lastChild: c, positionalParamSegments: l} = Vf(e, r, s);
                if (!o) return Qf(e);
                const u = this.applyRedirectCommands(a, r.redirectTo, l);
                return r.redirectTo.startsWith("/") ? Kf(u) : this.lineralizeSegments(r, u).pipe(F(r => this.expandSegment(t, e, n, r.concat(s.slice(c)), i, !1)))
            }

            matchSegmentAgainstRoute(t, e, n, r, s) {
                if ("**" === n.path) return n.loadChildren ? (n._loadedConfig ? ch(n._loadedConfig) : this.configLoader.load(t.injector, n)).pipe(j(t => (n._loadedConfig = t, new Ld(r, {})))) : ch(new Ld(r, {}));
                const {matched: i, consumedSegments: o, lastChild: a} = Vf(e, n, r);
                if (!i) return Qf(e);
                const c = r.slice(a);
                return this.getChildConfig(t, n, r).pipe(F(t => {
                    const r = t.module, i = t.routes, {segmentGroup: a, slicedSegments: l} = zf(e, o, c, i),
                        u = new Ld(a.segments, a.children);
                    if (0 === l.length && u.hasChildren()) return this.expandChildren(r, i, u).pipe(j(t => new Ld(o, t)));
                    if (0 === i.length && 0 === l.length) return ch(new Ld(o, {}));
                    const h = Ff(n) === s;
                    return this.expandSegment(r, u, i, l, h ? pd : s, !0).pipe(j(t => new Ld(o.concat(t.segments), t.children)))
                }))
            }

            getChildConfig(t, e, n) {
                return e.children ? ch(new Of(e.children, t)) : e.loadChildren ? void 0 !== e._loadedConfig ? ch(e._loadedConfig) : this.runCanLoadGuards(t.injector, e, n).pipe(F(n => n ? this.configLoader.load(t.injector, e).pipe(j(t => (e._loadedConfig = t, t))) : function (t) {
                    return new v(e => e.error(yd(`Cannot load children because the guard of the route "path: '${t.path}'" returned false`)))
                }(e))) : ch(new Of([], t))
            }

            runCanLoadGuards(t, e, n) {
                const r = e.canLoad;
                return r && 0 !== r.length ? ch(r.map(r => {
                    const s = t.get(r);
                    let i;
                    if (function (t) {
                        return t && Af(t.canLoad)
                    }(s)) i = s.canLoad(e, n); else {
                        if (!Af(s)) throw new Error("Invalid CanLoad guard");
                        i = s(e, n)
                    }
                    return xd(i)
                })).pipe(Pf(), Wh(t => {
                    if (!Rf(t)) return;
                    const e = yd(`Redirecting to "${this.urlSerializer.serialize(t)}"`);
                    throw e.url = t, e
                }), j(t => !0 === t)) : ch(!0)
            }

            lineralizeSegments(t, e) {
                let n = [], r = e.root;
                for (; ;) {
                    if (n = n.concat(r.segments), 0 === r.numberOfChildren) return ch(n);
                    if (r.numberOfChildren > 1 || !r.children.primary) return Yf(t.redirectTo);
                    r = r.children.primary
                }
            }

            applyRedirectCommands(t, e, n) {
                return this.applyRedirectCreatreUrlTree(e, this.urlSerializer.parse(e), t, n)
            }

            applyRedirectCreatreUrlTree(t, e, n, r) {
                const s = this.createSegmentGroup(t, e.root, n, r);
                return new Rd(s, this.createQueryParams(e.queryParams, this.urlTree.queryParams), e.fragment)
            }

            createQueryParams(t, e) {
                const n = {};
                return Sd(t, (t, r) => {
                    if ("string" == typeof t && t.startsWith(":")) {
                        const s = t.substring(1);
                        n[r] = e[s]
                    } else n[r] = t
                }), n
            }

            createSegmentGroup(t, e, n, r) {
                const s = this.createSegments(t, e.segments, n, r);
                let i = {};
                return Sd(e.children, (e, s) => {
                    i[s] = this.createSegmentGroup(t, e, n, r)
                }), new Ld(s, i)
            }

            createSegments(t, e, n, r) {
                return e.map(e => e.path.startsWith(":") ? this.findPosParam(t, e, r) : this.findOrReturn(e, n))
            }

            findPosParam(t, e, n) {
                const r = n[e.path.substring(1)];
                if (!r) throw new Error(`Cannot redirect to '${t}'. Cannot find '${e.path}'.`);
                return r
            }

            findOrReturn(t, e) {
                let n = 0;
                for (const r of e) {
                    if (r.path === t.path) return e.splice(n), r;
                    n++
                }
                return t
            }
        }

        function Xf(t) {
            const e = {};
            for (const n of Object.keys(t.children)) {
                const r = Xf(t.children[n]);
                (r.segments.length > 0 || r.hasChildren()) && (e[n] = r)
            }
            return function (t) {
                if (1 === t.numberOfChildren && t.children.primary) {
                    const e = t.children.primary;
                    return new Ld(t.segments.concat(e.segments), e.children)
                }
                return t
            }(new Ld(t.segments, e))
        }

        class tp {
            constructor(t) {
                this.path = t, this.route = this.path[this.path.length - 1]
            }
        }

        class ep {
            constructor(t, e) {
                this.component = t, this.route = e
            }
        }

        function np(t, e, n) {
            const r = t._root;
            return sp(r, e ? e._root : null, n, [r.value])
        }

        function rp(t, e, n) {
            const r = function (t) {
                if (!t) return null;
                for (let e = t.parent; e; e = e.parent) {
                    const t = e.routeConfig;
                    if (t && t._loadedConfig) return t._loadedConfig
                }
                return null
            }(e);
            return (r ? r.module.injector : n).get(t)
        }

        function sp(t, e, n, r, s = {canDeactivateChecks: [], canActivateChecks: []}) {
            const i = ef(e);
            return t.children.forEach(t => {
                !function (t, e, n, r, s = {canDeactivateChecks: [], canActivateChecks: []}) {
                    const i = t.value, o = e ? e.value : null, a = n ? n.getContext(t.value.outlet) : null;
                    if (o && i.routeConfig === o.routeConfig) {
                        const c = function (t, e, n) {
                            if ("function" == typeof n) return n(t, e);
                            switch (n) {
                                case"pathParamsChange":
                                    return !jd(t.url, e.url);
                                case"pathParamsOrQueryParamsChange":
                                    return !jd(t.url, e.url) || !bd(t.queryParams, e.queryParams);
                                case"always":
                                    return !0;
                                case"paramsOrQueryParamsChange":
                                    return !df(t, e) || !bd(t.queryParams, e.queryParams);
                                case"paramsChange":
                                default:
                                    return !df(t, e)
                            }
                        }(o, i, i.routeConfig.runGuardsAndResolvers);
                        c ? s.canActivateChecks.push(new tp(r)) : (i.data = o.data, i._resolvedData = o._resolvedData), sp(t, e, i.component ? a ? a.children : null : n, r, s), c && a && a.outlet && a.outlet.isActivated && s.canDeactivateChecks.push(new ep(a.outlet.component, o))
                    } else o && ip(e, a, s), s.canActivateChecks.push(new tp(r)), sp(t, null, i.component ? a ? a.children : null : n, r, s)
                }(t, i[t.value.outlet], n, r.concat([t.value]), s), delete i[t.value.outlet]
            }), Sd(i, (t, e) => ip(t, n.getContext(e), s)), s
        }

        function ip(t, e, n) {
            const r = ef(t), s = t.value;
            Sd(r, (t, r) => {
                ip(t, s.component ? e ? e.children.getContext(r) : null : e, n)
            }), n.canDeactivateChecks.push(new ep(s.component && e && e.outlet && e.outlet.isActivated ? e.outlet.component : null, s))
        }

        class op {
        }

        function ap(t) {
            return new v(e => e.error(t))
        }

        class cp {
            constructor(t, e, n, r, s, i) {
                this.rootComponentType = t, this.config = e, this.urlTree = n, this.url = r, this.paramsInheritanceStrategy = s, this.relativeLinkResolution = i
            }

            recognize() {
                const t = zf(this.urlTree.root, [], [], this.config.filter(t => void 0 === t.redirectTo), this.relativeLinkResolution).segmentGroup,
                    e = this.processSegmentGroup(this.config, t, pd);
                if (null === e) return null;
                const n = new af([], Object.freeze({}), Object.freeze(Object.assign({}, this.urlTree.queryParams)), this.urlTree.fragment, {}, pd, this.rootComponentType, null, this.urlTree.root, -1, {}),
                    r = new tf(n, e), s = new cf(this.url, r);
                return this.inheritParamsAndData(s._root), s
            }

            inheritParamsAndData(t) {
                const e = t.value, n = of(e, this.paramsInheritanceStrategy);
                e.params = Object.freeze(n.params), e.data = Object.freeze(n.data), t.children.forEach(t => this.inheritParamsAndData(t))
            }

            processSegmentGroup(t, e, n) {
                return 0 === e.segments.length && e.hasChildren() ? this.processChildren(t, e) : this.processSegment(t, e, e.segments, n)
            }

            processChildren(t, e) {
                const n = [];
                for (const s of Object.keys(e.children)) {
                    const r = e.children[s], i = Uf(t, s), o = this.processSegmentGroup(i, r, s);
                    if (null === o) return null;
                    n.push(...o)
                }
                const r = up(n);
                return r.sort((t, e) => t.value.outlet === pd ? -1 : e.value.outlet === pd ? 1 : t.value.outlet.localeCompare(e.value.outlet)), r
            }

            processSegment(t, e, n, r) {
                for (const s of t) {
                    const t = this.processSegmentAgainstRoute(s, e, n, r);
                    if (null !== t) return t
                }
                return Wf(e, n, r) ? [] : null
            }

            processSegmentAgainstRoute(t, e, n, r) {
                if (t.redirectTo || !Bf(t, e, n, r)) return null;
                let s, i = [], o = [];
                if ("**" === t.path) {
                    const r = n.length > 0 ? Cd(n).parameters : {};
                    s = new af(n, r, Object.freeze(Object.assign({}, this.urlTree.queryParams)), this.urlTree.fragment, fp(t), Ff(t), t.component, t, hp(e), dp(e) + n.length, pp(t))
                } else {
                    const r = Vf(e, t, n);
                    if (!r.matched) return null;
                    i = r.consumedSegments, o = n.slice(r.lastChild), s = new af(i, r.parameters, Object.freeze(Object.assign({}, this.urlTree.queryParams)), this.urlTree.fragment, fp(t), Ff(t), t.component, t, hp(e), dp(e) + i.length, pp(t))
                }
                const a = function (t) {
                    return t.children ? t.children : t.loadChildren ? t._loadedConfig.routes : []
                }(t), {
                    segmentGroup: c,
                    slicedSegments: l
                } = zf(e, i, o, a.filter(t => void 0 === t.redirectTo), this.relativeLinkResolution);
                if (0 === l.length && c.hasChildren()) {
                    const t = this.processChildren(a, c);
                    return null === t ? null : [new tf(s, t)]
                }
                if (0 === a.length && 0 === l.length) return [new tf(s, [])];
                const u = Ff(t) === r, h = this.processSegment(a, c, l, u ? pd : r);
                return null === h ? null : [new tf(s, h)]
            }
        }

        function lp(t) {
            const e = t.value.routeConfig;
            return e && "" === e.path && void 0 === e.redirectTo
        }

        function up(t) {
            const e = [], n = new Set;
            for (const r of t) {
                if (!lp(r)) {
                    e.push(r);
                    continue
                }
                const t = e.find(t => r.value.routeConfig === t.value.routeConfig);
                void 0 !== t ? (t.children.push(...r.children), n.add(t)) : e.push(r)
            }
            for (const r of n) {
                const t = up(r.children);
                e.push(new tf(r.value, t))
            }
            return e.filter(t => !n.has(t))
        }

        function hp(t) {
            let e = t;
            for (; e._sourceSegment;) e = e._sourceSegment;
            return e
        }

        function dp(t) {
            let e = t, n = e._segmentIndexShift ? e._segmentIndexShift : 0;
            for (; e._sourceSegment;) e = e._sourceSegment, n += e._segmentIndexShift ? e._segmentIndexShift : 0;
            return n - 1
        }

        function fp(t) {
            return t.data || {}
        }

        function pp(t) {
            return t.resolve || {}
        }

        function gp(t) {
            return vh(e => {
                const n = t(e);
                return n ? H(n).pipe(j(() => e)) : ch(e)
            })
        }

        class mp {
        }

        class yp extends class {
            shouldDetach(t) {
                return !1
            }

            store(t, e) {
            }

            shouldAttach(t) {
                return !1
            }

            retrieve(t) {
                return null
            }

            shouldReuseRoute(t, e) {
                return t.routeConfig === e.routeConfig
            }
        } {
        }

        const vp = new Bn("ROUTES");

        class bp {
            constructor(t, e, n, r) {
                this.loader = t, this.compiler = e, this.onLoadStartListener = n, this.onLoadEndListener = r
            }

            load(t, e) {
                if (e._loader$) return e._loader$;
                this.onLoadStartListener && this.onLoadStartListener(e);
                const n = this.loadModuleFactory(e.loadChildren).pipe(j(n => {
                    this.onLoadEndListener && this.onLoadEndListener(e);
                    const r = n.create(t);
                    return new Of(wd(r.injector.get(vp, void 0, bt.Self | bt.Optional)).map(Hf), r)
                }), Rh(t => {
                    throw e._loader$ = void 0, t
                }));
                return e._loader$ = new Z(n, () => new S).pipe(B()), e._loader$
            }

            loadModuleFactory(t) {
                return "string" == typeof t ? H(this.loader.load(t)) : xd(t()).pipe(F(t => t instanceof Ba ? ch(t) : H(this.compiler.compileModuleAsync(t))))
            }
        }

        class _p {
            constructor() {
                this.outlet = null, this.route = null, this.resolver = null, this.children = new wp, this.attachRef = null
            }
        }

        class wp {
            constructor() {
                this.contexts = new Map
            }

            onChildOutletCreated(t, e) {
                const n = this.getOrCreateContext(t);
                n.outlet = e, this.contexts.set(t, n)
            }

            onChildOutletDestroyed(t) {
                const e = this.getContext(t);
                e && (e.outlet = null)
            }

            onOutletDeactivated() {
                const t = this.contexts;
                return this.contexts = new Map, t
            }

            onOutletReAttached(t) {
                this.contexts = t
            }

            getOrCreateContext(t) {
                let e = this.getContext(t);
                return e || (e = new _p, this.contexts.set(t, e)), e
            }

            getContext(t) {
                return this.contexts.get(t) || null
            }
        }

        class Cp {
            shouldProcessUrl(t) {
                return !0
            }

            extract(t) {
                return t
            }

            merge(t, e) {
                return t
            }
        }

        function Sp(t) {
            throw t
        }

        function xp(t, e, n) {
            return e.parse("/")
        }

        function kp(t, e) {
            return ch(null)
        }

        const Tp = {paths: "exact", fragment: "ignored", matrixParams: "ignored", queryParams: "exact"},
            Ip = {paths: "subset", fragment: "ignored", matrixParams: "ignored", queryParams: "subset"};
        let Ep = (() => {
            class t {
                constructor(t, e, n, r, s, i, o, a) {
                    this.rootComponentType = t, this.urlSerializer = e, this.rootContexts = n, this.location = r, this.config = a, this.lastSuccessfulNavigation = null, this.currentNavigation = null, this.disposed = !1, this.lastLocationChangeInfo = null, this.navigationId = 0, this.currentPageId = 0, this.isNgZoneEnabled = !1, this.events = new S, this.errorHandler = Sp, this.malformedUriErrorHandler = xp, this.navigated = !1, this.lastSuccessfulId = -1, this.hooks = {
                        beforePreactivation: kp,
                        afterPreactivation: kp
                    }, this.urlHandlingStrategy = new Cp, this.routeReuseStrategy = new yp, this.onSameUrlNavigation = "ignore", this.paramsInheritanceStrategy = "emptyOnly", this.urlUpdateStrategy = "deferred", this.relativeLinkResolution = "corrected", this.canceledNavigationResolution = "replace", this.ngModule = s.get(qa), this.console = s.get(Gc);
                    const c = s.get(ol);
                    this.isNgZoneEnabled = c instanceof ol && ol.isInAngularZone(), this.resetConfig(a), this.currentUrlTree = new Rd(new Ld([], {}), {}, null), this.rawUrlTree = this.currentUrlTree, this.browserUrlTree = this.currentUrlTree, this.configLoader = new bp(i, o, t => this.triggerEvent(new ad(t)), t => this.triggerEvent(new cd(t))), this.routerState = rf(this.currentUrlTree, this.rootComponentType), this.transitions = new lh({
                        id: 0,
                        targetPageId: 0,
                        currentUrlTree: this.currentUrlTree,
                        currentRawUrl: this.currentUrlTree,
                        extractedUrl: this.urlHandlingStrategy.extract(this.currentUrlTree),
                        urlAfterRedirects: this.urlHandlingStrategy.extract(this.currentUrlTree),
                        rawUrl: this.currentUrlTree,
                        extras: {},
                        resolve: null,
                        reject: null,
                        promise: Promise.resolve(!0),
                        source: "imperative",
                        restoredState: null,
                        currentSnapshot: this.routerState.snapshot,
                        targetSnapshot: null,
                        currentRouterState: this.routerState,
                        targetRouterState: null,
                        guards: {canActivateChecks: [], canDeactivateChecks: []},
                        guardsResult: null
                    }), this.navigations = this.setupNavigations(this.transitions), this.processNavigations()
                }

                setupNavigations(t) {
                    const e = this.events;
                    return t.pipe(Eh(t => 0 !== t.id), j(t => Object.assign(Object.assign({}, t), {extractedUrl: this.urlHandlingStrategy.extract(t.rawUrl)})), vh(t => {
                        let n = !1, r = !1;
                        return ch(t).pipe(Wh(t => {
                            this.currentNavigation = {
                                id: t.id,
                                initialUrl: t.currentRawUrl,
                                extractedUrl: t.extractedUrl,
                                trigger: t.source,
                                extras: t.extras,
                                previousNavigation: this.lastSuccessfulNavigation ? Object.assign(Object.assign({}, this.lastSuccessfulNavigation), {previousNavigation: null}) : null
                            }
                        }), vh(t => {
                            const n = !this.navigated || t.extractedUrl.toString() !== this.browserUrlTree.toString();
                            if (("reload" === this.onSameUrlNavigation || n) && this.urlHandlingStrategy.shouldProcessUrl(t.rawUrl)) return ch(t).pipe(vh(t => {
                                const n = this.transitions.getValue();
                                return e.next(new Jh(t.id, this.serializeUrl(t.extractedUrl), t.source, t.restoredState)), n !== this.transitions.getValue() ? gh : Promise.resolve(t)
                            }), function (t, e, n, r) {
                                return vh(s => function (t, e, n, r, s) {
                                    return new Jf(t, e, n, r, s).apply()
                                }(t, e, n, s.extractedUrl, r).pipe(j(t => Object.assign(Object.assign({}, s), {urlAfterRedirects: t}))))
                            }(this.ngModule.injector, this.configLoader, this.urlSerializer, this.config), Wh(t => {
                                this.currentNavigation = Object.assign(Object.assign({}, this.currentNavigation), {finalUrl: t.urlAfterRedirects})
                            }), function (t, e, n, r, s) {
                                return F(i => function (t, e, n, r, s = "emptyOnly", i = "legacy") {
                                    try {
                                        const o = new cp(t, e, n, r, s, i).recognize();
                                        return null === o ? ap(new op) : ch(o)
                                    } catch (o) {
                                        return ap(o)
                                    }
                                }(t, e, i.urlAfterRedirects, n(i.urlAfterRedirects), r, s).pipe(j(t => Object.assign(Object.assign({}, i), {targetSnapshot: t}))))
                            }(this.rootComponentType, this.config, t => this.serializeUrl(t), this.paramsInheritanceStrategy, this.relativeLinkResolution), Wh(t => {
                                "eager" === this.urlUpdateStrategy && (t.extras.skipLocationChange || this.setBrowserUrl(t.urlAfterRedirects, t), this.browserUrlTree = t.urlAfterRedirects);
                                const n = new nd(t.id, this.serializeUrl(t.extractedUrl), this.serializeUrl(t.urlAfterRedirects), t.targetSnapshot);
                                e.next(n)
                            }));
                            if (n && this.rawUrlTree && this.urlHandlingStrategy.shouldProcessUrl(this.rawUrlTree)) {
                                const {id: n, extractedUrl: r, source: s, restoredState: i, extras: o} = t,
                                    a = new Jh(n, this.serializeUrl(r), s, i);
                                e.next(a);
                                const c = rf(r, this.rootComponentType).snapshot;
                                return ch(Object.assign(Object.assign({}, t), {
                                    targetSnapshot: c,
                                    urlAfterRedirects: r,
                                    extras: Object.assign(Object.assign({}, o), {
                                        skipLocationChange: !1,
                                        replaceUrl: !1
                                    })
                                }))
                            }
                            return this.rawUrlTree = t.rawUrl, this.browserUrlTree = t.urlAfterRedirects, t.resolve(null), gh
                        }), gp(t => {
                            const {
                                targetSnapshot: e,
                                id: n,
                                extractedUrl: r,
                                rawUrl: s,
                                extras: {skipLocationChange: i, replaceUrl: o}
                            } = t;
                            return this.hooks.beforePreactivation(e, {
                                navigationId: n,
                                appliedUrlTree: r,
                                rawUrlTree: s,
                                skipLocationChange: !!i,
                                replaceUrl: !!o
                            })
                        }), Wh(t => {
                            const e = new rd(t.id, this.serializeUrl(t.extractedUrl), this.serializeUrl(t.urlAfterRedirects), t.targetSnapshot);
                            this.triggerEvent(e)
                        }), j(t => Object.assign(Object.assign({}, t), {guards: np(t.targetSnapshot, t.currentSnapshot, this.rootContexts)})), function (t, e) {
                            return F(n => {
                                const {
                                    targetSnapshot: r,
                                    currentSnapshot: s,
                                    guards: {canActivateChecks: i, canDeactivateChecks: o}
                                } = n;
                                return 0 === o.length && 0 === i.length ? ch(Object.assign(Object.assign({}, n), {guardsResult: !0})) : function (t, e, n, r) {
                                    return H(t).pipe(F(t => function (t, e, n, r, s) {
                                        const i = e && e.routeConfig ? e.routeConfig.canDeactivate : null;
                                        return i && 0 !== i.length ? ch(i.map(i => {
                                            const o = rp(i, e, s);
                                            let a;
                                            if (function (t) {
                                                return t && Af(t.canDeactivate)
                                            }(o)) a = xd(o.canDeactivate(t, e, n, r)); else {
                                                if (!Af(o)) throw new Error("Invalid CanDeactivate guard");
                                                a = xd(o(t, e, n, r))
                                            }
                                            return a.pipe(Bh())
                                        })).pipe(Pf()) : ch(!0)
                                    }(t.component, t.route, n, e, r)), Bh(t => !0 !== t, !0))
                                }(o, r, s, t).pipe(F(n => n && "boolean" == typeof n ? function (t, e, n, r) {
                                    return H(e).pipe(jh(e => ph(function (t, e) {
                                        return null !== t && e && e(new ld(t)), ch(!0)
                                    }(e.route.parent, r), function (t, e) {
                                        return null !== t && e && e(new hd(t)), ch(!0)
                                    }(e.route, r), function (t, e, n) {
                                        const r = e[e.length - 1],
                                            s = e.slice(0, e.length - 1).reverse().map(t => function (t) {
                                                const e = t.routeConfig ? t.routeConfig.canActivateChild : null;
                                                return e && 0 !== e.length ? {node: t, guards: e} : null
                                            }(t)).filter(t => null !== t).map(e => yh(() => ch(e.guards.map(s => {
                                                const i = rp(s, e.node, n);
                                                let o;
                                                if (function (t) {
                                                    return t && Af(t.canActivateChild)
                                                }(i)) o = xd(i.canActivateChild(r, t)); else {
                                                    if (!Af(i)) throw new Error("Invalid CanActivateChild guard");
                                                    o = xd(i(r, t))
                                                }
                                                return o.pipe(Bh())
                                            })).pipe(Pf())));
                                        return ch(s).pipe(Pf())
                                    }(t, e.path, n), function (t, e, n) {
                                        const r = e.routeConfig ? e.routeConfig.canActivate : null;
                                        return r && 0 !== r.length ? ch(r.map(r => yh(() => {
                                            const s = rp(r, e, n);
                                            let i;
                                            if (function (t) {
                                                return t && Af(t.canActivate)
                                            }(s)) i = xd(s.canActivate(e, t)); else {
                                                if (!Af(s)) throw new Error("Invalid CanActivate guard");
                                                i = xd(s(e, t))
                                            }
                                            return i.pipe(Bh())
                                        }))).pipe(Pf()) : ch(!0)
                                    }(t, e.route, n))), Bh(t => !0 !== t, !0))
                                }(r, i, t, e) : ch(n)), j(t => Object.assign(Object.assign({}, n), {guardsResult: t})))
                            })
                        }(this.ngModule.injector, t => this.triggerEvent(t)), Wh(t => {
                            if (Rf(t.guardsResult)) {
                                const e = yd(`Redirecting to "${this.serializeUrl(t.guardsResult)}"`);
                                throw e.url = t.guardsResult, e
                            }
                            const e = new sd(t.id, this.serializeUrl(t.extractedUrl), this.serializeUrl(t.urlAfterRedirects), t.targetSnapshot, !!t.guardsResult);
                            this.triggerEvent(e)
                        }), Eh(t => !!t.guardsResult || (this.cancelNavigationTransition(t, ""), !1)), gp(t => {
                            if (t.guards.canActivateChecks.length) return ch(t).pipe(Wh(t => {
                                const e = new id(t.id, this.serializeUrl(t.extractedUrl), this.serializeUrl(t.urlAfterRedirects), t.targetSnapshot);
                                this.triggerEvent(e)
                            }), vh(t => {
                                let e = !1;
                                return ch(t).pipe((n = this.paramsInheritanceStrategy, r = this.ngModule.injector, F(t => {
                                    const {targetSnapshot: e, guards: {canActivateChecks: s}} = t;
                                    if (!s.length) return ch(t);
                                    let i = 0;
                                    return H(s).pipe(jh(t => function (t, e, n, r) {
                                        return function (t, e, n, r) {
                                            const s = Object.keys(t);
                                            if (0 === s.length) return ch({});
                                            const i = {};
                                            return H(s).pipe(F(s => function (t, e, n, r) {
                                                const s = rp(t, e, r);
                                                return xd(s.resolve ? s.resolve(e, n) : s(e, n))
                                            }(t[s], e, n, r).pipe(Wh(t => {
                                                i[s] = t
                                            }))), Dh(1), F(() => Object.keys(i).length === s.length ? ch(i) : gh))
                                        }(t._resolve, t, e, r).pipe(j(e => (t._resolvedData = e, t.data = Object.assign(Object.assign({}, t.data), of(t, n).resolve), null)))
                                    }(t.route, e, n, r)), Wh(() => i++), Dh(1), F(e => i === s.length ? ch(t) : gh))
                                })), Wh({
                                    next: () => e = !0, complete: () => {
                                        e || this.cancelNavigationTransition(t, "At least one route resolver didn't emit any value.")
                                    }
                                }));
                                var n, r
                            }), Wh(t => {
                                const e = new od(t.id, this.serializeUrl(t.extractedUrl), this.serializeUrl(t.urlAfterRedirects), t.targetSnapshot);
                                this.triggerEvent(e)
                            }))
                        }), gp(t => {
                            const {
                                targetSnapshot: e,
                                id: n,
                                extractedUrl: r,
                                rawUrl: s,
                                extras: {skipLocationChange: i, replaceUrl: o}
                            } = t;
                            return this.hooks.afterPreactivation(e, {
                                navigationId: n,
                                appliedUrlTree: r,
                                rawUrlTree: s,
                                skipLocationChange: !!i,
                                replaceUrl: !!o
                            })
                        }), j(t => {
                            const e = function (t, e, n) {
                                const r = ff(t, e._root, n ? n._root : void 0);
                                return new nf(r, e)
                            }(this.routeReuseStrategy, t.targetSnapshot, t.currentRouterState);
                            return Object.assign(Object.assign({}, t), {targetRouterState: e})
                        }), Wh(t => {
                            this.currentUrlTree = t.urlAfterRedirects, this.rawUrlTree = this.urlHandlingStrategy.merge(this.currentUrlTree, t.rawUrl), this.routerState = t.targetRouterState, "deferred" === this.urlUpdateStrategy && (t.extras.skipLocationChange || this.setBrowserUrl(this.rawUrlTree, t), this.browserUrlTree = t.urlAfterRedirects)
                        }), (i = this.rootContexts, o = this.routeReuseStrategy, a = t => this.triggerEvent(t), j(t => (new If(o, t.targetRouterState, t.currentRouterState, a).activate(i), t))), Wh({
                            next() {
                                n = !0
                            }, complete() {
                                n = !0
                            }
                        }), (s = () => {
                            n || r || this.cancelNavigationTransition(t, `Navigation ID ${t.id} is not equal to the current navigation id ${this.navigationId}`), this.currentNavigation = null
                        }, t => t.lift(new Qh(s))), Rh(n => {
                            if (r = !0, (s = n) && s.ngNavigationCancelingError) {
                                const r = Rf(n.url);
                                r || (this.navigated = !0, this.resetStateAndUrl(t.currentRouterState, t.currentUrlTree, t.rawUrl));
                                const s = new td(t.id, this.serializeUrl(t.extractedUrl), n.message);
                                e.next(s), r ? setTimeout(() => {
                                    const e = this.urlHandlingStrategy.merge(n.url, this.rawUrlTree);
                                    this.scheduleNavigation(e, "imperative", null, {
                                        skipLocationChange: t.extras.skipLocationChange,
                                        replaceUrl: "eager" === this.urlUpdateStrategy
                                    }, {resolve: t.resolve, reject: t.reject, promise: t.promise})
                                }, 0) : t.resolve(!1)
                            } else {
                                this.resetStateAndUrl(t.currentRouterState, t.currentUrlTree, t.rawUrl);
                                const r = new ed(t.id, this.serializeUrl(t.extractedUrl), n);
                                e.next(r);
                                try {
                                    t.resolve(this.errorHandler(n))
                                } catch (i) {
                                    t.reject(i)
                                }
                            }
                            var s;
                            return gh
                        }));
                        var s, i, o, a
                    }))
                }

                resetRootComponentType(t) {
                    this.rootComponentType = t, this.routerState.root.component = this.rootComponentType
                }

                getTransition() {
                    const t = this.transitions.value;
                    return t.urlAfterRedirects = this.browserUrlTree, t
                }

                setTransition(t) {
                    this.transitions.next(Object.assign(Object.assign({}, this.getTransition()), t))
                }

                initialNavigation() {
                    this.setUpLocationChangeListener(), 0 === this.navigationId && this.navigateByUrl(this.location.path(!0), {replaceUrl: !0})
                }

                setUpLocationChangeListener() {
                    this.locationSubscription || (this.locationSubscription = this.location.subscribe(t => {
                        const e = this.extractLocationChangeInfoFromEvent(t);
                        this.shouldScheduleNavigation(this.lastLocationChangeInfo, e) && setTimeout(() => {
                            const {source: t, state: n, urlTree: r} = e, s = {replaceUrl: !0};
                            if (n) {
                                const t = Object.assign({}, n);
                                delete t.navigationId, delete t.\u0275routerPageId, 0 !== Object.keys(t).length && (s.state = t)
                            }
                            this.scheduleNavigation(r, t, n, s)
                        }, 0), this.lastLocationChangeInfo = e
                    }))
                }

                extractLocationChangeInfoFromEvent(t) {
                    var e;
                    return {
                        source: "popstate" === t.type ? "popstate" : "hashchange",
                        urlTree: this.parseUrl(t.url),
                        state: (null === (e = t.state) || void 0 === e ? void 0 : e.navigationId) ? t.state : null,
                        transitionId: this.getTransition().id
                    }
                }

                shouldScheduleNavigation(t, e) {
                    if (!t) return !0;
                    const n = e.urlTree.toString() === t.urlTree.toString();
                    return !(e.transitionId === t.transitionId && n && ("hashchange" === e.source && "popstate" === t.source || "popstate" === e.source && "hashchange" === t.source))
                }

                get url() {
                    return this.serializeUrl(this.currentUrlTree)
                }

                getCurrentNavigation() {
                    return this.currentNavigation
                }

                triggerEvent(t) {
                    this.events.next(t)
                }

                resetConfig(t) {
                    Df(t), this.config = t.map(Hf), this.navigated = !1, this.lastSuccessfulId = -1
                }

                ngOnDestroy() {
                    this.dispose()
                }

                dispose() {
                    this.transitions.complete(), this.locationSubscription && (this.locationSubscription.unsubscribe(), this.locationSubscription = void 0), this.disposed = !0
                }

                createUrlTree(t, e = {}) {
                    const {relativeTo: n, queryParams: r, fragment: s, queryParamsHandling: i, preserveFragment: o} = e,
                        a = n || this.routerState.root, c = o ? this.currentUrlTree.fragment : s;
                    let l = null;
                    switch (i) {
                        case"merge":
                            l = Object.assign(Object.assign({}, this.currentUrlTree.queryParams), r);
                            break;
                        case"preserve":
                            l = this.currentUrlTree.queryParams;
                            break;
                        default:
                            l = r || null
                    }
                    return null !== l && (l = this.removeEmptyProps(l)), function (t, e, n, r, s) {
                        if (0 === n.length) return yf(e.root, e.root, e, r, s);
                        const i = function (t) {
                            if ("string" == typeof t[0] && 1 === t.length && "/" === t[0]) return new bf(!0, 0, t);
                            let e = 0, n = !1;
                            const r = t.reduce((t, r, s) => {
                                if ("object" == typeof r && null != r) {
                                    if (r.outlets) {
                                        const e = {};
                                        return Sd(r.outlets, (t, n) => {
                                            e[n] = "string" == typeof t ? t.split("/") : t
                                        }), [...t, {outlets: e}]
                                    }
                                    if (r.segmentPath) return [...t, r.segmentPath]
                                }
                                return "string" != typeof r ? [...t, r] : 0 === s ? (r.split("/").forEach((r, s) => {
                                    0 == s && "." === r || (0 == s && "" === r ? n = !0 : ".." === r ? e++ : "" != r && t.push(r))
                                }), t) : [...t, r]
                            }, []);
                            return new bf(n, e, r)
                        }(n);
                        if (i.toRoot()) return yf(e.root, new Ld([], {}), e, r, s);
                        const o = function (t, e, n) {
                                if (t.isAbsolute) return new _f(e.root, !0, 0);
                                if (-1 === n.snapshot._lastPathIndex) {
                                    const t = n.snapshot._urlSegment;
                                    return new _f(t, t === e.root, 0)
                                }
                                const r = gf(t.commands[0]) ? 0 : 1;
                                return function (t, e, n) {
                                    let r = t, s = e, i = n;
                                    for (; i > s;) {
                                        if (i -= s, r = r.parent, !r) throw new Error("Invalid number of '../'");
                                        s = r.segments.length
                                    }
                                    return new _f(r, !1, s - i)
                                }(n.snapshot._urlSegment, n.snapshot._lastPathIndex + r, t.numberOfDoubleDots)
                            }(i, e, t),
                            a = o.processChildren ? Cf(o.segmentGroup, o.index, i.commands) : wf(o.segmentGroup, o.index, i.commands);
                        return yf(o.segmentGroup, a, e, r, s)
                    }(a, this.currentUrlTree, t, l, null != c ? c : null)
                }

                navigateByUrl(t, e = {skipLocationChange: !1}) {
                    const n = Rf(t) ? t : this.parseUrl(t), r = this.urlHandlingStrategy.merge(n, this.rawUrlTree);
                    let s = null;
                    return "computed" === this.canceledNavigationResolution && (0 === this.currentPageId || e.skipLocationChange || e.replaceUrl) && (s = this.location.getState()), this.scheduleNavigation(r, "imperative", s, e)
                }

                navigate(t, e = {skipLocationChange: !1}) {
                    return function (t) {
                        for (let e = 0; e < t.length; e++) {
                            const n = t[e];
                            if (null == n) throw new Error(`The requested path contains ${n} segment at index ${e}`)
                        }
                    }(t), this.navigateByUrl(this.createUrlTree(t, e), e)
                }

                serializeUrl(t) {
                    return this.urlSerializer.serialize(t)
                }

                parseUrl(t) {
                    let e;
                    try {
                        e = this.urlSerializer.parse(t)
                    } catch (n) {
                        e = this.malformedUriErrorHandler(n, this.urlSerializer, t)
                    }
                    return e
                }

                isActive(t, e) {
                    let n;
                    if (n = !0 === e ? Object.assign({}, Tp) : !1 === e ? Object.assign({}, Ip) : e, Rf(t)) return Id(this.currentUrlTree, t, n);
                    const r = this.parseUrl(t);
                    return Id(this.currentUrlTree, r, n)
                }

                removeEmptyProps(t) {
                    return Object.keys(t).reduce((e, n) => {
                        const r = t[n];
                        return null != r && (e[n] = r), e
                    }, {})
                }

                processNavigations() {
                    this.navigations.subscribe(t => {
                        this.navigated = !0, this.lastSuccessfulId = t.id, this.currentPageId = t.targetPageId, this.events.next(new Xh(t.id, this.serializeUrl(t.extractedUrl), this.serializeUrl(this.currentUrlTree))), this.lastSuccessfulNavigation = this.currentNavigation, t.resolve(!0)
                    }, t => {
                        this.console.warn("Unhandled Navigation Error: ")
                    })
                }

                scheduleNavigation(t, e, n, r, s) {
                    if (this.disposed) return Promise.resolve(!1);
                    const i = this.getTransition(),
                        o = "imperative" !== e && "imperative" === (null == i ? void 0 : i.source),
                        a = (this.lastSuccessfulId === i.id || this.currentNavigation ? i.rawUrl : i.urlAfterRedirects).toString() === t.toString();
                    if (o && a) return Promise.resolve(!0);
                    let c, l, u;
                    s ? (c = s.resolve, l = s.reject, u = s.promise) : u = new Promise((t, e) => {
                        c = t, l = e
                    });
                    const h = ++this.navigationId;
                    let d;
                    return d = "computed" === this.canceledNavigationResolution ? n && n.\u0275routerPageId ? n.\u0275routerPageId : this.currentPageId + 1 : 0, this.setTransition({
                        id: h,
                        targetPageId: d,
                        source: e,
                        restoredState: n,
                        currentUrlTree: this.currentUrlTree,
                        currentRawUrl: this.rawUrlTree,
                        rawUrl: t,
                        extras: r,
                        resolve: c,
                        reject: l,
                        promise: u,
                        currentSnapshot: this.routerState.snapshot,
                        currentRouterState: this.routerState
                    }), u.catch(t => Promise.reject(t))
                }

                setBrowserUrl(t, e) {
                    const n = this.urlSerializer.serialize(t),
                        r = Object.assign(Object.assign({}, e.extras.state), this.generateNgRouterState(e.id, e.targetPageId));
                    this.location.isCurrentPathEqualTo(n) || e.extras.replaceUrl ? this.location.replaceState(n, "", r) : this.location.go(n, "", r)
                }

                resetStateAndUrl(t, e, n) {
                    this.routerState = t, this.currentUrlTree = e, this.rawUrlTree = this.urlHandlingStrategy.merge(this.currentUrlTree, n), this.resetUrlToCurrentUrlTree()
                }

                resetUrlToCurrentUrlTree() {
                    this.location.replaceState(this.urlSerializer.serialize(this.rawUrlTree), "", this.generateNgRouterState(this.lastSuccessfulId, this.currentPageId))
                }

                cancelNavigationTransition(t, e) {
                    "computed" === this.canceledNavigationResolution ? "popstate" !== t.source && "eager" !== this.urlUpdateStrategy || this.location.historyGo(this.currentPageId - t.targetPageId) : this.resetUrlToCurrentUrlTree();
                    const n = new td(t.id, this.serializeUrl(t.extractedUrl), e);
                    this.triggerEvent(n), t.resolve(!1)
                }

                generateNgRouterState(t, e) {
                    return "computed" === this.canceledNavigationResolution ? {
                        navigationId: t,
                        "\u0275routerPageId": e
                    } : {navigationId: t}
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(cr(Gn), cr(Dd), cr(wp), cr(Xl), cr(eo), cr(El), cr(rl), cr(void 0))
            }, t.\u0275prov = ut({token: t, factory: t.\u0275fac}), t
        })(), Op = (() => {
            class t {
                constructor(t, e, n, r, s) {
                    this.router = t, this.route = e, this.commands = [], this.onChanges = new S, null == n && r.setAttribute(s.nativeElement, "tabindex", "0")
                }

                ngOnChanges(t) {
                    this.onChanges.next(this)
                }

                set routerLink(t) {
                    this.commands = null != t ? Array.isArray(t) ? t : [t] : []
                }

                onClick() {
                    const t = {
                        skipLocationChange: Rp(this.skipLocationChange),
                        replaceUrl: Rp(this.replaceUrl),
                        state: this.state
                    };
                    return this.router.navigateByUrl(this.urlTree, t), !0
                }

                get urlTree() {
                    return this.router.createUrlTree(this.commands, {
                        relativeTo: void 0 !== this.relativeTo ? this.relativeTo : this.route,
                        queryParams: this.queryParams,
                        fragment: this.fragment,
                        queryParamsHandling: this.queryParamsHandling,
                        preserveFragment: Rp(this.preserveFragment)
                    })
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(_o(Ep), _o(sf), Vn("tabindex"), _o(da), _o(la))
            }, t.\u0275dir = Gt({
                type: t,
                selectors: [["", "routerLink", "", 5, "a", 5, "area"]],
                hostBindings: function (t, e) {
                    1 & t && Lo("click", function () {
                        return e.onClick()
                    })
                },
                inputs: {
                    routerLink: "routerLink",
                    queryParams: "queryParams",
                    fragment: "fragment",
                    queryParamsHandling: "queryParamsHandling",
                    preserveFragment: "preserveFragment",
                    skipLocationChange: "skipLocationChange",
                    replaceUrl: "replaceUrl",
                    state: "state",
                    relativeTo: "relativeTo"
                },
                features: [ae]
            }), t
        })(), Ap = (() => {
            class t {
                constructor(t, e, n) {
                    this.router = t, this.route = e, this.locationStrategy = n, this.commands = [], this.onChanges = new S, this.subscription = t.events.subscribe(t => {
                        t instanceof Xh && this.updateTargetUrlAndHref()
                    })
                }

                set routerLink(t) {
                    this.commands = null != t ? Array.isArray(t) ? t : [t] : []
                }

                ngOnChanges(t) {
                    this.updateTargetUrlAndHref(), this.onChanges.next(this)
                }

                ngOnDestroy() {
                    this.subscription.unsubscribe()
                }

                onClick(t, e, n, r, s) {
                    if (0 !== t || e || n || r || s) return !0;
                    if ("string" == typeof this.target && "_self" != this.target) return !0;
                    const i = {
                        skipLocationChange: Rp(this.skipLocationChange),
                        replaceUrl: Rp(this.replaceUrl),
                        state: this.state
                    };
                    return this.router.navigateByUrl(this.urlTree, i), !1
                }

                updateTargetUrlAndHref() {
                    this.href = this.locationStrategy.prepareExternalUrl(this.router.serializeUrl(this.urlTree))
                }

                get urlTree() {
                    return this.router.createUrlTree(this.commands, {
                        relativeTo: void 0 !== this.relativeTo ? this.relativeTo : this.route,
                        queryParams: this.queryParams,
                        fragment: this.fragment,
                        queryParamsHandling: this.queryParamsHandling,
                        preserveFragment: Rp(this.preserveFragment)
                    })
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(_o(Ep), _o(sf), _o(Zl))
            }, t.\u0275dir = Gt({
                type: t,
                selectors: [["a", "routerLink", ""], ["area", "routerLink", ""]],
                hostVars: 2,
                hostBindings: function (t, e) {
                    1 & t && Lo("click", function (t) {
                        return e.onClick(t.button, t.ctrlKey, t.shiftKey, t.altKey, t.metaKey)
                    }), 2 & t && (Zo("href", e.href, Jr), yo("target", e.target))
                },
                inputs: {
                    routerLink: "routerLink",
                    target: "target",
                    queryParams: "queryParams",
                    fragment: "fragment",
                    queryParamsHandling: "queryParamsHandling",
                    preserveFragment: "preserveFragment",
                    skipLocationChange: "skipLocationChange",
                    replaceUrl: "replaceUrl",
                    state: "state",
                    relativeTo: "relativeTo"
                },
                features: [ae]
            }), t
        })();

        function Rp(t) {
            return "" === t || !!t
        }

        let Lp = (() => {
            class t {
                constructor(t, e, n, r, s, i) {
                    this.router = t, this.element = e, this.renderer = n, this.cdr = r, this.link = s, this.linkWithHref = i, this.classes = [], this.isActive = !1, this.routerLinkActiveOptions = {exact: !1}, this.routerEventsSubscription = t.events.subscribe(t => {
                        t instanceof Xh && this.update()
                    })
                }

                ngAfterContentInit() {
                    ch(this.links.changes, this.linksWithHrefs.changes, ch(null)).pipe(z()).subscribe(t => {
                        this.update(), this.subscribeToEachLinkOnChanges()
                    })
                }

                subscribeToEachLinkOnChanges() {
                    var t;
                    null === (t = this.linkInputChangesSubscription) || void 0 === t || t.unsubscribe();
                    const e = [...this.links.toArray(), ...this.linksWithHrefs.toArray(), this.link, this.linkWithHref].filter(t => !!t).map(t => t.onChanges);
                    this.linkInputChangesSubscription = H(e).pipe(z()).subscribe(t => {
                        this.isActive !== this.isLinkActive(this.router)(t) && this.update()
                    })
                }

                set routerLinkActive(t) {
                    const e = Array.isArray(t) ? t : t.split(" ");
                    this.classes = e.filter(t => !!t)
                }

                ngOnChanges(t) {
                    this.update()
                }

                ngOnDestroy() {
                    var t;
                    this.routerEventsSubscription.unsubscribe(), null === (t = this.linkInputChangesSubscription) || void 0 === t || t.unsubscribe()
                }

                update() {
                    this.links && this.linksWithHrefs && this.router.navigated && Promise.resolve().then(() => {
                        const t = this.hasActiveLinks();
                        this.isActive !== t && (this.isActive = t, this.cdr.markForCheck(), this.classes.forEach(e => {
                            t ? this.renderer.addClass(this.element.nativeElement, e) : this.renderer.removeClass(this.element.nativeElement, e)
                        }))
                    })
                }

                isLinkActive(t) {
                    const e = "paths" in this.routerLinkActiveOptions ? this.routerLinkActiveOptions : this.routerLinkActiveOptions.exact || !1;
                    return n => t.isActive(n.urlTree, e)
                }

                hasActiveLinks() {
                    const t = this.isLinkActive(this.router);
                    return this.link && t(this.link) || this.linkWithHref && t(this.linkWithHref) || this.links.some(t) || this.linksWithHrefs.some(t)
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(_o(Ep), _o(la), _o(da), _o(Da), _o(Op, 8), _o(Ap, 8))
            }, t.\u0275dir = Gt({
                type: t,
                selectors: [["", "routerLinkActive", ""]],
                contentQueries: function (t, e, n) {
                    if (1 & t && (jc(n, Op, 5), jc(n, Ap, 5)), 2 & t) {
                        let t;
                        Lc(t = Dc()) && (e.links = t), Lc(t = Dc()) && (e.linksWithHrefs = t)
                    }
                },
                inputs: {routerLinkActiveOptions: "routerLinkActiveOptions", routerLinkActive: "routerLinkActive"},
                exportAs: ["routerLinkActive"],
                features: [ae]
            }), t
        })(), Pp = (() => {
            class t {
                constructor(t, e, n, r, s) {
                    this.parentContexts = t, this.location = e, this.resolver = n, this.changeDetector = s, this.activated = null, this._activatedRoute = null, this.activateEvents = new _c, this.deactivateEvents = new _c, this.name = r || pd, t.onChildOutletCreated(this.name, this)
                }

                ngOnDestroy() {
                    this.parentContexts.onChildOutletDestroyed(this.name)
                }

                ngOnInit() {
                    if (!this.activated) {
                        const t = this.parentContexts.getContext(this.name);
                        t && t.route && (t.attachRef ? this.attach(t.attachRef, t.route) : this.activateWith(t.route, t.resolver || null))
                    }
                }

                get isActivated() {
                    return !!this.activated
                }

                get component() {
                    if (!this.activated) throw new Error("Outlet is not activated");
                    return this.activated.instance
                }

                get activatedRoute() {
                    if (!this.activated) throw new Error("Outlet is not activated");
                    return this._activatedRoute
                }

                get activatedRouteData() {
                    return this._activatedRoute ? this._activatedRoute.snapshot.data : {}
                }

                detach() {
                    if (!this.activated) throw new Error("Outlet is not activated");
                    this.location.detach();
                    const t = this.activated;
                    return this.activated = null, this._activatedRoute = null, t
                }

                attach(t, e) {
                    this.activated = t, this._activatedRoute = e, this.location.insert(t.hostView)
                }

                deactivate() {
                    if (this.activated) {
                        const t = this.component;
                        this.activated.destroy(), this.activated = null, this._activatedRoute = null, this.deactivateEvents.emit(t)
                    }
                }

                activateWith(t, e) {
                    if (this.isActivated) throw new Error("Cannot activate an already activated outlet");
                    this._activatedRoute = t;
                    const n = (e = e || this.resolver).resolveComponentFactory(t._futureSnapshot.routeConfig.component),
                        r = this.parentContexts.getOrCreateContext(this.name).children,
                        s = new jp(t, r, this.location.injector);
                    this.activated = this.location.createComponent(n, this.location.length, s), this.changeDetector.markForCheck(), this.activateEvents.emit(this.activated.instance)
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(_o(wp), _o(Ga), _o(ia), Vn("name"), _o(Da))
            }, t.\u0275dir = Gt({
                type: t,
                selectors: [["router-outlet"]],
                outputs: {activateEvents: "activate", deactivateEvents: "deactivate"},
                exportAs: ["outlet"]
            }), t
        })();

        class jp {
            constructor(t, e, n) {
                this.route = t, this.childContexts = e, this.parent = n
            }

            get(t, e) {
                return t === sf ? this.route : t === wp ? this.childContexts : this.parent.get(t, e)
            }
        }

        class Dp {
        }

        class Mp {
            preload(t, e) {
                return ch(null)
            }
        }

        let Np = (() => {
            class t {
                constructor(t, e, n, r, s) {
                    this.router = t, this.injector = r, this.preloadingStrategy = s, this.loader = new bp(e, n, e => t.triggerEvent(new ad(e)), e => t.triggerEvent(new cd(e)))
                }

                setUpPreloading() {
                    this.subscription = this.router.events.pipe(Eh(t => t instanceof Xh), jh(() => this.preload())).subscribe(() => {
                    })
                }

                preload() {
                    const t = this.injector.get(qa);
                    return this.processRoutes(t, this.router.config)
                }

                ngOnDestroy() {
                    this.subscription && this.subscription.unsubscribe()
                }

                processRoutes(t, e) {
                    const n = [];
                    for (const r of e) if (r.loadChildren && !r.canLoad && r._loadedConfig) {
                        const t = r._loadedConfig;
                        n.push(this.processRoutes(t.module, t.routes))
                    } else r.loadChildren && !r.canLoad ? n.push(this.preloadConfig(t, r)) : r.children && n.push(this.processRoutes(t, r.children));
                    return H(n).pipe(z(), j(t => {
                    }))
                }

                preloadConfig(t, e) {
                    return this.preloadingStrategy.preload(e, () => (e._loadedConfig ? ch(e._loadedConfig) : this.loader.load(t.injector, e)).pipe(F(t => (e._loadedConfig = t, this.processRoutes(t.module, t.routes)))))
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(cr(Ep), cr(El), cr(rl), cr(eo), cr(Dp))
            }, t.\u0275prov = ut({token: t, factory: t.\u0275fac}), t
        })(), Hp = (() => {
            class t {
                constructor(t, e, n = {}) {
                    this.router = t, this.viewportScroller = e, this.options = n, this.lastId = 0, this.lastSource = "imperative", this.restoredId = 0, this.store = {}, n.scrollPositionRestoration = n.scrollPositionRestoration || "disabled", n.anchorScrolling = n.anchorScrolling || "disabled"
                }

                init() {
                    "disabled" !== this.options.scrollPositionRestoration && this.viewportScroller.setHistoryScrollRestoration("manual"), this.routerEventsSubscription = this.createScrollEvents(), this.scrollEventsSubscription = this.consumeScrollEvents()
                }

                createScrollEvents() {
                    return this.router.events.subscribe(t => {
                        t instanceof Jh ? (this.store[this.lastId] = this.viewportScroller.getScrollPosition(), this.lastSource = t.navigationTrigger, this.restoredId = t.restoredState ? t.restoredState.navigationId : 0) : t instanceof Xh && (this.lastId = t.id, this.scheduleScrollEvent(t, this.router.parseUrl(t.urlAfterRedirects).fragment))
                    })
                }

                consumeScrollEvents() {
                    return this.router.events.subscribe(t => {
                        t instanceof fd && (t.position ? "top" === this.options.scrollPositionRestoration ? this.viewportScroller.scrollToPosition([0, 0]) : "enabled" === this.options.scrollPositionRestoration && this.viewportScroller.scrollToPosition(t.position) : t.anchor && "enabled" === this.options.anchorScrolling ? this.viewportScroller.scrollToAnchor(t.anchor) : "disabled" !== this.options.scrollPositionRestoration && this.viewportScroller.scrollToPosition([0, 0]))
                    })
                }

                scheduleScrollEvent(t, e) {
                    this.router.triggerEvent(new fd(t, "popstate" === this.lastSource ? this.store[this.restoredId] : null, e))
                }

                ngOnDestroy() {
                    this.routerEventsSubscription && this.routerEventsSubscription.unsubscribe(), this.scrollEventsSubscription && this.scrollEventsSubscription.unsubscribe()
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(cr(Ep), cr(wu), cr(void 0))
            }, t.\u0275prov = ut({token: t, factory: t.\u0275fac}), t
        })();
        const Fp = new Bn("ROUTER_CONFIGURATION"), Up = new Bn("ROUTER_FORROOT_GUARD"),
            $p = [Xl, {provide: Dd, useClass: Md}, {
                provide: Ep,
                useFactory: function (t, e, n, r, s, i, o, a = {}, c, l) {
                    const u = new Ep(null, t, e, n, r, s, i, wd(o));
                    return c && (u.urlHandlingStrategy = c), l && (u.routeReuseStrategy = l), function (t, e) {
                        t.errorHandler && (e.errorHandler = t.errorHandler), t.malformedUriErrorHandler && (e.malformedUriErrorHandler = t.malformedUriErrorHandler), t.onSameUrlNavigation && (e.onSameUrlNavigation = t.onSameUrlNavigation), t.paramsInheritanceStrategy && (e.paramsInheritanceStrategy = t.paramsInheritanceStrategy), t.relativeLinkResolution && (e.relativeLinkResolution = t.relativeLinkResolution), t.urlUpdateStrategy && (e.urlUpdateStrategy = t.urlUpdateStrategy)
                    }(a, u), a.enableTracing && u.events.subscribe(t => {
                        var e, n;
                        null === (e = console.group) || void 0 === e || e.call(console, `Router Event: ${t.constructor.name}`), console.log(t.toString()), console.log(t), null === (n = console.groupEnd) || void 0 === n || n.call(console)
                    }), u
                },
                deps: [Dd, wp, Xl, eo, El, rl, vp, Fp, [class {
                }, new dr], [mp, new dr]]
            }, wp, {
                provide: sf, useFactory: function (t) {
                    return t.routerState.root
                }, deps: [Ep]
            }, {provide: El, useClass: Rl}, Np, Mp, class {
                preload(t, e) {
                    return e().pipe(Rh(() => ch(null)))
                }
            }, {provide: Fp, useValue: {enableTracing: !1}}];

        function Vp() {
            return new wl("Router", Ep)
        }

        let zp = (() => {
            class t {
                constructor(t, e) {
                }

                static forRoot(e, n) {
                    return {
                        ngModule: t,
                        providers: [$p, Gp(e), {
                            provide: Up,
                            useFactory: Wp,
                            deps: [[Ep, new dr, new fr]]
                        }, {provide: Fp, useValue: n || {}}, {
                            provide: Zl,
                            useFactory: Bp,
                            deps: [Fl, [new hr(Kl), new dr], Fp]
                        }, {provide: Hp, useFactory: qp, deps: [Ep, wu, Fp]}, {
                            provide: Dp,
                            useExisting: n && n.preloadingStrategy ? n.preloadingStrategy : Mp
                        }, {provide: wl, multi: !0, useFactory: Vp}, [Zp, {
                            provide: Fc,
                            multi: !0,
                            useFactory: Qp,
                            deps: [Zp]
                        }, {provide: Yp, useFactory: Kp, deps: [Zp]}, {provide: Wc, multi: !0, useExisting: Yp}]]
                    }
                }

                static forChild(e) {
                    return {ngModule: t, providers: [Gp(e)]}
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(cr(Up, 8), cr(Ep, 8))
            }, t.\u0275mod = Bt({type: t}), t.\u0275inj = ht({}), t
        })();

        function qp(t, e, n) {
            return n.scrollOffset && e.setOffset(n.scrollOffset), new Hp(t, e, n)
        }

        function Bp(t, e, n = {}) {
            return n.useHash ? new Jl(t, e) : new Yl(t, e)
        }

        function Wp(t) {
            return "guarded"
        }

        function Gp(t) {
            return [{provide: Wn, multi: !0, useValue: t}, {provide: vp, multi: !0, useValue: t}]
        }

        let Zp = (() => {
            class t {
                constructor(t) {
                    this.injector = t, this.initNavigation = !1, this.destroyed = !1, this.resultOfPreactivationDone = new S
                }

                appInitializer() {
                    return this.injector.get($l, Promise.resolve(null)).then(() => {
                        if (this.destroyed) return Promise.resolve(!0);
                        let t = null;
                        const e = new Promise(e => t = e), n = this.injector.get(Ep), r = this.injector.get(Fp);
                        return "disabled" === r.initialNavigation ? (n.setUpLocationChangeListener(), t(!0)) : "enabled" === r.initialNavigation || "enabledBlocking" === r.initialNavigation ? (n.hooks.afterPreactivation = () => this.initNavigation ? ch(null) : (this.initNavigation = !0, t(!0), this.resultOfPreactivationDone), n.initialNavigation()) : t(!0), e
                    })
                }

                bootstrapListener(t) {
                    const e = this.injector.get(Fp), n = this.injector.get(Np), r = this.injector.get(Hp),
                        s = this.injector.get(Ep), i = this.injector.get(Tl);
                    t === i.components[0] && ("enabledNonBlocking" !== e.initialNavigation && void 0 !== e.initialNavigation || s.initialNavigation(), n.setUpPreloading(), r.init(), s.resetRootComponentType(i.componentTypes[0]), this.resultOfPreactivationDone.next(null), this.resultOfPreactivationDone.complete())
                }

                ngOnDestroy() {
                    this.destroyed = !0
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(cr(eo))
            }, t.\u0275prov = ut({token: t, factory: t.\u0275fac}), t
        })();

        function Qp(t) {
            return t.appInitializer.bind(t)
        }

        function Kp(t) {
            return t.bootstrapListener.bind(t)
        }

        const Yp = new Bn("Router Initializer");
        var Jp = (() => (function (t) {
            t[t.sm = 0] = "sm", t[t.md = 1] = "md", t[t.lg = 2] = "lg"
        }(Jp || (Jp = {})), Jp))();
        const Xp = "inside.conf", tg = "inside.fetch", eg = {win: window, doc: document, loc: location}, ng = [1, 717],
            rg = {};

        function sg(t, e, n) {
            return "#" + r(t) + r(e) + r(n);

            function r(t) {
                const e = t.toString(16);
                return t < 16 ? "0" + e : e
            }
        }

        function ig(t, e, n, r) {
            if (n.from === n.to) return void (r && r());
            if (!n.duration) return void (t[e] = n.to);
            const {from: s, to: i} = n, o = Math.ceil((n.duration || 300) / 17) || 1;
            let a = 0, c = null;
            !function n() {
                const l = Math.ceil((i - s) * ((u = (u = a) / o - 1) * u * u + 1) + s);
                var u;
                a++, a <= o ? (t[e] = l, c = requestAnimationFrame(n)) : (r && r(), cancelAnimationFrame(c))
            }()
        }

        const og = function () {
            const t = {
                transition: "transitionend",
                webkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "otransitionEnd"
            };
            for (const e in t) if (e in eg.doc.body.style) return t[e]
        }();

        function ag(t, e) {
            const n = function (r) {
                t === r.target && (e(r), t.removeEventListener(og, n))
            };
            t.addEventListener(og, n, {passive: !0})
        }

        const cg = function () {
            const t = {
                animation: "animationend",
                webkitAnimation: "webkitAnimationEnd",
                MozAnimation: "animationend",
                OAnimation: "oanimationend"
            };
            for (const e in t) if (e in eg.doc.body.style) return t[e]
        }();

        function lg(t, e = 100) {
            return (...n) => {
                clearTimeout(t.debounce), t.debounce = setTimeout(() => {
                    t(...n)
                }, e)
            }
        }

        function ug(t) {
            return t.replace(/[A-Z]/g, t => "-" + t.toLowerCase())
        }

        const hg = {};

        function dg(t, e) {
            if (hg[t]) return hg[t][e ? 1 : 0];
            const n = ["", "webkit", "Moz", "O", "ms"], r = eg.doc.body.style,
                s = (i = t).charAt(0).toUpperCase() + i.substring(1);
            var i;
            for (let o = 0; o < n.length; o++) {
                const i = n[o] ? n[o] + s : t;
                if (i in r) return hg[t] = [i, ug(i)], hg[t][e ? 1 : 0]
            }
        }

        function fg(t, e) {
            for (const n in e) t.style[n] = e[n]
        }

        function pg(t, e) {
            if (e) {
                if (Array.isArray(e)) {
                    let n = 0;
                    return t.replace(/%(s|d)/g, () => e[n++])
                }
                if ("string" == typeof e || "number" == typeof e) return pg(t, [e]);
                for (const n in e) t = t.replace(new RegExp(":" + n, "g"), e[n]);
                return t
            }
            return t
        }

        function gg(t, e = "") {
            if (!e || !t) return;
            const n = e.split(/(?=\[\w+\])|\./g);
            let r = n.shift(), s = Object.assign(t);
            for (; r && (s = /\[\w+\]/.test(r) ? s[r.substring(1, r.length - 1)] : s[r], s);) r = n.shift();
            return s
        }

        function mg(t) {
            t.offsetHeight < 0 && alert()
        }

        let yg = (() => {
            class t {
                constructor(t, e) {
                    this.doc = t, this.eventSubject = new S, this.event = this.eventSubject.asObservable(), this.config = e();
                    const {locale: n} = this.config, r = {}, s = {zero: 0, one: 1, other: 2};
                    for (const i in n) {
                        const t = i.match(/\.(zero|one|other)$/);
                        if (t) {
                            const e = i.substring(0, t.index);
                            r[e] || (r[e] = {plural: !0, value: []}), r[e].value[s[t[1]]] = n[i]
                        } else r[i] = {value: n[i]}
                    }
                    this.locales = r, eg.doc.addEventListener("inside", t => {
                        this.eventSubject.next(t.detail)
                    })
                }

                i18n(t, e, n) {
                    const r = this.locales[t];
                    if (!r || !r.value) return t;
                    if (r.plural) {
                        const s = r.value[Math.min(e || 0, r.value.length - 1)];
                        return s ? pg(pg(s, e), n) : t
                    }
                    return pg(r.value, e)
                }

                getPlugins(t) {
                    const e = this.config.plugins || {};
                    return e[t] ? e[t].map(t => e.$t[t]).filter(t => t) : null
                }

                getCache(t) {
                    const e = this.doc.querySelector('[is="state"]');
                    let n = {};
                    if (e && e.textContent) {
                        try {
                            n = JSON.parse(this.unescapeHtml(e.textContent))
                        } catch (r) {
                            console.warn("Exception occured while parsing state", r)
                        }
                        return n[t]
                    }
                    return null
                }

                unescapeHtml(t) {
                    const e = {"&a;": "&", "&q;": '"', "&s;": "'", "&l;": "<", "&g;": ">"};
                    return t.replace(/&[^;]+;/g, t => e[t])
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(cr(Hl), cr(Xp))
            }, t.\u0275prov = ut({token: t, factory: t.\u0275fac, providedIn: "root"}), t
        })(), vg = (() => {
            class t {
                constructor() {
                    this.subject = new S, this.state = this.subject.asObservable(), this.busy = !1
                }

                show() {
                    this.busy = !0, this.subject.next(!0)
                }

                hide() {
                    this.busy = !1, this.subject.next(!1)
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)
            }, t.\u0275prov = ut({token: t, factory: t.\u0275fac, providedIn: "root"}), t
        })(), bg = (() => {
            class t {
                constructor(t, e, n) {
                    this.loader = t, this.app = e, this.fetch = n, this.version = "", this.prefix = this.app.config.data_prefix, this.version = this.app.config.hash || ""
                }

                get(t) {
                    t = this.getFullUrl(t);
                    const e = this.app.getCache(t.split("?")[0]);
                    return e ? Promise.resolve(e) : (this.loader.show(), this.fetch(t).then(t => (this.loader.hide(), t)).catch(t => (console.error(t), this.loader.hide(), Promise.reject(t))))
                }

                request(t) {
                    var {url: e} = t, n = function (t, e) {
                        var n = {};
                        for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && e.indexOf(r) < 0 && (n[r] = t[r]);
                        if (null != t && "function" == typeof Object.getOwnPropertySymbols) {
                            var s = 0;
                            for (r = Object.getOwnPropertySymbols(t); s < r.length; s++) e.indexOf(r[s]) < 0 && Object.prototype.propertyIsEnumerable.call(t, r[s]) && (n[r[s]] = t[r[s]])
                        }
                        return n
                    }(t, ["url"]);
                    return this.loader.show(), this.fetch(e, n).then(t => (this.loader.hide(), t)).catch(t => (this.loader.hide(), Promise.reject(t)))
                }

                getFullUrl(t) {
                    return `${this.prefix}/${function (t) {
                        const e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
                        let n, r, s, i, o, a, c, l = "", u = 0;
                        for (t = function (t) {
                            t = t.replace(/\r\n/g, "\n");
                            let e = "";
                            for (let n = 0; n < t.length; n++) {
                                const r = t.charCodeAt(n);
                                r < 128 ? e += String.fromCharCode(r) : r > 127 && r < 2048 ? (e += String.fromCharCode(r >> 6 | 192), e += String.fromCharCode(63 & r | 128)) : (e += String.fromCharCode(r >> 12 | 224), e += String.fromCharCode(r >> 6 & 63 | 128), e += String.fromCharCode(63 & r | 128))
                            }
                            return e
                        }(t); u < t.length;) n = t.charCodeAt(u++), r = t.charCodeAt(u++), s = t.charCodeAt(u++), i = n >> 2, o = (3 & n) << 4 | r >> 4, a = (15 & r) << 2 | s >> 6, c = 63 & s, isNaN(r) ? a = c = 64 : isNaN(s) && (c = 64), l = l + e.charAt(i) + e.charAt(o) + e.charAt(a) + e.charAt(c);
                        return l.replace(/=/g, "")
                    }(t.replace(/(^\/*|\/*$)/g, ""))}.json?v=${this.version}`
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(cr(vg), cr(yg), cr(tg))
            }, t.\u0275prov = ut({token: t, factory: t.\u0275fac, providedIn: "root"}), t
        })(), _g = (() => {
            class t {
                constructor(t, e) {
                    this.http = t, this.router = e, this.track = 0
                }

                resolve(t) {
                    const e = t.pathFromRoot.reduce((t, e) => (e.url.forEach(e => t.push(e.path)), t), []).join("/");
                    return this.http.get(e || "page").catch(this.error.bind(this))
                }

                error(t) {
                    return this.track < 1 && (this.router.navigate(["/"]), this.track++), {}
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(cr(bg), cr(Ep))
            }, t.\u0275prov = ut({token: t, factory: t.\u0275fac, providedIn: "root"}), t
        })(), wg = (() => {
            class t {
                constructor() {
                    this.mediaSubject = new S, this.scrollSubject = new S, this.media = this.mediaSubject.asObservable(), this.scroll = this.scrollSubject.asObservable(), this.width = eg.win.innerWidth, this.height = eg.win.innerHeight, eg.win.addEventListener("resize", lg(() => {
                        this.refreshMedia()
                    }, 500), {passive: !0})
                }

                initScroll(t) {
                    this.host = t, t.addEventListener("scroll", () => {
                        this.refreshScroll({scrollTop: t.scrollTop})
                    }, {passive: !0})
                }

                refreshScroll(t) {
                    this.scrollSubject.next(t || {scrollTop: this.host.scrollTop})
                }

                refreshMedia() {
                    let t;
                    this.width = eg.win.innerWidth, this.height = eg.win.innerHeight, t = this.width < 640 ? Jp.sm : this.width < 976 ? Jp.md : Jp.lg, this.mediaSubject.next({type: t})
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)
            }, t.\u0275prov = ut({token: t, factory: t.\u0275fac, providedIn: "root"}), t
        })();
        const Cg = ["control"];

        function Sg(t, e) {
            if (1 & t) {
                const t = Eo();
                So(0, "span", 16), Lo("click", function () {
                    return Le(t), Do().act("toggleSidebar")
                }), xo()
            }
        }

        function xg(t, e) {
            if (1 & t) {
                const t = Eo();
                So(0, "span", 17), Lo("click", function () {
                    return Le(t), Do().act("toggleToc")
                }), xo()
            }
        }

        function kg(t, e) {
            if (1 & t) {
                const t = Eo();
                So(0, "span", 18), Lo("click", function () {
                    return Le(t), Do().act("search")
                }), xo()
            }
        }

        function Tg(t, e) {
            if (1 & t && (rn(), So(0, "text", 19), Bo(1), So(2, "tspan", 20), Bo(3, "%"), xo(), xo()), 2 & t) {
                const t = Do();
                Ws(1), Go(" ", t.progress || "", "")
            }
        }

        function Ig(t, e) {
            if (1 & t && (rn(), So(0, "g", 21), ko(1, "circle", 22), ko(2, "circle", 22), ko(3, "circle", 22), xo()), 2 & t) {
                const t = Do();
                Ws(1), yo("cx", t.showMenu ? "-.8rem" : 0)("cy", t.showMenu ? 0 : "-.8rem"), Ws(2), yo("cx", t.showMenu ? ".8rem" : 0)("cy", t.showMenu ? 0 : ".8rem")
            }
        }

        const Eg = function (t) {
            return {"\u03c6bj": t}
        };
        var Og = (() => (function (t) {
            t[t.toTop = 0] = "toTop", t[t.toBottom = 1] = "toBottom", t[t.toggleSidebar = 2] = "toggleSidebar", t[t.toggleToc = 3] = "toggleToc", t[t.search = 4] = "search"
        }(Og || (Og = {})), Og))();
        let Ag = (() => {
            class t {
                constructor(t, e) {
                    this.device = t, this.loader = e, this.showMenu = !1, this.busy = !1, this.action = new _c
                }

                ngOnInit() {
                    this.device.media.subscribe(t => this.sidebar = t.type !== Jp.lg), this.device.refreshMedia(), this.loader.state.subscribe(t => {
                        t && !this.busy && this.rotate()
                    })
                }

                act(t) {
                    this.action.emit(Og[t])
                }

                rotate() {
                    const t = this.controlRef.nativeElement;
                    this.busy = !0, t.classList.add("\u03c6bc"), function (t, e) {
                        const n = function (r) {
                            t === r.target && (e(), t.removeEventListener(cg, n))
                        };
                        t.addEventListener(cg, n, {passive: !0})
                    }(t, () => {
                        t.classList.remove("\u03c6bc"), this.busy = !1, mg(t), this.loader.busy && this.rotate()
                    })
                }

                toggle() {
                    this.showMenu = !this.showMenu
                }

                open() {
                    this.showMenu = !0
                }

                close() {
                    this.showMenu = !1
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(_o(wg), _o(vg))
            }, t.\u0275cmp = $t({
                type: t,
                selectors: [["is-f"]],
                viewQuery: function (t, e) {
                    if (1 & t && Pc(Cg, 7), 2 & t) {
                        let t;
                        Lc(t = Dc()) && (e.controlRef = t.first)
                    }
                },
                hostAttrs: [1, "\u03c6z"],
                inputs: {progress: "progress", toc: "toc", search: "search"},
                outputs: {action: "action"},
                decls: 17,
                vars: 9,
                consts: [[1, "\u03c6bi", 3, "ngClass"], [1, "\u03c6a", "i\u03ba-up", 3, "click"], [1, "\u03c6a", "i\u03ba-down", 3, "click"], ["class", "\u03c6a i\u03ba-sidebar", 3, "click", 4, "ngIf"], ["class", "\u03c6a i\u03ba-toc", 3, "click", 4, "ngIf"], ["class", "\u03c6a i\u03ba-search", 3, "click", 4, "ngIf"], [1, "\u03c6bb", 3, "click"], ["control", ""], [1, "\u03c6bh"], ["id", "dp"], ["in", "SourceGraphic", "stdDeviation", "2"], ["filter", "url(#dp)", "fill", "rgba(0,0,0,.3)", "cx", "50%", "cy", "52%", "r", "44%"], ["cx", "50%", "cy", "50%", "r", "44%", 1, "\u03c6bd"], ["cx", "50%", "cy", "50%", "r", "48%", 1, "\u03c6bg"], ["class", "\u03c6bf", "x", "50%", "y", "0", "dy", "50%", 4, "ngIf"], ["class", "\u03c6be", 4, "ngIf"], [1, "\u03c6a", "i\u03ba-sidebar", 3, "click"], [1, "\u03c6a", "i\u03ba-toc", 3, "click"], [1, "\u03c6a", "i\u03ba-search", 3, "click"], ["x", "50%", "y", "0", "dy", "50%", 1, "\u03c6bf"], ["dx", "1"], [1, "\u03c6be"], ["r", ".2rem"]],
                template: function (t, e) {
                    1 & t && (So(0, "div", 0), So(1, "span", 1), Lo("click", function () {
                        return e.act("toTop")
                    }), xo(), So(2, "span", 2), Lo("click", function () {
                        return e.act("toBottom")
                    }), xo(), bo(3, Sg, 1, 0, "span", 3), bo(4, xg, 1, 0, "span", 4), bo(5, kg, 1, 0, "span", 5), xo(), So(6, "div", 6, 7), Lo("click", function () {
                        return e.toggle()
                    }), rn(), So(8, "svg", 8), So(9, "defs"), So(10, "filter", 9), ko(11, "feGaussianBlur", 10), xo(), xo(), ko(12, "circle", 11), ko(13, "circle", 12), ko(14, "circle", 13), bo(15, Tg, 4, 1, "text", 14), bo(16, Ig, 4, 4, "g", 15), xo(), xo()), 2 & t && (wo("ngClass", cc(7, Eg, e.showMenu)), Ws(3), wo("ngIf", e.sidebar), Ws(1), wo("ngIf", e.toc), Ws(1), wo("ngIf", e.search), Ws(9), yo("stroke-dasharray", 3.1415926 * (e.progress || 0) + "% 314.15926%"), Ws(1), wo("ngIf", e.progress), Ws(1), wo("ngIf", !e.progress))
                },
                directives: [iu, lu],
                encapsulation: 2
            }), t
        })(), Rg = (() => {
            class t {
                constructor(t, e) {
                    this.er = t, this.renderer = e
                }

                ngAfterViewInit() {
                    setTimeout(() => this.process())
                }

                process() {
                    const t = /^https?\:\/\/gist.github.com/,
                        e = this.er.nativeElement && this.er.nativeElement.getElementsByTagName("script");
                    e && e.length && Array.from(e).forEach(e => {
                        const n = document.createElement("div");
                        e.parentElement.insertBefore(n, e);
                        const {innerHTML: r, src: s} = e;
                        if (r || s) {
                            if (s && s.match(t)) {
                                let t = this.renderer.createElement("iframe");
                                return t.style.display = "none", t.onload = () => {
                                    let e = t.contentDocument;
                                    if (!e) return;
                                    const r = this.renderer.createElement("div"),
                                        s = e.querySelector('link[rel="stylesheet"]'), i = e.querySelector(".gist");
                                    if (s && i) {
                                        const t = i.cloneNode();
                                        t.innerHTML = i.innerHTML, r.appendChild(s.cloneNode()), r.appendChild(t)
                                    }
                                    n.removeChild(t), n.appendChild(r), t = e = null
                                }, t.srcdoc = `<script src="${s}"><\/script>`, void n.appendChild(t)
                            }
                            {
                                const t = this.renderer.createElement("script");
                                s ? t.src = s : t.innerHTML = r, n.appendChild(t)
                            }
                            n.parentElement.removeChild(n)
                        }
                    })
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(_o(la), _o(da))
            }, t.\u0275dir = Gt({type: t, selectors: [["", "isSnippet", ""]]}), t
        })(), Lg = (() => {
            class t {
                constructor(t) {
                    this.sanitizer = t
                }

                transform(t, e = "html") {
                    return "url" === e ? this.sanitizer.bypassSecurityTrustUrl(t) : this.sanitizer.bypassSecurityTrustHtml(t)
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(_o(Yu, 16))
            }, t.\u0275pipe = Zt({name: "unsafe", type: t, pure: !0}), t
        })(), Pg = (() => {
            class t {
                constructor(t) {
                    this.app = t
                }

                transform(t, ...e) {
                    return this.app.i18n(t, ...e)
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(_o(yg, 16))
            }, t.\u0275pipe = Zt({name: "i18n", type: t, pure: !0}), t
        })();
        const jg = ["inner"];

        function Dg(t, e) {
            if (1 & t) {
                const t = Eo();
                So(0, "i", 16), Lo("click", function () {
                    return Le(t), Do().toggleTheme()
                }), xo()
            }
        }

        function Mg(t, e) {
            1 & t && (ko(0, "div", 17), pc(1, "unsafe")), 2 & t && wo("innerHTML", gc(1, 1, Do().avatarPlugin), Yr)
        }

        function Ng(t, e) {
            if (1 & t && ko(0, "img", 18), 2 & t) {
                const t = Do();
                Mo("src", null == t.config.profile ? null : t.config.profile.avatar, Jr), Mo("alt", t.config.author), Mo("title", t.config.author)
            }
        }

        const Hg = function (t) {
            return {"\u03c6dn": t}
        };

        function Fg(t, e) {
            if (1 & t && (So(0, "a", 23), So(1, "span"), Bo(2), xo(), So(3, "span"), Bo(4), pc(5, "i18n"), xo(), xo()), 2 & t) {
                const t = Do(2);
                No("routerLink", "/categories/", t.config.category0, ""), wo("ngClass", cc(6, Hg, "/categories" === t.activePath)), Ws(2), Wo(t.config.count.categories > 1e4 ? "999+" : t.config.count.categories), Ws(2), Wo(gc(5, 4, "menu.categories"))
            }
        }

        function Ug(t, e) {
            if (1 & t && (So(0, "a", 24), So(1, "span"), Bo(2), xo(), So(3, "span"), Bo(4), pc(5, "i18n"), xo(), xo()), 2 & t) {
                const t = Do(2);
                wo("ngClass", cc(5, Hg, "/tags" === t.activePath)), Ws(2), Wo(t.config.count.tags > 1e4 ? "999+" : t.config.count.tags), Ws(2), Wo(gc(5, 3, "menu.tags"))
            }
        }

        function $g(t, e) {
            if (1 & t && (So(0, "div", 19), So(1, "a", 20), So(2, "span"), Bo(3), xo(), So(4, "span"), Bo(5), pc(6, "i18n"), xo(), xo(), bo(7, Fg, 6, 8, "a", 21), bo(8, Ug, 6, 7, "a", 22), xo()), 2 & t) {
                const t = Do();
                Ws(1), wo("ngClass", cc(7, Hg, "/archives" === t.activePath)), Ws(2), Wo(t.config.count.posts > 1e4 ? "999+" : t.config.count.posts), Ws(2), Wo(gc(6, 5, "menu.archives")), Ws(2), wo("ngIf", t.config.count.categories), Ws(1), wo("ngIf", t.config.count.tags)
            }
        }

        const Vg = function (t) {
            return {"\u03c6dk": t}
        };

        function zg(t, e) {
            if (1 & t && (So(0, "a", 29), Bo(1), xo()), 2 & t) {
                const t = Do().$implicit, e = Do(2);
                Mo("routerLink", t[1]), wo("ngClass", cc(3, Vg, t[1] == e.activePath)), Ws(1), Wo(t[0])
            }
        }

        function qg(t, e) {
            if (1 & t && (So(0, "a", 30), Bo(1), xo()), 2 & t) {
                const t = Do().$implicit;
                Mo("href", t[1], Jr), Ws(1), Wo(t[0])
            }
        }

        function Bg(t, e) {
            if (1 & t && (To(0), bo(1, zg, 2, 5, "a", 27), bo(2, qg, 2, 2, "a", 28), Io()), 2 & t) {
                const t = e.$implicit;
                Ws(1), wo("ngIf", !t[2]), Ws(1), wo("ngIf", t[2])
            }
        }

        function Wg(t, e) {
            if (1 & t && (So(0, "nav", 25), bo(1, Bg, 3, 2, "ng-container", 26), xo()), 2 & t) {
                const t = Do();
                Ws(1), wo("ngForOf", t.config.menu)
            }
        }

        function Gg(t, e) {
            1 & t && (ko(0, "div", 32), pc(1, "unsafe")), 2 & t && wo("innerHTML", gc(1, 1, e.$implicit), Yr)
        }

        function Zg(t, e) {
            if (1 & t && (To(0), bo(1, Gg, 2, 3, "div", 31), Io()), 2 & t) {
                const t = Do();
                Ws(1), wo("ngForOf", t.plugins)
            }
        }

        function Qg(t, e) {
            if (1 & t && ko(0, "a", 36), 2 & t) {
                const t = Do().$implicit;
                Mo("title", t[0]), Mo("href", t[1], Jr), wo("ngClass", "i\u03ba-" + t[0])
            }
        }

        function Kg(t, e) {
            if (1 & t && (ko(0, "a", 37), pc(1, "unsafe")), 2 & t) {
                const t = Do().$implicit;
                Mo("title", t[0]), Mo("href", t[1], Jr), wo("innerHTML", gc(1, 3, t[2]), Yr)
            }
        }

        function Yg(t, e) {
            if (1 & t && (To(0), bo(1, Qg, 1, 3, "a", 34), bo(2, Kg, 2, 5, "a", 35), Io()), 2 & t) {
                const t = e.$implicit;
                Ws(1), wo("ngIf", !t[2]), Ws(1), wo("ngIf", t[2])
            }
        }

        function Jg(t, e) {
            if (1 & t && (So(0, "div", 33), bo(1, Yg, 3, 2, "ng-container", 26), xo()), 2 & t) {
                const t = Do();
                Ws(1), wo("ngForOf", t.config.sns)
            }
        }

        function Xg(t, e) {
            1 & t && (ko(0, "p", 38), pc(1, "unsafe")), 2 & t && wo("innerHTML", gc(1, 1, Do().config.footer.copyright), Yr)
        }

        function tm(t, e) {
            1 & t && (ko(0, "span", 41), pc(1, "unsafe")), 2 & t && wo("innerHTML", gc(1, 1, Do(2).config.footer.powered), Yr)
        }

        function em(t, e) {
            1 & t && (ko(0, "span", 41), pc(1, "unsafe")), 2 & t && wo("innerHTML", gc(1, 1, Do(2).config.footer.theme), Yr)
        }

        function nm(t, e) {
            if (1 & t && (So(0, "p", 39), bo(1, tm, 2, 3, "span", 40), bo(2, em, 2, 3, "span", 40), xo()), 2 & t) {
                const t = Do();
                Ws(1), wo("ngIf", t.config.footer.powered), Ws(1), wo("ngIf", t.config.footer.theme)
            }
        }

        function rm(t, e) {
            1 & t && (ko(0, "p", 38), pc(1, "unsafe")), 2 & t && wo("innerHTML", gc(1, 1, Do().config.footer.custom), Yr)
        }

        var sm = (() => (function (t) {
            t.Default = "default", t.Dark = "dark"
        }(sm || (sm = {})), sm))();
        let im = (() => {
            class t {
                constructor(t, e, n, r, s) {
                    this.er = t, this.route = e, this.router = n, this.device = r, this.app = s, this.theme = function () {
                        if (eg.isServer) return sm.Default;
                        const t = localStorage.getItem("__inside__");
                        if (t) try {
                            return JSON.parse(t).theme.name
                        } catch (e) {
                            return sm.Default
                        }
                    }(), this.config = this.app.config, this.plugins = this.app.getPlugins("sidebar"), this.avatarPlugin = (this.app.getPlugins("avatar") || [])[0], this.eventSub = this.app.event.subscribe(t => {
                        "theme" === t.type && (t.data.name !== sm.Dark && t.data.name !== sm.Default || (this.theme = t.data.name))
                    }), this.config.menu && this.router.events.pipe(Eh(t => t instanceof Xh)).subscribe(() => {
                        const {data: t, routeConfig: e} = this.route.snapshot.children[0];
                        this.activePath = "page" === t.id ? e.path : "home" === t.id ? "" : "category" === t.id ? "categories" : "tag" === t.id ? "tags" : t.id, "/" !== this.activePath[0] && (this.activePath = "/" + this.activePath)
                    })
                }

                ngAfterViewInit() {
                    this.device.media.subscribe(() => {
                        this.adjustFooter()
                    }), this.device.refreshMedia()
                }

                ngOnDestroy() {
                    this.eventSub.unsubscribe()
                }

                adjustFooter() {
                    const t = this.innerRef.nativeElement.children[1];
                    t.classList[this.innerRef.nativeElement.children[0].offsetHeight + t.offsetHeight > this.device.height ? "remove" : "add"]("\u03c6dc")
                }

                toggleTheme() {
                    const t = this.theme === sm.Default ? sm.Dark : sm.Default, e = this.config.theme[t];
                    e.name = t, document.dispatchEvent(new CustomEvent("inside", {detail: {type: "theme", data: e}}))
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(_o(la), _o(sf), _o(Ep), _o(wg), _o(yg))
            }, t.\u0275cmp = $t({
                type: t,
                selectors: [["is-k"]],
                viewQuery: function (t, e) {
                    if (1 & t && Pc(jg, 7), 2 & t) {
                        let t;
                        Lc(t = Dc()) && (e.innerRef = t.first)
                    }
                },
                hostAttrs: [1, "\u03c6cu"],
                decls: 19,
                vars: 12,
                consts: [[1, "\u03c6dg"], ["inner", ""], [1, "\u03c6dh"], [1, "\u03c6cv"], ["class", "\u03c6da", 3, "click", 4, "ngIf"], ["class", "\u03c6cx", "isSnippet", "", 3, "innerHTML", 4, "ngIf"], ["class", "\u03c6cx \u03c6cw", "width", "160", "draggable", "false", 3, "src", "alt", "title", 4, "ngIf"], ["href", "", 1, "\u03c6cz"], [1, "\u03c6cy"], ["class", "\u03c6dl", 4, "ngIf"], ["class", "\u03c6di", 4, "ngIf"], [4, "ngIf"], [1, "\u03c6db"], ["class", "\u03c6de", 4, "ngIf"], ["class", "\u03c6e", 3, "innerHTML", 4, "ngIf"], ["class", "\u03c6e", 4, "ngIf"], [1, "\u03c6da", 3, "click"], ["isSnippet", "", 1, "\u03c6cx", 3, "innerHTML"], ["width", "160", "draggable", "false", 1, "\u03c6cx", "\u03c6cw", 3, "src", "alt", "title"], [1, "\u03c6dl"], ["routerLink", "/archives", 1, "\u03c6dm", 3, "ngClass"], ["class", "\u03c6dm", 3, "ngClass", "routerLink", 4, "ngIf"], ["class", "\u03c6dm", "routerLink", "/tags", 3, "ngClass", 4, "ngIf"], [1, "\u03c6dm", 3, "ngClass", "routerLink"], ["routerLink", "/tags", 1, "\u03c6dm", 3, "ngClass"], [1, "\u03c6di"], [4, "ngFor", "ngForOf"], ["class", "\u03c6dj", 3, "ngClass", "routerLink", 4, "ngIf"], ["class", "\u03c6dj", "target", "_blank", "rel", "external nofollow noopener", 3, "href", 4, "ngIf"], [1, "\u03c6dj", 3, "ngClass", "routerLink"], ["target", "_blank", "rel", "external nofollow noopener", 1, "\u03c6dj", 3, "href"], ["class", "\u03c6b", "isSnippet", "", 3, "innerHTML", 4, "ngFor", "ngForOf"], ["isSnippet", "", 1, "\u03c6b", 3, "innerHTML"], [1, "\u03c6de"], ["class", "\u03c6df \u03c6a", "target", "_blank", "rel", "external nofollow noopener", 3, "title", "href", "ngClass", 4, "ngIf"], ["class", "\u03c6df", "target", "_blank", "rel", "external nofollow noopener", 3, "title", "href", "innerHTML", 4, "ngIf"], ["target", "_blank", "rel", "external nofollow noopener", 1, "\u03c6df", "\u03c6a", 3, "title", "href", "ngClass"], ["target", "_blank", "rel", "external nofollow noopener", 1, "\u03c6df", 3, "title", "href", "innerHTML"], [1, "\u03c6e", 3, "innerHTML"], [1, "\u03c6e"], ["class", "\u03c6dd", 3, "innerHTML", 4, "ngIf"], [1, "\u03c6dd", 3, "innerHTML"]],
                template: function (t, e) {
                    1 & t && (So(0, "div", 0, 1), So(2, "section", 2), So(3, "header", 3), bo(4, Dg, 1, 0, "i", 4), bo(5, Mg, 2, 3, "div", 5), bo(6, Ng, 1, 3, "img", 6), So(7, "a", 7), Bo(8), xo(), So(9, "p", 8), Bo(10), xo(), xo(), bo(11, $g, 9, 9, "div", 9), bo(12, Wg, 2, 1, "nav", 10), bo(13, Zg, 2, 1, "ng-container", 11), xo(), So(14, "footer", 12), bo(15, Jg, 2, 1, "div", 13), bo(16, Xg, 2, 3, "p", 14), bo(17, nm, 3, 2, "p", 15), bo(18, rm, 2, 3, "p", 14), xo(), xo()), 2 & t && (Ws(4), wo("ngIf", e.config.theme.dark), Ws(1), wo("ngIf", e.avatarPlugin), Ws(1), wo("ngIf", !e.avatarPlugin), Ws(2), Wo(e.config.author), Ws(2), Wo(null == e.config.profile ? null : e.config.profile.bio), Ws(1), wo("ngIf", e.config.count.posts), Ws(1), wo("ngIf", e.config.menu), Ws(1), wo("ngIf", e.plugins), Ws(2), wo("ngIf", e.config.sns), Ws(1), wo("ngIf", e.config.footer.copyright), Ws(1), wo("ngIf", e.config.footer.powered || e.config.footer.theme), Ws(1), wo("ngIf", e.config.footer.custom))
                },
                directives: [lu, Rg, Ap, iu, au],
                pipes: [Lg, Pg],
                encapsulation: 2
            }), t
        })();

        function om(t, e) {
            if (1 & t && (So(0, "span", 6), Bo(1), xo()), 2 & t) {
                const t = Do().$implicit;
                Ws(1), Go("", t.index, " ")
            }
        }

        function am(t, e) {
            if (1 & t && (So(0, "span", 6), Bo(1), xo()), 2 & t) {
                const t = Do().$implicit;
                Ws(1), Go("", t.index, " ")
            }
        }

        function cm(t, e) {
            if (1 & t && (So(0, "span", 6), Bo(1), xo()), 2 & t) {
                const t = Do().$implicit;
                Ws(1), Go("", t.index, " ")
            }
        }

        function lm(t, e) {
            if (1 & t && (So(0, "span", 6), Bo(1), xo()), 2 & t) {
                const t = Do().$implicit;
                Ws(1), Go("", t.index, " ")
            }
        }

        const um = function (t) {
            return {"\u03c6dw": t}
        };

        function hm(t, e) {
            if (1 & t) {
                const t = Eo();
                So(0, "a", 2), Lo("click", function (e) {
                    const n = Le(t).$implicit;
                    return Do(7).navigate(n.id, e)
                }), bo(1, lm, 2, 1, "span", 3), ko(2, "span", 4), xo()
            }
            if (2 & t) {
                const t = e.$implicit, n = Do(7);
                wo("ngClass", cc(3, um, n.currentId === t.id)), Ws(1), wo("ngIf", n.config.index), Ws(1), wo("innerHTML", t.title, Yr)
            }
        }

        function dm(t, e) {
            if (1 & t && (So(0, "div", 8), bo(1, hm, 3, 5, "a", 10), xo()), 2 & t) {
                const t = Do().$implicit;
                Ws(1), wo("ngForOf", t.children)
            }
        }

        function fm(t, e) {
            if (1 & t) {
                const t = Eo();
                So(0, "div", 8), So(1, "a", 2), Lo("click", function (e) {
                    const n = Le(t).$implicit;
                    return Do(5).navigate(n.id, e)
                }), bo(2, cm, 2, 1, "span", 3), ko(3, "span", 4), xo(), bo(4, dm, 2, 1, "div", 9), xo()
            }
            if (2 & t) {
                const t = e.$implicit, n = Do(5);
                Ws(1), wo("ngClass", cc(4, um, n.currentId === t.id)), Ws(1), wo("ngIf", n.config.index), Ws(1), wo("innerHTML", t.title, Yr), Ws(1), wo("ngIf", t.children)
            }
        }

        function pm(t, e) {
            if (1 & t && (To(0), bo(1, fm, 5, 6, "div", 7), Io()), 2 & t) {
                const t = Do().$implicit;
                Ws(1), wo("ngForOf", t.children)
            }
        }

        function gm(t, e) {
            if (1 & t) {
                const t = Eo();
                So(0, "div", 8), So(1, "a", 2), Lo("click", function (e) {
                    const n = Le(t).$implicit;
                    return Do(3).navigate(n.id, e)
                }), bo(2, am, 2, 1, "span", 3), ko(3, "span", 4), xo(), bo(4, pm, 2, 1, "ng-container", 5), xo()
            }
            if (2 & t) {
                const t = e.$implicit, n = Do(3);
                Ws(1), wo("ngClass", cc(4, um, n.currentId === t.id)), Ws(1), wo("ngIf", n.config.index), Ws(1), wo("innerHTML", t.title, Yr), Ws(1), wo("ngIf", t.children)
            }
        }

        function mm(t, e) {
            if (1 & t && (To(0), bo(1, gm, 5, 6, "div", 7), Io()), 2 & t) {
                const t = Do().$implicit;
                Ws(1), wo("ngForOf", t.children)
            }
        }

        const ym = function (t) {
            return {"\u03c6du": t}
        };

        function vm(t, e) {
            if (1 & t) {
                const t = Eo();
                So(0, "div", 1), So(1, "a", 2), Lo("click", function (e) {
                    const n = Le(t).$implicit;
                    return Do().navigate(n.id, e)
                }), bo(2, om, 2, 1, "span", 3), ko(3, "span", 4), xo(), bo(4, mm, 2, 1, "ng-container", 5), xo()
            }
            if (2 & t) {
                const t = e.$implicit, n = Do();
                wo("ngClass", cc(5, ym, n.stacks[n.currentId] && n.stacks[n.currentId].depth[0] === t.id)), Ws(1), wo("ngClass", cc(7, um, n.currentId === t.id)), Ws(1), wo("ngIf", n.config.index), Ws(1), wo("innerHTML", t.title, Yr), Ws(1), wo("ngIf", t.children)
            }
        }

        let bm = (() => {
            class t {
                constructor(t, e, n) {
                    this.app = t, this.device = e, this.er = n, this.scrollTop = 0, this.action = new _c, this.currentId = "", this.stacks = {}, this.linedIds = [], this.config = this.app.config.toc || {}, this.syncPosition = lg(this.syncPosition.bind(this))
                }

                navigate(t, e) {
                    if (e.preventDefault(), this.currentId === t) return;
                    this.currentId = t;
                    const n = this.getOffset(t);
                    n >= 0 && this.action.emit(n)
                }

                syncPosition() {
                    const t = this.scrollTop || 0;
                    if (t < this.linedIds[0].offset) this.currentId = ""; else for (let e = 0; e < this.linedIds.length; e++) {
                        const n = this.linedIds[e], r = this.linedIds[e + 1];
                        if (this.currentId !== n.id && t >= n.offset && (void 0 === r || t < r.offset)) return void (this.currentId = n.id)
                    }
                }

                getOffset(t, e) {
                    const n = this.stacks[t].offset;
                    return e || void 0 === n ? eg.doc.getElementById(t) ? Math.floor(eg.doc.getElementById(t).getBoundingClientRect().top) + (this.scrollTop || 0) : -1 : n
                }

                ngOnInit() {
                    this.mediaSub = this.device.media.subscribe(() => {
                        this.refresh()
                    })
                }

                ngOnChanges(t) {
                    t.toc && setTimeout(() => this.updateStacks(), 100)
                }

                ngOnDestroy() {
                    this.mediaSub.unsubscribe()
                }

                updateStacks() {
                    this.stacks = function t(e, n = {}, r = []) {
                        return e.forEach(({id: e, children: s}) => {
                            n[e] = {depth: r.concat(e)}, s && t(s, n, n[e].depth)
                        }), n
                    }(this.toc), this.refresh()
                }

                refresh() {
                    for (const t in this.stacks) this.stacks[t].offset = this.getOffset(t, !0);
                    this.linedIds = Object.keys(this.stacks).map(t => ({
                        id: t,
                        offset: this.stacks[t].offset
                    })).sort((t, e) => t.offset - e.offset), this.width = this.er.nativeElement.offsetWidth
                }

                step(t, e) {
                    const n = this.er.nativeElement;
                    t === this.width ? ag(n, () => {
                        n.classList.remove("\u03c6dr")
                    }) : n.classList.contains("\u03c6dr") || n.classList.add("\u03c6dr"), n.style[dg("transitionDuration")] = `${e}ms`, n.style[dg("transform")] = `translate3d(${t}px, 0, 0)`, e > 4 && (this.busy = !0, ag(n, () => {
                        this.busy = !1
                    }))
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(_o(yg), _o(wg), _o(la))
            }, t.\u0275cmp = $t({
                type: t,
                selectors: [["is-m"]],
                hostAttrs: [1, "\u03c6dq"],
                inputs: {toc: "toc", scrollTop: "scrollTop"},
                outputs: {action: "action"},
                features: [ae],
                decls: 1,
                vars: 1,
                consts: [["class", "\u03c6ds \u03c6dt", 3, "ngClass", 4, "ngFor", "ngForOf"], [1, "\u03c6ds", "\u03c6dt", 3, "ngClass"], [1, "\u03c6dv", 3, "ngClass", "click"], ["class", "\u03c6dx", 4, "ngIf"], [1, "\u03c6dy", 3, "innerHTML"], [4, "ngIf"], [1, "\u03c6dx"], ["class", "\u03c6ds", 4, "ngFor", "ngForOf"], [1, "\u03c6ds"], ["class", "\u03c6ds", 4, "ngIf"], ["class", "\u03c6dv", 3, "ngClass", "click", 4, "ngFor", "ngForOf"]],
                template: function (t, e) {
                    1 & t && bo(0, vm, 5, 9, "div", 0), 2 & t && wo("ngForOf", e.toc)
                },
                directives: [au, iu, lu],
                encapsulation: 2
            }), t
        })(), _m = (() => {
            class t {
                constructor(t, e, n, r) {
                    this.app = t, this.route = e, this.router = n, this.device = r, this.pv = {}, this.data$ = e.data, this.plugins = this.app.getPlugins(e.snapshot.data.id), this.eventSub = this.app.event.subscribe(t => {
                        "pv" === t.type && (this.pv = t.data)
                    })
                }

                ngOnDestroy() {
                    this.eventSub.unsubscribe()
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(_o(yg), _o(sf), _o(Ep), _o(wg))
            }, t.\u0275dir = Gt({type: t}), t
        })(), wm = (() => {
            class t {
                constructor(t, e, n, r) {
                    this.device = t, this.loader = e, this.app = n, this.renderer = r, this.busy = !1, this.container = this.renderer.createElement("div"), this.container.classList.add("\u03c6c")
                }

                ngAfterViewInit() {
                    this.container.addEventListener("click", () => {
                        this.detatch()
                    })
                }

                onTap(t) {
                    "IMG" === t.tagName && ~t.className.indexOf("\u03c6bp") && !this.busy && (this.busy = !0, this.target = t, this.img = t.cloneNode(), this.resizeSub = this.device.media.subscribe(() => {
                        this.target && this.resize(!0)
                    }), this.resize().then(() => {
                        this.target.style.opacity = "0", this.container.appendChild(this.img), this.app.root.appendChild(this.container), mg(this.img), ag(this.img, () => {
                            this.busy = !1
                        }), this.container.classList.add("\u03c6d"), this.img.style[dg("transform", !0)] = this.transforms[1]
                    }))
                }

                resize(t) {
                    return new Promise(t => {
                        if (this.img.width > 0) t(this.img.width); else {
                            this.loader.show();
                            const e = new Image;
                            e.addEventListener("load", () => {
                                this.loader.hide(), t(e.width)
                            }), e.addEventListener("error", () => {
                                this.loader.hide(), this.img = this.target = null, this.busy = !1
                            }), e.src = this.img.src
                        }
                    }).then(e => {
                        const n = this.target.getBoundingClientRect();
                        let r, s;
                        e > this.device.width && (e = this.device.width), s = n.width / e, r = n.height / s, r > this.device.height && (r = this.device.height), this.transforms = [`scale3d(${s.toFixed(3)}, ${s.toFixed(3)}, 1)`, `scale3d(1, 1, 1) translate3d(${~~((this.device.width - e) / 2 - n.left)}px, ${~~((this.device.height - r) / 2 - n.top)}px, 0)`], fg(this.img, {
                            left: ~~n.left + "px",
                            top: ~~n.top + "px",
                            [dg("transform", !0)]: this.transforms[t ? 1 : 0]
                        })
                    })
                }

                detatch() {
                    if (this.busy) return;
                    this.busy = !0;
                    const t = this.container.scrollTop, e = 4 * (t > 100 ? 100 : ~~t);
                    ig(this.container, "scrollTop", {from: t, to: 0, duration: e > 1e3 ? 1e3 : e}, () => {
                        fg(this.img, {[dg("transform", !0)]: this.transforms[0]}), this.container.classList.remove("\u03c6d"), ag(this.img, () => {
                            this.target.style.opacity = "", this.app.root.removeChild(this.container), this.container.removeChild(this.img), this.img = this.target = this.transforms = null, this.busy = !1, this.resizeSub.unsubscribe()
                        })
                    })
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(_o(wg), _o(vg), _o(yg), _o(da))
            }, t.\u0275dir = Gt({
                type: t, selectors: [["", "isZoomable", ""]], hostBindings: function (t, e) {
                    1 & t && Lo("click", function (t) {
                        return e.onTap(t.target)
                    })
                }
            }), t
        })();

        function Cm(t, e) {
            1 & t && ko(0, "div", 2), 2 & t && wo("innerHTML", Do().meta.custom, Yr)
        }

        function Sm(t, e) {
            if (1 & t && (So(0, "li", 5), So(1, "strong", 6), Bo(2), pc(3, "i18n"), So(4, "span"), Bo(5, ":"), xo(), xo(), ko(6, "p", 7), xo()), 2 & t) {
                const t = e.$implicit;
                Ws(2), Wo(gc(3, 2, "post.copyright." + t.key)), Ws(4), wo("innerHTML", t.value, Yr)
            }
        }

        function xm(t, e) {
            if (1 & t && (So(0, "ul", 3), bo(1, Sm, 7, 4, "li", 4), pc(2, "keyvalue"), xo()), 2 & t) {
                const t = Do();
                Ws(1), wo("ngForOf", gc(2, 1, t.meta))
            }
        }

        let km = (() => {
            class t {
            }

            return t.\u0275fac = function (e) {
                return new (e || t)
            }, t.\u0275cmp = $t({
                type: t,
                selectors: [["is-e"]],
                hostAttrs: [1, "\u03c6u"],
                inputs: {meta: "meta"},
                decls: 2,
                vars: 2,
                consts: [[3, "innerHTML", 4, "ngIf"], ["class", "\u03c6y", 4, "ngIf"], [3, "innerHTML"], [1, "\u03c6y"], ["class", "\u03c6w", 4, "ngFor", "ngForOf"], [1, "\u03c6w"], [1, "\u03c6x"], [1, "\u03c6v", 3, "innerHTML"]],
                template: function (t, e) {
                    1 & t && (bo(0, Cm, 1, 1, "div", 0), bo(1, xm, 3, 3, "ul", 1)), 2 & t && (wo("ngIf", e.meta && e.meta.custom), Ws(1), wo("ngIf", e.meta && !e.meta.custom))
                },
                directives: [lu, au],
                pipes: [vu, Pg],
                encapsulation: 2,
                changeDetection: 0
            }), t
        })();
        const Tm = function (t) {
            return {"\u03c6bo": t}
        }, Im = function (t, e) {
            return {padding: t, width: e}
        };

        function Em(t, e) {
            if (1 & t && ko(0, "span", 2), 2 & t) {
                const t = Do();
                wo("ngClass", cc(2, Tm, 0 === t.state))("ngStyle", lc(4, Im, (50 * t.ratio).toFixed(3) + "% 0", t.width + "px"))
            }
        }

        const Om = function (t) {
            return {display: t}
        };
        let Am = (() => {
            class t {
                constructor() {
                    this.ratio = .625, this.state = -1
                }

                ngOnChanges(t) {
                    t.src && (this.state = -1)
                }

                onLoad({target: t}) {
                    this.ratio = t.height / t.width, this.width = t.width, this.state = 1
                }

                onError() {
                    this.state = 0
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)
            }, t.\u0275cmp = $t({
                type: t,
                selectors: [["is-g"]],
                hostAttrs: [1, "\u03c6bk"],
                inputs: {src: "src", ratio: "ratio", alt: "alt"},
                features: [ae],
                decls: 2,
                vars: 6,
                consts: [["class", "\u03c6bn", 3, "ngClass", "ngStyle", 4, "ngIf"], [1, "\u03c6bm", 3, "ngStyle", "src", "alt", "load", "error"], [1, "\u03c6bn", 3, "ngClass", "ngStyle"]],
                template: function (t, e) {
                    1 & t && (bo(0, Em, 1, 7, "span", 0), So(1, "img", 1), Lo("load", function (t) {
                        return e.onLoad(t)
                    })("error", function () {
                        return e.onError()
                    }), xo()), 2 & t && (wo("ngIf", 1 !== e.state), Ws(1), Mo("src", e.src, Jr), Mo("alt", e.alt), wo("ngStyle", cc(4, Om, 1 === e.state ? "" : "none")))
                },
                directives: [lu, du, iu],
                encapsulation: 2,
                changeDetection: 0
            }), t
        })();
        const Rm = function (t) {
            return {color: t}
        };

        function Lm(t, e) {
            if (1 & t) {
                const t = Eo();
                So(0, "a", 6), Lo("click", function () {
                    const e = Le(t).$implicit;
                    return Do().onClick(e)
                }), Bo(1), pc(2, "i18n"), xo()
            }
            if (2 & t) {
                const t = e.$implicit, n = Do();
                wo("ngClass", t.icon ? "\u03c6a i\u03ba-" + t.icon : "")("ngStyle", cc(5, Rm, t.index === n.select.index && t.color ? t.color : "")), Ws(1), Wo(t.icon ? "" : gc(2, 3, "reward." + t.name))
            }
        }

        function Pm(t, e) {
            1 & t && ko(0, "is-g", 10), 2 & t && Mo("src", Do(2).select.qrcode)
        }

        function jm(t, e) {
            if (1 & t && (So(0, "a", 12), pc(1, "unsafe"), Bo(2), ko(3, "span", 13), xo()), 2 & t) {
                const t = Do(3);
                wo("href", mc(1, 2, t.select.url, "url"), Jr), Ws(2), Go("", t.select.text || t.select.url, " ")
            }
        }

        function Dm(t, e) {
            if (1 & t && (To(0), Bo(1), Io()), 2 & t) {
                const t = Do(3);
                Ws(1), Wo(t.select.text)
            }
        }

        function Mm(t, e) {
            if (1 & t && (So(0, "div"), bo(1, jm, 4, 5, "a", 11), bo(2, Dm, 2, 1, "ng-container", 9), xo()), 2 & t) {
                const t = Do(2);
                Ws(1), wo("ngIf", t.select.url), Ws(1), wo("ngIf", !t.select.url)
            }
        }

        function Nm(t, e) {
            if (1 & t && (So(0, "div", 7), bo(1, Pm, 1, 1, "is-g", 8), bo(2, Mm, 3, 2, "div", 9), xo()), 2 & t) {
                const t = Do();
                Ws(1), wo("ngIf", t.select.qrcode), Ws(1), wo("ngIf", t.select.url || t.select.text)
            }
        }

        let Hm = (() => {
            class t {
                constructor(t, e, n) {
                    this.cd = t, this.router = e, this.select = {}, this.text = n.config.reward.text, this.methods = n.config.reward.methods.map((t, e) => (~["wechat", "paypal", "bitcoin"].indexOf(t.name) && (t.icon = t.name), t.index = e, t)), this.onClick = lg(this.onClick.bind(this), 100)
                }

                ngOnInit() {
                    this.routerSub = this.router.events.subscribe(() => {
                        this.select = {}, this.cd.detectChanges()
                    })
                }

                ngOnDestroy() {
                    this.routerSub.unsubscribe()
                }

                onClick(t) {
                    this.busy || (this.select = this.select.index === t.index ? {} : t, this.cd.detectChanges())
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(_o(Da), _o(Ep), _o(yg))
            }, t.\u0275cmp = $t({
                type: t,
                selectors: [["is-j"]],
                hostAttrs: [1, "\u03c6cm"],
                decls: 7,
                vars: 3,
                consts: [[1, "\u03c6cr"], [1, "\u03c6co"], [1, "\u03c6ct"], ["class", "\u03c6cs", 3, "ngClass", "ngStyle", "click", 4, "ngFor", "ngForOf"], [1, "\u03c6cq"], ["class", "\u03c6cp", 4, "ngIf"], [1, "\u03c6cs", 3, "ngClass", "ngStyle", "click"], [1, "\u03c6cp"], [3, "src", 4, "ngIf"], [4, "ngIf"], [3, "src"], ["target", "_blank", "rel", "external nofollow noopener", 3, "href", 4, "ngIf"], ["target", "_blank", "rel", "external nofollow noopener", 3, "href"], [1, "\u03c6a", "i\u03ba-external"]],
                template: function (t, e) {
                    1 & t && (So(0, "p", 0), Bo(1), xo(), So(2, "div", 1), So(3, "div", 2), bo(4, Lm, 3, 7, "a", 3), xo(), So(5, "div", 4), bo(6, Nm, 3, 2, "div", 5), xo(), xo()), 2 & t && (Ws(1), Wo(e.text), Ws(3), wo("ngForOf", e.methods), Ws(2), wo("ngIf", e.select.name))
                },
                directives: [au, lu, iu, du, Am],
                pipes: [Pg, Lg],
                encapsulation: 2,
                changeDetection: 0
            }), t
        })();

        function Fm(t, e) {
            1 & t && (ko(0, "div", 1), pc(1, "unsafe")), 2 & t && wo("innerHTML", gc(1, 1, e.$implicit), Yr)
        }

        let Um = (() => {
            class t {
                constructor(t) {
                    this.app = t, this.plugins = this.app.getPlugins("comments")
                }

                ngOnChanges({page: {currentValue: t}}) {
                    this.app.config.ssr || document.dispatchEvent(new CustomEvent("inside", {
                        detail: {
                            type: "route",
                            data: Object.assign({}, t)
                        }
                    }))
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(_o(yg))
            }, t.\u0275cmp = $t({
                type: t,
                selectors: [["is-d"]],
                hostAttrs: [1, "\u03c6t"],
                inputs: {page: "page"},
                features: [ae],
                decls: 1,
                vars: 1,
                consts: [["isSnippet", "", 3, "innerHTML", 4, "ngFor", "ngForOf"], ["isSnippet", "", 3, "innerHTML"]],
                template: function (t, e) {
                    1 & t && bo(0, Fm, 2, 3, "div", 0), 2 & t && wo("ngForOf", e.plugins)
                },
                directives: [au, Rg],
                pipes: [Lg],
                encapsulation: 2,
                changeDetection: 0
            }), t
        })();

        function $m(t, e) {
            if (1 & t && (So(0, "div", 8), Bo(1), xo()), 2 & t) {
                const t = Do().ngIf;
                Ws(1), Wo(t.page.date_formatted.ll)
            }
        }

        function Vm(t, e) {
            1 & t && ko(0, "is-e", 9), 2 & t && wo("meta", Do().ngIf.page.copyright)
        }

        function zm(t, e) {
            1 & t && ko(0, "is-j")
        }

        function qm(t, e) {
            1 & t && (ko(0, "div", 11), pc(1, "unsafe")), 2 & t && wo("innerHTML", gc(1, 1, e.$implicit), Yr)
        }

        function Bm(t, e) {
            if (1 & t && (So(0, "div"), bo(1, qm, 2, 3, "div", 10), xo()), 2 & t) {
                const t = Do(2);
                Ws(1), wo("ngForOf", t.plugins)
            }
        }

        const Wm = function (t, e, n) {
            return {id: t, url: e, title: n}
        };

        function Gm(t, e) {
            if (1 & t && ko(0, "is-d", 12), 2 & t) {
                const t = Do().ngIf;
                wo("page", (1, n = Wm, r = t.page.link, s = t.page.plink, i = t.page.title, fc(Ae(), Ue(), 1, n, r, s, i, undefined)))
            }
            var n, r, s, i
        }

        const Zm = function (t) {
            return {"\u03c6f": t}
        };

        function Qm(t, e) {
            if (1 & t && (To(0), So(1, "header", 1), So(2, "h1", 2), Bo(3), xo(), bo(4, $m, 2, 1, "div", 3), xo(), So(5, "article", 4), ko(6, "div", 5), pc(7, "unsafe"), bo(8, Vm, 1, 1, "is-e", 6), bo(9, zm, 1, 0, "is-j", 0), bo(10, Bm, 2, 1, "div", 0), xo(), bo(11, Gm, 1, 5, "is-d", 7), Io()), 2 & t) {
                const t = e.ngIf, n = Do();
                Ws(3), Wo(t.page.title), Ws(1), wo("ngIf", t.page.meta), Ws(1), yo("data-title", t.page.title), Ws(1), wo("innerHTML", gc(7, 9, t.page.content), Yr)("ngClass", cc(11, Zm, t.page.dropcap)), Ws(2), wo("ngIf", t.page.copyright), Ws(1), wo("ngIf", t.page.reward), Ws(1), wo("ngIf", n.plugins), Ws(1), wo("ngIf", t.page.comments)
            }
        }

        let Km = (() => {
            class t extends _m {
            }

            return t.\u0275fac = function () {
                let e;
                return function (n) {
                    return (e || (e = Un(t)))(n || t)
                }
            }(), t.\u0275cmp = $t({
                type: t,
                selectors: [["is-q"]],
                hostAttrs: [1, "\u03c6eo"],
                features: [ro],
                decls: 2,
                vars: 3,
                consts: [[4, "ngIf"], [1, "\u03c6eq"], [1, "\u03c6es"], ["class", "\u03c6er", 4, "ngIf"], ["itemscope", "", "itemtype", "http://schema.org/Article", 1, "\u03c6ep"], ["itemprop", "articleBody", "isSnippet", "", "isZoomable", "", 1, "\u03c6e", 3, "innerHTML", "ngClass"], [3, "meta", 4, "ngIf"], [3, "page", 4, "ngIf"], [1, "\u03c6er"], [3, "meta"], ["class", "\u03c6b", "isSnippet", "", 3, "innerHTML", 4, "ngFor", "ngForOf"], ["isSnippet", "", 1, "\u03c6b", 3, "innerHTML"], [3, "page"]],
                template: function (t, e) {
                    1 & t && (bo(0, Qm, 12, 13, "ng-container", 0), pc(1, "async")), 2 & t && wo("ngIf", gc(1, 1, e.data$))
                },
                directives: [lu, Rg, wm, iu, km, Hm, au, Um],
                pipes: [yu, Lg],
                encapsulation: 2
            }), t
        })(), Ym = (() => {
            class t {
                constructor(t) {
                    this.element = t
                }

                ngOnInit() {
                    let t = .9 + .1 * this.count;
                    t = t > 4 ? 4 : t, this.element.nativeElement.style.fontSize = t + "rem"
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(_o(la))
            }, t.\u0275cmp = $t({
                type: t,
                selectors: [["is-l"]],
                hostAttrs: [1, "\u03c6do"],
                inputs: {name: "name", count: "count"},
                decls: 2,
                vars: 2,
                consts: [[1, "\u03c6dp", 3, "routerLink"]],
                template: function (t, e) {
                    1 & t && (So(0, "a", 0), Bo(1), xo()), 2 & t && (No("routerLink", "/tags/", e.name, ""), Ws(1), Wo(e.name))
                },
                directives: [Ap],
                encapsulation: 2,
                changeDetection: 0
            }), t
        })();

        function Jm(t, e) {
            if (1 & t && (So(0, "h1", 17), Bo(1), xo()), 2 & t) {
                const t = Do().ngIf;
                Ws(1), Wo(t.post.title)
            }
        }

        function Xm(t, e) {
            if (1 & t && (So(0, "a", 18), Bo(1), xo()), 2 & t) {
                const t = Do().ngIf;
                No("routerLink", "/categories/", t.post.categories[0], ""), Ws(1), Wo(t.post.categories[0])
            }
        }

        function ty(t, e) {
            if (1 & t && (So(0, "span", 19), Bo(1), xo()), 2 & t) {
                const t = Do().ngIf;
                Ws(1), Wo(t.post.reading_time)
            }
        }

        function ey(t, e) {
            if (1 & t && (So(0, "span", 20), Bo(1), xo()), 2 & t) {
                const t = Do().ngIf, e = Do();
                Ws(1), Wo(t.post.pv || e.pv[t.post.link])
            }
        }

        function ny(t, e) {
            1 & t && ko(0, "hr", 21)
        }

        function ry(t, e) {
            if (1 & t && (So(0, "h1", 17), Bo(1), xo()), 2 & t) {
                const t = Do().ngIf;
                Ws(1), Wo(t.post.title)
            }
        }

        function sy(t, e) {
            1 & t && ko(0, "is-e", 22), 2 & t && wo("meta", Do().ngIf.post.copyright)
        }

        function iy(t, e) {
            1 & t && ko(0, "is-j")
        }

        function oy(t, e) {
            1 & t && (ko(0, "div", 24), pc(1, "unsafe")), 2 & t && wo("innerHTML", gc(1, 1, e.$implicit), Yr)
        }

        function ay(t, e) {
            if (1 & t && (So(0, "div"), bo(1, oy, 2, 3, "div", 23), xo()), 2 & t) {
                const t = Do(2);
                Ws(1), wo("ngForOf", t.plugins)
            }
        }

        function cy(t, e) {
            1 & t && ko(0, "is-l", 27), 2 & t && Mo("name", e.$implicit)
        }

        function ly(t, e) {
            if (1 & t && (So(0, "div", 25), bo(1, cy, 1, 1, "is-l", 26), xo()), 2 & t) {
                const t = Do().ngIf;
                Ws(1), wo("ngForOf", t.post.tags)
            }
        }

        function uy(t, e) {
            if (1 & t && (So(0, "a", 31), Bo(1), xo()), 2 & t) {
                const t = Do(2).ngIf;
                No("routerLink", "/", t.post.prev.link, ""), Ws(1), Wo(t.post.prev.title)
            }
        }

        function hy(t, e) {
            if (1 & t && (So(0, "a", 32), Bo(1), xo()), 2 & t) {
                const t = Do(2).ngIf;
                No("routerLink", "/", t.post.next.link, ""), Ws(1), Wo(t.post.next.title)
            }
        }

        function dy(t, e) {
            if (1 & t && (So(0, "div", 28), bo(1, uy, 2, 2, "a", 29), bo(2, hy, 2, 2, "a", 30), xo()), 2 & t) {
                const t = Do().ngIf;
                Ws(1), wo("ngIf", t.post.prev), Ws(1), wo("ngIf", t.post.next)
            }
        }

        const fy = function (t, e, n, r) {
            return {id: t, url: e, title: n, thumbnail: r}
        };

        function py(t, e) {
            if (1 & t && ko(0, "is-d", 33), 2 & t) {
                const t = Do().ngIf;
                wo("page", (n = 1, r = fy, s = t.post.link, i = t.post.plink, o = t.post.title, a = t.post.thumbnail, function (t, e, n, r, s, i, o, a, c) {
                    const l = e + n;
                    return function (t, e, n, r, s, i) {
                        const o = mo(t, e, n, r);
                        return mo(t, e + 2, s, i) || o
                    }(t, l, s, i, o, a) ? po(t, l + 4, c ? r.call(c, s, i, o, a) : r(s, i, o, a)) : uc(t, l + 4)
                }(Ae(), Ue(), n, r, s, i, o, a, c)))
            }
            var n, r, s, i, o, a, c
        }

        const gy = function (t, e) {
            return {"\u03c6fn": t, "\u03c6fe": e}
        }, my = function (t, e) {
            return {backgroundImage: t, backgroundColor: e}
        }, yy = function (t) {
            return {"\u03c6f": t}
        };

        function vy(t, e) {
            if (1 & t && (To(0), So(1, "header", 1), So(2, "div", 2), bo(3, Jm, 2, 1, "h1", 3), So(4, "p", 4), So(5, "span", 5), Bo(6), xo(), bo(7, Xm, 2, 2, "a", 6), bo(8, ty, 2, 1, "span", 7), bo(9, ey, 2, 1, "span", 8), xo(), bo(10, ny, 1, 0, "hr", 9), bo(11, ry, 2, 1, "h1", 3), xo(), xo(), So(12, "article", 10), ko(13, "div", 11), pc(14, "unsafe"), bo(15, sy, 1, 1, "is-e", 12), bo(16, iy, 1, 0, "is-j", 0), bo(17, ay, 2, 1, "div", 0), xo(), So(18, "footer", 13), bo(19, ly, 2, 1, "div", 14), bo(20, dy, 3, 2, "div", 15), xo(), bo(21, py, 1, 6, "is-d", 16), Io()), 2 & t) {
                const t = e.ngIf, n = Do();
                Ws(1), wo("ngClass", lc(20, gy, t.post.thumbnail, !t.post.thumbnail))("ngStyle", lc(23, my, t.post.thumbnail && "url(" + t.post.thumbnail + ")", t.post.color)), Ws(2), wo("ngIf", !t.post.thumbnail), Ws(3), Wo(t.post.date_formatted.ll), Ws(1), wo("ngIf", t.post.categories), Ws(1), wo("ngIf", t.post.reading_time), Ws(1), wo("ngIf", t.post.pv || n.pv[t.post.link]), Ws(1), wo("ngIf", t.post.thumbnail), Ws(1), wo("ngIf", t.post.thumbnail), Ws(1), yo("data-title", t.post.title), Ws(1), wo("innerHTML", gc(14, 18, t.post.content), Yr)("ngClass", cc(26, yy, t.post.dropcap)), Ws(2), wo("ngIf", t.post.copyright), Ws(1), wo("ngIf", t.post.reward), Ws(1), wo("ngIf", n.plugins), Ws(2), wo("ngIf", t.post.tags && t.post.tags.length), Ws(1), wo("ngIf", t.post.prev || t.post.next), Ws(1), wo("ngIf", t.post.comments)
            }
        }

        let by = (() => {
            class t extends _m {
            }

            return t.\u0275fac = function () {
                let e;
                return function (n) {
                    return (e || (e = Un(t)))(n || t)
                }
            }(), t.\u0275cmp = $t({
                type: t,
                selectors: [["is-r"]],
                hostAttrs: [1, "\u03c6et"],
                features: [ro],
                decls: 2,
                vars: 3,
                consts: [[4, "ngIf"], [1, "\u03c6fd", 3, "ngClass", "ngStyle"], [1, "\u03c6fm"], ["class", "\u03c6fp", 4, "ngIf"], [1, "\u03c6ff"], [1, "\u03c6fg", "\u03c6fk"], ["class", "\u03c6fg \u03c6fi", 3, "routerLink", 4, "ngIf"], ["class", "\u03c6fg \u03c6fj", 4, "ngIf"], ["class", "\u03c6fg \u03c6fl", 4, "ngIf"], ["class", "\u03c6fo", 4, "ngIf"], ["itemscope", "", "itemtype", "http://schema.org/Article", 1, "\u03c6ew"], ["itemprop", "articleBody", "isSnippet", "", "isZoomable", "", 1, "\u03c6e", 3, "innerHTML", "ngClass"], [3, "meta", 4, "ngIf"], [1, "\u03c6ex"], ["class", "\u03c6fc", 4, "ngIf"], ["class", "\u03c6ey", 4, "ngIf"], [3, "page", 4, "ngIf"], [1, "\u03c6fp"], [1, "\u03c6fg", "\u03c6fi", 3, "routerLink"], [1, "\u03c6fg", "\u03c6fj"], [1, "\u03c6fg", "\u03c6fl"], [1, "\u03c6fo"], [3, "meta"], ["class", "\u03c6b", "isSnippet", "", 3, "innerHTML", 4, "ngFor", "ngForOf"], ["isSnippet", "", 1, "\u03c6b", 3, "innerHTML"], [1, "\u03c6fc"], [3, "name", 4, "ngFor", "ngForOf"], [3, "name"], [1, "\u03c6ey"], ["class", "\u03c6ez \u03c6fb", 3, "routerLink", 4, "ngIf"], ["class", "\u03c6ez \u03c6fa", 3, "routerLink", 4, "ngIf"], [1, "\u03c6ez", "\u03c6fb", 3, "routerLink"], [1, "\u03c6ez", "\u03c6fa", 3, "routerLink"], [3, "page"]],
                template: function (t, e) {
                    1 & t && (bo(0, vy, 22, 28, "ng-container", 0), pc(1, "async")), 2 & t && wo("ngIf", gc(1, 1, e.data$))
                },
                directives: [lu, iu, du, Rg, wm, Ap, km, Hm, au, Ym, Um],
                pipes: [yu, Lg],
                encapsulation: 2
            }), t
        })();

        class _y {
            constructor(t, e) {
                this.config = t, this.http = e, this.perPage = t.per_page
            }
        }

        class wy extends _y {
            constructor(t, e) {
                super(t, e), this.cache = {}
            }

            query(t, e) {
                if (this.cache[t] && this.cache[t][e || 1]) return Promise.resolve(this.cache[t][e || 1]);
                const n = Object.assign({}, this.config.request);
                n.body = n.body.replace(/:query/g, t).replace(/:per_page/g, this.perPage + "").replace(/:current/g, void 0 === e ? "" : e - this.pageOffset), n.method && "get" !== n.method.toLowerCase() || (n.url.split("?")[1] ? n.url += "&" + n.body : n.url += "?" + n.body, delete n.body);
                const r = Date.now();
                return this.http.request(n).then(e => {
                    const {keys: n} = this.config;
                    let s = gg(e, n.data), i = gg(e, n.current), o = gg(e, n.total), a = gg(e, n.hits),
                        c = gg(e, n.time);
                    void 0 === c && (c = Date.now() - r), s && Array.isArray(s) || (s = [], a = 0), "number" == typeof a && a || (a = s.length), "number" != typeof i ? i = 1 : void 0 === this.pageOffset && (this.pageOffset = 1 ^ i), "number" != typeof o && (o = s.length ? a ? Math.ceil(a / this.perPage) : 1 : 0), (n.title || n.content) && (s = s.map(t => {
                        const e = gg(t, n.title), r = gg(t, n.content);
                        return e && (t.title = e), r && (t.content = r), t
                    }));
                    const l = {current: i + this.pageOffset, data: s, hits: a, time: c, total: o};
                    return (this.cache[t] || (this.cache[t] = {}))[l.current] = l, l
                })
            }
        }

        let Cy = (() => {
            class t extends _y {
                query(t, e) {
                    return (this.entries ? Promise.resolve(this.entries) : this.http.get("search").then(t => this.entries = t)).then(n => {
                        if (this.keyword && t === this.keyword) return this.page(e);
                        const r = [], s = Date.now();
                        return n.forEach(e => {
                            const n = this.match(e.title, t), s = this.match(e.content, t);
                            (n || s) && r.push(Object.assign(Object.assign({}, e), {title: n || e.title, content: s}))
                        }), this.keyword = t, this.hits = r, this.total = Math.ceil(this.hits.length / this.perPage), this.time = Date.now() - s, this.page()
                    })
                }

                page(t = 1) {
                    return {
                        current: t,
                        total: this.total,
                        per_page: this.perPage,
                        hits: this.hits.length,
                        time: this.time,
                        data: this.hits.slice(this.perPage * (t - 1), this.perPage * t)
                    }
                }

                match(t, e) {
                    if (!e) return;
                    const n = t.toLowerCase(), r = e.toLowerCase().split(" "), s = r.map(t => n.indexOf(t));
                    if (s.filter(t => !~t).length) return;
                    const i = [], o = s.sort()[0], a = t.length > 100 && o > 20 ? o - 20 : 0, c = a + 100;
                    t = t.substring(a, c), n.substring(a, c).replace(new RegExp(r.join("|"), "g"), (t, e) => (i.push([e, t.length]), ""));
                    let l = "", u = 0;
                    return i.forEach(([e, n]) => {
                        l += t.substring(u, e), u = e + n, l += `<em>${t.substring(e, u)}</em>`
                    }), l += t.substring(u, 100), l
                }
            }

            return t.\u0275fac = function () {
                let e;
                return function (n) {
                    return (e || (e = Un(t)))(n || t)
                }
            }(), t.\u0275prov = ut({
                token: t, factory: function (e) {
                    let n = null;
                    return n = e ? new e : ((e, n) => {
                        const r = n.config.search;
                        return r.local ? new t(r, e) : new wy(r, e)
                    })(cr(bg), cr(yg)), n
                }, providedIn: "root"
            }), t
        })();

        function Sy(t, e) {
            if (1 & t && ko(0, "a", 7), 2 & t) {
                const t = Do(2).$implicit;
                Mo("routerLink", Do().link(t.route))
            }
        }

        function xy(t, e) {
            if (1 & t && ko(0, "a", 8), 2 & t) {
                const t = Do(2).$implicit;
                Mo("routerLink", Do().link(t.route))
            }
        }

        function ky(t, e) {
            if (1 & t && (So(0, "a", 9), Bo(1), xo()), 2 & t) {
                const t = Do(2).$implicit;
                Mo("routerLink", Do().link(t.route)), Ws(1), Wo(t.text)
            }
        }

        function Ty(t, e) {
            if (1 & t && (To(0), bo(1, Sy, 1, 1, "a", 4), bo(2, xy, 1, 1, "a", 5), bo(3, ky, 2, 2, "a", 6), Io()), 2 & t) {
                const t = Do().$implicit;
                Ws(1), wo("ngIf", "prev" === t.type), Ws(1), wo("ngIf", "next" === t.type), Ws(1), wo("ngIf", !t.type)
            }
        }

        function Iy(t, e) {
            if (1 & t) {
                const t = Eo();
                So(0, "a", 13), Lo("click", function () {
                    Le(t);
                    const e = Do(2).$implicit;
                    return Do().page.emit(e.route)
                }), xo()
            }
        }

        function Ey(t, e) {
            if (1 & t) {
                const t = Eo();
                So(0, "a", 14), Lo("click", function () {
                    Le(t);
                    const e = Do(2).$implicit;
                    return Do().page.emit(e.route)
                }), xo()
            }
        }

        function Oy(t, e) {
            if (1 & t) {
                const t = Eo();
                So(0, "a", 15), Lo("click", function () {
                    Le(t);
                    const e = Do(2).$implicit;
                    return Do().page.emit(e.route)
                }), Bo(1), xo()
            }
            if (2 & t) {
                const t = Do(2).$implicit;
                Ws(1), Wo(t.text)
            }
        }

        function Ay(t, e) {
            if (1 & t && (To(0), bo(1, Iy, 1, 0, "a", 10), bo(2, Ey, 1, 0, "a", 11), bo(3, Oy, 2, 1, "a", 12), Io()), 2 & t) {
                const t = Do().$implicit;
                Ws(1), wo("ngIf", "prev" === t.type), Ws(1), wo("ngIf", "next" === t.type), Ws(1), wo("ngIf", !t.type)
            }
        }

        function Ry(t, e) {
            if (1 & t && (So(0, "a", 16), Bo(1), xo()), 2 & t) {
                const t = Do().$implicit;
                Ws(1), Wo(t.text)
            }
        }

        function Ly(t, e) {
            1 & t && ko(0, "a", 17)
        }

        function Py(t, e) {
            if (1 & t && (To(0), bo(1, Ty, 4, 3, "ng-container", 1), bo(2, Ay, 4, 3, "ng-container", 1), bo(3, Ry, 2, 1, "a", 2), bo(4, Ly, 1, 0, "a", 3), Io()), 2 & t) {
                const t = e.$implicit, n = Do();
                Ws(1), wo("ngIf", n.url), Ws(1), wo("ngIf", !n.url), Ws(1), wo("ngIf", "active" === t.type), Ws(1), wo("ngIf", "dot" === t.type)
            }
        }

        let jy = (() => {
            class t {
                constructor() {
                    this.size = 0, this.count = 0, this.current = 0, this.url = "", this.indexUrl = "", this.page = new _c, this.items = []
                }

                ngOnInit() {
                    this.size = +this.size, this.count = +this.count, this.current = +this.current, this.url && ("/" !== this.url[0] && (this.url = "/" + this.url), void 0 === this.indexUrl && (this.indexUrl = this.url + "/1"), "/" !== this.indexUrl[0] && (this.indexUrl = "/" + this.indexUrl))
                }

                ngOnChanges() {
                    this.size = +this.size, this.count = +this.count, this.current = +this.current, this.makeItems()
                }

                makeItems() {
                    const t = [];
                    this.current > 1 && t.push({
                        route: this.current - 1,
                        type: "prev"
                    }), this.current > 1 && t.push({
                        route: 1,
                        text: 1
                    }), this.current > 3 && t.push({type: "dot"}), this.current - 2 > 0 && t.push({
                        route: this.current - 1,
                        text: this.current - 1
                    }), t.push({
                        text: this.current,
                        type: "active"
                    }), this.current < this.count - 1 && t.push({
                        route: this.current + 1,
                        text: this.current + 1
                    }), this.current < this.count - 2 && t.push({type: "dot"}), this.current < this.count && t.push({
                        route: this.count,
                        text: this.count
                    }), this.current < this.count && t.push({route: this.current + 1, type: "next"}), this.items = t
                }

                link(t) {
                    return 1 === t ? [this.indexUrl] : [this.url + "/" + t]
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)
            }, t.\u0275cmp = $t({
                type: t,
                selectors: [["is-h"]],
                hostAttrs: [1, "\u03c6by"],
                inputs: {size: "size", count: "count", current: "current", url: "url", indexUrl: "indexUrl"},
                outputs: {page: "page"},
                features: [ae],
                decls: 1,
                vars: 1,
                consts: [[4, "ngFor", "ngForOf"], [4, "ngIf"], ["class", "\u03c6bz \u03c6ca", 4, "ngIf"], ["class", "\u03c6bz \u03c6cb", 4, "ngIf"], ["class", "\u03c6bz \u03c6cd", 3, "routerLink", 4, "ngIf"], ["class", "\u03c6bz \u03c6cc", 3, "routerLink", 4, "ngIf"], ["class", "\u03c6bz", 3, "routerLink", 4, "ngIf"], [1, "\u03c6bz", "\u03c6cd", 3, "routerLink"], [1, "\u03c6bz", "\u03c6cc", 3, "routerLink"], [1, "\u03c6bz", 3, "routerLink"], ["class", "\u03c6bz \u03c6cd", 3, "click", 4, "ngIf"], ["class", "\u03c6bz \u03c6cc", 3, "click", 4, "ngIf"], ["class", "\u03c6bz", 3, "click", 4, "ngIf"], [1, "\u03c6bz", "\u03c6cd", 3, "click"], [1, "\u03c6bz", "\u03c6cc", 3, "click"], [1, "\u03c6bz", 3, "click"], [1, "\u03c6bz", "\u03c6ca"], [1, "\u03c6bz", "\u03c6cb"]],
                template: function (t, e) {
                    1 & t && bo(0, Py, 5, 4, "ng-container", 0), 2 & t && wo("ngForOf", e.items)
                },
                directives: [au, lu, Ap],
                encapsulation: 2,
                changeDetection: 0
            }), t
        })();
        const Dy = ["input"];

        function My(t, e) {
            if (1 & t) {
                const t = Eo();
                So(0, "a", 8), Lo("click", function () {
                    return Le(t), Do().exit.emit()
                }), xo()
            }
        }

        function Ny(t, e) {
            1 & t && ko(0, "img", 15), 2 & t && Mo("src", Do(2).config.logo, Jr)
        }

        const Hy = function (t, e) {
            return {backgroundImage: t, backgroundColor: e}
        };

        function Fy(t, e) {
            if (1 & t && ko(0, "div", 23), 2 & t) {
                const t = Do().$implicit;
                wo("ngStyle", lc(1, Hy, t.thumbnail && "url(" + t.thumbnail + ")", t.color))
            }
        }

        function Uy(t, e) {
            1 & t && ko(0, "div", 24), 2 & t && wo("innerHTML", Do().$implicit.content, Yr)
        }

        function $y(t, e) {
            if (1 & t && (So(0, "div", 17), bo(1, Fy, 1, 4, "div", 18), So(2, "div", 19), ko(3, "a", 20), So(4, "span", 21), Bo(5), xo(), bo(6, Uy, 1, 1, "div", 22), xo(), xo()), 2 & t) {
                const t = e.$implicit;
                Ws(1), wo("ngIf", t.thumbnail), Ws(2), Mo("href", t.plink, Jr), wo("innerHTML", t.title, Yr), Ws(2), Wo(t.date_formatted.ll), Ws(1), wo("ngIf", t.content)
            }
        }

        function Vy(t, e) {
            if (1 & t && (To(0), bo(1, $y, 7, 5, "div", 16), Io()), 2 & t) {
                const t = Do(2);
                Ws(1), wo("ngForOf", t.res.data)
            }
        }

        function zy(t, e) {
            if (1 & t) {
                const t = Eo();
                So(0, "is-h", 25), Lo("page", function (e) {
                    return Le(t), Do(2).onQuery(e)
                }), xo()
            }
            if (2 & t) {
                const t = Do(2);
                wo("size", t.res.per_page)("count", t.res.total)("current", t.res.current)
            }
        }

        const qy = function (t) {
            return {"\u03c6fw": t}
        };

        function By(t, e) {
            if (1 & t && (So(0, "div", 9), So(1, "div", 10), So(2, "header", 11), Bo(3), pc(4, "i18n"), bo(5, Ny, 1, 1, "img", 12), xo(), bo(6, Vy, 2, 1, "ng-container", 13), xo(), bo(7, zy, 1, 3, "is-h", 14), xo()), 2 & t) {
                const t = Do();
                Ws(2), wo("ngClass", cc(9, qy, t.res.hits)), Ws(1), Go(" ", function (t, e, n, r, s) {
                    const i = Ae(), o = we(i, 24);
                    return vc(i, yc(i, 24) ? fc(i, Ue(), 5, o.transform, n, r, s, o) : o.transform(n, r, s))
                }(0, 0, "page.search.hits", t.res.hits, t.tiMap), ""), Ws(2), wo("ngIf", t.config.logo), Ws(1), wo("ngIf", t.res.hits), Ws(1), wo("ngIf", t.res.total > 1)
            }
        }

        const Wy = function (t) {
            return {"\u03c6gh": t}
        };
        let Gy = (() => {
            class t {
                constructor(t, e) {
                    this.search = t, this.exit = new _c, this.onSearch = lg(this.onSearch.bind(this), 500), this.config = e.config.search
                }

                onSearch(t) {
                    this.keyword = t.trim(), this.res = null, this.keyword && this.onQuery()
                }

                onQuery(t) {
                    this.search.query(this.keyword, t).then(t => {
                        this.res = t, this.tiMap = {time: t.time, hits: t.hits, query: this.keyword}
                    })
                }

                ngOnInit() {
                    this.fixed && this.inputRef.nativeElement.focus()
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(_o(Cy), _o(yg))
            }, t.\u0275cmp = $t({
                type: t,
                selectors: [["is-t"]],
                viewQuery: function (t, e) {
                    if (1 & t && Pc(Dy, 7), 2 & t) {
                        let t;
                        Lc(t = Dc()) && (e.inputRef = t.first)
                    }
                },
                hostAttrs: [1, "\u03c6fq"],
                hostVars: 2,
                hostBindings: function (t, e) {
                    2 & t && Uo("\u03c6fr", e.fixed)
                },
                inputs: {fixed: "fixed"},
                outputs: {exit: "exit"},
                decls: 9,
                vars: 8,
                consts: [[1, "\u03c6gj", 3, "click"], [1, "\u03c6gg", 3, "ngClass"], [1, "\u03c6gd"], ["spellcheck", "false", "maxlength", "30", 1, "\u03c6gf", 3, "placeholder", "input"], ["input", ""], [1, "\u03c6ge", "\u03c6a", "i\u03ba-search"], ["class", "\u03c6gi \u03c6a i\u03ba-exit", 3, "click", 4, "ngIf"], ["class", "\u03c6gk", 4, "ngIf"], [1, "\u03c6gi", "\u03c6a", "i\u03ba-exit", 3, "click"], [1, "\u03c6gk"], [1, "\u03c6ft"], [1, "\u03c6fv", 3, "ngClass"], ["class", "\u03c6fu", 3, "src", 4, "ngIf"], [4, "ngIf"], [3, "size", "count", "current", "page", 4, "ngIf"], [1, "\u03c6fu", 3, "src"], ["class", "\u03c6fx", 4, "ngFor", "ngForOf"], [1, "\u03c6fx"], ["class", "\u03c6gb", 3, "ngStyle", 4, "ngIf"], [1, "\u03c6fy"], [1, "\u03c6gc", 3, "href", "innerHTML"], [1, "\u03c6ga"], ["class", "\u03c6e \u03c6fz", 3, "innerHTML", 4, "ngIf"], [1, "\u03c6gb", 3, "ngStyle"], [1, "\u03c6e", "\u03c6fz", 3, "innerHTML"], [3, "size", "count", "current", "page"]],
                template: function (t, e) {
                    1 & t && (So(0, "div", 0), Lo("click", function (t) {
                        return t.stopPropagation()
                    }), So(1, "div", 1), So(2, "label", 2), So(3, "input", 3, 4), Lo("input", function (t) {
                        return e.onSearch(t.target.value)
                    }), pc(5, "i18n"), xo(), ko(6, "i", 5), xo(), bo(7, My, 1, 0, "a", 6), xo(), bo(8, By, 8, 11, "div", 7), xo()), 2 & t && (Ws(1), wo("ngClass", cc(6, Wy, e.res)), Ws(2), Mo("placeholder", gc(5, 4, "page.search.placeholder")), Ws(4), wo("ngIf", e.fixed), Ws(1), wo("ngIf", e.res))
                },
                directives: [iu, lu, au, du, jy],
                pipes: [Pg],
                encapsulation: 2
            }), t
        })();
        const Zy = ["outer"], Qy = ["page"];

        function Ky(t, e) {
            if (1 & t) {
                const t = Eo();
                So(0, "div", 10), Lo("click", function () {
                    return Le(t), Do().onOverlay()
                }), xo()
            }
        }

        function Yy(t, e) {
            if (1 & t) {
                const t = Eo();
                So(0, "is-m", 11), Lo("action", function (e) {
                    return Le(t), Do().animateTo(e)
                }), xo()
            }
            if (2 & t) {
                const t = Do();
                wo("toc", t.tocData)("scrollTop", t.scrollTop)
            }
        }

        function Jy(t, e) {
            if (1 & t) {
                const t = Eo();
                So(0, "is-t", 12), Lo("click", function () {
                    return Le(t), Do().isSearchOpen = !1
                })("exit", function () {
                    return Le(t), Do().isSearchOpen = !1
                }), xo()
            }
            2 & t && Mo("fixed", !0)
        }

        const Xy = eg.loc.origin.length + 1;
        let tv = (() => {
            class t {
                constructor(t, e, n, r, s, i, o, a) {
                    this.app = t, this.route = e, this.router = n, this.meta = r, this.title = s, this.device = i, this.er = o, this.doc = a, this.isTocOpen = !1, this.isSidebarOpen = !1, this.isTouchable = !1, this.scrollPercent = 0, this.scrollTop = 0, this.isSearchOpen = !1, this.config = t.config;
                    const c = (this.config.routes.pages || []).map(t => ({
                        path: t,
                        component: Km,
                        resolve: {page: _g},
                        data: {id: "page"}
                    })), l = this.config.routes.posts.map(t => ({
                        path: t,
                        component: by,
                        resolve: {post: _g},
                        data: {id: "post"}
                    }));
                    let u = [];
                    this.config.count.tags < 1 && (u = ["tag", "tags"]), this.config.count.categories < 1 && u.push("categories"), this.config.search && this.config.search.page || u.push("search"), u.length && (this.router.config = this.router.config.filter(t => !t.data || -1 === u.indexOf(t.data.id))), this.router.resetConfig([...this.router.config, ...c, ...l, {
                        path: "**",
                        redirectTo: "404"
                    }])
                }

                ngOnInit() {
                    this.app.root = this.er.nativeElement, this.device.media.subscribe(t => {
                        this.screenType = t.type, this.pageHeight = this.pageRef.nativeElement.offsetHeight, this.sidebarWidth = this.sidebar.innerRef.nativeElement.offsetWidth, this.device.refreshScroll(), this.transformer = t.type === Jp.sm ? (t, e) => `translate3d(${t}px, 0, 0) scale3d(${e},${e},1)` : t.type === Jp.md ? t => `translate3d(${t}px, 0, 0)` : () => "", t.type === Jp.lg ? (this.isSidebarOpen && this.toggleSb(!0), this.sidebar.er.nativeElement.style.opacity = "") : (this.transformer && this.isSidebarOpen && this.toggleSb(!0), this.isTouchable || this.initTouch())
                    }), this.device.initScroll(this.pageRef.nativeElement), this.device.scroll.subscribe(({scrollTop: t}) => {
                        if (this.scrollTop = t, "post" === this.currentId || "page" === this.currentId) {
                            let e = t / (this.pageRef.nativeElement.scrollHeight - this.pageHeight);
                            e < 0 && (e = 0), e > 1 && (e = 1), this.scrollPercent = Math.round(100 * e)
                        } else this.scrollPercent = 0;
                        this.isTocOpen && this.tocData && this.toc && this.toc.syncPosition(), "home" === this.currentId && (this.indexScrollTop = t)
                    }), this.router.events.pipe(Eh(t => t instanceof Xh)).subscribe(() => {
                        this.screenType !== Jp.lg && this.isSidebarOpen && this.toggleSb(), this.isTocOpen && this.toggleToc(), this.device.refreshScroll();
                        const t = this.route.snapshot.children[0].children.length ? this.route.snapshot.children[0].children[0].data : this.route.snapshot.children[0].data;
                        if (this.currentId = t.id, "home" === this.currentId) setTimeout(() => {
                            this.pageRef.nativeElement.scrollTop = this.indexScrollTop || 0
                        }, 0); else if ("post" === this.currentId || "page" === this.currentId) {
                            const e = this.route.fragment.value;
                            e ? setTimeout(() => {
                                const t = this.doc.getElementById(e);
                                t && t.scrollIntoView(!0)
                            }, 24) : this.pageRef.nativeElement.scrollTop = 0, setTimeout(() => {
                                const {link: e} = t[this.currentId],
                                    n = this.pageRef.nativeElement.querySelectorAll(".\u03c6ew a,.\u03c6ep a");
                                Array.from(n).forEach(t => {
                                    "#" === t.href[Xy] && (t.href = e + t.href.substring(Xy))
                                })
                            })
                        } else this.pageRef.nativeElement.scrollTop = 0;
                        var e;
                        this.tocData = t[this.currentId] && t[this.currentId].toc ? t[this.currentId].toc : null, this.setTitle(t), t.post && t.post.thumbnail ? t.post.color ? this.themeColor = this.setColor(t.post.color) : t.post.thumbnail && (e = t.post.thumbnail, rg[e] ? Promise.resolve(rg[e]) : new Promise((t, n) => {
                            const r = new Image;
                            r.crossOrigin = "anonymous", r.onload = () => {
                                const n = eg.doc.createElement("canvas").getContext("2d");
                                let s;
                                n.drawImage(r, 0, 0), s = n.getImageData(0, 0, 1, 1).data.slice(0, 3);
                                const i = s.reduce((t, e) => t + e);
                                let o = ng[1] - i;
                                o < 0 ? (o = Math.abs(o), o = Math.floor(o / 3), s = s.map(t => t - o)) : i < ng[0] && (s[0] = ng[0]), rg[e] = sg.apply(null, s), t(rg[e])
                            }, r.onerror = n, r.src = e
                        })).then(t => this.themeColor = this.setColor(t)).catch(() => this.setColor()) : this.themeColor = this.setColor()
                    })
                }

                initTouch() {
                    this.isTouchable = !0;
                    const t = function (t, e = {}) {
                        const n = new S;
                        let r, s, i = 0, o = 0, a = 0, c = 0, l = !1;
                        return e = Object.assign({scale: 1, hold: 5}, e), t.addEventListener("touchstart", t => {
                            const e = t.touches[0];
                            i = e.clientX, o = e.clientY, s = !0
                        }, {passive: !0}), t.addEventListener("touchmove", t => {
                            const h = t.touches[0];
                            r = i > h.clientX ? "left" : "right", a = Math.abs(i - h.clientX), c = Math.abs(o - h.clientY), c >= a || Math.abs(a) > e.hold && (l = !0, n.next({
                                start: i,
                                offset: u(a),
                                direction: r,
                                isStart: s,
                                isEnd: !1
                            }), s = !1)
                        }, {passive: !0}), t.addEventListener("touchend", () => {
                            l && n.next({
                                start: i,
                                offset: u(a),
                                direction: r,
                                isEnd: !0,
                                isStart: !1
                            }), l = !1, i = o = a = c = 0
                        }, {passive: !0}), n.asObservable();

                        function u(t) {
                            return Math.ceil((t + (t > 0 ? -e.hold : e.hold)) * e.scale)
                        }
                    }(this.pageRef.nativeElement, {scale: .382});
                    t.subscribe(t => {
                        const e = .06 * this.device.width, n = this.sidebarWidth, r = this.isSidebarOpen;
                        let s, i = t.offset;
                        this.isSidebarOpen && (i > n - 1 && (i = n - 1), i < 1 && (i = 1), s = ~~(n - i), t.isEnd ? i < e ? this.stepSb(r ? n : 0, 5 * e) : (this.stepSb(r ? 0 : n, s), this.isSidebarOpen = !this.isSidebarOpen) : this.stepSb(r ? n - i : i, 0))
                    }), t.subscribe(t => {
                        if (!this.tocData) return;
                        const e = .04 * this.device.width, n = this.toc.width, r = this.isTocOpen;
                        let s, i = t.offset;
                        !this.isTocOpen || this.isTransiting || this.isSidebarOpen || (i > n - 1 && (i = n - 1), i < 1 && (i = 1), s = ~~(n - i), t.isEnd ? i < e ? this.toc.step(r ? 0 : n, 5 * e) : (this.toc.step(r ? n : 0, s), this.isTocOpen = !this.isTocOpen, r || this.toc.syncPosition()) : this.toc.step(r ? i : n - i, 0))
                    })
                }

                stepSb(t, e) {
                    const n = this.outerRef.nativeElement, r = this.sidebar.er.nativeElement,
                        s = this.app.config.color[0] || this.config.color[0];
                    e > 0 ? (this.isTransiting = !0, this.isTocOpen && this.toggleToc(), n.classList.add("\u03c6k"), this.setColor(s), ag(n, () => {
                        0 === t && (n.classList.remove("\u03c6k"), this.setColor(this.themeColor)), n.style[dg("transitionDuration")] = n.style[dg("transitionProperty")] = "", r.style[dg("transitionDuration")] = r.style[dg("transitionProperty")] = "", this.isTransiting = !1
                    })) : this.isTransiting || (this.isTransiting = !0, n.classList.add("\u03c6k"), this.setColor(s)), n.style[dg("transitionProperty")] = dg("transform", !0) + ",border-radius", n.style[dg("transform")] = this.transformer(t, 1 - .14 * t / this.sidebarWidth), n.style[dg("transitionDuration")] = `${e}ms`, r.style.opacity = t / this.sidebarWidth, r.style[dg("transitionDuration")] = `${e}ms`
                }

                toggleSb(t) {
                    this.isTransiting || (this.isSidebarOpen || t ? (this.stepSb(0, ~~(1.5 * this.sidebarWidth)), this.isSidebarOpen = !1) : (this.stepSb(this.sidebarWidth, ~~(1.5 * this.sidebarWidth)), this.isSidebarOpen = !0, this.isSearchOpen = !1))
                }

                toggleToc(t) {
                    this.toc.busy || (this.isTocOpen || t ? (this.toc.step(this.toc.width, ~~(1.5 * this.toc.width)), this.isTocOpen = !1) : (this.toc.refresh(), this.toc.syncPosition(), this.toc.step(0, ~~(1.5 * this.toc.width)), this.isTocOpen = !0, this.isSearchOpen = !1))
                }

                toggleSearch(t) {
                    this.isSearchOpen = !t && !this.isSearchOpen
                }

                setTitle(t) {
                    const e = {
                        post: t => t.post.title,
                        page: t => t.page.title,
                        tags: () => this.app.i18n("title.tags"),
                        tag: t => this.app.i18n("title.tags") + " : " + t.tag.name,
                        categories: () => this.app.i18n("title.categories"),
                        category: t => this.app.i18n("title.categories") + " : " + t.category.name,
                        archives: () => this.app.i18n("title.archives"),
                        search: () => this.app.i18n("title.search"),
                        404: () => 404
                    }[t.id], n = e ? e(t) + " - " + this.config.title : this.config.title;
                    this.title.setTitle(n)
                }

                setColor(t) {
                    return this.meta.updateTag({
                        name: "theme-color",
                        content: t = t || this.app.config.color[1] || this.config.color[1] || ""
                    }), t
                }

                onFabAct(t) {
                    switch (t) {
                        case Og.toTop:
                            this.animateTo(0);
                            break;
                        case Og.toBottom:
                            this.animateTo(this.pageRef.nativeElement.scrollHeight - this.pageHeight);
                            break;
                        case Og.toggleSidebar:
                            this.toggleSb();
                            break;
                        case Og.toggleToc:
                            this.toggleToc();
                            break;
                        case Og.search:
                            this.toggleSearch()
                    }
                }

                animateTo(t) {
                    const e = this.scrollTop || 0, n = Math.abs(~~(.618 * (t - e) / 1));
                    ig(this.pageRef.nativeElement, "scrollTop", {from: e, to: t, duration: n > 618 ? 618 : n})
                }

                onOverlay() {
                    this.isSidebarOpen && this.toggleSb(), this.isTocOpen && this.toggleToc()
                }

                onkeyup(t, e) {
                    "Escape" !== t && 27 !== e || (this.isSearchOpen && this.toggleSearch(), this.isTocOpen && this.toggleToc(), this.isSidebarOpen && this.toggleSb())
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(_o(yg), _o(sf), _o(Ep), _o(sh), _o(ah), _o(wg), _o(la), _o(Hl))
            }, t.\u0275cmp = $t({
                type: t,
                selectors: [["is-a"]],
                viewQuery: function (t, e) {
                    if (1 & t && (Pc(bm, 5), Pc(im, 7), Pc(Zy, 7), Pc(Qy, 7)), 2 & t) {
                        let t;
                        Lc(t = Dc()) && (e.toc = t.first), Lc(t = Dc()) && (e.sidebar = t.first), Lc(t = Dc()) && (e.outerRef = t.first), Lc(t = Dc()) && (e.pageRef = t.first)
                    }
                },
                hostAttrs: [1, "\u03c6h"],
                hostBindings: function (t, e) {
                    1 & t && Lo("keyup", function (t) {
                        return e.onkeyup(t.key, t.which)
                    }, !1, as)
                },
                decls: 12,
                vars: 6,
                consts: [[1, "\u03c6j"], ["outer", ""], [1, "\u03c6i"], [1, "\u03c6n"], ["page", ""], [1, "\u03c6m"], ["class", "\u03c6l", 3, "click", 4, "ngIf"], [3, "progress", "toc", "search", "action"], [3, "toc", "scrollTop", "action", 4, "ngIf"], [3, "fixed", "click", "exit", 4, "ngIf"], [1, "\u03c6l", 3, "click"], [3, "toc", "scrollTop", "action"], [3, "fixed", "click", "exit"]],
                template: function (t, e) {
                    1 & t && (ko(0, "is-k"), So(1, "div", 0, 1), So(3, "div", 2), So(4, "div", 3, 4), So(6, "main", 5), ko(7, "router-outlet"), xo(), bo(8, Ky, 1, 0, "div", 6), xo(), xo(), xo(), So(9, "is-f", 7), Lo("action", function (t) {
                        return e.onFabAct(t)
                    }), xo(), bo(10, Yy, 1, 2, "is-m", 8), bo(11, Jy, 1, 1, "is-t", 9)), 2 & t && (Ws(8), wo("ngIf", e.isSidebarOpen || e.isSearchOpen), Ws(1), wo("progress", e.scrollPercent)("toc", !!e.tocData && !e.isSidebarOpen)("search", (null == e.config.search ? null : e.config.search.fab) && !e.isSidebarOpen && !e.isTocOpen), Ws(1), wo("ngIf", e.tocData), Ws(1), wo("ngIf", e.isSearchOpen))
                },
                directives: [im, Pp, lu, Ag, bm, Gy],
                encapsulation: 2
            }), t
        })();

        function ev(t, e) {
            if (1 & t && (So(0, "a", 1), So(1, "span", 2), Bo(2), xo(), So(3, "span", 3), Bo(4), xo(), xo()), 2 & t) {
                const t = e.$implicit, n = Do();
                No("routerLink", "/", t.link, ""), Ws(2), Wo(t.date_formatted[n.dateFormat] || t.date_formatted.L), Ws(2), Wo(t.title)
            }
        }

        let nv = (() => {
            class t {
            }

            return t.\u0275fac = function (e) {
                return new (e || t)
            }, t.\u0275cmp = $t({
                type: t,
                selectors: [["is-b"]],
                hostAttrs: [1, ""],
                inputs: {posts: "posts", dateFormat: "dateFormat"},
                decls: 1,
                vars: 1,
                consts: [["class", "\u03c6o", 3, "routerLink", 4, "ngFor", "ngForOf"], [1, "\u03c6o", 3, "routerLink"], [1, "\u03c6q"], [1, "\u03c6p"]],
                template: function (t, e) {
                    1 & t && bo(0, ev, 5, 3, "a", 0), 2 & t && wo("ngForOf", e.posts)
                },
                directives: [au, Ap],
                encapsulation: 2,
                changeDetection: 0
            }), t
        })();

        function rv(t, e) {
            if (1 & t && ko(0, "is-h", 3), 2 & t) {
                const t = Do();
                wo("size", t.categories.per_page)("count", t.categories.total)("current", t.categories.current)("url", "categories/" + t.categories.name)("indexUrl", "categories/" + t.categories.name)
            }
        }

        let sv = (() => {
            class t {
                constructor(t) {
                    this.route = t
                }

                ngOnInit() {
                    this.route.data.subscribe(t => this.categories = t.category)
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(_o(sf))
            }, t.\u0275cmp = $t({
                type: t,
                selectors: [["is-c"]],
                hostAttrs: [1, "\u03c6r"],
                decls: 3,
                vars: 2,
                consts: [[1, "\u03c6s"], [3, "posts"], [3, "size", "count", "current", "url", "indexUrl", 4, "ngIf"], [3, "size", "count", "current", "url", "indexUrl"]],
                template: function (t, e) {
                    1 & t && (So(0, "article", 0), ko(1, "is-b", 1), xo(), bo(2, rv, 1, 5, "is-h", 2)), 2 & t && (Ws(1), wo("posts", e.categories.data), Ws(1), wo("ngIf", e.categories.total > 1))
                },
                directives: [nv, lu, jy],
                encapsulation: 2
            }), t
        })();

        function iv(t, e) {
            if (1 & t && (So(0, "div", 7), So(1, "header", 8), Bo(2), xo(), ko(3, "is-b", 9), xo()), 2 & t) {
                const t = e.$implicit;
                Ws(2), Go(" ", t.month, " "), Ws(1), wo("posts", t.entries)
            }
        }

        function ov(t, e) {
            if (1 & t && (So(0, "section", 4), So(1, "h1", 5), Bo(2), xo(), bo(3, iv, 4, 2, "div", 6), xo()), 2 & t) {
                const t = e.$implicit;
                Ws(2), Wo(t.year), Ws(1), wo("ngForOf", t.months)
            }
        }

        function av(t, e) {
            if (1 & t && ko(0, "is-h", 10), 2 & t) {
                const t = Do().ngIf;
                wo("size", t.archives.per_page)("count", t.archives.total)("current", t.archives.current)
            }
        }

        function cv(t, e) {
            if (1 & t && (To(0), So(1, "article", 1), bo(2, ov, 4, 2, "section", 2), xo(), bo(3, av, 1, 3, "is-h", 3), Io()), 2 & t) {
                const t = e.ngIf;
                Ws(2), wo("ngForOf", t.archives.data), Ws(1), wo("ngIf", t.archives.total > 1)
            }
        }

        let lv = (() => {
            class t extends _m {
            }

            return t.\u0275fac = function () {
                let e;
                return function (n) {
                    return (e || (e = Un(t)))(n || t)
                }
            }(), t.\u0275cmp = $t({
                type: t,
                selectors: [["is-o"]],
                hostAttrs: [1, "\u03c6ec"],
                features: [ro],
                decls: 2,
                vars: 3,
                consts: [[4, "ngIf"], [1, "\u03c6ef"], ["class", "\u03c6eg", 4, "ngFor", "ngForOf"], ["url", "archives", "indexUrl", "archives", 3, "size", "count", "current", 4, "ngIf"], [1, "\u03c6eg"], [1, "\u03c6eh"], ["class", "\u03c6ed", 4, "ngFor", "ngForOf"], [1, "\u03c6ed"], [1, "\u03c6ee"], ["dateFormat", "MM-DD", 3, "posts"], ["url", "archives", "indexUrl", "archives", 3, "size", "count", "current"]],
                template: function (t, e) {
                    1 & t && (bo(0, cv, 4, 2, "ng-container", 0), pc(1, "async")), 2 & t && wo("ngIf", gc(1, 1, e.data$))
                },
                directives: [lu, au, nv, jy],
                pipes: [yu],
                encapsulation: 2
            }), t
        })();
        const uv = ["nav"];

        function hv(t, e) {
            if (1 & t) {
                const t = Eo();
                So(0, "a", 7), Lo("click", function () {
                    return Le(t), Do(2).step(-1)
                }), xo()
            }
        }

        function dv(t, e) {
            if (1 & t) {
                const t = Eo();
                So(0, "a", 8), Lo("click", function () {
                    return Le(t), Do(2).step(1)
                }), xo()
            }
        }

        function fv(t, e) {
            if (1 & t && (So(0, "a", 9), Bo(1), xo()), 2 & t) {
                const t = e.$implicit;
                No("routerLink", "/categories/", t.name, ""), yo("count", t.count), Ws(1), Wo(t.name)
            }
        }

        function pv(t, e) {
            if (1 & t && (To(0), So(1, "div", 1), So(2, "nav", 2, 3), bo(4, hv, 1, 0, "a", 4), bo(5, dv, 1, 0, "a", 5), bo(6, fv, 2, 3, "a", 6), xo(), xo(), ko(7, "router-outlet"), Io()), 2 & t) {
                const t = e.ngIf, n = Do();
                Ws(4), wo("ngIf", n.showPrev), Ws(1), wo("ngIf", n.showNext), Ws(1), wo("ngForOf", t.categoryList)
            }
        }

        let gv = (() => {
            class t extends _m {
                constructor() {
                    super(...arguments), this.scrollLimits = [0, 0], this.detect = () => {
                        const t = this.navRef.nativeElement, [e, n] = this.scrollLimits;
                        this.showNext = t.scrollLeft - n < -10, this.showPrev = t.scrollLeft - e > 10
                    }
                }

                step(t) {
                    const e = this.navRef.nativeElement, n = e.scrollLeft, r = n + this.scrollStep * t;
                    ig(e, "scrollLeft", {
                        from: n,
                        to: Math.min(Math.max(r, this.scrollLimits[0]), this.scrollLimits[1]),
                        duration: Math.min(Math.max(Math.abs(n - r), 100), 500)
                    })
                }

                ngAfterViewInit() {
                    const t = this.navRef.nativeElement, e = () => {
                        this.scrollStep = t.offsetWidth, this.scrollLimits[1] = t.scrollWidth - this.scrollStep
                    };
                    setTimeout(() => {
                        const n = t.querySelector(".\u03c6ek");
                        n && (n.scrollIntoView ? n.scrollIntoView() : n.focus()), e(), this.detect(), (this.showNext || this.showPrev) && (this.resizeSub = this.device.media.subscribe(() => e()), t.addEventListener("scroll", this.detect))
                    }, 0)
                }

                ngOnDestroy() {
                    this.eventSub.unsubscribe(), (this.showNext || this.showPrev) && (this.resizeSub.unsubscribe(), this.navRef.nativeElement.removeEventListener("scroll", this.detect))
                }
            }

            return t.\u0275fac = function () {
                let e;
                return function (n) {
                    return (e || (e = Un(t)))(n || t)
                }
            }(), t.\u0275cmp = $t({
                type: t,
                selectors: [["is-p"]],
                viewQuery: function (t, e) {
                    if (1 & t && Pc(uv, 5), 2 & t) {
                        let t;
                        Lc(t = Dc()) && (e.navRef = t.first)
                    }
                },
                hostAttrs: [1, "v-category"],
                features: [ro],
                decls: 2,
                vars: 3,
                consts: [[4, "ngIf"], [1, "\u03c6en"], [1, "\u03c6ei"], ["nav", ""], ["class", "\u03c6a i\u03ba-previous \u03c6el", 3, "click", 4, "ngIf"], ["class", "\u03c6a i\u03ba-next \u03c6el \u03c6em", 3, "click", 4, "ngIf"], ["class", "\u03c6ej", "routerLinkActive", "\u03c6ek", 3, "routerLink", 4, "ngFor", "ngForOf"], [1, "\u03c6a", "i\u03ba-previous", "\u03c6el", 3, "click"], [1, "\u03c6a", "i\u03ba-next", "\u03c6el", "\u03c6em", 3, "click"], ["routerLinkActive", "\u03c6ek", 1, "\u03c6ej", 3, "routerLink"]],
                template: function (t, e) {
                    1 & t && (bo(0, pv, 8, 3, "ng-container", 0), pc(1, "async")), 2 & t && wo("ngIf", gc(1, 1, e.data$))
                },
                directives: [lu, au, Pp, Ap, Lp],
                pipes: [yu],
                encapsulation: 2
            }), t
        })();

        function mv(t, e) {
            if (1 & t && (To(0), Bo(1), pc(2, "i18n"), Io()), 2 & t) {
                const t = Do();
                Ws(1), Wo(mc(2, 1, "page.notfound.direct_failed", t.intendUrl))
            }
        }

        function yv(t, e) {
            1 & t && (To(0), Bo(1), pc(2, "i18n"), Io()), 2 & t && (Ws(1), Wo(gc(2, 1, "page.notfound.empty")))
        }

        let vv = (() => {
            class t {
                constructor(t) {
                    this.router = t, this.emojis = "(='X'=) (;-;) (^_^)b (^\u0414^)/ (o^^)o (\u2265o\u2264) (\u0387_\u0387) (>_<) (^-^*) (\u02da\u0394\u02da)b (o_o)/ (\u0387.\u0387)".split(" "), this.routerSub = this.router.events.pipe(Eh(t => t instanceof Xh), Bh()).subscribe(t => {
                        this.intendUrl = decodeURIComponent(t.url), this.url = decodeURIComponent(t.urlAfterRedirects), this.emoji = this.emojis[function (t, e = 0) {
                            return e + Math.floor(Math.random() * (t - e + 1))
                        }(11)]
                    })
                }

                ngOnDestroy() {
                    this.routerSub.unsubscribe()
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)(_o(Ep))
            }, t.\u0275cmp = $t({
                type: t,
                selectors: [["is-n"]],
                hostAttrs: [1, "\u03c6dz"],
                decls: 5,
                vars: 3,
                consts: [[1, "\u03c6ea"], [1, "\u03c6eb"], [4, "ngIf"]],
                template: function (t, e) {
                    1 & t && (So(0, "div", 0), Bo(1), xo(), So(2, "div", 1), bo(3, mv, 3, 4, "ng-container", 2), bo(4, yv, 3, 3, "ng-container", 2), xo()), 2 & t && (Ws(1), Wo(e.emoji), Ws(2), wo("ngIf", e.intendUrl != e.url), Ws(1), wo("ngIf", e.intendUrl == e.url))
                },
                directives: [lu],
                pipes: [Pg],
                encapsulation: 2,
                changeDetection: 0
            }), t
        })();

        function bv(t, e) {
            if (1 & t && (So(0, "a", 11), ko(1, "is-g", 12), xo()), 2 & t) {
                const t = Do(2);
                No("routerLink", "/", t.post.link, ""), Ws(1), Mo("src", t.post.thumbnail), Mo("alt", t.post.title), wo("ratio", .5625)
            }
        }

        function _v(t, e) {
            1 & t && (ko(0, "div", 13), pc(1, "unsafe")), 2 & t && wo("innerHTML", gc(1, 1, Do(2).post.excerpt), Yr)
        }

        function wv(t, e) {
            if (1 & t && (So(0, "span", 8), ko(1, "i", 14), Bo(2), xo()), 2 & t) {
                const t = Do(2);
                Ws(2), Wo(t.post.pv)
            }
        }

        function Cv(t, e) {
            if (1 & t && (So(0, "div", 2), bo(1, bv, 2, 4, "a", 3), So(2, "h3", 4), So(3, "a", 5), Bo(4), xo(), xo(), bo(5, _v, 2, 3, "div", 6), So(6, "footer", 7), So(7, "span", 8), ko(8, "i", 9), Bo(9), xo(), bo(10, wv, 3, 1, "span", 10), xo(), xo()), 2 & t) {
                const t = Do();
                Ws(1), wo("ngIf", t.post.thumbnail), Ws(2), No("routerLink", "/", t.post.link, ""), Ws(1), Wo(t.post.title), Ws(1), wo("ngIf", t.post.excerpt), Ws(4), Wo(t.post.date_formatted.ll), Ws(1), wo("ngIf", t.post.pv)
            }
        }

        function Sv(t, e) {
            1 & t && (ko(0, "div", 15), pc(1, "unsafe")), 2 & t && wo("innerHTML", gc(1, 1, Do().post.custom), Yr)
        }

        let xv = (() => {
            class t {
            }

            return t.\u0275fac = function (e) {
                return new (e || t)
            }, t.\u0275cmp = $t({
                type: t,
                selectors: [["is-i"]],
                hostAttrs: [1, "\u03c6ce"],
                inputs: {post: "post"},
                decls: 2,
                vars: 2,
                consts: [["class", "\u03c6ch", 4, "ngIf"], ["isSnippet", "", 3, "innerHTML", 4, "ngIf"], [1, "\u03c6ch"], ["class", "\u03c6ck", 3, "routerLink", 4, "ngIf"], [1, "\u03c6cl"], [3, "routerLink"], ["class", "\u03c6cf \u03c6e", 3, "innerHTML", 4, "ngIf"], [1, "\u03c6cg"], [1, "\u03c6ci"], [1, "\u03c6a", "i\u03ba-calendar", "\u03c6cj"], ["class", "\u03c6ci", 4, "ngIf"], [1, "\u03c6ck", 3, "routerLink"], [3, "ratio", "src", "alt"], [1, "\u03c6cf", "\u03c6e", 3, "innerHTML"], [1, "\u03c6a", "i\u03ba-eye", "\u03c6cj"], ["isSnippet", "", 3, "innerHTML"]],
                template: function (t, e) {
                    1 & t && (bo(0, Cv, 11, 6, "div", 0), bo(1, Sv, 2, 3, "div", 1)), 2 & t && (wo("ngIf", e.post.title), Ws(1), wo("ngIf", !e.post.title && e.post.custom))
                },
                directives: [lu, Ap, Am, Rg],
                pipes: [Lg],
                encapsulation: 2,
                changeDetection: 0
            }), t
        })();

        function kv(t, e) {
            if (1 & t && ko(0, "is-i", 3), 2 & t) {
                const t = e.$implicit, n = Do(2);
                wo("post", n.assign(t, n.pv))
            }
        }

        function Tv(t, e) {
            if (1 & t && ko(0, "is-h", 4), 2 & t) {
                const t = Do().ngIf;
                wo("size", t.postList.per_page)("count", t.postList.total)("current", t.postList.current)
            }
        }

        function Iv(t, e) {
            if (1 & t && (To(0), bo(1, kv, 1, 1, "is-i", 1), bo(2, Tv, 1, 3, "is-h", 2), Io()), 2 & t) {
                const t = e.ngIf;
                Ws(1), wo("ngForOf", t.postList.data), Ws(1), wo("ngIf", t.postList.total > 1)
            }
        }

        let Ev = (() => {
            class t extends _m {
                goPage(t) {
                    this.router.navigate([1 === t ? "/" : "/page/" + t])
                }

                ngOnDestroy() {
                    this.eventSub.unsubscribe()
                }

                assign(t, e) {
                    return Object.assign({}, t, {pv: e[t.link]})
                }
            }

            return t.\u0275fac = function () {
                let e;
                return function (n) {
                    return (e || (e = Un(t)))(n || t)
                }
            }(), t.\u0275cmp = $t({
                type: t,
                selectors: [["is-s"]],
                hostAttrs: [1, "\u03c6eu"],
                features: [ro],
                decls: 2,
                vars: 3,
                consts: [[4, "ngIf"], [3, "post", 4, "ngFor", "ngForOf"], ["url", "page", "indexUrl", "", 3, "size", "count", "current", 4, "ngIf"], [3, "post"], ["url", "page", "indexUrl", "", 3, "size", "count", "current"]],
                template: function (t, e) {
                    1 & t && (bo(0, Iv, 3, 2, "ng-container", 0), pc(1, "async")), 2 & t && wo("ngIf", gc(1, 1, e.data$))
                },
                directives: [lu, au, xv, jy],
                pipes: [yu],
                encapsulation: 2
            }), t
        })();

        function Ov(t, e) {
            if (1 & t && ko(0, "is-l", 3), 2 & t) {
                const t = e.$implicit;
                Mo("name", t.name), Mo("count", t.count)
            }
        }

        function Av(t, e) {
            if (1 & t && (To(0), So(1, "h1", 1), Bo(2), pc(3, "i18n"), xo(), bo(4, Ov, 1, 2, "is-l", 2), Io()), 2 & t) {
                const t = e.ngIf;
                Ws(2), Wo(mc(3, 2, "page.tags", t.tagList.length)), Ws(2), wo("ngForOf", t.tagList)
            }
        }

        let Rv = (() => {
            class t extends _m {
            }

            return t.\u0275fac = function () {
                let e;
                return function (n) {
                    return (e || (e = Un(t)))(n || t)
                }
            }(), t.\u0275cmp = $t({
                type: t,
                selectors: [["is-v"]],
                hostAttrs: [1, "\u03c6gm"],
                features: [ro],
                decls: 2,
                vars: 3,
                consts: [[4, "ngIf"], [1, "\u03c6gn"], [3, "name", "count", 4, "ngFor", "ngForOf"], [3, "name", "count"]],
                template: function (t, e) {
                    1 & t && (bo(0, Av, 5, 5, "ng-container", 0), pc(1, "async")), 2 & t && wo("ngIf", gc(1, 1, e.data$))
                },
                directives: [lu, au, Ym],
                pipes: [yu, Pg],
                encapsulation: 2,
                changeDetection: 0
            }), t
        })();

        function Lv(t, e) {
            if (1 & t && ko(0, "is-h", 5), 2 & t) {
                const t = Do().ngIf;
                wo("size", t.tag.per_page)("count", t.tag.total)("current", t.tag.current)("url", "tags/" + t.tag.name)("indexUrl", "tags/" + t.tag.name)
            }
        }

        function Pv(t, e) {
            if (1 & t && (To(0), So(1, "article", 1), So(2, "h1", 2), Bo(3), xo(), ko(4, "is-b", 3), xo(), bo(5, Lv, 1, 5, "is-h", 4), Io()), 2 & t) {
                const t = e.ngIf;
                Ws(3), Go("# ", t.tag.name, ""), Ws(1), wo("posts", t.tag.data), Ws(1), wo("ngIf", t.tag.total > 1)
            }
        }

        let jv = (() => {
            class t extends _m {
            }

            return t.\u0275fac = function () {
                let e;
                return function (n) {
                    return (e || (e = Un(t)))(n || t)
                }
            }(), t.\u0275cmp = $t({
                type: t,
                selectors: [["is-u"]],
                hostAttrs: [1, "\u03c6gl"],
                features: [ro],
                decls: 2,
                vars: 3,
                consts: [[4, "ngIf"], [1, "\u03c6gp"], [1, "\u03c6go"], [3, "posts"], [3, "size", "count", "current", "url", "indexUrl", 4, "ngIf"], [3, "size", "count", "current", "url", "indexUrl"]],
                template: function (t, e) {
                    1 & t && (bo(0, Pv, 6, 3, "ng-container", 0), pc(1, "async")), 2 & t && wo("ngIf", gc(1, 1, e.data$))
                },
                directives: [lu, nv, jy],
                pipes: [yu],
                encapsulation: 2
            }), t
        })(), Dv = (() => {
            class t {
                shouldDetach() {
                    return !1
                }

                store() {
                }

                shouldAttach() {
                    return !1
                }

                retrieve() {
                    return null
                }

                shouldReuseRoute(t, e) {
                    return !(t.routeConfig && t.routeConfig.data && ~["post", "page"].indexOf(t.routeConfig.data.id) && String(t) !== String(e)) && t.routeConfig === e.routeConfig
                }
            }

            return t.\u0275fac = function (e) {
                return new (e || t)
            }, t.\u0275prov = ut({token: t, factory: t.\u0275fac}), t
        })();
        const Mv = [{path: "", component: Ev, resolve: {postList: _g}, data: {id: "home"}}, {
            path: "page/:page",
            component: Ev,
            resolve: {postList: _g},
            data: {id: "posts"}
        }, {path: "search", component: Gy, data: {id: "search"}}, {
            path: "tags",
            component: Rv,
            resolve: {tagList: _g},
            data: {id: "tags"}
        }, {path: "tags/:name", component: jv, resolve: {tag: _g}, data: {id: "tag"}}, {
            path: "tags/:name/:page",
            component: jv,
            resolve: {tag: _g},
            data: {id: "tag"}
        }, {
            path: "categories",
            component: gv,
            resolve: {categoryList: _g},
            data: {id: "categories"},
            children: [{
                path: ":name",
                component: sv,
                resolve: {category: _g},
                data: {id: "category"}
            }, {path: ":name/:page", component: sv, resolve: {category: _g}, data: {id: "category"}}]
        }, {path: "archives", component: lv, resolve: {archives: _g}, data: {id: "archives"}}, {
            path: "archives/:page",
            component: lv,
            resolve: {archives: _g},
            data: {id: "archives"}
        }, {path: "404", component: vv, data: {id: "404"}}];
        let Nv = (() => {
            class t {
            }

            return t.\u0275fac = function (e) {
                return new (e || t)
            }, t.\u0275mod = Bt({type: t}), t.\u0275inj = ht({
                providers: [{provide: mp, useClass: Dv}, _g],
                imports: [[zp.forRoot(Mv, {relativeLinkResolution: "legacy"})], zp]
            }), t
        })(), Hv = (() => {
            class t {
            }

            return t.\u0275fac = function (e) {
                return new (e || t)
            }, t.\u0275mod = Bt({type: t, bootstrap: [tv]}), t.\u0275inj = ht({
                providers: [bg, yg, wg, vg, Pg],
                imports: [[nh.withServerTransition({appId: "inside"}), Nv]]
            }), t
        })();
        !function () {
            if (bl) throw new Error("Cannot enable prod mode after platform setup.");
            vl = !1
        }(), th([{provide: Xp, useValue: () => window.__inside__}, {
            provide: tg,
            useValue: (t, e) => fetch(t, e).then(t => t.json())
        }]).bootstrapModule(Hv).catch(() => {
        })
    }
}, t => {
    "use strict";
    t(t.s = 676)
}]);

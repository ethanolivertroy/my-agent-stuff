function sameError(left, right) {
    return left?.message === right?.message;
}
function createReadyPromise() {
    let resolve;
    let reject;
    const promise = new Promise((res, rej) => {
        resolve = res;
        reject = rej;
    });
    void promise.catch(() => { });
    return { promise, resolve, reject };
}
/** Tracks one adapter's current loading state and exposes one waitable ready promise per cycle. */
export class OpenTuiReadyTracker {
    callbacks;
    state = "loading";
    error = null;
    pending = createReadyPromise();
    pendingSettled = false;
    constructor(callbacks = {}) {
        this.callbacks = callbacks;
    }
    updateCallbacks(callbacks) {
        this.callbacks = callbacks;
    }
    getSnapshot() {
        return {
            state: this.state,
            error: this.error,
        };
    }
    isReady() {
        return this.state === "ready";
    }
    waitUntilReady() {
        return this.pending.promise;
    }
    startLoading() {
        if (this.state === "loading" && this.error === null) {
            return;
        }
        this.pending = createReadyPromise();
        this.pendingSettled = false;
        this.transitionTo({ state: "loading", error: null });
    }
    markReady() {
        if (!this.pendingSettled) {
            this.pendingSettled = true;
            this.pending.resolve();
        }
        this.transitionTo({ state: "ready", error: null });
    }
    markError(error) {
        if (!this.pendingSettled) {
            this.pendingSettled = true;
            this.pending.reject(error);
        }
        this.transitionTo({ state: "error", error });
    }
    transitionTo(next) {
        const stateChanged = this.state !== next.state;
        const errorChanged = !sameError(this.error, next.error);
        if (!stateChanged && !errorChanged) {
            return;
        }
        this.state = next.state;
        this.error = next.error;
        this.callbacks.onReadyStateChange?.(this.getSnapshot());
        if (next.state === "ready") {
            this.callbacks.onReady?.();
            return;
        }
        if (next.state === "error" && next.error) {
            this.callbacks.onError?.(next.error);
        }
    }
}

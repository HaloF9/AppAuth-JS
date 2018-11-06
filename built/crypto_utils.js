"use strict";
/*
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the
 * License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var base64 = require("base64-js");
var errors_1 = require("./errors");
var HAS_CRYPTO = typeof window !== 'undefined' && !!window.crypto;
var HAS_SUBTLE_CRYPTO = HAS_CRYPTO && !!window.crypto.subtle;
var CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
function bufferToString(buffer) {
    var state = [];
    for (var i = 0; i < buffer.byteLength; i += 1) {
        var index = buffer[i] % CHARSET.length;
        state.push(CHARSET[index]);
    }
    return state.join('');
}
exports.bufferToString = bufferToString;
function urlSafe(buffer) {
    var encoded = base64.fromByteArray(new Uint8Array(buffer));
    return encoded.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}
exports.urlSafe = urlSafe;
// adapted from source: http://stackoverflow.com/a/11058858
// this is used in place of TextEncode as the api is not yet
// well supported: https://caniuse.com/#search=TextEncoder
function textEncodeLite(str) {
    var buf = new ArrayBuffer(str.length);
    var bufView = new Uint8Array(buf);
    for (var i = 0; i < str.length; i++) {
        bufView[i] = str.charCodeAt(i);
    }
    return bufView;
}
exports.textEncodeLite = textEncodeLite;
/**
 * The default implementation of the `Crypto` interface.
 * This uses the capabilities of the browser.
 */
var DefaultCrypto = /** @class */ (function () {
    function DefaultCrypto() {
    }
    DefaultCrypto.prototype.generateRandom = function (size) {
        var buffer = new Uint8Array(size);
        if (HAS_CRYPTO) {
            window.crypto.getRandomValues(buffer);
        }
        else {
            // fall back to Math.random() if nothing else is available
            for (var i = 0; i < size; i += 1) {
                buffer[i] = Math.random();
            }
        }
        return bufferToString(buffer);
    };
    DefaultCrypto.prototype.deriveChallenge = function (code) {
        if (code.length < 43 || code.length > 128) {
            return Promise.reject(new errors_1.AppAuthError('Invalid code length.'));
        }
        if (!HAS_SUBTLE_CRYPTO) {
            return Promise.reject(new errors_1.AppAuthError('window.crypto.subtle is unavailable.'));
        }
        return new Promise(function (resolve, reject) {
            crypto.subtle.digest('SHA-256', textEncodeLite(code)).then(function (buffer) {
                return resolve(urlSafe(new Uint8Array(buffer)));
            }, function (error) { return reject(error); });
        });
    };
    return DefaultCrypto;
}());
exports.DefaultCrypto = DefaultCrypto;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3J5cHRvX3V0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NyeXB0b191dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7OztHQVlHOztBQUVILGtDQUFvQztBQUVwQyxtQ0FBc0M7QUFFdEMsSUFBTSxVQUFVLEdBQUcsT0FBTyxNQUFNLEtBQUssV0FBVyxJQUFJLENBQUMsQ0FBRSxNQUFNLENBQUMsTUFBYyxDQUFDO0FBQzdFLElBQU0saUJBQWlCLEdBQUcsVUFBVSxJQUFJLENBQUMsQ0FBRSxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQWMsQ0FBQztBQUN4RSxJQUFNLE9BQU8sR0FBRyxnRUFBZ0UsQ0FBQztBQUVqRixTQUFnQixjQUFjLENBQUMsTUFBa0I7SUFDL0MsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDO0lBQ2YsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUM3QyxJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztRQUN2QyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0tBQzVCO0lBQ0QsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ3hCLENBQUM7QUFQRCx3Q0FPQztBQUVELFNBQWdCLE9BQU8sQ0FBQyxNQUFrQjtJQUN4QyxJQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDN0QsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDM0UsQ0FBQztBQUhELDBCQUdDO0FBRUQsMkRBQTJEO0FBQzNELDREQUE0RDtBQUM1RCwwREFBMEQ7QUFDMUQsU0FBZ0IsY0FBYyxDQUFDLEdBQVc7SUFDeEMsSUFBTSxHQUFHLEdBQUcsSUFBSSxXQUFXLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3hDLElBQU0sT0FBTyxHQUFHLElBQUksVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRXBDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ25DLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ2hDO0lBQ0QsT0FBTyxPQUFPLENBQUM7QUFDakIsQ0FBQztBQVJELHdDQVFDO0FBY0Q7OztHQUdHO0FBQ0g7SUFBQTtJQTRCQSxDQUFDO0lBM0JDLHNDQUFjLEdBQWQsVUFBZSxJQUFZO1FBQ3pCLElBQU0sTUFBTSxHQUFHLElBQUksVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BDLElBQUksVUFBVSxFQUFFO1lBQ2QsTUFBTSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDdkM7YUFBTTtZQUNMLDBEQUEwRDtZQUMxRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ2hDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7YUFDM0I7U0FDRjtRQUNELE9BQU8sY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFFRCx1Q0FBZSxHQUFmLFVBQWdCLElBQVk7UUFDMUIsSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsRUFBRTtZQUN6QyxPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxxQkFBWSxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQztTQUNqRTtRQUNELElBQUksQ0FBQyxpQkFBaUIsRUFBRTtZQUN0QixPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxxQkFBWSxDQUFDLHNDQUFzQyxDQUFDLENBQUMsQ0FBQztTQUNqRjtRQUVELE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUUsTUFBTTtZQUNqQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsTUFBTTtnQkFDL0QsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNsRCxDQUFDLEVBQUUsVUFBQSxLQUFLLElBQUksT0FBQSxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQWIsQ0FBYSxDQUFDLENBQUM7UUFDN0IsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0gsb0JBQUM7QUFBRCxDQUFDLEFBNUJELElBNEJDO0FBNUJZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiLypcclxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIEluYy5cclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHRcclxuICogaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlXHJcbiAqIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyXHJcbiAqIGV4cHJlc3Mgb3IgaW1wbGllZC4gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgKiBhcyBiYXNlNjQgZnJvbSAnYmFzZTY0LWpzJztcclxuXHJcbmltcG9ydCB7QXBwQXV0aEVycm9yfSBmcm9tICcuL2Vycm9ycyc7XHJcblxyXG5jb25zdCBIQVNfQ1JZUFRPID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgISEod2luZG93LmNyeXB0byBhcyBhbnkpO1xyXG5jb25zdCBIQVNfU1VCVExFX0NSWVBUTyA9IEhBU19DUllQVE8gJiYgISEod2luZG93LmNyeXB0by5zdWJ0bGUgYXMgYW55KTtcclxuY29uc3QgQ0hBUlNFVCA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSc7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYnVmZmVyVG9TdHJpbmcoYnVmZmVyOiBVaW50OEFycmF5KSB7XHJcbiAgbGV0IHN0YXRlID0gW107XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBidWZmZXIuYnl0ZUxlbmd0aDsgaSArPSAxKSB7XHJcbiAgICBsZXQgaW5kZXggPSBidWZmZXJbaV0gJSBDSEFSU0VULmxlbmd0aDtcclxuICAgIHN0YXRlLnB1c2goQ0hBUlNFVFtpbmRleF0pO1xyXG4gIH1cclxuICByZXR1cm4gc3RhdGUuam9pbignJyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB1cmxTYWZlKGJ1ZmZlcjogVWludDhBcnJheSk6IHN0cmluZyB7XHJcbiAgY29uc3QgZW5jb2RlZCA9IGJhc2U2NC5mcm9tQnl0ZUFycmF5KG5ldyBVaW50OEFycmF5KGJ1ZmZlcikpO1xyXG4gIHJldHVybiBlbmNvZGVkLnJlcGxhY2UoL1xcKy9nLCAnLScpLnJlcGxhY2UoL1xcLy9nLCAnXycpLnJlcGxhY2UoLz0vZywgJycpO1xyXG59XHJcblxyXG4vLyBhZGFwdGVkIGZyb20gc291cmNlOiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8xMTA1ODg1OFxyXG4vLyB0aGlzIGlzIHVzZWQgaW4gcGxhY2Ugb2YgVGV4dEVuY29kZSBhcyB0aGUgYXBpIGlzIG5vdCB5ZXRcclxuLy8gd2VsbCBzdXBwb3J0ZWQ6IGh0dHBzOi8vY2FuaXVzZS5jb20vI3NlYXJjaD1UZXh0RW5jb2RlclxyXG5leHBvcnQgZnVuY3Rpb24gdGV4dEVuY29kZUxpdGUoc3RyOiBzdHJpbmcpIHtcclxuICBjb25zdCBidWYgPSBuZXcgQXJyYXlCdWZmZXIoc3RyLmxlbmd0aCk7XHJcbiAgY29uc3QgYnVmVmlldyA9IG5ldyBVaW50OEFycmF5KGJ1Zik7XHJcblxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBidWZWaWV3W2ldID0gc3RyLmNoYXJDb2RlQXQoaSk7XHJcbiAgfVxyXG4gIHJldHVybiBidWZWaWV3O1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIENyeXB0byB7XHJcbiAgLyoqXHJcbiAgICogR2VuZXJhdGUgYSByYW5kb20gc3RyaW5nXHJcbiAgICovXHJcbiAgZ2VuZXJhdGVSYW5kb20oc2l6ZTogbnVtYmVyKTogc3RyaW5nO1xyXG4gIC8qKlxyXG4gICAqIENvbXB1dGUgdGhlIFNIQTI1NiBvZiBhIGdpdmVuIGNvZGUuXHJcbiAgICogVGhpcyBpcyB1c2VmdWwgd2hlbiB1c2luZyBQS0NFLlxyXG4gICAqL1xyXG4gIGRlcml2ZUNoYWxsZW5nZShjb2RlOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz47XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUaGUgZGVmYXVsdCBpbXBsZW1lbnRhdGlvbiBvZiB0aGUgYENyeXB0b2AgaW50ZXJmYWNlLlxyXG4gKiBUaGlzIHVzZXMgdGhlIGNhcGFiaWxpdGllcyBvZiB0aGUgYnJvd3Nlci5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBEZWZhdWx0Q3J5cHRvIGltcGxlbWVudHMgQ3J5cHRvIHtcclxuICBnZW5lcmF0ZVJhbmRvbShzaXplOiBudW1iZXIpIHtcclxuICAgIGNvbnN0IGJ1ZmZlciA9IG5ldyBVaW50OEFycmF5KHNpemUpO1xyXG4gICAgaWYgKEhBU19DUllQVE8pIHtcclxuICAgICAgd2luZG93LmNyeXB0by5nZXRSYW5kb21WYWx1ZXMoYnVmZmVyKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIGZhbGwgYmFjayB0byBNYXRoLnJhbmRvbSgpIGlmIG5vdGhpbmcgZWxzZSBpcyBhdmFpbGFibGVcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaXplOyBpICs9IDEpIHtcclxuICAgICAgICBidWZmZXJbaV0gPSBNYXRoLnJhbmRvbSgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYnVmZmVyVG9TdHJpbmcoYnVmZmVyKTtcclxuICB9XHJcblxyXG4gIGRlcml2ZUNoYWxsZW5nZShjb2RlOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4ge1xyXG4gICAgaWYgKGNvZGUubGVuZ3RoIDwgNDMgfHwgY29kZS5sZW5ndGggPiAxMjgpIHtcclxuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBBcHBBdXRoRXJyb3IoJ0ludmFsaWQgY29kZSBsZW5ndGguJykpO1xyXG4gICAgfVxyXG4gICAgaWYgKCFIQVNfU1VCVExFX0NSWVBUTykge1xyXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEFwcEF1dGhFcnJvcignd2luZG93LmNyeXB0by5zdWJ0bGUgaXMgdW5hdmFpbGFibGUuJykpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIGNyeXB0by5zdWJ0bGUuZGlnZXN0KCdTSEEtMjU2JywgdGV4dEVuY29kZUxpdGUoY29kZSkpLnRoZW4oYnVmZmVyID0+IHtcclxuICAgICAgICByZXR1cm4gcmVzb2x2ZSh1cmxTYWZlKG5ldyBVaW50OEFycmF5KGJ1ZmZlcikpKTtcclxuICAgICAgfSwgZXJyb3IgPT4gcmVqZWN0KGVycm9yKSk7XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIl19
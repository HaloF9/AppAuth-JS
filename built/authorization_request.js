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
var crypto_utils_1 = require("./crypto_utils");
var logger_1 = require("./logger");
/**
 * Generates a cryptographically random new state. Useful for CSRF protection.
 */
var SIZE = 10; // 10 bytes
var newState = function (crypto) {
    return crypto.generateRandom(SIZE);
};
/**
 * Represents the AuthorizationRequest.
 * For more information look at
 * https://tools.ietf.org/html/rfc6749#section-4.1.1
 */
var AuthorizationRequest = /** @class */ (function () {
    /**
     * Constructs a new AuthorizationRequest.
     * Use a `undefined` value for the `state` parameter, to generate a random
     * state for CSRF protection.
     */
    function AuthorizationRequest(request, crypto, usePkce) {
        if (crypto === void 0) { crypto = new crypto_utils_1.DefaultCrypto(); }
        if (usePkce === void 0) { usePkce = true; }
        this.crypto = crypto;
        this.usePkce = usePkce;
        this.clientId = request.client_id;
        this.redirectUri = request.redirect_uri;
        this.scope = request.scope;
        this.responseType = request.response_type || AuthorizationRequest.RESPONSE_TYPE_CODE;
        this.state = request.state || newState(crypto);
        this.extras = request.extras;
        // read internal properties if available
        this.internal = request.internal;
    }
    AuthorizationRequest.prototype.setupCodeVerifier = function () {
        var _this = this;
        if (!this.usePkce) {
            return Promise.resolve();
        }
        else {
            var codeVerifier_1 = this.crypto.generateRandom(128);
            var challenge = this.crypto.deriveChallenge(codeVerifier_1).catch(function (error) {
                logger_1.log('Unable to generate PKCE challenge. Not using PKCE', error);
                return undefined;
            });
            return challenge.then(function (result) {
                if (result) {
                    // keep track of the code used.
                    _this.internal = _this.internal || {};
                    _this.internal['code_verifier'] = codeVerifier_1;
                    _this.extras = _this.extras || {};
                    _this.extras['code_challenge'] = result;
                    // We always use S256. Plain is not good enough.
                    _this.extras['code_challenge_method'] = 'S256';
                }
            });
        }
    };
    /**
     * Serializes the AuthorizationRequest to a JavaScript Object.
     */
    AuthorizationRequest.prototype.toJson = function () {
        var _this = this;
        // Always make sure that the code verifier is setup when toJson() is called.
        return this.setupCodeVerifier().then(function () {
            return {
                response_type: _this.responseType,
                client_id: _this.clientId,
                redirect_uri: _this.redirectUri,
                scope: _this.scope,
                state: _this.state,
                extras: _this.extras,
                internal: _this.internal
            };
        });
    };
    AuthorizationRequest.RESPONSE_TYPE_TOKEN = 'token';
    AuthorizationRequest.RESPONSE_TYPE_CODE = 'code';
    return AuthorizationRequest;
}());
exports.AuthorizationRequest = AuthorizationRequest;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aG9yaXphdGlvbl9yZXF1ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2F1dGhvcml6YXRpb25fcmVxdWVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7OztHQVlHOztBQUVILCtDQUFxRDtBQUNyRCxtQ0FBNkI7QUFnQjdCOztHQUVHO0FBQ0gsSUFBTSxJQUFJLEdBQUcsRUFBRSxDQUFDLENBQUUsV0FBVztBQUM3QixJQUFNLFFBQVEsR0FBRyxVQUFTLE1BQWM7SUFDdEMsT0FBTyxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3JDLENBQUMsQ0FBQztBQUVGOzs7O0dBSUc7QUFDSDtJQWVFOzs7O09BSUc7SUFDSCw4QkFDSSxPQUFpQyxFQUN6QixNQUFvQyxFQUNwQyxPQUF1QjtRQUR2Qix1QkFBQSxFQUFBLGFBQXFCLDRCQUFhLEVBQUU7UUFDcEMsd0JBQUEsRUFBQSxjQUF1QjtRQUR2QixXQUFNLEdBQU4sTUFBTSxDQUE4QjtRQUNwQyxZQUFPLEdBQVAsT0FBTyxDQUFnQjtRQUNqQyxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUM7UUFDbEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztRQUMzQixJQUFJLENBQUMsWUFBWSxHQUFHLE9BQU8sQ0FBQyxhQUFhLElBQUksb0JBQW9CLENBQUMsa0JBQWtCLENBQUM7UUFDckYsSUFBSSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxJQUFJLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7UUFDN0Isd0NBQXdDO1FBQ3hDLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQztJQUNuQyxDQUFDO0lBRUQsZ0RBQWlCLEdBQWpCO1FBQUEsaUJBc0JDO1FBckJDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2pCLE9BQU8sT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQzFCO2FBQU07WUFDTCxJQUFNLGNBQVksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNyRCxJQUFNLFNBQVMsR0FDWCxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxjQUFZLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBQSxLQUFLO2dCQUNuRCxZQUFHLENBQUMsbURBQW1ELEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBQ2hFLE9BQU8sU0FBUyxDQUFDO1lBQ25CLENBQUMsQ0FBQyxDQUFDO1lBQ1AsT0FBTyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQUEsTUFBTTtnQkFDMUIsSUFBSSxNQUFNLEVBQUU7b0JBQ1YsK0JBQStCO29CQUMvQixLQUFJLENBQUMsUUFBUSxHQUFHLEtBQUksQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFDO29CQUNwQyxLQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxHQUFHLGNBQVksQ0FBQztvQkFDOUMsS0FBSSxDQUFDLE1BQU0sR0FBRyxLQUFJLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQztvQkFDaEMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLE1BQU0sQ0FBQztvQkFDdkMsZ0RBQWdEO29CQUNoRCxLQUFJLENBQUMsTUFBTSxDQUFDLHVCQUF1QixDQUFDLEdBQUcsTUFBTSxDQUFDO2lCQUMvQztZQUNILENBQUMsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxxQ0FBTSxHQUFOO1FBQUEsaUJBYUM7UUFaQyw0RUFBNEU7UUFDNUUsT0FBTyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxJQUFJLENBQUM7WUFDbkMsT0FBTztnQkFDTCxhQUFhLEVBQUUsS0FBSSxDQUFDLFlBQVk7Z0JBQ2hDLFNBQVMsRUFBRSxLQUFJLENBQUMsUUFBUTtnQkFDeEIsWUFBWSxFQUFFLEtBQUksQ0FBQyxXQUFXO2dCQUM5QixLQUFLLEVBQUUsS0FBSSxDQUFDLEtBQUs7Z0JBQ2pCLEtBQUssRUFBRSxLQUFJLENBQUMsS0FBSztnQkFDakIsTUFBTSxFQUFFLEtBQUksQ0FBQyxNQUFNO2dCQUNuQixRQUFRLEVBQUUsS0FBSSxDQUFDLFFBQVE7YUFDeEIsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQXpFTSx3Q0FBbUIsR0FBRyxPQUFPLENBQUM7SUFDOUIsdUNBQWtCLEdBQUcsTUFBTSxDQUFDO0lBeUVyQywyQkFBQztDQUFBLEFBM0VELElBMkVDO0FBM0VZLG9EQUFvQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBJbmMuXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0XHJcbiAqIGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZVxyXG4gKiBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlclxyXG4gKiBleHByZXNzIG9yIGltcGxpZWQuIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IHtDcnlwdG8sIERlZmF1bHRDcnlwdG99IGZyb20gJy4vY3J5cHRvX3V0aWxzJztcclxuaW1wb3J0IHtsb2d9IGZyb20gJy4vbG9nZ2VyJztcclxuaW1wb3J0IHtTdHJpbmdNYXB9IGZyb20gJy4vdHlwZXMnO1xyXG5cclxuLyoqXHJcbiAqIFJlcHJlc2VudHMgYW4gQXV0aG9yaXphdGlvblJlcXVlc3QgYXMgSlNPTi5cclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgQXV0aG9yaXphdGlvblJlcXVlc3RKc29uIHtcclxuICByZXNwb25zZV90eXBlOiBzdHJpbmc7XHJcbiAgY2xpZW50X2lkOiBzdHJpbmc7XHJcbiAgcmVkaXJlY3RfdXJpOiBzdHJpbmc7XHJcbiAgc2NvcGU6IHN0cmluZztcclxuICBzdGF0ZT86IHN0cmluZztcclxuICBleHRyYXM/OiBTdHJpbmdNYXA7XHJcbiAgaW50ZXJuYWw/OiBTdHJpbmdNYXA7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBHZW5lcmF0ZXMgYSBjcnlwdG9ncmFwaGljYWxseSByYW5kb20gbmV3IHN0YXRlLiBVc2VmdWwgZm9yIENTUkYgcHJvdGVjdGlvbi5cclxuICovXHJcbmNvbnN0IFNJWkUgPSAxMDsgIC8vIDEwIGJ5dGVzXHJcbmNvbnN0IG5ld1N0YXRlID0gZnVuY3Rpb24oY3J5cHRvOiBDcnlwdG8pOiBzdHJpbmcge1xyXG4gIHJldHVybiBjcnlwdG8uZ2VuZXJhdGVSYW5kb20oU0laRSk7XHJcbn07XHJcblxyXG4vKipcclxuICogUmVwcmVzZW50cyB0aGUgQXV0aG9yaXphdGlvblJlcXVlc3QuXHJcbiAqIEZvciBtb3JlIGluZm9ybWF0aW9uIGxvb2sgYXRcclxuICogaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzY3NDkjc2VjdGlvbi00LjEuMVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEF1dGhvcml6YXRpb25SZXF1ZXN0IHtcclxuICBzdGF0aWMgUkVTUE9OU0VfVFlQRV9UT0tFTiA9ICd0b2tlbic7XHJcbiAgc3RhdGljIFJFU1BPTlNFX1RZUEVfQ09ERSA9ICdjb2RlJztcclxuXHJcbiAgLy8gTk9URTpcclxuICAvLyBCb3RoIHJlZGlyZWN0X3VyaSBhbmQgc3RhdGUgYXJlIGFjdHVhbGx5IG9wdGlvbmFsLlxyXG4gIC8vIEhvd2V2ZXIgQXBwQXV0aCBpcyBtb3JlIG9waW9uaW9uYXRlZCwgYW5kIHJlcXVpcmVzIHlvdSB0byB1c2UgYm90aC5cclxuXHJcbiAgY2xpZW50SWQ6IHN0cmluZztcclxuICByZWRpcmVjdFVyaTogc3RyaW5nO1xyXG4gIHNjb3BlOiBzdHJpbmc7XHJcbiAgcmVzcG9uc2VUeXBlOiBzdHJpbmc7XHJcbiAgc3RhdGU6IHN0cmluZztcclxuICBleHRyYXM/OiBTdHJpbmdNYXA7XHJcbiAgaW50ZXJuYWw/OiBTdHJpbmdNYXA7XHJcbiAgLyoqXHJcbiAgICogQ29uc3RydWN0cyBhIG5ldyBBdXRob3JpemF0aW9uUmVxdWVzdC5cclxuICAgKiBVc2UgYSBgdW5kZWZpbmVkYCB2YWx1ZSBmb3IgdGhlIGBzdGF0ZWAgcGFyYW1ldGVyLCB0byBnZW5lcmF0ZSBhIHJhbmRvbVxyXG4gICAqIHN0YXRlIGZvciBDU1JGIHByb3RlY3Rpb24uXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICAgIHJlcXVlc3Q6IEF1dGhvcml6YXRpb25SZXF1ZXN0SnNvbixcclxuICAgICAgcHJpdmF0ZSBjcnlwdG86IENyeXB0byA9IG5ldyBEZWZhdWx0Q3J5cHRvKCksXHJcbiAgICAgIHByaXZhdGUgdXNlUGtjZTogYm9vbGVhbiA9IHRydWUpIHtcclxuICAgIHRoaXMuY2xpZW50SWQgPSByZXF1ZXN0LmNsaWVudF9pZDtcclxuICAgIHRoaXMucmVkaXJlY3RVcmkgPSByZXF1ZXN0LnJlZGlyZWN0X3VyaTtcclxuICAgIHRoaXMuc2NvcGUgPSByZXF1ZXN0LnNjb3BlO1xyXG4gICAgdGhpcy5yZXNwb25zZVR5cGUgPSByZXF1ZXN0LnJlc3BvbnNlX3R5cGUgfHwgQXV0aG9yaXphdGlvblJlcXVlc3QuUkVTUE9OU0VfVFlQRV9DT0RFO1xyXG4gICAgdGhpcy5zdGF0ZSA9IHJlcXVlc3Quc3RhdGUgfHwgbmV3U3RhdGUoY3J5cHRvKTtcclxuICAgIHRoaXMuZXh0cmFzID0gcmVxdWVzdC5leHRyYXM7XHJcbiAgICAvLyByZWFkIGludGVybmFsIHByb3BlcnRpZXMgaWYgYXZhaWxhYmxlXHJcbiAgICB0aGlzLmludGVybmFsID0gcmVxdWVzdC5pbnRlcm5hbDtcclxuICB9XHJcblxyXG4gIHNldHVwQ29kZVZlcmlmaWVyKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgaWYgKCF0aGlzLnVzZVBrY2UpIHtcclxuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc3QgY29kZVZlcmlmaWVyID0gdGhpcy5jcnlwdG8uZ2VuZXJhdGVSYW5kb20oMTI4KTtcclxuICAgICAgY29uc3QgY2hhbGxlbmdlOiBQcm9taXNlPHN0cmluZ3x1bmRlZmluZWQ+ID1cclxuICAgICAgICAgIHRoaXMuY3J5cHRvLmRlcml2ZUNoYWxsZW5nZShjb2RlVmVyaWZpZXIpLmNhdGNoKGVycm9yID0+IHtcclxuICAgICAgICAgICAgbG9nKCdVbmFibGUgdG8gZ2VuZXJhdGUgUEtDRSBjaGFsbGVuZ2UuIE5vdCB1c2luZyBQS0NFJywgZXJyb3IpO1xyXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgIHJldHVybiBjaGFsbGVuZ2UudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgIGlmIChyZXN1bHQpIHtcclxuICAgICAgICAgIC8vIGtlZXAgdHJhY2sgb2YgdGhlIGNvZGUgdXNlZC5cclxuICAgICAgICAgIHRoaXMuaW50ZXJuYWwgPSB0aGlzLmludGVybmFsIHx8IHt9O1xyXG4gICAgICAgICAgdGhpcy5pbnRlcm5hbFsnY29kZV92ZXJpZmllciddID0gY29kZVZlcmlmaWVyO1xyXG4gICAgICAgICAgdGhpcy5leHRyYXMgPSB0aGlzLmV4dHJhcyB8fCB7fTtcclxuICAgICAgICAgIHRoaXMuZXh0cmFzWydjb2RlX2NoYWxsZW5nZSddID0gcmVzdWx0O1xyXG4gICAgICAgICAgLy8gV2UgYWx3YXlzIHVzZSBTMjU2LiBQbGFpbiBpcyBub3QgZ29vZCBlbm91Z2guXHJcbiAgICAgICAgICB0aGlzLmV4dHJhc1snY29kZV9jaGFsbGVuZ2VfbWV0aG9kJ10gPSAnUzI1Nic7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNlcmlhbGl6ZXMgdGhlIEF1dGhvcml6YXRpb25SZXF1ZXN0IHRvIGEgSmF2YVNjcmlwdCBPYmplY3QuXHJcbiAgICovXHJcbiAgdG9Kc29uKCk6IFByb21pc2U8QXV0aG9yaXphdGlvblJlcXVlc3RKc29uPiB7XHJcbiAgICAvLyBBbHdheXMgbWFrZSBzdXJlIHRoYXQgdGhlIGNvZGUgdmVyaWZpZXIgaXMgc2V0dXAgd2hlbiB0b0pzb24oKSBpcyBjYWxsZWQuXHJcbiAgICByZXR1cm4gdGhpcy5zZXR1cENvZGVWZXJpZmllcigpLnRoZW4oKCkgPT4ge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHJlc3BvbnNlX3R5cGU6IHRoaXMucmVzcG9uc2VUeXBlLFxyXG4gICAgICAgIGNsaWVudF9pZDogdGhpcy5jbGllbnRJZCxcclxuICAgICAgICByZWRpcmVjdF91cmk6IHRoaXMucmVkaXJlY3RVcmksXHJcbiAgICAgICAgc2NvcGU6IHRoaXMuc2NvcGUsXHJcbiAgICAgICAgc3RhdGU6IHRoaXMuc3RhdGUsXHJcbiAgICAgICAgZXh0cmFzOiB0aGlzLmV4dHJhcyxcclxuICAgICAgICBpbnRlcm5hbDogdGhpcy5pbnRlcm5hbFxyXG4gICAgICB9O1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==
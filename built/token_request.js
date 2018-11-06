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
exports.GRANT_TYPE_AUTHORIZATION_CODE = 'authorization_code';
exports.GRANT_TYPE_REFRESH_TOKEN = 'refresh_token';
/**
 * Represents an Access Token request.
 * For more information look at:
 * https://tools.ietf.org/html/rfc6749#section-4.1.3
 */
var TokenRequest = /** @class */ (function () {
    function TokenRequest(request) {
        this.clientId = request.client_id;
        this.redirectUri = request.redirect_uri;
        this.grantType = request.grant_type;
        this.code = request.code;
        this.refreshToken = request.refresh_token;
        this.extras = request.extras;
    }
    /**
     * Serializes a TokenRequest to a JavaScript object.
     */
    TokenRequest.prototype.toJson = function () {
        return {
            grant_type: this.grantType,
            code: this.code,
            refresh_token: this.refreshToken,
            redirect_uri: this.redirectUri,
            client_id: this.clientId,
            extras: this.extras
        };
    };
    TokenRequest.prototype.toStringMap = function () {
        var map = {
            grant_type: this.grantType,
            client_id: this.clientId,
            redirect_uri: this.redirectUri
        };
        if (this.code) {
            map['code'] = this.code;
        }
        if (this.refreshToken) {
            map['refresh_token'] = this.refreshToken;
        }
        // copy over extras
        if (this.extras) {
            for (var extra in this.extras) {
                if (this.extras.hasOwnProperty(extra) && !map.hasOwnProperty(extra)) {
                    // check before inserting to requestMap
                    map[extra] = this.extras[extra];
                }
            }
        }
        return map;
    };
    return TokenRequest;
}());
exports.TokenRequest = TokenRequest;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9rZW5fcmVxdWVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy90b2tlbl9yZXF1ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7O0dBWUc7O0FBSVUsUUFBQSw2QkFBNkIsR0FBRyxvQkFBb0IsQ0FBQztBQUNyRCxRQUFBLHdCQUF3QixHQUFHLGVBQWUsQ0FBQztBQWN4RDs7OztHQUlHO0FBQ0g7SUFRRSxzQkFBWSxPQUF5QjtRQUNuQyxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUM7UUFDbEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztRQUNwQyxJQUFJLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUM7UUFDekIsSUFBSSxDQUFDLFlBQVksR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDO1FBQzFDLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztJQUMvQixDQUFDO0lBRUQ7O09BRUc7SUFDSCw2QkFBTSxHQUFOO1FBQ0UsT0FBTztZQUNMLFVBQVUsRUFBRSxJQUFJLENBQUMsU0FBUztZQUMxQixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7WUFDZixhQUFhLEVBQUUsSUFBSSxDQUFDLFlBQVk7WUFDaEMsWUFBWSxFQUFFLElBQUksQ0FBQyxXQUFXO1lBQzlCLFNBQVMsRUFBRSxJQUFJLENBQUMsUUFBUTtZQUN4QixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07U0FDcEIsQ0FBQztJQUNKLENBQUM7SUFFRCxrQ0FBVyxHQUFYO1FBQ0UsSUFBSSxHQUFHLEdBQWM7WUFDbkIsVUFBVSxFQUFFLElBQUksQ0FBQyxTQUFTO1lBQzFCLFNBQVMsRUFBRSxJQUFJLENBQUMsUUFBUTtZQUN4QixZQUFZLEVBQUUsSUFBSSxDQUFDLFdBQVc7U0FDL0IsQ0FBQztRQUVGLElBQUksSUFBSSxDQUFDLElBQUksRUFBRTtZQUNiLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1NBQ3pCO1FBRUQsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ3JCLEdBQUcsQ0FBQyxlQUFlLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO1NBQzFDO1FBRUQsbUJBQW1CO1FBQ25CLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNmLEtBQUssSUFBSSxLQUFLLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDN0IsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLEVBQUU7b0JBQ25FLHVDQUF1QztvQkFDdkMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQ2pDO2FBQ0Y7U0FDRjtRQUNELE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQztJQUNILG1CQUFDO0FBQUQsQ0FBQyxBQXpERCxJQXlEQztBQXpEWSxvQ0FBWSIsInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBJbmMuXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0XHJcbiAqIGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZVxyXG4gKiBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlclxyXG4gKiBleHByZXNzIG9yIGltcGxpZWQuIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IHtTdHJpbmdNYXB9IGZyb20gJy4vdHlwZXMnO1xyXG5cclxuZXhwb3J0IGNvbnN0IEdSQU5UX1RZUEVfQVVUSE9SSVpBVElPTl9DT0RFID0gJ2F1dGhvcml6YXRpb25fY29kZSc7XHJcbmV4cG9ydCBjb25zdCBHUkFOVF9UWVBFX1JFRlJFU0hfVE9LRU4gPSAncmVmcmVzaF90b2tlbic7XHJcblxyXG4vKipcclxuICogUmVwcmVzZW50cyB0aGUgVG9rZW4gUmVxdWVzdCBhcyBKU09OLlxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBUb2tlblJlcXVlc3RKc29uIHtcclxuICBncmFudF90eXBlOiBzdHJpbmc7XHJcbiAgY29kZT86IHN0cmluZztcclxuICByZWZyZXNoX3Rva2VuPzogc3RyaW5nLCByZWRpcmVjdF91cmk6IHN0cmluZztcclxuICBjbGllbnRfaWQ6IHN0cmluZztcclxuICBleHRyYXM/OiBTdHJpbmdNYXA7XHJcbn1cclxuXHJcblxyXG4vKipcclxuICogUmVwcmVzZW50cyBhbiBBY2Nlc3MgVG9rZW4gcmVxdWVzdC5cclxuICogRm9yIG1vcmUgaW5mb3JtYXRpb24gbG9vayBhdDpcclxuICogaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzY3NDkjc2VjdGlvbi00LjEuM1xyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFRva2VuUmVxdWVzdCB7XHJcbiAgY2xpZW50SWQ6IHN0cmluZztcclxuICByZWRpcmVjdFVyaTogc3RyaW5nO1xyXG4gIGdyYW50VHlwZTogc3RyaW5nO1xyXG4gIGNvZGU6IHN0cmluZ3x1bmRlZmluZWQ7XHJcbiAgcmVmcmVzaFRva2VuOiBzdHJpbmd8dW5kZWZpbmVkO1xyXG4gIGV4dHJhczogU3RyaW5nTWFwfHVuZGVmaW5lZFxyXG5cclxuICBjb25zdHJ1Y3RvcihyZXF1ZXN0OiBUb2tlblJlcXVlc3RKc29uKSB7XHJcbiAgICB0aGlzLmNsaWVudElkID0gcmVxdWVzdC5jbGllbnRfaWQ7XHJcbiAgICB0aGlzLnJlZGlyZWN0VXJpID0gcmVxdWVzdC5yZWRpcmVjdF91cmk7XHJcbiAgICB0aGlzLmdyYW50VHlwZSA9IHJlcXVlc3QuZ3JhbnRfdHlwZTtcclxuICAgIHRoaXMuY29kZSA9IHJlcXVlc3QuY29kZTtcclxuICAgIHRoaXMucmVmcmVzaFRva2VuID0gcmVxdWVzdC5yZWZyZXNoX3Rva2VuO1xyXG4gICAgdGhpcy5leHRyYXMgPSByZXF1ZXN0LmV4dHJhcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNlcmlhbGl6ZXMgYSBUb2tlblJlcXVlc3QgdG8gYSBKYXZhU2NyaXB0IG9iamVjdC5cclxuICAgKi9cclxuICB0b0pzb24oKTogVG9rZW5SZXF1ZXN0SnNvbiB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBncmFudF90eXBlOiB0aGlzLmdyYW50VHlwZSxcclxuICAgICAgY29kZTogdGhpcy5jb2RlLFxyXG4gICAgICByZWZyZXNoX3Rva2VuOiB0aGlzLnJlZnJlc2hUb2tlbixcclxuICAgICAgcmVkaXJlY3RfdXJpOiB0aGlzLnJlZGlyZWN0VXJpLFxyXG4gICAgICBjbGllbnRfaWQ6IHRoaXMuY2xpZW50SWQsXHJcbiAgICAgIGV4dHJhczogdGhpcy5leHRyYXNcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICB0b1N0cmluZ01hcCgpOiBTdHJpbmdNYXAge1xyXG4gICAgbGV0IG1hcDogU3RyaW5nTWFwID0ge1xyXG4gICAgICBncmFudF90eXBlOiB0aGlzLmdyYW50VHlwZSxcclxuICAgICAgY2xpZW50X2lkOiB0aGlzLmNsaWVudElkLFxyXG4gICAgICByZWRpcmVjdF91cmk6IHRoaXMucmVkaXJlY3RVcmlcclxuICAgIH07XHJcblxyXG4gICAgaWYgKHRoaXMuY29kZSkge1xyXG4gICAgICBtYXBbJ2NvZGUnXSA9IHRoaXMuY29kZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5yZWZyZXNoVG9rZW4pIHtcclxuICAgICAgbWFwWydyZWZyZXNoX3Rva2VuJ10gPSB0aGlzLnJlZnJlc2hUb2tlbjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBjb3B5IG92ZXIgZXh0cmFzXHJcbiAgICBpZiAodGhpcy5leHRyYXMpIHtcclxuICAgICAgZm9yIChsZXQgZXh0cmEgaW4gdGhpcy5leHRyYXMpIHtcclxuICAgICAgICBpZiAodGhpcy5leHRyYXMuaGFzT3duUHJvcGVydHkoZXh0cmEpICYmICFtYXAuaGFzT3duUHJvcGVydHkoZXh0cmEpKSB7XHJcbiAgICAgICAgICAvLyBjaGVjayBiZWZvcmUgaW5zZXJ0aW5nIHRvIHJlcXVlc3RNYXBcclxuICAgICAgICAgIG1hcFtleHRyYV0gPSB0aGlzLmV4dHJhc1tleHRyYV07XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbWFwO1xyXG4gIH1cclxufVxyXG4iXX0=
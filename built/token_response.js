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
// constants
var AUTH_EXPIRY_BUFFER = 10 * 60; // 10 mins in seconds
/**
 * Returns the instant of time in seconds.
 */
exports.nowInSeconds = function () { return Math.round(new Date().getTime() / 1000); };
/**
 * Represents the Token Response type.
 * For more information look at:
 * https://tools.ietf.org/html/rfc6749#section-5.1
 */
var TokenResponse = /** @class */ (function () {
    function TokenResponse(response) {
        this.accessToken = response.access_token;
        this.tokenType = response.token_type || 'bearer';
        this.expiresIn = response.expires_in;
        this.refreshToken = response.refresh_token;
        this.scope = response.scope;
        this.idToken = response.id_token;
        this.issuedAt = response.issued_at || exports.nowInSeconds();
    }
    TokenResponse.prototype.toJson = function () {
        return {
            access_token: this.accessToken,
            id_token: this.idToken,
            refresh_token: this.refreshToken,
            scope: this.scope,
            token_type: this.tokenType,
            issued_at: this.issuedAt,
            expires_in: this.expiresIn
        };
    };
    TokenResponse.prototype.isValid = function (buffer) {
        if (buffer === void 0) { buffer = AUTH_EXPIRY_BUFFER; }
        if (this.expiresIn) {
            var now = exports.nowInSeconds();
            return now < this.issuedAt + this.expiresIn + buffer;
        }
        else {
            return true;
        }
    };
    return TokenResponse;
}());
exports.TokenResponse = TokenResponse;
/**
 * Represents the Token Error type.
 * For more information look at:
 * https://tools.ietf.org/html/rfc6749#section-5.2
 */
var TokenError = /** @class */ (function () {
    function TokenError(tokenError) {
        this.error = tokenError.error;
        this.errorDescription = tokenError.error_description;
        this.errorUri = tokenError.error_uri;
    }
    TokenError.prototype.toJson = function () {
        return {
            error: this.error, error_description: this.errorDescription, error_uri: this.errorUri
        };
    };
    return TokenError;
}());
exports.TokenError = TokenError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9rZW5fcmVzcG9uc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdG9rZW5fcmVzcG9uc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7R0FZRzs7QUF1Q0gsWUFBWTtBQUNaLElBQU0sa0JBQWtCLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFFLHFCQUFxQjtBQUUxRDs7R0FFRztBQUNVLFFBQUEsWUFBWSxHQUFHLGNBQU0sT0FBQSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQXZDLENBQXVDLENBQUM7QUFFMUU7Ozs7R0FJRztBQUNIO0lBU0UsdUJBQVksUUFBMkI7UUFDckMsSUFBSSxDQUFDLFdBQVcsR0FBRyxRQUFRLENBQUMsWUFBWSxDQUFDO1FBQ3pDLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDLFVBQVUsSUFBSSxRQUFRLENBQUM7UUFDakQsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxZQUFZLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQztRQUMzQyxJQUFJLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUM7UUFDNUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDLFNBQVMsSUFBSSxvQkFBWSxFQUFFLENBQUM7SUFDdkQsQ0FBQztJQUVELDhCQUFNLEdBQU47UUFDRSxPQUFPO1lBQ0wsWUFBWSxFQUFFLElBQUksQ0FBQyxXQUFXO1lBQzlCLFFBQVEsRUFBRSxJQUFJLENBQUMsT0FBTztZQUN0QixhQUFhLEVBQUUsSUFBSSxDQUFDLFlBQVk7WUFDaEMsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO1lBQ2pCLFVBQVUsRUFBRSxJQUFJLENBQUMsU0FBUztZQUMxQixTQUFTLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDeEIsVUFBVSxFQUFFLElBQUksQ0FBQyxTQUFTO1NBQzNCLENBQUM7SUFDSixDQUFDO0lBRUQsK0JBQU8sR0FBUCxVQUFRLE1BQW1DO1FBQW5DLHVCQUFBLEVBQUEsMkJBQW1DO1FBQ3pDLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNsQixJQUFJLEdBQUcsR0FBRyxvQkFBWSxFQUFFLENBQUM7WUFDekIsT0FBTyxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQztTQUN0RDthQUFNO1lBQ0wsT0FBTyxJQUFJLENBQUM7U0FDYjtJQUNILENBQUM7SUFDSCxvQkFBQztBQUFELENBQUMsQUF2Q0QsSUF1Q0M7QUF2Q1ksc0NBQWE7QUF5QzFCOzs7O0dBSUc7QUFDSDtJQUtFLG9CQUFZLFVBQTBCO1FBQ3BDLElBQUksQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQztRQUM5QixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsVUFBVSxDQUFDLGlCQUFpQixDQUFDO1FBQ3JELElBQUksQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQztJQUN2QyxDQUFDO0lBRUQsMkJBQU0sR0FBTjtRQUNFLE9BQU87WUFDTCxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxpQkFBaUIsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxRQUFRO1NBQ3RGLENBQUE7SUFDSCxDQUFDO0lBQ0gsaUJBQUM7QUFBRCxDQUFDLEFBaEJELElBZ0JDO0FBaEJZLGdDQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLypcclxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIEluYy5cclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHRcclxuICogaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlXHJcbiAqIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyXHJcbiAqIGV4cHJlc3Mgb3IgaW1wbGllZC4gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG4vKipcclxuICogUmVwcmVzZW50cyB0aGUgYWNjZXNzIHRva2VuIHR5cGVzLlxyXG4gKiBGb3IgbW9yZSBpbmZvcm1hdGlvbiBzZWU6XHJcbiAqIGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmM2NzQ5I3NlY3Rpb24tNy4xXHJcbiAqL1xyXG5leHBvcnQgdHlwZSBUb2tlblR5cGUgPSAnYmVhcmVyJ3wnbWFjJztcclxuXHJcbi8qKlxyXG4gKiBSZXByZXNlbnRzIHRoZSBUb2tlblJlc3BvbnNlIGFzIGEgSlNPTiBPYmplY3QuXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIFRva2VuUmVzcG9uc2VKc29uIHtcclxuICBhY2Nlc3NfdG9rZW46IHN0cmluZztcclxuICB0b2tlbl90eXBlPzogVG9rZW5UeXBlOyAvKiB0cmVhdGluZyB0b2tlbiB0eXBlIGFzIG9wdGlvbmFsLCBhcyBpdHMgZ29pbmcgdG8gYmUgaW5mZXJyZWQuICovXHJcbiAgZXhwaXJlc19pbj86IG51bWJlcjsgICAgLyogbGlmZXRpbWUgaW4gc2Vjb25kcy4gKi9cclxuICByZWZyZXNoX3Rva2VuPzogc3RyaW5nO1xyXG4gIHNjb3BlPzogc3RyaW5nO1xyXG4gIGlkX3Rva2VuPzogc3RyaW5nOyAgLyogaHR0cHM6Ly9vcGVuaWQubmV0L3NwZWNzL29wZW5pZC1jb25uZWN0LWNvcmUtMV8wLmh0bWwjVG9rZW5SZXNwb25zZSAqL1xyXG4gIGlzc3VlZF9hdD86IG51bWJlcjsgLyogd2hlbiB3YXMgaXQgaXNzdWVkID8gKi9cclxufVxyXG5cclxuLyoqXHJcbiAqIFJlcHJlc2VudHMgdGhlIHBvc3NpYmxlIGVycm9yIGNvZGVzIGZyb20gdGhlIHRva2VuIGVuZHBvaW50LlxyXG4gKiBGb3IgbW9yZSBpbmZvcm1hdGlvbiBsb29rIGF0OlxyXG4gKiBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjNjc0OSNzZWN0aW9uLTUuMlxyXG4gKi9cclxuZXhwb3J0IHR5cGUgRXJyb3JUeXBlID0gJ2ludmFsaWRfcmVxdWVzdCd8J2ludmFsaWRfY2xpZW50J3wnaW52YWxpZF9ncmFudCd8J3VuYXV0aG9yaXplZF9jbGllbnQnfFxyXG4gICAgJ3Vuc3VwcG9ydGVkX2dyYW50X3R5cGUnfCdpbnZhbGlkX3Njb3BlJztcclxuXHJcbi8qKlxyXG4gKiBSZXByZXNlbnRzIHRoZSBUb2tlbkVycm9yIGFzIGEgSlNPTiBPYmplY3QuXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIFRva2VuRXJyb3JKc29uIHtcclxuICBlcnJvcjogRXJyb3JUeXBlO1xyXG4gIGVycm9yX2Rlc2NyaXB0aW9uPzogc3RyaW5nO1xyXG4gIGVycm9yX3VyaT86IHN0cmluZztcclxufVxyXG5cclxuLy8gY29uc3RhbnRzXHJcbmNvbnN0IEFVVEhfRVhQSVJZX0JVRkZFUiA9IDEwICogNjA7ICAvLyAxMCBtaW5zIGluIHNlY29uZHNcclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRoZSBpbnN0YW50IG9mIHRpbWUgaW4gc2Vjb25kcy5cclxuICovXHJcbmV4cG9ydCBjb25zdCBub3dJblNlY29uZHMgPSAoKSA9PiBNYXRoLnJvdW5kKG5ldyBEYXRlKCkuZ2V0VGltZSgpIC8gMTAwMCk7XHJcblxyXG4vKipcclxuICogUmVwcmVzZW50cyB0aGUgVG9rZW4gUmVzcG9uc2UgdHlwZS5cclxuICogRm9yIG1vcmUgaW5mb3JtYXRpb24gbG9vayBhdDpcclxuICogaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzY3NDkjc2VjdGlvbi01LjFcclxuICovXHJcbmV4cG9ydCBjbGFzcyBUb2tlblJlc3BvbnNlIHtcclxuICBhY2Nlc3NUb2tlbjogc3RyaW5nO1xyXG4gIHRva2VuVHlwZTogVG9rZW5UeXBlO1xyXG4gIGV4cGlyZXNJbjogbnVtYmVyfHVuZGVmaW5lZDtcclxuICByZWZyZXNoVG9rZW46IHN0cmluZ3x1bmRlZmluZWQ7XHJcbiAgc2NvcGU6IHN0cmluZ3x1bmRlZmluZWQ7XHJcbiAgaWRUb2tlbjogc3RyaW5nfHVuZGVmaW5lZDtcclxuICBpc3N1ZWRBdDogbnVtYmVyO1xyXG5cclxuICBjb25zdHJ1Y3RvcihyZXNwb25zZTogVG9rZW5SZXNwb25zZUpzb24pIHtcclxuICAgIHRoaXMuYWNjZXNzVG9rZW4gPSByZXNwb25zZS5hY2Nlc3NfdG9rZW47XHJcbiAgICB0aGlzLnRva2VuVHlwZSA9IHJlc3BvbnNlLnRva2VuX3R5cGUgfHwgJ2JlYXJlcic7XHJcbiAgICB0aGlzLmV4cGlyZXNJbiA9IHJlc3BvbnNlLmV4cGlyZXNfaW47XHJcbiAgICB0aGlzLnJlZnJlc2hUb2tlbiA9IHJlc3BvbnNlLnJlZnJlc2hfdG9rZW47XHJcbiAgICB0aGlzLnNjb3BlID0gcmVzcG9uc2Uuc2NvcGU7XHJcbiAgICB0aGlzLmlkVG9rZW4gPSByZXNwb25zZS5pZF90b2tlbjtcclxuICAgIHRoaXMuaXNzdWVkQXQgPSByZXNwb25zZS5pc3N1ZWRfYXQgfHwgbm93SW5TZWNvbmRzKCk7XHJcbiAgfVxyXG5cclxuICB0b0pzb24oKTogVG9rZW5SZXNwb25zZUpzb24ge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgYWNjZXNzX3Rva2VuOiB0aGlzLmFjY2Vzc1Rva2VuLFxyXG4gICAgICBpZF90b2tlbjogdGhpcy5pZFRva2VuLFxyXG4gICAgICByZWZyZXNoX3Rva2VuOiB0aGlzLnJlZnJlc2hUb2tlbixcclxuICAgICAgc2NvcGU6IHRoaXMuc2NvcGUsXHJcbiAgICAgIHRva2VuX3R5cGU6IHRoaXMudG9rZW5UeXBlLFxyXG4gICAgICBpc3N1ZWRfYXQ6IHRoaXMuaXNzdWVkQXQsXHJcbiAgICAgIGV4cGlyZXNfaW46IHRoaXMuZXhwaXJlc0luXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgaXNWYWxpZChidWZmZXI6IG51bWJlciA9IEFVVEhfRVhQSVJZX0JVRkZFUik6IGJvb2xlYW4ge1xyXG4gICAgaWYgKHRoaXMuZXhwaXJlc0luKSB7XHJcbiAgICAgIGxldCBub3cgPSBub3dJblNlY29uZHMoKTtcclxuICAgICAgcmV0dXJuIG5vdyA8IHRoaXMuaXNzdWVkQXQgKyB0aGlzLmV4cGlyZXNJbiArIGJ1ZmZlcjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIFJlcHJlc2VudHMgdGhlIFRva2VuIEVycm9yIHR5cGUuXHJcbiAqIEZvciBtb3JlIGluZm9ybWF0aW9uIGxvb2sgYXQ6XHJcbiAqIGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmM2NzQ5I3NlY3Rpb24tNS4yXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgVG9rZW5FcnJvciB7XHJcbiAgZXJyb3I6IEVycm9yVHlwZTtcclxuICBlcnJvckRlc2NyaXB0aW9uOiBzdHJpbmd8dW5kZWZpbmVkO1xyXG4gIGVycm9yVXJpOiBzdHJpbmd8dW5kZWZpbmVkO1xyXG5cclxuICBjb25zdHJ1Y3Rvcih0b2tlbkVycm9yOiBUb2tlbkVycm9ySnNvbikge1xyXG4gICAgdGhpcy5lcnJvciA9IHRva2VuRXJyb3IuZXJyb3I7XHJcbiAgICB0aGlzLmVycm9yRGVzY3JpcHRpb24gPSB0b2tlbkVycm9yLmVycm9yX2Rlc2NyaXB0aW9uO1xyXG4gICAgdGhpcy5lcnJvclVyaSA9IHRva2VuRXJyb3IuZXJyb3JfdXJpO1xyXG4gIH1cclxuXHJcbiAgdG9Kc29uKCk6IFRva2VuRXJyb3JKc29uIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGVycm9yOiB0aGlzLmVycm9yLCBlcnJvcl9kZXNjcmlwdGlvbjogdGhpcy5lcnJvckRlc2NyaXB0aW9uLCBlcnJvcl91cmk6IHRoaXMuZXJyb3JVcmlcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19
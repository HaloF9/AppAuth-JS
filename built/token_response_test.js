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
var token_response_1 = require("./token_response");
describe('Token Response tests', function () {
    var accessToken = 'accessToken';
    var idToken = 'idToken';
    it('Basic Token Response Tests', function () {
        var response = new token_response_1.TokenResponse({ access_token: accessToken });
        expect(response).not.toBeNull();
        expect(response.accessToken).toBe(accessToken);
        expect(response.idToken).toBeFalsy();
        expect(response.tokenType).toBe('bearer');
        expect(response.issuedAt).toBeTruthy();
        expect(response.isValid()).toBe(true);
        expect(response.refreshToken).toBeFalsy();
        expect(response.scope).toBeFalsy();
    });
    it('Test response token validity', function () {
        var response = new token_response_1.TokenResponse({
            access_token: accessToken,
            token_type: 'bearer',
            expires_in: 1000,
            refresh_token: undefined,
            scope: undefined,
            id_token: idToken,
            issued_at: 1
        });
        expect(response).not.toBeNull();
        expect(response.accessToken).toBe(accessToken);
        expect(response.idToken).toBe(idToken);
        expect(response.tokenType).toBe('bearer');
        expect(response.issuedAt).toBeTruthy();
        expect(response.isValid(0)).toBe(false);
        expect(response.refreshToken).toBeFalsy();
        expect(response.scope).toBeFalsy();
    });
    it('To Json() and from Json() should work', function () {
        var response = new token_response_1.TokenResponse({ access_token: accessToken, id_token: idToken });
        var json = JSON.parse(JSON.stringify(response.toJson()));
        var newResponse = new token_response_1.TokenResponse(json);
        expect(newResponse).not.toBeNull();
        expect(newResponse.accessToken).toBe(accessToken);
        expect(newResponse.idToken).toBe(idToken);
        expect(newResponse.tokenType).toBe('bearer');
        expect(newResponse.issuedAt).toBeTruthy();
        expect(newResponse.isValid()).toBe(true);
        expect(newResponse.refreshToken).toBeFalsy();
        expect(newResponse.scope).toBeFalsy();
    });
    it('Basic Token Error Tests', function () {
        var error = new token_response_1.TokenError({ error: 'invalid_client' });
        expect(error).toBeTruthy();
        expect(error.error).toBe('invalid_client');
        expect(error.errorDescription).toBeFalsy();
        expect(error.errorUri).toBeFalsy();
    });
    it('To Json and from JSON should work for errors', function () {
        var error = new token_response_1.TokenError({ error: 'invalid_client' });
        var json = JSON.parse(JSON.stringify(error.toJson()));
        var newError = new token_response_1.TokenError(json);
        expect(newError).toBeTruthy();
        expect(newError.error).toBe('invalid_client');
        expect(newError.errorDescription).toBeFalsy();
        expect(newError.errorUri).toBeFalsy();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9rZW5fcmVzcG9uc2VfdGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy90b2tlbl9yZXNwb25zZV90ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7O0dBWUc7O0FBRUgsbURBQTJEO0FBRTNELFFBQVEsQ0FBQyxzQkFBc0IsRUFBRTtJQUMvQixJQUFNLFdBQVcsR0FBRyxhQUFhLENBQUM7SUFDbEMsSUFBTSxPQUFPLEdBQUcsU0FBUyxDQUFDO0lBRTFCLEVBQUUsQ0FBQyw0QkFBNEIsRUFBRTtRQUMvQixJQUFJLFFBQVEsR0FBRyxJQUFJLDhCQUFhLENBQUMsRUFBQyxZQUFZLEVBQUUsV0FBVyxFQUFDLENBQUMsQ0FBQztRQUM5RCxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2hDLE1BQU0sQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQy9DLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDckMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDMUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUN2QyxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RDLE1BQU0sQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDMUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNyQyxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyw4QkFBOEIsRUFBRTtRQUNqQyxJQUFJLFFBQVEs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LFNBQVMsRUFBRSxDQUFDO0lBQ3JDLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLDhDQUE4QyxFQUFFO1FBQ2pELElBQUksS0FBSyxHQUFHLElBQUksMkJBQVUsQ0FBQyxFQUFDLEtBQUssRUFBRSxnQkFBZ0IsRUFBQyxDQUFDLENBQUM7UUFDdEQsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDdEQsSUFBSSxRQUFRLEdBQUcsSUFBSSwyQkFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUM5QixNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQzlDLE1BQU0sQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUM5QyxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3hDLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxyXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgSW5jLlxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdFxyXG4gKiBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGVcclxuICogTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXJcclxuICogZXhwcmVzcyBvciBpbXBsaWVkLiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCB7VG9rZW5FcnJvciwgVG9rZW5SZXNwb25zZX0gZnJvbSAnLi90b2tlbl9yZXNwb25zZSc7XHJcblxyXG5kZXNjcmliZSgnVG9rZW4gUmVzcG9uc2UgdGVzdHMnLCAoKSA9PiB7XHJcbiAgY29uc3QgYWNjZXNzVG9rZW4gPSAnYWNjZXNzVG9rZW4nO1xyXG4gIGNvbnN0IGlkVG9rZW4gPSAnaWRUb2tlbic7XHJcblxyXG4gIGl0KCdCYXNpYyBUb2tlbiBSZXNwb25zZSBUZXN0cycsICgpID0+IHtcclxuICAgIGxldCByZXNwb25zZSA9IG5ldyBUb2tlblJlc3BvbnNlKHthY2Nlc3NfdG9rZW46IGFjY2Vzc1Rva2VufSk7XHJcbiAgICBleHBlY3QocmVzcG9uc2UpLm5vdC50b0JlTnVsbCgpO1xyXG4gICAgZXhwZWN0KHJlc3BvbnNlLmFjY2Vzc1Rva2VuKS50b0JlKGFjY2Vzc1Rva2VuKTtcclxuICAgIGV4cGVjdChyZXNwb25zZS5pZFRva2VuKS50b0JlRmFsc3koKTtcclxuICAgIGV4cGVjdChyZXNwb25zZS50b2tlblR5cGUpLnRvQmUoJ2JlYXJlcicpO1xyXG4gICAgZXhwZWN0KHJlc3BvbnNlLmlzc3VlZEF0KS50b0JlVHJ1dGh5KCk7XHJcbiAgICBleHBlY3QocmVzcG9uc2UuaXNWYWxpZCgpKS50b0JlKHRydWUpO1xyXG4gICAgZXhwZWN0KHJlc3BvbnNlLnJlZnJlc2hUb2tlbikudG9CZUZhbHN5KCk7XHJcbiAgICBleHBlY3QocmVzcG9uc2Uuc2NvcGUpLnRvQmVGYWxzeSgpO1xyXG4gIH0pO1xyXG5cclxuICBpdCgnVGVzdCByZXNwb25zZSB0b2tlbiB2YWxpZGl0eScsICgpID0+IHtcclxuICAgIGxldCByZXNwb25zZSA9IG5ldyBUb2tlblJlc3BvbnNlKHtcclxuICAgICAgYWNjZXNzX3Rva2VuOiBhY2Nlc3NUb2tlbixcclxuICAgICAgdG9rZW5fdHlwZTogJ2JlYXJlcicsXHJcbiAgICAgIGV4cGlyZXNfaW46IDEwMDAsXHJcbiAgICAgIHJlZnJlc2hfdG9rZW46IHVuZGVmaW5lZCxcclxuICAgICAgc2NvcGU6IHVuZGVmaW5lZCxcclxuICAgICAgaWRfdG9rZW46IGlkVG9rZW4sXHJcbiAgICAgIGlzc3VlZF9hdDogMVxyXG4gICAgfSk7XHJcblxyXG4gICAgZXhwZWN0KHJlc3BvbnNlKS5ub3QudG9CZU51bGwoKTtcclxuICAgIGV4cGVjdChyZXNwb25zZS5hY2Nlc3NUb2tlbikudG9CZShhY2Nlc3NUb2tlbik7XHJcbiAgICBleHBlY3QocmVzcG9uc2UuaWRUb2tlbikudG9CZShpZFRva2VuKTtcclxuICAgIGV4cGVjdChyZXNwb25zZS50b2tlblR5cGUpLnRvQmUoJ2JlYXJlcicpO1xyXG4gICAgZXhwZWN0KHJlc3BvbnNlLmlzc3VlZEF0KS50b0JlVHJ1dGh5KCk7XHJcbiAgICBleHBlY3QocmVzcG9uc2UuaXNWYWxpZCgwKSkudG9CZShmYWxzZSk7XHJcbiAgICBleHBlY3QocmVzcG9uc2UucmVmcmVzaFRva2VuKS50b0JlRmFsc3koKTtcclxuICAgIGV4cGVjdChyZXNwb25zZS5zY29wZSkudG9CZUZhbHN5KCk7XHJcbiAgfSk7XHJcblxyXG4gIGl0KCdUbyBKc29uKCkgYW5kIGZyb20gSnNvbigpIHNob3VsZCB3b3JrJywgKCkgPT4ge1xyXG4gICAgbGV0IHJlc3BvbnNlID0gbmV3IFRva2VuUmVzcG9uc2Uoe2FjY2Vzc190b2tlbjogYWNjZXNzVG9rZW4sIGlkX3Rva2VuOiBpZFRva2VufSk7XHJcbiAgICBsZXQganNvbiA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkocmVzcG9uc2UudG9Kc29uKCkpKTtcclxuICAgIGxldCBuZXdSZXNwb25zZSA9IG5ldyBUb2tlblJlc3BvbnNlKGpzb24pO1xyXG4gICAgZXhwZWN0KG5ld1Jlc3BvbnNlKS5ub3QudG9CZU51bGwoKTtcclxuICAgIGV4cGVjdChuZXdSZXNwb25zZS5hY2Nlc3NUb2tlbikudG9CZShhY2Nlc3NUb2tlbik7XHJcbiAgICBleHBlY3QobmV3UmVzcG9uc2UuaWRUb2tlbikudG9CZShpZFRva2VuKTtcclxuICAgIGV4cGVjdChuZXdSZXNwb25zZS50b2tlblR5cGUpLnRvQmUoJ2JlYXJlcicpO1xyXG4gICAgZXhwZWN0KG5ld1Jlc3BvbnNlLmlzc3VlZEF0KS50b0JlVHJ1dGh5KCk7XHJcbiAgICBleHBlY3QobmV3UmVzcG9uc2UuaXNWYWxpZCgpKS50b0JlKHRydWUpO1xyXG4gICAgZXhwZWN0KG5ld1Jlc3BvbnNlLnJlZnJlc2hUb2tlbikudG9CZUZhbHN5KCk7XHJcbiAgICBleHBlY3QobmV3UmVzcG9uc2Uuc2NvcGUpLnRvQmVGYWxzeSgpO1xyXG4gIH0pO1xyXG5cclxuICBpdCgnQmFzaWMgVG9rZW4gRXJyb3IgVGVzdHMnLCAoKSA9PiB7XHJcbiAgICBsZXQgZXJyb3IgPSBuZXcgVG9rZW5FcnJvcih7ZXJyb3I6ICdpbnZhbGlkX2NsaWVudCd9KTtcclxuICAgIGV4cGVjdChlcnJvcikudG9CZVRydXRoeSgpO1xyXG4gICAgZXhwZWN0KGVycm9yLmVycm9yKS50b0JlKCdpbnZhbGlkX2NsaWVudCcpO1xyXG4gICAgZXhwZWN0KGVycm9yLmVycm9yRGVzY3JpcHRpb24pLnRvQmVGYWxzeSgpO1xyXG4gICAgZXhwZWN0KGVycm9yLmVycm9yVXJpKS50b0JlRmFsc3koKTtcclxuICB9KTtcclxuXHJcbiAgaXQoJ1RvIEpzb24gYW5kIGZyb20gSlNPTiBzaG91bGQgd29yayBmb3IgZXJyb3JzJywgKCkgPT4ge1xyXG4gICAgbGV0IGVycm9yID0gbmV3IFRva2VuRXJyb3Ioe2Vycm9yOiAnaW52YWxpZF9jbGllbnQnfSk7XHJcbiAgICBsZXQganNvbiA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoZXJyb3IudG9Kc29uKCkpKTtcclxuICAgIGxldCBuZXdFcnJvciA9IG5ldyBUb2tlbkVycm9yKGpzb24pO1xyXG4gICAgZXhwZWN0KG5ld0Vycm9yKS50b0JlVHJ1dGh5KCk7XHJcbiAgICBleHBlY3QobmV3RXJyb3IuZXJyb3IpLnRvQmUoJ2ludmFsaWRfY2xpZW50Jyk7XHJcbiAgICBleHBlY3QobmV3RXJyb3IuZXJyb3JEZXNjcmlwdGlvbikudG9CZUZhbHN5KCk7XHJcbiAgICBleHBlY3QobmV3RXJyb3IuZXJyb3JVcmkpLnRvQmVGYWxzeSgpO1xyXG4gIH0pO1xyXG59KTtcclxuIl19
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
var revoke_token_request_1 = require("./revoke_token_request");
describe('Revoke Token Request tests', function () {
    var token = 'token';
    var request = new revoke_token_request_1.RevokeTokenRequest({ token: token });
    it('Basic Revoke Token Request Tests', function () {
        expect(request).not.toBeNull();
        expect(request.token).toBe(token);
    });
    it('To Json() and from Json() should work', function () {
        var json = JSON.parse(JSON.stringify(request.toJson()));
        expect(json).not.toBeNull();
        var newRequest = new revoke_token_request_1.RevokeTokenRequest(json);
        expect(newRequest).not.toBeNull();
        expect(newRequest.token).toBe(token);
    });
});
describe('Authenticated Revoke Token Request tests', function () {
    var token = 'token';
    var tokenTypeHint = 'refresh_token';
    var clientId = 'client_id';
    var clientSecret = 'client_secret';
    var request = new revoke_token_request_1.RevokeTokenRequest({
        token: token,
        token_type_hint: tokenTypeHint,
        client_id: clientId,
        client_secret: clientSecret
    });
    it('Basic Revoke Token Request Tests', function () {
        expect(request).not.toBeNull();
        expect(request.token).toBe(token);
        expect(request.tokenTypeHint).toBe(tokenTypeHint);
        expect(request.clientId).toBe(clientId);
        expect(request.clientSecret).toBe(clientSecret);
    });
    it('To Json() and from Json() should work', function () {
        var json = JSON.parse(JSON.stringify(request.toJson()));
        expect(json).not.toBeNull();
        var newRequest = new revoke_token_request_1.RevokeTokenRequest(json);
        expect(newRequest).not.toBeNull();
        expect(newRequest.token).toBe(token);
        expect(newRequest.tokenTypeHint).toBe(tokenTypeHint);
        expect(newRequest.clientId).toBe(clientId);
        expect(newRequest.clientSecret).toBe(clientSecret);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmV2b2tlX3Rva2VuX3JlcXVlc3RfdGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9yZXZva2VfdG9rZW5fcmVxdWVzdF90ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7O0dBWUc7O0FBRUgsK0RBQTBEO0FBRTFELFFBQVEsQ0FBQyw0QkFBNEIsRUFBRTtJQUNyQyxJQUFNLEtBQUssR0FBRyxPQUFPLENBQUM7SUFFdEIsSUFBSSxPQUFPLEdBQXVCLElBQUkseUNBQWtCLENBQUMsRUFBQyxLQUFLLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQztJQUN6RSxFQUFFLENBQUMsa0NBQWtDLEVBQUU7UUFDckMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUMvQixNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNwQyxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyx1Q0FBdUMsRUFBRTtRQUMxQyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN4RCxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzVCLElBQUksVUFBVSxHQUFHLElBQUkseUNBQWtCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDOUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNsQyxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN2QyxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDO0FBRUgsUUFBUSxDQUFDLDBDQUEwQyxFQUFFO0lBQ25ELElBQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQztJQUN0QixJQUFNLGFBQWEsR0FBRyxlQUFlLENBQUM7SUFDdEMsSUFBTSxRQUFRLEdBQUcsV0FBVyxDQUFDO0lBQzdCLElBQU0sWUFBWSxHQUFHLGVBQWUsQ0FBQztJQUVyQyxJQUFJLE9BQU8sR0FBdUIsSUFBSSx5Q0FBa0IsQ0FBQztRQUN2RCxLQUFLLEVBQUUsS0FBSztRQUNaLGVBQWUsRUFBRSxhQUFhO1FBQzlCLFNBQVMsRUFBRSxRQUFRO1FBQ25CLGFBQWEsRUFBRSxZQUFZO0tBQzVCLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxrQ0FBa0MsRUFBRTtRQUNyQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQy9CLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2xDLE1BQU0sQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ2xELE1BQU0sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3hDLE1BQU0sQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ2xELENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLHVDQUF1QyxFQUFFO1FBQzFDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3hELE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDNUIsSUFBSSxVQUFVLEdBQUcsSUFBSSx5Q0FBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM5QyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2xDLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3JDLE1BQU0sQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3JELE1BQU0sQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzNDLE1BQU0sQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3JELENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxyXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgSW5jLlxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdFxyXG4gKiBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGVcclxuICogTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXJcclxuICogZXhwcmVzcyBvciBpbXBsaWVkLiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCB7UmV2b2tlVG9rZW5SZXF1ZXN0fSBmcm9tICcuL3Jldm9rZV90b2tlbl9yZXF1ZXN0JztcclxuXHJcbmRlc2NyaWJlKCdSZXZva2UgVG9rZW4gUmVxdWVzdCB0ZXN0cycsICgpID0+IHtcclxuICBjb25zdCB0b2tlbiA9ICd0b2tlbic7XHJcblxyXG4gIGxldCByZXF1ZXN0OiBSZXZva2VUb2tlblJlcXVlc3QgPSBuZXcgUmV2b2tlVG9rZW5SZXF1ZXN0KHt0b2tlbjogdG9rZW59KTtcclxuICBpdCgnQmFzaWMgUmV2b2tlIFRva2VuIFJlcXVlc3QgVGVzdHMnLCAoKSA9PiB7XHJcbiAgICBleHBlY3QocmVxdWVzdCkubm90LnRvQmVOdWxsKCk7XHJcbiAgICBleHBlY3QocmVxdWVzdC50b2tlbikudG9CZSh0b2tlbik7XHJcbiAgfSk7XHJcblxyXG4gIGl0KCdUbyBKc29uKCkgYW5kIGZyb20gSnNvbigpIHNob3VsZCB3b3JrJywgKCkgPT4ge1xyXG4gICAgbGV0IGpzb24gPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHJlcXVlc3QudG9Kc29uKCkpKTtcclxuICAgIGV4cGVjdChqc29uKS5ub3QudG9CZU51bGwoKTtcclxuICAgIGxldCBuZXdSZXF1ZXN0ID0gbmV3IFJldm9rZVRva2VuUmVxdWVzdChqc29uKTtcclxuICAgIGV4cGVjdChuZXdSZXF1ZXN0KS5ub3QudG9CZU51bGwoKTtcclxuICAgIGV4cGVjdChuZXdSZXF1ZXN0LnRva2VuKS50b0JlKHRva2VuKTtcclxuICB9KTtcclxufSk7XHJcblxyXG5kZXNjcmliZSgnQXV0aGVudGljYXRlZCBSZXZva2UgVG9rZW4gUmVxdWVzdCB0ZXN0cycsICgpID0+IHtcclxuICBjb25zdCB0b2tlbiA9ICd0b2tlbic7XHJcbiAgY29uc3QgdG9rZW5UeXBlSGludCA9ICdyZWZyZXNoX3Rva2VuJztcclxuICBjb25zdCBjbGllbnRJZCA9ICdjbGllbnRfaWQnO1xyXG4gIGNvbnN0IGNsaWVudFNlY3JldCA9ICdjbGllbnRfc2VjcmV0JztcclxuXHJcbiAgbGV0IHJlcXVlc3Q6IFJldm9rZVRva2VuUmVxdWVzdCA9IG5ldyBSZXZva2VUb2tlblJlcXVlc3Qoe1xyXG4gICAgdG9rZW46IHRva2VuLFxyXG4gICAgdG9rZW5fdHlwZV9oaW50OiB0b2tlblR5cGVIaW50LFxyXG4gICAgY2xpZW50X2lkOiBjbGllbnRJZCxcclxuICAgIGNsaWVudF9zZWNyZXQ6IGNsaWVudFNlY3JldFxyXG4gIH0pO1xyXG5cclxuICBpdCgnQmFzaWMgUmV2b2tlIFRva2VuIFJlcXVlc3QgVGVzdHMnLCAoKSA9PiB7XHJcbiAgICBleHBlY3QocmVxdWVzdCkubm90LnRvQmVOdWxsKCk7XHJcbiAgICBleHBlY3QocmVxdWVzdC50b2tlbikudG9CZSh0b2tlbik7XHJcbiAgICBleHBlY3QocmVxdWVzdC50b2tlblR5cGVIaW50KS50b0JlKHRva2VuVHlwZUhpbnQpO1xyXG4gICAgZXhwZWN0KHJlcXVlc3QuY2xpZW50SWQpLnRvQmUoY2xpZW50SWQpO1xyXG4gICAgZXhwZWN0KHJlcXVlc3QuY2xpZW50U2VjcmV0KS50b0JlKGNsaWVudFNlY3JldCk7XHJcbiAgfSk7XHJcblxyXG4gIGl0KCdUbyBKc29uKCkgYW5kIGZyb20gSnNvbigpIHNob3VsZCB3b3JrJywgKCkgPT4ge1xyXG4gICAgbGV0IGpzb24gPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHJlcXVlc3QudG9Kc29uKCkpKTtcclxuICAgIGV4cGVjdChqc29uKS5ub3QudG9CZU51bGwoKTtcclxuICAgIGxldCBuZXdSZXF1ZXN0ID0gbmV3IFJldm9rZVRva2VuUmVxdWVzdChqc29uKTtcclxuICAgIGV4cGVjdChuZXdSZXF1ZXN0KS5ub3QudG9CZU51bGwoKTtcclxuICAgIGV4cGVjdChuZXdSZXF1ZXN0LnRva2VuKS50b0JlKHRva2VuKTtcclxuICAgIGV4cGVjdChuZXdSZXF1ZXN0LnRva2VuVHlwZUhpbnQpLnRvQmUodG9rZW5UeXBlSGludCk7XHJcbiAgICBleHBlY3QobmV3UmVxdWVzdC5jbGllbnRJZCkudG9CZShjbGllbnRJZCk7XHJcbiAgICBleHBlY3QobmV3UmVxdWVzdC5jbGllbnRTZWNyZXQpLnRvQmUoY2xpZW50U2VjcmV0KTtcclxuICB9KTtcclxufSk7XHJcbiJdfQ==
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
var crypto = require("crypto");
var crypto_utils_1 = require("../crypto_utils");
var NodeCrypto = /** @class */ (function () {
    function NodeCrypto() {
    }
    NodeCrypto.prototype.generateRandom = function (size) {
        var bytes = crypto.randomBytes(size);
        return crypto_utils_1.bufferToString(new Uint8Array(bytes.buffer));
    };
    NodeCrypto.prototype.deriveChallenge = function (code) {
        var hash = crypto.createHash('sha256').update(code).digest();
        return Promise.resolve(crypto_utils_1.urlSafe(new Uint8Array(hash.buffer)));
    };
    return NodeCrypto;
}());
exports.NodeCrypto = NodeCrypto;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3J5cHRvX3V0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL25vZGVfc3VwcG9ydC9jcnlwdG9fdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7R0FZRzs7QUFFSCwrQkFBaUM7QUFDakMsZ0RBQWtFO0FBRWxFO0lBQUE7SUFVQSxDQUFDO0lBVEMsbUNBQWMsR0FBZCxVQUFlLElBQVk7UUFDekIsSUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2QyxPQUFPLDZCQUFjLENBQUMsSUFBSSxVQUFVLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUVELG9DQUFlLEdBQWYsVUFBZ0IsSUFBWTtRQUMxQixJQUFNLElBQUksR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUMvRCxPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsc0JBQU8sQ0FBQyxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQy9ELENBQUM7SUFDSCxpQkFBQztBQUFELENBQUMsQUFWRCxJQVVDO0FBVlksZ0NBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxyXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgSW5jLlxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdFxyXG4gKiBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGVcclxuICogTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXJcclxuICogZXhwcmVzcyBvciBpbXBsaWVkLiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCAqIGFzIGNyeXB0byBmcm9tICdjcnlwdG8nO1xyXG5pbXBvcnQgeyBidWZmZXJUb1N0cmluZywgQ3J5cHRvLCB1cmxTYWZlIH0gZnJvbSAnLi4vY3J5cHRvX3V0aWxzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBOb2RlQ3J5cHRvIGltcGxlbWVudHMgQ3J5cHRvIHtcclxuICBnZW5lcmF0ZVJhbmRvbShzaXplOiBudW1iZXIpOiBzdHJpbmcge1xyXG4gICAgY29uc3QgYnl0ZXMgPSBjcnlwdG8ucmFuZG9tQnl0ZXMoc2l6ZSk7XHJcbiAgICByZXR1cm4gYnVmZmVyVG9TdHJpbmcobmV3IFVpbnQ4QXJyYXkoYnl0ZXMuYnVmZmVyKSk7XHJcbiAgfVxyXG5cclxuICBkZXJpdmVDaGFsbGVuZ2UoY29kZTogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+IHtcclxuICAgIGNvbnN0IGhhc2ggPSBjcnlwdG8uY3JlYXRlSGFzaCgnc2hhMjU2JykudXBkYXRlKGNvZGUpLmRpZ2VzdCgpO1xyXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh1cmxTYWZlKG5ldyBVaW50OEFycmF5KGhhc2guYnVmZmVyKSkpO1xyXG4gIH1cclxufVxyXG4iXX0=
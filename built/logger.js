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
var flags_1 = require("./flags");
function log(message) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    if (flags_1.IS_LOG) {
        var length_1 = args ? args.length : 0;
        if (length_1 > 0) {
            console.log.apply(console, [message].concat(args));
        }
        else {
            console.log(message);
        }
    }
}
exports.log = log;
;
// check to see if native support for profiling is available.
var NATIVE_PROFILE_SUPPORT = typeof window !== 'undefined' && !!window.performance && !!console.profile;
/**
 * A decorator that can profile a function.
 */
function profile(target, propertyKey, descriptor) {
    if (flags_1.IS_PROFILE) {
        return performProfile(target, propertyKey, descriptor);
    }
    else {
        // return as-is
        return descriptor;
    }
}
exports.profile = profile;
function performProfile(target, propertyKey, descriptor) {
    var originalCallable = descriptor.value;
    // name must exist
    var name = originalCallable.name;
    if (!name) {
        name = 'anonymous function';
    }
    if (NATIVE_PROFILE_SUPPORT) {
        descriptor.value = function (args) {
            console.profile(name);
            var startTime = window.performance.now();
            var result = originalCallable.call.apply(originalCallable, [this || window].concat(args));
            var duration = window.performance.now() - startTime;
            console.log(name + " took " + duration + " ms");
            console.profileEnd();
            return result;
        };
    }
    else {
        descriptor.value = function (args) {
            log("Profile start " + name);
            var start = Date.now();
            var result = originalCallable.call.apply(originalCallable, [this || window].concat(args));
            var duration = Date.now() - start;
            log("Profile end " + name + " took " + duration + " ms.");
            return result;
        };
    }
    return descriptor;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2xvZ2dlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7OztHQVlHOztBQUVILGlDQUEyQztBQUUzQyxTQUFnQixHQUFHLENBQUMsT0FBZTtJQUFFLGNBQWM7U0FBZCxVQUFjLEVBQWQscUJBQWMsRUFBZCxJQUFjO1FBQWQsNkJBQWM7O0lBQ2pELElBQUksY0FBTSxFQUFFO1FBQ1YsSUFBSSxRQUFNLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEMsSUFBSSxRQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ2QsT0FBTyxDQUFDLEdBQUcsT0FBWCxPQUFPLEdBQUssT0FBTyxTQUFLLElBQUksR0FBRTtTQUMvQjthQUFNO1lBQ0wsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUN0QjtLQUNGO0FBQ0gsQ0FBQztBQVRELGtCQVNDO0FBQUEsQ0FBQztBQUVGLDZEQUE2RDtBQUM3RCxJQUFNLHNCQUFzQixHQUN4QixPQUFPLE1BQU0sS0FBSyxXQUFXLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxXQUFXLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7QUFFL0U7O0dBRUc7QUFDSCxTQUFnQixPQUFPLENBQUMsTUFBVyxFQUFFLFdBQW1CLEVBQUUsVUFBOEI7SUFDdEYsSUFBSSxrQkFBVSxFQUFFO1FBQ2QsT0FBTyxjQUFjLENBQUMsTUFBTSxFQUFFLFdBQVcsRUFBRSxVQUFVLENBQUMsQ0FBQztLQUN4RDtTQUFNO1FBQ0wsZUFBZTtRQUNmLE9BQU8sVUFBVSxDQUFDO0tBQ25CO0FBQ0gsQ0FBQztBQVBELDBCQU9DO0FBRUQsU0FBUyxjQUFjLENBQ25CLE1BQVcsRUFBRSxXQUFtQixFQUFFLFVBQThCO0lBQ2xFLElBQUksZ0JBQWdCLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQztJQUN4QyxrQkFBa0I7SUFDbEIsSUFBSSxJQUFJLEdBQUcsZ0JBQWdCLENBQUMsSUFBSSxDQUFDO0lBQ2pDLElBQUksQ0FBQyxJQUFJLEVBQUU7UUFDVCxJQUFJLEdBQUcsb0JBQW9CLENBQUM7S0FDN0I7SUFDRCxJQUFJLHNCQUFzQixFQUFFO1FBQzFCLFVBQVUsQ0FBQyxLQUFLLEdBQUcsVUFBUyxJQUFXO1lBQ3JDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdEIsSUFBSSxTQUFTLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUN6QyxJQUFJLE1BQU0sR0FBRyxnQkFBZ0IsQ0FBQyxJQUFJLE9BQXJCLGdCQUFnQixHQUFNLElBQUksSUFBSSxNQUFNLFNBQUssSUFBSSxFQUFDLENBQUM7WUFDNUQsSUFBSSxRQUFRLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxTQUFTLENBQUM7WUFDcEQsT0FBTyxDQUFDLEdBQUcsQ0FBSSxJQUFJLGNBQVMsUUFBUSxRQUFLLENBQUMsQ0FBQztZQUMzQyxPQUFPLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDckIsT0FBTyxNQUFNLENBQUM7UUFDaEIsQ0FBQyxDQUFDO0tBQ0g7U0FBTTtRQUNMLFVBQVUsQ0FBQyxLQUFLLEdBQUcsVUFBUyxJQUFXO1lBQ3JDLEdBQUcsQ0FBQyxtQkFBaUIsSUFBTSxDQUFDLENBQUM7WUFDN0IsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQ3ZCLElBQUksTUFBTSxHQUFHLGdCQUFnQixDQUFDLElBQUksT0FBckIsZ0JBQWdCLEdBQU0sSUFBSSxJQUFJLE1BQU0sU0FBSyxJQUFJLEVBQUMsQ0FBQztZQUM1RCxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsS0FBSyxDQUFDO1lBQ2xDLEdBQUcsQ0FBQyxpQkFBZSxJQUFJLGNBQVMsUUFBUSxTQUFNLENBQUMsQ0FBQztZQUNoRCxPQUFPLE1BQU0sQ0FBQztRQUNoQixDQUFDLENBQUM7S0FDSDtJQUNELE9BQU8sVUFBVSxDQUFDO0FBQ3BCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxyXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgSW5jLlxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdFxyXG4gKiBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGVcclxuICogTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXJcclxuICogZXhwcmVzcyBvciBpbXBsaWVkLiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCB7SVNfTE9HLCBJU19QUk9GSUxFfSBmcm9tICcuL2ZsYWdzJztcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBsb2cobWVzc2FnZTogc3RyaW5nLCAuLi5hcmdzOiBhbnlbXSkge1xyXG4gIGlmIChJU19MT0cpIHtcclxuICAgIGxldCBsZW5ndGggPSBhcmdzID8gYXJncy5sZW5ndGggOiAwO1xyXG4gICAgaWYgKGxlbmd0aCA+IDApIHtcclxuICAgICAgY29uc29sZS5sb2cobWVzc2FnZSwgLi4uYXJncyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhtZXNzYWdlKTtcclxuICAgIH1cclxuICB9XHJcbn07XHJcblxyXG4vLyBjaGVjayB0byBzZWUgaWYgbmF0aXZlIHN1cHBvcnQgZm9yIHByb2ZpbGluZyBpcyBhdmFpbGFibGUuXHJcbmNvbnN0IE5BVElWRV9QUk9GSUxFX1NVUFBPUlQgPVxyXG4gICAgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgISF3aW5kb3cucGVyZm9ybWFuY2UgJiYgISFjb25zb2xlLnByb2ZpbGU7XHJcblxyXG4vKipcclxuICogQSBkZWNvcmF0b3IgdGhhdCBjYW4gcHJvZmlsZSBhIGZ1bmN0aW9uLlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHByb2ZpbGUodGFyZ2V0OiBhbnksIHByb3BlcnR5S2V5OiBzdHJpbmcsIGRlc2NyaXB0b3I6IFByb3BlcnR5RGVzY3JpcHRvcikge1xyXG4gIGlmIChJU19QUk9GSUxFKSB7XHJcbiAgICByZXR1cm4gcGVyZm9ybVByb2ZpbGUodGFyZ2V0LCBwcm9wZXJ0eUtleSwgZGVzY3JpcHRvcik7XHJcbiAgfSBlbHNlIHtcclxuICAgIC8vIHJldHVybiBhcy1pc1xyXG4gICAgcmV0dXJuIGRlc2NyaXB0b3I7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBwZXJmb3JtUHJvZmlsZShcclxuICAgIHRhcmdldDogYW55LCBwcm9wZXJ0eUtleTogc3RyaW5nLCBkZXNjcmlwdG9yOiBQcm9wZXJ0eURlc2NyaXB0b3IpOiBQcm9wZXJ0eURlc2NyaXB0b3Ige1xyXG4gIGxldCBvcmlnaW5hbENhbGxhYmxlID0gZGVzY3JpcHRvci52YWx1ZTtcclxuICAvLyBuYW1lIG11c3QgZXhpc3RcclxuICBsZXQgbmFtZSA9IG9yaWdpbmFsQ2FsbGFibGUubmFtZTtcclxuICBpZiAoIW5hbWUpIHtcclxuICAgIG5hbWUgPSAnYW5vbnltb3VzIGZ1bmN0aW9uJztcclxuICB9XHJcbiAgaWYgKE5BVElWRV9QUk9GSUxFX1NVUFBPUlQpIHtcclxuICAgIGRlc2NyaXB0b3IudmFsdWUgPSBmdW5jdGlvbihhcmdzOiBhbnlbXSkge1xyXG4gICAgICBjb25zb2xlLnByb2ZpbGUobmFtZSk7XHJcbiAgICAgIGxldCBzdGFydFRpbWUgPSB3aW5kb3cucGVyZm9ybWFuY2Uubm93KCk7XHJcbiAgICAgIGxldCByZXN1bHQgPSBvcmlnaW5hbENhbGxhYmxlLmNhbGwodGhpcyB8fCB3aW5kb3csIC4uLmFyZ3MpO1xyXG4gICAgICBsZXQgZHVyYXRpb24gPSB3aW5kb3cucGVyZm9ybWFuY2Uubm93KCkgLSBzdGFydFRpbWU7XHJcbiAgICAgIGNvbnNvbGUubG9nKGAke25hbWV9IHRvb2sgJHtkdXJhdGlvbn0gbXNgKTtcclxuICAgICAgY29uc29sZS5wcm9maWxlRW5kKCk7XHJcbiAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9O1xyXG4gIH0gZWxzZSB7XHJcbiAgICBkZXNjcmlwdG9yLnZhbHVlID0gZnVuY3Rpb24oYXJnczogYW55W10pIHtcclxuICAgICAgbG9nKGBQcm9maWxlIHN0YXJ0ICR7bmFtZX1gKTtcclxuICAgICAgbGV0IHN0YXJ0ID0gRGF0ZS5ub3coKTtcclxuICAgICAgbGV0IHJlc3VsdCA9IG9yaWdpbmFsQ2FsbGFibGUuY2FsbCh0aGlzIHx8IHdpbmRvdywgLi4uYXJncyk7XHJcbiAgICAgIGxldCBkdXJhdGlvbiA9IERhdGUubm93KCkgLSBzdGFydDtcclxuICAgICAgbG9nKGBQcm9maWxlIGVuZCAke25hbWV9IHRvb2sgJHtkdXJhdGlvbn0gbXMuYCk7XHJcbiAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9O1xyXG4gIH1cclxuICByZXR1cm4gZGVzY3JpcHRvcjtcclxufVxyXG4iXX0=
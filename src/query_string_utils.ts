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

import {LocationLike, StringMap} from './types';

/**
 * Query String Utilities.
 */
export interface QueryStringUtils {
  stringify(input: StringMap): string;
  parse(query: LocationLike, useHash?: boolean): StringMap;
  parseQueryString(query: string): StringMap;
}

export class BasicQueryStringUtils implements QueryStringUtils {
  parse(input: LocationLike, useHash?: boolean) {
    if (useHash) {
      return this.parseQueryString(input.hash);
    } else {
      return this.parseQueryString(input.search);
    }
  }

  parseQueryString(query: string): StringMap {
    let result: StringMap = {};
    // if anything starts with ?, # or & remove it
    query = query.trim().replace(/^(.*\?|#|&)/, '');
    let params = query.split('&');
    for (let i = 0; i < params.length; i += 1) {
      let param = params[i];  // looks something like a=b
      let parts = param.split('=');
      if (parts.length >= 2) {
        let key = decodeURIComponent(parts.shift()!);
        let value = parts.length > 0 ? parts.join('=') : null;
        if (value) {
          result[key] = decodeURIComponent(value);
        }
      }
    }
    return result;
  }

  stringify(input: StringMap) {
    let encoded: string[] = [];
    for (let key in input) {
      if (input.hasOwnProperty(key) && input[key]) {
        encoded.push(`${encodeURIComponent(key)}=${encodeURIComponent(input[key])}`)
      }
    }
    return encoded.join('&');
  }
}

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import path from 'path';
import Promise from 'bluebird';
import fs from './lib/fs';
import pkg from '../package.json';
/**
 * Copies static files such as robots.txt, favicon.ico to the
 * output (build) folder.
 */
async function copy({ watch } = {}) {
  const ncp = Promise.promisify(require('ncp'));

  await Promise.all([
    ncp('./favicon.ico', 'build/util/favicon.ico'),
    ncp('./apple-touch-icon-114x114.png', 'build/util/apple-touch-icon-114x114.png'),
    ncp('./css/lib', 'build/util/css/lib'),
    ncp('./js/lib', 'build/util/js/lib'),
    ncp('./public', 'build/util/public'),
    ncp('./views', 'build/util/views')
  ]);

  await fs.writeFile('./build/util/package.json', JSON.stringify({
    private: true,
    engines: pkg.engines,
    dependencies: pkg.dependencies,
    scripts: {
      stop: 'forever stop 0',
      start: 'forever start js/server.js',
    },
  }, null, 2));

}

export default copy;
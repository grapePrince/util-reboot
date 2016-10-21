/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

var webpack = require("webpack");
var webpackConfig = require("./webpack.config");

/**
 * Creates application bundles from the source files.
 */
function bundle() {
  return new Promise((resolve, reject) => {
    webpack(webpackConfig).run(function (err, stats) {
    	if (err) {
    		console.log(stats.toString());
    	}
    	resolve();
    });
  });
}

export default bundle;

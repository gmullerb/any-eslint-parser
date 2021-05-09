// Copyright (c) 2021 Gonzalo Müller Bravo.
// Licensed under the MIT License (MIT), see LICENSE.txt

module.exports = {
  parseForESLint: function () {
    return {
      ast: {
        type: 'Program',
        body: [],
        tokens: [],
        comments: [],
        range: [ 0, 0 ],
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 0
          }
        }
      }
    }
  }
}

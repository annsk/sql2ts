"use strict";
var fs = require('fs');
var path = require('path');
var knex = require('knex');
var pascalCase = require('pascal-case');
var pluralize = require('pluralize');
var Promise = require('bluebird');
function getTSType(sqlType) {
    var type = 'any';
    if (/tinyint\(1\)|bool/i.test(sqlType)) {
        type = 'boolean';
    }
    else if (/char|text|binary|blob|enum/i.test(sqlType)) {
        type = 'string';
    }
    else if (/int|decimal|float|bit/i.test(sqlType)) {
        type = 'number';
    }
    return type;
}
function generate(options) {
    var host = options.host || '127.0.0.1';
    var user = options.user || '';
    var password = options.password || '';
    var database = options.database || '';
    var table = options.table || '';
    var intend = options.intend || 'tab';
    var pathString = options.path || '';
    var interfaceName = pluralize(pascalCase(table), 1);
    var filename = options.filename || interfaceName + '.ts';
    var db = knex({
        client: 'mysql',
        connection: {
            host: host,
            user: user,
            password: password,
            database: database
        }
    });
    return new Promise(function (resolve, reject) {
        db.raw("DESCRIBE " + table).then(function (info) {
            var tsString = "interface " + interfaceName + " {\n";
            for (var _i = 0, _a = info[0]; _i < _a.length; _i++) {
                var i = _a[_i];
                var begin = intend === 'tab' ? '\t' : Array(intend).join(' ');
                tsString += "" + begin + i.Field + ": " + getTSType(i.Type) + ";\n";
            }
            tsString += '}\n';
            fs.writeFile(path.resolve(pathString, filename), tsString, { encoding: 'utf8' }, function () {
                db.destroy();
                resolve();
            });
        }).catch(function (e) {
            reject(e);
        });
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = generate;
//# sourceMappingURL=index.js.map
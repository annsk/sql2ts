import * as fs from 'fs';
import * as path from 'path';
import * as knex from 'knex';
import pascalCase = require('pascal-case');
import * as pluralize from 'pluralize';
import * as Promise from 'bluebird';

interface Options {
    host?: 'string';
    user?: 'string';
    password?: 'string';
    database: 'string';
    table: 'string';
    intend?: 'string';
    path?: 'string';
    filename?: 'string';
}

function getTSType(sqlType) {
    let type = 'any';
    if (/tinyint\(1\)|bool/i.test(sqlType)){
        type = 'boolean';
    } else if (/char|text|binary|blob|enum/i.test(sqlType)) {
        type = 'string';
    } else if (/int|decimal|float|bit/i.test(sqlType)) {
        type = 'number';
    }
    return type;
}

export default function generate(options): Promise<any> {
    const host: string = options.host || '127.0.0.1';
    const user: string = options.user || '';
    const password: string = options.password || '';
    const database: string = options.database || '';
    const table: string = options.table || '';
    const intend: string = options.intend || 'tab';
    const pathString: string = options.path || '';
    const interfaceName = pluralize(pascalCase(table), 1);
    const filename: string = options.filename || interfaceName + '.ts';
    const db = knex({
        client: 'mysql',
        connection: {
            host,
            user,
            password,
            database
        }
    });
    return new Promise((resolve, reject) => {
        (<any>db.raw(`DESCRIBE ${table}`)).then((info) => {
            let tsString = `interface ${interfaceName} {\n`;
            for (let i of info[0]) {
                const begin = intend === 'tab' ? '\t' : Array(intend).join(' ');
                tsString += `${begin}${i.Field}: ${getTSType(i.Type)};\n`
            }
            tsString += '}\n';
            fs.writeFile(path.resolve(pathString, filename), tsString, {encoding: 'utf8' }, () => {
                db.destroy();
                resolve();
            });
        }).catch((e) => {
            reject(e);
        });
    });
}
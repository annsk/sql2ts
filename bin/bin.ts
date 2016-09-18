import sql2ts from '../src/index';
import * as cli from 'cli';
import * as path from 'path';
cli.setApp(path.resolve(__dirname, '../', 'package.json'));
cli.enable('version');
const options = cli.parse({
    host: ['h', 'Host.', 'url', 'localhost'],
    user: ['u', 'Database user.', 'string'],
    password: ['p', 'Database password.', 'password'],
    database: ['d', 'Database name.', 'string'],
    table: ['t', 'Table name.', 'string'],
    intend: ['i', 'Intendation size. Tab or space count.'],
    path: [false , 'Path for output file','file'],
    filename: ['f', 'Output file name', 'file']
});

sql2ts({
    host: options.host,
    database: options.database,
    table: options.table,
    path: options.path,
    user: options.user,
    password: options.password,
    intend: options.intend,
    filename: options.filename,
}).then(()=> {
    console.log('Done!');
    process.exit();
});

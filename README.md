# sql2ts

TypeScript interface generator from SQL table schema

[![nodejs version](https://img.shields.io/node/v/sql2ts.svg)](#)
[![npm version](https://img.shields.io/npm/v/sql2ts.svg)](#)
[![npm download count](https://img.shields.io/npm/dt/sql2ts.svg)](https://www.npmjs.com/package/sql2ts)
[![MIT license](https://img.shields.io/npm/l/sql2ts.svg)](#)

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [Development](#development)
- [ChangeLog](#changelog)
- [License](#license)

## Install

    npm install -g sql2ts

- [Releases](https://github.com/annsk/sql2ts.git/releases)

## Usage

```
$ sql2ts --help

 Usage:
  sql2ts [OPTIONS] [ARGS]

 Options:
  -h, --host [URL]        Host. (Default is localhost)
  -u, --user STRING       Database user.
  -p, --password PASSWORD Database password.
  -d, --database STRING   Database name.
  -t, --table STRING      Table name.
  -i, --intend            Intendation size. Tab or space count.
      --path FILE         Path for output file
  -f, --filename FILE     Output file name
  -v, --version           Display the current version

```

### Example

    $ sql2ts --path interfaces/ -h localhost -u root -d example_database -t main_table -i 2


## License

`sql2ts` is licensed under the MIT license.

Copyright &copy; 2016, Artur Pelczar
# @websinatra/sinatra

Sinatra static properties are symbols used as unique property keys by WebSinatra modules.

### Table of contents

1. [Installation](#installation)
2. [Usage](#usage)
	* [Sinatra](#sinatra)
	* [Sinatra.cyanFlattenable](#sinatracyanflattenable)
3. [Authors](#authors)
4. [License](#license)

## Installation

Install **Sinatra** using your favorite package manager.

```bash
$ npm install @websinatra/sinatra
```

## Usage

#### Sinatra

**Sinatra** is not a constructor. Cannot use a new operator or invoke **Sinatra** object as a function. All **Sinatra** properties are static (just like [Math](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math) and [Reflect](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect) objects).

#### Sinatra.cyanFlattenable

**Sinatra.cyanFlattenable** static key property specifies the property that indicates the flattenability of an iterable object. If set to false, an async iterable or sync iterable objects cannot be flattened by **Cyan()**, **Cyan.prototype.flat()** or **Cyan.prototype.flatMap()**.

## Authors

Aziz Da <azizdawhat@gmail.com>

## License

[GPL-3.0-or-later]()

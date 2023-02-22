# @websinatra/cyan

Cyan is an async iterable object for performing async array operations on values sourced from the object with concurrency control.

### Table of contents

1. [Installation](#installation)
2. [Usage](#usage)
	* 	[Cyan()](#cyan)
	*  [Cyan.chunk()](#cyanchunk)
	*  [Cyan.from()](#cyanfrom)
	*  [Cyan.prototype.concat()](#cyanprototypeconcat)
	*  [Cyan.prototype.constructor](#cyanprototypeconstructor)
	*  [Cyan.prototype.entries()](#cyanprototypeentries)
	*  [Cyan.prototype.filter()](#cyanprototypefilter)
	*  [Cyan.prototype.flat()](#cyanprototypeflat)
	*  [Cyan.prototype.flatMap()](#cyanprototypeflatmap)
	*  [Cyan.prototype.keys()](#cyanprototypekeys)
	*  [Cyan.prototype.map()](#cyanprototypemap)
	*  [Cyan.prototype.slice()](#cyanprototypeslice)
	*  [Cyan.prototype.toArray()](#cyanprototypetoarray)
	*  [Cyan.prototype.values()](#cyanprototypevalues)
	*  [Cyan.prototype\[@@asyncIterator\]()](#cyanprototypeasynciterator)
	*  [Cyan.prototype\[@@toStringTag\]](#cyanprototypetostringtag)
	*  [Cyan\[@@species\]](#cyanspecies)
3. [Authors](#authors)
4. [License](#license)

## Installation

Install **Cyan** using your favorite package manager.

```bash
$ npm install @websinatra/cyan
```

## Usage

#### Cyan()

Creates a new **Cyan** object with a new operator. Async iterable objects will be flattened unless **Sinatra.cyanFlattenable** property is set to false.

* **[iterable=Array.prototype\[@@iterator\]()]**

#### Cyan.chunk()

Creates a new **Cyan** instance containing array chunks from **iterable** the length of **length**.

* **iterable**
* `{number}` **[length=Number.MAX\_SAFE\_INTEGER]**

#### Cyan.from()

Creates a new **Cyan** instance from an array-like object, an async iterable object or an async iterator object.

* `{!{}}` **obj**

#### Cyan.prototype.concat()

Returns a new **Cyan** instance that is the calling **Cyan** object joined with **values**. Async iterable objects will be flattened unless **Sinatra.cyanFlattenable** property is set to false.

* `{...*}` **[values]**

#### Cyan.prototype.constructor

Constructor function that created the instance object.

#### Cyan.prototype.entries()

Returns a new **Cyan** instance that contains key/ value pairs for each index in the calling **Cyan** object.

#### Cyan.prototype.filter()

Returns a new **Cyan** instance containing all values of the calling **Cyan** object for which the provided **callbackFn** returns true.

* `{function}` **callbackFn**
* `{number}` **[concurrency=Number.MAX\_SAFE\_INTEGER]**

#### Cyan.prototype.flat()

Returns a new **Cyan** instance with all values of the calling **Cyan** object that are iterable objects are flattened to specified **depth**, unless **Sinatra.cyanFlattenable** property is set to false.

* `{number}` **[depth=1]**

#### Cyan.prototype.flatMap()

Returns a new **Cyan** instance formed by applying **Cyan.prototype.map.apply().flat(1)** to values of the calling **Cyan** object.

* `{function}` **callbackFn**
* `{number}` **[concurrency=Number.MAX\_SAFE\_INTEGER]**

#### Cyan.prototype.keys()

Returns a new **Cyan** instance that contains the keys for each index in the calling **Cyan** object.

#### Cyan.prototype.map()

Returns a new **Cyan** instance containing the results of invoking **callbackFn** on every value in the calling **Cyan** object.

* `{function}` **callbackFn**
* `{number}` **[concurrency=Number.MAX\_SAFE\_INTEGER]**

#### Cyan.prototype.slice()

Returns a new **Cyan** instance by extracting a section of the calling **Cyan** object.

* `{number}` **[start=0]**
* `{number}` **[end=Number.POSITIVE_INFINITY]**

#### Cyan.prototype.toArray()

Returns a Promise that is an array of fulfillment values of the calling **Cyan** object.

#### Cyan.prototype.values()

Returns a new **Cyan** instance that contains the values of the calling **Cyan** object.

#### Cyan.prototype\[@@asyncIterator\]()

Returns an async iterator object.

#### Cyan.prototype[@@toStringTag]

Returns "Cyan". Property is used in **Object.prototype.toString()**.

#### Cyan[@@species]

Returns **Cyan** constructor.

## Authors

Aziz Da <azizdawhat@gmail.com>

## License

[GPL-3.0-or-later]()

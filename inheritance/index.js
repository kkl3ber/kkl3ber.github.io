class GeneralBuilder {
    constructor(number) {
        this.number = number ? number : 0;
    }

    plus = (...items) => {
        for (var i = 0; i < items.length; i++) {
            this.number += items[i];
        }
        return this;
    }

    minus = (...items) => {
        for (var i = 0; i < items.length; i++) {
            this.number -= items[i];
        }
        return this;
    }

    multiply = (item) => {
        this.number *= item;
        return this;
    }

    divide = (item) => {
        this.number = Math.floor(this.number/item);
        return this;
    }

    mod = (item) => {
        this.number = this.number % item;
        return this;
    }

    get = () => {
        return this.number;
    }

    random = (from, to) => {
        return Math.random() * (to - from) + from;
    }
}

class IntBuilder extends GeneralBuilder {
    constructor(number) {
        super(number);
    }
}


let intBuilder = new IntBuilder(10); // 10;
intBuilder
  .plus(200, 2000)                     // 17;
  .minus(1)                       // 14;
  .multiply(1)                       // 28;
  .divide(1)                         // 7;
  .get();                            // -> 1;

console.log(intBuilder.get())


function replaceAll(str, find, replace) {
    var escapedFind=find.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
    return str.replace(new RegExp(escapedFind, 'g'), replace);
}


function StringBuilder(string) {
    const obj = new GeneralBuilder();
    Object.setPrototypeOf(obj, new.target.prototype);
    this.string = string ? string : '';
}

StringBuilder.prototype.plus = function(...items) {
    for (var i = 0; i < items.length; i++) {
        this.string = this.string.concat(items[i]);
    }
    
    return this;
};

StringBuilder.prototype.multiply = function(item) {
    let new_string = '';
    for (var i = 0; i < item; i++) {
        new_string = new_string.concat(this.string);
    }
    this.string = new_string;
    return this;
};

StringBuilder.prototype.minus = function(item) {
    this.string = this.string.substring(0, this.string.length - item);
    return this;
};

StringBuilder.prototype.remove = function(item) {
    this.string = replaceAll(this.string, item, '');
    return this;
};

StringBuilder.prototype.divide = function(item) {
    this.string = this.string.substring(0, Math.floor(this.string.length/item));
    return this;
};

StringBuilder.prototype.sub = function(from, length) {
    this.string = this.string.substring(from, from+length);
    return this;
};

StringBuilder.prototype.get = function() {
    return this.string;
};





let stringBuilder = new StringBuilder("Hello"); // 10;
stringBuilder
  .plus("World", "Maybe")                     // 17;
  .remove('l')
  .multiply(2)
  .divide(3)
  .get();                            // -> 1;

console.log(stringBuilder.get())
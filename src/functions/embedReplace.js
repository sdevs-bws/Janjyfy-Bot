class Replace {
    constructor(embed, options) {
        this.embed = embed;
        this.options = options;
        var stringified = JSON.stringify(embed);

        for (const [key, value] of Object.entries(options)) {
            let newkey = '{' + key + '}'
            let count = stringified.split(newkey).length - 1

            for (let i = 0; i < count; i++) {
                stringified = stringified.replace(newkey, value);
            }
        }
        var jsonObject = JSON.parse(stringified);
        return jsonObject
    }
}

module.exports = Replace
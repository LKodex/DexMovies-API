const { SHA3 } = require('sha3')

const compareHash = (toHash, hashed) => {
    const newHash = new SHA3(256).update(toHash).digest('hex')
    return newHash == hashed
}

module.exports = compareHash
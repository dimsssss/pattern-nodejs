import fs from 'fs'


function iterate(files, dest, nesting, cb) {
    // 종료 조건
    if (nesting === files.length) {
        return process.nextTick(cb)
    }

    // 반복 작업
    fs.readFile(files[nesting], 'utf8', (err, fileContent) => {
        if (err) {
            return cb(err)
        }
        fs.appendFile(dest, fileContent, 'utf8', (err) => {
            if (err) {
                return cb(err)
            }
            iterate(files, dest, nesting + 1, cb)
        })
    })
}

function concatfile(...arg) {
    const cb = arg.pop()
    const dest = arg.pop()

    iterate(arg, dest, 0, cb)
}

concatfile('one.txt', 'two.txt', 'three.txt', 'dest.txt', (err) => {

    const result = fs.readFileSync('dest.txt', 'utf8')
    console.log(result)
})
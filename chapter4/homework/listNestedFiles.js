import fs from 'fs'

function getSubDirectories(dir, cb) {
    fs.readdir(dir, 'utf8', (err, dirs) => {
        if (err) {
            return cb(err)
        }
        dirs.forEach(subDirectory => {
            listNestedFiles(dir + '/' + subDirectory, cb)
        })
    })
}

const allSubDirectories = new Set()

function listNestedFiles(dir, cb) {
    
    if (allSubDirectories.has(dir)) {
        return
    }
    
    allSubDirectories.add(dir)


    fs.lstat(dir, (err, stat) => {
        if (err) {
            return cb(err)
        }
        if (stat.isDirectory()) {
            getSubDirectories(dir, cb)
        }
                
    })
}

listNestedFiles('/home/dimss/study', () => {
    console.log(allSubDirectories)
})

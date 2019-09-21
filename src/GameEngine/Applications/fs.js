let createItem = (path, type, content) => {
    let pathArr = path.split('/')
    let newItem = {
        type: type,
        name: pathArr.pop(),
        path: "/" + pathArr.join('/'),
    }

    if (type === 'file')
        newItem.content = content

    return newItem
}

let addItem = (fs, path, type, content) => {
    return {...fs, [path]: createItem(path, type, content)}
}

let getDirectoryContents = (fs, path) => {
    return fs.files.filter( (file) => (file.path === path) )
}

let createRoot = () => {
    return {
        '/': {
            type: 'directory', 
            name: '/',
        }
    }
}

let getContent = (fs, path) => {
    let f = fs[path]
    if (f && f.type === 'file')
        return f.content
    else 
        return null
}

let normalize = (cwd, path) => {
    if (path.split('/')[0] === "")
        return path
    else
        return cwd + path
}


export {createRoot, addItem, getContent, getDirectoryContents, normalize}

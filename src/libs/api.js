import { ezEncode } from './utils'
import { parseString } from 'react-native-xml2js'
import { AsyncStorage } from 'react-native';

const login = (nasUrl, username, password) => {
    return fetch(`${nasUrl}/cgi-bin/authLogin.cgi`, {
        method: 'post',
        headers: {
            "content-type": "application/x-www-form-urlencoded",
        },
        "body": `user=${username}&serviceKey=1&pwd=${ezEncode(password)}`
    })
    .then(response => response.text())
    .then(data => {
        return new Promise((resolve, reject) => {
            parseString(data, function (err, result) {
                if(result.QDocRoot.authPassed[0] === '0') reject('parse xml fail')
                resolve(result.QDocRoot.authSid[0])
            });
        })
    })
}

const createFolder = (nasUrl, token, folderName) => {
    return fetch(`${nasUrl}/cgi-bin/filemanager/utilRequest.cgi?func=createdir&sid=${token}`, {
        "credentials": "include",
        "headers": { "accept": "*/*", "accept-language": "zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7", "cache-control": "no-cache", "content-type": "application/x-www-form-urlencoded; charset=UTF-8", "pragma": "no-cache", "x-requested-with": "XMLHttpRequest" },
        "referrer": `${nasUrl}/cgi-bin/`,
        "referrerPolicy": "no-referrer-when-downgrade",
        "body": `dest_path=%2FDownload&dest_folder=${folderName}`,
        "method": "POST",
        "mode": "cors"
    })
    .then(data => data.json())
    .then(data => {
        if(data.status !== 1) throw 'the folder exist'
        return true
    })
}

const addDownload = (nasUrl, token, folderName, urls) => {
    let urlString = urls[0]

    return fetch(`${nasUrl}/downloadstation/V4/Task/AddUrl`, {
        "credentials": "include",
        "headers": { "accept": "*/*", "accept-language": "zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7", "cache-control": "no-cache", "content-type": "application/x-www-form-urlencoded; charset=UTF-8", "pragma": "no-cache", "x-requested-with": "XMLHttpRequest" },
        "referrer": `${nasUrl}/downloadstation/?windowId=DownloadStation&v=5.1.109&`,
        "referrerPolicy": "no-referrer-when-downgrade",
        "body": `temp=Download&move=Download%2F${folderName}&url=${urlString}&sid=${token}`,
        "method": "POST",
        "mode": "cors"
    })
    .then(data => data.json())
    .then(data => {
        if (data.error !== 0) throw 'add download fail'
        return true
    })
}

const addDownloadImage = (nasUrl, no, urls) => {
    return fetch(`${nasUrl}:8888/download`, {
        "headers": {'content-type': 'application/json'},
        "body": JSON.stringify({no, no, urls:urls.slice(1)}),
        "method": "POST",
    })
    .then(data => data.json())
    .then(data => {
        if (data.error_message) throw data.error_message
        return true
    })
}

export const doDownload = async (folderName, urls, no) => {
    let nasUrl = await AsyncStorage.getItem('nas')
    let username = await AsyncStorage.getItem('username')
    let password = await AsyncStorage.getItem('password')

    try {
        let token = await login(nasUrl, username, password)
        let create = await createFolder(nasUrl, token, folderName)
        let download = await addDownload(nasUrl, token, folderName, urls)
        let downloadImage = await addDownloadImage(nasUrl, no, urls)
    } catch(e) {
        throw e
    }

    return true
}
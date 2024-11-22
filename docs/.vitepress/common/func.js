import * as cdata from './data'

let process_date = (date_string) => {
    if (!date_string) return null
    const date = new Date(date_string)
    const timezone_offset = date.getTimezoneOffset()
    const date_with_offset = new Date(date.getTime() + timezone_offset * 60000);
    const options = { year: 'numeric', month: 'short', day: 'numeric' }
    return date_with_offset.toLocaleDateString("en-US", options)
}

function find_source_arr(sources, key_arr, type) {
    let src_arr = sources.filter(src => src.device_map.some(d => key_arr.includes(d)) && src.type == type)
    if (src_arr.length > 0) return src_arr
    else return []
}

function find_source_link(source_arr) {
    if (source_arr.length > 0 && source_arr[0].links.length > 0 && source_arr[0].links[0].url) return source_arr[0].links[0].url
    else return ''
}

function find_source_device_map(src, device_list, device_key_map) {
    return src.device_map
        .filter(d => device_list.includes(d))
        .map(key => 
            device_key_map
                .find(d => d.key == key)
        )
}

function get_download_obj(sources, devices, download_obj) {
    let ret = {}

    for (let key in download_obj) {
        ret[key] = download_obj[key]
        let source_arr = find_source_arr(sources, devices, key)
        let length = source_arr.length
        ret[key].length = length

        if (length != 1) ret[key].enabled = false
        else ret[key].enabled = true

        if (source_arr.length < 1) continue
        if (source_arr[0].hasOwnProperty('link')) ret[key].link = source_arr[0].link
        else ret[key].link = find_source_link(source_arr)
    }
    return ret
}

export {
    process_date,
    find_source_arr,
    find_source_link,
    find_source_device_map,
    get_download_obj
}
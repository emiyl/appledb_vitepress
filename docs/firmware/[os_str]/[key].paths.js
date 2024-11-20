export default {
  async paths() {
    const firmwares = await (await fetch('http://api.emiyl.com/adbweb/firmware/index.json')).json()

    return firmwares.map((fw) => {
      let fw_array = fw.split('/')
      let os_str = fw_array[0]
      let key = fw_array[1]

      return {
        params: {
          os_str: os_str,
          key: key
        }
      }
    })
  }
}
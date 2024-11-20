export default {
  async paths() {
    const device_keys = await (await fetch('http://api.emiyl.com/device/key/index.json')).json()

    return device_keys.map((key) => {
      return {
        params: {
          key: key
        }
      }
    })
  }
}
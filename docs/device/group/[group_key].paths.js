export default {
  async paths() {
    const group_keys = await (await fetch('http://api.emiyl.com/adbweb/device/group/index.json')).json()

    return group_keys.map((key) => {
      return {
        params: {
          group_key: key
        }
      }
    })
  }
}
const { dialog } = require('electron').remote

export default {
    
    saveDialog() {

        return new Promise((resolve, reject)=>{
            dialog.showSaveDialog({ filters: [{ name: 'VuDesigner Document', extensions: ['vdd'] }]}).then((data)=>{
                if( !data.canceled ) resolve(data.filePath)
                else resolve(null)
            }).catch((error) => {
                resolve(null)
            })
        })

    }
}
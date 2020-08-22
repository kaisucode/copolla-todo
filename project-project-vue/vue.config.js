module.exports = {
  lintOnSave: false, 
  css: {
    modules: true, 
    loaderOptions: {
      sass: {
        additionalData: `@import "@/assets/globalStyleSheet.scss";`
      }
    }
  },
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true
    }
  }
}

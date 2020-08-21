module.exports = {
  lintOnSave: false, 
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "@/assets/globalStyleSheet.scss";`
      }
    }
  }
}

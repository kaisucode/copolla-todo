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
      nodeIntegration: true, 
      builderOptions: {
        "appId": "com.alekandkevin.proj",
        "mac": {
          "category": "public.app-category.productivity",
          "artifactName": "project-project"
        }
      }
    }
  }
}

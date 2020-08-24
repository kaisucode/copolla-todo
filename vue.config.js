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
        "appId": "com.alekandkevin.copolla-todo",
        "productName": "copolla-todo", 
        "copyright": "Copyright ©2020 Alek Westover & Kevin Hsu", 
        "mac": {
          "category": "public.app-category.productivity",
          "artifactName": "copolla-todo", 
          "icon": "build/icons/*"
        }, 
        "files": ["**/*", "build/icons/*"]
      }
    }
  }
}

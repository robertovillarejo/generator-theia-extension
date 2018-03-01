import Base  = require('yeoman-generator');

module.exports = class TheiaLanguage extends Base {

    path() {
        this.sourceRoot(__dirname + '/../../templates')
    }

    writing() {
        this.fs.copyTpl(
            this.templatePath('backend-module.ts'),
            this.destinationPath((this.options as any).params.extensionName + '-extension/src/node/' + (this.options as any).params.extensionName + '-backend-module.ts'),
            { 
                params: (this.options as any).params
            }
        );

        this.fs.copyTpl(
            this.templatePath('language-contribution.ts'),
            this.destinationPath((this.options as any).params.extensionName + '-extension/src/browser/language-contribution.ts'),
            { 
                params: (this.options as any).params
            }
        );

        this.fs.copyTpl(
            this.templatePath('monaco.d.ts'),
            this.destinationPath((this.options as any).params.extensionName + '-extension/src/browser/monaco.d.ts'),
            { 
                params: (this.options as any).params
            }
        );
    }
}
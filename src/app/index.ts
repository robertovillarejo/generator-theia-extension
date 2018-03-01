import Base = require('yeoman-generator');

module.exports = class TheiaExtension extends Base {

    params: {
        author: string
        version: string
        license: string
        extensionName: string
        githubURL: string
        extensionPrefix: string
        example: boolean
        browser: boolean
        electron: boolean
        vscode: boolean
        theiaVersion: string
        lernaVersion: string,
        //Language contribution options
        languageContribution: Boolean,
        languageExtension: string
    };

    constructor(args: string | string[], options: any) {
        super(args, options);
        this.argument('extensionName', {
            type: String,
            required: false,
        });

        this.option('languageContribution', {
            alias: 'lang',
            description: 'Generate a language contribution',
            type: Boolean,
            default: false
        });

        this.option('languageExtension', {
            alias: 'lang-ext',
            description: 'The extension for the files written in the language',
            type: String
        });

        this.option('browser', {
            alias: 'b',
            description: 'Generate a browser app',
            type: Boolean,
            default: true
        });
        this.option('electron', {
            alias: 'e',
            description: 'Generate an electron app',
            type: Boolean,
            default: true
        });
        this.option('example', {
            alias: 'x',
            description: 'Generate an example contribution',
            type: Boolean, 
            default: false
        });
        this.option('vscode', {
            alias: 'c',
            description: 'Generate VS Code configs',
            type: Boolean, 
            default: true
        })

        this.option('author', {
            alias: 'a',
            description: 'The extension\'s author',
            type: String
        });
        this.option('version', {
            alias: 'v',
            description: 'The extension\'s version',
            type: String,
            default: '0.0.0'
        });
        this.option('description', {
            alias: 'd',
            description: 'The extension\'s description',
            type: String,
        });
        this.option('license', {
            alias: 'l',
            description: 'The extension\'s license',
            type: String
        });
        this.option('githubURL', {
            alias: 'u',
            description: 'The extension\'s Github URL',
            type: String
        });

        this.option('theia-version', {
            alias: 't',
            description: 'The verision of Theia to use',
            type: String,
            default: 'latest'
        });
        this.option('lerna-version', {
            description: 'The verision of lerna to use',
            type: String,
            default: '2.4.0'
        });
    }

    path() {
        this.sourceRoot(__dirname + '/../../templates');
    }

    prompting() {
        if (!(this.options as any).extensionName)
            return this.prompt([{
                type: 'input',
                name: 'name',
                message: "The extension's name",
                default: this.appname // Default to current folder name
            }]).then((answers) => {
                (this.options as any).extensionName = answers.name
            });
    }

    configuring() {
        const options = this.options as any
        const extensionName = options.extensionName as string
        const extensionPrefix = extensionName.split('-').map(name => this._capitalize(name)).join('');
        this.log(extensionPrefix)
        this.params = {
            author: options.author,
            version: options.version,
            license: options.license,
            extensionName: extensionName,
            githubURL: options.githubURL,
            extensionPrefix: extensionPrefix,
            example: options.example,
            browser: options.browser,
            electron: options.electron,
            vscode: options.vscode,
            theiaVersion: options["theia-version"],
            lernaVersion: options["lerna-version"],
            languageContribution: options["languageContribution"],
            languageExtension: options["languageExtension"]
        }
        options.params = this.params
        console.log(options.params);
        if ((this.options as any).browser)
            this.composeWith(require.resolve('../browser'), this.options);
        if ((this.options as any).electron)
            this.composeWith(require.resolve('../electron'), this.options);
        if ((this.options as any).languageContribution)
            this.composeWith(require.resolve('../language'), this.options);
    }

    writing() {
        this.fs.copyTpl(
            this.templatePath('root-package.json'),
            this.destinationPath('package.json'),
            { params: this.params }
        );
        this.fs.copyTpl(
            this.templatePath('lerna.json'),
            this.destinationPath('lerna.json'),
            { params: this.params }
        );
        this.fs.copyTpl(
            this.templatePath('gitignore'),
            this.destinationPath('.gitignore'),
            { params: this.params }
        );
        this.fs.copyTpl(
            this.templatePath('README.md'),
            this.destinationPath('README.md'),
            { params: this.params }
        )
        if (this.params.vscode) {
            this.fs.copyTpl(
                this.templatePath('launch.json'),
                this.destinationPath('.vscode/launch.json'),
                { params: this.params }
            )
        }

        this.fs.copyTpl(
            this.templatePath('extension-package.json'),
            this.destinationPath(this.params.extensionName + '-extension/package.json'),
            { params: this.params }
        );
        this.fs.copyTpl(
            this.templatePath('tsconfig.json'),
            this.destinationPath(this.params.extensionName + '-extension/tsconfig.json'),
            { params: this.params }
        );
        this.fs.copyTpl(
            this.templatePath('frontend-module.ts'),
            this.destinationPath(this.params.extensionName + '-extension/src/browser/' + this.params.extensionName + '-frontend-module.ts'),
            { params: this.params }
        );
        if (this.params.example) {
            this.fs.copyTpl(
                this.templatePath('contribution.ts'),
                this.destinationPath(this.params.extensionName + '-extension/src/browser/' + this.params.extensionName + '-contribution.ts'),
                { params: this.params }
            );
        }
    }

    install() {
        this.spawnCommand('yarn', []);
    }

    private _capitalize(name: string): string {
        return name.substring(0, 1).toUpperCase() + name.substring(1)
    }
}

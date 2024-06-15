let modules: Module[] = [];

function setModules(modules: Module[]) {
    modules = modules;
}

interface IModule {
    id: number;
    enabled: boolean;
    component?: React.ReactNode;
    name: string;
    useSearch: boolean;
}

class Module implements IModule {
    public id: number;
    public enabled: boolean;
    public component: React.ReactNode;

    constructor(public name: string, public useSearch: boolean) {
        this.id = this.nextId();
        this.enabled = true;
    }

    private nextId(): number {
        if (modules.length === 0) {
            return 0;
        }

        return Math.max(...modules.map(module => module.id)) + 1;
    }

    public assign(component: React.ReactNode) {
        this.component = component;
    }

    public register() {
        modules.push(this);
    }
}

export { Module, modules, setModules };

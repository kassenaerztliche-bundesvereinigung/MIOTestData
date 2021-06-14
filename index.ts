import * as fs from "fs";

// eslint-disable-next-line @typescript-eslint/no-empty-function
const emptyFunction = () => {};

export function readDir(path: string): string[] {
    try {
        return fs.readdirSync(path);
    } catch (err) {
        throw new Error(err.toString());
    }
}

export function readFile(path: string): string | undefined {
    try {
        if (fs.existsSync(path) && fs.lstatSync(path).isFile()) {
            return fs.readFileSync(path, "utf8");
        } else {
            console.log("file: '" + path + "' not found..");
            return undefined;
        }
    } catch (err) {
        throw new Error(err.toString());
    }
}

export function readJSONFile(path: string): Record<string, unknown> | undefined {
    const data = readFile(path);
    if (data) {
        try {
            return JSON.parse(data) as Record<string, unknown>;
        } catch (err) {
            throw new Error("Error parsing json.. ");
        }
    }
}

export type mioString = "IM" | "ZB" | "MR" | "UH";
const mioStrings: mioString[] = ["IM", "ZB", "MR", "UH"];
export { mioStrings };

const basePath: string = __dirname;
process.stdout.write("Base path: " + basePath);

export type DefinitionType = "Bundles" | "Profiles";

export function getExamples(
    mio: mioString,
    type: DefinitionType,
    valid = true
): string[] {
    const rootPath = `${basePath}/data/${type.toLowerCase()}/${mio}${
        valid ? "" : "/error"
    }`;
    const files = readDir(rootPath).map((file) => `${rootPath}/${file}`);
    const results: string[] = [];
    files.forEach((file) => {
        if (fs.lstatSync(file).isFile()) results.push(file);
    });
    return results;
}

export function getExample(
    filePath: string,
    rootPath = `${basePath}`
): string | undefined {
    return readFile(rootPath + filePath);
}

export type HasMioString = {
    mioString: mioString;
};

const BasicList: HasMioString[] = [];
mioStrings.forEach((str) => {
    BasicList.push({
        mioString: str
    });
});

export { BasicList };

export function runAll<T extends HasMioString>(
    name: string,
    list: T[],
    testFunction: (bundles: string[], value: T) => void,
    type: DefinitionType,
    valid = true,
    setupFn: () => void = emptyFunction
): void {
    setupFn();
    describe(name, () => {
        list.forEach((value) => {
            describe(`Examples ${value.mioString} (${type})`, () => {
                const bundles = getExamples(value.mioString, type, valid);
                if (!bundles.length) console.warn("A data folder should not be empty!");
                expect(bundles.length).toBeGreaterThan(0);
                testFunction(bundles, value);
            });
        });
    });
}

export function runAllFiles<T extends HasMioString>(
    name: string,
    list: T[],
    testFunction: (bundles: string, value: T) => void,
    type: DefinitionType,
    valid = true,
    setupFn: () => void = emptyFunction
): void {
    runAll<T>(
        name,
        list,
        (bundles, value) => {
            bundles.forEach((file) => testFunction(file, value));
        },
        type,
        valid,
        setupFn
    );
}

export function runAllBundleFiles(
    name: string,
    testFunction: (file: string, value: HasMioString) => void,
    valid = true,
    setupFn: () => void = emptyFunction
): void {
    runAllFiles(name, BasicList, testFunction, "Bundles", valid, setupFn);
}

export function runAllBundles(
    name: string,
    testFunction: (file: string[], value: HasMioString) => void,
    valid = true,
    setupFn: () => void = emptyFunction
): void {
    runAll(name, BasicList, testFunction, "Bundles", valid, setupFn);
}

export function runAllProfileFiles(
    name: string,
    testFunction: (file: string, value: HasMioString) => void,
    valid = true,
    setupFn: () => void = emptyFunction
): void {
    runAllFiles(name, BasicList, testFunction, "Profiles", valid, setupFn);
}

export function runAllProfiles<T extends HasMioString>(
    testFunction: (file: string[], value: HasMioString) => void,
    valid = true,
    setupFn: () => void = emptyFunction
): void {
    runAll(name, BasicList, testFunction, "Profiles", valid, setupFn);
}

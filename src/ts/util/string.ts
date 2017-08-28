
/**
 * Takes a string of the format "foo {0} bar {1}" and substitues the given values for the placeholders
 */
export function format(template: string, ...values: any[]): string {
    function replacer(_match: string, group: string): string {
        const id = parseInt(group, 10);
        return id < values.length ? values[id] : "";
    }
    return template.replace(/{(\d+)}/g, replacer);
}

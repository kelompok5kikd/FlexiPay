declare module "node:sqlite" {
  export class DatabaseSync {
    constructor(path: string);
    exec(sql: string): void;
    prepare(sql: string): {
      run(...values: unknown[]): { changes: number };
      get(...values: unknown[]): Record<string, unknown> | undefined;
      all(): Record<string, unknown>[];
    };
  }
}

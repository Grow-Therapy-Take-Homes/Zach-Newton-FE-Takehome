/**
 * Simplified interface for localstorage to get and set localstorage entries.
 */
class LocalStore {
  public get<T>(key: string): T | undefined {
    const item = localStorage.getItem(this.getKey(key));
    if (!item) {
      return undefined;
    }
    const parsedItem: T = JSON.parse(item);
    return parsedItem;
  }

  public set<T>(key: string, value: T): void {
    const serializedItem = JSON.stringify(value);
    localStorage.setItem(this.getKey(key), serializedItem);
  }

  private getKey(key: string): string {
    return `wikinews_${key}`;
  }
}

export const localStore = new LocalStore();

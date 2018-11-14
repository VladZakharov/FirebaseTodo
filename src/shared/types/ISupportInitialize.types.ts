export abstract class ISupportInitialize<T = any> {
  public abstract initialize(arg: T): Promise<any>;
  public abstract initialize(...args: any[]): Promise<any>;
}

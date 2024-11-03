export interface ResultI<T> {
  data?: T;
  error?: unknown;
}

export class Result<T> implements ResultI<T> {
  public data?: T | undefined;
  public error?: unknown;

  static async catchError<T>(callback: () => Promise<T>): Promise<ResultI<T>> {
    let out: ResultI<T> = {
      data: undefined,
      error: undefined,
    };

    try {
      out.data = await callback();
    } catch (e) {
      out.error = e;
    }
    return out;
  }

  some() {
    return this.data;
  }

  hasError() {
    return Boolean(this.error);
  }
}

export interface Upload {
  result: {
    fields: {},
    files: {
      file: [
        {
          container: string;
          name: string;
          size: number;
          type: string;
        }
      ]
    }
  };
}

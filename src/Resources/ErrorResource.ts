import Resource from "./Resource";

interface ErrorResource extends Resource {
  code: number;
  message: string;
}

export default ErrorResource;
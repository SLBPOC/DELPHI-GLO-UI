import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class HttpErrorHandler implements ErrorHandler {
  constructor() {}

  handleError(error: any): void {
    // Check if it's an error from an HTTP response
    if (!(error instanceof HttpErrorResponse)) {
      error = error.rejection; // get the error object
    }

    console.error('Error from global error handler', error);
  }
}

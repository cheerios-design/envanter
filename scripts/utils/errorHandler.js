export class ErrorHandler {
  static log(error, context = "") {
    console.error(`Error in ${context}:`, error);
    // In production, this could send to an error tracking service
  }

  static displayUserError(message, container) {
    if (!container) return;

    container.innerHTML = `
      <div class="error-message bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
        <p class="font-bold">Error</p>
        <p>${message}</p>
      </div>
    `;
  }
}

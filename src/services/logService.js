import * as Sentry from "@sentry/browser";

function init() {
  Sentry.init({
    dsn: "https://275326438a104c52b6468660258584ad@sentry.io/1293248"
  });
}

function log(error) {
  Sentry.captureException(error);
}

export default { init, log };

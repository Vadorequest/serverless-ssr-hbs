import path from 'path';

/**
 * Figures whether the project is currently hosted on AWS or not.
 *
 * See https://docs.aws.amazon.com/lambda/latest/dg/current-supported-versions.html
 * @returns {boolean}
 */
export const isHostedOnAWS = () => !!(process.env.LAMBDA_TASK_ROOT || process.env.AWS_EXECUTION_ENV);

/**
 * Returns the project's root by default.
 * This is a workaround to resolve paths using an absolute path, which works both in local and AWS environments.
 * XXX Webpack messes up the __dirname which becomes unusable on AWS. (basically, __dirname value is wrong)
 *
 * LAMBDA_TASK_ROOT should be something like "/var/task" when hosted on AWS, and "null" otherwise.
 *
 * @param additionalPath Optional argument to resolve path based on the project's root.
 * @returns {string}
 * TODO Find a way to fix __dirname when using Webpack
 */
export const isomorphicAbsolutePath = (additionalPath = '') => {
  if(isHostedOnAWS()){
    return path.join(process.env.LAMBDA_TASK_ROOT, additionalPath);
  } else {
    // XXX Doing "../.." because this file is under 2 directories levels (src/helpers)
    return path.join(path.resolve(__dirname), '..', '..', additionalPath);
  }
};

export const resolveProjectRoot = (additionalPath = '') => {
  return path.resolve(__dirname, '..', '..', additionalPath);
};

/**
 *
 * @param additionalPath Should be "__dirname"
 * @returns {*}
 */
export const absoluteDirname = (additionalPath = '') => {
  return resolveProjectRoot(additionalPath);
};